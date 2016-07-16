var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var clinicalEventRouter = express.Router({mergeParams:true});

clinicalEventRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients clinicalEvents ie /api/majorClinicalEvents

clinicalEventRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.majorClinicalEvents.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(clinicalEvents){
    	console.log(JSON.stringify(clinicalEvents));
    	res.json(clinicalEvents);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.majorClinicalEvents.build(req.body).save().then(function(result){
        // console.log(result);
        console.log(JSON.stringify(result));
        res.json(result);        
    });
    // Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(function(task) {
    // you can now access the newly created task via the variable task
    // })
})
// .put(function(req,res,next){
//     console.log(req.body);
//     db.majorClinicalEvents.update(
//     req.body, {
//             where:{
//                 patientId:req.params.id
//             }
//         }
//     )
//     .then(function (result) { 
//         console.log(JSON.stringify(result));
//         res.json(result);
//         res.end("successfully updated");
//     }, function(rejectedPromiseError){
    
//     });
// })
.delete(function(req,res,next){
    
});


clinicalEventRouter.route('/:clinicalEventId')
.get(function(req,res,next){
    console.log('procesing get');
    db.majorClinicalEvents.findOne({
        where:{
            id:parseInt(req.params.clinicalEventId,10),            
            patientId:req.params.id
        }
    }).then(function(clinicalEvent){
        console.log(JSON.stringify(clinicalEvent));
        res.json(clinicalEvent);
    });
})
.delete(function(req,res,next){
    console.log("procesing delete");
    db.majorClinicalEvents.destroy(
    {
        where:{
            id:parseInt(req.params.clinicalEventId,10),
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
.put(function(req,res,next){
    console.log(req.body);
    db.majorClinicalEvents.update(
    req.body, {
            where:{
                id:parseInt(req.params.clinicalEventId,10),            
                // eventDetails:req.params.clinicalEvent,
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        // res.json(result);
        res.status(200);
        res.end("successfully deleted")
    }, function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
})
;

module.exports = clinicalEventRouter;