// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Album = mongoose.model('Album');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('Albums Route', function () {
	
	beforeEach('Establish DB connection', function(done){
		if(mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});
	
	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('albums', function() {
		var albums;
		var albumToFind;

		var album1 = {
			artistName: "Michael Jackson",
			album: "Thriller",
			genre: "R&B",
			price: "27.16"
		};

		var album2 = {
			artistName: "Leon Bridges",
			album: "Coming Home",
			genre: "Soul",
			price: "20.00"
		};	

		var album3 = {
			artistName: "The Beatles",
			album: "Abbey Road",
			genre: "Pop",
			price: "37.00"
		};	



		beforeEach('Create an album', function(done){
			Album.create(album1)
			.then(function(album){
				albumToFind = album;
				return Album.create(album2);
			})
			.then(function(album){
				return Album.create(album3, done);
			})
		});

		it('GET all', function(done){
			agent
			.get('/api/albums')
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				done();
			})
		});

		var postedAlbum;

		it('POST one', function(done){
			agent
			.post('/api/albums')
			.send({
				artistName: "Beyoncé",
				album: "Beyoncé",
				genre: "R&B",
				price: "25.50"
			})
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body.album).to.equal('Beyoncé');
				postedAlbum = res.body;
				done();
			});
		});

		it('GET one', function(done){
			agent
			.get('/api/albums/' + albumToFind._id)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body.album).to.equal(albumToFind.album);
				done();
			});
		});

		it('PUT one', function(done){
			agent
			.put('/api/albums/' + albumToFind._id)
			.send({
				album: 'Bae'
			})
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body.album).to.equal('Bae');
				done();
			});
		});

		it('DELETE one', function(done){
			agent
			.delete('/api/albums/' + albumToFind._id)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				Album.findById(albumToFind._id).exec()
				.then(function(album){
					if(err) return done(err);
					expect(album).to.be.null;
					done();
				});
			});
		})
	})



})