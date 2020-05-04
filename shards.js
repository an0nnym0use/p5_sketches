var acceleration = 0.00981;
var shardCount = 500;
var shards = [];

let scDark, scLight;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(0);
    noStroke();
    scDark = color(187, 134, 202);
    scLight = color(253, 220, 255);
    bgDark = color(0, 0, 0);
    bgLight = color(1, 0, 51)
    setGradient(bgDark, bgLight);
    colorMode(RGB);
    //frameRate(30);
    //createLoop({duration:20, gif:true});

    for (i = 0; i < shardCount; i++) {
        shards.push(new Shard());
    }
}

function draw() {
    clear();
    background(0);
    setGradient(bgDark, bgLight);
    shards.forEach(function(d) {
        d.drawAndFall();
    });
}

function Shard() {
    this.initX = function() {
        this.x = random() * width;
    };
    this.initY = function() {
        this.y = -random() * height / 3;
    };

    this.initX();
    this.y = random() * (height+100);

    this.speed = random(1, 2);

    this.drawAndFall = function() {
        this.draw();
        this.fall();
    };

    this.draw = function() {
        var shardColour = lerpColor(scDark,scLight,random(1));
        this.colour = shardColour
        fill(this.colour)
        quad(this.x, this.y-20, this.x-5, this.y-10, this.x, this.y, this.x+5, this.y-10);
    };

    this.fall = function() {
        if (this.y < height+20) {
            this.y += this.speed;
            this.speed += (acceleration*random(1,2));
        } else {
            this.speed = random(0.8, this.speed*1.25);
            this.initY();
            this.initX();
        }
    };
}

function setGradient(bgDark, bgLight) {
    noFill();
    for(var y=0; y<height; y++) {
        var inter = map(y, 0, height, 0, 1);
        var c = lerpColor(bgDark, bgLight, inter);
        stroke(c);
        line(0, y, width, y);

        noStroke();
    }
}
