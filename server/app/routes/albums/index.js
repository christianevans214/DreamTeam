'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Album = mongoose.model('Album');
var _ = require('lodash'); //extend
module.exports = router;

router.param('id', function(req, res, next, id){
	Album.findById(id).populate('artist').populate({path:'review'}).exec(function(err, docs) {
		var options = {
			path: 'review.username',
			model: 'User'
		};

	if (err) return next(err)
	Album.populate(docs, options, function (err, album) {
      	if (err) return next(err);
      	req.album = album;
      	next();
    });
  });
});


//GET all albums
router.get('/', function (req, res, next) {
	Album.find({})
	.populate('review')
	.populate('artist')
	.populate('Album')
	.exec()
	.then(function(albums){
		res.json(albums);
	})
	.then(null, next);
})

//GET one album
router.get('/:id', function(req, res) {
	res.json(req.album);
})

//POST new album
router.post('/', function(req, res, next) {
	Album.create(req.body)
		.then(function(album) {
			res.json(album);
		})
		.then(null, next);
})

//PUT update album
router.put('/:id', function(req, res, next) {
	/*
	lodash extend updates the properties of the first argument,
	the second arguments updates the properties of the previous argument.
	*/
	// _.extend(req.album, req.body);
	// req.album.save()
	// 	.then(function(album) {
	// 		res.json(album);
	// 	})
	// 	.then(null, next);
	_.extend(req.album, req.body);
	req.album.save().then(function(album) {
		res.json(album);
	})
	// Album.findOne(req.params.id).exec()
	// .then(function(album){
	// 	console.log(album)
	// 	res.json(album)
	// })
		// // .populate('artist').exec()
		// .then(function(data) {
		// 	console.log("UPDATED", data);
		// 	res.json(data);
		// }, next)
		// .then(null, next);
})

//DELETE remove album
router.delete('/:id', function(req, res, next) {
	req.album.remove()
		.then(function() {
			res.sendStatus(200);
		})
		.then(null, next);
})