#include "producer.h"
#include "consumer.h"
#include <string>
#include <chrono>
#include <thread>


void produce() {
    std::string msg1 = "berries";
    consume(msg1);
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    std::string msg2 = "vegetables";
    consume(msg2);
}