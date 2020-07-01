//mobile-only?

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    cnv.style('display', 'block');
    background(0);
    noStroke();

    // frameRate(30);
    // createLoop({duration:7, gif:true});
}

var offset = 0;
let h = 0;

function draw() {
    background(155);
    //Waves
    wave('#D4E7F1', height-600, 15, 11, 0.4);
    wave('#D4E012', height-400, 38, 25, -0.2);
    wave('#3021B9', height-300, 20, 43, 1/3);
    wave('#08D453', height-200, 24, 16, -0.5);
    wave('#E51212', height-100, 11, 22, 0.1);

    ball('#4B4D33', 3, 40, width / 2 + 17, height - 600, 1.3, -1);
    ball('#4B4D33', 2, 70, width / 2 - 152, height - 405, 0.7, 1.5);
    ball('#731073', 1, 30, width / 2 - 45, height - 262, 1, 0.6);
    ball('#38F147', 5, 50, width / 2 + 125, height - 204, 0.4, 1);
    ball('#C9813F', 3, 20, width / 2 + 88, height - 78, 1.2, 3);

    offset++;

}

function wave(colour, bY, size, amp, speed) {
    beginShape();
    fill(colour);
    for (x = 0; x < width; x++) {
        push();
        var y = bY + amp * sin(x/size + speed*offset);
        vertex(x, y);
        pop();
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function ball(colour, speed, radius, pX, pY, h, size) {
    h = 250 * abs(h*sin(speed*frameCount / (40*size)));
    fill(colour);
    ellipse(pX, pY - h, radius);
}
