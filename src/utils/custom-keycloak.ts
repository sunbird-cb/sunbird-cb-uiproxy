import * as express from 'express'
import expressSession from 'express-session'
import keycloakConnect from 'keycloak-connect'
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
  authenticated = (reqObj: any, next: any) => {
    logInfo('Step 3: authenticated function', '------', new Date().toString())
    reqObj.session.authenticated = true
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
  deauthenticated = () => {
    logInfo(`${process.pid}: User Deauthenticated from custom-keycloak.ts`)
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
    // keycloak.deauthenticated = this.deauthenticated
    return keycloak
  }
}
