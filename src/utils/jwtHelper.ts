import { CONSTANTS } from './env'

const jwt = require('jsonwebtoken')

// tslint:disable-next-line: no-any
export function getExpiryTime(accessToken: any) {
    const jwtPayload = jwt.decode(accessToken)
    if (jwtPayload && jwtPayload.exp) {
        const diff = ((Math.floor(Date.now() / 1000)) - jwtPayload.exp)
        if (diff > 0) {
            return diff
        } else {
            return 0
        }
    }
    return 0
}

// tslint:disable-next-line: no-any
export function getCurrnetExpiryTime(accessToken: any) {
    const jwtPayload = jwt.decode(accessToken)
    if (jwtPayload && jwtPayload.exp) {
        return jwtPayload.exp * 1000
    } else {
        // return configured value for KEYCLOAK
        return CONSTANTS.KEYCLOAK_SESSION_TTL
    }
}

// tslint:disable-next-line: no-any
export function decodeCode(accessToken: any) {
    return jwt.decode(accessToken)
}
