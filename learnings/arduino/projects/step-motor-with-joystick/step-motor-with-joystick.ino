#include <Stepper.h>

const int stepsPerRevolution = 2048;  // change this to fit the number of steps per revolution
const int rolePerMinute = 15;
const int X_pin = 1; // analog pin connected to X output

Stepper myStepper(stepsPerRevolution, 2, 4, 3, 5);
void setup() {
  myStepper.setSpeed(rolePerMinute);
  
  //Serial.begin(9600);

}

void loop() {
//  Serial.print("X-axis: ");
//  Serial.println(analogRead(X_pin));
  int a = analogRead(X_pin);
  if (a > 400 && a < 520)
  {
    for (int i = 2; i < 6; i++)
    {
      digitalWrite(i, LOW);
    }
  }
  else if (a < 400)
  {
    myStepper.setSpeed(rolePerMinute);
    myStepper.step(-30);
  }
  else if (a > 530)
  {
    myStepper.setSpeed(rolePerMinute);
    myStepper.step(30);
  }



}