var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var inventoryRouter = express.Router({mergeParams:true});
inventoryRouter.use(bodyParser.json());


var stockIndentingRouter = require('./inventory/stockindentingroute');
inventoryRouter.use('/stockindenting',stockIndentingRouter);

var stockReceivedRouter = require('./inventory/stockreceivedroute');
inventoryRouter.use('/stockreceived',stockReceivedRouter);

var stockIssueRouter = require('./inventory/stockissueroute');
inventoryRouter.use('/stockissue',stockIssueRouter);

var treatmentInventoryRouter = require('./inventory/treatmentinventoryroute');
inventoryRouter.use('/stockindenting',treatmentInventoryRouter);

var vendorRouter = require('./inventory/vendorroute');
inventoryRouter.use('/vendor',vendorRouter);


module.exports = inventoryRouter;