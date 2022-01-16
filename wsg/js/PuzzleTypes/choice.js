
Puzzle.Types['ChoicePuzzle'] = function(inputObject = {}) {
  inputObject.contentType=opVal(inputObject.contentType,'words')
  inputObject.n=opVal(inputObject.n,15)
  inputObject.m=opVal(inputObject.m,1);
  inputObject.constraints = opVal(inputObject.constraints,undefined)
  inputObject.puzzleClass = 'puzzle choiceQuestion'
  inputObject.elementClass = 'uniformLetter'
  inputObject.instruction = 'Draw a...';
  inputObject.elementCSS = {
    'font-size': '50'
  }
  var puzz = new ElementPuzzleNew(inputObject)
  const midNum = Math.floor(puzz.settings.value('maxNumber') / 2);
  puzz.m = opVal(inputObject.m,2)
  puzz.constraints = opVal(inputObject.constraints,{
    'letters': {
      'vowel-consonant':['vowels', 'consonants'],
      'caseness':['uppercase letters','lowercase letters']
    },
    'numbers': {
      'even-odd':['even numbers', 'odd numbers'],
      'greater-less':['numbers greater than ' + midNum,'numbers less than ' + midNum],
      'biggest-smallest':['biggest number','smallest number'],
      'positive-negative':['positive numbers','negative numbers']
    },
    'words':{
      'longest-shortest':['longest word','shortest word']
    }
  })
  puzz.constraintType = inputObject.constraintType

  puzz.makePuzzleBody = function(pz) {
    var els = constructElementGrid(
      pz.id,
      pz.content.value('elements'),
      pz.layout.object(),
      'Elements',
      updateElementFunction
    );
    var constraintsArray = [];
    var allConstraints = pz.constraints;
    allConstraints = (typeof allConstraints ==='string')?[allConstraints]:allConstraints;
    var colors = shuffle(['black', 'red', 'green', 'yellow', 'blue', 'purple']);
    var shapes = shuffle(['circle', 'square', 'triangle']);
    var cat = pz.content.value('theme')
    var ct = pz.settings.value('contentType');
    let constraintType = pz.constraintType
    ct = (ct instanceof Array)?ct:[ct];
    if (constraintType===undefined && !(pz.constraints instanceof Array) && (pz.constraints instanceof Object)) {
      constraintType = ct.map(x=>Object.keys(pz.constraints[x]))
    } else {
      constraintType = [constraintType]
    }
    ct.map(function(contentType, ind) {
      constraintsArray.push.apply(
        constraintsArray,
        pz.makeOneConstraint(allConstraints, contentType, pz.m, ind, colors, shapes, cat, constraintType[ind])
      );
    })
    constraintsArray = randomSample(constraintsArray, pz.m);
    var constraints = constructElementGrid(
      pz.id,
      constraintsArray, {
        containerClass: 'flexContainer',
        elementClass: 'flexElement',
        containerCSS: {},
        elementCSS: {
          // 'width': '40%',
          'width':'100%',
          'font-size': '20',
          'margin': '5px'
        }
      },
      'Constraints',
      null
    );
    var container = $('<div></div>', {
      'class': 'column'
    });
    container.append([constraints, els]);
    adjustFont(container,'.uniformLetter',pz.layout)
    return container;
  }

  puzz.makeOneConstraint = function(allConstraints, contentType, n, ind, colors, shapes, cat, constraintType) {
    var vals, ct;
    if (cat instanceof Array) {
      cat=shuffle(cat)
        vals = randomSampleSafe(cat,n).slice(0,n)
      ct=''
    } else {
      if (allConstraints instanceof Array) {
        vals = randomSampleSafe(allConstraints,n).slice(0,n)
      } else {
        if (typeof(constraintType) == 'string') {
          vals = randomSample(allConstraints[contentType][constraintType], n);
        } else if (constraintType instanceof Array) {
          vals = shuffle(flatten(constraintType.map(x=>randomSample(allConstraints[contentType][x],1)))).slice(0,n)
        } else {
        vals = randomSample(randomObjectValuesOneKey(allConstraints,contentType)[1], n);
      }
      }
      ct = contentType;
  }
    var valLeft, valRight, rule;
    let pos;
    var rules = vals.map(function(val, ix) {
      pos = n * ind + ix;
      var valLeft = (val instanceof Array) ? val[0] : val;
      var valRight = (val instanceof Array) ? val[1] : '';
      var rule = `...${colors[pos%colors.length]} ${shapes[pos%shapes.length]} around the ${valLeft} ${valRight}`;
      return rule;
    });
    return rules;
  }
  return puzz;
}
Puzzle.Types['ChoicePuzzle'].add=false

Puzzle.Types['ChoiceLettersNumbers'] = {
  category:'language',subcategory:'numbers',
  tags:['letters','numbers'],
  n:22, m:1,
  contentType:['letters','numbers'],
  constraints:['numbers','letters'],
  parentPuzzle:'ChoicePuzzle'
}

Puzzle.Types['ChoiceLetters'] = {
  category:'language',subcategory:'letters',
  tags:['letters'],
  n:22,caseness:'Random',
  contentType:'letters',
  parentPuzzle:'ChoicePuzzle'
}

Puzzle.Types['ChoiceLettersVowels'] = {
  category:'language',subcategory:'vowels',
  tags:['letters','vowels'],
  n:20,m:1,
  contentType:'letters',
  constraints:['vowels','consonants'],
  parentPuzzle:'ChoicePuzzle'
}

Puzzle.Types['ChoiceLongVowel'] = {
  category:'language',
  subcategory:'vowels',
  tags:['letters','vowels'],
  n:12,
  contentType:'words',
  theme:['short vowel sounds', 'long vowel sounds'],
  parentPuzzle:'ChoicePuzzle'
}

Puzzle.Types['ChoiceWordCategory'] = {
  category:'language',
  tags:['words'],
  n:12,
  contentType:'words',
  theme:['animals','foods','colors','vehicles','body parts','buildings'],
  parentPuzzle:'ChoicePuzzle'
}

Puzzle.Types['ChoiceNumbers'] = {
  category:'math',contentType:'numbers',
  tags:['numbers'],
  parentPuzzle:'ChoicePuzzle'
}

Puzzle.Types['ChoiceNumbersPositiveNegative'] = {
  category:'math',subcategory:'negatives',
  tags:['negatives','numbers'],
  minNumber:-20,maxNumber:20,m:1,n:16,
  constraintType:'positive-negative',
  parentPuzzle:'ChoiceNumbers'
}

Puzzle.Types['ChoiceNumbersEvenOdd'] = {
  category:'math',subcategory:'even-odd',
  tags:['numbers','even-odd'],
  minNumber:0,maxNumber:20,m:1,n:20,
  constraintType:'even-odd',
  parentPuzzle:'ChoiceNumbers'
}

Puzzle.Types['ChoiceNumbersComparison'] = {
  category:'math',subcategory:'comparisons',
  tags:['comparisons','numbers'],
  minNumber:0,maxNumber:20,m:2,n:20,
  constraintType:['greater-less','biggest-smallest'],
  parentPuzzle:'ChoiceNumbers'
}
