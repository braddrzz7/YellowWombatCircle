#!/bin/bash

# make the file
NEWFILE=images/imageText.js
# touch $NEWFILE
# empty it
# echo -n "" > $NEWFILE
echo "function imageText() {" > $NEWFILE
echo "return {" >> $NEWFILE
# write to each line
for file in images/*; do
    # echo -n '"'"$(basename "$file")"'", ' >> $NEWFILE
  case "$file" in
    *.txt|*.js)  ;;
    # *.png|*.jpg)     echo -n '"'"$(basename "$file")"'", ' >> $NEWFILE ;;
    *.png|*.jpg)     echo -ne '\t"'"$(basename "$file")"'":{\n\t\ttype:"'"CVC"'",\n\t\teasyText:null,\n\t\tmediumText:null,\n\t\thardText:null\n\t},\n' >> $NEWFILE ;;
    *)         echo "Unknown Filetype "$file ;;
  esac
done

# remove the last two characters (closing quote and space)
sed -i.bak  '$s/..$//' $NEWFILE

echo "}; }" >> $NEWFILE

rm $NEWFILE.bak
