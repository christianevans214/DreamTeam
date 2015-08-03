'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Album = mongoose.model('Album');
//var _ = require('lodash');
//var request = require('request-promise');
module.exports = router;
//var spotifyConfig = 

// var url = 'https://api.spotify.com/v1/albums/{id}/tracks'
// var tracksURL = 'https://api.spotify.com/v1/tracks'

/*var basicUri = 'https://api.spotify.com/v1';

//GET one track
'https://api.spotify.com/v1/albums/3oVCGd8gjANVb5r2F0M8BI/tracks'
*/
//GET one track
var spotifyCredentials = {
	clientID: spotifyConfig.clientID,
	clientSecret: spotifyConfig.clientSecret,
	callbackURL: spotifyConfig.callbackURL
}

router.get(`https://api.spotify.com/v1/albums/${id}/tracks`, function(req, res, next) {
	res.json();
})