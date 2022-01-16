Puzzle.Types['NumberedLineResponses'] = {
  tags: ['writing'],
  add: false,
  settings: {
    n:IntegerValue(1,5,1,3)
  },
  layout: {
    fontSize:FontSizeValue(30),
    elementCSS:{
      'border-bottom':'solid gray 1px',
      'width':'100%',
      'margin':'15px'
    }
  },
  content: {

  },
  makePuzzleBody: function(pz) {
    var box = $('<div>',{'class':'flexContainer'}).css({'font-size':pz.layout.value('fontSize')})
    for (var ix=0; ix<pz.settings.value('n'); ix++) {
      box.append($('<div>',{'html':`${ix+1})`}).css(pz.layout.value('elementCSS')))
    }
    return box;
  }
}

var wellBeingWritingPrompts = [
  ['Gratitude','things you are thankful for'],
  ['Compassion','times you showed compassion'],
  ['SelfLove','things you love about yourself']
]

wellBeingWritingPrompts.map(function(x) {
  Puzzle.Types[`${x[0]}List`] =  {
    category:'well-being',
    instruction : `Write down ${x[1]}`,
    parentPuzzle:'NumberedLineResponses'
  }
})

//
// Puzzle.Types['GratitudeList'] = {
//   instruction : 'Write down things you are thankful for',
//   parentPuzzle:'NumberedLineResponses'
// }
