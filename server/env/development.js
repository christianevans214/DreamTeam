module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/stackStore",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE" //can't be localhost, must be ip
  },
  "FACEBOOK": {
    "clientID": "503523336478729",
    "clientSecret": "d5fbe9b0307e5177566b95afeac94625",
    "callbackURL": "http://localhost:1337/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "60896073655-s89b61aic8jr16griqleg1hbdj9akk4a.apps.googleusercontent.com",
    "clientSecret": "zddvsO2KyE3_o_aAC_bNoRn8",
    "callbackURL": "http://localhost:1337/google/callback"
  }
};