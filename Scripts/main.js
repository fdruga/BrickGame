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

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    setMobileStyles();
  } else {
    setPCStyles();
  }
});

$(document).ready(function () {
  $("#startGameBtn, #restartGameBtn").on("click", function () {
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

function setMobileStyles() {
  const width = document.body.clientWidth - 100;
  const height = width / 0.55;
  $("#screenContainer").width(width);
  $("#screenContainer").height(height);

  $("#landingPageContainer .uiButton").css("font-size", "100px");
  $("#landingPageContainer .uiTip").css("display", "none");

  $("#gameOverContainer .uiButton").css("font-size", "100px");
  $("#gameOverContainer h1").css("font-size", "100px");
  $("#gameOverContainer p").css("font-size", "75px");
  $("#gameOverContainer .uiTip").css("display", "none");

  $("#gameStatusContainer")
    .css("height", "2em")
    .css("line-height", "2em")
    .css("font-size", "30px")
    .css("margin", "0 auto");
}

function setPCStyles() {
  const width = 300;
  const height = width / 0.55;
  $("#screenContainer").width(width);
  $("#screenContainer").height(height);
}
