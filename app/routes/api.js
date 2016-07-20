var express = require('express');
var apiRouter  = express.Router();

var registrationRouter = require('./patientroute');
var usersRouter = require('./users');
var billingRouter = require('./billingRoutes/billroute');
var centreRouter = require('./centreroute');
var panelRouter = require('./panelroute');
var dropDownRouter = require('./dropdownsroute');
var monitoringRouter = require('./monitoringRoute');
var inventoryRouter = require('./inventoryRoute');


var scheduleRouter = require('./appointment/scheduleroute');
apiRouter.use('/:centreId/schedulePatient',scheduleRouter);
var appointmentRouter = require('./appointment/appointmentroute');
apiRouter.use('/:centreId',appointmentRouter);

apiRouter.use('/:centreId/patients',registrationRouter);
apiRouter.use('/users',usersRouter);
apiRouter.use('/:centreId/bills',billingRouter);
apiRouter.use('/centres',centreRouter);
apiRouter.use('/panels',panelRouter);
apiRouter.use('/dropDowns',dropDownRouter);
apiRouter.use('/monitoringChart',monitoringRouter);
module.exports = apiRouter;