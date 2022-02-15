function setup() {
    createCanvas(400, 400);
  }
  
function draw() {
    background(4, 4, 132);

    fill(9, 134, 9);
    stroke(255, 255, 255);
    strokeWeight(5);
    ellipse(200,200,200,200);

    translate(200,200);
    rotate(PI/3.3)
    fill(252, 9, 8);
    star(0, 0, 40, 105, 5);
}


function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}