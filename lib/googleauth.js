const secrets = require('../secrets.json')
const config = require('../config.json')
const request = require('request')

/**
 * Gets the login URL for the Google OAuth Call
 */
const getLoginURL = () => `${secrets.GoogleAuthURL}?client_id=${secrets.GoogleAuthClientId}&scope=openid email&redirect_uri=${config.GoogleAuthRedirectURI}&response_type=code`

const getUserDetails = (token) => {
  
}

module.exports = {
  getLoginURL,
  getUserDetails
}
