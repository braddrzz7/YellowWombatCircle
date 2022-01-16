#!/bin/bash

#
# find all the PDF files in a directory and make thumbnail images of their first pages
# $1 - folder
#
for file in $1*; do
  # namePDF=$(basename "$file")
fileJPEG=$(echo "$file" | cut -f 1 -d '.').jpeg
  echo $file
  echo $fileJPEG
  case "$file" in
    *.pdf)     gs -dNOPAUSE -dBATCH -sDEVICE=jpeg -sOutputFile=$fileJPEG -dLastPage=1 $file ;;
    *)          ;;
  esac
done
