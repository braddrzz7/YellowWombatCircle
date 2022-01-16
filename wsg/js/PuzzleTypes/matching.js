var matchingSetsObject = {} // populated below

Puzzle.Types['MatchingPuzzle'] = {
  tags:['matching'],
  settings: {
    'n': IntegerValue(4, 8, 1),
    'strict': true,
    'theme':null,
    'difficulty':EnumeratedValue(['easy','medium','hard'])
  },
  instruction: 'Match',
  layout: {
    'puzzleClass': 'puzzle matchingQuestion',
    'elementClass': 'matchingElement flexElement'
  },
  content: {
    'category': function(sett) {
        if (typeof(sett.value('theme'))==='string') {
          return sett.value('theme');
        } else {
          return randomSample(Object.keys(matchingSetsObject));
      }
      },
    'columnValues': function(settings,content) {
        const n = settings.value('n');
        const categ = content.value('category');
        var valueArrayPairs = matchingSetsObject[categ]
        if (typeof(valueArrayPairs) === 'function') {
          valueArrayPairs = valueArrayPairs(settings)
        }
        var valuePairs = randomSampleSafe(valueArrayPairs,n);
        var leftVals = shuffle(union(valuePairs.map(x => x[0])));
        var rightVals = shuffle(union(valuePairs.map(x => x[1])));
        return [leftVals, rightVals];
      }
  },

  makePuzzleInstruction: function(pz) {
    var categ = pz.content.value('category');
    const [left, right] = categ.split('$');
    var text = `Match the ${underlineSpan(left)} with its ${underlineSpan(right)}`
    return $('<div></div>', {
      html: text
    });
  },

  makePuzzleBody: function(pz) {
    var cols = pz.content.value('columnValues').map(
      x => constructColumnOfValues(pz.id, x, pz.layout.elementClass.value)
    );
    var out = constructColumnContainer(pz.id, cols);
    out.find("div").css('font-size', pz.layout.value('fontSize'))
    out.find("span.fraction").css('font-size', pz.layout.value('fontSize')-10)
    return out;
  }
}


Puzzle.Types['MatchingFractions']={
  tags: ['math','fractions'],
  category:'math',
  subcategory:'fractions',
  theme : 'fraction$name',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['fraction$name'] = function(sett) {
  const fracs = range(0, 40, 1).map(() => randomFraction(0, 2, 'easy'))
  return fracs.map(x => [formatFraction(x), fractionToWord(x)]);
}


Puzzle.Types['MatchingFractionBoxes']={
  tags: ['math','fractions'],
  category:'math',
  subcategory:'fractions',
  theme : 'fraction$colored boxes',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['fraction$colored boxes'] = function() {
  const fracs = flatten(range(1, 8, 1).map(denom => range(1, denom + 1).map(num => [num, denom])))
  return fracs.map(x => [formatFraction(x), Puzzle.Types['FractionColoring'].boxesColored(x[0], x[1], 40, 'from')]);
}


Puzzle.Types['MatchingMultiplication']={
  tags: ['math','multiplication'],
  category:'math',
  subcategory:'multiplication',
  theme : 'multiplication$addition representation',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['multiplication$addition representation'] = function() {
  const firsts = randomIntegers(2, 10, 40);
  const pairs = firsts.map(x => [x, randomInteger(2, 5)]);
  return pairs.map(x => [shuffle(x).join('&times;'), multiplicationToAddition(x)]);
}

Puzzle.Types['MatchingFractionDecimal']={
  tags: ['math','decimals'],
  category:'math',
  subcategory:'fractions',
  theme : 'fraction$decimal representation',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['fraction$decimal representation'] = function() {
  const fracs = range(0, 40, 1).map(() => randomFraction(0, 2, 'easy'))
  return fracs.map(x => [formatFraction(x), x[0] / x[1]]);
}

Puzzle.Types['MatchingAdditionThreeTwo']={
  tags: ['math','addition'],
  category:'math',
  subcategory:'addition',
  theme : 'triplet additions$equaivalent pair additions',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['triplet additions$equaivalent pair additions'] = function(sett) {
  var triples = [],
    doubles = [],
    out = [],
    ix
  for (ix = 0; ix < 30; ix++) {
    triples[ix] = randomIntegers(1, 9, 3)
    doubles[ix] = [triples[ix][0] + triples[ix][1], triples[ix][2]]
  }
  out = transpose([triples, doubles]);
  return out.map((x) => ([x[0].join('+'), x[1].join('+')]))
}

Puzzle.Types['AdditionRegrouped']={
  tags: ['math','addition','regrouping'],
  category:'math',
  subcategory:'addition',
  theme : 'addition pair$equivalent simplified pair',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['addition pair$equivalent simplified pair'] = function() {
  var left = [],
    right = [],
    out = [],
    ix, small
  for (ix = 0; ix < 30; ix++) {
    small = randomInteger(1, 3)
    left[ix] = [
      randomInteger(1, 5) * 10 + small,
      randomInteger(1, 5) * 10 + randomInteger(1, 3)
    ]
    right[ix] = [
      left[ix][0] - small,
      left[ix][1] + small
    ]
  }
  out = transpose([left, right]);
  return out.map((x) => ([x[0].join('+'), x[1].join('+')]))
}

Puzzle.Types['SubtractionEquivalent']={
  tags: ['math','addition','subtraction'],
  category:'math',
  subcategory:'addition',
  theme : 'subtraction $equivalent rearranged',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['subtraction $equivalent rearranged'] = function() {
  var out = [],
    ix, big
  for (ix = 0; ix < 30; ix++) {
    big = randomInteger(3, 20)
    small = randomInteger(1, big - 1)
    out[ix] = [`${big} - ${small} = ?`, `${big} - ? = ${small}`]
  }
  return out;
}

Puzzle.Types['NumberSplitTensOnes']={
  tags: ['math','place value'],
  category:'math',
  subcategory:'addition',
  theme : 'number $equivalent ones sum',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['number $equivalent ones sum'] = function() {
  var a, b, out = []
  for (ix = 0; ix < 30; ix++) {
    a = randomInteger(1, 9)
    b = randomInteger(1, 9)
    out[ix] = [a + '' + b, a + '0+' + b]
  }
  return out;
}

Puzzle.Types['NumberSplitTeens']={
  tags: ['math','place value'],
  category:'math',
  subcategory:'addition',
  theme : 'number $equivalent teens sum',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['number $equivalent teens sum'] = function() {
  var a, b, out = []
  for (ix = 0; ix < 30; ix++) {
    a = randomInteger(2, 9)
    b = randomInteger(1, 9)
    out[ix] = [a + '' + b, (a - 1) + '0+1' + b]
  }
  return out;
}

Puzzle.Types['EquivalentOffsets']={
  tags: ['math','addition tricks'],
  category:'math',
  subcategory:'addition',
  theme : 'sum $equivalent sum$ without adding',
  parentPuzzle:'MatchingPuzzle'
}
matchingSetsObject['sum $equivalent sum$ without adding'] = function(sett) {
  var a, d, out = [], ai, z
  var {difficulty,n} = sett.object()
  if (difficulty==='easy') {
    a = randomSampleSafe(range(1,9+1).concat(range(10,90+10,10)),n)
  } else {
    a = randomSampleSafe(range(1,99+1,1),n)
  }
  for (var ix=0; ix<n; ix++) {
    ai = a[ix]
    d = (difficulty==='hard')?randomInteger(1,Math.min(3,ai)):1
    z = (difficulty==='hard')?true:randomSample([true,false])
    out[ix] = [`${ai} + ${ai}`, `${z?ai-d:ai+d} + ${z?ai+d:ai-d}`]
  }
  return out;
}

Puzzle.Types['MatchingPictureWords']={
  tags: ['reading','beginner','baby'],
  category:'reading',
  theme : 'image$word',
  parentPuzzle:'MatchingPuzzle',
  settings:{
    'minWordLength':IntegerValue(1,10,1,3),
    'maxWordLength':IntegerValue(1,10,1,4),
    n:IntegerValue(1,10,1,4)
  },
  layout:{
    fontSize:50
  }
}
matchingSetsObject['image$word'] = function(sett) {
  var shortImgs = imageNames().filter(x => imageNameFromFileName(x).length <= sett.value('maxWordLength') && imageNameFromFileName(x).length >= sett.value('minWordLength'));
  var imgs = randomSample(shortImgs, sett.value('n'))
  return imgs.map(x => [
    imageElement(x,'100',{'margin':'10px'}),
    $('<div>',{'text':imageNameFromFileName(x).toUpperCase()})
  ]);
}

Puzzle.Types['MatchingLetterCase']={
  tags: ['reading','letters','beginner','baby'],
  category:'reading',
  theme : 'uppercase letter$lowercase letter',
  parentPuzzle:'MatchingPuzzle',
  settings:{
    n:IntegerValue(1,10,1,4)
  },
  layout:{
    fontSize:80
  }
}
matchingSetsObject['uppercase letter$lowercase letter'] = function(sett) {
  return randomSample(allLetters(),sett.value('n')).map(x=>[x.toUpperCase(),x.toLowerCase()])
}

Puzzle.Types['MatchingWordCase']={
  tags: ['reading','letters','beginner','baby'],
  category:'reading',
  theme : 'uppercase word$lowercase word',
  parentPuzzle:'MatchingPuzzle',
  settings:{
    n:IntegerValue(1,10,1,4)
  },
  layout:{
    fontSize:60,
    elementCSS:{'margin':'25px'}
  }
}
matchingSetsObject['uppercase word$lowercase word'] = function(sett) {
  var words = randomSampleSafe(getAllValues(wordGroups()).filter(x => x.length < 5), sett.value('n'))
  return words.map(x=>[
    $('<div>',{'text':x.toUpperCase()}).css({'margin':'15px'}),
    x.toLowerCase()
  ])
}

Puzzle.Types['MatchingPictureCounting']={
  tags: ['counting','beginner','baby'],
  category:'math',
  subcategory:'counting',
  theme : 'images$count',
  parentPuzzle:'MatchingPuzzle',
  settings:{
    n:IntegerValue(1,10,1,4)
  },
  layout:{
    fontSize:50
  }
}
matchingSetsObject['images$count'] = function(sett) {
  var imgs = randomSample(imageNames(), sett.value('n'))
  var counts = shuffle(range(1,sett.value('n')+1,1))
  var imgArrays = [[]]
  for (var ix=0; ix<counts.length; ix++) {
    imgArrays[ix]=[]
    for (var iy=0; iy<counts[ix]; iy++) {
      imgArrays[ix][iy] = imageElement(imgs[ix],'60',{'margin':'10px'})
    }
  }
  return imgs.map((x,ind) => [
    imgArrays[ind],
    $('<div>',{'text':counts[ind]+''})
  ]);
}


Puzzle.Types['PlusMinusMatching']={
  category:'math',
  theme : 'expression$equivalent negative',
  parentPuzzle:'MatchingPuzzle',
  settings:{
    n:IntegerValue(1,10,1,4)
  },
  layout:{
    fontSize:30
  }
}
matchingSetsObject['expression$equivalent negative'] = function(sett) {
  var eqns = randomArithmeticEquations(sett.value('n'),{signChoices:['+','-'],termRanges:[[1,9],[0,9]],answerRange:[0,30]})
  var eqnsRearranged = eqns.map(x=>[x[0],x[1]==='+'?'-':'+',0-x[2],x[3],x[4]])
  eqns = eqns.map(x=>equationElement(x))
  eqnsRearranged = eqnsRearranged.map(x=>equationElement(x))
  return transpose([eqns,eqnsRearranged]);
}


//
// Puzzle.Types['CoinValueMatching']={
//   tags: ['counting','beginner','baby'],
//   category:'math',
//   subcategory:'counting',
//   makePuzzleInstruction: ()=>'Match the equivalent values',
//   theme : 'coins$value',
//   parentPuzzle:'MatchingPuzzle',
//   settings:{
//     n:IntegerValue(1,10,1,4)
//   },
//   layout:{
//     fontSize:20
//   }
// }
// matchingSetsObject['coins$value'] = function(sett) {
//   const {difficulty} = sett.object()
//   var numEqns
//   var coinArrays = randomCoins(sett.value('n'))
//   console.log(coinArrays)
//   var phrases = coinArrays.map(x=>coinWords(x,true,false,true))
//   if (difficulty==='easy') {
//     numEqns = coinArrays.map(z=>z.map(x=>((x[0]>1)?(x[0]+'&times;'):'')+coinValueObject[x[1]]+'&cent;').join('+'))
//   } else if (difficulty ==='medium') {
//     numEqns = coinArrays.map(z=>z.map(x=>(x[0]*coinValueObject[x[1]])+'&cent;').join('+'))
//   }
//   return transpose([numEqns,phrases]);
// }

////////////////////
matchingSetsObject['number$word'] = function(sett) {
  return transpose([Object.keys(numberWordObject), Object.values(numberWordObject)]);
}

matchingSetsObject['character$species'] = [
  ['Nemo', 'fish'],
  ['Dory', 'fish'],
  ['Simba', 'lion'],
  ['Timon', 'meerkat'],
  ['Olaf', 'snowman'],
  ['Maui', 'demigod'],
  ['Pua', 'pig'],
  ['Ariel', 'mermaid'],
  ['Scar', 'lion'],
  ['Sven', 'reindeer']
]

matchingSetsObject['country$continent'] = [
  ['United States', 'North America'],
  ['Canada', 'North America'],
  ['Brazil', 'South America'],
  ['Chile', 'South America'],
  ['Norway', 'Europe'],
  ['Denmark', 'Europe'],
  ['France', 'Europe'],
  ['Spain', 'Europe'],
  ['Sweden', 'Europe'],
  ['China', 'Asia'],
  ['India', 'Asia'],
  ['Egypt', 'Africa'],
  ['Somalia', 'Africa'],
  ['Nigeria', 'Africa'],
  ['Madagascar', 'Africa']
]
