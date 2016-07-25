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
        },
        include:[
            db.item
        ]
    }).then(function(indentItems){
        console.log(JSON.stringify(indentItems));
        res.json(indentItems);
    });
    
})
.post(function (req, res, next) {
    console.log("procesing post for indentId "+req.body.indentId+' with itemId '+req.body.itemId +' with status '+req.body.linkedStatus);
 
    // db.indentItems.build(req.body).save().then(function(result){
    //     // console.log(result);
    //     console.log(JSON.stringify(result));
    //     res.json(result);        
    // });
    // Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(function(task) {
    // you can now access the newly created task via the variable task
    // })
    db.indentItems.findOne({
        where:{
            itemId:req.body.itemId,
            indentId:req.params.indentId,
            linkedStatus: req.body.linkedStatus
        }
    }).then(function(indentItem){
        //console.log('checking for ');
        //console.log(indentItems);
        if(indentItem!=null)
        {
            console.log('found '+JSON.stringify(indentItem));
            indentItem.destroy().then(function(response){
                db.indentItems.build(req.body).save().then(function(result){
                    res.json(result);
                });
            });
        }
        else{
             db.indentItems.build(req.body).save().then(function(result){
                    res.json(result);
            });
        }
    });
    //res.end("procesing post for indentId "+req.body.indentId+' with itemId '+req.body.itemId +' with status '+req.body.linkedStatus);


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


indentItemsRouter.route('/:itemId/:linkedStatus')
.get(function(req,res,next){
    console.log('procesing get');
    db.indentItems.findOne({
        where:{
            itemId:req.params.itemId,            
            indentId:parseInt(req.params.indentId,10),
            linkedStatus: req.params.linkedStatus
        },
        include:[
            db.item
        ]
    }).then(function(indentItem){
        console.log(JSON.stringify(indentItem));
        res.json(indentItem);
    });
})
.delete(function(req,res,next){
    console.log("procesing delete for indentId "+req.params.indentId+' with itemId '+req.params.itemId +' with status '+req.params.linkedStatus);
    db.indentItems.destroy(
    {
        where:{
            itemId:req.params.itemId,            
            indentId:parseInt(req.params.indentId,10),
            linkedStatus: req.params.linkedStatus
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully deleted")
        console.log('successfully delteedddd');
    }, function(rejectedPromiseError){
        console.log('deletetion failed');
    });
})
.put(function(req,res,next){
    console.log(req.body);
    db.indentItems.update(
    req.body, {
            where:{
                itemId:req.params.itemId,            
                indentId:parseInt(req.params.indentId,10),
                linkedStatus: req.params.linkedStatus
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