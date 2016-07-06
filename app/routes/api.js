var express = require('express');
var apiRouter  = express.Router();

var registrationRouter = require('./patientroute');
var usersRouter = require('./users');
var billingRouter = require('./billingRoutes/billroute');

apiRouter.use('/patients',registrationRouter);
apiRouter.use('/users',usersRouter);
apiRouter.use('/bills',billingRouter);
module.exports = apiRouter;