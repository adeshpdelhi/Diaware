var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var consumptionRouter = express.Router({mergeParams:true});

consumptionRouter.use(bodyParser.json());

var consumptionItemsRouter = require('./consumptionitemsroute');
consumptionRouter.use('/:treatementId/items',consumptionItemsRouter);

consumptionRouter.route('/')

.get(function (req, res, next) {
    
    console.log('procesing get');
    db.consumption.findAll().then(function(consumptions){
    	console.log(JSON.stringify(consumptions));
    	res.json(consumptions);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    db.consumption.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})

consumptionRouter.route('/:treatementId')
.get(function(req,res,next){
    console.log('procesing get');
    db.consumption.findOne({
        where:{
            treatementId:parseInt(req.params.treatementId,10),
        }
    }).then(function(consumption){
        console.log(JSON.stringify(consumption));
        res.json(consumption);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.consumption.update(
    req.body, {
            where:{
                treatementId:parseInt(req.params.treatementId,10),
            }
        }
    )
    .then(function (result) { 
        console.log('success consumption update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed consumption update');
        res.status(400);
        res.end('failed update')
    });
})
;


module.exports = consumptionRouter;