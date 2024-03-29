"use strict";
//TODO:
// d3_graph(childclass of d3_svg):
// collapsible force layout: http://bl.ocks.org/mbostock/1062288
// collapsible force layout with data and labels: http://bl.ocks.org/mbostock/1093130
// labeled force layout: http://bl.ocks.org/mbostock/950642
// sticky for layout: http://bl.ocks.org/mbostock/3750558
// add nodes: http://bl.ocks.org/mbostock/929623
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
        var innerradius = this.radius-this.radius/4.0;
    } else {
        var innerradius = this.height/4.0;
    };
    if (height_I){var height = height_I;}
    else {var height=innerradius}; 

    if (sort_I){var sort = sort_I;}
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
d3_graph2d.prototype.set_treelayouttree = function(width_I,height_I,nodeWidth_I=null,nodeHeight_I=null){
    // set the layout tree

    if (width_I){var width = width_I;}
    else {var width=360};  

    if (this.radius){
        var innerradius = this.radius-this.radius/4.0;
    } else {
        var innerradius = this.height/4.0;
    };
    if (height_I){var height = height_I;}
    else {var height=innerradius}; 

//     if (nodeWidth_I){var nodeWidth = nodeWidth_I;}
//     else {var nodeWidth = width;}
//     if (nodeHeight_I){var nodeHeight = nodeHeight_I;}
//     else {var nodeHeight = height;}

    if (typeof(nodeWidth_I)==typeof(0.0) && typeof(nodeHeight_I)==typeof(0.0)){
        this.treelayouttree = d3.layout.tree()
            .size([width,height])
            .nodeSize([nodeWidth_I,nodeHeight_I]);
    } else {
        this.treelayouttree = d3.layout.tree()
            .size([width,height]);        
    };
};
d3_graph2d.prototype.set_treelayoutdiagonal = function(){
    // set the layout diagonal
    this.treelayoutdiagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });
};
d3_graph2d.prototype.set_radiallayoutprojection = function(){
    // analogous to d3.svg.diagnol except for a radial layout
    var innerradius = this.radius-this.radius/4.0;
    var radius = this.radius;
    this.radiallayoutprojection = function project(x, y) {
        var angle = (x - 90) / 180 * Math.PI, radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
        };
};
d3_graph2d.prototype.set_radiallayoutstep = function(){
    // analogous to d3.svg.diagonal.radial but with square corners

    this.radiallayoutstep = function step(startAngle, startRadius, endAngle, endRadius) {
      var c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI),
          s0 = Math.sin(startAngle),
          c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI),
          s1 = Math.sin(endAngle);
      return "M" + startRadius * c0 + "," + startRadius * s0
          + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
          + "L" + endRadius * c1 + "," + endRadius * s1;
    }
};
d3_graph2d.prototype.set_verticallayoutstep = function(){
    // analogous to d3.svg.diagonal but with square corners
    // TODO: there is either a problem with scaling the lengths for calculating the steps

    this.verticallayoutstep = function step(startX, startY, endX, endY) {
      return "M" + startX + "," + startY
          + "L" + endX + "," + startY
          + "L" + endX + "," + endY;
    }
};
d3_graph2d.prototype.set_treemaplayouttreemap = function(width_I=this.width,height_I=this.height,sticky_I=true){
    // set the layout treemap
    
    this.treemaplayouttreemap = d3.layout.treemap()
        .size([width_I,height_I])
        .value(function(d) { return d.size; })
        .sticky(sticky_I);
};
d3_graph2d.prototype.set_partitionlayoutpartition = function(width_I=this.width,height_I=this.height,padding_I = 1,round_I=true){
    // set the layout partition
    
    this.partitionlayoutpartition = d3.layout.partition()
        //.value(function(d) { return d.size; })
        //.value(function(d) { return 1; })

        //.padding(padding_I)
        //.round(round_I)

        .size([width_I,height_I]);
};
d3_graph2d.prototype.set_sankeydiagramsankey = function(width_I=this.width,height_I=this.height,nodePadding_I = 5,nodeWidth_I=15){
    /*set the sankey diagram sankey class
    */
    
    this.sankeydiagramsankey = d3.sankey()
        .nodePadding(nodePadding_I)
        .nodeWidth(nodeWidth_I)  
        .size([width_I,height_I]);

    this.sankeydiagrampath = this.sankeydiagramsankey.link();
};
d3_graph2d.prototype.set_nodesAndLinks_sourceTarget = function(data_I,source_I,target_I,value_I){
    /*
    set nodes and links for binary acyclic graph
    adapted from: http://bl.ocks.org/d3noob/c9b90689c1438f57d649
    */

    var nodes = [];
    var links = [];

    data_I.forEach(function (d) {
        nodes.push({ "name": d[source_I] });
        nodes.push({ "name": d[target_I] });
        links.push({ "source": d[source_I],
                         "target": d[target_I],
                         "value": +d[value_I] });
    });

    // return only the distinct / unique nodes
    nodes = d3.keys(d3.nest()
        .key(function (d) { return d.name; })
        .map(nodes));

    // loop through each link replacing the text with its index from node
    links.forEach(function (d, i) {
        links[i].source = nodes.indexOf(links[i].source);
        links[i].target = nodes.indexOf(links[i].target);
    });

    //now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    nodes.forEach(function (d, i) {
        nodes[i] = { "name": d };
    });    

    return {'nodes':nodes,'links':links};
};
d3_graph2d.prototype.set_nodesAndLinks = function(){
    /*
    set nodes and links for binary acyclic graph

    NOTES:
    adapted from: http://bl.ocks.org/d3noob/c9b90689c1438f57d649
    nestkeys are used to determine the linkages
    ydata is used as the value

    OUTPUT:
    nodes: .name attribute required for sankey
            .id attribute required for forcelayout
    links: .value attribute required for sankey
    */

    var listdatafiltered = this.data1.listdatafiltered;
    var nestkey = this.data1.nestkey;
    var ydata = this.data1keymap.ydata;
    var ydatalabel = this.data1keymap.ydatalabel;
    var zdata = this.data1keymap.zdata;

    var nodes = [];
    var nodes_map = {};
    var links = [];

    // loop through each row and return
    // all nodes and links
    listdatafiltered.forEach(function (d) {
        for (var i=0;i<nestkey.length;i++){
            nodes.push({"name": d[nestkey[i]]});
            nodes_map[d[nestkey[i]]]=d;
            if (i>0){
                links.push({ "source": d[nestkey[i-1]],
                         "target": d[nestkey[i]],
                         "value":  d[ydata],
                         "color":  d[ydatalabel],
                         "marker": d[zdata]}
                         );
            }

        }
    });        

    // return only the distinct / unique nodes
    var nodes_unique = d3.keys(d3.nest()
        .key(function (d) { return d.name; })
        .map(nodes));

    // loop through each link replacing the text with its index from node
    links.forEach(function (d, i) {
        links[i].source = nodes_unique.indexOf(links[i].source);
        links[i].target = nodes_unique.indexOf(links[i].target);
    });

    //re-build the nodes array with only the unique nodes
    var nodes = [];
    nodes_unique.forEach(function (d, i) {
        nodes.push({ "name": d,"id":d,"data":nodes_map[d]});
    });    

    return {'nodes':nodes,'links':links};
};