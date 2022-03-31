const {Schema, model} = require('mongoose');

const productSchema = new Schema({
	name: { type: String, required: true },

    category: { type: String, required: true},
    description: String,

    imageUrl: { type: String, required: true},
    
    color: { type: String, required: true},
    
    
    price: { 
        type : {
            value : { type: Schema.Types.Decimal128, required: true},
            currency: { type: String, required: true }, 
        },
        
        _id: false,
        required : true,
    },

    size: String,

    stock: {type: Number, required: true},
    sold: {type: Number, required: true},

    available: {type: Number, required: true},
    
    sales: {type: Number, required: true},

}, { timestamps: true });

module.exports = model('Product', productSchema);