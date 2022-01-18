class Bundle {
  constructor(...args) {
    if (args.length === 1 && args[0] instanceof Object) {
      // object
      const {
        category,
        subcategory,
        topic,
        questions
      } = args[0];
    }

    this.category = category;
    this.subcategory = subcategory;
    this.topic = topic;
    this.quetions = [];
  }
  define(label, obj) {}
}
Bundle.pmap = function(qname, fixedPars, par, arr) {
  return arr.map((x) => [qname, Object.assign({}, fixedPars, {
    par: x
  })]);
};
Bundle.define = function(name, arg, sharedPars) {
  const newObj = {};
  const obj = arg instanceof Array ? arrayToObject(arg) : arg;
  for (key in obj) {
    newObj[key] = toArrayArray(obj[key]).map((x) => [
      x[0],
      Object.assign({}, sharedPars, x[1]),
    ]);
  }
  Question.Bundle[name] = newObj;
};
Bundle.defineOneQ = function(name, qname, sharedPars, descrAndPars) {
  const newObj = {};
  descrAndPars.forEach((x) => {
    newObj[x[0]] = toArray(x[1]).map((y) => [
      qname,
      Object.assign({}, sharedPars, y),
    ]);
  });
  Question.Bundle[name] = newObj;
};

function arrayToObject(array) {
  return array.reduce((obj, [k, v]) => {
    obj[k] = v;
    return obj;
  }, {});
}

function toArrayArray(arg) {
  if (arg instanceof Array) {
    if (arg[0] instanceof Array) {
      return arg;
    } else {
      return [arg];
    }
  } else {
    return [
      [arg]
    ];
  }
}

Progression = {};
Concept = {};
Question.Bundle = {};
Progression.Types = {};
Concept.Types = {};

/*
  COUNTING
*/
Bundle.define("math-counting-images", {
  "counting one type of image": [
    ["math-counting-countOneImage", {}],
    ["math-counting-countOneImage", {
      answerRange: [5, 10]
    }],
  ],
  "counting a subset of the images": [
    ["math-counting-countOneOfSeveralImages", {
      numTotal: 10,
      numDifferent: 2
    }],
    ["math-counting-countOneOfSeveralImages", {
      numTotal: 15,
      numDifferent: 3
    }],
  ],
});

// [
//   [1, "ones"],
//   [10, "tens"],
//   [5, "fives"],
//   [2, "twos"],
//   [3, "threes"],
//   [[1, 10], "up to 10"],
// ].forEach(([num, strnum]) => {
//   [
//     ["forward", false],
//     ["backward", true],
//   ].forEach(([str, bool]) => {
//     Bundle.define(
//       `math-counting-${strnum}-counting ${str} by ${strnum}`,
//       [10, 20, 50, 100].map((x) => [
//         `count ${str} by ${strnum} under ${x}`,
//         [
//           ["math-counting-countingSequence", { start: [0, x - 5], step: num, reverse: bool }],
//           [
//             "math-counting-countingSequence",
//             { start: [0, x - 3], step: num, n: 4, reverse: bool },
//           ],
//           [
//             "math-counting-countingSequence",
//             { start: [0, x - 2], step: num, n: 3, reverse: bool },
//           ],
//         ],
//       ])
//     );
//   });
// });

Bundle.define("math-comparisons-Number Comparisions", {
  "Whole Numbers": [2, 3, 4].map((x) => [
    "math-numbers-compare",
    {
      n: x,
      min: 0,
      max: 20
    },
  ]),
});

Bundle.define("math-comparisons-Count Comparisions", {
  "Image Counts": ["math-counting-imageCountComparison", {
    min: 1,
    max: 5
  }],
  "Bar charts": [2, 3, 4].map((x) => [
    "math-data-chartComparisons",
    {
      n: x,
      min: 0,
      max: 10,
      chartType: "bar"
    },
  ]),
});

Bundle.define("math-comparisons-Size Comparisions", {
  "Image Sizes": [
    ["math-sizes-imageSizeComparison", {
      n: 3
    }],
    ["math-sizes-imageSizeComparison", {
      n: 4
    }],
  ],
});

Bundle.define("math-numbers-whole numbers", {
  "Reading bar charts": [
    ["math-data-howManyChart", {
      n: 2
    }],
    ["math-data-howManyChart", {
      n: 4
    }],
  ],
});


Bundle.define("math-addition-whole numbers-symbolic", {
  images: ["math-symbolic addition-images", {}],
});

[
  ["forward", "c"],
  ["inverse", "ab"],
].map(([dir, blank]) => {
  Question.Bundle[`math-addition-whole numbers-${dir} addition`] = {
    "Two numbers that can each be counted on a hand": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 10],
          termRanges: [
            [0, 5],
            [0, 5],
          ],
          format: "horizontal",
        },
      ],
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 10],
          termRanges: [
            [0, 5],
            [0, 5],
          ],
          format: "word",
        },
      ],
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 10],
          termRanges: [
            [1, 5],
            [1, 5],
          ],
          format: "image",
        },
      ],
    ],
    "Two numbers whose total can be counted on two hands": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 10],
          termRanges: [
            [6, 10],
            [1, 5],
          ],
          format: "horizontal",
        },
      ],
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 10],
          termRanges: [
            [6, 10],
            [1, 5],
          ],
          format: "word",
        },
      ],
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 10],
          termRanges: [
            [6, 10],
            [1, 5],
          ],
          format: "image",
        },
      ],
    ],
    "Adding 1 up to 100": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 100],
          termRanges: [
            [10, 99],
            [1, 1],
          ],
          format: "horizontal",
        },
      ],
    ],
    "Count up from the bigger number using hands": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 100],
          termRanges: [
            [10, 90],
            [1, 10],
          ],
          shuffle: true,
        },
      ],
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [1, 100],
          termRanges: [
            [10, 90],
            [1, 10],
          ],
          shuffle: true,
          format: "word",
        },
      ],
    ],
    "Two multidigit numbers that can be added without carrying": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          format: "vertical",
          carrying: "no",
          answerRange: [1, 200],
          termRanges: [
            [10, 89],
            [10, 89],
          ],
        },
      ],
    ],
    "Develop fluency adding up to 9+9 to prepare for carrying": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [11, 20],
          termRanges: [
            [1, 9],
            [1, 9],
          ],
        },
      ],
    ],
    "Practice doubles": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [0, 20],
          termRanges: [
            [1, 9],
            [1, 9],
          ],
          differenceRange: [0, 0],
        },
      ],
    ],
    "One off from doubles": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [0, 20],
          termRanges: [
            [1, 9],
            [1, 9],
          ],
          differenceRange: [1, 1],
        },
      ],
    ],
    "Carrying in the ones column": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [0, 99],
          termRanges: [
            [10, 99],
            [10, 99],
          ],
          carrying: "yes",
          format: "vertical",
        },
      ],
    ],
    "Carrying possible in two columns": [
      [
        "math-arithmetic",
        {
          sign: "+",
          blank: blank,
          answerRange: [0, 999],
          termRanges: [
            [100, 999],
            [100, 999],
          ],
          carrying: "yes",
          format: "vertical",
        },
      ],
    ],
  };
});

Question.Bundle["math-subtraction-whole numbers-forward subtraction"] = {
  "Subtraction for one hand": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [1, 5],
        termRanges: [
          [1, 5],
          [1, 5],
        ],
        shuffle: false,
      },
    ],
  ],
  "Subtractions for two hands": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 10],
        termRanges: [
          [6, 10],
          [1, 10],
        ],
        shuffle: false,
      },
    ],
  ],
  "Subtracting one up to 20": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 20],
        termRanges: [
          [1, 20],
          [1, 1],
        ],
        shuffle: false,
      },
    ],
  ],
  "Count down from the bigger number using two hands": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [1, 100],
        termRanges: [
          [10, 90],
          [1, 10],
        ],
        shuffle: false,
      },
    ],
  ],
  "Two multidigit numbers that can be added without borrowing": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        format: "vertical",
        carrying: "no",
        answerRange: [1, 200],
        termRanges: [
          [10, 89],
          [10, 89],
        ],
      },
    ],
  ],
  "Develop fluency subtracting one digit from 10-20 to prepare for borrowing": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 20],
        termRanges: [
          [10, 19],
          [1, 9],
        ],
        shuffle: false,
      },
    ],
  ],
  "Borowing in the ones column": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 99],
        termRanges: [
          [10, 99],
          [10, 99],
        ],
        carrying: "yes",
        format: "vertical",
        shuffle: false,
      },
    ],
  ],
  "Borrowing possible in two columns": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 999],
        termRanges: [
          [100, 999],
          [100, 999],
        ],
        carrying: "yes",
        format: "vertical",
        shuffle: false,
      },
    ],
  ],
};

Question.Bundle["math-subtraction-whole numbers-forward subtraction"] = {
  "Subtraction for one hand": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [1, 5],
        termRanges: [
          [1, 5],
          [1, 5],
        ],
        shuffle: false,
      },
    ],
  ],
  "Subtractions for two hands": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 10],
        termRanges: [
          [6, 10],
          [1, 10],
        ],
        shuffle: false,
      },
    ],
  ],
  "Subtracting one up to 20": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 20],
        termRanges: [
          [1, 20],
          [1, 1],
        ],
        shuffle: false,
      },
    ],
  ],
  "Count down from the bigger number using two hands": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [1, 100],
        termRanges: [
          [10, 90],
          [1, 10],
        ],
        shuffle: false,
      },
    ],
  ],
  "Two multidigit numbers that can be subtracted without borrowing": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        format: "vertical",
        carrying: "no",
        answerRange: [1, 200],
        termRanges: [
          [10, 89],
          [10, 89],
        ],
      },
    ],
  ],
  "Develop fluency subtracting one digit from 10-20 to prepare for borrowing": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 20],
        termRanges: [
          [10, 19],
          [1, 9],
        ],
        shuffle: false,
      },
    ],
  ],
  "Borowing in the ones column": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 99],
        termRanges: [
          [10, 99],
          [10, 99],
        ],
        carrying: "yes",
        format: "vertical",
        shuffle: false,
      },
    ],
  ],
  "Borrowing possible in two columns": [
    [
      "math-arithmetic",
      {
        sign: "-",
        blank: "c",
        answerRange: [0, 999],
        termRanges: [
          [100, 999],
          [100, 999],
        ],
        carrying: "yes",
        format: "vertical",
        shuffle: false,
      },
    ],
  ],
};

Bundle.defineOneQ(
  "math-subtraction-whole numbers-Subtract up to",
  "math-arithmetic", {
    sign: "-",
    blank: "c",
    shuffle: false
  },
  [10, 20, 50, 100].map((x) => [
    x,
    {
      answerRange: [0, x],
      termRanges: [
        [0, x],
        [0, x],
      ],
    },
  ])
);

//
// Question.Bundle['math-addition-whole numbers-inverse addition'] = {
//   'Two numbers that can each be counted on a hand':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[1,10],termRanges:[[0,5],[0,5]]}]
//     ],
//   'Two numbers whose total can be counted on two hands':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[1,10],termRanges:[[6,10],[1,10]],shuffle:false}]
//     ],
//   'Adding one within 10':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[1,10],termRanges:[[0,9],[1,1]],shuffle:false}]
//     ],
//   'Adding one within 20':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[1,20],termRanges:[[10,19],[1,1]],shuffle:false}]
//     ],
//   'Two multidigit numbers that can be added without carrying':[
//       ['math-arithmetic',{sign:'+',blank:'ab',format:'vertical',carrying:'no',answerRange:[1,200],termRanges:[[10,89],[10,89]]}]
//     ],
//   'Develop fluency adding up to 9+9 to prepare for carrying':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[11,20],termRanges:[[1,9],[1,9]]}]
//     ],
//   'Practice doubles':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[0,20],termRanges:[[1,9],[1,9]],differenceRange:[0,0]}]
//     ],
//   'One off from doubles':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[0,20],termRanges:[[1,9],[1,9]],differenceRange:[1,1]}]
//     ],
//   'Carrying in the ones column':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[0,99],termRanges:[[10,99],[10,99]],carrying:'yes',format:'vertical'}]
//     ],
//   'Carrying possible in two columns':[
//       ['math-arithmetic',{sign:'+',blank:'ab',answerRange:[0,999],termRanges:[[100,999],[100,999]],carrying:'yes',format:'vertical'}]
//     ]
// }

Bundle.defineOneQ(
  "math-multiplication-forward multilpication of whole numbers",
  "math-arithmetic", {
    sign: "*",
    blank: "c",
    shuffle: true
  },
  [
    [
      "Multiplying by zero",
      {
        answerRange: [0, 0],
        termRanges: [
          [1, 10],
          [0, 0],
        ],
      },
    ],
    [
      "Multiplying by 1",
      {
        answerRange: [1, 10],
        termRanges: [
          [1, 10],
          [1, 1],
        ],
      },
    ],
    [
      "Multiplying by 2",
      {
        answerRange: [1, 10000],
        termRanges: [
          [1, 10],
          [2, 2],
        ],
      },
    ],
    [
      "Multiplying by 10",
      {
        answerRange: [1, 10000],
        termRanges: [
          [1, 10],
          [10, 10],
        ],
      },
    ],
    [
      "Multiplying by 5",
      {
        answerRange: [1, 10000],
        termRanges: [
          [1, 10],
          [5, 5],
        ],
      },
    ],
    [
      "Multiplying up to 5 by 5",
      [{
          answerRange: [1, 10000],
          termRanges: [
            [1, 5],
            [1, 5],
          ],
        },
        {
          answerRange: [1, 10000],
          termRanges: [
            [1, 5],
            [1, 5],
          ],
          format: "word",
        },
      ],
    ],
  ]
);

Bundle.define("math-multiplication-relation to addition", {
  "Equivalent expressions": [
    ["math-multiplication-timePlusMatching", {
      top: "times"
    }],
    ["math-multiplication-timePlusMatching", {
      top: "plus"
    }],
  ],
});

Question.Bundle["math-time-clock reading"] = {
  "Times to the hour": [
    ["math-time-clockTime", {
      minuteIncrement: 60,
      minuteMarkers: false
    }],
  ],
  "Times to the half hour": [
    ["math-time-clockTime", {
      minuteIncrement: 30
    }]
  ],
  "Times to the quarter hour": [
    ["math-time-clockTime", {
      minuteIncrement: 15
    }]
  ],
  "Times to five minute increments": [
    ["math-time-clockTime", {
      minuteIncrement: 5
    }]
  ],
  "Time to the minute": [
    ["math-time-clockTime", {
      minuteIncrement: 1
    }]
  ],
};

Question.Bundle["math-place value-whole numbers"] = {
  "Reading whole numbers": [
    ["math-numbers-placeValueFrom", {}]
  ],
  "Building whole numbers": [
    ["math-numbers-placeValueTo", {
      format: "numbers"
    }],
    ["math-numbers-placeValueTo", {
      format: "words"
    }],
  ],
};
Question.Bundle["math-place value-decimals"] = {
  "Reading decimal numbers": [
    ["math-numbers-placeValueFrom", {
      decimalDigits: 1
    }]
  ],
  // 'Building whole numbers':[['math-numbers-placeValueTo',{format:'numbers'}],['math-numbers-placeValueTo',{format:'words'}]]
};

Bundle.define("math-numbers-fractions", {
  Equivalence: [
    ["math-fractions-equivalentFractions", {
      boxes: true
    }],
    ["math-fractions-equivalentFractions", {
      boxes: false
    }],
  ],
  Comparisons: [
    ["math-fractions-compareFractions", {
      boxes: true
    }],
    ["math-fractions-compareFractions", {
      boxes: true,
      n: 3
    }],
    ["math-fractions-compareFractions", {
      boxes: false
    }],
    ["math-fractions-compareFractions", {
      boxes: false,
      n: 3
    }],
  ],
});


Bundle.define("math-multiplication-upto10by10", {
  "Multiplication from 0x0 up to 10x10": [
    ['math-forwardMultiplication', {
      termRanges: [
        [0, 10],
        [0, 10]
      ]
    }],
    ['math-forwardMultiplication', {
      termRanges: [
        [2, 9],
        [2, 9]
      ]
    }]
  ]
});
