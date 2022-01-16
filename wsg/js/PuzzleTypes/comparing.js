Puzzle.Types['NumberComparing']= {
  'tags':['Math','Comparisons','Numbers'],
  'category':'math',
  add:false,
  subcategory:'comparisons',
  'settings': {
    'n': IntegerValue(4, 12, 1),
    'min': IntegerValue(-15, 5, 1,-10),
    'max': IntegerValue(5, 15, 1,10),
    difficulty:EnumeratedValue(['easy','medium','hard']),
    theme: null
  },
  layout: {
    'elementClass': 'additionQuestion ',
    'elementCSS': {
      'letter-spacing': '6px'
    },
    'numberLine':BooleanValue(false),
    'fontSize': FontSizeValue(34)
  },
  content: {
    'problems': function(settings) {
      var {theme} = settings.object();
      if (theme===undefined || theme ===null) {
        theme = randomSample(Object.keys(comparisonSetsObject))
      }
      var comparisonSet = comparisonSetsObject[theme]
      comparisonSet = (typeof(comparisonSet)==='function')?comparisonSet(settings):comparisonSet
      return comparisonSet;
    }
  },
    makePuzzleInstruction: function(pz) {
      return 'Write a Greater > or Less < or Equal = symbol in the gray box';
    },
    makePuzzleBody: function(pz) {
      var processValue = function([a,b]) {
        var spanStyle = `class='blank' style=letter-spacing:1px;`
        var fractionStyle = (pz.settings.value('theme')==='fractions')?'vertical-align:super;':''
        var box = $('<div></div>', {
          html: `<span ${spanStyle}>${a}</span>
          <span class='comparisonBox' style=${fractionStyle}> &nbsp;&nbsp; </span>
            <span ${spanStyle}>&nbsp;${b} </span>`,
          contenteditable: true
        });
        box.css(pz.layout.object().elementCSS)
        return box;
      }
      var vals = pz.content.value('problems').map(x => processValue(x));
      var out = constructElementGrid(pz.id, vals, pz.layout.object(), 'Math', null);
      out.find("div").css('font-size', pz.layout.value('fontSize'))
      out.find("span.fraction").css('font-size', pz.layout.value('fontSize')-10)
      if (pz.layout.value('numberLine')) {
        out.prepend(numberLine({
          min: -8,
          max: 8,
          step: 1,
          subStep:1
        }))
      };
      return out;
    }
}

Puzzle.Types['NumberComparingIntegers']= {
  theme:'integers',
  tags:['integers'],
  settings:{
    'maxDiff':100,
  },
  parentPuzzle:'NumberComparing'
}

Puzzle.Types['NumberComparingFractions']= {
  tags:['Fractions'],
  subcategory:'fractions',
  theme:'fractions',
  settings:{
    fractions :EnumeratedValue(['sameDenom','sameTop','vs1','any'])
  },
  parentPuzzle:'NumberComparing'
}

Puzzle.Types['NumberComparingDecimals']={
  tags:['Decimals'],
  subcategory:'decimals',
  theme:'decimals',
  settings:{
      'maxDiff':100,
    decimalPlaces :IntegerValue(1,5,1,1)
  },
  parentPuzzle:'NumberComparing'
}

Puzzle.Types['NumberComparingSums']={
  tags:['Addition'],
  theme:'sum offset comparisions',
  fontSize:FontSizeValue(28),
  parentPuzzle:'NumberComparing'
}


//////////////////////////////////////////////
// begin comparisonSetsObject

var comparisonSetsObject={}

comparisonSetsObject['decimals'] = function(sett) {
  const {min,max,n,maxDiff,decimalPlaces} = sett.object();
  firstValues = range(0,n,1).map(()=>randomReal(min,max,Math.pow(10,-decimalPlaces)));
  pairs = firstValues.map(x=>[x,functionExcept(()=>randomReal(Math.max(min,x-maxDiff),Math.min(max,x+maxDiff),Math.pow(10,-decimalPlaces)),x)]);
  return pairs.map(x=>[x[0].toFixed(decimalPlaces),x[1].toFixed(decimalPlaces)]);
}

comparisonSetsObject['integers'] = function(sett) {
  const {min,max,n,maxDiff} = sett.object();
  console.log(maxDiff)
  firstValues = range(0,n,1).map(()=>randomInteger(min,max));
  return firstValues.map(x=>[x,functionExcept(()=>randomInteger(Math.max(min,x-maxDiff),Math.min(max,x+maxDiff)),x)]);
}

comparisonSetsObject['fractions'] = function(sett) {
  const {min,max,n,fractions} = sett.object();
  return range(0,n,1).map(()=>randomFractionPair(min,max,fractions,true));
}


comparisonSetsObject['sum offset comparisions'] = function(sett) {
  var a, d1,d2, out = [], ai, z
  var {difficulty,n} = sett.object()
  if (difficulty==='easy') {
    a = randomSampleSafe(range(1,9+1).concat(range(10,90+10,10)),n)
    b=a
  } else {
    a = randomSampleSafe(range(10,89+1,1),n)
    b = randomSampleSafe(range(10,89+1,1),n)
  }
  for (var ix=0; ix<n; ix++) {
    [ai,bi] = shuffle([a[ix],b[ix]])
    z = randomSample([true,false])
    if (difficulty==='easy') {
      [d1,d2]=shuffle([1,0])
    } else if (difficulty==='medium') {
      [d1,d2]=randomChoice(range(1,6),2)
    } else {
      [d1,d2]=randomChoice(range(1,11),2)
    }
    out[ix] = [`${a[ix]} + ${b[ix]}`, `${z?ai-d1:ai+d1} + ${z?bi-d2:bi+d2}`]
  }
  return out;
}

// end comparisonSetsObject
//////////////////////////////////////////////
