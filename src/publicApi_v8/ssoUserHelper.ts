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
    const sbUserExistsResponse = await axios({
        ...axiosRequestConfig,
        headers: {
            Authorization: CONSTANTS.SB_API_KEY,
        },
        method: 'GET',
        url: CONSTANTS.KONG_API_BASE + '/user/v1/exists/email/' + emailId,
    })
    if (sbUserExistsResponse.data.responseCode.toUpperCase() === 'OK') {
        return sbUserExistsResponse.data.result.exists
    } else {
        logError('googleOauthHelper: fetchUserByEmailId failed' + JSON.stringify(sbUserExistsResponse.data))
    }
    return false
}

export async function createUserWithMailId(emailId: string, firstNameStr: string, lastNameStr: string) {
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
        throw new Error('FAILED_TO_CREATE_USER')
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
        throw new Error('FAILED_TO_READ_CREATED_USER')
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
        throw new Error('FAILED_TO_UPDATE_USER')
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
        throw new Error('FAILED_TO_UPDATE_USER')
    }
    return createResponse.data
}

// tslint:disable-next-line: no-any
const processTokenResponse = async (err: any, data: any) => {
    logInfo('Inside token callback function..')
    if (err) {
        logError('Received error from keycloak: ' + JSON.stringify(err))
    }
    if (data) {
        logInfo('Received successful response from Keycloak: ' + JSON.stringify(data))
    }
}

// tslint:disable-next-line: no-any
export async function updateKeycloakSession(emailId: string, req: any, res: any) {
    const scope = 'offline_access'
    const keycloakClient = getKeyCloakClient()
    logInfo('login in progress')
    try {
        try {
            logInfo('Calling token API with callback function...')
            await keycloakClient.grantManager.obtainDirectly(emailId, undefined, processTokenResponse, scope)
            logInfo('token API with callback function function is successfull...')
        } catch (err) {
            logError('Failed with callback API. ' + JSON.stringify(err))
        }
        const grant = await keycloakClient.grantManager.obtainDirectly(emailId, undefined, undefined, scope)
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
        throw new Error('unable to create session')
    }
}
