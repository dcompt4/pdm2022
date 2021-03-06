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

let alignMusic = true;

// Squish Sound
let oscillator = new Tone.AMOscillator(100,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let panner = new Tone.Panner().connect(gain);
let squishSound = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.05,
  sustain: 0.05,
  release: 0.05
}).connect(panner);
oscillator.connect(squishSound);
let freqLFO = new Tone.LFO(1000,800,2000).start();
freqLFO.connect(oscillator.frequency); 
oscillator.volume.value = -30;





let synthA = new Tone.PolySynth().toDestination();
let synthB = new Tone.PolySynth().toDestination();

let melodypart2 = new Tone.Sequence((time, note) => {
  if(note != null) {
    synthA.triggerAttackRelease(note, '16n', time + 0.1);
  }
}, [null, 'C4', null, 'E4', null, 'A3',null, 'C4', null, 'F3', null, 'A3', null, 'G3', null, 'B3']);

let melodypart1 = new Tone.Sequence((time, note) => {
  if(note != null) {
    synthA.triggerAttackRelease(note, '8n', time);
  }
}, ['C4', null, 'E4', null, 'A3', null,'C4', null, 'F3', null, 'A3', null, 'G3', null, 'B3', null]);

let waitMusic = new Tone.Sequence((time, note) => {
  if(note != null) {
    synthB.triggerAttackRelease(note, '8n', time);
  }
}, ['C1', null, 'E1', null, 'A0', null,'C1', null, 'F0', null, 'A0', null, 'G0', null, 'B0', null]);



synthA.volume.value = -40;
synthB.volume.value = -20;



Tone.Transport.bpm.value = 120;
Tone.Transport.start();

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

    waitMusic.start();

    textSize(30);
    textAlign(CENTER, CENTER);
    text('Press space to start game!', 0, height/2, width);

    alignMusic = true;

  } else if(gameState == 'start') {

    if(alignMusic) {
      waitMusic.stop();
      alignMusic = false;
    }

    waitMusic.start();

    melodypart1.start();
    melodypart2.start();

    for(let i = 0; i < numEnemies; i++) {
      array[i].draw();
    }

    let myTime = 30 - timer();
    textAlign(LEFT, TOP);
    text('Timer: ' + myTime, 20, 20, width);
    text('Score: ' + score, 20, 50, width);

    synthA.volume.value = -40 + (20 - (myTime - 10));


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

    Tone.Transport.bpm.value = 120;
    melodypart1.stop();
    melodypart2.stop();
    waitMusic.start();

    textSize(30);
    textAlign(CENTER, CENTER);
    text('Game Over', 0, height/2 - 90, width);
    text('Score: ' + score, 0, height/2 - 30, width);
    text('High Score: ' + highScore, 0, height/2, width);
  
    text('Press space to start new game!', 0, height/2 + 60, width);

    alignMusic = true;
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

    bugWave = 1;
    score = 0;
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
          squishSound.triggerAttackRelease('8n');
          score++;
          Tone.Transport.bpm.value++;

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