#!/bin/bash

npm install jasmine-node

for file in *; do
  if [ ${file: -8} == ".spec.js" ]; then
    ../node_modules/jasmine-node/bin/jasmine-node "$file"
  fi
done
