"use strict";
function addTiles(count) {
    if (checkFull()) {
        $(".score").text("Game Over");
        return;
    }
    for (var i = 0; i < count; i++) {
        do {
            var randX = Math.floor(Math.random() * grid.length);
            var randY = Math.floor(Math.random() * grid[randX].length);
        } while (grid[randX][randY].hasValue());
        grid[randX][randY].points = 2;
    }
}

function checkFull() {
    var isFull = true;
    for (var tX = 0; tX < grid.length; tX++) {
        for (var tY = 0; tY < grid[tX].length; tY++) {
            if (!grid[tX][tY].hasValue()) {
                isFull = false;
            }
        }
    }
    return isFull;
}

function moveTiles(key) {
    var tX, tY, counter;
    switch (key) {
        case 3: // Up
            for (tX = 0; tX < grid.length; tX++) {
                for (tY = 0; tY < grid.length; tY++) {
                    counter = grid.length - 1;
                    while (counter > 0) {
                        if (!(grid[tX][counter - 1].hasValue())) { // Move up
                            grid[tX][counter - 1].points = grid[tX][counter].points;
                            grid[tX][counter].points = 0;
                        } else if (grid[tX][counter].hasValue() && (grid[tX][counter - 1].points === grid[tX][counter].points)) { // Combine
                            grid[tX][counter - 1].points = grid[tX][counter].points * 2;
                            grid[tX][counter].points = 0;
                        }
                        counter--;
                    }
                }
            }
            break;
        case 1: // Down
            for (tX = 0; tX < grid.length; tX++) {
                counter = 0;
                while (counter < grid.length - 1) {
                    if (!(grid[tX][counter + 1].hasValue())) { // Move down
                        grid[tX][counter + 1].points = grid[tX][counter].points;
                        grid[tX][counter].points = 0;
                    } else if (grid[tX][counter].hasValue() && (grid[tX][counter + 1].points === grid[tX][counter].points)) { // Combine
                        grid[tX][counter + 1].points = grid[tX][counter].points * 2;
                        grid[tX][counter].points = 0;
                    }
                    counter++;
                }
            }
            break;
        case 2: // Right
            for (tY = 0; tY < grid.length; tY++) {
                counter = 0;
                while (counter < grid.length - 1) {
                    if (!(grid[counter + 1][tY].hasValue())) { // Move up
                        grid[counter + 1][tY].points = grid[counter][tY].points;
                        grid[counter][tY].points = 0;
                    } else if (grid[counter][tY].hasValue() && (grid[counter + 1][tY].points === grid[counter][tY].points)) { // Combine
                        grid[counter + 1][tY].points = grid[counter][tY].points * 2;
                        grid[counter][tY].points = 0;
                    }
                    counter++;
                }
            }
            break;
        case 4: // Left
            for (tY = 0; tY < grid.length; tY++) {
                counter = grid.length - 1;
                while (counter > 0) {
                    if (!(grid[counter - 1][tY].hasValue())) { // Move up
                        grid[counter - 1][tY].points = grid[counter][tY].points;
                        grid[counter][tY].points = 0;
                    } else if (grid[counter][tY].hasValue() && (grid[counter - 1][tY].points === grid[counter][tY].points)) { // Combine
                        grid[counter - 1][tY].points = grid[counter][tY].points * 2;
                        grid[counter][tY].points = 0;
                    }
                    counter--;
                }
            }
            break;
    }
    addTiles(1);
    render();
}

// Key press detection
$(function(){
    var html = $('html');
    var firstDown = true;
    html.keydown(function(e){
        if (firstDown) {
            if (e.which === 37) {
                // Left
                moveTiles(4);
            } else if (e.which === 38) {
                // Up
                moveTiles(3);
            } else if (e.which === 39) {
                // Right
                moveTiles(2);
            } else if (e.which === 40) {
                // Down
                moveTiles(1);
            }
        }
        firstDown = false;
    });
    html.keyup(function(e){
        firstDown = true;
    });
});