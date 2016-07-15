"use strict";
// Collapsible tree
// http://bl.ocks.org/mbostock/1062288
// Force directed graph
// http://bl.ocks.org/mbostock/4062045
// pan/zoom/multi-drag http://bl.ocks.org/pkerpedjiev/0389e39fad95e1cf29ce

//NOT USED
d3_graph2d.prototype.set_forcelayout_dblclick = function(d){
    /*
    */
    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    };
};
d3_graph2d.prototype.set_forcelayout_dragstart = function(d){
    /*
    */
    
};
d3_graph2d.prototype.set_forcelayout_tick = function(d){
    /*
    */
    
};

d3_graph2d.prototype.set_forcelayoutdata1root = function(forcelayoutroot_I){
    //set tree layout root
    if (forcelayoutroot_I){this.forcelayoutroot = forcelayoutroot_I;}
    else {this.forcelayoutroot=this.data1.nestdatafiltered[0]};  
        //this.treelayoutroot={'name':"",'children':this.data1.nestdatafiltered};
};
d3_graph2d.prototype.set_forcelayoutdata1force = function(charge_I,linkDistance_I){
    /*
    */
    if (typeof(charge_I)!=="undefined"){var charge = charge_I;}
    else {var charge = -400};  
    if (typeof(linkDistance_I)!=="undefined"){var linkDistance = linkDistance_I;}
    else {var linkDistance = 40};  

    var width = this.width;
    var height = this.height;

//     function tick(){
//         link.attr("x1", function(d) { return d.source.x; })
//             .attr("y1", function(d) { return d.source.y; })
//             .attr("x2", function(d) { return d.target.x; })
//             .attr("y2", function(d) { return d.target.y; });

//         node.attr("cx", function(d) { return d.x; })
//             .attr("cy", function(d) { return d.y; });
//     }

    this.forcelayoutdata1force = d3.layout.force()
        .size([width,height])
        .charge(charge)
        .linkDistance(linkDistance);
        //.on("tick",tick)
};
d3_graph2d.prototype.add_forcelayoutdata1tick = function(){
    /*
    add tick to forcelayout force
    */
    var this_ = this;

    function tick(){
        this_.forcelayoutlink.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        this_.forcelayoutnode
//             .attr("cx", function(d) { return d.x; })
//             .attr("cy", function(d) { return d.y; })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    this.forcelayoutdata1force
        .on("tick",tick)
};
d3_graph2d.prototype.add_forcelayoutdata1drag = function(){
    /*
    add drag to forcelayout force
    */
    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }
    
    this.forcelayoutdrag = this.forcelayoutdata1force.drag()
        .on("dragstart",dragstart)
};
d3_graph2d.prototype.set_forcelayoutdata1zoom = function(scaleExtent_I){
    /*
    set forcelayout zoom
    http://bl.ocks.org/pkerpedjiev/0389e39fad95e1cf29ce
    */
    if (typeof(scaleExtent_I)!=="undefined"){var scaleExtent = scaleExtent_I;}
    else {var scaleExtent = [0.1,10]};  

    var this_ = this;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    function update (){
        this_.update_forcelayout()
    };
    function zoomstart() {
        node.each(function(d) {
            d.selected = false;
            d.previouslySelected = false;
        });
        node.classed("selected", false);
    };

    this.forcelayoutzoom = d3.behavior.zoom()
        .scaleExtent(scaleExtent)
        .x(x1scale)
        .y(y1scale)
        .on("zoomstart", zoomstart)
        .on("zoom", update);
};
d3_graph2d.prototype.set_forcelayoutdata1brush = function(scaleExtent_I){
    /*
    set forcelayout brush
    */
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    this.forcelayoutbrush = d3.svg.brush()
        .x(x1scale)
        .y(y1scale)
    .on("brushstart", function(d) {
        node.each(function(d) { 
            d.previouslySelected = shiftKey && d.selected; });
    })
    .on("brush", function() {
        var extent = d3.event.target.extent();

        node.classed("selected", function(d) {
            return d.selected = d.previouslySelected ^
            (extent[0][0] <= d.x && d.x < extent[1][0]
            && extent[0][1] <= d.y && d.y < extent[1][1]);
        });
    })
    .on("brushend", function() {
        d3.event.target.clear();
        d3.select(this).call(d3.event.target);
    });

//     var svg_graph = svg.append('svg:g')
//     .call(zoomer)
//     //.call(brusher)

//     var brush = svg_graph.append("g")
//     .datum(function() { return {selected: false, previouslySelected: false}; })
//     .attr("class", "brush");

//     brush.call(brusher)
//     .on("mousedown.brush", null)
//     .on("touchstart.brush", null) 
//     .on("touchmove.brush", null)
//     .on("touchend.brush", null); 

    brush.select('.background').style('cursor', 'auto');
};
d3_graph2d.prototype.collapse_forcelayoutroot = function(){
    // initialize with a collapse root
    // collapse function
    function collapse(d){
        if (d.children){
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        };
    };
    this.forcelayoutroot.children.forEach(collapse);
};

// update
d3_graph2d.prototype.set_forcelayoutdata1nodes = function(){
    // compute forcelayout nodes
    var root = this.forcelayoutroot
    
    //this.forcelayoutdata1nodes = this.forcelayoutdata1force.nodes(root);
    var nodes = [];
    var i = 0;

    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    this.forcelayoutdata1nodes = nodes;

};
d3_graph2d.prototype.set_forcelayoutdata1links_tree = function(){
    // compute forcelayout links
    var nodes = this.forcelayoutdata1nodes;
    //this.forcelayoutdata1links = this.forcelayoutdata1force.links(nodes);
    this.forcelayoutdata1links = d3.layout.tree().links(nodes);
};
d3_graph2d.prototype.set_forceDirectedGraphData1NodesAndLinks = function(){
    // compute forcelayout nodes and links
    
    var graph = this.set_nodesAndLinks();

    this.forcelayoutdata1nodes = graph.nodes;
    this.forcelayoutdata1links = graph.links;
};
d3_graph2d.prototype.set_forcelayoutnode = function(){
    /*
    set forcelayoutnode
    */
    this.forcelayoutnode = this.svgg.selectAll(".node");
};
d3_graph2d.prototype.set_forcelayoutlink = function(){
    /*
    set forcelayoutlink
    */
    this.forcelayoutlink = this.svgg.selectAll(".link");
};
d3_graph2d.prototype.add_forcelayoutdata1node = function(){
    // add tree layout nodes
    var nodes = this.forcelayoutdata1nodes;
    var click = this.togglechildren_forcelayout;
    var _this = this;
    //var duration= this.duration;
    var force = this.forcelayoutdata1force;

    function color(d) {
        return d._children ? "#3182bd" // collapsed package
        : d.children ? "#c6dbef" // expanded package
        : "#fd8d3c"; // leaf node
    }

    this.forcelayoutnode = this.svgg.selectAll(".node")
    //this.forcelayoutnode
        .data(nodes, function(d) { return d.id;});

    // Enter any new nodes at the parent's previous position.
    this.forcelayoutnodeenter = this.forcelayoutnode.enter()
        .append("g")
        .attr("class", "node")
        .on("click", click(_this))
        .call(force.drag);

    this.forcelayoutnodeenter.append("circle")
        //.attr("class", "node")
//         .attr("cx", function(d) {return d.x; })
//         .attr("cy", function(d) {return d.y;  })
        .attr("r", function(d) {
            return 10;
            //return Math.sqrt(d.size) / 10 || 4.5; 
            })
        //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        //TODO change color based on value
        //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
        .style("fill", color);
//         .on("click", click)
//         .call(force.drag);

    this.forcelayoutnodeenter.append("text")
        //.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1);

    // Transition nodes to their new position.
    this.forcelayoutnodeupdate = this.forcelayoutnode.transition()
        //.duration(duration)
        //.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        ;

    this.forcelayoutnodeupdate.select("g.circle")
//         .attr("cx", function(d) { return d.x; })
//         .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) {
            return 10;
            //return Math.sqrt(d.size) / 10 || 4.5; 
            })
        //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
        .style("fill", color);

    this.forcelayoutnodeupdate.select("g.text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.forcelayoutnodeexit = this.forcelayoutnode.exit()
        //.transition()
        //.duration(duration)
        //.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

//     this.forcelayoutnodeexit.select("node.circle")
// //         .attr("cx", function(d) { return d.x; })
// //         .attr("cy", function(d) { return d.y; })
//         .attr("r", function(d) {
//             //return 10;
//             return Math.sqrt(d.size) / 10 || 4.5; 
//             });

//     this.forcelayoutnodeexit.select("node.text")
//         .style("fill-opacity", 1e-6);
};
d3_graph2d.prototype.add_forcelayoutdata1link = function(){
    // add tree layout links
//     var i = this.forcelayoutnodeorigin;
//     var source = source_I;
//     var nodes = this.forcelayoutdata1nodes;
    var links = this.forcelayoutdata1links;
    //var duration= this.duration;

    // Update the links…
    this.forcelayoutlink = this.svgg.selectAll(".link")
    //this.forcelayoutlink
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    this.forcelayoutlink.enter().insert("line", ".node")
        .attr("class", "link");
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; }); 

    // Transition links to their new position.
    this.forcelayoutlink.transition()
        //.duration(duration)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        ; 

    // Transition exiting nodes to the parent's new position.
    this.forcelayoutlink.exit()
//         //.transition()
//         //.duration(duration)
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; })
        .remove();
};
d3_graph2d.prototype.togglechildren_forcelayout = function(_this_I){
    // toggle children on click

    return function(d){
        if (!d3.event.defaultPrevented) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            };
           _this_I.update_forcelayout();
        };
    };
};
d3_graph2d.prototype.set_forcelayoutdata1css = function () {
    //set predefined forcelayout style

    var selector1 = '#' + this.id + ' .node';
    var style1 = {
        'cursor': 'pointer'
    };
    var selector2 = '#' + this.id + ' .node circle';
    var style2= {
//         'fill': '#fff',
        'stroke': 'steelblue',
        'stroke-width': '1.5px'
    };
    var selector3 = '#' + this.id + ' .node text';
    var style3 = {
        'font': '10px Arial'
    };
    var selector4 = '#' + this.id + ' .link';
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

d3_graph2d.prototype.update_forcelayout = function () {
    // update force layout
//     if (source_I){
//         var source = source_I;
//     } else {
//         var source = this.data1.nestdatafiltered[0];
//     };

    this.set_forcelayoutdata1nodes();
    this.set_forcelayoutdata1links_tree();
    //this.set_forcelayoutdata1links_directedgraph();

    //re-start the force layout
    var nodes = this.forcelayoutdata1nodes;
    var links = this.forcelayoutdata1links;
    this.forcelayoutdata1force
        .nodes(nodes)
        .links(links)
        .start();

//     this.add_forcelayoutdata1node(source);
//     this.add_forcelayoutdata1link(source);
    this.add_forcelayoutdata1node();
    this.add_forcelayoutdata1link();
    this.add_forcelayoutdata1tick();
    this.set_forcelayoutdata1css();
};
d3_graph2d.prototype.update_forceDirectedGraph = function () {
    // update force directed graph

    this.set_forceDirectedGraphData1NodesAndLinks();

    //re-start the force layout
    var nodes = this.forcelayoutdata1nodes;
    var links = this.forcelayoutdata1links;
    this.forcelayoutdata1force
        .nodes(nodes)
        .links(links)
        .start();

    this.add_forcelayoutdata1node();
    this.add_forcelayoutdata1link();
    this.add_forcelayoutdata1tick();
    this.set_forcelayoutdata1css();
};