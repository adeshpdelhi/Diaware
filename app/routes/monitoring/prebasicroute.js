var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var preBasicRouter = express.Router({mergeParams:true});

preBasicRouter.use(bodyParser.json());

// can add route to fetch all patients preBasics ie /api/monitoringChartPreBasic
// or can add route to fetch list of patients under one preBasic usind route - /api/preBasics/

preBasicRouter.route('/')
.get(function (req, res, next) {
    if(req.query.fullChartLatest){
        db.monitoringChartPreBasic.find({
            where:{
                patientId:req.params.id
            },
            include:[{
                model:db.patientDetails
            },{
                model:db.monitoringChartPreBasicMedical
            },{
                model:db.monitoringChartPreMachineFinalCheck
            },{
                model:db.monitoringChartPreAssessment
            },{
                model:db.monitoringChartPreAccessAssessment
            },{
                model:db.monitoringChartIntra
            },{
                model:db.monitoringChartPost
            }],
            order:[['monitoringDate','DESC']]
        }).then(function(preBasic){
            console.log(JSON.stringify(preBasic));
            res.json(preBasic);
        });    
        return;
    }
    console.log('procesing get');
    db.monitoringChartPreBasic.findAll({
        where:{
            patientId:req.params.id
        },
        order:[['monitoringDate','DESC']]
    }).then(function(preBasics){
    	console.log(JSON.stringify(preBasics));
    	res.json(preBasics);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.monitoringChartPreBasic.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('preBasicRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


preBasicRouter.route('/:preBasicId')
.get(function(req,res,next){
    console.log('procesing get');
    if(req.query.fullChart){
        db.monitoringChartPreBasic.find({
            where:{
                preBasicId:parseInt(req.params.preBasicId,10),
                patientId:req.params.id
            },
            include:[{
                model:db.patientDetails
            },{
                model:db.monitoringChartPreBasicMedical
            },{
                model:db.monitoringChartPreMachineFinalCheck
            },{
                model:db.monitoringChartPreAssessment
            },{
                model:db.monitoringChartPreAccessAssessment
            },{
                model:db.monitoringChartIntra
            },{
                model:db.monitoringChartPost
            }]
            // order:[['monitoringDate','DESC']]
        }).then(function(preBasic){
            console.log(JSON.stringify(preBasic));
            res.json(preBasic);
        });    
        return;
    }
    db.monitoringChartPreBasic.findOne({
        where:{
            preBasicId:parseInt(req.params.preBasicId,10),
            patientId:req.params.id
        }
    }).then(function(preBasic){
        console.log(JSON.stringify(preBasic));
        res.json(preBasic);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPreBasic.update(
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

module.exports = preBasicRouter;