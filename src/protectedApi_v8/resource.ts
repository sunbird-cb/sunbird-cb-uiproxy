import { Router } from 'express'
const _                 = require('lodash')
export const userAuthKeyCloakApi = Router()
userAuthKeyCloakApi.get('/', async (req, res) => {
    let host = req.get('host')
    let queryParam = ''
    if (!_.isEmpty(req.query)) {
        queryParam = req.query.q
        if (queryParam.includes('localhost')) {
            host = queryParam
        }
    }
    let redirectUrl = ''
    switch (host) {
        case 'igot-dev.in':
            redirectUrl = 'https://' + host + '/page/home'
            break
        case 'mdo.igot-dev.in':
            redirectUrl = 'https://' + host + '/app/home/welcome'
            break
        case 'spv.igot-dev.in':
            redirectUrl = 'https://' + host + '/app/home/directory'
            break
        case 'cbc.igot-dev.in':
            redirectUrl = 'https://' + host + '/app/home/welcome'
            break
        case 'cbp.igot-dev.in':
            redirectUrl = 'https://' + host + '/author/cbp/me'
            break
        default:
            redirectUrl = queryParam  // local setup
            break
    }
    res.redirect(redirectUrl)
})
