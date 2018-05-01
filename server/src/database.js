const MongoClient = require('mongodb').MongoClient,
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
  //initPolls() call this to initialize data if there isn't any
})

async function initPolls () {

  let poll1 = {
    question : "Red or Blue",
    answers: [  
      { answer : "red",  votes : 0 }
      { answer : "blue", votes : 0 }
    ]
  }
  let poll2 = {
    question : "Peanuts or Almonds?",
    answers: [
        { answer1 : "peanuts", answer1_votes : 0,
    answer2 : "almonds",
    answer2_votes : 0
    ]
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

// Return all polls in database as an array.
exports.getPolls = async function getPolls () {
  try { 
    let query = {}
    let allPollsCursor = await db.collection(polls).find(query)
    allPollsCursor.project({ _id: 0, creator: 0})
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
    allPollsCursor.project({ _id: 0, creator: 0})
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
exports.updatePoll = async function updatePoll (poll) {
  try {
    let result = await db.collection(polls).updateOne(poll)
    console.log(result)
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
