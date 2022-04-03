const express = require('express');
const { verifyUserToken, verifyAdmin } = require('../helpers/validators');
const { check, validationResult, param } = require('express-validator');

const fs = require('fs');

const Product = require('../models/product-model');


const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images/products');
    },

    filename: function (req, file, cb){
        cb(null, Date.now() + ".png");
    },
});

const upload = multer({ storage : storage });

/** Get All Products */
router.get('/',

/** Validation */
verifyUserToken,

async function getAllProducts(req, res){
    const products = await Product.find().sort({createdAt : -1});
    

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

/** Get Product */
router.get('/:id',

/** Validation */
verifyUserToken,

param('id').exists().isLength({min : 24, max: 24}),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input please check all the required' });
    }else{
        next();
    }

},


async function getProduct(req, res){
    const { id } = req.params;

    const product = await Product.findById(id);

    if(product){
        res.send({
            message: 'Succesfully fetch product id...',
            data: product,
        })
    }else{
        res.status(401).send({
            message: 'Cannot find the product',
        })
    }
}

);

/** Delete Product */
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

/** Validation */
verifyUserToken,
verifyAdmin,

async function deleteProduct(req, res){
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if(product){

        const imageUrl = 'public/images/products/'  + product.imageUrl.substring(product.imageUrl.lastIndexOf('/') + 1);

        fs.stat(imageUrl, function(err, stat){
            if(err === null){
                fs.unlinkSync(imageUrl);
            }
        });


        res.send({message: 'Successfully remove product!'});
    }else{
        res.status(400).send({message: 'Cannot remove the product'});
    }
}

);

/** Add Product */
router.post('/add',

/** Upload  */
upload.single('image'),

/** Validation */
check('name').exists().isLength({min : 2}),
check('category').exists(),
check('description').exists(),
check('price').exists(),

check('sizes').exists(),
check('colors').exists(),

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

    const imageUrl = `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`;

    const parsedSizes = JSON.parse(req.body.sizes);
    const parsedColors = JSON.parse(req.body.colors);

    const product = await Product.create({
        ...req.body,

        sizes: parsedSizes,
        colors: parsedColors,

        imageUrl,
        price: {
            value: req.body.price,
            currency: 'PHP',
        },
        
        sold: 0,
        sales: 0,

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

/** Update Product */
router.put('/:id',

/** Upload  */
upload.single('image'),

/** Validation */
check('name').exists().isLength({min : 2}),
check('category').exists(),
check('description').exists(),
check('price').exists(),

param('id').exists().isLength({min : 24, max: 24}),

check('sizes').exists(),
check('colors').exists(),

function (req, res, next){

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input please check all the required' });
    }else{
        next();
    }

},

/** Validation */
verifyUserToken,
verifyAdmin,


async function updateProduct(req, res, next){
    const { id } = req.params;


    const product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body,
        
        sizes: JSON.parse(req.body.sizes),
        colors: JSON.parse(req.body.colors),

        price: {
            value: req.body.price,
            currency: 'PHP',
        },
    });


    if(product){
        req.product = product;
        next();
    }else{
        res.status(401).send({
            message: 'Failed to create the product..',
        })
    }
},

async function deleteProductImage(req, res){

    if(req.file){
        const imageUrl = 'public/images/products/'  + req.product.imageUrl.substring(req.product.imageUrl.lastIndexOf('/') + 1);
    
        fs.stat(imageUrl, async function(err, stat){
            if(err === null){
                fs.unlinkSync(imageUrl);
                const newImageUrl = `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`;
                req.product.imageUrl = newImageUrl;
                await req.product.save();
            }
        });
    }

    res.send({
        message: 'Successfully update the product!!',
    });
}

);


module.exports = router;