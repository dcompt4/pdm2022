// Dean Serial

#include "PDMSerial.h"

PDMSerial pdm;

int sensorXPin = A0;
int sensorYPin = A1;
int button1Pin = 2;
int ledPin = 9;

int sensorXData = 0;
int scaledDataX;

int sensorYData = 0;
int scaledDataY;

int button1State = 0;


void setup() {
  pinMode(sensorXPin, INPUT);
  pinMode(sensorYPin, INPUT);

  pinMode(button1Pin, INPUT);
  pinMode(ledPin, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  button1State = digitalRead(button1Pin);

  sensorXData = analogRead(sensorXPin);
  scaledDataX = map(sensorXData, 0, 1023, 0, 20);
  
  sensorYData = analogRead(sensorYPin);
  scaledDataY = map(sensorYData, 0, 1023, 0, 20);
  
  pdm.transmitSensor("x", scaledDataX);
  pdm.transmitSensor("y", scaledDataY);
  
  pdm.transmitSensor("button", button1State);
  
  pdm.transmitSensor("end");
  
  //Serial.println(sensorData);

  boolean newData = pdm.checkSerial();
  
  int ledBrightness = pdm.getValue();
  analogWrite(ledPin, ledBrightness);
  
  // if(newData) {
  //   if(pdm.getName().equals(String("squishBrightness"))) {
      
  //   }
  // }
  
}
