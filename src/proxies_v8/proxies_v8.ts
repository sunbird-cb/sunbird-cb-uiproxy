import axios from 'axios'
import express from 'express'
import { UploadedFile } from 'express-fileupload'
import FormData from 'form-data'
import lodash from 'lodash'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logError, logInfo } from '../utils/logger'
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
  kongExtOrgSearch: `${CONSTANTS.KONG_API_BASE}/org/v1/cb/ext/search`,
  kongSearchOrg: `${CONSTANTS.KONG_API_BASE}/org/v1/search`,
  orgTypeListEndPoint: `${CONSTANTS.KONG_API_BASE}/data/v1/system/settings/get/orgTypeList`,
}

export const proxiesV8 = express.Router()
const _ = require('lodash')

const FILE_NOT_FOUND_ERR = 'File not found in the request'

proxiesV8.get('/', (_req, res) => {
  res.json({
    type: 'PROXIES Route',
  })
})

proxiesV8.post('/upload/*', (req, res) => {
  if (req.files && req.files.data) {
    const url = removePrefix('/proxies/v8/upload/action', req.originalUrl)
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
          // tslint:disable-next-line: all
          'x-authenticated-user-token': extractUserToken(req),
          // tslint:disable-next-line: all
          'x-authenticated-userid': extractUserIdFromRequest(req),
        },
        host: 'content-service',
        path: url,
        port: 9000,
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
    res.send(FILE_NOT_FOUND_ERR)
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
          // tslint:disable-next-line: all
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
    _res.send(FILE_NOT_FOUND_ERR)
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

proxiesV8.use('/sunbirdigot/v4/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/composite/v4/search`)
)

proxiesV8.use('/sunbirdigot/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/composite/v1/search`)
)

proxiesV8.use('/v1/content/retire',
  proxyCreatorKnowledge(express.Router(), `${CONSTANTS.KNOWLEDGE_MW_API_BASE}`)
)

proxiesV8.use('/v1/content/copy/*',
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

proxiesV8.use('/read/user/insights',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/insights`)
)

proxiesV8.use('/trending/content/search',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/trending/search`)
)

proxiesV8.use('/halloffame/read',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/halloffame/read`)
)

proxiesV8.use('/karmapoints/read',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/karmapoints/read`)
)
proxiesV8.use('/karmapoints/user/course/read',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/karmapoints/user/course/read`)
)

proxiesV8.use('/claimkarmapoints',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/claimkarmapoints`)
)
proxiesV8.use('/login/entry*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/v1/user/login`)
)
proxiesV8.use('/user/totalkarmapoints',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/user/totalkarmapoints`)
)

proxiesV8.use('/halloffame/learnerleaderboard',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbirdSearch(express.Router(), `${CONSTANTS.KONG_API_BASE}/halloffame/learnerleaderboard`)
)
proxiesV8.get(['/api/user/v2/read', '/api/user/v2/read/:id'], async (req, res) => {
  const host = req.get('host')
  const originalUrl = req.originalUrl
  const lastIndex = originalUrl.lastIndexOf('/')
  const subStr = originalUrl.substr(lastIndex).substr(1).split('-').length
  const loggedInUserId = extractUserIdFromRequest(req).split(':')[2]
  let urlUserId = ''
  let userId = loggedInUserId
  if (subStr === 5 && (originalUrl.substr(lastIndex).substr(1))) {
    urlUserId = originalUrl.substr(lastIndex).substr(1)
    userId = urlUserId
  }

  await axios({
    ...axiosRequestConfig,
    headers: {
        Authorization: CONSTANTS.SB_API_KEY,
        // tslint:disable-next-line: all
        'x-authenticated-user-token': extractUserToken(req),
    },
    method: 'GET',
    url: `${CONSTANTS.KONG_API_BASE}/user/v2/read/` + userId,
  }).then((response) => {
    if (response.data.responseCode === 'OK') {
      res.status(200).send(response.data)
    } else {
      logError('User Read API.. Received non OK response.' + JSON.stringify(response.data))
      if (urlUserId.length > 1 && urlUserId !== loggedInUserId) {
        res.status(400).send(response.data)
      } else {
        res.redirect(`https://${host}/public/logout?error=` + encodeURIComponent(JSON.stringify(response.data.params.errmsg)))
      }
    }
  }).catch((err) => {
    logError('Failed to do user read API. Received Exception: loggedInUserId : ' + loggedInUserId + ', urlUserId: ' + urlUserId)
    let errMsg = 'Internal Server Error'
    if (err.response && err.response.data) {
      logError('Received error for user read API. Error: ' + JSON.stringify(err.response.data))
      errMsg = err.response.data.params.errmsg
    }
    if (urlUserId.length > 1 && urlUserId !== loggedInUserId) {
      res.status(400).send(err.response.data)
    } else {
      if (req.session) {
        req.session.destroy((dErr) => {
          logError('Failed to clear the session. ERROR: ' + JSON.stringify(dErr))
        })
      }
      res.clearCookie('connect.sid', { path: '/' })
      res.redirect(`https://${host}/public/logout?error=` + encodeURIComponent(errMsg))
    }
  })
})

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

proxiesV8.use('/mdo/content/*',
  proxyCreatorKnowledge(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/learner/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorLearner(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/notification/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.post('/org/v1/search', async (req, res) => {
  const roleData = lodash.get(req, 'session.userRoles')
  const rootOrgId = lodash.get(req, 'session.rootOrgId')
  let urlPath = API_END_POINTS.kongSearchOrg
  if (roleData.includes('STATE_ADMIN')) {
    req.body.request.filters.sbRootOrgId = rootOrgId
    urlPath = API_END_POINTS.kongExtOrgSearch
  }
  const searchResponse = await axios({
    ...axiosRequestConfig,
    data: req.body,
    headers: {
        Authorization: CONSTANTS.SB_API_KEY,
        // tslint:disable-next-line: all
        'x-authenticated-user-token': extractUserToken(req),
    },
    method: 'POST',
    url: urlPath,
  })
  res.status(200).send(searchResponse.data)
})

proxiesV8.use('/org/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/dashboard/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.post(['/user/v1/bulkupload', '/storage/profilePhotoUpload/*', '/workflow/admin/transition/bulkupdate'], (req, res) => {
  if (req.files && req.files.data) {
    const url = removePrefix('/proxies/v8', req.originalUrl)
    const file: UploadedFile = req.files.data as UploadedFile
    const formData = new FormData()
    formData.append('file', Buffer.from(file.data), {
      contentType: file.mimetype,
      filename: file.name,
    })
    let rootOrgId = _.get(req, 'session.rootOrgId')
    if (!rootOrgId) {
      rootOrgId = ''
    }
    let channel = _.get(req, 'session.channel')
    if (!channel) {
      channel = ''
    }
    formData.submit(
      {
        headers: {
          // tslint:disable-next-line:max-line-length
          Authorization: CONSTANTS.SB_API_KEY,
          // tslint:disable-next-line: all
          'x-authenticated-user-channel': encodeURIComponent(channel),
          'x-authenticated-user-orgid': rootOrgId,
          'x-authenticated-user-orgname': encodeURIComponent(channel),
          'x-authenticated-user-token': extractUserToken(req),
          'x-authenticated-userid': extractUserIdFromRequest(req),
        },
        host: 'kong',
        path: url,
        port: 8000,
      },
      // tslint:disable-next-line: all
      (err, response) => {
        // tslint:disable-next-line: all
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
    res.send(FILE_NOT_FOUND_ERR)
  }
})

proxiesV8.use('/user/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/otp/*',
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

proxiesV8.use('/forms/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/masterData/*',
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

proxiesV8.get('/data/v1/system/settings/get/orgTypeList', async (req, res) => {
  const roleData = lodash.get(req, 'session.userRoles')
  logInfo('orgTypeList API call : Users Roles are...')
  logInfo(roleData)
  const response = await axios({
    ...axiosRequestConfig,
    headers: {
      Authorization: CONSTANTS.SB_API_KEY,
      // tslint:disable-next-line: all
      'x-authenticated-user-token': extractUserToken(req),
    },
    method: 'GET',
    url: API_END_POINTS.orgTypeListEndPoint,
  })
  if (roleData.includes('STATE_ADMIN')) {
    const hiddenList = ['CBC', 'CBP', 'STATE']
    const orgTypeListObj = JSON.parse(response.data.result.response.value)
    const orgTypeList = orgTypeListObj.orgTypeList
    // tslint:disable-next-line: no-any
    orgTypeList.forEach((element: any) => {
      if (hiddenList.includes(element.name)) {
        element.isHidden = true
      }
    })
    orgTypeListObj.orgTypeList = orgTypeList
    response.data.result.response.value = JSON.stringify(orgTypeListObj)
  }
  res.status(200).send(response.data)
})

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
  proxyAssessmentRead(express.Router(), `${CONSTANTS.KONG_API_BASE}` + '/player/questionset/v4/hierarchy')
)

proxiesV8.use('/question/read',
  // tslint:disable-next-line: max-line-length
  proxyQuestionRead(express.Router(), `${CONSTANTS.KONG_API_BASE}` + '/player/question/v4/list')
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

proxiesV8.use('/moderatoradmin/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/workflow/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/blendedprogram/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/batchsesion/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/course/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/faq/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/curatedprogram/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/openprogram/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/program/*',
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/competency/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/cbplan/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/ehrms/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)
proxiesV8.use('/wheebox/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/operationalreports/*',
// tslint:disable-next-line: max-line-length
proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/surveys/*',
proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/surveySubmissions/*',
proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)
proxiesV8.use('/cloud-services/*',
proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/observations/*',
proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)

proxiesV8.use('/observationSubmissions/*',
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

proxiesV8.use('/portal/*',
  // tslint:disable-next-line: max-line-length
  proxyCreatorSunbird(express.Router(), `${CONSTANTS.KONG_API_BASE}`)
)