'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    photo: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/226px-Disque_Vinyl.svg.png"
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    google: {
        id: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    purchaseHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }],
    cart: [{
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album"
        },
        quantity: Number
    }],
    //if this is true, user will be redirected to change password page after they log in with successful password.
    needPWChange: {
        type: Boolean,
        default: false
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.

var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);