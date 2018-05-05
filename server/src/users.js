const bcrypt = require('bcrypt')
      database = require('./database.js')

const SALT_ROUNDS = 5

exports.hashPassword = async function hashPassword (password) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

exports.checkPassword = async function checkPassword (user, password) {
  return await bcrypt.compare(user.password, password)
}
