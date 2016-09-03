var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var preBasicRouter = express.Router({mergeParams:true});

preBasicRouter.use(bodyParser.json());

// can add route to fetch all patients preBasics ie /api/monitoringChartPreBasic
// or can add route to fetch list of patients under one preBasic usind route - /api/preBasics/

preBasicRouter.route('/')
.get(function (req, res, next) {
    var where = {};
    where['patientId'] = req.params.id;
    if(req.query.monitoringDate){
        var date = new Date(req.query.monitoringDate);
        date.setHours(23,59,59,999);
        where['monitoringDate'] = {
            $lt:date,
            $gt:date - 24*60*60*1000
        }
    } 
    if(req.query.fullChartLatest || req.query.monitoringDate){
        db.monitoringChartPreBasic.find({
            where : where,
            include:[{
                model:db.patientDetails
            },{
                model:db.monitoringChartPreBasicMedical
            },{
                model:db.monitoringChartPreMachineFinalCheck
            },{
                model:db.monitoringChartPreAssessment
            },{
                model:db.monitoringChartPreAccessAssessment
            },{
                model:db.monitoringChartIntra
            },{
                model:db.monitoringChartPost
            }],
            order:[['monitoringDate','DESC']]
        }).then(function(preBasic){
            console.log(JSON.stringify(preBasic));
            res.json(preBasic);
        });    
        return;
    }
    console.log('procesing get');
    db.monitoringChartPreBasic.findAll({
        where:{
            patientId:req.params.id
        },
        order:[['monitoringDate','DESC']]
    }).then(function(preBasics){
    	console.log(JSON.stringify(preBasics));
    	res.json(preBasics);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    var monitoringDate = new Date(req.body.monitoringDate);
    monitoringDate.setHours(23,59,59,999); 
    db.appointments.find({
        where:{
            patientId:req.params.id,
            date:{
                $lt:monitoringDate,
                $gt:new Date(monitoringDate - 24*60*60*1000)
            }
        }
    }).then(function(resultAppointment){
        console.log("appointment check!");
        var result = JSON.parse(JSON.stringify(resultAppointment));
        console.log(result);

        if(result != null &&  result.present == true && result.billingDone && !result.monitoringDone){
            db.monitoringChartPreBasic.build(req.body).save().then(function(resultChart){
                // res.json(result);
                console.log(JSON.stringify(resultChart));
                //mark that appointment as attended
                resultAppointment.updateAttributes({monitoringDone:true}).then(function (result) { 
                    console.log(JSON.stringify(result));
                    res.json(resultChart);
                    console.log('updated successfully');
                }, function(rejectedPromiseError){
                    res.status(500);
                    res.end('Internal Server Error');
                    console.log('cannot update: '+ rejectedPromiseError);
                });
                   
            },function(rejectedPromiseError){
                console.log(rejectedPromiseError);
                res.status(400);
                res.end("Error Saving the object:" + rejectedPromiseError);
            });
        }else{
            res.status(400);
            var string;
            if(result == null) string = " No such appointment exists of this date!";
            if(result.present == null || result.present == false) string = "Patient wasn't present for appointment!";
            if(!result.billingDone) string = "Billing not Complete!";
            if(result.monitoringDone) string = "Monitoring chart already filled for this date!";
            res.end('Invalid Monitoring Date.' + string);
        }
    },function(rejectedPromiseError){
        res.status(500);
        console.log(rejectedPromiseError+ "(In post find appointmentDate == monitoringDate)");
        res.end("Internal Server Error");
    })
    
})
.delete(function(req,res,next){
    
});


preBasicRouter.route('/:preBasicId')
.get(function(req,res,next){
    console.log('procesing get');
    if(req.query.fullChart){
        db.monitoringChartPreBasic.find({
            where:{
                preBasicId:parseInt(req.params.preBasicId,10),
                patientId:req.params.id
            },
            include:[{
                model:db.patientDetails
            },{
                model:db.monitoringChartPreBasicMedical
            },{
                model:db.monitoringChartPreMachineFinalCheck
            },{
                model:db.monitoringChartPreAssessment
            },{
                model:db.monitoringChartPreAccessAssessment
            },{
                model:db.monitoringChartIntra
            },{
                model:db.monitoringChartPost
            }]
            // order:[['monitoringDate','DESC']]
        }).then(function(preBasic){
            console.log(JSON.stringify(preBasic));
            res.json(preBasic);
        });    
        return;
    }
    db.monitoringChartPreBasic.findOne({
        where:{
            preBasicId:parseInt(req.params.preBasicId,10),
            patientId:req.params.id
        }
    }).then(function(preBasic){
        console.log(JSON.stringify(preBasic));
        res.json(preBasic);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPreBasic.update(
    req.body, {
            where:{
                preBasicId:parseInt(req.params.preBasicId,10),
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        // res.json(result);
        res.status(200);
        res.end("successfully updated")
    }, function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
})
;

module.exports = preBasicRouter;