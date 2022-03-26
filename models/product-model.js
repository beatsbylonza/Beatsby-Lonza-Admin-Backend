const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },

    categories: { type: [String], required: true},
    colors: { type: [String], required: true},

    description: String,
    imageUrls: { type: [String], required: true},
    
    price: {type: Number, required: true},

    sizes: [String],

    stock: {type: Number, required: true},
    sold: {type: Number, required: true},

    available: {type: Number, required: true},
    
    sales: {type: Number, required: true},

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);