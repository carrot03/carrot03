#include <LiquidCrystal.h>

// SENSOR PIN
const int IN_SENSOR_PIN = A1;
// LED PINS
const int LED_RED = 3;
// LCD PINS
const int rs = 8, en = 9, d4 = 10, d5 = 11, d6 = 12, d7 = 13; // Changed rs to pin 8
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

//VARIABLES
const int THRESHOLD = 540;//sets THRESHOLD value for when the LED turns on

void setup() {
  
  pinMode(IN_SENSOR_PIN, INPUT); //sensor pin set to input

  pinMode(LED_RED, OUTPUT); // LED pin set to OUTPUT

  lcd.begin(16, 2); // Set up the LCD's number of columns and rows
  
  // Testing the LCD
  lcd.print("hello world");
  delay(2000); // Wait for 2 seconds before clearing the screen
  lcd.clear();

  Serial.begin(9600);
}

void loop() {

  
  int SOUND_VALUE = analogRead(IN_SENSOR_PIN); //reads analog data from sound sensor
  Serial.println(SOUND_VALUE);
  if (SOUND_VALUE >= THRESHOLD){
    digitalWrite(LED_RED, HIGH); //turns RED LED on
    // Show the sensor value on the LCD
    lcd.setCursor(0, 0);
    lcd.print("Sound Value: ");
    lcd.setCursor(0, 1);
    lcd.print(SOUND_VALUE);

    delay(2000);
    lcd.clear();
    
    digitalWrite(LED_RED, LOW); //turn RED LED off
  }
  else{
    digitalWrite(LED_RED, LOW);
  }
}
