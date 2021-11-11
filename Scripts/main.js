/// <reference path="jquery-1.9.1.js" />
/// <reference path="jquery-ui-1.10.3.custom.js" />
/// <reference path="game.js" />

var debugContainer = null;
var theGame = null;
var autoStart = false;
var debugMode = false;

$(document).ready(function () {
  debugContainer = $("#debug");

  var minHeight = parseInt($(document).height()) - 35;
  var minWidth = 180;
  $("#screenContainer").resizable({
    aspectRatio: 0.55,
    maxHeight: minHeight,
    minWidth: minWidth,
  });

  if (debugMode) {
    $("#debug").css("display", "block");
    $("#buttonContainer").css("display", "block");
  }
});

$(document).ready(function () {
  $("#startGameBtn, #restartGameBtn").on("click", function () {
    startGame();
  });

  $("#startGameBtn, #restartGameBtn").bind("touchstart", function () {
    startGame();
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 13) {
      // ENTER Key
      startGame();
    }
  });

  if (autoStart) {
    startGame();
  }
});

function startGame() {
  $("#screenContainer").LoadingOverlay("show");
  // Start the game
  theGame = undefined;
  theGame = new Game();

  // Hide the Interface
  $("#landingPageContainer").css("display", "none");
  $("#gameOverContainer").css("display", "none");

  // Show the game area
  $("#screen").css("visibility", "visible");
}

function debug(text) {
  $(debugContainer).append("<p>" + text + "</p>");
}
