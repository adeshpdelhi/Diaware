var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var otherRouter = express.Router({mergeParams:true});

otherRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients others ie /api/otherDetails
// or can add route to fetch list of patients under one other usind route - /api/others/

otherRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.otherDetails.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(others){
    	console.log(JSON.stringify(others));
    	res.json(others);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.otherDetails.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('otherRouter working'); // send status code
        
    });
})
.put(function(req,res,next){
    console.log(req.body);
    db.otherDetails.update(
    req.body, {
            where:{
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        // res.json(result);
        res.status(200);
        res.end("successfully updated");
    }, function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error") ;   
    });
})
.delete(function(req,res,next){
    
});


// otherRouter.route('/:otherId')
// .get(function(req,res,next){
//     console.log('procesing get');
//     db.otherDetails.findOne({
//         where:{
//             otherId:parseInt(req.params.otherId,10),
//             patientId:req.params.id
//         }
//     }).then(function(other){
//         console.log(JSON.stringify(other));
//         res.json(other);
//     });
// })
// .delete(function(req,res,next){

// })
// .put(function(req,res,next){
//     console.log(req.body);
//     db.otherDetails.update(
//     req.body, {
//             where:{
//                 otherId:parseInt(req.params.otherId,10),
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

module.exports = otherRouter;