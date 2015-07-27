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


schema.pre('save', function(next) {

	if (this.isModified('review')) {
		this.rating = this.updateReview();
	}

	next();

});

schema.method('updateReview', function() {
	var sumReview = this.reviews.reduce(function(cur, nextReview) {
		return cur + nextReview.userRating;
	})
	return sumReview / this.reviews.length;
})
mongoose.model