import axios from 'axios'
import { Router } from 'express'

import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { ERROR } from '../utils/message'
import { extractUserId, extractUserToken } from '../utils/requestExtract'

export const contentPrivateApi = Router()

const API_END_POINTS = {
    getHierarchyDetails: (id: string) => `${CONSTANTS.KNOWLEDGE_MW_API_BASE}/action/content/v3/hierarchy/${id}?mode=edit`,
    readUserEndPoint: (userId: string) => `${CONSTANTS.KONG_API_BASE}/user/v2/read/${userId}`,
    updateContentEndPoint: (id: string) => `${CONSTANTS.KONG_API_BASE}/private/content/v3/update/${id}`,
}
// tslint:disable-next-line: no-commented-code
const editableFields = ['versionKey']
const editableFieldsReviewer = ['versionKey', 'isExternal', 'reviewer', 'reviewerIDs']
const editableFieldsPublisher = ['versionKey', 'isExternal', 'publisherIDs: ', 'publisherDetails']
const userIdFailedMessage = 'NO_USER_ID'
const FIELD_VALIDATION_ERROR = 'TRYING_TO_UPDATE_NON_EDITABLE_FIELDS'
const CHANNEL_VALIDATION_ERROR = 'SOURCE_MISMATCH_ERROR'

contentPrivateApi.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        // tslint:disable-next-line: no-commented-code
        const content = req.body.content
        const fields = Object.keys(content)
        const userId = extractUserId(req)
        const userToken = extractUserToken(req) as string
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        // tslint: disable - next - line: no - commented - code
        logInfo('line no: 36 ===> ', id, JSON.stringify(fields), userId, userToken)
        // tslint: disable - next - line: no - commented - code
        if (fields instanceof Array) {
            for (const entry of fields) {
                if (editableFields.indexOf(entry) === -1) {
                    res.status(400).send({
                        msg: FIELD_VALIDATION_ERROR,
                    })
                }
            }
        }
        // tslint:disable-next-line: no-commented-code
        const userChannel = await getUserChannel(userToken, userId)
        const hierarchySource = await getHierarchyDetails(userToken, id)
        if (userChannel !== hierarchySource) {
            res.status(400).send({
                msg: CHANNEL_VALIDATION_ERROR,
            })
        }
        const response = await axios.patch(
            API_END_POINTS.updateContentEndPoint(id),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': userToken,
                },
            }
        )
        // tslint:disable-next-line: no-commented-code
        // logInfo('line no: 70 ===> ', JSON.stringify(response.status), response.data)
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(Error + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})

contentPrivateApi.patch('/migratereviewer/:id', async (req, res) => {
    try {
        const id = req.params.id
        const content = req.body.content
        const fields = Object.keys(content)
        const userId = extractUserId(req)
        const userToken = extractUserToken(req) as string
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        if (fields instanceof Array) {
            for (const entry of fields) {
                if (editableFieldsReviewer.indexOf(entry) === -1 && fields.length === editableFieldsReviewer.length) {
                    res.status(400).send({
                            msg: FIELD_VALIDATION_ERROR,
                    })
                }
            }
        }
        const userChannel = await getUserChannel(userToken, userId)
        const hierarchySource = await getHierarchyDetails(userToken, id)
        logInfo('line no: 50 ===> ', userChannel, hierarchySource)
        if (userChannel !== hierarchySource) {
            res.status(400).send({
                msg: CHANNEL_VALIDATION_ERROR,
            })
        }
        const response = await axios.patch(
            API_END_POINTS.updateContentEndPoint(id),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': userToken,
                },
            }
        )
        // tslint:disable-next-line: no-commented-code
        // logInfo('line no: 70 ===> ', JSON.stringify(response.status), response.data)
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(Error + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})

contentPrivateApi.patch('/migratepublisher/:id', async (req, res) => {
    try {
        const id = req.params.id
        const content = req.body.content
        const fields = Object.keys(content)
        const userId = extractUserId(req)
        const userToken = extractUserToken(req) as string
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        if (fields instanceof Array) {
            for (const entry of fields) {
                if (editableFieldsPublisher.indexOf(entry) === -1 && fields.length === editableFieldsPublisher.length) {
                    res.status(400).send({
                            msg: FIELD_VALIDATION_ERROR,
                    })
                }
            }
        }
        const userChannel = await getUserChannel(userToken, userId)
        const hierarchySource = await getHierarchyDetails(userToken, id)
        logInfo('line no: 50 ===> ', userChannel, hierarchySource)
        if (userChannel !== hierarchySource) {
            res.status(400).send({
                msg: CHANNEL_VALIDATION_ERROR,
            })
        }
        const response = await axios.patch(
            API_END_POINTS.updateContentEndPoint(id),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': userToken,
                },
            }
        )
        // tslint:disable-next-line: no-commented-code
        // logInfo('line no: 70 ===> ', JSON.stringify(response.status), response.data)
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(Error + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})

export async function getHierarchyDetails(token: string, id: string) {
    try {
        const response = await axios.get(API_END_POINTS.getHierarchyDetails(id), {
            ...axiosRequestConfig,
            headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': token,
            },
        })
        logInfo('line 201 ====>', response.data)
        const hierarchyResult = response.data.result.content
        logInfo('line 202 ====>', hierarchyResult)
        if (typeof hierarchyResult !== 'undefined' && hierarchyResult != null) {
            return hierarchyResult.source
        }
    } catch (error) {
        logError('ERROR WHILE FETCHING THE Hierarchy DETAILS --> ', error)
        return 'contentSourceDetails'
    }
}

export async function getUserChannel(token: string, userId: string) {
    try {
        const response = await axios.get(API_END_POINTS.readUserEndPoint(userId), {
            ...axiosRequestConfig,
            headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': token,
            },
        })
        logInfo('line 222 ====>', response.data)
        const userProfileResult = response.data.result.response
        logInfo('line 222 ====>', userProfileResult)
        if (typeof userProfileResult !== 'undefined' && userProfileResult != null) {
            return userProfileResult.channel
        }
    } catch (error) {
        logError('ERROR WHILE FETCHING THE USER DETAILS --> ', error)
        return 'userChannelDetails'
    }
}
