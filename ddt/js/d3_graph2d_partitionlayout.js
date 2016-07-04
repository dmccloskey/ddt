"use strict";
//TODO:
// implementation of v4 stratify is incompatible with v3 partitionlayoutroot

d3_graph2d.prototype.set_partitionlayoutdata1root = function(partitionlayoutroot_I){
    //set partition layout root
    var value = this.data1keymap.xdata;

    if (partitionlayoutroot_I){this.partitionlayoutroot = partitionlayoutroot_I;}
    else {
        //this.partitionlayoutroot=this.data1.nestdatafiltered[0];
        var root = stratify()
            .id(function(d) { return d.name; })
            .parentId(function(d) { return d.parent; })
            (this.data1.listdatafiltered);
        };  

    this.partitionlayoutroot=root
//       .sum(function(d) { return d[value]; })
//       .sort(function(a, b) { return b.height - a.height || b[value] - a[value]; })
      ;
};
d3_graph2d.prototype.set_partitionlayoutdata1nodes = function(){
    // compute partitionlayout nodes
    var root = this.partitionlayoutroot;
    this.partitionlayoutnodes = this.partitionlayoutpartition.nodes(root);
};
d3_graph2d.prototype.add_partitionlayoutdata1node = function(){
    // add partition layout nodes
    var nodes = this.partitionlayoutnodes;
    var _this = this;
    var duration= this.duration;
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var value = this.data1keymap.xdata;
    var root = this.partitionlayoutroot;

    var format = d3.format(",d");

    this.partitionlayoutnode = this.svgg.selectAll("g.node")
        //.data(root.descendants());
        .data(nodes);

    // Enter any new nodes at the parent's previous position.
    this.partitionlayoutnodeenter = this.partitionlayoutnode.enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.y0 + "," + d.x0 + ")"; });

    this.partitionlayoutnodeenter.append("rect")
        .attr("id", function(d) { return "rect-" + d.id; })
        .attr("width", function(d) { return d.y1 - d.y0; })
        .attr("height", function(d) { return d.x1 - d.x0; })
        .filter(function(d) { return !d.children; })
        .style("fill", function(d) { while (d.depth > 1) d = d.parent; return colorscale(d.id); });

    this.partitionlayoutnodeenter.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#rect-" + d.id + ""; });

    this.partitionlayoutnodeenter.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .attr("x", 4)
    .selectAll("tspan")
      .data(function(d) { return [d.id, " " + format(d[value])]; })
    .enter().append("tspan")
      .attr("y", 13)
      .text(function(d) { return d; });

    this.partitionlayoutnodeenter.append("title")
      .text(function(d) { return d.id + "\n" + format(d[value]); });

//     // Transition nodes to their new position.
//     this.partitionlayoutnodeupdate = this.partitionlayoutnode.transition()
//         .duration(duration);

//     this.partitionlayoutnodeupdate.select("rect")    
// //         .call(position)
// //         .style("background-color", function(d) { return d.children ? colorscale(d.name) : null; })
//         .attr("width", function(d) { return d.dx; })
//         .attr("height", function(d) { return d.dy; })
//         .attr("x", function(d) { return d.x; })
//         .attr("y", function(d) { return d.y; })
//         .attr("fill", function(d) { return d.children ? colorscale(d[series_label]) : null; });

    
//     this.partitionlayoutnodeupdate.select("text")  
//         .attr("x", function(d) { return d.x; })
//         .attr("y", function(d) { return d.y; })
//         .attr("dy", ".35em")
//         .text(function(d) { return d.children ? null : d.name; });

    // Transition exiting nodes to the parent's new position.
    this.partitionlayoutnodeexit = this.partitionlayoutnode.exit().transition()
        .duration(duration)
        .remove();
};
d3_graph2d.prototype.set_partitionlayoutdata1css = function () {
    //set predefined partitionlayout style

    var selector1 = '#' + this.id + ' .node';
    var style1 = {
        //'cursor': 'pointer',
        'border': 'solid 1px white',
        'font': '10px Arial',
        'line-height': '12px',
        'overflow': 'hidden',
        'position': 'absolute',
        'text-indent': '2px',
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 },
                     ];
    this.set_svggcss(selectorstyle);
};