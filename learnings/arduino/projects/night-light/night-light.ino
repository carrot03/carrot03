void setup()
{
 Serial.begin(9600);
 pinMode(7,OUTPUT) ;
 pinMode(A0,INPUT) ;
}

void loop()
{
    //getting the value of the LDR
  int c = analogRead(A0) ;

  Serial.println(c) ;

    //if the value of the LDR is less than 500, the LED will turn on
  if(c<500)
  {
    digitalWrite(7,HIGH) ; 
  }
  else
  {
    digitalWrite(7,LOW) ; 
  }
}