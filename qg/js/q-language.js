//
//  SINGLE QUESTIONS
//

Question.Types["language-words-containsword"] = function (ops = {}) {
  var qst = new Question(
    {
      minAnswerLength: 3,
    },
    ops
  );
  qst.prompt = `Find a shorter word contained in the big word below.  Your word should be at least ${qst.minAnswerLength} letters long.`;
  qst.content = randomSample(bigWordsContainingSmallerWords);
  qst.checkAnswer = (guess) => {
    const guessClean = qst.processGuess(guess);
    const isInq = qst.content.toLowerCase().includes(guessClean);
    const isWordQ = words10k.includes(guessClean);
    return isInq && isWordQ && guessClean.length >= qst.minAnswerLength;
  };
  qst.wrongAnswer = () => {
    return "Sorry, I do not know that word";
  };
  // qst.generate();
  return qst;
};

Question.Types["language-spelling-makeWordFromLetters"] = function (ops = {}) {
  var qst = new Question(
    {
      minAnswerLength: 3,
    },
    ops
  );
  qst.prompt = `Make a word using the letters below.  Your word should be at least ${qst.minAnswerLength} letters long.`;
  qst.content = shuffle(
    randomSample(bigWordsContainingSmallerWords).split("")
  ).join(" ");
  qst.checkAnswer = (guess) => {
    const guessClean = qst.processGuess(guess);
    const isInq =
      complement(guessClean.split(""), qst.content.toLowerCase().split(""))
        .length == 0;
    const isWordQ = words10k.includes(guessClean);
    return isInq && isWordQ && guessClean.length >= 3;
  };
  qst.wrongAnswer = () => {
    return "Sorry, I do not know that word";
  };
  // qst.generate();
  return qst;
};

Question.Types["language-spelling-correctwordFromLetters"] = function (ops = {}) {
  var qst = new QuestionMultipleWords(
    {
      minAnswerLength: 4,
      maxAnswerLength: 6,
      n: 4,
    },
    ops
  );
  qst.setup = () => {
    const len = randomInteger(qst.minAnswerLength, qst.maxAnswerLength);
    qst.choices = randomSample(
      words10k.filter((x) => x.length == len),
      qst.n
    );
    qst.answer = randomSample(qst.choices);
    qst.letters = shuffle(qst.answer.split(""));
    qst.prompt = `Which word below can be made from the letters: ${qst.letters.join(
      " "
    )}`;
  };
  qst.wrongAnswer = () => {
    return "Sorry, I do not know that word";
  };
  // qst.generate();
  return qst;
};


defineQuestionType("language-letters-uppercase lowercase-upperLowerMatching", {
  n: 4,
  caseness: randomSample(["uppercase", "lowercase"]),
  labeled: true,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.choices = randomSample(allLetters(qst.caseness), qst.n);
    qst.answerIndex = randomInteger(0, qst.n - 1);
    qst.matchMe = qst.choices[qst.answerIndex];
    qst.choiceElements = [];
    qst.choices.map((x) => {
      qst.choiceElements.push(qst.createDIV([], { "font-size": "40" }, x));
    });
    if (qst.caseness == "uppercase") {
      qst.matchMe = qst.matchMe.toLowerCase();
    } else {
      qst.matchMe = qst.matchMe.toUpperCase();
    }
    qst.prompt = `Which letter is the ${qst.caseness} version of ${qst.matchMe}?`;
  },
});


defineQuestionType("language-letters-orderLetters", {
  n: 5,
  caseness: "uppercase",
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.order = randomSample(["alphabetical", "reverse alphabetical"]);
    qst.prompt = `Put the letters in ${qst.order} order`;
    qst.choices = randomSample(allLetters(qst.caseness), qst.n);
    qst.answer = qst.choices.slice().sort();
    if (qst.order === "reverse alphabetical") {
      qst.answer.reverse();
    }
  },
});

defineQuestionType("language-words-rhymingWordChoice", {
  n: 5,
  caseness: "uppercase",
  labeled: true,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    var rhymeSounds = randomSample(Object.keys(rhymingWordSets()), qst.n);
    var twoFromFirst = randomSample(rhymingWordSets()[rhymeSounds[0]], 2);
    qst.answer = twoFromFirst[1];
    var otherWords = rhymeSounds
      .slice(1)
      .map((x) => randomChoice(rhymingWordSets()[x]));
    var choiceList = shuffle(otherWords.concat([twoFromFirst[1]]));
    qst.choices = caseAdjust(choiceList, qst.caseness);
    qst.answerIndex = choiceList.indexOf(qst.answer);
    qst.prompt = `Which word rhymes with <span class='keyword'>${caseAdjust(
      twoFromFirst[0],
      qst.caseness
    )}</span>?`;
  },
});


defineQuestionType("language-compareLetters", {
  n: 2,
  caseness: "uppercase",
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.comparator = randomSample(["earlier", "later"]);
    qst.prompt = `Which of these letters comes ${qst.comparator} in the alphabet?`;
    qst.choices = randomSample(allLetters(qst.caseness), qst.n);
    let sorted = qst.choices.sort();
    if (qst.comparator === "later") {
      sorted.reverse();
    }
    qst.answer = sorted[0];
  },
});

defineQuestionType("language-letters-vowelChoose", {
  tags:['vowels'],
  n: 4,
  questionClass: QuestionMultipleWords,
  setup: (qst) => {
    qst.answer = randomSample(allVowels(), 1);
    qst.choices = shuffle(
      randomSample(allConsonants(), qst.n - 1).concat(qst.answer)
    );
    qst.prompt = `Which letter below is a vowel?`;
  },
});


defineQuestionType("language-letters-vowelCount", {
  n: 10,
  questionClass: QuestionMultipleWords,
  setup: (qst) => {
    qst.prompt = `How many vowels are shown below?`;
    const m = randomInteger(1, qst.n - 2);
    const vowels = randomSample(allVowels(), m);
    qst.answer = vowels.length;
    qst.choices = shuffle(
      randomSample(allConsonants(), qst.n - m).concat(vowels)
    );
  },
});

defineQuestionType("language-letters-vowelSounds", {
  n: 4,
  questionClass: QuestionMultipleWords,
  setup: (qst) => {
    qst.sound = randomSample(["short", "long"]);
    qst.short = flatten(Object.values(vowelSounds()["short"]));
    qst.long = flatten(Object.values(vowelSounds()["long"]));
    qst.answer = randomSample(qst[qst.sound], 1);
    const otherChoices = randomSample(
      qst[qst.sound == "short" ? "long" : "short"],
      qst.n - 1
    );
    qst.choices = shuffle(otherChoices.concat(qst.answer));
    qst.prompt = `Which word has a ${qst.sound} vowel sound?`;
  },
});

function vowelSounds() {
  return {
    short: {
      a: [ "cat", "hat", "back", "bag", "ball", "cart", "dash", "fat", "fast", "gap", "hat", "had", "lap", "map", "nap", "mat", "mad", "rat", "sad", "sat", "tap", "vat", ],
      e: [ "peg", "get", "bed", "dent", "get", "met", "net", "pet", "pen", "men", "ten", ],
      i: [ "kick", "sip", "bill", "city", "dish", "tip", "sip", "lip", "rip", "nip", "hip", "hit", "sit", "bit", "fit", ],
      o: [ "box", "pop", "boss", "cost", "dots", "cot", "lot", "hot", "rot", "rob", "sob", "mob", "bob", "cob", ],
      u: ["up", "bus", "bulb", "cuff", "dust", "cup", "pup"],
    },
    long: {
      a: [ "cape", "say", "babe", "base", "cane", "date", "rate", "fate", "gate", "plate", "day", "hay", "pray", "way", ],
      e: ["key", "deep", "beef", "deed", "feet", "meet", "deer", "see"],
      i: [ "hide", "sigh", "bite", "cite", "dire", "fire", "tire", "wire", "hire", "kite", "night", "site", "sight", ],
      o:[ "hope", "Joe", "boat", "bone", "cozy", "dose", "snow", "blow", "show", "rope", "nope", "phone", "stone", "row", "tow", "crow", ],
      u: ["puke", "super", "cube", "dupe"],
    },
  };
}

defineQuestionType("language-spelling-pictureJumble", {
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    (qst.prompt = "Unscramble the world below"),
      (qst.image = randomSample(imageNames())),
      (qst.topcontent = makeImageElement(qst.image, 150, {
        "background-color": "white",
      })),
      (qst.answer = imageNameFromFileName(qst.image));
    qst.choices = [shuffle(qst.answer.split("")).join("&nbsp;&nbsp;")];
  },
});


defineQuestionType("language-reading-picture words-word from picture", {
  n: 4,
  questionClass: QuestionMultipleChoice,
  labeled: false,
  setup: (qst) => {
    qst.prompt = "Choose the word that best describes the picture";
    qst.images = randomSample(imageNames(), qst.n);
    qst.choices = qst.images.map((x) => imageNameFromFileName(x));
    qst.image = randomSample(qst.images);
    qst.answer = imageNameFromFileName(qst.image);
    qst.answerIndex = qst.choices.indexOf(qst.answer);
    qst.topcontent = makeImageElement(qst.image, 150, {
      "background-color": "white",
    });
  },
});

defineQuestionType("language-spelling-pictureChooseSpelling", {
  n: 4,
  questionClass: QuestionMultipleChoice,
  setup: (qst) => {
    qst.prompt = "Which is the correctly spelled word to describe the picture?";
    qst.image = randomSample(imageNames());
    qst.answer = imageNameFromFileName(qst.image);
    qst.topcontent = makeImageElement(qst.image, 150, {
      "background-color": "white",
    });
    const misspellings = range(0, qst.n - 1).map((x) =>
      shuffle(qst.answer.split("")).join("")
    );
    qst.choices = shuffle(misspellings.concat([qst.answer]));
  },
});




// Letters
[false, true].map((y) => {
  ["uppercase", "lowercase", "mixed"].map((x) => {
    defineQuestionType(
      `language-letters-comparing-Compare the ${x} letters in order, case&minus;sensitive:${y}`,
      { questionName: "language-compareLetters", caseness: x, caseSensitive: y }
    );
    defineQuestionType(
      `language-letters-ordering-Put the ${x} letters in order, case&minus;sensitive:${y}`,
      { questionName: "language-letters-orderLetters", caseness: x, caseSensitive: y }
    );
  });
});


//
// GROUPS OF QUESTIONS
//

Question.Bundle["language-letters-ordering-ordering letters"] = {
  "Put the letters in order, ignoring case on input": Bundle.pmap(
    "language-letters-orderLetters",
    { caseSensitive: false },
    "caseness",
    ["uppercase", "lowercase", "mixed"]
  ),
  "Put the letters in order, matching case on input": Bundle.pmap(
    "language-letters-orderLetters",
    { caseSensitive: true },
    "caseness",
    ["uppercase", "lowercase", "mixed"]
  ),
};

Bundle.define("language-letters-vowels", {
  Identifying: [
    ["language-letters-vowelChoose", {}],
    ["language-letters-vowelCount", {}],
  ],
  Sounds: "language-letters-vowelSounds",
});

Question.Bundle["language-spelling"] = {
  "Unscramble the letters": "language-spelling-pictureJumble",
  "Choose the correct spelling": "language-spelling-pictureChooseSpelling",
  "Match the letters": "language-spelling-correctwordFromLetters",
  "Build a word": "language-spelling-makeWordFromLetters",
};

Bundle.define("language-rhyming", {
  "Choose the rhyming word": [["language-words-rhymingWordChoice", {}]],
});
