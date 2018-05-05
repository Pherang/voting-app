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

  app.post('/vote', async (req,res) => {
    // Parse body for vote selection
    let vote = req.body
    let result = await database.submitVote(vote)
    res.send('OK')
    res.end()

  })
  
  app.post('/signup', async (req,res) => {
    console.log(req.body)
    let result = await database.createUser(req.body)
    console.log('Route result is: ',result)
    res.json(result)
  })

  app.post('/login', async (req,res) => {
    console.log(req.body)
    // database.getUser()
  })
 
  // Get polls belonging to authenticated user
  app.get('/mypolls', privateRoute, async (req,res) => {
    res.send('Polls created by user')
  })
  
}
