var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var stockIssuedItemsRouter = express.Router({mergeParams:true});

stockIssuedItemsRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients stockIssuedItems ie /api/majorClinicalEvents

stockIssuedItemsRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.stockIssuedItems.findAll({
        where:{
            stockIssuedId:parseInt(req.params.stockIssuedId,10)
        }
    }).then(function(stockIssuedItems){
        console.log(JSON.stringify(stockIssuedItems));
        res.json(stockIssuedItems);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.stockIssuedItems.build(req.body).save().then(function(result){
        // console.log(result);
        console.log(JSON.stringify(result));
        res.json(result);        
    });
    // Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(function(task) {
    // you can now access the newly created task via the variable task
    // })
})
// .put(function(req,res,next){
//     console.log(req.body);
//     db.stockIssuedItems.update(
//     req.body, {
//             where:{
//                 patientId:req.params.id
//             }
//         }
//     )
//     .then(function (result) { 
//         console.log(JSON.stringify(result));
//         res.json(result);
//         res.end("successfully updated");
//     }, function(rejectedPromiseError){
    
//     });
// })
.delete(function(req,res,next){
    
});


stockIssuedItemsRouter.route('/:itemId')
.get(function(req,res,next){
    console.log('procesing get');
    db.stockIssuedItems.findOne({
        where:{
            itemId:parseInt(req.params.itemId,10),            
            stockIssuedId:req.params.stockIssuedId
        }
    }).then(function(stockIssuedItem){
        console.log(JSON.stringify(stockIssuedItem));
        res.json(stockIssuedItem);
    });
})
.delete(function(req,res,next){
    console.log("procesing delete");
    db.stockIssuedItems.destroy(
    {
        where:{
            itemId:parseInt(req.params.itemId,10),            
            stockIssuedId:req.params.stockIssuedId
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully deleted")
    }, function(rejectedPromiseError){
    
    });
})
.put(function(req,res,next){
    console.log(req.body);
    db.stockIssuedItems.update(
    req.body, {
            where:{
                itemId:parseInt(req.params.itemId,10),            
                stockIssuedId:req.params.stockIssuedId
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        // res.json(result);
        res.status(200);
        res.end("successfully updated")
    }, function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
})
;

module.exports = stockIssuedItemsRouter;