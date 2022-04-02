const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true},

    purchase_amount: { type: Number, required: true},
    
    delivery_address: {type: String, required: true},

    mode_of_payment: {type: String, required: true},

    status: {type: String, required: true},

},{ timestamps: true });

module.exports = model('Transaction', transactionSchema);
