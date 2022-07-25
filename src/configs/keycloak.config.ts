import { CONSTANTS } from '../utils/env'
import { getSessionConfig } from './session.config'
const keycloak = require('keycloak-connect')

export function getKeycloakConfig(url?: string, realm?: string) {
  return {
    'ssl-required': 'external',
    // tslint:disable-next-line: object-literal-sort-keys
    'public-client': true,
    realm: realm ? realm : CONSTANTS.KEYCLOAK_REALM,
    resource: 'portal',
    'auth-server-url': url ? `${url}` : `${CONSTANTS.HTTPS_HOST}/auth`,
    'confidential-port': 0,
  }
}

export function getOAuthKeycloakConfig() {
  return {
    bearerOnly: true,
    credentials: {
      secret: CONSTANTS.KEYCLOAK_GOOGLE_CLIENT_SECRET,
    },
    realm: CONSTANTS.PORTAL_REALM,
    resource: CONSTANTS.KEYCLOAK_GOOGLE_CLIENT_ID,
    serverUrl: CONSTANTS.PORTAL_AUTH_SERVER_URL,
  }
}

export function getSSOKeyCloakClient() {
  const sessionConfig = getSessionConfig()
  return new keycloak({ store: sessionConfig.store }, getOAuthKeycloakConfig())
}
