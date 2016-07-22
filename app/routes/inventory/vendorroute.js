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
    db.vendor.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})
;


module.exports = vendorRouter;