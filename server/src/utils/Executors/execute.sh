#!/bin/bash
g++ -o /app/code /app/code.cpp

if [ $? -eq 0 ]; then
  /app/code < /app/input.txt  # Redirect input from the file
else
  echo "Compilation Error"
fi
