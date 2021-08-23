import axios from 'axios'
import { Router } from 'express'
import { getRootOrg } from '../../authoring/utils/header'
import { axiosRequestConfig } from '../../configs/request.config'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { extractUserIdFromRequest, extractUserToken } from '../../utils/requestExtract'

const API_ENDPOINTS = {
    getAllCategories: `${CONSTANTS.KONG_API_BASE}/nodebb/api/categories`,
    // tslint:disable-next-line: no-any
    getCategoryDetails: (cid: any, slug?: any, tid?: any) => {
        let url = `${CONSTANTS.KONG_API_BASE}/nodebb/api/category/${cid}`
        if (slug) {
            url = `${url}/${slug}`
        }
        if (tid) {
            url = `${url}/${tid}`
        }
        return url
    },
}

export const categoriesApi = Router()

categoriesApi.get('/', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const url = API_ENDPOINTS.getAllCategories
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
        logError('ERROR ON GET topicsApi /categories >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

categoriesApi.get('/:cid/:slug?/:tid?', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        const pageNo = req.query.page || 1
        const sort = req.query.sort || ''
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const cid = req.params.cid
        const slug = req.params.slug || undefined
        const tid = req.params.tid || undefined
        const url = API_ENDPOINTS.getCategoryDetails(cid, slug, tid)
        const response = await axios.get(
            `${url}?page=${pageNo}&sort=${sort}`,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
            } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:cid/:slug/:tid? >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})
