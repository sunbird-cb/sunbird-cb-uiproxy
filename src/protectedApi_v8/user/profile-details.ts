import axios from 'axios'
import { Router } from 'express'
import * as fs from 'fs'
import { axiosRequestConfig, axiosRequestConfigLong, axiosRequestConfigVeryLong } from '../../configs/request.config'
import { IPersonalDetails, ISBUser, ISunbirdbUserResponse } from '../../models/user.model'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { ERROR } from '../../utils/message'
import { extractUserIdFromRequest, extractUserToken } from '../../utils/requestExtract'

const _                 = require('lodash')
const uuidv1            = require('uuid/v1')
const dateFormat        = require('dateformat')

const API_END_POINTS = {
    createOSUserRegistry: (userId: string) => `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/create/profile?userId=${userId}`,
    createSb: `${CONSTANTS.KONG_API_BASE}/user/v3/create`,
    createUserRegistry: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/createUserRegistry`,
    // tslint:disable-next-line: object-literal-sort-keys
    createNodeBBUser: `${CONSTANTS.KONG_API_BASE}/discussion/user/v1/create`,
    getMasterLanguages: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/getMasterLanguages`,
    getMasterNationalities: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/getMasterNationalities`,
    getOSUserRegistryById: (userId: string) => `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/search/profile?userId=${userId}`,
    getProfilePageMeta: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/getProfilePageMeta`,
    getUserRegistry: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/getUserRegistry`,
    getUserRegistryById: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/getUserRegistryById`,
    kongCreateUser: `${CONSTANTS.KONG_API_BASE}/user/v3/create`,
    kongSearchUser: `${CONSTANTS.KONG_API_BASE}/user/v1/search`,
    kongSendWelcomeEmail: `${CONSTANTS.KONG_API_BASE}/private/user/v1/notification/email`,
    kongUpdateUser: `${CONSTANTS.KONG_API_BASE}/user/private/v1/update`,
    kongUserRead: (userId: string) => `${CONSTANTS.KONG_API_BASE}/user/v2/read/${userId}`,
    kongUserResetPassword: `${CONSTANTS.KONG_API_BASE}/private/user/v1/password/reset`,
    // tslint:disable-next-line: object-literal-sort-keys
    migrateRegistry: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/migrateRegistry`,
    resetPassword: `${CONSTANTS.LEARNER_SERVICE_API_BASE}/private/user/v1/password/reset`,
    searchSb: `${CONSTANTS.LEARNER_SERVICE_API_BASE}/private/user/v1/search`,
    sendWelcomeEmail: `${CONSTANTS.LEARNER_SERVICE_API_BASE}/private/user/v1/notification/email`,
    setUserProfileStatus: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/setUserProfileStatus`,
    updateOSUserRegistry: (userId: string) => `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/update/profile?userId=${userId}`,
    userProfileStatus: `${CONSTANTS.USER_PROFILE_API_BASE}/public/v8/profileDetails/userProfileStatus`,
    userRead: (userId: string) => `${CONSTANTS.LEARNER_SERVICE_API_BASE}/v1/user/read/${userId}`,
}

export async function getUserProfileStatus(wid: string) {
    try {
        const response = await axios.post(API_END_POINTS.userProfileStatus, { wid }, {
            ...axiosRequestConfig,
        })
        if (response.data.status) {
            return true
        } else {
            return false
        }
    } catch (err) {
        logError('ERROR GETTING USER PROFILE STATUS FROM  ${API_END_POINTS.userProfileStatus} >', err)
        return false
    }
}

export const profileDeatailsApi = Router()

profileDeatailsApi.post('/createUserRegistry', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        logInfo('Create user registry for', userId)
        const response = await axios.post(API_END_POINTS.createUserRegistry, { ...req.body, userId }, {
            ...axiosRequestConfigLong,
        })
        res.status(response.status).json(response.data)
    } catch (err) {
        logError('ERROR CREATING USER REGISTRY >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

// tslint:disable-next-line: no-identical-functions
profileDeatailsApi.get('/getUserRegistry', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        logInfo('Get user registry for', userId)
        const response = await axios.post(API_END_POINTS.getUserRegistry, { userId }, {
            ...axiosRequestConfig,
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR FETCHING USER REGISTRY >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

// tslint:disable-next-line: no-identical-functions
profileDeatailsApi.get('/getUserRegistryById/:id', async (req, res) => {
    try {
        let userId = req.params.id
        if (!userId) {
            userId = extractUserIdFromRequest(req)
        }
        logInfo('Get user registry for', userId)

        const response = await axios.post(API_END_POINTS.getUserRegistry, { userId }, {
            ...axiosRequestConfig,
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR FETCHING USER REGISTRY >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

profileDeatailsApi.get('/userProfileStatus', async (req, res) => {
    try {
        const org = req.header('org')
        const rootOrg = req.header('rootOrg')
        if (!org || !rootOrg) {
            res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
            return
        }
        req.body.wid = extractUserIdFromRequest(req)
        const response = await axios.post(API_END_POINTS.userProfileStatus, req, {
            ...axiosRequestConfig,
            headers: { rootOrg },
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR FETCHING USER PROFILE STATUS >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

profileDeatailsApi.post('/setUserProfileStatus', async (req, res) => {
    try {
        req.body.wid = extractUserIdFromRequest(req)
        const response = await axios.post(API_END_POINTS.setUserProfileStatus, req, {
            ...axiosRequestConfig,
            headers: req.headers,
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR SETTING USER PROFILE STATUS >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

profileDeatailsApi.get('/getMasterLanguages', async (_req, res) => {
    try {
        const response = await axios.get(API_END_POINTS.getMasterLanguages, {
            ...axiosRequestConfig,
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR FETCHING MASTER LANGUAGES >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

// tslint:disable-next-line: no-identical-functions
profileDeatailsApi.get('/getMasterNationalities', async (_req, res) => {
    try {
        const response = await axios.get(API_END_POINTS.getMasterNationalities, {
            ...axiosRequestConfig,
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR FETCHING MASTER NATIONALITIES >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

profileDeatailsApi.get('/getProfilePageMeta', async (_req, res) => {
    try {
        const response = await axios.get(API_END_POINTS.getProfilePageMeta, {
            ...axiosRequestConfig,
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError('ERROR FETCHING MASTER NATIONALITIES >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

// Api to migrate data from eagleUser opensaber  to new userProfile opensaber
profileDeatailsApi.get('/migrateRegistry', async (req, res) => {
    const filePath = CONSTANTS.USER_BULK_UPLOAD_DIR || process.cwd() + '/user_upload/'
    try {
        // tslint:disable-next-line: no-any
        fs.readFile(filePath + 'migrateRegistry.json', async (err: any, json: any) => {
            if (!err) {
                const obj = JSON.parse(json)
                const widList = obj.widList
                const userId = extractUserIdFromRequest(req)

                logInfo('migrating the registry')
                const response = await axios.post(
                    API_END_POINTS.migrateRegistry,
                    { ...req.body, userId, widList },
                    {
                        ...axiosRequestConfigVeryLong,
                    }
                )
                res.status(response.status).json(response.data)
            } else {
                res.status(500).send(err)
            }
        })
    } catch (err) {
        logError('ERROR CREATING USER REGISTRY >', err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

const channelParamMissing = 'Channel param is missing in personalDetails. Use DeptName as Channel value.'
const emailAdressExist = 'Email address already exist'
const failedToCreateUser = 'Not able to create User in SunBird'
const failedToReadUser = 'Failed to read newly created user details.'
const failedToCreateUserInOpenSaber = 'Not able to create User Registry in Opensaber'
const createUserFailed = 'ERROR CREATING USER >'
const failedToUpdateUser = 'Failed to update user profile data.'
const unknownError = 'Failed due to unknown reason'
const failedToCheckMDOLeader = 'Failed to check MDO_LEADER role exist.'
const errorMDOLeaderExist = 'MDO_LDEADER already exist in org. Can not add another MDO_LEADER.'

// tslint:disable-next-line: all
profileDeatailsApi.post('/createUser', async (req, res) => {
    try {
        const sbChannel = req.body.personalDetails.channel
        if (!sbChannel) {
            res.status(400).send(channelParamMissing)
            return
        }
        let statusString = ''
        let errMsg = ''
        const sbemail_ = req.body.personalDetails.email
        const sbemailVerified_ = true
        const sbfirstName_ = req.body.personalDetails.firstName
        const isEmailRequired = (req.body.personalDetails.isEmailRequired) ? req.body.personalDetails.isEmailRequired : true
        const userRoles = (req.body.personalDetails.roles) ? req.body.personalDetails.roles : undefined
        let sbUserProfile: Partial<ISBUser> = {
            channel: sbChannel, email: sbemail_, emailVerified: sbemailVerified_,
            firstName: sbfirstName_, roles: userRoles,
        }
        if (userRoles === undefined) {
            sbUserProfile = _.omit(sbUserProfile, 'roles')
        } else {
            const roleExist = isMdoLeaderExist(userRoles, 'MDO_LEADER')
            if (roleExist) {
                const roleCheckResp = await axios({
                    ...axiosRequestConfig,
                    data: {
                        request: {
                            filters : {
                                channel: sbChannel,
                                'organisations.roles': [ 'MDO_LEADER' ],
                                status : 1,
                            },
                            limit: 0,
                        },
                    },
                    headers: {
                        Authorization: CONSTANTS.SB_API_KEY,
                        // tslint:disable-next-line: all
                        'x-authenticated-user-token': extractUserToken(req),
                    },
                    method: 'POST',
                    url: API_END_POINTS.kongSearchUser,
                })
                if (roleCheckResp && roleCheckResp.data && roleCheckResp.data.responseCode === 'CLIENT_ERROR') {
                    errMsg = roleCheckResp.data.params ? roleCheckResp.data.params.errmsg : failedToCheckMDOLeader
                    res.status(400).send(roleCheckResp.data)
                    return
                } else {
                    if (roleCheckResp && roleCheckResp.data.result && roleCheckResp.data.result.response
                        && roleCheckResp.data.result.response.count && roleCheckResp.data.result.response.count > 0) {
                            roleCheckResp.data.params.errmsg = errorMDOLeaderExist
                            roleCheckResp.data.params.status = 'FAILED'
                            roleCheckResp.data.responseCode = 'CLIENT_ERROR'
                            roleCheckResp.data.result = {}
                            res.status(400).send(roleCheckResp.data)
                            return
                        }
                }
            }
        }
        let userCreateResponse
        try {
        userCreateResponse = await axios({
            ...axiosRequestConfig,
            data: { request: sbUserProfile },
                headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req),
            },
            method: 'POST',
            url: API_END_POINTS.kongCreateUser,
        })
        } catch (createErr) {
            errMsg = createErr.response.data.params.errmsg
            let errStatus = 500
            if (createErr.response.data.responseCode === 'CLIENT_ERROR') {
                errStatus = 400
            }
            logError ('Failed to create User, error msg : ' + errMsg)
            res.status(errStatus).send(createErr.response.data)
        }
        if (userCreateResponse && userCreateResponse.data && userCreateResponse.data.responseCode === 'CLIENT_ERROR') {
            errMsg = userCreateResponse.data.params ? userCreateResponse.data.params.errmsg : failedToCreateUser
            res.status(400).send(userCreateResponse.data)
            return
        } else if (userCreateResponse) {
            const sbUserId = userCreateResponse.data.result.userId
            const sbUserReadResponse = await axios({
                ...axiosRequestConfig,
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req),
                },
                method: 'GET',
                url: API_END_POINTS.kongUserRead(sbUserId),
            })
            statusString = sbUserReadResponse.data.params.status
            if (statusString.toUpperCase() !== 'SUCCESS') {
                res.status(500).send(failedToReadUser)
                return
            }
            if (CONSTANTS.PORTAL_CREATE_NODEBB_USER === 'true') {
                try {
                // tslint:disable-next-line: no-commented-code
                const nodebbPayload =  {
                    username: sbUserReadResponse.data.result.response.userName,
                    // tslint:disable-next-line: object-literal-sort-keys
                    identifier: sbUserReadResponse.data.result.response.identifier,
                    fullname: sbUserReadResponse.data.result.response.firstName,
                }
                await axios({
                    ...axiosRequestConfig,
                    data: { request: nodebbPayload },
                        headers: {
                        Authorization: CONSTANTS.SB_API_KEY,
                        // tslint:disable-next-line: all
                        'x-authenticated-user-token': extractUserToken(req),
                    },
                    method: 'POST',
                    url: API_END_POINTS.createNodeBBUser,
                })
                } catch (nodeBBerr) {
                    logError('Failed to create NodeBB account for user: ' + sbUserId)
                }
            }
            const sbUserOrgId = sbUserReadResponse.data.result.response.rootOrgId
            const sbProfileUpdateReq = {
                profileDetails: {
                    employmentDetails: {
                        departmentName: sbChannel,
                    },
                    mandatoryFieldsExists: false,
                    personalDetails: {
                        firstname: sbfirstName_,
                        primaryEmail: sbemail_,
                    },
                    verifiedKarmayogi: false,
                },
                userId: sbUserId,
            }
            if (req.body.personalDetails.designation) {
                const arrDesignation = []
                const objDesignation = {
                    designation: (req.body.personalDetails.designation) ? req.body.personalDetails.designation :  '',
                }
                arrDesignation.push(objDesignation)
                const profDetailsPropertyName = 'professionalDetails'
                sbProfileUpdateReq[profDetailsPropertyName] = arrDesignation
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
            if (sbUserProfileUpdateResp.data.responseCode === 'CLIENT_ERROR') {
                errMsg = sbUserProfileUpdateResp.data.params ? sbUserProfileUpdateResp.data.params.errmsg : failedToUpdateUser
                res.status(400).send(errMsg)
                return
            }
            if (isEmailRequired) {
                const passwordResetRequest = {
                    key: 'email',
                    type: 'email',
                    userId: sbUserId,
                }

                // logInfo('Sending Password reset request -> ' + JSON.stringify(passwordResetRequest))
                const passwordResetResponse = await axios({
                    ...axiosRequestConfig,
                    data: { request: passwordResetRequest },
                    headers: {
                        Authorization: CONSTANTS.SB_API_KEY,
                    },
                    method: 'POST',
                    url: API_END_POINTS.kongUserResetPassword,
                })
                // logInfo('Received response from password reset -> ' + JSON.stringify(passwordResetResponse.data))
                statusString = passwordResetResponse.data.params.status
                if (statusString.toUpperCase() === 'SUCCESS') {
                    const welcomeMailRequest = {
                        allowedLoging: 'You can use your email to Login',
                        body: 'Hello',
                        discoverLink: CONSTANTS.HTTPS_HOST + '/page/learn',
                        emailTemplateType: 'iGotWelcome_v4',
                        firstName: sbUserProfile.firstName,
                        link: passwordResetResponse.data.result.link,
                        meetingLink: CONSTANTS.NINE_TO_FIVE_MEETING_LINK,
                        mode: 'email',
                        orgName: sbChannel,
                        recipientEmails: [ sbemail_ ],
                        setPasswordLink: true,
                        signinLink: CONSTANTS.HTTPS_HOST + '/protected/v8/resource',
                        subject: 'Welcome to iGOT Karmayogi... Activate your account now!',
                        welcomeMessage: 'Hello',
                    }

                    const welcomeMailResponse = await axios({
                        ...axiosRequestConfig,
                        data: { request: welcomeMailRequest },
                        headers: {
                            Authorization: CONSTANTS.SB_API_KEY,
                        },
                        method: 'POST',
                        url: API_END_POINTS.kongSendWelcomeEmail,
                    })
                    statusString = welcomeMailResponse.data.params.status
                    if (statusString.toUpperCase() !== 'SUCCESS') {
                        res.status(500).send('Failed to send Welcome Email.')
                        return
                    }
                } else {
                    res.status(500).send('Failed to reset the password for user.')
                    return
                }
            }

            const sbUserProfileResponse: Partial<ISunbirdbUserResponse> = {
                email: sbemail_, firstName: sbfirstName_,
                userId: sbUserId,
                userOrgId: sbUserOrgId,
            }
            res.send(sbUserProfileResponse)
        }
    } catch (err) {
        logError('test1 --> ' + createUserFailed, err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

profileDeatailsApi.patch('/updateUser', async (req, res) => {
    try {
        const response = await axios.patch(API_END_POINTS.kongUpdateUser, req.body, {
            ...axiosRequestConfig,
            headers: {
                Authorization: CONSTANTS.SB_API_KEY,
            },
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToUpdateUser + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: unknownError,
            }
        )
    }
})

profileDeatailsApi.post('/createUserV2WithRegistry', async (req, res) => {
    try {
        const sbChannel = req.body.personalDetails.channel
        if (!sbChannel) {
            res.status(400).send(channelParamMissing)
            return
        }
        const sbemail_ = req.body.personalDetails.email
        const sbemailVerified_ = true
        const sbfirstName_ = req.body.personalDetails.firstName
        const sblastName_ = req.body.personalDetails.lastName
        let statusString = ''
        const searchresponse = await axios({
            ...axiosRequestConfig,
            data: { request: { query: '', filters: { email: sbemail_.toLowerCase() } } },
            method: 'POST',
            url: API_END_POINTS.searchSb,
        })
        if (searchresponse.data.result.response.count > 0) {
            res.status(400).send(emailAdressExist)
            return
        } else {
            const sbUserProfile: Partial<ISBUser> = {
                channel: sbChannel, email: sbemail_, emailVerified: sbemailVerified_, firstName: sbfirstName_,
                lastName: sblastName_,
            }
            const response = await axios({
                ...axiosRequestConfig,
                data: { request: sbUserProfile },
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req),
                },
                method: 'POST',
                url: API_END_POINTS.createSb,
            })
            if (response.data.responseCode === 'CLIENT_ERROR') {
                res.status(400).send(failedToCreateUser)
                return
            } else {
                const sbUserId = response.data.result.userId
                const sbUserReadResponse = await axios({
                    ...axiosRequestConfig,
                    headers: {
                        Authorization: CONSTANTS.SB_API_KEY,
                        'x-authenticated-user-token': extractUserToken(req),
                    },
                    method: 'GET',
                    url: API_END_POINTS.userRead(sbUserId),
                })
                statusString = sbUserReadResponse.data.params.status
                if (statusString.toUpperCase() !== 'SUCCESS') {
                    res.status(500).send(failedToReadUser)
                    return
                }
                const personalDetailsRegistry: IPersonalDetails = {
                    firstname: sbfirstName_,
                    primaryEmail: sbemail_,
                    surname: sblastName_,
                    userName: sbUserReadResponse.data.result.response.userName,
                }
                const userRegistry = getUserRegistry(personalDetailsRegistry, sbChannel)
                const userRegistryResponse = await axios({
                    ...axiosRequestConfig,
                    data: userRegistry,
                    headers: {
                        wid: sbUserId,
                    },
                    method: 'POST',
                    url: API_END_POINTS.createOSUserRegistry(sbUserId),
                })
                if (userRegistryResponse.data === null) {
                    res.status(500).send(failedToCreateUserInOpenSaber)
                } else {
                    const sbUserProfileResponse: Partial<ISunbirdbUserResponse> = {
                        email: sbemail_, firstName: sbfirstName_, lastName: sblastName_,
                        userId: sbUserId,
                    }
                    res.send(sbUserProfileResponse)
                }
            }
        }
    } catch (err) {
        logError(createUserFailed, err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

profileDeatailsApi.post('/createUserV2WithoutRegistry', async (req, res) => {
    try {
        const sbChannel = req.body.personalDetails.channel
        if (!sbChannel) {
            res.status(400).send(channelParamMissing)
            return
        }
        const sbemail_ = req.body.personalDetails.email
        const sbemailVerified_ = true
        const sbfirstName_ = req.body.personalDetails.firstName
        const sblastName_ = req.body.personalDetails.lastName
        let statusString = ''
        const searchresponse = await axios({
            ...axiosRequestConfig,
            data: { request: { query: '', filters: { email: sbemail_.toLowerCase() } } },
            method: 'POST',
            url: API_END_POINTS.searchSb,
        })
        if (searchresponse.data.result.response.count > 0) {
            res.status(400).send(emailAdressExist)
            return
        } else {
            const sbUserProfile: Partial<ISBUser> = {
                channel: sbChannel, email: sbemail_, emailVerified: sbemailVerified_, firstName: sbfirstName_,
                lastName: sblastName_,
            }
            const response = await axios({
                ...axiosRequestConfig,
                data: { request: sbUserProfile },
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req),
                },
                method: 'POST',
                url: API_END_POINTS.createSb,
            })
            if (response.data.responseCode === 'CLIENT_ERROR') {
                res.status(400).send(failedToCreateUser)
                return
            } else {
                const sbUserId = response.data.result.userId
                const sbUserReadResponse = await axios({
                    ...axiosRequestConfig,
                    headers: {
                        Authorization: CONSTANTS.SB_API_KEY,
                        'x-authenticated-user-token': extractUserToken(req),
                    },
                    method: 'GET',
                    url: API_END_POINTS.userRead(sbUserId),
                })
                statusString = sbUserReadResponse.data.params.status
                if (statusString.toUpperCase() !== 'SUCCESS') {
                    res.status(500).send(failedToReadUser)
                    return
                } else {
                    const sbUserProfileResponse: Partial<ISunbirdbUserResponse> = {
                        email: sbemail_, firstName: sbfirstName_, lastName: sblastName_,
                        userId: sbUserId,
                    }
                    res.send(sbUserProfileResponse)
                }
            }
        }
    } catch (err) {
        logError(createUserFailed, err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

// tslint:disable-next-line
profileDeatailsApi.post('/createUserWithoutInvitationEmail', async (req, res) => {
    try {
        const sbChannel = req.body.personalDetails.channel
        if (!sbChannel) {
            res.status(400).send(channelParamMissing)
            return
        }
        const sbemail_ = req.body.personalDetails.email
        const sbemailVerified_ = true
        const sbfirstName_ = req.body.personalDetails.firstName
        const sblastName_ = req.body.personalDetails.lastName
        let statusString = ''
        const searchresponse = await axios({
            ...axiosRequestConfig,
            data: { request: { query: '', filters: { email: sbemail_.toLowerCase() } } },
            headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req),
            },
            method: 'POST',
            url: API_END_POINTS.kongSearchUser,
        })
        if (searchresponse.data.result.response.count > 0) {
            res.status(400).send({
                id: 'api.error.createUser',
                ver: '1.0',
                // tslint:disable-next-line: object-literal-sort-keys
                ts: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss:lo'),
                params:
                {
                    resmsgid: uuidv1(),
                    // tslint:disable-next-line: object-literal-sort-keys
                    msgid: null,
                    status: 'failed',
                    err: 'USR_EMAIL_EXISTS',
                    errmsg: emailAdressExist,
                },
                responseCode: 'USR_EMAIL_EXISTS',
                result: {},
            })
            return
        } else {
            const sbUserProfile: Partial<ISBUser> = {
                channel: sbChannel, email: sbemail_, emailVerified: sbemailVerified_, firstName: sbfirstName_,
                lastName: sblastName_,
            }
            const response = await axios({
                ...axiosRequestConfig,
                data: { request: sbUserProfile },
                 headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req),
                },
                method: 'POST',
                url: API_END_POINTS.kongCreateUser,
            })
            if (response.data.responseCode === 'CLIENT_ERROR') {
                res.status(400).send(failedToCreateUser)
                return
            } else {
                const sbUserId = response.data.result.userId
                const sbUserReadResponse = await axios({
                    ...axiosRequestConfig,
                    headers: {
                        Authorization: CONSTANTS.SB_API_KEY,
                        // tslint:disable-next-line: all
                        'x-authenticated-user-token': extractUserToken(req),
                    },
                    method: 'GET',
                    url: API_END_POINTS.kongUserRead(sbUserId),
                })
                statusString = sbUserReadResponse.data.params.status
                if (statusString.toUpperCase() !== 'SUCCESS') {
                    res.status(500).send(failedToReadUser)
                    return
                }

                const sbProfileUpdateReq = {
                    profileDetails: {
                        employmentDetails: {
                            departmentName: sbChannel,
                        },
                        personalDetails: {
                            firstname: sbfirstName_,
                            primaryEmail: sbemail_,
                            surname: sblastName_,
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
                if (sbUserProfileUpdateResp.data.responseCode === 'CLIENT_ERROR') {
                    res.status(400).send(failedToUpdateUser)
                    return
                } else {
                    const sbUserProfileResponse: Partial<ISunbirdbUserResponse> = {
                        email: sbemail_, firstName: sbfirstName_, lastName: sblastName_,
                        userId: sbUserId,
                    }
                    res.send(sbUserProfileResponse)
                }
            }
        }
    } catch (err) {
        logError(createUserFailed, err)
        res.status((err && err.response && err.response.status) || 500).send(err)
    }
})

function getUserRegistry(personalDetailsRegistry: IPersonalDetails, deptName: string) {
    return {
        academics: [
            {
                nameOfInstitute: '',
                nameOfQualification: '',
                type: 'X_STANDARD',
                yearOfPassing: '',
            },
            {
                nameOfInstitute: '',
                nameOfQualification: '',
                type: 'XII_STANDARD',
                yearOfPassing: '',
            },
        ],
        employmentDetails: {
            allotmentYearOfService: '',
            cadre: '',
            civilListNo: '',
            departmentName: deptName,
            dojOfService: '',
            employeeCode: '',
            officialPostalAddress: '',
            payType: '',
            pinCode: '',
            service: '',
        },
        interests: {
            hobbies: [],
            professional: [],
        },
        personalDetails: personalDetailsRegistry,
        professionalDetails: [
            {
                name: '',
            },
        ],
        skills: {
            additionalSkills: '',
            certificateDetails: '',
        },
    }
}

// tslint:disable-next-line: all
function isMdoLeaderExist(array: any, mdoRole: string) {
    if (array === null || array === undefined || !Array.isArray(array)) {
        logInfo('MDO_LEADER role is not exist.')
        return false
    }

    // Check if every element in the array is a string
    return array.includes(mdoRole)
}
