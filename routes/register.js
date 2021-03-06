const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const { generateUserToken } = require('../helpers/validators');

/* Register API */
router.post('/',

/* Check if all the required form inputs are filled */
function validateRequiredFields(req, res, next) {

	if(
		req.body.email && 
		req.body.username && 
		req.body.password && 
		req.body.firstName && 
		req.body.lastName && 
		req.body.middleName && 
		req.body.address &&
		req.body.contactNumber
	){
		next();
	}else {
		res.status(404).send({
			message: 'Please fiil up all the input field...'
		});
	}
},

/* Validate if username or email exists */
async function validateExistingUsernameAndEmail(req, res, next){
	const username = await User.exists({username : req.body.username});
	const email = await User.exists({email : req.body.email});

	if(username){
		res.status(401).send({message: 'Username already exist'});
	}else if(email){
		res.status(401).send({message: 'Email already exist'});
	}else{
		next();
	}
},

/* Register User*/
async function createUser(req, res){
	
	/* Create User */
	const user = await User.create({
		...req.body,
		password: await bcrypt.hash(req.body.password, 8),
		is_admin: false,
	});

	if(user){
		res.send({
			message: 'Successfully created user!!',
			token: generateUserToken(user),
		});
	}else{
		res.status(404).send({
			message: 'Error creating user please try again...'
		});
	}
});

/* END OF Register API */

module.exports = router;