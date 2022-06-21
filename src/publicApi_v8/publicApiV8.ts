import axios from 'axios'
import express from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError } from '../utils/logger'
import { proxyCreatorRoute } from '../utils/proxyCreator'
import { workallocationPublic } from './workallocationPublic'

export const publicApiV8 = express.Router()

const API_END_POINTS = {
  kongOrgList: `${CONSTANTS.KONG_API_BASE}/org/v1/list`,
  kongOrgListWithId: (mapId: string) => `${CONSTANTS.KONG_API_BASE}/org/v1/list/${mapId}`,
}

publicApiV8.get('/', (_req, res) => {
  res.json({
    status: `Public Api is working fine https base: ${CONSTANTS.HTTPS_HOST}`,
  })
})

publicApiV8.use('/assets',
  proxyCreatorRoute(express.Router(), CONSTANTS.WEB_HOST_PROXY + '/web-hosted/web-client-public-assets'))

publicApiV8.use('/workallocation', workallocationPublic)

publicApiV8.get(['/org/v1/list', '/org/v1/list/:type'], async (req, res) => {
  const type = req.params.type
  let urlValue = ''
  if (type) {
    urlValue = API_END_POINTS.kongOrgListWithId(type)
  } else {
    urlValue = API_END_POINTS.kongOrgList
  }
  try {
    const sbUserReadResponse = await axios({
      ...axiosRequestConfig,
      headers: {
        Authorization: CONSTANTS.SB_API_KEY,
      },
      method: 'GET',
      url: urlValue,
    })
    res.status(200).send(sbUserReadResponse)
  } catch (err) {
    logError(err)
    res.status(500).send(err)
  }
})
