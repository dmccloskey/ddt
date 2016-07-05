"use strict";
// Sankey diagram
// e.g. visualization of genetic algorithm or network structure over time

//TODO:
//1. use the root to compute the nodes/links for greater generalizability
//2. add in other data to nodes/links

d3_graph2d.prototype.set_sankeydiagramdata1root = function(sankeydiagramroot_I){
    //set sankey layout root
    if (sankeydiagramroot_I){this.sankeydiagramroot = sankeydiagramroot_I;}
    else {
        //this.sankeydiagramroot={'name':"",'children':this.data1.nestdatafiltered};
        this.sankeydiagramroot=this.data1.nestdatafiltered[0];
        };  
};
d3_graph2d.prototype.set_sankeydiagramdata1nodes = function(node_span_I = this.height){
    // compute sankeydiagram nodes
    var root = this.sankeydiagramroot;
    this.sankeydiagramnodes = this.sankeydiagramsankey.nodes(root);
};
d3_graph2d.prototype.set_sankeydiagramdata1links = function(){
    // compute sankeydiagram links
    var nodes = this.sankeydiagramnodes
    this.sankeydiagramlinks = this.sankeydiagramsankey.links(nodes);
};
d3_graph2d.prototype.set_sankeydiagramdata1_nodesandlinks_sourcetarget = function(){
    /*
    convert nodes and links to sankey diagram input

    xdata is used as the value
    xdatalabel is used as the source
    ydatalabel is used as the target

    */
    var listdatafiltered = this.data1.listdatafiltered;
    var xdata = this.data1keymap.xdata;
    var xdatalabel = this.data1keymap.xdatalabel;
    var ydatalabel = this.data1keymap.ydatalabel;

    var graph = this.set_nodesAndLinks_sourceTarget(listdatafiltered,xdatalabel,ydatalabel,xdata);

    this.sankeydiagramnodes = graph.nodes;
    this.sankeydiagramlinks = graph.links;
};

d3_graph2d.prototype.update_sankeydiagramsankey = function(layout_I=32){
    // update the sankey diagram sankey class

    var nodes = this.sankeydiagramnodes;
    var links = this.sankeydiagramlinks;
    
    this.sankeydiagramsankey
        .nodes(nodes)
        .links(links)
        .layout(layout_I);
};
d3_graph2d.prototype.add_sankeydiagramdata1node = function(){
    // add sankey layout nodes
    var nodes = this.sankeydiagramnodes;
    var duration= this.duration;
    var sankey = this.sankeydiagramsankey;
    var path = this.sankeydiagrampath;
    var width = this.width;
    var colorscale = d3.scale.category20c(); //TODO: make into a seperate function call for better generalizability
    //var serieslabel = this.data1keymap.serieslabel;

    var formatNumber = d3.format(",.0f");
    var format = function(d) { return formatNumber(d) + " TWh"; };
    
//     //TODO: make into a seperate function; drag hehavior is not responding correctly;
//     var link = this.sankeydiagramlink;
//     var height = this.height;
//     function dragmove(d) {
//         d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
//         sankey.relayout();
//         link.attr("d", path);
//     };

    // node group
    this.sankeydiagramnodegroup = this.svgg.selectAll("g.nodegroup")
        .data([nodes]);

    this.sankeydiagramnodegroup.exit().remove();
    this.sankeydiagramnodeentergroup = this.sankeydiagramnodegroup.enter();
    this.sankeydiagramnodeentergroup.append("g")
        .attr("class", "nodegroup")
        ;

    this.sankeydiagramnode = this.sankeydiagramnodegroup.selectAll("g.node")
        .data(nodes);

    // Enter any new nodes at the parent's previous position.
    this.sankeydiagramnodeenter = this.sankeydiagramnode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//         //TODO: make into a new function
//         .call(d3.behavior.drag()
//             .origin(function(d) { return d; })
//             .on("dragstart", function() { this.parentNode.appendChild(this); })
//             .on("drag", dragmove));

    this.sankeydiagramnodeenter.append("rect")
        //.attr("height", function(d) { return d.dy; })
        .attr("height", function(d) { return Math.max(.25,d.dy); })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { return d.color = colorscale(d.name); })
        .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
        .append("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });

    this.sankeydiagramnodeenter.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
        .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // Transition nodes to their new position.
    this.sankeydiagramnodeupdate = this.sankeydiagramnode.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    this.sankeydiagramnodeupdate.select("rect")
        .attr("height", function(d) { return Math.max(.25,d.dy); })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { return d.color = colorscale(d.name); })
        .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
        .select("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });

    this.sankeydiagramnodeupdate.select("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
        .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // Transition exiting nodes to the parent's new position.
    this.sankeydiagramnodeexit = this.sankeydiagramnode.exit().transition()
        .duration(duration)
        .remove();
};
d3_graph2d.prototype.add_sankeydiagramdata1link = function(){
    // add sankey layout links
    var links = this.sankeydiagramlinks;
    var duration= this.duration;
    var sankey = this.sankeydiagramsankey;
    var path = this.sankeydiagrampath;
    var colorscale = this.colorscale;
    //var serieslabel = this.data1keymap.serieslabel;

    var formatNumber = d3.format(",.0f");
    var format = function(d) { return formatNumber(d); };

    //link groups
    this.sankeydiagramlinkgroup = this.svgg.selectAll("g.linksgroup")
        .data([links]);

    this.sankeydiagramlinkgroup.exit().remove();
    this.sankeydiagramlinkgroupenter = this.sankeydiagramlinkgroup.enter();
    this.sankeydiagramlinkgroupenter.append("g")
        .attr("class", "linksgroup");

    // Update the links…
    this.sankeydiagramlink = this.sankeydiagramlinkgroup.selectAll("path.link")
        .data(links);

    // Enter any new links at the parent's previous position.
    this.sankeydiagramlinkenter = this.sankeydiagramlink.enter();

    this.sankeydiagramlinkenter.append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", function(d) { return colorscale(d.value); })
        .sort(function(a, b) { return b.dy - a.dy; });

    this.sankeydiagramlinkenter.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    // Transition links to their new position.
    this.sankeydiagramlinkupdate = this.sankeydiagramlink.transition()
        .duration(duration)
        ;

    this.sankeydiagramlinkupdate.select("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", function(d) { return colorscale(d.value); })
        .sort(function(a, b) { return b.dy - a.dy; });

    this.sankeydiagramlinkupdate.select("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    // Transition exiting nodes to the parent's new position.
    this.sankeydiagramlink.exit().transition()
        .duration(duration)
        .remove();
};
d3_graph2d.prototype.set_sankeydiagramdata1css = function () {
    //set predefined sankeydiagram style

    var selector1 = '#' + this.id + ' .node rect';
    var style1 = {
        'cursor': 'move',
        'fill-opacity': '.9',
        'shape-rendering:': 'crispEdges',
    };
    var selector2 = '#' + this.id + ' .node text';
    var style2= {
        'pointer-events': 'none',
        'text-shadow': '0 1px 0 #fff',
        'font': '10px Arial'
    };
    var selector3 = '#' + this.id + ' .link';
    var style3 = {
        'fill': 'none',
        //'stroke': '#000',
        'stroke-opacity': '.2',
    };
    var selector4 = '#' + this.id + ' .link:hover';
    var style4 = {
        'stroke-opacity': '.5',
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 },
                     { 'selection': selector2, 'style': style2 },
                     { 'selection': selector3, 'style': style3 },
                     { 'selection': selector4, 'style': style4 }];
    this.set_svggcss(selectorstyle);
};
