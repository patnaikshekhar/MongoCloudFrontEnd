const GoogleAuth = require('./googleauth')
const SessionManager = require('./session')
const InstanceManager = require('./instanceManager')
const path = require('path')

const dashboard = (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/dashboard.html`))
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

// TODO: Error Page
const showErrorPage = (err, res) => {
  res.end(err.toString())
}

const getInstances = (req, res) => {
  if (req.customerId) {
    InstanceManager.getInstances(req.customerId, (err, instances) => {
      if (err) {
        showErrorPage(err, res)
      } else {
        res.json(instances)
      }
    })
  } else {
    showErrorPage('Customer not found', res)
  }
}

module.exports = {
  dashboard,
  login,
  googleauthcallback,
  getInstances
}
