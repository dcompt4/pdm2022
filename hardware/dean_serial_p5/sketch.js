// Dean serial

let serialPDM;
let portName = "COM3";

let sensor;

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor = serialPDM.sensorData;
  // console.log(sensor);

  createCanvas(window.innerWidth,window.innerHeight);
}

function draw() {
  background([0,0,sensor.a0]);

  console.log(sensor.a0);
}

function mousePressed(){
  serialPDM.transmit('mouse', mouseY);
  console.log(mouseY);
}

