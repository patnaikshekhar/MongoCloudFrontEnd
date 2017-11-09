const secrets = require('../secrets.json')
const config = require('../config.json')
/**
 * Gets the login URL for the Google OAuth Call
 */
const getLoginURL = () => `${secrets.GoogleAuthURL}?client_id=${secrets.GoogleAuthURL}&scope=openid email&redirect_uri=${config.GoogleAuthRedirectUri}response_type=code`

module.exports = {
  getLoginURL
}
