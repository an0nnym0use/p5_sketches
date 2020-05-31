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

function draw() {
    clear();
    background(0);
}
