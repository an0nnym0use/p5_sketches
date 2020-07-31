function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  midX = windowWidth/2;
  midY = windowHeight/2;
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.position(0, 0);
  cnv.style('z-index','-1');

  // frameRate(30);
  // createLoop({duration:16, gif:true});

  noStroke();
  colorMode(HSB);

  hue_slider = createSlider(0, 360, 140, 1);
  hue_slider.position(50, 8);
  hue_slider.style('width', '100px');
  hue_label = createDiv('Hue');
  hue_label.style('color', 'white')
  hue_label.position(10, 10);

  reset();
}

function reset() {
  background(0);
  hue = hue_slider.value();
  balls = [];
  balls.push(new Ball(color(hue, 100, 100), 60, 0, 0, 0, 2, 100));

}

function draw() {
  if (hue != hue_slider.value()) {
    reset();
  }
  background(0);
  for (i=0;i<balls.length;i++) {
    balls[i].move();
    balls[i].display();
  }
}

class Ball {
  constructor(col, r, x, y, z, v, recur) {
    this.r = r;
    this.col = col;
    this.x = x;
    this.y = y;
    this.z = z;
    this.v = v;
    if (recur>0) {
      let newR = random(30, 100);
      balls.push(new Ball(color(hue+random(-20,20), random(80,100), random(50, 100)), newR, this.r, 0, 0, random(-10, 10), recur-1));
    }
  }
  move() {
    rotateX(this.v*this.r*frameCount / 70000);
    rotateY(this.v*this.r*frameCount / 90000);
    rotateZ(this.v*this.r*frameCount / 100000);
  }
  display() {
    fill(this.col);
    translate(this.x*0.8, this.y*0.8, this.z*0.8);
    sphere(this.r);
  }
}
