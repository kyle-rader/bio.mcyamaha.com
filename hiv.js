
function readyFunction() {
    var classes = {"1.00":"1", "0.90":"2", "0.80":"3", "0.70":"4", "0.50":"5"};
    
	
    $.each(_data, function(key, value) {
		$.each(_data[key], function(year, seqData) {
			buildSumbar(_data[key][year], classes[key]);
		});
    });
	
	console.log(_proteinData);
};

function buildSumbar(data, thresholdClass) {

    var sumSeq = buildSummaryData(data['sequence'], 35);

    var width = Math.round($(window).width() * 0.85), height = 25;
    
    var y = d3.scale.linear()
	.range([height - 1, 0]);
    
    var chart = d3.select(".sequence-data-" + thresholdClass).append("svg")
	.attr("width", width)
	.attr("height", height);

    y.domain([0, d3.max(data, function(d) { return d; })]);
    
    var barWidth = width / sumSeq.length, barHeight = 25;
    
    var bar = chart.selectAll("g")
	.data(sumSeq)
	.enter().append("g")
	.attr("transform", function(d, i) { return "translate(" + i * barWidth + ", 0)"; });

    bar.append("rect").transition().delay(function(d, i) { return i * 50; } )
	.attr("y", function(d) { return 0; })
	.attr("height", function(d) { return barHeight; })
	.attr("width", barWidth - (barWidth * .25))
	.style("fill", function(d) { return "rgb(" + (255 - d*255) + "," + (255 - d*155) +", " + 255 + ")";});

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

