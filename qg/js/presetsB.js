var questionsGroupsB = {
  2022: {},
  2021: {}
};

questionsGroupsB['2022']['Jan 30']={
  'Adding or subtracting 1 up to 100':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 100],[1, 1]], answerRange: [1, 100] }],
    ['math-arithmetic', {sign:'-',termRanges: [[0, 100],[1, 1]],shuffle:false, answerRange: [1, 100] }]
  ],
  'Counting up to 100':[
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2 }],
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, reverse:true }]
  ],
  'Adding or subtracting 2 up to 100':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 100],[2, 2]], answerRange: [1, 100] }],
    ['math-arithmetic', {sign:'-',termRanges: [[0, 100],[2, 2]], shuffle:false, answerRange: [1, 100] }]
  ],
  'Counting up to 100 with 2 blanks':[
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:2 }],
     ['math-counting-countingSequence', {start: [0, 100],step: 1,nAfter: 2, nBlank:2, reverse:true }]
  ]
}


questionsGroupsB['2022']['Jan 23']={
  'Adding and subtracting up to 5+5 and 5-5':[
    ['math-arithmetic', {sign:'+',termRanges: [[0, 5],[0, 5]], answerRange: [0, 10] }],
    ['math-arithmetic', {sign:'-',termRanges: [[0, 5],[0, 5]], answerRange: [0, 5] }]
  ],
  'Comparisons up to 999': [
    ["math-numbers-compare", {n: 3,max: 100 }],
    ["math-numbers-compare", {n: 2,max: 999 }]
  ],
  'Reading numbers up to 100':[
    ['math-numbers-reading', {top: 'word', min: 11, max: 100}],
    ['math-numbers-reading', {top: 'number',min: 11,max: 100}]
  ]
}

//
// questionsGroupsB['2022']['February'] = {
//   'Rounding': {
//     "Rounding to 10's up to 100": ['math-rounding', {
//       rountTo: 10,
//       max: 100
//     }]
//   },
//   'Place Value': {
//     'Place Value': [
//       ["math-numbers-placeValueFrom", {}],
//       ['math-numbers-placeValueTo', {
//         format: 'words'
//       }]
//     ]
//   }
// }
