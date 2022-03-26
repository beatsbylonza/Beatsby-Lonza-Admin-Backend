const express = require('express');
const { verifyUserToken, verifyAdmin } = require('./helpers/utils');
const User = require('../models/user-model');

const router = express.Router();

router.get('/',

/** Validations */
verifyUserToken,
verifyAdmin,

async function getAllCustomers(req,res,next){
    
    const users = await User.find({ isAdmin: false }).select({"password": 0});

    if(users){
        res.send({
            message: 'Succesfully fetch customers',
            data: users,
        })
    }else{
        res.status(401).send({
            message: 'Error, users not found'
        });
    }

}


);

module.exports = router;