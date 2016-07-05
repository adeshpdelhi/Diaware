var express = require('express');
var router = express.Router();
var auth = require('../../config/auth');


router.post('/', function(req, res) {
    if(auth.verifyAdmin(req) == false)
    {
      res.end('Not admin');
      console.log('not an admin');
      return;
    }
    console.log('Admin logged');
    auth.register(req,res);
});

router.post('/login', function(req, res) {
    auth.login(req,res);
});

router.post('/logout', function(req, res) {
    auth.logout(req,res);
});

module.exports = router;