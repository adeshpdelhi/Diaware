var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var itemRouter = express.Router({mergeParams:true});

itemRouter.use(bodyParser.json());

itemRouter.route('/')

.get(function (req, res, next) {
    
    console.log('procesing get');
    db.item.findAll().then(function(items){
    	console.log(JSON.stringify(items));
    	res.json(items);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    db.item.bulkCreate(req.body).then(function(response){
        console.log(JSON.stringify(response));
        res.json({result:JSON.parse(JSON.stringify(response))});
    });
})
.delete(function(req,res,next){
    
})

itemRouter.route('/:itemId')
.get(function(req,res,next){
    console.log('procesing get');
    db.item.findOne({
        where:{
            itemId:parseInt(req.params.itemId,10)
        }
    }).then(function(item){
        console.log(JSON.stringify(item));
        res.json(item);
    });
})
.delete(function(req,res,next){
    db.item.destroy({
        where:{
            itemId:parseInt(req.params.itemId,10)
        }
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(400);
        res.end("Error Occurred in item route delete!");
    })
})
.put(function(req,res,next){
    console.log(req.body);
    db.item.update(
    req.body, {
            where:{
                itemId:parseInt(req.params.itemId,10)
            }
        }
    ).then(function (result) { 
        console.log('success item update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed item update');
        res.status(400);
        res.end('failed update')
    });
})
;


module.exports = itemRouter;