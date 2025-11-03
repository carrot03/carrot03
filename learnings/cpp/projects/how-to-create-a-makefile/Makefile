########################################################################
########################## Makefile Template ###########################
########################################################################
# Description:
#   Generic Makefile for C++ projects with separate src/include/bin dirs.
#   Automatically compiles .cpp files from src/ into bin/, 
#   generates dependency files, and supports clean/run commands.
########################################################################

####################### Project Configuration ##########################
# Program / target name (the compiled executable)
TARGET      := main

# Project directories
SRC         := src
INCLUDE     := include
BIN         := bin
LIB         := lib

# External libraries (add -lmylib or -lpthread, etc.)
LIBRARIES   := 

# File extensions
SRC_EXT     := cpp
OBJ_EXT     := o
DEP_EXT     := d

######################## Compiler Configuration ########################
CXX         := g++
CXXFLAGS    := -Wall -Wextra -ggdb -MMD -MP -I$(INCLUDE)

######################### Derived Variables ############################
# List of all source files (e.g., src/foo.cpp, src/bar.cpp)
SOURCES     := $(wildcard $(SRC)/*.$(SRC_EXT))

# Convert each source into its corresponding object in bin/
OBJECTS     := $(SOURCES:$(SRC)/%.$(SRC_EXT)=$(BIN)/%.$(OBJ_EXT))

# Dependency files for tracking header changes
DEPS        := $(OBJECTS:.$(OBJ_EXT)=.$(DEP_EXT))

######################### Build Instructions ###########################
# Default rule (build the project)
all: $(BIN)/$(TARGET)
	@echo "Build complete! Executable: $(BIN)/$(TARGET)"

# Link all object files into the final executable
$(BIN)/$(TARGET): $(OBJECTS)
	@mkdir -p $(BIN)
	$(CXX) $(CXXFLAGS) -L$(LIB) $^ -o $@ $(LIBRARIES)
	@echo "Linked executable successfully."

# Compile each source file into an object file
$(BIN)/%.$(OBJ_EXT): $(SRC)/%.$(SRC_EXT)
	@mkdir -p $(BIN)
	$(CXX) $(CXXFLAGS) -c $< -o $@
	@echo "Compiled $< -> $@"

########################### Run the Program ############################
run: $(BIN)/$(TARGET)
	@echo "Running $(TARGET)..."
	@./$(BIN)/$(TARGET)

########################### Cleaning Rules #############################
clean:
	@rm -f $(BIN)/*.$(OBJ_EXT) $(BIN)/*.$(DEP_EXT) $(BIN)/$(TARGET)
	@echo "Cleaned build files."

########################### Dependencies ###############################
# Include automatically generated dependency files
-include $(DEPS)

############################ Phony Targets #############################
.PHONY: all clean run