const _                 = require('lodash')
import request from 'request'
import { CONSTANTS } from './env'
import { logInfo } from './logger'

export const PERMISSION_HELPER = {
    // tslint:disable-next-line: no-any
    setRolesData(reqObj: any, callback: any, body: any) {
        // tslint:disable-next-line: no-any
        const userData: any = JSON.parse(body)
        logInfo(JSON.stringify(userData))
        if (reqObj.session) {
            reqObj.session.userId = userData.result.response.id ? userData.result.response.id : userData.result.response.userId
            reqObj.session.userName = userData.result.response.userName
            reqObj.session.userRoles = userData.result.response.roles
            reqObj.session.orgs = userData.result.response.organisations
            reqObj.session.rootOrgId = userData.result.response.rootOrgId
            reqObj.session.channel = userData.result.response.rootOrg.channel
            reqObj.session.orgName = userData.result.response.rootOrg.orgName

            if (!_.includes(reqObj.session.userRoles, 'PUBLIC')) {
                reqObj.session.userRoles.push('PUBLIC')
            }
            // tslint:disable-next-line: no-any
            reqObj.session.save((error: any) => {
                if (error) {
                  callback(error, null)
                } else {
                  callback(null, userData)
                }
            })
        }
    },
    // tslint:disable-next-line: no-any
    getCurrentUserRoles(reqObj: any, callback: any) {
        // console.log('Step 3: Get user roles function')
        const userId = reqObj.session.userId
        // console.log(userId)
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
            if (body) {
                this.setRolesData(reqObj, callback, body)
            }
        })
    },
}
