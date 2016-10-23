var express = require('express');
var router = express.Router();
var auth = require('../../config/auth');
var users = require('../models').users;
var crypto = require('crypto');


router.get('/manage/:centreId', auth.verifyLoggedIn, function(req, res) {
	if(req.params.centreId=='all')
		users.findAll().then(function(users){
			res.json(users);
		});
	else
	    users.findAll({where:{centres:{$like: '%'+req.params.centreId+'%'}}}).then(function(users){
			res.json(users);
		});
});

router.get('/retrieveStaffOnly/:centreId', auth.verifyLoggedIn, function(req, res) {
    if(req.params.centreId=='all')
        users.findAll().then(function(users){
            res.json(users);
        });
    else
        users.findAll({where:{centres:{$like: '%'+req.params.centreId+'%'}, admin:false, incharge:false}}).then(function(users){
            res.json(users);
        });
});


router.get('/:username', auth.verifyLoggedIn, function(req, res) {
    users.findOne({where:{username:req.params.username}}).then(function(user){
        if(user!=null){
        console.log(JSON.stringify(user));
        // res.json(centre);
        res.json(user);
        }
    });
});
router.get('/',auth.verifyLoggedIn,function(req,res){
    if(req.query.latestAddedUser){
        users.find({
            order:[['createdAt','DESC']],
            limit:1
        }).then(function(result){
            console.log("fetch all users:");
            console.log(JSON.stringify(result));
            res.json(result);
        },function(rejectedPromiseError){
            res.status(400);
            res.end('Unable to connect to the Database');
        })
    }
});

router.post('/login', function(req, res) {
    auth.login(req,res);
});

router.put('/:username',auth.verifyAdmin, function(req, res) {
    if(req.body.oldpassword!=null)
    {users.findOne({where:{username:req.params.username}}).then(function(user){
            if(user!=null){
                if(user.hashedPassword == crypto.createHash('md5').update(req.body.oldpassword).digest("hex")){
                     console.log('correct old password');
                    user.updateAttributes({
                      hashedPassword: crypto.createHash('md5').update(req.body.newpassword).digest("hex")
                    }).then(function (result) { 
                            console.log(JSON.stringify(result));
                            res.end("successfully updated")
                        }, function(rejectedPromiseError){
    
                        });
                }
                else
                    {
                        console.log('incorrect old password');
                        res.status(401);
                        res.end('wrong old password');
                    }
            }
        });}
    else{
            users.update(
    req.body, {where:{username:req.params.username}}
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully updated")
    }, function(rejectedPromiseError){

    });
    }
});

router.delete('/:username',auth.verifyAdmin,function(req,res){
    users.destroy({
        where:{
            username:req.params.username
        }
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(400);
        res.end("Error Occurred in user route delete!");
    })
});


// router.put('/:username', function(req,res){
//     console.log(req.body);
//     users.update(
//     req.body, {where:{username:req.params.username}}
//     )
//     .then(function (result) { 
//         console.log(JSON.stringify(result));
//         res.end("successfully updated")
//     }, function(rejectedPromiseError){

//     });
// })

router.post('/', auth.verifyAdmin, function(req, res) {
    console.log('Registering');
    auth.register(req,res);
});



router.post('/logout', function(req, res) {
    auth.logout(req,res);
});

module.exports = router;