var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var stockIssuedRouter = express.Router({mergeParams:true});

stockIssuedRouter.use(bodyParser.json());

var stockIssuedItemsRouter = require('./stockissueditemsroute');
stockIssuedRouter.use('/:stockIssuedId/items',stockIssuedItemsRouter);

stockIssuedRouter.route('/')

.get(function (req, res, next) {
    console.log('procesing get');
    var where={};
    if(req.params.centreId!='all')
        where.centreId=req.params.centreId;
    console.log('procesing get');
    db.stockIssued.findAll({
        where:where
    }).then(function(stocksIssued){
    	console.log(JSON.stringify(stocksIssued));
    	res.json(stocksIssued);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    db.stockIssued.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})

stockIssuedRouter.route('/:stockIssuedId')
.get(function(req,res,next){
    console.log('procesing get');
    db.stockIssued.findOne({
        where:{
            stockIssuedId:parseInt(req.params.stockIssuedId,10),
        }
    }).then(function(stockIssued){
        console.log(JSON.stringify(stockIssued));
        res.json(stockIssued);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.stockIssued.update(
    req.body, {
            where:{
                stockIssuedId:parseInt(req.params.stockIssuedId,10),
            }
        }
    )
    .then(function (result) { 
        console.log('success stockIssued update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed stockIssued update');
        res.status(400);
        res.end('failed update')
    });
})
;


module.exports = stockIssuedRouter;