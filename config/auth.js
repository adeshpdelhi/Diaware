var users = require('../app/models').users;
var crypto = require('crypto');
exports.login = function(req, res){
	if(req.body.username != null && req.body.username != '' && req.body.password != null && req.body.password != ''){
		users.findOne({where :{username: req.body.username}}).then(function(user){
			var hashedPassword = crypto.createHash('md5').update(req.body.password).digest("hex");
			if(user.hashedPassword == hashedPassword){
				res.cookie('username',req.body.username,{signed: true});
				res.end('Login successful for '+req.body.username);
			}
			else{
				res.end('Wrong credentials');
				res.status = 401;
			}
		})
	}
	else{
		res.end('Enter username and password');
		res.status = 401;
	}
}
exports.logout = function(req, res){
	if(req.signedCookies.username){
		res.cookie('username','');
		res.end(req.signedCookies.username+' logged out. Bye!');
	}
	else{
		res.end('No login found');
	}
}
exports.register = function(req, res){
	console.log("registering for "+req.body.username+" "+crypto.createHash('md5').update(req.body.password).digest("hex"));
	if(req.body.username !=null && req.body.password !=null && req.body.centre !=null && req.body.admin !=null && req.body.incharge !=null && req.body.manager !=null && req.body.clinical !=null)
	{
		users.findOne({where: {username: req.body.username}}).then(function(user){
			if(user !=null){
				res.end('Username already exists');
				res.status = 401;
			}
			else
			{
				users.create({username: req.body.username, hashedPassword: crypto.createHash('md5').update(req.body.password).digest("hex"), centre: req.body.centre, admin: req.body.admin, incharge: req.body.incharge, manager: req.body.manager, clinical: req.body.clinical});
				res.end('Successfully added: '+req.body.username);
			}
		})
	}
	else
	{
		console.log('Enter all details');
		res.end('Enter all details');
		res.status = 401;
	}
}

exports.verifyLoggedIn = function(req, res, next){
	if(req.signedCookies.username)
		next();
	else
	{
        var err = new Error('Not logged in');
        err.status = 403;
        return next(err);
	}
}

exports.verifyAdmin = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.admin==true)
				next();
			else
			{
		        var err = new Error('Not an admin');
		        err.status = 403;
		        return next(err);
			}
		})
	}
	else
	{
        var err = new Error('Not even logged in');
        err.status = 403;
        return next(err);
	}
}

exports.verifyManager = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.manager==true)
				next();
			else
			{
		        var err = new Error('Not a manager');
		        err.status = 403;
		        return next(err);
			}
		})
	}
	else
	{
        var err = new Error('Not even logged in');
        err.status = 403;
        return next(err);
	}
}

exports.verifyClinical = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.clinical==true)
				next();
			else
			{
		        var err = new Error('Not a clinical');
		        err.status = 403;
		        return next(err);
			}
		})
	}
	else
	{
        var err = new Error('Not even logged in');
        err.status = 403;
        return next(err);
	}
}

exports.verifyIncharge = function(req, res, next){
	if(req.signedCookies.username){
		users.findOne({where :{username: req.signedCookies.username}}).then(function(user){
			if(user.incharge==true)
				next();
			else
			{
		        var err = new Error('Not an incharge');
		        err.status = 403;
		        return next(err);
			}
		})
	}
	else
	{
        var err = new Error('Not even logged in');
        err.status = 403;
        return next(err);
	}
}

// exports.VerifyOrdinaryUser = function(req, res, next) {

// 	if (!req.signedCookies.username) {
// 		var authHeader = req.headers.authorization;
// 		if (!authHeader) {
// 			var err = new Error('You are not authenticated!');
// 			err.status = 401;
// 			next(err);
// 			return;
// 		}
// 		var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
// 		var user = auth[0];
// 		var pass = auth[1];
// 		if (user == 'admin' && pass == 'password') {
// 			res.cookie('user','admin',{signed: true});
//             next(); // authorized
//         } else {
//         	var err = new Error('You are not authenticated!');
//         	err.status = 401;
//         	next(err);
//         }
//     }
//     else {
//     	if (req.signedCookies.user === 'admin') {
//     		next();
//     	}
//     	else {
//     		var err = new Error('You are not authenticated!');
//     		err.status = 401;
//     		next(err);
//     	}
//     }
// };