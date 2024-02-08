const keycloak = require('keycloak-connect')
const async = require('async')
import request from 'request'
import { getOAuthKeycloakConfig } from '../configs/keycloak.config'
import { getSessionConfig } from '../configs/session.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { PERMISSION_HELPER } from '../utils/permissionHelper'

export function getKeyCloakClient() {
    const sessionConfig = getSessionConfig()
    const keycloakObj = new keycloak({ store: sessionConfig.store }, getOAuthKeycloakConfig())
    keycloakObj.authenticated = authenticated
    keycloakObj.deauthenticated = deauthenticated
    return keycloakObj
}

// tslint:disable-next-line: no-any
const deauthenticated = async (reqObj: any) => {
    logInfo('keycloakHelper::deauthenticated...')
    logInfo(`${process.pid}: User Deauthenticated`)
}

// tslint:disable-next-line: no-any
const authenticated = async (reqObj: any, next: any) => {
    logInfo('keycloakHelper::authenticated...')
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
