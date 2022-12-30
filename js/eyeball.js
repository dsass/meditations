let triangles = [];
let colors = [];
let blinkCount = 0.0;
let blinkReverse = false;
let eyeColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  eyeColor = color(161, 107, 6, 200);
  background(255);
  noCursor();
  stroke(0);

  generateEye();
  eyeBall();
  eyeShape();
}

function draw() {
  push();
  background(255);
  stroke(0);

  drawEye();
  if (width > 500) {

    translate(-width / 2, -height / 2);
    scale(2);
  }
  eyeBall();
  checkBlink();
  pop();

  if(frameCount <= 150) {
    fill(150);
    textSize(25);
    textFont('Helvetica');
    text("use your mouse, and clicks", 2*width/5, 50);
  }

}

function newEyeColor() {
  let eyeColors = [];
  let alpha = 200;
  eyeColors.push(color(161, 107, 6, alpha));
  eyeColors.push(color(101, 171, 224, alpha));
  eyeColors.push(color(164, 196, 132, alpha));
  eyeColors.push(color(99, 54, 26, alpha));
  return eyeColors[floor(random() * 4)];
}

function mouseClicked() {
  if (blinkCount == 0) {
    blinkCount++;
  }
}

function checkBlink() {
  if (blinkCount != 0 || (frameCount % 500) == 0) {
    blink();
  } else {
    eyeShape();
  }
}

function drawEye() {
  push();
  noStroke();
  for (let i = 0; i < triangles.length; i++) {
    let tri = triangles[i];
    fill(colors[i]);
    triangle(tri[0], tri[1], tri[2], tri[3], tri[4], tri[5]);
  }
  pop();
}

function generateEye() {
  eyeColor = newEyeColor();
  triangles = [];
  colors = [];
  let numShapes = random(4, 20);
  for (let i = 0; i < numShapes; i++) {
    generateTriangle(i, numShapes);
  }
}

function generateTriangle(i, numShapes) {
  let alpha = 50; //80
  colors.push(color(random(255), random(255), random(255), alpha));
  let side = map(floor(random(0, 2)), 0, 1, 0, width);
  let minx = width / 5; //520
  let maxx = width * 4 / 5; // 1160
  triangles.push([side, height / 2, random(minx, maxx), 0, random(minx, maxx), height]);
}

function eyeBall() {
  let offsetX = map(mouseX, 0, width, -80, 80);
  let offsetX2 = map(mouseX, 0, width, -100, 100);
  let offsetY = map(mouseY, 0, height, -30, 30);
  let offsetY2 = map(mouseY, 0, height, -50, 50);

  eyeColor.setAlpha(255);
  stroke(eyeColor);
  eyeColor.setAlpha(200);
  fill(eyeColor);
  circle(width / 2 + offsetX, height / 2 + offsetY, 80);
  stroke(0);
  fill(0, 0, 0, 200);
  circle(width / 2 + offsetX2, height / 2 + offsetY2, 33);
}

function eyeShape() {
  push();
  stroke(0);
  fill(0);
  translate(width / 2, height / 2);
  scale(2);

  beginShape();
  vertex(-width / 2, -height / 2);
  vertex(-width / 2, height / 2);
  vertex(width / 2, height / 2);
  vertex(width / 2, -height / 2);

  beginContour();
  vertex(-80, 0);
  bezierVertex(-30, -50, 30, -50, 80, 0);
  bezierVertex(30, 50, -30, 50, -80, 0)
  endContour();

  endShape(CLOSE);
  pop();
}

function blink() {
  push();
  fill(0);
  translate(width / 2, height / 2);
  scale(2);

  beginShape();
  vertex(-width / 2, -height / 2);
  vertex(-width / 2, height / 2);
  vertex(width / 2, height / 2);
  vertex(width / 2, -height / 2);

  beginContour();
  vertex(-80, 0);
  let smoothedCount = map(blinkCount, 0.0, 12.0, 0.0, 1.0);
  if (blinkReverse) {
    smoothedCount = min(1.0, map(smoothedCount, 0.0, 1.0, 0.0, 1.1));
    smoothedCount = smoothedCount * smoothedCount * (3 - 2 * smoothedCount);
  } else {
    smoothedCount *= smoothedCount;
  }
  let v2 = map(smoothedCount, 0.0, 1.0, 50.0, 0.0);
  let v1 = map(smoothedCount, 0.0, 1.0, -50.0, 0.0);
  bezierVertex(-30, v1, 30, v1, 80, 0);
  bezierVertex(30, v2, -30, v2, -80, 0)
  endContour();

  endShape(CLOSE);
  pop();
  if (blinkReverse) {
    blinkCount--;
  } else {
    blinkCount += 4;
  }
  if (blinkCount >= 12) {
    generateEye();
    blinkReverse = true;
  } else if (blinkCount == 0) {
    blinkReverse = false;
  }
}
