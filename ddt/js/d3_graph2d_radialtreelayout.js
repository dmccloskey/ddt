"use strict";
//e.g., http://bl.ocks.org/mbostock/2e12b0bd732e7fe4000e2d11ecab0268
d3_graph2d.prototype.togglechildren_radialtreelayout = function(_this_I){
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
       _this_I.update_radialtreelayout(d);
    };
};
d3_graph2d.prototype.add_radialtreelayoutdata1node = function(source_I){
    // add tree layout nodes
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var source = source_I;
    var click = this.togglechildren_radialtreelayout;
    var _this = this;
    var duration= this.duration;
    var project = this.radiallayoutprojection;

    this.radialtreelayoutnode = this.svgg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // update node origin
    this.set_treelayoutdata1nodeorigin(i);

    // Enter any new nodes at the parent's previous position.
    this.radialtreelayoutnodeenter = this.radialtreelayoutnode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + project(source.x0, source.y0) + ")";
            //return "translate(" + source.y0 + "," + source.x0 + ")";
             })
        .on("click", click(_this));

    this.radialtreelayoutnodeenter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    this.radialtreelayoutnodeenter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    this.radialtreelayoutnodeupdate = this.radialtreelayoutnode.transition()
        .duration(duration)
        .attr("transform", function(d) {return "translate(" + project(d.x, d.y) + ")";});

    this.radialtreelayoutnodeupdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    this.radialtreelayoutnodeupdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.radialtreelayoutnodeexit = this.radialtreelayoutnode.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })
        .remove();

    this.radialtreelayoutnodeexit.select("circle")
        .attr("r", 1e-6);

    this.radialtreelayoutnodeexit.select("text")
        .style("fill-opacity", 1e-6);
};
d3_graph2d.prototype.add_radialtreelayoutdata1link = function(source_I){
    // add tree layout links
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var links = this.treelayoutlinks;
    var source = source_I;
    var duration= this.duration;
    var project = this.radiallayoutprojection;

    // Update the links…
    this.radialtreelayoutlink = this.svgg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    this.radialtreelayoutlink.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + project(d.source.x0, d.source.y0)
            + "C" + project(d.source.x0, (d.source.y0 + d.target.parent.y0) / 2)
            + " " + project(d.target.parent.x0, (d.source.y0 + d.target.parent.y0) / 2)
            + " " + project(d.target.parent.x0, d.target.parent.y0);
    }); 

    // Transition links to their new position.
    this.radialtreelayoutlink.transition()
        .duration(duration)
        .attr("d", function(d) {
            return "M" + project(d.source.x, d.source.y)
            + "C" + project(d.source.x, (d.source.y + d.target.y) / 2)
            + " " + project(d.target.x, (d.source.y + d.target.y) / 2)
            + " " + project(d.target.x, d.target.y);
        });
//         .attr("d", function(d) {
//             return "M" + project(source.x, source.y)
//             + "C" + project(source.x, (source.y + d.parent.y) / 2)
//             + " " + project(d.parent.x, (source.y + d.parent.y) / 2)
//             + " " + project(d.parent.x, d.parent.y);
//         });

    // Transition exiting nodes to the parent's new position.
    this.radialtreelayoutlink.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            return "M" + project(d.source.x, d.source.y)
            + "C" + project(d.source.x, (d.source.y + d.target.y) / 2)
            + " " + project(d.target.x, (d.source.y + d.target.y) / 2)
            + " " + project(d.target.x, d.target.y);
        })
//         .attr("d", function(d) {
//             return "M" + project(source.x, source.y)
//             + "C" + project(source.x0, (source.y + d.parent.y) / 2)
//             + " " + project(d.parent.x, (source.y + d.parent.y) / 2)
//             + " " + project(d.parent.x, d.parent.y);
//         })
        .remove();
};
d3_graph2d.prototype.update_radialtreelayout = function (source_I) {
    // update tree layout
    if (source_I){
        var source = source_I;
    } else {
        var source = this.data1.nestdatafiltered[0];
    };

    this.set_treelayoutdata1nodes(this.radius);
    this.set_treelayoutdata1links();
    this.add_radialtreelayoutdata1node(source)
    this.add_radialtreelayoutdata1link(source)
    this.save_treelayoutdata1positions();
    this.set_treelayoutdata1css();
};