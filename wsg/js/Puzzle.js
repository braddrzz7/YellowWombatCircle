class Puzzle {

  constructor(userInputs = {}, puzzleSpec = {}) {

    // default any undefined important things from user input object
    var {
      puzzleType = 'None',
        id = undefined,
        layout = {},
        content = {},
        settings = {},
        processContentFunctions = {},
        instruction = undefined
    } = userInputs

    // start with  'global' defaults
    var inputObject = {
      puzzleType: 'None',
      id: undefined,
      layout: {},
      content: {},
      settings: {},
      processContentFunctions: {},
      instruction: '',
      presetSettings: [],
      category:'none',
      subcategory:'none',
      tags:[]
    }

    // add in the puzzle spec defaults
    // these override global defaults, if they exist
    updateObjectValues(inputObject, puzzleSpec)

    // add in the user inputs
    // these override puzzle defaults, if they exist
    updateObjectValues(inputObject, userInputs)

    // Count number of puzzles created.  This is used for
    // making unqiue ids, sort of.  Not accurate count of
    // puzzles because puzzles can be deleted, and we don't
    // want to decrement this because then we could have id clash
    if (Puzzle.numberOfPuzzles === undefined) {
      Puzzle.numberOfPuzzles = 1;
    } else {
      Puzzle.numberOfPuzzles++
    };

    // make the id for this puzzle
    // NOTE: this does nothing to avoid clashes in user-defined
    // case, but not worrying about that for now
    if (inputObject.id === undefined) {
      id = (Puzzle.numberOfPuzzles - 1).toString();
    } else {
      id = inputObject.id
    };

    // stash this puzzle in the object list of all puzzles
    if (Puzzle.allPuzzles === undefined) {
      Puzzle.allPuzzles = {};
    }
    Puzzle.allPuzzles[id] = this;

    // store a bunch of strings built from the id
    // which will be used as ids in various html divs for the puzzle
    this.id = id;
    this.idPuzzle = id + "Puzzle";
    this.idPuzzleBody = this.idPuzzle + "Body";
    this.idPuzzleWrapper = this.idPuzzle + "Wrapper";
    this.idControls = id + "Controls";
    // store the other important stuff
    this.puzzleType = inputObject.puzzleType;
    this.category = opVal(inputObject.category,'none');
    this.subcategory = opVal(inputObject.subcategory,'none');
    this.tags = opVal(inputObject.tags,[]);
    this.contentType = null;
    this.instruction = inputObject.instruction;
    this.layout = new Layout(userInputs, layoutObject({}, inputObject.layout))
    this.settings = new Settings(userInputs, inputObject.settings)
    this.content = new Content(inputObject.content)
    // run some setup function defaults
    inputObject.presetSettings.map((x) => x(this, userInputs))
    //
    this.processContentFunctions = inputObject.processContentFunctions;

    //
    if (inputObject.makePuzzleBody instanceof Function) {
      this.makePuzzleBody = inputObject.makePuzzleBody
    }
    if (inputObject.instruction !== undefined) {
      this.instruction = inputObject.instruction
    }
    if (inputObject.makePuzzleInstruction instanceof Function) {
      this.makePuzzleInstruction = inputObject.makePuzzleInstruction
    }

  }; // end constructor

  //
  set Types(val) {
    if (Puzzle.Types === undefined) {
      Puzzle.Types = {}
    }

  }

  //
  static get numberOfPuzzles() {
    return !this._count ? 0 : this._count;
  };
  static set numberOfPuzzles(val) {
    this._count = val;
  };

  // delete a puzzle, which requires several steps
  static delete(id) {
    var subpageElement = $('#'+id).parent()
    // remove the puzzle box
    $("#" + id).remove();
    // remove the controls box
    $("#" + id + "ControlContainer").remove();
    // remove from puzzle dropdown menu
    $(`#allPuzzlesMenu option[value=${id}]`).remove();
    //delete page if it's empty now
    if (subpageElement.children().length===0) {
      subpageElement.parent().remove()
    }
    // delete from all puzzles list
    delete Puzzle.allPuzzles[id];
    // jump controls to new puzzle
    showSettings(Object.keys(Puzzle.allPuzzles)[0])

  };

  // write the puzzle to the page
  write(pageNumber, ops) {
    var {
      showPages = true,
      location = 'bottom',
      prevID = null,
      force = true,
      footer=true,
      fullSize=true,
      newPage=false,
      prevPageID=null
    } = ops;
    // write page (if it doesn't already exist)
    if (pageNumber===null) {
      pageNumber = $('.page').length+1
    }
    if (document.getElementById("subpage" + pageNumber) == null) {
      writePage("puzzles", pageNumber, footer, fullSize, location, prevPageID)
    };
    // setup top containers
    if (document.getElementById(this.id) == null) {
      writePuzzleContainer(this.id, pageNumber, location, prevID, newPage);
    };
    let newControls = (document.getElementById(this.id + "ControlContainer") == null)
    if (newControls) {
      writeControlContainer(this.id, pageNumber);
    };

    //
    if (this.initialized !== true) {
      this.initialize()
    }

    //
    this.writePuzzle(undefined, showPages, newControls)
    if (newControls) {

    /*
      Write a control element for each controllable layout value
    */
    $('#'+this.idControls).append('<b>Layout</b>')
    Object.keys(this.layout).forEach(x => this.writeControl(x, this.layout[x],'layout'))
    const spacer = $('<div>',{'style':'padding-top=1cm;'})
    $('#'+this.idControls).append(spacer)


    /*
      Write a control element for each controllable setting value
    */
    const spacerHeader =  $('<div>',{'html':'<b>Settings</b>'})
    spacerHeader.css({'padding-top':'.3cm'})
    $('#'+this.idControls).append(spacerHeader)
    Object.keys(this.settings).forEach(x => this.writeControl(x, this.settings[x],'settings'))
}

    /*
      Create text input areas for settings, layout, and content
      These are crude, contain the full objects that can be
      modified by user, and will auto-update the puzzle on change
    */
    // var settingsWrapper = $('<div></div>', {
    //   'id': this.id + 'SettingsWrapper'
    // })
    // var allSettings = textAreaInput(this.id, 'settings', true);
    // var allLayout = textAreaInput(this.id, 'layout', false);
    // var allContent = textAreaInput(this.id, 'content', false);
    // settingsWrapper.append([allSettings, allLayout, allContent])
    // settingsWrapper.hide()
    // $("#" + this.id + 'ControlContainer').append(settingsWrapper)

    // DO NOT REFRESH SETTINGS OR CONTENT AT THIS POINT
    this.drawAndSync(force)
  };

  /*

  */
  writePuzzle(parent, showPages, newControls=false) {
    writePuzzleWrapper(this.id, this.layout.object().puzzleClass, parent);
    // write puzzle buttons
    if (newControls==true) {
      writePuzzleButtons(this.id)
    }
    // write puzzle subwrapper
    writePuzzleSubwrapper(this.id)
    // write header
    writePuzzleHeader(this.id, this.layout.object().headerClass);
    // write body
    writePuzzleBody(this.id);
  }

  writeControl(name, control,settOrLay) {
    // TODO: FINISH THIS
    if (control.choices instanceof VariableValue) {
      // for enumerated value, make a select menu
      if (control.choices.possibleValues instanceof Array) {
        $('#' + this.id + 'Controls').append(
          selectMenuElement(this.id, name, control,settOrLay)
        )
      } else if (control.choices.type === 'Integer') {
        $('#' + this.id + 'Controls').append(
          numberInputElement(control.choices, this.id, control, name,settOrLay)
        )
      }
    }

  }

  //
  initialize() {
    this.updateSettings()
    this.updateContent()
    this.initialized = true
  }


  refreshAll() {
    this.updateSettings()
    this.updateContent()
    // update the controls
    Object.keys(this.settings).map((key) =>
      $('#'+this.id+'Setting'+key).val(this.settings[key].value)
    )
    this.drawAndSync()
  };

  refresh() {
    this.updateContent()
    this.drawAndSync()
  };

  /*
    draw the content on the page,
    and update the content boxes to be in sync with the
    puzzle object
  */
  drawAndSync(force=true) {
    // write the content
    if (force === true) {
        this.redraw();
        this.element = $('#'+this.id)[0]
    } else {
      $('#'+this.id).replaceWith(this.element)
    }

    $('#makeWorksheet').css({'color':'red','border-color':'red','background-color':'white'})


    // add new puzzle to dropdown menu, if it didn't already exist
    if ($('#allPuzzlesMenu option[value='+this.id+']').length===0) {
      $('#allPuzzlesMenu').append($("<option></option>", {
        value: this.id,
        html: `#${parseInt(this.id)+1} ${this.puzzleType}`
      }));
    }


  }

  /*
    draw the content on the page
    DO NOT change any settings or content
  */
  redraw() {
    // this should only re-draw, not re-sample
    $("#" + this.idPuzzleBody).html(this.makePuzzleBody(this, this.settings, this.content, this.layout.object()));
    $("#" + this.idPuzzle + "Instruction").html(this.makePuzzleInstruction(this, this.settings, this.content, this.layout.object()));
    // hide the header, if requested
    if (this.layout.object().showHeader === false) {
      $("#" + this.idPuzzle + "Header").hide()
    } else {
      $("#" + this.idPuzzle + "Header").show()
    }
    if (this.layout.object().showBorder === false) {
      $("#" + this.idPuzzle + "Wrapper").css({'border-width':'0px','margin':''})
    } else {
      $("#" + this.idPuzzle + "Wrapper").css({'border-width':'2px','margin':''})
    }

    // set the height, based on puzzleSize menu
    setOnePuzzleSize(this.id,this.layout.object().puzzleSize)

    // store the size of each puzzle
    const oldSizepx = $('#' + this.id).outerHeight()
    const oldSizemm = Puzzle.px2mmScale * oldSizepx
    this.boxSize = oldSizemm

}


  updateContent() {
    if (this.content instanceof Content) {
      const keys = Object.keys(this.content);
      keys.forEach(x => this.content[x].updateSample(this.settings, this.content))
      return;
    }
  };


  updateSettings() {
    if (this.settings instanceof Settings) {
      const keys = Object.keys(this.settings);
      keys.map(x => this.settings.update(x))
    };
  }


  processedValue(name) {
    const val = this.content.value(name);
    const fProc = this.processContentFunctions[name];
    if (fProc instanceof Function) {
      return fProc(val,this.settings);
    };
    return val;
  };

  makePuzzleInstruction() {
    return $('<div></div>', {
      html: this.instruction
    })
  };

  makePuzzleBody() {
    var keys = Object.keys(this.content);
    if (keys.length === 0) {
      return null;
    }
    var firstKey = keys.filter(x => x !== 'instruction')[0];
    constructElementGrid(
      this.id,
      this.processedValue(firstKey),
      this.layout.object(),
      'Grid',
      null
    );
  };


}; // end Puzzle object


/*
  Main function to generate new puzzles,
  given puzzle type and user inputs
*/
Puzzle.generate = function(puzzleType, userInputs={}) {
  var pz
  const pta = Puzzle.Types[puzzleType] ;
  if (pta instanceof Function) {
    pz = new pta(userInputs);
  } else {
    if (pta.parentPuzzle!=undefined) {
      copyOnlyNewKeys(userInputs,pta)
      // merge in specific settings
      var childSettings = pta.settings
      childSettings = (typeof(childSettings)==='object')? childSettings: {}
      var parentSettings = Puzzle.Types[pta.parentPuzzle].settings
      parentSettings = (typeof(parentSettings)==='object')? parentSettings: {}
      userInputs.settings = mergeDefaultObjects(parentSettings,childSettings,{})
      // var childLayout = pta.layout
      // childLayout = (typeof(childLayout)==='object')? childLayout: {}
      // var parentLayout = Puzzle.Types[pta.parentPuzzle].layout
      // parentLayout = (typeof(parentLayout)==='object')? parentLayout: {}
      // userInputs.layout = mergeDefaultObjects(parentLayout,childLayout,{})
      pz = Puzzle.generate(pta.parentPuzzle, userInputs);
      pz.tags = union(Puzzle.getTags(pta.parentPuzzle).concat(Puzzle.getTags(puzzleType)))
    } else if (pta.parentClass!=undefined) {
      copyOnlyNewKeys(userInputs,pta)
      pz = new pta.parentClass(userInputs)
    } else {
      pz = new Puzzle(userInputs, pta);
    }
  }
  pz.puzzleType = puzzleType
  return pz;
}


Puzzle.getCategory = function(thing) {
  var type
  if (thing instanceof Puzzle) {
    type = thing.puzzleType
  } else if (typeof(thing)==='string') {
    type = thing
  }
  var cat = Puzzle.Types[type].category
  const parentType = Puzzle.Types[type].parentPuzzle
  if (typeof(cat) === 'string') {
    return cat;
  } else if (typeof(parentType)==='string') {
    return Puzzle.getCategory(parentType);
  } else {
    return 'None';
  }
}

Puzzle.getSubcategory = function(thing) {
  var type
  if (thing instanceof Puzzle) {
    type = thing.puzzleType
  } else if (typeof(thing)==='string') {
    type = thing
  }
  var subcat = Puzzle.Types[type].subcategory
  const parentType = Puzzle.Types[type].parentPuzzle
  if (typeof(subcat) === 'string') {
    return subcat;
  } else if (typeof(parentType)==='string') {
    return Puzzle.getSubcategory(parentType);
  } else {
    return 'None';
  }
}

Puzzle.getTags = function(type) {
  var tags = Puzzle.Types[type].tags
  tags = (tags instanceof Array)?tags:[];
  // if it has a parent puzzle, merge those in
  const parentPuzzle = Puzzle.Types[type].parentPuzzle
  if (typeof(parentPuzzle)==='string') {
    tags = tags.concat(Puzzle.getTags(parentPuzzle))
  }
  return tags.map(tag=>tag.toLowerCase());
}

Puzzle.Types = {}

Puzzle.Generators = {}
Puzzle.allPuzzles={}
Puzzle.allIds = () => Object.keys(Puzzle.allPuzzles)
Puzzle.allTypes = () => Object.keys(Puzzle.Types).sort().filter((k) => Puzzle.Types[k].add !== false)
Puzzle.allTags = () => union(flatten(Puzzle.allTypes().map(x => Puzzle.getTags(x)))).sort().filter((t) => typeof(t) === 'string')
Puzzle.allCategories = () => union(Puzzle.allTypes().map(type=>Puzzle.getCategory(type))).sort()
Puzzle.getTypes = function(category='All',subcategory='All',tags=[]) {
  let types=[];
  Puzzle.allTypes().forEach(function(type) {
    if(category==='All' || category===Puzzle.getCategory(type)) {
      if (typeof subcategory === 'string') {
        if (subcategory==='All' || subcategory === Puzzle.getSubcategory(type)) {
          if (tags.every((x)=>Puzzle.getTags(type).includes(x))) {
            types.push(type)
          }
        }
      } else {
        if (tags.every((x)=>Puzzle.getTags(type).includes(x))) {
          types.push(type)
        }
      }
  }})
  return union(types).sort();
}
Puzzle.getTypesFromTags = function(tags=[]) {
  let types=[];
  Puzzle.allTypes().forEach(function(type) {
    if (tags.every((x)=>Puzzle.getTags(type).includes(x))) {
      types.push(type)
    }
  })
  return union(types).sort();
}
Puzzle.subcategories = function(category) {
  let subcats=[];
  if (category==='All') {return [];}
  Puzzle.allTypes().forEach(function(type) {
    if(category===Puzzle.getCategory(type)) {
    subcats.push(Puzzle.getSubcategory(type))
  }})
  return union(subcats).sort();
}

class ElementPuzzleNew extends Puzzle {
  constructor(inputObject = {}) {
    super(inputObject);
    this.layout = new Layout({},layoutObject({
      'containerClass': 'flexContainer',
      'elementClass': 'flexElement',
      'elementCSS': {
        'fontSize': '8vmin',
        'margin': '5px 20px'
      },
      'containerCSS': {
        'justify-content': 'center'
      },
      'fontSize':FontSizeValue(50),
      'fontFamily':'Arial'
    }, inputObject)
  );
    this.settings = new Settings(inputObject, {
      'contentType': ['letters', 'numbers']
    });
    const ct = opVal(inputObject.contentType, ['letters', 'numbers'])
    if (ct === 'letters') {
      AddLetters(this, inputObject, {
        'contentKey': 'elements'
      })
    } else if (ct === 'numbers') {
      AddNumbers(this, inputObject, {
        'contentKey': 'elements'
      })
    } else if (ct === 'fractions') {
      AddFractions(this, inputObject, {
        'contentKey': 'elements'
      })
    } else if (ct === 'decimals') {
      AddDecimals(this, inputObject, {
        'contentKey': 'elements'
      })
    } else if (ct === 'words') {
      AddCategoryWords(this, inputObject, {
        'contentKey': 'elements'
      })
    } else if (ct === 'symbols') {
      AddSymbols(this, inputObject, {
        'contentKey': 'elements'
      })
    } else if (ct instanceof Array) {
      AddMixedSet(this, inputObject, {
        'contentKey': 'elements'
      })
    }
  }
  makePuzzleBody() {
    var out = constructElementGrid(
      this.id,
      this.processedValue('elements'),
      this.layout.object(),
      'Grid',
      updateElementFunction
    );
    out.find("div").css({'font-size': this.layout.value('fontSize'),'font-family':this.layout.value('fontFamily')})
    out.find("span.fraction").css('font-size', this.layout.value('fontSize')-8)
    return out;
  }

};
