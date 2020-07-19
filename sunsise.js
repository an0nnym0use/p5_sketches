function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1');
    background(255);
    sky1 = color('#000530');
    sky2 = color('#EB7C53');

    noStroke();

    // frameRate(30);
    // createLoop({duration:8, gif:true});
}

var elevs = [];
var featuresRaw = [];
var features = [];

function draw() {
    features = [];

    setGradient(sky1, sky2, 0, height*0.7, height); //Sky
    setGradient(sky1, sky2, 0, height*0.7, height); //Sky
    setGradient(sky1, sky2, 0, height*0.7, height); //Sky
    setGradient(sky1, sky2, 0, height*0.7, height); //Sky

    //Stars
    for (i=0;i<400;i++) {
        let x = random(-width/4, 5*width/4);
        let y = random(-height/4, height/2);
        push();
            if (dist(x, y, width/2, height*0.65) < 610) {
                fill(color(255, 255, 255, random(0, 50)));
            } else {
                fill(color(255, 255, 255, random(50, 250)));
            }
            quad(x+3, y, x+6, y+3, x+3, y+6, x, y+3);
        pop();
    }

    //Sun Glow
    for(r=1200; r>0; r--) {
        var inter = map(r, 900, 0, 0, 1);
        var c = color(255, 130, 0, 2);
        push();
            translate(width/2, height*0.65);
            noFill();
            c.setAlpha(200-200*r/1200)
            stroke(c);
            arc(0, 0, r, r, 0, TWO_PI);
        pop();
    }

    //Balloon
    let bx = random(width*0.15, width*0.85);
    let by = height*0.06;
    push();
        noStroke();
        fill(0);
        ellipse(bx, by, 50, 50);
        beginShape();
        vertex(bx, by);
        vertex(bx-25*cos(radians(30)), by+25*sin(radians(30)));
        vertex(bx-7*cos(radians(30)), by+18/cos(radians(60)));
        vertex(bx+7*cos(radians(30)), by+18/cos(radians(60)));
        vertex(bx+25*cos(radians(30)), by+25*sin(radians(30)));
        endShape(CLOSE);
        stroke(0);
        line(bx-7*cos(radians(30)), by+18/cos(radians(60)), bx-5*cos(radians(30)), by+18/cos(radians(60))+10);
        line(bx+7*cos(radians(30)), by+18/cos(radians(60)), bx+5*cos(radians(30)), by+18/cos(radians(60))+10);
        rect(bx-5*cos(radians(30)), by+18/cos(radians(60))+10, 10*cos(radians(30)), 6)
    pop();

    //(BG) Hills 1
    beginShape();
    fill('#000000');
    for (x=-100;x<width+100;x+=50) {
        push();
            if (x%100===0) {
                var y = 0.25*height*noise(x/100)+height*0.12;
            } else {
                var y = 0.25*height*noise((x-50)/100)+height*0.12;
            }
            y = constrain(y, height*0.15, height*0.35);
            vertex(x, y);
        pop();
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    //Fog 1
    setGradient(color(0), color(196), height*0.35, height*0.75, height);
    fog(height*0.35, 2);

    //Hills 2
    beginShape();
    fill('#000000');
    noiseSeed(random(1e10));
    noiseDetail(6, 0.4);
    elevs = [];
    for (x=-100;x<width+100;x++) {
        push();
            var y = 0.15*height*noise(x/300)+height*0.35;
            y = constrain(y, height*0.35, height*0.50);
            vertex(x, y);
            elevs.push({x:x, y:y});
        pop();
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    //Fog 2
    setGradient(color(0), color(196), height*0.5, height*1.0, height);
    fog(height*0.5, 4);

    featuresRaw.push([elevs, 0.8, "flag"]);
    featuresRaw.push([elevs, 0.35, "flag"]);
    drawFeatures();

    //Hill 3
    beginShape();
    fill('#000000');
    noiseSeed(random(1e10));
    noiseDetail(random(3,6), random(0.3,0.5));
    elevs = [];
    for (x=-100;x<width+100;x++) {
        push();
            var y = 0.18*height*noise(x/400)+height*0.5;
            y = constrain(y, height*0.5, height*1.5);
            noiseDetail(8, 0.2);  //extra detail
            y += 0.009*height*noise(x/20);
            vertex(x, y);
            elevs.push({x:x, y:y});
        pop();
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    //Fog 3
    setGradient(color(0), color(196), height*0.68, height*1.2, height);
    fog(height*0.68, 4);

    featuresRaw.push([elevs, 0.98, "flag"]);
    featuresRaw.push([elevs, 0.1, "flag"]);
    drawFeatures();

    //Hill 4
    beginShape();
    fill('#000000');
    noiseSeed(random(1e10));
    noiseDetail(6, random(0.2,0.3));
    let sineOffset = random(width);
    elevs = [];
    for (x=-100;x<width+100;x++) {
        push();
            var y = 0.22*height*noise(x/200)+height*0.68;
            y = constrain(y, height*0.68, height*0.9);
            y += 20+20*sin((sineOffset+x)/100);
            noiseDetail(10, 0.3);  //extra detail
            y += 0.006*height*noise(x/10);
            vertex(x, y);
            elevs.push({x:x, y:y});
        pop();
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    //Fog 4
    setGradient(color(0), color(196), height*0.9, height*1.4, height);
    fog(height*0.9, 4);

    featuresRaw.push([elevs, 0.7, "tepee"]);
    featuresRaw.push([elevs, 0.9, "tepee"]);
    featuresRaw.push([elevs, 0.2, "flag"]);
    drawFeatures();

    // DEBUG LINES
    stroke('#FF0000');
    // line(0, height*0.15, width, height*0.15);
    // line(0, height*0.35, width, height*0.35);
    // line(0, height*0.50, width, height*0.50);
    // line(0, height*0.68, width, height*0.68);
    // line(0, height*0.9, width, height*0.9);

    noLoop();
}

function setGradient(col1, col2, startY, endY, stopGrad) {
    for(var y=startY; y<stopGrad; y++) {
        var inter = map(y, startY, endY, 0, 1);
        var c = lerpColor(col1, col2, inter);
        stroke(c);
        line(0, y, width, y);
    }
    noStroke();
}

function fog(y, a) {
    for (i=0;i<200;i++) {
        let xOff = random(-width/4, 5*width/4);
        let yOff = y+10+abs(randomGaussian(0, 165));
        push();
            fill(color(255, 255, 255, a));
            noStroke();
            quad(xOff+360, yOff-random(50), xOff+720, yOff+10, xOff+360, yOff+20, xOff, yOff+10);
        pop();
    }
}

function drawFeatures() {
    for (i in featuresRaw) {
        let pArray = featuresRaw[i][0];
        let heightPerc = featuresRaw[i][1];
        let maxY = pArray.sort((a, b) => (a.y - b.y));
        let x = pArray.slice(floor(pArray.length*heightPerc))[0].x;
        let y = pArray.slice(floor(pArray.length*heightPerc))[0].y;
        let type = featuresRaw[i][2];

        features.push({
            x: x,
            y: y,
            type: type
        });
    }

    for (i in features) {
        for (let j in features) {
            if (i!=j && abs(features[i].x-features[j].x) < 50) {
                if (features[j.type]!="glowdust"||features[i.type]!="glowdust") {
                    features.pop(j);
                }
            }
        }

        let x = features[i].x;
        let y = features[i].y;
        let type = features[i].type;

        push();
            fill('#000000');
            stroke('#000000');
            strokeWeight(1);
            if (x>0.04*width && x<0.96*width) {
                switch (type) {
                    case "tepee":
                        quad(x-20, y+8*sqrt(3), x+20, y+8*sqrt(3), x+18, y+20*sqrt(3), x-18, y+20*sqrt(3)); //Extra in case of flotation
                        triangle(x-20, y+8*sqrt(3), x+20, y+8*sqrt(3), x, y-12*sqrt(3)); //Main tepee
                        line(x-12, y, x+3, y-15*sqrt(3)); //Extending pole (/)
                        line(x+12, y, x-3, y-15*sqrt(3)); //Extending pole (\)
                        break;
                    case "flag":
                        let dir = map(round(random()), 0,1, -1,1) //-1 = Left, +1 = Right
                        let h = random(22, 38);
                        strokeWeight(3);
                        line(x, y+20, x, y-h); //Pole
                        strokeWeight(1);
                        triangle(x+dir, y-h, x+random(5, 14)*dir, y-h+3, x+dir, y-h+6); //Flag
                        break;
                    case "flag":
                        let dir = map(round(random()), 0,1, -1,1) //-1 = Left, +1 = Right
                        let h = random(22, 38);
                        strokeWeight(3);
                        line(x, y+20, x, y-h); //Pole
                        strokeWeight(1);
                        triangle(x+dir, y-h, x+random(5, 14)*dir, y-h+3, x+dir, y-h+6); //Flag
                        break;
                }
            }
        pop();
    }

    //Clear up for next hill
    console.log(features);
    featuresRaw = [];
    features = [];
}
