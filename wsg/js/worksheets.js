
function setupPage() {
  var wrapper = $("<div></div>", {
    "class": "wrapper"
  });
  var book = $("<div></div>", {
    "id": "puzzles",
    'class': 'book'
  });
  var bookControl = $("<div></div>", {
    "id": "controls",
    'class': 'bookControl'
  });


  makeWorksheetFunction = function() {

    $('#puzzles').empty()

    var puzzlesGrouped = groupPuzzles()

    puzzlesGrouped.map(x => writePuzzlePage(x, {
      showPages: true,
      showSettings: true,
      force: false
    }))

    $('.puzzle').css({
      'border-color': 'black'
    })
    Object.keys(Puzzle.allPuzzles).map((id) => $('#' + id).click(function() {
      showSettings(id)
    }))

  };

  var zoomPlus = $("<button>", {
    text: '+',
    'class': 'topButton',
    'onclick': 'zoomPuzzles(0.1)'
  });
  var zoomMinus = $("<button>", {
    text: '-',
    'class': 'topButton',
    'onclick': 'zoomPuzzles(-0.1)'
  });


  var homeButton = $("<button>", {text: 'Home','class': 'topControlButton buttonControlFull','id':'homeControlBoxButton'}).click(function(){
    toggleControls('homeControlBox')
  })
  var addButton = $('<button>',{'text':'Add Puzzles','class':'topControlButton buttonControlFull','id':'addControlBoxButton'}).click(function(){
    toggleControls('addControlBox')
  })
  var editButton = $('<button>',{'text':'Edit Puzzles','class':'topControlButton buttonControlFull','id':'pageControlButton'}).click(function(){
    toggleControls('pageControl')
  })
  var globalButton = $('<button>',{'text':'Global Settings','class':'topControlButton buttonControlFull','id':'globalControlBoxButton'}).click(function(){
    toggleControls('globalControlBox')
  })
  var makeButton = $('<button>',{'text':'Make Worksheet','class':'topControlButton buttonControlFull','id':'makeControlBoxButton'}).click(function(){
    toggleControls('makeControlBox')
  })

  var updateAllButton =  $('<button>',{'text':'Refresh All','class':'topControlButton buttonControlSimple','id':'updateAllButton'}).click(function(){$('#allNewValuesButton').click()})
  var duplicateAllButton = $('<button>',{'text':'Duplicate All','class':'topControlButton buttonControlSimple','id':'printButton'}).click(function(){})
  var printButton =  $('<button>',{'text':'Print','class':'topControlButton buttonControlSimple','id':'duplicateAllButton'}).click(function(){window.print()})

  var controlBoxHeader = function(text,imgURL) {
    return $('<div>', {'class':'controlBoxHeader'}).append(
      [
        $('<div>',{'text': text}),
        $('<button>HELP</button>').click(()=>window.open(imgURL))
    ]);
  }

  var buttons = $('<div></div>', {
    'class': 'topButtonBar'
  })

  var vertDiv = $('<div>').css({
    // 'border':'solid gray 6px',
    'border-radius':'3px',
    'margin':'0px 6px',
    'width':'20px'
  })

  buttons.append([
    // always
    zoomMinus, zoomPlus, vertDiv,
    // full
    homeButton,addButton, editButton, globalButton, makeButton,
    // simple
    updateAllButton, duplicateAllButton, printButton
  ]);

  wrapper.append([buttons])
  wrapper.append([bookControl, book]);
  $('body').html(wrapper);



  var getSelectedBoxNames = function(parentID) {
    var selected = []
    $('#' + parentID).find('input:checked').each(function() {
      selected.push($(this)[0].name)
    })
    return selected;
  }

  var numPuzzToAdd, numGroupToAdd

  var populatePuzzleMenu = function(parent = $('#puzzleSelectMenu')) {
    parent.empty() // clear old menu entries
    const cat = $('#puzzleCatMenu').val()
    const subcat = $('#puzzleSubcatMenu').val()
    const tags = getSelectTags()
    var typesToAdd = Puzzle.getTypes(cat, subcat, tags) // new types to add
    // add checkbox rows to parent element
    parent.append(makeCheckboxRow('puzzleSelect', typesToAdd))
    numPuzzToAdd = typesToAdd.length
    if ($('#addBlockMenu option:selected').val()==='puzzles') {
      $('#matchNum').text(numPuzzToAdd+'')
    }
  }

  var populateGroupsMenu = function(parent = $('#puzzleGroupMenu')) {
    parent.empty() // clear old menu entries
    const tags = getSelectTags()
    const allGroups = Object.keys(puzzleGroupObject)
    var groupsToAdd = []
    allGroups.forEach(function(gr) {
      if (tags.every((x) => puzzleGroupObject[gr]['tags'].map(tag=>tag.toLowerCase()).includes(x))) {
        groupsToAdd.push(gr)
      }
    })
    parent.append(makeCheckboxRow('puzzleGroup', groupsToAdd))
    numGroupToAdd = groupsToAdd.length
    if ($('#addBlockMenu option:selected').val()==='groups') {
      $('#matchNum').text(numPuzzToAdd+'')
    }
  }


  var makeCheckboxRow = function(prefix, vals) {
    return vals.map(function(x,ind) {
      var row = $('<div>', {
        'class': 'flexContainer'
      }).css({
        'justify-content': 'flex-start',
        'background':(ind%2===0)?'white':'#F2F3F4',
        padding:'3px'
      })
      row.append([
        $('<input>',{'type':'checkbox','id':prefix+x,'name':x}),
        $('<div>', {'html': x}).css({'padding-left':'3px'})
      ])
      return row;
    });
  }
  var getSelectTags = function() {
    var selected = []
    $('#puzzleTagsMenu').find('input:checked').each(function() {
      selected.push($(this)[0].name)
    })
    return selected;
  }

  var puzzleCats = Puzzle.allCategories()
  puzzleCats.unshift('All')
  var puzzleSubcats = ['All']

  var puzzleCatMenu = $("<select></select>", {
    id: "puzzleCatMenu",
    class: 'newPuzzleMenu'
  });
  puzzleCats.forEach(function(cat) {
    const x = (cat === undefined ? 'None' : cat)
    puzzleCatMenu.append($("<option></option>", {
      value: x.toString(),
      text: x.toString()
    }))
  })
  puzzleCatMenu.change(function() {
    // update subcat menu
    puzzleSubcats = Puzzle.subcategories(puzzleCatMenu.val())
    puzzleSubcats.unshift('All')
    puzzleSubcatMenu.children('option').remove()
    puzzleSubcats.forEach(function(subcat) {
      const x = (subcat === undefined ? 'None' : subcat)
      puzzleSubcatMenu.append($("<option></option>", {
        value: x.toString(),
        text: x.toString()
      }))
    });
    // update puzzle menu
    populatePuzzleMenu()
    populateGroupsMenu()
  })

  var puzzleSubcatMenu = $("<select></select>", {
    id: "puzzleSubcatMenu",
    class: 'newPuzzleMenu'
  });
  puzzleSubcats.forEach(function(subcat) {
    const x = (subcat === undefined ? 'None' : subcat)
    puzzleSubcatMenu.append($("<option></option>", {
      value: x.toString(),
      text: x.toString()
    }))
  })



  puzzleSubcatMenu.change(function() {
    populatePuzzleMenu()
    populateGroupsMenu()
  })

  var numPuzzlesInput = $("<input id='numPuzzlesInput' class='newPuzzleMenu' type='number' min='0' value='1'></input>", {
    'value': 1
  })
  numPuzzlesInput.css({
    'width': '50px'
  })


    const rowCSS = {
      'align-items': 'center',
      'justify-content': 'left',
      'width': '100%'
    }
    const rowElCSS = {
      'font-size': '18',
      'padding': '2px'
    }
    addNewListBoxCSS = {
      'overflow': 'scroll',
      'height': '170px',
      'resize': 'vertical',
      'border': 'solid 1px black'
    }

  var puzzleTagsMenu = $("<div>", {
    id: "puzzleTagsMenu",
    class: 'newPuzzleMenu'
  }).css(addNewListBoxCSS);
  puzzleTagsMenu.change(function() {
    populatePuzzleMenu()
    populateGroupsMenu()
  })
  puzzleTagsMenu.append(makeCheckboxRow('puzzleTagsMenu', Puzzle.allTags()))

  var addSelectedPuzzlesButton = $('<button>', {
    text: 'Add Selected Puzzles',
    id: 'addPuzzle'
  })
  var addPuzzleButtonCSS = {
    'width': '75%',
    'height':'50px',
    'margin':'15px 5px',
    'font-size': '22',
    'margin-bottom': '10px'
  }
  addSelectedPuzzlesButton.css(addPuzzleButtonCSS)
  addSelectedPuzzlesButton.click(function() {
    var puzzs = getSelectedBoxNames('puzzleSelectMenu')
    puzzs.forEach((pz) => addPuzzle(pz, 1, {}))
    var groups = getSelectedBoxNames('puzzleGroupMenu')
    groups.forEach((g) => addGroup(g))
  })

  var puzzleGroupMenu = $("<div>", {
    id: "puzzleGroupMenu",
    class: 'newPuzzleMenu'
  }).css(addNewListBoxCSS);
  populateGroupsMenu(puzzleGroupMenu)

  var puzzleSelectMenu = $("<div>", {
    id: "puzzleSelectMenu",
    class: 'newPuzzleMenu'
  }).css(addNewListBoxCSS);
  populatePuzzleMenu(puzzleSelectMenu)

  var hideFiltered = $('<input>', {
    'type': 'checkbox'
  })
  var selectAllButton = $('<button>', {
    'text': 'Select All'
  }).css({'width':'100px','height':'25px'})
  selectAllButton.click(function() {
    $('#puzzleSelectMenu').find(':checkbox').prop('checked', true)
  })
  var unselectAllButton = $('<button>', {
    'text': 'Deselect All'
  }).css({'width':'100px','height':'25px'})
  unselectAllButton.click(function() {
    $('#puzzleSelectMenu').find(':checkbox').prop('checked', false)
  });

  var selectAllGroupsButton = $('<button>', {
    'text': 'Select All'
  }).css({'width':'100px','height':'25px'})
  selectAllGroupsButton.click(function() {
    $('#puzzleGroupMenu').find(':checkbox').prop('checked', true)
  })
  var unselectAllGroupsButton = $('<button>', {
    'text': 'Deselect All'
  }).css({'width':'100px','height':'25px'})
  unselectAllGroupsButton.click(function() {
    $('#puzzleGroupMenu').find(':checkbox').prop('checked', false)
  });

  var filterPuzzleControls = constructColumn(
    [
      '<b>Filter Choices</b>',
      constructRow(['Category', puzzleCatMenu], '', rowElCSS, rowCSS),
      constructRow(['Subcategory', puzzleSubcatMenu], '', rowElCSS, rowCSS),
      constructRow(['Tags', ''], '', rowElCSS, rowCSS),
      puzzleTagsMenu
    ],
    'flexElement', {'width':'100%'}, {
      'width': '100%',
      'padding': '3px',
      'margin': '15px 2px',
      'border-radius':'5px',
      'border':'solid gray 3px',
      'background':'#e6e6e6'
    })

    var selectGroupsBlock = $('<div>',{'id':'selectGroupBlock','class':'addControlsBlock'}).append([
      // constructRow([`Groups (<span id="matchingGroups">${Object.keys(puzzleGroupObject).length}</span> matching)`, ''], '', rowElCSS, rowCSS),
      puzzleGroupMenu,
      constructRow([selectAllGroupsButton, unselectAllGroupsButton], '', rowElCSS, rowCSS)
    ])
    selectGroupsBlock.hide()

    var selectPuzzlesBlock = $('<div>',{'id':'selectPuzzBlock','class':'addControlsBlock'}).append([
      // constructRow([`Puzzles (<span id="matchingPuzzles">${Puzzle.allTypes().length}</span> matching)`, ''], '', rowElCSS, rowCSS),
      puzzleSelectMenu,
      constructRow([selectAllButton, unselectAllButton], '', rowElCSS, rowCSS)
    ])

    var updateAddBlock = function() {
      // console.log([numPuzzToAdd,numGroupToAdd])
      if ($('#addBlockMenu option:selected').val()==='puzzles') {
        $('#selectGroupBlock').hide()
        $('#selectPuzzBlock').show()
        // $('#matchNum').text($('#puzzleSelectMenu').children().length+'')
        $('#matchNum').text(numPuzzToAdd+'')
      } else {
        $('#selectPuzzBlock').hide()
        $('#selectGroupBlock').show()
        // $('#matchNum').text($('#puzzleGroupMenu').children().length+'')
        $('#matchNum').text(numGroupToAdd+'')
      }

    }

    var addThingDropdown = $('<select id="addBlockMenu">').append([
      $('<option>',{'value':'puzzles','html':`Puzzles`}),
      $('<option>',{'value':'groups','html':`Groups`})
    ]).css({'font-size':'16px'}).change(()=>updateAddBlock())

  var selectPuzzleControls = constructColumn(
    [
      constructRow([addThingDropdown, '&nbsp;&nbsp;(',$('<span>',{'id':"matchNum",'text':Puzzle.allTypes().length}),' matching)'], '', rowElCSS, rowCSS),
      // addThingDropdown,
      selectGroupsBlock,
      selectPuzzlesBlock
    ],
    'flexElement', {      'width':'100%'    }, {
      'width': '100%',
      'padding': '3px',
      'margin': '15px 2px',
      'border-radius':'5px',
      'border':'solid gray 3px',
      'background':'#e6e6e6'
    })

  var addMorePuzzles = $('<div>', {
    'class': 'pageControlContainer',
    'id':'addControlBox'
  }).append(controlBoxHeader('Add More Puzzles',"images/help/wsg-annotated-add.png"))
  addMorePuzzles.append(filterPuzzleControls)
  addMorePuzzles.append(selectPuzzleControls)
  addMorePuzzles.append(addSelectedPuzzlesButton)
  $('#controls').append([addMorePuzzles])

  var homeBox = $('<div>', {
      'class': 'pageControlContainer',
      'id':'homeControlBox'
    })
    var homeBoxSub = $('<div>', {
      id: 'homeControlBoxSub'
    })


    homeBoxSub.append($('<div>',{'text':'Instructions'}).css({
      'font-size':'18','font-weight':'bold',
      'display':'flex','justify-content':'center',
      'margin-top':'5px'
    }))
    var homeList = $('<ol>',{'id':'homeList','class':'homeList'})
    // homeList.append($('<li>',{'class':'homeNumberedItem',
    //   'html':`Click <span class="fakeButton">Home</span> to return to this page.`}))
    homeList.append($('<li>',{'class':'homeNumberedItem',
      'html':`Click <span class="fakeButton">Add Puzzles</span> to add new puzzles to the page.  You can search by category and add individual puzzles or groups of puzzles.`}))
    homeList.append($('<li>',{'class':'homeNumberedItem',
      'html':`Click <span class="fakeButton">Global Settings</span> to adjust settings that apply to every puzzle on the page, such as font size and border boxes, or to update the content of all puzzles at once.`}))
    homeList.append($('<li>',{'class':'homeNumberedItem',
      'html':`Click <span class="fakeButton">Edit Puzzles</span> to customize the settings for individual puzzles.  You can also access these controls by clicking directly on any puzzle on the page.`}))
    homeList.append($('<li>',{'class':'homeNumberedItem',
      'html':`Click <span class="fakeButton">Make Worksheet</span> to shuffle the puzzles and split them into pages to prepare for printing or saving.`}))
    homeList.append($('<li>',{'class':'homeNumberedItem',
      'html':`After splitting the worksheet into pages you can go back and continue adding and editing puzzles.  When done editing go back and split the sheet into pages again before priting or saving.`}))
    homeBoxSub.append(homeList)
    homeBox.append(homeBoxSub)
  $('#controls').append([homeBox])


  var makeControls = $('<div>',{
    'class':'pageControlContainer',
    'id':'makeControlBox'
  }).append(controlBoxHeader('Make Worksheet',"images/help/wsg-annotated-make.png"))

  var makeControlsSub = $('<div>', {
    id: 'makeControlsSub'
  })
  makeControlsSub.append(selectControlBar('shuffleOnPartition', 'Shuffle Puzzles', ['No', 'Minimally', 'Fully'], () => (null)))
  makeControlsSub.append($('<button>',{'text':'Make Worksheet','id':'makeWorksheetButton'}).click(()=>makeWorksheetFunction()).css(addPuzzleButtonCSS))
  makeControlsSub.append($('<button>',{'text':'Link','id':'tabLink'}).click(()=>linkAllPuzzlesNewTab()).css(addPuzzleButtonCSS))
  makeControlsSub.append($('<button>',{'text':'Print','id':'printButton'}).click(()=>window.print()).css(addPuzzleButtonCSS))
  makeControls.append(makeControlsSub)
  $('#controls').append([makeControls])

  var globalControls = $('<div>', {
    'class': 'pageControlContainer',
    'id':'globalControlBox'
  }).append(controlBoxHeader('Global Settings Controls',"images/help/wsg-annotated-global.png"))
  var globalControlsSub = $('<div>', {
    id: 'globalControlsSub'
  })
  globalControlsSub.append(makePuzzleButton('NEW VALUES', Puzzle.allIds, updatePuzzle,'allNewValuesButton'))
  globalControlsSub.append(makePuzzleButton('DUPLICATE', Puzzle.allIds, duplicatePuzzle))
  globalControlsSub.append(makePuzzleButton('RANDOMIZE SETTINGS', Puzzle.allIds, updatePuzzleAll))
  globalControlsSub.append(makePuzzleButton('DELETE', Puzzle.allIds, Puzzle.delete))
  globalControlsSub.append(selectControlBar('globalPuzzleSize', 'Puzzle Size', Object.keys(pageHeightObject), (val) => setAllPuzzleSizes(val)))
  globalControlsSub.append(selectControlBar('globalShowHeaders', 'Show Headers', [true, false], (val) => showHideAllHeaders(val)))
  globalControlsSub.append(selectControlBar('globalShowBorders', 'Show Borders', [true, false], (val) => showHideAllBorders(val)))
  globalControlsSub.append(plusMinusButtonBar('Puzzle Font Size',
    () => incrementFonts(range(0, Puzzle.numberOfPuzzles, 1), (ind) => ('#' + ind + 'PuzzleBody'), 'div, span', -1),
    () => incrementFonts(range(0, Puzzle.numberOfPuzzles, 1), (ind) => ('#' + ind + 'PuzzleBody'), 'div, span', 1)
  ))
  globalControlsSub.append(plusMinusButtonBar('Instruction Font Size',
    () => incrementFonts(range(0, Puzzle.numberOfPuzzles, 1), (ind) => ('#' + ind + 'PuzzleHeader'), 'div, span', -1),
    () => incrementFonts(range(0, Puzzle.numberOfPuzzles, 1), (ind) => ('#' + ind + 'PuzzleHeader'), 'div, span', 1)
  ))
  globalControlsSub.append(plusMinusButtonBar('Image Size', () => null, () => null))
  globalControls.append(globalControlsSub)
  $('#controls').append([globalControls])


  // Need this for makeWorksheet sizing of things DO NOT DELETE
  // make invisible element to get px <=> mm conversion
  $('body').append($('<div id="mmSize" style="height:100mm;display:none"></div>'))
  Puzzle.px2mmScale = 1 / ($('#mmSize').height() / 100)
  // Puzzle.pageHeight = 260 // in mm
  Puzzle.pageHeight = 250 // in mm


  //     write wrapper for puzzle controls
  var settingsEditorWrapper = $("<div></div>", {
    // id: "pageControl" + pageNumber,
    id: "pageControl",
    class: "pageControlContainer",
    style: 'margin:4px;padding:4px;'
  })
  settingsEditorWrapper.append(controlBoxHeader('Puzzle Controls',"images/help/wsg-annotated-edit.png"))
  settingsEditorWrapper.append($('<div>', {
    id: 'editPuzzleText'
  }))
  var pzmenu = $('<select></select>', {
    id: 'allPuzzlesMenu'
  }).css({
    'font-size': '16px'
  });
  pzmenu.change(function() {
    const id = $('#allPuzzlesMenu option:selected').val()
    showSettings(id)
    $('#' + id)[0].scrollIntoView()
    $(window).scrollTop($(window).scrollTop() - 100);
  })
  settingsEditorWrapper.append(pzmenu)
  settingsEditorWrapper.append($('<div>', {
    id: 'editPuzzleCategory'
  }))
  settingsEditorWrapper.append($('<div>', {
    id: 'editPuzzleSubcategory'
  }))
  settingsEditorWrapper.append($('<div>', {
    id: 'editPuzzleSubcategory'
  }))
  settingsEditorWrapper.css({
    'border-color': 'blue',
    'margin-bottom': '50px'
  })
  $('#controls').append(settingsEditorWrapper)

  $('#shuffleOnPartition').val('Fully')

  toggleControls('homeControlBox')

  changeControlView('full')

}


function changeControlView(viewType) {
  if (viewType==='simple') {
      $('#controls').hide()
      $('.buttonControlFull').hide()
      $('.buttonControlSimple').show()
      $('.deleteX').hide()
      $('.puzzleNumber').hide()
      $('.page').css('zoom','50%')
      $('#puzzles').css({'width':'95%','justify-content':'center'})
  } else if (viewType === 'full') {
      $('#controls').show()
      $('.buttonControlFull').show()
      $('.buttonControlSimple').hide()
      $('.deleteX').show()
      $('.page').css('zoom','80%')
      $('.puzzleNumber').show()
      $('#puzzles').css({'width':'65%','justify-content':'flex-start'})
  }

}

var toggleControls = function(boxID) {
  $('.pageControlContainer').hide()
  $('#'+boxID).show()
  $('.topControlButton').css({'color':'white','background':'darkgray'})
  const buttonID = boxID + 'Button'
  $('#'+buttonID).css({'color':'green','background':'white'})
}

function zoomPuzzles(increment) {
  const oldHeight = $('.page').height()
  const oldWidth = $('.page').width()
  if (increment>0) {
    $('.page').css('zoom','80%')
    $('.page').css('transform','scale(1)')
  } else {
    // $('.page').height(oldHeight*0.4)
    // $('.page').width(increment*0.4)
    // $('.page').css('transform','scale(.4)')
    $('.page').css('zoom','40%')
  }

}

function linkAllPuzzlesNewTab() {
  window.open(generateShareLink())
}

function generateShareLink() {
  var queries = Object.keys(Puzzle.allPuzzles).map(
    (id) => generatePuzzleURLQuery(id)
  )
  var fullURL =
    window.location.href.split('?')[0] + '?' +
    queries.join('&next=&');
  return fullURL;
}

function generatePuzzleURLQuery(id) {
  var pz = Puzzle.allPuzzles[id]
  let query = `type=${pz.puzzleType}`;
  const settingsObject = pz.settings.sampledObject();
  Object.keys(settingsObject).forEach(x => query += `&${x}=${settingsObject[x]}`)
  query += `&fontSize=${pz.layout.sampledObject().fontSize}`
  return query;
}


function linkPuzzleNewTab(id) {
  var pz = Puzzle.allPuzzles[id]
  let url = `https://www.yellowwombatcircle.com/wsg/main.html?type=${pz.puzzleType}`;
  const settingsObject = pz.settings.sampledObject();
  Object.keys(settingsObject).forEach(x => url += `&${x}=${settingsObject[x]}`)
  url += `&fontSize=${pz.layout.sampledObject().fontSize}`
  window.open(url)
}

function copyToNewTab() {
  styleLinks = document.getElementsByTagName('link');
  var html = "<!DOCTYPE html><html><head>";
  for (var i = 0; i < styleLinks.length; i++) {
    html += styleLinks[i].outerHTML;
  };

  html += "</head><body>";
  html += document.getElementById('puzzles').outerHTML;
  html += "</body></html>";

  var tab = window.open('about:blank', '_blank');
  tab.document.write(html); // where 'html' is a variable containing your HTML
  tab.document.close(); // to finish loading the page
}



function textAreaInput(puzzleId, field, resample) {
  var myId = puzzleId + '_' + field;
  var puzzle = Puzzle.allPuzzles[puzzleId];
  var val = puzzle[field];
  var textBox = $("<textarea></textarea>", {
    text: JSON.stringify(val, null, 2),
    id: myId,
    rows: '10',
    cols: '30'
  });
  textBox.change(function() {
    updateObjectValues(val, JSON.parse($("#" + myId).val()));
    puzzle.field = val;
    if (resample) {
      puzzle.refresh();
    } else {
      puzzle.redraw();
    };
  });
  var wrapper = $("<div></div>");
  wrapper.append('All ' + field + " ");
  wrapper.append(textBox);
  return wrapper;
}

function newPuzzle(puzzleType, settings, numPuzzles) {
  var np = (numPuzzles == undefined) ? 1 : numPuzzles;
  var puzzArray = [];
  var puzz;
  for (var i = 0; i < np; i++) {
    puzz = new puzzleType(settings);
    puzzArray.push(puzz);
  }
  if (numPuzzles == undefined) {
    return puzzArray[0];
  } else {
    return puzzArray;
  }
};



function showSettings(id) {
  // close all
  $('.controlContainer').hide()
  // color all black border
  $('.puzzle').css({
    'border-color': 'black'
  })

  if (id===undefined) {
    return null;
  }

  // show current one
  $('#' + id + 'ControlContainer').show()
  $("#" + id + "Controls").show()
  // color current one
  $('#' + id + 'PuzzleWrapper').css({
    'border-color': 'blue'
  })

  $('#editPuzzleCategory').text(`Category: ${Puzzle.getCategory(Puzzle.allPuzzles[id])}`)
  $('#editPuzzleSubcategory').text(`Subcategory: ${Puzzle.getSubcategory(Puzzle.allPuzzles[id])}`)
  // color bar text
  $('.puzzleButtonBar').css('color', 'black')
  $('#' + id + 'TopBar').css('color', 'blue')
  // select correct menu choice
  $('#allPuzzlesMenu').val(id)
  //  bring up control boxID
  toggleControls('pageControl')
}


function writePuzzles(puzzlesArray) {
  puzzlesArray.map(function(puzzles, ind) {
    writePuzzlePage(puzzles, ind + 1)
  })
};

function writePuzzlePage(puzzles, ops = {}) {
  var {
    pageNumber,
    showPages = true,
    showSettings = true,
    force = true,
    footer = true,
    fullSize = true
  } = ops;
  if (pageNumber == undefined) {
    pageNumber = $('.page').length + 1;
  };
  // if (document.getElementById("subpage" + pageNumber) == null) {
  //   writePage("puzzles", pageNumber, footer, fullSize)
  // };
  var pzzs = (puzzles instanceof Array) ? puzzles : Object.values(puzzles)
  pzzs.map(function(puzzle) {
    puzzle.write(pageNumber, {
      showPages: showPages,
      force: force,
      footer: footer,
      fullSize: fullSize
    });
  });
  if (showPages === false) {
    $('#subpage' + pageNumber).css({
      'height': 'auto'
    })
    $('#page' + pageNumber).css({
      'height': 'auto'
    })
  };

  // fill edit box with first puzzle
  $('.puzzlesubwrapper').first().click()

};


function writePuzzlePages(puzzlesMatrix) {
  var numTypes = puzzlesMatrix.length;
  var puzzSet;
  puzzlesMatrix[0].map(function(x, ind) {
    puzzSet = [];
    for (var i = 0; i < numTypes; i++) {
      puzzSet.push(puzzlesMatrix[i][ind]);
    }
    writePuzzlePage(puzzSet)
  });
};

function updateAllPuzzles() {
  Object.values(Puzzle.allPuzzles).forEach(x => (x.write()));
};

function updatePuzzle(id) {
  Puzzle.allPuzzles[id].refresh();
};

function updatePuzzleAll(id) {
  Puzzle.allPuzzles[id].refreshAll();
};

function writePuzzleContainer(myId, pageNumber, location = 'bottom', prevID, newPage=false) {
  dprint("id ", myId, "writing puzzle container to ", pageNumber);
  var el = $("<div></div>", {
    id: myId,
    "class": "puzzleBox"
  });

  // draw it
  if (newPage===true) {
    $("#" + "subpage" + pageNumber).append(el)
  } else {
    if (location === 'top') {
      $("#" + "subpage" + pageNumber).prepend(el)
    } else if (location === 'bottom') {
      $("#" + "subpage" + pageNumber).append(el)
    } else if (location === 'after') {
      $("#" + (parseInt(prevID))).after(el)
    }
  }


};


function writePuzzleWrapper(myId, puzzleClass = 'puzzle', parent) {
  var el = $("<div></div>", {
    id: (myId + "PuzzleWrapper"),
    "class": puzzleClass
  });
  const parEl = (parent === undefined) ? "#" + myId : parent;
  $(parEl).html(el);
};

function writePuzzleSubwrapper(myId) {
  var el = $("<div></div>", {
    id: (myId + "PuzzleSubwrapper"),
    class: 'puzzleSubwrapper'
  });
  $('#' + myId + 'PuzzleWrapper').append(el);
};

function makePuzzleButton(txt, idFunc, func,id) {
  return $('<button></button>', {
    text: txt,
    id:id,
    'class': 'puzzleButton'
  }).click(() => idFunc().map(id => func(id)));
}

function writePuzzleButtons(id) {

  // $('#' + id + 'PuzzleWrapper').click(function() {
  $('#' + id).click(function() {
    showSettings(id)
  })

  $('#' + id + 'ControlContainer').prepend([
    makePuzzleButton('NEW VALUES', () => ([id]), updatePuzzle),
    makePuzzleButton('DUPLICATE', () => ([id]), duplicatePuzzle),
    makePuzzleButton('RANDOMIZE SETTINGS', () => ([id]), updatePuzzleAll),
    makePuzzleButton('DELETE', () => ([id]), Puzzle.delete)
  ])
  $('#' + id + 'ControlContainer').hide()

  var bar = $('<div></div>', {
    'id': id + 'TopBar',
    'class': 'puzzleButtonBar'
  }).css({
    'width': ($('#' + id + 'PuzzleWrapper').width())
  }).append([
    $('<button>',{class:'deleteX',text:'X','onclick':`Puzzle.delete(${id})`}),
    $('<div>',{class:'puzzleNumber',text:'#'+(parseInt(id)+1)}),
  ])
  $("#" + id).prepend(bar)
}

function writePage(bookId, pageNumber, footer=true, fullSize=true, location='bottom',prevPageID=null) {
  // add page to book
  var p = $("<div></div>", {
    id: ("page" + pageNumber),
    "class": "page"
  });
  if (prevPageID===null) {
    $("#" + bookId).append(p);
  } else {
    $('#'+prevPageID).after(p);
  }
  // add subpage to page
  var sp = $("<div></div>", {
    id: ("subpage" + pageNumber),
    "class": "subpage"
  });
  if (fullSize===false) {
    p.css({'height':'min-content','min-height':'min-content'})
    sp.css({'height':'min-content','min-height':'min-content'})
  }
  $("#" + "page" + pageNumber).append(sp);
  if (footer===true) {
    var footer = $('<div></div>', {
      'text': 'YellowWombatCircle',
      'class': 'swcFooter'
    })
    $("#" + "page" + pageNumber).append(footer);
  }
};


function writePuzzleHeader(id, headerClass) {

  headerClass = (headerClass == undefined) ? "puzzleHeader" : headerClass;

  var puzzleHeaderDiv = $("<div></div>", {
    id: (id + "PuzzleHeader"),
    "class": headerClass
  });

  var instructionEl = $('<div></div>', {
    text: 'INSTRUCTION',
    id: id + 'Puzzle' + 'Instruction'
  });

  puzzleHeaderDiv.append(instructionEl)

  $("#" + id + "PuzzleSubwrapper").append(puzzleHeaderDiv);

};

function writePuzzleBody(myId) {
  var puzzleBodyDiv = $("<div></div>", {
    id: (myId + "PuzzleBody"),
    "class": "puzzleBody"
  });
  $("#" + myId + "PuzzleSubwrapper").append(puzzleBodyDiv);
};



function constructElementGrid(puzzleId, values, layout, name, updateFunction) {
  // write the grid wrapper
  var containerClass = layout.containerClass;
  containerClass = (containerClass == undefined) ? 'grid' : containerClass;
  var container = $("<div></div>", {
    'class': containerClass,
    id: puzzleId + name,
  });
  var containerCSS = layout.containerCSS;
  containerCSS = (containerCSS == undefined) ? {} : containerCSS;
  container.css(containerCSS);

  // write the elements of the grid
  var elId, el, html;
  for (var ind = 0; ind < values.length; ind++) {
    elId = puzzleId + name + "Element" + ind;
    html = values[ind];
    if (layout.elementContainer == false) {
      el = html;
    } else {
      if (html instanceof jQuery) {
        html = jqOuterHTML(html);
      };
      el = $("<div></div>", {
        type: "text",
        id: elId,
        'class': layout.elementClass,
        contenteditable: true,
        html: html
      })
    };
    var elementCSS = layout.elementCSS;
    elementCSS = (elementCSS == undefined) ? {} : elementCSS;
    el.css(elementCSS);
    if (updateFunction instanceof Function) {
      el.click(updateFunction(elId, ind, puzzleId));
    };
    container.append(el);

  };
  return container;

};


function gridWithElements(myId, setOfValues, divClass) {
  var layout = Puzzle.allPuzzles[myId].layout.object();
  // write the grid wrapper
  var grid = $("<div></div>", {
    "class": "grid",
    id: myId + "Grid"
  });

  // write the elements of the grid
  var elId, el, fUpdate;
  for (var i = 0; i < setOfValues.length; i++) {
    elId = myId + "Element" + i;
    el = $("<div></div>", {
      type: "text",
      id: elId,
      "class": layout.elementClass,
      contenteditable: true,
      // hack to get the character out of the code
      html: ($("<div></div>").html(setOfValues[i]).text())
    });
    el.css(layout.elementCSS);
    fUpdate = function(elId, i, puzzleId) {
      return function(e) {
        if (e.shiftKey) {
          updateElement(elId, i, puzzleId)
        };
      };
    }
    el.click(fUpdate(elId, i, myId));
    grid.append(el);

  };
  return grid;

};

function updateElementFunction(elementId, ind, puzzleId) {
  return function(e) {
    if (e.shiftKey) {
      updateElement(elementId, ind, puzzleId)
    };
  };
};

function gridOfHTML(myId, setOfValues, containerCSS, elementCSS) {
  // write the grid wrapper
  var grid = $("<div></div>", {
    "class": "grid",
    id: myId + "Grid"
  });
  if (containerCSS instanceof Object) {
    grid.css(containerCSS)
  } else if (typeof(containerCSS) == 'String') {
    grid.addClass(containerCSS);
  }
  // write the elements of the grid
  var elId, el;
  for (var i = 0; i < setOfValues.length; i++) {
    elId = myId + "Element" + i;
    if (setOfValues[i] instanceof jQuery) {
      el = setOfValues[i];
    } else {
      el = $("<div></div>", {
        id: elId,
        contenteditable: true,
        html: setOfValues[i]
      })
    };
    if (elementCSS instanceof Object) {
      el.css(elementCSS)
    } else if (typeof(elementCSS) == 'String') {
      el.addClass(elementCSS);
    }
    grid.append(el);

  };
  return grid;

};


function updateElement(elId, ind, puzzleId) {
  var puzzle = Puzzle.allPuzzles[puzzleId];
  puzzle.settings.updateSample(puzzleId, ind);
  $("#" + elId).html($("<div></div>").html(
    puzzle.settings.set[ind]).text())
}

function gridWithImages(myId, setOfValues, divClass) {
  var layout = Puzzle.allPuzzles[myId].layout;
  // write the grid wrapper
  var grid = $("<div></div>", {
    "class": "grid",
    id: myId + "Grid"
  });
  // write the elements of the grid
  var el, fUpdate;
  var n = setOfValues.length;
  var imgHeight, padding;
  if (n <= 2) {
    imgHeight = '150';
  } else if (n <= 4) {
    imgHeight = '140';
  } else {
    imgHeight = '100';
  };
  for (var i = 0; i < n; i++) {
    el = $("<img>", {
      src: setOfValues[i],
      height: imgHeight,
      width: imgHeight,
      class: 'contain'
    });
    el.css(layout.elementCSS);
    grid.append(el);
  };
  return grid;
};



/*
  COLUMNS
*/
function constructColumn(vals, valsClass, valCss, colCss, fontSize) {
  var container = $('<div></div>', {
    'class': 'column'
  });
  var el = [];
  (colCss != undefined) ? container.css(colCss): {};
  valCss = (valCss != undefined) ? valCss : {};
  for (i = 0; i < vals.length; i++) {
    el = $('<div></div>', {
      html: vals[i],
      'class': valsClass
    });
    el.css(valCss);
    container.append(el);
  };
  if (fontSize !== undefined) {
    container.find('div').css('font-size', fontSize)
  }
  return container;
}

/*
  ROWS
*/
function constructRow(vals, valsClass, valCss, rowCSS) {
  var container = $('<div></div>', {
    'class': 'row'
  });
  var el = [];
  (rowCSS != undefined) ? container.css(rowCSS): {};
  valCss = (valCss != undefined) ? valCss : {};
  for (i = 0; i < vals.length; i++) {
    el = $('<div></div>', {
      html: vals[i],
      'class': valsClass
    });
    el.css(valCss);
    container.append(el);
  };
  return container;
}

/*
  GRIDS
*/
function constructGrid(vals, valClass, valCss, gridCss) {
  var container = $('<div></div>', {
    'class': 'grid'
  });
  var el = [];
  (gridCss != undefined) ? container.css(gridCss): {};
  valCss = (valCss != undefined) ? valCss : {};
  for (i = 0; i < vals.length; i++) {
    el = $('<div></div>', {
      html: vals[i],
      'class': valClass
    });
    el.css(valCss);
    container.append(el);
  };
  return container;
}

function imgElement(fileName, ops={height:'180',width:'180',class:'flexContainer',resize:true},path=imagesPath) {
  var imgEl = $("<img>", {
    src: fileName,
    'class': ops['class'] + (ops.resize) ? ' contain' : '',
    height: ops.height,
    width: ops.width
  });
  imgEl.attr('width', ops.width);
  imgEl.attr('height', ops.height);
  return imgEl;
}

/*
  put an image and a word in a column
*/
function imgWordPair(fileName, word, layout, showWords = true) {
  var container = $("<div></div>", {
    'style': 'display:flex;flex-direction;column;flex-wrap:wrap;' +
      'width:40%;margin:5%;justify-content:center;align-content:space-between'
  });
  // word element
  var myWord = word
  if (showWords === false) {
    myWord = ''
  }
  var fontSize = (word.length < 7) ? '45' : '30';
  var wordEl = $("<div></div>", {
    text: myWord,
    contenteditable: true,
    style: "display:flex;width:100%;justify-content:center;" +
      "font-size:" + fontSize + ";letter-spacing:8px;" +
      "font-family:Arial;"
  });
  if (showWords === false) {
    wordEl.hide()
  }
  // image element
  var newImgSize = layout.imageSize;
  newImgSize = (newImgSize == undefined) ? (showWords ? 180 : 240) : newImgSize;
  var imgEl = $("<img>", {
    src: fileName,
    class: 'contain',
    width: newImgSize + 'px',
    height: newImgSize + 'px'
  });
  layout = (layout == undefined) ? {} : layout;
  container.append([imgEl, wordEl]);
  return container;
}

function imgJumbleBlankPair(fileName, jumbledArray, layout = {}) {
  var newImgSize = layout.imageSize;
  newImgSize = (newImgSize == undefined) ? 150 : newImgSize;
  var imgEl = $("<img>", {
    src: fileName,
    class: 'contain',
    width: newImgSize + 'px',
    height: newImgSize + 'px'
  });
  var scrambled = jumbledArray.join('').toUpperCase();
  var fontSize = (scrambled.length < 7) ? '50' : '30';
  var jumbleEl = $("<div></div>", {
    text: scrambled,
    contenteditable: true,
    style: "display:flex;width:100%;justify-content:center;" +
      "font-size:" + fontSize + ";letter-spacing:8px;" +
      "font-family:Courier;"
  });

  var blanks = constantVector('_', scrambled.length).join('');
  var blanksEl = $("<div></div>", {
    text: blanks,
    contenteditable: true,
    style: "display:flex;width:100%;justify-content:center;" +
      "font-size:" + fontSize + ";letter-spacing:8px;" +
      "font-family:Courier;"
  });
  var container = $("<div></div>", {
    'style': 'display:flex;flex-direction;column;flex-wrap:wrap;' +
      "border:dashed 1px lightgray;" +
      'width:40%;margin:2%;justify-content:center;align-content:space-between'
  });
  container.append([imgEl, jumbleEl, blanksEl]);
  return container;
}

/*
  Synonyms puzzle
*/


function writeChoiceConstraints(id, questionsArray) {
  var choiceConstraints = $("<ul></ul>", {
    "class": "msWrapper"
  });
  var inp, li;
  for (var i = 0; i < questionsArray.length; i++) {
    li = $("<li></li>", {
      "class": "msInstruction"
    });
    inp = $("<div></div>", {
      type: "text",
      "class": "instructionInput",
      name: id + "Question" + i,
      value: questionsArray[i],
      html: questionsArray[i],
      contenteditable: true
    });
    li.append(inp);
    choiceConstraints.append(li);
  };
  $("#" + id + "PuzzleWrapper").html(choiceConstraints);
};


function constructColumnOfValues(id, valuesArray, elementClass) {
  var elementClass = (elementClass == undefined) ? "largeElement" : elementClass;
  var columns = $("<div></div>", {
    "class": "column"
  });
  var el;
  for (var i = 0; i < valuesArray.length; i++) {
    if (valuesArray[i] instanceof jQuery) {
      el = valuesArray[i];
    } else {
      el = $("<div></div>", {
        "class": elementClass,
        html: valuesArray[i],
        contenteditable: true
      })
    }
    columns.append(el);
  };
  return columns;
};

function writeNameDate(subpageId) {
  var el = $("<div></div>", {
    "clas": "nameDate"
  });
  el.append("<div></div>", {
    "class": "name",
    text: "Name:"
  });
  el.append("<div></div>", {
    "class": "date",
    text: "Date:"
  });
  $("#" + subpageId).append(el);
};


function writeControlContainer(id, pageNumber) {

  var el = $("<div></div>", {
    "class": "controlContainer",
    "id": id + "ControlContainer"
  });
  el.append(
    $("<div></div>", {
      "id": id + "Controls",
      "class": "controlBody"
    })
  );
  $("#pageControl").append(el);
  $("#" + id + "Controls").hide();
};


function addPuzzle(newPuzzleType, numPuzzles = 1, ops = {}) {
  var puzzs = range(0, numPuzzles).map(() => Puzzle.generate(newPuzzleType, ops))
  var prevPageID
  if ($('.page').length ===0) {
    prevPageID = null
  } else {
    prevPageID = 'page'+$('.page').length
 }
   puzzs.map(x => x.initialize())
  puzzs.map(x => x.write(null, {
    showPages: false,
    location: 'after',
    prevID: $('#subpage1').children().last().prop('id'),
    newPage:true,
    fullSize:false,
    footer:false,
    prevPageID:prevPageID
  }))
}

function addGroup(group) {
  var array = puzzleGroupObject[group]['puzzles']
  array.map((x) => addPuzzle(x[0], 1, x[1]))
}


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

function getAllValues(arg, key) {
  // if not object, return it
  if (arg instanceof Function) {
    return getAllValues(arg(), key);
  }
  if (typeof arg !== "object") {
    return arg;
  };
  // if array of non-objects, return it
  // if ((arg instanceof Array) && (arg.every(function(x) {
  if ((arg instanceof Array) && (typeof arg[0] !== 'object')) {
    return arg;
  };
  // else map self over values
  return flatten(
    Object.values(arg).map(x => getAllValues(x))
  );
};


var randObjCount = 0

function randomObjectValues(obj, key, filterFunction, sampleSize, strict, flatBool) {
  var myKeys;
  if (key instanceof Array) {
    myKeys = key
  } else {
    myKeys = [key]
  };
  randObjCount = 0
  var allPairs = myKeys.map((k) =>
    randomObjectValuesOneKey(obj, k, filterFunction, sampleSize, strict, flatBool)
  );
  var cats = allPairs.map(x => x[0])
  var words = randomSample(flatten(allPairs.map(x => x[1])), sampleSize)
  return [cats, words]
}

function randomObjectValuesOneKey(obj, key, filterFunction, sampleSize, strict, flatBool) {
  var myKey;
  if ((key == '?') || (typeof key != 'string')) {
    myKey = randomSample(Object.keys(obj));
  } else {
    myKey = key
  }
  var vals;
  if (flatBool == false) {
    vals = obj[myKey];
    if (vals instanceof Function) {
      vals = vals();
    }
  } else {
    vals = getAllValues(obj[myKey]);
  };
  if (filterFunction instanceof Function) {
    vals = vals.filter(filterFunction);
  };
  if (typeof sampleSize == 'number' && vals.length > sampleSize) {
    vals = randomSampleSafe(vals, sampleSize).slice(0, sampleSize);
  }
  // if not enough words, and strict on, try again
  if ((strict == true) && (vals.length < sampleSize) && randObjCount < 5) {
    randObjCount++
    return randomObjectValuesOneKey(obj, key, filterFunction, sampleSize, strict);
  }
  // else return what we have
  return [myKey, vals];
};

function shuffleStrict(array) {
  same = true;
  var shuffled;
  count = 0;
  while (same && count < 10) {
    shuffled = shuffle(array);
    same = (shuffled.join('') == array.join(''));
    count++;
  };
  return shuffled;
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

function underlineSpan(str) {
  return `<span style="text-decoration:underline">${str}</span>`;
};

function underlineElement(el) {
  if (!(el instanceof jQuery)) {
    return underlineElement($('<div></div>', {
      html: el
    }));
  };
  el.css('border-bottom', 'solid black 2px');
  el.css('width', '100%');
  return el;
};

function constructMultipleAnswerColumns(id, values, numAnswers, elementClass) {
  var answers = [];
  var copy;
  var lineLength;
  if (values.length <= 2) {
    lineLength = 16;
  } else if (values.length == 3) {
    lineLength = 11;
  } else {
    lineLength = 5;
  }
  for (var i = 0; i < numAnswers; i++) {
    answers.push((i + 1) + ")" + constantVector('_', lineLength).join(''));
  };
  var matrix = values.map(function(val) {
    copy = answers.slice(0);
    copy.unshift(val);
    return copy;
  });
  var cols = matrix.map(
    x => constructColumnOfValues(id, x, elementClass)
  );
  var container = constructColumnContainer(id, cols);
  return container;
};

function jqOuterHTML(jq) {
  if (jq instanceof jQuery) {
    return $('<div>').append(jq.clone()).html();
  };
}


function constructColumnContainer(id, children) {
  var el = $("<div></div>", {
    "class": "columnContainer",
    id: id + "ColumnContainer"
  });
  if (children != undefined) {
    el.append(children);
  };
  return el;
};


function groupPuzzles(puzzleList, shuff) {

  puzzleList = (puzzleList === undefined) ? Object.values(Puzzle.allPuzzles) : puzzleList
  shuff = (shuff === undefined) ? $('#shuffleOnPartition').val() : shuff
  var puzzlesGrouped = []
  var remaining = puzzleList
  if (shuff == 'Fully') {
    remaining = shuffle(puzzleList)
  }
  // sort by size
  // var remaining = puzzleList.sort((a,b) => (a.boxSize > b.boxSize) ? 1 : ((b.boxSize > a.boxSize) ? -1 : 0));
  var candidates, page, keepGoing, pageUsed, differentCandidates

  // do this as long as there are puzzles left to place
  while (remaining.length > 0) {
    // start new page
    page = [remaining[0]]
    remaining.shift()
    size = page[0].boxSize
    sizeRemaining = Puzzle.pageHeight - size
    keepGoing = true
    while (sizeRemaining > 0 && keepGoing) {
      // if no shuffle or soft shuffle, try to place next puzzle
      if ((shuff == 'No') || (shuff == 'Minimally')) {
        candidates = remaining.slice(0, 1).filter(x => (x.boxSize <= sizeRemaining))
      }
      // if soft or hard shuffle, look for anything remaining
      if ((shuff == 'Fully') || ((shuff == 'Minimally') && (candidates.length == 0))) {
        candidates = remaining.filter(x => ((x.boxSize <= sizeRemaining)))
        // minimize repeated types on one page
        pageUsed = page.map(x => x.puzzleType)
        differentCandidates = candidates.filter(x => (!pageUsed.includes(x.puzzleType)))
        if (differentCandidates.length > 0) {
          candidates = differentCandidates
        }
      }
      if (candidates.length === 0) {
        keepGoing = false
      } else {
        page.unshift(candidates[0])
        candidates.shift()
        size += page[0].boxSize
        sizeRemaining -= page[0].boxSize
        remaining = remaining.filter(x => x.id !== page[0].id)
      }
    }
    puzzlesGrouped.push(page.reverse())
  }
  if (shuff == 'Fully') {
    puzzlesGrouped = shuffle(puzzlesGrouped.map(x => shuffle(x)))
  }
  return puzzlesGrouped;

}

function allIdString(array) {
  return array.map((page) => (page.map((puzz) => puzz.id)));
}


function sampleGenerator(generatingFunction, n = 1, unique = true, shuffleBool = true) {
  var gfAll;
  if (generatingFunction instanceof Array) {
    gfAll = generatingFunction
  } else {
    gfAll = [generatingFunction]
  }
  // make list of generators first, to maximize diversity across question type
  const gfn = randomSampleSafe(gfAll, n)
  var array = []
  var gf, val;
  let count = 0
  while (array.length < n && count < n * 3) {
    gf = gfn[count % n]
    val = gf()
    if (unique !== true || !array.includes(val)) {
      array.push(val)
    }
    count++
  }
  if (shuffleBool === true) {
    return shuffle(array);
  }
  return array;
}


function gridOfBoxes(rows = 8, cols = 8, shading = false, labeling = false, values = false, layout = {}) {

  const boxStyle = `width:${layout.elementCSS.width}; height:${layout.elementCSS.height};
    border:solid black 1px; margin:0;
    align-items:center; justify-content:center; display:flex;
    font-size:${layout.elementCSS['font-size']};`;

  var container = $('<div></div>', {
    'class': 'flexContainer'
  })
  for (var i = 0; i < rows; i++) {
    var row = $('<div></div>', {
      'style': 'display:flex; align-items:center;'
    })
    for (var j = 0; j < cols; j++) {
      var bgColor = 'white'
      if (shading && (j % 2 === (i % 2))) {
        bgColor = '#E1E1E1'
      }
      row.append($('<div></div>', {
        'html': values[i][j],
        'style': boxStyle + 'background:' + bgColor
      }))
    }
    row.
    append($('<div></div>', {
      'html': labeling[0][i],
      'style': 'margin:2px;'
    })).
    prepend($('<div></div>', {
      'html': labeling[0][i],
      'style': 'margin:2px;'
    }))
    row.css({
      'font-size': '20px'
    })
    container.prepend(row)
  }
  if (labeling !== true) {
    const labelStyle = 'display:flex; margin:2px;'
    const labelElStyle = `display:flex; width:${layout.elementCSS.width}; justify-content:center; font-size:20px;`
    var top = $('<div></div>', {
      'style': labelStyle
    })
    labeling[1].forEach(x => top.append($('<div></div>', {
      'html': x,
      'style': labelElStyle
    })))
    var bottom = $('<div></div>', {
      'style': labelStyle
    })
    labeling[1].forEach(x => bottom.append($('<div></div>', {
      'html': x,
      'style': labelElStyle
    })))
    container.prepend(top).append(bottom)
  }
  return container;
}


function duplicatePuzzle(id) {
  var puzz = Puzzle.allPuzzles[id]
  const type = puzz.puzzleType
  let copiedOptions = copyObject(puzz.settings.sampledObject());
  copyOnlyNewKeys(copiedOptions, puzz.layout.sampledObject())
  var puzzNew = Puzzle.generate(type, copiedOptions)
  puzzNew.initialize()
  puzzNew.write(null, {
    showPages: false,
    location: 'after',
    prevID: id,
    footer:false,
    fullSize:false,
    newPage:true,
    prevPageID: $('#'+id).parent().parent().prop('id')
  })
}


function numberLine({
  min = -5,
  max = 5,
  step = 1,
  subStep = 1
}) {
  var canvas = $('<canvas>', {
    'class': 'flexElement'
  });
  const stepSize = parseSettingValue(subStep);
  const nums = range(min, max + stepSize, stepSize);
  const numMarkers = nums.length;
  const height = 100;
  const width = 660;
  canvas.height(height);
  canvas.width(width);
  canvas.attr('width', width);
  canvas.attr('height', height);
  var ctx = canvas[0].getContext('2d');
  ctx.beginPath();
  // horizontal line
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.moveTo(0, canvas.height() / 2);
  ctx.lineTo(canvas.width(), canvas.height() / 2);
  ctx.stroke();
  // vertical markers and numbers
  ctx.font = '20' + "px arial";
  const spacing = ((width - 20 - 20) / (numMarkers - 1));
  const xpos = range(0, numMarkers, 1).map(x => 20 + x * spacing);
  for (i = 0; i < nums.length; i++) {
    ctx.beginPath();
    const sub = (Math.abs(nums[i]) < .0000001) || (((nums[i]).toFixed(3)) === (Math.round(nums[i]).toFixed(3)));
    ctx.moveTo(xpos[i], canvas.height() * (sub ? .62 : .55))
    ctx.lineTo(xpos[i], canvas.height() * (sub ? .38 : .45));
    ctx.lineWidth = (nums[i] === 0) ? 4 : 2;
    ctx.stroke();
    if (sub) {
      ctx.fillText(nums[i].toFixed(0), xpos[i] - 4 * ((nums[i] < 0) ? 2 : 1), canvas.height() * .85);
    }
  }
  // arrow ends
  ctx.beginPath();
  ctx.moveTo(0, canvas.height() * .5)
  ctx.lineTo(10, canvas.height() * .55);
  ctx.moveTo(0, canvas.height() * .5)
  ctx.lineTo(10, canvas.height() * .45);
  ctx.moveTo(width, canvas.height() * .5)
  ctx.lineTo(width - 10, canvas.height() * .55);
  ctx.moveTo(width, canvas.height() * .5)
  ctx.lineTo(width - 10, canvas.height() * .45);
  ctx.stroke();

  //
  return canvas;
}

function drawAxes({
  xmin = 0,
  xmax = 5,
  ymin = 0,
  ymax = 4,
  xstep = 1,
  ystep = 1,
  xsubStep = .5,
  ysubStep = 0.5,
  halfTicks = true
}) {
  var canvas = $('<canvas>', {
    'class': 'flexElement'
  });

  const width = 660;
  const height = 400;
  canvas.height(height);
  canvas.width(width);
  canvas.attr('width', width);
  canvas.attr('height', height);
  var ctx = canvas[0].getContext('2d');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.font = '20px arial';
  const origin = [35, 350]
  const [vertX, horizY] = origin;

  const xstepSize = parseSettingValue(xsubStep);
  const xnums = range(xmin, xmax + xstepSize, xstepSize);
  const xnumMarkers = xnums.length;
  // horizontal line
  ctx.beginPath();
  ctx.moveTo(vertX, horizY);
  ctx.lineTo(width, horizY);
  ctx.stroke();
  // vertical markers and numbers
  const dx = ((width - vertX - vertX) / (xnumMarkers - 1));
  const xpos = range(0, xnumMarkers, 1).map(x => vertX + x * dx);
  for (i = 0; i < xnums.length; i++) {
    ctx.beginPath();
    const sub = !((Math.abs(xnums[i]) < .0000001) || (((xnums[i]).toFixed(3)) === (Math.round(xnums[i]).toFixed(3))));
    ctx.moveTo(xpos[i], horizY + (sub ? 10 : 15))
    ctx.lineTo(xpos[i], horizY - (halfTicks ? 0 : (sub ? 10 : 15)))
    ctx.stroke();
    if (sub) {
      ctx.font = '15px arial';
      ctx.fillText(xnums[i].toFixed(1), xpos[i] - 4 * ((xnums[i] < 0) ? 4 : 2), horizY + 35);
    } else {
      ctx.font = '20px arial';
      ctx.fillText(xnums[i].toFixed(0), xpos[i] - 4 * ((xnums[i] < 0) ? 2 : 1), horizY + 35);
    }
  }

  const ystepSize = parseSettingValue(ysubStep);
  const ynums = range(ymin, ymax + ystepSize, ystepSize).reverse();
  const ynumMarkers = ynums.length;
  // vertical line
  ctx.beginPath();
  ctx.moveTo(vertX, horizY);
  ctx.lineTo(vertX, 0);
  ctx.stroke();
  // horizontal markers and numbers
  const dy = ((horizY - 20) / (ynumMarkers - 1));
  const ypos = range(0, ynumMarkers, 1).map(y => 20 + y * dy);
  for (i = 0; i < ynums.length; i++) {
    ctx.beginPath();
    const sub = !((Math.abs(ynums[i]) < .0000001) || (((ynums[i]).toFixed(3)) === (Math.round(ynums[i]).toFixed(3))));
    ctx.moveTo(vertX + (halfTicks ? 0 : (sub ? 10 : 15)), ypos[i])
    ctx.lineTo(vertX - (sub ? 10 : 15), ypos[i]);
    ctx.stroke();
    if (sub) {
      ctx.font = '15px arial';
      ctx.fillText(ynums[i].toFixed(1), 0, ypos[i] + 5);
    } else {
      ctx.font = '20px arial';
      ctx.fillText(ynums[i].toFixed(0), 0, ypos[i] + 5);
    }
  }

  // draw the Shapes
  const [xa, ya] = randomIntegers(1, 4, 2)
  const [xb, yb] = [randomInteger(xa + 1, 8), randomInteger(ya + 1, 6)]
  const [xc, yc] = [randomInteger(xb + 1, xpos.length - 1), randomInteger(yb + 1, ypos.length - 1)]
  ctx.fillStyle = 'black'
  ctx.fillRect(origin[0], origin[1], xc * dx, -yc * dy)
  ctx.fillStyle = 'gray'
  ctx.fillRect(origin[0], origin[1], xb * dx, -yb * dy)
  ctx.fillStyle = 'lightgray'
  ctx.moveTo(origin[0] + xa * dx / 2, origin[1] - ya * dy / 2)
  ctx.ellipse(origin[0] + xa * dx / 2, origin[1] - ya * dy / 2, xa * dx / 2, ya * dy / 2, 0, 0, 2 * Math.PI);
  ctx.fill()

  canvas.css({
    'position': 'absolute'
  })
  return canvas;
}

function adjustFont(element, query, layout) {
  if (layout.value('fontSize') != undefined) {
    element.find(query).css('font-size', layout.value('fontSize'))
  }
  if (layout.fontFamily != undefined) {
    element.find(query).css('font-family', layout.value('fontFamily'))
  }
}

function incrementFonts(inds, idFunc, findSelector, change = 0) {
  var indsArray
  if (inds instanceof Array) {
    indsArray = inds
  } else {
    indsArray = [inds]
  }
  var idArray
  if (idFunc instanceof Function) {
    idArray = indsArray.map(id => idFunc(id))
  } else if (idFunc instanceof Array) {
    idArray = idFunc
  }
  idArray.forEach(function(id) {
    var els = $(id).find(findSelector)
    els.map(function() {
      var oldFont = parseInt($(this).css('font-size'));
      var newFont = oldFont + parseInt(change);
      $(this).css('font-size', newFont)
    })
  })
}

function showHideAllBorders(showBorder) {
  var allIDs = range(0, Puzzle.numberOfPuzzles, 1).map(ind => ('#' + ind + 'PuzzleWrapper'))
  allIDs.forEach(function(id) {
    if (showBorder === false || showBorder === 'false') {
      $(id).css({
        'border-width': '0px',
        'margin': '2px'
      })
    } else {
      $(id).css({
        'border-width': '2px',
        'margin': '0px'
      })
    }
  })
}

function showHideAllHeaders(showHeader) {
  range(0, Puzzle.numberOfPuzzles, 1).forEach(function(id) {
    Puzzle.allPuzzles[id].layout.showHeader.value = (showHeader === true || showHeader === 'true')
    Puzzle.allPuzzles[id].redraw()
  })
}


function plusMinusButtonBar(leftText, smallerFunction, biggerFunction) {
  var barElement = $('<div>', {
    'class': 'controlRow'
  })
  var biggerButton = $('<button>', {
    'text': '+'
  })
  biggerButton.click(biggerFunction)
  var smallerButton = $('<button>', {
    'text': '-'
  })
  smallerButton.click(smallerFunction)
  barElement.append([
    $('<div>', {
      'text': leftText
    }).css({
      'width': '50%'
    }),
    $('<div>', {
      'class': 'flexContainer'
    }).append([smallerButton, biggerButton])
  ])
  return barElement;
}



function selectControlBar(controlID, leftText, valueArray, changeFunction) {
  var barElement = $('<div>', {
    'class': 'controlRow'
  })
  var menu = $('<select></select>', {
    id: controlID
  });
  valueArray.forEach(function(val, ind) {
    menu.append($("<option></option>", {
      value: val,
      text: val,
      selected: (val == true) ? true : false
    }));
  });
  menu.change(() => changeFunction($('#' + controlID).val()))
  barElement.append([
    $('<div>', {
      'text': leftText
    }).css({
      'width': '50%'
    }),
    menu
  ])
  return barElement;
}

var pageHeightObject = {
  'Auto': 'auto',
  '1/4 Page': '56mm',
  '1/3 Page': '78mm',
  '1/2 Page': '122mm',
  '2/3 Page': '165mm',
  '3/4 Page': '185mm',
  'Full Page': '260mm'
};

function setAllPuzzleSizes(sizeString) {
  Object.values(Puzzle.allPuzzles).map(function(pz) {
    // set sizes
    setOnePuzzleSize(pz['id'], sizeString)
    // update layout setting in object
    pz.layout.puzzleSize.value = sizeString
  })
}

function setOnePuzzleSize(id, sizeString) {
  $('#' + id + 'PuzzleSubwrapper').css('height', pageHeightObject[sizeString])
}


function puzzleSizeMenu(val) {
  return EnumeratedValue(Object.keys(pageHeightObject), val);
}

function imageElement(imgSrcArray,imgSize='45',extraCSS={},path=imagesPath) {
  return $("<img>", {
    src: path + '/' + imgSrcArray,
    width: imgSize,
    height: imgSize,
    class: 'contain'
  }).css(extraCSS)
}

function imageGrid(imgSrcArray, columns, total, imgSize = '45',path=imagesPath) {
  var imgEls = [];
  for (var i = 0; i < total; i++) {
    imgEls.push(
      $("<img>", {
        src: path + '/' + imgSrcArray[i],
        width: imgSize,
        height: imgSize,
        class: 'contain'
      })
    );
  };
  let sidePad = ((10 - columns) * (45 + 12 + 12) / 2 + '')
  var top = gridOfHTML('', imgEls.map(x => x[0]), {
    'padding': '0 ' + sidePad
  }, {
    'margin': '12px'
  }).css({
    'justify-content': 'left'
  })
  return top;
}
