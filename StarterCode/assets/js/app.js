d3.csv("assets/data/data.csv")
  .then(function(data) {

  data.forEach(function(data)  {
    data.poverty = +data.poverty;
    data.povertyMOE = +data.povertyMOE;
    data.age = +data.age;
    data.ageMOE = +data.ageMOE;
    data.income = +data.income;
    data.incomeMOE = +data.incomeMOE;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;
  });
  console.log(data)


var svgWidth = 1000;
var svgHeight = 600;


var margin = {
  top: 30,
  right: 50,
  bottom: 100,
  left: 40
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xValue = d => d. smokes; 
var xAxisLabel = "Smokers (by %)"

var yValue = d => d.poverty;
var yAxisLabel = "Poverty (by %)"  

var xScale = d3.scaleLinear()
  .domain(d3.extent(data, xValue))
  .range([0, width])
  .nice();

var yScale = d3.scaleLinear()
  .domain(d3.extent(data, yValue))
  .range([height, 0])
  .nice();
  
svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("fill", "steelblue")
  .attr("cx", d => xScale(xValue(d)))
  .attr("cy", d => yScale(yValue(d))+20)
  .attr("r", 10)
  .attr("opacity", ".75");
  
  var gScatter = svg.selectAll("g.dot")
    .data(data)
    .enter()
    .append('g')

  gScatter.append("text")
  .text(d => d.abbr)
  .attr("x", d => xScale(xValue(d)))
  .attr("y", d => yScale(yValue(d))+20)
  .attr("color", "black")
  .attr("fontsize", "9")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .style("font-size", "12px")
  .style("font-weight", "bold")

  // svg.selectAll("text")
  // .data(data)
  // .enter()
  // .append("text")
  // .attr("color", "black")
  // .text(d => d.abbr)
  // .attr("cx", d => xScale(xValue(d)))
  // .attr("cy", d => yScale(yValue(d)));



var xAxis = d3.axisBottom()
.scale(xScale)
.tickSize(-height)
.tickPadding(5);

var yAxis = d3.axisLeft()
.scale(yScale)
.tickSize(-width)
.tickPadding(5);

var g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var yAxisG= g.append("g").call(yAxis);
g.append("g").call(xAxis)
  .attr("transform", `translate(0,${height})`);

var xAxisG = g.append("g").call(xAxis)
  .attr("transform", `translate(0,${height})`);

xAxisG.select(".domain").remove();

xAxisG.append("text")
  .attr("class", "axis-label")
  .attr("y", 25)
  .attr("x", width/2)
  .attr("fill", "black")
  .style("font-size", "14px")
  .text(xAxisLabel); 

yAxisG.append("text")
  .attr("class", "axis-label")
  .attr("y", -30)
  .attr("x", -height/2)
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .style("font-size", "14px")
  .attr("transform", `rotate(-90)`)
  .text(yAxisLabel); 

g.append("text")
  .attr("x", "350")             
  .attr("y", "-10")
  .attr("text-anchor", "end")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("Percentage of Smokers vs Poverty by State");
});