const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true},

    purchase_amount: { type: Number, required: true},
    
	/** Address */
	delivery_address: {
		type : {
			city: { type: String, required: true },
			state: { type: String, required: true },
			street: { type: String, required: true },
			zipcode: { type: String, required: true },
		},
		
		_id: false,
		required: true,
	},

    mode_of_payment: {type: String, required: true},

    status: {type: String, required: true},

},{ timestamps: true });

module.exports = model('Transaction', transactionSchema);
