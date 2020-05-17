function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var n = 0;

var branchAngle = Math.PI*0.1; //Change joint angle slightly randomly
var detail = 12; //Vary the resolution
var lenDecay = 0.65;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(0);
    col1 = color('#FFFCAB');
    col2 = color('#FF8A30');
    // frameRate(30);
    // createLoop({duration:7, gif:true});
}

function draw() {
    branchAngle = Math.PI*random(0.08,0.12); //Change joint angle slightly randomly
    detail = 12 + random(-2,2); //Vary the resolution
    lenDecay = 0.75 + random(-0.1,0.1);
    if (n<1) {
        setGradient(col1, col2);
        translate(width/2, height); //Origin is the middle-bottom now
        drawBranch(120);
    }
}

function drawBranch(length) {
    line(0, 0, 0, -length);
    translate(0, -length); //Now it draws from the ends of the newest line/s
    if (length>detail) { //Detail = minimum branch length (resolution)
        push();
        rotate(branchAngle*random(0.8,1.2));
        drawBranch(length*lenDecay); //Length decreases
        pop();
        push();
        rotate(-branchAngle*random(0.8,1.2)); //Other side = negative angle
        drawBranch(length*lenDecay);
        pop();
    }
    n++;
}

function setGradient(col1, col2) {
    noFill();
    for(var y=0; y<height; y++) {
        var inter = map(y, 0, height-200, 0, 1);
        var c = lerpColor(col1, col2, inter);
        stroke(c);
        line(0, y, width, y);

        noStroke();
    }
}
