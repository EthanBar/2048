"use strict";

var grid = [[],[],[],[]];
for (var tX = 0; tX < grid.length; tX++) {
    for (var tY = 0; tY < 4; tY++) {
        grid[tX][tY] = new Space(tX, tY);
        // console.log(grid[tX][tY].x, grid[tX][tY].y);
    }
}



$(document).ready(function () {
    // var xRows = "";
    // var yRows = "";
    // for (var i = 0; i < grid.length; i++) {
    //     xRows += "100px ";
    // }
    // for (var i2 = 0; i2 < grid.length; i2++) {
    //     yRows += "100px ";
    // }
    // grid.css("grid-template-rows", xRows);
    // grid.css("grid-template-columns", yRows);
    addTiles(2);
    render();
});
// var grid2 = grid;
// grid2[2][2].x = 10;
// console.log(grid[2][2].x);


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
var database = firebase.database().ref("hey");
var provider = new firebase.auth.GoogleAuthProvider();
var user;

$(document).ready(function () {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        console.log("signed in");
        console.log(user);
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});
// firebase.auth().onAuthStateChanged(function(users) {
//     if (users) {
//         user = users;
//     } else {
//         // No user is signed in.
//     }
// });

function updateScore() {
    firebase.database().ref('Highscore/' + user.uid).set({
        score: getScore(),
        name: "hi"
    });
}

var provider = new firebase.auth.GoogleAuthProvider();

