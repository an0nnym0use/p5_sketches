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

    frameRate(30);
    createLoop({duration:8, gif:true});
}

var n = 0;

function draw() {
    setGradient(sky1, sky2, 0, height/2, height); //Sky

    //Hills
    drawHills('#7D7FB45D', 0.5, 5, height/2, height/2-100);
    drawHills('#7D7FB45D', 0.3, 1, height/2+400, height/2+300, 70);
    drawHills('#7D7FB45D', 0.3, 1, height/2+800, height/2+700, 50);

    //Thing
    push();
    noStroke();
    fill('#00000080');
    ellipse(mouseX, mouseY, 60, 60+8*n);
    fill('#000000');
    ellipse(mouseX, mouseY, 40, 40+8*n);
    fill('#000000');
    arc(mouseX, mouseY, 42, 42+8*n, frameCount/10, 1/3*Math.PI+frameCount/10);
    arc(mouseX, mouseY, 42, 42+8*n, 2/3*Math.PI+frameCount/10, Math.PI+frameCount/10);
    arc(mouseX, mouseY, 42, 42+8*n, 4/3*Math.PI+frameCount/10, 5/3*Math.PI+frameCount/10);
    pop();
    //n+=0.02*sin(frameCount/100); //Automatic Mode
    n=4.5**(1.3*mouseY/height);
}

function drawHills(colour, heightPercentage, spikiness, yConstrain, yOffset, trees) {
    beginShape();
    fill(colour);
    for (x=0;x<width;x++) {
        push();
        var curveX = map(x, 0, width, 0, spikiness);
        var y = heightPercentage*height*noise(curveX)+yOffset -height/2;

        y = constrain(y, -height, yConstrain);
        n = constrain(n, 0.01, Infinity);
        y+=0.001*width*(700/dist(mouseX, 0, x, 100))**(n);

        vertex(x, y);
        pop();
        if (trees) {
            treeCheck(x, y, yConstrain, trees);
        }
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function treeCheck(x, y, yConstrain, freq) {
    if (x % freq === 1) {
        //Pos
        x+=4-8*noise(x);
        //Shake
        x+=1000*(n-1)/dist(mouseX, mouseY, x, height)*noise(x,frameCount)*(2*round(noise(x))-1);
        y+=100/dist(mouseX, mouseY, x, height)*noise(y,frameCount);
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
