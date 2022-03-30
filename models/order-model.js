const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
	productId : { type: String, required: true },
    customerId: { type: String, required: true },
    quantity: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    status: {type: String, required: true},
},{
    timestamps: true,
});

module.exports = model('Order', orderSchema);