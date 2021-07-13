"use strict";

// Global Variables
let canvasImage = null;
let imageStatus = null;
let grayImage = null;
let grayStatus = null;
let redImage = null;
let redStatus = null;
let sepiaImage = null;
let sepiaStatus = null;
let rainbowImage = null;
let rainbowStatus = null;
let blurImage = null;
let blurStatus = null;
let fileInput = document.getElementById("imageFile");
let imageCanvas = document.getElementById("canvas");
let context = imageCanvas.getContext("2d");

// Create new image to use for each filter

// Create default canvas image
function loadImage() {
  canvasImage = new SimpleImage(fileInput);
  clearCanvas();
  canvasImage.drawTo(imageCanvas);
  imageStatus = true;
  grayImage = new SimpleImage(fileInput);
  grayStatus = false;
  redImage = new SimpleImage(fileInput);
  redStatus = false;
  sepiaImage = new SimpleImage(fileInput);
  sepiaStatus = false;
  rainbowImage = new SimpleImage(fileInput);
  rainbowStatus = false;
  blurImage = new SimpleImage(fileInput);
  blurStatus = false;
}

// Modify and or display gray image
function makeGray() {
  if (grayImage == null || !grayImage.complete()) {
    alert("Image not loaded");
  } else {
    if (grayStatus != true) {
      for (var pixel of grayImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
      }
      clearCanvas();
      grayImage.drawTo(imageCanvas);
      grayStatus = true;
      console.log("grayImage Proccessed");
    } else {
      grayImage.drawTo(imageCanvas);
      console.log("grayImage not Proccessed");
    }
    if (imageStatus != null) {
      imageStatus = false;
    }
  }
}

// Modify and or display red image
function makeRed() {
  if (redImage == null || !grayImage.complete()) {
    alert("Image not loaded");
  } else {
    if (redStatus != true) {
      for (var pixel of redImage.values()) {
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
      clearCanvas();
      redImage.drawTo(imageCanvas);
      redStatus = true;
      console.log("redImage proccessed");
    } else {
      redImage.drawTo(imageCanvas);
      console.log("redImage not Proccessed");
    }
    if (imageStatus != null) {
      imageStatus = false;
    }
  }
}

// Modify and or display sepia image

function timeMachine() {
  if (sepiaImage == null || !sepiaImage.complete()) {
    alert("Image not loaded");
  } else {
    if (sepiaStatus != true) {
      for (var pixel of sepiaImage.values()) {
        let red = pixel.getRed();
        let green = pixel.getGreen();
        let blue = pixel.getBlue();
        let tr = 0.393 * red + 0.769 * green + 0.189 * blue;
        let tg = 0.349 * red + 0.686 * green + 0.168 * blue;
        let tb = 0.272 * red + 0.534 * green + 0.131 * blue;
        if (tr > 255) {
          pixel.setRed(255);
        } else {
          pixel.setRed(tr);
        }
        if (tg > 255) {
          pixel.setGreen(255);
        } else {
          pixel.setGreen(tg);
        }
        if (tb > 255) {
          pixel.setBlue(255);
        } else {
          pixel.setBlue(tb);
        }
      }
      clearCanvas();
      sepiaImage.drawTo(imageCanvas);
      sepiaStatus = true;
      console.log("sepiaImage Proccessed");
    } else {
      sepiaImage.drawTo(imageCanvas);
      console.log("sepiaImage not Proccessed");
    }
    if (imageStatus != null) {
      imageStatus = false;
    }
  }
}

// Modify and or display rainbow image
function makeRainbow() {
  if (rainbowImage == null || !rainbowImage.complete()) {
    alert("Image not loaded");
  } else {
    if (rainbowStatus != true) {
      for (var pixel of rainbowImage.values()) {
        let ypos = pixel.getY();
        let height = rainbowImage.getHeight();
        let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        // Red
        if (ypos < height / 7) {
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
        // Orange
        else if (ypos < (2 * height) / 7) {
          if (avg < 128) {
            pixel.setRed(2 * avg);
            pixel.setGreen(0.8 * avg);
            pixel.setBlue(0);
          } else {
            pixel.setRed(255);
            pixel.setGreen(1.2 * avg - 51);
            pixel.setBlue(2 * avg - 255);
          }
        }
        // Yellow
        else if (ypos < (3 * height) / 7) {
          if (avg < 128) {
            pixel.setRed(2 * avg);
            pixel.setGreen(2 * avg);
            pixel.setBlue(0);
          } else {
            pixel.setRed(255);
            pixel.setGreen(255);
            pixel.setBlue(2 * avg - 255);
          }
        }
        // Green
        else if (ypos < (4 * height) / 7) {
          if (avg < 128) {
            pixel.setRed(0);
            pixel.setGreen(2 * avg);
            pixel.setBlue(0);
          } else {
            pixel.setRed(2 * avg - 255);
            pixel.setGreen(255);
            pixel.setBlue(2 * avg - 255);
          }
        }
        // Blue
        else if (ypos < (5 * height) / 7) {
          if (avg < 128) {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(2 * avg);
          } else {
            pixel.setRed(2 * avg - 255);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(255);
          }
        }
        // Indigo
        else if (ypos < (6 * height) / 7) {
          if (avg < 128) {
            pixel.setRed(0.8 * avg);
            pixel.setGreen(0);
            pixel.setBlue(2 * avg);
          } else {
            pixel.setRed(1.2 * avg - 51);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(255);
          }
        }
        // Violet
        else {
          if (avg < 128) {
            pixel.setRed(1.6 * avg);
            pixel.setGreen(0);
            pixel.setBlue(1.6 * avg);
          } else {
            pixel.setRed(0.4 * avg + 153);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(0.4 * avg + 153);
          }
        }
      }
      clearCanvas();
      rainbowImage.drawTo(imageCanvas);
      rainbowStatus = true;
      console.log("rainbowImage proccessed");
    } else {
      rainbowImage.drawTo(imageCanvas);
      console.log("rainbowImage not Proccessed");
    }
    if (imageStatus != null) {
      imageStatus = false;
    }
  }
}

// Canvas Reset to unmodified image
function reset() {
  if (imageStatus == true) {
    console.log("Original image already displayed");
  } else if (imageStatus == null) {
    alert("Image not loaded");
  } else {
    clearCanvas();
    canvasImage.drawTo(imageCanvas);
    imageStatus = true;
  }
}

// Clear canvas function
function clearCanvas() {
  context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  if (imageStatus != null) {
    imageStatus = false;
  }
}

// Code Test Section
function test() {
  console.log(
    "Check if canvasImage is equal to grayImage",
    canvasImage == grayImage
  );
  console.log(
    "Check if grayImage is equal to canvasImage",
    grayImage == canvasImage
  );
}
