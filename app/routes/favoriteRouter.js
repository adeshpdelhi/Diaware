var express = require('express'), bodyParser =require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');

var Verify = require('./verify');

favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Favorites.findOne({postedBy:req.decoded._doc._id})
		.populate('postedBy')
		.populate('dishes')
		.exec(function(err, favorites){
			if(err) throw err;
			res.json(favorites);
		});
})
.post(function(req, res, next){
	Favorites.findOne({postedBy: req.decoded._doc._id}, function(err, favorite){
		if(err) throw err;
		// res.json(fav:favorite);
		if(!favorite){
			// res.json({fav:favorite,status:"hmmm"});
			Favorites.create({postedBy : req.decoded._doc._id, dishes:[]}, function(err, fav){
				if(err)throw err;
				fav.dishes.push(req.body._id);
				fav.save(function(err, result){
					if(err) throw err; 
					console.log("Updated comments!");
				});
				console.log("Favorite added!");
				res.json(fav);
			});	
		}else{
			// res.json({fav:favorite,status:"nooooo11111111"});
			var flag = false;
			for(var i = (favorite.dishes.length - 1); i>=0; i--){
				if(favorite.dishes[i] == req.body._id)
					flag = true;
			}
			if(!flag){
				favorite.dishes.push(req.body._id);
				favorite.save(function(err, result){
					if(err) throw err; 
					console.log("Updated comments!");
					// res.json(dish);
				});
			}
			res.json(favorite);
		}
	});
})
.delete(function(req, res, next){
	Favorites.remove({postedBy:req.decoded._doc._id},function(err, resp){
		if(err) throw err;
		res.json(resp);
	});
});

favoriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Favorites.findOne({postedBy:req.decoded._doc._id}, function (err, favorites) {        
		if (err) throw err;
        favorites.dishes.remove(req.params.dishObjectId)
		favorites.save(function(err, result){
			if(err) throw err;
			res.json(result);
		});
    });
});
module.exports = favoriteRouter;