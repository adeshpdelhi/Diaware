var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var preBasicMedicalRouter = express.Router({mergeParams:true});

preBasicMedicalRouter.use(bodyParser.json());

// can add route to fetch all patients preBasicMedicals ie /api/monitoringChartPreBasicMedical
// or can add route to fetch list of patients under one preBasicMedical usind route - /api/preBasicMedicals/

preBasicMedicalRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.monitoringChartPreBasicMedical.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(preBasicMedicals){
    	console.log(JSON.stringify(preBasicMedicals));
    	res.json(preBasicMedicals);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.monitoringChartPreBasicMedical.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('preBasicMedicalRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


preBasicMedicalRouter.route('/:preBasicId')
.get(function(req,res,next){
    console.log('procesing get');
    db.monitoringChartPreBasicMedical.findOne({
        where:{
            preBasicId:parseInt(req.params.preBasicId,10),
            patientId:req.params.id
        }
    }).then(function(preBasicMedical){
        console.log(JSON.stringify(preBasicMedical));
        res.json(preBasicMedical);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPreBasicMedical.update(
    req.body, {
            where:{
                preBasicId:parseInt(req.params.preBasicId,10),
                patientId:req.params.id
            }
        }
    ).then(function (result) { 
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

module.exports = preBasicMedicalRouter;