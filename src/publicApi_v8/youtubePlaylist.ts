import axios from 'axios'
import express from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { logInfo } from '../utils/logger'

export const youtubePlaylist = express.Router()

youtubePlaylist.get('/landingpage', async (_, res) => {
    let playListUrl = CONSTANTS.YOUTUBE_PLAYLIST_URL
    playListUrl += '?key=' + CONSTANTS.YOUTUBE_PLAYLIST_API_KEY
    playListUrl += '&playlistId=' + CONSTANTS.YOUTUBE_PLAYLIST_ID
    playListUrl += '&part=snippet,id,contentDetails'
    playListUrl += '&maxResults=' + CONSTANTS.YOUTUBE_PLAYLIST_MAX_RESULT
    logInfo('Youtube playlist constructed url : ' + playListUrl)
    const playlistResponse = await axios({
        ...axiosRequestConfig,
        method: 'GET',
        url: playListUrl,
    })
    logInfo('Response -> ' + JSON.stringify(playlistResponse.data))
    if (!playlistResponse.data.result.response) {
        res.status(400).send(playlistResponse.data)
    } else {
        res.status(200).send(playlistResponse.data)
    }
})
