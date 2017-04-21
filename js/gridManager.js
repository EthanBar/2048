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
        } while (grid[randX][randY].hasValue);
        grid[randX][randY].hasValue = true;
        grid[randX][randY].points = 2;
    }
}

function render() {
    for (var tX = 0; tX < grid.length; tX++) {
        for (var tY = 0; tY < grid[tX].length; tY++) {
            $(".b" + String(tX) + String(tY)).text(String(grid[tX][tY].points));
        }
    }
}

function checkFull() {
    var isFull = true;
    for (var tX = 0; tX < grid.length; tX++) {
        for (var tY = 0; tY < grid[tX].length; tY++) {
            if (!grid[tX][tY].hasValue) {
                isFull = false;
            }
        }
    }
    return isFull;
}

function moveTiles(key) {
    if (key > 3) {
        for (var tX = 0; tX < grid.length; tX++) {
            for (var tY = 0; tY < grid[tX].length; tY++) {

            }
        }
    } else {
        for (var tX = grid.length; tX >= 0; tX++) {
            for (var tY = grid.length[tX]; tY >= 0; tY++) {
                $(".b" + String(tX) + String(tY)).text(String(grid[tX][tY].points));
            }
        }
    }
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
            console.log(e.which);
            addTiles(1);
            render();
        }
        firstDown = false;
    });
    html.keyup(function(e){
        firstDown = true;
    });
});