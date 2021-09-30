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
  var theGame = new Game();
});

function debug(text) {
  $(debugContainer).append("<p>" + text + "</p>");
}
