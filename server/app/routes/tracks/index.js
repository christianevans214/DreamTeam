'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Album = mongoose.model('Album');
module.exports = router;

//GET one track
router.get('/albums/:id/tracks', function(req, res, next) {
	res.json(res);
})

router.get('/search', function(req, res, next){
	res.json(res);
})

//https://api.spotify.com/v1/search?q=Abbey+Road&type=album&market=US