function getSelectedOptionName(selectID) {
  const el = document.getElementById(selectID);
  const ind = el.selectedIndex;
  return el.options[ind].value;
}

var formatPar

function makeEWS() {
  document.getElementById("menubar").style.display = "none";
  document.getElementById("chooser").style.display = "none";
  document.getElementById("questionsOne").style.display = "none";
  document.getElementById("questionsAll").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById('questionCount').style.display = 'flex'

  const numAsks = parseInt(document.getElementById("numAsks").value);
  const questionsSelected = document.querySelectorAll(`input:checked`);
  let qname,
    qst,
    allSelected = [];
  for (let i = 0; i < questionsSelected.length; i++) {
    if (questionsSelected[i].name.length > 0) {
      const boxidarr = questionsSelected[i].id.split("-");
      allSelected.push(boxidarr.slice(boxidarr.length - 2).join("-"));
    }
  }
  if (allSelected.length == 0) {
    var questionIDs = Object.keys(Question.all);
    allSelected = flatten(questionIDs.map(x => Array(numAsks).fill(x)));
  }
  allSelected = randomSample(allSelected, numAsks);
  console.log(allSelected)
  Question.loaded = [];
  Question.allSelected = allSelected;
  const showAll = (formatPar || getSelectedOptionName("format")) === "all";
  if (showAll) {
    allSelected.map((qid) => {
      qst = Question.create(...Question.all[qid]["args"]);
      // qst.generate();
      Question.loaded.push(qst.id);
      writeQuestionForAll("wrapper-all", qst);
    });
    document.getElementById("questionsAll").style.display = "flex";
  } else {
    const qid = allSelected[0];
    qst = Question.create(...Question.all[qid]["args"]);
    // qst.generate()
    Question.loaded.push(qst.id);
    writeOneQuestionForOne(qst);
    document.getElementById("input-one").onkeypress = (e) =>
      checkInput(e, null);
    document.getElementById("questionsOne").style.display = "flex";
    document.getElementById('input-one').focus();
  }
}

function selectorCheckboxRow(
  text,
  subselectRest,
  nameMe = true,
  idPrefix,
  fullLabel
) {
  const wrapper = document.createElement("DIV");
  Object.assign(wrapper.style, {
    "align-items": "center",
  });
  const box = document.createElement("INPUT");
  box.classList.add("selectBox");
  box.setAttribute("type", "checkbox");
  if (nameMe) {
    box.setAttribute("name", text);
  }
  box.id = "checkbox-" + subselectRest;
  box.addEventListener("click", () => {
    toggleCheckboxFunction(box.id, `[id^='checkbox-${subselectRest}']`)();
    const numSelected = document.querySelectorAll(".questionCheckbox:checked")
      .length;
    // document.getElementById('numSelectedQ').style['padding-left'] =
    //   (3 - String(numSelected).length)+'em';
    document.getElementById("numSelectedQ").innerHTML = numSelected;
  });
  const name = document.createElement("DIV");
  name.id = idPrefix + "-click-" + subselectRest;
  name.innerHTML = text.toUpperCase();
  wrapper.appendChild(box);
  wrapper.appendChild(name);
  name.click();
  return wrapper;
}

function addChildVisibilityToggler(trail, topPrefix) {
  const label = trail.join("-");
  document
    .getElementById("subheader-click-wrapper-" + label + "-")
    .addEventListener("click", () => {
      const kids = document.getElementById(topPrefix + label).childNodes;
      let newState, oldState;
      if (kids[0] === undefined) {
        return null;
      }
      oldState = kids[0].style.display;
      newState = oldState == "none" ? "flex" : "none";
      for (let i = 0; i < kids.length; i++) {
        kids[i].style.display = newState;
      }
    });
}

function toggleCheckboxFunction(boxID, selector) {
  return () => {
    const allCBs = document.querySelectorAll(selector);
    const state = document.getElementById(boxID).checked;
    for (var ix = 0; ix < allCBs.length; ix++) {
      allCBs[ix].checked = state;
    }
  };
}

function toggleAllQuestions() {
  const clickableThings = document.querySelectorAll('[id^="subheader-click-wrapper-"]');
  for (var i = 0; i < clickableThings.length; i++) {
    if (clickableThings[i].id.split('-').length > 6) {
      clickableThings[i].click()
    }
  }
}

function writeOneQuestionForOne(qst) {
  // clear old question
  document.getElementById("output-one").innerHTML = "";
  document.getElementById("result-one").innerHTML = "";
  document.getElementById("input-one").innerHTML = "";
  document.getElementById("inputWrapper-one").style["border-color"] = "black";

  document.getElementById(
    "questionCount"
  ).innerHTML = `Question: ${Question.loaded.length}/${Question.allSelected.length}`;
  document.getElementById("output-one").appendChild(qst.makeElement());
}

function writeQuestionForAll(parentID, qst) {
  const parent = document.getElementById(parentID);
  const questionWrapper = document.createElement("DIV");
  questionWrapper.classList.add("questionContainer");
  questionWrapper.id = `question-${qst.id}`;
  qst.questionID = questionWrapper.id;

  const output = document.createElement("DIV");
  const inner = qst.makeElement();
  inner.classList.remove("questionContainer");
  inner.classList.add("questionContainerPart");
  output.appendChild(inner);
  output.classList.add("output");
  output.id = `output-${qst.id}`;
  qst.outputID = output.id;

  const input = inputElement(qst);

  const scroll = document.createElement("DIV");
  scroll.id = `scrollAnchor-${qst.id}`;

  questionWrapper.appendChild(output);
  questionWrapper.appendChild(input);
  questionWrapper.appendChild(scroll);
  parent.appendChild(questionWrapper);
}

function inputElement(qst) {
  const inputWrapper = document.createElement("DIV");
  inputWrapper.classList.add("input");
  inputWrapper.id = `inputWrapper-${qst.id}`;

  const caret = document.createElement("DIV");
  caret.innerHTML = ">";
  caret.classList.add("caret");

  const input = document.createElement("DIV");
  input.classList.add("inputField");
  input.contentEditable = true;
  input.id = `input-${qst.id}`;
  qst.inputID = input.id;
  input.onkeypress = (e) => checkInput(e, qst);

  inputWrapper.appendChild(caret);
  inputWrapper.appendChild(input);
  return inputWrapper;
}

function checkInput(e, qst) {
  var code = e.which;
  let txt;
  if (code === 13) {
    e.preventDefault(); // no newline
    if (qst === null) {
      qst = Question.all[Question.loaded[Question.loaded.length - 1]];
      txt = document.getElementById(`input-one`).innerText;
    } else {
      txt = document.getElementById(`input-${qst.id}`).innerText;
    }
    if (txt.length > 0) {
      processInput(txt, qst);
    }
  }
}

function processInput(textInput, qst) {
  // check answer
  const result = qst.checkAnswer(textInput);
  const showAll = (formatPar || getSelectedOptionName("format")) === "all";
  const showOne = !showAll;

  qst.correct = result;
  var idpost, nextID;
  if (showAll) {
    idpost = qst.id;
    const myIDpos = Question.loaded.indexOf(qst.id);
    nextID = Question.loaded[myIDpos + 1];
  } else {
    idpost = "one";
    nextID = (Question.loaded.length < Object.keys(Question.allSelected).length) ? true : undefined;
  }

  if (result === false && qst.attemptNumber < qst.allowedAttempts) {
    document.getElementById(`inputWrapper-${idpost}`).style["border-color"] =
      "orange";
    qst.attemptNumber++;
    return null;
  }


  // disable editing
  document.getElementById(`input-${idpost}`).contentEditable = false;

  document.getElementById(`inputWrapper-${idpost}`).style[
    "border-color"
  ] = result ? "lawngreen" : "red";

  var focus = true;
  if (nextID != undefined) {
    setTimeout(() => {
      if (showAll) {
        if (focus) {
          document.getElementById(`input-${nextID}`).focus();
        }
        if (scroll) {
          document
            .getElementById(`scrollAnchor-${nextID}`)
            .scrollIntoView(false);
        }
      } else if (showOne) {
        const qid = Question.allSelected[Question.loaded.length];
        if (qid == undefined) {
          // ALL DONE
        } else {
          // NEXT QUESTION
          if (qid.slice(0, 2) == 'q-') {
            qst = Question.create(...Question.all[qid]["args"]);
          } else {
            qst = Question.create(qid);
          }
          Question.loaded.push(qst.id);
          writeOneQuestionForOne(qst);
          document.getElementById(`input-${idpost}`).contentEditable = true;
          document.getElementById(`input-${idpost}`).focus();
        }
      }
    }, 1000);
  } else {
    const resArray = Question.loaded.map((x) => Question.all[x].correct);
    const numCorrect = resArray.filter((x) => x == true).length;
    const resultText = `
        Questions: ${resArray.length}<br>
        Correct: ${numCorrect}<br>
        Result: ${Math.round((100 * numCorrect) / resArray.length)}%
      `;
    let resultContainer;
    if (showAll) {
      resultContainer = document.getElementById("result-all");
    } else if (showOne) {
      document.getElementById("output-one").style.display = "none";
      document.getElementById("inputWrapper-one").style.display = "none";
      document.getElementById("result-one").style.display = "flex";
      resultContainer = document.getElementById("result-one");
    }
    resultContainer.innerHTML = resultText;
    resultContainer.style.display = 'flex';

  }
}

function parseQuestionString(str) {
  const split = str.split("-");
  let cat, subcat, subsubcat, name;
  if (split.length < 3) {
    [cat, subcat, subsubcat, name] = [null, null, null, null];
  } else if (split.length === 3) {
    [cat, subcat, subsubcat, name] = [split[0], split[1], "other", split[2]];
  } else if (split.length === 4) {
    [cat, subcat, subsubcat, name] = split;
  }
  return [cat, subcat, subsubcat, name];
}

function buildQuestionsTree(tree, item, trail) {
  // define empty array if necessary to detph
  let ind = 0;
  const leaf = trail.reduce((obj, prop) => {
    ind += 1;
    if (obj[prop] === undefined) {
      if (ind == trail.length) {
        obj[prop] = [];
      } else {
        obj[prop] = {};
      }
    }
    return obj[prop];
  }, tree);
  // put in the value
  if (!(leaf instanceof Array)) {
    if (leaf.other === undefined) {
      leaf.other = [];
    }
    leaf.other.push(item);
  } else {
    leaf.push(item);
  }
}

function registerQuestionType(tree, questionString, questionCall) {
  const split = questionString.split("-");
  const n = split.length;
  let trail = split.slice(0, n - 1);
  if (trail.length < 2) {
    return null;
  }
  while (trail.length < 3) {
    trail.push("other");
  }
  const name = split[n - 1];
  if (trail.length > 0) {
    buildQuestionsTree(tree, questionCall || questionString, trail);
  }
}

function traverseQuestionsTree(arg, branchFunction, leafFunction, trail = []) {
  branchFunction(arg, trail);
  if (typeof(arg) == 'string') {
    leafFunction([arg, {}], trail);
  } else if (arg instanceof Array) {
    if (arg[0] instanceof Array || typeof(arg[1]) == 'string') {
      arg.map((x) => {
        leafFunction(x, trail);
      })
    } else {
      leafFunction(arg, trail);
    }
  } else if (arg instanceof Object) {
    for (const key in arg) {
      traverseQuestionsTree(
        arg[key],
        branchFunction,
        leafFunction,
        trail.concat([key])
      );
    }
  }
}

function addQuestionGroupItem(item, [cat, subcat, subsubcat]) {
  if (questionsGroups[cat] == undefined) {
    questionsGroups[cat] = {};
  }
  if (questionsGroups[cat][subcat] == undefined) {
    questionsGroups[cat][subcat] = {};
  }
  if (questionsGroups[cat][subcat][subsubcat] == undefined) {
    questionsGroups[cat][subcat][subsubcat] = {};
  }
  questionsGroups[cat][subcat][subsubcat].push(item);
}

function questionLevelContainer(shortLabel, longLabel, headerClass, topPrefix) {
  const wrapper = document.createElement("DIV");
  wrapper.id = "wrapper-" + longLabel;
  wrapper.classList.add("flexWide");
  Object.assign(wrapper.style, {
    margin: ".5mm 3mm",
  });
  const labelSplit = shortLabel.split('$$');

  const header = selectorCheckboxRow(
    `${labelSplit[0]}`,
    "wrapper-" + longLabel + "-",
    false,
    "subheader",
    longLabel
  );
  header.id = "header-" + longLabel;
  header.classList.add(headerClass);

  if (labelSplit[1] != undefined) {
    const subtext = document.createElement('DIV');
    subtext.innerHTML = labelSplit[1];
    subtext.classList.add('subtext');
    header.appendChild(subtext)
  }

  const subwrapper = document.createElement("DIV");
  subwrapper.id = topPrefix + longLabel;
  subwrapper.classList.add("subheader");
  // Object.assign(subwrapper.style,{margin:'.5mm 3mm'})

  wrapper.appendChild(header);
  wrapper.appendChild(subwrapper);

  return [wrapper, subwrapper];
}

var questionsGroups;

function fullQuestionTree() {
  if (questionsGroups == undefined) {
    questionsGroups = {
      language: {
        letters: {
          ordering: {},
          comparing: {},
        },
        reading: {},
        spelling: {},
      },
      math: {
        counting: {
          images: {},
          ones: {},
        },
        numbers: {
          "whole numbers": {},
          negatives: {},
          integers: {},
          fractions: {},
          decimals: {},
        },
        addition: {},
        subtraction: {},
        multiplication: {},
        "place value": {},
      },
    };
  }


  Object.keys(Question.Bundle).forEach((bundle) => {
    let splitbundle = bundle.split("-");
    Object.keys(Question.Bundle[bundle]).map((descr) => {
      const newBundle = splitbundle.concat([descr, ""]).join("-");
      let quests = Question.Bundle[bundle][descr];
      if (typeof quests[0] === "string") {
        quests = [quests];
      }
      quests.map((arr) => {
        registerQuestionType(questionsGroups, newBundle, arr);
      });
    });
  });

  // Object.keys(Question.Types).forEach(x => {
  //   registerQuestionType(questionsGroups, x)
  // })

  return;
}
//
// function buildAllLinkHTML(el,val,prefix='~',level=0) {
//   if (val instanceof Array) {
//
//   } else {
//
//   Array(level).fill('~').join('') +
//   }
//
//
// }


function pickFirst(arr1, arr2) {

}

function pickAll(vals, mask, patt) {

}

function clearQuestions(n) {
  document.getElementById("subheader-" + n.toString() + '-').remove();
}

function addQuestionHolder(n) {
  const newDiv = document.createElement('div')
  newDiv.id = 'subheader-' + n.toString() + '-'
  document.getElementById('chooser').appendChild(newDiv)
}
