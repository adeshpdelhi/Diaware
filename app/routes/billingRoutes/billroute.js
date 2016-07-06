var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');

var billingRouter = express.Router();
billingRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
billingRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    console.log("sending "+db.bills.findAll());
    console.log(db.bills.findAll({include: [db.patientDetails]}));
    res.end('billingRouter working');
    //res.end(patientDetails.findAll());
})

.post(function (req, res, next) {
	console.log('processing post : '+req.body.name);
    // db.patientDetails.build(req.body).save();
    res.end('billingRouter working');
});

module.exports = billingRouter;