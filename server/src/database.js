const MongoClient = require('mongodb').MongoClient,
      ObjectId = require('mongodb').ObjectId
      User = require('./users.js')
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
    question : "How many hours do you sleep?", answers: [
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
    // I surpress the creator field here
    // This results in isOwner being evaluated to false
    // when anonymous uses get the polls.
    allPollsCursor.project({ _id: 1, question: 1})
    return (await allPollsCursor.toArray())
  } catch (err) {
    console.log(err.stack)
  }
}

exports.getOnePoll = async function getOnePoll (pollId) {
  try { 
    console.log('Database is finding poll..', pollId)
    objId = new ObjectId(pollId)
    let query = { _id: objId}
    let pollCursor = await db.collection(polls).find(query)
    // I surpress the creator field here
    // This results in isOwner being evaluated to false
    // when anonymous users get the polls.
    // pollCursor.project({ creator: 1})
    return (await pollCursor.next())
  } catch (err) {
    console.log(err.stack)
  }
}

// Could I refactor this by accepting a user parameter?
// Defaulting to all if none specified...
exports.getUserPolls = async function getUserPolls (user) {
  try {
    // Used template literal for user._id. It must be a string
    let query = { creator: `${user._id}` }
    let allPollsCursor = await db.collection(polls).find(query)
    // Creator field is passed when this is called
    // by a logged in user.
    //allPollsCursor.project({ creator: 0})
    return (await allPollsCursor.toArray())
  } catch (err) {
    console.log(err.stack)
  }
}

exports.createPoll = async function createPoll (poll) {
  try {
   
    // Zero the votes for a newly created poll
    for (element in poll.answers) {
      poll.answers[element].votes = 0
    }
    let result = await db.collection(polls).insertOne(poll)
    return result  
  } catch (err) {
    console.log(err.stack)
  }
}

exports.deletePoll = async function deletePoll (poll) {
  try {
    objId = new ObjectId(poll.pollid)
    let query = ({ _id: objId, creator: poll.creator }) 
    let result = await db.collection(polls).deleteOne(query)
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

exports.getUser = async function getUser (username) {
  try {
    let result = await db.collection(users)
      .findOne({ username: username})
    return result
  } catch (err) {
    console.log(err.stack)
    return err
  }
}

exports.getUserById = async function getUserById (id) {
  try {
    const objId = new ObjectId(id)
    let result = await db.collection(users)
      .findOne({ _id: objId })
    return result
  } catch (err) {
    console.log(err.stack)
    return err
  }
}

exports.createUser = async function createUser (user) {
  try {
    // this and module.exports refer to the same object
    // if I understand right this module is wrapped in a function 
    // the function is the global content that this refers to
    let existingUser = await this.getUser(user.username)
    if (existingUser) {
      return ('Username exists please try another')
    } else {
      let hashedPassword = await User.hashPassword(user.password)
      user.password = hashedPassword
      let result = await db.collection(users).insertOne(user)
      if (result.insertedCount == 1) {
        return result.insertedCount
      } else {
        console.log('Error inserting user: ', user.username)
        return 'Error creating user'
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}
