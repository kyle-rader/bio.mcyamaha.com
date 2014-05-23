$(document).ready(function() {
    buildSumbar();
});

function buildSumbar() {
    var data = getData(2005, 25);

    var width = Math.round($(window).width() * 0.85), height = 50;
    
    var y = d3.scale.linear()
	.range([height - 1, 0]);
    
    var chart = d3.select(".chart")
	.attr("width", width)
	.attr("height", height);
    
    y.domain([0, d3.max(data, function(d) { return d; })]);
    
    var barWidth = width / data.length, barHeight = 50;
    
    var bar = chart.selectAll("g")
	.data(data)
	.enter().append("g")
	.attr("transform", function(d, i) { return "translate(" + i * barWidth + ", 0)"; });

    bar.append("rect")
	.attr("y", function(d) { return 0; })
	.attr("height", function(d) { return barHeight; })
	.attr("width", barWidth - (barWidth * .25));

    bar.selectAll("rect").transition().delay(function(d, i) { return i * 500;})
        .style("fill", function(d) { return "rgb(" + 255 + "," + (255 - d*255) +", " + (275-(d*255)) + ")";});

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
	    sumData = buildSummaryData(response['1.00']['sequence'], bin);
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

