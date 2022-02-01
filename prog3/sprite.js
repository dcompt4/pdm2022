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

function preload() {
  spelunky = loadImage('SpelunkyGuy.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(255, 255, 255);
    
}

function draw() {
  background(255, 255, 255);

  push();
  newSprite(300, 300, spelunky);
  pop();

  push();
  newSprite(200, 10, spelunky);
  pop()

  push();
  newSprite(60, 500, spelunky);
  pop();
  

  
}

function newSprite(locationX, locationY, character) {

  cell = spriteMap[index];
  let sprite = character.get(cell.x, cell.y, spriteWidth, spriteHeight);
  
  if(newScale == -1.0) {
    translate(locationX*2 + 80,0);
  }
  scale(newScale, 1.0);
  image(sprite, locationX, locationY);

  if ((keyIsPressed == true) && (keyCode === LEFT_ARROW)) {
    
    newScale = -1.0;
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