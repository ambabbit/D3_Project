
d3.json("data.json").then(function(data) {
            
    console.log (data);

    var svgContainer = d3.select("body").append("svg")
    .attr("width", 300)
    .attr("height", 300);
                                      
    var circleGroup = svgContainer
    .append("g");

    var circles = circleGroup.selectAll("circle")
    .data(data.circles)
    .enter()
    .append("circle");


    var circleAttributes = circles
      .attr("cy", function(d) {return d.y;})
      .attr("cx", function(d) {return d.x;})
      .attr("r", function(d) {return d.r;})
      .style("fill", function(d) {return d.fill});
  }); 

  
  var svg = d3.select("svg");
        
  var path = d3.geoPath();
  
  d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error) throw error;
  
    svg.append("g")
        .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path);
    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

    svg.append("path")
      .attr("class","state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.counties, function(a,b) { return a !== b;})))
  });
  