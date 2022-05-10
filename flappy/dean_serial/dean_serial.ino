// Dean Serial
#include "PDMSerial.h"
PDMSerial pdm;
int button1Pin = 2;
int ledPin = 9;
int button1State = 0;
void setup() {
  pinMode(button1Pin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}
void loop() {
  button1State = digitalRead(button1Pin);
  pdm.transmitSensor("button", button1State);
  pdm.transmitSensor("end");
  boolean newData = pdm.checkSerial();
  int ledBrightness = pdm.getValue();
  analogWrite(ledPin, ledBrightness);
}