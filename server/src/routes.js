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
    res.json({status: 'roger'})
  })

  app.get('/getUser', (req,res) => {
    console.log('Getting session ', req.session)
    console.log('Getting user ', req.user)
    if (req.user) {
      console.log("session logged in")
      console.log(req.user)
      res.json({ 
        _id: req.user._id,
        username: req.user.username 
      }) 
    } else {
      console.log('Sending no user')
      res.send('null')
    }
  })

  app.get('/polls', async (req,res) => {
    let polls = await database.getPolls()
    res.json(polls)
    res.end()
  })

  app.get('/poll/:pollId', async (req,res) => {
    let poll = await database.getOnePoll(req.params.pollId)
    res.json(poll)
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

  app.post('/login', passport.authenticate('local'), async (req,res) => {
    console.log('This means authenticate passed')
    console.log('Login session looks like\n ', req.session)
    res.json({
      _id: req.user._id,
      username: req.user.username
    })
  })
 
  // Get polls belonging to authenticated user
  app.get('/mypolls', privateRoute, 
    async (req,res) => {
      let mypolls = await database.getUserPolls(req.user) 
      console.log(mypolls)
      res.json(mypolls)
  })
  
  app.post('/createpoll', privateRoute, 
    async (req,res) => {
      console.log('New Poll ', req.body)
      console.log('Creator ', req.body.creator)
      console.log('Requestor ', req.user)
      let result = await database.createPoll(req.body) 
      res.json(result)
  })

  app.post('/deletepoll', privateRoute, 
    async (req,res) => {
      console.log('Delete Poll ', req.body)
      console.log('Creator ', req.body.creator)
      console.log('Requestor ', req.user._id)
      console.log('req is type ',typeof(req.user._id))
      console.log('creator is type ',typeof(req.body.creator))
      // Need to do a double check if the requestor of the API matches the poll they want to delete
      if (req.user._id == req.body.creator) {
        console.log('IDs match, processing delete')
        let result = await database.deletePoll(req.body) 
        res.json(result)
      } else {
        res.status(401)
      }
      res.send()

  })

}
