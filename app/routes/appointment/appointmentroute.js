var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');

var appointmentRouter = express.Router({mergeParams:true});
appointmentRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
appointmentRouter.route('/futureAppointments')
.get(function (req, res, next) {
    console.log('procesing get');
    var today = new Date();
    today.setHours(23,59,59,999);
    
    var where = {};
    where['cancelled'] = false;
    where['date'] = {
        $gt:today
    };

    //todays appointments
    if(req.query.date != null ) {
        where['date'] = {
            $lt:req.query.date,
            $gt:new Date(Date.parse(req.query.date) - 24*60*60*1000)
        };
        console.log(where.date);
        // where['processComplete'] = {};
    }else{
        where['processComplete'] = false;
    }
    if(req.params.centreId != 'all')  
        where['centreId'] = req.params.centreId;

    // var flag = true;
    //fetch pending appointments till that date for user to update their status to cancelled or not attended
    var yesterday = new Date();
    yesterday.setDate(today.getDate()-1);
    yesterday.setHours(23,59,59,999);
    // console.log(yesterday);
    db.appointments.findAll({
        include: [{
            model:db.patientDetails,
            attributes:['name','id','contact']
        }],
        where:{
            centreId:req.params.centreId,
            date:{
                $lte: yesterday
            },
            $or:[
                {
                    present: {
                        $eq:null,
                    }
                },
                {
                    $and:{
                        present: true,
                        processComplete: false
                    }
                }
            ],
            cancelled:false
        },
        // orderBy:[['date','shiftNumber']]
    }).then(function(result){
        console.log(JSON.stringify(result));
        db.appointments.findAll({
            include: [{
                model:db.patientDetails,
                attributes:['name','id','contact']
            }],
            where:where
        }).then(function(results){
            console.log("entered fetch  all appointments");
            console.log(JSON.stringify(results));
            console.log(result.length);
            results = JSON.parse(JSON.stringify(results));
            if(result.length !== 0){
                res.status(206).json(results);
            }else{
                res.status(200).json(results);
            }
            // res.json(results);
        });
    });
})

.delete(function(req,res,next){
    
});
/*
    console.log(JSON.stringify(result));
    if(result.length !== 0){
        console.log("result:");
        console.log(JSON.stringify(result));
        res.status(206).json(result);
    }
    else{
        db.appointments.findAll({
            include: [{
                model:db.patientDetails,
                attributes:['name','id','contact']
            }],
            where:where
        }).then(function(results){
            console.log("entered fetch  all appointments");
            console.log(JSON.stringify(results));
            res.status(200).json(results);
            // res.json(results);
        });
    }

    */
appointmentRouter.route('/futureAppointments/:appointmentId')
.get(function (req, res, next) {
    console.log('procesing get');
    db.appointments.find({
        include: [{
            model:db.patientDetails
        }],
        where:{
            appointmentId:parseInt(req.params.appointmentId,10)
        }
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    });

})
.delete(function(req,res,next){
    console.log('processing delete');
    db.appointments.destroy({
        where:{
            appointmentId:parseInt(req.params.appointmentId,10)
        }
    }).then(function(result){
        console.log("deleted successfully!");
        console.log(JSON.stringify(result));
        res.json(result);
    });
})
.put(function(req, res, next){
    db.appointments.find({ 
        where: {
            appointmentId:parseInt(req.params.appointmentId,10)
        } 
    }).then(function(result){
        if (result) { // if the record exists in the db
            result.updateAttributes(req.body).then(function (result) { 
                console.log(JSON.stringify(result));
                res.status(200);
                res.end("successfully updated");
                console.log('updated successfully');
            }, function(rejectedPromiseError){
                res.status(500);
                res.end('Internal Server Error');
                console.log('cannot update: '+ rejectedPromiseError);
            });
        }
    });

})
    // db.appointments.update(req.body,{
    //     where:{
    //         appointmentId:parseInt(req.params.appointmentId,10),
    //         centreId:req.params.centreId
    //     }
    // }).then(function(result){
    //     console.log("updated successfully!");
    //     console.log(JSON.stringify(result));
    //     res.json(result);
    // });


;
// module.exports = appointmentRouter;

appointmentRouter.route('/pastAppointments')
.get(function(req,res,next){
    console.log('procesing get');
    var today = new Date();
    today.setHours(23,59,59,999);
    var yesterday = new Date();
    yesterday.setDate(today.getDate()-1);
    yesterday.setHours(23,59,59,999);
    var where ={};
    where['date'] = {
        $lte:yesterday
    };
    
    where['cancelled'] = false;

    if(req.query.attended && JSON.parse(req.query.attended) == true){
        where['processComplete'] = true;
    }else if(req.query.attended && JSON.parse(req.query.attended) == false) 
        where['present'] = JSON.parse(req.query.attended);
    
    if(req.params.centreId != 'all')
        where['centreId'] = req.params.centreId;
    
    if(req.query.count){
        db.appointments.count({
            where:where
        }).then(function(result){
            console.log("count:" + result);
            res.json({count:result});
        },function(rejectedPromiseError){
            console.log(rejectedPromiseError);
            res.status(400);
            res.edn("couldnt fetch data appointment route");
        })
        return;
    }
            // res.status(206).json(result);
    if(req.query.incomplete){
        where['$or'] = [
                {
                    present: {
                        $eq:null,
                    }
                },
                {
                    $and:{
                        present: true,
                        processComplete: false
                    }
                }
            ];
    }
    db.appointments.findAll({
    	where:where,
    	include:[{
            model:db.patientDetails,
            attributes:['name','id','contact']
        }]
    }).then(function(results){
        console.log(JSON.stringify(results));
        res.json(results);
    });
})
;
appointmentRouter.route('/pastAppointments/:appointmentId')
.get(function (req, res, next) {
        // console.log(JSON.stringify(bills));
    console.log('procesing get');
    console.log(parseInt(req.params.appointmentId,10));
    console.log(req.params.centreId);
    var today = new Date();
    today.setHours(23,59,59,999);
    db.appointments.find({
        where:{
            appointmentId:parseInt(req.params.appointmentId,10),
            date:{
                $lt: today
            }
        },
        include: [{
            model:db.patientDetails
        }]
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    });
})
;

appointmentRouter.route('/cancelledAppointments')
.get(function(req,res,next){
    console.log('procesing get');
    var today = new Date();
    today.setHours(23,59,59,999);
    var where ={};
    where['cancelled'] = true;

    if(req.params.centreId != 'all')
        where['centreId'] = req.params.centreId;
    
    db.appointments.findAll({
        where:where,
        include:[{
            model:db.patientDetails,
            attributes:['name','id','contact']
        }]
    }).then(function(results){
        console.log(JSON.stringify(results));
        res.json(results);
    });
})
;
appointmentRouter.route('/cancelledAppointments/:appointmentId')
.get(function (req, res, next) {
        // console.log(JSON.stringify(bills));
    console.log('procesing get');

    db.appointments.find({
        include: [{
            model:db.patientDetails
        }],
        where:{
            appointmentId:parseInt(req.params.appointmentId,10),
            cancelled:true
        }
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    });
})
;

appointmentRouter.route('/appointments')
.get(function(req,res,next){
    console.log('procesing get');
    var where ={};
    if(req.params.centreId != 'all')
        where['centreId'] = req.params.centreId;
    
    db.appointments.findAll({
        where:where,
        include:[
        {
            model:db.patientDetails,
            attributes:['name','id','contact']
        }]
    }).then(function(results){
        console.log(JSON.stringify(results));
        res.json(results);
    });
})
.post(function(req,res,next){
    console.log("processing post");
    var appointment = req.body;
    console.log(appointment);
    db.appointments.build(appointment).save().then(function(result){
      console.log("saved appointment successfully!");
      res.json(result);
      console.log(JSON.stringify(result));
    });
})
;
appointmentRouter.route('/appointments/:appointmentId')
.get(function (req, res, next) {
        // console.log(JSON.stringify(bills));
    console.log('procesing get');
    console.log(parseInt(req.params.appointmentId,10));
    console.log(req.params.centreId);
    db.appointments.find({
        where:{
            appointmentId:parseInt(req.params.appointmentId,10)
        },
        include: [{
            model:db.patientDetails
        }]
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    });
})
.put(function(req, res, next){
    db.appointments.find({ 
        where: {
            appointmentId:parseInt(req.params.appointmentId,10)
            // centreId:req.params.centreId
        } 
    }).then(function(result){
        if (result) { // if the record exists in the db
            result.updateAttributes(req.body).then(function (result) { 
                console.log(JSON.stringify(result));
                res.status(200);
                res.end("successfully updated");
                console.log('updated successfully');
            }, function(rejectedPromiseError){
                res.status(500);
                res.end('Internal Server Error');
                console.log('cannot update: '+ rejectedPromiseError);
            });
        }
    });

})
;
var sequelize = require('sequelize');

appointmentRouter.route('/availableBeds/:date')
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
    // Date.parse(req.query.date)
    console.log(req.params.date);
    var dt = new Date(req.params.date);
    dt.setHours(23,59,59,999);
    where['date']={
        $lt:dt,
        $gt: new Date(dt - 24*60*60*1000)
    }
    db.appointments.findAll({
        where:where,
        attributes: ["dayOfTheWeek","date","shiftNumber", [sequelize.fn('count', sequelize.col('appointmentId')), 'count']],
        group:["dayOfTheWeek","date","shiftNumber"],
    }).then(function(results){
        // res.json(results);
        console.log("result of search beds");
        console.log(results.length);
        db.centres.find({
            where:{
                id:req.params.centreId
            }
        }).then(function(result){
            results = JSON.parse(JSON.stringify(results));
            var maxShifts = result.noOfShiftsPerDay;
            var maxBeds = result[req.query.appointmentType+"Total"+req.query.tmtOnMachine + "s"];
            if(maxBeds == null)
                maxBeds = 0;
            console.log(maxShifts);
            var resp = {}
            resp[req.params.date] = {};
            for(var j = 1; j <= maxShifts;j++){
                console.log(req.query.appointmentType+"Total"+req.query.tmtOnMachine + "s");
                resp[req.params.date]['shift'+j] = maxBeds;
            }
            for(var i = 0; i < results.length ; i++){
                console.log(results[i]);
                console.log(results[i].count);
                resp[req.params.date]['shift'+results[i].shiftNumber] -= results[i].count;
            }    
            res.json(resp);
        });
    });

})

module.exports = appointmentRouter;