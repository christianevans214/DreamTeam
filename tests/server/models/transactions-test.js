var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Transaction = mongoose.model('Transaction');

describe('Transaction model', function () {
	beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    it('should exist', function() {
        expect(Transaction).to.be.a('function');
    });

    describe('On Creation', function() {
    	var correctTransaction = function(){
    		return Transaction.create({
    			email: 'obama@gmail.com',
    			purchases: [{
    				artistName: 'Michael Jackson',
    				albumName: 'Thriller',
    				price: 27.16,
    				quantity: 1
    			}]
    		});
    	}

    	var incorrectTransaction = function(){
    		return Transaction.create({
    			user: 'E1lxs7pZ5',
    			purchases: [{
    				artistName: 'Michael Jackson',
    				albumName: 'Thriller',
    				price: 27.16,
    				quantity: 1
    			}]
    		})
    	}

    	it('should create a transaction', function(done){
    		correctTransaction().then(function(transaction){
    			expect(transaction.email).to.be.equal('obama@gmail.com');
    			done();
    		})
    	});
    	it('should throw an err when transaction does not fulfill schema requirements', function(done) {
			incorrectTransaction().then(null, function(err) {
				expect(err).to.be.ok;
				done();
			});
		});
    });
})













