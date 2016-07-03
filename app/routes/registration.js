var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var registrationRouter = express.Router();
registrationRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
registrationRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    console.log("sending "+db.patientDetails.findAll());
    res.end('registrationRouter working');
    //res.end(patientDetails.findAll());
})

.post(function (req, res, next) {
	console.log('processing post : '+req.body.name);
    db.patientDetails.build(req.body).save();
    res.end('registrationRouter working');
});

module.exports = registrationRouter;