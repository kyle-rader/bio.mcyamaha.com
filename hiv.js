
var GENOME_LENGTH = 9719;

var GENE_MAP = {
    "rf1": {
        "5 LTR": {
            "start": 1,
            "end": 634
        },
        "p17": {
            "start": 790,
            "end": 1185
        },
        "p24": {
            "start": 1186,
            "end": 1879
        },
        "p7": {
            "start": 1921,
            "end": 2086
        },
        "p6": {
            "start": 2134,
            "end": 2291
        },
        "vif": {
            "start": 5041,
            "end": 5619
        },
        "tat": {
            "start": 8379,
            "end": 8468
        },
        "nef": {
            "start": 8797,
            "end": 9417
        }
    },
    "rf2": {
        "tat": {
            "start": 5831,
            "end": 6045
        },
        "vpu": {
            "start": 6062,
            "end": 6310
        },
        "rev": {
            "start": 8379,
            "end": 8653
        },
        "3 LTR": {
            "start": 9086,
            "end": 9719
        }
    },
    "rf3": {
        "pol": {
            "start": 2085,
            "end": 5096
        },
        "p1": {
            "start": 2085,
            "end": 2252
        },
        "prot": {
            "start": 2253,
            "end": 2550
        },
        "p51 RT": {
            "start": 2551,
            "end": 3870
        },
        "p15 RNase": {
            "start": 3871,
            "end": 4230
        },
        "p31 int": {
            "start": 4231,
            "end": 5096
        },
        "vpr": {
            "start": 5559,
            "end": 5849
        },
        "tat": {
            "start": 5970,
            "end": 6044
        },
        "gp120": {
            "start": 6225,
            "end": 7757
        },
        "gp41": {
            "start": 7759,
            "end": 8794
        }
    }
};

function readyFunction() {
    var classes = {"1.00":"1", "0.90":"2", "0.80":"3", "0.70":"4", "0.50":"5"};

	buildScale();

    $.each(_data, function(key, value) {
		$.each(_data[key], function(year, seqData) {
			buildSumbar(_data[key][year], classes[key]);
		});
    });

};

function buildScale() {

	// Width of scale.
	
	var width = Math.round($(window).width() * 0.85), height = 25;
	
	// <svg> container.
	
	var svg =
		$('<svg></svg>')
			.attr
			(
				{
					'width': width,
					'height': 100
				}
			);
	
	// Decorate parent of <svg>.
	
	$('.proteins')
		.append(svg);

	var YEAR_GUTTER_WIDTH = 50;
	var fsize = function (i) { return YEAR_GUTTER_WIDTH + (((width-YEAR_GUTTER_WIDTH) * i) / (GENOME_LENGTH)); };
	var i = 0;
	
	// For each reading frame in the genome...
	
	for (var frame in GENE_MAP)
	{
		for (var gene in GENE_MAP[frame])
		{
			var q = GENE_MAP[frame][gene];

			// <g> container for gene display.
			
			var container = $('<g></g>');
			svg.append(container);
		
			container
			
				// Offset based on start locus; vertical offset based on frame (0 ~ 2).
				
				.attr
				(
					{
						'transform': 'translate(' + fsize(q['start']) + ', ' + (25 * i) + ')'
					}
				)
				
				// Append the rectangle representing the gene in the reading frame.
				
				.append
				(
					$('<rect></rect>')
						.attr
						(
							{
								'width': (fsize(q['end']) - fsize(q['start'])),
								'height': 20,
								'style': 'fill: white; stroke: black;'
							}
						)
				)
				
				// Append the text label for the gene rectangle.
				
				.append
				(
					$('<text></text>')
						.attr
						(
							{
								'style': 'fill: black;',
								'x': 5,
								'y': 15
							}
						)
						.html(gene)
				);
		}
		i++;
	}
	
	// Trick: <svg> appears in the DOM but not in the display.
	// "Refresh" the parent container of the <svg> to get it to
	// wake up.
	
	$('.proteins').html( $('.proteins').html() );
}

function buildSumbar(data, thresholdClass) {

    var sumSeq = buildSummaryData(data['sequence'], 30);

    var width = Math.round($(window).width() * 0.85), height = 25;
    
    var y = d3.scale.linear()
	.range([height - 1, 0]);
    
    var chart = d3.select(".sequence-data-" + thresholdClass).append("svg")
	.attr("width", width)
	.attr("height", height);
	
	chart.append("text").transition().delay(500)
		.attr("x", 0)
		.attr("y", height - height/4)
		.text(data['year']);

    y.domain([0, d3.max(data, function(d) { return d; })]);
    
    var barWidth = (width-50) / sumSeq.length, barHeight = 25;
    
    var bar = chart.selectAll("g")
	.data(sumSeq)
	.enter().append("g")
	.attr("transform", function(d, i) { return "translate(" + ((i * barWidth) + 50) + ", 0)"; });

    bar.append("rect").transition().delay(function(d, i) { return i * 30; } )
	.attr("y", function(d) { return 0; })
	.attr("height", function(d) { return barHeight; })
	.attr("width", barWidth - (barWidth * .25))
	.style("fill", function(d) { return "rgb(" + (255 - d*255) + "," + (255 - d*175) +", " + 255 + ")";});
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

