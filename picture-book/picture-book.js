function addPage(pageArray, firstPageNumber, ops = {
  numberPages: false,
  addFooter: false,
  caseness: 'UpperCase'
}) {
  let parsed = pageArray.map(x=>parsePageValue(x))

  let pageElement = $('<div>', {
    'class': 'page'
  });

  ops.caseness = $('#caseness').find(":selected").text();
  ops.fontSize = $('#fontSize').val();
  ops.fontFamily = $('#fontFamily').find(":selected").text();

  parsed.map(function(x,ind) {
    pageElement.append(halfPageElement(x, ind, ops))
    if ((ind<parsed.length-1)&&(perPage===2)) {
      // pageElement.append($('<div>',{'class':'hdivider'}))
    }
  });

  if (ops.addFooter) {
    pageElement.append($('<div>', {
      'text': 'YellowWombatCircle',
      'class': 'ywcFooter'
    }));
  }

  $('#pages').append(pageElement)


};

function halfPageElement(arg, num, ops) {
  if (arg === undefined) {
    return $('<div>', {
      'class': 'box'
    });
  };
  let [left, right] = arg;
  const panelClass = 'panelPair'+perPage
  var container = $('<div>',{'class':panelClass})
  container.append([
    panelElement(left, num + 1, ops),
    panelElement(right, num + 2, ops),

  ])
    if (perPage===4) {
      if (num%2===0) {
      container.css({'border-right':'solid gray 6px'})
    }
    if (num<2) {
        container.css({'border-bottom':'solid gray 6px'})
      }
    } else if (num==0) {
      container.css({'border-bottom':'solid gray 6px'})
    }
  return container;
}


function parsePageValue(val) {
  if ((typeof val === 'string') && (isImageName(val))) {
    return [val.split('.')[0].split('-').join(' '), val]
  } else {
    return val;
  }
}

function isImageName(string) {
  return (string.endsWith('.png') || string.endsWith('.jpg'));
}

function panelElement(content, pageNumber, ops = {
  numberPages: false,
  caseness: 'UpperCase'
}) {
  let element = $('<div>', {
    'class': 'box',
    'contenteditable': 'true'
  });
  let contentElement;
  if (isImageName(content)) {
    contentElement = $('<img>', {
      'src': 'images/pb/' + content,
      'class': ((perPage===2)?'img2':'img4') + ' contain',
      height:(perPage===4)?'2in':'4in',
      width:(perPage===4)?'2in':'3.25in'
    })
  } else {
    contentElement = $('<div>', {
      'text': caseAdjust(content, ops.caseness)
    });
    let fontFamily = ops.fontFamily
    if (fontFamily === 'Random') {
      fontFamily = _.sample(['Arial', 'Times', 'Comic Sans MS']);
    }
    const fontSize = findFontSize(content);
    contentElement.css({
      'font-family': fontFamily,
      'fontSize': fontSize
    })
  };

  if (perPage===4) {
    element.addClass('rotate')
  }

  element.append(contentElement);
  if (ops.numberPages === true) {
    element.append($('<div>', {
      'class': 'pageNumber',
      'text': pageNumber
    }));
  }
  return element;
};

function caseAdjust(string, caseness) {
  if (caseness === 'UpperCase') {
    return string.toUpperCase();
  } else if (caseness === 'LowerCase') {
    return string.toLowerCase();
  } else if (caseness === 'Capital') {
    return string.split(' ').map(x => (x[0].toUpperCase() + x.slice(1).toLowerCase())).join(' ');
  } else if (caseness === 'Random') {
    return caseAdjust(string, _.sample(['UpperCase', 'LowerCase', 'Capital']));
  } else {
    return string;
  }
}

function findFontSize(str) {
  let fontSizeString;
  let fontSizeWord;
  if (str.length < 10) {
    fontSizeString = 140
  } else if (str.length < 30) {
    fontSizeString = 100
  } else if (str.length < 80) {
    fontSizeString = 50
  } else {
    fontSizeString = 30
  }
  const maxWord = str.split(' ').sort((x,y)=> y.length - x.length)[0];
  if (maxWord.length < 4) {
    fontSizeWord = 140
  } else if (maxWord.length < 6) {
    fontSizeWord = 100
  } else if (maxWord.length < 8) {
    fontSizeWord = 80
  } else if (maxWord.length < 12) {
    fontSizeWord = 50
  } else {
    fontSizeWord = 30
  }
  let out = _.min([fontSizeString,fontSizeWord]);
  if (perPage===4) {
    out=out/2;
  }
  return out;
}

function shuffle(fileNameArray) {
  fileNameArray = _.shuffle(fileNameArray);
  update(fileNameArray);
}

function update(fileNameArray) {
  // delete old pages
  $('.page').remove();
  // write new pages
  let wordTypes = [];
  $('#wordType input:checked').each(function() {
    wordTypes.push($(this).attr('name').toLowerCase());
  });
  const joiner = $('#typeCombiner').val();
  let stories = [];
  // for each image
  fileNameArray.forEach(function(fileName) {
    // find keys that match wordTypes constraints
    const keys = Object.keys(imgTextObject[fileName])
    const matchingKeys = keys.filter(function(key) {
      const matching = _.intersection(wordTypes, key.split(' ').map(x=>x.toLowerCase()));
      if (joiner === 'All') {
        return matching.length === wordTypes.length;
      } else if (joiner === 'Exactly') {
        return (matching.length === wordTypes.length) && (key.split(' ').length===matching.length);
      } else if (joiner === 'Only') {
        return matching.length === key.split(' ').length;
      } else if (joiner === 'Any') {
        return matching.length > 0;
      }
    })
    // add text from matching keys
    // matchingKeys.forEach(function(key) {
      // let text = imgTextObject[fileName][key];
      let text = imgTextObject[fileName][_.sample(matchingKeys)];
      if (text instanceof Array) {
        text = _.sample(text)
        if (typeof text === 'string') {
          stories.push([fileName, text])
        }
      }
    // })
  })
  let num = parseInt($('#numPanels').val());
  perPage = parseInt($('#perPage').find(":selected").text())
  let storyPairs = _.chunk(stories.slice(0, num), perPage)
  storyPairs.map((x, n) => addPage(x, 4 * n));
}
