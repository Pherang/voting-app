const MongoClient = require('mongodb').MongoClient,
      assert = require('assert')
      PORT = process.env.PORT || 3000
      

let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/votingapp'

// Use when deploying to heroku 
// let dbName = 'heroku_something'

// Mongo Collection names
let users = 'users'
let polls = 'polls'

// Mongo connection variables
var db
let dbName = 'votingapp'

MongoClient.connect(uri, function (err, client) {
 if (err) {
   console.log("No connection to db!")
   return null
 }

 console.log("Connected to DB server")
 db = client.db(dbName)
})


exports.getPolls = async function getPolls () {
  try {
    let allPolls = await db.collection(polls).find()
    allPolls.project({ _id: 0})
    console.log(await allPolls.next())
  } catch (err) {
    console.log(err.stack)
  }
    
}
exports.getUser = async function getUser () {
  try {
    let user = await db.collection(users).findOne()
    console.log(user)
  } catch (err) {
    console.log(err.stack)
  }
    
}
