import axios from 'axios'
const async = require('async')
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { PERMISSION_HELPER } from '../utils/permissionHelper'
import { getKeyCloakClient } from './keycloakHelper'

const API_END_POINTS = {
    kongAssignRoleUser: `${CONSTANTS.KONG_API_BASE}/user/private/v1/assign/role`,
    kongSignUpUser: `${CONSTANTS.KONG_API_BASE}/user/v2/signup`,
    kongUpdateUser: `${CONSTANTS.KONG_API_BASE}/user/private/v1/update`,
    kongUserRead: (userId: string) => `${CONSTANTS.KONG_API_BASE}/user/private/v1/read/${userId}`,
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
        errMessage : '', userExist : false,
    }

    if (sbUserSearchRes.data.responseCode.toUpperCase() === 'OK') {
        logInfo('Received user search response.')
        if (sbUserSearchRes.data.result.response.count === 0) {
            logInfo('user accound doesnot exist. returning false')
        } else if (sbUserSearchRes.data.result.response.count === 1) {
            const contentObj = sbUserSearchRes.data.result.response.content[0]
            const status = contentObj.status
            logInfo('user account exist. Data: ' + JSON.stringify(sbUserSearchRes.data) + ', Status: ' + status)
            if (status === 1) {
                logInfo('user account enabled. returning true')
                result.userExist = true
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

export async function createUserWithMailId(emailId: string, firstNameStr: string, lastNameStr: string) {
    const result = {
        errMessage : '', userCreated : false, userId: '',
    }
    const signUpErr = 'SIGN_UP_ERR-'
    let statusString = ''
    const signUpResponse = await axios({
        ...axiosRequestConfig,
        data: {
            request:
            {
                email: emailId,
                emailVerified: true,
                firstName: firstNameStr,
                lastName : lastNameStr,
        } },
         headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'POST',
        url: API_END_POINTS.kongSignUpUser,
    })
    statusString = signUpResponse.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        result.errMessage = signUpErr + 'FAILED_TO_CREATE_USER'
        return Promise.resolve(result)
    }
    result.userCreated = true
    result.userId = signUpResponse.data.result.userId
    const sbUserReadResponse = await axios({
        ...axiosRequestConfig,
        headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'GET',
        url: API_END_POINTS.kongUserRead(result.userId),
    })
    statusString = sbUserReadResponse.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        result.errMessage = signUpErr + 'FAILED_TO_READ_CREATED_USER'
        return Promise.resolve(result)
    }
    const sbUserOrgId = sbUserReadResponse.data.result.response.rootOrgId
    const sbProfileUpdateReq = {
        profileDetails: {
            employmentDetails: {
                departmentName: sbUserReadResponse.data.result.response.channel,
            },
            personalDetails: {
                firstname: firstNameStr,
                primaryEmail: emailId,
                surname: lastNameStr,
            },
        },
        userId: result.userId,
    }
    const sbUserProfileUpdateResp = await axios({
        ...axiosRequestConfig,
        data: { request: sbProfileUpdateReq },
        headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'PATCH',
        url: API_END_POINTS.kongUpdateUser,
    })
    statusString = sbUserProfileUpdateResp.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        result.errMessage = signUpErr + 'FAILED_TO_UPDATE_USER'
        return Promise.resolve(result)
    }
    const sbAssignRoleResp = await axios({
        ...axiosRequestConfig,
        data: {
            request: {
                organisationId: sbUserOrgId,
                roles: ['PUBLIC'],
                userId: result.userId,
            },
        },
        headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'POST',
        url: API_END_POINTS.kongAssignRoleUser,
    })
    statusString = sbAssignRoleResp.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        result.errMessage = signUpErr + 'FAILED_TO_UPDATE_USER'
        return Promise.resolve(result)
    }
    return Promise.resolve(result)
}

// tslint:disable-next-line: no-any
export async function updateKeycloakSession(emailId: string, req: any, res: any) {
    const scope = 'offline_access'
    const keycloakClient = getKeyCloakClient()
    logInfo('login in progress')
    // tslint:disable-next-line: no-any
    let grant: { access_token: { token: any }; refresh_token: { token: any } }
    const result = {
        access_token: '', errMessage : '', keycloakSessionCreated: false, refresh_token: '',
    }
    try {
        grant = await keycloakClient.grantManager.obtainDirectly(emailId, undefined, undefined, scope)
        logInfo('Received response from Keycloak: ' + JSON.stringify(grant))
        keycloakClient.storeGrant(grant, req, res)
        req.kauth.grant = grant
        // tslint:disable-next-line: no-any
        keycloakClient.authenticated(req, (error: any) => {
            logInfo('ssoUserHelper::keycloakClient::authenticated..')
            if (error) {
                logError('googleauthhelper:createSession error creating session')
                result.errMessage = 'GOOGLE_CREATE_SESSION_FAILED'
            } else {
                try {
                    const userId = req.kauth.grant.access_token.content.sub.split(':')
                    req.session.userId = userId[userId.length - 1]
                    logInfo('userId ::', userId, '------', new Date().toString())
                    req.session.keycloakClientId = CONSTANTS.KEYCLOAK_GOOGLE_CLIENT_ID
                } catch (err) {
                    logError('userId conversation error' + req.kauth.grant.access_token.content.sub, '------', new Date().toString())
                }
                const postLoginRequest = []
                // tslint:disable-next-line: no-any
                postLoginRequest.push((callback: any) => {
                    PERMISSION_HELPER.getCurrentUserRoles(req, callback)
                })
                // tslint:disable-next-line: no-any
                async.series(postLoginRequest, (err: any) =>  {
                    if (err) {
                        logError('error loggin in user', '------', new Date().toString())
                    } else {
                        logInfo(`${process.pid}: User authenticated`, '------', new Date().toString())
                    }
                })
                result.access_token = grant.access_token.token
                result.refresh_token = grant.refresh_token.token
                result.keycloakSessionCreated = true
            }
            return Promise.resolve(result)
        })
    } catch (err) {
        logError('googleOauthHelper: createSession failed. Error: ' + JSON.stringify(err))
        result.errMessage = 'FAILED_TO_CREATE_KEYCLOAK_SESSION'
    }
    return Promise.resolve(result)
}
