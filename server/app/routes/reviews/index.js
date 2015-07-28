'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var _ = require('lodash'); //extend
module.exports = router;


router.param('id', function(req, res, next, id){
	Review.findById(id).exec()
	.then(function(review){
		if(review) req.review = review;
		else{
			throw new Error('No review found');
		}
	})
	.then(null, next);
})

//GET review
router.get('/', function (req, res, next){
	Review.find({}).exec()
	.then(function (reviews){
		res.json(reviews);
	})
	.then(null, next);
})

//Get One Review
router.get('/:id', function(req, res){
	res.json(req.review);
})

//CREATE Review
router.post('/', function (req, res, next){
	Review.create({}).exec()
	.then(function (review){
		res.json(review);
	})
	.then(null, next);
})

//Put review 
router.put('/:id', function(req, res, next){  
	_.extend(req.review, req.body);  
	req.review.save()				
	.then(function(review){
		res.json(review);
	})
	.then(null, next);
})

//Delete Review
router.delete('/:id', function(req, res, next){
	req.review.remove()
	.then(function(){
		res.sendStatus(200);
	})
	.then(null, next);
})













