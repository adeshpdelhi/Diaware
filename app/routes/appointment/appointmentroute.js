var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');

var appointmentRouter = express.Router({mergeParams:true});
appointmentRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
appointmentRouter.route('/futureAppointments')
.get(function (req, res, next) {
    	// console.log(JSON.stringify(bills));
    console.log('procesing get');
    var where = {};
    where['centreId'] = req.params.centreId;
    where['cancelled'] = false;
    where['attended'] = null;
    if(req.query.date != null ) {
        where['date'] = {
            $lt:req.query.date,
            $gt:new Date(Date.parse(req.query.date) - 24*60*60*1000)
        }
        console.log(where.date);

    }
    // var flag = true;
    var today = new Date();
    today.setHours(0,0,0,000);
    db.futureAppointments.findAll({
        include: [{
            model:db.shiftPatients
        }],
        where:{
            centreId:req.params.centreId,
            date:{
                $lt: today
            },
            attended:null,
            cancelled:false
        }
    }).then(function(result){
        console.log(JSON.stringify(result));
        if(result.length !== 0){
            console.log("result:");
            console.log(JSON.stringify(result));
            res.status(206).json(result);
            // res.json(JSON.stringify(result));
            // console.log(flag);

            // return ;
        }
        else{
            db.futureAppointments.findAll({
                include: [{
                   model:db.shiftPatients,
                },{
                    model:db.patientDetails,
                    attributes:['name','id','contact']
                }],
                where:where
            }).then(function(results){
                console.log("entered -_-");
                console.log(JSON.stringify(results));
                res.status(200).json(results);
                // res.json(results);
            });
        }
    });
    
})

.delete(function(req,res,next){
    
});

appointmentRouter.route('/futureAppointments/:appointmentId')
.get(function (req, res, next) {
        // console.log(JSON.stringify(bills));
    console.log('procesing get');
    db.futureAppointments.find({
        include: [{
            model:db.shiftPatients
        },{
            model:db.patientDetails
        }],
        where:{
            appointmentId:parseInt(req.params.appointmentId,10),
            centreId:req.params.centreId
        }
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    });

})
.delete(function(req,res,next){
    console.log('processing delete');
    db.futureAppointments.destroy({
        where:{
            appointmentId:parseInt(req.params.appointmentId,10),
            centreId:req.params.centreId
        }
    }).then(function(result){
        console.log("deleted successfully!");
        console.log(JSON.stringify(result));
        res.json(result);
    });
})
.put(function(req, res, next){
    db.futureAppointments.update(req.body,{
        where:{
            appointmentId:parseInt(req.params.appointmentId,10),
            centreId:req.params.centreId
        }
    }).then(function(result){
        console.log("updated successfully!");
        console.log(JSON.stringify(result));
        res.json(result);
    });

})
;


appointmentRouter.route('/pastAppointments')
.get(function(req,res,next){
    console.log('procesing get');
    db.attendedAppointments.findAll({
    	where:{
    		centreId: req.params.centreId
    	},
    	include:[{
    		model:db.shiftPatients,
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
    db.attendedAppointments.find({
        include: [{
            model:db.shiftPatients
        },{
            model:patientDetails
        }],
        where:{
            appointmentId:parseInt(req.params.appointmentId,10),
            centreId:req.params.centreId
        }
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    });
})
;

module.exports = appointmentRouter;