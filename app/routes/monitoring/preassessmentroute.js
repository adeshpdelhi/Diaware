var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var preAssessmentRouter = express.Router({mergeParams:true});

preAssessmentRouter.use(bodyParser.json());

// can add route to fetch all patients preAssessments ie /api/monitoringChartPreAssessment
// or can add route to fetch list of patients under one preAssessment usind route - /api/preAssessments/

preAssessmentRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.monitoringChartPreAssessment.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(preAssessments){
    	console.log(JSON.stringify(preAssessments));
    	res.json(preAssessments);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.monitoringChartPreAssessment.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('preAssessmentRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


preAssessmentRouter.route('/:preBasicId')
.get(function(req,res,next){
    console.log('procesing get');
    db.monitoringChartPreAssessment.findOne({
        where:{
            preBasicId:parseInt(req.params.preBasicId,10),
            patientId:req.params.id
        }
    }).then(function(preAssessment){
        console.log(JSON.stringify(preAssessment));
        res.json(preAssessment);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPreAssessment.update(
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

module.exports = preAssessmentRouter;