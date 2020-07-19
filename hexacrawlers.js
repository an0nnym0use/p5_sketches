function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '-1');
    cnv.style('display', 'block');
    background(0);
    noStroke();

    // frameRate(30);
    // createLoop({duration:20, gif:true});

    angSlider = createSlider(15, 90, 60, 15);
    angSlider.position(56, 8);
    angSlider.style('width', '120px');
    angLabel = createDiv('Angle');
    angLabel.position(8, 10);
    angLabel.style('color', '#8888ff');
    angLabel.style('font-size', '16px');

    widSlider = createSlider(1, 6, 3, 1);
    widSlider.position(56, 28);
    widSlider.style('width', '120px');
    widLabel = createDiv('Width');
    widLabel.position(8, 30);
    widLabel.style('color', '#8888ff');
    widLabel.style('font-size', '16px');

    speSlider = createSlider(1, 5, 2, 1);
    speSlider.position(56, 48);
    speSlider.style('width', '120px');
    speLabel = createDiv('Speed');
    speLabel.position(8, 50);
    speLabel.style('color', '#8888ff');
    speLabel.style('font-size', '16px');

    colSlider = createSlider(0, 2, 1, 1);
    colSlider.position(56, 68);
    colSlider.style('width', '120px');
    colLabel = createDiv('Colour');
    colLabel.position(8, 70);
    colLabel.style('color', '#8888ff');
    colLabel.style('font-size', '16px');

    crawlerReset();
}

let angInc = 60;
let lineWidth = 3;
let speed = 2;
let colMode = 1;
let crawlers = [];

function crawlerReset() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    crawlers = [];
    angInc = angSlider.value();
    lineWidth = widSlider.value();
    speed = speSlider.value();
    colMode = colSlider.value();

    for (i=0;i<16;i++) {
        crawlers.push(new Crawler(0, 0, lineWidth,
        angInc*floor(random(360/angInc)),
        speed, 10, angInc, color(random(50,255),random(50,255),random(50,255)),
        colMode));
    }
}

class Crawler {
    constructor(x, y, w, d, speed, period, inc, col, colMode) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.speed = speed;
        this.period = period;
        this.inc = inc;
        this.width = w;
        this.age = 1;
        this.colMode = colMode;
        if (this.colMode>0) {
            this.col = col;
        } else {
            this.col = color(255);
        }
    }

    move() {
        this.x += cos(radians(this.d))*this.speed;
        this.y += sin(radians(this.d))*this.speed;
        if (this.age%this.period===0) {
            let rotate = this.inc*floor(random(360/this.inc));
            if (rotate!=180) {
                this.d += rotate;
            }
            if (this.colMode===2) {
                this.col = color(random(50,255),random(50,255),random(50,255));
            }
        }
        this.age++;
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(this.col);
        ellipse(0, 0, this.width);
        pop();
    }
}

function draw() {
    if (
    angInc !== angSlider.value() ||
    lineWidth !== widSlider.value() ||
    speed !== speSlider.value() ||
    colMode !== colSlider.value() ) {
        crawlerReset();
    }

    translate(width/2,height/2);
    for (i=0;i<crawlers.length;i++) {
        crawlers[i].move();
        crawlers[i].display();
    }
}
