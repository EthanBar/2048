"use strict";

var grid = [[],[],[],[]];
for (var tX = 0; tX < grid.length; tX++) {
    for (var tY = 0; tY < 4; tY++) {
        grid[tX][tY] = new Space(tX, tY);
        // console.log(grid[tX][tY].x, grid[tX][tY].y);
    }
}

addTiles(2);



$(document).ready(function () {
    render();
});
// var grid2 = grid;
// grid2[2][2].x = 10;
// console.log(grid[2][2].x);