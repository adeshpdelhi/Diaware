var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var treatmentInventoryRouter = express.Router({mergeParams:true});

treatmentInventoryRouter.use(bodyParser.json());


treatmentInventoryRouter.route('/')
/*
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.tmtInventory.findAll().then(function(vendors){
    	console.log(JSON.stringify(vendors));
    	res.json(vendors);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.tmtInventory.build(req.body).save().then(function(result){
        res.json(result);
    
    });
})
.delete(function(req,res,next){
    
})
;
*/

module.exports = treatmentInventoryRouter;