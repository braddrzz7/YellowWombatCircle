class ElementSet {
  constructor(settingsObject = {}) {};
};



/* ***************************************** */

/*
  Specify a
*/
class SamplingSet extends ElementSet {
  constructor({
    samplingFunction
  }) {
    super({});
    this.updateSample = function(settings) {
        this.value = samplingFunction(settings)
    };
  };
};



/*
  Fixed set of values, no sampling
*/
class FixedSet extends ElementSet {
  constructor({
    fixedSet
  }) {
    super({});
    if (fixedSet instanceof Array) {
      this.fixedSet = () => fixedSet
    } else if (fixedSet instanceof Function) {
      this.fixedSet = fixedSet
    }
    this.updateSample = function(settings, content) {
        this.value = this.fixedSet(settings, content)
    };
  };
};


class Values {
  constructor() {

  };
  // sample the setting and updates its value
  update(name, newVal, stillRandom) {

    if (stillRandom !== undefined) {
      this[name].random = stillRandom
    }
    this[name].name = name;
    if (this[name].random === true) {
      this[name].value = this[name].choices.sample();
    } else if (newVal !== undefined) {
      this[name].random = false;
      this[name].value = newVal;
    }
  }
  // pull the value for a field
  value(name) {
    if (name instanceof Array) {
      return name.map(x => this.value(x));
    } else {
      if (Object.keys(this).includes(name)) {
        return this[name].value;
      } else {
        return undefined;
      }
    }
  }
  // get all values in an array
  values() {
    return Object.keys(this).map(x => this.value(x));
  }
  // get an object with all values
  object() {
    var obj = {};
    Object.keys(this).forEach(x => obj[x] = this.value(x));
    return obj;
  }
};


class Controls extends Values {
  constructor(inputs = {}, spec = {}) {
    super();
    this.addControls(inputs, spec)
  };

  addOneControl(key, init, val) {

    // if user specifies VariableValue, ditch the default
    // and redirect, just pretend theirs is the default variable value
    if (init instanceof VariableValue) {
      return this.addOneControl(key, undefined, init)
    }

    if (val instanceof VariableValue) {
      var value
      if (init === undefined) {
        value = val.default
      } else {
        value = init
      }
      this[key] = {
        'choices': val,
        'value': value,
        'random': (value === undefined)
      }
      // constant setting
    } else {
      this[key] = {
        'value': (init === undefined) ? val : init,
        'random': false
      }
    }
  }

  addControls(inputs, spec) {
    const keys = Object.keys(spec);
    keys.forEach((key) =>
      this.addOneControl(key, inputs[key], spec[key])
    )
  }

  // get value, sampling if value is '?'
  sampleValue(key) {
    const val = this[key].value
    if ((val === '?')&&(this[key].choices instanceof VariableValue)) {
      return this[key].choices.sample()
    } else {
      return val;
    }
  }

  // get values for everything, sampling if values are '?'
  sampledObject() {
    var obj = this.object()
    const keys = Object.keys(obj)
    keys.forEach(k => obj[k] = this.sampleValue(k))
    return obj;
  }

};

class Settings extends Controls {
  constructor(inputs = {}, spec = {}) {
    super();
    this.addControls(inputs, spec)
  };
};

class Layout extends Controls {
  constructor(inputs = {}, spec = {}) {
    super();
    this.addControls(inputs, spec)
  };
};


class Content extends Values {
  constructor(content) {
    super(content);
    this.addContent(content)
  };

  addContent(obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => this.addOneContent(this, key, obj[key]))
  }

  addOneContent(content, key, val) {
    if (val instanceof ElementSet) {
      content[key] = val
    } else {
      content[key] = new FixedSet({
        fixedSet: val
      })
    }
  }
};


function AddCategoryWords(puzz, inputObject, ops = {}) {
  const {
    contentKey = 'words'
  } = ops
  // add settings
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(2, 6, 1),
    'maxWordLength': IntegerValue(4, 6, 1),
    'theme': undefined,
    'caseness': EnumeratedValue(['UpperCase', 'LowerCase', 'Capitalize', 'Random'])
  })

  var newContent = {}
  newContent['categoryAndWords'] = () => randomObjectValues(
    wordGroups(),
    puzz.settings.value('theme'),
    (w) => (w.length <= puzz.settings.value('maxWordLength')),
    puzz.settings.value('n'), true, true
  )
  newContent['theme'] = () => puzz.content.value('categoryAndWords')[0]
  newContent[contentKey] = () => puzz.content.value('categoryAndWords')[1].map(
    (x) => caseAdjust(x, puzz.settings.value('caseness'))
  )
  puzz.content.addContent(newContent);
}

function AddLetters(puzz, inputObject, ops) {
  const {
    contentKey = 'letters'
  } = ops
  // add settings
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(10, 20, 1),
    'shuffle': true,
    'unique': true,
    'caseness': EnumeratedValue(['UpperCase', 'LowerCase', 'Random'])
  })
  var newContent = {}
  newContent[contentKey] = function() {
    var sobj = puzz.settings.object()
    var letters = sampleFullSet(allLetters(), sobj.n, sobj.unique, sobj.shuffle)
    return letters.map((x) => caseAdjust(x, sobj.caseness));
  }
  puzz.content.addContent(newContent);
}


function AddNumbers(puzz, inputObject, ops) {
  const {
    contentKey = 'numbers'
  } = ops
  // add settings
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(12, 25, 1),
    'shuffle': true,
    'unique': true,
    'minNumber':IntegerValue(0,0,1,0),
    'maxNumber': IntegerValue(10,10,1,10),
    'commas':BooleanValue(false)
  })
  var newContent = {}
  newContent[contentKey] = function() {
    var sobj = puzz.settings.object()
    return sampleFullSet(range(sobj.minNumber, sobj.maxNumber + 1), sobj.n, sobj.unique, sobj.shuffle);
  }
  puzz.content.addContent(newContent);
}

function AddDecimals(puzz, inputObject, ops) {
  const {
    contentKey = 'numbers'
  } = ops
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(12, 25, 1),
    'shuffle': true,
    'unique': true,
    'minNumber':IntegerValue(0,0,1,0),
    'maxNumber': IntegerValue(10,10,1,10),
    'decimalPlaces':IntegerValue(0,3,1,1)
  })
  var newContent = {}
  newContent[contentKey] = function() {
    var sobj = puzz.settings.object()
    return randomReals(sobj.minNumber,sobj.maxNumber,Math.pow(10,-sobj.decimalPlaces),sobj.n).map(x=>x.toFixed(sobj.decimalPlaces));
  }
  puzz.content.addContent(newContent);
}

function AddFractions(puzz, inputObject, ops) {
  const {
    contentKey = 'numbers'
  } = ops
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(12, 25, 1),
    'shuffle': true,
    'unique': true,
    'minNumber':IntegerValue(0,0,1,0),
    'maxNumber': IntegerValue(5,10,1,5),
    'fractions':EnumeratedValue(['sameDenom','sameTop','any'])
  })
  var newContent = {}
  newContent[contentKey] = function() {
    var sobj = puzz.settings.object()
    return randomFractionPair(sobj.minNumber,sobj.maxNumber,sobj.fractions,true,sobj.n);
  }
  puzz.content.addContent(newContent);
}

function AddSymbols(puzz, inputObject, ops) {
  const {
    contentKey = 'symbols'
  } = ops
  // add settings
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(10, 20, 1),
    'maxNumber': 10
  })

  var newContent = {}
  newContent[contentKey] = () => randomSample(allSymbols(), puzz.settings.value('n'))
  puzz.content.addContent(newContent);
}


/* this is wrong, need to fix eventually */
function AddMixedSet(puzz, inputObject, ops = {}) {
  const {
    contentKey = 'elements'
  } = ops
  puzz.settings.addControls(inputObject, {
    'n': IntegerValue(2, 6, 1),
    'maxWordLength': IntegerValue(4, 6, 1),
    'theme': undefined,
    'caseness': EnumeratedValue(['UpperCase', 'LowerCase', 'Capitalize', 'Random']),
    'maxNumber': 10
  })

  var newContent = {}
  var ct = puzz.settings.value('contentType')
  if (ct.includes('words')) {
    newContent['categoryAndWords'] = () => randomObjectValues(
      wordGroups(),
      puzz.settings.value('theme'),
      (w) => (w.length <= puzz.settings.value('maxWordLength')),
      puzz.settings.value('n'), true, true
    )
    newContent['theme'] = () => puzz.content.value('categoryAndWords')[0]
    newContent['words'] = () => puzz.content.value('categoryAndWords')[1]
  }
  if (ct.includes('letters')) {
    newContent['letters'] = () => randomSample(allLetters(), puzz.settings.value('n'))
  }
  if (ct.includes('numbers')) {
    newContent['numbers'] = () => randomSample(range(0, puzz.settings.value('maxNumber')), puzz.settings.value('n'))
  }
  if (ct.includes('symbols')) {
    newContent['symbols'] = () => randomSample(allSymbols(), puzz.settings.value('n'))
  }
  newContent[contentKey] = () => randomSample(
    flatten(
      puzz.content.value(puzz.settings.value('contentType'))
    ),
    puzz.settings.value('n')
  )
  puzz.content.addContent(newContent);
}


//////////////////////////////////

class VariableValue {
  constructor(val) {
    this.type = undefined;
    this.default = val;
  }
  sample() {};
  sampleSubset(set, n, shuffle, unique) {
    if (shuffle == false) {
      return set.slice(0, n);
    } else if (unique && (set.length >= n)) {
      return randomSample(set, n);
    } else {
      return randomChoice(set, n);
    }
  }
}

function EnumeratedValue(possibleValues, val) {
  const sett = new VariableValue(val);
  sett.type = 'Enumerated';
  sett.possibleValues = possibleValues;
  sett.sample = () => randomSample(sett.possibleValues);
  return sett;
};

function BooleanValue(val) {
  const sett = new VariableValue(val);
  sett.type = 'Boolean';
  sett.possibleValues = [true, false];
  sett.sample = () => randomSample(sett.possibleValues);
  return sett;
};

function IntegerValue(min = 1, max = 4, inc = 1, val) {
  const sett = new VariableValue(val);
  sett.type = 'Integer';
  sett.min = min;
  sett.max = max;
  sett.inc = inc;
  sett.initial = val
  sett.sample = () => randomSample(range(sett.min, sett.max + 1, sett.inc));
  return sett;
};

function FontSizeValue(val) {
  return IntegerValue(10, 50, 1, val);
}

function FullSetValue(fullSetFunction, val) {
  const sett = new VariableValue(val);
  sett.type = 'FullSet';
  sett.fullSet = fullSetFunction;
  sett.sample = () => randomSample(sett.fullSet());
  return sett;
};

function SampledValue(samplingFunction, val) {
  const sett = new VariableValue(val);
  sett.type = 'Sampled';
  sett.sample = () => samplingFunction();
  return sett;
};




/*
    SELECT MENU
*/
function selectMenuElement(id, name, settingObject,settOrLay='settings') {
  var controllerId = id + ((settOrLay==='settings')?'Setting':'Layout') + name;
  var menu = $('<select></select>',{
    'id':controllerId
  });
  menu.change(function() {
    var puzzle = Puzzle.allPuzzles[id];
    // update settings object
    var newVal = $('#' + controllerId).val();
    /* annoying sanitizer because can't figure out how to get the
     select menu to leave true/false as non-strings */
    if (newVal === 'true') {
      newVal = true
    } else if (newVal === 'false') {
      newVal = false
    }
    if (settOrLay==='settings') {
      puzzle.settings.update(name, newVal, false)
      $('#Random'+controllerId).text('')
        puzzle.refresh();
    } else if (settOrLay==='layout') {
      puzzle.layout.update(name, newVal, false)
      puzzle.redraw();
    }
  });
  var selectedBool
  settingObject.choices.possibleValues.forEach(function(val, ind) {
    menu.append($("<option></option>", {
      value: val,
      text: val,
      selected: (val==settingObject.value)?true:false
    }));
  });

  var wrapper = $("<div></div>",{'id':'Wrapper'+controllerId,'class':'controlRow'});
  wrapper.append(name + " ");

  if (settingObject.random===true) {
    var randy = $('<span></span>',{'text':'?','id':'Random'+controllerId})
    randy.css({'font-size':'16','color':'orange'})
    wrapper.append(
      $('<div></div>',{'class':'flexElement'}).append(randy).append(menu)
    );
    $('#Random'+controllerId).text('?')
  } else {
    wrapper.append(menu)
  }


  return wrapper;
};



/*
    NUMBER INPUT
*/
function numberInputElement(valueObject, id, settingObject,name, settOrLay) {
  var controllerId = id + 'Setting' + name;
  var inputField = $("<input />", {
    type: "number",
    value: settingObject.value,
    name: valueObject.name,
    id:controllerId,
    class: "numElements",
    step: "1"
  });
  inputField.change(function() {
    var puzzle = Puzzle.allPuzzles[id];
    let newVal = $('#' + controllerId).val();
    newVal = isNaN(newVal)?newVal:parseFloat(newVal);
    if (settOrLay==='settings') {
      puzzle.settings.update(name, newVal, false)
      // $('#Wrapper'+controllerId).css({'background-color':"rgba(0, 0, 0, 0)"});
      $('#Random'+controllerId).text('')
      puzzle.refresh();
    } else {
      puzzle.layout.update(name, newVal, false)
      puzzle.redraw();
    }
  });

  var wrapper = $("<div>",{'id':'Wrapper'+controllerId,'class':'controlRow'});
  wrapper.append(name + " ");

  if (settingObject.random===true) {
    var randy = $('<span>',{'text':'?','id':'Random'+controllerId})
    randy.css({'font-size':'16','color':'orange'})
    wrapper.append(
      $('<div>',{'class':'flexElement'}).append(randy).append(inputField)
    );
    $('#Random'+controllerId).text('?')
  } else {
    wrapper.append(inputField)
  }

  return wrapper;
};



/*
    TEXT INPUT
*/
function textInputElement(controlObject, id, settingObject) {
  var myId = controlObject.elementId(id);
  var inputField = $("<input />", {
    type: "text",
    value: controlObject.initial,
    id: myId,
    name: controlObject.name,
    class: "numElements"
  });
  inputField.change(function() {
    var puzzle = Puzzle.allPuzzles[id];
    settingObject[controlObject.field] = $("#" + myId).val();
    if (controlObject.changeContent) {
      puzzle.updateAll();
    };
    puzzle.updateDisplay($("#" + myId).val());
  });
  var wrapper = $("<div></div>");
  wrapper.append(controlObject.name + " ");
  return wrapper.append(inputField);
};





/*
    CHECKBOX
*/
function checkboxInputElement(controlObject, id, settingObject) {
  var myId = controlObject.elementId(id);
  var inputField = $("<input />", {
    type: "checkbox",
    value: controlObject.initial,
    id: myId,
    name: controlObject.name,
    class: "numElements"
  });
  inputField.change(function() {
    var puzzle = Puzzle.allPuzzles[id];
    settingObject[controlObject.field] = $("#" + myId).val();
    if (controlObject.changeContent) {
      puzzle.updateAll();
    };
    puzzle.updateDisplay($("#" + myId).val());
  });
  var wrapper = $("<div></div>");
  wrapper.append(controlObject.name + " ");
  return wrapper.append(inputField);
};
