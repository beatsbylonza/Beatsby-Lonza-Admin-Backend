const express = require('express');
const { verifyUserToken, verifyAdmin } = require('./helpers/utils');
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
verifyUserToken,
verifyAdmin,

function validateRequiredFields(req, res, next){

    if(
        req.body.name && 
        req.body.categories && 
        req.body.colors && 
        req.body.description && 
        req.body.imageUrls && 
        req.body.price && 
        req.body.sizes && 
        req.body.stock && 
        req.body.sold && 
        req.body.available && 
        req.body.sales 
    ){
        next();
    }else{
        res.status(401).send({
            message : 'Error please input all the required fields'
        })
    }
    
},

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