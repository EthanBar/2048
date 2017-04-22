"use strict";
function Space(x, y) {
    this.hasValue = function () {
        return this.points !== 0;

    };
    this.x = x;
    this.y = y;
    this.points = 0;
}

function render() {
    for (var tX = 0; tX < grid.length; tX++) {
        for (var tY = 0; tY < grid[tX].length; tY++) {
            var selector = $(".b" + String(tX) + String(tY));
            if (grid[tX][tY].hasValue()) {
                selector.text(String(grid[tX][tY].points));
            } else {
                selector.text("");
            }
        }
    }
}
