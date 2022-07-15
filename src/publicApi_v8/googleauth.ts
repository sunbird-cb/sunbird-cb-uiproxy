import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { createSession, createUserWithMailId, fetchUserByEmailId, getGoogleProfile } from './googleOAuthHelper'

export const googleAuth = express.Router()

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
        logInfo('Successfully received callback from google. Received query params -> ' + JSON.stringify(req.query))

        const googleProfile = await getGoogleProfile(req)
        logInfo('Successfully got authenticated with google...')
        logInfo('Email: ' + googleProfile.emailId)
        const isUserExist =  await fetchUserByEmailId(googleProfile.emailId)
        logInfo('is Sunbird User Exist ? ' + isUserExist)
        if (!isUserExist) {
            newUserDetails = await createUserWithMailId(googleProfile.emailId,
            googleProfile.firstName, googleProfile.lastName)
        }
        const keyCloakToken = await createSession(googleProfile.emailId, req, res)
        logInfo('keyCloakToken fetched' + JSON.stringify(keyCloakToken))
        const host = req.get('host')
        const redirectUrl = `https://${host}/protected/v8/resource/`
        logInfo('redirect url ' + redirectUrl)
        logInfo('google sign in success', JSON.stringify({googleProfile, isUserExist, newUserDetails, redirectUrl}))

        res.redirect(redirectUrl)
    } catch (err) {
        logError('Failed to process callback event. Error: ' + JSON.stringify(err))
    }
})
