/* global d3, crossfilter, timeSeriesChart, barChart */

var dateFmt = d3.timeParse("%Y-%m-%d");

var chartTimeline = timeSeriesChart()
  .width(1000)
  .x(function (d) { return d.key;})
  .y(function (d) { return d.value;});
var barChartGate = barChart()
  .width(600)
  .x(function (d) { return d.key;})
  .y(function (d) { return d.value;});
var barChartCar = barChart()
  .x(function (d) { return d.key;})
  .y(function (d) { return d.value;});

d3.csv("data/us-covid19-bystate.csv",
  function (d) {
    // This function is applied to each row of the dataset
    d.date = dateFmt(d.date);
    return d;
  },
  function (err, data) {
    if (err) throw err;


    // var nested_data=d3.nest().key(function (d) {return d.date;})
    //     .rollup(function (leaves) {return {"totalcase": d3.sum(leaves,function (d){return parseFloat(d.Cases);})}}).entries(data);
    var nested_data=d3.nest().key(function (d) { return d.state;}).entries(data);
    // var nested_data=d3.nest().key(function (d) { return d.state;}).rollup(data,v=>d3.sum(v,d=>d.Cases),d=>date).entries(data);


    // console.log(nested_data);
    var csData = crossfilter(data);
    // var nested_data=d3.nest().key(function (d) {return d.state;}).entries(csData);

    // We create dimensions for each attribute we want to filter by
    csData.dimTime = csData.dimension(function (d) { return d.date; });
    csData.dimState = csData.dimension(function (d) { return d.state; });
    csData.dimDeath = csData.dimension(function (d) { return d.Deaths; });
    // csData.dimDeath = csData.dimension(function (d) { return d.Deaths; });

    // We bin each dimension
    csData.timesByDay = csData.dimTime.group(d3.timeDay);
    csData.caseByState = csData.dimState.group();
    csData.caseByDeath = csData.dimDeath.group();
    console.log(csData.timesByDay);


    chartTimeline.onBrushed(function (selected) {
      csData.dimTime.filter(selected);
      update();
    });

    barChartCar.onMouseOver(function (d) {
      csData.dimState.filter(d.key);
      update();
    }).onMouseOut(function () {
      // Clear the filter
      csData.dimState.filterAll();
      update();
    });

    barChartGate.onMouseOver(function (d) {
      csData.dimDeath.filter(d.key);
      update();
    }).onMouseOut(function () {
      // Clear the filter
      csData.dimDeath.filterAll();
      update();
    });

    function update() {
      d3.select("#timeline")
        .datum(csData.timesByDay.all())
        .call(chartTimeline);

      d3.select("#CaseByState")
        .datum(csData.caseByState.all())
        .call(barChartCar);

      d3.select("#Deaths")
        .datum(csData.caseByDeath.all())
        .call(barChartGate)
        .select(".x.axis") //Adjusting the tick labels after drawn
        .selectAll(".tick text")
        .attr("transform", "translate(-8,-1) rotate(-45)");

    }

    update();


  }
);