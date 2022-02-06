let spelunkyCharacter, greenCharacter, roundBoyCharacter, roundGirlCharacter, yellowCharacter, robotCharacter;
let cyclopsCharacter, blueCharacter, redCharacter, limeCharacter, meatCharacter, eskimoCharacter;



function preload() {
  //Loads all sprite sheets
  spelunky = loadImage('SpelunkyGuy.png');
  greenChar = loadImage('Green.png');
  roundBoy = loadImage('RoundBoy.png');
  roundGirl = loadImage('RoundGirl.png');
  yellowChar = loadImage('Yellow.png');
  robot = loadImage('Robot.png');
  cyclops = loadImage('Cyclops.png');
  blueChar = loadImage('Blue.png');
  redChar = loadImage('Red.png');
  limeChar = loadImage('Lime.png');
  meat = loadImage('Meat.png');
  eskimo = loadImage('Eskimo.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // Fixes scale(-1) issue
    imageMode(CENTER);

    // Top Layer
    greenCharacter = new Character(greenChar, 100, window.innerHeight/4 - 30);
    roundBoyCharacter = new Character(roundBoy, 400, window.innerHeight/4 - 30);
    roundGirlCharacter = new Character(roundGirl, 700, window.innerHeight/4 - 30);
    limeCharacter = new Character(limeChar, 1000, window.innerHeight/4 - 30);

    // Mid Layer
    redCharacter = new Character(redChar, 300, window.innerHeight/4*2 - 30);
    yellowCharacter = new Character(yellowChar, 600, window.innerHeight/4*2 - 30);
    blueCharacter = new Character(blueChar, 900, window.innerHeight/4*2 - 30);
    eskimoCharacter = new Character(eskimo, 1200, window.innerHeight/4*2 - 30);

    // Bottom Layer
    spelunkyCharacter = new Character(spelunky, 200, window.innerHeight/4*3 - 30);
    robotCharacter = new Character(robot, 500, window.innerHeight/4*3 - 30);
    cyclopsCharacter = new Character(cyclops, 800, window.innerHeight/4*3 - 30);
    meatCharacter = new Character(meat, 1100, window.innerHeight/4*3 - 30);
    
}

function draw() {
  background(113, 188, 225);

  push();
  //Underground background
  fill(125);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, window.innerHeight/4);
  //Underground background
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

  
  // cloud(80, 70);
  // cloud(250, 70);
  // cloud(575, 70);
  // cloud(925, 70);
  // cloud(1250, 70);
  // cloud(1425, 70);
  // cloud(1560, 70);
  // cloud(1825, 70);

  // cloud(0, 35);
  // cloud(150, 35);
  // cloud(500, 35);
  // cloud(800, 35);
  // cloud(1050, 35);
  // cloud(1200, 35);
  // cloud(1490, 35);
  // cloud(1725, 35);
  // cloud(1900, 35);
  

  
  greenCharacter.draw();
  roundBoyCharacter.draw();
  roundGirlCharacter.draw();
  limeCharacter.draw();
  redCharacter.draw();
  yellowCharacter.draw();
  blueCharacter.draw();
  eskimoCharacter.draw();
  spelunkyCharacter.draw();
  robotCharacter.draw();
  cyclopsCharacter.draw();
  meatCharacter.draw();
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    greenCharacter.go(1);
    roundBoyCharacter.go(1);
    roundGirlCharacter.go(1);
    limeCharacter.go(1);
    redCharacter.go(1);
    yellowCharacter.go(1);
    blueCharacter.go(1);
    eskimoCharacter.go(1);
    spelunkyCharacter.go(1);
    robotCharacter.go(1);
    cyclopsCharacter.go(1);
    meatCharacter.go(1);

  } else if (keyCode == LEFT_ARROW) {
    greenCharacter.go(-1);
    roundBoyCharacter.go(-1);
    roundGirlCharacter.go(-1);
    limeCharacter.go(-1);
    redCharacter.go(-1);
    yellowCharacter.go(-1);
    blueCharacter.go(-1);
    eskimoCharacter.go(-1);
    spelunkyCharacter.go(-1);
    robotCharacter.go(-1);
    cyclopsCharacter.go(-1);
    meatCharacter.go(-1);
  }
}

function keyReleased() {
  greenCharacter.stop();
  roundBoyCharacter.stop();
  roundGirlCharacter.stop();
  limeCharacter.stop();
  redCharacter.stop();
  yellowCharacter.stop();
  blueCharacter.stop();
  eskimoCharacter.stop();
  spelunkyCharacter.stop();
  robotCharacter.stop();
  cyclopsCharacter.stop();
  meatCharacter.stop();
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

class Character {
  constructor(character, x, y) {
    this.character = character;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  draw() {
    push();
    translate(this.x,this.y);
    scale(this.facing, 1);

    if(this.move == 0) {
      image(this.character, 0, 0, 80, 80, 0, 0, 80, 80);
    } else {
      image(this.character, 0, 0, 80, 80, 80 * (this.sx + 1), 0, 80, 80);
    }

    if(frameCount % 5 == 0) {
      this.sx = (this.sx + 1) % 8;
    }

    this.x += 2 * this.move;
    pop();
  }

  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  stop() {
    this.move = 0;
  }
}