var passport = require('passport'),
    signupController = require('../controllers/signupController');
var express = require('express');

  var router = express.Router();

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/');
  };
  
  router.post('/signup', signupController.signup);

  router.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true 
  }));

  router.get('/', function(req, res) {
    res.end('home');
  });

  router.get('/dashboard', isAuthenticated, function(req, res) {
    res.end('dashboard');
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports = router;