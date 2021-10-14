/// <reference path="jquery-1.9.1.js" />
/// <reference path="jquery-ui-1.10.3.custom.js" />
/// <reference path="game.js" />

var debugContainer = null;

$(document).ready(function () {
  debugContainer = $("#debug");

  var minHeight = parseInt($(document).height()) - 35;
  var minWidth = 180;
  $("#screenContainer").resizable({
    aspectRatio: 0.55,
    maxHeight: minHeight,
    minWidth: minWidth,
  });
});

$(document).ready(function () {
  $("#startGameBtn").on("click", function () {
    startGame();
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 32) {
      startGame();
    }
  });
});

function startGame() {
  // Start the game
  var theGame = new Game();

  // Hide the Interface
  $("#landingPageContainer").css("display", "none");

  // Show the game area
  $("#screen").css("visibility", "visible");
}

function debug(text) {
  $(debugContainer).append("<p>" + text + "</p>");
}
