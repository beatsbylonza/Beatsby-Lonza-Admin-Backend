const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: {type: String, required: true },
	contactNumber: {type: String, required: true},

	username: { type: String, required: true },
	password: { type: String, required: true },

	firstName: { type: String, required: true },
	middleName: { type: String, required: true },
	lastName: { type: String, required: true },

	/** Address */
	address: {
		type : {
			city: { type: String, required: true },
			state: { type: String, required: true },
			street: { type: String, required: true },
			zipcode: { type: String, required: true },
		},
		
		_id: false,
		required: true,
	},

	/** Cart Documents TOP 10 Only */
	cart: {
		type: [
			{
				cart_id: {type: String, required: true},

				product: {
					type : {
						product_id: { type: Schema.Types.ObjectId, required: true },

						name: { type: String, required: true },
						imageUrl: { type: String, required: true},
						size: {type: String, required: true},
						color: { type: String, required: true},
			
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
				
				quantity: {type: Number, required: true},
			}
		],
		required: true,
	},

	is_admin: { type: Boolean }
	
},{timestamps:  true});

module.exports = model('User', userSchema);