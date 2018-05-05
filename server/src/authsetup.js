const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy
const database = require('./database.js')
const users = require('./users.js')

console.log("authsetup imported")

async function authenticateUser (username, password) {
  const user = await database.getUser(username)
  let validPassword = false
  if (user) {
    validPassword = await users.checkPassword(user, password)
    console.log('Is it valid?', validPassword)
  }
  return {
    validPassword,
    user
  }
}

// Setup authentication strategy. This must be done before initializing passport.
passport.use('local', new LocalStrategy(
  async (username, password, done) => {
    // Uses object deconstruction
    const { validPassword, user } = await authenticateUser(username, password)
    console.log(user)
    if (validPassword) {
      return done(null, user)
    } else {
      return done('Incorrect username or password')
    }
  }
))

// serializeUser needs to be setup because we're using sessions to store user state.
passport.serializeUser(
  (user, done) => {
    done(null, user._id)
  }
)

passport.deserializeUser(
  async (id, done) => {
    const user = await console.log("deserialize")
    const err = !user ? new Error('User not found') : null //sets session to null
    done(err, user || null)
  }
)
