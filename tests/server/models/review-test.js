var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');

describe('Review model', function () {
    beforeEach('Establish DB connection', function(done) {
       if (mongoose.connection.db) return done();
       mongoose.connect(dbURI, done);
   });

   afterEach('Clear test database', function(done) {
       clearDB(done);
   });

   it('should exist', function() {
       expect(Review).to.be.a('function');
   });

   describe('On Creation', function() {
       var correctReview = function(){
           return Review.create({
                 content: 'Awesome album!',
                 userRating: 5
           });
       }

       it('should create a transaction', function(done){
           correctReview().then(function(review){
               console.log(review)
               expect(review.content).to.be.equal('Awesome album!');
               done();
           })
       });
   });
})