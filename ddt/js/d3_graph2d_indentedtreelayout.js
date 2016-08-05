"use strict";
d3_graph2d.prototype.set_indentedTreeLayoutBarWidthAndHeight = function(barWidth_I,barHeight_I){
    /*
    Set indented treelayout bar width/height
    */
    var barWidth_I = typeof barWidth_I !== 'undefined' ?  barWidth_I : this.width*0.8;
    this.barWidth = barWidth_I;
    var barHeight_I = typeof barHeight_I !== 'undefined' ?  barHeight_I : 20;
    this.barHeight = barHeight_I;
}
d3_graph2d.prototype.togglechildren_indentedtreelayout = function(_this_I){
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
       _this_I.update_indentedtreelayout(d);
    };
};
d3_graph2d.prototype.set_indentedtreelayoutdata1nodes = function(reverse_I=false){
    // compute treelayout nodes
    var root = this.treelayoutroot;
    var barHeight = this.barHeight;

    if (reverse_I){this.treelayoutnodes = this.treelayouttree.nodes(root).reverse();}
    else{this.treelayoutnodes = this.treelayouttree.nodes(root);};
    
    // Compute the "layout".
    this.treelayoutnodes.forEach(function(n, i) {
        n.x = i * barHeight;
    });
};
d3_graph2d.prototype.add_indentedtreelayoutdata1node = function(source_I){
    // add tree layout nodes
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var source = source_I;
    var click = this.togglechildren_indentedtreelayout;
    var _this = this;
    var duration= this.duration;
    var barHeight = this.barHeight;
    var barWidth = this.barWidth;

    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }
    //TODO:
    //1. allow last child to have data
    //2. use tooltiplabel/tooltipdata
    function tooltip(d) {
        return d._children ? "" : d.children ? "" : "#fd8d3c";
    }

    this.treelayoutnode = this.svgg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // update node origin
    this.set_treelayoutdata1nodeorigin(i);

    // Enter any new nodes at the parent's previous position.
    this.treelayoutnodeenter = this.treelayoutnode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click(_this));

    this.treelayoutnodeenter.append("rect")
        .attr("y", -barHeight / 2)
        .attr("height", barHeight)
        .attr("width", barWidth)
        .style("fill", color);
        //       .on("click", click(_this));

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

    this.treelayoutnodeupdate.select("rect")
        .attr("y", -barHeight / 2)
        .attr("height", barHeight)
        .attr("width", barWidth)
        .style("fill", color);

    this.treelayoutnodeupdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.treelayoutnodeexit = this.treelayoutnode.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    this.treelayoutnodeexit.select("rect")
        .attr("y", -barHeight / 2)
        .attr("height", barHeight)
        .attr("width", barWidth)
        .style("fill", color);

    this.treelayoutnodeexit.select("text")
        .style("fill-opacity", 1e-6);
};
d3_graph2d.prototype.set_indentedtreelayoutdata1css = function () {
    //set predefined indentedtreelayout style

    var selector1 = '#' + this.id + ' .node';
    var style1 = {
        'cursor': 'pointer'
    };
    var selector2 = '#' + this.id + ' .node rect';
    var style2= {
        'fill': '#fff',
        'fill-opacity': '.5',
        'stroke': '#3182bd',
        'stroke-width': '1.5px'
    };
    var selector3 = '#' + this.id + ' .node text';
    var style3 = {
        'font': '10px Arial'
    };
    var selector4 = '#' + this.id + ' .link';
    var style4 = {
        'fill': 'none',
        'stroke': '#9ecae1',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 },
                     { 'selection': selector2, 'style': style2 },
                     { 'selection': selector3, 'style': style3 },
                     { 'selection': selector4, 'style': style4 }];
    this.set_svggcss(selectorstyle);
};
d3_graph2d.prototype.update_indentedtreelayout = function (source_I) {
    // update tree layout
    if (source_I){
        var source = source_I;
    } else {
        var source = this.data1.nestdatafiltered[0];
    };

    this.set_indentedtreelayoutdata1nodes(false); //new
    // true will generate an indented tree that build up
    this.set_treelayoutdata1links(); 
    this.add_indentedtreelayoutdata1node(source); //new
    this.add_treelayoutdata1link(source);
    this.save_treelayoutdata1positions();
    this.set_indentedtreelayoutdata1css();
};