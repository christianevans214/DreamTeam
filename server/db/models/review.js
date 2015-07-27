'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	averageRating: {
		type: Number,
		max: 5
	},
	reviews: [{
		username: String,
		content: String,
		userRating: {
			type: Number,
			max: 5
		}
	}]
})



schema.pre('save', function(next) {

	if (this.isModified('reviews')) {
		this.rating = this.updateReview();
	}

	next();

});

schema.method('updateReview', function() {
	var sumReview = this.reviews.reduce(function(cur, nextReview) {
		return cur + nextReview.userRating;
	})
	return Math.round((sumReview / this.reviews.length) * 100) / 100;
})
mongoose.model('Review', schema);