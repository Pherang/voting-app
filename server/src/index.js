const express = require('express'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      cors = require('cors'),
      uuid = require('uuid/v4'),
      app = express()

const SERVER_PORT = process.env.SRV_PORT || 4040
const SECRET = process.env.SECRET || 'BC3_3hDI4Be-@14Z1!29F'

require('./authusr.js')

// Parse signed cookies
app.use(cookieParser(SECRET))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(session({
  genid: () => uuid(),
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1, // 1 hour cookie
    secure: process.env.NODE_ENV === 'production' //true if prod
  },
}))


app.use(passport.initialize())
app.use(passport.session()) // Required if using sessions. Also has to appear after initialize and after express-session has been mounted


app.get('/', (req,res) => {

  res.send('Hello')
  res.end()

})

app.listen(SERVER_PORT)
console.log('Server running on port', SERVER_PORT)
