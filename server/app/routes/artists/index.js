'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var Artist = mongoose.model('Artist');
module.exports = router;

//params for artist
router.param('id', function(req, res, next, id) {
	Artist.findById(id).exec()
		.then(function(artist) {
			if (artist) {
				req.artist = artist;
				next();
			} else {
				throw new Error('No artist found');
			}
		})
		.then(null, next);
})


//GET All artists
router.get('/', function(req, res, next) {
	Artist.find({}).exec()
		.then(function(artist) {
			res.json(artist);
		})
		.then(null, next);
})

//GET One artist
router.get('/:id', function(req, res) {
	res.json(req.artist);
})


//POST new artist
router.post('/', function(req, res, next) {
	Artist.create(req.body)
		.then(function(artist) {
			res.json(artist);
		})
		.then(null, next);

})

//PUT update artist
router.put('/:id', function(req, res, next) {
	_.extend(req.artist, req.body);
	req.artist.save()
		.then(function(artist) {
			res.json(artist);
		})
		.then(null, next);
})

//DELETE remove artist
router.delete('/:id', function(req, res, next) {
	req.artist.remove()
		.then(function() {
			res.sendStatus(200);
		})
		.then(null, next);
})