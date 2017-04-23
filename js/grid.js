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
                selector.parent().css("border-width", "2px");
                selector.parent().css("width", "98px");
                selector.parent().css("height", "98px");
                selector.parent().css("max-width", "98px");
                selector.parent().css("max-height", "98px");
            } else {
                selector.text("");
                selector.parent().css("border-width", "0px");
                selector.parent().css("width", "100px");
                selector.parent().css("height", "100px");
                selector.parent().css("max-width", "100px");
                selector.parent().css("max-height", "100px");
            }
            selector.parent().css("background-color", getColor(grid[tX][tY].points));
            selector.css("color", getFontColor(grid[tX][tY].points));
        }
    }
}
