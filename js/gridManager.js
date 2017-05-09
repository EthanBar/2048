"use strict";
var gameOver = false;

function addTiles(count) {
    if (checkFull()) {
        if (!gameOver) {
            console.log("gameover");
            gameOver = true;
            var scorey = $(".gameover");
            serverRequest();
            scorey.hide();
            scorey.text("Game over");
            $(".grid").fadeTo(1000, 0.3);
            scorey.slideDown(1000);
        }
        return;
    }

    for (var i = 0; i < count; i++) {
        do {
            var randX = Math.floor(Math.random() * grid.length);
            var randY = Math.floor(Math.random() * grid[randX].length);
        } while (grid[randX][randY].hasValue());
        if (Math.random() > 0.7) {
            grid[randX][randY].points = 4;
        } else {
            grid[randX][randY].points = 2;
        }
    }
    var selector = $(".b" + String(randX) + String(randY));
    selector.parent().hide();
    selector.parent().fadeIn(300);
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
    for (var repeat = 0; repeat < 2; repeat++) {
        switch (key) {
            case 3: // Up
                for (tX = 0; tX < grid.length; tX++) {
                    for (tY = 0; tY < grid.length; tY++) {
                        counter = tY;
                        while (counter > 0) {
                            if (!(grid[tX][counter - 1].hasValue())) { // Move up
                                grid[tX][counter - 1].points = grid[tX][counter].points;
                                grid[tX][counter].points = 0;
                            } else if (grid[tX][counter].hasValue() && (grid[tX][counter - 1].points === grid[tX][counter].points)) {
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
                    for (tY = grid.length - 1; tY >= 0; tY--) {
                        counter = tY;
                        while (counter < grid.length - 1) {
                            if (!(grid[tX][counter + 1].hasValue())) { // Move down
                                grid[tX][counter + 1].points = grid[tX][counter].points;
                                grid[tX][counter].points = 0;
                            } else if (grid[tX][counter].hasValue() && (grid[tX][counter + 1].points === grid[tX][counter].points)) {
                                grid[tX][counter + 1].points = grid[tX][counter].points * 2;
                                grid[tX][counter].points = 0;
                            }
                            counter++;
                        }
                    }
                }
                break;
            case 2: // Right
                for (tY = 0; tY < grid.length; tY++) {
                    for (tX = grid.length - 1; tX >= 0; tX--) {
                        counter = tX;
                        while (counter < grid.length - 1) {
                            if (!(grid[counter + 1][tY].hasValue())) { // Move up
                                grid[counter + 1][tY].points = grid[counter][tY].points;
                                grid[counter][tY].points = 0;
                            } else if (grid[counter][tY].hasValue() && (grid[counter + 1][tY].points === grid[counter][tY].points)) {
                                grid[counter + 1][tY].points = grid[counter][tY].points * 2;
                                grid[counter][tY].points = 0;
                            }
                            counter++;
                        }
                    }
                }
                break;
            case 4: // Left
                for (tY = 0; tY < grid.length; tY++) {
                    for (tX = 0; tX < grid.length; tX++) {
                        counter = tX;
                        while (counter > 0) {
                            if (!(grid[counter - 1][tY].hasValue())) { // Move up
                                grid[counter - 1][tY].points = grid[counter][tY].points;
                                grid[counter][tY].points = 0;
                            } else if (grid[counter][tY].hasValue() && (grid[counter - 1][tY].points === grid[counter][tY].points)) {
                                grid[counter - 1][tY].points = grid[counter][tY].points * 2;
                                grid[counter][tY].points = 0;
                            }
                            counter--;
                        }
                    }
                }
                break;
        }
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

function getScore() {
    var total = 0;
    for (var tX = 0; tX < grid.length; tX++) {
        for (var tY = 0; tY < 4; tY++) {
            total += grid[tX][tY].points;
        }
    }
    if (user && total > highScore) {
        $(".highscore").text("Personal highscore: " + total);
    }
    return total;
}