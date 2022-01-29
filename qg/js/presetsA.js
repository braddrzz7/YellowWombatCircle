var questionsGroupsA = {
  1: {}
};


questionsGroupsA['1']['A']={
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
