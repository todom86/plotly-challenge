// d3.json("../samples.json").then(function(data) {
//     console.log(data);

// d3.selectAll("body").on("change", updatePlotly);
    // var sampleValues = data.samples.map(row => row.sample_values);
    // var otu_ids = data.samples.map(row => row.otu_ids);
    // var otu_labels = data.samples.map(row => row.otu_labels);
    // var samples = data.names.map(d => d);
    // var metadata = data.metadata.map(d => d);
    // console.log(sample);
    
function buildPlots(id) {
    d3.json(`../samples.json`).then(function(data){
    
        console.log(data);

        var sampleValues = data.samples.map(row => row.sample_values);
        var otu_ids = data.samples.map(row => row.otu_ids);
        var otu_labels = data.samples.map(row => row.otu_labels);
        // console.log(otu_ids);

        var filteredSV = sampleValues[id].filter((d,i) => i < 10);
        var filteredOTU = otu_ids[id].filter((d,i) => i < 10);
        var filteredLabel = otu_labels[id].filter((d,i) => i < 10);
        console.log(filteredOTU);
        // console.log(filteredSV);
        // console.log(filteredLabel);

        var otuID = filteredOTU.map(d => `OTU ${d}`);
        // console.log(otuID);

        var plot1 = [{
            x: filteredSV,
            y: otuID,
            type: "bar",
            orientation: "h",
            text: filteredLabel
        }];

        Plotly.newPlot("bar", plot1);

        var plot2 = [{
            x: otu_ids[id],
            y: sampleValues[id],
            text: otu_labels[id],
            mode: 'markers',
            marker: {
                size: sampleValues[id],
                color: otu_ids[id],
                opacity: [0.6]
            }
        }];

        Plotly.newPlot("bubble", plot2);
    });
}

function getSampleData(sample) {

    list = d3.select("#sample-metadata");
    list.html("");
    for (var i in sample) {
        list.append("p").text(`${i}: ${sample[i]}`);
    };
}

function init() {

    d3.json('../samples.json').then((data) => {
        var dropdownMenu = d3.select("#selDataset");
        var metadata = data.metadata.map(d => d);
        
        data.names.map((sample, i) => {
            dropdownMenu
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        var initSample = metadata[0];
        var initChart = 0
        getSampleData(initSample)
        buildPlots(initChart)
    });
}

function optionChanged(newSample) {
    newSample = index;
    getSampleData(newSample);
}

init()
// });
