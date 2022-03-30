const express = require('express');
const User = require('../models/user-model');
const Cart = require('../models/cart-model');
const Product = require('../models/product-model');
const { verifyUserToken, verifyIfUserIsExistingInDatabase } = require('../helpers/validators');
const { check, validationResult, param } = require('express-validator');
const { USER_MODEL_CART_MAXIMUM_ARRAY } = require('../helpers/constants');

const router = express.Router();

/** Get User Cart */
router.get('/',

/** Validators */
verifyUserToken,

async function getUserCart(req, res){

    if(req.user._id == undefined || req.user._id == ''){
        res.status(401).send({
            message: 'Invalid user...'
        });
    }else{
        const cart = await Cart.find({user_id : req.user._id});

        res.send({
            message: 'Successfully fetch user cart!',
            data: cart,
        })
    }

}

);

/** Remove product to cart */
router.delete('/remove/:id',

/** Validators */
param('id').exists().isLength({min: 24, max: 24}),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid parameter ID' });
    }else{
        next();
    }
},

verifyUserToken,

async function removeProductToItem(req, res){
    const { id } = req.params;

    const cart = await Cart.deleteOne({_id: id, user_id: req.user._id});

    if(cart.deletedCount == 1){
        res.send({message: 'Successfully remove product to cart'});
    }else{
        res.status(400).send({message: 'Cannot remove the product to cart'});
    }
}

);

/** Add to cart */
router.post('/add',

/** Validators */
check('product_id').exists(),
check('quantity').exists().isInt().custom((value, {req}) => value > 0),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input please check all the required fields' });
    }else{
        next();
    }
},

verifyUserToken,
verifyIfUserIsExistingInDatabase,


async function createNewCart(req, res, next){

    const { product_id, quantity } = req.body;

    const product = await Product.findById(product_id);

    if(product){
        req.cart = await Cart.create({
            user_id: req.user._id,

            product:{
                product_id: product._id,
                name: product.name,
                price: product.price,
            },
            quantity,
        });

        next();
    }else{
        res.status(401).send({
            message: 'Cannot find the product...',
        })
    }
},

async function addCartToUserCartArray(req, res){
    const { user, cart } = req;

    if(user != undefined){
        if(user.cart == undefined){
            user.cart = [{
                cart_id: cart._id,
                product: cart.product,
                quantity: cart.quantity,
            }];
        }else{
            user.cart.unshift({
                cart_id: cart._id,
                product: cart.product,
                quantity: cart.quantity,
            });

            /** If the cart is greater than 11 it will pop the array */
            if(user.cart.length > USER_MODEL_CART_MAXIMUM_ARRAY){
                user.cart.pop();
            }
        }

        user.save();

        res.send({
            message: 'Successfully added product to cart...',
        })
    }else{
        res.status(402).send({
            message: 'User is undefined please try again...',
        })
    }
}

);

module.exports = router;