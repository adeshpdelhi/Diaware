var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');

var billingRouter = express.Router();
billingRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
billingRouter.route('/')
.get(function (req, res, next) {
    	// console.log(JSON.stringify(bills));
    console.log('procesing get');
    db.bills.findAll({include: [db.patientDetails]}).then(function(bills){
    	console.log(JSON.stringify(bills));
	    res.json(bills);
    });
})

.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
	// res.json(req.body);
    db.bills.build(req.body).save();
    res.end('billingRouter working');
})
.delete(function(req,res,next){
    
});

billingRouter.route('/:id')
.get(function(req,res,next){
    console.log('procesing get');
    db.bills.findOne({where:{transactionId:req.params.id}},{include:[db.patientDetails]}).then(function(bill){
        console.log(JSON.stringify(bill));
        res.json(bill);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){

})
;

module.exports = billingRouter;