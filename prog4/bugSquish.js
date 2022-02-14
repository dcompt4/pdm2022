let spelunkyCharacter, greenCharacter, roundBoyCharacter, roundGirlCharacter, yellowCharacter, robotCharacter;
let cyclopsCharacter, blueCharacter, redCharacter, limeCharacter, meatCharacter, eskimoCharacter;
let array = [];
let numEnemies = 40;
let gameState = 'wait';
let score = 0;
let highScore = 0;
let startTime;
let timeLeft;
let startDirection = [-1, 1];
let bugWave = 1;

function preload() {
  //Loads all sprite sheets
  bug = loadImage('bugSquishSheet2.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // Fixes scale(-1) issue
    imageMode(CENTER);

    for(let i = 0; i < numEnemies; i++) {
      array[i] = new Character(bug, random(50, window.innerWidth-50), random(50, window.innerHeight - 50), random(2, 5), random(startDirection));
    }
    
}

function draw() {
  background(210, 210, 210);
  
  if(gameState == 'wait') {
    textSize(30);
    textAlign(CENTER, CENTER);
    text('Press space to start game!', 0, height/2, width);
  } else if(gameState == 'start') {
    for(let i = 0; i < numEnemies; i++) {
      array[i].draw();
    }

    let myTime = 30 - timer();
    textAlign(LEFT, TOP);
    text('Timer: ' + myTime, 20, 20, width);
    text('Score: ' + score, 20, 50, width);

    if(score > 0 && score % (bugWave * numEnemies) == 0) {
      for(let n = 0; n < numEnemies; n++) {
        array[n] = new Character(bug, random(50, window.innerWidth-50), random(50, window.innerHeight - 50), random(2, 5), random(startDirection));
      }
      bugWave++;
    }

    if(myTime <= 0) {
      gameState = 'end';

      if(score > highScore) {
        highScore = score;
      }
    }


  } else if(gameState == 'end') {

    textSize(30);
    textAlign(CENTER, CENTER);
    text('Game Over', 0, height/2 - 90, width);
    text('Score: ' + score, 0, height/2 - 30, width);
    text('High Score: ' + highScore, 0, height/2, width);
  
    text('Press space to start new game!', 0, height/2 + 60, width);

    
    


  }




  

  
}

function keyPressed() {
  if(keyCode == 32 && gameState == 'wait') {
    startTime = millis();
    gameState = 'start';
  } else if (keyCode == 32 && gameState == 'end') {

    for(let p = 0; p < numEnemies; p++) {
      array[p] = new Character(bug, random(50, window.innerWidth-50), random(50, window.innerHeight - 50), random(2, 5), random(startDirection));
    }

    score = 0
    startTime = millis();
    gameState = 'start';
  }
}

function mousePressed() {
  if(gameState == 'start') {

    for(let i = 0; i < numEnemies; i++) {

      if(!(array[i].squished)) {
        array[i].squish();
        if(array[i].squished) {
          score++;
          for(let j = 0; j < numEnemies; j++) {
            array[j].speed += 0.05;
          }
        }
      }
    }

  }
}

function timer() {
  return int((millis() - startTime) / 1000);
}


class Character {
  constructor(character, x, y, speed, direction) {
    this.character = character;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
    this.speed = speed;
    this.move = direction;
    this.facing = -direction;
    this.sx = 2;
  }

  draw() {
    push();
    translate(this.x,this.y);
    scale(this.facing, 1);

    if(this.squished) {
      image(this.character, 0, 0, 75, 75, 600, 0, 150, 150);
    }else if(this.move == 0) {
      image(this.character, 0, 0, 75, 75, 0, 0, 150, 150);
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

  squish() {
    if(mouseX > this.x - 37.5 && mouseX < this.x + 37.5 &&
       mouseY > this.y - 37.5 && mouseY < this.y + 37.5) {
        this.move = 0
        this.sx = 4;
        this.squished = true;
    }
  }
}