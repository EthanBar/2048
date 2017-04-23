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