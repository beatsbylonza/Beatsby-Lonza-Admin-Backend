const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },

    /** PRODUCT DOCUMENT */
    product: {
        type : {
            product_id: { type: Schema.Types.ObjectId, required: true },

            name: { type: String, required: true },
            price: { 
                type : {
                    value : { type: Schema.Types.Decimal128, required: true},
                    currency: { type: String, required: true }, 
                },
                required : true
            },
        },
        
        required: true,
    },
    
    quantity: {type: Number, required: true},
}, { timestamps: true });

module.exports = model('Cart', cartSchema);