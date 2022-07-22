import axios from 'axios'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { getKeyCloakClient } from './keycloakHelper'

const API_END_POINTS = {
    kongAssignRoleUser: `${CONSTANTS.KONG_API_BASE}/user/private/v1/assign/role`,
    kongCreateUser: `${CONSTANTS.KONG_API_BASE}/user/v2/signup`,
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
            let contentObj = sbUserSearchRes.data.result.response.content[0]
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
    const signUpErr = 'SIGN_UP_ERR-'
    let statusString = ''
    const createResponse = await axios({
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
        url: API_END_POINTS.kongCreateUser,
    })
    statusString = createResponse.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        throw new Error(signUpErr + 'FAILED_TO_CREATE_USER')
    }
    const sbUserId = createResponse.data.result.userId
    const sbUserReadResponse = await axios({
        ...axiosRequestConfig,
        headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'GET',
        url: API_END_POINTS.kongUserRead(sbUserId),
    })
    statusString = sbUserReadResponse.data.params.status
    if (statusString.toUpperCase() !== 'SUCCESS') {
        throw new Error(signUpErr + 'FAILED_TO_READ_CREATED_USER')
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
        userId: sbUserId,
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
        throw new Error(signUpErr + 'FAILED_TO_UPDATE_USER')
    }
    const sbAssignRoleResp = await axios({
        ...axiosRequestConfig,
        data: {
            request: {
                organisationId: sbUserOrgId,
                roles: ['PUBLIC'],
                userId: sbUserId,
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
        throw new Error(signUpErr + 'FAILED_TO_UPDATE_USER')
    }
    return createResponse.data
}

// tslint:disable-next-line: no-any
export async function updateKeycloakSession(emailId: string, req: any, res: any) {
    const scope = 'offline_access'
    const keycloakClient = getKeyCloakClient()
    logInfo('login in progress')
    // tslint:disable-next-line: no-any
    let grant: { access_token: { token: any }; refresh_token: { token: any } }
    try {
        grant = await keycloakClient.grantManager.obtainDirectly(emailId, undefined, undefined, scope)
        logInfo('Received response from Keycloak: ' + JSON.stringify(grant))
        keycloakClient.storeGrant(grant, req, res)
        req.kauth.grant = grant
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line: no-any
            keycloakClient.authenticated(req, (error: any) => {
                if (error) {
                    logError('googleauthhelper:createSession error creating session')
                    reject('GOOGLE_CREATE_SESSION_FAILED')
                } else {
                    resolve({access_token: grant.access_token.token, refresh_token: grant.refresh_token.token})
                }
            })
        })
    } catch (err) {
        logError('googleOauthHelper: createSession failed')
        logError(JSON.stringify(err))
        throw new Error('Keycloak Service Unavilable.')
    }
}
