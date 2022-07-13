import axios from 'axios'
const { google } = require('googleapis')
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { decodeToken } from './jwtHelper'
import { getKeyCloakClient } from './keycloakHelper'

const _ = require('lodash')

const API_END_POINTS = {
    kongCreateUser: `${CONSTANTS.KONG_API_BASE}/user/v2/signup`,
}

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
        const { tokens } = await client.getToken(req.query.code)
        client.setCredentials(tokens)
        const tokenInfo = decodeToken(tokens.id_token)
        let userInfo = {
            email: tokenInfo.email,
            name: tokenInfo.name,
            surname: '',
        }
        if (!_.get(userInfo, 'name') || !_.get(userInfo, 'email')) {
            logInfo('userInformation being fetched from oauth2 api')
            const oauth2 = await google.oauth2({
            auth: client,
            version: 'v2',
            })
            const googleProfileFetched = await oauth2.userinfo.get() || {}
            userInfo = googleProfileFetched.data || {}
            logInfo('userInformation fetched -> ' + JSON.stringify(googleProfileFetched.data))
        }
        logInfo('userInformation fetched successfully. UserInfo: ' + JSON.stringify(userInfo))
        return {
            emailId: userInfo.email,
            name: userInfo.name,
            surname: userInfo.surname,
        }
    } catch (err) {
        logError('Failed to get user profile: ' + JSON.stringify(err))
    }
    return {}
}

export async function fetchUserByEmailId(emailId: string) {
    const sbUserExistsResponse = await axios({
        ...axiosRequestConfig,
        headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'GET',
        url: CONSTANTS.KONG_API_BASE + '/user/v1/exists/email/' + emailId,
    })
    if (sbUserExistsResponse.data.responseCode.toUpperCase() === 'OK') {
        return sbUserExistsResponse.data.result.exists
    } else {
        logError('googleOauthHelper: fetchUserByEmailId failed' + JSON.stringify(sbUserExistsResponse.data))
    }
    return false
}

export async function createUserWithMailId(emailId: string, firstName: string, lastName: string) {
    const response = await axios({
        ...axiosRequestConfig,
        data: { request: {
            email: emailId,
            emailVerified: true, firstName,
            lastName,
        } },
         headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'POST',
        url: API_END_POINTS.kongCreateUser,
    })
    if (response.data.responseCode === 'CLIENT_ERROR') {
        throw new Error('FAILED_TO_CREATE_USER')
    } else {
        return response.data
    }
}

// tslint:disable-next-line: no-any
export async function getQueryParams(queryObj: any) {
    return '?' + Object.keys(queryObj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`)
      .join('&')
}

// tslint:disable-next-line: no-any
export async function createSession(emailId: string, reqQuery: any, req: any, res: any) {
    // tslint:disable-next-line: no-any
    let grant: { access_token: { token: any }; refresh_token: { token: any } }
    const scope = 'offline_access'
    const keycloakClient = getKeyCloakClient()
    if (_.get(req, 'session.mergeAccountInfo.initiatorAccountDetails') || reqQuery.merge_account_process === '1') {
        grant = await keycloakClient.grantManager.obtainDirectly(emailId, undefined, undefined, scope)
        logInfo('grant received', JSON.stringify(grant.access_token.token))
        if (!['android', 'desktop'].includes(reqQuery.client_id)) {
            req.session.mergeAccountInfo.mergeFromAccountDetails = {
              sessionToken: grant.access_token.token,
            }
          }
        return {
            access_token: grant.access_token.token,
            refresh_token: grant.refresh_token.token,
        }
    } else {
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
}
