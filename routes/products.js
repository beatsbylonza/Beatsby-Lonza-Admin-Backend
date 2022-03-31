const express = require('express');
const { verifyUserToken, verifyAdmin } = require('../helpers/validators');
const { check, validationResult, param } = require('express-validator');


const Product = require('../models/product-model');


const router = express.Router();

router.get('/',

/** Validation */
verifyUserToken,
verifyAdmin,

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

/** Validation */
verifyUserToken,
verifyAdmin,

async function deleteProduct(req, res){
    const { id } = req.params;

    const product = await Product.deleteOne({_id: id});

    if(product.deletedCount == 1){
        res.send({message: 'Successfully remove product!'});
    }else{
        res.status(400).send({message: 'Cannot remove the product'});
    }
}

);

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


router.post('/add',

/** Upload  */
upload.single('image'),

/** Validation */
check('name').exists().isLength({min : 2}),
check('category').exists(),
check('color').exists(),
check('description').exists(),
check('size').exists(),
check('price').exists(),

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

    const product = await Product.create({
        ...req.body,
        imageUrl,
        price: {
            value: req.body.price,
            currency: 'PHP',
        },
        
        stock: 0,
        sold: 0,
        available: 0,
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

module.exports = router;