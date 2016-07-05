var express = require('express');
var router = express.Router();
var auth = require('../../config/auth');


router.post('/', auth.verifyLoggedIn, auth.verifyAdmin, function(req, res) {
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