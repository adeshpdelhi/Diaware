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
    				if(results[i][key]!= null){
                        resp[objkey][key] = { 
                            id:results[i][key].id
                        }
                        resp[objkey][key][(appointmentType+'Available'+tmtOnMachine)]=results[i][key][(appointmentType+'Available'+tmtOnMachine)];
                    }
        //             if(results[i][key]!= null && results[i][key][appointmentType+'Available'+tmtOnMachine] > 0){
    				// 	resp[objkey][key] = { 
    				// 		id:results[i][key].id,
    				// 	}
    				// 	// resp[objkey][key][(appointmentType+'Total'+tmtOnMachine)]=results[i][key][(appointmentType+'Total'+tmtOnMachine)];
    				// 	resp[objkey][key][(appointmentType+'Available'+tmtOnMachine)]=results[i][key][(appointmentType+'Available'+tmtOnMachine)];
    				// }
    			}
    		}
    	}
        console.log(resp);
    	res.json(resp);
    	// console.log(JSON.stringify(results));
	    // res.json(results);
    });
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
	// res.json(req.body);
	var insertedData=[];
    var length = req.body.shiftPatients.length;
    for(var i =0;i<req.body.shiftPatients.length;i++){
        console.log("schedule :");
        console.log(req.body.shiftPatients[i]);
        if(req.body.shiftPatients[i].delete) {
            length--;
        }
        if(req.body.shiftPatients[i].new){
            db.shiftPatients.build(req.body.shiftPatients[i]).save().then(function(result){
                insertedData.push(JSON.parse(JSON.stringify(result)));
                if(insertedData.length == length){
                    console.log("insertedData: yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay:");
                    console.log(insertedData);
                    res.json({shiftPatients:insertedData});
                }
            },function (rejectedPromiseError) {
                res.status(500);
                res.end("internal server error");
            });    
        }
    }
    // var modifiedRows = [];
    for(key in req.body.update){
    	var object ={};
    	object[req.body.string] = req.body.update[key];
    	console.log(object);
    	db.shifts.update(object,{
    		where:{
    			id:key
    		}
    	}).then(function(resp){
    		// modifiedRows.push(JSON.parse(JSON.stringify(resp)));
            console.log("modified ");
            console.log(resp);
    	},function(rejectedPromiseError){
            res.status(500);
            res.end("internal server error");
        });
    }
    // var result = {insertedData:insertedData,updatedData:modifiedRows};
    // res.json(result);
    console.log('scheduleRouter working');
})
.put(function(req,res,next){
    if(req.query.patientId){
        var results = {};
        results['shiftPatients'] = [];
        var length = req.body.shiftPatients.length;
        for(var i = 0; i < req.body.shiftPatients.length;i++)
        {
            if(req.body.shiftPatients[i].delete){
                console.log("correct entry");
                db.shiftPatients.destroy({
                    where:{
                        patientId: req.query.patientId,
                        shiftId:req.body.shiftPatients[i].shiftId
                    }
                }).then(function(result){
                    console.log(JSON.stringify(result));
                    length--;
                    if(results.shiftPatients.length == length){
                        // results['updatedData'] = modifiedRows;
                        console.log("done creating and deleting");
                        res.json(results);
                        console.log(JSON.stringify(results));
                    }
                    // results.shiftPatients.push(result);
                },function(rejectedPromiseError){
                    res.status(500);
                    res.end(rejectedPromiseError);
                });
            }
            else if(req.body.shiftPatients[i].new){
                console.log("what y here?");
                db.shiftPatients.build(req.body.shiftPatients[i]).save().then(function(result){
                    // res.json(result);
                    results.shiftPatients.push(result);
                    if(results.shiftPatients.length == length){
                        // results['updatedData'] = modifiedRows;
                        console.log("done creating and deleting");
                        res.json(results);
                        console.log(JSON.stringify(results));
                    }
                },function (rejectedPromiseError) {
                    res.status(500);
                    res.end(rejectedPromiseError);
                });
            }
            else results.shiftPatients.push(req.body.shiftPatients[i]);
        }
        // var modifiedRows = [];
        for(key in req.body.update){
            var object ={};
            object[req.body.string] = req.body.update[key];
            console.log(object);
            db.shifts.update(object,{
                where:{
                    id:key
                }
            }).then(function(resp){
                // modifiedRows.push(JSON.parse(JSON.stringify(resp)));
                console.log("results scheduleroute inside put : ");
                console.log(JSON.stringify(resp));
                
            },function(rejectedPromiseError){
                res.status(500);
                res.end(rejectedPromiseError);
            });
        }
        
        
    }
})
.delete(function(req,res,next){
    console.log("processing Delete all")
    if(req.query.deleteAll){
        db.shiftPatients.destroy({
            where:{
                patientId: req.query.patientId
            }
        }).then(function(results){
            console.log("deleted successfully");
            res.json(results);
        },function (rejectedPromiseError) {
            res.status(500);
            res.end("internal server error")
        });
    }  
});


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