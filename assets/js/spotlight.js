$(document).ready(function () {

  var spotlight = document.getElementById("spotlight");
  var spotlight_child = document.getElementById("spotlight-child");
  var main = document.getElementById("main");
  main.addEventListener("mousemove", moveSpotlight);
  main.addEventListener("touchmove", moveSpotlight);
  function moveSpotlight(e) {
    e.preventDefault();
    let pos, x, y;
    x = e.clientX - 150;
    y = e.clientY - 150;
    spotlight.style.left = x + "px";
    spotlight.style.top = y + "px";
    spotlight_child.style.left = x + "px";
    spotlight_child.style.top = y + "px";
  }

});