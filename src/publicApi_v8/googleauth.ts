import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { createSession, createUserWithMailId, fetchUserByEmailId, getGoogleProfile, getQueryParams } from './googleOAuthHelper'

export const googleAuth = express.Router()
const lodash = require('lodash')

const REQUIRED_STATE_FIELD = ['client_id', 'redirect_uri', 'error_callback', 'scope', 'state',
'response_type', 'version', 'merge_account_process']
const KEYCLOACK_AUTH_CALLBACK_STRING = 'auth_callback=1'

googleAuth.get('/auth', async (req, res) => {
    logInfo('Received host ? ' + req.hostname)
    let oAuthParams = 'client_id=' + CONSTANTS.GOOGLE_CLIENT_ID
    oAuthParams = oAuthParams + '&redirect_uri=https://igot-dev.in/apis/public/v8/google/callback&prompt=consent'
    oAuthParams = oAuthParams + '&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email'
    oAuthParams = oAuthParams + '%20https://www.googleapis.com/auth/userinfo.profile'
    const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + oAuthParams
    logInfo('google Url -> ' + googleUrl)
    res.redirect(googleUrl)
})

googleAuth.get('/callback', async (req, res) => {
    let newUserDetails = {}
    try {
        const reqQuery = lodash.pick(JSON.parse(req.query.state), REQUIRED_STATE_FIELD)
        const googleProfile = await getGoogleProfile(req)
        logInfo('Successfully got authenticated with google...')
        logInfo('Email: ' + googleProfile.emailId)
        const isUserExist =  await fetchUserByEmailId(googleProfile.emailId)
        logInfo('is Sunbird User Exist ? ' + isUserExist)
        if (!isUserExist) {
           newUserDetails = await createUserWithMailId(googleProfile.emailId,
            googleProfile.name, googleProfile.surname ? googleProfile.surname : '')
        }
        const keyCloakToken = await createSession(googleProfile.emailId, reqQuery, req, res)
        logInfo('keyCloakToken fetched' + JSON.stringify(keyCloakToken))
        let redirectUrl = reqQuery.redirect_uri.replace(KEYCLOACK_AUTH_CALLBACK_STRING, '')
        if (reqQuery.client_id === 'desktop') {
          redirectUrl = reqQuery.redirect_uri.split('?')[0] + getQueryParams(keyCloakToken)
        }
        logInfo('redirect url ' + redirectUrl)
        logInfo('google sign in success', JSON.stringify({googleProfile, isUserExist, newUserDetails, redirectUrl}))
        res.status(200).send(googleProfile)
    } catch (err) {
        logError('Failed to process callback event. Error: ' + JSON.stringify(err))
    }
})
