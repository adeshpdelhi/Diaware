var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var carePlanRouter = express.Router({mergeParams:true});

carePlanRouter.use(bodyParser.json());


// can add route to fetch all patients carePlans ie /api/dialysisCarePlan ----------- naaaaaaah .... list of patients phir wahan se show careplan / panels/ other details monitoring charts etc etc
// or can add route to fetch list of patients under one carePlan usind route - /api/carePlans/

carePlanRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.dialysisCarePlan.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(carePlans){
    	console.log(JSON.stringify(carePlans));
    	res.json(carePlans);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.dialysisCarePlan.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('carePlanRouter working'); // send status code
        
    });
})
.put(function(req,res,next){
    console.log(req.body);
    db.dialysisCarePlan.update(
    req.body, {
            where:{
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
.delete(function(req,res,next){
    
});


carePlanRouter.route('/:carePlanId')
.get(function(req,res,next){
    console.log('procesing get');
    db.dialysisCarePlan.findOne({
        where:{
            carePlanId:parseInt(req.params.carePlanId,10),
            patientId:req.params.id
        }
    }).then(function(carePlan){
        console.log(JSON.stringify(carePlan));
        res.json(carePlan);
    });
})
.delete(function(req,res,next){
    db.dialysisCarePlan.destroy({
        where:{
            patientId:req.params.id,
            carePlanId:parseInt(req.params.carePlanId,10)
        }
    }).then(function(result){
        res.json(result);
    })
})
.put(function(req,res,next){
    console.log(req.body);
    db.dialysisCarePlan.update(
    req.body, {
            where:{
                carePlanId:parseInt(req.params.carePlanId,10),
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully updated")
    }, function(rejectedPromiseError){
    
    });
})
;

module.exports = carePlanRouter;