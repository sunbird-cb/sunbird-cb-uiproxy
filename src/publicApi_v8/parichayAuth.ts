import axios from 'axios'
import express from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logInfo } from '../utils/logger'
import { createUserWithMailId, fetchUserByEmailId, updateKeycloakSession } from './ssoUserHelper'

export const parichayAuth = express.Router()

parichayAuth.get('/auth', async (req, res) => {
    logInfo('Received host : ' + req.hostname)
    let oAuthParams = 'client_id=' + CONSTANTS.PARICHAY_CLIENT_ID
    oAuthParams = oAuthParams + '&redirect_uri=' + CONSTANTS.PARICHAY_CALLBACK_URL
    oAuthParams = oAuthParams + '&response_type=code&scope=user_details'
    oAuthParams = oAuthParams + '&code_challenge=' + CONSTANTS.PARICHAY_CODE_CHALLENGE
    oAuthParams = oAuthParams + '&code_challenge_method=S256'
    const parichayUrl = CONSTANTS.PARICHAY_AUTH_URL + '?' + oAuthParams
    res.redirect(parichayUrl)
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
            code_verifier: CONSTANTS.PARICHAY_CODE_VERIFIER,
            grant_type: 'authorization_code',
            redirect_uri: CONSTANTS.PARICHAY_CALLBACK_URL,
        },
        method: 'POST',
        url: CONSTANTS.PARICHAY_TOKEN_URL,
    })

    const userDetailResponse = await axios({
        ...axiosRequestConfig,
        headers: {
            Authorization: tokenResponse.data.access_token,
        },
        method: 'GET',
        url: CONSTANTS.PARICHAY_USER_DETAILS_URL,
    })

    const isUserExist =  await fetchUserByEmailId(userDetailResponse.data.loginId)
    if (!isUserExist) {
        logInfo('is Sunbird User Exist not exist for email: ' + userDetailResponse.data.loginId)
        await createUserWithMailId(userDetailResponse.data.loginId,
            userDetailResponse.data.FirstName, userDetailResponse.data.LastName)
    }
    await updateKeycloakSession(userDetailResponse.data.loginId, req, res)
    const host = req.get('host')
    const redirectUrl = `https://${host}/protected/v8/resource/`
    res.redirect(redirectUrl)
})
