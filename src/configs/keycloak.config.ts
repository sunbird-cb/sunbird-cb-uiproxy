import { CONSTANTS } from '../utils/env'

export function getKeycloakConfig(url?: string, realm?: string) {
  return {
    'ssl-required': 'external',
    // tslint:disable-next-line: object-literal-sort-keys
    'public-client': true,
    realm: realm ? realm : CONSTANTS.KEYCLOAK_REALM,
    resource: 'portal',
    'auth-server-url': url ? `${url}` : `${CONSTANTS.HTTPS_HOST}/auth`,
    'realm-public-key' : CONSTANTS.KEYCLOAK_PUBLIC_KEY,
  }
}
