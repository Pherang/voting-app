const bcrypt = require('bcrypt')
      database = require('./database.js')

const SALT_ROUNDS = 5

exports.hashPassword = async function hashPassword (password) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

exports.checkPassword = async function checkPassword (user, password) {
  // Order matters. first argument is input
  // second argument is encrypted data
  return await bcrypt.compare(password, user.password)
}
