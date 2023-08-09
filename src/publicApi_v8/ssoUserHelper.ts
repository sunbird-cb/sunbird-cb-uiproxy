import axios from 'axios'
import lodash from 'lodash'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { getKeyCloakClient } from './keycloakHelper'

const API_END_POINTS = {
    cbExtSignUpUser: `${CONSTANTS.KONG_API_BASE}/user/v1/ext/signup`,
}

export async function fetchUserByEmailId(emailId: string) {
    const sbUserSearchRes = await axios({
        ...axiosRequestConfig,
        data: { request: {
            fields : ['userId', 'status', 'channel', 'rootOrgId', 'organisations'],
            filters: { email: emailId.toLowerCase() },
        } },
        method: 'POST',
        url: CONSTANTS.LEARNER_SERVICE_API_BASE + '/private/user/v1/search',
    })
    const result = {
        errMessage : '', rootOrgId: '', userExist : false,
    }

    if (sbUserSearchRes.data.responseCode.toUpperCase() === 'OK') {
        if (sbUserSearchRes.data.result.response.count === 0) {
            logInfo('user accound doesnot exist. returning false')
        } else if (sbUserSearchRes.data.result.response.count === 1) {
            const contentObj = sbUserSearchRes.data.result.response.content[0]
            const status = contentObj.status
            logInfo('user account exist. Data: ' + JSON.stringify(sbUserSearchRes.data) + ', Status: ' + status)
            if (status === 1) {
                logInfo('user account enabled. returning true')
                result.userExist = true
                result.rootOrgId = contentObj.rootOrgId
            } else {
                logInfo('user account is diabled. throwing error')
                result.errMessage = 'Account Disabled. Please contact Admin.'
            }
        } else {
            result.errMessage = 'More than one user account exists. Please contact Admin.'
        }
    } else {
        logError('googleOauthHelper: fetchUserByEmailId failed' + JSON.stringify(sbUserSearchRes.data))
        result.errMessage = 'Failed to verify email exist. Internal Server Error.'
    }
    return Promise.resolve(result)
}

export async function createUserWithMailId(emailId: string, firstNameStr: string, lastNameStr: string, mobileNoStr = '') {
    const result = {
        errMessage : '', userCreated : false, userId: '',
    }
    const signUpErr = 'SIGN_UP_ERR-'
    let statusString = ''
    let _reqPayload = {
        request:
        {
            email: emailId,
            emailVerified: true,
            firstName: firstNameStr.trim() + ' ' + lastNameStr.trim(),
            phone: '',
            roles: [ 'PUBLIC' ],
        },
    }
    let _validPhone
    try {
        // Check mobile number is valid for length
        if (mobileNoStr && mobileNoStr.length >= 10) {
            // Check phone number starts with `+` and country code belongs to 91
            if (mobileNoStr.charAt(0) === '+' && mobileNoStr.slice(1, 3) === '91' &&
                mobileNoStr.slice(3, mobileNoStr.length).length === 10) {
                _validPhone = mobileNoStr.slice(3, mobileNoStr.length)
            } else if (mobileNoStr.slice(0, 2) === '91' && mobileNoStr.slice(2, mobileNoStr.length).length === 10) {
                // Check phone number starts with 91
                _validPhone = mobileNoStr.slice(2, mobileNoStr.length)
            } else {
                // Accept the incoming phone number as it is; since it is not prefixed with `+` or country code
                _validPhone = mobileNoStr
            }
        }
    } catch (error) {
        logError('ssoUserHelper:createUserWithMailId - Error while validating phone number')
    }
    // Update the request object
    if (_validPhone) {
        _reqPayload.request.phone = _validPhone
    } else {
        _reqPayload = lodash.omit(_reqPayload, 'phone')
    }
    const signUpResponse = await axios({
        ...axiosRequestConfig,
        data: _reqPayload,
         headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'POST',
        url: API_END_POINTS.cbExtSignUpUser,
    })
    statusString = signUpResponse.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        result.errMessage = signUpErr + 'FAILED_TO_CREATE_USER'
        return Promise.resolve(result)
    }
    result.userCreated = true
    result.userId = signUpResponse.data.result.userId
    return Promise.resolve(result)
}

// tslint:disable-next-line: no-any
export async function updateKeycloakSession(emailId: string, req: any, res: any) {
    const scope = 'offline_access'
    const keycloakClient = getKeyCloakClient()
    // tslint:disable-next-line: no-any
    let grant: { access_token: { token: any }; refresh_token: { token: any } }
    const result = {
        access_token: '', errMessage : '', keycloakSessionCreated: false, refresh_token: '',
    }
    try {
        grant = await keycloakClient.grantManager.obtainDirectly(emailId, undefined, undefined, scope)
        keycloakClient.storeGrant(grant, req, res)
        req.kauth.grant = grant
        const userId = req.kauth.grant.access_token.content.sub.split(':')
        req.session.userId = userId[userId.length - 1]
        logInfo('userId ::', userId, '------', new Date().toString())
        req.session.keycloakClientId = CONSTANTS.KEYCLOAK_GOOGLE_CLIENT_ID
        req.session.keycloakClientSecret = CONSTANTS.KEYCLOAK_GOOGLE_CLIENT_SECRET
        result.access_token = grant.access_token.token
        result.refresh_token = grant.refresh_token.token
        result.keycloakSessionCreated = true
        // tslint:disable-next-line: no-any
        keycloakClient.authenticated(req, (error: any) => {
            logInfo('ssoUserHelper::keycloakClient::authenticated..')
            if (error) {
                logError('googleauthhelper:createSession error creating session')
                result.errMessage = 'GOOGLE_CREATE_SESSION_FAILED'
            }
        })
        return Promise.resolve(result)
    } catch (err) {
        logError('googleOauthHelper: createSession failed. Error: ' + JSON.stringify(err))
        result.errMessage = 'FAILED_TO_CREATE_KEYCLOAK_SESSION'
    }
    return Promise.resolve(result)
}
