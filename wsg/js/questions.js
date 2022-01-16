function allQuestions() {
    return flatten([
        questionsFavorite(),
        questionsColor()
    ]);
};


function questionsFavorite() {
    var things = ["food", "animal","bird","color",
                  "day of the week","toy"];
    var questionsArray = things.map(x=>("What is your favorite "+x+"?"));
    return questionsArray;
};

function questionsColor() {
    var colors = ["red","orange","yellow","green","blue","purple",
                  "pink","white","black","brown","silver","gold"];
    var things = ["animal","food","thing"];
    var questionsArray=[];
    for (var i=0; i<colors.length; i++) {
        for (var j=0; j<things.length; j++) {
            questionsArray.push(
                "Name a "+things[j]+" that is "+colors[i]
            );
        }
    };
    return questionsArray;
}





/*

NameSome...

[animals,foods,songs] you like

*/