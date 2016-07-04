"use strict";
//Example: http://bl.ocks.org/mbostock/7607999
d3_graph2d.prototype.set_bundlediagramdata1root = function(bundlediagramroot_I){
    //set tree layout root
    if (bundlediagramroot_I){this.bundlediagramroot = bundlediagramroot_I;}
    else {
        //this.bundlediagramroot=this.data1.nestdatafiltered;
        this.bundlediagramroot={'name':"",'children':this.data1.nestdatafiltered};
        //this.bundlediagramroot=d3.layout.hierarchy(this.data1.nestdatafiltered)
        };  
};
d3_graph2d.prototype.set_bundlediagramline = function(interpolate_I,tension_I){
    /*
    set the bundle diagram line
    INPUT:
    interpolate_I = string
    tensions_I = float
    */
    if (interpolate_I){var interpolate = interpolate_I;}
    else {var interpolate="bundle"};  
    if (tension_I){var tension = tension_I;}
    else {var tension=0.85};  

    this.bundlediagramline = d3.svg.line.radial()
        .interpolate(interpolate)
        .tension(tension)
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; });
};
d3_graph2d.prototype.set_bundlediagramdata1linkcss = function () {
    // predefined css style for x1 and y1 axis
    var lineselector = 'path.link';
    var style = {
        'stroke': 'steelblue',
        'stroke-opacity': '.4',
        'fill': 'none',
        'pointer-events': 'none',
    };
    var selectorstyle = [{ 'selection': lineselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
// update
d3_graph2d.prototype.set_bundlediagramdata1nodes = function(){
    // compute bundlediagram nodes
    var root = this.bundlediagramroot;
    this.bundlediagramnodes = this.cluster.nodes(root);
};
d3_graph2d.prototype.set_bundlediagramdata1links = function(){
    // compute bundlediagram links
    var nodes = this.bundlediagramnodes
    this.bundlediagramlinks = this.cluster.links(nodes);
    
};
// d3_graph2d.prototype.set_bundlediagramdata1_nodesandlinks_sourcetarget = function(){
//     /*
//     convert nodes and links to bundle diagram input

//     xdata is used as the value
//     xdatalabel is used as the source
//     ydatalabel is used as the target

//     */
//     var listdatafiltered = this.data1.listdatafiltered;
//     var xdata = this.data1keymap.xdata;
//     var xdatalabel = this.data1keymap.xdatalabel;
//     var ydatalabel = this.data1keymap.ydatalabel;

//     var graph = this.set_nodesAndLinks_sourceTarget(listdatafiltered,xdatalabel,ydatalabel,xdata);

//     this.bundlediagramnodes = graph.nodes;
//     this.bundlediagramlinks = graph.links;
// };
d3_graph2d.prototype.add_bundlediagramdata1node = function(){
    // add tree layout nodes
    var nodes = this.bundlediagramnodes;
    var duration= this.duration;
    var width = this.width;
    var height = this.height;
    var radius = this.radius;

    // node group
    this.bundlediagramnodegroup = this.svgg.selectAll("g.nodes")
        .data([nodes]);

    this.bundlediagramnodegroup.exit().remove();
    this.bundlediagramnodeentergroup = this.bundlediagramnodegroup.enter();
    this.bundlediagramnodeentergroup.append("g")
        .attr("class", "nodes")
        ;

    //nodes
    this.bundlediagramnode = this.bundlediagramnodegroup.selectAll(".node")
        .data(nodes);
        //.data(nodes.filter(function(n) {return !n.children;}));

    // Enter any new nodes at the parent's previous position.
    this.bundlediagramnodeenter = this.bundlediagramnode.enter();

    this.bundlediagramnodeenter.append("text")
        .attr("class", "node")
        .attr("dy", ".31em")
        .attr("transform", function(d) {
            return "rotate(" + (d.x - radius/5) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); 
//             //return "rotate(" + (d.x) + ")translate(" + (d.y) + ",0)" + (d.x < 180 ? "" : "rotate(180)")+"translate(" + width + ","+height+")"; 
//             return "rotate(" + (d.x) + ")translate(" + (d.y) + ",0)" + (d.x < 180 ? "" : "rotate(180)")+"translate(" + width + ","+height+")"; 
            })
        .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .text(function(d) { 
            return d.name; 
            })
        ;
//         .on("mouseover", mouseovered)
//         .on("mouseout", mouseouted);

    // Transition nodes to their new position.
    this.bundlediagramnodeupdate = this.bundlediagramnode.transition()
        //.duration(duration)
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); });

    this.bundlediagramnodeupdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.bundlediagramnodeexit = this.bundlediagramnode.exit().transition()
        //.duration(duration)
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
        .remove();

    this.bundlediagramnodeexit.select("text")
        .style("fill-opacity", 1e-6);
};
d3_graph2d.prototype.add_bundlediagramdata1link = function(){
    // add tree layout links
    var duration= this.duration;
    var links = this.bundlediagramlinks;
    var line = this.bundlediagramline;
    var bundle = this.bundle;

    //link groups
    this.bundlediagramlinkgroup = this.svgg.selectAll("g.links")
        .data([links]);

    this.bundlediagramlinkgroup.exit().remove();
    this.bundlediagramlinkgroupenter = this.bundlediagramlinkgroup.enter();
    this.bundlediagramlinkgroupenter.append("g")
        .attr("class", "links");

    // Update the links…
    this.bundlediagramlink = this.bundlediagramlinkgroup.selectAll(".link")
        //.data(links);
        .data(bundle(links));

    // Enter any new links at the parent's previous position.
    this.bundlediagramlinkenter = this.bundlediagramlink.enter();

    this.bundlediagramlinkenter.append("path")
        .attr("class", "link")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
            })
        .attr("d", line); 

    // Transition links to their new position.
    this.bundlediagramlink.select("path").transition()
        //.duration(duration)
        .attr("d", line);

    // Transition exiting nodes to the parent's new position.
    this.bundlediagramlink.exit().transition()
        //.duration(duration)
        .remove();
};


// function mouseovered(d) {
//   node
//       .each(function(n) { n.target = n.source = false; });

//   link
//       .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
//       .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
//     .filter(function(l) { return l.target === d || l.source === d; })
//       .each(function() { this.parentNode.appendChild(this); });

//   node
//       .classed("node--target", function(n) { return n.target; })
//       .classed("node--source", function(n) { return n.source; });
// }

// function mouseouted(d) {
//   link
//       .classed("link--target", false)
//       .classed("link--source", false);

//   node
//       .classed("node--target", false)
//       .classed("node--source", false);
// }