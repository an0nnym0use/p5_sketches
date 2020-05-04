

function preload(){
    img = loadImage('assets/gz_favicon.jpg');
}

var z = 1;
var speed = 0.001;

let mode = 0 // 0 = towards, 1 = away

function windowResized() {
    resizeCanvas(windowHeight, windowHeight); //Square
}

function setup() {
    let cnv = createCanvas(windowHeight, windowHeight); //Square
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(255);
    noStroke();
}

function limitZ() {
    if (z < 1) {
        z = 1
    }
    if (z > 20) {
        z = 20
    }
}
//
function draw() {
    //background(255);

    var midUpperY = mouseY/z;
    var midLeftX = mouseX/z;
    var midLowerY = width-(width-mouseY)/z; //'width' because it is a square
    var midRightX = width-(width-mouseX)/z;

    fill(98, 119, 240);
    triangle(0, 0, width, 0, mouseX, mouseY); //Up

    fill(67, 93, 240);
    triangle(width, 0, width, height, mouseX, mouseY); //Right

    fill(31, 43, 110);
    triangle(width, height, 0, height, mouseX, mouseY); //Left

    fill(43, 61, 161);
    triangle(0, height, 0, 0, mouseX, mouseY); //Down

    fill(108, 129, 250);
    quad(midLeftX, midUpperY, midRightX, midUpperY, midRightX, midLowerY, midLeftX, midLowerY); //Face
    imageMode(CORNERS);
    image(img, midLeftX, midUpperY, midRightX, midLowerY);

    if (mode == 0) {
        z += speed*z*z*z;
    } else {
        z -= speed*z*z*z;
    }

    checkMouse();
    limitZ();
}

function checkMouse() {
    if (mouseIsPressed) {
        mode = 1;
    } else {
        mode = 0;
    }
}
