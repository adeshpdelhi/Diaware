var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var stockRouter = express.Router({mergeParams:true});

stockRouter.use(bodyParser.json());

stockRouter.route('/')

.get(function (req, res, next) {
    var where={};
    if(req.params.centreId!='all')
        where.centreId=req.params.centreId;
    console.log('procesing get');
    db.stock.findAll({
        where:where,
        include:[
            db.item
        ]
    }).then(function(indents){
    	console.log(JSON.stringify(indents));
    	res.json(indents);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    db.stock.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})

stockRouter.route('/:itemId')
.get(function(req,res,next){
    console.log('procesing get');
    var where={};
    if(req.params.centreId!='all')
        where.centreId=req.params.centreId;
    where.itemId=parseInt(req.params.itemId,10)
    db.stock.findOne({
        where:where,
        include:[
            db.item
        ]
    }).then(function(indent){
        console.log(JSON.stringify(indent));
        res.json(indent);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.stock.update(
    req.body, {
            where:{
                itemId:parseInt(req.params.itemId,10),
                centreId: req.params.centreId
            }
        }
    )
    .then(function (result) { 
        console.log('success indent update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed indent update');
        res.status(400);
        res.end('failed update')
    });
})
;


module.exports = stockRouter;