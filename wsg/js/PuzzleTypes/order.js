
Puzzle.Types['OrderPuzzle'] = {
  add:false,
  tags:['ordering'],
  instruction:'Put the elements in order',
  n:IntegerValue(6,6,1),
  elementClass: 'orderElement',
  elementCSS:{},
  fontSize:FontSizeValue(45),
  containerCSS : {
    'justify-content': 'space-evenly'
  },
  makePuzzleInstruction : function(pz) {
    var text = 'xxx';
    if (pz.settings.value('contentType') === 'words') {
      text = randomSample([
        `Put the ${pz.content.value('category')} in alphabetical order`,
        `Order the ${pz.content.value('category')} from smallest to largest`,
        `Order the ${pz.content.value('category')} from largest to smallest`
      ]);
    } else if (pz.settings.value('contentType') === 'letters') {
      text = `Put the letters in ${randomSample(['','reverse'])} alphabetical order`;
    } else if (['numbers','decimals','fractions'].includes(pz.settings.value('contentType'))) {
      text = `Put the numbers in ${randomSample(['increasing','decreasing'])} order`;
    };
    return $('<div></div>', {
      html: text
    });
  },
  makePuzzleBody : function(pz) {
    var values = pz.content.value('elements');
    var blanks = values.map(x => '___');
    var valRow = constructElementGrid(pz.id, values, pz.layout.object(), 'Values', updateElementFunction);
    var blanksRow = constructElementGrid(pz.id, blanks, pz.layout.object(), 'Blanks', null);
    valRow.find("div").css('font-size', pz.layout.value('fontSize'))
    blanksRow.find("div").css('font-size', pz.layout.value('fontSize'))
    return [valRow, blanksRow];
  },
  parentClass: ElementPuzzleNew
}


Puzzle.Types['OrderLetters']= {
  contentType : 'letters',
  tags:['letters'],
  category : 'language',
  subcategory :'alphabet',
  parentPuzzle:'OrderPuzzle'
}
Puzzle.Types['OrderNumbers']= {
  contentType : 'numbers',
  category : 'math',
  tags:['numbers'],
  subcategory :'counting',
  parentPuzzle:'OrderPuzzle'
}
Puzzle.Types['OrderNumbersFractions']= {
  tags:['fractions','numbers'],
  fontSize:FontSizeValue(35),
  contentType : 'fractions',
  category : 'math',
  subcategory :'counting',
  parentPuzzle:'OrderPuzzle'
}
Puzzle.Types['OrderNumbersDecimals']= {
  tags:['decimals','numbers'],
  fontSize:FontSizeValue(35),
  contentType : 'decimals',
  category : 'math',
  subcategory :'counting',
  parentPuzzle:'OrderPuzzle'
}
