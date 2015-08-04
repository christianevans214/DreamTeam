'use strict';
//can modify expiration feature by doing schema.path("createdAt").expires('dateString');
var mongoose = require('mongoose');
// var legibleTime = function(dateObj) {
// 	var options = {
// 		weekday: 'long',
// 		year: 'numeric',
// 		month: 'long',
// 		day: 'numeric',
// 		hour: "numeric",
// 		minute: "numeric",
// 		second: "numeric"
// 	};
// 	// return dateObj.toLocaleDateString('en-US', options);
// 	return dateObj.getTime();
// }
var schema = new mongoose.Schema({
	code: {
		type: String,
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	expireAt: {
		type: Date,
		required: true
	},
	validProducts: [String],
	//expiration string that's in hours.
	expireString: String,
	percentageOff: {
		type: Number,
		min: 0,
		max: 1
	}

})

schema.virtual('createdAt_ms').get(function() {
	return this.createdAt
});
schema.virtual('expireAt_ms').get(function() {
	return this.expireAt
});
mongoose.model('Promo', schema);


//TO FORMAT STRINGS WHEN YOU GET THEM :)
//'en-US'
//var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" };