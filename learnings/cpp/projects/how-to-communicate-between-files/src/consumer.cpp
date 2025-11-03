#include "consumer.h"
#include "producer.h"
#include <iostream>

int n_msgs = 0;

void consume(std::string &message) {
    n_msgs = n_msgs + 1;
    std::cout << "I received " << message << std::endl;
    std::cout << "Now I have " << n_msgs << " number of messages" << std::endl;
}