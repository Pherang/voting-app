const express = require('express'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      cors = require('cors'),
      uuid = require('uuid/v4')

const SERVER_PORT = process.env.SRV_PORT || 4040
const SECRET_SIG = process.env.SECRET_SIG || 'BC3_3hDI4Be-@14Z1!29Z'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8080'

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true
}


require('./authsetup.js') // Setup passport

const routes = require('./routes.js')

const app = express()
// mount cors middleware
app.use(cors(corsOptions))

// Parse signed cookies
//app.use(cookieParser(SECRET_SIG))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(session({
  genid: () => uuid(),
  secret: SECRET_SIG,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1, // one hour cookie
    secure: false //process.env.NODE_ENV === 'production' //true if prod
  },
}), (req,res,next) => { console.log('calling from session init ',req.session); next();}   )


app.use(passport.initialize(), (req,res,next) => { console.log('calling from passport initialize init ',req.session); next();}   )
app.use(passport.session(), (req,res,next) => { console.log('calling from passport.session init ',req.session); next();}   )

 // Required if using sessions. Also has to appear after initialize and after express-session has been mounted

routes.addRoutes(app)

app.listen(SERVER_PORT)
console.log('Server running on port', SERVER_PORT)
