var totalEnergy = [];
var kineticEnergy = [];
var potentialEnergy = [];
var time = 0;
var toggleDataSeries = function(e) {
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	chart.render();
}
var chart = new CanvasJS.Chart("energychart", {
	title :{
		text: "Energy vs Time"
	},
	axisY: {
		title: "Energy (J)"
	},
    axisX: {
		title: "Time (s)"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		markerSize: 1,
		type: "spline",
		dataPoints: totalEnergy,
		showInLegend: true,
		name: "Total Energy",
	}, {
		markerSize: 1,
		type: "spline",
		dataPoints: kineticEnergy,
		showInLegend: true,
		name: "Kinetic Energy",
	}, {
		markerSize: 1,
		type: "spline",
		dataPoints: potentialEnergy,
		showInLegend: true,
		name: "Potential Energy",
	}]
});

var dataLength = 100; // number of dataPoints visible at any point

var updateChart = function (u,ke,pe) {
	totalEnergy.push({
		x: time,
		y: u
	});
	kineticEnergy.push({
		x: time,
		y: ke
	});
	potentialEnergy.push({
		x: time,
		y: pe
	});

	if (totalEnergy.length > dataLength) {
		totalEnergy.shift();
		kineticEnergy.shift();
		potentialEnergy.shift();
	}

	chart.render();
};
