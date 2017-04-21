"use strict";
function addTiles(count) {

    for (var i = 0; i < count; i++) {
        do {
            var randX = Math.floor(Math.random() * grid.length);
            var randY = Math.floor(Math.random() * grid[randX].length);
        } while (grid[randX][randY].hasValue);
        grid[randX][randY].hasValue = true;
        grid[randX][randY].points = 2;
    }
}

// Key press dete
$(function(){
    var html = $('html');
    var firstDown = true;
    html.keydown(function(e){
        if (firstDown) {
            console.log(e.which);
        }
        firstDown = false;
    });
    html.keyup(function(e){
        firstDown = true;
    });
});