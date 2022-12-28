let angle = 0;
let update = 1;
let col;
let colors = [];

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(120);
  col = color(255, 230, 100, 90)
  colors = [
    color(255, 230, 100, 90),
    color(150, 255, 100, 90),
    color(230, 100, 255, 90),
    color(255, 100, 150, 90),
    color(100, 255, 230, 90),
    color(100, 150, 255, 90)
  ];
}

function draw() {
  background(120, 8);

  push();
  // noStroke();
  fill(col);
  translate(width/2,height/2);
  rotate(angle);

  rect(0,0, angle,5);

  pop();
  angle+=update;

  if(angle > 1000){
    update = -1
  } else if(angle < -1000) {
    update = 1;
  } else if(angle == 0) {
    // update = 1;
    col = random(colors);
  }


}

function mouseClicked() {
  update *= -1;
  col = random(colors);
}
