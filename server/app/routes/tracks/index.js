'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Album = mongoose.model('Album');
var _ = require('lodash');
module.exports = router;

// var url = 'https://api.spotify.com/v1/albums/{id}/tracks'
// var tracksURL = 'https://api.spotify.com/v1/tracks'

/*var basicUri = 'https://api.spotify.com/v1';

//GET one track
router.get('https://api.spotify.com/v1/albums/{id}/tracks')*/