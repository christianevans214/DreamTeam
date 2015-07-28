'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	artistName: {
		type: String,
		required: true
	},
	album: {
		type: String,
		required: true
	},
	imgUrl: {
		type: String,
		default: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/226px-Disque_Vinyl.svg.png"
	},
	tracks: [{
		name: String,
		duration: String,
		artists: [String]
	}],
	reviews: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Rating"
	},
	tags: [String],
	genre: {
		type: [String],
		required: true
	},
	price: Number

	// pending a differentiator for album size 
})



mongoose.model('Album', schema);