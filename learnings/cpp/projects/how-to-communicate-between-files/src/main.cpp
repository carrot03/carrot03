#include <iostream>

#include "consumer.h"
#include "producer.h"

int main() {

    wakeUp();
    std::cout << "I am full now :)" << std::endl;
    return 0;
}