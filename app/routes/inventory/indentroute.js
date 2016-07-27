var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var indentRouter = express.Router({mergeParams:true});

indentRouter.use(bodyParser.json());

var indentItemsRouter = require('./indentitemsroute');
indentRouter.use('/:indentId/items',indentItemsRouter);

indentRouter.route('/')

.get(function (req, res, next) {
    var where={};
    if(req.params.centreId!='all')
        where.centreId=req.params.centreId;
    console.log('procesing get');
    db.indent.findAll({
        where: where
    }).then(function(indents){
    	console.log(JSON.stringify(indents));
    	res.json(indents);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    if(req.body.indentId!=null){
        db.indent.findOne({
            where:{
                indentId:parseInt(req.body.indentId,10),
            }
        }).then(function(indent){
            console.log('checking for ');
            console.log(indent);
            if(indent!=null)
            {
                console.log('found '+JSON.stringify(indent));
                indent.destroy();
                db.indent.build(req.body).save().then(function(result){
                    res.json(result);
                });
            }
        });
    }
    else
    {
        db.indent.build(req.body).save().then(function(result){
                    res.json(result);
                });
    }
    
})
.delete(function(req,res,next){
    
})

indentRouter.route('/:indentId')
.get(function(req,res,next){
    console.log('procesing get');
    db.indent.findOne({
        where:{
            indentId:parseInt(req.params.indentId,10)
        }
    }).then(function(indent){
        console.log(JSON.stringify(indent));
        res.json(indent);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.indent.update(
    req.body, {
            where:{
                indentId:parseInt(req.params.indentId,10)
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


module.exports = indentRouter;