//
//  math, strings, objects
//
//  DEPENDS ON NOTHING
//
//

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

function opVal(val, def) {
  return (val == undefined) ? def : val;
}

function setProp(destObj, sourceObj, field, defaultValue) {
  var sourceVal = sourceObj[field];
  if (sourceVal == undefined) {
    destObj[field] = defaultValue;
  } else {
    destObj[field] = sourceVal;
  }
};

function opDef(obj, field, def) {
  var val = isEmpty(obj) ? def : obj[field];
  return (val == undefined) ? def : val;
};


//
function mergeDefaults(userSettings, defaultSettings) {
  var keys = Object.keys(defaultSettings);
  for (i = 0; i < keys.length; i++) {
    setProp(userSettings, userSettings, keys[i], defaultSettings[keys[i]]);
  };
}

/*
  Creates a new object containg ONLY the propeties from 'defaultOptions',
  but with values from 'userOptions' overriding those when present
*/
function mergeOptionDefaults(userOptions, defaultOptions) {
  var keys = Object.keys(defaultOptions);
  var newOptions = {};
  for (i = 0; i < keys.length; i++) {
    setProp(newOptions, userOptions, keys[i], defaultOptions[keys[i]]);
  };
  return newOptions;
}

// mutates existing object
function updateObjectValues(oldObject, newValues) {
  var keys = Object.keys(newValues);
  for (i = 0; i < keys.length; i++) {
    oldObject[keys[i]] = newValues[keys[i]];
  };
}

// update only things in old object
function updateExistingKeys(oldObject, newValues) {
  var keys = Object.keys(oldObject);
  var newKeys = Object.keys(newValues);
  for (i = 0; i < keys.length; i++) {
    if (newKeys.includes(keys[i])) {
      oldObject[keys[i]] = newValues[keys[i]];
    };
  };
}
// copy everything from newValues
function copyNewKeys(oldObject, newValues) {
  var keys = Object.keys(newValues);
  for (i = 0; i < keys.length; i++) {
    oldObject[keys[i]] = newValues[keys[i]];
  };
}

// copy only non-existent keys from newValues
function copyOnlyNewKeys(oldObject, newValues) {
  var keys = Object.keys(newValues);
  for (i = 0; i < keys.length; i++) {
    if (!(Object.keys(oldObject).includes(keys[i]))) {
      oldObject[keys[i]] = newValues[keys[i]];
    }
  };
}

function copyObject(oldObject) {
  var keys = Object.keys(oldObject);
  var newObject = {};
  for (i = 0; i < keys.length; i++) {
    newObject[keys[i]] = oldObject[keys[i]];
  };
  return newObject;
}


function dprint() {
  if ((typeof debug !== 'undefined') && debug == true) {
    console.log.apply(null, arguments)
  };
}



function mergeDefaultObjects(globalDefaults, puzzleDefaults, userValues) {
  // copy global defaults
  var myObject = copyObject(globalDefaults);
  // then merge in puzzle default
  copyNewKeys(myObject, puzzleDefaults);
  // then merge in user values
  // console.log('myObject',myObject)
  // console.log('userValues',userValues)
  updateExistingKeys(myObject, userValues);
  // copyNewKeys(myObject, userValues);
  //
  return myObject;
}


fontFamilyChoices = [
  'Times',
  'Arial',
  'Comic Sans MS'
]


function layoutObject(puzzleLayout, userLayout) {
  var globalLayoutDefaults = {
    'puzzleClass': 'puzzle',
    'containerClass': 'flexContainer',
    'elementClass': 'flexElement',
    'containerCSS': {},
    'elementCSS': {},
    'headerClass':'puzzleHeader',
    'puzzleSize': puzzleSizeMenu('Auto'),
    'showHeader':BooleanValue(true),
    'showBorder':BooleanValue(true),
    'fontSize':FontSizeValue(35),
    'fontFamily':EnumeratedValue(fontFamilyChoices,'Arial')
  };
  // console.log('userLayout',userLayout)
  // console.log('puzzleLayout',puzzleLayout)
  return mergeDefaultObjects(globalLayoutDefaults,
    puzzleLayout, userLayout);
};


function sampleNumberPattern(numberPattern) {
  // check if already number
  if (typeof(numberPattern) === 'number') {
    return numberPattern;
  };
  // check if string number
  var numRE = /^[0-9]+$/;
  if (numRE.test(numberPattern)) {
    return parseInt(numberPattern);
  }
  // check if span a:b
  var spanRE = /^[0-9]+:[0-9]+$/;
  if (spanRE.test(numberPattern)) {
    const [nmin, nmax] = numberPattern.split(':').map(x => parseInt(x));
    return randomInteger(nmin, nmax);
  };
  // check if span a:b:c
  var span2RE = /^[0-9]+:[0-9]+:[0-9]+$/;
  if (span2RE.test(numberPattern)) {
    const [nmin, nmax, dn] = numberPattern.split(':').map(x => parseInt(x));
    return randomSample(range(nmin, nmax + 1, dn));
  };
  // check if a+
  // var nPlusRE = /d(b+)d/g;
  // if {
  //
  // };
}

/************************************************/

function allSymbols() {
  return flatten([
    range(128, 255, 1),
    range(256, 383, 1),
    range(384, 591, 1),
    range(688, 767, 1),
    range(768, 879, 1),
    range(880, 1023, 1),
    range(1024, 1279, 1),
    range(1280, 1327, 1),
    range(8192, 8303, 1),
    range(8352, 8399, 1),
    range(8448, 8527, 1),
    range(8592, 8703, 1),
    range(8704, 8959, 1),
    range(9472, 9599, 1),
    range(9600, 9631, 1),
    range(9632, 9727, 1),
    range(9728, 9983, 1),
    range(9984, 10175, 1)
  ]).map(x => ("&#" + x + ";"));
};

function randomReal(min, max, prec=1) {
  return (Math.floor((1/prec)*(Math.random() * (max - min) + min)))*prec;
}

function randomReals(min, max, prec=1, n) {
  return range(0,n,1).map(x=>(Math.floor((1/prec)*(Math.random() * (max - min) + min)))*prec);
}

function randomFraction(min,max,denominator='easy',numerator=undefined) {
  let num, den;
  if (denominator==='easy') {
    den = randomChoice([2,4,5,10],1)[0]
  } else if (denominator==='medium') {
    den = randomChoice([2,4,5,10],1)[0]
  } else if (denominator==='hard' || denominator==='any' || typeof(denominator)==='string') {
    den = randomChoice(range(2,21),1)[0]
  } else {
    den = denominator;
  };

  if (isNaN(numerator)) {
    num = randomInteger(0,max*den);
  } else {
    num = numerator;
  };
  return [num,den];
}

function randomFractionPair(min,max,fractionType='sameDenom',format=false,n=2) {
  let allFracs=[randomFraction(min,max,fractionType)]
  var i;
  for (i=0;i<n-1;i++) {
  if (fractionType==='sameDenom') {
    allFracs.push(randomFraction(min,max,allFracs[0][1])); // same denominator
  } else if (fractionType==='sameTop') {
    allFracs.push(randomFraction(min,max,fractionType,allFracs[0][0]))
  } else if (fractionType=='vs1') {
    allFracs.push(1);
  } else {
    allFracs.push(randomFraction(min,max,fractionType))
  }
}
  if (format===true) {
    return allFracs.map(x=>formatFraction(x));
  } else {
    return allFracs;
  }
}

function formatFraction(frac) {
  if (!isNaN(frac)) {
    return `<span class="fractionNotFraction">${frac}</span>`;
  }
  return `<span class="fraction"><span class="numerator">${frac[0]}</span>
  <span class="denominator">${frac[1]}</span></span>`;
}


function functionExcept(f,exceptVal) {
  const newVal = f();
  if (newVal===exceptVal) {
    return functionExcept(f,exceptVal);
  } else {
    return newVal;
  }
}


function randomInteger(min, max) {
  const minInt = (typeof(min)==='string')?parseInt(min):min
  const maxInt = (typeof(max)==='string')?parseInt(max):max
  return Math.floor(Math.random() * (maxInt + 1 - minInt)) + minInt;
}

function randomIntegers(min, max, n) {
  var i;
  var list = [];
  for (i = 0; i < n; i++) {
    list[i] = randomInteger(min, max);
  };
  return list;
}

// sample without replacement
function randomSample(array, n) {
  var shuffled = shuffle(array);
  if (n == undefined) {
    return shuffled[0];
  } else {
    return shuffled.slice(0, n);
  }
}

// sample with replacement
function randomChoice(array, n0) {
  const n = (n0===undefined)?1:n0
  var pos = randomIntegers(0, array.length - 1, n);
  if (n0===undefined) {
    return array[pos[0]];
  } else {
    return pos.map(x => (array[x]));
  }
}

// sample with replacement until you run out, then do it again (minimial repeats)
function randomSampleSafe(array, n) {
  var out = [];
  if (array.length===0) {
    return out;
  }
  var m = Math.ceil(n / array.length);
  for (var i = 0; i < m; i++) {
    out.push(shuffle(array))
  }
  return flatten(out).slice(0, n);
}


function allLetters() {
  var alphabet = [];
  for (i = 0; i < 26; i++) {
    alphabet[i] = String.fromCharCode(97 + i);
  };
  return alphabet;
}

function allVowels() {
  return ["a", "e", "i", "o", "u"];
}

function allConsonants() {
  var letters = allLetters();
  var vowels = allVowels();
  return letters.filter(x => vowels.indexOf(x) < 0);
}

function randomLetter() {
  return randomSample(allLetters());
}

function randomLetters(n) {
  return randomSample(allLetters(), n);
}

function flatten(arrays) {
  return [].concat.apply([], arrays);
}

function transpose(array) {
  return array[0].map((col, i) => array.map(row => row[i]));;
}

function range(start, stop, inc = 1) {
  var out = [];
  for (var i = start; i < stop; i += inc) {
    out.push(i);
  }
  return out;
}

function shuffle(array) {
  var out = array.slice(0);
  for (var i = out.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var val = out[i];
    out[i] = out[j];
    out[j] = val;
  };
  return out;
}

function union(array1, array2 = []) {
  return [...new Set([...array1, ...array2])];
}

function complement(array1, array2) {
  return array1.filter(item => !array2.includes(item));
}


function safeTrueFalse(val) {
  if (val === 'true') {
    return true
  } else if (val === 'false') {
    return false
  } else {
    return val
  }
}

function parseSettingValue(val) {
  if (typeof val === 'string') {
    if (val.toLowerCase()==='true') {
      return true;
    } else if (val.toLowerCase()==='false') {
      return false;
    } else if (!isNaN(val)) {
      return parseFloat(val);
    } else {
      return val;
    }
  }
  return val;
}

function spanStyleString(inner, css) {
  var el = $('<span></span', {
    html: inner
  })
  el.css(css)
  return el[0]
}

function sampleFullSet(fullSet, count=1, unique=true, shuffle=true) {
  if (shuffle == false) {
    return fullSet.slice(0, count);
  } else if (unique) {
    return randomSampleSafe(fullSet, count);
  } else {
    return randomChoice(fullSet, count);
  };

};

function sampleFullSetBest(fullSet, settings={}) {
  var {shuffle=true, n=3, unique=true} = settings
  if (shuffle == false) {
    return fullSet.slice(0, n);
  } else if (unique) {
    return randomSampleSafe(fullSet, n);
  } else {
    return randomChoice(fullSet, n);
  };
};

function caseAdjust(val, caseness) {
  if (caseness == "Default" || caseness == undefined) {
    return val;
  } else if (caseness == "UpperCase") {
    return val.toUpperCase();
  } else if (caseness == "LowerCase") {
    return val.toLowerCase();
  } else if (caseness == "Capitalize") {
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  } else if (caseness == "Random") {
    return this.caseAdjust(val, randomSample(["UpperCase", "LowerCase", "Capitalize"]));
  } else if (caseness == "RandomMix") {
    var charArray = val.split("");
    var adjustFuncs = randomChoice(["UpperCase", "LowerCase"], charArray.length);
    var split = charArray.map(function(x, ind) {
      return caseAdjust(x, adjustFuncs[ind]);
    });
    return split.join("");
  }
};


var isVowel = function(x) {
  var ch = x.toLowerCase()
  return ((ch.length==1) && (ch==='a'||ch==='e'||ch==='i'||ch==='o'||ch==='u'));
}
var isCVC = (x) => (x.length===3 && !isVowel(x[0]) && isVowel(x[1]) && !isVowel(x[2]))


function generateUnique(generatingFunction,num,attempts,comparisonFunction) {
  const maxAttempts = (attempts==undefined)?num*2:attempts
  let i = 0
  var result = [], x
  while (result.length<=num && i<maxAttempts) {
    x = generatingFunction()
    if (!result.includes(x)) {
      result.push(x)
    }
    i++
  }
  if (result.length < num) {
    console.log(`failed to generate ${num} unique elements`)
  }
  return result;
}
