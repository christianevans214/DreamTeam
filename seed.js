/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Album = Promise.promisifyAll(mongoose.model('Album'));


var seedUsers = function() {

    var users = [{
        firstName: 'test',
        lastName: 'test',
        email: 'testing@fsa.com',
        password: 'password',
    }, {
        firstName: 'Barack',
        lastName: 'Obama',
        photo: 'http://www.quickmeme.com/img/ba/ba8d26d434d56f5e98c04e5223ca3e17659005a34297440a31a0e12469e1a568.jpg',
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true,
    }, {
        firstName: 'Cooper',
        lastName: 'Zelenetz',
        photo: 'http://ak-hdl.buzzfed.com/static/2014-05/enhanced/webdr08/7/11/enhanced-buzz-9911-1399476833-28.jpg',
        email: 'cooper@gmail.com',
        password: 'cooper',
        isAdmin: true,
    }, {
        firstName: 'Led',
        lastName: 'Zeppelin',
        photo: 'http://cps-static.rovicorp.com/3/JPG_400/MI0003/680/MI0003680454.jpg?partner=allrovi.com',
        email: 'zep@gmail.com',
        password: 'Led',
        isAdmin: true,
    }, {
        firstName: 'Taylor',
        lastName: 'Swift',
        photo: 'https://usatlife.files.wordpress.com/2014/05/1taylorswift-mug.jpg?w=1000&h=1405',
        email: 'taylor@gmail.com',
        password: 'Swift',
        isAdmin: true,
    }];



    return User.createAsync(users);

};

var seedAlbums = function() {
    var albums = [{
        artistName: "Michael Jackson",
        album: "Thriller",
        genre: "R&B",
        price: "27.16"
    }, {
        artistName: "Leon Bridges",
        album: "Coming Home",
        genre: "Soul",
        price: "20.00"
    }, {
        artistName: "The Beatles",
        album: "Abbey Road",
        genre: "Pop",
        price: "37.00"
    }, {
        artistName: "Pink Floyd",
        album: "Dark Side of the Moon",
        genre: "Rock",
        price: "24.43"
    }, {
        artistName: "Beyoncé",
        album: "Beyoncé",
        genre: "R&B",
        price: "25.50"
    }, {
        artistName: "Led Zeppelin",
        album: "IV",
        genre: "Clasic Rock",
        price: "23.84"
    }, {
        artistName: "Kanye West",
        album: "My Beautiful Dark Twisted Fantasy",
        genre: "Pop",
        price: "25.85"
    }, {
        artistName: "Joni Mitchel",
        album: "Feeling Blue",
        genre: "Pop",
        price: "32.00"
    }];

    return Album.createAsync(albums);
}


connectToDb.then(function() {
    mongoose.connection.db.dropDatabase(function() {
        User.findAsync({}).then(function(users) {
            if (users.length === 0) {
                // return seedUsers();
                return Promise.all([seedUsers(), seedAlbums()])
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                process.kill(0);
            }
        }).then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
    });
});