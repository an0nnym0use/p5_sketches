function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initTiles();
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

    initTiles();
}

function initTiles() {
    let bgColours = ["#105B85", "#95B6EB", "#8EBDCC", "#171A56", "#171A56", "#083D47", "#083D47", "#5279A2", "#5279A2", "#234052"]
    for (x=-100;x<width+200;x+=100) {
        for (y=-100;y<height+200;y+=100) {
            let colours = [];
            for (i=0;i<random(3, 5);i++) {
                colours.push(color(random(83, 163), random(127, 225), random(165, 255)));
            }
            tiles.push(new Tile(x, y, patterns[floor(random(0, patterns.length))], colours, bgColours[floor(random(0, bgColours.length))]));
        }
    }
}

let tiles = [];
let patterns = ["hBars", "vBars", "outlineThin", "outlineThick",
"justBG", "vTriangleStrips", "hTriangleStrips", "circles", "check", "diamond",
"wave", "bevel",
//extra (for chances):
"hBars", "vBars", "justBG"];

//"justBG" has no case, as not necessary (except debugging)

class Tile {
    constructor(x, y, pattern, colours, bg) {
        push();
            let c = colours[floor(random(0,colours.length))];
            fill(bg);
            rect(x, y, 100, 100);
            switch (pattern) {
                //DEBUG
                // case "justBG":
                //     fill(255, 0, 0);
                //     ellipse(x+50, y+50, 20)
                //     break;
                //DEBUGEND
                case "hBars":
                    let hbars = floor(random(2, 8));
                    for (i=0;i<hbars;i++) {
                        if (i%2 === 0) {
                            c = colours[floor(random(0,colours.length))];
                            fill(c);
                            rect(x, y+i*(100/hbars), 100, 100/hbars)
                        }
                    }
                    break;
                case "vBars":
                    let vbars = floor(random(2, 8));
                    for (i=0;i<vbars;i++) {
                        if (i%2 === 0) {
                            c = colours[floor(random(0,colours.length))];
                            fill(c);
                            rect(x+i*(100/vbars), y, 100/vbars, 100)
                        }
                    }
                    break;
                case "outlineThin":
                    c = colours[floor(random(0,colours.length))];
                    fill(c);
                    rect(x, y, 100, 100);
                    fill(bg);
                    rect(x+5, y+5, 90, 90);
                    break;
                case "outlineThick":
                    c = colours[floor(random(0,colours.length))];
                    fill(c);
                    rect(x, y, 100, 100);
                    fill(bg);
                    rect(x+20, y+20, 60, 60);
                    break;
                case "vTriangleStrips":
                    c = colours[floor(random(0,colours.length))];
                    push();
                        noFill();
                        stroke(c);
                        beginShape(TRIANGLE_STRIP);
                        translate(x, y);
                        vertex(0.5, 99.5);
                        vertex(0.5, 0.5);
                        vertex(20.5, 99.5);
                        vertex(40.5, 0.5);
                        vertex(60.5, 99.5);
                        vertex(80.5, 0.5);
                        vertex(99.5, 99.5);
                        vertex(99.5, 0.5);
                        endShape();
                        line(0.5, 99.5, 99.5, 99.5);
                    pop();
                    break;
                case "hTriangleStrips":
                    c = colours[floor(random(0,colours.length))];
                    push();
                        noFill();
                        stroke(c);
                        beginShape(TRIANGLE_STRIP);
                        translate(x, y);
                        vertex(99.5, 0.5);
                        vertex(0.5, 0.5);
                        vertex(99.5, 20.5);
                        vertex(0.5, 40.5);
                        vertex(99.5, 60.5);
                        vertex(0.5, 80.5);
                        vertex(99.5, 99.5);
                        vertex(0.5, 99.5);
                        endShape();
                        line(99.5, 0.5, 99.5, 99.5);
                    pop();
                    break;
                case "circles":
                    c = colours[floor(random(0,colours.length))];
                    fill(c);
                    var w = random(80, 95);
                    for (i=0;i<9;i++ && w>=5) {
                        if (i%2 === 0) {
                            fill(c);
                        } else {
                            fill(bg);
                        }
                        ellipse(x+50, y+50, w);
                        w -= random(5, 30);
                    }
                    break;
                case "check":
                    let size = floor(random(2, 6));
                    for (let cx=0;cx<size;cx++) {
                        for (let cy=0;cy<size;cy++) {
                            if (cx%2 === cy%2) {
                                fill(c);
                            } else {
                                fill(bg);
                            }
                            rect(100/size*cx+x, 100/size*cy+y, 100/size, 100/size);
                            //console.log(x, y, size);
                        }
                    }
                    break;
                case "diamond":
                    c = colours[floor(random(0,colours.length))];
                    fill(c);
                    quad(x+50, y, x+100, y+50, x+50, y+100, x, y+50);
                    break;
                case "wave":
                    c = colours[floor(random(0,colours.length))];
                    fill(c);
                    beginShape();
                    vertex(x, y+100);
                    let xoffset = random(0, 200);
                    let magn = random(10, 40);
                    let freq = random(5, 50);
                    let yoffset = random(magn, 100-magn);
                    for (let wx=0;wx<=100;wx++) {
                        let wy = yoffset + magn*sin((wx+xoffset)/freq);
                        vertex(x+wx, y+wy);
                    }
                    vertex(x+100, y+100);
                    endShape(CLOSE);
                    break;
                case "bevel":
                    if (random()>0.5) {
                        //top
                        c = colours[floor(random(0,colours.length))];
                        fill(c);
                        triangle(x, y, x+100, y, x+50, y+50);
                        //bottom
                        c = colours[floor(random(0,colours.length))];
                        fill(c);
                        triangle(x+100, y+100, x, y+100, x+50, y+50);
                    } else {
                        //right
                        c = colours[floor(random(0,colours.length))];
                        fill(c);
                        triangle(x+100, y, x+100, y+100, x+50, y+50);
                        //left
                        c = colours[floor(random(0,colours.length))];
                        fill(c);
                        triangle(x, y+100, x, y, x+50, y+50);
                    }
                    break;
            }
        pop();
    }
}
