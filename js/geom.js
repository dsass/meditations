let limit = 300;
let speed = 1;
let x = 300+limit;
let myScale = 1;
let optimalHeight = 600

function setup() {
  myMin = min(windowWidth, windowHeight);
  myScale = myMin/optimalHeight;
  createCanvas(myMin, myMin);
  rectMode(CENTER);
  noFill();
}

function draw() {
  push();
  scale(myScale);

  op = (sin(frameCount/100)+1)*3+1;
  background(0, floor(op));
  stroke(220);
  translate(optimalHeight/2, optimalHeight/2);
  strokeWeight(3);

  rect(0,0,optimalHeight-3, optimalHeight-3)

  squo(x, x-limit);

  x-=speed;
  if(x<= 300) {
    x=300+limit;
  }
  pop();
  // noLoop();
}

function squo(edge, offset) {
  line(-offset, -edge, -edge, -offset);
  line(-offset, edge, -edge, offset);
  line(offset, -edge, edge, -offset);
  line(offset, edge, edge, offset);

  line(-offset, -edge, -offset, edge);
  line(edge, offset, -edge, offset);
  line(offset, -edge, offset, edge);
  line(-edge, -offset, edge, -offset);

  if(edge < limit) {
    return;
  } else {
    squo(edge-(edge-offset), edge-(edge-offset)-((edge-offset)));
  }
}
