let spelunkyCharacter, greenCharacter, roundBoyCharacter, roundGirlCharacter, yellowCharacter, robotCharacter;
let cyclopsCharacter, blueCharacter, redCharacter, limeCharacter, meatCharacter, eskimoCharacter;
let array = [];


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
    greenCharacter = new Character(greenChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    roundBoyCharacter = new Character(roundBoy, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    roundGirlCharacter = new Character(roundGirl, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    limeCharacter = new Character(limeChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));

    // Mid Layer
    redCharacter = new Character(redChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    yellowCharacter = new Character(yellowChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    blueCharacter = new Character(blueChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    eskimoCharacter = new Character(eskimo, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));

    // Bottom Layer
    spelunkyCharacter = new Character(spelunky, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    robotCharacter = new Character(robot, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    cyclopsCharacter = new Character(cyclops, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    meatCharacter = new Character(meat, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));

    let choices = [35, 70]
    for(let i = 0; i < 20; i++) {
      array[i] = new Cloud(random(0, window.innerWidth), 70, random(1, 2));
    }
    for(let i = 20; i < 40; i++) {
      array[i] = new Cloud(random(0, window.innerWidth), 35, random(1, 2));
    }
    
}

function draw() {
  background(113, 188, 225);

  push();
  //Underground background
  // fill(125);
  // noStroke();
  // rect(0, window.innerHeight/4, window.innerWidth, window.innerHeight/4);
  // //Underground background
  // fill(25);
  // noStroke();
  // rect(0, window.innerHeight/4*2, window.innerWidth, window.innerHeight/4*2);
  // //Dirt ground
  // fill(155, 118, 83);
  // noStroke();
  // rect(0, window.innerHeight/4, window.innerWidth, 100);
  // //Dirt ground level -1 ceiling
  // fill(100);
  // noStroke();
  // rect(0, window.innerHeight/4 + 100, window.innerWidth, 5);
  // //Dirt ground level -1
  // fill(101, 78, 56);
  // noStroke();
  // rect(0, window.innerHeight/4*2, window.innerWidth, 100);
  // //Dirt ground level -1 floor
  // fill(100);
  // noStroke();
  // rect(0, window.innerHeight/4*2, window.innerWidth, 10);
  // //Dirt ground level -2 ceiling
  // fill(0);
  // noStroke();
  // rect(0, window.innerHeight/4*2 + 100, window.innerWidth, 5);
  // //Dirt ground level -2
  // fill(52, 41, 31);
  // noStroke();
  // rect(0, window.innerHeight/4*3, window.innerWidth, window.innerHeight/4);
  // //Dirt ground level -2 floor
  // fill(0);
  // noStroke();
  // rect(0, window.innerHeight/4*3, window.innerWidth, 10);
  //Grass
  fill(52, 140, 49);
  noStroke();
  rect(0, window.innerHeight/4, window.innerWidth, window.innerHeight);
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

  for(let i = 0; i < 40; i++) {
    array[i].draw();
  }
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

class Cloud {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 40, 20);
    ellipse(this.x+30, this.y, 40, 20);
    ellipse(this.x+60, this.y, 40, 20);
    ellipse(this.x+15, this.y-10, 40, 20);
    ellipse(this.x+45, this.y-10, 40, 20);

    this.x += this.speed;

    if(this.x > window.innerWidth + 100) {
      this.x = -100;
    }
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
      image(this.character, 0, 0, 80, 80, 0, 0, 80, 80);
    } else {
      image(this.character, 0, 0, 80, 80, 80 * (this.sx + 1), 0, 80, 80);
    }


    if(frameCount % (7 - (round(this.speed - 2))) == 0) {
      this.sx = (this.sx + 1) % 8;
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
    this.facing = direction;
    this.sx = 3;
  }

  stop() {
    this.move = 0;
  }
}