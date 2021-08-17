import axios from 'axios'
import { Router } from 'express'

import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError } from '../utils/logger'
import { ERROR } from '../utils/message'
import { extractUserIdFromRequest } from '../utils/requestExtract'

const workallocationV1Path = 'v1/workallocation'
const workallocationV2Path = 'v2/workallocation'
const API_END_POINTS = {
    addAllocationEndPoint: (path: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${path}/add`,
    addWorkOrderEndPoint: (path: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${path}/add/workorder`,
    copyWorkOrderEndPoint: (path: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${path}/copy/workorder`,
    getUserBasicDetails: (userId: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${workallocationV2Path}/user/basicInfo/${userId}`,
    getUsersEndPoint: `${CONSTANTS.SB_EXT_API_BASE_2}/v1/workallocation/getUsers`,
    getWorkOrderById: (path: string, id: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${path}/getWorkOrderById/${id}`,
    getWorkOrders: (path: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${path}/getWorkOrders`,
    updateAllocationEndPoint: `${CONSTANTS.SB_EXT_API_BASE_2}/v1/workallocation/update`,
    updateWorkOrder: (path: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/${path}/update/workorder`,
    userAutoCompleteEndPoint: (searchTerm: string) =>
    `${CONSTANTS.SB_EXT_API_BASE_2}/v1/workallocation/users/autocomplete?searchTerm=${searchTerm}`,
}

export const workAllocationApi = Router()

const failedToProcess = 'Failed to process the request. '
const userIdFailedMessage = 'NO_USER_ID'
const workOrderIdFailedMessage = 'NO_WORKORDER_ID'

workAllocationApi.post('/add', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.post(
            API_END_POINTS.addAllocationEndPoint(workallocationV1Path),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: req.header('Authorization'),
                    userId,
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

workAllocationApi.post('/update', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.post(
            API_END_POINTS.updateAllocationEndPoint,
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: req.header('Authorization'),
                    userId,
                },
            }
        )
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToProcess + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})

workAllocationApi.post('/userSearch', async (req, res) => {
    try {
        const response = await axios.post(
            API_END_POINTS.getUsersEndPoint,
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                },
            }
        )
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToProcess + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})

workAllocationApi.get('/user/autocomplete/:searchTerm', async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm
        const response = await axios.get(API_END_POINTS.userAutoCompleteEndPoint(searchTerm), {
            ...axiosRequestConfig,
            headers: {

            },
        })
        res.status(response.status).send(response.data)
    } catch (err) {
        logError(failedToProcess + err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})

// ------------------ Work allocation v2 API'S ----------------------

workAllocationApi.post('/v2/add', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.post(
            API_END_POINTS.addAllocationEndPoint(workallocationV2Path),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    Authorization: req.header('Authorization'),
                    userId,
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
workAllocationApi.post('/add/workorder', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.post(
            API_END_POINTS.addWorkOrderEndPoint(workallocationV2Path),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    userId,
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
workAllocationApi.post('/update/workorder', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.post(
            API_END_POINTS.updateWorkOrder(workallocationV2Path),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    userId,
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

workAllocationApi.post('/getWorkOrders', async (req, res) => {
    try {
        const response = await axios.post(
            API_END_POINTS.getWorkOrders(workallocationV2Path),
            req.body,
            {
                ...axiosRequestConfig,
                headers: req.headers,
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

workAllocationApi.get('/getWorkOrderById/:workOrderId', async (req, res) => {
    try {
        const workOrderId = req.params.workOrderId
        if (!workOrderId) {
            res.status(400).send(workOrderIdFailedMessage)
            return
        }
        const response = await axios.get(
            API_END_POINTS.getWorkOrderById(workallocationV2Path, workOrderId),
            {
                ...axiosRequestConfig,
                headers: req.headers,
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

workAllocationApi.post('/copy/workOrder', async (req, res) => {
    try {
        const userId = extractUserIdFromRequest(req)
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.post(
            API_END_POINTS.copyWorkOrderEndPoint(workallocationV2Path),
            req.body,
            {
                ...axiosRequestConfig,
                headers: {
                    userId,
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

workAllocationApi.get('/getUserBasicInfo/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            res.status(400).send(userIdFailedMessage)
            return
        }
        const response = await axios.get(
            API_END_POINTS.getUserBasicDetails(userId),
            {
                ...axiosRequestConfig,
                headers: req.headers,
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