var users = require('../app/models').users;
var crypto = require('crypto');
exports.login = function(req, res){
	if(req.body.username != null && req.body.username != '' && req.body.password != null && req.body.password != ''){
		users.findOne({where :{username: req.body.username}}).then(function(user){
			if(user == null)
			{
				res.status(401);
				res.end('No user with that username');
				console.log('No user with that username');
				
			}
			else{
				var hashedPassword = crypto.createHash('md5').update(req.body.password).digest("hex");
				if(user.hashedPassword == hashedPassword){
					if(req.body.rememberme == true){
						res.cookie('username',req.body.username,{signed: true, maxAge: 360000000});
						res.cookie('usernamelocal',req.body.username, {maxAge: 360000000});
					}	
					else
					{
						res.cookie('username',req.body.username,{signed: true});
						res.cookie('usernamelocal',req.body.username);
					}
					res.status(200);
					res.end('success');
					console.log(req.body.username+' logged in');
					
				}
				else{
					res.status(401);
					res.end('Wrong credentials');
					console.log('Wrong credentials');
					
				}
			}
		})
	}
	else{
		console.log('Enter username and password');
		res.status(401);
		res.end('Enter username and password');
	}
}
exports.logout = function(req, res){
	if(req.signedCookies.username){
		res.cookie('username','');
		res.cookie('usernamelocal','');
		res.end(req.signedCookies.username+' logged out. Bye!');
	}
	else{
		res.end('No login found');
	}
}
exports.register = function(req, res){
	if(req.body.username!=null && req.body.password!=null)
	console.log("registering for "+req.body.username+" "+crypto.createHash('md5').update(req.body.password).digest("hex"));
	if(req.body.username !=null && req.body.password !=null && req.body.centres !=null && req.body.admin !=null && req.body.incharge !=null && req.body.manager !=null && req.body.clinical !=null &&req.body.centres!='')
	{
		users.findOne({where: {username: req.body.username}}).then(function(user){
			if(user !=null){
				res.end('Username already exists');
				res.status(400);
			}
			else
			{
				//req.body.centres=req.body.centres.replace(/\s/g, '');
				users.create({username: req.body.username, hashedPassword: crypto.createHash('md5').update(req.body.password).digest("hex"), centres: req.body.centres, admin: req.body.admin, incharge: req.body.incharge, manager: req.body.manager, clinical: req.body.clinical});
				res.status(200);
				res.end('Successfully added: '+req.body.username);
			}
		})
	}
	else
	{
		console.log('Enter all details');
		res.status (400);
		res.end('Enter all details');
	}
}

exports.verifyLoggedIn = function(req, res, next){
	if(req.signedCookies.username)
		next();
	else
	{
		// var err = new Error('Not logged in');
		// err.status = 401;
		// return next(err);
		res.status(401);
		res.end("Not logged in!");
	}
}

exports.verifyAdmin = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.admin==true)
				next();
			else
			{
				// var err = new Error('Not an admin');
				// err.status = 401;
				// return next(err);
				res.status(401);
				res.end("Not an admin");
			}
		})
	}
	else
	{
		// var err = new Error('Not even logged in');
		// err.status = 401;
		// return next(err);
		res.status(401);
		res.end("Not even logged in");
	}
}

exports.verifyManager = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.manager==true || user.admin==true)
				next();
			else
			{
				// var err = new Error('Not a manager');
				// err.status = 401;
				// return next(err);
				res.status(401);
				res.end("Not a manager");
			}
		})
	}
	else
	{
		// var err = new Error('Not even logged in');
		// err.status = 401;
		// return next(err);
		res.status(401);
		res.end("Not even loggedIn");
	}
}

exports.verifyClinical = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.clinical==true || user.admin==true)
				{
					console.log("yes clinical");
					next();
				}
			else
			{
				// var err = new Error('Not a clinical');
				// err.status = 401;
				// return next(err);
				console.log('Not a clinical');
				res.status(401);
				res.end("Not a clinical");
			}
		})
	}
	else
	{
		 console.log("Not clinical");
		// var err = new Error('Not even logged in');
		// err.status = 401;
		// return next(err);
		res.status(401);
		res.end("Not even logged in");
	}
}

exports.verifyIncharge = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.incharge==true || user.admin==true)
				next();
			else
			{
				// var err = new Error('Not an incharge');
				// err.status = 401;
				// return next(err);
				res.status(401);
				res.end("Not an incharge");
			}
		})
	}
	else
	{
		// var err = new Error('Not even logged in');
		// err.status = 401;
		// return next(err);
		res.status(401);
		res.end("Not an incharge");
	}
}
