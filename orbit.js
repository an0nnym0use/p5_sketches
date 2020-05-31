function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let resSlider;
asteroids = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    cnv.style('display', 'block');
    background(255);

    blendMode(LIGHTEST);
    bg1 = color('#A6F7AE30');
    bg2 = color('#EFFCCE30');
    setGradient(bg1, bg2);

    // frameRate(30);
    // createLoop({duration:7, gif:true});

    resSlider = createSlider(60, 1200, 600, 30);
    resSlider.position(10, 10);
    resSlider.style('width', '120px');

    asteroids.push(new Asteroid(0, 0, 200, 4, 8));
    for (i=0;i<4;i++) {
        asteroids.push(new Asteroid(random(-400, 400), random(-400, 400), random(10, 60), random(-18, 18), random(1, 5)));
    }
}

class Asteroid {
    constructor(x, y, r, rotSpeed, rockiness) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rotSpeed = rotSpeed;
        this.rockiness = rockiness;
        this.dAng = 0;
        stroke(0);
        fill(0);
    }

    move() {
        rotate(this.dAng);
        this.dAng-=0.002*this.rotSpeed;
    }

    display() {
        translate(this.x, this.y);
        let res = resSlider.value();
        push();
        drawingContext.globalCompositeOperation = 'normal';
        beginShape();
        for (let i=0;i<res;i++) {
            let ang = TWO_PI*i/res
            let dx = map(cos(ang), -1, 1, 0, this.rockiness);
            let dy = map(sin(ang), -1, 1, 0, this.rockiness); //Polar to cartesian
            noiseDetail(10, 0.4);
            let nose = noise(dx, dy)
            let dr = this.r + map(nose, 0, 1, -30, 30);
            let x = dr*cos(ang);
            let y = dr*sin(ang);
            vertex(x, y); //Draws a point
        }
        endShape(CLOSE);
        pop();
    }
}

function draw() {
    //clear();
    setGradient(bg1, bg2);
    translate(width/2, height/2);

    for (i=0;i<asteroids.length;i++) {
        asteroids[i].move();
        asteroids[i].display();
    }
}

function setGradient(col1, col2) {
    background(col1);
    for(var y=0; y<height; y++) {
        var inter = map(y, 0, height, 0, 1);
        var c = lerpColor(col1, col2, inter);
        stroke(c);
        line(0, y, width, y);
    }
}
