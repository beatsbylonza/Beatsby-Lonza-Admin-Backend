const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },

    categories: { type: [String], required: true},
    colors: { type: [String], required: true},

    description: String,
    
    image_urls: { type: [String], required: true},
    
    price: { 
        type : {
            value : { type: Schema.Types.Decimal128, required: true},
            currency: { type: String, required: true }, 
        },
        required : true
    },

    sizes: [String],

    stock: {type: Number, required: true},
    sold: {type: Number, required: true},

    available: {type: Number, required: true},
    
    sales: {type: Number, required: true},

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);