import cassandraDriver from 'cassandra-driver'
import cassandraStore from 'cassandra-store'
import expressSession from 'express-session'
import { CONSTANTS } from '../utils/env'
const expressCassandra = require('express-cassandra')
const _ = require('lodash')

let sessionConfig: expressSession.SessionOptions
const consistency = getConsistencyLevel(CONSTANTS.PORTAL_CASSANDRA_CONSISTENCY_LEVEL)

const cassandraClientOptions: cassandraDriver.ClientOptions = {
  contactPoints: getIPList(),
  keyspace: 'portal',
  queryOptions: {
    consistency,
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
        secure: true
      },
      resave: false,
      saveUninitialized: false,
      secret: '927yen45-i8j6-78uj-y8j6g9rf56hu',
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

// tslint:disable-next-line: no-any
function getConsistencyLevel(consistencyParam: any) {
  // tslint:disable-next-line: max-line-length
  return (consistencyParam && _.get(expressCassandra, `consistencies.${consistencyParam}`) ? _.get(expressCassandra, `consistencies.${consistencyParam}`) :  expressCassandra.consistencies.one)
}
