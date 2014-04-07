/// <reference path="game.js" />


function Car(carLine, carLane, isUserCar) {
    this.carLine = carLine;
    this.carLane = carLane;
    this.isUserCar = isUserCar;

    this.drawCar(carLine, carLane, isUserCar);
}

Car.prototype.drawCar = function () {
    if (this.isUserCar)
        this.carLine = 16;

    var carLine1 = this.carLine;
    var carLine2 = carLine1 + 1;
    var carLine3 = carLine2 + 1;
    var carLine4 = carLine3 + 1;

    if (this.carLane == "left") {
        bits[carLine1][3] = 1;
        bits[carLine1][6] = 0;

        bits[carLine2][2] = 1;
        bits[carLine2][3] = 1;
        bits[carLine2][4] = 1;
        bits[carLine2][5] = 0;
        bits[carLine2][6] = 0;
        bits[carLine2][7] = 0;
        
        bits[carLine3][6] = 0;
        bits[carLine3][3] = 1;

        bits[carLine4][5] = 0;
        bits[carLine4][6] = 0;
        bits[carLine4][7] = 0;
        
        bits[carLine4][2] = 1;
        bits[carLine4][3] = 1;
        bits[carLine4][4] = 1;
    }
    if (this.carLane == "right") {
        bits[carLine1][3] = 0;
        bits[carLine1][6] = 1;

        bits[carLine2][2] = 0;
        bits[carLine2][3] = 0;
        bits[carLine2][4] = 0;
        bits[carLine2][5] = 1;
        bits[carLine2][6] = 1;
        bits[carLine2][7] = 1;

        bits[carLine3][3] = 0;
        bits[carLine3][6] = 1;

        bits[carLine4][2] = 0;
        bits[carLine4][3] = 0;
        bits[carLine4][4] = 0;
        bits[carLine4][5] = 1;
        bits[carLine4][6] = 1;
        bits[carLine4][7] = 1;
    }
}