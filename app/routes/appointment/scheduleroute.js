var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');
var sequelize = require('sequelize');

var scheduleRouter = express.Router({mergeParams:true});
scheduleRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
var deleteAppointments = function(schedule){
    console.log("deleting!1111111111111111111111111111111111111111111111");
    console.log(schedule);
    var today = new Date();
    today.setHours(23,59,59,999);
    db.appointments.destroy({
        where:{
            patientId:schedule.patientId,
            shiftNumber:schedule.shiftNumber,
            dayOfTheWeek:schedule.day,
            date:{
                $gt:today
            }
        }
    }).then(function(results){
        console.log(results);
        console.log("deleted these appointments");
    })
}
scheduleRouter.route('/')
.get(function (req, res, next) {
    console.log('procesing get');
    var where = {};
    if(req.params.centreId == 'all')  {
        res.end("Invalid Data!")
        return;
    }
    if(req.params.centreId != 'all')  
        where['centreId'] = req.params.centreId;
    where['appointmentType'] = req.query.appointmentType;
    where['tmtMachine'] = req.query.tmtOnMachine;
    var today = new Date();
    today.setHours(23,59,59,999);
    where['date']={
        $gte: today
    }
    db.appointments.findAll({
        where:where,
        attributes: ["dayOfTheWeek","date","shiftNumber","oneTimeAppointment", [sequelize.fn('count', sequelize.col('appointmentId')), 'count']],
        group:["dayOfTheWeek","date","shiftNumber","oneTimeAppointment"],
    }).then(function(results){
        // res.json(results);
        console.log("heeeeeeeeeeey");
        console.log(results.length);
        db.centres.find({
            where:{
                id:req.params.centreId
            }
            // attributes: ["noOfShiftsPerDay"]
        }).then(function(result){
            // res.json(results);
            results = JSON.parse(JSON.stringify(results));
            var maxShifts = result.noOfShiftsPerDay;
            var maxBeds = result[req.query.appointmentType+"Total"+req.query.tmtOnMachine + "s"];
            if(maxBeds == null)
                maxBeds = 0;
            console.log(maxShifts);
            var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];        
            var resp = {}
            for (var  i = 0; i < 7;i++){
                resp[weekday[i]] = {};
                for(var j = 1; j <= maxShifts;j++){
                    // console.log(req.query.appointmentType+"Total"+req.query.tmtOnMachine + "s");
                    resp[weekday[i]]['shift'+j] = maxBeds;
                }
            }
            for(var i = 0; i < results.length ; i++){
                console.log(results[i]);
                console.log(results[i].count);
                var value = resp[results[i].dayOfTheWeek]['shift'+results[i].shiftNumber];
                if(!results[i].oneTimeAppointment &&  (value + results[i].count)!= maxBeds)
                    resp[results[i].dayOfTheWeek]['shift'+results[i].shiftNumber] -= results[i].count;
            }    
            res.json(resp);
        });
    });

})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
	// res.json(req.body);
	var insertedData=[];
    var length = req.body.schedulePatients.length;
    for(var i =0;i<req.body.schedulePatients.length;i++){
        console.log("schedule :");
        console.log(req.body.schedulePatients[i]);
        if(req.body.schedulePatients[i].delete) {
            length--;
        }
        if(req.body.schedulePatients[i].new){
            console.log(req.body.schedulePatients[i]);
            db.schedulePatients.build(req.body.schedulePatients[i]).save().then(function(result){
                insertedData.push(JSON.parse(JSON.stringify(result)));
                if(insertedData.length == length){
                    console.log("insertedData: yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay:");
                    console.log(insertedData);
                    res.json({schedulePatients:insertedData});
                }
            },function (rejectedPromiseError) {
                res.status(500);
                res.end("internal server error");
            });    
        }
    }
    console.log('scheduleRouter working');
})
.put(function(req,res,next){
    if(req.query.patientId){
        var results = {};
        results['schedulePatients'] = [];
        var length = req.body.schedulePatients.length;
        var X = [], x = 0;
        for(var i = 0; i < req.body.schedulePatients.length;i++)
        {
            if(req.body.schedulePatients[i].delete){
                X.push(i)
                console.log("2222222222222222222222222222222222222222222222222222222222222222222222222222");
                console.log(req.body.schedulePatients[i]);
                console.log("correct entry");
                db.schedulePatients.destroy({
                    where:{
                        patientId: req.query.patientId,
                        shiftNumber:req.body.schedulePatients[i].shiftNumber,
                        day:req.body.schedulePatients[i].day
                    }
                }).then(function(result){
                    deleteAppointments(req.body.schedulePatients[X[x++]]);
                    console.log(JSON.stringify(result));
                    length--;
                    if(results.schedulePatients.length == length){
                        console.log("done creating and deleting");
                        res.json(results);
                        console.log(JSON.stringify(results));
                    }
                },function(rejectedPromiseError){
                    res.status(500);
                    res.end(rejectedPromiseError);
                });
            }
            else if(req.body.schedulePatients[i].new){
                console.log("what y here?");
                db.schedulePatients.build(req.body.schedulePatients[i]).save().then(function(result){
                    results.schedulePatients.push(result);
                    if(results.schedulePatients.length == length){
                        console.log("done creating and deleting!!!!!!!!!!!!!");
                        res.json(results);
                        console.log(JSON.stringify(results));
                    }
                },function (rejectedPromiseError) {
                    res.status(500);
                    res.end(rejectedPromiseError);
                });
            }
            else results.schedulePatients.push(req.body.schedulePatients[i]);
        }
        
    }
})
.delete(function(req,res,next){
    console.log("processing Delete all")
    var today = new Date();
    // today.setHours(23,59,59,999);
    var yesterday = new Date();
    yesterday.setDate(today.getDate()-1);
    if(req.query.deleteAll){
        db.schedulePatients.destroy({
            where:{
                patientId: req.query.patientId
            }
        }).then(function(results){
            db.appointments.destroy({
                where:{
                    patientId:req.query.patientId,
                    date:{
                        $gt:yesterday
                    }
                }
            }).then(function(result){
                console.log("deleted all future appointments!");
            })
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