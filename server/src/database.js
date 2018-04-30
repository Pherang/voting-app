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

  
  MongoClient.connect(uri, async function (err, client) {
    if (err) {
      console.log("No connection to db!")
      return null
    }

    console.log("Connected to DB server")
    db = await client.db(dbName)
    //initPolls() call this to initialize data if there isn't any
  })

async function initPolls () {


  let poll1 = {
    question : "Red or blue",
    answer1 : "red",
    answer1_votes : 0,
    answer2 : "blue",
    answer2_votes : 0
  }
  let poll2 = {
    question : Peanuts or almonds?",
    answer1 : "peanuts",
    answer1_votes : 0,
    answer2 : "almonds",
    answer2_votes : 0
  }

  let poll3 = { 
    question : "Water or Air?",
    answer1 : "water",
    answer1_votes : 0,
    answer2 : "air",
    answer2_votes : 10
  }
  
  let poll3 = { 
    question : "How many hours do you sleep?",
    answer1 : "8 hours",
    answer1_votes : 0,
    answer2 : "6 hours",
    answer2_votes : 10
  }

  try {
    let result = await db.collection(polls).insertMany([poll1,poll2,poll3,poll4])
  } catch(err) {
    console.log(err.stack)
  }

}


exports.getPolls = async function getPolls () {
  try {
    let query = {}
    let allPollsCursor = await db.collection(polls).find(query)
    allPollsCursor.project({ _id: 0})
    console.log(await allPollsCursor.next())
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
