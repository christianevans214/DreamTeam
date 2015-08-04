'use strict';
var router = require('express').Router();
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('_HrZ4VdCFDLb6afgApoxUw');
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');
module.exports = router;

var emailPath = path.join(__dirname, 'email.html');
var emailTemplate = fs.readFileSync(emailPath, 'utf-8');

//Send an Email Confirmation
router.post('/email', function(req,res,next){
 var emailHTML= ejs.render(emailTemplate, req.body);
 sendEmail(emailHTML, req.body);
  console.log('req.body', req.body);
})

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

var sendEmail = function(emailHTML, transaction){
  var message = {
    "html": emailHTML,
    "subject": 'Order Confirmation',
    "from_email": 'annalexgoldberg@gmail.com',
    "from_name": 'Infinity Loop',
    "to": [{
            "email": transaction.email,
            "name": transaction.billing.firstName
        }],
    "important": false,
    "track_opens": true,    
    "auto_html": false,
    "preserve_recipients": true,
    "merge": false,
    "tags": [
        "Order"
    ]    
  };
  var ip_pool = "Main Pool";
  mandrill_client.messages.send({"message": message, "async": false, "ip_pool": ip_pool}, function(result) {
      // console.log(message);
      // console.log(result);   
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};

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
      return Transaction.findById(transaction._id).populate('purchases.album').exec()
    })
    .then(function(transaction){
        console.log('transaction', transaction);
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
