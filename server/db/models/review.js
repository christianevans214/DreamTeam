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

	if (this.isModified('review')) {
		this.rating = this.updateReview();
	}

	next();

});

mongoose.model('Review', schema);