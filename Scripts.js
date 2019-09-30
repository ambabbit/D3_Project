
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

    d3.selectAll("path")
      .on("mouseover", function(this) {
        console.log(this.name)
        d3.select(this).style("fill", blue);
      })
    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

    svg.append("path")
      .attr("class","state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.counties, function(a,b) { return a !== b;})))
  });

  





  //****************************************************************************************** */
  <!DOCTYPE html>
<html>
  <head>
        <script type="text/javascript" src="https://d3js.org/d3.v5.min.js"></script>
        <script type="text/javascript" src="Scripts.js"></script>
        <script type="text/javascript" src='https://code.jquery.com/jquery-1.11.0.min.js'></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/2.2.0/topojson.js"></script>
  </head>
  <body>
      <title>D3 Project</title>

      <style>
        .states {
          fill: lightgray;
        }
        .states :hover {
          fill: red;
        }

        .counties {
          fill: lightgray;
          stroke-width: 0.5px;
        }
        .state-borders {
          fill: none;
          stroke: black;
          stroke-width: 1px;
          stroke-linejoin: round;
          stroke-linecap: round;
          pointer-events: none;
        }

        .counties-border {
          fill: none;   
          stroke: white;
          stroke-width: 0.5px;
          stroke-linejoin: round;
          stroke-linecap: round;
          pointer-events: none;

        }

        .selected-state {
          fill: blue;
        }
        
        
        </style>
        <svg width="960" height="600"></svg>
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="https://d3js.org/topojson.v2.min.js"></script>
        <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
        <script>
        
        var svg = d3.select("svg").append("g"),
            center,
            width = 960,
            height = 500;

        var projection = d3.geoAlbers()
            .scale(1070)
            .translate([width / 2, height / 2]);

        var path = d3.geoPath();

        var color = d3.scaleSequential().domain([1,10]).interpolator(d3.interpolateRdBu);

        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json", function(error, us) {
          if (error) throw error;
          
          svg.append("g")
            .attr("class","counties")
            .selectAll("path")  
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", d => color(Math.random() * (10-1) +1))
            //.on("click", reset)
            .append("title")
            .text(d => d.properties.name);

          svg.append("g")
            .append("path")
            .attr("class","counties-border")
            .attr("d", path(topojson.mesh(us, us.objects.counties, function(a,b) { return a !== b;})))
          
          svg.append("g") //add states
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("class", "states")
            .attr("d", path)
            .on("click", clicked)
            .on("mouseover", function(d) {d3.select(this).style("opacity", "0")})
            .on("mouseout", function(d) {d3.select(this).style("opacity", "1")})
            .append("title")
            .text(d => d.properties.name); 
          
          svg.append("g")
            .append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
/*
          d3.selectAll("path")
          .on("click", function() {
            d3.select(this)
            .attr("class", "selected-state");
            console.log(this);
          });*/

        });

  function clicked(d) {
    var x, y, k;
      console.log(d);
    if (d && center !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      center = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      center = null;
    }

    svg.selectAll("path")
        .classed("active", center && function(d) { return d === center; });

    svg.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");

    d3.select(this).style("display", "none");
}
  function reset() {
    
  }
        </script>
    <p></p>
  </body>
</html>