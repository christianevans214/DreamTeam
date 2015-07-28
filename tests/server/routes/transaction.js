// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Transaction = mongoose.model('Transaction');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Transaction Route', function(){
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Login user', function(){

   var transaction1Info = {
    email: 'cooper@gmail.com',
    purchases:[{artistName: 'The Beatles', albumName: 'Abbey Road', price: 20, quantity: 1}]
   };

   var transactionPostInfo = {
    email: 'LedZep@gmail.com',
    purchases:[{artistName: 'Aerosmith', albumName: 'lalala', price: 10, quantity: 1}]
   };

  var id;

    beforeEach('Create users', function (done) {
      Transaction.create(transaction1Info)
      .then(function(transaction1Info){
        id = transaction1Info._id;
        done();
      })
    })

    //get all transactions
    it('should get with 200 response on all user route', function(done){
      supertest(app)
        .get('/api/transaction/')
        .expect(200)
        .end(function(err,response){
          if(err) return done(err);
          console.log(response.body);
          expect(response.body).to.be.an('array');
          done();
        });
     
    });

    //get one transaction
    it('should get with 200 response on one user route', function(done){
      supertest(app)
        .get('/api/transaction/' + id)
        .expect(200)
        .end(function(err,response){
          if(err) return done(err);
          console.log(response.body);
          expect(response.body).to.be.an('object');
          done();
        })
      
    });

    //should not get a transaction that does not exist
    it('should not get a transaction that does not exist', function(done){
      supertest(app)
        .get('/api/transaction/' + 'w9a89s')
        .end(function(err,response){
          expect(404);
          done();
        })
      
    });

    //post one transaction
    it('should post with 201 response on user post route', function(done){
      supertest(app)
        .post('/api/transaction/')
        .send(transactionPostInfo)
        .expect(201)
        .end(function(err,response){
          if(err) return done(err);
          console.log(response.body);
          expect(response.body).to.be.an('object');
          done();
        });
     
    });

    //update one transaction
    it('should update the user and send back modified user info', function(done){
      supertest(app)
        .put('/api/transaction/' + id)
        .send(transactionPostInfo)
        .expect(200)
        .end(function(err,response){
          if(err) return done(err);
          expect(response.body.email).to.be.equal('LedZep@gmail.com');
          done();
        });

      
    });

    //update not update transaction that doesn't exist
    it('should not update a user that doesn\'t exist', function(done){
      supertest(app)
        .put('/api/transaction/' + '9839wsKJDN')
        .send(transactionPostInfo)
        .end(function(err,response){
          expect(404);
          done();
        });   
    });

    //delete a transaction
     it('should delete a transaction', function(done){
      supertest(app)
        .delete('/api/transaction/' + id)
        .expect(204)
        .end(function(err,response){
          if(err) return done(err);
          done();
        });
    });


  })

})
