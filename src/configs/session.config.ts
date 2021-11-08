import cassandraDriver from 'cassandra-driver'
import cassandraStore from 'cassandra-store'
import expressSession from 'express-session'
import { CONSTANTS } from '../utils/env'

let sessionConfig: expressSession.SessionOptions

const cassandraClientOptions: cassandraDriver.ClientOptions = {
  contactPoints: getIPList(),
  keyspace: 'portal',
  queryOptions: {
    prepare: true,
  },
}

function getIPList() {
  return CONSTANTS.CASSANDRA_IP.split(',')
}

if (
  CONSTANTS.IS_CASSANDRA_AUTH_ENABLED &&
  CONSTANTS.CASSANDRA_USERNAME &&
  CONSTANTS.CASSANDRA_PASSWORD
) {
  cassandraClientOptions.authProvider = new cassandraDriver.auth.PlainTextAuthProvider(
    CONSTANTS.CASSANDRA_USERNAME,
    CONSTANTS.CASSANDRA_PASSWORD
  )
}

export function getSessionConfig(
  isPersistant = true
): expressSession.SessionOptions {
  if (!sessionConfig) {
    sessionConfig = {
      cookie: {
        maxAge: CONSTANTS.KEYCLOAK_SESSION_TTL,
      },
      resave: false,
      saveUninitialized: false,
      secret: CONSTANTS.SESSION_CONFIG_SECRET,
      store: isPersistant
        ? new cassandraStore({
          client: null,
          clientOptions: cassandraClientOptions,
          table: 'sessions',
        })
        : new expressSession.MemoryStore(),
    }
  }
  return sessionConfig
}
