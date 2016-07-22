var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var stockIdentingRouter = express.Router({mergeParams:true});

stockIdentingRouter.use(bodyParser.json());


stockIdentingRouter.route('/')
/*
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.stockIdenting.findAll().then(function(vendors){
    	console.log(JSON.stringify(vendors));
    	res.json(vendors);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.stockIdenting.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})
;
*/

module.exports = stockIdentingRouter;