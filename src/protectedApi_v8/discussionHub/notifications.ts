import axios from 'axios'
import { Router } from 'express'
import { getRootOrg } from '../../authoring/utils/header'
import { axiosRequestConfig } from '../../configs/request.config'
import { getUserUID, getWriteApiToken } from '../../utils/discussionHub-helper'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { extractUserIdFromRequest , extractUserToken} from '../../utils/requestExtract'

const API_ENDPOINTS = {
    getNotifications: `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/notifications`,
}

export const notificationsApi = Router()

notificationsApi.get('/', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const userUid = await getUserUID(req, userId)
        const url = API_ENDPOINTS.getNotifications + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                nodebb_authorization_token: getWriteApiToken(),
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
            } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /recent >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})
