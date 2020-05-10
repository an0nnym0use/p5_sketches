function preload(){

}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.position(0, 0)
    noStroke();
    // frameRate(60)
    // createLoop({duration:2.55, gif:true})
}

var x = 400;
var rocketX = -170;

function draw() {

    background(0, 0, 20);
    fill(255, 255, 255);
    ellipse(x, random(400), 7, 5);
    ellipse(x+random(-200, 200), random(400), 7, 5);
    ellipse(x-random(-200, 200), random(400), 7, 5);

    x -= 20;

    if (x < 0) {
      x = 400;
    }

    fill(255, random(80,255), 0);
    ellipse(rocketX-15, random(190,210), random(40,60), random(5,20)); //fire
    fill(255, random(80,255), 0);
    ellipse(rocketX-15, random(190,210), random(40,60), random(5,20)); //fire2
    fill(255, random(80,255), 0);
    ellipse(rocketX-15, random(190,210), random(40,60), random(5,20)); //fire3
    fill(255, random(80,255), 0);
    ellipse(rocketX-15, random(190,210), random(40,60), random(5,20)); //fire4

//BODY//

    fill(200, 0, 0);
    rect(rocketX, 180, 120, 40); //body

    strokeWeight(1);

    line(rocketX, 180.6, rocketX, 219.4); //body back line

    strokeWeight(1.2);

    stroke(161, 0, 0);
    line(rocketX+1.2, 211, rocketX+120, 211); //body seam

    strokeWeight(2);

    point(rocketX+5, 207);
    point(rocketX+15, 207);
    point(rocketX+25, 207);
    point(rocketX+35, 207);
    point(rocketX+45, 207);
    point(rocketX+55, 207);
    point(rocketX+65, 207);
    point(rocketX+75, 207);
    point(rocketX+115, 207); //body rivets

    strokeWeight(4);

    stroke(255, 23, 23);
    line(rocketX+2, 184, rocketX+118, 184); //body shine

    noStroke();

//NOSE//

    fill(176, 176, 176);
    triangle(rocketX+120, 180, rocketX+170, 200, rocketX+120, 220); //nose

    strokeWeight(4);

    stroke(194, 194, 194);
    line(rocketX+121, 184, rocketX+163, 200); //body back line

    strokeWeight(1);

    stroke(140, 140, 140);
    line(rocketX+120, 211, rocketX+170, 200); //nose seam

    strokeWeight(2);

    line(rocketX+120, 182, rocketX+120, 218); //nose-to-body join

    point(rocketX+160, 200.0);
    point(rocketX+152, 201.6);
    point(rocketX+144, 203.2);
    point(rocketX+136, 204.8);
    point(rocketX+128, 206.4); //nose rivets

    noStroke();

//WINDOW//

    fill(255, 255, 255);
    ellipse(rocketX+96, 200, 35, 35); //window border

    fill(87, 230, 255);
    ellipse(rocketX+96, 200, 30, 30); //window

    noFill();
    strokeWeight(3);
    stroke(255, 255, 255);
    arc(rocketX+96, 200, 26, 26, 4.7, 6); //window shine
    arc
    noStroke();

    rocketX += 4;
    if (rocketX > 445) {
      rocketX = -170;
    }

};
