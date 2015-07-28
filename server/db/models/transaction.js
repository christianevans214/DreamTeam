'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, //get logged in user or not
		ref: 'User',
		default: undefined
	},
	email: {
		type: String,
		required: true
	},
	purchases: [{
		artistName: String,
		albumName: String,
		price: Number,
		quantity: Number
	}],
	dateOrdered: {
		type: Date,
		default: Date.now
	},
	trackingNumber: String,
	status: String
})



mongoose.model('Transaction', schema);