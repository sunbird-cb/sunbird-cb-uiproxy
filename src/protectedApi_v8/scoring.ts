import axios from 'axios'
import { Router } from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError } from '../utils/logger'
import { ERROR } from '../utils/message'
import { extractUserToken } from '../utils/requestExtract'

const API_END_POINTS = {
    calculateScoreEndPoint: `${CONSTANTS.KONG_API_BASE}/action/scoring/add`,
    fetchScore: `${CONSTANTS.KONG_API_BASE}/action/scoring/fetch`,
    fetchTemplate: (templateId: string) => `${CONSTANTS.KONG_API_BASE}/action/scoring/getTemplate/${templateId}`,
}

export const scoringApi = Router()

const unknownError = 'Failed due to unknown reason'
const failedToProcess = 'Failed to process the request. '

scoringApi.post('/calculate', async (req, res) => {
    try {
        const rootOrgValue = req.headers.rootorg
        const orgValue = req.headers.org
        if (!rootOrgValue || !orgValue) {
            res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
            return
        }
        const response = await axios.post(
            API_END_POINTS.calculateScoreEndPoint,
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    org: orgValue,
                    rootOrg: rootOrgValue,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req),
                },
            }
        )
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToProcess + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: unknownError,
            }
        )
    }
})

scoringApi.post('/fetch', async (req, res) => {
    try {
        const rootOrgValue = req.headers.rootorg
        const orgValue = req.headers.org
        if (!rootOrgValue || !orgValue) {
            res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
            return
        }
        const response = await axios.post(
            API_END_POINTS.fetchScore,
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    org: orgValue,
                    rootOrg: rootOrgValue,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req),
                },
            }
        )
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToProcess + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: unknownError,
            }
        )
    }
})

scoringApi.get('/getTemplate/:templateId', async (req, res) => {
    try {
        const templateId = req.params.templateId
        const rootOrgValue = req.headers.rootorg
        const orgValue = req.headers.org
        if (!rootOrgValue || !orgValue) {
            res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
            return
        }
        const response = await axios.get(API_END_POINTS.fetchTemplate(templateId), {
            ...axiosRequestConfig,
            headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                org: orgValue,
                rootOrg: rootOrgValue,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req),
            },
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToProcess + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: unknownError,
            }
        )
    }
})
