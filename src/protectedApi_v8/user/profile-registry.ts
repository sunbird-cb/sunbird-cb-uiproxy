import axios from 'axios'
import { Router } from 'express'
import { axiosRequestConfig, axiosRequestConfigLong } from '../../configs/request.config'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { extractAuthorizationFromRequest,
  extractUserIdFromRequest,
  IAuthorizedRequest } from '../../utils/requestExtract'

const API_END_POINTS = {
  createUserRegistry: (userId: string) => `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/create/profile?userId=${userId}`,
  getAllPosition: `${CONSTANTS.FRAC_API_BASE}/frac/getAllNodes?type=POSITION&status=VERIFIED`,
  getUserRegistry: `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/get/profile`,
  getUserRegistryById: (userId: string) => `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/search/profile?userId=${userId}`,
  masterLanguages: `${CONSTANTS.KONG_API_BASE}/masterData/v1/languages`,
  masterNationalities: `${CONSTANTS.KONG_API_BASE}/masterData/v1/nationalities`,
  masterCountries: `${CONSTANTS.KONG_API_BASE}/masterData/v1/countries`,
  profilePageMetaData: `${CONSTANTS.KONG_API_BASE}/masterData/v1/profilePageMetaData`,
  searchUserRegistry: `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/search/profile`,
  updateUserRegistry: (userId: string) => `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/update/profile?userId=${userId}`,
  updateUserWorkflowRegistry: (userId: string) =>
    `${CONSTANTS.NETWORK_HUB_SERVICE_BACKEND}/v1/user/update/workflow/profile?userId=${userId}`,
}

const profileStatusCheckConfig = {
  personalDetails: ['firstname', 'surname', 'dob', 'nationality', 'domicileMedium', 'gender', 'maritalStatus',
    'category', 'mobile', 'primaryEmail', 'postalAddress', 'pincode'],
}

const ERROR_MESSAGE_CREATE_REGISTRY = 'ERROR CREATING USER REGISTRY >'
const CONNECTION_ERROR = 'CONNECTIONS REQUESTS ERROR> '
const unknown = 'Connections Apis:- Failed due to unknown reason'

export const profileRegistryApi = Router()

profileRegistryApi.post('/createUserRegistry', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    logInfo('Create user registry for', userId)
    const getUserIdExistresponse = await axios.get(API_END_POINTS.getUserRegistryById(userId), {
      ...axiosRequestConfig,
    })
    if (getUserIdExistresponse.data && getUserIdExistresponse.data.result &&
      getUserIdExistresponse.data.result.UserProfile
      && getUserIdExistresponse.data.result.UserProfile.length) {

      const response = await axios.post(API_END_POINTS.updateUserRegistry(userId), { ...req.body, userId }, {
        ...axiosRequestConfigLong,
      })
      res.status(response.status).json(response.data)
    } else {
      // const data = req.body;
      // const deptName = req.body.
      const response = await axios.post(API_END_POINTS.createUserRegistry(userId), { ...req.body, userId }, {
        ...axiosRequestConfigLong,
      })
      res.status(response.status).json(response.data)
    }
  } catch (err) {
    logError(ERROR_MESSAGE_CREATE_REGISTRY, err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

profileRegistryApi.post('/updateUserRegistry', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    logInfo('Update user registry for', userId)
    const response = await axios.post(API_END_POINTS.updateUserRegistry(userId), { ...req.body, userId }, {
      ...axiosRequestConfigLong,
    })
    res.status(response.status).json(response.data)
  } catch (err) {
    logError(ERROR_MESSAGE_CREATE_REGISTRY, err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

profileRegistryApi.post('/updateUserWorkflowRegistry', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    logInfo('Update user workflow registry for', userId)
    const response = await axios.post(API_END_POINTS.updateUserWorkflowRegistry(userId), { ...req.body, userId }, {
      ...axiosRequestConfigLong,
    })
    res.status(response.status).json(response.data)
  } catch (err) {
    logError('ERROR UPDATING USER REGISTRY WORKFLOW>', err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

// tslint:disable-next-line: no-identical-functions
profileRegistryApi.get('/getUserRegistry/:osid', async (req, res) => {
  try {
    const osid = req.params.osid
    logInfo('Get user registry for', osid)
    const response = await axios.post(API_END_POINTS.getUserRegistry, { osid }, {
      ...axiosRequestConfig,
    })
    res.status(response.status).send(response.data)
  } catch (err) {
    logError('ERROR FETCHING USER REGISTRY >', err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

// @Deprecated - Use Read API
// tslint:disable-next-line: no-identical-functions
profileRegistryApi.get('/getUserRegistryById', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    logInfo('Get user registry by id', userId)

    const response = await axios.get(API_END_POINTS.getUserRegistryById(userId), {
      ...axiosRequestConfig,
    })
    res.status(response.status).send(response.data)
  } catch (err) {
    logError('ERROR FETCHING USER REGISTRY by id >', err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

profileRegistryApi.post('/searchUserRegistry', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    logInfo('Search user registry', userId)

    const response = await axios.post(API_END_POINTS.searchUserRegistry, { ...req.body }, {
      ...axiosRequestConfig,
    })
    res.status(response.status).json(response.data)
  } catch (err) {
    logError('ERROR FETCHING USER REGISTRY by id >', err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

profileRegistryApi.get('/getUserRegistryByUser/:id', async (req, res) => {
  try {
    let userId = req.params.id
    if (!userId) {
      userId = extractUserIdFromRequest(req)
    }
    logInfo('Get user registry for', userId)

    const response = await axios.get(API_END_POINTS.getUserRegistryById(userId), {
      ...axiosRequestConfig,
    })
    res.status(response.status).send(response.data)
  } catch (err) {
    logError('ERROR FETCHING USER REGISTRY >', err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

profileRegistryApi.get('/getMasterNationalities', async (_req, res) => {
  try {
    const response = await axios.get(API_END_POINTS.masterNationalities, {
      ...axiosRequestConfig,
      headers: {
        Authorization: CONSTANTS.SB_API_KEY,
      },
    })
    res.send((response.data))
  } catch (err) {
    logError(CONNECTION_ERROR, err)
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})

profileRegistryApi.get('/getMasterCountries', async (_req, res) => {
  try {
    const response = await axios.get(API_END_POINTS.masterCountries, {
      ...axiosRequestConfig,
      headers: {
        Authorization: CONSTANTS.SB_API_KEY,
      },
    })
    res.send((response.data))
  } catch (err) {
    logError(CONNECTION_ERROR, err)
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})

profileRegistryApi.get('/getMasterLanguages', async (_req, res) => {
  try {
    const response = await axios.get(API_END_POINTS.masterLanguages, {
      ...axiosRequestConfig,
      headers: {
        Authorization: CONSTANTS.SB_API_KEY,
      },
    })
    res.send((response.data))
  } catch (err) {
    logError(CONNECTION_ERROR, err)
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})

profileRegistryApi.get('/getProfilePageMeta', async (_req, res) => {
  try {
    const response = await axios.get(API_END_POINTS.profilePageMetaData, {
      ...axiosRequestConfig,
      headers: {
        Authorization: CONSTANTS.SB_API_KEY,
      },
    })
    res.send((response.data))
  } catch (err) {
    logError(CONNECTION_ERROR, err)
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})

profileRegistryApi.post('/createUserRegistryV2/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    logInfo('Create user registry for', userId)
    const getUserIdExistresponse = await axios.get(API_END_POINTS.getUserRegistryById(userId), {
      ...axiosRequestConfig,
    })
    if (getUserIdExistresponse.data && getUserIdExistresponse.data.result &&
      getUserIdExistresponse.data.result.UserProfile
      && getUserIdExistresponse.data.result.UserProfile.length) {

      const response = await axios.post(API_END_POINTS.updateUserRegistry(userId), { ...req.body, userId }, {
        ...axiosRequestConfigLong,
      })
      res.status(response.status).json(response.data)
    } else {
      // const data = req.body;
      // const deptName = req.body.
      const response = await axios.post(API_END_POINTS.createUserRegistry(userId), { ...req.body, userId }, {
        ...axiosRequestConfigLong,
      })
      res.status(response.status).json(response.data)
    }
  } catch (err) {
    logError(ERROR_MESSAGE_CREATE_REGISTRY, err)
    res.status((err && err.response && err.response.status) || 500).send(err)
  }
})

export async function getProfileStatus(userId: string) {
  try {
    const response = await axios.get(API_END_POINTS.getUserRegistryById(userId), {
      ...axiosRequestConfig,
    })
    const userProfileResult = response.data.result.UserProfile
    if ((typeof userProfileResult !== 'undefined' && userProfileResult.length > 0) && (userId === userProfileResult[0].userId)) {
      let profileMatch = true
      const profileData = userProfileResult[0]
      Object.keys(profileStatusCheckConfig).forEach((key) => {
          const keyData = profileData[key]
          for (const iterator of profileStatusCheckConfig[key]) {
            if ((!profileData[key] || !keyData[iterator])) {
              logInfo(iterator + '  ' + keyData[iterator])
              profileMatch = false
              break
            }
          }
      })
      return profileMatch
    }
    return false
  } catch (error) {
    logError('ERROR WHILE FETCHING THE USER DETAILS FROM REGISTERY --> ', error)
    return false
  }
}

export interface IPosition {
  type: string
  id: string
  name: string
  description: string
  status: string
  secondaryStatus: string
  source: string
  active: string
}

export async function designationMetaFrac(req: IAuthorizedRequest) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_END_POINTS.getAllPosition, {
        ...axiosRequestConfig,
        headers: {
            Authorization: extractAuthorizationFromRequest(req),
        },
      })
      if (response.data.responseData) {
        const result = response.data.responseData.map((item: IPosition) => {
            return { name : item.name }
        })
        resolve(result)
      } else {
        reject('Failed to receive response from FRAC API for designations')
      }
    } catch (err) {
      logError('ERROR while calling FRAC API to get Designation')
      throw err
    }
  })
}
