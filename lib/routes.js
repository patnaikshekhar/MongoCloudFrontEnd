const GoogleAuth = require('./googleauth')

const dashboard = (req, res) => {
  res.end('Dashboard')
}

const login = (req, res) => {
  res.redirect(GoogleAuth.getLoginURL())
}

const googleauthcallback = (req, res) => {}

module.exports = {
  dashboard,
  login,
  googleauthcallback
}
