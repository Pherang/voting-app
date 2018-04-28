const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy

console.log("Ran on import!")

module.exports.authUser = function(){
  console.log("Called me! I am auth")
}
