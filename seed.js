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
var Artist = Promise.promisifyAll(mongoose.model('Artist'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Album = Promise.promisifyAll(mongoose.model('Album'));
var Review = Promise.promisifyAll(mongoose.model('Review'))

var seedArtists = function() {
    var artists = [{
        name: "Michael Jackson"
    }, {
        name: "Leon Bridges"
    }, {
        name: "The Beatles"
    }, {
        name: "Pink Floyd"
    }, {
        name: "Beyoncé"
    }, {
        name: "Led Zeppelin"
    }, {
        name: "Kanye West"
    }, {
        name: "Joni Mitchel"
    }, {
        name: "Shaggy"
    }]

    return Artist.createAsync(artists);
}

// var seedPromos = function() {
//     var promos = [{
//         code: "FREE",
//         validProducts: ["Rock", "Pop"]
//     }, {
//         code: "BOGO",
//         validProducts: ["All"]
//     }, {
//         code: "10%OFF",
//         validProducts: ["Hip-Hop"]
//     }]
//     return Promo.createAsync(promos);
// }


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

var reviews = [{
    username: "test",
    content: "test test test",
    rating: 5
}, {
    username: "Barack",
    content: "This album is presidential.",
    rating: 5
}, {
    username: "Cooper",
    content: "Woof, grr, woof!",
    rating: 3
}, {
    username: "Led",
    content: "A stairway to heaven of an album!",
    rating: 5
}, {
    username: "Taylor",
    content: "I HATE KANYE!",
    rating: 1
}]


var albums = [{
    artist: "Michael Jackson",
    title: "Thriller",
    genre: ["R&B"],
    price: "27.16",
    image: "http://i.huffpost.com/gen/891066/images/o-MICHAEL-JACKSON-THRILLER-facebook.jpg",
    year: 1982,
    review: ["Barack", "Led"],
    spotifyId: '2ANVost0y2y52ema1E9xAZ'
}, {
    artist: "Leon Bridges",
    title: "Coming Home",
    genre: ["Soul"],
    price: "20.00",
    image: "http://static1.squarespace.com/static/54fdea6de4b018047dada8af/t/5552050ee4b03b3ccda57c18/1431438608081/",
    year: 2015,
    review: ["Led", "Cooper", "Taylor"],
    spotifyId: '4svLfrPPk2npPVuI4kXPYg'
}, {
    artist: "The Beatles",
    title: "Abbey Road",
    genre: ["Pop"],
    price: "37.00",
    image: "http://d817ypd61vbww.cloudfront.net/sites/default/files/styles/media_responsive_widest/public/tile/image/AbbeyRoad.jpg?itok=BgfH98zh",
    year: 1969,
    review: ["Barack", "Cooper"],
    spotifyId: '3oVCGd8gjANVb5r2F0M8BI'
}, {
    artist: "Pink Floyd",
    title: "Dark Side of the Moon",
    genre: ["Rock"],
    price: "24.43",
    image: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    year: 1973,
    review: ["Cooper"],
    spotifyId: '3a0UOgDWw2pTajw85QPMiz'
}, {
    artist: "Beyoncé",
    title: "Beyoncé",
    genre: ["R&B"],
    price: "25.50",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Beyonc%C3%A9_-_Beyonc%C3%A9.svg",
    year: 2014,
    review: ["Barack"],
    spotifyId: '2UJwKSBUz6rtW4QLK74kQu'
}, {
    artist: "Led Zeppelin",
    title: "IV",
    genre: ["Clasic Rock"],
    price: "23.84",
    image: "http://superhypeblog.com/wp-content/uploads/2011/08/led-zep-iv.jpg",
    year: 1971,
    review: ["test", "test"],
    spotifyId: '1Ugdi2OTxKopVVqsprp5pb'
}, {
    artist: "Kanye West",
    title: "My Beautiful Dark Twisted Fantasy",
    genre: ["Pop"],
    price: "25.85",
    image: "http://sites.bxmc.poly.edu/~dariclim/VFS/wp-content/uploads/2014/09/kanye_west_mbdtf.jpg",
    year: 2010,
    review: ["Taylor", "Cooper", "Led", "Barack"],
    spotifyId: '20r762YmB5HeofjMCiPMLv'
}, {
    artist: "Joni Mitchel",
    title: "Feeling Blue",
    genre: ["Folk Rock"],
    price: "32.00",
    image: "http://blog.thecurrent.org/files/2015/04/Blue-Joni-Mitchell.jpg",
    year: 1971,
    review: ["Cooper", "Taylor"],
    spotifyId: '5hW4L92KnC6dX9t7tYM4Ve'
}, {
    artist: "Shaggy",
    title: "The Boombastic Collection",
    genre: ["Reggae Soul"],
    price: "45.00",
    review: ["Cooper", "Taylor"],
    image: "http://ecx.images-amazon.com/images/I/71lkgzDdEyL._SL1117_.jpg",
    year: 1995
}];

var newAlbums;


connectToDb.then(function() {
    mongoose.connection.db.dropDatabase(function() {
        //STEP 1: Seed Users to DB.

        seedUsers()
            .then(function(arrUser) {
                console.log('1) We seed users first');
                reviews = reviews.map(function(review, index) {
                    if (arrUser[index].firstName === review.username) {
                        review.username = arrUser[index]._id;
                        return review
                    }
                })
                console.log("2) We changed the users to match _id store in NewArray")

                Review.create(reviews)
                    .then(function(reviewsDB) {
                        reviews = reviewsDB
                        return reviewsDB;
                    })

                seedArtists()
                    .then(function(artistResp) {
                        console.log('4) We seed artists third')
                        newAlbums = albums.map(function(album, index) {
                            if (artistResp[index].name === album.artist) {
                                album.artist = artistResp[index]._id;
                                return album;
                            }
                        })
                    })
                    .then(function() {
                        reviews = reviews.map(function(review, index) {
                            if (review.username === arrUser[index]._id) {
                                newAlbums.forEach(function(album) {
                                    album.review = album.review.map(function(rev) {
                                        if (rev === arrUser[index].firstName) {
                                            rev = review._id
                                        }
                                        return rev
                                    })
                                })
                            }
                            return review
                        })

                        Album.create(newAlbums)
                            .then(function(albArr) {
                                console.log('6) We seed albums last')
                                process.kill(0);
                            })
                    })
            })
    });
});