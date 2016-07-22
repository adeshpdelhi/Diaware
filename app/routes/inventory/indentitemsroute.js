var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var indentItemsRouter = express.Router({mergeParams:true});

indentItemsRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]

// can add route to fetch all patients indentItems ie /api/majorClinicalEvents

indentItemsRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.indentItems.findAll({
        where:{
            indentId:parseInt(req.params.indentId,10)
        }
    }).then(function(indentItems){
        console.log(JSON.stringify(indentItems));
        res.json(indentItems);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.indentItems.build(req.body).save().then(function(result){
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
//     db.indentItems.update(
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


indentItemsRouter.route('/:itemNumber')
.get(function(req,res,next){
    console.log('procesing get');
    db.indentItems.findOne({
        where:{
            itemNumber:parseInt(req.params.itemNumber,10),            
            indentId:req.params.indentId
        }
    }).then(function(indentItem){
        console.log(JSON.stringify(indentItem));
        res.json(indentItem);
    });
})
.delete(function(req,res,next){
    console.log("procesing delete");
    db.indentItems.destroy(
    {
        where:{
            itemNumber:parseInt(req.params.itemNumber,10),            
            indentId:req.params.indentId
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
    db.indentItems.update(
    req.body, {
            where:{
                itemNumber:parseInt(req.params.itemNumber,10),            
                indentId:req.params.indentId
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

module.exports = indentItemsRouter;