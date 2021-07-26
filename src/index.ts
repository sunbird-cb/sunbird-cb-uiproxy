import cluster from 'cluster'
import { Server } from './server'

// Code to inject axios retry logic
import './utils/axios-retry'
import { CONSTANTS } from './utils/env'
import { log, logError, logObject, logSuccess, logWarnHeading } from './utils/logger'

if (cluster.isMaster) {
  logSuccess(`Master is running with process Id ${process.pid}`)
  logObject('Below Configuration will be used', CONSTANTS)
  if (CONSTANTS.IS_DEVELOPMENT) {
    cluster.fork()
  } else {
    const threadCount = CONSTANTS.CLUSTER_THREAD
    for (let index = 0; index < threadCount; index++) {
      cluster.fork()
    }
  }

  cluster.on('exit', () => {
    logError(`Worker died with process Id ${process.pid}`)
    cluster.fork()
  })
} else {
  Server.bootstrap()
  logSuccess(`Worker started with process Id ${process.pid}`)
}

process
  .on('unhandledRejection', (reason, p) => {
    logWarnHeading('Unhandled Rejection')
    log(reason, p)
  })
  .on('uncaughtException', (err) => {
    logWarnHeading('Un caught exception')
    log(err)
  })
