const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { verifyUserToken, generateUserToken } = require('../helpers/validators');
const User = require ('../models/user-model');

router.put('/update',

/** Validators */
check('username').exists(),

check('firstName').exists(),
check('middleName').exists(),
check('lastName').exists(),

check('address.city').exists(),
check('address.state').exists(),
check('address.street').exists(),
check('address.zipcode').exists(),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input please check all the required' });
    }else{
        next();
    }

},

verifyUserToken,


async function updateUser(req, res){
    await User.updateOne({_id: req.user._id}, {
        ...req.body,
    });
    const user = await User.findById(req.user._id);
    
    if(user){
        res.send({
            message: 'Successfully update user!',
            token: generateUserToken(user),
        })
    }else{
        res.status(401).send({
            message: 'Fail to update user...',
        })
    }
}

)

module.exports = router;