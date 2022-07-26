import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { getGoogleProfile } from './googleOAuthHelper'
import { createUserWithMailId, fetchUserByEmailId, updateKeycloakSession } from './ssoUserHelper'

export const googleAuth = express.Router()

const googleScope = 'https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile'
const otherParams = '&prompt=consent&response_type=code&scope='
const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?'
const HTTPS_PROTO = 'https://'
const clientIdWithValue = 'client_id=' + CONSTANTS.GOOGLE_CLIENT_ID
const redirectUri = '&redirect_uri='

googleAuth.get(['/auth', '/authV2', '/testauth'], async (req, res) => {
    let redirectUrlHost = HTTPS_PROTO + req.hostname
    if (req.url.substring(req.url.lastIndexOf('/')) === '/auth') {
        redirectUrlHost = redirectUrlHost + CONSTANTS.GOOGLE_AUTH_CALLBACK_URL
    } else if (req.url.substring(req.url.lastIndexOf('/')) === '/authV2') {
        redirectUrlHost = redirectUrlHost + '/public/google/sso'
    } else if (req.url.substring(req.url.lastIndexOf('/')) === '/testauth') {
        redirectUrlHost = redirectUrlHost + '/apis/public/v8/google/callback'
    }
    let oAuthParams = clientIdWithValue + redirectUri + redirectUrlHost
    oAuthParams = oAuthParams + otherParams + googleScope
    res.redirect(googleUrl + oAuthParams)
})

googleAuth.get('/callback', async (req, res) => {
    const host = req.get('host')
    let resRedirectUrl = `https://${host}/page/home`
    try {
        logInfo('Successfully received callback from google. Received query params -> ' + JSON.stringify(req.query))
        const googleProfile = await getGoogleProfile(req)
        logInfo('Successfully got authenticated with google...')
        logInfo('Email: ' + googleProfile.emailId)
        let result: { errMessage: string, userExist: boolean,  }
        result = await fetchUserByEmailId(googleProfile.emailId)
        logInfo('isUserExist ? ' + result.userExist + ', errorMessage ? ' + result.errMessage)
        let isFirstTimeUser = false
        if (result.errMessage === '') {
            let createResult: { errMessage: string, userCreated: boolean, userId: string }
            if (!result.userExist) {
                createResult = await createUserWithMailId(googleProfile.emailId,
                    googleProfile.firstName, googleProfile.lastName)
                if (createResult.errMessage !== '') {
                    result.errMessage = createResult.errMessage
                }
                isFirstTimeUser = true
            }

            if (result.errMessage === '') {
                let keycloakResult: {
                    access_token: string, errMessage: string, keycloakSessionCreated: boolean, refresh_token: string
                }
                keycloakResult = await updateKeycloakSession(googleProfile.emailId, req, res)
                logInfo('Keycloak Session Details:: ' + JSON.stringify(keycloakResult))
                if (keycloakResult.errMessage !== '') {
                    result.errMessage = keycloakResult.errMessage
                } else {
                    logInfo('trying to identify is first time user...')
                    if (req.session) {
                        logInfo('Request has session object: ' + JSON.stringify(req.session))
                        if (req.session.hasOwnProperty('rootOrgId') &&
                            req.session.hasOwnProperty('channel') &&
                            req.session.rootOrgId === CONSTANTS.CUSTODIAN_ORG_ID &&
                            req.session.channel === CONSTANTS.CUSTODIAN_ORG_CHANNEL &&
                            req.session.hasOwnProperty('userPositions') &&
                            req.session.userPositions.length === 0) {
                                isFirstTimeUser = true
                        }
                    } else {
                        logError('request object do not have session')
                    }
                }
            }
        }
        if (result.errMessage !== '') {
            logInfo('Received error in processing... Error ' + result.errMessage)
            resRedirectUrl = `https://${host}/public/logout?error=` + encodeURIComponent(JSON.stringify(result.errMessage))
        } else if (isFirstTimeUser) {
            resRedirectUrl = `https://${host}/public/welcome`
        }
    } catch (err) {
        logError('Failed to process callback event. Error: ' + JSON.stringify(err))
        resRedirectUrl = `https://${host}/public/logout?error=` + encodeURIComponent(JSON.stringify(err))
    }
    res.redirect(resRedirectUrl)
})
