import express from 'express'
import { CONSTANTS } from '../utils/env'
import { proxyCreatorRoute } from '../utils/proxyCreator'
import { workallocationPublic } from './workallocationPublic'

export const publicApiV8 = express.Router()

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
  const content = 'content'
  const count = 'count'
  const spvList = [
    {
      mapId: '123881',
      orgCode: 'M1',
      orgName: 'Ministry of Agriculture and Farmers Welfare',
      parentMapId: 'SPV',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
    {
      mapId: '123882',
      orgCode: 'M2',
      orgName: 'Ministry of AYUSH',
      parentMapId: 'SPV',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
  ]
  const minList123881 = [
    {
      mapId: '124023',
      orgCode: 'D1',
      orgName: 'Department of Agricultural Research and Education (DARE)',
      parentMapId: '123881',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
    {
      mapId: '124024',
      orgCode: 'D2',
      orgName: 'Department of Agriculture Cooperation and Farmers Welfare',
      parentMapId: '123881',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
  ]
  const minList123882 = [
    {
      mapId: '124026',
      orgCode: '',
      orgName: 'NA',
      parentMapId: '123882',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
  ]
  const orgList124023 = [
    {
      mapId: '127443',
      orgCode: 'O1',
      orgName: 'Agricultural Technology Information Centre (ATIC)',
      parentMapId: '124023',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
    {
      mapId: '127444',
      orgCode: 'O2',
      orgName: 'Agrinnovate India',
      parentMapId: '124023',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
  ]
  const orgList124026 = [
    {
      mapId: '127515',
      orgCode: 'O73',
      orgName: 'Central Council for Research in Yoga & Naturopathy (CCRYN) New Delhi',
      parentMapId: '124026',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
    {
      mapId: '127516',
      orgCode: 'O74',
      orgName: 'Homoeopathic Pharmacopoeia Laboratory (HPL) Ghaziabad Uttar Pradesh',
      parentMapId: '124026',
      sbOrgId: '',
      sbOrgSubType: '',
      sbOrgType: '',
    },
  ]

  const response = {
    id: 'api.org.profile.read',
    params: {
      status: 'SUCCESS',
    },
    responseCode: 'OK',
    result: {
      response: {
      },
    },
  }
  switch (type) {
    case '123881':
      response.result.response[content] = minList123881
      response.result.response[count] = minList123881.length
      break
    case '123882':
      response.result.response[content] = minList123882
      response.result.response[count] = minList123882.length
      break
    case '124023':
      response.result.response[content] = orgList124023
      response.result.response[count] = orgList124023.length
      break
    case '124026':
      response.result.response[content] = orgList124026
      response.result.response[count] = orgList124026.length
      break
    default:
      response.result.response[content] = spvList
      response.result.response[count] = spvList.length
      break
  }

  res.status(200).send(response)
})
