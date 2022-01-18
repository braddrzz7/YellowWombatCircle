function parseAndMakeCustom() {
    var fullParams = new URLSearchParams(window.location.search);
    var shuffleVar = fullParams.get('shuffle') || true;
    shuffleVar = (shuffleVar == 'true');
    document.getElementById('shuffle').checked = shuffleVar;

    // var copies = fullParams.get('copies') || "3";
    // document.getElementById('copies').value = copies;

    var format = fullParams.get('format') || "all";
    document.getElementById('format').value = format;

    var questionsGroupsCustom = {};

    // User specified bundles from URL params
    var bundlePar, bundlesToRegister
    bundlePar = fullParams.get('bundles');
    if (typeof(bundlePar) == 'string') {
      bundlesToRegister = bundlePar.split('$')
    } else {
      bundlesToRegister = []
    }

    bundlesToRegister.forEach(bundle => {
      let splitbundle = bundle.split('-')
      Object.keys(Question.Bundle[bundle]).map(descr => {
        const newBundle = splitbundle.concat([descr, '']).join('-');
        let quests = Question.Bundle[bundle][descr];
        if (typeof(quests[0]) === 'string') {
          quests = [quests];
        }
        quests.map(arr => {
          Question.create(...arr)
        })
      })
    })


    // User specified types from URL params
    var typePar, typesToRegister=[], typeObjs=[], leftRight,rightParsed
    typePar = fullParams.get('types');
    if (typeof(typePar) == 'string') {
      typePar.split('$').map(function(x,ind) {
        splt = x.split(':')
        // console.log(splt)
        typesToRegister[ind] = splt[0]
        typeObjs[ind]={}
        splt.slice(1).forEach(function(y) {
          leftRight = y.split('=');
          if (isNaN(parseFloat(leftRight[1]))) {
            rightParsed = leftRight[1];
          } else {
            rightParsed = parseFloat(leftRight[1]);
          }
          typeObjs[ind][leftRight[0]] = rightParsed;
        })
      })
    }

    typesToRegister.forEach((type,ind) => {
      registerQuestionType(questionsGroupsCustom, type)
      // Question.create(type, typeObjs[ind])
    })



    traverseQuestionsTree(
      questionsGroupsCustom,
      (arg, trail) => {
        null
      },
      (arg, trail) => {
        var q
        if (arg instanceof Array) {
          q = Question.create(...arg)
        } else {
          q = Question.create(arg, {})
        }
        // q.id = `${trail.join('-')}-${q.id}`
      }
    )

    makeEWS()
}

    // var startBool = fullParams.get('start') || 'true';
    // if (startBool == 'true') {
    //   // start()
    //   makeEWS()
    // }
