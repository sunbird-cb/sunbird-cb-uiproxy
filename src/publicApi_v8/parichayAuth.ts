import axios from 'axios'
import express from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { getCurrnetExpiryTime } from '../utils/jwtHelper'
import { logError, logInfo } from '../utils/logger'
import { createUserWithMailId, fetchUserByEmailId, updateKeycloakSession } from './ssoUserHelper'

export const parichayAuth = express.Router()

parichayAuth.get('/auth', async (req, res) => {
    logInfo('Received host : ' + req.hostname)
    const redirectUrl = 'https://' + req.hostname + CONSTANTS.PARICHAY_AUTH_CALLBACK_URL
    let oAuthParams = 'client_id=' + CONSTANTS.PARICHAY_CLIENT_ID
    oAuthParams = oAuthParams + '&redirect_uri=' + redirectUrl
    oAuthParams = oAuthParams + '&response_type=code&scope=user_details'
    oAuthParams = oAuthParams + '&code_challenge=' + CONSTANTS.PARICHAY_CODE_CHALLENGE
    oAuthParams = oAuthParams + '&code_challenge_method=S256'
    const parichayUrl = CONSTANTS.PARICHAY_AUTH_URL + '?' + oAuthParams
    res.redirect(parichayUrl)
})

parichayAuth.get('/callback', async (req, res) => {
    const host = req.get('host')
    if (!req.query.code) {
        res.redirect(`https://${host}/public/logout?error=` + encodeURIComponent('Failed to login in Parichay. Code param is missing.'))
        return
    }
    let resRedirectUrl = `https://${host}/page/home`
    try {
        const redirectUrl = 'https://' + req.hostname + CONSTANTS.PARICHAY_AUTH_CALLBACK_URL
        const tokenResponse = await axios({
            ...axiosRequestConfig,
            data: {
                client_id: CONSTANTS.PARICHAY_CLIENT_ID,
                client_secret: CONSTANTS.PARICHAY_CLIENT_SECRET,
                code: decodeURIComponent(req.query.code),
                // tslint:disable-next-line: max-line-length
                code_verifier: CONSTANTS.PARICHAY_CODE_VERIFIER,
                grant_type: 'authorization_code',
                redirect_uri: redirectUrl,
            },
            method: 'POST',
            url: CONSTANTS.PARICHAY_TOKEN_URL,
        })
        if (req.session) {
            req.session.parichayToken = tokenResponse.data
            req.session.cookie.expires = new Date(getCurrnetExpiryTime(tokenResponse.data.access_token))
            logInfo('Parichay Token is set in request Session.' + tokenResponse.data.access_token)
        } else {
            logError('Failed to set parichay token in req session. Session not available...')
        }
        const userDetailResponse = await axios({
            ...axiosRequestConfig,
            headers: {
                Authorization: tokenResponse.data.access_token,
            },
            method: 'GET',
            url: CONSTANTS.PARICHAY_USER_DETAILS_URL,
        })

        logInfo('User information from Parichay : ' + JSON.stringify(userDetailResponse.data))
        let result: { errMessage: string, rootOrgId: string, userExist: boolean, }
        result =  await fetchUserByEmailId(userDetailResponse.data.loginId)
        logInfo('isUserExist ? ' + result.userExist + 'rootOrgId: ? ' + result.rootOrgId + ', errorMessage ? ' + result.errMessage)
        let isFirstTimeUser = false
        if (result.errMessage === '') {
            let createResult: { errMessage: string, userCreated: boolean, userId: string }
            if (!result.userExist) {
                logInfo('Sunbird User does not exist for email: ' + userDetailResponse.data.loginId)
                createResult = await createUserWithMailId(userDetailResponse.data.loginId,
                    userDetailResponse.data.FirstName, userDetailResponse.data.LastName)
                if (createResult.errMessage !== '') {
                    result.errMessage = createResult.errMessage
                }
                isFirstTimeUser = true
            } else {
                logInfo('result.rootOrgId = ' + result.rootOrgId + ', XChannelId = ' + CONSTANTS.X_Channel_Id)
                if (result.rootOrgId !== '' && result.rootOrgId === CONSTANTS.X_Channel_Id) {
                    isFirstTimeUser = true
                }
            }
            if (result.errMessage === '') {
                let keycloakResult: {
                    access_token: string, errMessage: string, keycloakSessionCreated: boolean, refresh_token: string
                }
                keycloakResult = await updateKeycloakSession(userDetailResponse.data.loginId, req, res)
                if (keycloakResult.errMessage !== '') {
                    result.errMessage = keycloakResult.errMessage
                }
            }
        }
        if (result.errMessage !== '') {
            logInfo('Received error from user search. ')
            resRedirectUrl = `https://${host}/public/logout?error=` + encodeURIComponent(JSON.stringify(result.errMessage))
        } else if (isFirstTimeUser) {
            resRedirectUrl = `https://${host}/public/welcome`
        } else {
            resRedirectUrl = `https://${host}/page/home`
        }
    } catch (err) {
        logError('Failed to process callback API.. error: ' + JSON.stringify(err))
        resRedirectUrl = `https://${host}/public/logout?error=` + encodeURIComponent('Internal Server Error. Please contact administrator.')
    }
    res.redirect(resRedirectUrl)
})
