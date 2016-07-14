var express = require('express');
var router = express.Router();
var auth = require('../../config/auth');
var users = require('../models').users;


router.get('/manage/:centreId', function(req, res) {
    users.findAll({where:{centres:{$like: '%'+req.params.centreId+'%'}}}).then(function(users){
		res.json(users);
	});
});


router.get('/:username', function(req, res) {
    users.findOne({where:{username:req.params.username}}).then(function(user){
        if(user!=null){
        console.log(JSON.stringify(user));
        // res.json(centre);
        res.json(user);
        }
    });
});

router.put('/:username', function(req,res){
    console.log(req.body);
    users.update(
    req.body, {where:{username:req.params.username}}
    )
    .then(function (result) { 
        console.log(JSON.stringify(result));
        res.end("successfully updated")
    }, function(rejectedPromiseError){

    });
})

router.post('/', function(req, res) {
    console.log('Registering');
    auth.register(req,res);
});

router.post('/login', function(req, res) {
    auth.login(req,res);
});

router.post('/logout', function(req, res) {
    auth.logout(req,res);
});

module.exports = router;