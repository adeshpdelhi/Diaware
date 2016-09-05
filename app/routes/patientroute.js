var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var patientRouter = express.Router({mergeParams:true});
patientRouter.use(bodyParser.json());

//registration
var panelRouter = require('./PatientDetails/paneldetailroute');
patientRouter.use('/:id/panelDetails',panelRouter);
var otherRouter = require('./PatientDetails/otherdetailsroute');
patientRouter.use('/:id/otherDetails',otherRouter);
var medicalRouter = require('./PatientDetails/medicalroute');
patientRouter.use('/:id/medicalHistory', medicalRouter);
var clinicalRouter = require('./PatientDetails/clinicaleventsroute');
patientRouter.use('/:id/clinicalEvents',clinicalRouter);

//care plan
var carePlanRouter = require('./careplan/careplanroute');
patientRouter.use('/:id/carePlans',carePlanRouter);


patientRouter.route('/')
.get(function (req, res, next) {
    var where = {};
    if(req.params.centreId != 'all')
        where['centreId'] = req.params.centreId;
    if(req.query.dateFrom && req.query.dateTo){
        where['createdAt'] ={
            $gt:new Date(req.query.dateFrom),
            $lt:new Date(req.query.dateTo)
        }
    }
    if(req.query.count){
        console.log("where: patient route");
        console.log(where);
        db.patientDetails.count({
            where:where
        }).then(function(result){
            console.log("count: "+result);
            res.json({count:result});
        },function(rejectedPromiseError){
            res.status(400);
            res.end("Couldnt fetch Data");
        })
        return;    
    }
    console.log('procesing get');
    db.patientDetails.findAll({
        where:where
    }).then(function(patients){
    	console.log(JSON.stringify(patients));
    	res.json(patients);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.patientDetails.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('patientRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});

patientRouter.route('/:id')
.get(function(req,res,next){
    console.log('procesing get');
    if(req.query.getSchedule ){
        db.patientDetails.find({
            where:{
                id:req.params.id
                // centreId:req.params.centreId
            },
            include:[{
                model:db.schedulePatients
            }]
            // order: [['updatedAt', 'DESC']]
        }).then(function(patient){
            console.log(JSON.stringify(patient));
            res.json(patient);
        });    
        return;
    }
    if(req.query.fullDetails){
        db.patientDetails.find({
            where:{
                id:req.params.id
                // centreId:req.params.centreId
            },
            include:[{
                model:db.panelDetails
            },{
                model:db.otherDetails
            },{
                model:db.medicalHistory
            },{
                model:db.majorClinicalEvents
            }]
            // order: [['updatedAt', 'DESC']]
        }).then(function(patient){
            console.log(JSON.stringify(patient));
            res.json(patient);
        });    
        return;
    }
    db.patientDetails.findOne({
        where:{
            id:req.params.id
            // centreId:req.params.centreId
        }
    }).then(function(patient){
        console.log(JSON.stringify(patient));
        res.json(patient);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    db.patientDetails.find({ 
        where: {
            id:req.params.id
        } 
    }).then(function(patient){
        if (patient) { // if the record exists in the db
            patient.updateAttributes(req.body).then(function (result) { 
                console.log(JSON.stringify(result));
                res.status(200);
                res.end("successfully updated");
                console.log('updated successfully');
            }, function(rejectedPromiseError){
                res.status(400);
                res.end('error');
                console.log('cannot update: '+rejectedPromiseError);
            });
        }
    });
})
;

// patientRouter.route('/:id/panelDetails/:panelId')
// .get(function(req,res,next){
//     console.log('procesing get');
//     console.log(parseInt(req.params.panelId,10));
//     console.log(req.params.id);
//     db.panelDetails.findOne({
//         where:{
//             panelId:parseInt(req.params.panelId,10),
//             patientId:req.params.id
//         }
//     }).then(function(panel){
//         res.json(req.params);
//         console.log(JSON.stringify(panel));
//         // res.json(panel);
//     });
// });

module.exports = patientRouter;