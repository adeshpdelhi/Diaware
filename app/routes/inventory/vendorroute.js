var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var vendorRouter = express.Router({mergeParams:true});

vendorRouter.use(bodyParser.json());


vendorRouter.route('/')

.get(function (req, res, next) {
    
    console.log('procesing get');
    db.vendor.findAll().then(function(vendors){
    	console.log(JSON.stringify(vendors));
    	res.json(vendors);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    console.log(req.body);
    db.vendor.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})

vendorRouter.route('/:vendorId')
.get(function(req,res,next){
    console.log('procesing get');
    db.vendor.findOne({
        where:{
            vendorId:parseInt(req.params.vendorId,10),
        }
    }).then(function(vendor){
        console.log(JSON.stringify(vendor));
        res.json(vendor);
    });
})
.delete(function(req,res,next){
    db.vendor.destroy({
        where:{
            vendorId:parseInt(req.params.vendorId,10),
        }
    }).then(function(vendor){
        console.log(JSON.stringify(vendor));
        res.json(vendor);
    });
})
.put(function(req,res,next){
    console.log(req.body);
    db.vendor.update(
    req.body, {
            where:{
                vendorId:parseInt(req.params.vendorId,10),
            }
        }
    )
    .then(function (result) { 
        console.log('success vendor update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed vendor update');
        res.status(400);
        res.end('failed update')
    });
})
;


module.exports = vendorRouter;