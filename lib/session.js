const uuid = require('uuid')
const DB = require('./db')
const config = require('../config.json')
const SESSION_TABLE_NAME = require('./constants.json').SESSION_TABLE
const USER_TABLE_NAME = require('./constants.json').USER_TABLE
const LOGIN_PAGE = '/login'


/**
 * Checks to see if an existing session exists. If it does not then
 * redirects to login page
 * @param {Object} req object from express
 * @param {Object} res object from express
 * @param {Object} next function from express
 */
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
 * @private 
 */
const checkValidSession = (sessionId, callback) => {
  DB.get(SESSION_TABLE_NAME, 'sessionId', sessionId, (err, value) => {
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

/**
 * Creates a session in dynamo and sets cookie
 * @param {string} email address of customer
 * @param {Object} callback
 * TODO: Change UUID Generation logic
 */
const createSession = (customerId, response, callback) => {
  if (customerId) {
    const userDoc = {
      customerId: customerId
    }
    
    DB.put(USER_TABLE_NAME, userDoc, (err, value) => {
      if (err) {
        callback(err)
      } else {
        const sessionDoc = {
          sessionId: uuid.v1(),
          customerId: customerId,
          sessionStart: Date.now()
        }

        DB.put(SESSION_TABLE_NAME, sessionDoc, (err, value) => {
          console.log('Here')
          response.cookie('sessionId', sessionDoc.sessionId)
          callback(err, null)
        })
      }
    })
    

  } else {
    callback('No customer id passed')
  }
}

module.exports = {
  checkSession,
  checkValidSession,
  createSession
}
