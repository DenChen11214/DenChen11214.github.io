var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chart", {
	title :{
		text: "Energy vs Time"
	},
	axisY: {
		title: "Energy (J)"
	},
    axisX: {
		title: "Time (s)"
	},
	data: [{
		type: "line",
		dataPoints: dps
	}]
});

var xVal = 0;
var yVal = 100;
var updateInterval = 50;
var dataLength = 100; // number of dataPoints visible at any point

var updateChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		dps.push({
			x: xVal,
			y: yVal
		});
		xVal++;
	}

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChart(dataLength);
