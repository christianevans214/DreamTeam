'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	user: {
		type: Object,
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