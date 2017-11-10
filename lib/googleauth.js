const secrets = require('../secrets.json')
const config = require('../config.json')
//const request = require('request')

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
 * @param {string} token passed from the first leg of oauth
 * @param {googleUserDetailsCallback}
 */
const getUserDetails = (token, callback) => {
  if (token) {
   request({
      method: 'POST',
      url: secrets.GoogleAuthTokenURL
    }, (err, response) => {
      if (err) {
        callback(err, null)
      } else if ('email' in response) {
        callback(null, response.email)
      } else {
        callback('Unknown response', null)
      }
    })
  } else {
    callback('No Token passed', null)
  }
}

module.exports = {
  getLoginURL,
  getUserDetails
}
