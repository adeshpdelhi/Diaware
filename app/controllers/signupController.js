var bcrypt = require('bcrypt'),
    users = require('../models').users


module.exports.signup = function(req, res) {
  var username = req.body.username
  var password = req.body.password
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  console.log(password+" "+hashedPassword);
  var newUser = {
    username: username,
    salt: salt,
    hashedPassword: hashedPassword
  }
  
  users.create(newUser).then(function() {
    res.end('successful');
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.");
    res.end('error');
  // if(users.findOne({username:username})!=null)
  //   res.end('successful');
  // else
  //   res.end('error');
})

};