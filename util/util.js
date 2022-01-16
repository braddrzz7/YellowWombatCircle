
function functionExcept(f,exceptVal,comparator=(a,b)=>(a==b)) {
  const newVal = f()
  if (comparator(newVal,exceptVal)) {
    return functionExcept(f,exceptVal);
  } else {
    return newVal;
  }
}

function scrollToBottom(id) {
  var element = document.getElementById(id);
  element.scrollTop = element.scrollHeight;
}

function toArray(arg) {
  if (arg instanceof Array) {
    return arg;
  } else {
    return [arg];
  }
}

function caseAdjust(arg,caseness='uppercase') {
  if (arg instanceof Array) {
    return arg.map(x=>caseAdjust(x,caseness));
  } else {
    if (caseness==='uppercase') { return arg.toUpperCase()}
    else if (caseness==='lowercase') { return arg.toLowerCase()}
  }
}


function pluralize(number, word, withNumber, ending) {
  var suffix = (ending == undefined) ? 's' : ending;
  var prefix = (withNumber == false) ? '' : number + ' ';
  if (number == 0 || number > 1) {
    return prefix + word + suffix;
  } else {
    return prefix + word;
  }
}

function aOrAn(word, includeWord) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var out;
  if (vowels.includes(word[0].toLowerCase())) {
    out = 'an';
  } else {
    out = 'a';
  };
  if (includeWord == true) {
    return out + ' ' + word;
  } else {
    return out;
  }
};

function constantVector(val, n) {
  var vec = range(0, n).map(function() {
    return val;
  })
  return vec;
}

function constantMatrix(val, dims) {
  var mat = range(0, dims[0]).map(function() {
    return range(0, dims[1]).map(function() {
      return val;
    });
  });
  return mat;
}

function sortNumbers(array,rev=false) {
  let out = array.slice().sort((a,b) => a-b);
  if (rev) {
    out.reverse()
  }
  return out;
}

function range(start, stop, inc = 1) {
  var out = []
  for (var i = start; i < stop; i += inc) {
    out.push(i)
  }
  return out;
}

function shuffle(array) {
  var out = array.slice(0)
  for (var i = out.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var val = out[i]
    out[i] = out[j]
    out[j] = val
  };
  return out;
}


/*
  RANDOM
*/

function randomInteger(min, max, n, unique=false) {
  const minInt = (typeof(min)==='string')?parseInt(min):min
  const maxInt = (typeof(max)==='string')?parseInt(max):max

  // for small range, make full list and safely sample for unique
  if (unique==true && (maxInt-minInt)<=100) {
    return randomSample(range(minInt,maxInt,1),n);
  }

  const oneRandomInteger = () => Math.floor(Math.random() * (maxInt + 1 - minInt)) + minInt
  if (n==undefined) {
    return oneRandomInteger();
  }
  var i;
  var list = [];
  for (i = 0; i < n; i++) {
    if (unique==true && (maxInt-minInt)>n) {
      list[i] = functionExcept(oneRandomInteger,list,(newVal,exceptVal)=>exceptVal.includes(newVal));
    } else {
      list[i] = oneRandomInteger()
    }
  };
  return list;
}


// sample with replacement
function randomChoice(array, n0) {
  const n = (n0===undefined)?1:n0
  var pos = randomInteger(0, array.length - 1, n);
  if (n0===undefined) {
    return array[pos[0]];
  } else {
    return pos.map(x => (array[x]));
  }
}

// sample with replacement until you run out, then do it again (minimial repeats)
function randomSample(array, n) {
  if (n==undefined) {
    return randomSample(array,1)[0];
  }
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


function randomReal(min, max, n, prec=1) {
  const oneRandomReal = () => (Math.floor((1/prec)*(Math.random() * (max - min) + min)))*prec
  if (n==undefined) {
    return oneRandomReal();
  }
  return range(0,n,1).map(x=>oneRandomReal());
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

// function formatFraction(frac) {
//   if (!isNaN(frac)) {
//     return `<span class="fractionNotFraction">${frac}</span>`;
//   }
//   return `<span class="fraction"><span class="numerator">${frac[0]}</span>
//   <span class="denominator">${frac[1]}</span></span>`;
// }


/*
  LETTERS
*/

function allLetters(caseness='lowercase') {
  var alphabet = [];
  for (i = 0; i < 26; i++) {
    alphabet[i] = String.fromCharCode(97 + i);
  };
  if (caseness=='uppercase') {
    return alphabet.map(x=>x.toUpperCase());
  } else if (caseness=='mixed') {
    return alphabet.map(x=>randomSample([true,false])?x.toUpperCase():x)
  }
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

function isVowel(x) {
  var ch = x.toLowerCase()
  return ((ch.length==1) && (ch==='a'||ch==='e'||ch==='i'||ch==='o'||ch==='u'));
}

function isCVC(x) {
  return (x.length===3 && !isVowel(x[0]) && isVowel(x[1]) && !isVowel(x[2]));
}

/*
  ARRAY
*/


function flatten(arrays) {
  return [].concat.apply([], arrays);
}

function transpose(array) {
  return array[0].map((col, i) => array.map(row => row[i]));;
}

function union(array1, array2 = []) {
  return [...new Set([...array1, ...array2])];
}

function complement(array1, array2) {
  return array1.filter(item => !array2.includes(item));
}
