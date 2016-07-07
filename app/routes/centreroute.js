var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var centreRouter = express.Router();
centreRouter.use(bodyParser.json());

centreRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.centres.findAll().then(function(centres){
    	console.log(JSON.stringify(centres));
    	res.json(centres);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.centres.build(req.body).save();
    res.end('centreRouter working'); // send status code
})
.delete(function(req,res,next){
    
});

centreRouter.route('/:id')
.get(function(req,res,next){
    console.log('procesing get');
    db.centres.findOne({where:{id:req.params.id}}).then(function(centre){
        console.log(JSON.stringify(centre));
        console.log('fuckup');
        // res.json(centre);
        res.json(centre);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.centres.update(
    req.body, {where:{id:req.params.id}}
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully updated")
    }, function(rejectedPromiseError){

    });
})
;

module.exports = centreRouter;