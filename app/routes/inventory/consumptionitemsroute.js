var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var consumptionItemsRouter = express.Router({mergeParams:true});

consumptionItemsRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients consumptionItems ie /api/majorClinicalEvents

consumptionItemsRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.consumptionItems.findAll({
        where:{
            treatmentId:parseInt(req.params.treatmentId,10)
        }
    }).then(function(consumptionItems){
        console.log(JSON.stringify(consumptionItems));
        res.json(consumptionItems);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.consumptionItems.build(req.body).save().then(function(result){
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
//     db.consumptionItems.update(
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


consumptionItemsRouter.route('/:itemId')
.get(function(req,res,next){
    console.log('procesing get');
    db.consumptionItems.findOne({
        where:{
            itemId:parseInt(req.params.itemId,10),            
            treatmentId:req.params.treatmentId
        }
    }).then(function(consumptionItem){
        console.log(JSON.stringify(consumptionItem));
        res.json(consumptionItem);
    });
})
.delete(function(req,res,next){
    console.log("procesing delete");
    db.consumptionItems.destroy(
    {
        where:{
            itemId:parseInt(req.params.itemId,10),            
            treatmentId:req.params.treatmentId
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
    db.consumptionItems.update(
    req.body, {
            where:{
                itemId:parseInt(req.params.itemId,10),            
                treatmentId:req.params.treatmentId
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

module.exports = consumptionItemsRouter;