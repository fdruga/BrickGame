/// <reference path="jquery-1.9.1.js" />
/// <reference path="bit.js" />
/// <reference path="screenSteps.js" />
/// <reference path="car.js" />
/// <reference path="opponents.js" />

var bits = new Array();
var roadStep = 0;
var screen = null;
var userCarPosition = null;
var frameCount = 0;
var frameInterval = null;
var pause = false;
var enemies = [];
var enemiesTimeFrame = [];

function Game() {
    enemies = [];
    enemiesTimeFrame = [];
    $(document).keydown(function (e) {
        keyPressed(e);
    });
    userCarPosition = "right";
    screen = $("#screen");
    clearScreen();
    this.configureInitialBits();

    var ran_bool = !!Math.round(Math.random() * 1);
    var lane = "";
    if (!ran_bool) {
        lane = 'left';
    } else {
        lane = 'right';
    }

    //this.enemies = new Enemies(lane);

    frameInterval = window.setInterval(function () { drawFrame(true) }, 100);
    //this.drawFrame();

    $("#btnStop").click(function () {
        if (pause)
            pause = false;
        else
            pause = true;
    });

    for (var i = 0; i < 20; i++) {
        var frame = 0;
        if (enemiesTimeFrame.length == 0) {
            enemiesTimeFrame.push({
                frame: 0,
                lane: "left"
            });
            continue;
        }

        var lastTimeFrame = enemiesTimeFrame[i - 1].frame;
        var lastFrameLane = enemiesTimeFrame[i - 1].lane;
        var minFrame = lastTimeFrame + 5;
        var maxFrame = lastTimeFrame + 18;

        var frame = getRandomInt(minFrame, maxFrame);
        var lane = "left";
        if (getRandomInt(0, 1) == 0)
            lane = "right";

        //Jucatorul nu are loc sa treaca de inamici?
        if ((frame - lastTimeFrame) < 8) {
            if (lastFrameLane != lane) {
                var diff = 10 - (frame - lastTimeFrame);
                frame = frame + diff;
            }
        }

        //Inamicii se


        //    lane = "right";

       enemiesTimeFrame.push({
            frame: frame,
            lane: lane
        });
    }

    $.each(enemiesTimeFrame, function (index, value) {
        $("#enemyFrames").append("<table>");
        $("#enemyFrames").append("<tr><td>" + value.frame + "</td><td>" + value.lane + " </td></tr>");
        $("#enemyFrames").append("</table>");
    });

    var salut = "asda";
}



function drawFrame(andRoad) {
    if (andRoad)
        drawRoad();
    var userCar = new Car(0, userCarPosition, true);
    addOpponent();

    if (pause == false)
        updateScreen(true);

    //debug("roadStep - " + roadStep);
}

function addOpponent() {
    var match1 = { frame: frameCount, lane: "left" };
    var match2 = { frame: frameCount, lane: "right" };
    var i;
    for (i in enemiesTimeFrame) {
        if (enemiesTimeFrame[i].frame == frameCount) {
            var lane = enemiesTimeFrame[i].lane;
            addEnemyToCollection(lane);
        }
    }
    

    for (var i = 0; i < enemies.length; i++) {
        var id = enemies[i]["id"];
        var line = enemies[i].carLine;
        var lane = enemies[i].lane;

        var opponent = new Opponent(line, lane);

        enemies[i].carLine = line + 1;

        if (line == 23)
            enemies.splice(i, 1);
    }
    //var opponent = new Opponent(frameCount, "left");
    //var opponent = new Opponent(frameCount - 10, "right");
    //var opponent = new Opponent(frameCount - 20, "left");
}

function addEnemyToCollection(lane) {
    

    enemies.push({
        id: 0,
        carLine: 0,
        lane: lane
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawRoad() {
    //alert("ya");
    if (roadStep == 3)
        roadStep = 0;
    roadStep = roadStep + 1;
    drawRoadStep(roadStep);
}
function drawRoadStep(roadStep, line) {
    bits = getRoadStep(roadStep);
}

function keyPressed(e) {
    if (e.keyCode == 37) {
        userCarPosition = "left";
        updateScreen(false);
        return false;
    }
    if (e.keyCode == 39) {
        userCarPosition = "right";
        updateScreen(false);
        return false;
    }
}

function updateScreen(countFrame) {
    clearScreen();

    for (var i = 0; i < bits.length; i++) {
        var line = $("<li></li>");
        for (var n = 0; n < bits[i].length; n++) {
            var isActive = false;
            if (bits[i][n] == 1)
                isActive = true;
            var bit = Bit(isActive);
            $(line).append(bit);
        }

        $("#screen").append(line);
    }

    if (countFrame)
        frameCount++;
    if (frameCount == 20000000)
        clearInterval(frameInterval);

    clearMatrix();

    $("#roadstep").html("Frame count: " + frameCount);
}

function clearScreen() {
    $(screen).empty();
}
function clearMatrix() {
    for (i = 0; i < 20; i++) {
        for (x = 1; x < 9; x++) {
            bits[i][x] = 0;
        }
    }
}

Game.prototype.configureInitialBits = function () {
    //bits = [
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    //];
    bits = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}
Game.prototype.drawFrame = function () {

}