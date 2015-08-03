'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var Promo = mongoose.model('Promo');
module.exports = router;


//GET All promos
router.get('/', function(req, res, next) {
	Promo.find({}).exec()
		.then(function(promos) {
			res.json(promos);
		})
		.then(null, next);
})

//GET One promo
router.get('/:id', function(req, res) {

	// res.json(req.promo);
	Promo.findById(req.params.id).exec()
		.then(function(promo) {
			res.json(promo);
		})
		.then(null, function() {
			res.send(404)
		});
})

//Post one promo
router.post('/', function(req, res, next) {
	Promo.create(req.body)
		.then(function(promo) {
			res.status(201).send(promo);
		})
		.then(null, next);
})

//Update a promo
router.put('/:id', function(req, res, next) {
	Promo.findOneAndUpdate({
		_id: req.params.id
	}, {
		$set: req.body
	}, {
		new: true
	}, function(err, promo) {
		if (err) {
			next(err);
		} else {
			res.json(promo);
		}
	})
})

//Delete a promo
router.delete('/:id', function(req, res, next) {
	Promo.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			next(err);
		} else {
			res.status(204).end();
		}
	})
})