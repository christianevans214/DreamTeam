'use strict';
//can modify expiration feature by doing schema.path("createdAt").expires('dateString');
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	code: String,
	createdAt: {
		type: Date,
		default: Date.now,
		expires: '24h'
	},
	validProducts: [String]
})
mongoose.model('Promo', schema);