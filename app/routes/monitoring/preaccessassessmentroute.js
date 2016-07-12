var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var preAccessAssessmentRouter = express.Router({mergeParams:true});

preAccessAssessmentRouter.use(bodyParser.json());

// can add route to fetch all patients preAccessAssessments ie /api/monitoringChartPreAccessAssessment
// or can add route to fetch list of patients under one preAccessAssessment usind route - /api/preAccessAssessments/

preAccessAssessmentRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.monitoringChartPreAccessAssessment.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(preAccessAssessments){
    	console.log(JSON.stringify(preAccessAssessments));
    	res.json(preAccessAssessments);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.monitoringChartPreAccessAssessment.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('preAccessAssessmentRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


preAccessAssessmentRouter.route('/:preBasicId')
.get(function(req,res,next){
    console.log('procesing get');
    db.monitoringChartPreAccessAssessment.findOne({
        where:{
            preBasicId:parseInt(req.params.preBasicId,10),
            patientId:req.params.id
        }
    }).then(function(preAccessAssessment){
        console.log(JSON.stringify(preAccessAssessment));
        res.json(preAccessAssessment);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPreAccessAssessment.update(
    req.body, {
            where:{
                preBasicId:parseInt(req.params.preBasicId,10),
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.json(result);
        
        // res.end("successfully updated")
    }, function(rejectedPromiseError){
    
    });
})
;

module.exports = preAccessAssessmentRouter;