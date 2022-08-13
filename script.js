var image = null;
var image1 = null;
var image2 = null;
var image3 = null;
var canvas;
var temp = null;

function loadImage() {
  var file = document.getElementById("finput");

  image = new SimpleImage(file);
  image1 = new SimpleImage(file);
  image2 = new SimpleImage(file);
  image3 = new SimpleImage(file);
  canvas = document.getElementById("can1");
  image.drawTo(canvas);
  temp = new SimpleImage(file);
  alert("Image uploaded successfully");
}

function resetCanvas() {
  if (image == null || !image.complete()) {
    alert("Image not uploaded");
  }
  image.drawTo(canvas);
}

//Red Hue
function doRainbow() {
  if (image == null || !image.complete()) {
    alert("Image not uploaded");
  }
  resetCanvas();
  var ht = image.getHeight() / 7;
  for (var pixel of temp.values()) {
    var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
    var y = pixel.getY();
    if (y < ht) {
      if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      } else {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    } else if (y >= ht && y < 2 * ht) {
      if (avg < 128) {
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y >= 2 * ht && y < 3 * ht) {
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y >= 3 * ht && y < 4 * ht) {
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= 4 * ht && y < 5 * ht) {
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= 5 * ht && y < 6 * ht) {
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2 * avg - 51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= 6 * ht && y <= 7 * ht) {
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    }
  }
  temp.drawTo(canvas);
}

function ensureInImage(coordinate, size) {
  // coordinate cannot be negative
  if (coordinate < 0) {
    return 0;
  }
  // coordinate must be in range [0 .. size-1]
  if (coordinate >= size) {
    return size - 1;
  }
  return coordinate;
}

function getPixelNearby(image, x, y, diameter) {
  var dx = Math.random() * diameter - diameter / 2;
  var dy = Math.random() * diameter - diameter / 2;
  var nx = ensureInImage(x + dx, image.getWidth());
  var ny = ensureInImage(y + dy, image.getHeight());
  return image.getPixel(nx, ny);
}

function doBlur() {
  resetCanvas();
  var output = new SimpleImage(image.getWidth(), image.getHeight());

  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
      var other = getPixelNearby(image, x, y, 10);
      output.setPixel(x, y, other);
    } else {
      output.setPixel(x, y, pixel);
    }
  }
  output.drawTo(canvas);
}

//Red Hue
function doRed() {
  if (image == null || !image.complete()) {
    alert("Image not uploaded");
  }
  resetCanvas();
  for (var pixel of image1.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  image1.drawTo(canvas);
}

function doPattern() {
  if (image == null || !image.complete()) {
    alert("Image not uploaded");
  }
  resetCanvas();
  var ht = image.getHeight();
  var bt = image.getWidth();
  var pt = bt / 10;
  for (var pixel of image2.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (y < ht / 25) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (y > ht / 2 - ht / 40 && y < ht / 2 + ht / 40) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (y > ht - ht / 25) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (x > bt - bt / 30) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (x < bt / 30) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (x > 2 * pt - 20 && x < 2 * pt + 20) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (x > 4 * pt - 20 && x < 4 * pt + 20) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (x > 6 * pt - 20 && x < 6 * pt + 20) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    } else if (x > 8 * pt - 20 && x < 8 * pt + 20) {
      pixel.setRed(95);
      pixel.setGreen(251);
      pixel.setBlue(241);
    }
  }
  image2.drawTo(canvas);
}

function clearCanvas() {
  doClear(canvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function doGray() {
  if (image == null || !image.complete()) {
    alert("Image not uploaded");
  }
  resetCanvas();
  for (var pixel of image3.values()) {
    var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
  image3.drawTo(canvas);
}