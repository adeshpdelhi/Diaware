var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var panelRouter = express.Router();

panelRouter.use(bodyParser.json());

// include:[
//             model:db.patientDetails,
//             where:{
//                 id:req.params.id
//             }
//         ]
panelRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.panelDetails.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(panels){
    	console.log(JSON.stringify(panels));
    	res.json(panels);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.panelDetails.build(req.body).save();
    res.end('panelRouter working'); // send status code
})
.delete(function(req,res,next){
    
});


panelRouter.route('/:panelId')
.get(function(req,res,next){
    console.log('procesing get');
    db.panelDetails.findOne({
        where:{
            panelId:parseInt(req.params.panelId,10),
            patientId:req.params.id
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
    db.panelDetails.update(
    req.body, {
            where:{
                panelId:parseInt(req.params.panelId,10),
                patientId:req.params.id
            }
        }
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully updated")
    }, function(rejectedPromiseError){
    
    });
})
;

module.exports = panelRouter;