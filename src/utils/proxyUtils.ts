import _ from 'lodash'
import { CONSTANTS } from './env'
import { extractUserIdFromRequest, extractUserToken } from './requestExtract'

const http = require('http')
const https = require('https')
const httpAgent = new http.Agent({ keepAlive: true, })
const httpsAgent = new https.Agent({ keepAlive: true, })

export const PROXY_UTILS = {
    // tslint:disable-next-line: no-any
    decorateRequestHeaders(upstreamUrl: any) {
        // tslint:disable-next-line: no-any
        return (proxyReqOpts: any, srcReq: any) => {
            const channelId = (_.get(srcReq, 'session.rootOrgId')) ? _.get(srcReq, 'session.rootOrgId') : CONSTANTS.X_Channel_Id
            // tslint:disable-next-line: no-duplicate-string
            proxyReqOpts.headers.Authorization = CONSTANTS.SB_API_KEY
            proxyReqOpts.headers['X-Channel-Id'] = channelId
            proxyReqOpts.headers['x-authenticated-user-token'] = extractUserToken(srcReq)
            proxyReqOpts.headers['x-authenticated-userid'] = extractUserIdFromRequest(srcReq)
            proxyReqOpts.agent = upstreamUrl.startsWith('https') ? httpsAgent : httpAgent
            proxyReqOpts.headers.connection = 'keep-alive'
            if (srcReq.body) {
                const bodyData = JSON.stringify(srcReq.body)
                proxyReqOpts.headers['Content-Length'] = Buffer.byteLength(bodyData)
            }
            return proxyReqOpts
        }
    },
    modifyRequestBody() {
        // tslint:disable-next-line: no-any
        return (bodyContent: any, srcReq: any) => {
            const originalUrl = srcReq.originalUrl
            if (originalUrl.includes('/discussion') && !originalUrl.includes('/discussion/user/v1/create') && srcReq.session) {
                bodyContent._uid = srcReq.session.uid
            }
            return bodyContent
        }
    },
    decorateResponse() {
        // tslint:disable-next-line: no-any
        return (proxyRes: any, proxyResData: any, userReq: any, _userRes: any) => {
            delete proxyRes.headers['access-control-allow-origin']
            if (userReq.originalUrl.includes('/discussion/user/v1/create')) {
                if ((proxyRes.statusCode === 200 || proxyRes.statusCode === 201)) {
                    const data = JSON.parse(proxyResData.toString('utf-8'))
                    // tslint:disable-next-line: no-console
                    console.log('_res==>', data)
                    userReq.session.uid = data.result.userId.uid
                }
                const nodebbToken = '722686c6-2a2e-4b22-addf-c427261fbdc6'
                if (userReq.session) {
                    userReq.session.nodebb_authorization_token = nodebbToken
                }
            }
            return proxyResData
        }
    },
}
