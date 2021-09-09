import axios from 'axios'
import { Router } from 'express'

import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError} from '../utils/logger'
import { ERROR } from '../utils/message'
import { extractUserId, extractUserOrgData, extractUserToken } from '../utils/requestExtract'

export const contentPrivateApi = Router()

const API_END_POINTS = {
    getHierarchyDetails: (id: string) => `${CONSTANTS.KNOWLEDGE_MW_API_BASE}/action/content/v3/hierarchy/${id}?mode=edit`,
    readUserEndPoint: (userId: string) => `${CONSTANTS.KONG_API_BASE}/user/v2/read/${userId}`,
    updateContentEndPoint: (id: string) => `${CONSTANTS.KONG_API_BASE}/private/content/v3/update/${id}`,
}

const editableFields = ['versionKey', 'createdBy', 'creatorContacts']
const userIdFailedMessage = 'NO_USER_ID'
const FIELD_VALIDATION_ERROR = 'TRYING_TO_UPDATE_NON_EDITABLE_FIELDS'
const CHANNEL_VALIDATION_ERROR = 'SOURCE_MISMATCH_ERROR'

contentPrivateApi.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const content = req.body.request.content
        const fields = Object.keys(content)
        const userId = extractUserId(req)
        const userToken = extractUserToken(req) as string
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        if (fields instanceof Array) {
            for (const entry of fields) {
                if (editableFields.indexOf(entry) === -1) {
                    res.status(400).send({
                        msg: res.status(400).send({
                            msg: FIELD_VALIDATION_ERROR,
                        }),
                    })
                }
            }
        }
         // tslint:disable-next-line: no-console
        console.log('calling for user channel')
        const userChannel = extractUserOrgData(req)
        const channelData = JSON.stringify(userChannel)
         // tslint:disable-next-line: no-console
        console.log('channelData=====>', channelData)
        const hierarchySource = await getHierarchyDetails(userToken, id)
       // tslint:disable-next-line: no-console
        console.log('hierarchy source ' + hierarchySource)
        if (userChannel !== hierarchySource) {
            res.status(400).send({
                msg: res.status(400).send({
                    msg: CHANNEL_VALIDATION_ERROR,
                }),
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
        const hierarchyResult = response.data.result.content
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
        const userProfileResult = response.data.result.response
        if (typeof userProfileResult !== 'undefined' && userProfileResult != null) {
            return userProfileResult.channel
        }
    } catch (error) {
        logError('ERROR WHILE FETCHING THE USER DETAILS --> ', error)
        return 'userChannelDetails'
    }
}
