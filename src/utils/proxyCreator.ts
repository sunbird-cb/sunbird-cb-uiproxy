import { Router } from 'express'
import { createProxyServer } from 'http-proxy'
import { extractUserIdFromRequest, extractUserToken } from '../utils/requestExtract'
import { CONSTANTS } from './env'
const http = require('http')
const https = require('https')
const httpAgent = new http.Agent({ keepAlive: true, })
const httpsAgent = new https.Agent({ keepAlive: true, })

import { logInfo } from './logger'

const _ = require('lodash')

const proxyCreator = (timeout = 10000) => createProxyServer({
  timeout,
})
const proxy = createProxyServer({})
const PROXY_SLUG = '/proxies/v8'

// tslint:disable-next-line: no-any
proxy.on('proxyReq', (proxyReq: any, req: any, _res: any, _options: any) => {
  proxyReq.setHeader('X-Channel-Id', (_.get(req, 'session.rootOrgId')) ? _.get(req, 'session.rootOrgId') : CONSTANTS.X_Channel_Id)
  // tslint:disable-next-line: max-line-length
  proxyReq.setHeader('Authorization', CONSTANTS.SB_API_KEY)
  proxyReq.setHeader('x-authenticated-user-token', extractUserToken(req))
  proxyReq.setHeader('x-authenticated-userid', extractUserIdFromRequest(req))

  const url = req.originalUrl
  proxyReq.agent = url.startsWith('https') ? httpsAgent : httpAgent
  proxyReq.setHeader('connection', 'keep-alive')

  // console.log(proxyReq)
  // condition has been added to set the session in nodebb req header
  if (req.originalUrl.includes('/discussion') && !req.originalUrl.includes('/discussion/user/') && req.body) {

     req.body._uid = req.session.uid

  }
  if (req.body) {
    const bodyData = JSON.stringify(req.body)
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    proxyReq.write(bodyData)
    // tslint:disable-next-line: no-console
    console.log('body data=====>', bodyData)
  }
})

// tslint:disable-next-line: no-any
proxy.on('proxyRes', (proxyRes: any, req: any, _res: any, ) => {
  // res.removeHeader('access-control-allow-origin')
  delete proxyRes.headers['access-control-allow-origin']
  // write user session with roles
  // if (req.originalUrl.includes('/user/v2/read')) {
  //   // tslint:disable-next-line: no-any
  //   proxyRes.on('data', (data: any) => {
  //     if ((proxyRes.statusCode === 200 || proxyRes.statusCode === 201)) {
  //       data = JSON.parse(data.toString('utf-8'))
  //       const roles = data.result.response.roles
  //       req.session.userId = data.result.response.id ? data.result.response.id : data.result.response.userId
  //       req.session.userName = data.result.response.userName
  //       req.session.userRoles = roles
  //       // console.log(req);
  //       // tslint:disable-next-line: only-arrow-functions
  //       req.session.save(function(error: string) {
  //         if (error) {
  //           // tslint:disable-next-line: no-console
  //           console.log(error)
  //         }
  //       })
  //     }
  //   })
  // }
  // tslint:disable-next-line: no-any
  proxyRes.on('data', (data: any) => {
    if (req.originalUrl.includes('/discussion/user/v1/create')) {

      if ((proxyRes.statusCode === 200 || proxyRes.statusCode === 201)) {
        data = JSON.parse(data.toString('utf-8'))
        // tslint:disable-next-line: no-console
        console.log('_res==>', data)
        req.session.uid = data.result.userId.uid
      }
      const nodebbToken = '722686c6-2a2e-4b22-addf-c427261fbdc6'
      if (req.session) {
        req.session.nodebb_authorization_token = nodebbToken
      }
    }
  })

})

export function proxyCreatorRoute(route: Router, targetUrl: string, timeout = 10000): Router {
  route.all('/*', (req, res) => {
    const downloadKeyword = '/download/'
    if (req.url.startsWith(downloadKeyword)) {
      req.url = downloadKeyword + req.url.split(downloadKeyword)[1].replace(/\//g, '%2F')
    }
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL', req.originalUrl)
    // tslint:disable-next-line: no-console
    console.log('REQ_URL', req.url)
    proxyCreator(timeout).web(req, res, {
      target: targetUrl,
    })
  })
  return route
}

export function ilpProxyCreatorRoute(route: Router, baseUrl: string): Router {
  route.all('/*', (req, res) => {
    proxyCreator().web(req, res, {
      headers: { ...req.headers } as { [s: string]: string },
      target: baseUrl + req.url,
    })
  })
  return route
}

export function scormProxyCreatorRoute(route: Router, baseUrl: string): Router {
  route.all('/*', (req, res) => {
    proxyCreator().web(req, res, {
      target: baseUrl,
    })
  })
  return route
}

export function proxyCreatorLearner(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {

    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorLearner', req.originalUrl)
    const url = removePrefix(`${PROXY_SLUG}/learner`, req.originalUrl)
    logInfo('Final URL: ', targetUrl + url)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}

export function proxyCreatorSunbird(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {

    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorSunbird', req.originalUrl)
    const url = removePrefix(`${PROXY_SLUG}`, req.originalUrl)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}

export function proxyCreatorKnowledge(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {

    const url = removePrefix(`${PROXY_SLUG}`, req.originalUrl)
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorKnowledge', targetUrl + url)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}

export function proxyCreatorUpload(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {
    const url = removePrefix(`${PROXY_SLUG}/action`, req.originalUrl)
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorUpload', targetUrl)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}

function removePrefix(prefix: string, s: string) {
  return s.substr(prefix.length)
}

export function proxyCreatorSunbirdSearch(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {

    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorSunbirdSearch', req.originalUrl)

    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl,
    })
  })
  return route
}

export function proxyCreatorToAppentUserId(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {
    const originalUrl = req.originalUrl
    const lastIndex = originalUrl.lastIndexOf('/')
    const subStr = originalUrl.substr(lastIndex).substr(1).split('-').length
    let userId = extractUserIdFromRequest(req).split(':')[2]
    if (subStr === 5 && (originalUrl.substr(lastIndex).substr(1))) {
      userId = originalUrl.substr(lastIndex).substr(1)
    }
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorToAppentUserId', req.originalUrl)

    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + userId, // [userId.length - 1],
    })
  })
  return route
}

export function proxyCreatorQML(route: Router, targetUrl: string, urlType: string, _timeout = 10000, ): Router {
  route.all('/*', (req, res) => {
    const originalUrl = req.originalUrl.replace(urlType, '/')
    const url = removePrefix(`${PROXY_SLUG}`, originalUrl)
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorQML', targetUrl + url)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}

export function proxyContent(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {
    const url = removePrefix(`${PROXY_SLUG}/private`, req.originalUrl)
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyCreatorUpload', targetUrl)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}

export function proxyContentLearnerVM(route: Router, targetUrl: string, _timeout = 10000): Router {
  route.all('/*', (req, res) => {
    const url = removePrefix(`${PROXY_SLUG}/learnervm/private`, req.originalUrl)
    // tslint:disable-next-line: no-console
    console.log('REQ_URL_ORIGINAL proxyContentLearnerVM', targetUrl)
    proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: targetUrl + url,
    })
  })
  return route
}
