let opac = 8;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(600, 600);
  background(194, 178, 128);
  opac = 255;
  silhouette();
  opac = 20;

}

function draw() {
  if(frameCount >=200) {
    run();
  }
  else {
    background(20);
    fill(180);
    textSize(25);
    textFont('Helvetica');
    text("Do you ever feel like this?", width/4, height/2);
  }
}

function run() {
  background(194, 178, 128, 5);

  noStroke();

  silhouette();

  if((frameCount % 5) == 0) {
    for(let i=0; i < 10; i++) {
        lasers(i);

    }
  }
}

function lasers(i) {
  // noLoop();
  let halfx = width/2;
  let halfy = height/2;
  let spread = width/10

  let minx = width/4+random(-spread,spread);
  let maxx = (width*3/4)+random(-spread,spread);

  let miny = height/4+random(-spread,spread);
  let maxy = (height*3/4)+random(-spread,spread);

  if(i == 0) {
    minx = 0;
    maxx = width;
    miny = 0;
    maxy = height;
  }

  noFill();
  stroke(random(255),random(255),random(255), 100);
  strokeWeight(5);
  let x = random(minx,maxx);
  let y = random(miny,maxy);
  let x2 = random(minx,maxx);
  let y2 = random(y,maxy);
  let midX = random(minx,maxx);
  let midY = random(miny,maxy);
  beginShape();
  curveVertex(x,y);
  curveVertex(x,y);
  curveVertex(midX,midY)
  curveVertex(x2,y2);
  curveVertex(x2,y2);
  endShape();
}

function silhouette(){
  push();
  translate((width/2)-300, (height/2)-300);
  noStroke();
  fill(60,60,60, opac);
  let offset = 100
  beginShape();
  curveVertex(offset,height);
  curveVertex(offset,600);
  curveVertex(offset,450);
  curveVertex(200,420);
  curveVertex(600/2,380);
  curveVertex(400,420);
  curveVertex(600-offset,450);
  curveVertex(600-offset,600);
  curveVertex(600-offset,height);
  curveVertex(600-offset,height);
  endShape(CLOSE);

  fill(194, 178, 128);
  let armpit = 60;
  beginShape();
  curveVertex(offset+62, height);
  curveVertex(offset+62, height);
  curveVertex(offset+66, 600-armpit);
  curveVertex(offset+69, 600-armpit);
  curveVertex(offset+75, height);
  endShape(CLOSE);
  beginShape();
  curveVertex(600-(offset+63), height);
  curveVertex(600-(offset+63), height);
  curveVertex(600-(offset+65), 600-armpit);
  curveVertex(600-(offset+68), 600-armpit);
  curveVertex(600-(offset+73), height);
  endShape(CLOSE);

  pop();
  fill(30,30,30, opac);
  ellipse(width/2, height/2, 150, 200);
}
