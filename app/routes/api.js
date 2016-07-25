var express = require('express');
var auth = require('../../config/auth');

var apiRouter  = express.Router();

var registrationRouter = require('./patientroute');
var usersRouter = require('./users');
var billingRouter = require('./billingRoutes/billroute');
var centreRouter = require('./centreroute');
var panelRouter = require('./panelroute');
var dropDownRouter = require('./dropdownsroute');
var monitoringRouter = require('./monitoringRoute');
var inventoryRouter = require('./inventoryRoute');

apiRouter.use('/users',usersRouter);
var scheduleRouter = require('./appointment/scheduleroute');
apiRouter.use('/:centreId/schedulePatient',auth.verifyLoggedIn,scheduleRouter);
var appointmentRouter = require('./appointment/appointmentroute');
apiRouter.use('/:centreId',auth.verifyLoggedIn,appointmentRouter);

apiRouter.use('/:centreId/patients',auth.verifyLoggedIn,registrationRouter);
apiRouter.use('/:centreId/bills',auth.verifyManager,billingRouter);
apiRouter.use('/centres',auth.verifyLoggedIn,centreRouter);
apiRouter.use('/panels',auth.verifyLoggedIn,panelRouter);
apiRouter.use('/dropDowns',auth.verifyLoggedIn,dropDownRouter);
apiRouter.use('/monitoringChart',auth.verifyClinical,monitoringRouter);


var itemRouter = require('./inventory/itemroute');
apiRouter.use('/inventory/item',itemRouter);

var vendorRouter = require('./inventory/vendorroute');
apiRouter.use('/inventory/vendor',vendorRouter);

apiRouter.use('/:centreId/inventory',auth.verifyLoggedIn,inventoryRouter);

var treatmentItemsRouter = require('./inventory/treatmentitemsroute');
apiRouter.use('inventory/treatment/items',treatmentItemsRouter);




module.exports = apiRouter;