var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var medicalRouter = express.Router({mergeParams:true});

medicalRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients medicals ie /api/medicalHistory
// or can add route to fetch list of patients under one medical usind route - /api/medicals/

medicalRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.medicalHistory.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(medicals){
    	console.log(JSON.stringify(medicals));
    	res.json(medicals);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.medicalHistory.build(req.body).save().then(function(result){
        res.json(result);
    });
    // res.end('medicalRouter working'); // send status code
})
// .put(function(req,res,next){
//     console.log(req.body);
//     db.medicalHistory.update(
//     req.body, {
//             where:{
//                 patientId:req.params.id
//             }
//         }
//     )
//     .then(function (result) { 
//         console.log(JSON.stringify(result));
//         res.json(result);
        
//         // res.end("successfully updated")
//     }, function(rejectedPromiseError){
    
//     });
// })
.delete(function(req,res,next){
    
});


// medicalRouter.route('/:medicalId')
// .get(function(req,res,next){
//     console.log('procesing get');
//     db.medicalHistory.findOne({
//         where:{
//             medicalId:parseInt(req.params.medicalId,10),
//             patientId:req.params.id
//         }
//     }).then(function(medical){
//         console.log(JSON.stringify(medical));
//         res.json(medical);
//     });
// })
// .delete(function(req,res,next){

// })
// .put(function(req,res,next){
//     console.log(req.body);
//     db.medicalHistory.update(
//     req.body, {
//             where:{
//                 medicalId:parseInt(req.params.medicalId,10),
//                 patientId:req.params.id
//             }
//         }
//     )
//     .then(function (result) { 
//         console.log(JSON.stringify(result));
//         res.end("successfully updated")
//     }, function(rejectedPromiseError){
    
//     });
// })
;

module.exports = medicalRouter;