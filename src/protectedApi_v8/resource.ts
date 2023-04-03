import { Router } from 'express'
import { logInfo } from '../utils/logger'
const _                 = require('lodash')
export const userAuthKeyCloakApi = Router()
userAuthKeyCloakApi.get('/', (req, res) => {
    const host = req.get('host')
    let queryParam = ''
    let isLocal = 0
    logInfo('Received query param: ' + JSON.stringify(req.query))
    if (!_.isEmpty(req.query)) {
        queryParam = req.query.q
        if (queryParam && queryParam.includes('localhost')) {
            isLocal = 1
        }
        if (req.query.redirect_uri) {
            logInfo('Received redirectUrl value : ' + req.query.redirect_uri)
            res.redirect(req.query.redirect_uri)
            return
        }
        logInfo('request cookie -> ' + JSON.stringify(req.cookies))
        logInfo('response cookie -> ' + JSON.stringify(res.cookie))
    }
    let redirectUrl = ''
    if (isLocal) {
        redirectUrl = queryParam
    } else {
        redirectUrl = `https://${host}${queryParam}` //   'https://' + host + '/page/home'
    }
    res.redirect(redirectUrl)
})
