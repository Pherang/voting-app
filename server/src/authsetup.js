const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy
const database = require('./database.js')
const users = require('./users.js')


async function authenticateUser (username, password) {
  const user = await database.getUser(username)
  let validPassword = false
  if (user) {
    validPassword = await users.checkPassword(user, password)
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

    if (validPassword) {
      return done(null, user)
    } else {
      return done(null, false)
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
    const user = await database.getUserById(id)
    const err = !user ? new Error('User not found') : null //sets session to null
    done(err, user || null)
  }
)
