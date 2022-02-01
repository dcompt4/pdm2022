let drawColor;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(240, 240, 240);
    stroke(255);
    fill('red');
    rect(1, 1,40,40);
    fill('orange');
    rect(1, 41,40,40);
    fill('yellow');
    rect(1, 81,40,40);
    fill('green');
    rect(1, 121,40,40);
    fill('cyan');
    rect(1, 161,40,40);
    fill('blue');
    rect(1, 201,40,40);
    fill('magenta');
    rect(1, 241,40,40);
    fill('brown');
    rect(1, 281,40,40);
    fill('white');
    rect(1, 321,40,40);
    fill('black');
    rect(1, 361,40,40);
  }
  
function draw() {
    
}

function mouseClicked() {
  if(mouseX < 41)
  {
    if(mouseY < 41) 
    {
      drawColor = 'red';
    } else if(mouseY < 81)
    {
      drawColor = 'orange';
    } else if(mouseY < 121)
    {
      drawColor = 'yellow';
    } else if(mouseY < 161)
    {
      drawColor = 'green';
    } else if(mouseY < 201)
    {
      drawColor = 'cyan';
    } else if(mouseY < 241)
    {
      drawColor = 'blue';
    } else if(mouseY < 281)
    {
      drawColor = 'magenta';
    } else if(mouseY < 321)
    {
      drawColor = 'brown';
    } else if(mouseY < 361)
    {
      drawColor = 'white';
    } else if(mouseY < 401)
    {
      drawColor = 'black';
    }
  } else {
    fill = drawColor;
    ellipse(mouseX, mouseY, 1, 1);
  }
}

function mouseDragged() {
  stroke(drawColor)
  if (mouseX > 55 || mouseY > 431) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
