
Puzzle.Types['WordSearch'] = {
  'tags': ['Reading', 'Letters'],
  'category':'language',
  instruction: "Find the hidden words",
  settings: {
    'n': IntegerValue(4, 8, 1),
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard'], 'hard'),
    'highlightAnswer': false,
    'wordList':null,
    'maxWords':null
  },
  layout: {
    'puzzleClass': 'puzzle',
    'elementClass': 'wordSearchElement'
  },
  content: {
    'letterGrid': (settings) => Puzzle.Types['WordSearch'].makeLetterGrid(settings)
  },
  makePuzzleBody: function(pz) {
    var sample = pz.content.value('letterGrid')['letterGrid'];
    var dims = pz.content.value('letterGrid').dims;
    var width = 0.80 * Math.floor(100 / dims[1]);
    var fontSize;
    if (dims[1] <= 4) {
      fontSize = 65;
    } else if (dims[1] <= 7) {
      fontSize = 50;
    } else if (dims[1] <=10) {
      fontSize = 35;
    } else {
      fontSize = 30
    }
    var left = constructGrid(sample, pz.layout.object().elementClass, {
      'width': width + '%',
      'font-size': fontSize
    }, {
      'width': '70%'
    });
    var container = $("<div></div>", {
      "class": "grid"
    });
    container.css("width", "100%");
    var right = constructColumn(
      pz.content.value('letterGrid')['words'], {
        'width': '100%',
        'font-size': '30',
        'justify-content': 'center',
        'display': 'flex'
      }, {
        'font-style': 'italic'
      }, {
        'width': '20%',
        'border-left': 'solid 1px gray',
        'padding-left': '2%'
      }
    );
    container.append([left, right]);
    return container;
  },

  makeLetterGrid: function(settings) {
    var ntmp = settings.value('n');
    var dims = (typeof ntmp === 'number') || (typeof ntmp === 'string') ? [ntmp, ntmp] : ntmp;
    dims[1] = Math.min(dims[1],10)
    dims[0] = Math.min(dims[0],16)
    var numWords = this.numWords;
    var meanDim = Math.floor((dims[0] + dims[1]) / 2);
    numWords = Math.max.apply(null, dims) + 2;
    var words;
    if (settings.value('wordList')==null) {
      words = getAllValues(wordGroups());
    } else {
      words = wordGroups()[settings.value('wordList')]
    }
    words = shuffle(words)
    words = words.filter(function(w) {
      return w.length <= meanDim;
    });
    // words = words.slice(0,3)
    var usedWords = [];
    words = randomSample(words, numWords);
    return {
      'letterGrid': Puzzle.Types['WordSearch'].generateWordSearch(words, dims, usedWords,
        settings.value('difficulty'), settings.value('highlightAnswer')),
      'words': usedWords.map(x => x.toUpperCase()).sort(),
      'dims': dims,
      'numWords': numWords
    }
  },

  generateWordSearch: function(words, dims, usedWords, difficulty, highlightAnswer) {
    // initialize empty matrix
    var matrix = constantMatrix('?', dims);
    var count = 0;
    var maxTries = 100;
    var start = [];
    var dir, placed, lastDir = '';
    var unplaced = [];
    var dirChoices;
    if (difficulty === 'easy') {
      dirChoices = ['right', 'down'];
    } else if (difficulty === 'medium') {
      dirChoices = ['up', 'down', 'left', 'right'];
    } else {
      dirChoices = ['up', 'down', 'left', 'right', 'upright', 'upleft', 'downright', 'downleft'];
      dirChoices = dirChoices.concat(['upright','upleft','downright','downleft'])
    }
    var possibleChoices = [];
    for (var i = 0; i < dims[0]; i++) {
      for (var j = 0; j < dims[1]; j++) {
        possibleChoices.push([i, j])
      }
    }
    // try to place each word
    words.map(function(word, ix) {
      placed = false;
      while (!placed && count < maxTries) {
        // pick a random direction for the word to go
        dir = randomSample(dirChoices.filter(x => x != lastDir));
        // dir='upleft'
        // pick a random starting position
        start = Puzzle.Types['WordSearch'].startingPosition(possibleChoices, dir, word, dims[0], dims[1])
        // start=[0,0];
        // see if it fits in the puzzle at that place and direction
        placed = Puzzle.Types['WordSearch'].placeWord(matrix, word, start, dir, highlightAnswer);
        // console.log([start,dir,placed,count,word])
        count++;
      };
      // try to pick different direction
      lastDir = dir;
      count = 0;
      // if anything couldn't get placed, we will remove it from the word list later
      if (placed == false) {
        unplaced.push(ix);
      }
    });
    // remove unplaced
    unplaced.map(x => (delete words[x]));
    words.map(function(x) {
      if (typeof(x) === "string") {
        usedWords.push(x)
      }
    })
    this.set = complement(words, [undefined]);
    // flatten, fill in the empty spots, and uppercase everything
    var out = flatten(matrix);
    out = out.map(function(x) {
      if (x == '?') {
        return (randomSample(allLetters())).toUpperCase();
      } else {
        return x.toUpperCase();
      }
    });

    return out;
  },

  startingPosition: function(allPos, dir, word, nx, ny) {
    var validPos; // valid positions
    if (dir === 'up') { // CORRECT
      validPos = allPos.filter(x => x[0] >= word.length - 1);
    } else if (dir == 'down') { //CORRECT
      validPos = allPos.filter(x => x[0] < nx - word.length + 1);
    } else if (dir == 'left') { // CORRECT
      validPos = allPos.filter(x => x[1] >= word.length - 1);
    } else if (dir == 'right') { //CORRECT
      validPos = allPos.filter(x => x[1] < nx - word.length+ 1);
    } else if (dir == 'downleft') {
      validPos = allPos.filter(x => (x[0] < nx - word.length + 1) && (x[1] >= word.length - 1));
    } else if (dir == 'upleft') {
      validPos = allPos.filter(x => (x[0] >= word.length - 1) && (x[1] >= word.length - 1));
    } else if (dir == 'downright') {
      validPos = allPos.filter(x => (x[0] < nx - word.length + 1) && (x[1] < nx - word.length+ 1));
    } else if (dir == 'upright') {
      validPos = allPos.filter(x => (x[0] >= word.length - 1) && (x[1] < nx - word.length+ 1));
    };
    // console.log(validPos)
    // console.log('word length',word.length)
    // console.log(dir)
    // console.table(validPos)
    return randomSample(validPos)
  },


  placeWord: function(matrix, word, pos, dir, highlightAnswer) {
    if (pos === undefined) {
      return false
    }
    var inds;
    var n = word.length;
    var nn = n - 1;
    var nx = matrix.length;
    var ny = matrix[0].length;
    var inds = range(0, n, 1).map(x => (pos));
    // var xmin = pos[1];
    // var xmax = pos[1];
    // var ymin = pos[0];
    // var ymax = pos[0];
    if (dir == 'up') {
      // xmin = pos[0] - nn;
      inds = inds.map(function(x, i) {
        return [pos[0] - i, x[1]];
      })
    } else if (dir == 'down') {
      // xmax = pos[0] + nn;
      inds = inds.map(function(x, i) {
        return [pos[0] + i, x[1]];
      });
    } else if (dir == 'left') {
      // ymin = pos[1] - nn;
      inds = inds.map(function(x, i) {
        return [pos[0], pos[1] - i];
      })
    } else if (dir == 'right') {
      // xmax = pos[1] + nn;
      inds = inds.map(function(x, i) {
        return [pos[0], pos[1]+i ];
      })
    } else if (dir == 'downleft') {
      // xmax = pos[0] + nn;
      // ymin = pos[1] - nn;
      inds = inds.map(function(x, i) {
        return [pos[0] + i, pos[1] - i];
      })
    } else if (dir == 'upleft') {
      // xmin = pos[0] - nn;
      // ymax = pos[1] + nn;
      inds = inds.map(function(x, i) {
        return [pos[0] - i, pos[1] - i];
      })
    } else if (dir == 'downright') {
      // xmax = pos[0] + nn;
      // ymax = pos[1] + nn;
      inds = inds.map(function(x, i) {
        return [pos[0] + i, pos[1] + i];
      })
    } else if (dir == 'upright') {
      // xmin = pos[0] - nn;
      // xmax = pos[1] + nn;
      inds = inds.map(function(x, i) {
        return [pos[0] - i, pos[1] + i];
      })
    };
    // console.log(inds)
    // console.log('start at '+pos)
    // console.log([nx,ny])
    // console.log([xmin,xmax,ymin,ymax])
    // check if inds are legal
    // SHOULD ALREADY ONLY HAVE VALID INDS
    // if (
    //   xmin < 0 || xmax > nx || ymin < 0 || ymax > ny
    // ) {
    //   return false;
    // };

    // check for letter conflicts
    var chars = word.split("");
    var valid = true;
    var z;
    chars.forEach(function(x, i) {
      z = matrix[inds[i][0]][inds[i][1]];
      if (z != '?' && z != chars[i]) {
        valid = false;
      }
    });
    if (valid == false) {
      return false;
    };
    if (safeTrueFalse(highlightAnswer)) {
      var style = 'style="color:red"';
    } else {
      var style = '';
    }
    // now update matrix
    chars.forEach(function(x, i) {
      matrix[inds[i][0]][inds[i][1]] =
        `<span ${style}>${chars[i]}</span>`;
    });

    return true;

  }

}
