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
    	},{
    		model:db.shifts,
    		as:'shift4'
    	},{
    		model:db.shifts,
    		as:'shift5'
    	},{
    		model:db.shifts,
    		as:'shift6'
    	}]
    }).then(function(results){
    	var appointmentType = req.query.appointmentType;
    	var tmtOnMachine = req.query.tmtOnMachine;
    	// var freqPreWeek = req.query.freqPerWeek;// added : incase 7med says to have choice in dropdown instead of choosing days themselves
    	// console.log(results);
    	results = JSON.parse(JSON.stringify(results));
    	console.log(results);
    	var resp = {};
    	for(var i = 0 ;i<7 ;i++){
    		var objkey;
    		for (var key in results[i]){
    			if(key == 'dayOfTheWeek'){
    				objkey = results[i][key];
    				resp[results[i][key]] = {};
    			}
    			if( key == 'shift1' || 
    				key == 'shift2' || 
    				key == 'shift3' || 
    				key == 'shift4' || 
    				key == 'shift5' || 
    				key	== 'shift6'){
    				if(results[i][key]!= null && results[i][key][appointmentType+'Available'+tmtOnMachine] > 0){
    					resp[objkey][key] = { 
    						id:results[i][key].id,
    					}
    					// resp[objkey][key][(appointmentType+'Total'+tmtOnMachine)]=results[i][key][(appointmentType+'Total'+tmtOnMachine)];
    					resp[objkey][key][(appointmentType+'Available'+tmtOnMachine)]=results[i][key][(appointmentType+'Available'+tmtOnMachine)];
    				}
    			}
    		}
    	}
    	res.json(resp);
    	// console.log(JSON.stringify(results));
	    // res.json(results);
    });
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
	// res.json(req.body);
	var insertedData;
    db.shiftPatients.bulkCreate(req.body.shiftPatients).then(function(results){
    	console.log(JSON.stringify(results));
    	insertedData = JSON.parse(JSON.stringify(results));
    });	
    var modifiedRows = [];
    for(key in req.body.update){
    	var object ={};
    	object[req.body.string] = req.body.update[key];
    	console.log(object);
    	db.shifts.update(object,{
    		where:{
    			id:key
    		}
    	}).then(function(resp){
    		modifiedRows.push(JSON.parse(JSON.stringify(resp)));
    	});
    }
    var result = {insertedData:insertedData,updatedData:modifiedRows};
    res.json(result);
    // res.end('scheduleRouter working');
});
// .delete(function(req,res,next){
    
// });


scheduleRouter.route('/:shiftId')
.put(function(req,res,next){
	console.log(req.body);
	db.shifts.update(
	req.body, {
		where:{
			id:req.params.shiftId
		}
	})
	.then(function (result) { 
		console.log(JSON.stringify(result));
		res.end("successfully updated")
	}, function(rejectedPromiseError){

	});
})
;

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

module.exports = scheduleRouter;