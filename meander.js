function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(255);
    sky1 = color('#D7FEFF');
    sky2 = color('#89F7FB');

    noStroke();

    // frameRate(5);
    // createLoop({duration:5, gif:false});
}

var n = 1.6

function draw() {
    setGradient(sky1, sky2, 0, height/2, height); //Sky

    //Hills
    drawHills('#7D7FB45D', 0.5, 5, height/2, height/2-100, true, false);
    drawHills('#7D7FB45D', 0.3, 1, height/2+400, height/2+300, true, true);
    drawHills('#7D7FB45D', 0.3, 1, height/2+800, height/2+700, true, true);

    //Sun
    // push();
    // resetMatrix();
    // fill('#FFFBC8');
    // noStroke();
    // ellipse(sunX, sunY, 150);
    // fill('#FFFBC880');
    // ellipse(sunX, sunY, 170);
    // pop();
    if (n<=2.748||true) {
        n+=0.002*sin(frameCount/250);
    }
}

function drawHills(colour, heightPercentage, spikiness, yConstrain, yOffset, taper, trees) {
    beginShape();
    fill(colour);
    for (x=0;x<width;x++) {
        push();
        var curveX = map(x, 0, width, 0, spikiness);
        var y = heightPercentage*height*noise(curveX)+yOffset -height/2;
        y = constrain(y, 0, yConstrain);
        if (taper===true) {
            if (n<2.85) {
                push();
                y-=0.001*(dist(mouseX, 0, x, 0))**n;
                pop();
            }
        }
        if (trees===true) {
            treeCheck(x, y, yConstrain);
        }
        vertex(x, y);
        pop();
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function treeCheck(x, y, yConstrain) {
    if (x % 50 === 0) {
        x+=noise(x,y)*7*(1+10/y);
        y+=noise(y,x)*3;
        push();
        fill('#008742');
        triangle(x-8, y-16, x+8, y-16, x, y-48);
        fill('#211400');
        rect(x-2, y+2, 4, -18);
        pop();
    }
}

function setGradient(col1, col2, startY, endY, stopGrad) {
    for(var y=startY; y<stopGrad; y++) {
        var inter = map(y, startY, endY, 0, 1);
        var c = lerpColor(col1, col2, inter);
        stroke(c);
        line(startY, y, width, y);
    }
    noStroke();
}
