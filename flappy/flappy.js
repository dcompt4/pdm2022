let array = [];
let player;
let gameState = 'paused';


function preload() {
  
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    imageMode(CENTER);

    player = new Player(window.innerWidth/2, window.innerHeight/2);
    
}

function draw() {
  background(113, 188, 225);

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

}

function keyPressed() {
  if(keyCode == 32 && gameState == 'paused') {
    player.go();
    gameState = 'playing';
  }

  if(keyCode == 32 && gameState == 'playing') {
    player.jump();
  }

  if(keyCode == 32 && gameState == 'end') {
    player.reset();
    gameState = 'paused';
  }

}

function keyReleased() {
  
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
    this.velocity = -250;
  }

  go() {
    this.acceleration = 10;
  }

  pause() {
    this.velocity = 0;
    this.acceleration = 0;
  }

  reset() {
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;
  }


}