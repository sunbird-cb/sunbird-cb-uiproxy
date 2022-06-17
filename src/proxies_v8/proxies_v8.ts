import axios from 'axios'
import express from 'express'
import { UploadedFile } from 'express-fileupload'
import FormData from 'form-data'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logInfo } from '../utils/logger'
import {
  ilpProxyCreatorRoute,
  // proxyCreatorDiscussion,
  proxyAssessmentRead,
  proxyContent,
  proxyContentLearnerVM,
  proxyCreatorKnowledge,
  proxyCreatorLearner,
  proxyCreatorQML,
  proxyCreatorRoute,
  proxyCreatorSunbird,
  proxyCreatorSunbirdSearch,
  proxyCreatorToAppentUserId,
  proxyQuestionRead,
  scormProxyCreatorRoute
} from '../utils/proxyCreator'
import { extractUserIdFromRequest, extractUserToken } from '../utils/requestExtract'

const API_END_POINTS = {
  contentNotificationEmail: `${CONSTANTS.NOTIFICATION_SERVIC_API_BASE}/v1/notification/send/sync`,
}

export const proxiesV8 = express.Router()

proxiesV8.get('/', (_req, res) => {
  res.json({
    type: 'PROXIES Route',
  })
})

proxiesV8.post('/upload/*', (req, res) => {
  if (req.files && req.files.data) {
    const url = removePrefix('/proxies/v8/upload', req.originalUrl)
    const file: UploadedFile = req.files.data as UploadedFile
    const formData = new FormData()
    formData.append('file', Buffer.from(file.data), {
      contentType: file.mimetype,
      filename: file.name,
    })
    formData.submit(
      {
        headers: {
          // tslint:disable-next-line:max-line-length
          Authorization: CONSTANTS.SB_API_KEY,
          org: 'dopt',
          rootorg: 'igot',
          'x-authenticated-user-token': extractUserToken(req),
          'x-authenticated-userid': extractUserIdFromRequest(req),
        },
        host: 'knowledge-mw-service',
        path: url,
        port: 5000,
      },
      (err, response) => {

        response.on('data', (data) => {
          if (!err && (response.statusCode === 200 || response.statusCode === 201)) {
            res.send(JSON.parse(data.toString('utf8')))
          } else {
            res.send(data.toString('utf8'))
          }
        })
        if (err) {
          res.send(err)
        }

      }
    )
  } else {
    res.send('File not found')
  }
})

proxiesV8.post('/private/upload/*', (_req, _res) => {
  if (_req.files && _req.files.data) {
    const _url = removePrefix('/proxies/v8/private/upload', _req.originalUrl)
    const _file: UploadedFile = _req.files.data as UploadedFile
    const _formData = new FormData()
    _formData.append('file', Buffer.from(_file.data), {
      contentType: _file.mimetype,
      filename: _file.name,
    })
    _formData.submit(
      {
        headers: {
          // tslint:disable-next-line:max-line-length
          Authorization: CONSTANTS.SB_API_KEY,
          org: 'dopt',
          rootorg: 'igot',
          'x-authenticated-user-token': extractUserToken(_req),
          'x-authenticated-userid': extractUserIdFromRequest(_req),
        },
        host: 'content-service',
        path: _url,
        port: 9000,
      },
      (_err, _response) => {

        _response.on('data', (_data) => {
          if (!_err && (_response.statusCode === 200 || _response.statusCode === 201)) {
            _res.send(JSON.parse(_data.toString('utf8')))
          } else {
            _res.send(_data.toString('utf8'))
          }
        })
        if (_err) {
          _res.send(_err)
        }

      }
    )
  } else {
    _res.send('File not found')
  }
})

proxiesV8.use(
  '/content',
  proxyCreatorRoute(express.Router(), CONSTANTS.CONTENT_API_BASE + '/content')
)
proxiesV8.use(
  '/contentv3',
  proxyCreatorRoute(express.Router(), CONSTANTS.CONTENT_API_BASE + '/contentv3')
)
proxiesV8.use(
  '/fastrack',
  proxyCreatorRoute(express.Router(), CONSTANTS.ILP_FP_PROXY + '/fastrack')
)
proxiesV8.use(
  '/hosted',
  proxyCreatorRoute(express.Router(), CONSTANTS.CONTENT_API_BASE + '/hosted')
)
proxiesV8.use('/ilp-api', ilpProxyCreatorRoute(express.Router(), CONSTANTS.ILP_FP_PROXY))
proxiesV8.use(
  '/scorm-player',
  scormProxyCreatorRoute(express.Router(), CONSTANTS.SCORM_PLAYER_BASE)
)
proxiesV8.use(
  '/LA',
  proxyCreatorRoute(express.Router(), CONSTANTS.APP_ANALYTICS, Number(CONSTANTS.ANALYTICS_TIMEOUT))
)
proxiesV8.use(
  '/FordGamification',
  proxyCreatorRoute(express.Router(), CONSTANTS.GAMIFICATION_API_BASE + '/FordGamification')
)
proxiesV8.use(
  '/static-ilp',
  proxyCreatorRoute(express.Router(), CONSTANTS.STATIC_ILP_PROXY + '/static-ilp')
)
proxiesV8.use(
  '/web-hosted',
  proxyCreatorRoute(express.Router(), CONSTANTS.WEB_HOST_PROXY + '/web-hosted')
)

proxiesV8.use('/contentsearch/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/content/v1/search`)
)

proxiesV8.use('/sunbirdigot/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/composite/v1/search`)
)

proxiesV8.use('/v1/content/retire',
  proxyCreatorKnowledge(express.Router(), `${CONSTANTS.KNOWLEDGE_MW_API_BASE}`)
)

proxiesV8.use('/private/content/*',
  proxyContent(express.Router(), `${CONSTANTS.CONTENT_SERVICE_API_BASE}`)
)

proxiesV8.use('/learnervm/private/content/*',
  proxyContentLearnerVM(express.Router(), `${CONSTANTS.VM_LEARNING_SERVICE_URL}`)
)

proxiesV8.use('/content-progres/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/course/v1/content/state/update`)
)
proxiesV8.use('/read/content-progres/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/course/v1/content/state/read`)
)

proxiesV8.use('/api/user/v2/read',
  proxyCreatorToAppentUserId(express.Router(), `${CONSTANTS.KONG_API_BASE}/user/v2/read/`)
)

proxiesV8.use('/api/user/v5/read',
  proxyCreatorToAppentUserId(express.Router(), `${CONSTANTS.KONG_API_BASE}/user/v5/read/`)
)

proxiesV8.use([
  '/action/questionset/v1/*',
  '/action/question/v1/*',
  '/action/object/category/definition/v1/*',
],
  proxyCreatorQML(express.Router(), `${CONSTANTS.KONG_API_BASE}`, '/action/')
)
proxiesV8.use('/action/content/v3/updateReviewStatus',
  proxyCreatorKnowledge(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)
proxiesV8.use('/action/content/v3/hierarchyUpdate',
  proxyCreatorKnowledge(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)
proxiesV8.use('/action/*',
  proxyCreatorKnowledge(express.Router(), `${CONSTANTS.KNOWLEDGE_MW_API_BASE}`)
)

proxiesV8.use('/learner/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorLearner(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/notification/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.get('/org/v1/profile/read/:orgId', async (req, res) => {
  const orgId = req.params.orgId
  const response = {
    id: 'api.org.profile.read',
    params: {
      status: 'SUCCESS',
    },
    responseCode: 'OK',
    result: {
      response: {
        organisationId: orgId,
        profile: {
          consultancy: {},
          faculty: {},
          infrastructure: {},
          instituteProfile: {},
          platformWalkthrough: {},
          research: {},
          rolesAndFunctions: {},
          trainingPrograms: {},
        },
      },
    },

    ver: 'v1',
  }
  res.status(200).send(response)
})

proxiesV8.get('/org/v1/list/:type', async (req, res) => {
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
    case 'SPV':
      response.result.response[content] = spvList
      response.result.response[count] = spvList.length
      break
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
      break
  }

  res.status(200).send(response)
})

proxiesV8.use('/org/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/dashboard/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/user/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/event/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/searchBy/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/staff/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/budget/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/orghistory/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/storage/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

// proxiesV8.use('/api/framework/*',
//   // tslint:disable-next-line: max-line-length
//   proxyCreatorQML(express.Router(), `${CONSTANTS.KONG_API_BASE}`, '/api/')
// )

proxiesV8.use('/api/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/dashboard/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/wat/dashboard/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.DASHBOARD_API_BASE}`)
)

proxiesV8.use('/data/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/assets/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

// proxiesV8.use('/discussion/user/v1/create',
//   // tslint:disable-next-line: max-line-length
//   proxyCreatorDiscussion(express.Router(), `${CONSTANTS.DISCUSSION_HUB_MIDDLEWARE}`)
// )
proxiesV8.use('/discussion/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/assessment/read/*',
  // tslint:disable-next-line: max-line-length
  proxyAssessmentRead(express.Router(), `${CONSTANTS.KONG_API_BASE}` + '/player/questionset/v1/hierarchy')
)

proxiesV8.use('/question/read',
  // tslint:disable-next-line: max-line-length
  proxyQuestionRead(express.Router(), `${CONSTANTS.KONG_API_BASE}` + '/player/question/v1/list')
)

proxiesV8.use('/cbp/question/list',
  // tslint:disable-next-line: max-line-length
  proxyQuestionRead(express.Router(), `${CONSTANTS.KONG_API_BASE}` + '/question/v1/list')
)

proxiesV8.use('/questionset/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/ratings/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

function removePrefix(prefix: string, s: string) {
  return s.substr(prefix.length)
}

proxiesV8.post('/notifyContentState', async (req, res) => {
  const contentStateError = 'It should be one of [sendForReview, reviewCompleted, reviewFailed,' +
  ' sendForPublish, publishCompleted, publishFailed]'
  if (!req.body || !req.body.contentState) {
    res.status(400).send('ContentState is missing in request body. ' + contentStateError)
  }
  logInfo('Received req url is -> ' + req.protocol + '://' + req.get('host') + req.originalUrl)
  let contentBody = ''
  let emailSubject = ''
  switch (req.body.contentState) {
    case 'sendForReview':
      contentBody = `${CONSTANTS.NOTIFY_SEND_FOR_REVIEW_BODY}`
      emailSubject = 'Request to Review Content'
      break
    case 'reviewCompleted':
      contentBody = `${CONSTANTS.NOTIFY_REVIEW_COMPLETED_BODY}`
      emailSubject = 'Content Review Completed'
      break
    case 'reviewFailed':
      contentBody = `${CONSTANTS.NOTIFY_REVIEW_FAILED}`
      emailSubject = 'Content Review Failed'
      break
    case 'sendForPublish':
      contentBody = `${CONSTANTS.NOTIFY_SEND_FOR_PUBLISH_BODY}`
      emailSubject = 'Request to Publish Content'
      break
    case 'publishCompleted':
      contentBody = `${CONSTANTS.NOTIFY_PUBLISH_COMPLETED_BODY}`
      emailSubject = 'Content Publish Completed'
      break
    case 'publishFailed':
      contentBody = `${CONSTANTS.NOTIFY_PUBLIST_FAILED}`
      emailSubject = 'Content Publish Failed'
      break
    default:
      res.status(400).send('Invalid ContentState. ' + contentStateError)
      break
  }

  if (contentBody.includes('#contentLink') && req.body.contentLink && req.body.contentName) {
    contentBody = contentBody.replace('#contentLink', req.body.contentLink)
  }
  logInfo('Composed contentBody -> ' + contentBody)
  const notifyMailRequest = {
    config: {
      sender: req.body.sender,
      subject: emailSubject,
    },
    deliveryType: 'message',
    ids: req.body.recipientEmails,
    mode: 'email',
    template: {
      id: `${CONSTANTS.NOTIFY_EMAIL_TEMPLATE_ID}`,
      params: {
        body: contentBody,
        orgImageUrl: `${CONSTANTS.FRAC_API_BASE}` + '/img/logos/iGOT_logo.png',
        orgName: 'iGOT Support Team',
      },
    },
  }

  const stateEmailResponse = await axios({
    ...axiosRequestConfig,
    data: { request:
      {
        notifications: [notifyMailRequest],
      },
    },
    method: 'POST',
    url: API_END_POINTS.contentNotificationEmail,
  })
  logInfo('Response -> ' + JSON.stringify(stateEmailResponse.data))
  if (!stateEmailResponse.data.result.response) {
    res.status(400).send(stateEmailResponse.data)
  } else {
    res.status(200).send(stateEmailResponse.data)
  }
})
