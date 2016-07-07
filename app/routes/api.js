var express = require('express');
var apiRouter  = express.Router();

var registrationRouter = require('./patientroute');
var usersRouter = require('./users');
var billingRouter = require('./billingRoutes/billroute');
var centreRouter = require('./centreroute');
var panelRouter = require('./panelroute');

apiRouter.use('/patients',registrationRouter);
apiRouter.use('/users',usersRouter);
apiRouter.use('/bills',billingRouter);
apiRouter.use('/centres',centreRouter);
apiRouter.use('/panels',panelRouter);

module.exports = apiRouter;