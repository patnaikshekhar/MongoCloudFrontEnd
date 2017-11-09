const DB = require('./db')
const config = require('../config.json')
const TABLE_NAME = require('./constants.json').SESSION_TABLE
const LOGIN_PAGE = '/login'

/**
  * Checks to see if an existing session exists. If it does not then
  * redirects to login page
**/
const checkSession = (req, res, next) => {
  // Check if session exists
  if (req.cookies) {
    if ('sessionId' in req.cookies) {
      // If session exists then check if session is valid
      const sessionId = req.cookies['sessionId']
      checkValidSession(sessionId, (valid, customerId) => {
        if (valid) {
          req.customerId = customerId
          next()
        } else {
          res.redirect(LOGIN_PAGE)
        }
      })
    } else {
      res.redirect(LOGIN_PAGE)
    }
  } else {
    res.redirect(LOGIN_PAGE)
  }
}

/**
  * Checks the session to see if TTL is valid 
**/
const checkValidSession = (sessionId, callback) => {
  DB.get(TABLE_NAME, 'sessionId', sessionId, (value) => {
    if (value) {
      if (value.sessionStart) {
        const timeout = config['SessionTimeout']
        if (Date.now() - value.sessionStart <= timeout) {
          callback(true, value.customerId)
        } else {
          callback(false)
        }
      } else {
        callback(false)
      }
    } else {
      callback(false)
    }
  })
}

module.exports = {
  checkSession,
  checkValidSession
}
