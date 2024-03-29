"use strict";
d3_graph2d.prototype.set_treelayoutdata1root = function(treelayoutroot_I,x0_I=this.height/2,y0_I=0){
    //set tree layout root
    if (treelayoutroot_I){this.treelayoutroot = treelayoutroot_I;}
    else {
        //this.treelayoutroot={'name':"",'children':this.data1.nestdatafiltered};
        this.treelayoutroot=this.data1.nestdatafiltered[0];
        };  
//     this.treelayoutroot.x0 = this.height/2;
//     this.treelayoutroot.y0 = 0;  
    this.treelayoutroot.x0 = x0_I;
    this.treelayoutroot.y0 = y0_I;
};
d3_graph2d.prototype.set_treelayoutdata1nodeorigin = function(nodeorigin_I){
    //set tree layout nodes
    this.treelayoutnodeorigin = nodeorigin_I;
};
d3_graph2d.prototype.collapse_treelayoutroot = function(){
    // initialize with a collapse root
    // collapse function
    function collapse(d){
        if (d.children){
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        };
    };
    this.treelayoutroot.children.forEach(collapse);
};
// update
d3_graph2d.prototype.set_treelayoutdata1nodes = function(node_span_I = this.height){
    // compute treelayout nodes
    var root = this.treelayoutroot;
    this.treelayoutnodes = this.treelayouttree.nodes(root).reverse();

    //normalize for fixed depth
    var node_scale = node_span_I/(this.data1.nestkey.length+1);
    this.treelayoutnodes.forEach(function(d) {
        d.y = d.depth * node_scale; }
        );
};
d3_graph2d.prototype.set_treelayoutdata1links = function(){
    // compute treelayout links
    var nodes = this.treelayoutnodes
    this.treelayoutlinks = this.treelayouttree.links(nodes);
};
d3_graph2d.prototype.add_treelayoutdata1node = function(source_I){
    // add tree layout nodes
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var source = source_I;
    var click = this.togglechildren_treelayout;
    var _this = this;
    var duration= this.duration;

    this.treelayoutnode = this.svgg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // update node origin
    this.set_treelayoutdata1nodeorigin(i);

    // Enter any new nodes at the parent's previous position.
    this.treelayoutnodeenter = this.treelayoutnode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click(_this));

    this.treelayoutnodeenter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    this.treelayoutnodeenter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    this.treelayoutnodeupdate = this.treelayoutnode.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    this.treelayoutnodeupdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    this.treelayoutnodeupdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.treelayoutnodeexit = this.treelayoutnode.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    this.treelayoutnodeexit.select("circle")
        .attr("r", 1e-6);

    this.treelayoutnodeexit.select("text")
        .style("fill-opacity", 1e-6);
};
d3_graph2d.prototype.add_treelayoutdata1link = function(source_I){
    // add tree layout links
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var links = this.treelayoutlinks;
    var source = source_I;
    var duration= this.duration;
    var diagonal = this.treelayoutdiagonal;

    // Update the links…
    this.treelayoutlink = this.svgg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    this.treelayoutlink.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
    }); 

    // Transition links to their new position.
    this.treelayoutlink.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    this.treelayoutlink.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
        })
        .remove();
};
d3_graph2d.prototype.save_treelayoutdata1positions = function(){
    // Stash the old positions for transition.
    this.treelayoutnodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
        });
};
d3_graph2d.prototype.togglechildren_treelayout = function(_this_I){
    // toggle children on click
    return function(d){
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        };
       //_this_I.render(d);
       _this_I.update_treelayout(d);
    };
};
d3_graph2d.prototype.set_treelayoutdata1css = function () {
    //set predefined treelayout style

    var selector1 = '#' + this.id + ' .node';
    var style1 = {
        'cursor': 'pointer'
    };
    var selector2 = '#' + this.id + ' .node circle';
    var style2= {
        'fill': '#fff',
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
d3_graph2d.prototype.update_treelayout = function (source_I) {
    // update tree layout
    if (source_I){
        var source = source_I;
    } else {
        var source = this.data1.nestdatafiltered[0];
    };

    this.set_treelayoutdata1nodes();
    this.set_treelayoutdata1links();
    this.add_treelayoutdata1node(source)
    this.add_treelayoutdata1link(source)
    this.save_treelayoutdata1positions();
    this.set_treelayoutdata1css();
};