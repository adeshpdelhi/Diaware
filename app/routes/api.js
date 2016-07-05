var express = require('express');
var apiRouter  = express.Router();

var registrationRouter = require('./registration');
var usersRouter = require('./users');

apiRouter.use('/registration',registrationRouter);
apiRouter.use('/users',usersRouter);
module.exports = apiRouter;