var firebase = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://mdbsocials-7b066.firebaseio.com"
});

module.exports = firebase;
