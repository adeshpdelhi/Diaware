var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/api', function(req, res) {
	res.end('WOrking');
});

module.exports = router;