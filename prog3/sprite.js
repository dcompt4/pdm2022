let animation;
let spriteMap = [
  { x: 0, y: 0 },
  { x: 80, y: 0 },
  { x: 160, y: 0 },
  { x: 240, y: 0 },
  { x: 320, y: 0 },
  { x: 400, y: 0 },
  { x: 480, y: 0 },
  { x: 560, y: 0 },
  { x: 640, y: 0 },
]
let index = 0;
let spriteSheet;
let spriteWidth = 80;
let spriteHeight = 80;

let frame = 0;

let newScale;

let time = 0;
let time2 = 0;

let locationChange = 0;
let changeLocation = 0;

function preload() {
  spelunky = loadImage('SpelunkyGuy.png');
  green = loadImage('Green.png');
  roundBoy = loadImage('RoundBoy.png');
  roundGirl = loadImage('RoundGirl.png');
  yellow = loadImage('Yellow.png');
  robot = loadImage('Robot.png');
  cyclops = loadImage('Cyclops.png');
  blue = loadImage('Blue.png');
  red = loadImage('Red.png');
  lime = loadImage('Lime.png');
  meat = loadImage('Meat.png');
  eskimo = loadImage('Eskimo.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(255, 255, 255);
    
}

function draw() {
  background(113, 188, 225);

  push();
  //Underground background
  //fill(128, 98, 69);
  fill(125);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, window.innerHeight/4);
  //Underground background
  //fill(76, 59, 43);
  fill(25);
  noStroke();
  rect(0, window.innerHeight/4*2, window.innerWidth, window.innerHeight/4*2);
  //Dirt ground
  fill(155, 118, 83);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, 100);
  //Dirt ground level -1 ceiling
  fill(100);
  noStroke();
  rect(0, window.innerHeight/4 + 100, window.innerWidth, 5);
  //Dirt ground level -1
  fill(101, 78, 56);
  noStroke();
  rect(0, window.innerHeight/4*2, window.innerWidth, 100);
  //Dirt ground level -1 floor
  fill(100);
  noStroke();
  rect(0, window.innerHeight/4*2, window.innerWidth, 10);
  //Dirt ground level -2 ceiling
  fill(0);
  noStroke();
  rect(0, window.innerHeight/4*2 + 100, window.innerWidth, 5);
  //Dirt ground level -2
  fill(52, 41, 31);
  noStroke();
  rect(0, window.innerHeight/4*3, window.innerWidth, window.innerHeight/4);
  //Dirt ground level -2 floor
  fill(0);
  noStroke();
  rect(0, window.innerHeight/4*3, window.innerWidth, 10);
  //Grass
  fill(52, 140, 49);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, 10);
  stroke(52, 140, 49);
  strokeWeight(4);
  for(var i = 0; i < window.innerWidth; i += 5) {
    line(i, window.innerHeight/4, i, window.innerHeight/4-3);
  }
  //Sun
  fill(244, 233, 155);
  noStroke();
  ellipse(0,0,150,150);
  pop();

  
  cloud(80, 70);
  cloud(250, 70);
  cloud(575, 70);
  cloud(925, 70);
  cloud(1250, 70);
  cloud(1425, 70);
  cloud(1560, 70);
  cloud(1825, 70);

  cloud(0, 35);
  cloud(150, 35);
  cloud(500, 35);
  cloud(800, 35);
  cloud(1050, 35);
  cloud(1200, 35);
  cloud(1490, 35);
  cloud(1725, 35);
  cloud(1900, 35);
  



  // First implementation sprites (Running)

  push();
  newSprite(600, window.innerHeight/4 - 70, green);
  pop(); 

  push();
  newSprite(1360, window.innerHeight/4 - 70, eskimo);
  pop(); 

  push();
  newSprite(950, window.innerHeight/4*2 - 70, yellow);
  pop();

  push();
  newSprite(300, window.innerHeight/4*3 - 70, cyclops);
  pop();

  push();
  newSprite(1600, window.innerHeight/4*3 - 70, spelunky);
  pop();
  
  // Second implementation sprites (Walking)
  push();
  sprite(150, window.innerHeight/4 - 70, roundBoy);
  pop();

  push();
  sprite(1100, window.innerHeight/4 - 70, roundGirl);
  pop();

  push();
  sprite(1650, window.innerHeight/4 - 70, lime);
  pop();

  push();
  sprite(500, window.innerHeight/4*2 - 70, blue);
  pop();

  push();
  sprite(1550, window.innerHeight/4*2 - 70, red);
  pop();

  push();
  sprite(650, window.innerHeight/4*3 - 70, robot);
  pop();

  push();
  sprite(1200, window.innerHeight/4*3 - 70, meat);
  pop();

  

}

function cloud(cloudX, cloudY) {
  fill(255);
  noStroke();
  ellipse(cloudX, cloudY, 40, 20);
  ellipse(cloudX+30, cloudY, 40, 20);
  ellipse(cloudX+60, cloudY, 40, 20);
  ellipse(cloudX+15, cloudY-10, 40, 20);
  ellipse(cloudX+45, cloudY-10, 40, 20);
}

// First implementation of animating sprites
// Uses map and indices to change frame of sprite animation
function newSprite(locationX, locationY, character) {

  cell = spriteMap[index];
  let sprite = character.get(cell.x, cell.y, spriteWidth, spriteHeight);
  
  if(newScale == -1.0) {
    translate((locationX + locationChange)*2 + 80,0);
  }
  scale(newScale, 1.0);
  image(sprite, locationX + locationChange, locationY);

  if ((keyIsPressed == true) && (keyCode === LEFT_ARROW)) {
    
    newScale = -1.0;
    locationChange += -0.3;
    time += .04;
    if (time > 1) {
      index++;
      if (index > spriteMap.length - 1) {
        index = 0;
      }
      time = 0;
    }

  } else if ((keyIsPressed == true) && (keyCode === RIGHT_ARROW)) {
    
    newScale = 1.0;
    locationChange += 0.3;
    time += .04;
    if (time > 1) {
      index++;
      if (index > spriteMap.length - 1) {
        index = 0;
      }
      time = 0;
    }

  } else {
    
    index = 0;

  }



}

// Second implementation of animating sprites
// Uses image() function to change frame using coordinates in large sprite sheet
function sprite(x, y, character) {
  if(newScale == -1.0) {
    translate((x + changeLocation)*2 + 80,0);
  }
  scale(newScale, 1.0);
  image(character, x + changeLocation, y, 80, 80, 80 * frame, 0, 80, 80);


  if ((keyIsPressed == true) && (keyCode === LEFT_ARROW)) {
    
    newScale = -1.0;
    changeLocation += -0.1;
    time2 += .015;
    if (time2 > 1) {
      frame = (frame + 1) % 9;
      time2 = 0;
    }

  } else if ((keyIsPressed == true) && (keyCode === RIGHT_ARROW)) {
    
    newScale = 1.0;
    changeLocation += 0.1;
    time2 += .015;
    if (time2 > 1) {
      frame = (frame + 1) % 9;
      time2 = 0;
    }

  } else {
    
    frame = 0;

  }
}