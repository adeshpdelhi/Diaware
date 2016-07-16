var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var panelRouter = express.Router({mergeParams:true});

panelRouter.use(bodyParser.json());

// include:[
//             model:db.patients,
//             where:{
//                 id:req.params.id
//             }
//         ]
panelRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.panels.findAll().then(function(panels){
    	console.log(JSON.stringify(panels));
    	res.json(panels);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.panels.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('panelRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


panelRouter.route('/:panelId')
.get(function(req,res,next){
    console.log('procesing get');
    db.panels.findOne({
        where:{
            id:parseInt(req.params.panelId,10),
        }
    }).then(function(panel){
        console.log(JSON.stringify(panel));
        res.json(panel);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.panels.update(
    req.body, {
            where:{
                id:parseInt(req.params.panelId,10),
            }
        }
    )
    .then(function (result) { 
        console.log('success panel update');
        res.status(200);
        res.end('saved');
    }, function(rejectedPromiseError){
        console.log('failed panel update');
        res.status(400);
        res.end('failed update')
    });
})
;

module.exports = panelRouter;