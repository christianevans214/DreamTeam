'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/account', require('./account'));
router.use('/transaction', require('./transaction'));
router.use('/albums', require('./albums'));
router.use('/reviews', require('./reviews'));
router.use('/artists', require('./artists'));
router.use('/promos', require('./promos'));
router.use('/https://api.spotify.com/v1/albums', require('./tracks'));


// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
	res.status(404).end();
});