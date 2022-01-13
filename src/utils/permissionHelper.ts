const _                 = require('lodash')
import axios from 'axios'
import request from 'request'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from './env'
import { logError, logInfo } from './logger'
import { extractUserToken } from './requestExtract'

export const PERMISSION_HELPER = {
    // tslint:disable-next-line: no-any
    setRolesData(reqObj: any, callback: any, body: any) {
        logInfo('permission helper:: setRolesData function ')
        // tslint:disable-next-line: no-any
        const userData: any = JSON.parse(body)
        logInfo(JSON.stringify(userData))
        if (reqObj.session) {
            reqObj.session.userId = userData.result.response.id ? userData.result.response.id : userData.result.response.userId
            reqObj.session.userName = userData.result.response.userName
            reqObj.session.firstName = userData.result.response.firstName
            reqObj.session.lastName = userData.result.response.lastName
            reqObj.session.userRoles = userData.result.response.roles
            reqObj.session.orgs = userData.result.response.organisations
            reqObj.session.rootOrgId = userData.result.response.rootOrgId
            if (!_.includes(reqObj.session.userRoles, 'PUBLIC')) {
                reqObj.session.userRoles.push('PUBLIC')
            }
            // tslint:disable-next-line: no-any
            reqObj.session.save((error: any) => {
                if (error) {
                    logError('reqObj.session.save error -- ', error)
                    callback(error, null)
                } else {
                  logInfo('Before calling createNodeBBUser')
                  this.createNodeBBUser(reqObj, callback)
                  callback(null, userData)
                }
            })
        }
        logInfo('permission helper:: setRolesData function end')
    },
    // tslint:disable-next-line: no-any
    setNodeBBUID(reqObj: any, callback: any, body: any) {
        logInfo('permissionHelper:: setNodeBBUID function start')
        // tslint:disable-next-line: no-any
        const nodeBBData: any = body
        if (reqObj.session) {
            reqObj.session.uid = nodeBBData.data.result.userId.uid
            logInfo('After appending uid to session', reqObj.session.uid)
        }
        // tslint:disable-next-line: no-any
        reqObj.session.save((error: any) => {
            if (error) {
              logError('reqObj.session.save error -- ', error)
              callback(error, null)
            }
        })
        logInfo('permissionHelper:: setNodeBBUID function end')
    },
    // tslint:disable-next-line: no-any
    getCurrentUserRoles(reqObj: any, callback: any) {
        logInfo('Step 3: Get user roles function')
        const userId = reqObj.session.userId
        // tslint:disable-next-line: no-console
        console.log(userId)
        logInfo('Calling user/v2/read')
        const readUrl = `${CONSTANTS.KONG_API_BASE}/user/v2/read/` + userId
        const options = {
            headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                'X-Channel-Id': CONSTANTS.X_Channel_Id,
                'x-authenticated-user-token': reqObj.kauth.grant.access_token.token,
                'x-authenticated-userid': userId,
            },
            url: readUrl,
        }
        // tslint:disable-next-line: no-any
        request.get(options, (_err: any, _httpResponse: any, body: any) => {
            logInfo('Success user/v2/read')
            if (body) {
                // tslint:disable-next-line: no-console
                console.log('Success user/v2/read: body', body)
                this.setRolesData(reqObj, callback, body)
            }
        })
    },
    // tslint:disable-next-line: no-any
    async createNodeBBUser(reqObj: any, callback: any) {
        logInfo('permissionHelper::createNodeBBUser function start')
        const readUrl = `${CONSTANTS.KONG_API_BASE}/discussion/user/v1/create`

        // tslint:disable-next-line: no-commented-code
        const nodebbPayload =  {
            username: reqObj.session.userName,
            // tslint:disable-next-line: object-literal-sort-keys
            identifier: reqObj.session.userId,
            fullname: reqObj.session.firstName + ' ' + reqObj.session.lastName,
        }
        logInfo('Making axios call to nodeBB')
        const nodeBBResp = await axios({
            ...axiosRequestConfig,
            data: { request: nodebbPayload },
             headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(reqObj),
            },
            method: 'POST',
            url: readUrl,
        })
        if (nodeBBResp) {
            this.setNodeBBUID(reqObj, callback, nodeBBResp)
        }
        logInfo('permissionHelper::createNodeBBUser function end')
    },
}
