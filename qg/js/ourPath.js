var mathGroups = {};
questionsGroupsB={Math:{},Language:{}};


function addSection(mainObj,label,descr) {
  mainObj[label]={};
  mainObj[label]['Description'] = descr;
}

function addSubsection(mainObj,label,sublabel,descr,newObj) {
  mainObj[label][sublabel] =newObj;
  mainObj[label][sublabel]['Description'] = descr;
}



function addMixSection(mainObj, label,sublabel) {
  const obj = mainObj[label][sublabel];
  const keys = Object.keys(obj);
  const allQs = [];
  console.log(keys)
  keys.forEach(function(key) {
    console.log(obj[key])
    allQs.push(...obj[key])
  });
  console.log(allQs);
  mainObj[label][sublabel]['Mixture of all in this group'] = allQs;
}


// the descriptions mainly describe the new things in each section.
// each section can also contain review material from previous sections
const descriptions = {};

mathGroups['1']={};
descriptions['1'] = `Counting numbers up to 100, comparisions, ordering, and charts`;
// addSection(mathGroups,'1',`Counting numbers up to 100, comparisions, ordering, and charts`)
// Numbers up to 10
descriptions['1-A'] = 'Numbers up to 10';
mathGroups['1']['A'] = {
  'Counting images up to 10':[
    ['math-counting-countOneImage',{answerRange:[1,5]}],
    ['math-counting-countOneOfSeveralImages',{numDifferent:2,numTotal:6}],
    ['math-counting-countOneOfSeveralImages',{numDifferent:2,numTotal:10}],
    ['math-counting-countOneOfSeveralImages',{numDifferent:3,numTotal:10}]
  ],
  'Numbers up to 10':[
    ['math-numbers-reading', {top: 'number',min: 0,max: 10}],
    ['math-numbers-reading', {top: 'word',min: 0,max: 10}],
    ['math-counting-countingSequence', {start: [0, 5],step: 1,nAfter: 2, nBlank:1 }],
    ['math-counting-countingSequence', {start: [0, 5],step: 1,nAfter: 0, nBefore:5, nBlank:1 }],
    ['math-counting-countingSequence', {start: [0, 5],step: 1,nAfter: 5, nBefore:0, nBlank:1 }]
  ],
  'Comparisons up to 10':[
    ['math-counting-imageCountComparison',{}],
    ['math-numbers-compare', {n:2, min: 0, max:10 }],
    ['math-numbers-compare', {n:3, min: 0, max:10 }],
    ['math-numbers-compare', {n:4, min: 0, max:10 }]
  ],
  'Ordering up to 10':[
    ['math-orderNumbers',{min:0,max:10,n:2}],
    ['math-orderNumbers',{min:0,max:10,n:3}]
  ],
  'Data':[
    ['math-sizes-imageSizeComparison',{n:2}],
    ['math-data-chartComparisons', {labeled:true,n:2,min: 0, max:10, chartType:'bar' }],
    ['math-data-chartComparisons', {n:2,min: 0, max:10 , chartType:'pie'}],
    ['math-data-howManyChart',{n:2,min:0,max:10}],
    ['math-sizes-imageSizeComparison',{n:4}],
    ['math-data-chartComparisons', {n:4,min: 0, max:10, chartType:'bar' }],
    ['math-data-chartComparisons', {n:4,min: 0, max:10 , chartType:'pie'}],
    ['math-data-howManyChart',{n:4,min:0,max:10}]
  ]
};
// addMixSection(mathGroups, '1','A')


descriptions['1-B'] = 'Numbers up to 20';
mathGroups['1']['B'] = {
  'Reading numbers, 10 to 20':[
    ['math-numbers-reading', {top: 'number',min: 10,max: 20}],
    ['math-numbers-reading', {top: 'word',min: 10,max: 20}]
  ],
  'Counting forward, 10 to 20':[
    ['math-counting-countingSequence', {start: [10, 15],step: 1,nAfter: 2, nBlank:1 }],
    ['math-counting-countingSequence', {start: [10, 15],step: 1,nAfter: 0, nBefore:5, nBlank:1 }],
    ['math-counting-countingSequence', {start: [10, 15],step: 1,nAfter: 5, nBefore:0, nBlank:1 }]
  ],
  'Comparisons up to 20':[
    ['math-numbers-compare', {n:2, min: 0, max:20 }],
    ['math-numbers-compare', {n:3, min: 0, max:20 }],
    ['math-numbers-compare', {n:4, min: 0, max:20 }]
  ],
  'Ordering up to 20':[
    ['math-orderNumbers',{min:0,max:20,n:2}],
    ['math-orderNumbers',{min:0,max:20,n:3}]
  ],
  'Backwards counting, 10 to 20':[
    ['math-counting-countingSequence', {reverse:true,start: [10, 15],step: 1,nAfter: 2, nBlank:1 }],
    ['math-counting-countingSequence', {reverse:true,start: [10, 15],step: 1,nAfter: 0, nBefore:5, nBlank:1 }],
    ['math-counting-countingSequence', {reverse:true,start: [10, 15],step: 1,nAfter: 5, nBefore:0, nBlank:1 }]
  ]
};

// addMixSection(mathGroups, '1','B')

/////////////////////////////////////////////
mathGroups['2']={};
descriptions['2'] = `Numbers up to 100, addition and subtraction up to 100 +- 10, place value ones and tens.`;
descriptions['2-A'] = 'Numbers up to 10';
mathGroups['2']['A'] = {
  'Numbers up to 100':[
    ['math-numbers-reading', {top: 'number',min: 1,max: 100}],
    ['math-numbers-reading', {top: 'word',min: 1,max: 100}],
    ['math-counting-countingSequence', {start: [5, 95],step: 1,nAfter: 2, nBlank:1 }],
    ['math-counting-countingSequence', {start: [5, 100],step: 1,nAfter: 0, nBefore:5, nBlank:1 }],
    ['math-counting-countingSequence', {start: [0, 15],step: 1,nAfter: 5, nBefore:0, nBlank:1 }]
  ],
  'Comparisons and ordering up to 20':[
    ['math-counting-imageCountComparison',{}],
    ['math-numbers-compare', {n:2, min: 0, max:100 }],
    ['math-numbers-compare', {n:3, min: 0, max:100 }],
    ['math-numbers-compare', {n:4, min: 0, max:100 }],
    ['math-orderNumbers',{min:0,max:20,n:2}],
    ['math-orderNumbers',{min:0,max:20,n:3}]
  ]
}

descriptions['2-B'] = 'Place value and counting by 10s';
mathGroups['2']['B'] = {
  'Place value':[
    ['math-numbers-placeValueFrom', {min: 1,max: 100}],
  ]
};

descriptions['2-C'] = 'Addition and Subtraction up to 5+5 and 5-5';
mathGroups['2']['C'] = {
  'Adding up to 5+5, pictures':[
    ['math-arithmetic', {format:'image',sign:'+',termRanges: [[1, 5],[1, 5]], answerRange: [0, 10] }],
  ],
  'Subtracting up to 5-5, pictures':[
    ['math-arithmetic', {format:'image',sign:'-',termRanges: [[1, 5],[1, 5]], shuffle:false, answerRange: [0, 10] }]
  ],
  'Adding up to 5+5, equation':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 5],[0, 5]], answerRange: [0, 10] }],
  ],
  'Subtracting up to 5-5, equation':[
    ['math-arithmetic', {sign:'-',termRanges: [[0, 5],[0, 5]], shuffle:false, answerRange: [0, 10] }]
  ],
  'Adding up to 5+5, word problem':[
    ['math-arithmetic', {format:'word',sign:'+',termRanges: [[0, 5],[0, 5]], answerRange: [0, 10] }],
  ],
  'Subtracting up to 5-5, word problem':[
    ['math-arithmetic', {format:'word',sign:'-',termRanges: [[0, 5],[0, 5]], shuffle:false, answerRange: [0, 10] }]
  ]
};

txt1=`Rounding & Estimation Introduction$$Rounding to 10 and `+
  `addition/subtraction on tens.  The goal here is to introduce rounding as a `+
  `tool for estimating addition/subtraction problems we can't yet solve`;
mathGroups['2'][`Rounding and Estimation`] = {
  'Adding tens':{},
  'Rounding': {
    "Rounding to 10's up to 100": ['math-rounding', {
      rountTo: 10,
      max: 100
    }]
  },
  'Place Value': {
    'Place Value': [
      ["math-numbers-placeValueFrom", {}],
      ['math-numbers-placeValueTo', {
        format: 'words'
      }]
    ]
  }
}

mathGroups['2'][`Numbers up to 999`] = {
  'Reading numbers':{'reading numbers':[
    ['math-numbers-reading', {top: 'number',min: 1,max: 999}],
    ['math-numbers-reading', {top: 'word',min: 1,max: 999}],
  ]
},
  'Adding a few':{
    'adding a few':[
    ['math-arithmetic', {format:'word',sign:'-',termRanges: [[100, 996],[1, 3]], shuffle:false, answerRange: [0, 999] }],
    ['math-arithmetic', {format:'word',sign:'+',termRanges: [[100, 996],[1, 3]], shuffle:true, answerRange: [0, 999] }],
    ['math-arithmetic', {sign:'-',termRanges: [[100, 996],[1, 3]], shuffle:false, answerRange: [0, 999] }],
    ['math-arithmetic', {sign:'+',termRanges: [[100, 996],[1, 3]], shuffle:true, answerRange: [0, 999] }]
  ]
}
}

/*
mathGroups['2']['Numbers up to 100 -- adding and subtracting  1 or 2']={
  'Counting up to 100 with 1 blanks':[
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:1 }],
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:1, reverse:true }]
  ],
  'Adding or subtracting 1 up to 100':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 99],[1, 1]], answerRange: [1, 100] }],
    ['math-arithmetic', {sign:'-',termRanges: [[0, 100],[1, 1]], shuffle:false, answerRange: [1, 100] }]
  ],
  'Counting up to 100 with 2 blanks':[
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:2 }],
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:2, reverse:true }]
  ],
  'Adding or subtracting 2 up to 100':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 98],[2, 2]], answerRange: [1, 100] }],
    ['math-arithmetic', {sign:'-',termRanges: [[0, 100],[2, 2]], shuffle:false, answerRange: [1, 100] }]
  ]
}

mathGroups['2']['Numbers up to 100 -- counting, reading, comparing']={
  'Reading numbers up to 100':[
    ['math-numbers-reading', {top: 'word', min: 11, max: 100}],
    ['math-numbers-reading', {top: 'number',min: 11,max: 100}]
  ],
  'Counting up to 100 with 1 blanks':[
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:1 }],
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:1, reverse:true }]
  ],
  'Comparisons up to 100': [
    ["math-numbers-compare", {n: 3,max: 100 }],
    ["math-numbers-compare", {n: 2,max: 100 }]
  ]
}
*/



/*
  COunting by 10s
  counting sequence backwards

*/
/* what are the NEW things at each step?

*/

/*
countOneImage up to 5
countOneOfSeveralImages up to 8 total
countingSequence
imageCountComparison
WHich number is bigger
Which number is biggest
Which picture count is less
which picture is biggest
barChart comparisons
barChart most
barChart how many
order numbers
placeValueFrom
number reading
what number is this
rounding

GEOMETRY

addition
howManyMore
howManyPair
perimeter

Reading


*/

/*
questionsGroupsB['Language']['Spelling 2'] = {
  "Unscramble the letters": ["language-spelling-pictureJumble"],
  "Choose the correct spelling": ["language-spelling-pictureChooseSpelling"]
}
*/



mathGroups['3']={};
descriptions['3'] = 'Multiplication and ';
descriptions['3-C'] = '';
mathGroups['3']['C'] = {
  'Making 10':[
    ['math-arithmetic', {sign:'+',termRanges: [[3, 9],[0, 9]],blank:'ab', answerRange: [10, 10] }]
  ],
  'Addition up to 9+9':[
    ['math-arithmetic', {sign:'+',termRanges: [[3, 9],[2, 9]], answerRange: [0, 100] }]
  ],
  'Inverse addition up to 10':[
    ['math-arithmetic', {sign:'+',termRanges: [[3, 9],[2, 9]], blank:'ab',answerRange: [0, 100] }]
  ],
  'Multiplying up to 5x5':[
    ['math-arithmetic', {sign:'*',termRanges: [[0, 5],[2, 5]], answerRange: [0, 100] }]
  ],
  'Multiplying by 2 up to 2x10':[
    ['math-arithmetic', {sign:'*',termRanges: [[2, 2],[2, 10]], answerRange: [0, 100] }]
  ],
  'Doubles up to 10+10':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 10],[2, 10]], differenceRange:[0,0],answerRange: [0, 100] }]
  ],
  'Rewriting AB x C': [
    ["math-multiplication-expansion-matching", {bDigits:1,expandTop:false,expandBottom:false }]
  ]
}
