import axios from 'axios'
import express from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logInfo } from '../utils/logger'

export const youtubePlaylist = express.Router()

youtubePlaylist.get('/landingpage', async (req, res) => {
    const playListIds = CONSTANTS.YOUTUBE_PLAYLIST_NAMES.split(',')
    let playListUrl = CONSTANTS.YOUTUBE_PLAYLIST_URL
    const playlistDataMap = new Map()

    for (const playListId of playListIds) {
        logInfo('playListId -> ' + playListId)
        logInfo('playListId Constants -> ' + CONSTANTS[playListId])
        playListUrl += '?key=' + CONSTANTS.YOUTUBE_PLAYLIST_API_KEY
        playListUrl += '&playlistId=' + CONSTANTS[playListId]
        playListUrl += '&part=snippet,id,contentDetails'
        playListUrl += '&maxResults=' + (Number(req.query.maxResults) || Number(CONSTANTS.YOUTUBE_PLAYLIST_MAX_RESULT))
        logInfo('Youtube playlist constructed url : ' + playListUrl)
        const playlistResponse = await axios({
            ...axiosRequestConfig,
            method: 'GET',
            url: playListUrl,
        })
        logInfo('Response -> ' + JSON.stringify(playlistResponse.data))
        if (!playlistResponse.data) {
            playlistDataMap.set(playListId, { error: 'Not able to fetch data.' })
        } else {
            playlistDataMap.set(playListId, playlistResponse.data)
        }
    }
    res.status(200).send(playlistDataMap)
})
