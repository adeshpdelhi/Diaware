var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var generalConsumptionItemsRouter = express.Router({mergeParams:true});

generalConsumptionItemsRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients generalConsumptionItems ie /api/majorClinicalEvents

generalConsumptionItemsRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.generalConsumptionItems.findAll({
        where:{
            generalConsumptionId:parseInt(req.params.generalConsumptionId,10)
        },
        include:[
            db.item
        ]
    }).then(function(generalConsumptionItems){
        console.log(JSON.stringify(generalConsumptionItems));
        res.json(generalConsumptionItems);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.generalConsumptionItems.build(req.body).save().then(function(result){
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
//     db.generalConsumptionItems.update(
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


generalConsumptionItemsRouter.route('/:itemId')
.get(function(req,res,next){
    console.log('procesing get');
    db.generalConsumptionItems.findOne({
        where:{
            itemId:parseInt(req.params.itemId,10),            
            generalConsumptionId:req.params.generalConsumptionId
        },
        include:[
            db.item
        ]
    }).then(function(generalConsumptionItem){
        console.log(JSON.stringify(generalConsumptionItem));
        res.json(generalConsumptionItem);
    });
})
.delete(function(req,res,next){
    console.log("procesing delete");
    db.generalConsumptionItems.destroy(
    {
        where:{
            itemId:parseInt(req.params.itemId,10),            
            generalConsumptionId:req.params.generalConsumptionId
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
    db.generalConsumptionItems.update(
    req.body, {
            where:{
                itemId:parseInt(req.params.itemId,10),            
                generalConsumptionId:req.params.generalConsumptionId
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

module.exports = generalConsumptionItemsRouter;