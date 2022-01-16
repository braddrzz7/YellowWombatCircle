
Puzzle.Types['CopyPuzzle'] = {
  tags:['writing'],
  instruction:'Copy',
  add:false,
  puzzleClass : 'puzzle copyQuestion',
  elementClass : 'uniformLetter',
  elementCSS : {
    'font-family': 'Comic Sans MS'
  },
  fontSize : FontSizeValue(70),
  parentClass: ElementPuzzleNew
}

Puzzle.Types['CopyLetters']= {
  tags:['letters'],
  contentType:'letters',
  n:IntegerValue(5,6,1),
  category:'language',
  subcategory:'writing',
  parentPuzzle: 'CopyPuzzle'
}

Puzzle.Types['CopyNumbers']={
  tags:['numbers'],
  contentType:'numbers',
  n:IntegerValue(5,6,1),
  category:'math',
  subcategory:'writing',
  parentPuzzle: 'CopyPuzzle'
}


Puzzle.Types['TracePuzzle'] = {
  tags:['writing','tracing'],
  instruction:'Trace',
  add:false,
  puzzleClass : 'puzzle traceQuestion',
  elementClass : 'traceLetter',
  fontFamily:EnumeratedValue(['print-clearly','penmanship-print','Comic Sans MS'],'print-clearly'),
  fontSize : FontSizeValue(70),
  parentClass: ElementPuzzleNew
}


Puzzle.Types['TraceLetters']= {
  tags:['letters'],
  contentType:'letters',
  n:IntegerValue(8,12,1),
  caseness:'Random',
  category:'language',
  subcategory:'writing',
  parentPuzzle: 'TracePuzzle'
}

Puzzle.Types['TraceNumbers']={
  tags:['numbers'],
  contentType:'numbers',
  n:IntegerValue(8,12,1),
  category:'math',
  subcategory:'writing',
  parentPuzzle: 'TracePuzzle'
}

Puzzle.Types['ReadNumbers']={
  tags:['numbers','reading','place value'],
  instruction: 'Read the numbers out loud',
  containerCSS:{'justify-content':'space-around'},
  elementCSS : {
    // 'width': '30%',
    'padding': '10px 25px'
  },
  contentType:'numbers',
  n:IntegerValue(4,8,1),
  commas:BooleanValue(true),
  minNumber: 1000,
  maxNumber:100000,
  category:'math',
  subcategory:'numbers',
  fontSize: FontSizeValue(40),
  parentClass: ElementPuzzleNew,
  processContentFunctions : {
    'elements': (xx,sett) => xx.map(function(val) {
      if (sett.value('commas')===true) {
        return Number(val).toLocaleString();
      } else {
        return val;
      }
    })
  }
}

class GridPuzzle extends ElementPuzzleNew {
  constructor(inputObject) {
    super(inputObject);
    this.instruction = opVal(inputObject.instruction, "");
    this.layout = new Layout({}, layoutObject({
        'puzzleClass': 'puzzle traceQuestion',
        'elementClass': 'outlineLetter',
        'showHeader': BooleanValue(false)
      },
      inputObject));
  }
};

Puzzle.Types['LetterPage'] = function(inputObject = {}) {
  var puzz = new GridPuzzle({
    tags:['letters'],
    contentType: 'letters',
    n: 26,
    shuffle: false,
    instruction: "",
    elementClass: "outlineLetter",
    caseness: opVal(inputObject.caseness, 'UpperCase'),
    elementCSS: {
      'margin-left': '4%',
      'margin-right': '4%',
      'margin-bottom': '1%',
      'margin-top': '1%',
      'font-family': 'Comic Sans MS',
      'font-size': '100'
    },
    fontSize: FontSizeValue(100)
  });
  return puzz;
}


Puzzle.Types['NumberPage'] = function(inputObject = {}) {
  var puzz = new GridPuzzle({
    tags:['numbers'],
    contentType: 'numbers',
    n: 10,
    shuffle: false,
    minNumber: 1,
    elementClass: "outlineLetter",
    elementCSS: {
      'margin-left': '8%',
      'margin-right': '8%',
      'margin-bottom': '2%',
      'margin-top': '1%',
      'font-size': '155',
      'font-family': 'Comic Sans MS'
    },
    fontSize: FontSizeValue(155)
  });
  return puzz;
}



Puzzle.Types['WordBuilding'] = {
  add: false,
  tags: ['reading','writing','spelling','words'],
  settings: {
    'n': IntegerValue(4, 8),
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard']),
    'wordListFunction': () => [],
    'unique': true,
    'shuffle': true
  },
  layout: {
    'elementClass': 'categoryWord',
    'elementCSS': {
      'font-size': '50',
      'margin': '5%',
      'letter-spacing': '5px',
      'font-family': 'Courier',
      'width': '35%',
      'display': 'flex',
      'justify-content': 'center',
      'flex-wrap': 'wrap'
    }
  },
  content: {
    'words': (sett) => sampleFullSet(sett.value('wordListFunction')(),
      sett.value('n'), sett.value('unique'),
      sett.value('shuffle'))
  },

  makePuzzleBody: function(pz) {
    var wordArray = pz.content.value('words').map(
      function(word) {
        return word.toUpperCase();
      }
    );
    return gridWithElements(pz.id, wordArray, pz.layout.elementClass.value);
  }
}


Puzzle.Types['WordExtension'] = {
  tags: ['reading','writing','spelling','words'],
  wordListFunction : wordsToBeExtended,
  category:'language',
  subcategory:'spelling',
  instruction : "Extend the words into new words",
  parentPuzzle: 'WordBuilding'
}


Puzzle.Types['WordFilling'] = {
  tags: ['reading','writing','spelling','words'],
  category:'language',
  subcategory:'spelling',
  instruction:'Fill the spaces to make words',
  wordListFunction: wordsToBeFilled,
  parentPuzzle : 'WordBuilding'
}




Puzzle.Types['WordListPuzzle'] = {
  tags: ['language'],
  category:'language',
  settings: {
    'n': IntegerValue(1, 4, 1),
    'm': IntegerValue(3, 8, 1),
    'caseness': 'UpperCase'
  },
  layout: {
    'puzzleClass': 'puzzle wordListQuestion',
    'elementClass': 'bigWord'
  },
  content: {
    'wordSets': function(settings) {
      const wordSet = function(settings, prefix) {
        var m = settings.value('m');
        var pref;
        var allSets = rhymingWordSets();
        if (prefix == undefined || prefix == "?") {
          pref = randomSample(Object.keys(allSets));
        } else {
          pref = prefix;
        };
        var array = allSets[pref];
        var samp;
        if (m <= array.length) {
          samp = randomSample(array, m);
        } else {
          samp = shuffle(array);
        };
        // sort from shortest to longest
        samp.sort(function(a, b) {
          return a.length - b.length || // sort by length, if equal then
            a.localeCompare(b); // sort by dictionary order
        });
        // add rhyming prefix to start
        samp.unshift("-" + pref);
        if (settings.value('caseness') == "UpperCase") {
          samp = samp.map(x => x.toUpperCase());
        }
        return samp;
      }
      return range(0, settings.value('n')).map(x => wordSet(settings, '?'));
    }
  },

  makePuzzleBody: function(pz) {
    var wordColumns = pz.content.value('wordSets');
    var columns = wordColumns.map(
      x => constructColumnOfValues(pz.id, x, pz.layout.elementClass.value)
    );
    var container = constructColumnContainer(pz.id, columns);
    return container;
  }

}


Puzzle.Types['QuestionPuzzle'] = {
  tags: ['writing','questions'],
  add:false,
  settings: {
    'n': IntegerValue(1, 3),
    'questionsFunction': allQuestions(),
    'unique': true,
    'shuffle': true
  },

  instruction: "Answer the questions",

  layout: {
    'puzzleClass': 'puzzle questionQuestion ',
    'elementCSS': {
      'width': '90%',
      'font-size': '30',
      'margin-bottom': '10%',
      'justify-content': 'left'
    }
  },
  content: {
    'questions': (sett) => sampleGenerator(sett.value('questionsFunction'),
      sett.value('n'), sett.value('unique'),
      sett.value('shuffle'))
  },

  makePuzzleBody: function(pz) {
    return gridWithElements(pz.id, pz.content.value('questions'), pz.layout.elementClass.value);
  }

}

Puzzle.Types['QuestionsMathAddition'] = {
  tags:['math','addition'],
  n:IntegerValue(1,3,1),
  category:'math',
  subcategory:'addition',
  questionsFunction :[
    mathAdditionQuestion,
    makeTotalPlusQuestion,
    // makeTotalMinusQuestion,
    mathSubtractionQuestion
  ],
  parentPuzzle: 'QuestionPuzzle'
}


Puzzle.Types['QuestionsMathComparison'] = {
  tags:['math','comparisons'],
  n:IntegerValue(1,3,1),
  category:'math',
  subcategory:'comparisons',
  questionsFunction :oneComparativeProblem,
  parentPuzzle: 'QuestionPuzzle'
}

Puzzle.Types['QuestionsTimeComparison'] = {
  tags:['math','time','comparisons'],
  n:IntegerValue(1,3,1),
  category:'math',
  subcategory:'time',
  questionsFunction :timeComparisonQuestion,
  parentPuzzle: 'QuestionPuzzle'
}


Puzzle.Types['PatternPuzzle'] = {
  settings: {
    'n': IntegerValue(1, 4),
    'm': IntegerValue(2, 3),
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard']),
    'elementType': EnumeratedValue(['letters', 'numbers', 'random'])
  },
  layout: {
    'elementCSS': {
      'width': '100%',
      'font-size': '45',
      'margin': '2%',
      'letter-spacing': '2px',
    }
  },

  instruction: 'Complete the patterns',
  content: {
    'patterns': new SamplingSet({
      'samplingFunction': function(settings) {
        const n = settings.value('n');
        const m = settings.value('m');
        let type = settings.value('elementType');
        let values = [];
        for (var i = 0; i < n; i++) {
          type = (type == 'random') ? randomSample(['letters', 'numbers']) : type;
          if (type == 'letters') {
            values.push(letterPattern(m, 'easy'));
          } else if (type == 'numbers') {
            values.push(numberPattern(m, 'easy'));
          }
        };
        return values;
      }
    })
  },

  makePuzzleBody: function(pz) {
    var values = pz.content.value('patterns');
    var joinedArrays = values.map(x => x.join(' '));
    var grid = constructElementGrid(pz.id,
      joinedArrays, pz.layout.object(), 'Pattern', updateElementFunction);
    return grid;
  }

}


Puzzle.Types['ImageCount'] = {
  tags: ['Counting','math','baby'],
  category:'math',
  subcategory:'counting',
  'settings': {
    'numImages': IntegerValue(3, 8, 1),
    'numSamples': IntegerValue(10, 30, 1),
    'numCount': IntegerValue(2, 4, 1),
    imageSize:IntegerValue(100,150,1,120)
  },
  'puzzleType': 'Counting',
  'instruction': 'Count',
  'content': {
    'picsToUse': (settings) => randomSample(imageNames(), settings.value('numImages')),
    'sample': function(settings, content) {
      return randomChoice(content.value('picsToUse'), settings.value('numSamples'));
    }
  },
  'makePuzzleBody': function(pz) {
    var sample = pz.content.value('sample')
    var imgSize = pz.settings.value('imageSize')
    var imgEls = [];
    for (var i = 0; i < sample.length; i++) {
      imgEls.push(
        $("<img>", {
          src: imagesPath + '/' + sample[i],
          width: imgSize,
          height:imgSize,
          class:'contain'
        })
      );
    };
    var top = gridOfHTML(pz.id, imgEls.map(x => x[0]), '', {
      'margin': '1%'
    })
    var picsToUse = this.content.value('picsToUse');
    var numCount = this.settings.value('numCount');
    var countMe = picsToUse.slice(0, numCount).map(x => imageNameFromFileName(x));
    var withLines = countMe.map(function(x) {
      return constructColumn([x, '____'], 'flexElement', {
        'justify-content': 'center'
      }, {})[0];
    });
    var bottom = gridOfHTML(pz.id, withLines, {
      'width': '100%',
      'display': 'flex',
      'justify-content': 'space-around'
    }, {
      'width': Math.floor((100 / pz.settings._numCount - 1)).toString() + '%',
      'font-size': '40',
      'display': 'flex',
      'justify-content': 'center'
    });
    var container = $('<div></div>', {
      // 'class': 'puzzle'
    });
    container.append([top, bottom]);
    return container;
  }
}



Puzzle.Types['AlphabetGame'] = {
  tags: ['Writing', 'Spelling', 'Words', 'Letters'],
  category:'language',
  subcategory:'writing',
  settings: {
    'n': 1,
    position:EnumeratedValue(['starts with', 'ends with', 'contains'])
  },
  layout: {
    'elementCSS': {
      'width': '46%',
      'margin': '5px',
      'margin-botton': '3%',
      'margin-top': '3%',
      'font-size': '30'
    },
    'containerCSS': {
      // 'margin-top':'10%'
    }
  },

  content: {
    'category': () => randomSample(['Animal', 'Food', 'Pokemon',
      'Person', 'Place', 'Adverb', 'Noun', 'Adjective',
      'Short Word', 'Long Word',
      'Word starting with a vowel', 'Word ending in a vowel'
    ])
  },
  makePuzzleInstruction: function(pz) {
    var categ = pz.content.value('category');
    var pos = pz.settings.value('position');
    var highlightStyle = 'style="font-family:Arial Black; text-decoration:underline"';
    var instrHTML = `Name ${aOrAn(categ)} ${'<span '+highlightStyle +'>'+ categ +'</span>'}
    that ${'<span ' + highlightStyle + '>' + pos + '</span>'} each letter`
    return $('<div></div>', {
      html: instrHTML
    })
  },

  makePuzzleBody: function(pz) {
    var categ = pz.content.value('category');
    var pos = pz.settings.value('position');
    var start, end;
    if (pos == 'starts with') {
      start = '';
      end = '________________'
    } else if (pos == 'ends with') {
      start = '________________';
      end = '';
    } else {
      start = '________';
      end = '________';
    };
    var letters = allLetters().map(x => start + x.toUpperCase() + end);
    var letterPairs = [];
    var m = letters.length / 2;
    for (var i = 0; i < m; i++) {
      letterPairs.push([letters[i], letters[m + i]]);
    };
    // riffle the first and second halfs so we can write them as two columns
    var lettersRiffled = flatten(letterPairs);
    var grid = constructElementGrid(this.id, lettersRiffled, this.layout.object(), 'Alphabet', null);
    return grid;
  }
}


Puzzle.Types['PictureWords'] = {
  tags: ['language','spelling'],
  category:'language',
  subcategory:'spelling',
  settings: {
    'n': IntegerValue(2, 6, 1),
    minWordLength:IntegerValue(3,10,1,3),
    maxWordLength:IntegerValue(3,20,1,20),
    'MissingLetters': '?',
    'showWords': true,
  },
  layout:{
    fontSize: FontSizeValue('Automatic')
  },
  instruction: 'Complete the words',
  content: {
    'items': (settings) => randomSample(imageNames().filter(x=>imageNameFromFileName(x).length <= settings.value('maxWordLength')&&imageNameFromFileName(x).length >= settings.value('minWordLength')), settings.value('n'))
  },

  makePuzzleBody: function(pz) {
    var samp = pz.content.value('items');
    const showWords = pz.settings.value('showWords')
    var els = [];
    var imgEl, blankEl, blankInds, blankWord, chars, cont,
      folder, filename, word;
    var numMissing = pz.settings.value('MissingLetters');
    var numMissingF = function(chars) {
      if (numMissing == "?") {
        return randomInteger(1, Math.ceil(chars.length / 2));
      } else {
        return numMissing;
      }
    }

    for (var i = 0; i < samp.length; i++) {
      folder = imagesPath;
      filename = samp[i];
      // get the word (first letter part of filename)
      word = imageNameFromFileName(filename);
      chars = word.toUpperCase().split("");
      var possibleSwaps = [];
      chars.map(function(x, ind) {
        if (x !== ' ') {
          possibleSwaps.push(ind)

        }
      })
      blankInds = randomSample(possibleSwaps, numMissingF(possibleSwaps));
      blankInds.map(x => (chars[x] = '_'));
      blankWord = chars.join("");
      cont = imgWordPair(folder + '/' + filename, blankWord, {}, showWords);
      els.push(cont);
    };
    var main = $("<div></div>", {
      style: "width:100%;display:flex;flex-wrap:wrap;" +
        "justify-content:space-evenly;" +
        "margin:1px"
    })
    main.append(els);
    return main;
  }

}

Puzzle.Types['BabyPictureWords'] = function(inputObject = {}) {
  inputObject.instruction = ''
  inputObject.MissingLetters = 0
  return Puzzle.generate('PictureWords', inputObject);
}




Puzzle.Types['SizeComparison'] = {
  tags: ['comparisons','size'],
  category:'math',
  subcategory:'comparisons',
  layout:{
    showHeader:false,
    fontSize:FontSizeValue(35)
  },
  settings: {
    'imageName': EnumeratedValue(['cat', 'pig', 'rat', 'fish', 'tree', 'bat'])
  },
  content: {
    'sizes': () => shuffle([80, 110, 140, 170]),
    'names': () => randomSample(namesList().filter(x => x.length < 6), 4),
    'questions': function(settings, content) {
      const imgName = settings.value('imageName')
      const names = content.value('names')
      return [
        `Which ${imgName} is ${randomSample(['biggest', 'smallest'])}?`,
        `Which ${pluralize(0,imgName,false)} are ${randomSample(['bigger', 'smaller'])} than ${randomSample(names)}?`,
        `Which ${imgName} is to the ${randomSample(['left', 'right'])} of ${randomSample(names)}?`
      ];
    }
  },

  makePuzzleBody: function(pz) {
    var src = 'images/drawings/' + pz.settings.value('imageName') + '.png';
    var names = pz.content.value('names');
    var imgs = pz.content.value('sizes').map(function(size, ind) {
      var img = $('<img height="' + size + '" src="' + src + '" class="flexElement">');
      var name = $('<div></div>', {
        html: names[ind],
        'class': 'flexElement',
        'width': '100%'
      });
      var cont = $('<div></div>', {
        'class': 'flexContainer',
        'align-items': 'baseline'
      });
      return cont.append(img, name);
    })
    var container = $('<div></div>', {
      'class': 'flexContainer',
      'style': 'align-items:baseline;'
    })
    var questions = constructElementGrid(pz.id, pz.content.value('questions'), {
        elementClass: 'flexElement',
        elementCSS: {
          'width': '100%',
          'justify-content': 'left',
          'font-size': '30',
          'margin': '2.5% 2%'
        }
      },
      'Questions', null);
    container.append(imgs);
    container.append(questions);
    adjustFont(container,'div.grid',pz.layout)
    return container;

  }

}


Puzzle.Types['SubWords'] = {
  'tags': ['reading','spelling'],
  category:'language',
  'layout': {
    'elementCSS': {
      'font-size':50,
      'font-family': 'Arial',
      'letter-spacing': '2px',
      'padding': '10px'
    }
  },
  'content': {
    'word': () => randomSample(bigWordsForSubwords())
  },
  'instruction': 'Find words in the big word',
  'makePuzzleBody': function(pz) {
    var word = this.content.value('word');
    var el = $("<div></div>", {
      text: word,
      'class': this.layout.elementClass.value
    });
    el.css(this.layout.object().elementCSS);
    return el;
  }
}


Puzzle.Types['PictureJumble'] = {
  tags: ['Spelling','language'],
  category:'language',
  subcategory:'spelling',
  instruction: 'Unscramble the words',
  settings: {
    'n': IntegerValue(2, 6, 1),
    'maxLength': IntegerValue(3, 8, 1)
  },
  content: {
    'picsAndJumbled': function(settings) {
      var shortImgs = imageNames().filter(x => imageNameFromFileName(x).length <= settings.value('maxLength'));
      var n = settings.value('n')
      if (shortImgs.length < n) {
        randomSample(imageNames(), n - shortImgs.length).map(x => shortImgs.push(x));
      }
      const imgs = randomSample(shortImgs, n);
      const words = imgs.map(img=>imageNameFromFileName(img));
      const charss = words.map(word=>word.toUpperCase().split(""));
      const jumbleds = charss.map(chars=>shuffleStrict(chars));
      return [imgs,jumbleds];
    }

  },

  makePuzzleBody: function(pz) {
    const [pics,jumbleds] = pz.content.value('picsAndJumbled')
    var els = [];
    var imgEl, blankEl, blankWord, chars, cont,
      folder, filename, word;

    for (var i = 0; i < pics.length; i++) {
      folder = imagesPath;
      filename = pics[i];
      cont = imgJumbleBlankPair(folder + '/' + filename, jumbleds[i],pz.layout);
      els.push(cont);
    };
    var main = $("<div></div>", {
      style: "width:100%;display:flex;flex-wrap:wrap;" +
        "justify-content:space-evenly;" +
        "margin:1px"
    })
    main.append(els);
    return main;
  }

}


Puzzle.Types['Jumble'] = {
  tags: ['Spelling','language'],
  category:'language',
  subcategory:'spelling',
  presetSettings: [AddCategoryWords],
  // AddCategoryWords(this, inputObject)

  makePuzzleInstruction: function(pz) {
    return $('<div></div>', {
      text: `Unscramble the ${pz.content.value('categoryAndWords')[0]}`
    });
  },
  makePuzzleBody: function(pz) {
    var container = $('<div></div>', {
      'class': 'flexContainer'
    });
    var words = pz.content.value('categoryAndWords')[1]
    var wordBoxes = words.map(x => Puzzle.Types['Jumble'].makeOneWordBox(x, pz.layout.value('fontSize')));
    container.append(wordBoxes);
    return container;
  },

  makeOneWordBox: function(word, fontSize) {
    var scrambled = (shuffleStrict(word.split(''))).join('');
    scrambled = scrambled.toUpperCase();
    var blanks = constantVector('_', scrambled.length).join('');
    return constructColumn([scrambled, blanks], 'scramblePair', {}, {
      // 'width': '45%',
      'display': 'flex',
      'justify-content': 'center',
      'border': 'dashed 1px lightgray',
      'margin': '3%',
      'padding': '1%'
    }, fontSize);
  }

}

Puzzle.Types['CountingSimple'] = {
  tags: ['Math', 'Counting', 'Baby','numbers'],
  category:'math',
  subcategory:'counting',
  layout: {
    'puzzleClass': 'puzzle',
    'elementCSS': {
      'margin': '3%'
    },
    'showHeader': Boolean(false)
  },
  'instruction': '',
  settings: {
    'n': IntegerValue(1, 3, 1)
  },
  content: {
    'images': function(sett) {
      var n = sett.value('n')
      var imgs = randomSample(imageNames(), n);
      var counts = randomSample(range(1, 6), n);
      var arrays = imgs.map(function(x, ind) {
        return constantVector(imagesPath + '/' + imgs[ind], counts[ind]);
      })
      return arrays;
    }
  },

  makePuzzleBody: function(pz) {
    var container = $('<div></div>', {
      'style': 'width:100%;display:flex;flex-wrap:wrap;justify-content:center;' +
        'align-content:space-between;'
    });
    var row, grid, imgs;
    for (var i = 0; i < pz.content.value('images').length; i++) {
      imgs = pz.content.value('images')[i];
      grid = gridWithImages(this.id, imgs, '');
      grid.css({
        'width': '80%',
        'align-items': 'center'
      })
      row = $('<div></div>', {
        style: 'display:flex;width:100%;margin:2% 1%;' +
          'border:solid 1px black !important;' +
          'padding: 2%;'
      });
      row.append([grid,
        $('<div></div>', {
          'html': imgs.length,
          'style': 'width:10%;font-size:150;display:flex;align-items:center;',
          'class': 'outlineLetter'
        })
      ])
      container.append(row);
    };
    return container;
  }
}


Puzzle.Types['StoryPuzzle'] = {
  'tags': ['Writing', 'Story'],
  category:'language',
  subcategory:'writing',
  instruction: 'Write a story',

  makePuzzleBody: function() {
    var storyStart = $('<div></div>', {
      text: 'Once upon a time... '
    });
    storyStart.css({
      'justify-content': 'left'
    })
    var storyEnd = $('<div></div>', {
      text: '...The End '
    });
    storyEnd.css({
      'margin-top': '400px',
      'justify-content': 'right'
    });
    var container = $('<div></div>', {
      'width': '100%'
    });
    container.addClass('grid');
    container.css({
      'font-size': '35',
      'border': '1px solid black',
      'margin': '0px'
    })
    return container.append([storyStart, storyEnd]);
  }
}



Puzzle.Types['WordBoxes'] = {
  'tags': ['Writing'],
  category:'language',
  subcategory:'writing',
  'settings': {
    'n': IntegerValue(2, 5),
    'caseness': EnumeratedValue(['UpperCase', 'LowerCase', 'Capitalize', 'RandomMix'])
  },
  'content': {
    'word': () => randomObjectValues(wordGroups(), '?', function(x) {
      return x.length <= 6;
    }, 1, true, true)[1][0]
  },
  'makePuzzleInstruction': function(pz) {
    var word = pz.content.value('word')
    var caseness = pz.settings.value('caseness')
    const str = underlineSpan(caseAdjust(word, caseness));
    return `Write the word ${str} in each box`;
  },
  'makePuzzleBody': function(pz) {
    var n = pz.settings.value('n');
    var word = pz.content.value('word');
    var sizes = [
      [1.2, 2],
      [2.2, 4.5],
      [3.5, 7],
      [4, 7.5],
      [5, 8]
    ].map(x => [x[0] * 4, x[1]]);
    var boxes = randomSample(sizes, n).map(
      x => $('<div></div>', {
        'class': 'flexContainer box',
        'width': x[0] + 'em',
        'height': x[1] + 'em'
      })
    );
    boxes.map(x => x.css({
      'margin': '1%'
    }))
    var container = $('<div></div>', {
      'class': 'flexContainer'
    })
    container.css({
      'justify-content': 'space-around'
    });
    container.append(boxes);
    return container;
  }
}


Puzzle.Types['VowelWordList'] = {
  'tags': ['Reading', 'Phonics', 'Words'],
  category:'language',
  subcategory:'vowels',
  'makePuzzleInstruction': () => 'Write a word with each vowel sound',
  'layout': {
    'elementCSS': {
      'width': '98%',
      'margin': '18px 5px',
      'font-size': '32'
    }
  },
  'makePuzzleBody': function(pz) {
    const styleHeader = function(str) {
      return `<span style='font-size:20; font-weight:bold;justify-content:center;display:flex;'>${str.toUpperCase()} VOWEL SOUND</span>`
    }
    var letters = allVowels().map(x => x.toUpperCase());
    var shortWordLines = letters.map(x => (x + ': ______________'))
    shortWordLines.unshift(styleHeader('short'))
    var longWordLines = letters.map(x => (x + ': ______________'))
    longWordLines.unshift(styleHeader('long'))
    var shortWordColumn = constructColumn(
      shortWordLines, '', pz.layout.object().elementCSS, {})
    var longWordColumn = constructColumn(
      longWordLines, '', pz.layout.object().elementCSS, {})
    return constructColumnContainer(pz.id, [shortWordColumn, longWordColumn]);
  }
}




Puzzle.Types['DrawThing'] = {
  'tags': ['Drawing'],
  category:'drawing',
  subcategory:'drawing',
  layout: {
    'puzzleClass': 'puzzle ',
    'puzzleSize':  puzzleSizeMenu('1/2 Page')
  },
  'makePuzzleInstruction': () => drawingInstruction()
}


Puzzle.Types['DescribeThing'] = {
  'tags': ['Writing'],
  category:'language',
  subcategory:'writing',
  layout: {
    'puzzleClass': 'puzzle',
    'puzzleSize':  puzzleSizeMenu('1/3 Page')
  },
  'content': {
    'thing': () => randomObjectValues(wordGroups(),
      ['animals', 'foods', 'vehicles', 'buildings', 'pokemon'], null, 1, true)[1]
  },
  'makePuzzleInstruction': (pz) => `Describe a ${pz.content.value('thing')}`
}

var starterTextObj = {
  'None':'&nbsp;',
  'Alphabet':'ABCDEFG',
  'Story':'Once upon a time',
  'Day':'Today was great because',
  'Diary':'Dear diary, today'
}


Puzzle.Types['WritingBox'] = {
  'tags': ['Writing'],
  category:'language',
  instruction:'',
  subcategory:'writing',
  layout: {
    'showHeader':false,
    'puzzleClass': 'puzzle',
    'puzzleSize':  puzzleSizeMenu('Full Page'),
    'showBorder':false
  },
  settings: {
    'pictureBox':IntegerValue(5,150,1,75),
    'starterText':EnumeratedValue(Object.keys(starterTextObj)),
    'lineSpacing':IntegerValue(10,20,1,15),
    'emptySpacing':IntegerValue(10,10,1,5),
    'middleLine':EnumeratedValue(['true','false'],true),
    'topLine':EnumeratedValue(['true','false'],true),
    'sidePadding':false
  },
  'makePuzzleBody': function(pz, sett, content, layout) {
    var starterText = sett.value('starterText')
    var pictureBox = parseInt(sett.value('pictureBox')) // mm
    var boxHeight = parseInt(pageHeightObject[layout.puzzleSize]) // mm
    var emptySpacing = parseInt(sett.value('emptySpacing')) // mm
    var lineSpacing = parseInt(sett.value('lineSpacing')) // mm
    var numEls = Math.floor((boxHeight-pictureBox)/(lineSpacing+emptySpacing))
    var container = $('<div>',{'class':'flexContainer',contentEditable:true}).css({
      'width':'100%',
      // 'background':'#f5f5f5',
      // 'font-size':lineSpacing+3+'mm'
      'font-size':lineSpacing*1.5+'mm',
      'line-height':0.7
    })


    if (pictureBox > 0 ) {
      container.append($('<div>',{'class':'flexElement'}).css({
        'height':pictureBox+'mm',
        'width':'100%',
        // background:'white'
      }))
    }

    var oneBox
    for (var i=0; i<numEls; i++) {
      oneBox = $('<div>',{html:'&nbsp;'+(i===0?starterTextObj[starterText]:'')})
      if (sett.value('middleLine')) {
        oneBox.append($('<div>',{}).css({
          display:'block',
          position:'absolute',
          'width':'100%',
          'height':(lineSpacing/2)+'mm',
          'padding':'0mm',
          'margin': '0mm',
          'border-bottom':'dotted lightgray 1px',
          'z-index':-1
        }))
      oneBox.css({
        'display':'flex',
        'flex-wrap':'wrap',
        'width':'100%',
        'height':lineSpacing+'mm',
        'padding':'0mm 0mm 0mm 2mm',
        'font-family':'print-clearly',
        'margin': emptySpacing/2+'mm 0mm',
        // background:'white',
        'border-top':((sett.value('topLine'))?'solid lightgray 1px':''),
        'border-bottom':'solid black 1px'
      })
      }
      container.append(oneBox)
    }
  if (sett.value('sidePadding')===true) {
    $('#'+pz.id).css({'margin-left':'','margin-right':''})
    $('#'+pz.id+'PuzzleBody').css({'margin-left':'','margin-right':''})
  } else {
    $('#'+pz.id).css({'margin-left':'0','margin-right':'0'})
    $('#'+pz.id+'PuzzleBody').css({'margin-left':'0','margin-right':'0'})
  }

    return container;
  }
}


Puzzle.Types['WritingBoxEasy'] = {
  category:'Writing',
  pictureBox:0,
  lineSpacing:15,
  emptySpacing:4,
  middleLine:true,
  showBorder:false,
  parentPuzzle: 'WritingBox'
}
Puzzle.Types['WritingBoxEasyPicture'] = {
  category:'Writing',
  pictureBox:100,
  parentPuzzle: 'WritingBoxEasy'
}
Puzzle.Types['WritingBoxMedium'] = {
  category:'Writing',
  pictureBox:0,
  lineSpacing:9,
  emptySpacing:2,
  middleLine:true,
  parentPuzzle: 'WritingBox'
}
Puzzle.Types['WritingBoxMediumPicture'] = {
  category:'Writing',
  pictureBox:80,
  parentPuzzle: 'WritingBoxMedium'
}



Puzzle.Types['PartsOfSpeechWordList'] = {
  'tags': ['Writing', 'Grammar', 'Parts of Speech'],
  category:'language',
  subcategory:'grammar',
  'settings': {
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard'], 'medium')
  },
  'content': {
    'speechParts': function(sett) {
      if (sett.value('difficulty') === 'easy') {
        return ['NOUN', 'VERB'];
      } else if (sett.value('difficulty') === 'medium') {
        return ['NOUN', 'ADJECTIVE', 'VERB', 'ADVERB'];
      } else {
        return ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION', 'ARTICLE'];
      }
    },
    'category': () => randomSample(['Animals', 'Food', 'Pokemon', 'People', 'School'])
  },
  'layout': {
    'elementCSS': {
      'width': '98%',
      'margin': '18px 5px'
      // 'font-size': '30'
    },
    'containerCSS': {
      // 'margin-top':'10%'
    },
    'fontSize': FontSizeValue(30)
  },

  'makePuzzleInstruction': (pz, sett, content) =>
    `For each part of speech, write a word related to: ${content.value('category')}`,
  /*
    TODO make a function that takes an array and makes a column of lines
    (this, alphabet game, volw sound words, ...)
  */

  'makePuzzleBody': function(pz, sett, content, layout) {
    var speechParts = content.value('speechParts')
    var lines = speechParts.map(x => (x + ':' + constantVector('_', 25 - x.length).join('')))
    var column = constructColumn(lines, '', layout.elementCSS, {
      'width': '95%'
    })
    var out = constructColumnContainer(pz.id, [column]);
    out.find("div").css('font-size', pz.layout.value('fontSize'))
    return out;
  }
}



Puzzle.Types['Readers'] = {
  'tags': ['Reading'],
  category:'language',
  subcategory:'reading',
  layout: {
    'puzzleClass': 'puzzle',
    showHeader:false,
    showBorder:false
  },
  settings:{
    n:IntegerValue(1,4,1,2),
    imageSize:IntegerValue(50,200,10,100),
    cvc:BooleanValue(true),
    plural:BooleanValue(false),
    suffix:BooleanValue(false),
    blend:BooleanValue(false),
    digraph:BooleanValue(false),
    long:BooleanValue(false),
    caseness:EnumeratedValue(['UpperCase', 'LowerCase', 'Capitalize','Random'],'Random'),
    combiner:EnumeratedValue(['All','Exactly','Only','Any'],'All'),
    maxWordLength:IntegerValue(3,20,1,10),
    maxTotalLength:IntegerValue(3,100,1,100),
    maxNumWords:IntegerValue(1,10,1,10),
    minNumWords:IntegerValue(1,4,1,1),
    wordSpacing:IntegerValue(1,1,1,1),
    letterSpacing:IntegerValue(1,1,1,1)
  },
  'content': {
    'imgPairs': function(sett) {
      var pairs = imageAndTextSelect(sett.object())
      return randomSampleSafe(pairs,sett.value('n'));
    },
  },
  'makePuzzleBody': function(pz, sett, content, layout) {
    var imgPairs = content.value('imgPairs')
    var size = sett.value('size')
    var diff = sett.value('difficulty')
    var pair
    var out = $('<div>',{'class':'flexContainer'})
    for (var ix=0; ix<sett.value('n'); ix++) {
      pair = $('<div>',{'class':'flexContainer'}).css({'width':'80%',
      // 'justify-content':'space-evenly',
      'justify-content':'left',
      'border':'solid 1px gray','padding':'3px','margin':'10px 3px'})
      pair.append(imageElement(imgPairs[ix][0],sett.value('imageSize'),{'margin':'5px 10px'}).css({'width':'250px'}))
      pair.append(
        $('<div>',{'text':caseAdjust(imgPairs[ix][1],sett.value('caseness')),'class':'flexElement'}).css({
          'align-items':'center',
          // 'width':'60%',
          'font-family':layout.fontFamily,
          'font-size':layout.fontSize, 'letter-spacing':sett.value('letterSpacing'),
          'word-spacing':sett.value('wordSpacing')
        })
      )
      out.append(pair)
    }
    return out;
  }
}



Puzzle.Types['ReadersVeryEasy'] = {
  parentPuzzle:'Readers',
  layout:{fontSize:50,showBorder:false,showHeader:false},
  settings:{
    n:4,
    imageSize:200,
    caseness:'UpperCase',
    cvc:true, combiner:'Only',
    maxWordLength:IntegerValue(3,20,1,3),
    maxNumWords:IntegerValue(1,10,1,2),
    letterSpacing:3, wordSpacing:6
  }
}

Puzzle.Types['ReadersEasy'] = {
  parentPuzzle:'Readers',
  layout:{fontSize:30,showBorder:false,showHeader:false},
  settings:{
    n:6,
    imageSize:120,
    cvc:true, plural:true, combiner:'Only',
    maxWordLength:IntegerValue(3,20,1,5),
    maxNumWords:IntegerValue(1,10,1,3),
    letterSpacing:2, wordSpacing:4
  }
}


Puzzle.Types['ReadersMedium'] = {
  parentPuzzle:'Readers',
  layout:{fontSize:25,showBorder:false,showHeader:false},
  settings:{
    n:8,
    imageSize:80,
    cvc:true, plural:true, blend:true,digraph:true,long:true,
    combiner:'Only',
    maxWordLength:IntegerValue(3,20,1,6),
    maxNumWords:IntegerValue(1,10,1,4),
    letterSpacing:2, wordSpacing:4
  }
}

Puzzle.Types['ReadersHard'] = {
  parentPuzzle:'Readers',
  layout:{fontSize:20,showBorder:false,showHeader:false},
  settings:{
    n:8,
    imageSize:80,
    combiner:'All', cvc:false,
    maxWordLength:IntegerValue(3,20,1,20),
    maxNumWords:IntegerValue(1,10,1,10),
    letterSpacing:0, wordSpacing:0
  }
}


Puzzle.Types['PictureWordChoose'] = {
  'tags': ['Reading'],
  category:'language',
  subcategory:'reading',
  instruction:'Circle the correct word',
  settings:{
    n:IntegerValue(1,4,1,4),
    numChoices:IntegerValue(2,5,1,3),
    imageSize:IntegerValue(50,200,10,190),
    caseness:EnumeratedValue(['UpperCase', 'LowerCase', 'Capitalize','Random'],'UpperCase'),
    minWordLength:IntegerValue(3,8,1,3),
    maxWordLength:IntegerValue(3,8,1,4),
    letterSpacing:1
  },
  'content': {
    'wordSets': function(sett) {
      const {n,numChoices,maxWordLength,minWordLength} = sett.object()
      var possibles = imageFileNames().filter(x=>imageNameFromFileName(x).length<=maxWordLength&& imageNameFromFileName(x).length >= minWordLength)
      possiblesObj = {} // trick to delete duplicates based on short name
      possibles.forEach(x=>possiblesObj[imageNameFromFileName(x)]=x)
      var cands = randomSampleSafe(Object.values(possiblesObj),numChoices*n)
      return range(0,n,1).map(x=>cands.slice(x*numChoices,(x+1)*numChoices));
    },
  },
  'makePuzzleBody': function(pz, sett, content, layout) {
    var wordSets = content.value('wordSets')
    console.log(wordSets)
    var size = sett.value('size')
    var diff = sett.value('difficulty')
    var pair
    var out = $('<div>',{'class':'flexContainer'})
    for (var ix=0; ix<sett.value('n'); ix++) {
      pair = $('<div>').css({'width':'80%',
      'display':'flex',
      'justify-content':'center',
      'align-items':'center',
      'border':'solid 1px gray','padding':'3px','margin':'10px 3px'})
      pair.append(imageElement(wordSets[ix][0],sett.value('imageSize'),{'margin':'5px 10px 5px 20px'}))
      pair.append(
        $('<div>',{'class':'flexContainer'}).css({
          'align-items':'center',
          'font-family':layout.fontFamily,
          'font-size':layout.fontSize, 'letter-spacing':sett.value('letterSpacing'),
          'word-spacing':sett.value('wordSpacing')
        }).append(shuffle(wordSets[ix]).map(x=>$('<div>',{
          text:caseAdjust(imageNameFromFileName(x),sett.value('caseness')),
          class:'flexElement'
        }).css({'width':'95%','margin':'10px 2px'}))
      ))
      out.append(pair)
    }
    return out;
  }
}


Puzzle.Types['NumberOrderMaze'] = {
  'tags': ['Numbers','Ordering'],
  category:'math',
  subcategory:'numbers',
  instruction:'Draw a line through the numbers in order, starting from 0',
  settings:{
    letters:EnumeratedValue([true,false],false),
    maxNumber:IntegerValue(10,30,1,30),
    numCols: IntegerValue(6,10,1,6)
  },
  'content': {
    'letterArray': function(sett) {
      const {numCols,maxNumber} = sett.object()
      const numRowGroups = Math.ceil((maxNumber+1)/numCols)
      var inds, irow,excludes=[]
      var letterArray = constantMatrix(null,[2*numRowGroups,numCols])
      var excludies = function(iRow,x,numCols,dp=false) {
        if (dp) {console.log([iRow,x,iRow*numCols+x])}
        var bads = [
          [-2,-1,0,1,2].map(z=>iRow*numCols+x+z),
          [-2,-1,0,1,2].map(z=>(iRow*numCols+x+z)-2*x-1),
          [-2,-1,0,1,2].map(z=>(iRow*numCols+x+z)+2*(numCols-x)-1)
      ]
        if (dp) {console.log(bads)}
      return union(flatten(bads).filter(z=> (z>=0 && z<=maxNumber)).sort((a,b)=>a-b));
      }
      range(0,numCols).map(function(x){
        for (iRow=0; iRow<numRowGroups; iRow++){
          if (x===0 ) {
            inds = [iRow*2,iRow*2+1]
          } else if (x===numCols-1) {
            inds = [iRow*2+1,iRow*2]
          } else {
            inds = shuffle([iRow*2,iRow*2+1])
          }
          letterArray[inds[0]][(iRow%2===0)?x:numCols-x-1] = (iRow*numCols+x <= maxNumber)?iRow*numCols+x:randomSample(range(0,maxNumber+1).filter(z=>!excludies(iRow,x,numCols).includes(z)))
          letterArray[inds[1]][(iRow%2===0)?x:numCols-x-1] = randomSample(range(0,maxNumber+1).filter(z=>!excludies(iRow,x,numCols).includes(z)))
        }
      })
      if (sett.value('letters')) {
        letterArray = letterArray.map(x=>x.map(y=>(y===null)?null:String.fromCharCode(97+y).toUpperCase()))
      }
      return letterArray;
    },
  },
  'makePuzzleBody': function(pz, sett, content, layout) {
    const letterArray = content.value('letterArray')
    const width = (100 / letterArray[0].length) + '%'
    var out = $('<div>',{'class':'flexContainer'}).css({'justify-content':'start','padding-left':'20px'})
    letterArray.map(function(row) {
      row.map(function(letter) {
        out.append($('<div>',{
          'text':letter,
          'class':'flexElement'
        }).css({
          'width':width, 'font-size':(sett.value('letters'))?'60':'60'
        })
        )
      })
    })
    return out;
  }
}


Puzzle.Types['LetterOrderMaze'] = {
  'tags': ['Alphabet','Letters'],
  category:'language',
  subcategory:'reading',
  instruction:'Draw a line through the letters in order, starting from A',
  settings:{
    letters:true,
    maxNumber:25
  },
  parentPuzzle:'NumberOrderMaze'
}
