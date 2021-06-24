import axios from 'axios'
import { Router } from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
import { ERROR } from '../utils/message'
const API_END_POINTS = {
    getWAPdf: (waId: string) => `${CONSTANTS.SB_EXT_API_BASE_2}/getWOPublishedPdf/${waId}`,
}

export const workallocationPublic = Router()

workallocationPublic.get('/getWaPdf/:waId', async (req, res) => {
    try {
        const waId = req.params.waId
        const response = await axios.get(API_END_POINTS.getWAPdf(waId), {
            ...axiosRequestConfig,
            headers: {},
        })
        logInfo('Response ========>', JSON.stringify(response.data))
        res.redirect(response.data)
    } catch (err) {
        logError(err)
        res.status((err && err.response && err.response.status) || 500).send(
            (err && err.response && err.response.data) || {
                error: ERROR.GENERAL_ERR_MSG,
            }
        )
    }
})
