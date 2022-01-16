function initializePage() {
  const allCardTypes = Object.keys(CardSet["Types"])
  allCardTypes.forEach(type=>
    $('select#content').append(
      $('<option>',{value:type,text:type})
    )
  )
}

function update() {
  const content = $('#content').find(":selected").val()
  const numSets = parseInt($('#numSets').find(":selected").val())
  const style = $('#style').find(":selected").val()
  const fontFamily = $('#fontFamily').find(":selected").val()
  $('.page').remove();
  var cardSet = CardSet.Types[content]({numSets:numSets,style:style,fontFamily:fontFamily})
  cardSet.writeCards()
}


class CardSet {

  constructor(settings={}) {

    // default any undefined important things from user input object
    var {
      fontSizeMain='100',
      fontSizeMinor='40',
      css={},
      numSets=1,
      fontFamily = 'Arial',
      logoSizeFooter = '.25in',
      logoSizeMinor = '0.5in',
      logoSrc = 'cards/logo.png',
      style='flashcard',
      shuffle=false
    } = settings

    this.logoSizeFooter=logoSizeFooter
    this.logoSizeMinor=logoSizeMinor
    this.logoSrc=logoSrc
    this.fontSizeMain = fontSizeMain;
    this.fontSizeMinor = fontSizeMinor;
    this.numSets = numSets;
    this.fontFamily = fontFamily
    this.style=style
    this.shuffle=shuffle
    this.css=css
  }; // end constructor

  formatValue(val,fontSize,extraCSS={}) {
    // return `<span style=font-size:${fontSize}>${val}</span>`
    console.log('extraCSS',extraCSS)
    return $('<span>',{html:val}).css(extraCSS).css('font-size',fontSize);
  };

  playingCardTop(val) {
    return $('<div>', {
      class: 'cardtop flex'
    }).append($('<div>', {
      'html': this.formatValue(val,this.fontSizeMinor,this.css)
    })).
    append(this.logoImgElement(this.logoSizeMinor))
  }

  playingCardMain(val) {
    return $('<div>', {
      class: 'cardmid flex'
    }).append($('<div>', {
      'html': this.formatValue(val,this.fontSizeMain,this.css)
    }))
  }
  logoImgElement(logoSize) {
    return $('<img>', {
      'class': 'logo',
      'src': this.logoSrc,
      'width': logoSize,
      'height': logoSize
    });
  }

  flashcardMain(val) {
    return $('<div>',{'class':'flex','html':val}).
      css({'font-size':this.fontSizeMain,'height':'70%','width':'90%','justify-content':'center',
    'align-items':'center'}).css(this.css);
  };

  flashcardFooter() {
    return $('<div>',{'class':'cardFooter'}).
      append(this.logoImgElement(this.logoSizeFooter)).
      append($(`<div>YellowWombatCircle</div>`)).
      append(this.logoImgElement(this.logoSizeFooter));
  };


  writeCards() {

    let values = this.valuesFunction();

    // values = values.slice(0,$('#numCards').val())

    for (let i = 1; i < this.numSets; i++) {
      values = values.concat(values)
    }

    if (this.shuffle) {
      values = _.shuffle(values)
    }

    var grouped = _.chunk(values, 9)
    let self = this
    const allCards = grouped.map(function(group) {
      let cardGroup = group.map(function(val) {
        let card = $('<div>', {
          'class': 'card',
          id: 'card-' + val.toString()
        });
        card.css('font-family', self.fontFamily)

        if (self.style === 'playingCard') {
          card.append(self.playingCardTop(val))
          card.append(self.playingCardMain(val))
          card.append(self.playingCardTop(val).css({
              'transform': 'rotate(180deg)',
              'transform-origin': 'center'
            }))
        } else if (self.style === 'flashcard') {
          card.append(self.flashcardMain(val))
          card.append(self.flashcardFooter(val))
        }
        return card;
      })
      return cardGroup;
    })

    // write new pages
    var i, j;
    for (i = 0; i < allCards.length; i++) {
      $('#pages').append($('<div>', {
        'class': 'page',
        'id': 'page' + (i + 1)
      }))
      for (j = 0; j < allCards[i].length; j++) {
        $('#page' + (i + 1)).append(allCards[i][j])
      }
    }

  }



}; // end Puzzle object




CardSet.Types={}

CardSet.Types['uppercaseLetters']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=> _.range(65, 90 + 1, 1).map(x => String.fromCharCode(x));
  return cardSet;
}

CardSet.Types['lowercaseLetters']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=> _.range(65, 90 + 1, 1).map(x => String.fromCharCode(x)).map(x=>x.toLowerCase());
  return cardSet;
}

CardSet.Types['cvc']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  var cvcArray = flatten(Object.values(rhymingWordSets()))
  cvcArray = cvcArray.map(x=>x.toUpperCase())
  cvcArray = cvcArray.filter((x) => (x.length===3 && isCVC(x)))
  cardSet.valuesFunction = ()=> cvcArray
  cardSet.fontSizeMain = '70'
  cardSet.css = {'letter-spacing':'10'}
  return cardSet;
}

CardSet.Types['addition']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=> _.flatten(_.range(1,12+1,1).map(x => _.range(1, 12 + 1, 1).map(y => `${x}&hairsp;&plus;&hairsp;${y}`)));
  cardSet.fontSizeMain = '65'
  return cardSet;
}

CardSet.Types['subtraction']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=> _.flatten(_.range(1,12+1,1).map(x => _.range(1, x, 1).map(y => `${x}&hairsp;&minus;&hairsp;${y}`)));
  cardSet.fontSizeMain = '65'
  return cardSet;
}

CardSet.Types['multiplication']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=> _.flatten(_.range(1,12+1,1).map(x => _.range(1, 12+1, 1).map(y => `${x}&hairsp;&times;&hairsp;${y}`)));
  cardSet.fontSizeMain = '65'
  return cardSet;
}

CardSet.Types['decimals']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=> _.range(-1, -0.1, .1).concat(_.range(0,1.1,0.1)).map(x => x.toFixed(1))
  cardSet.fontSizeMain = '90'
  return cardSet;
}

CardSet.Types['integers']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = ()=>_.range(-10, 11, 1);
  cardSet.fontSizeMain = '90'
  return cardSet;
}


CardSet.Types['fractions']=function(inputObject) {
  var cardSet = new CardSet(inputObject)
  cardSet.valuesFunction = () => _.flatten([2, 3, 4, 6, 12].map(den => _.range(1, den + 1, 1).map(num => [num, den])))
  cardSet.formatValue = function([num,den]) {
    return `<div class='fraction'><div class='numerator'>${num}</div><div class='denominator'>${den}</div></div>`;
  }
  cardSet.flashcardMain = function([num,den]) {
    return `<div class='fraction' style="font-size:70"><div class='numerator'>${num}</div><div class='denominator'>${den}</div></div>`;
  }
  cardSet.playingCardMain = function([num, den]) {
    let boxes = $('<div>', {
      'class': 'boxcontainer'
    })
    if (num % 3 === 0) {
      boxes.css({
        'flex-direction': 'column'
      })
    }
    _.range(0, den, 1).map(function(ind) {
      let box = $('<div>', {
        'class': 'box' + den
      });
      if (ind < num) {
        box.css({
          'background-color': 'darkgray'
        })
      }
      boxes.append(box)
    })
    return $('<div>',{'class':'flex'}).
      css({'font-size':this.fontSizeMain,'height':'40%','width':'70%','justify-content':'center',
    'align-items':'center'}).append(boxes);
  }
  return cardSet;
}
