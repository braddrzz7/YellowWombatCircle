
Puzzle.Types['MultipleAnswerPuzzle'] = {
  add: false,
  settings: {
    'n': IntegerValue(2, 3),
    'm': IntegerValue(2, 4),
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard']),
    'fullSet': () => undefined
  },
  layout: {
    'elementClass': 'categoryWord',
    fontSize:FontSizeValue(28)
  },
  content: {
    'items': (sett) => sampleFullSet(sett.value('fullSet')(sett), sett.value('n'), true, true)
  },
  makePuzzleBody: function(pz) {
    var m = pz.settings.value('m');
    var out= constructMultipleAnswerColumns(
      pz.id,
      pz.processedValue('items'),
      m, pz.layout.elementClass.value
    );
    out.find("div").css('font-size', pz.layout.value('fontSize'))
    return out;
  }
}


Puzzle.Types['FindWords'] = {
  tags : ['Writing', 'Words', 'Spelling'],
  category:'language',
  instruction : 'Make words out of the letters',
  fullSet : function() {
    return findWordsSets();
  },
  processContentFunctions : {
    'items': (xx) => xx.map(function(val) {
      var newVal = val.toUpperCase();
      newVal = shuffle(newVal.split('')).join('');
      newVal = '<div style=letter-spacing:8px;font-size:35;>' + newVal + '</div>';
      return newVal;
    })
  },
    parentPuzzle:'MultipleAnswerPuzzle'
}

Puzzle.Types['MutateWords'] = {
  tags : ['Reading', 'Writing', 'Words', 'Spelling'],
  category:'language',
  instruction : 'Change one letter repeatedly to make new words',
  fullSet : function() {
    return wordsToBeExtended();
  },
  processContentFunctions : {
    'items': (xx) => xx.map((x) => x.slice(1, -1))
  },
  parentPuzzle: 'MultipleAnswerPuzzle'
}

Puzzle.Types['Synonyms'] = {
  instruction : 'Write synonyms for the words',
  category:'language',
  tags : ['Reading', 'Writing', 'Words', 'Synonyms'],
  fullSet : function() {
    return synonymWords();
  },
  parentPuzzle: 'MultipleAnswerPuzzle'
}


Puzzle.Types['NameSeveral'] = {
  instruction : 'Name items in each category',
  tags : ['Reading', 'Writing', 'Words'],
  category:'language',
  fullSet : function() {
    return nameSomeList();
  },
  parentPuzzle:'MultipleAnswerPuzzle'
}


Puzzle.Types['RhymingWords'] = {
  instruction : 'Write some rhymes for each word',
  category:'language',
  subcategory:'reading',
  fullSet : function() {
    return getAllValues(rhymingWordSets());
  },
  tags : ['Rhyming', 'Writing', 'Words'],
  parentPuzzle: 'MultipleAnswerPuzzle'
};
