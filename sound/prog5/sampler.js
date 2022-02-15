
let sound1 = new Tone.Player('../sounds/G_ChordCowbell_732.mp3');


let sounds = new Tone.Players({
  'cowbell': '../sounds/G_ChordCowbell.mp3',
  'high_hat': '../sounds/high_hat.mp3',
  'bass': '../sounds/bass.mp3'
});

let buttons = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    sound1.toDestination();
    sounds.toDestination();

    buttons[0] = createButton('1');
    buttons[0].position(10, 10);
    buttons[0].size(window.innerWidth/2 - 20, window.innerHeight/2 - 20);
    buttons[0].mousePressed( ()=>playSound('cowbell') );

    buttons[1] = createButton('2');
    buttons[1].position(window.innerWidth/2, 10);
    buttons[1].size(window.innerWidth/2 - 20, window.innerHeight/2 - 20);
    buttons[1].mousePressed( ()=>playSound('high_hat') );

    buttons[2] = createButton('3');
    buttons[2].position(10, window.innerHeight/2);
    buttons[2].size(window.innerWidth/2 - 20, window.innerHeight/2 - 20);
    buttons[2].mousePressed( ()=>playSound('bass') );

    buttons[3] = createButton('4');
    buttons[3].position(window.innerWidth/2, window.innerHeight/2);
    buttons[3].size(window.innerWidth/2 - 20, window.innerHeight/2 - 20);
    buttons[3].mousePressed( ()=>playSound('high_hat') );

  }
  
function draw() {
    background(207, 107, 107);
}

function keyPressed() {
  sound1.start();
  console.log('play sound');
}

function playSound(whichSound) {
  if(whichSound == 'cowbell') {
    sounds.player('cowbell').start();
  } else if(whichSound == 'high_hat') {
    sounds.player('high_hat').start();
  } else if(whichSound == 'bass') {
    sounds.player('bass').start();
  }
}