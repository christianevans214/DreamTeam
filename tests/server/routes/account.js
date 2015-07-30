// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;


var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Account Route', function() {
  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  describe('Login user', function() {

    var user1Info = {
      firstName: 'Cooper',
      lastName: 'Zelenetz',
      photo: 'http://ak-hdl.buzzfed.com/static/2014-05/enhanced/webdr08/7/11/enhanced-buzz-9911-1399476833-28.jpg',
      email: 'cooper@gmail.com',
      password: 'cooper',
      isAdmin: true,
    };

    var user2Info = {
      email: 'joe@gmail.com',
      firstName: 'joe',
      lastName: 'alvez',
      password: 'shoopdawoop'
    };

    var userToPostInfo = {
      email: 'anna@gmail.com',
      firstName: 'anna',
      lastName: 'goldberg',
      password: 'shoopdawoop'
    };

    var id;

    beforeEach('Create users', function(done) {
      User.create(user1Info)
        .then(function(user1Info) {
          id = user1Info._id;
          User.create(user2Info, done);
        })
    })

    //get all users
    it('should get with 200 response on all user route', function(done) {
      supertest(app)
        .get('/api/account/')
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          console.log(response.body);
          expect(response.body).to.be.an('array');
          done();
        });
    });

    //get one user
    it('should get with 200 response on one user route', function(done) {

      supertest(app)
        .get('/api/account/' + id)
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          console.log(response.body);
          expect(response.body).to.be.an('object');
          done();
        });
    });


    //get user that does not exist
    it('should respond with 404 for user that does not exist', function(done) {

      supertest(app)
        .get('/api/account/' + '98f4rt354g3xtrfd')
        .expect(404)
        .end(function(err, response) {
          done()
        });
    });

    //post one user
    it('should post with 201 response on user post route', function(done) {
      supertest(app)
        .post('/api/account/')
        .send(userToPostInfo)
        .expect(201)
        .end(function(err, response) {
          if (err) return done(err);
          console.log(response.body);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    //update one user
    it('should update the user and send back modified user info', function(done) {
      supertest(app)
        .put('/api/account/' + id)
        .send(userToPostInfo)
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          expect(response.body.firstName).to.be.equal('anna');
          done();
        });
    });

    //send 404 for update to user that does not exist 
    it('should not update the user that does not exist', function(done) {
      supertest(app)
        .put('/api/account/' + '3090edjdk')
        .end(function(err, response) {
          expect(404);
          done();
        });
    });

    //delete a user
    it('should delete a user', function(done) {
      supertest(app)
        .delete('/api/account/' + id)
        .expect(204)
        .end(function(err, response) {
          if (err) return done(err);
          done();
        });
    });


  })

})