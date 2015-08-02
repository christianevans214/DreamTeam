'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	email: {
		type: String
			// required: true do we want required? What if twitter/fb/google sign in
	},
	purchases: [{
		artistName: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Artist"
		},
		albumName: {
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
	status: String,
	promo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Promo"
	}
})


mongoose.model('Transaction', schema);