//
// defineQuestionType("math-time-leave", {
//   questionClass: Question,
//   setup: (qst) => {
//
//     qst.answer = randomInteger(1,qst.maxSideLength);
//     qst.prompt = `If a regular ${shape} has a total perimeter of ${sides*qst.answer}, then
//         what is the length of each side?`;
//   }
// });


Question.Types["math-time-clockTime"] = function (ops = {}) {
  var qst = new Question(
    {
      difficulty: "easy",
      minuteIncrement: "15",
      colorHands: true,
      minuteMarkers: true,
      allHands: true,
      showHands: true,
    },
    ops
  );
  qst.setup = (qst) => {
    qst.prompt = "What time is on the clock?";
    qst.time = randomTimes(qst.difficulty, qst.minuteIncrement)[0];
    qst.answer = timeString(qst.time);
  };
  qst.makeContentElement = () => {
    var content = makeClock(qst.time, qst);
    return content;
  };
  qst.generate();
  return qst;
};

function randomTimes(difficulty, minuteIncrement, n = 1) {
  var hour, minute, second;
  hour = randomSample(range(1, 12 + 1), n);
  minute = randomSample(range(0, 60, minuteIncrement), n);
  second = constantVector(0.0, n);
  return transpose([hour, minute, second]);
}

function makeClock(time, ops = {}) {
  var wrapper = document.createElement("div");
  Question.prototype.addClass(wrapper, "content");
  var canvas = document.createElement("canvas");
  var size = 325;
  canvas.height = size;
  canvas.width = size;
  canvas.style.width = size;
  canvas.style.height = size;
  var ctx = canvas.getContext("2d");
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  ctx.lineCap = "round";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  radius = radius * 0.9;

  // draw face
  drawFace(ctx, radius);
  // draw hour numbers
  drawTimeMarkers(ctx, radius, "black", radius * 0.15, 1);

  // draw minute numbers, if easy or medium
  if (ops.minuteMarkers == true) {
    drawTimeMarkers(ctx, radius * 1.2, "gray", radius * 0.1, 5);
  }

  // draw hands. color minute hand if easy or medium
  if (ops.showHands == true) {
    drawTime(time, ctx, radius, "gray", ops);
  }

  wrapper.appendChild(canvas);
  return wrapper;
}

function drawFace(ctx, radius) {
  drawArc(ctx, [0, 0], radius, 0, 2 * Math.PI, { lineWidth: "4" });
  drawArc(ctx, [0, 0], radius * 0.05, 0, 2 * Math.PI, { lineWidth: "1" });
}

function drawTimeMarkers(ctx, radius, color, size, multiplier) {
  var ang, num;
  ctx.font = size + "px arial";
  ctx.fillStyle = color;
  range(0, 12).map((x) => writeNumber(ctx, radius * 0.75, x, multiplier));
}

function writeNumber(ctx, radius, val, multiplier) {
  var angle = (val * 2 * Math.PI) / 12,
    // angle=0 is pointing up
    dx = radius * Math.sin(angle),
    dy = radius * Math.cos(angle);
  ctx.translate(dx, -dy);
  ctx.fillText((val * multiplier).toString(), 0, 0);
  ctx.translate(-dx, dy);
}

function drawTime(time, ctx, radius, minuteHandColor, ops = {}) {
  var hour, minute, second;
  [hour, minute, second] = time;
  minute = minute + second / 60; // adjust by seconds
  hour = hour + minute / 60; // adjust by minutes (and seconds)
  // second
  second = (second * Math.PI) / 30;
  if (ops.difficulty == "hard") {
    drawHand(ctx, second, radius * 0.9, radius * 0.02, "black");
  }
  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.75, radius * 0.04, minuteHandColor);
  //hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.065, "black");
}

function drawHand(ctx, angle, length, width, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(0, 0);
  ctx.rotate(angle);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-angle);
}

function timeString(timeArray) {
  // var hour = (Math.floor(timeArray[0]) + '0').substring(0, 1);
  var hour = Math.floor(timeArray[0]);
  // var min = (Math.floor(timeArray[1]) + '00').substring(0, 2);
  var min = ("00" + Math.floor(timeArray[1])).slice(-2);
  // var sec = (Math.floor(timeArray[2])+'00').substring(0,2)
  return hour + ":" + min;
}
