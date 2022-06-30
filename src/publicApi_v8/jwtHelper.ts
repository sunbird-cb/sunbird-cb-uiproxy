const jwt = require('jsonwebtoken')

/**
 *
 * @param accessToken
 * @returns {*}
 */
const getUserIdFromToken = (accessToken: string) => {
  const jwtPayload = jwt.decode(accessToken)
  if (jwtPayload && jwtPayload.sub) {
    const splittedSub = jwtPayload.sub.split(':')
    return splittedSub[splittedSub.length - 1]
  } else {
    // invalid JWT token
    return null
  }
}

/**
 * JWT token to decode
 * @param token
 * @returns {null|{payload, signature, header}}
 */
const decodeToken = (token: string) => {
  return jwt.decode(token)
}

module.exports = {getUserIdFromToken, decodeToken}
