'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Artist",
		required: true
	},
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/226px-Disque_Vinyl.svg.png"
	},
	tracks: [{
		name: String,
		duration: String,
		artists: [String]
	}],
	review: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Review"
	}],
	tags: [String],
	genre: {
		type: [String],
		required: true
	},
	price: Number,
	year: Number
	// pending a differentiator for album size 
})

//average rating
schema
.virtual('review.averageRating')
.get(function(){
	var sumReview = this.review.rating.reduce(function(cur, nextReview) {
        return cur + nextReview.rating;
    })
  return Math.round((sumReview / this.review.length) * 100) / 100;
})


mongoose.model('Album', schema);