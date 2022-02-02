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
]
let index = 0;
let time = 0;
let spriteSheet;
let spriteWidth = 80;
let spriteHeight = 80;
let newScale;
let locationChange = 0;

function preload() {
  spelunky = loadImage('SpelunkyGuy.png');
  green = loadImage('Green.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(255, 255, 255);
    
}

function draw() {
  background(113, 188, 225);

  push();
  //Underground background
  fill(101, 78, 56);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, window.innerHeight);
  //Underground background
  fill(101, 78, 56);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, window.innerHeight);
  //Dirt ground
  fill(155, 118, 83);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, 100);
  //Dirt ground level -1
  fill(128, 98, 69);
  noStroke();
  rect(0, window.innerHeight/4*2, window.innerWidth, 100);
  //Dirt ground level -2
  fill(128, 98, 69);
  noStroke();
  rect(0, window.innerHeight/4*3, window.innerWidth, 100);
  //Grass
  fill(52, 140, 49);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, 10);
  //Sky bridge
  // fill(170);
  // noStroke();
  // rect(0, window.innerHeight/6, window.innerWidth, 10);
  pop();

  push();
  newSprite(500, window.innerHeight/4 - 70, green);
  pop();
  push();
  newSprite(900, window.innerHeight/4 - 70, spelunky);
  pop();
  push();
  newSprite(0, window.innerHeight/4 - 70, spelunky);
  pop();

  push();
  newSprite(200, window.innerHeight/4*2 - 70, green);
  pop();

  push();
  newSprite(60, window.innerHeight/4*3 - 70, spelunky);
  pop();
  

  
}

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
    locationChange += -1;
    time += .1;
    if (time > 1) {
      index++;
      if (index > spriteMap.length - 1) {
        index = 0;
      }
      time = 0;
    }

  } else if ((keyIsPressed == true) && (keyCode === RIGHT_ARROW)) {
    
    newScale = 1.0;
    locationChange += 1;
    time += .1;
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