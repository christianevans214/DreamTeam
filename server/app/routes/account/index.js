'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = router;

// this works, but it might not be necessary
// router.param('id', function(req, res, next, id){
// 	User.findById(id).exec()
// 	.then(function(user){
// 		if(user) {
// 			console.log("user", user)
// 			req.user = user;
// 			next();
// 		}/*else{
// 			//throw error
// 		}*/
// 	})
// 	.then(null, next);
// })

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