class Equation {
  constructor(ops={}) {
    this.termRanges = ops.termRanges || [[0,10],[0,10]];
    this.answerRange = ops.answerRange || [0,10000];
    this.maxAttempts = ops.maxAttempts || 200;
    this.sign = ops.sign || '+';
    this.carrying = ops.carrying
    this.differenceRange = ops.differenceRange || null;
    this.shuffle = ops.shuffle;
    this.samplingMethod =  ops.samplingMethod || "simultaneous";
    this.blank = ops.blank || "c"; // a, b, c, any

    let valid, a, b, c;

    for (var ix = 0; ix < this.maxAttempts; ix++) {
      [a, b, c] = this.sampleEquationTerms();
      valid = this.isValid(a, b, c);
      if (valid === true) {
        [a, b, c] = this.shuffleEquationTerms(a, b, c);
        ix = this.maxAttempts + 2;
      }
    }

    if (this.blank === "a") {
      this.blankPosition = 0;
    } else if (this.blank === "b") {
      this.blankPosition = 2;
    } else if (this.blank === "c") {
      this.blankPosition = 4;
    } else if (this.blank === "ab") {
      this.blankPosition = randomSample([0, 2]);
    } else if (this.blank === "any") {
      this.blankPosition = randomSample([0, 2, 4]);
    }

    this.equationArray = [a, this.sign, b, "=", c];
    this.a=a;
    this.b=b;
    this.c=c;
    var blankReplacement = [this.blankPosition, "?"];
    this.blanks = [blankReplacement];
    this.answer = this.equationArray[this.blankPosition];

    if (ix === this.maxAttempts) {
      console.log("could not find valid arithmetic problem from");
      console.log(a, b, c, this.sign);
      console.log(this);
      console.log(this.termRanges, this.answerRange);
    }
  }

  sampleEquationTerms() {
    let ax, bx, cx;
    if (this.samplingMethod === "simultaneous") {
      ax = randomInteger(...this.termRanges[0]);
      bx = randomInteger(...this.termRanges[1]);
      cx = this.arithmeticEval(ax, bx, null, this.sign, "c");
    } else if (this.samplingMethod === "cFirst") {
      cx = randomInteger(...this.answerRange);
      bx = randomInteger(...this.termRanges[1]);
      ax = this.arithmeticEval(null, bx, cx, this.sign, "a");
    }
    return [ax, bx, cx];
  }
  shuffleEquationTerms(a, b, c) {
    if (this.shuffle) {
      if (this.sign === "+" || this.sign === "*") {
        if (randomChoice([true, false])) {
          [a, b] = [b, a];
        }
      } else if (this.sign === "-" || this.sign === '/') {
        if (randomChoice([true, false])) {
          [b, c] = [c, b];
        }
      }
    }
    return [a, b, c];
  }
  arithmeticEval(a, b, c, sign, solveFor = "c") {
    if (solveFor === "c") {
      if (sign === "+") {
        return a + b;
      } else if (sign === "-") {
        return a - b;
      } else if (sign === "*" || sign === "&times;") {
        return a * b;
    } else if (sign === "/" || sign === "&divide") {
      return a / b;
    }

    } else if (solveFor === "a") {
      if (sign === "+") {
        return c - b;
      } else if (sign === "-") {
        return c + b;
      } else if (sign === "*" || sign === "&times;") {
        return c / b;
      } else if (sign === "/" || sign === "&divide") {
        return c * b;
      }
    }
  }
  isValid(a, b, c) {
    const allInts =
      Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c);
    const termsBool =
      this.termRanges[0][0] <= a &&
      a <= this.termRanges[0][1] &&
      this.termRanges[1][0] <= b &&
      b <= this.termRanges[1][1];
    const ansBool =
      this.answerRange === null
        ? true
        : this.answerRange[0] <= c && c <= this.answerRange[1];
    const diffBool =
      this.differenceRange === null
        ? true
        : this.differenceRange[0] <= a - b && a - b <= this.differenceRange[1];
    let carryBool;
    if (this.carrying != "maybe" && (this.sign === "+" || this.sign === "-")) {
      const maxLength = Math.max(
        String(a).length,
        String(b).length,
        String(c).length
      );
      var adigs = constantVector(0, maxLength - String(a).length).concat(
        Array.from(String(a), Number)
      );
      var bdigs = constantVector(0, maxLength - String(b).length).concat(
        Array.from(String(b), Number)
      );
      var cdigs = constantVector(0, maxLength - String(c).length).concat(
        Array.from(String(c), Number)
      );
      var usesCarrying = false;
      for (var i = 0; i < adigs.length; i++) {
        if (this.sign === "+") {
          usesCarrying = adigs[i] + bdigs[i] > 9;
        } else if (this.sign === "-") {
          usesCarrying = adigs[i] - bdigs[i] < 0;
        } else {
          cond = false;
        }
        if (usesCarrying) {
          i = adigs.length + 2;
        }
        if (carryBool) {
          i = adigs.length + 1;
        }
      }
      if (this.carrying === "no") {
        carryBool = !usesCarrying;
      } else if (this.carrying === "yes") {
        carryBool = usesCarrying;
      }
    } else {
      carryBool = true;
    }
    return allInts && termsBool && ansBool && diffBool && carryBool;
  }
}

//
// ARITHMETIC
//
class QuestionArithmetic extends Question {
  constructor(defaults = {}, userOps = {}) {
    super(
      Object.assign(
        {
          maxAttempts: 200,
          sign: "+",
          carrying: "maybe",
          differenceRange: null,
          answerRange: [0, 10000],
          shuffle: true,
          termRanges: [
            [0, 10],
            [0, 10],
          ],
          samplingMethod: "simultaneous",
          blank: "c", // a, b, c, any
          format: "horizontal", // horizontal, vertical, word
          showParentheses: true,
          symbolicUnknown: false,
          equationCSS: {},
          equationTermCSS: {},

        },
        defaults,
        userOps
      ),
      userOps
    );
    if (this.sign=='+'){
      this.addTags('addition')
    }
    // eqArray = [val, sign, val, sign, ...], e.g. [2,+,4,-,1,=5],
    // blanks = [[position,replacement]..], e.g. [ [0,'_'],[4,'?']]
    // parens = [ [left,right]..], e.g. [ [1,3], [5,7]]
    // this.generate();
  }
  setAnswer() {
    this.answer = this.eqn.answer;
  }
  setContent() {
    let valid, a, b, c;
    this.eqn = new Equation(this);
    if (this.format === "word") {
      this.names = randomSample(namesList(), 3);
      this.things = randomSample(thingList(), 1);
    } else if (this.format === "image") {
      this.image = randomSample(imageNames());
      if (this.blank=='c') {
      this.prompt = `How many ${imageNameFromFileName(
        this.image
      )} pictures total are shown below?`;
    } else {
      this.prompt = `How many ${imageNameFromFileName(
        this.image
      )} pictures are missing?`
    }
  }
  }
  makeContentElement() {
    if (this.format === "vertical") {
      return this.elementVertical();
    } else if (this.format === "horizontal") {
      return this.elementHorizontal();
    } else if (this.format === "word") {
      return this.elementWordProblem();
    } else if (this.format === "image") {
      return this.elementImageProblem();
    }
  }
  elementWordProblem() {
    var element = document.createElement("DIV");
    this.addClass(element, "content");
    const [a, sign, b, equalSign, c] = this.eqn.equationArray;
    // different structure for +, -, * and which is the unknown
    const { names, things } = this;

    // PLUS +
    if (sign == "+" && this.blank == "c") {
      element.innerHTML = `${names[0]} has ${pluralize(a, things[0])}.
        ${names[1]} has ${pluralize(b, things[0])}.
       How many ${pluralize(2, things[0], false)} are there total?`;
    } else if (sign == "+" && this.blank != "c") {
      const known = this.blankPosition == 0 ? b : a;
      element.innerHTML = `${names[0]} has ${pluralize(
        known,
        things[0]
      )}, but needs to have
     ${c}.  How many more ${pluralize(2, things[0], false)} does ${
        names[0]
      } need?`;

    // MINUS -
    } else if (sign == "-" && this.blank == "c") {
      element.innerHTML = `${names[0]} has ${pluralize(a, things[0])}, and
        gives ${b} away to ${names[1]}.  How many does ${names[0]}
        have left?`;
      } else if (sign == "-" && this.blank == "b") {
        element.innerHTML = `${names[0]} has ${pluralize(a, things[0])}, but wants to have ${c}.  How many ${pluralize(2,things[0],false)} does ${names[0]} need to get rid of?`;

    // TIMES *
    } else if (sign == "*" && this.blank == "c") {
      element.innerHTML = `${names[0]} has ${a} boxes of ${pluralize(
        2,
        things[0],
        false
      )}.  Each box contains
      ${pluralize(b, things[0])}.  How many total ${pluralize(
        2,
        things[0],
        false
      )} does ${names[0]} have?`;
    } else if (sign == "*" && this.blank != "c") {
        element.innerHTML = `${names[0]} is buying boxes containing ${a} ${pluralize(
          2,
          things[0],
          false
        )} each.  If ${names[0]} needs  ${pluralize(c, things[0])} total, how many boxes should ${names[0]} buy?`;

    // DIVIDE /
  } else if (sign == "/" && this.blank == "c") {
    element.innerHTML = `${names[0]} is splitting ${a} ${pluralize(2,things[0], false)} into groups of ${b}.  How many
    groups will ${names[0]} end up with?`;
  } else if (sign == "/" && this.blank != "c") {
      element.innerHTML = `${names[0]} has ${a} ${pluralize(2,things[0], false)} and needs to break them up into ${c} groups.  How many
      ${pluralize(2, things[0],false)} should go in each group?`
    }

    return element;
  }
  elementImageProblem() {
    var aEl, bEl, cEl, blankEl, signEl, eqEl;
    const { names, image } = this;
    var element = document.createElement("DIV");
    this.addClass(element, "content");
    this.addCSS(element, { "justify-content": "center" });
    const [a, sign, b, equalSign, c] = this.eqn.equationArray;

    const leaveBlank = (this.blank=='ab')?(this.eqn.blankPosition==0?'a':'b'):this.blank;
    blankEl = this.createDIV(['imageMathOperator'],{width: "15%"},'?');

    signEl = this.createDIV(['imageMathOperator'],{},sign);
    eqEl = this.createDIV(['imageMathOperator'],{},equalSign);

    if (leaveBlank=='a') {
      aEl = blankEl;
    } else {
      aEl = makeImageElementRow(
        constantVector(this.image, a),
        40,
        { "background-color": "white", padding: "10px", margin: "10px" },
        { display: "flex", "flex-wrap": "wrap", "justify-content": "center",width: "35%"  }
      );
      }
    if (leaveBlank=='b') {
        bEl = blankEl;
    } else {
    bEl = makeImageElementRow(
      constantVector(this.image, b),
      40,
      { "background-color": "white", padding: "10px", margin: "10px" },
      { display: "flex", "flex-wrap": "wrap", "justify-content": "center",width: "35%"  }
    );
  }
    if (leaveBlank=='c') {
        cEl = blankEl;
    } else {
    cEl = makeImageElementRow(
      constantVector(this.image, c),
      40,
      { "background-color": "white", padding: "10px", margin: "10px" },
      { display: "flex", "flex-wrap": "wrap", "justify-content": "center",width: "35%"  }
    );
  }

    element.appendChild(aEl);
    element.appendChild(signEl);
    element.appendChild(bEl);
    element.appendChild(eqEl);
    element.appendChild(cEl);
    return element;
  }
  elementHorizontal() {
    const symbolChar = randomChoice(
      range(9728, 9734 + 1, 1)
        .concat(range(9812, 9831 + 1, 1))
        .map((x) => "&#" + x + ";"),
      1
    )[0];
    var eqn = document.createElement("DIV");
    // this.addCSS(eqn, this.equationCSS)
    this.addClass(eqn, "content");
    var eqnArray = this.eqn.equationArray;
    this.eqn.blanks.forEach((x) => {
      eqnArray[x[0]] = this.symbolicUnknown ? symbolChar : x[1];
    });
    eqnArray.forEach((x) => {
      eqn.appendChild(this.oneEquationTerm(x, this.showParentheses));
    });
    if (this.symbolicUnknown) {
      Object.assign(eqn.style, { width: "auto" });
      Object.assign(eqn.style, { border: "solid gray 1px" });
      const el = document.createElement("DIV");
      el.classList.add("content");
      Object.assign(el.style, { "align-items": "baseline" });
      const left = document.createElement("DIV");
      left.innerHTML = "If&nbsp;";
      const right = document.createElement("DIV");
      right.innerHTML = `&nbsp;then ${symbolChar} = ?`;
      el.appendChild(left);
      el.appendChild(eqn);
      el.appendChild(right);
      return el;
    } else {
      return eqn;
    }
  }
  elementVertical() {
    var newCSS = {
      display: "block",
      'margin-left':'40%'
    };
    var eqnArray = this.eqn.equationArray;
    const eqStrs = eqnArray.map((x) => String(x));
    const nn = eqStrs.length;
    // remove '___' from end for vertical
    var underscoresPatt = RegExp("_+");
    if (underscoresPatt.test(eqStrs[nn - 1])) {
      eqStrs[nn - 1] = "";
    }
    const strLens = eqStrs.map((x) => x.length);
    const len = Math.max(
      Math.max(...strLens.slice(1, strLens.length - 1)) + 1,
      2
    );
    Object.assign(newCSS, {
      width: len + "em",
    });

    var eqn = document.createElement("DIV");
    this.addClass(eqn, "equation");
    this.addClass(eqn, "content");
    this.addCSS(eqn, newCSS);

    var rows = [];
    var topRow = document.createElement("DIV");
    topRow.innerHTML =
      constantVector("&nbsp;", 1 + len - strLens[0]).join("") + eqStrs[0];
    this.addCSS(topRow, newCSS);
    rows.push(topRow);
    for (var ix = 1; ix < (nn - 1) / 2; ix++) {
      var el = document.createElement("DIV");
      el.innerHTML =
        (ix === (nn - 1) / 2 - 1 ? eqStrs[2 * ix - 1] : "&nbsp;") +
        constantVector("&nbsp;", len - strLens[2 * ix]).join("") +
        eqStrs[2 * ix];
      this.addCSS(el, newCSS);
      rows.push(el);
    }
    var bottomRow = document.createElement("DIV");
    bottomRow.innerHTML =
      (ix === (nn - 1) / 2 - 1 ? eqStrs[2 * ix - 1] : "&nbsp;") +
      constantVector("&nbsp;", len - strLens[2 * ix]).join("") +
      eqStrs[2 * ix];
    this.addCSS(bottomRow, newCSS);
    rows.push(bottomRow);
    this.eqn.blanks.forEach((x) => {
      var el = document.createElement("DIV");
      el.innerHTML =
        (x[0] > 0 && x[0] < nn / 2 ? this.sign : "&nbsp;") +
        constantVector("?", len).join("");
      this.addCSS(el, newCSS);
      // this.addCSS(el, {
      //   'background': '#EEEEEE'
      // })
      rows[x[0] / 2] = el;
    });
    this.addCSS(rows[rows.length - 1], {
      "border-top": "solid 2px",
    });
    for (var ix = 0; ix < rows.length - 1; ix++) {
      eqn.appendChild(rows[ix]);
    }
    eqn.appendChild(rows[rows.length - 1]);
    return eqn;
  }
  oneEquationTerm(val, showParentheses = true) {
    var term = document.createElement("DIV");
    this.addClass(term, "equationTerm");
    if (val instanceof Array) {
      term.appendChild(
        this.oneEquationTerm((showParentheses ? "(" : "") + val[0])
      );
      val
        .slice(1, val.length - 1)
        .map((x) => term.appendChild(this.oneEquationTerm(x)));
      term.appendChild(
        this.oneEquationTerm(val[val.length - 1] + (showParentheses ? ")" : ""))
      );
    } else {
      if (typeof val === "number" && val < 0) {
        term.innerHTML = "-" + String(val).slice(1);
      } else {
        term.innerHTML =
          val === "*" ? "&times;" : val === "-" ? "&minus;" : val;
      }
    }
    return term;
  }
}

// defineQuestionType('math-editable-forward-hi',{questionName:'math-arithmetic',sign:'+',blank:'c',editable:['termRanges','answerRange']});

/*
  Core editable arithmetic
*/
defineQuestionType('math-arithmetic',{questionClass:QuestionArithmetic});
[
  ['addition-horizontal',{sign:'+'}],
  ['addition-vertical',{sign:'+',format:'vertical'}],
  ['addition-word',{sign:'+',format:'word'}],
  ['addition-image',{sign:'+',format:'image'}],
  ['addition-inverse',{sign:'+',blank:'ab'}],
  ['subtraction',{sign:'-'}],
  ['subtraction-inverse',{sign:'-',blank:'ab'}],
  ['multiplication',{sign:'*'}],
  ['multiplication-inverse',{sign:'*',blank:'ab'}],
].map(function([name,pars]) {
  // const edits = complement(['sign','blank','termRanges','answerRange','shuffle','carrying','differenceRange','format'],Object.keys(pars))
  const edits = ['sign','blank','termRanges','answerRange','shuffle','carrying','differenceRange','format'];
  defineQuestionType('math-arithmetic-'+name,{questionName:'math-arithmetic',editable:edits, ...pars});
})

defineQuestionType('math-forwardAddition',{questionName:'math-arithmetic',sign:'+',blank:'c'});
defineQuestionType('math-forwardMultiplication',{questionName:'math-arithmetic',sign:'*',blank:'c'});
defineQuestionType('math-forwardSubtraction',{questionName:'math-arithmetic',sign:'-',blank:'c'});
defineQuestionType('math-imageAdditionInverse',{questionName:'math-arithmetic',sign:'+',blank:'ab',format:'image',answerRange:[2,8],termRanges:[[1,7],[1,7]]});

[5, 10, 20, 50, 100, 1000].map((x) => {
  defineQuestionType(
    `math-addition-whole numbers-Addition of whole numbers up to ${x}+${x}`,
    {
      questionName: "math-forwardAddition",
      answerRange: [0, 2 * x],
      termRanges: [
        [0, x],
        [0, x],
      ],
    }
  );
  defineQuestionType(
    `math-subtraction-whole numbers-Subtracting whole numbers from up to ${x}`,
    {
      questionName: "math-forwardSubtraction",
      answerRange: [0, 2 * x],
      termRanges: [
        [0, x],
        [0, x],
      ],
    }
  );
  defineQuestionType(
    `math-addition-whole numbers-Inverse addition of whole numbers up to ${x}+${x}`,
    {
      questionName: "math-arithmetic",
      sign: "+",
      blank: "ab",
      answerRange: [0, 2 * x],
      termRanges: [
        [0, x],
        [0, x],
      ],
    }
  );
  defineQuestionType(
    `math-subtraction-whole numbers-Inverse subtraction of whole numbers from up to ${x}`,
    {
      questionName: "math-arithmetic",
      sign: "-",
      blank: "ab",
      answerRange: [0, 2 * x],
      termRanges: [
        [0, x],
        [0, x],
      ],
    }
  );

  defineQuestionType(
    `math-addition-negative numbers-Addition of negative integers up to &minus;${x}+&minus;${x}`,
    {
      questionName: "math-forwardAddition",
      answerRange: [-2 * x, 0],
      termRanges: [
        [-x, 0],
        [-x, 0],
      ],
    }
  );
  defineQuestionType(
    `math-subtraction-negative numbers-Subtracting negative integers from up to &minus;${x}`,
    {
      questionName: "math-forwardSubtraction",
      answerRange: [-2 * x, 0],
      termRanges: [
        [-x, 0],
        [-x, 0],
      ],
    }
  );
  defineQuestionType(
    `math-addition-negative numbers-Inverse addition of negative integers up to &minus;${x}+&minus;${x}`,
    {
      questionName: "math-arithmetic",
      sign: "+",
      blank: "ab",
      answerRange: [-2 * x, 0],
      termRanges: [
        [-x, 0],
        [-x, 0],
      ],
    }
  );
  defineQuestionType(
    `math-subtraction-negative numbers-Inverse subtraction of negative integers from up to &minus;${x}`,
    {
      questionName: "math-arithmetic",
      sign: "-",
      blank: "ab",
      answerRange: [-2 * x, 0],
      termRanges: [
        [-x, 0],
        [-x, 0],
      ],
    }
  );

  defineQuestionType(
    `math-addition-integers-Addition of integers from &minus;${x}+${x}`,
    {
      questionName: "math-forwardAddition",
      answerRange: [-2 * x, 2 * x],
      termRanges: [
        [-x, x],
        [-x, x],
      ],
    }
  );
  defineQuestionType(
    `math-subtraction-integers-Subtracting integers from &minus;${x} to ${x}`,
    {
      questionName: "math-forwardSubtraction",
      answerRange: [-2 * x, 2 * x],
      termRanges: [
        [-x, x],
        [-x, x],
      ],
    }
  );
  defineQuestionType(
    `math-addition-integers-Inverse addition of integers from &minus;${x}+${x}`,
    {
      questionName: "math-arithmetic",
      sign: "+",
      blank: "ab",
      answerRange: [-2 * x, 2 * x],
      termRanges: [
        [-x, x],
        [-x, x],
      ],
    }
  );
  defineQuestionType(
    `math-subtraction-integers-Inverse subtraction of integers from &minus;${x} to ${x}`,
    {
      questionName: "math-arithmetic",
      sign: "-",
      blank: "ab",
      answerRange: [-2 * x, 2 * x],
      termRanges: [
        [-x, x],
        [-x, x],
      ],
    }
  );
});

// function numberth(val) {
//   const strVal = String(val);
//   const lastDigit = strVal.slice(-1);
//   if (lastDigit == '1') {
//     return strVal + 'st';
//   } else if (lastDigit == '2') {
//     return strVal + 'nd';
//   } else if (lastDigit == '3') {
//     return strVal + 'rd';
//   } else {
//     return strVal + 'th';
//   }
// }

defineQuestionType(`math-positionInLineA`,{
    questionName: "math-forwardAddition",
    termRanges: [
      [5, 20],
      [5, 20],
    ],
    setup: (qst) => {
      qst.eqn = new Equation(qst);
      qst.prompt = `You are standing in a line. There are ${qst.eqn.equationArray[0]} people in front of you and
        ${qst.eqn.equationArray[2]} people behind you.  How many people total are in the line?`
      qst.answer= qst.eqn.a + qst.eqn.b + 1
    }
  });



defineQuestionType(`math-positionInLineB`,{
        questionName: "math-forwardAddition",
        termRanges: [
          [5, 20],
          [5, 20],
        ],
        setup: (qst) => {
          qst.eqn = new Equation(qst);
          qst.prompt = `You are standing in a line. You are the ${qst.eqn.equationArray[0]}th person in line, and
            ${qst.eqn.equationArray[2]} people behind you.  How many people total are in the line?`
          qst.answer= qst.eqn.a + qst.eqn.b
        }
      });


farmAnimalBodyPartCounts = {
  2:{
    'legs':['chickens','ducks','hens','roosters'],
    'wings':['chickens','ducks','hens','roosters'],
    'horns':['bulls'],
    'eyes':['chickens','cows','pigs','sheep','goats','horses']

  },
  4:{
    'legs':['cows','pigs','horses','sheep','goats','ponies','rabbits','cats','dogs'],
    'feet':['dogs','cats']
  }
  // ,
  // 10:{
  //   'fingers':['people'],
  //   'toes':['people']
  // }
}

equationTypes = [
  'X &plus; Y = ?',
  'X &plus; ? = Z',
  'X &minus; Y = ?',
  'X &minus; ? = Z',
  'X &times Y = ?',
  'X &times ? = Z',
  // 'X &divide Y = ?',
  // 'X &divide ? = Z'
]


//
//  ADD MultipleChoice optiont to QuestionArithmetic
//

defineQuestionType(`math-equation-match`,{
            questionClass: QuestionMultipleChoiceColumn,
            labeled:true,
            labelType:'letters',
            showAnswer:true,
            // signs :['+','*','-','/'],
            signs :['+','*','-'],
            blanks:['b','c'],
            setup: (qst) => {
              const sign = randomChoice(qst.signs)
              const blank = randomChoice(qst.blanks)
              let termRanges, answerRange;
              if (sign==='/') {
                termRanges=[[2,24],[2,4]];
                answerRange = [2,12];
              } else {
                termRanges = [[2,12],[2,12]];
                answerRange = [2,24];
              }
              const wordProblem = new QuestionArithmetic({format:'word',sign:sign,blank:blank,
                termRanges:termRanges,answerRange:answerRange,shuffle:false})
              wordProblem.setContent()

              const a = wordProblem.eqn.a
              const bc = blank=='b'?wordProblem.eqn.c:wordProblem.eqn.b;
              const m = qst.showAnswer==true?wordProblem.eqn[blank]:'?';
              const hn = (x) => `<span class='highlight'>${m}</span>`
              const choices = {
                '+':{
                  'b':`${a} + ${hn(m)} = ${bc}`,
                  'c':`${a} + ${bc} = ${hn(m)}`
                },
                '-':{
                  'b':`${a} - ${hn(m)} = ${bc}`,
                  'c':`${a} - ${bc} = ${hn(m)}`
                },
                '*':{
                  'b':`${a} &times ${hn(m)} = ${bc}`,
                  'c':`${a} &times ${bc} = ${hn(m)}`
                },
                '/':{
                  'b':`${a} &divide ${hn(m)} = ${bc}`,
                  'c':`${a} &divide ${bc} = ${hn(m)}`
                }
              }
              // const allChoices = flatten(Object.values(choices).map(x=>Object.values(x)))
              const allChoices = flatten(qst.signs.map(x=>Object.values(choices[x])))
              qst.topcontent = wordProblem.elementWordProblem();
              qst.choices = randomSample(allChoices,Math.min(allChoices.length,4))
              const ans = choices[sign][blank];
              if (!(qst.choices.includes(ans))) {
                qst.choices[0] = ans;
                qst.choices = shuffle(qst.choices)
              }
              qst.prompt = `Which equation best matches the problem?`
              qst.answerIndex= qst.choices.indexOf(choices[sign][blank])
            }
          });

defineQuestionType(`math-multiplication-farm`,{
                      questionClass: Question,
                      number:undefined,
                      termRanges: undefined,
                      shuffle:false,
                      sign:'*',
                      setup: (qst) => {
                        qst.number = qst.termRanges || randomChoice(Object.keys(farmAnimalBodyPartCounts));
                        qst.bodyPart = randomChoice(Object.keys(farmAnimalBodyPartCounts[qst.number]));
                        qst.animal = randomChoice(farmAnimalBodyPartCounts[qst.number][qst.bodyPart])
                        qst.termRanges = qst.termRanges || [[qst.number,qst.number],[2,10]]
                        qst.eqn = new Equation(qst);
                        qst.prompt = `Your farm has ${qst.eqn.b} ${qst.animal}.  Each ${qst.animal} has ${qst.eqn.a} ${qst.bodyPart}.  How many total ${qst.animal} ${qst.bodyPart} are there on your farm?`
                        qst.answer= qst.eqn.c
                      }
                    });

//
// ORDERING
//
defineQuestionType("math-orderNumbers", {
  min: 0,
  max: 20,
  unique: true,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.comparator = randomSample(["increasing", "decreasing"]);
    qst.prompt = `Put the numbers in ${qst.comparator} order`;
    qst.choices = randomInteger(qst.min, qst.max, qst.n, qst.unique);
    qst.answer = sortNumbers(qst.choices.slice(), qst.comparator === "decreasing");
  }
});

[5, 10, 20, 50, 100, 1000].map((x) => {
  defineQuestionType(
    `math-numbers-ordering-Ordering whole numbers up to ${x}`,
    { questionName: "math-orderNumbers", min: 0, max: x }
  );
  defineQuestionType(
    `math-numbers-ordering-Ordering negative numbers down to &minus;${x}`,
    { questionName: "math-orderNumbers", min: -x, max: 0 }
  );
  defineQuestionType(
    `math-numbers-ordering-Ordering integers from &minus;${x} to ${x}`,
    { questionName: "math-orderNumbers", min: -x, max: x }
  );
});

//
// COMPARING
//
defineQuestionType("math-numbers-compare", {
  n: 2,
  min: 0,
  max: 20,
  unique: true,
  order: "any",
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    if (qst.n===2) {
      if (qst.min>=0) {
        qst.comparator = randomSample(["bigger", "smaller"]);
      } else {
        qst.comparator = randomSample(["greater", 'lesser']);
      }
  } else {
    if (qst.min>=0) {
      qst.comparator = randomSample(["biggest", "smallest"]);
    } else {
      qst.comparator = randomSample(["greatest", 'least']);
    }  }
  qst.prompt = `Which of these numbers is ${qst.comparator}?`;
    qst.choices = randomInteger(qst.min, qst.max, qst.n, qst.unique);
    qst.answer = sortNumbers(
      qst.choices.slice(),
      ['bigger','biggest','greater','greatest'].includes(qst.comparator)
    )[0];
  },
});


[5, 10, 20, 50, 100, 1000].map((x) => {
  defineQuestionType(
    `math-numbers-comparisons-Comparing whole numbers up to ${x}`,
    { questionName: "math-numbers-compare", min: 0, max: x }
  );
  defineQuestionType(
    `math-numbers-comparisons-Comparing negative numbers down to &minus;${x}`,
    { questionName: "math-numbers-compare", min: -x, max: 0 }
  );
  defineQuestionType(
    `math-numbers-comparisons-Comparing integers from &minus;${x} to ${x}`,
    { questionName: "math-numbers-compare", min: -x, max: x }
  );
});

//
// CHARTS
//

/*
 Chart questions
 - who has more/less?
 - who has #?
 - which people have more/less than #?
*/
defineQuestionType("math-data-chartComparisons", {
  n: 3,
  min: 1,
  max: 10,
  chartType: "bar",
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.item = randomSample(thingList());
    qst.items = pluralize(2, qst.item, false);
    qst.comparator = randomSample(["most", "fewest"]);
    qst.prompt = `Who has the ${qst.comparator} ${qst.items}?`;
    qst.choices = randomSample(
      namesList().filter((x) => x.length < 6),
      qst.n
    );
    qst.values = randomInteger(qst.min, qst.max, qst.n, true);
    const extremeVal =
      qst.comparator == "most"
        ? Math.max(...qst.values)
        : Math.min(...qst.values);
    qst.answer = qst.choices[qst.values.indexOf(extremeVal)];
  },
  makeContentElement: (qst) => {
    if (qst.chartType === "bar") {
      return barChart(qst.values, qst.choices, {
        title: `Number of ${qst.items} per person`,
        xlabel: qst.items.toUpperCase(),
      });
    } else if (qst.chartType === "pie") {
      return pieChart(qst.values, qst.choices, {
        title: `Number of ${qst.items} per person`,
      });
    }
  },
});

defineQuestionType("math-data-howManyChart", {
  n: 4,
  min: 0,
  max: 10,
  unique: true,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.item = randomSample(thingList());
    qst.values = randomInteger(qst.min, qst.max, qst.n, qst.unique);
    qst.names = randomSample(
      namesList().filter((x) => x.length < 6),
      qst.n
    );
    qst.name = randomSample(qst.names);
    qst.prompt = `How many ${pluralize(2, qst.item, false)} does ${
      qst.name
    } have?`;
    qst.answer = qst.values[qst.names.indexOf(qst.name)];
  },
  makeContentElement: (qst) => {
    return barChart(qst.values, qst.names,{title:`Number of ${pluralize(2, qst.item, false)}`});
  },
});

defineQuestionType("math-data-howManyMoreChart", {
  n: 4,
  min: 0,
  max: 10,
  unique: true,
  questionClass: Question,
  setup: (qst) => {
    qst.item = randomSample(thingList());
    qst.values = randomInteger(qst.min, qst.max, qst.n, qst.unique);
    qst.comparator= randomSample(['more','fewer']);
    var valsSorted = qst.values.slice().sort()
    if (qst.comparator==='fewer') {
      valsSorted.reverse();
    }
    const ind1 = randomInteger(1,qst.n-1);
    const ind2 = randomInteger(0,ind1-1);
    qst.names = randomSample(
      namesList().filter((x) => x.length < 6),
      qst.n
    );
    const [val1,val2] = [valsSorted[ind1],valsSorted[ind2]]
    qst.name1 = qst.names[qst.values.indexOf(val1)];
    qst.name2 = qst.names[qst.values.indexOf(val2)];
    qst.prompt = `How many ${qst.comparator} ${pluralize(2, qst.item, false)} does ${
      qst.name1} have than ${qst.name2}?`;
    qst.answer = valsSorted[ind1] - valsSorted[ind2];
    if (qst.comparator==='fewer') {
      qst.answer = qst.answer * -1;
    }
  },
  makeContentElement: (qst) => {
    return barChart(qst.values, qst.names,{title:`Number of ${pluralize(2, qst.item, false)}`});
  },
});

defineQuestionType("math-data-howManyPairChart", {
  min: 1,
  max: 10,
  n:3,
  unique: true,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.item = randomSample(thingList());
    qst.values = randomInteger(qst.min, qst.max, 2*qst.n, qst.unique);
    qst.names = randomSample(
      namesList().filter((x) => x.length < 6),
      2*qst.n
    );
    qst.groupNames = shuffle(['adults','kids']);
    qst.groupName = randomSample(qst.groupNames);
    qst.prompt = `How many ${pluralize(2, qst.item, false)} do the ${
      qst.groupName
    } have?  Adults are shown in blue and kids are shown in orange.  `;
    qst.colors = shuffle(randomSample(['blue','orange'],2*qst.n));
    qst.answer=0;
    qst.colors.forEach(function(col,ind) {
      if (col == {adults:'blue',kids:'orange'}[qst.groupName]) {
        qst.answer = qst.answer + qst.values[ind];
      }
    })
  },
  makeContentElement: (qst) => {
    return barChart(qst.values, qst.names,{colors:qst.colors,title:`Number of ${pluralize(2, qst.item, false)}`,
      width:(qst.n>2?650:500)});
  },
});


//
// ROUNDING
//
defineQuestionType("math-rounding", {
  n: 2,
  min: 0,
  max: 100,
  roundTo:10,
  questionClass: Question,
  setup: (qst) => {
    qst.val = randomInteger(qst.min,qst.max);
    qst.prompt = `Round this number to the nearest ${qst.roundTo}`;
    qst.choices = randomInteger(qst.min, qst.max, qst.n, qst.unique);
    qst.answer = roundTo(qst.val,qst.roundTo);
    qst.content = qst.val;
  }
});

[2,5,10,100,1000,10000].map((x) => {
  defineQuestionType(
    `math-rounding-${x}`,
    { questionName: "math-rounding", min: 0, max:20*x, roundTo:x }
  );
});

function roundTo(val,inc) {
  return Math.round(val/inc)*inc;
}

defineQuestionType(
  `math-rounding-addition`,
  {
    questionName: "math-forwardAddition",
    roundTo:10,
    termRanges: [
      [11, 100],
      [11, 100],
    ],
    setup: (qst) => {
      qst.prompt = `Round each number to the nearest ${qst.roundTo}, and then calculate the answer`
      qst.eqn = new Equation(qst);
      qst.answer= roundTo(qst.eqn.equationArray[0],qst.roundTo) +
        roundTo(qst.eqn.equationArray[2],qst.roundTo)
    }
  }
)

//
// GEOMETRY
//
defineQuestionType("math-geometry-shape identify", {
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.numSides = 3;
  },
  makeContentElement: (qst) => {
    return regularPolygon(qst.numSides);
  },
});

defineQuestionType("math-geometry-shape identify 2", {
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.numSides = 6;
  },
  makeContentElement: (qst) => {
    return circlePolygon(qst.numSides);
  },
});


//
// PERIMETER
//
defineQuestionType("math-perimeter", {
  n: 2,
  min: 0,
  max: 100,
  roundTo:10,
  questionClass: Question,
  setup: (qst) => {
    qst.val = randomInteger(qst.min,qst.max);
    qst.prompt = `What is the perimeter  ${qst.roundTo}`;
    qst.choices = randomInteger(qst.min, qst.max, qst.n, qst.unique);
    qst.answer = roundTo(qst.val,qst.roundTo);
    qst.content = qst.val;
  }
});

defineQuestionType("math-side-from-perimeter", {
  maxSides:5,
  maxSideLength: 5,
  questionClass: Question,
  setup: (qst) => {
    const [shape, sides] = randomChoice(regularPolygons);
    qst.answer = randomInteger(1,qst.maxSideLength);
    qst.prompt = `If a regular ${shape} has a total perimeter of ${sides*qst.answer}, then
        what is the length of each side?`;
  }
});



regularPolygons = [
  ["triangle", 3],
  ["square", 4],
  ["pentagon", 5],
  ["hexagon", 6],
];

allPolygons = regularPolygons.concat([
  ["trapezoid", 4],
  ["rectangle", 4],
  ["star", 10],
  ["parallelogram", 4],
]);

defineQuestionType("math-geometry-perimeter-regular polygons", {
  showImage: true,
  questionClass: Question,
  setup: (qst) => {
    const [shape, numSides] = randomSample(regularPolygons);
    const sideLength = randomInteger(2, 10);
    qst.image = shape + ".png";
    qst.prompt = `What is the total perimeter of a regular ${shape} whose sides are each length ${sideLength}?`;
    qst.answer = sideLength * numSides;
    if (qst.showImage) {
      qst.content = makeImageElement(qst.image, [undefined, 125], {
        background: "white",
        padding: ".5cm",
      });
    }
  },
});

defineQuestionType("math-geometry-sides-how many sides and corners", {
  showImage: true,
  questionClass: Question,
  setup: (qst) => {
    const [shape, numSides] = randomSample(allPolygons);
    qst.image = shape + ".png";
    qst.prompt = `How many ${randomSample([
      "sides",
      "corners",
    ])} are on the shape below?`;
    qst.answer = numSides;
    if (qst.showImage) {
      qst.content = makeImageElement(qst.image, [undefined, 125], {
        background: "white",
        padding: ".5cm",
      });
    }
  },
});

defineQuestionType(
  "math-geometry-perimeter-regular polygons given side length",
  {
    showImage: true,
    questionClass: Question,
    setup: (qst) => {
      const [shape, numSides] = randomSample(regularPolygons);
      const sideLength = randomInteger(2, 10);
      qst.image = shape + ".png";
      const perimeter = sideLength * numSides;
      qst.prompt = `What is the side length of a regular ${shape} whose total perimeter is ${perimeter}?`;
      qst.answer = sideLength;
      if (qst.showImage) {
        qst.content = makeImageElement(qst.image, [undefined, 125], {
          background: "white",
          padding: ".5cm",
        });
      }
    },
  }
);

defineQuestionType("math-geometry-polygons-name that polygon", {
  labeled: false,
  caseness: "uppercase",
  n: 4,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    const [allShapes, allNumSides] = transpose(allPolygons);
    qst.choices = randomSample(allShapes, qst.n);
    qst.answer = randomSample(qst.choices);
    qst.image = qst.answer + ".png";
    qst.prompt = `Which name best describes the shape shown below?`;
    if (qst.labeled) {
      qst.labelIndex = qst.choices.indexOf(qst.answer);
      qst.choiceElements = [];
      qst.choices.map((x) => {
        qst.choiceElements.push(
          qst.createDIV(["content"], { "font-size": "30" }, x)
        );
      });
    } else {
    }
    qst.topcontent = makeImageElement(qst.image, [undefined, 125], {
      margin: "0 20%",
      background: "white",
      padding: ".5cm",
    });
  },
});

defineQuestionType("math-geometry-area-regular polygons", {
  showImage: true,
  questionClass: Question,
  setup: (qst) => {
    const [shape, numSides] = randomSample(regularPolygons);
    const sideLength = randomInteger(2, 10);
    qst.image = shape + ".png";
    qst.prompt = `What is the total area of a regular ${shape} whose sides are each length ${sideLength}? Round your area to the nearest whole number.`;
    qst.answer = Math.round(
      (sideLength * sideLength * numSides) / (4 * Math.tan(Math.PI / numSides))
    );
    if (qst.showImage) {
      qst.content = makeImageElement(qst.image, [undefined, 125], {
        background: "white",
        padding: ".5cm",
      });
    }
  },
});

//
// EVEN & ODD
//
defineQuestionType("math-numbers-even odd-count even and odd", {
  n: 10,
  min: 1,
  max: 20,
  questionClass: QuestionMultipleWords,
  setup: (qst) => {
    qst.numberType = randomSample(["even", "odd"]);
    qst.prompt = `How many ${qst.numberType} numbers are shown below?`;
    qst.choices = randomInteger(qst.min, qst.max, qst.n, true).map((x) =>
      String(x)
    );
    qst.answer = qst.choices.filter((x) => x % 2 == 0).length;
  },
});




["horizontal", "image", "word"].map((x) =>
  defineQuestionType(
    `math-addition-on your fingers-Up to 5 for each hand, ${x}`,
    {
      questionName: "math-arithmetic",
      termRanges: [
        [1, 5],
        [1, 5],
      ],
      format: x,
    }
  )
);
defineQuestionType(`math-addition-on your fingers-Up to 10 across hands`, {
  questionName: "math-arithmetic",
  answerRange: [0, 10],
  termRanges: [
    [6, 10],
    [0, 4],
  ],
});
defineQuestionType(
  `math-addition-on your fingers-Big number plus something countable on fingers`,
  {
    questionName: "math-arithmetic",
    answerRange: [0, 100],
    termRanges: [
      [11, 90],
      [0, 10],
    ],
  }
);

defineQuestionType(
  `math-subtraction-on your fingers-Subtracting from up to 5`,
  {
    questionName: "math-arithmetic",
    sign: "-",
    answerRange: [0, 5],
    shuffle: false,
    termRanges: [
      [1, 5],
      [0, 5],
    ],
  }
);
defineQuestionType(
  `math-subtraction-on your fingers-Subtracting from up to 10`,
  {
    questionName: "math-arithmetic",
    sign: "-",
    answerRange: [0, 10],
    shuffle: false,
    termRanges: [
      [6, 10],
      [0, 10],
    ],
  }
);
defineQuestionType(
  `math-subtraction-on your fingers-Big number minus something countable on fingers`,
  {
    questionName: "math-arithmetic",
    sign: "-",
    answerRange: [0, 100],
    shuffle: false,
    termRanges: [
      [11, 90],
      [0, 10],
    ],
  }
);

[5, 10].map((y) => {
  [0, 1, 10, 2, 5].map((x) => {
    defineQuestionType(
      `math-multiplication-introduction-Multiplying by ${x}, up to ${y}`,
      {
        questionName: "math-arithmetic",
        sign: "*",
        answerRange: [0, 100],
        shuffle: true,
        termRanges: [
          [x, x],
          [1, y],
        ],
      }
    );
  });
});

defineQuestionType('math-forwardMultiplication-0to10',{questionName:'math-forwardMultiplication',termRanges:[[0,10],[0,10]]});
defineQuestionType('math-forwardMultiplication-2to9',{questionName:'math-forwardMultiplication',termRanges:[[2,9],[2,9]]});
// defineQuestionType('math-forwardMultiplication-doublesEasy',{questionName:'math-forwardMultiplication',termRanges:[[2,2],[2,50]]});
defineQuestionType('math-forwardMultiplication-doubles',{questionName:'math-forwardMultiplication',termRanges:[[2,2],[2,50]]});


["pie", "bar"].map((x) => {
  defineQuestionType(`math-numbers-comparisons-Compare ${x} chart`, {
    questionName: "math-data-chartComparisons",
    chartType: x,
  });
  defineQuestionType(`math-charts-comparisons-Compare ${x} chart`, {
    questionName: "math-data-chartComparisons",
    chartType: x,
  });
});

[
  ["hour", 60],
  ["half hour", 30],
  ["quarter hour", 15],
  ["10 minute", 10],
  ["5 minute", 5],
  ["minute", 1],
].map((x) => {
  defineQuestionType(`math-time-clock reading-Reading clocks to the ${x[0]}`, {
    questionName: "math-time-clockTime",
    minuteIncrement: x[1],
  });
});



//
// Question.Types['math-compare-wordProblem'] = function(ops = {}) {
//   var myOps = Object.assign({
//     makeAnswer: ([indA,indB,names]) => {
//       return {
//         2:names[0],
//         1:'no',
//         0:'yes'
//       }[indB]
//     },
//     valueGenerator: () => {
//       var indA = randomInteger(0,5)
//       var indB = randomInteger(0,2)
//       var names = randomSample(namesList(), 3)
//       return [indA,indB,names];
//       },
//     questionGenerator : (inds) => {
//       const [indA,indB,names] = inds
//       var quality = ['bigger', 'smaller', 'older', 'younger', 'taller', 'shorter'][indA]
//       var lastComp = [
//           ' Is ' + names[0] + ' ' + quality + ' than ' + names[2] + '?',
//           ' Is ' + names[2] + ' ' + quality + ' than ' + names[0] + '?',
//           ' Who is the ' + quality.slice(0, -1) + 'st?'
//         ][indB]
//       return names[0] + ' is ' + quality +
//         ' than ' + names[1] + ', and ' + names[1] +
//         ' is ' + quality + ' than ' + names[2] + '. ' +
//         lastComp;
//     }
//   }, ops)
//   var q = new QuestionQuestion(myOps)
//   return q;
// }




defineQuestionType("math-counting-countingSequence", {
  start: [0, 10],
  step: [1, 10],
  // n: 6,
  // blanks:1,
  // position:'middle',
  nBefore:3,
  nBlank:1,
  nAfter:3,
  offset:true,
  reverse: false,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.prompt = `What number goes in the box?`;
    var { start, step, nBefore,nBlank,nAfter } = qst;
    const n = nBefore+nBlank+nAfter;
    start =
      start instanceof Array
        ? randomSample(range(start[0], start[1] + 1))
        : start;
    step =
      step instanceof Array ? randomSample(range(step[0], step[1] + 1)) : step;
    if (qst.offset == false) {
      start = Math.floor(start/step)*step
    }
    qst.choices = range(start, start + step * n, step);
    if (qst.reverse) {
      qst.choices.reverse();
    }
    qst.answer = qst.choices[nBefore+nBlank-1]
    for (let ix=0; ix<nBlank-1; ix++) {
        qst.choices[nBefore + ix] = `_`;
    }
    qst.choices[nBefore + nBlank-1] = `<span class='answerBox'>_</span>`
    // const n1 = qst.choices[0];
    // const n2 = qst.choices[qst.choices.length - 1];
    // const pos = qst.choices.indexOf("_") + qst.blanks -1;
    // qst.answer = n1 + ((n2 - n1) / (qst.n - 1)) * pos;
  },
});

//
//
// defineQuestionType('math-numbers-greaterLessEqual',{
//   questionClass:Question,
//     min:1,
//     max:10,
//     sign:'any',
//     difference:1,
//     difficulty:'easy',
//     shuffle:true,
//   setup: (qst) => {
//     this.prompt = `Enter <, >, or = to make the statement true`
//     qst.sign = (qst.sign=='any')?randomSample(['+','-']):qst.sign
//     qst.difference = (qst.difference instanceof Array)?qst.difference:[qst.difference,qst.difference]
//     const {min,max,sign,difference,difficulty} = qst
//     let [a,b] = randomInteger(min,max,2,true)
//     if (sign == '-') {
//       [a,b] = [a,b].sort().reverse()
//     }
//     let dirs
//     if (difficulty=='easy' || difficulty == 'medium') {
//       dirs = shuffle([0,randomSample([-1,1])])
//
//     } else {
//       dirs = shuffle([-1,1])
//     }
//     const shifts = [
//       dirs[0]*randomSample(range(difference[0],Math.min(b,difference[1])+1)),
//       dirs[1]*randomSample(range(difference[0],Math.min(b,difference[1])+1))
//     ]
//     let [c,d] = [a+shifts[0],b+shifts[1]]
//     if (sign=='+' && qst.shuffle) {
//       [c,d] = shuffle([c,d])
//     }
//     const leftAns = QuestionArithmetic.prototype.arithmeticEval(a,b,null,sign)
//     const rightAns = QuestionArithmetic.prototype.arithmeticEval(c,d,null,sign)
//     if (leftAns==rightAns) {
//       qst.answer = '='
//     } else if (leftAns < rightAns) {
//       qst.answer = '<'
//     } else if (leftAns > rightAns) {
//       qst.answer = '>'
//     }
//     qst.left = [a,b].join(sign)
//     qst.right = [c,d].join(sign)
//     qst.content = [qst.left,qst.right].join(' _ ')
//   }
// })

defineQuestionType("math-numbers-placeValueFrom", {
  min: 100,
  max: 999,
  decimalDigits: 0,
  places: [
    "ones",
    "tens",
    "hundreds",
    "thousands",
    "ten thousands",
    "hundred thousands",
    "millions",
  ],
  decimalPlaces: ["tenths", "hundredths"],
  setup: (qst) => {
    const absMax = Math.max(Math.abs(qst.min), Math.abs(qst.max));
    const intDigits = 1 + Math.floor(Math.log10(absMax));
    const possiblePlaces = qst.places
      .slice(0, intDigits)
      .reverse()
      .concat(qst.decimalPlaces.slice(0, qst.decimalDigits));
    qst.place = randomSample(possiblePlaces);
    const { min, max, decimalDigits } = qst;
    let num = randomReal(
      min,
      max + 1,
      1,
      decimalDigits == 0 ? undefined : Math.pow(10, -decimalDigits)
    )[0];
    num = num.toFixed(decimalDigits);
    const pos = possiblePlaces.indexOf(qst.place);
    if (pos > String(num).split("").length) {
      qst.answer = 0;
    } else {
      qst.answer = String(num)
        .split("")
        .filter((x) => x != ".")[pos];
    }
    qst.content = num;
    qst.prompt = `What digit is in the ${qst.place} place?`;
  },
});

defineQuestionType("math-numbers-placeValueTo", {
  format: "any",
  setup: (qst) => {
    qst.format =
      qst.format == "any" ? randomSample(["numbers", "words"]) : qst.format;
    let ans = 0,
      text = "";
    const places = ["ones", "tens", "hundreds"];
    places.forEach((x, ind) => {
      const num = randomInteger(0, 9);
      ans += num * 10 ** ind;
      if (qst.format == "words") {
        text = `${num} ${x} + ` + text;
      } else {
        text = `${num}&times;${10 ** ind} + ` + text;
      }
    });
    qst.answer = ans;
    qst.content = text.slice(0, text.length - 2);
    qst.prompt = `What is this number?`;
  },
});


defineQuestionType("math-numbers-reading", {
  n: 4,
  top: ["word", "number"],
  labeled: true,
  labelType: "letters",
  min:1,
  max:999,
  questionClass: QuestionMultipleChoiceColumn,
  setup: (qst) => {
    qst.top = qst.top instanceof Array ? randomSample(qst.top) : qst.top;
    // const numDigits = 3;
    // const digits = randomSample(range(1,10),numDigits);
    // const num = range(0,numDigits).reduce((sum,ind)=>(sum + 10**(numDigits-ind-1) * digits[ind]),0);
    const num = randomInteger(qst.min,qst.max);
    const numDigits = String(num).length;
    const digits = String(num).split('');
    const word = numberToWord(num);
    const shuffledDigitSet = union(range(0,20).map(()=>parseInt(shuffle(digits).join('')))).filter(x=>(x!=num && x < qst.max && x > qst.min));
    let otherNumbers;
    if (shuffledDigitSet.length >= qst.n-1) {
      otherNumbers = randomSample(shuffledDigitSet,qst.n-1)
    } else {
      otherNumbers = shuffledDigitSet.concat(range(0,qst.n-shuffledDigitSet.length-1).map((ind)=>num+ind+1))
    }
    qst.choices = shuffle([num].concat(otherNumbers));
    qst.answerIndex = qst.choices.indexOf(num);
    if (qst.top === "word") {
      qst.prompt = `${word}`;
    } else if (qst.top === "number") {
      qst.prompt = `${num}`;
      qst.choices = qst.choices.map(x=>numberToWord(x));
    }
    qst.choiceElements = [];
    qst.choices.map((x) => {
      qst.choiceElements.push(qst.createDIV([], { "font-size": "30",'padding':'5px' }, x));
    });
  },
});



function numberToWord(num) {
  const literal = ['','one','two','three','four','five','six','seven','eight','nine',
    'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen',
    'eighteen','nineteen'];
  const twoDigit = ['','','twenty','thirty','fourty','fifty','sixty','seventy','eighty',
    'ninety'];

    if (num>=10000) {
      return 'ERROR';
    };

    if (num < 20) {
      return literal[num];
    };

    const digits = String(num).split('').reverse();

    if (num < 100) {
      const tail = literal[digits[0]];
      return twoDigit[digits[1]] + ((tail=='')?tail:'-'+tail);
    };

    if (num < 1000) {
      const lastTwo = numberToWord(parseInt(digits[1]+digits[0]));
      return literal[digits[2]] + ' hundred' + ((lastTwo=='')?'':' '+lastTwo);
    };

    if (num < 10000) {
      const lastThree = numberToWord(parseInt(digits[2]+digits[1]+digits[0]));
      return literal[digits[3]] + ' thousand' + ((lastThree=='')?'':' '+lastThree);
    };

}

Question.Types["math-counting-countOneOfSeveralImages"] = function (ops = {}) {
  var qst = new Question(
    {
      numTotal: 20,
      numDifferent: 3,
      tags: ["math", "counting", "images"],
    },
    ops
  );
  qst.setup = (q) => {
    const { numTotal, numDifferent } = q;
    q.imageNames = randomSample(imageNames(), numDifferent);
    q.imageSamples = randomChoice(q.imageNames, q.numTotal);
    q.toCount = q.imageNames[0];
    q.prompt = `How many ${imageNameFromFileName(
      q.toCount
    )} pictures are shown below?`;
    q.answer = q.imageSamples.filter((x) => x == q.toCount).length;
  };
  // grid of images element
  qst.makeContentElement = () => {
    var grid = makeImageElementRow(
      qst.imageSamples,
      80,
      { "background-color": "white", padding: "10px", margin: "10px" },
      {}
    );
    qst.addClass(grid, "content");
    return grid;
  };
  // qst.generate();
  return qst;
};

Question.Types["math-counting-countOneImage"] = function (ops = {}) {
  var qst = new Question(
    {
      answerRange: [2, 6],
      tags: ["math", "counting", "images"],
    },
    ops
  );
  qst.setup = (q) => {
    q.answer = randomInteger(...q.answerRange);
    q.imageName = randomSample(imageNames());
    q.imageSamples = constantVector(q.imageName, q.answer);
    q.prompt = `How many ${imageNameFromFileName(
      q.imageName
    )} pictures are shown below?`;
  };
  // grid of images element
  qst.makeContentElement = () => {
    var grid = makeImageElementRow(
      qst.imageSamples,
      80,
      { "background-color": "white", padding: "10px", margin: "10px" },
      {}
    );
    qst.addClass(grid, "content");
    return grid;
  };
  // qst.generate();
  return qst;
};


Question.Types["math-sizes-imageSizeComparison"] = function (ops = {}) {
  var qst = new Question(
    {
      n: 4,
    },
    ops
  );
  qst.setup = (q) => {
    if (q.n==2) {
      q.comparator = randomSample(["bigger", "smaller"]);
    } else {
      q.comparator = randomSample(["biggest", "smallest"]);
    }
  q.sizes = shuffle(range(50, 200, (200 - 50) / q.n));
  q.labels = allLetters().slice(0, q.n);
  q.image = randomSample(imageNames());
  if (['bigger','biggest'].includes(q.comparator)) {
    q.answer = q.labels[q.sizes.indexOf(Math.max(...q.sizes))];
  } else {
    q.answer = q.labels[q.sizes.indexOf(Math.min(...q.sizes))];
  };
  q.prompt = `Which picture is <span style="margin-left:.5em;border-bottom:solid 1px black;">${q.comparator}</span>?`;
}
  qst.makeContentElement = (q) => {
    var container = document.createElement("DIV");
    Object.assign(container.style, {
      display: "flex",
      width: "100%",
      "justify-content": "space-evenly",
      "align-items": "flex-end",
    });
    q.sizes.forEach((sz, ind) => {
      container.appendChild(
        captionElement(
          makeImageElement(q.image, [sz, undefined], {
            "background-color": "white",
            padding: "10px",
            margin: "10px",
          }),
          q.labels[ind],
          {}
        )
      );
    });
    return container;
  };
  // qst.generate();
  return qst;
};

Question.Types["math-counting-imageCountComparison"] = function (ops = {}) {
  var qst = new Question(
    {
      min: 1,
      max: 6,
    },
    ops
  );
  qst.setup = (q) => {
    q.comparator = randomSample(["greater", "less"]);
    q.counts = randomSample(range(q.min, q.max), 2);
    q.labels = allLetters().slice(0, qst.n);
    q.images = randomSample(imageNames(), 2);
    if (q.comparator == "greater") {
      q.answer = q.labels[q.counts.indexOf(Math.max(...q.counts))];
    } else {
      q.answer = q.labels[qst.counts.indexOf(Math.min(...q.counts))];
    }
    q.prompt = `Which picture count is <span style="margin-left:.5em;border-bottom:solid 1px black;">${q.comparator}</span>?`;
  };
  qst.makeContentElement = () => {
    var container = document.createElement("DIV");
    Object.assign(container.style, {
      display: "flex",
      width: "100%",
      "justify-content": "space-evenly",
      "align-items": "flex-end",
    });
    qst.counts.forEach((count, ind) => {
      container.appendChild(
        captionElement(
          makeImageElementRow(
            constantVector(qst.images[ind], count),
            60,
            { "background-color": "white", padding: "10px", margin: "10px" },
            {
              display: "flex",
              "flex-wrap": "wrap",
              "justify-content": "space-evenly",
              "align-items": "flex-end",
            }
          ),
          qst.labels[ind],
          { width: "45%" }
        )
      );
    });
    return container;
  };
  // qst.generate();
  return qst;
};

defineQuestionType("math-multiplication-timePlusMatching", {
  n: 4,
  top: ["times", "plus"],
  labeled: true,
  labelType: "letters",
  questionClass: QuestionMultipleChoiceColumn,
  setup: (qst) => {
    qst.top = qst.top instanceof Array ? randomSample(qst.top) : qst.top;
    const numstrs = [];
    while (numstrs.length < qst.n) {
      const newnums = [randomInteger(2, 9), randomInteger(2, 5)].join(",");
      if (!numstrs.includes(newnums)) {
        numstrs.push(newnums);
      }
    }
    qst.numPairs = numstrs.map((x) => x.split(",").map((y) => parseInt(y)));
    qst.answerIndex = randomInteger(0, qst.n - 1);
    const ans = qst.numPairs[qst.answerIndex];
    if (qst.top === "times") {
      qst.prompt = `Which addition expressions below is equivalent to ${ans[0]}&times;${ans[1]}?`;
      qst.choices = qst.numPairs.map((x) => constantVector(...x).join("+"));
    } else if (qst.top === "plus") {
      qst.prompt = `Which multiplication expressions below is equivalent to ${constantVector(
        ...ans
      ).join("+")}?`;
      qst.choices = qst.numPairs.map((x) => `${x[0]}&times;${x[1]}`);
    }
    qst.matchMe = qst.choices[qst.answerIndex];
    qst.choiceElements = [];
    qst.choices.map((x) => {
      qst.choiceElements.push(qst.createDIV([], { "font-size": "40" }, x));
    });
  },
});

function digits2num(arr) {
  return arr.reduce((total,current,ind) => total+current*10**(arr.length-1-ind),0);
}
function digits2expandedStr(arr) {
  const strexp = arr.map((x,ind) => x*10**(arr.length-1-ind)).join('+');
  if (arr.length==1) {
    return strexp;
  } else {
    return `(${strexp})`;
  }
}
function digitsPairs2distributed(arrs) {
  let expstrarr = []
  for (var i = 0; i < arrs[0].length; i++) {
    for (var j = 0; j < arrs[1].length; j++) {
      expstrarr.push(`${arrs[0][i]*10**(arrs[0].length-1-i)}&times;${arrs[1][j]*10**(arrs[1].length-1-j)}`)
    }
  }
  return expstrarr.join(' + ');
}


defineQuestionType("math-multiplication-expansion-matching", {
  n: 4,
  bDigits: 2,
  expandTop:false,
  expandBottom:false,
  labeled: true,
  labelType: "letters",
  uniqueDigits:true,
  difficulty:'easy',
  questionClass: QuestionMultipleChoiceColumn,
  setup: (qst) => {
    const numstrs = [];
    const numarrs = [];
    let newnums, digitsArray;
    const digitsArrayAns = randomInteger(1,9,2+qst.bDigits,qst.uniqueDigits)
    digitsArray = digitsArrayAns
    while (numstrs.length < qst.n) {
      if (qst.difficulty=='easy') {
        digitsArray = randomInteger(1,9,2+qst.bDigits,qst.uniqueDigits)
      } else if (qst.difficulty=='medium'){
        digitsArray = shuffle(digitsArray)
      } else if (qst.difficulty=='hard') {
        // digitsArray = [digitsArrayAns[0]].concat(shuffle(digitsArrayAns.slice(1))).concat(randomInteger(1,9,5)).slice(0,2+qst.bDigits)
      }
      newnums = [digitsArray.slice(0,2),digitsArray.slice(2)]
      if (!numstrs.includes(newnums.join(','))) {
        numstrs.push(newnums.join(','));
        numarrs.push(newnums)
      }
    }
    qst.numPairs = numarrs
    qst.answerIndex = randomInteger(0, qst.n - 1);
    const ans = qst.numPairs[qst.answerIndex];
    if (qst.expandTop==false) {
      qst.prompt = `Which expressions below is equivalent to ${digits2num(ans[0])}&times;${digits2num(ans[1])}?`;
    } else {
      qst.prompt = `Which expressions below is equivalent to ${digits2expandedStr(ans[0])}&times;${digits2expandedStr(ans[1])}?`;
    }
    if (qst.expandBottom == false) {
      qst.choices = qst.numPairs.map((x) => (digits2expandedStr(x[0]) + ' &times; ' + digits2expandedStr(x[1])));
    } else {
      qst.choices = qst.numPairs.map((x) => digitsPairs2distributed(x));
    }
    qst.matchMe = qst.choices[qst.answerIndex];
    qst.choiceElements = [];
    qst.choices.map((x) => {
      qst.choiceElements.push(qst.createDIV([], { "font-size": "25" }, x));
    });
  },
});
defineQuestionType('math-multiplication-expansion-matching1A',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:false,bDigits:1});
defineQuestionType('math-multiplication-expansion-matching1AH',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:false,bDigits:1,difficulty:'medium'});
defineQuestionType('math-multiplication-expansion-matching1B',{questionName:'math-multiplication-expansion-matching',expandTop:true,expandBottom:true,bDigits:1});
defineQuestionType('math-multiplication-expansion-matching1BH',{questionName:'math-multiplication-expansion-matching',expandTop:true,expandBottom:true,bDigits:1,difficulty:'medium'});
defineQuestionType('math-multiplication-expansion-matching1C',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:true,bDigits:1});
defineQuestionType('math-multiplication-expansion-matching1CH',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:true,bDigits:1,difficulty:'medium'});
defineQuestionType('math-multiplication-expansion-matching2A',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:false,bDigits:2});
defineQuestionType('math-multiplication-expansion-matching2AH',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:false,bDigits:2,difficulty:'medium'});
defineQuestionType('math-multiplication-expansion-matching2B',{questionName:'math-multiplication-expansion-matching',expandTop:true,expandBottom:true,bDigits:2});
defineQuestionType('math-multiplication-expansion-matching2BH',{questionName:'math-multiplication-expansion-matching',expandTop:true,expandBottom:true,bDigits:2,difficulty:'medium'});
defineQuestionType('math-multiplication-expansion-matching2C',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:true,bDigits:2});
defineQuestionType('math-multiplication-expansion-matching2CH',{questionName:'math-multiplication-expansion-matching',expandTop:false,expandBottom:true,bDigits:2,difficulty:'medium'});


defineQuestionType("math-multiplication-timesExpansionMatchingB", {
  n: 4,
  labeled: true,
  labelType: "letters",
  questionClass: QuestionMultipleChoiceColumn,
  setup: (qst) => {
    const numstrs = [];
    const numarrs = []
    while (numstrs.length < qst.n) {
      const newnums = [
        [randomInteger(1, 9),randomInteger(1,9)],
        [randomInteger(2,9)]
      ];
      if (!numstrs.includes(newnums.join(','))) {
        numstrs.push(newnums.join(','));
        numarrs.push(newnums)
      }
    }
    qst.numPairs = numarrs
    qst.answerIndex = randomInteger(0, qst.n - 1);
    const ans = qst.numPairs[qst.answerIndex];
    qst.prompt = `Which expressions below is equivalent to (${ans[0][0]*10}+${ans[0][1]})&times;${ans[1][0]}?`;
    qst.choices = qst.numPairs.map((x) => (''+x[0][0]*10 + '&times;' + x[1][0])+' + ' + x[0][1] + '&times;' + x[1][0]);
    qst.matchMe = qst.choices[qst.answerIndex];
    qst.choiceElements = [];
    qst.choices.map((x) => {
      qst.choiceElements.push(qst.createDIV([], { "font-size": "40" }, x));
    });
  },
});

defineQuestionType("math-fractions-equivalentFractions", {
  n: 4,
  boxes: true,
  setup: (qst) => {
    const fString = randomSample(Object.keys(equivalentFractions));
    let [fA, fB] = randomSample(equivalentFractions[fString], 2);
    fA = fA.join("/");
    fB = fB.join("/");
    qst.answer = fA;
    qst.other = fB;
    qst.fractions = shuffle(
      randomSample(
        complement(
          flatten(equivalentFractionStrings),
        equivalentFractions[fString].map((x) => x.join("/"))
        ),
        qst.n - 1
      ).concat([fA])
    );
    qst.labels = qst.fractions;
  },
  makeContentElement: (qst) => {
    var container = Question.prototype.createDIV("content");
    const textA = Question.prototype.createDIV(
      "prompt",
      {},
      "This picture represents the fraction " + qst.other
    );
    container.appendChild(textA);
    const topFrac = fractionBoxGrid(qst.other.split("/"));
    Object.assign(topFrac.style, { width: "20%" });
    container.appendChild(topFrac);
    const textB = Question.prototype.createDIV(
      "prompt",
      {},
      "Which fraction below is equivalent?"
    );
    container.appendChild(textB);
    Object.assign(container.style, {
      display: "flex",
      width: "100%",
      "justify-content": "space-evenly",
      "align-items": "flex-end",
    });
    qst.fractions.forEach((frac, ind) => {
      container.appendChild(
        captionElement(
          qst.boxes
            ? fractionBoxGrid(frac.split("/"))
            : document.createElement("DIV"),
          qst.labels[ind],
          { width: "20%" }
        )
      );
    });
    return container;
  },
});

defineQuestionType("math-fractions-compareFractions", {
  n: 2,
  boxes: true,
  setup: (qst) => {
    const comparator = randomSample(["greatest", "least"]);
    const tops = randomSample(range(1, 12 + 1), qst.n);
    const fracsArrs = tops.map((x) => {
      if (equivalentFractions[x + "/12"] === undefined) {
        return [x, 12];
      } else {
        return randomSample(equivalentFractions[x + "/12"]);
      }
    });
    qst.fractions = fracsArrs.map((x) => x.join("/"));
    const nums = fracsArrs.map((x) => x[0] / x[1]);
    var ind;
    if (comparator === "greatest") {
      ind = nums.indexOf(Math.max(...nums));
    } else {
      ind = nums.indexOf(Math.min(...nums));
    }
    qst.answer = qst.fractions[ind];
    qst.labels = qst.fractions;
    qst.prompt = `Which fraction is ${comparator}?`;
  },
  makeContentElement: (qst) => {
    var container = qst.createDIV("content", {
      display: "flex",
      width: "100%",
      "justify-content": "space-evenly",
      "align-items": "flex-end",
    });
    qst.fractions.forEach((frac, ind) => {
      container.appendChild(
        captionElement(
          qst.boxes
            ? fractionBoxGrid(frac.split("/"))
            : document.createElement("DIV"),
          qst.labels[ind],
          { width: "20%" }
        )
      );
    });
    return container;
  },
});

equivalentFractions = {
  "12/12": [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [6, 6],
    [12, 12],
  ],
  "10/12": [
    [5, 6],
    [10, 12],
  ],
  "8/12": [
    [2, 3],
    [4, 6],
    [8, 12],
  ],
  "6/12": [
    [1, 2],
    [2, 4],
    [3, 6],
    [6, 12],
  ],
  "4/12": [
    [1, 3],
    [2, 6],
    [4, 12],
  ],
  "3/12": [
    [1, 4],
    [3, 12],
  ],
  "2/12": [
    [1, 6],
    [2, 12],
  ],
};
equivalentFractionStrings = Object.values(equivalentFractions).map((row) => {
  return row.map((x) => x.join("/"));
});

function allFractionStrings(max) {
  let out = [];
  for (var i = 0; i < max; i++) {
    for (var j = 0; j < max; j++) {
      out.push([i + 1, j + 1].join("/"));
    }
  }
  return out;
}

function fractionBoxGrid([num, den]) {
  const boxes = Question.prototype.createDIV("boxContainer", {
    "flex-direction": num % 3 === 0 ? "column" : "row",
  });
  range(0, den, 1).map(function (ind) {
    const box = Question.prototype.createDIV("box" + den, {
      "background-color": ind < num ? "darkgray" : "white",
    });
    boxes.appendChild(box);
  });
  const wrapper = document.createElement("DIV");
  wrapper.append(boxes);
  Object.assign(wrapper.style, {
    "justify-content": "center",
    width: "100%",
    display: "flex",
    height: "3cm",
  });
  return wrapper;
}


Question.Types["math-symbolic addition-images"] = function (ops = {}) {
  var qst = new Question({}, ops);
  const { numTotal, numDifferent } = qst;
  qst.imageNames = randomSample(imageNames(), 2);
  qst.nums = randomInteger(1, 5, 2);
  qst.answer = qst.nums[0] * 10 + qst.nums[1];
  qst.makePromptElement = () => {
    var prompt = document.createElement("DIV");
    qst.addClass(prompt, "prompt");
    var img10 = makeImageElement(qst.imageNames[0], 40, {
      "background-color": "white",
      padding: "10px",
      margin: "10px",
    });
    var img1 = makeImageElement(qst.imageNames[1], 40, {
      "background-color": "white",
      padding: "10px",
      margin: "10px",
    });
    prompt.innerHTML = "If ";
    prompt.insertAdjacentElement("beforeend", img10);
    prompt.innerHTML += " = 10, and ";
    prompt.insertAdjacentElement("beforeend", img1);
    prompt.innerHTML += " = 1, then";
    return prompt;
  };
  qst.makeContentElement = () => {
    var content = document.createElement("DIV");
    const namesArray = constantVector(qst.imageNames[0], qst.nums[0]).concat(
      constantVector(qst.imageNames[1], qst.nums[1])
    );
    var imgRow = makeImageElementRow(
      namesArray,
      40,
      { "background-color": "white", padding: "10px", margin: "10px" },
      { width: "75%", border: "solid gray 2px", margin: "5px" }
    );
    content.insertAdjacentElement("beforeend", imgRow);
    content.innerHTML += " = ?";
    qst.addClass(content, "content");
    return content;
  };
  // qst.generate();
  return qst;
};


//
// GROUPS OF QUESTIONS
//

//////////////////////////////////////////////////////////

var math01 = {


}
