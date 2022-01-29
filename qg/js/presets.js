function traverseGroups(arg, branchFunction, leafFunction, trail = []) {
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
      if (key == 'Description') { return null };
      traverseGroups(
        arg[key],
        branchFunction,
        leafFunction,
        trail.concat([key])
      );
    }
  }
}


function writePresets(questionsTree,fullParams, n,autolabel=true,openLevel=2) {
  var levelVal, sublevelVal
  var topPrefix = 'subheader-' + n.toString() + '-'

  // add Mixture sections
  

  traverseGroups(
    questionsTree,
    (arg, trail, level, sublevel) => {
      if (trail.length > 0) {
        var prefix = '';
        if (trail.length == 1) {
          levelVal = 64;
          prefix = ''
        } else if (trail.length == 2) {
          levelVal = levelVal + 1;
          prefix = autolabel?('Level ' + String.fromCharCode(levelVal)):'';
          sublevelVal = 0;
        } else if (trail.length == 3) {
          sublevelVal = sublevelVal + 1;
          prefix = autolabel?(String.fromCharCode(levelVal) + String(sublevelVal) + ' -'):'';
        }
        const [wrapperCat, qCat] = questionLevelContainer(prefix + ' ' + trail[trail.length - 1], trail.join('-'), 'categoryheader', topPrefix, false, descr=arg['Description']);
        wrapperCat.style['font-size'] = Math.max(15, 20 - 4 * (trail.length - 1))
        wrapperCat.style['font-family'] = ['Arial', 'Times', 'Courier', 'Verdana'][trail.length - 1 % 3]
        document.getElementById(topPrefix + trail.slice(0, trail.length - 1).join('-')).appendChild(wrapperCat)
      }
    },
    (arg, trail) => {
      var q = Question.create(...arg);
      q.id = `${trail.join('-')}-${q.id}`
      q.write({
        id: document.getElementById(topPrefix + trail.join('-')).id,
        answer: true,
        description: arg,
        making: true
      })
    }
  )


  traverseGroups(
    questionsTree,
    (arg, trail) => {
      if (trail.length > 0) {
        addChildVisibilityToggler(trail, topPrefix)
      };
      if (trail.length > openLevel) {
        document.getElementById('subheader-click-wrapper-' + trail.join('-') + '-').click();
      };
    },
    () => {}
  )
}

var questionsGroups = {
  'math': {

    /* ********************************** */
    '$$ Numbers up to 100.  Counting forward and backward by ones.  Introduction to  addition and subtractions.': {
      'Counting and comparing using pictures': {
        'Counting items, under 10': [
          ['math-counting-countOneImage', {}],
          ["math-counting-countOneOfSeveralImages", {
            numTotal: 8,
            numDifferent: 2
          }]
        ],
        'Comparing counts under 10': [
          ["math-counting-imageCountComparison", {}],
          ['math-data-chartComparisons', {
            chartType: 'bar',
            n: 2
          }]
        ],
        "Comparing Sizes": [
          ["math-sizes-imageSizeComparison", {
            n: 2
          }],
          ['math-data-chartComparisons', {
            chartType: 'pie',
            n: 2
          }]
        ]
      },
      'Numbers up to 10': {
        'Counting numbers, up to 10': ['math-counting-countingSequence', {
          start: [0, 5],
          step: 1,
          n: 6
        }],
        'Comparing two numbers up to 10': ["math-numbers-compare", {
          n: 2,
          max: 10
        }],
        "Comparing three sizes": [
          ["math-sizes-imageSizeComparison", {
            n: 3
          }],
          ['math-data-chartComparisons', {
            chartType: 'pie',
            n: 3
          }]
        ],
        'Ordering three numbers': ['math-orderNumbers', {
          max: 10,
          n: 3
        }]
      },
      'Numbers to 20 and preparing for addition': {
        'Numbers up to 20': {
          'Counting up to 20': [
            ['math-counting-countingSequence', {
              start: [0, 15],
              step: 1,
              nAfter: 2
            }],
            ['math-counting-countingSequence', {
              start: [0, 15],
              step: 1,
              nAfter: 2,
              reverse: true
            }]
          ],
          'Comparing two numbers up to 20': ["math-numbers-compare", {
            n: 3,
            max: 20
          }],
          "Comparing sizes": [
            ["math-sizes-imageSizeComparison", {
              n: 4
            }],
            ['math-data-chartComparisons', {
              chartType: 'pie',
              n: 4
            }]
          ],
          'Ordering numbers': ['math-orderNumbers', {
            max: 20,
            n: 3
          }]
        },
        'Addition': {
          'Counting ahead': [
            ['math-counting-countingSequence', {
              start: [0, 7],
              step: 1,
              nBlank: 2,
              nAfter: 0
            }],
            ['math-counting-countingSequence', {
              start: [0, 6],
              step: 1,
              nBlank: 3,
              nAfter: 0
            }],
          ],
          'Adding 1 with pictures': [
            ['math-forwardAddition', {
              termRanges: [
                [1, 6],
                [1, 1]
              ],
              shuffle: false,
              answerRange: [1, 10],
              format: 'image'
            }]
          ]
        }
      },
      'Numbers to 30 and Simple Addition': {
        'Numbers up to 30': {
          'Counting': [
            ['math-counting-countingSequence', {
              start: [0, 25],
              step: 1,
              nAfter: 2
            }],
            ['math-counting-countingSequence', {
              start: [0, 25],
              step: 1,
              nAfter: 2,
              reverse: true
            }]
          ],
          'Comparing': [
            ["math-numbers-compare", {
              n: 3,
              max: 30
            }],
            ['math-data-chartComparisons', {
              chartType: 'bar',
              n: 3
            }]
          ],
          'Ordering': ['math-orderNumbers', {
            max: 30,
            n: 3
          }],
          'Reading Numbers': [
            ['math-numbers-reading', {
              top: 'word',
              min: 1,
              max: 30
            }],
            ['math-numbers-reading', {
              top: 'number',
              min: 1,
              max: 30
            }]
          ]
        },
        'Addition': {
          'Counting ahead': [
            ['math-counting-countingSequence', {
              start: [0, 7],
              step: 1,
              nBlank: 2,
              nAfter: 0
            }],
            ['math-counting-countingSequence', {
              start: [0, 6],
              step: 1,
              nBlank: 3,
              nAfter: 0
            }],
          ],
          'Addition on your fingers': [
            ['math-forwardAddition', {
              termRanges: [
                [0, 5],
                [0, 5]
              ],
              answerRange: [1, 10],
              format: 'image'
            }],
            ['math-forwardAddition', {
              termRanges: [
                [0, 5],
                [0, 5]
              ],
              answerRange: [1, 10]
            }],
            ['math-forwardAddition', {
              termRanges: [
                [0, 5],
                [0, 5]
              ],
              answerRange: [1, 10],
              format: 'word'
            }],
            ['math-data-howManyPairChart', {
              n: 2,
              min: 1,
              max: 5
            }]
          ],
          'Adding 1 up to 20': [
            ['math-forwardAddition', {
              termRanges: [
                [0, 19],
                [1, 1]
              ],
              answerRange: [0, 20]
            }],
            ['math-forwardAddition', {
              termRanges: [
                [0, 19],
                [1, 1]
              ],
              answerRange: [0, 20],
              format: 'word'
            }]
          ]
        }
      }
    },

    /* ********************************** */
    '$$ Additon and Subtraction on your fingers.': {
      'Numbers up to 50 and Simple Subtraction': {
        'Numbers up to 50': {
          'Counting': [
            ['math-counting-countingSequence', {
              start: [0, 45],
              step: 1,
              nAfter: 2
            }],
            ['math-counting-countingSequence', {
              start: [0, 45],
              step: 1,
              nAfter: 2,
              reverse: true
            }]
          ],
          'Comparing': ["math-numbers-compare", {
            n: 4,
            max: 50
          }],
          'Ordering': ['math-orderNumbers', {
            max: 50,
            n: 4
          }]
        },
        'Addition': {
          'Addition on your fingers': [
            ['math-forwardAddition', {
              termRanges: [
                [1, 9],
                [1, 5]
              ],
              answerRange: [1, 10]
            }],
            ['math-forwardAddition', {
              termRanges: [
                [1, 9],
                [1, 5]
              ],
              answerRange: [1, 10],
              format: 'word'
            }],
            ['math-data-howManyPairChart', {
              n: 2,
              min: 1,
              max: 10
            }],
            ['math-forwardAddition', {
              termRanges: [
                [0, 19],
                [1, 1]
              ],
              answerRange: [0, 20]
            }],
          ],
        },
        'Subtraction': {
          'Subtracting 1 up to 20': [
            ['math-arithmetic', {
              sign: '-',
              shuffle: false,
              termRanges: [
                [0, 20],
                [1, 1]
              ],
              answerRange: [0, 20]
            }],
            ['math-arithmetic', {
              sign: '-',
              shuffle: false,
              termRanges: [
                [0, 20],
                [1, 1]
              ],
              answerRange: [0, 20],
              format: 'word'
            }],
            ['math-forwardAddition', {
              termRanges: [
                [0, 19],
                [1, 1]
              ],
              answerRange: [0, 20],
              format: 'word'
            }]
          ],
          'Subtraction on your fingers': [
            ['math-arithmetic', {
              sign: '-',
              termRanges: [
                [0, 5],
                [0, 5]
              ],
              answerRange: [0, 5],
              format: 'image'
            }],
            ['math-arithmetic', {
              sign: '-',
              termRanges: [
                [0, 5],
                [0, 5]
              ],
              answerRange: [0, 5]
            }],
            ['math-arithmetic', {
              sign: '-',
              termRanges: [
                [0, 5],
                [0, 5]
              ],
              answerRange: [0, 5],
              format: 'word'
            }]
          ]
        }
      },
      'Numbers up to 100': {
        'Numbers up to 100': {
          'counting': [
            ['math-counting-countingSequence', {
              start: [0, 95],
              step: 1,
              n: 6
            }],
            ['math-counting-countingSequence', {
              start: [0, 95],
              step: 1,
              n: 6,
              reverse: true
            }]
          ],
          'Comparing': ["math-numbers-compare", {
            n: 4,
            max: 100
          }],
          'Ordering': ['math-orderNumbers', {
            max: 100,
            n: 4
          }],
          'Reading Numbers': [
            ['math-numbers-reading', {
              top: 'word',
              min: 1,
              max: 100
            }],
            ['math-numbers-reading', {
              top: 'number',
              min: 1,
              max: 100
            }]
          ]
        },
        'Addition': {
          'Addition up to 100 using fingers': [
            ['math-forwardAddition', {
              termRanges: [
                [0, 10],
                [0, 90]
              ],
              answerRange: [1, 100]
            }],
            ['math-forwardAddition', {
              termRanges: [
                [0, 10],
                [0, 90]
              ],
              answerRange: [1, 100],
              format: 'word'
            }]
          ],
          'Inverse Addition on your fingers': [
            ['math-arithmetic', {
              blank: 'ab',
              termRanges: [
                [1, 5],
                [1, 5]
              ],
              answerRange: [1, 10],
              format: 'image'
            }],
            ['math-arithmetic', {
              blank: 'ab',
              termRanges: [
                [1, 5],
                [1, 5]
              ],
              answerRange: [1, 10]
            }],
            ['math-arithmetic', {
              blank: 'ab',
              termRanges: [
                [1, 5],
                [1, 5]
              ],
              answerRange: [1, 10],
              format: 'word'
            }],
            ['math-data-howManyMoreChart', {
              n: 2,
              max: 5,
              min: 1
            }]
          ]
        },
        'Subtraction': {
          'Subtraction up to 100 using fingers': [
            ['math-arithmetic', {
              sign: '-',
              shuffle: false,
              termRanges: [
                [0, 100],
                [0, 10]
              ],
              answerRange: [0, 100]
            }],
            ['math-arithmetic', {
              sign: '-',
              shuffle: false,
              termRanges: [
                [0, 100],
                [0, 10]
              ],
              answerRange: [0, 100],
              format: 'word'
            }]
          ]
        }
      }
    },


    /* ********************************** */
    '$$Numbers up to 1000, Counting By, Place Values, Gropuing, Addition with Carrying, Subtraction with Borrowing': {
      'Numbers to 200 and Preparing for carrying': {
        'Numbers up to 200': {
          'counting': [
            ['math-counting-countingSequence', {
              start: [0, 195],
              step: 1,
              n: 6
            }],
            ['math-counting-countingSequence', {
              start: [0, 195],
              step: 1,
              n: 6,
              reverse: true
            }]
          ],
          'Comparing': ["math-numbers-compare", {
            n: 4,
            max: 200
          }],
          'Ordering': ['math-orderNumbers', {
            max: 200,
            n: 4
          }],
          'Reading Numbers': [
            ['math-numbers-reading', {
              top: 'word',
              min: 100,
              max: 200
            }],
            ['math-numbers-reading', {
              top: 'number',
              min: 100,
              max: 200
            }]
          ]
        },
        'Addition preparation for carrying': {
          'Making 10': ['math-forwardAddition', {
            blank: 'ab',
            termRanges: [
              [1, 9],
              [1, 9]
            ],
            answerRange: [10, 10]
          }],
          'Sums up to 20': ['math-forwardAddition', {
            blank: 'c',
            termRanges: [
              [1, 9],
              [1, 9]
            ],
            answerRange: [10, 19]
          }]
        }
      },
      'Place Value': {
        'Place Value': [
          ["math-numbers-placeValueFrom", {}],
          ['math-numbers-placeValueTo', {
            format: 'words'
          }]
        ]
      },
      'B3': {
        // 'Addition tricks':[],
        // 'Counting by XXX':[]
      },
      'B4': {
        "Counting by 10's": ['math-counting-countingSequence', {
          start: [0, 60],
          offset: false,
          step: 10,
          n: 6
        }]
      },
      'B5': {

        'Position in line': [
          [`math-positionInLineA`, {}],
          [`math-positionInLineB`, {}]
        ]
      },
      'Numbers up to 1000': {
        'Numbers up to 1000': {
          'counting': [
            ['math-counting-countingSequence', {
              start: [0, 995],
              step: 1,
              n: 6
            }],
            ['math-counting-countingSequence', {
              start: [0, 995],
              step: 1,
              n: 6,
              reverse: true
            }]
          ],
          'Comparing': ["math-numbers-compare", {
            n: 4,
            max: 1000
          }],
          'Ordering': ['math-orderNumbers', {
            max: 1000,
            n: 4
          }],
          'Reading Numbers': [
            ['math-numbers-reading', {
              top: 'word',
              min: 1,
              max: 1000
            }],
            ['math-numbers-reading', {
              top: 'number',
              min: 1,
              max: 1000
            }]
          ]
        }
      }
    },


    /* ********************************** */
    '$$Multiplication and rounding$$': {
      'Introduction to multiplication': {
        "Multiplication as Addition": [
          ["math-multiplication-timePlusMatching", {
            top: "times"
          }],
          ["math-multiplication-timePlusMatching", {
            top: "plus"
          }],
        ],
        'Multiplying by 0': ['math-forwardMultiplication', {
          termRanges: [
            [0, 0],
            [1, 10]
          ]
        }],
        'Multiplying by 1': ['math-forwardMultiplication', {
          termRanges: [
            [1, 1],
            [1, 10]
          ]
        }],
      },
      'Rounding': {
        "Rounding to 10's up to 100": ['math-rounding', {
          rountTo: 10,
          max: 100
        }],
        "Rounding to 10's up to 1000": ['math-rounding', {
          roundTo: 10,
          max: 1000
        }],
        "Rounding to 100's up to 1000": ['math-rounding', {
          roundTo: 100,
          max: 1000
        }],
        "Rounding to 5's up to 100": ['math-rounding', {
          roundTo: 5,
          max: 100
        }]
      },
      'More single digit multiplication': {
        'Multiplying by 10': ['math-forwardMultiplication', {
          termRanges: [
            [10, 10],
            [1, 10]
          ]
        }],
        'Multiplying by 2 (doubling)': ['math-forwardMultiplication', {
          termRanges: [
            [2, 2],
            [1, 10]
          ]
        }],
        'Multiplying by 5': ['math-forwardMultiplication', {
          termRanges: [
            [5, 5],
            [1, 10]
          ]
        }],
        'Multiplying by 4 (double double)': ['math-forwardMultiplication', {
          termRanges: [
            [4, 4],
            [3, 10]
          ]
        }]
      },
      'Multiply up to 10 x 10, and more': {
        'Multiplying [0,10] x [0,10]': ['math-forwardMultiplication', {
          termRanges: [
            [0, 10],
            [0, 10]
          ]
        }],
        'Multiplying [2,9] x [2,9]': ['math-forwardMultiplication', {
          termRanges: [
            [2, 9],
            [2, 9]
          ]
        }],
        'Multiplying by 2, up to 2x20': ['math-forwardMultiplication', {
          termRanges: [
            [2, 2],
            [11, 20]
          ]
        }],
        'Multiplying up to 5x5, inverse': ['math-forwardMultiplication', {
          termRanges: [
            [0, 5],
            [2, 5]
          ],
          blank: 'ab'
        }]
      },
      'More multiplication in your head': {
        'Multiplying 2 up to 50': ['math-forwardMultiplication', {
          termRanges: [
            [2, 2],
            [11, 50]
          ]
        }],
        'Multiplying up to 10x10, inverse': ['math-forwardMultiplication', {
          termRanges: [
            [0, 10],
            [2, 10]
          ],
          blank: 'ab'
        }]
      }

    }

  },
  'OTHER': {
    'Something': {}
  }
};
