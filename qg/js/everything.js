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
    addition: {},
    subtraction: {},
    multiplication: {},
    'place value': {}
  }
}

questionsGroupsAll = {}

function writeEverything(filterPars, n) {
  var topPrefix = 'subheader-' + n.toString() + '-'

  const catprefix = filterPars['cats'];
  const tags = filterPars['tags'];

  const allBundleNames = Object.keys(Question.Bundle);
  const filteredBundleNames = allBundleNames.filter(
    x => x.startsWith(catprefix) && x.includes(tags)
  )

  filteredBundleNames.forEach(bundle => {
    let splitbundle = bundle.split('-')
    Object.keys(Question.Bundle[bundle]).map(descr => {
      const newBundle = splitbundle.concat([descr, '']).join('-');
      let quests = Question.Bundle[bundle][descr];
      if (typeof(quests[0]) === 'string') {
        quests = [quests];
      }
      quests.map(arr => {
        registerQuestionType(questionsGroupsAll, newBundle, arr)
      })
    })
  })


  const allQuestionNames = Object.keys(Question.Types);
  const filteredQuestionNames = allQuestionNames.filter(
      x => x.startsWith(catprefix) && x.includes(tags)
    )
console.log(tags)
  filteredQuestionNames.forEach(x => {
    registerQuestionType(questionsGroupsAll, x)
  })


  traverseQuestionsTree(
    questionsGroupsAll,
    (arg, trail) => {
      if (trail.length > 0) {
        const [wrapperCat, qCat] = questionLevelContainer(trail[trail.length - 1], trail.join('-'), 'categoryheader', topPrefix);
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
        description: arg,
        making: true
      })
    }
  )

  traverseQuestionsTree(
    questionsGroupsAll,
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
