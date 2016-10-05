function drawGraph(dataToRemove){
    d3.json('./data.json', function(err,data){
        if(dataToRemove){
            for(var i=0; i<data.length; i++){
                if(dataToRemove["Country Name"] === data[i]["Country Name"]){
                   data.splice(i, 1);
                }
            }

        }
            makeChart(data);




    /*data.forEach(function(d){
        //d["\"Country Name\""] = d["\"Country Name\""].replace(/\"/g, "");
        //d["\"Area (Sq. Km.) 2010\""] = parseFloat(d["\"Area (Sq. Km.) 2010\""].replace(/\"/g, ""));

        console.log(d["\"Area (Sq. Km.) 2010\""]);
        console.log(d["\"Country Name\""].replace(/\"/g, ""));
       // makeChart();
    });*/

});
          function makeChart(data){
        var outerWidth = 800;
      var outerHeight = 300;
      var margin = { left: 90, top: 30, right: 30, bottom: 150 };
      var barPadding = 0.2;

      var xColumn = "Country Name";
      var yColumn = "Area";

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var svg = d3.select("#graph").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);
      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var xAxisG = g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")");
      var yAxisG = g.append("g");

      var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
      var yScale = d3.scale.linear().range([innerHeight, 0]);
      var formatValue = d3.format(".2s");
      var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
      var yAxis = d3.svg.axis().scale(yScale).tickFormat(function(d) { return formatValue(d)}).orient("left");

        xScale.domain(data.map(function (d){
            return d[xColumn];
        }));
        yScale.domain([0, d3.max(data, function (d){
            return parseFloat(d[yColumn]);
        })]);

        xAxisG.call(xAxis).selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
        yAxisG.call(yAxis);

        var bars = g.selectAll("rect").data(data);
        bars.enter().append("rect")
          .attr("width", xScale.rangeBand());
        bars.attr("x",      function (d){
         return xScale(d[xColumn]);
         }).attr("id",      function (d){
         return d[xColumn];
         }).attr("y", function (d){
            return yScale(parseFloat(d[yColumn]));
        }).attr("height", function (d){
         return innerHeight - yScale(parseFloat(d[yColumn]));
         });
        bars.exit().remove();
      }

}

