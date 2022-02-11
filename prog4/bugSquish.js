let spelunkyCharacter, greenCharacter, roundBoyCharacter, roundGirlCharacter, yellowCharacter, robotCharacter;
let cyclopsCharacter, blueCharacter, redCharacter, limeCharacter, meatCharacter, eskimoCharacter;
let array = [];
let numEnemies = 40;


function preload() {
  //Loads all sprite sheets
  bug = loadImage('bugSquishSheet2.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // Fixes scale(-1) issue
    imageMode(CENTER);

    for(let i = 0; i < numEnemies; i++) {
      array[i] = new Character(bug, random(50, window.innerWidth-50), random(50, window.innerHeight - 50), random(2, 5));
    }
    
}

function draw() {
  background(210, 210, 210);

  for(let i = 0; i < numEnemies; i++) {
    array[i].draw();
  }

  
}

let startDirection = [-1, 1];
function keyPressed() {
  for(let i = 0; i < numEnemies; i++) {
    array[i].go(random(startDirection));
  }
}

function mousePressed() {
  for(let i = 0; i < numEnemies; i++) {
    array[i].squish();
  }
}


class Character {
  constructor(character, x, y, speed) {
    this.character = character;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
    this.speed = speed;
  }

  draw() {
    push();
    translate(this.x,this.y);
    scale(this.facing, 1);

    if(this.move == 0) {
      image(this.character, 0, 0, 75, 75, 600, 0, 150, 150);
    } else {
      image(this.character, 0, 0, 75, 75, 150 * (this.sx + 1), 0, 150, 150);
    }


    if(frameCount % (14 - (round(this.speed - 2))) == 0) {
      this.sx = (this.sx + 1) % 3;
    }

    if(this.x > window.innerWidth) {
      this.move = -(this.move);
      this.facing = -(this.facing);
    }

    if(this.x < 0) {
      this.move = -(this.move);
      this.facing = -(this.facing);
    }

    this.x += this.speed * this.move;
    pop();
  }

  go(direction) {
    this.move = direction;
    this.facing = -direction;
    this.sx = 2;
  }

  squish() {
    if(mouseX > this.x - 37.5 && mouseX < this.x + 37.5 &&
       mouseY > this.y - 37.5 && mouseY < this.y + 37.5) {
        this.move = 0
        this.sx = 4;
        this.squished = true;
    }
  }
}