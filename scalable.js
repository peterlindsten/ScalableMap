function Scalable() {
  var canvas = $("#primary");
  if (canvas[0].getContext) {
    var ctx = canvas[0].getContext("2d");
  }

  var width = 300;
  var height = 300;

  var defaultBoxHeight = 20;
  var defaultBoxWidth = 50;
  var currentScale = 1;
  var currentTransX = 0;
  var currentTransY = 0;

  var mouseX = 0;
  var mouseY = 0;
  var mousePressed = false;
  var dragging = false;
  var drag = false;

  var loop = setInterval(function() {
    draw();
}, 30);

  canvas.mousemove(function(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  })

  var scaleCtx = function(amount) {
    currentScale *= amount;
    console.log(currentScale);
  }

  var mouseWheelHandler = function(e) {
    var e = window.event;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    console.log(delta);

    if(delta > 0) { // zoom in
      scaleCtx(1.1);
    } else if (delta < 0) { // zoom out
      scaleCtx(0.9);
    }
    return false;
  }

  canvas[0].addEventListener("mousewheel", mouseWheelHandler, false);
	// Firefox
	canvas[0].addEventListener("DOMMouseScroll", mouseWheelHandler, false);

  canvas.mousedown(function() {
    mousePressed = true;
  }).mouseup(function() {
    mousePressed = false;
    dragging = false;
  });

  var draw = function() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.scale(currentScale, currentScale);
    ctx.translate(currentTransX, currentTransY);
    if (mousePressed) {
      if (!drag) {
        startX = mouseX - currentTransX;
        startY = mouseY - currentTransY;
      }
      if (!dragging) {
        dragging = true;
        drag = true;
      }
    } else {
      drag = false;
    }
    if (drag) {
      currentTransX = mouseX - startX;
      currentTransY = mouseY - startY;
    }

    console.log("draw scale: " + currentScale);
    ctx.strokeStyle = "rgb(0, 0, 0, 1)";
    ctx.font = "16px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";


    ctx.strokeRect(10, 10, defaultBoxWidth, defaultBoxHeight);
    ctx.fillText("Dell", 25+10, 10+10+1);
    ctx.strokeRect(100, 60, defaultBoxWidth, defaultBoxHeight);

    ctx.strokeRect(-30, -10, defaultBoxWidth, defaultBoxHeight);

    ctx.beginPath();
    ctx.moveTo(60, 20);
    ctx.lineTo(100, 70);
    ctx.stroke();
  }

  draw();
}

$(document).ready(function() {
  Scalable();
})
