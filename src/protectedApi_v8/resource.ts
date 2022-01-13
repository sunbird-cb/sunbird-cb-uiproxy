import { Router } from 'express'
const _                 = require('lodash')
export const userAuthKeyCloakApi = Router()
userAuthKeyCloakApi.get('/', (req, res) => {
    // tslint:disable-next-line: no-console
    console.log('userAuthKeyCloakApi.get --- ')
    const host = req.get('host')
    let queryParam = ''
    let isLocal = 0
    if (!_.isEmpty(req.query)) {
        queryParam = req.query.q
        if (queryParam.includes('localhost')) {
            isLocal = 1
        }
    }
    let redirectUrl = ''
    if (isLocal) {
        redirectUrl = queryParam
    } else {
        redirectUrl = `https://${host}${queryParam}` //   'https://' + host + '/page/home'
    }
    // tslint:disable-next-line: no-console
    console.log('userAuthKeyCloakApi.get:: redirect url --- ', `https://${host}${queryParam}`)
    res.redirect(redirectUrl)
})
