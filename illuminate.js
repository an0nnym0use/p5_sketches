function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(0);
    noStroke();

    // frameRate(30);
    // createLoop({duration:7, gif:true});
}

function draw() {
    clear();
    background(0);
    // rotate(radians(60));
    for (x=-2*width;x<2*width;x+=70) {
        for (y=-2*height;y<2*height;y+=70) {
            //mouse proximity checks
            var mouseDist = dist(x,y,mouseX,mouseY);
            var mouseFactor = (400/mouseDist)**6
            if (mouseFactor<0.4) {
                mouseFactor = 0.4;
            }

            let sound = noise(x, y, x*y);
            fill(255, sound*40*mouseFactor);
            ellipse(x,y,sound*70);
        }
    }
}
