const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },

    /** PRODUCT DOCUMENT */
    product: {
        type : {
            product_id: { type: Schema.Types.ObjectId, required: true },

            name: { type: String, required: true },
            imageUrl: { type: String, required: true},
            size: String,
            color: String,

            price: { 
                type : {
                    value : { type: Schema.Types.Decimal128, required: true},
                    currency: { type: String, required: true }, 
                },

                _id: false,
                required : true
            },
        },
        
        _id: false,
        required: true,
    },
    
    is_enabled: {type: Boolean, required: true},
    quantity: {type: Number, required: true},
}, { timestamps: true });

module.exports = model('Cart', cartSchema);