const express = require('express');
const { verifyUserToken, verifyAdmin } = require('./helpers/utils');

const Order = require('../models/order-model');

const router = express.Router();


/* Order API */


/* Get all the orders */

router.get('/',

/* Validators */
verifyUserToken,
verifyAdmin,

/* Add Order */
async function getAllOrders(req, res){

    const orders = await Order.find();

    res.send({
        message : 'Successfully fetch all the orders!',
        data: orders,
    });

}

);


/* Add order */
router.post('/add',

/* Validators */
verifyUserToken,
verifyAdmin,

/* Add Order */
async function addOrder(req, res){

    const order = await Order.create({
        ...req.body,
    });

    res.send({
        message : 'Successfully added the order!',
        order,
    });

}

);

module.exports = router;