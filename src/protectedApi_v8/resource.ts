import { Router } from 'express'
import { CONSTANTS } from '../utils/env'
import { logInfo } from '../utils/logger'
const _                 = require('lodash')
export const userAuthKeyCloakApi = Router()
userAuthKeyCloakApi.get('/', (req, res) => {
    const host = req.get('host')
    let queryParam = ''
    let isLocal = 0
    logInfo('Received query param: ' + JSON.stringify(req.query))
    if (req.session && req.session.authenticated ) {
        logInfo('User is authenticated.. Updating Cookie with Secure and SameSite flags')
        res.cookie('connect.sid', req.cookies['connect.sid'], {
            httpOnly: true,
            maxAge: CONSTANTS.KEYCLOAK_SESSION_TTL,
            sameSite: 'Lax',
            secure: true,
        })
    }
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
    }
    let redirectUrl = ''
    if (isLocal) {
        redirectUrl = queryParam
    } else {
        redirectUrl = `https://${host}${queryParam}` //   'https://' + host + '/page/home'
    }
    res.redirect(redirectUrl)
})
