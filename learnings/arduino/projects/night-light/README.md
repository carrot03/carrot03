## Content 

This project demonstrates the usage of LDR (Light Dependent Resistor) sensor, Photoresistor. In this project, a white LED is connected to the Arduino's digital output pin, and a basic program that get the resistor value of the LDR is used to light on the LED.

## [Live Demo](./assets/light-night.mp4)

https://github.com/user-attachments/assets/f9abf939-33fb-4727-a9c6-722385baa60d

## How it works
1. **Circuit Setup**: the LED and the LDR are connected to a digital pin on the Arduino through a resistor to limit the current. 
2. **Programming**: The Arduino is programmed to turn the LED on when the detected value of the LDR is less than 500. It turns off otherwise.

## Components
- 1x Arduino Mega2560 
- 1x Breadboard
- 2x 220 Ohm Resistors
- 1x LED
- 1x Photoresistor
- Wires

## Set up
<img src="./assets/night-light.jpg" width="50%" hight="50%"> 

</br>

## Wiring Diagram

<img src="./assets/breadboard-night-light.svg" width="50%" hight="50%"> 

## Circuit Schematic

<img src="./assets/schematic-night-light.svg" width="50%" hight="50%" color="grey"> 

[Fritzing project](./assets/night-light.fzz)

## References
- [Arduino-Night-Light](https://www.instructables.com/Arduino-Night-Light)
