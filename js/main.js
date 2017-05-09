"use strict";
var disablefirebase = false;

var grid = [[],[],[],[]];
for (let tX = 0; tX < grid.length; tX++) {
    for (let tY = 0; tY < 4; tY++) {
        grid[tX][tY] = new Space(tX, tY);
    }
}
var score = 0;

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
var n1, n1s, n2, n2s, n3, n3s; // Leaderboard vars
// Get a reference to the database service
var provider = new firebase.auth.GoogleAuthProvider();
var user;
var highScore;
var name, email, photoUrl, uid, emailVerified;
function logedin() {
    firebase.database().ref('Highscore/' + user.uid).once('value').then(function(snapshot) {
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
function updateLeaderboard() {
    firebase.database().ref('Leaderboard').once('value').then(function(snapshot) {
        n1 = snapshot.child("1").child("Name").val();
        n1s = snapshot.child("1").child("Score").val();
        n2 = snapshot.child("2").child("Name").val();
        n2s = snapshot.child("2").child("Score").val();
        n3 = snapshot.child("3").child("Name").val();
        n3s = snapshot.child("3").child("Score").val();
        $(".n1").text(n1);
        $(".n1s").text(n1s);
        $(".n2").text(n2);
        $(".n2s").text(n2s);
        $(".n3").text(n3);
        $(".n3s").text(n3s);
    });
}

$(document).ready(function () {
    updateLeaderboard();
});

if (!disablefirebase) {
    firebase.auth().signInWithPopup(provider).then(function (result) {
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
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("Error logging in: " + errorCode);
        console.log(errorMessage);
    });
}

function serverRequest() {
    if (highScore !== undefined) {
        if (getScore() > highScore) {
            firebase.database().ref('Highscore/' + user.uid).set({
                score: getScore()
            });
        }

        if (getScore() > n1s) {
            firebase.database().ref('Leaderboard/3').set({
                Name: n2,
                Score: n2s
            });
            firebase.database().ref('Leaderboard/2').set({
                Name: n1,
                Score: n1s
            });
            firebase.database().ref('Leaderboard/1').set({
                Name: name,
                Score: getScore()
            });
            updateLeaderboard();
        } else if (getScore() > n2s) {
            firebase.database().ref('Leaderboard/3').set({
                Name: n2,
                Score: n2s
            });
            firebase.database().ref('Leaderboard/2').set({
                Name: name,
                Score: getScore()
            });
            updateLeaderboard();
        } else if (getScore() > n3s) {
            firebase.database().ref('Leaderboard/3').set({
                Name: name,
                Score: getScore()
            });
            updateLeaderboard();
        }
    }
}
