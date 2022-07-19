import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { getGoogleProfile } from './googleOAuthHelper'
import { createUserWithMailId, fetchUserByEmailId, updateKeycloakSession } from './ssoUserHelper'

export const googleAuth = express.Router()

googleAuth.get('/auth', async (req, res) => {
    logInfo('Received host ? ' + req.hostname)
    let oAuthParams = 'client_id=' + CONSTANTS.GOOGLE_CLIENT_ID
    oAuthParams = oAuthParams + '&redirect_uri=' + CONSTANTS.GOOGLE_CALLBACK_URL + '&prompt=consent'
    oAuthParams = oAuthParams + '&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email'
    oAuthParams = oAuthParams + '%20https://www.googleapis.com/auth/userinfo.profile'
    const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + oAuthParams
    logInfo('google Url -> ' + googleUrl)
    res.redirect(googleUrl)
})

googleAuth.get('/callback', async (req, res) => {
    try {
        logInfo('Successfully received callback from google. Received query params -> ' + JSON.stringify(req.query))
        const googleProfile = await getGoogleProfile(req)
        logInfo('Successfully got authenticated with google...')
        logInfo('Email: ' + googleProfile.emailId)
        const isUserExist =  await fetchUserByEmailId(googleProfile.emailId)
        logInfo('is Sunbird User Exist ? ' + isUserExist)
        if (!isUserExist) {
            await createUserWithMailId(googleProfile.emailId,
            googleProfile.firstName, googleProfile.lastName)
        }
        await updateKeycloakSession(googleProfile.emailId, req, res)
        const host = req.get('host')
        const redirectUrl = `https://${host}/protected/v8/resource/`
        res.redirect(redirectUrl)
    } catch (err) {
        logError('Failed to process callback event. Error: ' + JSON.stringify(err))
    }
})
