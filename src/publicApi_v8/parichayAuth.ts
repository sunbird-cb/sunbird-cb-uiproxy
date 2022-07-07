import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logInfo } from '../utils/logger'

export const parichayAuth = express.Router()

parichayAuth.get('/auth', async (req, res) => {
    logInfo('Received host : ' + req.hostname)
    let oAuthParams = 'client_id=' + CONSTANTS.PARICHAY_CLIENT_ID
    oAuthParams = oAuthParams + '&redirect_uri=https://igot-dev.in/apis/public/v8/parichay/callback'
    oAuthParams = oAuthParams + '&response_type=code&scope=user_details'
    oAuthParams = oAuthParams + '&code_challenge=pHPBodvujcHz5TNz50MYzwYI915lZkxyspfifbMywDo'
    oAuthParams = oAuthParams + '&code_challenge_method=S256'
    const googleUrl = 'https://parichay.staging.nic.in/pnv1/oauth2/authorize?' + oAuthParams
    logInfo('parichay Url -> ' + googleUrl)
    res.redirect(googleUrl)
})

parichayAuth.get('/callback', async (req, res) => {
    logInfo('Query Params -> ' + req.query)
    res.status(200)
})
