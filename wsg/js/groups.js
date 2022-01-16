//

var puzzleGroupObject = {
  // 'Counting':{
  //   'CountingSimple':{},
  //   'ImageCount':{},
  //   'OrderNumbers':{},
  //   'NumberComparing',
  //   'CountingBy easy',
  //   'ReadNumbers'
  // },

  'Addition to 5':{
    'tags':['Math','Addition','Kindergarten'],
    'puzzles':[
      ['ArithmeticAddition',{'maxC':5,'maxA':5,'maxB':5,'fontSize':'35','n':9,'difficulty':'easy'}],
      ['NumberLineHops',{'hops':2,'start':0,'max':6,'n':2,'end':5,difficulty:'easy'}],
      ['PairSums',{'target':5}],
      ['NumberBonds',{'operation':'addition','maxA':5,'maxB':5,'maxC':5,'n':2}],
      ['ArithmeticAddition',{'maxC':5,'maxA':5,'maxB':5,'fontSize':'35','n':10,'format':'vertical','difficulty':'easy'}]
    ]
  },

  'Addition to 10':{
    'tags':['Math','Addition','Kindergarten'],
    'puzzles':[
      ['ArithmeticAddition',{'maxC':10,'maxA':10,'maxB':10,'fontSize':'35','n':9,'difficulty':'easy'}],
      ['NumberLineHops',{'hops':2,'start':0,'max':10,'n':2,'end':10}],
      ['PairSums',{'target':IntegerValue(6,10,1)}],
      ['SumToPuzzle',{}],
      ['NumberBonds',{'operation':'addition','maxA':10,'maxB':10,'maxC':10,'n':2}],
      ['ArithmeticAddition',{'maxC':10,'maxA':10,'maxB':10,'fontSize':'35','n':15,'format':'vertical','difficulty':'easy'}]
    ]
  },

  'Addition to 20':{
    'tags':['Math','Addition','Kindergarten'],
    'puzzles':[
      ['ArithmeticAddition',{'maxC':20,'maxA':20,'maxB':20,'fontSize':'32','n':9,'difficulty':'easy'}],
      ['NumberLineHops',{'hops':2,'start':0,'max':20,'n':2,'end':20}],
      ['PairSums',{'target':IntegerValue(15,20,1)}],
      ['SumToPuzzle',{}],
      ['NumberBonds',{'operation':'addition','maxA':20,'maxB':20,'maxC':20,'n':2}],
      ['ArithmeticAddition',{'maxC':20,'maxA':20,'maxB':20,'fontSize':'32','n':15,'format':'vertical','difficulty':'easy'}]
    ]
  },

  // 'Addition tricks':{
  //   'AdditionRegrouped',
  //   'AdditionTriplets',
  //   'MatchingAdditionThreeTwo',
  //   'NumberBonds'
  // },
  //
  'Addition-Subtraction Borrowing':{
    'tags':['Math','Addition'],
    'puzzles':[
      ['AdditionRegrouping',{'teens':true,'n':3,'difficulty':'easy','carrying':false}],
      ['AdditionRegrouping',{'teens':true,'n':3,'difficulty':'medium','carrying':false}],
      ['AdditionRegrouping',{'teens':true,'n':3,'difficulty':'hard','carrying':false}],
      ['NumberSplitTensOnes',{'n':7}],
      ['SubtractionEquivalent',{'n':6}],
      ['AdditionRegrouping',{'teens':true,'n':3,'difficulty':'easy','carrying':true}],
      ['AdditionRegrouping',{'teens':true,'n':3,'difficulty':'medium','carrying':true}],
      ['AdditionRegrouping',{'teens':false,'n':3,'difficulty':'hard','carrying':true}],
      ['SubtractionEquivalent',{'n':7}],
      ['NumberSplitTeens',{'n':6}],
      ['AdditionRegrouping',{'teens':false,'n':3,'difficulty':'easy','carrying':true}],
      ['AdditionRegrouping',{'teens':false,'n':3,'difficulty':'medium','carrying':true}],
      ['AdditionRegrouping',{'teens':false,'n':3,'difficulty':'hard','carrying':true}],
      ['NumberSplitTeens',{'n':7}],
      ['NumberSplitTensOnes',{'n':6}],
      ['SubtractionRegrouping',{'teens':true,'n':3,'difficulty':'easy'}],
      ['SubtractionRegrouping',{'teens':true,'n':3,'difficulty':'medium'}],
      ['SubtractionRegrouping',{'teens':true,'n':3,'difficulty':'hard'}],
      ['NumberSplitTensOnes',{'n':7}],
      ['SubtractionEquivalent',{'n':6}],
      ['SubtractionRegrouping',{'teens':false,'n':3,'difficulty':'easy'}],
      ['SubtractionRegrouping',{'teens':false,'n':3,'difficulty':'medium'}],
      ['SubtractionRegrouping',{'teens':false,'n':3,'difficulty':'hard'}]
    ]
  },


  'Addition Vertical Carrying': {
    'tags':['math','addition','carrying'],
    'puzzles':[
      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minB:0,maxB:9,shuffle:false,format:'vertical',minA:1,maxA:9,difficulty:'easy'}],
      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minB:0,maxB:9,shuffle:false,format:'vertical',carry:false,minA:10,maxA:19,difficulty:'easy'}],
      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minB:10,maxB:19,shuffle:false,format:'vertical',carry:false,minA:1,maxA:9,difficulty:'easy'}],
      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minB:5,maxB:9,shuffle:false,format:'vertical',carry:true,minA:15,maxA:19,difficulty:'easy'}],
      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minB:15,maxB:19,shuffle:false,format:'vertical',carry:true,minA:5,maxA:9,difficulty:'easy'}]
    ]
  },

  'Math Kindergarten':{
    'tags':['math','kindergarten'],
    'puzzles':[
      ['ArithmeticAddition',{'fontSize':32,n:6,showHeader:false,minA:1,maxA:5,shuffle:true,format:'horizontal',minB:0,maxB:5,minC:0,maxC:5,difficulty:'easy','CBA':false}],
      ['OrderNumbers',{n:5,minNumber:0,maxNumber:20}],
      ['NumberComparingIntegers',{min:0,max:20,n:6,fontSize:30}],
      ['ReadNumbers',{minNumber:10,maxNumber:100,n:4,fontSize:'50'}],

      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minA:1,maxA:5,shuffle:true,format:'vertical',minB:0,maxB:5,minC:0,maxC:9,difficulty:'easy','CBA':false}],
      ['NumberLineHops',{'hops':2,'start':0,'max':6,'n':2,'end':5}],
      ['PairSums',{'target':5}],


      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minA:1,maxA:5,shuffle:false,format:'horizontal',minB:0,maxB:5,minC:0,maxC:5,difficulty:'easy','CBA':false}],
      ['QuestionsMathAddition',{n:1,showHeader:false}],
      ['ChoiceNumbersComparison'],

      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minA:1,maxA:5,shuffle:false,format:'horizontal',minB:0,maxB:5,minC:0,maxC:5,difficulty:'easy','CBA':false}],
      ['NumberComparingIntegers',{min:0,max:20,n:6,fontSize:30}],
      ['SizeComparison'],

      ['CountingBy',{direction:'increasing',countBy:1,placement:'random'}],
      ['NumberComparingIntegers',{min:0,max:50,n:6,fontSize:30}],
      ['QuestionsMathComparison',{n:1,showHeader:false}],
      ['ArithmeticAddition',{'fontSize':32,n:6,showHeader:false,minA:1,maxA:5,shuffle:true,format:'horizontal',minB:2,maxB:5,minC:0,maxC:10,difficulty:'easy','CBA':false}],

      ['NumberLineHops',{'hops':2,'start':0,'max':10,'n':2,'end':10}],
      ['PairSums',{'target':10}],
      ['ArithmeticAddition',{'fontSize':32,n:4,showHeader:false,minA:1,maxA:10,shuffle:true,format:'vertical',minB:0,maxB:10,minC:0,maxC:29,difficulty:'easy','CBA':false,carry:false}],


      ['OrderNumbers',{n:5,minNumber:0,maxNumber:99}],
      ['ReadNumbers',{minNumber:100,maxNumber:999,n:4}],
      ['ImageCountGroups',{difficulty:'easy'}]
    ]
  },

  'Language Kindergarten':{
    'tags':['reading','language','kindergarten'],
    'puzzles':[
      ['MatchingPictureWords',{n:3,minWordLength:3,maxWordLength:3}],
      ['MatchingLetterCase',{n:4}],

      ['PictureWordChoose',{minWordLength:3,maxWordLength:3,numChoices:2,n:5,imageSize:145}],

      ['MatchingWordCase',{n:3}],
      ['MatchingPictureWords',{n:4,minWordLength:3,maxWordLength:4}],

      ['OrderLetters',{n:5}],
      ['PictureWords',{n:4,minWordLength:3,maxWordLength:4}],

      ['TraceLetters',{n:6}],
      ['PictureJumble',{n:4,maxLength:4}],

      ['TracePuzzle',{n:6,contentType:'words'}],
      ['WordSearch',{n:5}],


      ['PictureWordChoose',{}],

      ['ReadersVeryEasy'],

      ['ReadersEasy'],

      ['WritingBoxEasyPicture'],
      ['WritingBoxEasy']
    ]
  },



  'Subtraction to 5': {
    'tags':['math','subtraction'],
    'puzzles':[
      // A-B=C
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minA:1,maxA:5,shuffle:false,format:'horizontal',minB:0,maxB:5,minC:0,maxC:5,difficulty:'easy','CBA':false}],
      ['ArithmeticSubtraction',{'fontSize':32,n:5,showHeader:false,minA:1,maxA:5,shuffle:false,format:'vertical',minB:0,maxB:5,minC:0,maxC:5,difficulty:'easy','CBA':false}],
      // C-B=A
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minC:1,maxC:5,shuffle:false,format:'horizontal',minB:0,maxB:5,minA:0,maxA:5,difficulty:'easy','CBA':true}],
      ['ArithmeticSubtraction',{'fontSize':32,n:5,showHeader:false,minC:1,maxC:5,shuffle:false,format:'vertical',minB:0,maxB:5,minA:0,maxA:5,difficulty:'easy','CBA':true}],
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minC:5,maxC:5,shuffle:false,format:'horizontal',minB:0,maxB:5,minA:0,maxA:5,difficulty:'easy','CBA':true}]
    ]
  },

  'Subtraction to 10': {
    'tags':['math','subtraction'],
    'puzzles':[
      // A-B=C
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minA:1,maxA:10,shuffle:false,format:'horizontal',minB:0,maxB:10,minC:1,maxC:9,difficulty:'easy','CBA':false}],
      ['ArithmeticSubtraction',{'fontSize':32,n:4,showHeader:false,minA:1,maxA:10,shuffle:false,format:'vertical',minB:0,maxB:10,minC:1,maxC:9,difficulty:'easy','CBA':false}],
      // C-B=A
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minC:1,maxC:10,shuffle:false,format:'horizontal',minB:1,maxB:9,minA:0,maxA:10,difficulty:'easy','CBA':true}],
      ['ArithmeticSubtraction',{'fontSize':32,n:4,showHeader:false,minC:1,maxC:10,shuffle:false,format:'vertical',minB:1,maxB:9,minA:0,maxA:10,difficulty:'easy','CBA':true}],
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minC:10,maxC:10,shuffle:false,format:'horizontal',minB:1,maxB:10,minA:1,maxA:10,difficulty:'easy','CBA':true}]
    ]
  },

  'Subtraction to 20': {
    'tags':['math','subtraction'],
    'puzzles':[
      // A-B=C
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minA:10,maxA:20,shuffle:false,format:'horizontal',minB:0,maxB:20,minC:1,maxC:19,difficulty:'easy','CBA':false}],
      ['ArithmeticSubtraction',{'fontSize':32,n:5,showHeader:false,minA:10,maxA:20,shuffle:false,format:'vertical',minB:0,maxB:20,minC:1,maxC:19,difficulty:'easy','CBA':false}],
      // C-B=A
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minC:10,maxC:20,shuffle:false,format:'horizontal',minB:1,maxB:19,minA:0,maxA:20,difficulty:'easy','CBA':true}],
      ['ArithmeticSubtraction',{'fontSize':32,n:5,showHeader:false,minC:10,maxC:20,shuffle:false,format:'vertical',minB:1,maxB:19,minA:0,maxA:20,difficulty:'easy','CBA':true}],
      ['ArithmeticSubtraction',{'fontSize':32,n:6,showHeader:false,minC:20,maxC:20,shuffle:false,format:'horizontal',minB:1,maxB:20,minA:0,maxA:20,difficulty:'easy','CBA':true}],
      // A-B=C
      ['ArithmeticSubtraction',{'fontSize':32,n:15,showHeader:false,minA:1,maxA:20,shuffle:false,format:'horizontal',minB:1,maxB:20,minC:0,maxC:20,difficulty:'easy','CBA':false}],
      // C-B=A
      ['ArithmeticSubtraction',{'fontSize':32,n:15,showHeader:false,minC:1,maxC:20,shuffle:false,format:'horizontal',minB:0,maxB:20,minA:1,maxA:20,difficulty:'easy','CBA':true}]
    ]
  },

  'Arithmetic Target': {
    'tags':['math','addition','subtraction'],
    'puzzles':[
      ['ArithmeticTarget',{'fontSize':35,n:4,showExact:true,numTerms:3,operations:'+,-',showHeader:true}],
      ['ArithmeticTarget',{'fontSize':35,n:4,showExact:false,numTerms:3,showHeader:false}],
      ['ArithmeticTarget',{'fontSize':35,n:2,showExact:false,numTerms:4,showHeader:false}]

    ]
  },



  'Multiplication Easy': {
    'tags':['math','multiplication'],
    'puzzles':[
      // 0, 1, 2
      ['ArithmeticMultiplication',{'fontSize':26,n:9,showHeader:false,minB:0,maxB:0,shuffle:true,minA:1,maxA:9,difficulty:'easy'}],
      ['ArithmeticMultiplication',{'fontSize':26,n:9,showHeader:false,minB:1,maxB:1,shuffle:true,minA:0,maxA:9,difficulty:'easy'}],
      ['ArithmeticMultiplication',{'fontSize':26,n:9,showHeader:false,minB:2,maxB:2,shuffle:true,minA:1,maxA:6,difficulty:'easy'}],
      ['ArithmeticMultiplication',{'fontSize':26,n:18,showHeader:false,minB:0,maxB:2,shuffle:true,minA:1,maxA:6,difficulty:'easy'}],
      // 5, 10, 11
      ['ArithmeticMultiplication',{'fontSize':24,n:9,showHeader:false,minB:10,maxB:10,shuffle:true,maxA:9,difficulty:'easy'}],
      ['ArithmeticMultiplication',{'fontSize':24,n:9,showHeader:false,minB:11,maxB:11,shuffle:true,maxA:9,difficulty:'easy'}],
      ['ArithmeticMultiplication',{'fontSize':24,n:15,showHeader:false,minB:10,maxB:11,shuffle:true,maxA:9,difficulty:'easy'}],
      //
      // ['ArithmeticMultiplication',{'fontSize':26,n:12,showHeader:false,minB:2,maxB:2,shuffle:true,minA:1,maxA:6,difficulty:'easy'}]
    ]
  },

  'Multiplication Addition Relationship': {
    'tags':['math','multiplication','addition'],
    'puzzles':[
      ['ImageCountGrid',{'fontSize':26,n:8,showHeader:false,minB:0,maxB:0,shuffle:true,minA:1,maxA:9,difficulty:'easy'}],
      ['MatchingMultiplication',{'fontSize':26,n:8,showHeader:false,minB:1,maxB:1,shuffle:true,minA:0,maxA:9,difficulty:'easy'}],
      ['ArithmeticMultiplication',{'fontSize':26,n:8,showHeader:false,minB:1,maxB:1,shuffle:true,minA:0,maxA:9,difficulty:'easy'}]
    ]
  },

  'Fractions Easy': {
    'tags':['math','fractions'],
    'puzzles':[
      ['FractionFromColoring',{'fontSize':26,n:5}],
      ['MatchingFractionBoxes',{'fontSize':35,n:5}],
      ['FractionToColoring',{'fontSize':26,n:5}],
      ['MatchingFractions',{'fontSize':30,n:6}]
    ]
  },


  'Place Value': {
      'tags':['math','place value'],
      'puzzles':[
        ['PlaceValue',{'fontSize':26,n:3,difficulty:'easy',format:'left'}],
        ['ImageCountGroups',{'fontSize':30,difficulty:'easy',min:21,max:29}],
        ['PlaceValue',{'fontSize':26,n:3,difficulty:'easy',format:'right'}],
        ['PlaceValue',{'fontSize':26,n:3,difficulty:'medium',format:'left'}],
        ['ImageCountSymbols',{'fontSize':30,difficulty:'easy',min:11,max:29}],
        ['PlaceValue',{'fontSize':26,n:3,difficulty:'medium',format:'right'}],
        ['PlaceValue',{'fontSize':24,n:4,difficulty:'hard',format:'left'}],
        ['ImageCountSymbols',{'fontSize':28,difficulty:'hard',min:11,max:49}],
        ['PlaceValue',{'fontSize':26,n:3,difficulty:'hard',format:'right'}]
      ]
    },

    'Matching Simple': {
        'tags':['matching','reading','counting'],
        'puzzles':[
          ['MatchingPictureWords',{n:4}],
          ['MatchingPictureCounting',{n:4}],
          ['MatchingLetterCase',{n:4}],
          ['MatchingWordCase',{n:4}]
        ]
      },




  // 'Symbolic Understanding': {
  //   'ArithmeticAddition': {'symbol':true,'n':4},
  //   'AlgebraEasiest':{}
  // }

  // 'Fractions':{
  //
  // }
};

//
