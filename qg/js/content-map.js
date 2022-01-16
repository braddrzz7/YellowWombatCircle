
everything = {
  'math':{
    'counting':{
      format:['number','number-vertical','word','image'],

    },
    'ordering':{
      format:['number','image','barchart','piechart']
    },
    'comparing':{
      format:['number','image','barchart','piechart']
    },
    'addition':{
      format:['number-horizontal','number-vertical','word','image'],

    },
    'subtraction':{}
  },
  'language':{
    'letters':{},
    'words':{},
    'reading':{},
    'spelling':{}
  }
}

everything['math']['addition'] = {
  dimensions:{
    format:['number-horizontal','number-vertical','word','image'],
    direction:['forward','inverse'],
    complexity:['carry-yes','carry-no','carry-maybe'],
    questions:[
      'math-addition-whole-forward',
      'math-addition-whole-inverse',
      'math-subtraction-whole-forward',
      'math-addition-whole-inverse'
    ]
  }
}


everything['counting'] = [
  'math-counting-countOneImage',
  'math-counting-countOneOfSeveralImages'
]
