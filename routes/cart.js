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

/** Update cart quantity */
router.put('/:id',

/** Validator */
check('quantity').exists(),
check('isEnabled').exists(),

param('id').exists().isLength({max : 24, min : 24}),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid parameter ID' });
    }else{
        next();
    }
},

verifyUserToken,

async function updateCartQuantity(req, res){
    const { id } = req.params;
    const user = req.user;


    const cart = await Cart.findOne({_id: id, user_id: user._id});

    if(cart){
        cart.quantity = req.body.quantity;
        cart.is_enabled = req.body.isEnabled;

        await cart.save();

        res.send({
            message: 'Successfully update cart!',
        });
    }else{
        res.status(401).send({
            message: 'Updating cart quantity fails, cannot find cart',
        })
    }
}

);

/** Remove product to cart */
router.delete('/:id',

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

/** Check if product is already existing in cart */
async function checkIfCartIsAlreadyExisting(req, res, next){
    const user = req.user;
    const { product_id } = req.body;

    const cart = await Cart.findOne({ user_id: user._id ,'product.product_id' :  product_id });

    if(cart){
        res.status(401).send({message : 'Product already exists in cart'});
    }else{
        next();
    }
},


/** Create new cart model and add it to user model carts */
async function createNewCart(req, res, next){

    const { product_id, quantity } = req.body;

    const product = await Product.findById(product_id);

    if(product){
        req.cart = await Cart.create({
            user_id: req.user._id,

            product:{
                product_id: product._id,

                name: product.name,
                imageUrl: product.imageUrl,
                size: product.size,
                color: product.color,

                price: product.price,
            },
            
            is_enabled: true,
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