var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var inventoryRouter = express.Router({mergeParams:true});
inventoryRouter.use(bodyParser.json());


// var stockIndentingRouter = require('./inventory/stockindentingroute');
// inventoryRouter.use('/stockindenting',stockIndentingRouter);

// var stockReceivedRouter = require('./inventory/stockreceivedroute');
// inventoryRouter.use('/stockreceived',stockReceivedRouter);

// var stockIssueRouter = require('./inventory/stockissueroute');
// inventoryRouter.use('/stockissue',stockIssueRouter);

// var treatmentInventoryRouter = require('./inventory/treatmentinventoryroute');
// inventoryRouter.use('/stockindenting',treatmentInventoryRouter);

var consumptionRouter = require('./inventory/consumptionroute');
inventoryRouter.use('/consumption',consumptionRouter);



var indentRouter = require('./inventory/indentroute');
inventoryRouter.use('/indent',indentRouter);

var stockIssuedRouter = require('./inventory/stockissuedroute');
inventoryRouter.use('/stock/issued/',stockIssuedRouter);

var stockRouter = require('./inventory/stockroute');
inventoryRouter.use('/stock',stockRouter);

var stockRouter = require('./inventory/floorroute');
inventoryRouter.use('/floor',stockRouter);


module.exports = inventoryRouter;