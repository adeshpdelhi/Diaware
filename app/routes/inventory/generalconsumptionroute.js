var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var generalConsumptionRouter = express.Router({mergeParams:true});

generalConsumptionRouter.use(bodyParser.json());

var generalConsumptionItemsRouter = require('./generalconsumptionitemsroute');
generalConsumptionRouter.use('/:generalConsumptionId/items',generalConsumptionItemsRouter);

generalConsumptionRouter.route('/')

.get(function (req, res, next) {
    
    console.log('procesing get');
    db.generalConsumption.findAll().then(function(generalConsumptions){
    	console.log(JSON.stringify(generalConsumptions));
    	res.json(generalConsumptions);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    db.generalConsumption.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})

generalConsumptionRouter.route('/:generalConsumptionId')
.get(function(req,res,next){
    console.log('procesing get');
    db.generalConsumption.findOne({
        where:{
            generalConsumptionId:parseInt(req.params.generalConsumptionId,10)
        }
    }).then(function(generalConsumption){
        console.log(JSON.stringify(generalConsumption));
        res.json(generalConsumption);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.generalConsumption.update(
    req.body, {
            where:{
                generalConsumptionId:parseInt(req.params.generalConsumptionId,10)
            }
        }
    )
    .then(function (result) { 
        console.log('success generalConsumption update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed generalConsumption update');
        res.status(400);
        res.end('failed update')
    });
})
;


module.exports = generalConsumptionRouter;