'use strict';
var mongoose = require('mongoose');
var Artist = mongoose.model("Artist");


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
	year: Number,
	isInStock: {
		type: Boolean,
		default: true
	}
	// pending a differentiator for album size 
})

// schema.virtual('artistName').set(function(artistData, done) {
// 	var self = this;
// 	Artist.find({
// 			"name": artistData
// 		}).exec()
// 		.then(function(artistObj) {
// 			self.artist = artistObj._id;
// 		})
// 		.then(null, function() {
// 			Artist.create({
// 					"name": artistData
// 				}).exec()
// 				.then(function(newArtist) {
// 					self.artist = newArtist._id;
// 					done();
// 				})
// 		})
// });


//average rating
schema
	.virtual('review.averageRating')
	.get(function() {
		var sumReview = this.review.rating.reduce(function(cur, nextReview) {
			return cur + nextReview.rating;
		})
		return Math.round((sumReview / this.review.length) * 100) / 100;
	})


mongoose.model('Album', schema);