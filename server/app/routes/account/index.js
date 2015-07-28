'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = router;

//GET All users
router.get('/', function(req, res, next){
	User.find({}).exec()
	.then(function(users){
		res.json(users);
	})
	.then(null, next);
})

//GET One user
router.get('/:id', function (req, res, next) {
	// res.json(req.user);
	User.findById(req.params.id).exec()
	.then(function(user){
		res.json(user);
	})
	.then(null, next);
})

//Post one user
router.post('/', function(req,res,next){
	User.create(req.body)
	.then(function(user){
		res.json(user);
	})
	.then(null, next);
})

//Update a user
router.put('/:id', function(req,res,next){
	User.findOneAndUpdate({_id: req.params.id}, req.body, function(err,user){
		if(err){
			next(err);
		}else{
			res.json(user);
		}
	})
})

//Delete a user
router.delete('/:id', function(req,res,next){
	User.findByIdAndRemove(req.params.id, function(err,user){
		if(err){
			next(err);
		}else{
			res.status(204).end();
		}
	})
})
