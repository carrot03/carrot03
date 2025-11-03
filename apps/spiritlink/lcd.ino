#include <LiquidCrystal.h>

// pin setup for your working LCD wiring
const int rs = 13, en = 12, d4 = 11, d5 = 10, d6 = 9, d7 = 8; // Changed rs to pin 8
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

String message = "";
bool animationDone = false;

String frames[] = {
  "  (o_o)        ",
  "  (O_O)        ",
  "  (o_o)        ",
  "  (O_o)        "
};

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SpiritLink AI");
  lcd.setCursor(0, 1);
  lcd.print("Summoning...");
  delay(1200);
}

void loop() {
  if (Serial.available()) {
    // Read the entire buffer
    String message = "";
    while (Serial.available()) {
      char c = Serial.read();
      message += c;
      delay(2);  // small delay to allow buffer to fill
    }
    message.trim();  // remove extra \r or \n

    lcd.clear();

    // Split into two lines
    int newlineIndex = message.indexOf('\n');
    if (newlineIndex != -1) {
      String line1 = message.substring(0, newlineIndex);
      String line2 = message.substring(newlineIndex + 1);
      line2.trim();  // remove any leftover whitespace

      lcd.setCursor(0, 0);
      lcd.print(line1);
      lcd.setCursor(0, 1);
      lcd.print(line2);
    } else {
      lcd.setCursor(0, 0);
      lcd.print(message);
    }
  }
}

