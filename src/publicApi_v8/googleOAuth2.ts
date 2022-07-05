import express from 'express'
import { logInfo } from '../utils/logger'
const base64url = require('base64url')
import { CONSTANTS } from '../utils/env'

const passport = require('passport')
const oAuth2Strategy = require('passport-oauth2')

export const googleOAuth2 = express.Router()

const redirectPath = 'https://igot-dev.in/apis/public/v8/google/callback'
const defaultScope = ['https://www.googleapis.com/auth/userinfo.email']

const options = {
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    callbackURL: redirectPath,
    clientID: CONSTANTS.GOOGLE_CLIENT_ID,
    clientSecret: CONSTANTS.GOOGLE_CLIENT_SECRET,
    passReqToCallback: true, // this is important, so you can obtain the bearer token in the verify() function
    scope: defaultScope,
    state: base64url(JSON.stringify({ state: CONSTANTS.GOOGLE_CLIENT_ID })),
    tokenURL: 'https://oauth2.googleapis.com/token',
  }

// tslint:disable-next-line: no-any
const verify = (accessToken: string, refreshToken: string, params: any, profile: any, done: any) => {
    logInfo(`Access token is:  ${accessToken}`)
    logInfo(`Refresh token is: ${refreshToken}`)
    logInfo('Params: ', params.token_type, params.id_token)
    logInfo('Profile:', profile)
    // note due to the way passport works, profile would always be {} unless
    // you override the default strategy.userProfile function (see below)

    if (profile) {
      // TODO; do something here validate the token's signature.
      const user = profile
      return done(null, user)
    }
    return done(null, false)
  }

googleOAuth2.use(passport.initialize())
googleOAuth2.use(passport.session())

const strategy = new oAuth2Strategy(options, verify)
// tslint:disable-next-line: no-any
strategy.userProfile = function(accessToken: string, done: any) {
    this._oauth2._request(
      'GET',
      'https://www.googleapis.com/oauth2/v2/userinfo',
      null,
      null,
      accessToken,
      // tslint:disable-next-line: no-any
      (err: any, data: any) => {
        if (err) {
          return done(err)
        }
        try {
          data = JSON.parse(data)
        } catch (e) {
          return done(e)
        }
        done(null, data)
      }
    )
  }
passport.use(strategy)
// tslint:disable-next-line: no-any
passport.serializeUser((user: any, done: any) => {
    // note that the user param is whatever you passed into the done() function
    // in the verify function you defined earlier
    done(null, user)
  })
// tslint:disable-next-line: no-any
passport.deserializeUser((user: any, done: any) => {
    // the user param here is what you have stored in the session
    done(null, user)
  })

googleOAuth2.get('/auth', async () => {
    passport.authenticate('oauth2')
})

googleOAuth2.get('/callback', async () => {
    passport.authenticate('oauth2', {
        session: true,
        successReturnToOrRedirect: '/public/home',
    })
})
