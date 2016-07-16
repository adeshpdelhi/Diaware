var express = require('express');
var bodyParser = require('body-parser');

var db = require('../../models');

var postRouter = express.Router({mergeParams:true});

postRouter.use(bodyParser.json());

// can add route to fetch all patients posts ie /api/monitoringChartPost
// or can add route to fetch list of patients under one post usind route - /api/posts/

postRouter.route('/')
.get(function (req, res, next) {
    if(req.query.secLastMonitoringDate){
        db.monitoringChartPost.findAll({
            include:[{
                model:db.monitoringChartPreBasic,
                where:{
                    monitoringDate:{
                        $lt: req.query.date
                    }
                },
                order:[['monitoringDate','DESC']]
            }],
            where:{
                patientId:req.params.id
            },
            limit:1
        }).then(function(posts){
            console.log(JSON.stringify(posts));
            res.json(posts);
        });
        return;    
    }
    console.log('procesing get');
    db.monitoringChartPost.findAll({
        where:{
            patientId:req.params.id
        }
    }).then(function(posts){
    	console.log(JSON.stringify(posts));
    	res.json(posts);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.monitoringChartPost.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('postRouter working'); // send status code
    });
})
.delete(function(req,res,next){
    
});


postRouter.route('/:postId')
.get(function(req,res,next){
    console.log('procesing get');
    db.monitoringChartPost.findOne({
        where:{
            postId:parseInt(req.params.postId,10),
            patientId:req.params.id
        }
    }).then(function(post){
        console.log(JSON.stringify(post));
        res.json(post);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    db.monitoringChartPost.update(
    req.body, {
            where:{
                postId:parseInt(req.params.postId,10),
                patientId:req.params.id
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

module.exports = postRouter;