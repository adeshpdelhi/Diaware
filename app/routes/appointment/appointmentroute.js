var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');

var appointmentRouter = express.Router({mergeParams:true});
appointmentRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
// appointmentRouter.route('/futureAppointments')
// .get(function (req, res, next) {
//     	// console.log(JSON.stringify(bills));
//     console.log('procesing get');
//     var where = {};
//     where['cancelled'] = false;
//     where['attended'] = null;
//     //todays appointments
//     if(req.query.date != null ) {
//         where['date'] = {
//             $lt:req.query.date,
//             $gt:new Date(Date.parse(req.query.date) - 24*60*60*1000)
//         };
//         console.log(where.date);
//     }
//     if(req.params.centreId != 'all')  
//         where['centreId'] = req.params.centreId;

//     // var flag = true;
//     //fetch pending appointments till that date for user to update their status to cancelled or not attended
//     var today = new Date();
//     today.setHours(0,0,0,000);
//     db.futureAppointments.findAll({
//         include: [{
//             model:db.shiftPatients
//         },{
//             model:db.patientDetails,
//             attributes:['name','id','contact']
//         }],
//         where:{
//             centreId:req.params.centreId,
//             date:{
//                 $lt: today
//             },
//             attended:null,
//             cancelled:false
//         },
//         // orderBy:[['date','shiftNumber']]
//     }).then(function(result){
//         console.log(JSON.stringify(result));
//         if(result.length !== 0){
//             console.log("result:");
//             console.log(JSON.stringify(result));
//             res.status(206).json(result);
//             // res.json(JSON.stringify(result));
//             // console.log(flag);

//             // return ;
//         }
//         else{
//             db.futureAppointments.findAll({
//                 include: [{
//                    model:db.shiftPatients,
//                 },{
//                     model:db.patientDetails,
//                     attributes:['name','id','contact']
//                 }],
//                 where:where
//             }).then(function(results){
//                 console.log("entered fetch  all appointments");
//                 console.log(JSON.stringify(results));
//                 res.status(200).json(results);
//                 // res.json(results);
//             });
//         }
//     });
    
// })

// .delete(function(req,res,next){
    
// });

// appointmentRouter.route('/futureAppointments/:appointmentId')
// .get(function (req, res, next) {
//         // console.log(JSON.stringify(bills));
//     console.log('procesing get');
//     db.futureAppointments.find({
//         include: [{
//             model:db.shiftPatients
//         },{
//             model:db.patientDetails
//         }],
//         where:{
//             appointmentId:parseInt(req.params.appointmentId,10)
//             // centreId:req.params.centreId
//         }
//     }).then(function(result){
//         console.log(JSON.stringify(result));
//         res.json(result);
//     });

// })
// .delete(function(req,res,next){
//     console.log('processing delete');
//     db.futureAppointments.destroy({
//         where:{
//             appointmentId:parseInt(req.params.appointmentId,10)
//             // centreId:req.params.centreId
//         }
//     }).then(function(result){
//         console.log("deleted successfully!");
//         console.log(JSON.stringify(result));
//         res.json(result);
//     });
// })
// .put(function(req, res, next){
//     db.futureAppointments.find({ 
//         where: {
//             appointmentId:parseInt(req.params.appointmentId,10)
//             // centreId:req.params.centreId
//         } 
//     }).then(function(result){
//         if (result) { // if the record exists in the db
//             result.updateAttributes(req.body).then(function (result) { 
//                 console.log(JSON.stringify(result));
//                 res.status(200);
//                 res.end("successfully updated");
//                 console.log('updated successfully');
//             }, function(rejectedPromiseError){
//                 res.status(500);
//                 res.end('Internal Server Error');
//                 console.log('cannot update: '+ rejectedPromiseError);
//             });
//         }
//     });

// })
    // db.futureAppointments.update(req.body,{
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


appointmentRouter.route('/appointments')
.get(function(req,res,next){
    console.log('procesing get');
    var where ={};
    // if(req.query.attended != null){
    //     where['attended'] = JSON.parse(req.query.attended);
    // }
    if(req.params.centreId != 'all')
        where['centreId'] = req.params.centreId;
    // if(req.query.count){
    //     db.appointments.count({
    //         where:where
    //     }).then(function(result){
    //         console.log("count:" + result);
    //         res.json({count:result});
    //     },function(rejectedPromiseError){
    //         console.log(rejectedPromiseError);
    //         res.status(400);
    //         res.edn("couldnt fetch data appointment route");
    //     })
    //     return;
    // }
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
            // centreId:req.params.centreId
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

// appointmentRouter.route('/cancelledAppointments')
// .get(function(req,res,next){
//     console.log('procesing get');
//     db.cancelledAppointments.findAll({
//         where:{
//             centreId: req.params.centreId
//         },
//         include:[{
//             model:db.shiftPatients
//         },{
//             model:db.patientDetails,
//             attributes:['name','id','contact']
//         }]
//     }).then(function(results){
//         console.log(JSON.stringify(results));
//         res.json(results);
//     });
// })
// ;
// appointmentRouter.route('/cancelledAppointments/:appointmentId')
// .get(function (req, res, next) {
//         // console.log(JSON.stringify(bills));
//     console.log('procesing get');
//     db.cancelledAppointments.find({
//         include: [{
//             model:db.shiftPatients
//         },{
//             model:db.patientDetails
//         }],
//         where:{
//             appointmentId:parseInt(req.params.appointmentId,10)
//             // centreId:req.params.centreId
//         }
//     }).then(function(result){
//         console.log(JSON.stringify(result));
//         res.json(result);
//     });
// })
// ;
module.exports = appointmentRouter;