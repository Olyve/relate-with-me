#!/usr/bin/env bash

# Array to store logs
logs=()

# Find log files if they exist and add them to $logs
if [ -e "./combined.log" ]; then
  logs+=("./combined.log")
fi

if [ -e "./error.log" ]; then
  logs+=("./error.log")
fi

# Make sure the array is not empty before looping through and deleting
if [ ${#logs[@]} -gt 0 ]; then
  for i in "${logs[@]}"
  do
    rm $i
  done
fi