// let verts = [];
// let verts2 = [];
let d = 100;
let splats = [];
let colors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colors = [
    color(217,115,135),
    color(167,108,245),
    color(120,118,219),
    color(119,166,242),
    color(94,205,235)
  ];

  background(50);

  //   let x = 100;
  //   let y = 100;
  //   let t = 0;
  //   for (let i = 0; i < 63; i++) {
  //     x = -sin(t) * d;
  //     y = -cos(t) * d;
  //     t += 0.1;
  //     verts.push([x, y]);
  //     verts2.push([x, y]);


  //   }
  //   verts.push(verts[0]);
  //   verts2.push(verts[0]);
  // splats.push(new Splat(300, 100));

}

function draw() {
  background(20, 8);

  for(let i=0; i < splats.length; i++) {
    splats[i].drawSplat();
  }

  // translate(2.5 * d, d);

  //   noFill();
  //   beginShape();
  //   let t = 0

  //   let first = 0;
  //   curveVertex(verts[0][0], verts[0][1]);
  //   for (let i = 0; i < verts.length; i++) {
  //     let y_scalar = map(verts2[i][1], -100, 100, 0.1, 1);

  //     if (i == verts.length - 1) {
  //       stroke(255, 0, 0);
  //     }
  //     // ellipse(verts[i][0], verts[i][1], 3,3);
  //     stroke(0);
  //     curveVertex(verts[i][0], verts[i][1]);
  //     if (i != 0) {

  //       verts[i][1] += noise(verts2[i][0], verts2[i][1]) * y_scalar;
  //       // verts[i][0]+=(noise(t-1)-0.5)*0.3;
  //       verts[i][0] += (noise(verts[i][0], verts[i][1]) - 0.5) * 0.3;

  //     }

  //     t += 0.1

  // }

  // curveVertex(verts[verts.length - 1][0], verts[verts.length - 1][1]);
  // endShape();
  if(frameCount <= 150) {
    fill(150);
    textSize(25);
    textFont('Helvetica');
    text("use your mouse, and clicks", 2*width/5, 50);
  }
}

function mousePressed() {
  splats.push(new Splat(mouseX, mouseY));
}

function keyPressed() {
  if(keyCode == 32) {
    noLoop();
  }
}

class Splat {
  constructor(x, y) {
    this.verts = []; // actual drawn vertices
    this.verts2 = []; // original locations
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
    // this.color = random(colors);

    let a = 100;
    let b = 100;
    let t = 0;
    for (let i = 0; i < 63; i++) {
      a = -sin(t) * d;
      b = -cos(t) * d;
      t += 0.1;
      this.verts.push([a, b]);
      this.verts2.push([a+x, b+y]);


    }
    this.verts.push(this.verts[0]);
    this.verts2.push(this.verts2[0]);

  }

  drawSplat() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.color);
    beginShape();
    let t = 0

    let first = 0;
    vertex(this.verts[0][0], this.verts[0][1]);
    for (let i = 0; i < this.verts.length; i++) {
      let y_scalar = map(this.verts2[i][1]-this.y, -100, 100, 0.1, 0.5);
      if(this.verts2[i][1]-this.y < 5) {
        y_scalar = 0;
      }
      // console.log(this.verts[i][1]);
      // this.turnOnPoints(i);


      curveVertex(this.verts[i][0], this.verts[i][1]);
      if (i != 0) {

        this.verts[i][1] += noise(this.verts2[i][0], this.verts2[i][1]) * y_scalar;
        // this.verts[i][0]+=(noise(t-1)-0.5)*0.3;
        // this.verts[i][0] += (noise(this.verts2[i][0], this.verts2[i][1]) - 0.5) * y_scalar*0.1;
        // console.log((noise(this.verts2[i][0], this.verts2[i][1]) - 0.5) * y_scalar*0.3);

      }

      t += 0.1
    }

    vertex(this.verts[this.verts.length - 1][0], this.verts[this.verts.length - 1][1]);
    endShape();
    pop();
  }

  turnOnPoints(i) {
      if (i == this.verts.length - 1) {
        stroke(255, 0, 0);
      } else {
        stroke(0);
      }
      ellipse(this.verts[i][0], this.verts[i][1], 3,3);
      stroke(0);
      noStroke();
  }
}
