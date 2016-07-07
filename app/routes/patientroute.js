var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var patientRouter = express.Router();

var panelRouter = require('./PatientDetails/paneldetailroute');
patientRouter.use('/patients/:id/panelDetails',panelRouter);

patientRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});

patientRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.patientDetails.findAll().then(function(patients){
    	console.log(JSON.stringify(patients));
    	res.json(patients);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.patientDetails.build(req.body).save();
    res.end('patientRouter working'); // send status code
})
.delete(function(req,res,next){
    
});

patientRouter.route('/:id')
.get(function(req,res,next){
    console.log('procesing get');
    db.patientDetails.findOne({where:{id:req.params.id}}).then(function(patient){
        console.log(JSON.stringify(patient));
        res.json(patient);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){

})
;

module.exports = patientRouter;