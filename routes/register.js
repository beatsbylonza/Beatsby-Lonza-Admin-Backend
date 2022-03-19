const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/user');

/* Register API */
router.post('/',async function(req, res, next){
	const body = req.body;
	
	await User.create({
		...body,
		password: bcrypt.hash(body.password, 8)
	});
});

module.exports = router;