"use strict";
function Space(x, y) {
    this.hasValue = false;
    this.x = x;
    this.y = y;
    this.points = 0;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
