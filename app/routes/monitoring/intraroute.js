var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var intraRouter = express.Router({mergeParams:true});

intraRouter.use(bodyParser.json());

// can add route to fetch all patients intras ie /api/monitoringChartIntra
// or can add route to fetch list of patients under one intra usind route - /api/intras/

intraRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.monitoringChartIntra.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(intras){
    	console.log(JSON.stringify(intras));
    	res.json(intras);
    });
    
})
.post(function (req, res, next) {
	// console.log('processing post : '+ req.body[1]);
    // for(var i = 0;i<req.body.length;i++)console.log(":/");
    // db.monitoringChartIntra.build(req.body).save().then(function(result){
    //     res.json(result);
    // // res.end('intraRouter working'); // send status code
    // });
    db.monitoringChartIntra.bulkCreate(req.body).then(function(response){
        console.log(JSON.stringify(response));
        res.json({intra:JSON.parse(JSON.stringify(response))});
        
        // res.json(response);
    });
})
.delete(function(req,res,next){
    
});


intraRouter.route('/:intraId')
.get(function(req,res,next){
    console.log('procesing get');
    db.monitoringChartIntra.findAll({
        where:{
            intraId:parseInt(req.params.intraId,10),
            patientId:req.params.id
        }
    }).then(function(intra){
        console.log(JSON.stringify(intra));
        res.json({intra:JSON.parse(JSON.stringify(intra))});
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartIntra.update(
    req.body, {
            where:{
                intraId:parseInt(req.params.intraId,10),
                patientId:req.params.id,
                entryNumber: req.query.entryNumber
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.json(result);
        
        // res.end("successfully updated")
    }, function(rejectedPromiseError){
    
    });
})
;

module.exports = intraRouter;