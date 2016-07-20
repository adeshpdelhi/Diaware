var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var inventoryRouter = express.Router({mergeParams:true});
inventoryRouter.use(bodyParser.json());


var stockIdentingRouter = require('./inventory/stockidentingroute');
inventoryRouter.use('/stockidenting',stockIdentingRouter);

var stockReceivedRouter = require('./inventory/stockreceivedroute');
inventoryRouter.use('/stockreceived',stockReceivedRouter);

var stockIssueRouter = require('./inventory/stockissueroute');
inventoryRouter.use('/stockissue',stockIssueRouter);

var treatmentInventoryRouter = require('./inventory/treatmentinventoryroute');
inventoryRouter.use('/stockidenting',treatmentInventoryRouter);

var vendorRouter = require('./inventory/vendorroute');
inventoryRouter.use('/vendor',vendorRouter);	


module.exports = inventoryRouter;