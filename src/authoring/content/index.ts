import axios from 'axios'
import { Request, Response, Router } from 'express'
import { axiosRequestConfig } from '../../configs/request.config'
import { AxiosRequestConfig } from '../../models/axios-request-config.model'
import { logError } from '../../utils/logger'
import { ERROR } from '../../utils/message'
import { extractUserToken } from '../../utils/requestExtract'
import { IUploadS3Request, IUploadS3Response } from '../models/response/custom-s3-upload'
import { decoder } from '../utils/decode'
import { getOrg, getRootOrg } from '../utils/header'
import { readJSONData } from '../utils/read-meta-and-json'
import { uploadJSONData } from '../utils/upload-meta-and-json'
import { CONSTANTS } from './../../utils/env'
import { IQuiz } from './../models/quiz'
import { IDownloadS3Request, IDownloadS3Response } from './../models/response/custom-s3-download'
import { IWebModuleRequest } from './../models/response/custom-s3-upload'
import { getHierarchy, getMultipleHierarchyV2 } from './hierarchy'
import { getHierarchyV2WithContent, getMultipleHierarchyV2WithContent } from './hierarchy-and-content'
import { searchForOtherLanguage } from './language-search'

export const authApi = Router()
const failedToProcess = 'Failed to process the request. '

const API_END_POINTS = {
  addCertToCourseBatch: `${CONSTANTS.KONG_API_BASE}/course/batch/cert/v1/template/add`,
  batchAddUser: `${CONSTANTS.KONG_API_BASE}/course/v1/enrol`,
  batchRemoveUser: `${CONSTANTS.KONG_API_BASE}/course/v1/unenrol`,
  createBatch: `${CONSTANTS.KONG_API_BASE}/course/v1/batch/create`,
  downloadCert: `${CONSTANTS.KONG_API_BASE}/certreg/v1/certs/download`,
  issueCertToCourseBatch: `${CONSTANTS.KONG_API_BASE}/course/batch/cert/v1/issue?reIssue=true`,
  readCert: (certId: string) => `${CONSTANTS.KONG_API_BASE}/certreg/v2/certs/download/${certId}`,
  removeCertFromCourseBatch: `${CONSTANTS.KONG_API_BASE}/course/batch/cert/v1/template/remove`,
  updateBatch: `${CONSTANTS.KONG_API_BASE}/course/v1/batch/update`,
}

authApi.all('*', (req, _res, next) => {
  if (req.body && req.body.data && typeof req.body.data === 'string') {
    req.body = decoder(req.body.data)
  }
  next()
})

authApi.get('/hierarchy/:id', async (req: Request, res: Response) => {
  try {
    const org = getOrg(req)
    const rootOrg = getRootOrg(req)
    const data = await getHierarchy(req.params.id, org, rootOrg, req)
    res.status(200).send(data)
  } catch (ex) {
    logError(ex)
    res.status(400).send({
      msg: ERROR.GENERAL_ERR_MSG,
    })
  }
})

authApi.get('/hierarchy/content/:id', async (req: Request, res: Response) => {
  try {
    const org = getOrg(req)
    const rootOrg = getRootOrg(req)
    const data = await getHierarchyV2WithContent(req.params.id, org, rootOrg, req)
    res.status(200).send(data)
  } catch (ex) {
    logError(ex)
    res.status(400).send({
      msg: ERROR.GENERAL_ERR_MSG,
    })
  }
})
authApi.get('/hierarchy/multiple/:ids', async (req: Request, res: Response) => {
  try {
    const org = getOrg(req)
    const rootOrg = getRootOrg(req)
    const ids: string[] = req.params.ids.split(',')
    const data = await getMultipleHierarchyV2(ids, org, rootOrg, req)
    res.status(200).send(data)
  } catch (ex) {
    logError(ex)
    res.status(400).send({
      msg: ERROR.GENERAL_ERR_MSG,
    })
  }
})

authApi.get('/hierarchy/multiple/content/:ids', async (req: Request, res: Response) => {
  try {
    const org = getOrg(req)
    const rootOrg = getRootOrg(req)
    const ids: string[] = req.params.ids.split(',')
    const data = await getMultipleHierarchyV2WithContent(ids, org, rootOrg, req)
    res.status(200).send(data)
  } catch (ex) {
    logError(ex)
    res.status(400).send({
      msg: ERROR.GENERAL_ERR_MSG,
    })
  }
})

authApi.get('/hierarchy/content/translation/:id', async (req, res) => {
  try {
    const org = getOrg(req)
    const rootOrg = getRootOrg(req)
    const otherLangContent = await searchForOtherLanguage(req.params.id, org, rootOrg)
    const resultPromise = await getMultipleHierarchyV2WithContent(
      otherLangContent,
      org,
      rootOrg,
      req
    )
    res.status(200).send(resultPromise)
  } catch (ex) {
    logError(ex)
    res.status(400).send({
      msg: ERROR.GENERAL_ERR_MSG,
    })
  }
})

authApi.post('/copy', (req: Request, res: Response) => {
  axios({
    data: {},
    method: 'POST',
    url: `${CONSTANTS.CONTENT_API_BASE}/contentv3/copy/${req.body.location}/${req.body.destination}`,
  } as AxiosRequestConfig)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})

authApi.post('/encode', (req: Request, res: Response) => {
  const body: { text: string; location: string; fileName: string } = req.body
  const location = body.location.split('/').join('%2F')
  delete body.location
  axios({
    data: body,
    method: 'POST',
    url: `${CONSTANTS.CONTENT_API_BASE}/contentv3/transform-and-upload/base64/${location}`,
  } as AxiosRequestConfig)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})

authApi.post('/upload/s3', async (req: Request, res: Response) => {
  const reqBody: Array<IUploadS3Request<{} | IQuiz | IWebModuleRequest>> = req.body
  const results: Array<Promise<IUploadS3Response>> = reqBody.map(async (v) => {
    return {
      identifier: v.identfier,
      ...(await uploadJSONData(v)),
    }
  })
  const finalResult: IUploadS3Response[] = []

  for (const result of results) {
    const report = await result
    finalResult.push(report)
  }
  res.status(200).send(finalResult)
})

authApi.post('/download/s3', async (req: Request, res: Response) => {
  const reqBody: IDownloadS3Request[] = req.body
  const results: Array<Promise<IDownloadS3Response>> = reqBody.map(async (v) => {
    return {
      content: await readJSONData(v),
      identifier: v.identifier,
    }
  })
  const finalResult: IDownloadS3Response[] = []

  for (const result of results) {
    const report = await result
    finalResult.push(report)
  }
  res.status(200).send(finalResult)
})

authApi.post('/content/v3/create', async (request: Request, res: Response) => {
  axios({
    data: request.body,
    headers: request.headers,
    method: request.method,
    url: CONSTANTS.SUNBIRD_PROXY_URL + request.url,
  } as AxiosRequestConfig)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})

authApi.get('/content/v3/read/:id', async (req: Request, res: Response) => {
  axios({
    headers: req.headers,
    method: req.method,
    url: CONSTANTS.SUNBIRD_PROXY_URL + req.url,
  } as AxiosRequestConfig)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})

authApi.patch('/content/v3/update/:id', async (req: Request, res: Response) => {
  axios({
    data: req.body,
    headers: req.headers,
    method: req.method,
    url: CONSTANTS.SUNBIRD_PROXY_URL + req.url,
  } as AxiosRequestConfig)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})

authApi.post('/batch/:key', async (req: Request, res: Response) => {
  try {
    const key = req.params.key as string
    let targetUrl = ''
    switch (key) {
      case 'create':
        targetUrl = API_END_POINTS.createBatch
        break
      case 'addUser':
          targetUrl = API_END_POINTS.batchAddUser
          break
      case 'removeUser':
        targetUrl = API_END_POINTS.batchRemoveUser
        break
      case 'issueBatchCert':
        targetUrl = API_END_POINTS.issueCertToCourseBatch
        break
      case 'downloadCert':
        targetUrl = API_END_POINTS.downloadCert
        break
      default:
        logError('Unsupported operation received for batch API - ' + key)
        res.status(400).send('Unsupported operation name - ' + key)
        break
    }
    const response = await axios.post(targetUrl, req.body, {
        ...axiosRequestConfig,
        headers: {
          Authorization: CONSTANTS.SB_API_KEY,
          // tslint:disable-next-line: no-duplicate-string
          'x-authenticated-user-token': extractUserToken(req),
        },
    })
    res.status(response.status).send(response.data)
  } catch (err) {
      logError(failedToProcess + err)
      res.status((err && err.response && err.response.status) || 500).send(
          (err && err.response && err.response.data) || {
              error: ERROR.GENERAL_ERR_MSG,
          }
      )
  }
})

authApi.patch('/batch/:key', async (req: Request, res: Response) => {
  try {
    const key = req.params.key as string
    let targetUrl = ''
    switch (key) {
      case 'update':
        targetUrl = API_END_POINTS.updateBatch
        break
      case 'addCert':
        targetUrl = API_END_POINTS.addCertToCourseBatch
        break
      case 'removeCert':
        targetUrl = API_END_POINTS.removeCertFromCourseBatch
        break
      default:
        logError('Unsupported operation received for batch API - ' + key)
        res.status(400).send('Unsupported operation name - ' + key)
        break
    }
    const response = await axios.patch(targetUrl, req.body, {
        ...axiosRequestConfig,
        headers: {
          Authorization: CONSTANTS.SB_API_KEY,
          // tslint:disable-next-line: no-duplicate-string
          'x-authenticated-user-token': extractUserToken(req),
        },
    })
    res.status(response.status).send(response.data)
  } catch (err) {
      logError(failedToProcess + err)
      res.status((err && err.response && err.response.status) || 500).send(
          (err && err.response && err.response.data) || {
              error: ERROR.GENERAL_ERR_MSG,
          }
      )
  }
})

authApi.get('/readCert/:certId', async (req, res) => {
  try {
      const certId = req.params.certId
      const response = await axios.get(API_END_POINTS.readCert(certId), {
          ...axiosRequestConfig,
          headers: {
              Authorization: CONSTANTS.SB_API_KEY,
              // tslint:disable-next-line: no-duplicate-string
              'x-authenticated-user-token': extractUserToken(req),
          },
      })
      res.status(response.status).send(response.data)
  } catch (err) {
      logError(failedToProcess + err)
      res.status((err && err.response && err.response.status) || 500).send(
          (err && err.response && err.response.data) || {
              error: ERROR.GENERAL_ERR_MSG,
          }
      )
  }
})

authApi.all('*', (req: Request, res: Response) => {
  axios({
    data: req.body,
    method: req.method,
    url: CONSTANTS.AUTHORING_BACKEND + req.url,
  } as AxiosRequestConfig)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})
