import axios from 'axios'
import express from 'express'
import { axiosRequestConfig } from '../configs/request.config'
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
    logInfo('Code Param Value -> ' + req.query.code)

    const tokenResponse = await axios({
        ...axiosRequestConfig,
        data: {
            client_id: CONSTANTS.PARICHAY_CLIENT_ID,
            client_secret: CONSTANTS.PARICHAY_CLIENT_SECRET,
            code: req.query.code,
            // tslint:disable-next-line: max-line-length
            code_verifier: 'PC0_RZIP7avm_b2CjbJ6avC7cu870JTVN5VwsC..Ot8h0iqL0RQ0veSFU62wnvMV4tCXI~ozwwrJmDCp5H6k_nW.onAK9SzbndSrcAYv5lc~IBptKPYNChhslg1C98kr',
            grant_type: 'authorization_code',
            redirect_uri: 'https://igot-dev.in/apis/public/v8/parichay/callback',
        },
        method: 'POST',
        url: 'https://parichay.staging.nic.in/pnv1/salt/api/oauth2/token',
    })
    logInfo('Received response for Token API -> ' + JSON.stringify(tokenResponse.data))

    const userDetailResponse = await axios({
        ...axiosRequestConfig,
        headers: {
            Authorization: tokenResponse.data.access_token,
        },
        method: 'GET',
        url: 'https://parichay.staging.nic.in/v1/salt/api/oauth2/userdetails',
    })
    logInfo('Received user Details -> ' + JSON.stringify(userDetailResponse.data))
    res.status(200).send(userDetailResponse.data)
})
