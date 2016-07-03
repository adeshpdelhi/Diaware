var express = require('express');
var apiRouter  = express.Router();

var registrationRouter = require('./registration');

apiRouter.use('/registration',registrationRouter);

module.exports = apiRouter;