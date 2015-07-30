'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true
  }
})

mongoose.model('Artist', schema);