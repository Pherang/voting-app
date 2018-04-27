const express = require('express'),
      bodyparser = require('bodyparser'),
      passpport = require('passport')
      MongoClient = require('mongodb').MongoClient,
      app = express()

server_port = process.env.SRV_PORT || 4040


app.get('/', (req,res) => {

  res.send('Hello')
  res.end()

})

app.listen(4040)
console.log('Server running on port', server_port)
