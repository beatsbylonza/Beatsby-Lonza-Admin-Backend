const express = require('express');

const { verifyUserToken, verifyAdmin, verifyIfUserIsExistingInDatabase } = require('../helpers/validators');
const { param, validationResult, check } = require('express-validator');

const Order = require('../models/order-model');
const Cart = require('../models/cart-model');
const Transaction = require('../models/transaction-model');

const router = express.Router();

/** Place Order */
router.post('/place-order',

check('mode_of_payment').exists(),

/* Validators */
verifyUserToken,
verifyIfUserIsExistingInDatabase,

/** Validate carts */
async function validateCartsAndAddOrder(req, res, next){
    const user = req.user;

    const carts = await Cart.find({
        user_id: user._id,
        is_enabled: true,
    });


    if(carts.length > 0){

    
        const transaction = new Transaction({
            user_id: user._id,
            
            purchase_amount: 0,
    
            delivery_address: user.address,
    
            mode_of_payment: req.body.mode_of_payment,
    
            status: 'to_pay',
        });

        let purchaseAmount = 0;

        for(let cart of carts){

            /** Sum Purchase Ammount */
            purchaseAmount += cart.product.price.value * cart.quantity;

            Order.create({
                user_id: user._id,

                transaction_id: transaction._id,

                product: cart.product,

                quantity: cart.quantity,
            });


        }

        /** Save transaction */
        transaction.purchase_amount = purchaseAmount;
        await transaction.save();
        
        /** Delete all the carts of user */
        await Cart.deleteMany({
            user_id: user._id,
            is_enabled: true,
        });

        res.send({
            message: 'Succesfully place the order!!'
        });
    }else{
        res.status(401).send({
            message: 'You have no products in your cart...',
        });
    }
    
},

/* Add Order */
// async function addOrder(req, res){

//     const order = await Order.create({
//         ...req.body,
//     });

//     res.send({
//         message : 'Successfully added the order!',
//         order,
//     });

// }

);


module.exports = router;