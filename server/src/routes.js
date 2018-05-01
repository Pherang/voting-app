const passport = require('passport'),
      database = require('./database.js')


// Guards against accessing route as null user
function privateRoute (req, res, next) {
  if (!req.user) {
    res.status(403).send('Nnn... Nooo...')
  } else {
    next()
  }
}

module.exports.addRoutes = function(app) {

  app.get('/', (req,res) => {
    res.send('Vote on things!')
    res.end()
  })

  app.get('/logout', (req,res) => {
    req.logout()
    res.json( {status: 'roger'})
  })

  app.get('/polls', async (req,res) => {
    let polls = await database.getPolls()
    res.json(polls)
    res.end()
  })
  
  app.get('/signup', (req,res) => {
    res.send('Sign up!')
  })

  app.get('/login', (req,res) => {
    database.getUser()
    res.send('Login!')

  })
 
  // Get polls belonging to authenticated user
  app.get('/mypolls', privateRoute, (req,res) => {
    res.send('Polls created by user')
  })
  
}
