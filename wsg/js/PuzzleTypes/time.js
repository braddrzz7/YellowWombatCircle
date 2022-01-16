
class ClockPuzzle extends Puzzle {
  constructor(inputObject) {
    super(inputObject);
    this.instruction = opVal(inputObject.instruction, '');
    this.tags = ['clock', 'math','time'];
    this.settings = new Settings(inputObject, {
      'difficulty': EnumeratedValue(['easy', 'medium', 'hard']),
      'colorHands': BooleanValue(),
      'minuteMarkers': BooleanValue(),
      'colorHands': BooleanValue(),
      'allHands': BooleanValue(),
      'n': IntegerValue(1, 6),
      // controlled by type of clock puzzle
      'showAnswer': true,
      'showHands': true
    });
    this.content = new Content({
      'times': this.getRandomTimes
    })
  };

  getRandomTimes(settings) {
    var n = settings.value('n');
    var times = randomTimes(settings.value('difficulty'), settings.value('n'));
    return times;
  }


  makePuzzleBody() {
    var n = this.settings.value('n');
    var showAns = this.settings.value('showAnswer') == true;
    var times = this.content.value('times');
    var stringTimes = times.map(x => timeString(x));
    var clocks = times.map(x => makeClock(x, this.settings))
    var timesToShow;
    if (showAns) {
      timesToShow = stringTimes;
    } else {
      timesToShow = stringTimes.map(x => '__:__');
    };
    var texts = timesToShow.map(function(x) {
      return '<span style=\"font-size:50;letter-spacing:5px;\">' +
        x +
        '</span>'
    });
    var id = this.id;

    var elements = clocks.map(function(x, ind) {
      return constructColumnOfValues(id, [clocks[ind], texts[ind]], 'flexElement');
    });

    return constructElementGrid(this.id, elements, {
        elementContainer: false,
        elementClass: 'flexElement',
        containerCSS: {
          'justify-content': 'space-evenly'
        },
        containerClass: 'flexContainer',
        elementCSS: {
          'margin-bottom': '4%',
          'margin-left': '2%',
          'margin-right': '2%'
        }
      },
      'Clock', null);
  };

};

function randomTimes(difficulty, n = 1) {
  if (difficulty == '?') {
    return randomTime(randomSample(['easy', 'medium', 'hard']));
  };
  var hour, minute, second;
  hour = randomSampleSafe(range(1, 12 + 1), n);
  if (difficulty == "easy") {
    minute = constantVector(0.0, n);
    second = constantVector(0.0, n);
  } else if (difficulty == "medium") {
    minute = randomSampleSafe([0, 15, 30, 45], n);
    second = constantVector(0.0, n);
  } else if (difficulty == "hard") {
    minute = randomSampleSafe(range(0, 60), n);
    second = randomSampleSafe(range(0, 60), n);
  };
  return transpose([hour, minute, second]);
}

function makeClock(time, settings) {
  var canvas = $('<canvas></canvas>', {
    'class': 'flexElement'
  });
  var size = 220;
  canvas.height(size);
  canvas.width(size);
  canvas.attr('width', size);
  canvas.attr('height', size);
  var ctx = canvas[0].getContext('2d');
  var radius = canvas.height() / 2;
  ctx.translate(radius, radius);
  ctx.lineCap = "round";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  radius = radius * 0.90;

  // draw face
  drawFace(ctx, radius);
  // draw hour numbers
  drawTimeMarkers(ctx, radius, 'black', radius * .15, 1)

  // draw minute numbers, if easy or medium
  if (settings.value('minuteMarkers') == true) {
    drawTimeMarkers(ctx, radius * 1.2, 'gray', radius * .1, 5)
  };

  // draw hands. color minute hand if easy or medium
  if (settings.value('showHands') == true) {
    drawTime(time, ctx, radius, 'gray', settings);
  };
  return canvas;
}

function drawCircle(ctx, radius, thickness) {
  ctx.beginPath();
  ctx.lineWidth = radius * 0.2;
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = thickness;
  ctx.stroke();
  ctx.fillStyle = 'black';
}

function drawFace(ctx, radius) {
  drawCircle(ctx, radius, radius * 0.05);
  drawCircle(ctx, radius * .05, radius * 0.05)
}

function drawTimeMarkers(ctx, radius, color, size, multiplier) {
  var ang, num;
  ctx.font = size + "px arial";
  ctx.fillStyle = color;
  range(1, 13).map(x =>
    writeNumber(ctx, radius * 0.75, x, multiplier)
  );
}

function writeNumber(ctx, radius, val, multiplier) {
  var angle = val * 2 * Math.PI / 12,
    // angle=0 is pointing up
    dx = radius * Math.sin(angle),
    dy = radius * Math.cos(angle)
  ctx.translate(dx, -dy);
  ctx.fillText((val * multiplier).toString(), 0, 0);
  ctx.translate(-dx, dy);
}

function drawTime(time, ctx, radius, minuteHandColor, settings) {
  var hour, minute, second;
  [hour, minute, second] = time;
  minute = minute + second / 60; // adjust by seconds
  hour = hour + minute / 60; // adjust by minutes (and seconds)
  // second
  second = (second * Math.PI / 30);
  if (settings.difficulty == "hard") {
    drawHand(ctx, second, radius * 0.9, radius * 0.02, 'black');
  }
  //minute
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.75, radius * 0.04, minuteHandColor);
  //hour
  hour = hour % 12;
  hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
  drawHand(ctx, hour, radius * 0.5, radius * 0.065, 'black');

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

Puzzle.Types['ClockWhatTime'] = {
  category:'math',
  subcategory:'time',
  showAnswer : false,
  showHands : true,
  instruction : `Write the clock's time`,
  parentClass: ClockPuzzle
}

Puzzle.Types['ClockWhatHands'] = {
  category:'math',
  subcategory:'time',
  showAnswer : true,
  showHands : false,
  instruction : `Draw hands on the clock to make the time`,
  parentClass: ClockPuzzle
}

function timeString(timeArray) {
  // var hour = (Math.floor(timeArray[0]) + '0').substring(0, 1);
  var hour = Math.floor(timeArray[0]);
  // var min = (Math.floor(timeArray[1]) + '00').substring(0, 2);
  var min = ('00' + Math.floor(timeArray[1])).slice(-2);
  // var sec = (Math.floor(timeArray[2])+'00').substring(0,2)
  return hour + ':' + min
}
