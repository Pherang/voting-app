const MongoClient = require('mongodb').MongoClient,
      ObjectId = require('mongodb').ObjectId
      assert = require('assert')
      PORT = process.env.PORT || 3000
      let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/votingapp'
//
// Use when deploying to heroku 
// let dbName = 'heroku_something'

// Mongo Collection names
let users = 'users'
let polls = 'polls'

// Mongo connection variables
var db
let dbName = 'votingapp'

// MongoDB recommends connecting once and using the client returned
// for subsequent queries
MongoClient.connect(uri, async function (err, client) {
  if (err) {
    console.log("No connection to db!")
    return null
  }
  console.log("Connected to DB server")
  
  db = await client.db(dbName) 
  // call this to initialize data if there isn't any
  // initPolls()
})

async function initPolls () {

  let poll1 = {
    question : "Red or Blue",
    answers: [  
      { option : "red",  votes : 0 },
      { option : "blue", votes : 0 }
    ]
  }
  let poll2 = {
    question : "Peanuts or Almonds?",
    answers: [
        { option : "peanuts", votes : 0},
        { option : "almonds", votes : 0}
    ]
  }

  let poll3 = { 
    question : "Water or Air?",
    answers: [
      { option : "water",votes : 0 },
      { option : "air",votes : 10}
    ]
  }
  
  let poll4 = { 
    question : "How many hours do you sleep?",
    answers: [
      { option : "8 hours",votes : 0 },
      { option : "6 hours",votes : 10 }
    ]
  }

  try {
    let result = await db.collection(polls).insertMany([poll1,poll2,poll3,poll4])
  } catch(err) {
    console.log(err.stack)
  }

}

// Return all polls in database as an array.
exports.getPolls = async function getPolls () {
  try { 
    let query = {}
    let allPollsCursor = await db.collection(polls).find(query)
    allPollsCursor.project({ creator: 0})
    return (await allPollsCursor.toArray())
  } catch (err) {
    console.log(err.stack)
  }
}

// Could I refactor this by accepting a user parameter?
// Defaulting to all if none specified...
exports.getUserPolls = async function getUserPolls (user) {
  try {
    let query = { creator: user._id }
    let allPollsCursor = await db.collection(polls).find(query)
    allPollsCursor.project({ creator: 0})
    return (await allPollsCursor.toArray())
  } catch (err) {
    console.log(err.stack)
  }
}

exports.createPoll = async function createPoll (poll) {
  try {
    let result = await db.collection(polls).insertOne(poll)
    console.log(result)
    return result  
  } catch (err) {
    console.log(err.stack)
  }
}

// Update will have to increment whatever option user chose
exports.submitVote = async function submitVote (poll) {
  try {
    // Need to convert _id to mongo ObjectId for query
    objId = new ObjectId(poll.pollid)
    
    // answers.option allows us to filter an array element to update.
    // The $ represents the first element that matches the filter.
    let filter = { _id:objId, "answers.option": poll.option }
    let update = { $inc: { "answers.$.votes": 1}}
    let result = await db.collection(polls).updateOne( filter, update )

    if (result.modifiedCount > 0) {
      console.log('Poll updated')
    } else {
      console.log('No update done')
    }
  } catch (err) {
    console.log("ERROR: ", err)
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

exports.createUser = async function createUser (user) {
  try {
     if(getUser(user)) {
      return ('Username already exists. Please choose another') 
     }

    let result = await db.collection(users).insertOne(user)
    console.log(result)
  } catch (err) {
    console.log(err.stack)
  }
}
