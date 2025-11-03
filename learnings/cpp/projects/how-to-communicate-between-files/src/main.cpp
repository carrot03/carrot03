#include <iostream>

#include "consumer.h"
#include "producer.h"

int main() {

    produce();
    std::cout << "I am full now :)" << std::endl;
    return 0;
}