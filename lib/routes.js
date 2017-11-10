const GoogleAuth = require('./googleauth')
const SessionManager = require('./session')

const dashboard = (req, res) => {
  res.end('Dashboard')
}

const login = (req, res) => {
  res.redirect(GoogleAuth.getLoginURL())
}

const googleauthcallback = (req, res) => {
  GoogleAuth.getUserDetails(req.query.token, (email) => {
    SessionManager.createSession((res, sessionId) => {
      res.redirect('/')
    })
  })
}

module.exports = {
  dashboard,
  login,
  googleauthcallback
}
