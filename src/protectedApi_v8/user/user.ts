import { Router } from 'express'
import { autocompleteApi } from './auto-complete'
import { userContentApi } from './content'
import { detailsApi } from './details'
import { evaluateApi } from './evaluate'
import { historyApi } from './history'
import { mandatoryContent } from './mandatoryContent'
import { notificationsApi } from './notifications'
import { protectedPreference } from './preference'
import { profileDeatailsApi } from './profile-details'
import { profileRegistryApi } from './profile-registry'
import { progressApi } from './progress'
import { ratingApi } from './rating'
import { rolesApi } from './roles'
import { telemetryApi } from './telemetry'

export const user = Router()
user.use('/autocomplete', autocompleteApi) // Valid
user.use('/evaluate', evaluateApi) // Valid
user.use('/content', userContentApi) // Valid
user.use('/details', detailsApi) // Valid
user.use('/history', historyApi) // Valid
user.use('/notifications', notificationsApi) // Valid
user.use('/preference', protectedPreference) // Valid
user.use('/profileDetails', profileDeatailsApi) // Valid
user.use('/progress', progressApi)
user.use('/rating', ratingApi) // Valid
user.use('/roles', rolesApi) // Valid
user.use('/telemetry', telemetryApi) // Valid
user.use('/mandatoryContent', mandatoryContent) // Valid
user.use('/profileRegistry', profileRegistryApi) // Valid
