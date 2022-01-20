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
        logInfo('permission helper:: setRolesData function ', '------', new Date().toString())
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
            // tslint:disable-next-line: no-console
            console.log('request.session after adding userId ::', reqObj.session, '----cookie---', reqObj.cookies,
            '------', new Date().toString())
            // this.createNodeBBUser(reqObj, callback)
            // tslint:disable-next-line: no-any
            reqObj.session.save((error: any) => {
                if (error) {
                    logError('reqObj.session.save error -- ', error)
                    callback(error, null)
                } else {
                //   logInfo('Before calling createNodeBBUser', '------', new Date().toString())
                // tslint:disable-next-line: no-commented-code
                //   this.createNodeBBUser(reqObj, callback)
                  logInfo('reqObj.session.save:: Sucess --Before calling callback ', '------', new Date().toString())
                  callback(null, userData)
                }
            })
        } else {
            callback('reqObj.session no session', null)
        }
        logInfo('permission helper:: setRolesData function end', '------', new Date().toString())
    },
    // tslint:disable-next-line: no-any
    setNodeBBUID(reqObj: any, callback: any, body: any) {
        logInfo('permissionHelper:: setNodeBBUID function start', '------', new Date().toString())
        // tslint:disable-next-line: no-any
        const nodeBBData: any = body
        // tslint:disable-next-line: no-console
        console.log('request.session after adding userId ::', reqObj.session, '----cookie---', reqObj.cookies,
        '------', new Date().toString())
        if (reqObj.session) {
            reqObj.session.uid = nodeBBData.data.result.userId.uid
            logInfo('After appending uid to session', reqObj.session.uid)
        }
        // tslint:disable-next-line: no-any
        reqObj.session.save((error: any) => {
            if (error) {
              logError('reqObj.session.save error -- ', error, '------', new Date().toString())
              callback(error, null)
            } else {
               // tslint:disable-next-line: no-console
               console.log(`setNodeBBUID::Success of save -- reqObj.session ${new Date()}--- `, reqObj.session )
               callback(null, nodeBBData)
            }
        })
        logInfo('permissionHelper:: setNodeBBUID function end', '------', new Date().toString())
    },
    // tslint:disable-next-line: no-any
    getCurrentUserRoles(reqObj: any, callback: any) {
        logInfo('Step 3: Get user roles function', '------', new Date().toString())
        const userId = reqObj.session.userId
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
        request.get(options, (err: any, _httpResponse: any, body: any) => {
            logInfo('Inside user/v2/read', '------', new Date().toString())
            if (body) {
                // tslint:disable-next-line: no-console
                console.log('Success user/v2/read: body', body, '------', new Date().toString())
                this.setRolesData(reqObj, callback, body)
            }
            if (err) {
                // tslint:disable-next-line: no-console
                console.log('Making axios call to nodeBB ERROR -- ', err, '------', new Date().toString())
                callback(err, null)
            }
        })
    },
    // tslint:disable-next-line: no-any
    async createNodeBBUser(reqObj: any, callback: any) {
        const readUrl = `${CONSTANTS.KONG_API_BASE}/discussion/user/v1/create`

        // tslint:disable-next-line: no-commented-code
        const nodebbPayload =  {
            username: reqObj.session.userName,
            // tslint:disable-next-line: object-literal-sort-keys
            identifier: reqObj.session.userId,
            fullname: reqObj.session.firstName + ' ' + reqObj.session.lastName,
        }
        logInfo('Making axios call to nodeBB', '------', new Date().toString())
        try {
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
                // tslint:disable-next-line: no-console
                console.log('NodeBB axios call response', '------', new Date().toString())
                this.setNodeBBUID(reqObj, callback, nodeBBResp)
            }
            logInfo('permissionHelper::createNodeBBUser function end', '------', new Date().toString())
        } catch (err) {
            // tslint:disable-next-line: no-console
            console.log('Making axios call to nodeBB ERROR -- ', err, '------', new Date().toString())
            callback(err, null)
          }
    },
}
