// Dean Serial

#include "PDMSerial.h"

PDMSerial pdm;

int sensorPin = A0;
int sensorData = 0;
int scaledData;

int ledPin = 3;

void setup() {
  pinMode(sensorPin, INPUT);
  
  pinMode(ledPin, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  sensorData = analogRead(sensorPin);
  scaledData = map(sensorData, 0, 1023, 0, 255);
  
  pdm.transmitSensor("a0", scaledData);
  pdm.transmitSensor("end");
  
  //Serial.println(sensorData);

  boolean newData = pdm.checkSerial();
  
  if(newData) {
    if(pdm.getName().equals(String("mouse"))) {
      int ledBrightness = map(pdm.getValue(), 0, 1000, 0, 255);
      analogWrite(ledPin, ledBrightness);
    }
  }
  
}
