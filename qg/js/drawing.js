function drawLine(ctx, [x0, y0], [x1, y1], ops = {}) {
  setDrawingOptions(ctx, ops);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function drawLineAngle(ctx, [x0, y0], angle, length, ops = {}) {
  setDrawingOptions(ctx, ops);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.rotate(angle);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-angle);
}

function drawArc(ctx, [x0, y0], radius, startAngle, endAngle, ops = {}) {
  setDrawingOptions(ctx, ops);
  ctx.beginPath();
  ctx.arc(x0, y0, radius, startAngle, endAngle);
  ctx.stroke();
}

function drawCircleSector(ctx, [x0, y0], radius, [ang0, ang1], ops) {
  setDrawingOptions(ctx, ops);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.arc(x0, y0, radius, ang0, ang1);
  ctx.closePath();
  ctx.fill();
}

function addCanvasText(ctx, text, [x0, y0], ops = {}) {
  ctx.fillStyle = "black";
  ctx.fillText(text, x0, y0);
}

function setDrawingOptions(ctx, ops = {}) {
  const myOps = Object.assign({ color: "black", thickness: 1 }, ops);
  for (const prop in ops) {
    ctx[prop] = ops[prop];
  }
}

function setupCanvas(size = [325, 325]) {
  const wrapper = document.createElement("div");
  Question.prototype.addClass(wrapper, "content");
  const canvas = document.createElement("canvas");
  wrapper.appendChild(canvas);
  canvas.width = size[0];
  canvas.height = size[1];
  canvas.style.width = size[0];
  canvas.style.height = size[1];
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return [wrapper, ctx];
}

function pieChart(values, labels, ops = {}) {
  const { xlabel, ylabel, title } = ops;
  const [width, height] = [400, 350];
  const [wrapper, ctx] = setupCanvas([width, height]);
  ctx.translate(width / 2, height / 2);
  const myLabels = labels
    ? labels
    : allLetters("uppercase").slice(0, values.length);
  let startAngle = 0,
    endAngle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
  const total = values.reduce((a, b) => a + b);
  const theta = (2 * Math.PI) / total;
  const radius = height / 2.5;
  values.forEach((num, ind) => {
    endAngle = startAngle + num * theta;
    drawCircleSector(ctx, [0, 0], radius, [startAngle, endAngle], {
      fillStyle: colors[ind % colors.length],
    });
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText(
      labels[ind],
      0.6 * radius * Math.cos((startAngle + endAngle) / 2),
      0.6 * radius * Math.sin((startAngle + endAngle) / 2)
    );
    startAngle = endAngle;
  });
  if (title != undefined) {
    ctx.textAlign = "center";
    ctx.fillText(title, 0, (-height / 2) * 0.9);
  }
  drawArc(ctx, [0, 0], radius, 0, 2 * Math.PI, {});
  return wrapper;
}

function barChart(values, labels,  {
    xlabel='', ylabel='',title='',
    width=500,height=350,
    colors= ["red", "orange", "yellow", "green", "blue", "purple"]
  }) {
  // const { xlabel, ylabel, title } = ops;
  // const [width, height] = [600, 350];
  const [wrapper, ctx] = setupCanvas([width, height]);
  const myLabels = labels
    ? labels
    : allLetters("uppercase").slice(0, values.length);
  // const colors = ops.colors || ["red", "orange", "yellow", "green", "blue", "purple"];
  const total = values.reduce((a, b) => a + b);
  const ytop = title ? height / 10 : height / 20;
  const ybot = (height * 18.5) / 20;
  const xleft = xlabel ? width / 10 : width / 18;
  const xright = (width * 19) / 20;
  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  if (title != undefined) {
    // ctx.textBaseline='bottom'
    ctx.textAlign = "center";
    ctx.fillText(title, width / 2, ytop * 0.75);
  }
  if (xlabel != undefined) {
    ctx.textBaseline = "bottom";
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(xlabel, 0, -width / 2 + 25);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-width / 2, -height / 2);
  }
  const oneWidth = (xright - xleft) / values.length;
  const spacingFactor = 0.15;
  const barWidth = (1 - spacingFactor) * oneWidth;
  const barCenters = values.map(
    (x, ind) => xleft + ind * oneWidth + oneWidth / 2
  );
  const maxTick = 10;
  const numTicks = 11;
  // const dytick = (ytop-ybot)/numTicks
  const yscale = (ybot - ytop) / maxTick;
  const dtick = maxTick / (numTicks - 1);
  // const dtick = 1
  const dytick = yscale * dtick;

  for (var i = 0; i < numTicks; i++) {
    drawLine(ctx, [xleft, ybot - i * dytick], [xright, ybot - i * dytick], {
      strokeStyle: "silver",
    });
  }

  values.forEach((num, ind) => {
    ctx.fillStyle = colors[ind % colors.length];
    ctx.lineWidth = "1";
    ctx.fillRect(barCenters[ind] - barWidth / 2, ybot, barWidth, -num * yscale);
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(labels[ind], barCenters[ind], ybot * 1.01);
  });

  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  drawLine(ctx, [xleft, ybot], [xright, ybot], { strokeStyle: "black" });
  drawLine(ctx, [xleft, ybot], [xleft, ytop], { strokeStyle: "black" });
  for (var i = 0; i < numTicks; i++) {
    ctx.fillText(i, xleft * 0.75, ybot - i * dytick);
    drawLine(
      ctx,
      [xleft, ybot - i * dytick],
      [xleft * 0.8, ybot - i * dytick],
      {}
    );
  }

  return wrapper;
}

function regularPolygon(numSides = 4, num, ops = {}) {
  let { rotate, sideLength, label = true } = ops;
  const [width, height] = [500, 350];
  const [wrapper, ctx] = setupCanvas([width, height]);
  const radius = numSides === 3 ? height / 5 : height / 3;
  ctx.translate(width / 2, height / 2);
  sideLength = sideLength || 2 * radius * Math.tan(Math.PI / numSides);
  rotate = rotate || Math.random() * 2 * Math.PI;
  ctx.rotate(rotate);
  for (var i = 0; i < numSides; i++) {
    drawLine(ctx, [-sideLength / 2, radius], [sideLength / 2, radius], {});
    ctx.rotate((2 * Math.PI) / numSides);
  }

  return wrapper;
}

function circlePolygon(numSides = 3, ops = {}) {
  const [width, height] = [500, 350];
  const [wrapper, ctx] = setupCanvas([width, height]);
  const radius = height / 3;
  ctx.translate(width / 2, height / 2);
  let badAngles = true,
    angles;
  const smallestAllowedAngle = numSides < 5 ? 0.2 : 0;
  let minAngleDiff = -1;
  while (minAngleDiff < smallestAllowedAngle) {
    angles = randomReal(0, 2 * Math.PI, numSides, 0.01).sort();
    minAngleDiff = Math.min(
      ...angles.map((x, ind) =>
        Math.abs(angles[(ind + 1) % angles.length] - angles[ind])
      )
    );
    // console.log(angles.map((x,ind)=>Math.abs(angles[(ind+1)%angles.length]-angles[ind])))
    minAngleDiff = 100;
  }
  // while (badAngles) {
  // }
  let coords = angles.map((x) => [radius * Math.cos(x), radius * Math.sin(x)]);
  const [xvals, yvals] = transpose(coords);
  const xcenter = (Math.max(...xvals) + Math.min(...xvals)) / 2;
  const ycenter = (Math.max(...yvals) + Math.min(...yvals)) / 2;
  coords = coords.map((x) => [x[0] - xcenter, x[1] - ycenter]);
  // ctx.scale(2,2)
  ctx.moveTo(...coords[0]);
  ctx.beginPath();
  for (var i = 0; i < numSides + 1; i++) {
    ctx.lineTo(...coords[i % coords.length]);
  }
  ctx.stroke();
  return wrapper;
}
