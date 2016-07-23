var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var treatementItemsRouter = express.Router({mergeParams:true});

treatementItemsRouter.use(bodyParser.json());


treatementItemsRouter.route('/dialysis')
.get(function (req, res, next) {
    console.log('procesing get');
    db.dialysisItems.findAll().then(function(dialysisItems){
    	console.log(JSON.stringify(dialysisItems));
    	res.json(dialysisItems);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.dialysisItems.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('treatementItemsRouter working'); // send status code
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

treatementItemsRouter.route('/dialysis/:itemId')
.get(function(req,res,next){
    db.dialysisItems.find({
        where:{itemId:req.params.itemId}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
})

.delete(function(req,res,next){
    db.dialysisItems.destroy({
        where:{itemId:req.params.itemId}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});


treatementItemsRouter.route('/catheterization')
.get(function (req, res, next) {
    console.log('procesing get');
    db.catheterizationItems.findAll().then(function(catheterizationItems){
        console.log(JSON.stringify(catheterizationItems));
        res.json(catheterizationItems);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.catheterizationItems.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('treatementItemsRouter working'); // send status code
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

treatementItemsRouter.route('/catheterization/:itemId')
.get(function(req,res,next){
    db.catheterizationItems.find({
        where:{itemId:req.params.itemId}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
})
.delete(function(req,res,next){
    db.catheterizationItems.destroy({
        where:{itemId:req.params.itemId}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});


module.exports = treatementItemsRouter;