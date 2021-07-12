const _                 = require('lodash')
const uuidv1            = require('uuid/v1')
const { pathToRegexp }  = require('path-to-regexp')
const dateFormat        = require('dateformat')

import { NextFunction, Request, Response } from 'express'
import { CONSTANTS } from './env'
import { logError, logInfo } from './logger'
import { API_LIST } from './whitelistApis'

/**
 * @param  { String } REQ_URL - Request URL
 * @returns { Boolean } - Return boolean value based on exclude path criteria
 */
// tslint:disable-next-line: no-any
const checkIsStaticRoute = (REQ_URL: any) => {
    const excludePath = [
        '.md',
        '.js',
        '.js.map',
        '.ico',
        '.ttf',
        '.woff2',
        '.woff',
        '.eot',
        '.svg',
        '.gif',
        '.png',
        '.html',
        '/dist/',
        '/streaming/',
        '/resourcebundles/',
        '/assets/',
        '/content-plugins/',
        '/editors/',
    ]
    // tslint:disable-next-line: no-any
    return _.some(excludePath, (path: any) => _.includes(REQ_URL, path))
}

const shouldAllow = (req: Request) => {
    // Ignore static routes
    return req.path === '/' || checkIsStaticRoute(req.path)
}

/**
 * @description
 * Set of methods which checks for certain condition on URL
 * @since release-3.1.0
 */
const urlChecks = {
    // tslint:disable-next-line: no-any
    ROLE_CHECK: (resolve: any, reject: any, req: Request, rolesForURL: any, REQ_URL: any) => {
        const data = (_.get(req, 'session.userRoles')) ? _.get(req, 'session.userRoles') : []
        logInfo('Portal_API_WHITELIST : Middleware for URL [ ' + REQ_URL + ' ]')
        if (_.includes(rolesForURL, 'ALL') && data.length > 0) {
            resolve()
        } else if (_.intersection(rolesForURL, data).length > 0) {
            resolve()
        } else {
            return reject('User doesn\'t have appropriate roles')
        }
    },
}

/**
 * @param  {Object} req             - Request Object
 * @param  {Object} res             - Response Object
 * @param  {Function} next          - Function for next middleware
 * @param  {Array} checksToExecute  - Array of methods (checks; defined in urlChecks object)
 * @description
 * 1. Array of methods executed by promise
 * 2. On success; API is allowed
 * 3. On error; 403 Forbidden response is sent
 * @since release-3.1.0
 */
// tslint:disable-next-line: no-any
const executeChecks = async (req: Request, res: Response , next: NextFunction, checksToExecute: any = []) => {
    try {
        // tslint:disable-next-line: no-any
        await (Promise as any).allSettled(checksToExecute)
        // tslint:disable-next-line: no-any
        .then((pSuccess: any) => {
            if (pSuccess) {
                const _isRejected = _.find(pSuccess, {status: 'rejected'})
                if (_isRejected) {
                    throw new Error(_isRejected.reason)
                } else {
                    next()
                }
            } else {
                throw new Error('API whitelisting validation failed')
            }
        })
        // tslint:disable-next-line: no-any
        .catch((pError: any) => {
            logError(pError)
            respond403(req, res)
        })
    } catch (error) {
        logError(error)
        respond403(req, res)
    }
}

/**
 * @param  {Object} req             - Request Object
 * @param  {Object} res             - Response Object
 * @description - Generic function to return 403 Forbidden response
 * @since release-3.1.0
 */
const respond403 = (req: Request, res: Response) => {
    const REQ_URL = req.path
    const err = ({ msg: 'API WHITELIST :: Forbidden access for API [ ' + REQ_URL + ' ]', url: REQ_URL })
    logError(err.msg)
    res.status(403)
    res.send(
    {
        id: 'api.error',
        ver: '1.0',
        // tslint:disable-next-line: object-literal-sort-keys
        ts: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss:lo'),
        params:
        {
            resmsgid: uuidv1(),
            // tslint:disable-next-line: object-literal-sort-keys
            msgid: null,
            status: 'failed',
            err: 'FORBIDDEN_ERROR',
            errmsg: 'Forbidden: API WHITELIST Access is denied',
        },
        responseCode: 'FORBIDDEN',
        result: {},
    })
    res.end()
}

const respond419 = (req: Request, res: Response) => {
    const REQ_URL = req.path
    const err = ({ msg: 'API WHITELIST :: Unauthorized access for API [ ' + REQ_URL + ' ]', url: REQ_URL })
    logError(err.msg)
    res.status(419)
    res.setHeader('location', redirectToLogin(req))
    res.send(
    {
        id: 'api.error',
        ver: '1.0',
        // tslint:disable-next-line: object-literal-sort-keys
        ts: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss:lo'),
        params:
        {
            resmsgid: uuidv1(),
            // tslint:disable-next-line: object-literal-sort-keys
            msgid: null,
            status: 'failed',
            err: 'UNAUTHORIZED_ERROR',
            errmsg: 'UNAUTHORIZED: Access is denied',
        },
        responseCode: 'UNAUTHORIZED',
        redirectUrl: redirectToLogin(req),
        result: {},
    })
    res.end()
}

/**
 * @description - Function to check whether
 * 1. Incoming API is whitelisted (or) not
 * 2. If API does not exists then request is terminated and 403 Forbidden response is sent
 * 3. If incoming API is present in API_LIST (whitelistApis); then check URL pattern matching
 * 4. Refer `API_LIST` and execute the checks defined
 * @since release-3.1.0
 */
export const isAllowed = () => {
    // tslint:disable-next-line: only-arrow-functions
    return function(req: Request, res: Response, next: NextFunction) {
        if (CONSTANTS.PORTAL_API_WHITELIST_CHECK) {
            if (shouldAllow(req)) {
                next()
            } else {
                let REQ_URL = req.path
                // Pattern match for URL
                // tslint:disable-next-line: no-any
                _.forEach(API_LIST.URL_PATTERN, (url: any) => {
                    const regExp = pathToRegexp(url)
                    if (regExp.test(REQ_URL)) {
                        REQ_URL = url
                        return false
                    }
                    return true
                })
                // Is API whitelisted ?
                if (_.get(API_LIST.URL, REQ_URL)) {
                    const URL_RULE_OBJ = _.get(API_LIST.URL, REQ_URL)
                    // tslint:disable-next-line: no-any
                    const checksToExecute: any[] = []

                    // Iterate for checks defined for API and push to array
                    if (_.isEmpty(URL_RULE_OBJ.checksNeeded)) {
                        next()
                    } else {
                        const urlChecksNeeded = URL_RULE_OBJ.checksNeeded
                        // tslint:disable-next-line: no-any
                        urlChecksNeeded.forEach((CHECK: any) => {
                            // tslint:disable-next-line: no-shadowed-variable
                            checksToExecute.push(new Promise((res, rej) => {
                            if (_.get(URL_RULE_OBJ, CHECK) && typeof urlChecks[CHECK] === 'function') {
                                urlChecks[CHECK](res, rej, req, URL_RULE_OBJ[CHECK], REQ_URL)
                            }
                            }))
                        })
                        executeChecks(req, res, next, checksToExecute)
                    }
                } else {
                    // If API is not whitelisted
                    logInfo('Portal_API_WHITELIST: URL not whitelisted')
                    respond403(req, res)
                }
            }
        } else {
            next()
        }
    }
}
const redirectToLogin = (req: Request) => {
    const redirectUrl = 'protected/v8/resource/'
    return `https://${req.get('host')}/${redirectUrl}` // 'http://localhost:3003/protected/v8/user/resource/'
}
/**
 * This function is used for checking whether
 */
export function apiWhiteListLogger() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.path === '/' || checkIsStaticRoute(req.path)) {
            next()
            return
        }
        const REQ_URL = req.path
        if (!_.includes(REQ_URL, '/resource') && (req.session)) {
            if (!('userRoles' in req.session) || (('userRoles' in req.session) && (req.session.userRoles.length === 0))) {
                // console.log('Session not there: In If')
                logError('Portal_API_WHITELIST_LOGGER: User needs to authenticated themselves')
                respond419(req, res)
            } else {
                // Pattern match for URL
                next()
                logInfo('In WhilteList Call========' + REQ_URL)
            }
        } else {
            next()
        }
    }
}
