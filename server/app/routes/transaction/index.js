'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');
module.exports = router;

//Get all transactions
router.get('/', function(req,res,next){
  Transaction.find({}).exec()
  .then(function(transaction){
    res.json(transaction);
  })
  .then(null,next);
})

//Get one transaction 
router.get('/:id', function(req, res, next) {
  Transaction.findById(req.params.id).exec()
  .then(function(transaction){
    res.json(Transaction);
  })
  .then(null, next);
})


//Post one Transaction
router.post('/', function(req,res,next){
  Transaction.create(req.body)
  .then(function(Transaction){
    res.json(Transaction);
  })
  .then(null, next);
})

//Update a Transaction
router.put('/:id', function(req,res,next){
  Transaction.findOneAndUpdate({_id: req.params.id}, req.body, function(err,Transaction){
    if(err){
      next(err);
    }else{
      res.json(Transaction);
    }
  })
})

//Delete a Transaction
router.delete('/:id', function(req,res,next){
  Transaction.findByIdAndRemove(req.params.id, function(err,Transaction){
    if(err){
      next(err);
    }else{
      res.status(204).end();
    }
  })
})