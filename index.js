const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const routes = require('./lib/routes')
const SessionManager = require('./lib/session')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('public'))

app.listen(process.env.PORT || 3000, () => {
  console.log('Frontend Started')
})

app.get('/', SessionManager.checkSession, routes.dashboard) 
app.get('/login', routes.login)
app.get('/googleauthcallback', routes.googleauthcallback)
app.get('/instance', SessionManager.checkSession, routes.getInstances)
