/// <reference path="jquery-1.9.1.js" />

$(document).ready(function () {
  //alert(bits[0][0]);
});

function Bit(isActive) {
  var bit = $("<div></div>");
  if (isActive) {
    isActive = true;
    $(bit).addClass("bitActive");
  }
  return bit;
}
