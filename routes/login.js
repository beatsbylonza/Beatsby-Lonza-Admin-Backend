const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { generateUserToken } = require('../helpers/validators');

/* Login API */

/** Normal user Login */
router.post('/', 

/* Check if all the required form inputs are filled */
function loginCheckFormInputs(req, res, next){
    const { email, password } = req.body;
    if(
        email &&
        password
    ){
        next();
    }else{
        res.status(401).send({
            message: 'Please input all the required form inputs...'
        });
    }
},

/* Check if credentials are valids */
async function loginUser(req, res){

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user){
        if( await bcrypt.compare(password, user.password)){
            res.send({
                message: 'Successfully login user!!',
                token: generateUserToken(user),
                data: user,
            })
        }else{
            res.status(401).send({
                message: "Password doesn't match please try again..."
            });
        }
    }else{
        res.status(401).send({
            message: 'Email not found please try again...'
        });
    }


}

);

/** Admin user login */
router.post('/admin', 

/* Check if all the required form inputs are filled */
function loginCheckFormInputs(req, res, next){
    const { email, password } = req.body;
    if(
        email &&
        password
    ){
        next();
    }else{
        res.status(401).send({
            message: 'Please input all the required form inputs...'
        });
    }
},

/* Check if credentials are valids */
async function loginUser(req, res){

    const { email, password } = req.body;

    const user = await User.findOne({ email, is_admin: true, });

    if(user){
        if( await bcrypt.compare(password, user.password)){
            res.send({
                message: 'Successfully login admin user!!',
                token: generateUserToken(user),
                data: user,
            })
        }else{
            res.status(401).send({
                message: "Password doesn't match please try again..."
            });
        }
    }else{
        res.status(401).send({
            message: 'Email not found please try again...'
        });
    }


}

);


module.exports = router;