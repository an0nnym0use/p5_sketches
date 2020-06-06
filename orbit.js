function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let resSlider;
asteroids = [];
specks = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    cnv.style('display', 'block');

    background(255);
    blendMode(BLEND);
    bg1 = color('#D8F7A650');
    bg2 = color('#FFF4C350');
    setGradient(bg1, bg2);

    // frameRate(30);
    // createLoop({duration:10, gif:true});

    resSlider = createSlider(60, 1200, 600, 30);
    resSlider.position(10, 10);
    resSlider.style('width', '120px');

    for (i=0;i<120;i++) {
        specks.push(new Speck(random(-19, width+20), random(-19, height+20), random(30, 100), random(0.2,1.2)));
    }

    asteroids.push(new Asteroid(0, 0, 0, 200, 2, 7));
    var r = 210;
    for (i=1;i<random(4, 5);i++) { //Still max. 4
        let w = random(15, 50);
        let rotPos = random(0, TWO_PI);
        let speed = random(-8, 8);
        let rockiness = random(-1,2)+map(random(0.3, 3), 0, 10, w/20, 1.5+w/10);
        r += 20+w+random(40, 100); //Min. distance from prev.
        //console.log(r);
        asteroids.push(new Asteroid(r*cos(rotPos), r*sin(rotPos), i*random(8, 12), w, speed, rockiness));
    }
}

class Asteroid {
    constructor(x, y, z, r, rotSpeed, rockiness) {
        this.x = x;
        this.y = y;
        this.z = z; //z-value is for distance effect
        this.r = r;
        this.rotSpeed = rotSpeed;
        this.rockiness = rockiness;
        this.dAng = 0;
        this.memory = [];
        this.memory.push({x: this.x, y: this.y});
        noStroke();
    }

    move() {
        rotate(this.dAng);
        this.dAng-=0.002*this.rotSpeed;
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(0, 255-map(this.z, 0, 100, 0, 255));
        let res = resSlider.value();
        beginShape();
        blendMode(OVERLAY);
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

class Speck {
    constructor(x, y, z, dir) {
        this.x = x;
        this.y = y;
        this.z = z; //again, for distance effect
        this.dir = dir;
    }

    move() {
        push();
        resetMatrix();
        this.x+=cos(this.dir);
        this.y+=sin(this.dir) + 0.08*sin(frameCount/50);

        if (this.x>width+20) {
            this.x-= 30+width; //Looparound for particles
        }
        if (this.y>height+20) {
            this.y-= 30+height;
        }
        if (this.x<-20) {
            this.x+= 30+width;
        }
        if (this.y<-20) {
            this.y+= 30+height;
        }
        pop();
    }

    display() {
        push();
        resetMatrix();
        translate(this.x, this.y);
        fill(0, this.z);
        quad(0, -5, -5, 0, 0, 5, 5, 0);
        pop();
    }
}

function draw() {
    //clear();
    setGradient(bg1, bg2);
    translate(width/2, height/2);

    for (i=0;i<specks.length;i++) {
        specks[i].move();
        specks[i].display();
    }

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
