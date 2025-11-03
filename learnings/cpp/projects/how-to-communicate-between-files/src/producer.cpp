#include "producer.h"
#include "consumer.h"
#include <string>


void produce() {
    std::string msg = "berries";
    consume(msg);
}