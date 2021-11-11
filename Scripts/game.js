/// <reference path="jquery-1.9.1.js" />
/// <reference path="bit.js" />
/// <reference path="screenSteps.js" />
/// <reference path="car.js" />
/// <reference path="opponents.js" />

var bits,
  roadStep,
  screen,
  userCarPosition,
  frameCount,
  frameInterval,
  pause,
  enemies,
  enemiesTimeFrame,
  gameSpeed,
  colision,
  colisitonAtFrame,
  lives,
  score,
  level,
  godMode,
  enemiesPassed,
  currentEnemiesPassed;

function resetAllVariables() {
  bits = new Array();
  roadStep = 0;
  screen = null;
  userCarPosition = null;
  frameCount = 0;
  frameInterval = null;
  pause = false;
  enemies = [];
  enemiesTimeFrame = [];
  gameSpeed = 150;
  colision = false;
  colisitonAtFrame = 0;
  lives = 1;
  score = 0;
  level = 1;
  godMode = true;
  enemiesPassed = 1;
  currentEnemiesPassed = 0;
}

function Game() {
  resetAllVariables();
  enemies = [];
  enemiesTimeFrame = [];
  $(document).keydown(function (e) {
    keyPressed(e);
  });
  userCarPosition = "right";
  screen = $("#screen");
  clearScreen();
  this.configureInitialBits();

  //#region Event handlers
  $(".gameTouchControls > .left").bind("touchstart", function () {
    userCarPosition = "left";
  });
  $(".gameTouchControls > .right").bind("touchstart", function () {
    userCarPosition = "right";
  });

  $(".gameTouchControls > .left").bind("click", function () {
    userCarPosition = "left";
  });
  $(".gameTouchControls > .right").bind("click", function () {
    userCarPosition = "right";
  });

  function keyPressed(e) {
    if (e.keyCode == 37) {
      userCarPosition = "left";
      return false;
    }
    if (e.keyCode == 39) {
      userCarPosition = "right";
      return false;
    }
  }
  //#endregion

  $(".gameTouchControls").css("display", "block");
  $(".gameTouchControls > div > .touchContainer")
    .addClass("flash")
    .css("display", "block")
    .delay(3000)
    .queue(function () {
      $(this).removeClass("flash").css("display", "none").dequeue();
    });

  var ran_bool = !!Math.round(Math.random() * 1);
  var lane = "";
  if (!ran_bool) {
    lane = "left";
  } else {
    lane = "right";
  }

  frameInterval = window.setInterval(function () {
    drawFrame(true);
  }, gameSpeed);

  $("#btnStop").click(function () {
    if (pause) pause = false;
    else pause = true;
  });

  // Draw 1000 enemies
  for (var i = 0; i < 1000; i++) {
    var frame = 0;
    if (enemiesTimeFrame.length == 0) {
      enemiesTimeFrame.push({
        frame: 0,
        lane: "left",
      });
      continue;
    }

    var lastTimeFrame = enemiesTimeFrame[i - 1].frame;
    var lastFrameLane = enemiesTimeFrame[i - 1].lane;
    var minFrame = lastTimeFrame + 5;
    var maxFrame = lastTimeFrame + 18;

    var frame = getRandomInt(minFrame, maxFrame);
    var lane = "left";
    if (getRandomInt(0, 1) == 0) lane = "right";

    //Jucatorul nu are loc sa treaca de inamici?
    if (frame - lastTimeFrame < 8) {
      if (lastFrameLane != lane) {
        var diff = 10 - (frame - lastTimeFrame);
        frame = frame + diff;
      }
    }

    enemiesTimeFrame.push({
      frame: frame,
      lane: lane,
    });
  }

  $.each(enemiesTimeFrame, function (index, value) {
    $("#enemyFrames").append("<table>");
    $("#enemyFrames").append(
      "<tr><td>" + value.frame + "</td><td>" + value.lane + " </td></tr>"
    );
    $("#enemyFrames").append("</table>");
  });
}

function drawFrame(andRoad) {
  if (andRoad) drawRoad();
  var userCar = new Car(0, userCarPosition, true);
  addOpponent();

  if (pause == false) updateScreen(true);

  //debug("roadStep - " + roadStep);
}

function addOpponent() {
  var i;
  for (i in enemiesTimeFrame) {
    if (enemiesTimeFrame[i].frame == frameCount) {
      var lane = enemiesTimeFrame[i].lane;
      addEnemyToCollection(lane);
    }
  }

  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].carLine == 23) {
      enemies.splice(i, 1);
      console.log(enemiesPassed);
      enemiesPassed++;
    }
  }

  for (var i = 0; i < enemies.length; i++) {
    var line = enemies[i].carLine;
    var lane = enemies[i].lane;

    // Check if the enemy is outside of the screen
    // and remove it if so. Else add it to the screen
    if (enemies[i].carLine == 23) {
      enemies.splice(i, 1);
    } else {
      new Opponent(line, lane);
      enemies[i].carLine = line + 1;
    }
  }
}

function addEnemyToCollection(lane) {
  enemies.push({
    id: 0,
    carLine: 0,
    lane: lane,
    crashed: false,
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawRoad() {
  //alert("ya");
  if (roadStep == 3) roadStep = 0;
  roadStep = roadStep + 1;
  drawRoadStep(roadStep);
}
function drawRoadStep(roadStep, line) {
  bits = getRoadStep(roadStep);
}

function updateScreen(countFrame) {
  clearScreen();
  $("#roadstep").html("Frame count: " + frameCount);
  $("#carPos").html("Car pos: " + userCarPosition);
  $("#lives").html("Lives: " + this.lives);
  $("#score").html("Score: " + this.score);
  $("#level").html("Level: " + this.level);
  $("#enemiesPassed").html("enemiesPassed: " + enemiesPassed);

  // UPDATE GAME STATUS
  $("#gameStatusLives").html(this.lives);
  $("#gameStatusLevel").html(this.level);
  $("#gameStatusScore").html(this.score);

  for (var i = 0; i < bits.length; i++) {
    var line = $("<li></li>");
    for (var n = 0; n < bits[i].length; n++) {
      var isActive = false;
      if (bits[i][n] == 1) isActive = true;
      var bit = Bit(isActive);
      $(line).append(bit);
    }

    $("#screen").append(line);
  }

  this.collisionDetection();

  if (countFrame) frameCount++;
  if (frameCount == 20000000) clearInterval(frameInterval);
  if (frameCount % 15 === 0) {
    this.score += 10;
  }

  // Game speeds up at every 30 enemies passed
  if (enemiesPassed % 30 === 0 && currentEnemiesPassed !== enemiesPassed) {
    this.level += 1;
    currentEnemiesPassed = enemiesPassed;
    gameSpeed = gameSpeed - 10;

    clearInterval(frameInterval);
    frameInterval = window.setInterval(function () {
      drawFrame(true);
    }, gameSpeed);
  }

  clearMatrix();
}

function collisionDetection() {
  var carCenter = 3;
  if (userCarPosition === "right") carCenter = 6;

  // Check
  // 1. The collision
  // 2. That the enemy car is not in the crashed state
  if (
    bits[17][carCenter] === true ||
    bits[18][carCenter] === true ||
    bits[19][carCenter] === true ||
    (bits[15][carCenter] === true && bits[16][carCenter] === 1)
  ) {
    if (!this.enemies[0].crashed) {
      //Mark the first car as crashed (oldest in the list actually)
      this.enemies[0].crashed = true;
      this.lives--;
      $("#screenContainer")
        .addClass("screenShake")
        .delay(1000)
        .queue(function () {
          $(this).removeClass("screenShake").dequeue();
        });

      if (this.lives === 0 && !godMode) {
        gameIsOver();
      }
    }
  }
}

function gameIsOver() {
  pause = true;
  clearInterval(frameInterval);
  $("#gameScore").html(this.score);
  $("#gameOverContainer")
    .delay(1000)
    .queue(function () {
      $(this).css("display", "block").dequeue();
    });
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
};
Game.prototype.drawFrame = function () {};
