const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const routes = require('./routes')
const SessionManager = require('./session')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.listen(process.env.PORT || 3000, () => {
  console.log('Frontend Started')
})

app.get('/', SessionManager.checkSession, routes.dashboard) 
