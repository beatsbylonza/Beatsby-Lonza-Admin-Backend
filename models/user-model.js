const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {type: String, required: true },
	contactNumber: {type: String, required: true},

	username: { type: String, required: true },
	password: { type: String, required: true },

	firstName: { type: String, required: true },
	middleName: { type: String, required: true },
	lastName: { type: String, required: true },

	address: {
		type : {
			city: { type: String, required: true },
			state: { type: String, required: true },
			street: { type: String, required: true },
			zipcode: { type: String, required: true },
		},
		required: true,
	},

	isAdmin: { type: Boolean }
},{timestamps:  true});

module.exports = mongoose.model('User', userSchema);