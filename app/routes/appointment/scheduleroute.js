var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');
var sequelize = require('sequelize');

var scheduleRouter = express.Router({mergeParams:true});
scheduleRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
scheduleRouter.route('/')
.get(function (req, res, next) {
    	// console.log(JSON.stringify(bills));
    console.log('procesing get');
    // sequelize.query("SELECT * FROM weekDaySlots as W JOIN shifts as S WHERE W.shift1Id == S.id && W")
    db.weekDaySlots.findAll({
    	where:{
    		centreId:req.params.centreId
    	},
    	include: [{
    		model:db.shifts,
    		as:'shift1'
    	},{
    		model:db.shifts,
    		as:'shift2'
    	},{
    		model:db.shifts,
    		as:'shift3'
    	}]
    }).then(function(results){
    	var appointmentType = req.query.appointmentType;
    	var freqPreWeek = req.query.freqPreWeek;

    	console.log(JSON.stringify(results));
	    res.json(results);
    });
});

// .post(function (req, res, next) {
// 	console.log('processing post : '+ req.body);
// 	// res.json(req.body);
//     db.bills.build(req.body).save().then(function(result){
//     	res.json(result);
//     });	
//     // res.end('scheduleRouter working');
// })
// .delete(function(req,res,next){
    
// });

// scheduleRouter.route('/:id')
// .get(function(req,res,next){
//     console.log('procesing get');
//     db.bills.find({
//     	where:{
//     		transactionId: parseInt(req.params.id,10)
//     	},
//     	include:[{
//     		model:db.patientDetails,
//     		where:{
//     			centreId:req.params.centreId
//     		}
//     	}]
//     }).then(function(bill){
//         console.log(JSON.stringify(bill));
//         res.json(bill);
//     });
// })
// .delete(function(req,res,next){

// })
// .put(function(req,res,next){
// 	console.log(req.body);
// 	db.bills.update(
// 	req.body, {where:{transactionId:parseInt(req.params.id,10)}}
// 	)
// 	.then(function (result) { 
// 		console.log(JSON.stringify(result));
// 		res.end("successfully updated")
// 	}, function(rejectedPromiseError){

// 	});
// })
// ;

module.exports = scheduleRouter;