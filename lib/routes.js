const GoogleAuth = require('./googleauth')
const SessionManager = require('./session')

const dashboard = (req, res) => {
  res.end('Dashboard')
}

const login = (req, res) => {
  res.redirect(GoogleAuth.getLoginURL())
}

const googleauthcallback = (req, res) => {
  GoogleAuth.getUserDetails(req.query.code, (err, email) => {
    
    if (err) {
      showErrorPage(err, res)
    } else {
      SessionManager.createSession(email, res, (err) => {
        if (err) {
          showErrorPage(err, res)
        } else {
          res.redirect('/')
        }
      })
    }
  })
}

// TODO Error Page
const showErrorPage = (err, res) => {
  res.end(err.toString())
}


module.exports = {
  dashboard,
  login,
  googleauthcallback
}
