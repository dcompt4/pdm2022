let array = [];
let player;
let numObstacles;
let obstacles = [];
let score = 0;
let gameState = 'paused';
let canRestart = false;
let start = 0;
let gameStateDelay = 0;
let firstTime = true;

/* Global Variables */
// Speed of pipes (px/frame)
let gameSpeed = 3;
// Distance between pipes (px)
let pipeDistance = 300;
// Distance pipes can move up and down
let pipeVariablity = 100;

/* 
  Sound
*/

let endStateStart = true;
let playingStateStart = true;

let sounds = new Tone.Players(
  {
    'flap': 'flap.wav',
    'bonk': 'bonk.wav'
  }
);
sounds.volume.value = -6;

var gain = new Tone.Gain().toDestination();
sounds.connect(gain);

Tone.Transport.bpm.value = 120;

// Melodies

let synth = new Tone.PolySynth().toDestination();
synth.volume.value = -25;

const over = [
  {'time': 0.0, 'note': ["C3", "E3", "G3"], 'duration': 1.3},
  {'time': 1.5, 'note': ["F3", "A3", "C4"], 'duration': 1.2},
  {'time': 3.25, 'note': ["G3", "C4", "D4"], 'duration': 2.0},
  {'time': 5.25, 'note': ["G3", "B3", "D4"], 'duration': 2.0},
];

const gameOver = new Tone.Part(function(time, note) {
  synth.triggerAttackRelease(note.note, note.duration, time);
}, over);

const melodyMusic = [
  {'time': 0.00, 'note': ["B4", "D5"], 'duration': 0.25},
  {'time': 0.75, 'note': ["C5", "E5"], 'duration': 0.25},
  {'time': 1.50, 'note': ["A4", "C5"], 'duration': 0.25},
  {'time': 2.25, 'note': ["A4", "C5"], 'duration': 0.25},
  {'time': 2.75, 'note': ["B4", "D5"], 'duration': 0.25},
  {'time': 3.25, 'note': ["B4", "D5"], 'duration': 0.50},
  {'time': 4.00, 'note': ["C5", "E5"], 'duration': 0.25},
  {'time': 4.50, 'note': ["A4", "C5"], 'duration': 0.25},
  {'time': 5.00, 'note': ["F4", "A4"], 'duration': 0.25},
  {'time': 5.50, 'note': ["E4", "G4"], 'duration': 0.25},
  {'time': 6.00, 'note': ["D4", "G4"], 'duration': 1.25},
];

let melody = new Tone.Part(function(time, note) {
  synth.triggerAttackRelease(note.note, note.duration, time);
}, melodyMusic);

//Bass

let bassSynth = new Tone.PolySynth().toDestination();
bassSynth.volume.value = -20;

const bassPart = [
  {'time': 0.0, 'note': ["C3", "E3", "G3"], 'duration': 1.3},
  {'time': 1.5, 'note': ["F3", "A3", "C4"], 'duration': 1.2},
  {'time': 3.25, 'note': ["G3", "C4", "D4"], 'duration': 2.0},
  {'time': 5.25, 'note': ["G3", "B3", "D4"], 'duration': 2.0},
];

let bass = new Tone.Part(function(time, note) {
  bassSynth.triggerAttackRelease(note.note, note.duration, time);
}, bassPart);




Tone.Transport.start();

/* 
  Hardware
*/

let serialPDM;
let portName = "COM3";
let arduinoClick = false;
let clickAllowed = true;



function preload() {
  
}

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor = serialPDM.sensorData;

  createCanvas(window.innerWidth, window.innerHeight);
  imageMode(CENTER);

  player = new Player(window.innerWidth/2, window.innerHeight/2);

  numObstacles = round(window.innerWidth/pipeDistance) + 1;

  for(let i = 1; i <= numObstacles; i++) {
    obstacles[i-1] = new Obstacle(window.innerWidth/2 + pipeDistance*i, random(window.innerHeight/2 - pipeVariablity, window.innerHeight/2 + pipeVariablity), gameSpeed);
  }
}

function draw() {
  console.log(gameState);
  background(113, 188, 225);

  arduinoClick = [sensor.button];

  if(arduinoClick == 1 && clickAllowed) {
    buttonPress();
    clickAllowed = false;
  } else if(arduinoClick == 0) {
    clickAllowed = true;
  }

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
    gameStateDelay++;

    serialPDM.transmit('squishBrightness', 0);

    playingStateStart = true;

    if(endStateStart) {
      playSound('bonk');
      Tone.Transport.bpm.value = 120;
      gameOver.start("+1");
      gameOver.loop = true;
      gameOver.loopEnd = 8;
      endStateStart = false;
      melody.stop();
      bass.stop();
      synth.releaseAll();
      bassSynth.releaseAll();
    }

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

    serialPDM.transmit('squishBrightness', 10);

    playingStateStart = true;

    gameOver.stop();
    melody.stop();
    bass.stop();
    synth.releaseAll();
    bassSynth.releaseAll();

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
    if(playingStateStart) {
      melody.start("+.25");
      bass.start("+.25");
  
      melody.loop = true;
      melody.loopEnd = 8;
  
      bass.loop = true;
      bass.loopEnd = 8;
      
      playingStateStart = false;
    }

    serialPDM.transmit('squishBrightness', 500);

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
    if(firstTime) {
      Tone.start();
      firstTime = false;
    }
    player.go();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].go();
    }
    gameState = 'playing';
  }

  if(keyCode == 32 && gameState == 'playing') {
    playSound('flap');
    player.jump();
  }

  if(keyCode == 32 && gameState == 'end' && gameStateDelay > 250) {
    player.reset();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].reset();
    }

    score = 0;

    endStateStart = true;
    gameState = 'paused';
  }

  if(keyCode == 27 && gameState == 'playing') {
    player.pause();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].pause();
    }
    gameStateDelay = 0;
    gameState = 'paused';
  }
  

}

function buttonPress() {

  if(gameState == 'paused') {
    if(firstTime) {
      Tone.start();
      firstTime = false;
    }
    player.go();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].go();
    }
    gameState = 'playing';
  }

  if(gameState == 'playing') {
    playSound('flap');
    player.jump();
  }

  if(gameState == 'end' && gameStateDelay > 250) {
    player.reset();
    for(let i = 1; i <= numObstacles; i++) {
      obstacles[i-1].reset();
    }

    score = 0;

    gameStateDelay = 0;
    endStateStart = true;
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
      this.x = pipeDistance*numObstacles - 44;
      this.y = random(window.innerHeight/2 - pipeVariablity, window.innerHeight/2 + pipeVariablity);
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
    this.y = random(window.innerHeight/2 - pipeVariablity, window.innerHeight/2 + pipeVariablity);
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

// sound helper function

function playSound(sound)
{
  sounds.player(sound).start();
}

