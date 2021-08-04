import { Router } from 'express'
import { autocompleteApi } from './auto-complete'
import { userContentApi } from './content'
import { detailsApi } from './details'
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
user.use('/autocomplete', autocompleteApi) // Validate
user.use('/content', userContentApi) // Validate
user.use('/details', detailsApi) // Validate
user.use('/history', historyApi) // Validate
user.use('/notifications', notificationsApi) // Validate
user.use('/preference', protectedPreference) // Validate
user.use('/profileDetails', profileDeatailsApi) // Validate
user.use('/progress', progressApi)
user.use('/rating', ratingApi) // Validate
user.use('/roles', rolesApi) // Validate
user.use('/telemetry', telemetryApi) // Validate
user.use('/mandatoryContent', mandatoryContent) // Validate
user.use('/profileRegistry', profileRegistryApi) // Validate
