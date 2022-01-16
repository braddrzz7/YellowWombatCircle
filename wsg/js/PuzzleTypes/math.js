
Puzzle.Types['ArithmeticPuzzle'] = {
  'tags': ['Math', 'Arithmetic'],
  'category':'math',
  'settings': {
    'n': IntegerValue(2, 6, 1),
    'minA': IntegerValue(0, 10, 1, 0),
    'maxA': IntegerValue(5, 10, 1),
    'minB': IntegerValue(5, 10, 1, 0),
    'maxB': IntegerValue(5, 10, 1),
    'minC': IntegerValue(5, 10, 1, 0),
    'maxC': IntegerValue(5, 10, 1, 100),
    'shuffle':BooleanValue(true),
    'CBA': BooleanValue(false),
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard']),
    'operation': EnumeratedValue(['addition', 'subtraction', 'multiplication', 'add, subtract', 'all']),
    'format':EnumeratedValue(['horizontal','vertical'],'horizontal'),
    // 'carry':EnumeratedValue([true,false],true),
    'carrying':EnumeratedValue(['yes','no','maybe'],'maybe'),
    'unique':BooleanValue(true),
    'symbol':EnumeratedValue([true,false],false)
  },
  layout: {
    'containerCSS':{'justify-content':'space-around'},
    'numberLine': BooleanValue(false),
    'fontSize': FontSizeValue(38)
  },
  content: {
    'problems': function(settings) {
      const {
        minA,       maxA,   minB,        maxB,
        minC,        maxC,  maxNumber,        CBA,
        n,        operation, unique,
        difficulty,
        format, carrying
      } = settings.object();
      var signChoices
      if (operation === 'addition') {
        signChoices = ['+']
      } else if (operation === 'subtraction') {
        signChoices = ['-']
      } else if (operation === 'multiplication') {
        signChoices = ['*']
      } else if (operation === 'add, subtract') {
        signChoices = ['+', '-']
      } else {
        signChoices = ['+', '-','*']
      }
      var blankPositions
      if (difficulty === 'hard') {
        blankPositions = randomSampleSafe([0,2,4], n)
      } else {
        blankPositions = range(0,n,1).map(x => ((CBA) ? 0 : 4))
      }
      // var eqns = randomArithmeticEquations(n,signChoices,[[minA,maxA],[minB,maxB]],[minC,maxC],100)
      var eqns = randomArithmeticEquations(n,{unique:unique,carrying:carrying,signChoices:signChoices,termRanges:[[minA,maxA],[minB,maxB]],answerRange:[minC,maxC],shuffleTerms:shuffle})
      var blanks = blankPositions.map(x=>[[x,'__']])
      return transpose([eqns,blanks]);

    }
  },
  makePuzzleInstruction: function(pz) {
    var operation = pz.settings.value('operation')
    var CBA = pz.settings.value('CBA')
    if (operation == 'addition') {
      return 'Addition: ' + (CBA ? 'C + B = A' : 'A + B = C');
    } else if (operation == 'subtraction') {
      return 'Subtraction: ' + (CBA ? 'C - B = A' : 'A - B = C');
    } else if (operation == 'multiplication') {
      return 'Multiplication: ' + (CBA ? 'C * B = A' : 'A * B = C');
    } else if (operation == 'add, subtract') {
      return 'Addition and Subtraction, '+ (CBA ? 'C,B,A' : 'A,B,C');
    } else {
      return 'Arithmetic'
    }
  },

  makePuzzleBody: function(pz) {
    var operation = pz.settings.value('operation')
    var format = pz.settings.value('format')
    var diff = pz.settings.value('difficulty')
    var CBA = pz.settings.value('CBA')
    var symbolBool = pz.settings.value('symbol')
    var processValue = function(word) {
      var symbolChar = randomChoice(range(9728,9734+1,1).concat(range(9812,9831+1,1)).map((x)=>'&#'+x+';'),1)[0]
      var box = equationElement(
        // [ai,sign,bi,'=',ci],
        word[0],
        word[1],
        format
      )

    var out
    if (symbolBool===true) {
      box.css({'border-bottom':'solid gray 1px'})
      var extraEqn = $('<div>',{'html':symbolChar + ' = ___'}).css({'border-bottom':'solid gray 1px'})
      out = $('<div>',{'class':'flexContainer'}).append([
        $('<div>',{'html':'If &nbsp;&nbsp;'}),
        box,
        $('<div>',{'html':' &nbsp;&nbsp;Then  &nbsp;&nbsp;'}),
        extraEqn
      ])
    } else {
      out = $('<div>',{'class':'flexContainer'}).append([box])
    }
      return out;
    }
    var vals = pz.content.value('problems').map(x => processValue(x));
    var out = constructElementGrid(pz.id, vals, pz.layout.object(), 'Math', null)
    out.find("div").css('font-size', pz.layout.value('fontSize'))
    if (pz.layout.value('numberLine')) {
      out.prepend(numberLine({
        min: -8,
        max: 8,
        step: 1
      }))
    };
    return out;
  }
}

Puzzle.Types['ArithmeticAddition']={
  category:'math',
  subcategory:'addition',
  tags:['addition'],
  operation:'addition',
  parentPuzzle:'ArithmeticPuzzle'
}

Puzzle.Types['ArithmeticSubtraction']={
  category:'math',
  subcategory:'subtraction',
  tags:['subtraction'],
  operation:'subtraction',
  minC:0,
  parentPuzzle:'ArithmeticPuzzle'
}

Puzzle.Types['ArithmeticMultiplication']={
  category:'math',
  subcategory:'multiplication',
  tags:['multiplication'],
  operation:'multiplication',
  parentPuzzle:'ArithmeticPuzzle'
}


Puzzle.Types['AlgebraEasiest'] = {
  'tags': ['Math', 'Algebra'],
  'category':'math',
  'subcategory':'algebra',
  'settings': {
    'n': IntegerValue(2, 4, 1)
  },
  layout: {
    'elementClass': 'algebraQuestion ',
    'elementCSS': {
      'letter-spacing': '2px'
    },
    'fontSize': FontSizeValue(32)
  },
  content: {
    'problems': function(settings) {
      const {
        n
      } = settings.object();
      var words = randomSampleSafe(getAllValues(wordGroups()['animals']).filter(x => x.length < 5), n)
      var counts = randomSampleSafe(range(2, 5, 1), n)
      var wordArrays = words.map((x, ind) => constantVector(x, counts[ind]))
      return wordArrays;
    }
  },

  makePuzzleBody: function(pz) {
    var processValue = function(wordArrays) {
      const n = wordArrays.length
      const leftSide = wordArrays.join(' + ')
      const rightSide = wordArrays[0]
      var box = $('<div></div>', {
        html: leftSide + ' = <u>&nbsp&nbsp&nbsp</u> ' + rightSide
      });
      box.css(pz.layout.elementCSS.value)
      return box;
    }
    var vals = pz.content.value('problems').map(x => processValue(x));
    var out = constructElementGrid(pz.id, vals, pz.layout.object(), 'Math', null);;
    out.find("div").css('font-size', pz.layout.value('fontSize'))
    return out;
  }
}

Puzzle.Types['NumberLine'] = {
  'tags': ['Math', 'Addition', 'Subtraction', 'Negatives', 'Integers'],
  'category':'math',
  settings: {
    'min': IntegerValue(0, -10, 1, -6),
    'max': IntegerValue(0, 10, 1, 6),
    'step': IntegerValue(0, 10, 1, 1),
    'subStep':EnumeratedValue([0.1,0.25,0.5,1],1),
    leftArrow:true,
    rightArrow:true,leftEdge:true,
    rotate:EnumeratedValue([true,false],false)
  },
  'layout':{
    'fontSize': FontSizeValue(40)
  },
  makePuzzleBody: function(pz) {
    return numberLine(pz.settings.object());
  }
}

Puzzle.Types['NumberLineHops'] = {
  'tags': ['Math', 'Addition', 'Subtraction', 'Negatives', 'Integers'],
  'category':'math',
  settings: {
    'equation':EnumeratedValue(['easy','medium','hard']),
    'n':IntegerValue(1,3,1),
    'min': IntegerValue(0, -10, 1, 0),
    'max': IntegerValue(7, 12, 1,12),
    'start': IntegerValue(0,3, 1),
    'end': IntegerValue(8, 12, 1),
    'step': 1,
    'subStep':1,
    'hops':IntegerValue(2,4,1),
    leftArrow:false,
    rightArrow:true,
    leftEdge:false,
    rotate:false
  },
  'layout':{
    'fontSize': FontSizeValue(30)
  },
  makePuzzleInstruction: function(pz) {
    return `Draw ${pz.settings.value('hops')} hops to get from ${pz.settings.value('start')} to ${pz.settings.value('end')} and write the corresponding equation`;
  },
  makePuzzleBody: function(pz) {
    var hopElementGroup = function() {
        var numLine = numberLine(pz.settings.object());
        var el = $('<div>',{'class':'flexContainer'}).css({'border':'solid 1px lightgray','margin':'15px 2px','padding':'15px 2px 10px 2px'});
        var eqRow = $('<div>',{'class':'flexContainer'}).css('width','100%').css(
          {'font-size':pz.layout.value('fontSize'),'width':'100%','justify-content':'space-evenly',
        'height':'50'}
        )
        let ans
        let {equation,start,end} = pz.settings.object()
        if (equation=='easy'){
          ans = constantVector('____',pz.settings.value('hops')).join(' + ') + ' = ' + pz.settings.value('end')
          if (pz.settings.value('start')) {
            ans = start + ' + ' + ans;
          }
        } else if (equation=='medium') {
          ans = constantVector('____',pz.settings.value('hops')).join(' + ') + " = _____"
          if (pz.settings.value('start')) {
            ans = '____' + ' + ' + ans;
          }
        } else {
          ans = '_______________________'
        }
        eqRow.append([
          $('<div>',{'class':'flexElement','html':'Equation: '}),
          $('<div>',{'class':'flexElement','html':ans}).css({'align-content':'flex-end'})
        ])
        el.append([numLine,eqRow])
        return el;
      }
    var els = range(0,pz.settings.value('n'),1).map(x=>hopElementGroup());
    return els;
  }
}



Puzzle.Types['ImageMeasure'] = {
  category:'math',
  subcategory:'measurement',
  tags:['measurement'],
  settings:{
  },
  content: {
    'width': () => 500,
  },
  makePuzzleInstruction: function(sett) {
    return 'How wide, and how tall, are the shapes?';
  },
  makePuzzleBody: function(pz) {
    let out = $('<div>',{})
    out.css({'position':'relative','padding':'15px','justify-content':'left','align-items':'baseline',
  'height':'415'})
    out.append(drawAxes({xmin:0,xmax:7,ymin:0,ymax:4,xstep:1,ystep:1,xsubStep:.5,ysubStep:0.5}))
    return out;
  }
}




Puzzle.Types['CountingBy'] = {
  tags: ['Math', 'Counting','numbers'],
  category:'math',
  subcategory:'counting',
  'settings': {
    'n': IntegerValue(1, 4, 1, 3),
    'm': IntegerValue(5, 6, 1, 6),
    'numMissing': IntegerValue(1, 4, 1, 3),
    'countBy': IntegerValue(1, 5, 1, '?'),
    'startAt': IntegerValue(0, 100, 1, '?'),
    'direction': EnumeratedValue(['increasing', 'decreasing', 'random'], '?'),
    'placement': EnumeratedValue(['end', 'start', 'middle', 'random'], 'random')
  },
  'layout': {
    'fontSize': FontSizeValue(35),
    'elementCSS': {
      'width': '100%',
      'font-size': '45',
      'margin': '2%',
      'letter-spacing': '2px'
    }
  },
  'instruction': "Fill in the missing numbers",

  content:{
    'values':function(sett) {
      var makePatternArrays = function(sett) {
        var so = sett.sampledObject()
        var nums = range(so.startAt, so.startAt + (so.m - 1) * so.countBy + 1, so.countBy)
        nums = (so.direction === 'decreasing') || (so.direction === 'random' && randomSample([true, false])) ? nums.reverse() : nums
        var blanks;
        if (so.placement === 'end') {
          blanks = range(nums.length - so.numMissing, nums.length)
        } else if (so.placement === 'start') {
          blanks = range(0, so.numMissing)
        } else if (so.placement === 'middle') {
          const startSpot = nums.length - so.numMissing - 1
          blanks = range(startSpot, startSpot + so.numMissing)
        } else if (so.placement === 'random' || true) {
          blanks = randomIntegers(0, nums.length - 1, so.numMissing)
        }
        blanks.forEach((x) => nums[x] = '__')
        return nums;
      }
      var values = range(0, sett.value('n')).map((x) => makePatternArrays(sett))
      return values;
    }
  },
  makePuzzleBody: function(puzz) {
    var values = puzz.content.value('values');
    var addSpans = (array) => array.map(x => `<span style="margin: 1px 0px 1px 20px">${x}</span>`)
    var spannedArrays = values.map(x => addSpans(x))
    var joinedArrays = spannedArrays.map(x => x.join(','))
    var grid = constructElementGrid(puzz.id,
      joinedArrays, puzz.layout.object(), 'Pattern');
    grid.find("div").css('font-size', puzz.layout.value('fontSize'))
    return grid;
  }

}





Puzzle.Types['FractionColoring'] = {
  tags: ['Math', 'Counting','fractions'],
  category:'math',
  subcategory:'fractions',
  add:false,
  'settings': {
    'n': IntegerValue(2, 4, 1),
    'm': [2,6],
    difficulty:EnumeratedValue(['easy','medium','hard']),
    color:EnumeratedValue(['to','from'])
  },
  'layout': {
    showHeader:true,
    fontSize:FontSizeValue(28)
  },

  content:{
    'fractions':function(sett) {
      let {m,n} = sett.sampledObject()
      m = (m instanceof Array)?m:[m,m];
      const denominators = randomSampleSafe(range(m[0],m[1]+1),n)
      const numerators = denominators.map(x=>randomSample(range(1,x)))
      let fractions = transpose([numerators,denominators])
      // ensure no duplicates
      for (i = 1; i<fractions.length; i++) {
        if (fractions.slice(0,i-1).map(x=>x.toString()).includes(fractions[i].toString())) {
          if (fractions[i][0]+1<fractions[i][1]) {
            fractions[i][0]=fractions[i][0]+1;
          } else {
            fractions[i][1]=fractions[i][1]+1;
            i--
          }
          i--;
        }
      }
      return fractions;
    }
  },
  makePuzzleBody: function(puzz) {
    const fracs = puzz.content.value('fractions')
    let out = $('<div>',{'class':'flexContainer'})
    let boxes = fracs.map(function([num,den]) {
      return Puzzle.Types['FractionColoring'].boxRow(num,den,'50',puzz.settings.value('difficulty'),puzz.settings.value('color'));
    })
    out.append(boxes)
    adjustFont(out,'div',puzz.layout)
    return out;
  },
  boxesColored: function(num,den,width,color) {
    let boxes = $('<div>',{'class':'flexElement'})
    // boxes.css({'width':'48%'})
    for (i=0; i<den; i++) {
      const box = $('<div>',{'class':'flexElement'})
      box.css({'border':'solid 1px black','width':width,'height':width})
      if (color==='from' && i<num){
        box.css({'background':'darkgray'})
      }
      boxes.append(box)
    }
    return boxes;
  },
  boxRow: function(num,den,width,diff,color) {
    let row = $('<div>',{'class':'flexElement'})
    row.css({'width':'98%','margin':'15 0','justify-content':'space-between'})
    let boxes = Puzzle.Types['FractionColoring'].boxesColored(num,den,width,color)
    boxes.css={'width':'48%'}
    row.append(boxes)
    let words = $('<div>',{'class':'flexElement'})
    if (diff==='easy' && color==='to') {
      words.text(`Color ${num} of the ${den} boxes. This makes ${num}/${den}`)
    } else if (color==='to') {
      words.text(`Color ${num}/${den} of the boxes.`)
    } else {
      words.text('______  colored')
    }
    words.css({'width':'48%','align-items':'center'})
    row.append(words)
    return row;
  }

}

Puzzle.Types['FractionToColoring']={
  category:'math',
  subcategory:'fractions',
  instruction:'Color in the requested number of boxes',
  color:'to',
  parentPuzzle:'FractionColoring'
}
Puzzle.Types['FractionFromColoring']={
  category:'math',
  subcategory:'fractions',
  instruction:'What fraction of the boxes are colored in each row?',
  color:'from',
  parentPuzzle:'FractionColoring'
}




Puzzle.Types['PlaceValue'] = {
  tags: ['Math', 'Counting','place value'],
  category:'math',
  'settings': {
    n:IntegerValue(1,8,1,4),
    difficulty:EnumeratedValue(['easy','medium','hard','random'],'random'),
    format:EnumeratedValue(['left','right','random'],'random')
  },
  'layout': {
    fontSize:FontSizeValue(28)
  },

  content:{
    'nums':function(sett) {
      return randomIntegers(0,999,sett.value('n'));
    }
  },
  makePuzzleBody: function(puzz) {
    const nums = puzz.content.value('nums')
    var [difficulty,format] = puzz.settings.value(['difficulty','format'])
    var formatA1 = (x)=>`${x} = ___ hundreds &nbsp;&nbsp;+&nbsp;&nbsp;___ tens &nbsp;&nbsp;+&nbsp;&nbsp; ___ ones`
    var formatA2 = (x)=>`${x} = ___ &times; 100 &nbsp;&nbsp;+&nbsp;&nbsp; ___ &times; 10 +&nbsp;&nbsp; ___ &times; 1`
    // var formatA3 = (x)=>`${x} = ___00 &nbsp;&nbsp;+&nbsp;&nbsp; ___0 +&nbsp;&nbsp; ___`
    var formatA3 = (x)=>`${x} = ___ &nbsp;&nbsp;+&nbsp;&nbsp; ___ +&nbsp;&nbsp; ___`
    var formatB1 = (x) => ` ${x[0]} hundreds &nbsp;&nbsp; +  &nbsp;&nbsp;${x[1]} tens &nbsp;&nbsp;+&nbsp;&nbsp; ${x[2]} ones &nbsp;&nbsp; = &nbsp;&nbsp; ___`
    // var formatB2 = (x) => ` ${x[0]}00 &nbsp;&nbsp; +  &nbsp;&nbsp;${x[1]}0 &nbsp;&nbsp;+&nbsp;&nbsp; ${x[2]} &nbsp;&nbsp; = &nbsp;&nbsp; ___`
    var formatB2 = (x) => ` ${x[0]}&times;100 &nbsp;&nbsp; +  &nbsp;&nbsp;${x[1]}&times;10 &nbsp;&nbsp;+&nbsp;&nbsp; ${x[2]}&times;1 &nbsp;&nbsp; = &nbsp;&nbsp; ___`
    var numRow = function(x) {
      const numString = String(x).padStart(3,'0')
      var form = (format==='random')?randomChoice(['left','right'],1)[0]:format;
      var diff = (difficulty==='random')?randomChoice(['easy','medium','hard'],1)[0]:difficulty;
      var eqn
      if (form==='left') {
        if (diff==='easy') {
          eqn = formatA1(x);
        } else if (diff === 'medium') {
          eqn = formatA2(x);
        } else if (diff === 'hard') {
          eqn = formatA3(x);
        }
      } else if (form==='right') {
        if (diff==='easy') {
          eqn = formatB1(numString);
        } else  {
          eqn =  formatB2(numString);
        }
      }
      return $('<div>',{'html':eqn}).css({
        'border':'dotted gray 1px', 'margin':'10px', 'padding':'10px'
      });
    }
    var out = $('<div>',{'class':'flexContainer'}).append(nums.map(x=>numRow(x)))
    adjustFont(out,'div',puzz.layout)

    return out;
  }
}


Puzzle.Types['AdditionTriplets'] = {
  tags: ['Math', 'Addition'],
  category:'math',
  subcategory:'addition',
  'settings': {
    n:IntegerValue(1,8,1,4),
    format:EnumeratedValue(['horizontal','vertical'])
  },
  'layout': {
    fontSize:FontSizeValue(28)
  },

  content:{
    'nums':function(sett) {
      var out=[], ix, nums
      for (ix=0; ix<sett.value('n'); ix++) {
        out.push(flatten(transpose([
          randomIntegers(0,9,3),
          constantVector('+',sett.value('n')-2).concat(['='])
        ])).concat(['___']))
      }
      return out;
    }
  },
  makePuzzleBody: function(puzz) {
    return $('<div>',{'class':'flexContainer'}).append(
      puzz.content.value('nums').map(
        x => equationElement(x,[],puzz.settings.value('format'))
      )
    );
  }
}



Puzzle.Types['AdditionSubtractionRegrouping'] = {
  tags: ['Math','regrouping'],
  category:'math',
  subcategory:'arithmetic',
  'settings': {
    n:IntegerValue(1,8,1,4),
    operation:EnumeratedValue(['Addition','Subtraction']),
    'carrying':EnumeratedValue([true,false]),
    'teens':EnumeratedValue([true,false]),
    'difficulty':EnumeratedValue(['easy','medium','hard'])
  },
  'layout': {
      showHeader:false,
      fontSize:FontSizeValue(35)
  },
  content:{
    'nums':function(sett) {
      var out=[], ix, a, b, c
      var {teens,operation,carrying}=sett.object()
      for (ix=0; ix<sett.value('n'); ix++) {
        a = (teens===true)?1:randomInteger(2,8)
        b = (operation==='Addition')?randomInteger(2,(carrying===true)?9:8):randomInteger(1,6)
        c = (operation==='Addition')?(carrying===true?randomInteger(10-b+1,9):randomInteger(1,10-b-1)):randomInteger(b+1,9)
        out.push([a,b,c])
      }
      return out;
    }
  },
  makePuzzleInstruction: function(puzz) {
    if (puzz.settings.value('operation')==='Addition') {
      return `Addition with regrouping: ab + c, where b + c ${puzz.settings.value('carrying')===true?'>':'<'} 10`;
    } else {
      return `Subtraction with regrouping: ab - c, where b < c`;
    }
  },
  makePuzzleBody: function(puzz) {
    var numStyle = (x) => `<span style="color:gray">${x}</span>`
    var diff = puzz.settings.value('difficulty')
    var op = puzz.settings.value('operation')
    var box = $('<div>',{'class':'flexContainer'}).css({'font-size':puzz.layout.value('fontSize')})
    var sign = (op==='Addition')?'+':'-';
    var addProbs = puzz.content.value('nums').map(function(x) {
        var first = numStyle(10*x[0]+x[1])
        var second = (op==='Addition')?numStyle(10*x[0]):numStyle(10*(x[0]-1)+x[1])
        var third = (op==='Addition')?numStyle(x[1]):numStyle(10)
        var fifth = (op==='Addition')?x[1]+x[2]:10-x[2]
        return `<span style="letter-spacing:1px;">${first} ${sign} ${x[2]} = ${(diff)==='hard'?numStyle('__'):second} ${numStyle('+')} ${(diff==='easy')?third:numStyle('__')} ${sign} ${x[2]} = ${(diff==='hard')?numStyle('__'):second} + ${(diff==='easy')?fifth:`__`} = __</span>` ;
      }
    )
    var els = addProbs.map((x)=> $('<div>',{'class':'flexElement','html':x}).css(
      {'border':'dotted gray 1px','padding':'20px 10px 10px 5px','margin':'10px 15px'}))
    box.append(els)
    return box;
  }
}

Puzzle.Types['AdditionRegrouping']={
  tags:['addition'],
  category:'math',
  subcategory:'addition',
  operation:'Addition',
  parentPuzzle:'AdditionSubtractionRegrouping'
}

Puzzle.Types['SubtractionRegrouping']={
  tags:['subtraction'],
  category:'math',
  subcategory:'subtraction',
  operation:'Subtraction',
  parentPuzzle:'AdditionSubtractionRegrouping'
}


Puzzle.Types['PairSums'] = {
  'tags': ['Math', 'Addition'],
  category:'math',
  subcategory:'addition',
  'settings': {
    'target': IntegerValue(8,15,1),
    'shuffle':BooleanValue(true)
  },
  'layout':{
    'fontSize': FontSizeValue(35)
  },
  'content': {
    'numbers': function(sett) {
      const target = sett.value('target')
      let nums = range(0, target + 1, 1)
      if (target%2==0) {
        nums.splice(target/2,0,target/2)
      }
      nums = (sett.value('shuffle')==true)?shuffle(nums):nums;
      return nums;
    }
  },
  'makePuzzleInstruction': (pz) =>
    `Find all the pairs of numbers that add up to ${pz.settings.value('target')}`,
  'makePuzzleBody': function(pz) {
    return gridOfHTML(
      pz.id,
      pz.content.value('numbers'), {
        'justify-content': 'space-evenly',
        'margin': '10px 2px'
      }, {
        'font-size': pz.layout.value('fontSize'),
        'margin':'15px 15px'
      }
    )
  }
}



Puzzle.Types['ShapeFraction'] = {
  'tags': ['Math', 'Shapes', 'Geometry', 'Fractions'],
  category:'math',
  subcategory:'fractions',
  'settings': {
    'n': IntegerValue(2, 4),
    'difficulty': EnumeratedValue(['easy', 'medium', 'hard'])
  },
  instruction: 'Divide the shapes into pieces',
  'content': {
    'shapes': (sett) => randomSample(shapeImages(), sett.value('n')),
    'fractions': function(sett) {
      var fractionSet = ['halves', 'fourths'];
      var diff = sett.value('difficulty');
      if (diff == 'medium') {};
      if (diff == 'hard') {
        fractionSet.push('fourths', 'thirds', 'fifths', 'sixths');
      };
      return randomChoice(fractionSet, sett.value('n'));
    }
  },
  makePuzzleBody: function(pz) {
    var id = pz.id;
    var fileNames = pz.content.value('shapes').map(x => 'images/shapes/' + x);
    var fractions = pz.content.value('fractions');
    var size = 190;
    var imgs = fileNames.map(x => imgElement(x, {
      resize: false,
      width: size,
      height: size
    },'images/shapes/'));
    var texts = fractions.map(x => `<span style="font-size:20">Divide the shape into ${x}</span>`);
    var elements = imgs.map(function(x, ind) {
      return constructColumnOfValues(id, [imgs[ind], texts[ind]], 'flexElement');
    });
    return constructElementGrid(pz.id, elements, {
      elementClass: '',
      containerClass: 'flexContainer',
      elementCSS: {
        'width': '45%',
        elementContainer: false
      }
    }, 'Clock', null);

  }
}



Puzzle.Types['NumberBonds'] = {
  tags: ['Addition','Subtraction','addition tricks'],
  category:'math',
  subcategory:'arithmetic',
  'settings': mergeOptionDefaults(
    {
      'operation':EnumeratedValue(['addition','multiplication']),
      format:'horizontal',
      carry:true,
      difficulty:'easy',
      CBA:'true',
      n:IntegerValue(2,4,2),
      'minC':IntegerValue(1,100,1,1)
    },
    Puzzle.Types['ArithmeticPuzzle'].settings
  ),
  'content':Puzzle.Types['ArithmeticPuzzle'].content,
  makePuzzleInstruction: function(pz) {
    if (pz.settings.value('operation')==='addition') {
      return `Fill in the <u>addition</u> and <u>subtraction</u> relationships for the three numbers`;
    } else {
      return `Fill in the <u>mutliplication</u> and <u>division</u> relationships for the three numbers`;
    }
  },
  makePuzzleBody: function(pz) {
    var container = $('<div></div>', {
      'class': 'flexContainer'
    });
    nums = pz.content.value('problems')
    var numBoxes = nums.map(x => Puzzle.Types['NumberBonds'].makeOneWordBox(x.slice(0,3), pz.layout.value('fontSize')));
    container.append(numBoxes);
    return container;
  },

  makeOneWordBox: function(nums, fontSize) {
    let undline = '<div style="text-decoration:underline;margin-right:6px;">&nbsp;&nbsp;</div>'
    let plusLine = [undline, ' + ' ,undline, ' = ',undline]
    let minusLine=[undline, ' - ' ,undline, ' = ',undline]
    // console.log('nums',nums)
    return constructColumn([shuffle(nums[0].filter((x,index)=>index%2===0)).join(', '), plusLine,plusLine,minusLine,minusLine], 'scramblePair', {}, {
      'display': 'flex',
      'justify-content': 'center',
      'border': 'dashed 1px lightgray',
      'margin': '2%',
      'padding': '1%',
      'width':'43%'
    }, fontSize);
  }

}



Puzzle.Types['SumToPuzzle'] = {
  'tags': ['Math', 'Addition'],
  category:'math',
  subcategory:'addition',
  instruction: 'Circle the top numbers that add up to the bottom number',
  settings: {
    'n': 4,
    'm': 4,
    'maxNumber': 5
  },
  layout: {
    'elementClass': 'flexElement',
    'elementCSS': {
      'letter-spacing': '6px',
      'font-size': '40',
      'width': '40%',
      'margin': '4%'
    }
  },
  content: {
    'problems': function(settings) {
      const {
        maxNumber,
        n,
        m
      } = settings.object();
      // maxNumbers = (typeof maxNumber === 'number')?maxNumber:
      var numSets = constantVector(0, n);
      numSets = numSets.map(x => randomChoice(range(1, maxNumber + 1, 1), m))
      var sumInds = constantVector(0, n);
      sumInds = sumInds.map(x => randomSample(range(0, m - 1, 1), randomInteger(2, m - 1)))
      var sums = sumInds.map(function(indSet, i) {
        return indSet.map(x => numSets[i][x]).reduce((a, b) => a + b);
      })
      return {
        'sets': numSets,
        'sums': sums
      };
    }
  },

  makePuzzleBody: function(pz) {
    var {
      sets,
      sums
    } = pz.content.problems.value;
    var setsStyled = sets.map(x =>
      `<span style="padding:5px; border-bottom: solid black 3px; border-radius:15px;">${x.toString()}</span>`
    )
    var sumsStyled = sums.map(x => `<span style="font-size:40; font-weight:bold;">${x}</span>`)
    var vals = sets.map(function(x, ind) {
      // return sets[ind].toString() + ' = ' + sums[ind];
      return constructColumn([setsStyled[ind], sumsStyled[ind]], 'flexElement', {
        'margin': '4% 0%'
      });
    });
    return constructElementGrid(pz.id, vals, pz.layout.object(), 'Math', null);
  }

}


Puzzle.Types['ArithmeticTarget'] = {
  tags: ['Math','addition','subtraction','multiplication'],
  category:'math',
  subcategory:'arithmetic',
  'instruction':'Fill in the equations using the given numbers and operations',
  'settings': {
    n:IntegerValue(1,8,1,4),
    'operations':EnumeratedValue(['+','+,-','+,-,*'],'+'),
    'numTerms':EnumeratedValue([2,3,4],3),
    'showNumbers':BooleanValue(false),
    'showSigns':BooleanValue(false),
    'showChoices':BooleanValue(true),
    'showExact':BooleanValue(false)
  },
  'layout': {
      fontSize:FontSizeValue(38)
  },
  content:{
    'nums':function(sett) {
      var out=[], ix, a, b, c
      var {teens,operation,carrying}=sett.object()
      for (ix=0; ix<sett.value('n'); ix++) {
        const numTerms = sett.value('numTerms')
        var nums = randomSampleSafe(range(1,6+1,1),numTerms)
        signs = randomSampleSafe(sett.value('operations').split(','),numTerms-1)
        var target = nums[0]
        for (var iy=1; iy< numTerms; iy++) {
          if (signs[iy-1]==='+') {
            target = target + nums[iy]
          } else if (signs[iy-1]==='-') {
            target = target - nums[iy]
          } else if (signs[iy-1]==='*') {
            target = target * nums[iy]
          }
        }
      out.push([target,nums,signs])
      }
      return out;
    }
  },
  makePuzzleBody: function(puzz) {
    var box = $('<div>',{'class':'flexContainer'}).css({'font-size':puzz.layout.value('fontSize')})
    var nums = puzz.content.value('nums')
    const {showSigns, showChoices, showExact, operations, showNumbers, numTerms} = puzz.settings.object()
    var eqn, el, choices
    var numEl = (num) => ($('<div>',{'html':num,'class':'flexElement'}).css({'border':'dashed 1px gray','width':'1em','padding':'6px','margin':'2px','color':showNumbers?'black':'white'}))
    var signEl = (sign) => $('<div>',{'html':sign,'class':'flexElement'}).css({'border':'dashed 1px gray','width':'1em','height':'60%','padding':'6px','margin':'2px','color':showSigns?'black':'white'})
    var els = puzz.content.value('nums').map(function(arr,ind) {
        eqn = $('<div>',{'class':'flexContainer'}).css({'align-items':'center','margin-bottom':'5px','padding-bottom':'5px','padding-right':'5px'})
        eqn.append([`${arr[0]} = `])
        for (var iz=0; iz<numTerms-1; iz++) {
          eqn.append([numEl(arr[1][iz]),signEl(arr[2][iz])])
        }
        eqn.append(numEl(arr[1][numTerms-1]))
        var signChoices = showExact?arr[2].sort():operations
        var numChoices = showExact?arr[1].sort():range(1,7,1)
        choices = $('<div>',{'class':'flexContainer','html':`use (${signChoices}) and (${numChoices})`}).css({'font-size':'25','margin-left':'6px','align-items':'center'})
        el = $('<div>',{'class':'flexElement'}).append(eqn)
        if (showChoices) { el.append(choices) }
        el.css({'width':(numTerms==4)?'90%':'45%','border':'dotted gray 1px','padding':'20px 10px 10px 5px','margin':'10px 15px'})
        return el;
      }
    )
    box.append(els)
    return box;
  }
}


Puzzle.Types['ImageCountGroups'] = {
  tags: ['Counting','grouping','place value'],
  category:'math',
  subcategory:'counting',
  'settings': {
    'difficulty':EnumeratedValue(['easy','hard']),
    'min':IntegerValue(10,50,1,11),
    'max':IntegerValue(10,50,1,51)
  },
  'content': {
    'picsToUse': (settings) => randomSample(imageNames(), 1),
    'num': (settings) => randomInteger(settings.value('min'),settings.value('max')),
    'sample': function(settings, content) {
      return randomChoice(content.value('picsToUse'), content.value('num'));
    }
  },
  'puzzleType': 'Counting',
  'makePuzzleBody': function(pz) {
    var top = imageGrid(pz.content.value('sample'),10,pz.content.value('num'),'45')
    var eqs = []
    eqs.push($('<div>',{'html':'___ tens &nbsp;&nbsp;+&nbsp;&nbsp; ___ ones &nbsp;&nbsp;=&nbsp;&nbsp; ___'}).css({'padding-top':'20px'}))
    if (pz.settings.value('difficulty')!='easy') {
      eqs.push($('<div>',{'html':'___ fives &nbsp;&nbsp;+&nbsp;&nbsp; ___ ones &nbsp;&nbsp;=&nbsp;&nbsp; ___'}).css({'padding-top':'25px'}))
      eqs.push($('<div>',{'html':'___ twos &nbsp;&nbsp;+&nbsp;&nbsp; ___ ones &nbsp;&nbsp;=&nbsp;&nbsp; ___'}).css({'padding-top':'25px'}))
    }
    var bottom = $('<div>',{'class':'flexContainer'}).css({
      'font-size':pz.layout.value('fontSize'),'margin':'10px','padding-top':'10px'
    }).append(eqs)
    var container = $('<div></div>', {}).append([top,bottom]);
    return container;
  }
}

Puzzle.Types['ImageCountSymbols'] = {
  tags: ['counting','grouping','place value'],
  category:'math',
  subcategory:'counting',
  'settings': {
    'difficulty':EnumeratedValue(['easy','hard']),
    'min':IntegerValue(10,50,1,11),
    'max':IntegerValue(10,50,1,59)
  },
  layout: {
    showHeader:false,
    fontSize:FontSizeValue(30)
  },
  'content': {
    'picsToUse': (settings) => randomSample(imageNames(), 2),
    'num': (settings) => randomInteger(settings.value('min'),settings.value('max')),
    'sample': function(settings, content) {
      var tens = Math.floor(content.value('num')/10)
      var ones = content.value('num')-tens*10
      return [
        randomChoice(content.value('picsToUse').slice(0,1), tens),
        randomChoice(content.value('picsToUse').slice(1,2), ones)
      ];
    }
  },
  'puzzleType': 'Counting',
  'makePuzzleBody': function(pz) {
    var pics = flatten(pz.content.value('sample'))
    if (pz.settings.value('difficulty')==='hard') {
      pics = shuffle(pics)
    }
    var bottom = $('<div>',{'class':'flexContainer'})
    bottom.append([
      imageGrid(pics,10,pics.length,'50').css({'border':'solid 1px gray','margin':'10px','width':'75%'}),
      $('<div>',{'text':' = ____'}).css({'display':'flex','align-items':'center'})
    ]).css({'font-size':pz.layout.value('fontSize')})
    var tenPic = imageElement(pz.content.value('picsToUse')[0],'45',{'margin':'10px'})
    var onePic = imageElement(pz.content.value('picsToUse')[1],'45',{'margin':'10px'})
    var eqs
    if (pz.settings.value('difficulty')==='easy') {
      eqs = [
        $('<div>',{'text':'If '}).css({'display':'flex','align-items':'center'}),
        tenPic, $('<div>',{'text':' = 10,   and '}).css({'display':'flex','align-items':'center'}),
        onePic, $('<div>',{'text':' = 1,   then'}).css({'display':'flex','align-items':'center'})
      ]
    } else {
      eqs = [
        $('<div>',{'text':'If one '}).css({'display':'flex','align-items':'center'}),
        tenPic, $('<div>',{'text':' equals ten '}).css({'display':'flex','align-items':'center'}),
        onePic, $('<div>',{'text':',   then'}).css({'display':'flex','align-items':'center'})
      ]
    }
    var top = $('<div>',{'class':'flexContainer'}).css({
      'font-size':pz.layout.value('fontSize'),'margin':'10px','padding-top':'10px'
    }).append(eqs)
    var container = $('<div></div>', {}).append([top,bottom]);
    return container;
  }
}



Puzzle.Types['ImageCountGrid'] = {
  tags: ['Counting','grouping'],
  category:'math',
  subcategory:'counting',
  'settings': {
    'difficulty':EnumeratedValue(['easy','medium','hard']),
    'rows': IntegerValue(2, 5, 1),
    'columns': IntegerValue(4, 10, 1)
  },
  'content': {
    'picsToUse': (settings) => randomSample(imageNames(), 1),
    'sample': function(settings, content) {
      let total = parseInt(settings.value('rows')) * parseInt(settings.value('columns'))
      return randomChoice(content.value('picsToUse'), total);
    }
  },
  'puzzleType': 'Counting',
  'makePuzzleBody': function(pz) {
    let {rows,columns} = pz.settings.object()
    var top = imageGrid(pz.content.value('sample'),columns,rows*columns,'45')
    let ans, second
    if (pz.settings.value('difficulty')!='hard') {
      ans = rows*columns
    } else {
      ans = '___ '
    }
    if (pz.settings.value('difficulty')=='easy') {
      second = [rows,columns]
    } else {
      second = ['___','___']
    }
    var bottom = $('<div>',{'class':'flexContainer'}).css({
      'font-size':'35','margin':'10px','padding-top':'10px','justify-conetnt':'center'
    }).append([
      $('<div>',{'class':'flexElement','html':`___ &nbsp; groups of ${second[0]} &nbsp;= &nbsp;${ans}`}).css({'padding-top':'20px','width':'100%'}),
      $('<div>',{'class':'flexElement','html':`___ &nbsp; groups of ${second[1]} &nbsp;= &nbsp;${ans}`}).css({'padding-top':'20px','width':'100%'})
    ])
    var container = $('<div></div>', {}).append([top, bottom]);
    return container;
  }
}


//
// Puzzle.Types['AlgebraSomething'] = {
//   tags: ['Math','algebra'],
//   category:'math',
//   subcategory:'algebra',
//   'settings': {
//     'difficulty':EnumeratedValue(['easy','medium','hard'],'medium'),
//     'n': IntegerValue(2, 5, 1,2),
//     'm': IntegerValue(2, 4, 1,2)
//   },
//   'content': {
//     'triplets': function(sett, content) {
//       var pairs = range(0,sett.value('n')).map(x=>randomIntegers(0,9,2))
//       return pairs.map(x=>[x[0],x[1],x[0]+x[1]]);
//     }
//   },
//   'makePuzzleBody': function(pz) {
//     const {m,n,difficulty} = pz.settings.object()
//     const {triplets} = pz.content.object()
//     var out=$('<div>',{class:'flexContainer'})
//     out.append(equationElement([1,'+',2,'=',3],[]))
//     out.append(equationElement(['1','+',2,'-',3,'&times;',2,'=',12],[]))
//     out.append(equationElement([1,'+',2,'=',3],[[1,'_'],[4,'?']]))
//     out.append(equationElement(['1','+',2,'-',3,'&times;',2,'=',12],[[2,'&star;'],[4,'__'],[6,'^']]))
//     return out;
//   }
// }


function equationElement(eqnArray,blanks=[],format='horizontal',ops={}) {
  // eqArray = [val, sign, val, sign, ...], e.g. [2,+,4,-,1,=5],
  // blanks = [[position,replacement]..], e.g. [ [0,'_'],[4,'?']]
  // parens = [ [left,right]..], e.g. [ [1,3], [5,7]]
  if (format==='vertical') {
    return equationElementVertical(eqnArray,blanks)
  } else {
    return equationElementHorizontal(eqnArray,blanks,ops)
  }
}

function equationElementHorizontal(eqArray,blanks=[],ops={showParentheses}) {
  var eqn = $('<div>',{'class':'equation'})
  var els = eqArray.map(x=>oneEquationTerm(x,ops.showParentheses))
  // var els = eqArray.map(x=>$('<div>',{class:'equationTerm',html:x,contenteditable:true}))
  // blanks.forEach(x=>els[x[0]] = $('<div>',{class:'equationTerm',html:x[1],contenteditable:true}))
  blanks.forEach(x=>els[x[0]] = $('<div>',{class:'equationTerm',html:x[1],contenteditable:true}))
  eqn.append(els)
  return eqn;
}
function oneEquationTerm(val,showParentheses=true) {
  // console.log('val',val)
  if (val instanceof Array) {
    return $('<div>',{class:'equationTerm',contenteditable:true}).append([
      oneEquationTerm((showParentheses?'(':'')+val[0])
    ].concat(
      val.slice(1,val.length-1).map(x=>oneEquationTerm(x))
    ).concat(
      oneEquationTerm(val[val.length-1]+(showParentheses?')':''))
    ));
  } else {
    return $('<div>',{class:'equationTerm',html:(val==='*'?'&times;':(val==='-'?'&minus;':val)),contenteditable:true});
  }
}

function equationElementVertical(eqArray,blanks) {
  const eqStrs = eqArray.map(x=>String(x))
  const nn=eqStrs.length
  // remove '___' from end for vertical
  var underscoresPatt = RegExp('_+')
  if (underscoresPatt.test(eqStrs[nn-1])) {
    eqStrs[nn-1]= ''
  }
  const strLens = eqStrs.map(x=>x.length)
  const len = Math.max(Math.max(...strLens),2)
  var eqn = $('<div>',{'class':'equationVertical'})
  var rows = [$('<div>',{class:'equationTermVertical',html:constantVector('&nbsp;',(1+len)-strLens[0]).join('')+eqStrs[0]}) ]  // one extra space to match the + character in bottom line
  for (var ix=1; ix<(nn-1)/2; ix++) {
    rows.push($('<div>',{class:'equationTermVertical',html:((ix===(nn-1)/2-1)?eqStrs[2*ix-1]:'&nbsp;')+constantVector('&nbsp;',len-strLens[2*ix]).join('')+eqStrs[2*ix]}))
  }
  rows.push($('<div>',{class:'equationTermVertical',html:constantVector('&nbsp;',(1+len)-strLens[nn-1]).join('')+eqStrs[nn-1]}))
  blanks.forEach(x=>rows[x[0]/2] = $('<div>',{
    class:'equationTermVertical',
    html:((x[0]>0 && x[0]<nn/2)?'+':'&nbsp;'),
    contenteditable:true
  }).css({background:'#EEEEEE'}))
  eqn.append(rows.slice(0,rows.length-1))
  eqn.append($('<div>').css({'border-top':'solid black 2px','height':'3px'}))
  eqn.append(rows[rows.length-1])
  return eqn;
}

function arithmeticEval(a, b, c, sign, solveFor = 'c') {
  if (solveFor === 'c') {
    if (sign === '+') {
      return a + b;
    } else if (sign === '-') {
      return a - b;
    } else if (sign === '*' || sign === '&times;') {
      return a * b
    }
  } else if (solveFor === 'a') {
    if (sign === '+') {
      return c - b;
    } else if (sign === '-') {
      return c + b;
    } else if (sign === '*' || sign === '&times;') {
      return c / b;
    }
  }
}


function equationParentheses(ops={}) {
  const {signs='+',max=6,min=1,maxAns=20,numTerms=4,depth=1} = ops
  let signChoices = signs.split(',')
  let newSign = randomSample(signChoices)
  let eqn = randomArithmeticEquation({shuffleTerms:false,sign:newSign,answerRange:[0,20],termRanges:[[1,10],[1,10]]})
  let ind = randomSample([0,1])
  newSign = randomSample(signChoices)
  let eqn2 = randomArithmeticEquation({shuffleTerms:false,samplingMethod:'cFirst',sign:newSign,answerRange:[eqn[2*ind],eqn[2*ind]],termRanges:[[0,20],[0,20]]})
  eqn[2*ind] = eqn2.slice(0,3)
  return eqn;
}


arithmeticSignOptions = ['+','+,-','-','*','+,-,*']

Puzzle.Types['ArithmeticParentheses'] = {
  category:'math',
  subcategory:'arithmetic',
  tags:['arithmetic','parentheses'],
  settings: {
    n:IntegerValue(1,6,1,4),
    minTerms:IntegerValue(1,4,1,3),
    maxTerms:IntegerValue(1,5,1,4),
    signs:EnumeratedValue(arithmeticSignOptions.concat(['random']),'random'),
    showAnswer:false,
    showParentheses:true
  },
  'content': {
    equations: function(sett) {
      let setObj = sett.object()
      let signs = setObj.signs
      if (signs==='random') {
        signs = randomSampleSafe(arithmeticSignOptions,setObj.n)
      } else {
        signs = constantVector(signs,setObj.n)
      }
      let eqs = []
      return signs.map(function(oneSigns) {
        setObj.signs = oneSigns
        setObj.numTerms = randomInteger(setObj.minTerms,setObj.maxTerms+1)
        return equationParentheses(setObj);
      });
    }
  },
  'makePuzzleBody': function(pz) {
    const {showAnswer,showParentheses} = pz.settings.object()
    var container = $('<div>')
    eqns = pz.content.value('equations')
    const ans = (showAnswer)?[]:[[4,'__']]
    container.append(eqns.map(x=>equationElement(x,ans,'horizontal',{showParentheses:showParentheses})))
    return container;
  }
}
Puzzle.Types['ArithmeticDrawParentheses']={
  instruction:'Add parentheses to make the equations true',
  settings:{showAnswer:true,showParentheses:false},
  parentPuzzle:'ArithmeticParentheses'
}


function sumArray(arr=[]) {
  return arr.reduce((a, b) => a + b)
}

/*
  Add shuffle option to swap a & b (for +, *) and b & c for -, -
  Add symbol substitution option (should this do the blanks?)
  Add carrying option (for addition only?)
  Uniqueness option

*/
function randomArithmeticEquation(ops={}) {
  // a + b = c, or, a - b = c, or, a * b = c, or, a / b = c
  const {
    maxAttempts=100,
    sign = '+',
    carrying = 'maybe', /* yes, no, maybe */
    differenceRange = null,
    answerRange = null,
    shuffleTerms=true,
    termRanges = [[0,10],[0,10]],
    samplingMethod = 'simultaneous' /* simultaneous, aFirst, cFirst */
  } = ops
  let valid, a, b, c
  // let allTries
  var validCheck = function() {
    const allInts = Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c)
    const termsBool = (termRanges[0][0] <= a && a <= termRanges[0][1]) && (termRanges[1][0] <= b && b <= termRanges[1][1])
    const ansBool = (answerRange===null)?true: (answerRange[0] <= c && c <= answerRange[1])
    const diffBool = (differenceRange===null)?true: (differenceRange[0] <= a-b && a-b <= differenceRange[1])
    let carryBool
    if (carrying!='maybe' && (sign==='+' || sign==='-')) {
      const maxLength = Math.max(String(a).length,String(b).length,String(c).length)
      var adigs = constantVector(0,maxLength-String(a).length).concat(Array.from(String(a),Number))
      var bdigs = constantVector(0,maxLength-String(b).length).concat(Array.from(String(b),Number))
      var cdigs = constantVector(0,maxLength-String(c).length).concat(Array.from(String(c),Number))
      var usesCarrying = false
      for (var i=0; i<adigs.length; i++) {
        if (sign==='+') {
          usesCarrying = adigs[i] + bdigs[i] > 9
        } else if (sign==='-') {
          usesCarrying = adigs[i] - bdigs[i] < 0
        } else {
          cond = false
        }
        if (usesCarrying) {
          i = adigs.length+2
        }
        if (carryBool) {i=adigs.length+1}
      }
      if (carrying === 'no' ) {
        carryBool = !usesCarrying
      } else if (carrying === 'yes' ) {
        carryBool = usesCarrying
      }
    } else {
      carryBool = true
    }

    return (allInts && termsBool && ansBool && diffBool && carryBool);
  }
  var shuffleEquationTerms = function() {
    if (shuffleTerms) {
      if (sign==='+' || sign==='*') {
        if (randomChoice([true,false])) { [a,b] = [b,a]}
      } else if (sign==='-') {
        if (randomChoice([true,false])) { [b,c] = [c,b]}
      }
    }
  }
  var sampleEquationTerms = function() {
    let ax,bx,cx
    if (samplingMethod === 'simultaneous') {
      ax = randomInteger(...termRanges[0])
      bx = randomInteger(...termRanges[1])
      cx = arithmeticEval(ax,bx,null,sign,'c')
    } else if (samplingMethod === 'cFirst') {
      cx = randomInteger(...answerRange)
      bx = randomInteger(...termRanges[1])
      ax = arithmeticEval(null,bx,cx,sign,'a')
    }
    return[ax,bx,cx];
  }
  for (var ix=0; ix<maxAttempts; ix++) {
    [a,b,c] = sampleEquationTerms()
    valid = validCheck()
    shuffleEquationTerms()
    // allTries.push([a,b,c,sign,valid])
    if (valid===true) {
      ix=maxAttempts+2;
    }
  }
  if (ix===maxAttempts) {
    console.log('could not find valid arithmetic problem')
    console.log({samplingMethod:samplingMethod,a:a,b:b,c:c,sign:sign,valid:valid,termRanges:termRanges,answerRange:answerRange})
    // console.table(allTries)
  }
  return [a,sign,b,'=',c];
}

// signChoices=['+'],ranges,ansRange,maxAttempts
function randomArithmeticEquations(numEqns,ops={}) {
  const {
    signChoices = ['+'],
    unique=true,
    termRanges
  } = ops
  let eqn, eqnArray = [], ix=0, sign, stringChecks, stringOne
  const maxTries = numEqns*10
  // nuber of possible equations
  const numCandidates = termRanges.map(x=>x[1]-x[0]+1).reduce((a,b)=>a*b)
  // override unique option if there aren't enough possible equations
  const uniqueOverride = numEqns > numCandidates
  while (eqnArray.length<numEqns) {
    sign = randomChoice(signChoices)
    ops.sign = sign
    eqn = randomArithmeticEquation(ops)
    if (!unique || uniqueOverride || ix > maxTries) {
      eqnArray.push(eqn)
    } else if (sign === '+' || sign === '*') {
      // for + or *, try to avoid same vals in different order, e.g. a+b vs b+a
      stringChecks = eqnArray.map(arr=>[arr[0],arr[2]].sort().toString()).sort()
      stringOne = [eqn[0],eqn[2]].sort().toString()
      if (!stringChecks.includes(stringOne)) {
        eqnArray.push(eqn)
      }
    } else if (!eqnArray.includes(eqn)) {
      eqnArray.push(eqn)
    }
    ix++
  }
  if (ix>maxTries) {
    console.log('could not find unique arithmetic problems')
  }
  return eqnArray;
}



class ArithmeticEquationTriplet {
  constructor(inputObject = {sign:'+'}) {
    this.sign = inputObject.sign

  }

  randomEquation() {

  }


};



/*
  p - penny
  n - nickel
  d - dime
  q - quarter
*/
var coinValueObject = {
  'p':1, 'n':5, 'd':10, 'q':25
}
function randomCoins(n,coinChoices=Object.keys(coinValueObject),numCoinRange=[2,6],includeZero=false) {
  var chosenCoins =  range(0,n).map(x=>randomChoice(coinChoices,randomInteger(...numCoinRange)));
  var coinArrays = chosenCoins.map(arr => countCoins(arr,includeZero))
  return coinArrays;
}
function countCoins(arr=[],includeZero=false) {
  return Object.keys(coinValueObject).map(c=>[arr.filter(x=>x===c).length,c]).filter(x=>x[0]>0);
}

// coinArray e.g. [ [3,p],[2,n],[4,d],..]
function coinWords(coinArray,numWord=true,andWord=false) {
  var wordArray = coinArray.map(x=>coinWord(x,numWord))
  if (andWord===true) {
    wordArray[wordArray.length-1] = `and ${wordArray[wordArray.length-1]}`
  }
  if (wordArray.length <=2 && andWord===true) {
    return wordArray.join(' ');
  } else {
    return wordArray.join(', ');
  }
}

function coinWord([num,type],numWord=true) {
  const word = (num===1)?coinObjSingular[type]:coinObjPlural[type]
  const count = (numWord===true)?numberWordObject[num]:num
  return `${count} ${word}`;
}

const coinObjSingular = {
  'p':'penny',
  'n':'nickel',
  'd':'dime',
  'q':'quarter'
}
const coinObjPlural = {
  'p':'pennies',
  'n':'nickels',
  'd':'dimes',
  'q':'quarters'
}




class Coins {
  constructor(inputObject = {}) {
    this.coins = {

    }
    this.coinTypes = ['p','n','d','q']
    this.coinNames = {

    },
    this.coinValues = {

    }

  }

  randomCoins() {

  }

  coinsValues() {
    this.coinTypes.map(x=> x)
  }
  coinsValue() {
    this.coinTypes.map(x=> x)
  }

};
