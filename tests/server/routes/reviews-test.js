// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Review = mongoose.model('Review');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('Reviews Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var reviewToFind;

	var reviewOne = { 
		averageRating: 4,
		reviews: [{
			username: "Cooper",
			content: "Woof, Woof, Woof!?",
			userRating: 1 
		}]
	}

	beforeEach('Create a review', function (done) {
		Review.create(reviewOne)
		.then(function (review){
			reviewToFind = review;
			done();
		}) 
	});

	it('GET all', function(done){
		agent
		.get('/api/reviews')
		.expect(200)
		.end(function(err, res){
			if(err) return done(err);
			expect(res.body).to.be.instanceof(Array);
			done();
		})
	});


	//Checks for a posted reviewed album
	it('POST one', function(done){
		agent
		.post('/api/reviews')
		.send({
			averageRating: 4,
			reviews: [{
				username: "Cooper",
				content: "Woof, Woof, Woof!?",
				userRating: 1
			}]
		})
		.expect(200)
		.end(function(err, res){
			if(err) return done(err);
			expect(res.body.averageRating).to.equal(4);
			done();
		});
	});

	it('Get one', function (done){
		agent
		.get('/api/reviews/' + reviewToFind._id)
		.expect(200)
		.end(function(err, res){
			if (err) return done(err);
			expect(res.body.averageRating).to.equal(reviewToFind.averageRating)
			done()
		})
	})

	it('DELETE one', function(done){
		agent
		.delete('/api/reviews/' + reviewToFind._id)
		.expect(200)
		.end(function(err, res){
			if(err) return done(err);
			Review.findById(reviewToFind._id).exec()
			.then(function(review){
				if(err) return done(err);
				expect(review).to.be.null;
				done();
			});
		});
	})

})






