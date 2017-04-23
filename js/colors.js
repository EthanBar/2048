function getColor(value) {
    switch (value) {
        case 0:
            return "#CDC1B4";
        case 2:
            return "#EEE4DA";
        case 4:
            return "#EDE0C8";
        case 8:
            return "#F2B179";
        case 16:
            return "#F59563";
        case 32:
            return "#F67C5F";
        case 64:
            return "#F65E3B";
        default:
            return "#EDCF72";
    }
}

function getFontColor(value) {
    if (value < 8) {
        return "#776E65";
    } else {
        return "#F9F6F2";
    }

}