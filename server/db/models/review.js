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

schema.method('updateReview', function() {
	var sumReview = this.reviews.reduce(function(cur, nextReview) {
		return cur + nextReview.userRating;
	})
	return sumReview / this.reviews.length;
})

schema.pre('save', function(next) {

	if (this.isModified('review')) {
		this.rating = this.updateReview();
	}

	next();

});

mongoose.model('Review', schema);