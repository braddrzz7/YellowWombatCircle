function defineQuestionType(name, spec) {
  const questionClass = spec.questionClass || Question;
  const questionName = spec.questionName;
  if (typeof questionName == "string") {
    Question.Types[name] = function (ops = {}) {
      const newOps = Object.assign({},spec, ops);
      return Question.Types[questionName](newOps);
    };
  } else {
    Question.Types[name] = function (ops = {}) {
      const qst = new questionClass(spec, ops);
      return qst;
    };
    if (questionClass === QuestionMultipleChoice && spec.labeled === false) {
      Question.Types[name + " labeled"] = function (ops = {}) {
        const qst = new questionClass(
          spec,
          Object.assign({}, ops, { labeled: true })
        );
        // qst.generate();
        return qst;
      };
    }
  }
}

/*
  Question has 3 main pieces: prompt, content, answer
  sometimes answer doesn't exist
  sometimes prompt is empty
*/
class Question {
  constructor(defaultOps = {}, userOps = {}) {
    this.questionClass = "Question";
    this.allowedAttempts = 2;
    this.attemptNumber = 1;
    // main things
    this.prompt = "";
    this.content = "";
    this.guesses = '';
    this.answer = "";
    //
    this.tags = [];
    this.caseSensitive = false;
    Object.assign(this, defaultOps);
    Object.assign(this, userOps);
    Question.count++;
    this.id = "q-" + Question.count;
    Question.all[this.id] = this;
  }
  addTags(tags) {
    this.tags = this.tags.concat(toArray(tags));
  }
  copyOptions(obj) {
    for (const prop in obj) {
      this[prop] = obj[prop];
    }
  }
  write(ops = {}) {
    const oldElement = document.getElementById("wrapper-" + this.id);
    const newElement = this.makeElement(ops);
    const newElementWrapper = this.createDIV("questionContainer");
    newElementWrapper.appendChild(newElement);
    newElementWrapper.id = "wrapper-" + this.id;
    if (oldElement instanceof Node) {
      // already exists, so write over it
      oldElement.innerHTML = "";
      const parentNode = oldElement.parentNode;
      parentNode.replaceChild(newElementWrapper, oldElement);
    } else if (ops["id"] != undefined) {
      this.writeOps = ops;
      document.getElementById(ops["id"]).appendChild(newElementWrapper);
    }
  }
  addCSS(element, css = {}) {
    Object.assign(element.style, css);
  }
  addClass(element, cls = "") {
    element.classList.add(cls);
  }
  setPrompt() {}
  setGuesses() {}
  setContent() {}
  setAnswer() {}
  setup() {}
  processGuess(guess) {
    if (this.caseSensitive) {
      return guess.toString();
    } else {
      return guess.toString().toLowerCase();
    }
  }
  processAnswer(answer) {
    if (answer instanceof Array) {
      return answer.join(" ").toLowerCase();
    } else {
      return String(answer).toLowerCase();
    }
  }
  checkAnswer(guess) {
    return this.processAnswer(this.answer) == this.processGuess(guess);
  }
  wrongAnswer() {
    return `Sorry, the answer is ${this.processAnswer(this.answer)}`;
  }
  createDIV(classes = [], css = {}, html) {
    const el = document.createElement("DIV");
    el.classList.add(...toArray(classes));
    Object.assign(el.style, css);
    if (html) {
      el.innerHTML = html;
    }
    return el;
  }
  makePromptElement() {
    const prompt = this.createDIV("prompt", {}, this.prompt);
    return prompt;
  }
  makeContentElement() {
    const content = this.createDIV("content");
    if (this.content instanceof Node) {
      content.appendChild(this.content);
    } else {
      content.innerHTML = this.content;
    }
    return content;
  }
  makeGuessesElement() {
    const guesses = this.createDIV("guesses", {}, this.guesses);
    return guesses;
  }
  makeAnswerElement() {
    const answer = this.createDIV("answer", {}, this.answer);
    return answer;
  }
  makeElement(ops = {}) {
    const {
      description = false,
      prompt = true,
      content = true,
      answer = false,
      making = false,
    } = ops;

    const wrapper = this.createDIV("questionWrapper");
    Object.assign(wrapper.style, {});

    if (making) {
      var bar = this.createDIV(["makingBar"]);
      var checkbox = document.createElement("input");
      checkbox.classList.add("selectBox");
      checkbox.classList.add("questionCheckbox");
      checkbox.setAttribute("type", "checkbox");
      checkbox.id = "checkbox-wrapper-" + this.id;
      checkbox.name = this.type;
      bar.appendChild(checkbox);

      var buttonEl = document.createElement("button");
      buttonEl.innerHTML = "REFRESH";
      buttonEl.addEventListener("click", () => {
        this.generate();
        this.write(this.writeOps);
      });
      bar.appendChild(buttonEl);

      var labelEl = this.createDIV([], {
        display: "flex",
        "margin-left": "3mm",
        color: "blue",
      });
      if (typeof description === "string") {
        labelEl.innerHTML = description.split("-").reverse()[0];
      }

      bar.appendChild(labelEl);

      wrapper.appendChild(bar);
    }

    // if (description!=false && this.description!=undefined) {
    //   var descrEl = this.createDIV([],{'display':'flex','justify-content':'center','color':'orange'})
    //   descrEl.innerHTML = this.description + ' ' + description
    //   wrapper.appendChild(descrEl)
    // }

    if (prompt) {
      wrapper.appendChild(this.makePromptElement());
    }

    if (content) {
      wrapper.appendChild(this.makeContentElement(this));
    }

    if (answer) {
      wrapper.appendChild(this.makeAnswerElement());
    }

    return wrapper;
  }
  generate() {
    this.setPrompt();
    this.setContent();
    this.setGuesses();
    this.setAnswer();
    this.setup(this);
  }
}
Question.all = {};
Question.count = 0;
Question.create = function (typeString, ops = {},generate=true) {
  var arg = Question.Types[typeString];
  if (arg == undefined) {
    console.log("UNKNOWN QUESTION TYPE", typeString);
    console.log(typeString);
  }

  const opsWithName = Object.assign({ type: typeString }, ops);
  var question;
  if (typeof arg == "function") {
    question = arg(opsWithName);
  } else if (arg instanceof Object) {
    var obj = Object.assign({}, arg);
    question = new arg["questionClass"](Object.assign(obj, opsWithName));
    // question.generate();
  }
  if (generate==true) {
    question.generate()
  }
  question.questionType = typeString;
  question.args = [typeString, ops];
  return question;
};
Question.Types = {};

class QuestionMultipleChoice extends Question {
  constructor(defaults = {}, userOps = {}) {
    super(
      Object.assign(
        {
          n: 5,
          labeled: false,
          labelType: "numbers",
          labelCase: "lowercase",
          direction: "row",
          containerClass: "choiceRow",
          choicePairCSS: { display: "block" },
        },
        defaults
      ),
      userOps
    );
  }
  setContent() {
    if (this.labeled) {
      if (this.labelType == "numbers") {
        this.labels = range(1, this.choices.length + 1);
      } else {
        this.labels = allLetters(this.caseness).slice(0, this.choices.length);
      }
      this.answer = this.labels[this.answerIndex];
    } else {
      this.content = this.choices;
    }
  }
  makeContentElement() {
    const content = this.createDIV("content");
    const topcontent = this.createDIV("content");
    const choiceRow = this.createDIV(["content", this.containerClass]);
    if (this.labeled) {
      if (this.choiceElements === undefined) {
        this.choiceElements = [];
        this.choices.map((x) => {
          this.choiceElements.push(
            this.createDIV(["content"], { "font-size": "30" }, x)
          );
        });
      }
      choiceRow.classList.add("multipleChoice");
      this.choiceElements.forEach((x, ind) => {
        const oneEl = captionElement(
          x,
          this.labels[ind],
          {},
          "choice",
          this.direction
        );
        Object.assign(oneEl.style, this.choicePairCSS);
        choiceRow.appendChild(oneEl);
      });
    } else {
      choiceRow.innerHTML = this.choices.join("&nbsp;&nbsp;&nbsp;");
    }
    if (this.topcontent) {
      content.appendChild(this.topcontent);
    }
    content.appendChild(choiceRow);
    return content;
  }
  generate() {
    this.setup(this);
    this.setContent();
  }
}

class QuestionMultipleChoiceColumn extends QuestionMultipleChoice {
  constructor(defaults = {}, userOps = {}) {
    super(
      Object.assign(
        {
          choicePairCSS: {
            display: "flex",
            "align-items": "center",
            "margin-top": "2mm",
          },
          direction: "column",
          containerClass: "choiceColumn",
        },
        defaults
      ),
      userOps
    );
  }
}

/*
  Displays multiple words as content
  Has caseness options
*/
class QuestionMultipleWords extends Question {
  constructor(defaults = {}, userOps = {}) {
    super(
      Object.assign(
        {
          n: 5,
          caseness: "uppercase",
          caseSensitive: false,
        },
        defaults
      ),
      userOps
    );
  }
  makeContentElement() {
    var content = document.createElement("DIV");
    content.innerHTML = caseAdjust(this.choices, this.caseness).join(
      "&nbsp;&nbsp;"
    );
    this.addClass(content, "content");
    return content;
  }
}

//


////////////////////

Question.Types["other-chessPosition"] = function (ops = {}) {
  var q = new Question(
    {
      labels: true,
    },
    ops
  );
  q.setPrompt = () => (q.prompt = `What is the position of the pawn?`);
  q.setContent = () => {
    q.rowLabels = range(1, 9, 1).map((x) => (q.labels ? x : ""));
    q.colLabels = allLetters()
      .slice(0, 8)
      .map((x) => (q.labels ? x : ""));
    var positions = [];
    for (var i = 0; i < 8; i++) {
      positions[i] = [];
      for (var j = 0; j < 8; j++) {
        positions[i][j] = "";
      }
    }
    const chessPieces = {
      K: "&#9812",
      Q: "&#9813",
      R: "&#9814",
      B: "&#9815",
      N: "&#9816",
      P: "&#9817",
      k: "&#9818",
      q: "&#9819",
      r: "&#9820",
      b: "&#9821",
      n: "&#9822",
      p: "&#9823",
      "": "",
    };
    const rowPos = randomSample(range(0, 8));
    const colPos = randomSample(range(0, 8));
    positions[colPos][rowPos] = chessPieces["p"];
    q.pieces = positions;

    q.answer = allLetters()[rowPos] + "" + (colPos + 1);
  };
  q.makeContentElement = () => {
    return gridOfBoxes(8, 8, true, [q.rowLabels, q.colLabels], q.pieces, {
      headerClass: "zero",
      elementCSS: {
        width: "45px",
        height: "45px",
        margin: "0%",
        "font-size": "34",
        "letter-spacing": "2px",
        border: "solid black 1px",
      },
    });
  };
  // q.generate();
  return q;
};

function gridOfBoxes(
  rows = 8,
  cols = 8,
  shading = false,
  labeling = false,
  values = false,
  layout = {}
) {
  const boxStyle = `width:${layout.elementCSS.width}; height:${layout.elementCSS.height};
    border:solid black 1px; margin:0;
    align-items:center; justify-content:center; display:flex;
    font-size:${layout.elementCSS["font-size"]};`;

  var container = document.createElement("DIV");
  Question.prototype.addCSS(container, {
    display: "flex",
    "flex-wrap": "wrap",
    margin: "15px 0%",
    "justify-content": "center",
    color: "black",
  });

  const labelStyle = "display:flex; margin:2px; color:black;";
  const labelElStyle = `display:flex; width:${layout.elementCSS.width}; justify-content:center; font-size:20px; color:black;`;

  for (var i = 0; i < rows; i++) {
    var row = document.createElement("DIV");
    Question.prototype.addCSS(row, {
      display: "flex",
      "flex-wrap": "wrap",
      "align-items": "center",
      "font-size": "20px",
      "justfiy-content": "center",
    });

    for (var j = 0; j < cols; j++) {
      var bgColor = "white";
      if (shading && j % 2 === i % 2) {
        bgColor = "#E1E1E1";
      }
      var el = document.createElement("DIV");
      el.innerHTML = values[i][j] + "";
      el.style = boxStyle + "background:" + bgColor;
      Question.prototype.addCSS(el, {});
      row.appendChild(el);
    }
    var rowLast = document.createElement("DIV");
    rowLast.innerHTML = labeling[0][i] + "";
    rowLast.style = labelElStyle;
    row.appendChild(rowLast);

    var rowFirst = document.createElement("DIV");
    rowFirst.innerHTML = labeling[0][i] + "";
    rowFirst.style = labelElStyle;
    row.insertAdjacentElement("afterbegin", rowFirst);

    container.insertAdjacentElement("afterbegin", row);
  }
  if (labeling !== true) {
    var top = document.createElement("DIV");
    top.style = labelStyle;
    labeling[1].forEach((x) => {
      var el = document.createElement("DIV");
      el.innerHTML = x;
      el.style = labelElStyle;
      top.appendChild(el);
    });

    var bottom = document.createElement("DIV");
    bottom.style = labelStyle;
    labeling[1].forEach((x) => {
      var el = document.createElement("DIV");
      el.innerHTML = x;
      el.style = labelElStyle;
      bottom.appendChild(el);
    });

    container.insertAdjacentElement("afterbegin", top);
    container.appendChild(bottom);
  }
  return container;
}

////////////////////////////

class QuestionQuestion extends Question {
  constructor(defaults = {}, userOps = {}) {
    super(defaults, userOps);
  }
  setAnswer() {}
  setContent() {
    this.values = this.valueGenerator();
    this.answer = this.makeAnswer(this.values);
    this.content = this.questionGenerator(this.values);
  }
  makeContentElement() {
    var content = document.createElement("DIV");
    this.addClass(content, "content");
    content.innerHTML = this.content;
    return content;
  }
}

function namesList() {
  return namesListGirl().concat(namesListBoy());
}

function namesListGirl() {
  return[ "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Evelyn", "Abigail", "Harper", "Emily", "Elizabeth", "Avery", "Sofia", "Ella", "Madison", "Scarlett", "Victoria", "Aria", "Grace", "Chloe", "Camila", "Penelope", "Riley", "Layla", "Lillian", "Nora", "Zoey", "Mila", "Aubrey", "Hannah", "Lily", "Addison", "Eleanor", "Natalie", "Luna", "Savannah", "Brooklyn", "Leah", "Zoe", "Stella", "Hazel", "Ellie", "Paisley", "Audrey", "Skylar", "Violet", "Claire", "Bella", "Aurora", "Lucy", "Anna", "Samantha", "Caroline", "Genesis", "Aaliyah", "Kennedy", "Kinsley", "Allison", "Maya", "Sarah", "Madelyn", "Adeline", "Alexa", "Ariana", "Elena", "Gabriella", "Naomi", "Alice", "Sadie", "Hailey", "Eva", "Emilia", "Autumn", "Quinn", "Nevaeh", "Piper", "Ruby", "Serenity", "Willow", "Everly", "Cora", "Kaylee", "Lydia", "Aubree", "Arianna", "Eliana", "Peyton", "Melanie", "Gianna", "Isabelle", "Julia", "Valentina", "Nova", "Clara", "Vivian", "Reagan", "Mackenzie", "Madeline", "Brielle", "Delilah", "Isla", "Rylee", "Katherine", "Sophie", "Josephine", "Ivy", "Liliana", "Jade", "Maria", "Taylor", "Hadley", "Kylie", "Emery", "Adalynn", "Natalia", "Annabelle", "Faith", "Alexandra", "Ximena", "Ashley", "Brianna", "Raelynn", "Bailey", "Mary", "Athena", "Andrea", "Leilani", "Jasmine", "Lyla", "Margaret", "Alyssa", "Adalyn", "Arya", "Norah", "Khloe", "Kayla", "Eden", "Eliza", "Rose", "Ariel", "Melody", "Alexis", "Isabel", "Sydney", "Juliana", "Lauren", "Iris", "Emerson", "London", "Morgan", "Lilly", "Charlie", "Aliyah", "Valeria", "Arabella", "Sara", "Finley", "Trinity", "Ryleigh", "Jordyn", "Jocelyn", "Kimberly", "Esther", "Molly", "Valerie", "Cecilia", "Anastasia", "Daisy", "Reese", "Laila", "Mya", "Amy", "Teagan", "Amaya", "Elise", "Harmony", "Paige", "Adaline", "Fiona", "Alaina", "Nicole", "Genevieve", "Lucia", "Alina", "Mckenzie", "Callie", "Payton", "Eloise", "Brooke", "Londyn", "Mariah", "Julianna", "Rachel", "Daniela", "Gracie", "Catherine", "Angelina", "Presley", "Josie", "Harley", "Adelyn", "Vanessa", "Makayla", "Parker", "Juliette", "Amara", "Marley", "Lila", "Ana", "Rowan", "Alana", "Michelle", "Malia", "Rebecca", "Brooklynn", "Brynlee", "Summer", "Sloane", "Leila", "Sienna", "Adriana", "Sawyer", "Kendall", "Juliet", "Destiny", "Alayna", "Elliana", "Diana", "Hayden", "Ayla", "Dakota", "Angela", "Noelle", "Rosalie", "Joanna", "Jayla", "Alivia", "Lola", "Emersyn", "Georgia", "Selena", "June", "Daleyza", "Tessa", "Maggie", "Jessica", "Remi", "Delaney", "Camille", "Vivienne", "Hope", "Mckenna", "Gemma", "Olive", "Alexandria", "Blakely", "Izabella", "Catalina", "Raegan", "Journee", "Gabrielle", "Lucille", "Ruth", "Amiyah", "Evangeline", "Blake", "Thea", "Amina", "Giselle", "Lilah", "Melissa", "River", "Kate", "Adelaide", "Charlee", "Vera", "Leia", "Gabriela", "Zara", "Jane", "Journey", "Elaina", "Miriam", "Briella", "Stephanie", "Cali", "Ember", "Lilliana", "Aniyah", "Logan", "Kamila", "Brynn", "Ariella", "Makenzie", "Annie", "Mariana", "Kali", "Haven", "Elsie", "Nyla", "Paris", "Lena", "Freya", "Adelynn", "Lyric", "Camilla", "Sage", "Jennifer", "Paislee", "Talia", "Alessandra", "Juniper", "Fatima", "Raelyn", "Amira", "Arielle", "Phoebe", "Kinley", "Ada", "Nina", "Ariah", "Samara", ];
}

function namesListBoy() {
  return [ "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah", "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel", "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian", "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke", "Gabriel", "Anthony", "Isaac", "Grayson", "Jack", "Julian", "Levi", "Christopher", "Joshua", "Andrew", "Lincoln", "Mateo", "Ryan", "Jaxon", "Nathan", "Aaron", "Isaiah", "Thomas", "Charles", "Caleb", "Josiah", "Christian", "Hunter", "Eli", "Jonathan", "Connor", "Landon", "Adrian", "Asher", "Cameron", "Leo", "Theodore", "Jeremiah", "Hudson", "Robert", "Easton", "Nolan", "Nicholas", "Ezra", "Colton", "Angel", "Brayden", "Jordan", "Dominic", "Austin", "Ian", "Adam", "Elias", "Jaxson", "Greyson", "Jose", "Ezekiel", "Carson", "Evan", "Maverick", "Bryson", "Jace", "Cooper", "Xavier", "Parker", "Roman", "Jason", "Santiago", "Chase", "Sawyer", "Gavin", "Leonardo", "Kayden", "Ayden", "Jameson", "Kevin", "Bentley", "Zachary", "Everett", "Axel", "Tyler", "Micah", "Vincent", "Weston", "Miles", "Wesley", "Nathaniel", "Harrison", "Brandon", "Cole", "Declan", "Luis", "Braxton", "Damian", "Silas", "Tristan", "Ryder", "Bennett", "George", "Emmett", "Justin", "Kai", "Max", "Diego", "Luca", "Ryker", "Carlos", "Maxwell", "Kingston", "Ivan", "Maddox", "Juan", "Ashton", "Jayce", "Rowan", "Kaiden", "Giovanni", "Eric", "Jesus", "Calvin", "Abel", "King", "Camden", "Amir", "Blake", "Alex", "Brody", "Malachi", "Emmanuel", "Jonah", "Beau", "Jude", "Antonio", "Alan", "Elliott", "Elliot", "Waylon", "Xander", "Timothy", "Victor", "Bryce", "Finn", "Brantley", "Edward", "Abraham", "Patrick", "Grant", "Karter", "Hayden", "Richard", "Miguel", "Joel", "Gael", "Tucker", "Rhett", "Avery", "Steven", "Graham", "Kaleb", "Jasper", "Jesse", "Matteo", "Dean", "Zayden", "Preston", "August", "Oscar", "Jeremy", "Alejandro", "Marcus", "Dawson", "Lorenzo", "Messiah", "Zion", "Maximus", "River", "Zane", "Mark", "Brooks", "Nicolas", "Paxton", "Judah", "Emiliano", "Kaden", "Bryan", "Kyle", "Myles", "Peter", "Charlie", "Kyrie", "Thiago", "Brian", "Kenneth", "Andres", "Lukas", "Aidan", "Jax", "Caden", "Milo", "Paul", "Beckett", "Brady", "Colin", "Omar", "Bradley", "Javier", "Knox", "Jaden", "Barrett", "Israel", "Matias", "Jorge", "Zander", "Derek", "Josue", "Cayden", "Holden", "Griffin", "Arthur", "Leon", "Felix", "Remington", "Jake", "Killian", "Clayton", "Sean", "Adriel", "Riley", "Archer", "Legend", "Erick", "Enzo", "Corbin", "Francisco", "Dallas", "Emilio", "Gunner", "Simon", "Andre", "Walter", "Damien", "Chance", "Phoenix", "Colt", "Tanner", "Stephen", "Kameron", "Tobias", "Manuel", "Amari", "Emerson", "Louis", "Cody", "Finley", "Iker", "Martin", "Rafael", "Nash", "Beckham", "Cash", "Karson", "Rylan", "Reid", "Theo", "Ace", "Eduardo", "Spencer", "Raymond", "Maximiliano", "Anderson", "Ronan", "Lane", "Cristian", "Titus", "Travis", "Jett", "Ricardo", "Bodhi", "Gideon", "Jaiden", "Fernando", "Mario", "Conor", "Keegan", "Ali", "Cesar", "Ellis", "Jayceon", "Walker", "Cohen", "Arlo", "Hector", "Dante", "Kyler", "Garrett", "Donovan", "Seth", "Jeffrey", "Tyson", "Jase", "Desmond", "Caiden", "Gage", "Atlas", "Major", "Devin", "Edwin", "Angelo", "Orion", "Conner", "Julius", "Marco", ];
}

function numberList() {
  return [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
}

function thingList() {
  return ["car", "bike", "hat", "rock", "dollar", "toy", "apple", "cousin",
    'pet','snack','nickel','dime','quarter'];
}


function makeImageElementRow(
  filenames,
  size = 150,
  imgCSS = {},
  wrapperCSS = {}
) {
  var wrapper = document.createElement("DIV");
  Object.assign(wrapper.style, wrapperCSS);
  filenames.forEach((x) => {
    var img = makeImageElement(x, size, imgCSS);
    wrapper.appendChild(img);
  });
  return wrapper;
}
function makeImageElement(filename, size = 150, css = {}) {
  var img = document.createElement("IMG");
  img.src = imagesPath + filename;
  if (size instanceof Array) {
    if (size[0] != undefined) {
      img.width = size[0];
    }
    if (size[1] != undefined) {
      img.height = size[1];
    }
  } else {
    img.height = size;
  }
  Object.assign(img.style, css);
  return img;
}

function captionElement(
  element,
  caption,
  css = {},
  cls = "choice",
  format = "row"
) {
  var container = document.createElement("DIV");
  Object.assign(container.style, css);
  var captionEl = document.createElement("DIV");
  captionEl.classList.add(cls);
  captionEl.innerHTML = caption;
  if (format === "row") {
    container.appendChild(element);
    container.appendChild(captionEl);
  } else {
    container.appendChild(captionEl);
    container.appendChild(element);
  }
  return container;
}
