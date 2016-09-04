var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');
// var verify = require('../verify');

var billingRouter = express.Router({mergeParams:true});
billingRouter.use(bodyParser.json());
//db.patientDetails.create({patientId: '12345', name: 'heya', lastModifiedBy: 'adesh'});
billingRouter.route('/')
.get(function (req, res, next) {
    	// console.log(JSON.stringify(bills));
    var where ={};
    if(req.query.status){
        if(req.query.status == 'Pending'){
            where['status'] ={
                $ne:'FullPaid'
            }
        }
        else  
            where['status'] = req.query.status;
    }
    if(req.query.dateFrom && req.query.dateTo){
        where['createdAt'] ={
            $gt:new Date(req.query.dateFrom),
            $lte:new Date(req.query.dateTo)
        }
    }
    if(req.query.sum){
        //sum of over all centres
        console.log("where billroute");
        console.log(where);
        console.log("query billroute");
        console.log(req.query.amount.toString());
        // where[req.query.amount] =
        db.billMaster.sum('totalAmount',{
            where:where
        }).then(function(result){
            console.log("sum: " +result);
            res.json({sum:result});
        },function(rejectedPromiseError){
            res.status(400);
            res.end("Server Error")
            // res.end(rejectedPromiseError);
        })
        return;
    }
    var where1 ={};
    if(req.params.centreId != 'all'){
        where1['centreId'] = req.params.centreId;
    }
    var paranoid = true;
    if(req.query.deleted){
        where['deletedAt'] = {
            $ne:null
        };
        paranoid = false;
    }
    console.log("where billroute");
    console.log(where1);
    console.log(where);
        
    console.log('procesing get');
    db.billMaster.findAll({
        where:where,
    	include: [{
    		model:db.patientDetails,
    		where:where1,
            attributes:['name','id','contact','age']        
    	}],
        paranoid:paranoid
    }).then(function(bills){
    	console.log(JSON.stringify(bills));
	    res.json(bills);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("InternalServerError");
    });
})
.post(function (req, res, next) {
	console.log('processing post : ');
    console.log(req.body);
    db.billMaster.build(req.body).save().then(function(result){
    	var subItems = req.body.subItems;
        console.log(JSON.stringify(result));
        console.log("billId: "+ result.billId);
        for(var i = 0; i < subItems.length; i++){
            subItems[i]['billId'] = result.billId;
        }
        db.bills.bulkCreate(subItems).then(function(results){
            result.subItems = JSON.parse(JSON.stringify(results));
            res.json(result);
        },function (rejectedPromiseError) {
            res.status(500);
            res.end("InternalServerError")
        });
        // db.appointments.find()
    },function(rejectedPromiseError){
        res.status(500);
        res.end("InternalServerError");
    });	
    // res.end('billingRouter working');
})
.delete(function(req,res,next){

});

billingRouter.route('/:billId')
.get(function(req,res,next){
    console.log('procesing get');
    var where = {};
    var paranoid = true;
    if(req.query.deleted){
        where['deletedAt'] = {
            $ne:null
        };
        paranoid = false;

    }
    where['billId'] = parseInt(req.params.billId,10);
    db.billMaster.find({
    	where:where,
    	include:[{
    		model:db.patientDetails,
    		where:{
    			// centreId:req.params.centreId
    		},
            attributes:['name','contact','alternativeContact','gender','address']
    	},{
            model:db.bills,
            paranoid:paranoid
        }],
        paranoid:paranoid
    }).then(function(bill){
        console.log(JSON.stringify(bill));
        res.json(bill);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("InternalServerError");
    });
})
.delete(function(req,res,next){
    db.bills.destroy({
        where:{
            billId:parseInt(req.params.billId,10),
        }
    }).then(function(results){
        db.billMaster.destroy({
            where:{
                billId:parseInt(req.params.billId,10), 
            }
        }).then(function(result){
            res.json(result);
        },function (rejectedPromiseError) {
            res.status(500);
            res.end("InternalServerError");
        });
    },function (rejectedPromiseError) {
        res.status(500);
        res.end("InternalServerError");
    });
})
.put(function(req,res,next){
	console.log(req.body);
	db.billMaster.update(
	   req.body, {
        where:{
            billId:parseInt(req.params.billId,10)
        }
    }).then(function (result) { 
		console.log(JSON.stringify(result));
        res.status(200);
		res.end("successfully updated")
	}, function(rejectedPromiseError){
        res.status(500);
        res.end("InternalServerError");
	});
})
;

module.exports = billingRouter;