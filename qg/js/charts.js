function chartElement(values, labels, type = "bar", max = 10) {
  const myLabels = labels
    ? labels
    : allLetters("uppercase").slice(0, values.length);
  let chartData;
  if (type === "bar") {
    chartData = [{ x: myLabels, y: values, type: type }];
  } else if (type === "pie") {
    chartData = [{ values: values, labels: myLabels, type: type }];
  }
  const layout = {
    width: 500,
    height: 375,
    font: { size: 18 },
    yaxis: { tick0: 0, dtick: max / 10 },
    margin: { l: 50, r: 25, b: 50, t: 25, pad: 4 },
  };
  const plotContainer = document.createElement("DIV");
  Plotly.newPlot(plotContainer, chartData, layout, { staticPlot: true });
  plotContainer.classList.add("content");
  return plotContainer;
}

function barChart(values, labels) {
  const myLabels = labels
    ? labels
    : allLetters("uppercase").slice(0, values.length);
  var data = {
    labels: myLabels,
    series: [values],
  };

  var options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 2 === 0 ? value : null;
      },
    },
  };
  const plotContainer = document.createElement("DIV");
  return new Chartist.Bar(plotContainer, data, options);
}
