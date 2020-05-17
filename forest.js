function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var branchAngle = Math.PI*0.1; //Change joint angle slightly randomly
var detail = 12; //Vary the resolution
var lenDecay = 0.65;
var thickness = 2.5;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(0);
    col1 = color('#FF8A30');
    col2 = color('#213A7C');

    stroke(0);
    strokeWeight(thickness);

    frameRate(5);
    createLoop({duration:5, gif:false});
}

function draw() {
    setGradient(col1, col2);

    //Horizon Hills
    beginShape();
    for (x=0;x<width;x++) {
        var curveX = map(x, 0, width, 0, 7); //Last number is spikiness
        var y = 0.5*height*noise(curveX);
        vertex(x, y);
    }
    endShape();
    beginShape();
    for (x=0;x<width;x++) {
        var curveX = map(x, 0, width, 0, 3);
        var y = height/3+0.2*height*noise(curveX);
        vertex(x, y);
    }
    endShape();

    //Trees
    translate(width/2, height); //Origin is the middle-bottom now
    for (x=-width/2;x<width;x+=400) {
        for (y=-height/2;y<height/2;y+=100) {
            resetMatrix();
            translate(width/2+random(-300,300), height+random(100));
            treeInit();
            drawBranch(random(50,70), x, y);
        }
    }

    //Sun
    push();
    resetMatrix();
    fill('#FFFBC8');
    noStroke();
    let sunX = random(50,width-50);
    let sunY = random(90,190);
    ellipse(sunX, sunY, 150);
    fill('#FFFBC880');
    ellipse(sunX, sunY, 170);
    pop();

    noLoop();
}

function treeInit() {
    branchAngle = Math.PI*0.1; //Change joint angle slightly randomly
    detail = 12; //Vary the resolution
    lenDecay = 0.75;
}

function drawBranch(length, x, y) {
    translate(x, y); //Sets base of tree to specified coords
    strokeWeight(thickness);
    line(0, 0, 0, -length);
    translate(0, -length); //Now it draws from the ends of the newest line/s
    if (length>detail+random(2)) { //Detail = minimum branch length (resolution)
        push();
        rotate(branchAngle*random(0.7,1.3));
        drawBranch(length*(lenDecay+random(0.1)), 0, 0); //Length decreases
        pop();
        push();
        rotate(-branchAngle*random(0.7,1.3)); //Other side = negative angle
        drawBranch(length*(lenDecay+random(0.1)), 0, 0);
        pop();
    }
}

function setGradient(col1, col2) {
    noFill();
    for(var y=0; y<height; y++) {
        var inter = map(y, 0, height, 0, 1);
        var c = lerpColor(col1, col2, inter);
        stroke(c);
        line(0, y, width, y);
    }
    stroke(0);
}
