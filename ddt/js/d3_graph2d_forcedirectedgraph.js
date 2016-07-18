"use strict";
// Force directed graph
// http://bl.ocks.org/mbostock/4062045
// pan/zoom/multi-drag http://bl.ocks.org/pkerpedjiev/0389e39fad95e1cf29ce
// arrows http://bl.ocks.org/mbostock/1153292

d3_graph2d.prototype.get_forceDirectedGraph_linkLine = function(){
    /*
    return linkLine function to compute a striaght line
    */
    return function linkLine(d) {
        return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
    };
};
d3_graph2d.prototype.get_forceDirectedGraph_linkArc = function(){
    /*
    return linkArc function to compute a curved line
    */
    return function linkArc(d) {
        var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    };
};
d3_graph2d.prototype.add_forceDirectedGraphData1Tick = function(){
    /*
    add tick to forcelayout force
    */
    var this_ = this;
    var linkPath = this.get_forceDirectedGraph_linkLine();
    //var linkPath = this.get_forceDirectedGraph_linkArc();

    function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    };

    function tick(){
        this_.forcelayoutlink
//             .attr("d",linkLine)
            .attr("d",linkPath)
//             .attr("x1", function(d) { return d.source.x; })
//             .attr("y1", function(d) { return d.source.y; })
//             .attr("x2", function(d) { return d.target.x; })
//             .attr("y2", function(d) { return d.target.y; })
            ;

        this_.forcelayoutnode
//             .attr("cx", function(d) { return d.x; })
//             .attr("cy", function(d) { return d.y; })
            .attr("transform", transform);
    }

    this.forcelayoutdata1force
        .on("tick",tick)
};
d3_graph2d.prototype.set_forceDirectedGraphData1NodesAndLinks = function(){
    // compute forcelayout nodes and links

    var graph = this.set_nodesAndLinks();

    this.forcelayoutdata1nodes = graph.nodes;
    this.forcelayoutdata1links = graph.links;
};
d3_graph2d.prototype.add_forceDirectedGraphData1Node = function(){
    /*
    add forcedirectedgraph nodes

    d.data[xdata] controls the node size
    d.data[xdatalabel] controls the node color
    */ 
    var nodes = this.forcelayoutdata1nodes;
    //var duration= this.duration;
    var force = this.forcelayoutdata1force;
    var colorscale = this.colorscale;
    var xdata = this.data1keymap.xdata;
    var xdatalabel = this.data1keymap.xdatalabel;

    this.forcelayoutnode = this.svgg.selectAll(".node")
    //this.forcelayoutnode
        .data(nodes, function(d) { return d.id;});

    // Enter any new nodes at the parent's previous position.
    this.forcelayoutnodeenter = this.forcelayoutnode.enter()
        .append("g")
        .attr("class", "node")
        .call(force.drag)
        ;

    this.forcelayoutnodeenter.append("circle")
        .attr("r", function(d) {
            return 5;
            //return Math.sqrt(d.size) / 10 || 4.5; 
            })
        //TODO change color based on value
       //.style("fill", function(d) {return colorscale(d.data[xdatalabel]);})
//         .style("fill", function(d) {return "#c6dbef";})
        ;

    this.forcelayoutnodeenter.append("text")
        //.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1);

    // Transition nodes to their new position.
    this.forcelayoutnodeupdate = this.forcelayoutnode.transition()
        //.duration(duration)
        ;

    this.forcelayoutnodeupdate.select("circle")
        .attr("r", function(d) {
            return 5;
            //return Math.sqrt(d.size) / 10 || 4.5; 
            })
//        .style("fill", function(d) {return colorscale(d.data[xdatalabel]);})
//          .style("fill", function(d) {return "#c6dbef";})
;

    this.forcelayoutnodeupdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.forcelayoutnodeexit = this.forcelayoutnode.exit()
        //.transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.add_forceDirectedGraphData1Link = function(){
    /*
    add forcedirectedgraph links

    d.data[ydata] controls the stroke-width
    d.data[ydatalabel] controls the stroke color
    */ 

    var links = this.forcelayoutdata1links;
    //var duration= this.duration;
    var colorscale = this.colorscale;
    var ydata = this.data1keymap.ydata;
    var ydatalabel = this.data1keymap.ydatalabel;
    var id = this.id;
    var linkPath = this.get_forceDirectedGraph_linkLine();
    //var linkPath = this.get_forceDirectedGraph_linkArc();

    // Update the links…
    //this.forcelayoutlink = this.svgg.selectAll("path")
    this.forcelayoutlink = this.svgg.selectAll(".link")
        .data(links);

    // Enter any new links at the parent's previous position.
//     this.forcelayoutlink.enter().insert("line", ".node")
//         .attr("class", "link")
    this.forcelayoutlink.enter().append("path")
        .attr("class", "link")
        //TODO: class each link dynamically
        //      then use css to set solid/broken, etc.
        //.attr("class", function(d) { return "link " + d.type; })
        .style("stroke", function(d) {
            return colorscale(d.color);
            })
        .attr("stroke-width", function(d) { 
            return Math.sqrt(d.value); 
            })
        .attr("marker-end", function(d) { return "url(#" + id + "marker" + d.marker + ")"; })
        ; 

    // Transition links to their new position.
    this.forcelayoutlink.transition()
        //.duration(duration)
        .attr("d",linkPath)
        .style("stroke", function(d) {return colorscale(d.color);})
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
        .attr("marker-end", function(d) { return "url(#" + id + "marker" + d.marker + ")"; })
        ; 

    // Transition exiting nodes to the parent's new position.
    this.forcelayoutlink.exit()
//         //.transition()
//         //.duration(duration)
        .remove();
};
d3_graph2d.prototype.set_forceDirectedGraphData1css = function () {
    //set predefined forcelayout style

    var selector1 = '#' + this.id + ' g.node';
    var style1 = {
        'cursor': 'pointer'
    };
    var selector2 = '#' + this.id + ' circle';
    var style2= {
         'fill': '#ccc',
         'stroke': 'none',
//         'stroke': 'steelblue',
//         'stroke-width': '1.5px'
    };
    var selector3 = '#' + this.id + ' text';
    var style3 = {
        'font': '10px Arial'
    };
    var selector4 = '#' + this.id + ' path.link';
    var style4 = {
        'fill': 'none',
        'stroke': '#ccc',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 },
                     { 'selection': selector2, 'style': style2 },
                     { 'selection': selector3, 'style': style3 },
                     { 'selection': selector4, 'style': style4 }];
    this.set_svggcss(selectorstyle);
};
d3_graph2d.prototype.add_forceDirectedGraphData1Marker = function(){
    /*
    add forcedirectedgraph marker

    d.data[ydata] controls the stroke-width
    d.data[ydatalabel] controls the stroke color

    TODO dynamically change the color
    TODO dynamically change the marker style
    */ 

    //var duration= this.duration;
    var zdata = this.data1keymap.zdata;
    var zdatalabel = this.data1keymap.zdatalabel;
    var id = this.id;

    //straight line
    var refX = 15;
    var refY = 0;
//     //curved line
//     var refX = 15;
//     var refY = -1.5;

    var markers = this.data1.get_uniquevaluesFromlistdata(zdata);

    // svg marker definition
    this.forcedirectedgraphmarker = this.svgg.append("defs")
        .selectAll(".markers")
        .data(markers);

    this.forcedirectedgraphmarkerenter = this.forcedirectedgraphmarker.enter()
        .append("marker")
        .attr("id", function(d) { return id + "marker" + d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX",refX)
        .attr("refY", refY)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        //TODO dynamically change the color
        .style("fill", function(d) {return '#ccc';})
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

};