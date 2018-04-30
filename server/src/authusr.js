const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy

console.log("authusr imported")


async function authenticateUser (username, password) {

    // TODO



}

// Setup authentication strategy. This must be done before initializing passport.
passport.use('local', new LocalStrategy(
  async (username, password, done) => {
    const { valid, user } = await authenticateUser(username, password)
    if (valid) {
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
