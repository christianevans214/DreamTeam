'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	billing: {
		firstName: String,
		lastName: String,
		company: String,
		phone: String,
		address: String,
		city: String,
		zip: String,
		country: String
			//required: true
	},
	shipping: {
		firstName: String,
		lastName: String,
		company: String,
		phone: String,
		address: String,
		city: String,
		zip: String,
		country: String,
		//required: true
	},
	email: {
		type: String,
		required: true
	},
	purchases: [{
		album: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album"
		},
		price: Number,
		quantity: Number
	}],
	dateOrdered: {
		type: Date,
		default: Date.now
	},
	trackingNumber: String,
	status: {
		type: String,
		default: "Pending"
	},
	promo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Promo"
	}
})


mongoose.model('Transaction', schema);