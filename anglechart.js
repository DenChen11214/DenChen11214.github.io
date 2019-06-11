var anglepoints = [];
var chart2 = new CanvasJS.Chart("anglechart", {
    title :{
		text: "𝛳2 vs 𝛳1"
	},
    axisX: {
		title:"𝛳1",
	},
	axisY:{
		title: "𝛳2"
	},
    data: [{
        markerSize: 5,
        type: "scatter",
        color: "red",
        dataPoints: anglepoints
    }]
});

var updateChart2 = function(t1,t2) {
    anglepoints.push({
        x: round(t1),
        y: round(t2)
    })
    chart2.render()
}

var round = function(n) {
    return Math.round(n * 10000) / 10000;
}
