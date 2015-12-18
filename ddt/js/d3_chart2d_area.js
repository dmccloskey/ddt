"use strict";
// Stacked area chart
// http://bl.ocks.org/mbostock/3885211
// Stacked density and quantile graphs
// http://bl.ocks.org/NPashaP/113f7fea0751fa1513e1
var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

data.forEach(function(d) {
d.date = parseDate(d.date);
});

var browsers = stack(color.domain().map(function(name) {
return {
  name: name,
  values: data.map(function(d) {
    return {date: d.date, y: d[name] / 100};
  })
};
}));

x.domain(d3.extent(data, function(d) { return d.date; }));

var browser = svg.selectAll(".browser")
  .data(browsers)
.enter().append("g")
  .attr("class", "browser");

browser.append("path")
  .attr("class", "area")
  .attr("d", function(d) { return area(d.values); })
  .style("fill", function(d) { return color(d.name); });