import axios from 'axios'
import { Router } from 'express'
import { getRootOrg } from '../../authoring/utils/header'
import { axiosRequestConfig } from '../../configs/request.config'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { extractUserIdFromRequest, extractUserToken} from '../../utils/requestExtract'

const API_ENDPOINTS = {
    getPosts: (term: string) => `${CONSTANTS.DISCUSSION_HUB_API_BASE}/nodebb/api/recent/posts/${term}`,
}

export const postsApi = Router()

postsApi.get('/:term', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const term = req.params.term
        const url = API_ENDPOINTS.getPosts(term)
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
        logError('ERROR ON GET postsApi /:term >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})
