function preload(){

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
    midX = windowWidth/2;
    midY = windowHeight/2;
}

var ang = 0;

var k = 0       //Shake
var n = 300;    //# of vertices
var s = 0.001;  //Rotation Speed
var w = 4;      //Stroke Weight

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.position(0, 0);
    cnv.style('z-index','-1');

    frameRate(30);
    createLoop({duration:8, gif:true});

    setSliders();

    midX = windowWidth/2;
    midY = windowHeight/2;

    vertices = [];
    assignVertices();

}

function setSliders() {
    k_slider = createSlider(0, 20, 0, 1);
    k_slider.position(50, 8);
    k_slider.style('width', '80px');
    k_label = createDiv('Shake');       //Text label
    k_label.position(8, 10);
    k_label.style('color', '#8888ff');
    k_label.style('font-size', '16px');

    n_slider = createSlider(100, 1000, 300, 100);
    n_slider.position(50, 38);
    n_slider.style('width', '80px');
    n_label = createDiv('Lines');       //Text label
    n_label.position(8, 40);
    n_label.style('color', '#8888ff')
    n_label.style('font-size', '16px');

    s_slider = createSlider(0.001, 0.05, 0.01, 0.001);
    s_slider.position(50, 68);
    s_slider.style('width', '80px');
    s_label = createDiv('Speed');       //Text label
    s_label.position(8, 70);
    s_label.style('color', '#8888ff')
    s_label.style('font-size', '16px');

    w_slider = createSlider(1, 20, 4, 1);
    w_slider.position(50, 98);
    w_slider.style('width', '80px');
    w_label = createDiv('Width');       //Text label
    w_label.position(8, 100);
    w_label.style('color', '#8888ff')
    w_label.style('font-size', '16px');

    reset_label = createDiv('Press \'R\' to refresh lines');       //Text label
    reset_label.position(8, 130);
    reset_label.style('color', '#5555ff')
    reset_label.style('font-size', '16px');
}

function keyTyped() {
    if (key === 'r') {
        reset();
    }
}

function reset() {
    vertices = [];
    assignVertices();
    background(0);
}

function assignVertices() {
    let n = n_slider.value();
    for (i = 0; i < n; i++) {
        var randW = random(-windowWidth*4,windowWidth*4);
        var randH = random(-windowWidth*4,windowHeight*4);
        var randD = random(-windowWidth*4,windowHeight*4);
        vertices.push({x: randW, y: randH, z: randD});
    }
}

function draw() {
    let k = k_slider.value();
    let s = s_slider.value();
    let w = w_slider.value();

    background(0);
    stroke(255);
    strokeWeight(w);
    noFill();

    //So it rotates around the centre:
    translate(width/2, height/2);
    rotateX(ang);
    rotateY(ang);
    rotateZ(ang);

    translate(random(-k,k),random(-k,k),random(-k,k));

    beginShape(TRIANGLE_STRIP);
    for (i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y, vertices[i].z);
    }
    endShape(CLOSE);

    ang += s*random(0.8,1.2);
}
