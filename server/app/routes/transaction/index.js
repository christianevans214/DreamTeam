'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');
module.exports = router;


//params for transaction
router.param('id', function(req, res, next, id) {
  Transaction.findById(id).populate('promo').exec()
    .then(function(transaction) {
      if (transaction) {
        req.transaction = transaction;
        next();
      } else {
        throw new Error('No transaction found');
      }
    })
    .then(null, next);
})


//GET All transactions
router.get('/', function(req, res, next) {
  Transaction.find({}).exec()
    .then(function(transaction) {
      res.json(transaction);
    })
    .then(null, next);
})

//Get one transaction 
router.get('/:id', function(req, res) {
  res.json(req.transaction);
})


//Post one Transaction
router.post('/', function(req, res, next) {
  Transaction.create(req.body)
    .then(function(transaction) {
      res.json(transaction);
    })
    .then(null, next);
})


//Update a Transaction
router.put('/:id', function(req, res, next) {
  _.extend(req.transaction, req.body);
  req.transaction.save()
    .then(function(transaction) {
      res.json(transaction);
    })
    .then(null, next);
})


//Delete a Transaction
router.delete('/:id', function(req, res, next) {
  req.transaction.remove()
    .then(function() {
      res.sendStatus(200);
    })
    .then(null, next);
})