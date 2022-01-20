// this is manil for display order.
// anything not set here gets appended
questionsGroupsAll = {
  language: {
    letters: {
      'ordering': {},
      'comparing': {}
    },
    reading: {},
    spelling: {}
  },
  math: {
    counting: {
      'images': {},
      'ones': {}
    },
    numbers: {
      'whole numbers': {},
      'negatives': {},
      'integers': {},
      'fractions': {},
      'decimals': {}
    },
    addition: {
      'forward': {
        'generic': {}


      },
      'inverse': {}
    },
    subtraction: {},
    multiplication: {},
    'place value': {}
  }
}

questionsGroupsAll = {}


function loadStateFromLocalStorage(questionsTree) {
  const savedObjJSON = localStorage.getItem('questions');
  const savedObj = JSON.parse(savedObjJSON);
  const savedQuestions = savedObj['questions'];
  const savedPars = savedObj['settings'];
  qKeys = Object.keys(savedQuestions)
  qKeys.map(key => {
    registerQuestionType(questionsTree,
      'A-B-C',
      [savedQuestions[key][0], savedQuestions[key][1]]
    )
  })
  // localStorage.setItem('questions', null)
  document.getElementById('numAsks').value = savedPars['MaxQuestions'];
  document.getElementById('format').value = savedPars['format'];
}

function loadAllQuestions(questionsTree,filterPars, n) {
  var topPrefix = 'subheader-' + n.toString() + '-'
  const catprefix = filterPars['cats'];
  const tags = filterPars['tags'];
  const allBundleNames = Object.keys(Question.Bundle);
  const filteredBundleNames = allBundleNames.filter(
    x => x.startsWith(catprefix) && x.includes(tags)
  )

  if (true) {
    filteredBundleNames.forEach(bundle => {
      let splitbundle = bundle.split('-')
      Object.keys(Question.Bundle[bundle]).map(descr => {
        const newBundle = splitbundle.concat([descr, '']).join('-');
        let quests = Question.Bundle[bundle][descr];
        if (typeof(quests[0]) === 'string') {
          quests = [quests];
        }
        quests.map(arr => {
          registerQuestionType(questionsTree, newBundle, arr)
        })
      })
    })
  }

  const allQuestionNames = Object.keys(Question.Types);
  const filteredQuestionNames = allQuestionNames.filter(
    x => x.startsWith(catprefix) && x.includes(tags)
  )

  if (true) {
    filteredQuestionNames.forEach(x => {
      registerQuestionType(questionsTree, x)
    })
  };



  return questionsTree;
}

function writePageFromQuestionTree(questionsTree, n, preSelected=false) {
  var topPrefix = 'subheader-' + n.toString() + '-';
  traverseQuestionsTree(
    questionsTree,
    (arg, trail) => {
      if (trail.length > 0) {
        const [wrapperCat, qCat] = questionLevelContainer(trail[trail.length - 1], trail.join('-'), 'categoryheader', topPrefix,preSelected);
        wrapperCat.style['font-size'] = Math.max(15, 30 - 5 * (trail.length - 1))
        wrapperCat.style['font-family'] = ['Arial', 'Times', 'Courier'][trail.length - 1 % 3]
        document.getElementById(topPrefix + trail.slice(0, trail.length - 1).join('-')).appendChild(wrapperCat)
      }
    },
    (arg, trail) => {
      var q
      if (arg instanceof Array) {
        q = Question.create(...arg)
      } else {
        q = Question.create(arg, {})
      }
      q.id = `${trail.join('-')}-${q.id}`
      q.write({
        id: document.getElementById(topPrefix + trail.join('-')).id,
        answer: true,
        edit: true,
        description: arg,
        making: true
      })
    }
  );

  traverseQuestionsTree(
    questionsTree,
    (arg, trail) => {
      if (trail.length > 0) {
        addChildVisibilityToggler(trail, topPrefix)
      };
      if (trail.length > 2) {
        document.getElementById('subheader-click-wrapper-' + trail.join('-') + '-').click();
      };
    },
    () => {}
  )
}
