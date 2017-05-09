"use strict";

var grid = [[],[],[],[]];
for (var tX = 0; tX < grid.length; tX++) {
    for (var tY = 0; tY < 4; tY++) {
        grid[tX][tY] = new Space(tX, tY);
    }
}

$(document).ready(function () {
    addTiles(2);
    render();
});

// Firebase below
var config = {
    apiKey: "AIzaSyDLFyQpxiqlN2kRBsZ7-Yiwq8tYdc9RkVA",
    authDomain: "project-2280929933435968256.firebaseapp.com",
    databaseURL: "https://project-2280929933435968256.firebaseio.com",
    projectId: "project-2280929933435968256",
    storageBucket: "project-2280929933435968256.appspot.com",
    messagingSenderId: "211572762521"
};
firebase.initializeApp(config);

// Get a reference to the database service
var provider = new firebase.auth.GoogleAuthProvider();
var user;
var highScore;
var name, email, photoUrl, uid, emailVerified;
function logedin() {
    firebase.database().ref('Highscore/' + user.uid).once('value').then(function(snapshot) {
        console.log(snapshot);
        highScore = snapshot.child("score").val();
        if (highScore !== null) {
            $(".highscore").text("Personal highscore: " + highScore);
        } else {
            $(".highscore").text("Finish a game to set a high score.");
        }
    });
    var body = $("body");
    body.prepend('<p class="username">' + name + '</p>');
    body.prepend('<img class="profilepic" alt="loading" height="60" width="60" src='+ photoUrl +'>');
    $(".profilepic").hide().fadeIn(600);
    $(".username").hide().slideDown(600);
}
firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken; //Google access token to access the Google API.
    user = result.user;
    user.providerData.forEach(function (profile) {
        uid = profile.uid;
        name = profile.displayName;
        email = profile.email;
        photoUrl = profile.photoURL;
    });
    logedin();
    // ...
}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log("Error logging in: " + errorCode);
    console.log(errorMessage);
});

function serverRequest() {
    if (highScore !== undefined) {
        if (getScore() > highScore) {
            firebase.database().ref('Highscore/' + user.uid).set({
                score: getScore()
            });
        }
    }
}
