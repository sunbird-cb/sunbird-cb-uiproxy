const { google } = require('googleapis')
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { getKeyCloakClient } from './keycloakHelper'

const redirectPath = '/apis/public/v8/google/callback'
const defaultScope = ['https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid']

// tslint:disable-next-line: no-any
export function createConnection(req: any) {
    const redirect = `https://${req.get('host')}${redirectPath}`
    return new google.auth.OAuth2(CONSTANTS.GOOGLE_CLIENT_ID, CONSTANTS.GOOGLE_CLIENT_SECRET, redirect)
}

// tslint:disable-next-line: no-any
export function generateAuthUrl(req: any) {
    const connection = createConnection(req)
    return connection.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope,
    })
}

// tslint:disable-next-line: no-any
export async function getGoogleProfile(req: any) {
    try {
        const client = createConnection(req)
        if (req.query.error === 'access_denied') {
            throw new Error('GOOGLE_ACCESS_DENIED')
        }
        logInfo('received code value: ' + req.query.code)
        logInfo('decoded code value: ' + decodeURIComponent(req.query.code))
        const { tokens } = await client.getToken(decodeURIComponent(req.query.code))
        client.setCredentials(tokens)
        logInfo('userInformation being fetched from oauth2 api')
        const oauth2 = await google.oauth2({
            auth: client,
            version: 'v2',
        })
        const googleProfileFetched = await oauth2.userinfo.get() || {}
        logInfo('userInformation fetched -> ' + JSON.stringify(googleProfileFetched.data))
        return {
            emailId: googleProfileFetched.data.email,
            firstName: googleProfileFetched.data.given_name,
            lastName: googleProfileFetched.data.family_name,
            name: googleProfileFetched.data.name,
        }
    } catch (err) {
        logError('Failed to get user profile: ' + JSON.stringify(err))
    }
    return {}
}

// tslint:disable-next-line: no-any
export async function getQueryParams(queryObj: any) {
    return '?' + Object.keys(queryObj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`)
      .join('&')
}

// tslint:disable-next-line: no-any
export async function createSession(emailId: string, req: any, res: any) {
    // tslint:disable-next-line: no-any
    let grant: { access_token: { token: any }; refresh_token: { token: any } }
    const scope = 'offline_access'
    const keycloakClient = getKeyCloakClient()
    logInfo('login in progress')
    // tslint:disable-next-line: no-any
    try {
        grant = await keycloakClient.grantManager.obtainDirectly(emailId, undefined, undefined, scope)
    } catch (err) {
        logError('googleOauthHelper: createSession failed')
        throw new Error('unable to create session')
    }
    keycloakClient.storeGrant(grant, req, res)
    req.kauth.grant = grant
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line: no-any
        keycloakClient.authenticated(req, (error: any) => {
            if (error) {
                logError('googleauthhelper:createSession error creating session')
                reject('GOOGLE_CREATE_SESSION_FAILED')
            } else {
                resolve({access_token: grant.access_token.token, refresh_token: grant.refresh_token.token})
            }
        })
    })
}
