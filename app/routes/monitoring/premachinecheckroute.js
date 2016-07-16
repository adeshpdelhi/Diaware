var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var machineCheckRouter = express.Router({mergeParams:true});

machineCheckRouter.use(bodyParser.json());

// can add route to fetch all patients machineChecks ie /api/monitoringChartPreMachineFinalCheck
// or can add route to fetch list of patients under one machineCheck usind route - /api/machineChecks/

machineCheckRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.monitoringChartPreMachineFinalCheck.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(machineChecks){
    	console.log(JSON.stringify(machineChecks));
    	res.json(machineChecks);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.monitoringChartPreMachineFinalCheck.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('machineCheckRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


machineCheckRouter.route('/:preBasicId')
.get(function(req,res,next){
    console.log('procesing get');
    db.monitoringChartPreMachineFinalCheck.findOne({
        where:{
            preBasicId:parseInt(req.params.preBasicId,10),
            patientId:req.params.id
        }
    }).then(function(machineCheck){
        console.log(JSON.stringify(machineCheck));
        res.json(machineCheck);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPreMachineFinalCheck.update(
    req.body, {
            where:{
                preBasicId:parseInt(req.params.preBasicId,10),
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        // res.json(result);
        
        res.status(200);
        res.end("successfully updated")
    }, function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
})
;

module.exports = machineCheckRouter;