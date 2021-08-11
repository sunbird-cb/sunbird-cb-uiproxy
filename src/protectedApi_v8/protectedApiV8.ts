import express from 'express'
import { CONSTANTS } from '../utils/env'

import { catalogApi } from './catalog'
import { cohortsApi } from './cohorts'
import { connectionsV2Api } from './connections_v2'
import { contentValidationApi } from './contentValidation'
import { discussionHubApi } from './discussionHub/discussionHub'
import {  fracApi } from './frac'
import { portalApi } from './portal-v3'
import { userAuthKeyCloakApi } from './resource'
import { roleActivityApi } from './roleActivity'
import { scoringApi } from './scoring'
import { scromApi } from './scrom'
import { socialApi } from './social'
import { user } from './user/user'
import { workAllocationApi } from './workallocation'
import { workflowHandlerApi } from './workflow-handler'

export const protectedApiV8 = express.Router()

protectedApiV8.get('/', (_req, res) => {
  res.json({
    config: CONSTANTS.HTTPS_HOST,
    type: 'PROTECTED API HOST 👌',
  })
})

protectedApiV8.use('/catalog', catalogApi) // Valid
protectedApiV8.use('/cohorts', cohortsApi) // Valid
protectedApiV8.use('/profanity', contentValidationApi) // Valid
protectedApiV8.use('/discussionHub', discussionHubApi) // Valid
protectedApiV8.use('/scrom', scromApi) // Valid
protectedApiV8.use('/social', socialApi) // Valid
protectedApiV8.use('/user', user) // Valid
protectedApiV8.use('/connections', connectionsV2Api) // Valid
protectedApiV8.use('/portal', portalApi) // Valid
protectedApiV8.use('/scroing', scoringApi) // Valid
protectedApiV8.use('/workflowhandler', workflowHandlerApi) // Valid
protectedApiV8.use('/roleactivity', roleActivityApi) // Valid
protectedApiV8.use('/resource', userAuthKeyCloakApi) // Valid
protectedApiV8.use('/workallocation', workAllocationApi) // Valid
protectedApiV8.use('/frac', fracApi) // Valid
