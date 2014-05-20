
$(document).ready(function() {
    buildSumbar();
});

function buildSumbar() {
    var data = getData(2005, 25);

	var width = Math.round($(window).width() * 0.85), height = 500;
	
	var y = d3.scale.linear()
						.range([height - 1, 0]);
						
	var chart = d3.select(".chart")
						.attr("width", width)
						.attr("height", height);
						
	y.domain([0, d3.max(data, function(d) { return d; })]);
	
	var barWidth = width / data.length;
	
	var bar = chart.selectAll("g")
						.data(data)
					.enter().append("g")
						.attr("transform", function(d, i) { return "translate(" + i * barWidth + ", 0)"; });
	bar.append("rect").transition().delay(50)
		.attr("y", function(d) { return y(d); })
		.attr("height", function(d) { return height - y(d); })
		.attr("width", barWidth - (barWidth * .25));
/*
	bar.append("text")
		.attr("x", barWidth / 2)
		.attr("y", function(d) { return y(d) + 3;  })
		.attr("dy", ".75em")
		.text(function(d) { return d.toPrecision(2); });
*/
};

function getData(year, bin) {
    var sumData;
    $.ajax({
	type: 'POST',
	async: false,
	url:'/ajax/get_sequence_data.php',
	data: {'year':year},
	success: function(response) {
	    response = JSON.parse(response);
	    sumData = buildSummaryData(response['sequence'], bin);
	}
    });
    return sumData;
};

function buildSummaryData(sequenceData, binWidth) {
    var length = sequenceData.length;
    var sum = 0;
    var sumData = [];

    for(var i = 0; i < length; i++) {
	if (i % binWidth == 0 || i == (length - 1)) {
	    sumData.push(sum/binWidth);
	    sum = 0;
	}
	sum += sequenceData[i] == 'N' ? 0 : 1;
    }
    return sumData;
};

