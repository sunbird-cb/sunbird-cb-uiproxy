const { google } = require('googleapis')
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { decodeToken } from './jwtHelper'
const _ = require('lodash')

const redirectPath = '/apis/public/v8/google/callback'
const defaultScope = ['https://www.googleapis.com/auth/userinfo.email']

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
        }
        if (!_.get(userInfo, 'name') || !_.get(userInfo, 'email')) {
            logInfo('userInformation being fetched from oauth2 api')
            const oauth2 = await google.oauth2({
            auth: client,
            version: 'v2',
            })
            const googleProfileFetched = await oauth2.userinfo.get() || {}
            userInfo = googleProfileFetched.data || {}
        }
        logInfo('userInformation fetched successfully. UserInfo: ' + JSON.stringify(userInfo))
        return {
            emailId: userInfo.email,
            name: userInfo.name,
        }
    } catch (err) {
        logError('Failed to get user profile: ' + JSON.stringify(err))
    }
    return {}
}
