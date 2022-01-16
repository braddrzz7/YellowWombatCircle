class Screen {
  constructor() {}
}

function writeQuestionEWS(prog, conc, qst, pid, cid, qid, pageID) {
  const parent = document.getElementById(pageID);
  const questionWrapper = document.createElement("DIV");
  questionWrapper.classList.add("questionContainer");

  const output = document.createElement("DIV");
  output.appendChild(qst.question.makeElement());
  output.classList.add("output");
  output.id = `output-${pid}-${cid}-${qid}`;

  const input = inputElementEWS(prog, conc, qst, pid, cid, qid);

  const scroll = document.createElement("DIV");
  scroll.id = `scrollAnchor-${pid}-${cid}-${qid}`;

  questionWrapper.appendChild(output);
  questionWrapper.appendChild(input);
  questionWrapper.appendChild(scroll);
  parent.appendChild(questionWrapper);
}

function inputElementEWS(prog, conc, qst, pid, cid, qid) {
  const inputWrapper = document.createElement("DIV");
  inputWrapper.classList.add("input");
  inputWrapper.id = `inputWrapper-${pid}-${cid}-${qid}`;

  const caret = document.createElement("DIV");
  caret.innerHTML = ">";
  caret.classList.add("caret");

  const input = document.createElement("DIV");
  input.classList.add("inputField");
  input.contentEditable = true;
  input.id = `input-${pid}-${cid}-${qid}`;
  input.onkeypress = (e) => checkInput(e, prog, conc, qst, pid, cid, qid);

  inputWrapper.appendChild(caret);
  inputWrapper.appendChild(input);
  return inputWrapper;
}

function checkInput(e, prog, conc, qst, pid, cid, qid) {
  var code = e.which;
  if (code === 13) {
    e.preventDefault(); // no newline
    console.log();
    let txt = document.getElementById(`input-${pid}-${cid}-${qid}`).innerText;
    if (txt.length > 0) {
      processInput(txt, prog, conc, qst, pid, cid, qid);
    }
  }
}
