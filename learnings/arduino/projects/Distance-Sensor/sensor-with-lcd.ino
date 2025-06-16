// C++ code
//

// include the library code:
#include <LiquidCrystal.h>
#include <DHT.h>

// Variables for the HC-SR04 Ultrasonic Sensor
const int trigPin = 10;
const int echoPin = 11;
float duration, distance = 0.0;
String distanceInString, durationInString;

// LCD
const int rs=2, en=3, db4=4, db5=5, db6=6, db7=7;
LiquidCrystal lcd(rs, en, db4, db5, db6, db7);

int DHT_PIN = 24; // pin for DHT sensor
#define DHTTYPE DHT11
DHT dht(DHT_PIN, DHTTYPE);
int temperature, humidity = 0; // Variables for temperature and humidity

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  dht.begin();
  
  lcd.begin(16, 2); // dimensions of the LCD

  Serial.begin(9600); 
  
}

void loop() {
  
    // Read temperature as Celsius (the default) 
  float tempCelcius = dht.readTemperature();
  float tempFahrenheit = dht.readTemperature() * 1.8 + 32.0;
  
    // Calculate temperature in degrees Celsius
  String tempCelciusString = "Temp(C): " + String(tempCelcius);
    // Calculate temperature in Fahrenheit
  String tempFahrenheitString = "Temp(F): " + String(tempFahrenheit);

    // Read humidity
  float humidity = dht.readHumidity();
  String humidityString = "Humidity: " + String(humidity) + "%";

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);

  duration = pulseIn(echoPin, HIGH); // Wait for pulse on echo pin
  float speedOfSound = 331.4 + 0.6 * tempCelcius + 0.0124 * humidity; // Speed of sound in air

    // Calculate distance in centimeters (cm)
  distance = (speedOfSound * duration) / 20000;
  
  distanceInString = "Dist(cm): " + String(distance);
  durationInString = "Duration(us): " + String(duration);

  // Printing humidity, temperature, distance, and duration values
  lcd.setCursor(0, 0); // Set the cursor to the first column, first row
  lcd.print(humidityString);
  lcd.setCursor(0, 1); // Set the cursor to the first column, second row
  lcd.print(tempCelciusString);

  delay(2000);
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print( distanceInString);
  lcd.setCursor(0, 1); 
  lcd.print(durationInString);

  delay(2000);
  lcd.clear();
  
}