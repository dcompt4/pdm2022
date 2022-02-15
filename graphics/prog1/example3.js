function setup() {
    createCanvas(800, 400);
    angleMode(DEGREES);
    rectMode(CENTER);
  }
  
function draw() {
    background(0);

    stroke(0, 0, 0, 0);

    //Yellow circle for pacman
    fill(251, 250, 78);
    ellipse(200,200,300,300);

    //Red part of ghost
    fill(234, 68, 43);
    ellipse(600,200,300,300);
    rect(600,275,300,150);
    //White part of eye
    fill(255, 255, 255);
    ellipse(670,200,90,90);
    ellipse(530,200,90,90);
    //Blue part of eye
    fill(4, 68, 244);
    ellipse(670,200,55,55);
    ellipse(530,200,55,55);


    //For roatating and drawing black square for pacman's mouth
    translate(100, 58);
    rotate(45);
    fill(0, 0, 0);
    rect(100,100,160,160);

    
}
