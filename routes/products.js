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
        req.body.name === undefined && 
        req.body.categories === undefined && 
        req.body.colors === undefined && 
        req.body.description === undefined && 
        req.body.imageUrls === undefined && 
        req.body.price === undefined && 
        req.body.sizes === undefined && 
        req.body.stock === undefined && 
        req.body.sold === undefined && 
        req.body.available === undefined && 
        req.body.sales === undefined
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