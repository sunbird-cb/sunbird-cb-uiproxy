import request from 'request'
import { CONSTANTS } from './env'

export const PERMISSION_HELPER = {
    // tslint:disable-next-line: no-any
    setRolesData(reqObj: any, callback: any, body: any) {
        // tslint:disable-next-line: no-any
        const userData: any = JSON.parse(body)
        if (reqObj.session) {
            reqObj.session.userId = userData.result.response.id ? userData.result.response.id : userData.result.response.userId
            reqObj.session.userName = userData.result.response.userName
            reqObj.session.userRoles = userData.result.response.roles
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
        const readUrl = `${CONSTANTS.SUNBIRD_PROXY_API_BASE}/user/v2/read/` + userId
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
