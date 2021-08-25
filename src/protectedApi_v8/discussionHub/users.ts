import axios from 'axios'
import { Router } from 'express'
import { getRootOrg } from '../../authoring/utils/header'
import { axiosRequestConfig } from '../../configs/request.config'
import { getUserSlug, getUserUIDBySession, getWriteApiToken } from '../../utils/discussionHub-helper'
import { CONSTANTS } from '../../utils/env'
import { logError, logInfo } from '../../utils/logger'
import { extractUserIdFromRequest, extractUserToken} from '../../utils/requestExtract'

const API_ENDPOINTS = {
    getUserBookmarks: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/bookmarks`,
    getUserDownvotedPosts: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/downvoted`,
    getUserGroups: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/groups`,
    getUserInfo: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/info`,
    getUserPosts: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/posts`,
    getUserProfile: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}`,
    getUserUpvotedPosts: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/upvoted`,
    getUsersWatchedTopics: (slug: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/auth/api/user/${slug}/watched`,
    // tslint:disable-next-line: object-literal-sort-keys
    getUserByEmail: (email: string) => `${CONSTANTS.KONG_API_BASE}/nodebb/api/user/email/${email}`,
    getUserByUsername: (username: string) => `${CONSTANTS.KONG_API_BASE}/api/user/username/${username}`,
}

export const usersApi = Router()

usersApi.get('/:slug/bookmarks', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserBookmarks(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/bookmarks >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/downvoted', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserDownvotedPosts(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/downvoted >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/groups', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserGroups(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/groups >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/info', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserInfo(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/info >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/me', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const userSlug = await getUserSlug(req, userId)
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserProfile(userSlug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET User Profile /me >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/posts', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserPosts(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/posts >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/upvoted', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUserUpvotedPosts(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/upvoted >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/watched', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        const url = API_ENDPOINTS.getUsersWatchedTopics(slug) + `?_uid=${userUid}`
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                rootOrg,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/watched >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/email/:email', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const email = req.params.email
        const response = await getUserByEmail(req, email)
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /email/:email >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

usersApi.get('/:slug/about', async (req, res) => {
    try {
        const rootOrg = getRootOrg(req)
        const userId = extractUserIdFromRequest(req)
        logInfo(`UserId: ${userId}, rootOrg: ${rootOrg}`)
        const slug = req.params.slug
        const userUid = await getUserUIDBySession(req)
        logInfo('called /:slug/about slug=> ', slug)
        const url = API_ENDPOINTS.getUserProfile(slug) + `?_uid=${userUid}`
        logInfo('called /:slug/about url=> ', url)
        const response = await axios.get(
            url,
            { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
             } }
        )
        res.send(response.data)
    } catch (err) {
        logError('ERROR ON GET topicsApi /:slug/about >', err)
        res.status((err && err.response && err.response.status) || 500)
            .send(err && err.response && err.response.data || {})
    }
})

// tslint:disable-next-line: no-any
export async function getUserByEmail(req: any , email: any): Promise<any> {
    logInfo('Finding user in NodeBB DiscussionHub...')
    // tslint:disable-next-line: no-try-promise
    try {
        const url = API_ENDPOINTS.getUserByEmail(email)
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(
                url,
                { ...axiosRequestConfig, headers: {
                Authorization: CONSTANTS.SB_API_KEY,
                // tslint:disable-next-line: all
                'x-authenticated-user-token': extractUserToken(req)
                }}
            ).catch((err) => {
                logError('ERROR ON method getUserByEmail api call to nodebb DiscussionHub >', err)
                reject(err)
            })
            resolve(response)
        })

    } catch (err) {
        logError('ERROR ON method getUserByEmail >', err)
        return err
    }
}

// tslint:disable-next-line: no-any
export async function getUserByUsername(req: any , username: any): Promise<any> {
    logInfo('Finding user in NodeBB DiscussionHub...')
    // tslint:disable-next-line: no-try-promise
    try {
        const url = API_ENDPOINTS.getUserByUsername(username)
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(
                url,
                { ...axiosRequestConfig , headers: {
                    Authorization: CONSTANTS.SB_API_KEY,
                    // tslint:disable-next-line: all
                    'x-authenticated-user-token': extractUserToken(req)
                    }}
            ).catch((err) => {
                logError('ERROR ON method getUserByUsername api call to nodebb DiscussionHub >', err)
                reject(err)
            })
            if (response && response.data) {
                resolve(response.data)
            }
        })

    } catch (err) {
        logError('ERROR ON method getUserByUsername >', err)
        return err
    }
}
