/// <reference path="jquery-1.9.1.js" />
var opponents = new Array();


function Opponent(carLine, lane) {
    this.carLine = carLine;
    this.lane = lane;

    this.drawOpponent(carLine, lane);
}
Opponent.prototype.drawOpponent =  function () {
    var firstLine = this.carLine;

    var carLine1 = firstLine;
    var carLine2 = firstLine - 1;
    var carLine3 = firstLine - 2;
    var carLine4 = firstLine - 3;

    if (this.lane == "left") {
        drawLine(carLine1, 3, true);

        drawLine(carLine2, 2, true);
        drawLine(carLine2, 3, true);
        drawLine(carLine2, 4, true);

        drawLine(carLine3, 3, true);

        drawLine(carLine4, 2, true);
        drawLine(carLine4, 3, true);
        drawLine(carLine4, 4, true);
    }
    else {
        drawLine(carLine1, 6, true);

        drawLine(carLine2, 5, true);
        drawLine(carLine2, 6, true);
        drawLine(carLine2, 7, true);

        drawLine(carLine3, 6, true);

        drawLine(carLine4, 5, true);
        drawLine(carLine4, 6, true);
        drawLine(carLine4, 7, true);
    }
}

function drawLine(x, y, state) {
    if(x >= 0 && x <= 19)
        bits[x][y] = state;
}


function Opponents(lane) {
    

}