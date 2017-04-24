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
                selector.parent().css("width", "123px");
                selector.parent().css("height", "123px");
                selector.parent().css("max-width", "123px");
                selector.parent().css("max-height", "123px");
            } else {
                selector.text("");
                selector.parent().css("border-width", "0px");
                selector.parent().css("width", "125px");
                selector.parent().css("height", "125px");
                selector.parent().css("max-width", "125px");
                selector.parent().css("max-height", "125px");
            }
            selector.parent().css("background-color", getColor(grid[tX][tY].points));
            selector.css("color", getFontColor(grid[tX][tY].points));
            if (grid[tX][tY].points > 10) {
                selector.parent().css("box-shadow", "0 0 4px 0 " + getColor(grid[tX][tY].points) + ", 0 0 4px 0 " + getColor(grid[tX][tY].points));
            } else {
                selector.parent().css("box-shadow", "");
            }
        }
    }
    $(".score").text("Score: " + getScore());
}
