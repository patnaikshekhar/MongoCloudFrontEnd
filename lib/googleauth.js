const secrets = require('../secrets.json')
const config = require('../config.json')
const request = require('request')

/**
 * Gets the login URL for the Google OAuth Call
 */
const getLoginURL = () => `${secrets.GoogleAuthURL}?client_id=${secrets.GoogleAuthClientId}&scope=openid email&redirect_uri=${config.GoogleAuthRedirectURI}&response_type=code`

/**
 * googleUserDetailsCallback
 *
 * @callback googleUserDetailsCallback
 * @param {Object} err
 * @param {string} email
 */

/**
 * Get user details from supplied token
 * @param {string} code passed from the first leg of oauth
 * @param {googleUserDetailsCallback}
 */
const getUserDetails = (code, callback) => {
  if (code) {
   request({
      method: 'POST',
      url: secrets.GoogleAuthTokenURL,
      form: {
        grant_type: 'authorization_code',
        code: code,
        client_id: secrets.GoogleAuthClientId,
        client_secret: secrets.GoogleAuthClientSecret,
        redirect_uri:  secrets.GoogleAuthCallbackURL
      }
    }, (err, response) => {
      if (err) {
        callback(err, null)
      } else {
        const res = JSON.parse(response)

        if ('id_token' in res.body) {
          callback(null, decodeIdToken(res.body.id_token))
        } else {
          callback('Unknown response', null)
        }
      }
    })
  } else {
    callback('No Token passed', null)
  }
}

const decodeIdToken = (token) => {
  const parts = token.split('.')
  const encodedPayload = parts[1]
  const decodedPayload = new Buffer(encodedPayload, 'base64').toString()
  const idToken = JSON.parse(decodedPayload)
  return idToken.email
}

module.exports = {
  getLoginURL,
  getUserDetails
}
