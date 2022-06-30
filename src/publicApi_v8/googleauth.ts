import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
const { googleOauth } = require('googleOauthHelper')

export const googleAuth = express.Router()

googleAuth.get('/auth', async (req, res) => {
    logInfo('Received host ? ' + req.hostname)
    let oAuthParams = 'client_id=' + CONSTANTS.GOOGLE_CLIENT_ID + '&redirect_uri=https://igot-dev.in/google/callback&prompt=consent'
    oAuthParams = oAuthParams + '&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email'
    const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + oAuthParams
    logInfo('google Url -> ' + googleUrl)
    res.redirect(googleUrl)
})

googleAuth.post('/callback', async (req, res) => {
    try {
        const googleProfile = await googleOauth.getProfile(req)
        logInfo('Successfully got authenticated with google...')
        logInfo('Email: ' + googleProfile.emailId)
        res.status(200).send(googleProfile)
    } catch (err) {
        logError('Failed to process callback event. Error: ' + JSON.stringify(err))
    }
})
