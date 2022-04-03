const express = require('express');
const { verifyUserToken, verifyAdmin, verifyIfUserIsExistingInDatabase } = require('../helpers/validators');
const { param, validationResult } = require('express-validator');

const Order = require('../models/order-model');
const router = express.Router();

/* Order API */
/* Get all orders */

router.get('/:id',


param('id').exists().isLength({ min : 24, max: 24}),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input please check all the required fields' });
    }else{
        next();
    }
},


/* Validators */
verifyUserToken,

/* Add Order */
async function getAllOrders(req, res){
    
    const { id } = req.params.id;

    const orders = await Order.find({ transaction_id : id });

    res.send({
        message : 'Successfully fetch all orders!',
        data: orders,
    });

}

);

module.exports = router;