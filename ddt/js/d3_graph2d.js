"use strict";
//TODO:
// d3_graph(childclass of d3_svg):
// collapsible force layout: http://bl.ocks.org/mbostock/1062288
// collapsible force layout with data and labels: http://bl.ocks.org/mbostock/1093130
// labeled force layout: http://bl.ocks.org/mbostock/950642
// sticky for layout: http://bl.ocks.org/mbostock/3750558
// add nodes: http://bl.ocks.org/mbostock/929623
// metabolites, proteins, genes, reactions as nodes
// metabolite to reaction, reaction to protein to genes as links
function d3_graph2d() {
    // generic graph
    d3_svg_data.call(this);
};
d3_graph2d.prototype = Object.create(d3_svg_data.prototype);
d3_graph2d.prototype.constructor = d3_graph2d;
d3_graph2d.prototype.add_graph2d2tile = function(){
    // add graph2d to tile

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    var tileid = this.tileid;
    var id = this.id;
    var data1listdatafiltered = this.data1.listdatafiltered;

    this.svgelement = d3.select('#' + tileid+"panel-body").selectAll(".svg-responsive")
        .data([data1listdatafiltered]);
    
    this.svgenter = this.svgelement.enter()    
        .append("div")
        .attr("class",'svg-responsive')
        .append("svg")
        .attr("id", id)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svgelement.selectAll("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_graph2d.prototype.remove_graph2d = function(){
    // remove graph2d from tileid
    if (this.svgelement){
        this.svgelement.remove();
        this.svgelement = null;
        this.svgenter = null;
        this.svgg = null;
    };
};
d3_graph2d.prototype.add_title = function (title_I) {
    // add graph title
    this.title = this.svgg.append("text")
    .attr("x", this.width / 2)
    .attr("y", -this.margin.top / 2)
    .attr("class", "title")
    .attr("id", this.id+"title")
    .style("text-anchor", "middle")
    .text(title_I);
};
d3_graph2d.prototype.remove_title = function () {
    // remove graph title
    this.title.remove();
    this.title = null;
};
d3_graph2d.prototype.set_cluster = function(width_I,height_I,sort_I){
    /*set d3 cluster
    INPUT:
    width_I = width or 360 for circle
    height_I = height or inner radius for circle
    sort_I = sort
    */

    if (width_I){var width = width_I;}
    else {var width=360};  

    if (this.radius){
        var innerradius = this.radius/4.0;
    } else {
        var innerradius = this.height/4.0;
    };
    if (height_I){var height = height_I;}
    else {var height=this.innerradius}; 

    if (sort_I){var sort = sortI;}
    else {var sort=null}; 

    this.cluster = d3.layout.cluster()
        .size([width, height])
        .sort(sort)
        .value(function(d) { return d.size; }); 
};
d3_graph2d.prototype.set_bundle = function(){
    /*set d3 bundle
    */
    this.bundle = d3.layout.bundle();
};