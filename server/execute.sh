#!/bin/bash
g++ -o /app/code /app/code.cpp

if [ $? -eq 0 ]; then
  /app/code
else
  echo "Compilation Error"
fi
