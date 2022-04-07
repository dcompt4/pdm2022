let array = [];
let player;
let numObstacles;
let obstacles = [];
let score = 0;
let gameState = 'paused';


function preload() {
  
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    imageMode(CENTER);

    player = new Player(window.innerWidth/2, window.innerHeight/2);

    numObstacles = round(window.innerWidth/300) + 1;

    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1] = new Obstacle(window.innerWidth/2 + 300*i, random(window.innerHeight/2 - 100, window.innerHeight/2 + 100), 3);
    }
}

function draw() {
  background(113, 188, 225);

  for(let i = 1; i <= numObstacles; i++) {
    obstacles[i-1].draw();
  }

  push();
  fill(52, 140, 49);
  noStroke();  
  rect(0,window.innerHeight-25,window.innerWidth,25);
  stroke(52, 140, 49);
  strokeWeight(4);
  for(var i = 0; i < window.innerWidth; i += 5) {
    line(i, window.innerHeight-25, i, window.innerHeight-28);
  }
  pop();


  player.draw();

  collision(player, obstacles);

  if(gameState == 'end') {
    push();
    fill(0);
    textSize(100);
    textAlign(CENTER, TOP);
    text('SCORE', 0, height/2 - 100, width);
    text(score, 0, height/2, width);
    pop();

    push();
    fill(0);
    textAlign(CENTER, TOP);
    textSize(30);
    text('Press to Restart', 0, height/2 + 100, width);
    pop();
  } else if (gameState == 'paused'){
    push();
    fill(0);
    textSize(50);
    textAlign(CENTER, TOP);
    text('SCORE', 0, 20, width);
    text(score, 0, 70, width);
    pop();

    push();
    fill(0);
    textAlign(CENTER, TOP);
    textSize(20);
    text('Press Space/Button to Go', 0, player.y - 50, width);
    pop();
  } else {
    push();
    fill(0);
    textSize(50);
    textAlign(CENTER, TOP);
    text('SCORE', 0, 20, width);
    text(score, 0, 70, width);
    pop();
  }

  
}

function collision(player, obstacles) {

  for (let k = 0; k < numObstacles; k++) {
    if((player.x + 25 >= obstacles[k].x - 10 && player.x + 25 <= obstacles[k].x + 30) || (player.x - 25 >= obstacles[k].x - 10 && player.x - 25 <= obstacles[k].x + 30)) {
      if(player.y + 25 >= obstacles[k].y + 90 || player.y - 25 <= obstacles[k].y - 90) {
        gameState = 'end';
      }
    }
  }

}

function keyPressed() {

  if(keyCode == 32 && gameState == 'paused') {
    player.go();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].go();
    }
    gameState = 'playing';
  }

  if(keyCode == 32 && gameState == 'playing') {
    player.jump();
  }

  if(keyCode == 32 && gameState == 'end') {
    player.reset();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].reset();
    }

    score = 0;
    gameState = 'paused';
  }

  if(keyCode == 27 && gameState == 'playing') {
    player.pause();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].pause();
    }
    gameState = 'paused';
  }
  

}

class Obstacle {
  constructor(x, y, speed) {
    this.originalX = x;
    this.x = x;
    this.y = y;
    this.tempSpeed = speed;
    this.speed = 0;
    this.scoreCounted = false;
  }

  draw() {
    push();
    fill(52, 140, 49);
    stroke(0);
    // Top Pipe
    rect(this.x - 10, 0, 40, this.y - 100);
    rect(this.x - 12, this.y - 110, 44, 20);
    // Bottom Pipe
    rect(this.x - 10, this.y + 100, 40, window.innerHeight - this.y + 30);
    rect(this.x - 12, this.y + 90, 44, 20);


    this.x -= this.speed;

    if(this.x < window.innerWidth/2 && !this.scoreCounted) {
      score++;
      this.scoreCounted = true;
    }

    if(this.x < -44) {
      this.x = 300*numObstacles - 44;
      this.y = random(window.innerHeight/2 - 100, window.innerHeight/2 + 100);
      this.scoreCounted = false;
    }

    if(gameState == 'end') {
      this.speed = 0;
    }
    pop();
  }

  go() {
    this.speed = this.tempSpeed;
  }

  pause() {
    this.speed = 0;
  }

  reset() {
    this.speed = 0;
    this.x = this.originalX;
    this.scoreCounted = false;
  }


}


class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.acceleration = 0;
  }

  draw() {
    push();

    fill(255, 237, 95);
    noStroke();
    ellipse(this.x,this.y,50,50);

    this.velocity = this.velocity + this.acceleration;

    this.y = this.y + this.velocity * (1/60);

    if(this.y > (window.innerHeight - 50)) {
      gameState = 'end';
      
      this.velocity = 0;
      this.acceleration= 0;
    }

    pop();
  }

  jump() {
    this.velocity = -400;
  }

  go() {
    this.acceleration = 20;
  }

  pause() {
    this.velocity = 0;
    this.acceleration = 0;
  }

  reset() {
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;
    this.velocity = 0;
    this.acceleration = 0;
  }


}