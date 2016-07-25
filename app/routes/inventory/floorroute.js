var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var floorRouter = express.Router({mergeParams:true});

floorRouter.use(bodyParser.json());

floorRouter.route('/')

.get(function (req, res, next) {
    
    console.log('procesing get');
    db.floor.findAll({
        where:{
            centreId: req.params.centreId
        },
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
    db.floor.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})

floorRouter.route('/:itemId')
.get(function(req,res,next){
    console.log('procesing get');
    db.floor.findOne({
        where:{
            itemId:parseInt(req.params.itemId,10),
            centreId: req.params.centreId
        },
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
    db.floor.update(
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


module.exports = floorRouter;