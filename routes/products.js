const express = require('express');
const { verifyUserToken, verifyAdmin } = require('../helpers/validators');
const { check, validationResult } = require('express-validator');


const Product = require('../models/product-model');


const router = express.Router();

router.get('/',

/** Validation */
verifyUserToken,
verifyAdmin,

async function getAllProducts(req, res){
    const products = await Product.find();

    if(products){
        res.send({
            message: 'Successfully fetch products!',
            data: products,
        })
    }else{
        res.status(401).send({
            message: 'Error cannot fetch products!',
        })
    }
}

);

router.post('/add',

/** Validation */

check('name').exists().isLength({min : 2}),
check('categories').exists(),
check('colors').exists(),
check('description').exists(),
check('imageUrls').exists(),
check('price.value').exists(),
check('price.currency').exists(),
check('sizes','empty').exists(),
check('stock').exists(),
check('sold').exists(),
check('available').exists(),
check('sales').exists(),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input please check all the required' });
    }else{
        next();
    }
},

verifyUserToken,
verifyAdmin,

async function addProduct(req, res){

    const product = await Product.create({
        ...req.body,
    });

    if(product){
        res.send({
            message: 'Successfully created the product!!',
        });
    }else{
        res.status(401).send({
            message: 'Failed to create the product..',
        })
    }

},


);

module.exports = router;