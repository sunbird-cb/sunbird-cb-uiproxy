import express from 'express'
import { CONSTANTS } from '../utils/env'
import { logError } from '../utils/logger'
import { proxyCreatorRoute } from '../utils/proxyCreator'
import { parichayAuth } from './parichayAuth'
import { workallocationPublic } from './workallocationPublic'

const puppeteer = require('puppeteer')
export const publicApiV8 = express.Router()

publicApiV8.get('/', (_req, res) => {
  res.json({
    status: `Public Api is working fine https base: ${CONSTANTS.HTTPS_HOST}`,
  })
})

publicApiV8.get('/systemDate', (_req, res) => {
  res.json({
    systemDate: new Date().getTime(),
  })
})

publicApiV8.post('/course/batch/cert/download/mobile', async (req, res) => {
  try {
    const svgContent = req.body.printUri
    if (req.body.outputFormat === 'svg') {
      const _decodedSvg = decodeURIComponent(svgContent.replace(/data:image\/svg\+xml,/, '')).replace(/\<!--\s*[a-zA-Z0-9\-]*\s*--\>/g, '')
      res.type('html')
      res.status(200).send(_decodedSvg)
    } else if (req.body.outputFormat === 'pdf') {
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
      const page = await browser.newPage()
      await page.goto(svgContent, { waitUntil: 'networkidle2' })
      const buffer = await page.pdf({ path: 'certificate.pdf', printBackground: true, width: '1204px', height: '662px' })
      res.set({ 'Content-Type': 'application/pdf', 'Content-Length': buffer.length })
      res.send(buffer)
      browser.close()
    } else {
      res.status(400).json({
        error: 'Unsupported output format',
        msg: 'Output format should be svg or pdf',
      })
    }
  } catch (err) {
    logError(err)

    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: 'Failed due to unknown reason',
      }
    )
  }
})

publicApiV8.use('/assets',
  proxyCreatorRoute(express.Router(), CONSTANTS.WEB_HOST_PROXY + '/web-hosted/web-client-public-assets'))

publicApiV8.use('/workallocation', workallocationPublic)

publicApiV8.use('/org/v1/list', proxyCreatorRoute(express.Router(), CONSTANTS.KONG_API_BASE + '/org/v1/list'))

publicApiV8.use('/parichay', parichayAuth)

publicApiV8.use('/halloffame/read', proxyCreatorRoute(express.Router(), CONSTANTS.KONG_API_BASE + '/halloffame/read'))
