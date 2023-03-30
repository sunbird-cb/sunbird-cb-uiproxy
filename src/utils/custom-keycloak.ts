import * as express from 'express'
import expressSession from 'express-session'
import keycloakConnect from 'keycloak-connect'
import request from 'request'
import { getKeycloakConfig } from '../configs/keycloak.config'
import { CONSTANTS } from './env'
import { logError, logInfo } from './logger'
import { PERMISSION_HELPER } from './permissionHelper'
const async = require('async')

const composable = require('composable-middleware')

export class CustomKeycloak {
  private multiTenantKeycloak = new Map<string, keycloakConnect>()

  constructor(sessionConfig: expressSession.SessionOptions) {
    if (CONSTANTS.MULTI_TENANT_KEYCLOAK) {
      CONSTANTS.MULTI_TENANT_KEYCLOAK.split(';').forEach((v: string) => {
        const domainUrlMap = v.split(',')
        this.multiTenantKeycloak.set(
          domainUrlMap[0],
          this.generateKeyCloak(sessionConfig, domainUrlMap[1], domainUrlMap[2])
        )
      })
    }
    this.multiTenantKeycloak.set('common', this.generateKeyCloak(sessionConfig))
  }

  middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const keycloak = this.getKeyCloakObject(req)
    const middleware = composable(
      keycloak.middleware({
        admin: '/callback',
        logout: '/reset',
      })
    )
    middleware(req, res, next)
  }

  getKeyCloakObject(req: express.Request): keycloakConnect {
    const rootOrg =
      (req.headers ? req.header('rootOrg') : '') || (req.cookies ? req.cookies.rootorg : '')
    let domain = ''
    if (rootOrg) {
      this.multiTenantKeycloak.forEach((_value, key) => {
        if (key.toLowerCase().includes(rootOrg.toLowerCase())) {
          domain = key
        }
      })
    }

    return (this.multiTenantKeycloak.get(req.hostname) ||
      this.multiTenantKeycloak.get(domain) ||
      this.multiTenantKeycloak.get('common')) as keycloakConnect
  }

  // tslint:disable-next-line: no-any
  authenticated = (reqObj: any, resObj: any, next: any) => {
    logInfo('Cookie from request object, As it is: ', JSON.stringify(reqObj.session.cookie))
    reqObj.session.cookie.secure = true
    logInfo('Cookie from request object, After updating: ', JSON.stringify(reqObj.session.cookie))
    if (resObj) {
      resObj.headers['set-cookie'] = reqObj.session.cookie
      logInfo('Added set-cookie header in response object...')
    } else {
      logError('response object is null in Keycloak.authenticated method.')
    }
    logInfo('Step 3: authenticated function', '------', new Date().toString())
    try {
      const userId = reqObj.kauth.grant.access_token.content.sub.split(':')
      reqObj.session.userId = userId[userId.length - 1]
      logInfo('userId ::', userId, '------', new Date().toString())
    } catch (err) {
      logError('userId conversation error' + reqObj.kauth.grant.access_token.content.sub, '------', new Date().toString())
    }
    const postLoginRequest = []
    // tslint:disable-next-line: no-any
    postLoginRequest.push((callback: any) => {
      PERMISSION_HELPER.getCurrentUserRoles(reqObj, callback)
    })

    // tslint:disable-next-line: no-any
    async.series(postLoginRequest, (err: any) =>  {
      if (err) {
        logError('error loggin in user', '------', new Date().toString())
        next(err, null)
      } else {
        logInfo(`${process.pid}: User authenticated`, '------', new Date().toString())
        next(null, 'loggedin')
      }
    })
  }

  // tslint:disable-next-line: no-any
  deauthenticated = (reqObj: any) => {
    const keyCloakPropertyName = 'keycloak-token'
    if (reqObj.session.hasOwnProperty(keyCloakPropertyName)) {
      const keycloakToken = reqObj.session[keyCloakPropertyName]
      if (keycloakToken) {
        const tokenObject = JSON.parse(keycloakToken)
        const refreshToken = tokenObject.refresh_token
        if (refreshToken) {
          const host = reqObj.get('host')
          const urlValue = `https://${host}` + '/auth/realms/' + CONSTANTS.KEYCLOAK_REALM + '/protocol/openid-connect/logout'
          const formData: Record<string, string> = {
            client_id: 'portal',
            refresh_token: refreshToken,
          }

          if (reqObj.session.hasOwnProperty('keycloakClientId') && (reqObj.session.keycloakClientId !== '')) {
            formData.client_id = reqObj.session.keycloakClientId
            formData.client_secret = reqObj.session.keycloakClientSecret
          }
          logInfo('formData used in logout: ' + JSON.stringify(formData))
          try {
              request.post({
                  form: formData,
                  url: urlValue,
              })
          } catch (err) {
              // tslint:disable-next-line: no-console
              console.log('Failed to call keycloak logout API ', err, '------', new Date().toString())
          }

          if (reqObj.session.parichayToken) {
            logInfo('Parichay login found... trying to logout from Parichay...')
            try {
              request.get({
                  headers: {
                    Authorization: reqObj.session.parichayToken.access_token,
                  },
                  url: CONSTANTS.PARICHAY_REVOKE_URL,
              }, (err, res, body) => {
                if (err) {
                  logError('Received error when calling Parichay logout... ')
                  logError(JSON.stringify(err))
                }
                if (res) {
                  logInfo('Received response from Parichay logout... ')
                  logInfo(JSON.stringify(res.body))
                }
                if (body) {
                  logInfo('Received body from Parichay logout...')
                  logInfo(JSON.stringify(body))
                }
              })
            } catch (err) {
                // tslint:disable-next-line: no-console
                console.log('Failed to call parichay revoke API ', err, '------', new Date().toString())
            }
          }
        } else {
          logError('Not able to retrieve refresh_token value from Session. Logout process failed.')
        }
      } else {
        logError('Not able to retrieve keycloak-token value from Session. Logout process failed.')
      }
    } else {
      logError('Session does not have property with name: ' + keyCloakPropertyName)
    }
    delete reqObj.session.userRoles
    delete reqObj.session.userId
    delete reqObj.session.keycloakClientId
    delete reqObj.session.keycloakClientSecret
    reqObj.session.destroy()
    logInfo(`${process.pid}: User Deauthenticated`)
  }

  protect = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const keycloak = this.getKeyCloakObject(req)
    return keycloak.protect()(req, res, next)
  }

  private generateKeyCloak(
    sessionConfig: expressSession.SessionOptions,
    url?: string,
    realm?: string
  ): keycloakConnect {
    const keycloak = new keycloakConnect(
      { store: sessionConfig.store },
      getKeycloakConfig(url, realm)
    )
    keycloak.authenticated = this.authenticated
    keycloak.deauthenticated = this.deauthenticated
    return keycloak
  }
}
