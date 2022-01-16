#!/bin/bash

NEWFILE=images/imageText.js
echo "function imageText() {" > $NEWFILE
echo "return {" >> $NEWFILE
# write to each line
for file in images/*; do
  # echo $file
  BASENAME=$(basename "$file")
  prefix=$(echo "$BASENAME" | cut -f 1 -d '.')
  easyText=$(echo "$prefix" | tr - ' ')
  case "$file" in
    *.txt|*.js)  ;;
    # *.png|*.jpg)     echo -n '"'"$(basename "$file")"'", ' >> $NEWFILE ;;
    *.png|*.jpg)     echo -ne '\t"'"$BASENAME"'":{\n\t\t"'"CVC"'":["'"$easyText"'"],\n\t\t"'"Blend"'":[null],\n\t\t"'"Digraph"'":[null],\n\t\t"'"Plural"'":[null],\n\t\t"'"Sight"'":[null],\n\t\t"'"Tricky"'":[null],\n\t\t"'"Long"'":[null]\n\t},\n' >> $NEWFILE ;;
    *)         echo "Unknown Filetype "$file ;;
  esac
done

# remove the last two characters (closing quote and space)
sed -i.bak  '$s/..$//' $NEWFILE
echo -e "\t}" >> $NEWFILE
echo "}; }" >> $NEWFILE

rm $NEWFILE.bak
