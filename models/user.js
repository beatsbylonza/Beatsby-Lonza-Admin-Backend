const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: String,
	username: { type: String, required: true },
	password: { type: String, required: true },

	firstName: { type: String, required: true },
	middleName: { type: String, required: true },
	lastName: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);