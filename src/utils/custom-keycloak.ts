import * as express from 'express'
import expressSession from 'express-session'
import keycloakConnect from 'keycloak-connect'
import { getKeycloakConfig } from '../configs/keycloak.config'
import { CONSTANTS } from './env'
import { logError, logInfo } from './logger'
// tslint:disable-next-line: no-commented-code
// import { PERMISSION_HELPER } from './permissionHelper'
// const async = require('async')

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
        logout: '/logout',
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
  authenticated = (request: any, next: any) => {
    logInfo('Step 3: authenticated function', '------', new Date().toString())
    try {
      const userId = request.kauth.grant.access_token.content.sub.split(':')
      request.session.userId = userId[userId.length - 1]
      request.session.org  = request.header('org') || 'random'
      // tslint:disable-next-line: no-console
      console.log('userId ::', userId, '------', new Date().toString())
      // tslint:disable-next-line: no-any
      request.session.save((error: any) => {
          if (error) {
              logError('reqObj.session.save error -- ', error)
              next(error, null)
          } else {
            // tslint:disable-next-line: no-console
            console.log('request.session after adding userId ::', request.session, '----cookie---', request.cookies,
            'request.header(org): ', request.header('org'), '------', new Date().toString())
            next(null, 'loggedin')
          }
      })
    } catch (err) {
      logError('userId conversation error' + request.kauth.grant.access_token.content.sub, '------', new Date().toString())
      next(err, null)
    }
    // tslint:disable-next-line: no-commented-code
    // const postLoginRequest = []
    // // tslint:disable-next-line: no-any
    // postLoginRequest.push((callback: any) => {
    //   // tslint:disable-next-line: no-console
    //   console.log('pushing task to postLoginRequest', '------', new Date().toString())
    //   PERMISSION_HELPER.getCurrentUserRoles(request, callback)
    // })

    // tslint:disable-next-line: no-any
    // async.series(postLoginRequest, (err: any, results: any) =>  {
    //   if (err) {
    //     logError('error loggin in user', '------', new Date().toString())
    //     next(err, null)
    //   } else {
    //     // tslint:disable-next-line: no-console
    //     console.log('async.series results -- ', results, '------', new Date().toString())
    //     logInfo(`${process.pid}: User authenticated`, '---request.header(org): ', request.header('org'), '------', new Date().toString())
    //     next(null, 'loggedin')
    //   }
    // })
  }

  // tslint:disable-next-line: no-any
  deauthenticated = (request: any) => {
    // console.log('De')
    delete request.session.userRoles
    delete request.session.userId
    logInfo(`${process.pid}: User Deauthenticated`)
  }

  protect = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // tslint:disable-next-line: no-console
    console.log('custom-keycloak::protect start', '------', new Date())
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
