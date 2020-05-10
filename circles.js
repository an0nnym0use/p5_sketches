function preload(){

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    //calcLCMPrep();
    // frameRate(30);
    // createLoop({duration:10, gif:true});
}

const PI = Math.PI;
const xt = PI/6;

var c = 0;
var speed;

function speedFromMouse() {
    if (mouseX > width/2) {
        speed = dist(mouseX,0,width/2,0)/width/30;
    } else {
        speed = -1*dist(mouseX,0,width/2,0)/width/30;
    }
}

//function calcLCMPrep() {
//    nums = [-3,1,6,-2,3.2,-2.1,4.5,-1.2,-5,2,7,-2.8]
//    for (i = 0; i < 12; i++) {
//        var x = nums[i] / (2*PI);
//        nums[i] = x*100000000000000000;
//    }
//    var listStr = nums.join(", ");
//    console.log(listStr);
//}

function draw() {
    background(0);
    fill(255);
    noStroke();
    ellipse(windowWidth/2, windowHeight/2, 100); //Centre

    strokeWeight(21);
    noFill();

    /*/ Template: arc(wW/2, wH/2, 40n+80, 40n+80, p*c+sine(c*q*PI)+offset, p*c+sine(c*q*PI)+offset);
    Where n = ring # (outwards); p = multiplier to c; q = frequency of sine wave.
    Optional Math.abs(c*q*PI) makes the leading/trailing edge bounce.
    NOTE: which edge is the leading/trailing reverses with negative values of p.

    After 1.1228974263151052e+110 rotations at speed c, it repeats!

    /*/

    stroke(255, 0, 0); // Arc 1
    arc(windowWidth/2, windowHeight/2, 120, 120, -3*c, -3*c+2.5*sin(c*1.1*PI)+2.9);

    stroke(0, 127, 0); // Arc 2
    arc(windowWidth/2, windowHeight/2, 160, 160, 1*c+0.4*sin(c*2*PI)+4.1, 1*c+7);

    stroke(0, 255, 255); // Arc 3
    arc(windowWidth/2, windowHeight/2, 200, 200, 6*c+0.5*sin(c*3*PI)+4.1, 6*c+5.5);

    stroke(255, 0, 255); // Arc 4
    arc(windowWidth/2, windowHeight/2, 240, 240, -2*c+1.8*sin(c*2*PI-0.5)+1, -2*c+5);

    stroke(255, 255, 0); // Arc 5
    arc(windowWidth/2, windowHeight/2, 280, 280, 3.2*c+5, 3.2*c+2.2*sin(c*1.5*PI)+2);

    stroke(0, 0, 255); // Arc 6
    arc(windowWidth/2, windowHeight/2, 320, 320, -2.1*c+0.6*sin(c*4*PI)-3, -2.1*c+0.6*sin(c*3.5*PI)+1.5);

    stroke(255, 127, 0); // Arc 7
    arc(windowWidth/2, windowHeight/2, 360, 360, 4.5*c-0.5, 4.5*c+1.6*abs(sin(c*2*PI))+0.5);

    stroke(127, 0, 127); // Arc 8
    arc(windowWidth/2, windowHeight/2, 400, 400, -1.2*c+3.4, -1.2*c+1.8*sin(c*-PI)+5.5);

    stroke(0, 255, 127); // Arc 9
    arc(windowWidth/2, windowHeight/2, 440, 440, -5*c+0.8*sin(c*1.6*PI)+1.8, -5*c+0.2*sin(c*2*PI)+4);

    stroke(255, 63, 0); // Arc 10
    arc(windowWidth/2, windowHeight/2, 480, 480, 2*c+0.4*abs(sin(c*1.6*PI)+0.7)+5, 2*c+0.2*abs(sin(c*2*PI)+0.4)+1);

    stroke(127, 127, 255); // Arc 11
    arc(windowWidth/2, windowHeight/2, 520, 520, 7*c+2.5, 7*c+0.5*sin(c*1.1*PI)+3.5);

    stroke(255, 0, 127); // Arc 12
    arc(windowWidth/2, windowHeight/2, 560, 560, -2.8*c+1.5, -2.8*c+0.9*sin(c*1.6*PI)+3);

//ORBITING STUFF

    stroke(255);
    strokeWeight(10);
    for (i = 0; i < 6; i++) {
        arc(windowWidth/2, windowHeight/2, 700, 700, 0.2*c+(2*i)*xt, 0.2*c+(2*i+1)*xt);
    }

    speedFromMouse();
    c+= speed;
}
