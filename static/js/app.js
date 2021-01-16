d3.json("../samples.json").then(function(data) {
    console.log(data);

    d3.select("#selDataset").on("change", optionChanged);
    
    var sample_values = data.samples.map(row => row.sample_values);
    var otu_ids = data.samples.map(row => row.otu_ids);
    var otu_labels = data.samples.map(row => row.otu_labels);
    var ids = data.samples.map(row=>row.id)
    var metadata = data.metadata.map(d => d);
    // console.log(sample_values);
    // console.log(otu_ids);
    // console.log(otu_ids);
    // console.log(metadata);
    var dropdownMenu = d3.select("#selDataset");
            // var metadata = data.metadata.map(d => d);
            
    ids.map((d) => {
        dropdownMenu
            .append("option")
            .text(d)
            .property("value", d);
    });
        
    function buildPlots(id) {

        
        var filteredSV = sample_values[id]
            .filter((d,i) => i < 10);
        var filteredOTU = otu_ids[id]
            .filter((d,i) => i < 10);
        var filteredLabel = otu_labels[id]
            .filter((d,i) => i < 10);
        var otuID = filteredOTU.map(d => `OTU ${d}`);
        // console.log(filteredOTU);
        // console.log(filteredSV);
        // console.log(filteredLabel);
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
            y: sample_values[id],
            text: otu_labels[id],
            mode: 'markers',
            marker: {
                size: sample_values[id],
                color: otu_ids[id],
                opacity: [0.6]
            }
        }];

        Plotly.newPlot("bubble", plot2);
    };

    function getSampleData(sample) {

        var list = d3.select("#sample-metadata");
        list.html("");
        for (var i in sample) {
            list.append("p").text(`${i}: ${sample[i]}`);
        };
    }

    // function dropdown()

    function init() {

        var initSample = metadata[0];
        var initChart = 0;
        getSampleData(initSample);
        buildPlots(initChart);
        
    }
    
    function optionChanged() {
        newSample = d3.select("#selDataset").node().value;

        for (var i in ids) {
            if (ids[i] === newSample) {
                getSampleData(metadata[i]);
                buildPlots(i)
            };
        };

    }
    
    init();
    
});
