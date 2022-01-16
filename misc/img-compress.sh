#!/bin/bash

# $1 = file path
# $2 = quality (0 - 100)
#
for file in $1*; do
  case "$file" in
    *.txt|*.js)  ;;
    *.png|*.jpg)     mogrify -resize 500x500 -quality 60 $file ;;
    *)         echo "Unknown Filetype "$file ;;
  esac
done
