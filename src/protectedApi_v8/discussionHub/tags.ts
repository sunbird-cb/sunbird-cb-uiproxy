import axios from 'axios'
import { Router } from 'express'
import { getRootOrg } from '../../authoring/utils/header'
import { axiosRequestConfig } from '../../configs/request.config'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { extractUserIdFromRequest, extractUserToken} from '../../utils/requestExtract'

const API_ENDPOINTS = {
    getTagTopics: (tagName: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/api/tags/${tagName}`,
    getTags: `${CONSTANTS.KONG_API_BASE}/nodebb/api/tags`,
}

export const tagsApi = Router()

tagsApi.get('/', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const url = API_ENDPOINTS.getTags
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
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
tagsApi.get('/:tagName', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const tagName = req.params.tagName
        const url = API_ENDPOINTS.getTagTopics(tagName)
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /by tag >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})
