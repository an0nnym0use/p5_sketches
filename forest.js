function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var branchAngle = Math.PI*0.1; //Change joint angle slightly randomly
var detail = 12; //Vary the resolution
var lenDecay = 0.65;
var thickness = 2;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(0);
    col1 = color('#213A7C');
    col2 = color('#FF8A30');

    stroke(0);
    strokeWeight(2);
    // frameRate(30);
    // createLoop({duration:7, gif:true});
}

function draw() {
    setGradient(col1, col2);
    translate(width/2, height); //Origin is the middle-bottom now

    for (x=-width/2;x<width;x+=400) {
        for (y=-height/2;y<height/2;y+=100) {
            resetMatrix();
            translate(width/2+random(-300,300), height+random(-100,100));
            randomise();
            drawBranch(60, x, y);
        }
    }
    noLoop();
}

function randomise() {
    branchAngle = Math.PI*0.1; //Change joint angle slightly randomly
    detail = 12 + random(-2,2); //Vary the resolution
    lenDecay = 0.75 + random(-0.1,0.1);
}

function drawBranch(length, x, y) {
    translate(x, y); //Sets base of tree to specified coords
    strokeWeight(thickness);
    line(0, 0, 0, -length);
    translate(0, -length); //Now it draws from the ends of the newest line/s
    if (length>detail) { //Detail = minimum branch length (resolution)
        push();
        rotate(branchAngle*random(0.7,1.2));
        drawBranch(length*lenDecay, 0, 0); //Length decreases
        pop();
        push();
        rotate(-branchAngle*random(0.8,1.2)); //Other side = negative angle
        drawBranch(length*lenDecay, 0, 0);
        pop();
    }
}

function setGradient(col1, col2) {
    noFill();
    for(var y=0; y<height; y++) {
        var inter = map(y-300, 0, height-300, 0, 1);
        var c = lerpColor(col1, col2, inter);
        stroke(c);
        line(0, y, width, y);
    }
    stroke(0);
}
