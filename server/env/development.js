module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/stackStore",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "aiFZ9nAFELAm4YTKrCVSfsgos",
    "consumerSecret": "VdXdbaYN7i2Ax9YgSY2ClohZJXXwLrvamEb2OlktkjFnBmxvqU",
    "callbackUrl": "http://192.168.1.108:1337/auth/twitter/callback" //can't be localhost, must be ip
  },
  "FACEBOOK": {
    "clientID": "503523336478729",
    "clientSecret": "d5fbe9b0307e5177566b95afeac94625",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "60896073655-s89b61aic8jr16griqleg1hbdj9akk4a.apps.googleusercontent.com",
    "clientSecret": "zddvsO2KyE3_o_aAC_bNoRn8",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  },
  "SPOTIFY": {
    "clientID": "5bcfd23e187a49eb99010e0c61025b37",
    "clientSecret": "1be6c96591c24bafbfa7c18ea67b97da",
    "callbackURL": "http://localhost:1337/spotify/callback"
  }
};