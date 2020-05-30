function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    cnv.style('display', 'block');
    noFill();

    // frameRate(20);
    // createLoop({duration:7, gif:true});
}

let tiles = []

class Tile {
    constructor(x, y, w, ang, arcLength, thickness, colour) {
        push();
            translate(x, y);
            rotate(ang);
            stroke(colour);
            strokeWeight(thickness);
            arc(0, 0, w, w, -arcLength/2, arcLength/2);
            // push();
            //     stroke(255, 0, 0, 127);
            //     strokeWeight(1);             DEBUG LINES
            //     line(25, 0, 100, 0);
            // pop();
        pop();
    }
}

function draw() {
    clear();
    let col = constrain(width/height, 0, 100);
    colorMode(RGB, col, width, height);
    for (x=-width/2;x<width*2;x+=60) {
        for (y=-height/2;y<height*2;y+=60) {
            let ang = atan2(mouseY-y, mouseX-x);
            let distance = dist(mouseX, mouseY, x, y);
            arcLength = constrain(TWO_PI*(distance**2/4000000), 0.001, TWO_PI);
            thickness = constrain(20*(distance/800), 2, 6);
            colour = color(0.7*col, x, y);

            tiles.push(new Tile(x, y, 60, ang, arcLength, thickness, colour));
        }
    }
}
