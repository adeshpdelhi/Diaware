var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var stockReceivedRouter = express.Router({mergeParams:true});

stockReceivedRouter.use(bodyParser.json());


stockReceivedRouter.route('/')
/*
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.vendors.findAll().then(function(vendors){
    	console.log(JSON.stringify(vendors));
    	res.json(vendors);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.vendors.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})
;
*/

module.exports = stockReceivedRouter;