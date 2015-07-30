var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Album = mongoose.model('Album');

describe('Album model', function() {

	beforeEach('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	it('should exist', function() {
		// console.log(Album);
		expect(Album).to.be.a('function');
	});

	describe('On Creation', function() {
		var createAlbumThatWorks = function() {
			return Album.create({
				artistName: "Michael Jackson",
				album: "Thriller",
				genre: "R&B",
				price: "27.16"
			});
		}

		var createAlbumThatSucks = function() {
			return Album.create({
				artistName: "Michael Jackson",
				album: "Thriller",
				price: "27.16"
			});
		}

		it('should create an album with .create func AND default imgUrl', function(done) {
			createAlbumThatWorks().then(function(album) {
				expect(album.artistName).to.be.equal('Michael Jackson');
				expect(album.imgUrl).to.be.equal("https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/226px-Disque_Vinyl.svg.png");
				done();
			});
		});

		it('should throw an err when album does not fulfill schema requirements', function(done) {
			createAlbumThatSucks().then(null, function(err) {
				expect(err).to.be.ok;
				done();
			})
		});
	})
})


/*
Things to test:
	- album HAS to have album name AND album artist AND genre
	- picture makin sure that default works
	- adding review plainly, should throw error for NOT being a review.mongooseobject
*/