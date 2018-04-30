const MongoClient = require('mongodb').MongoClient,
      PORT = process.env.PORT || 3000


let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/votingapp'

let dbName = 'votingapp'

// Use when deploying to heroku 
// let dbName = 'heroku_something'
//

// Collection names
let users = 'users'
let polls = 'polls'

MongoClient.connect(uri, function (err, client) {

  const db = client.db(dbName)
  console.log("Connected to DB server")

})
