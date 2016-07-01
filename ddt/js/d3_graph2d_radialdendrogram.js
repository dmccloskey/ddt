"use strict";
d3_graph2d.prototype.set_radialdendrogramdata1root = function(radialdendrogramroot_I){
    //set radialdendrogram root

    //add as input?
    var innerRadius = this.radius-this.radius/4.0;

    if (radialdendrogramroot_I){var root = radialdendrogramroot_I;}
    else {
        var root = d3.stratify()
            .id(function(d) { return d.name; })
            .parentId(function(d) { return d.parent; })
            (this.data1.listdatafiltered);
        };  
    // Compute the maximum cumulative length of any node in the tree.
    function maxLength(d) {
        return d.length + (d.children ? d3.max(d.children, maxLength) : 0);
    }

    // Set the radius of each node by recursively summing and scaling the distance from the root.
    function setRadius(d, y0, k) {
        d.radius = (y0 += d.length) * k;
        if (d.children) d.children.forEach(function(d) { setRadius(d, y0, k); });
    }

//     // Set the color of each node by recursively inheriting.
//     function setColor(d) {
//         d.color = color.domain().indexOf(d.name) >= 0 ? color(d.name) : d.parent ? d.parent.color : null;
//         if (d.children) d.children.forEach(setColor);
//     }

    setRadius(root, root.length = 0, innerRadius / maxLength(root));
    //setColor(root);

    this.radialdendrogramroot = root;
};
d3_graph2d.prototype.set_radialdendrogramdata1nodes = function(){
    // compute radialdendrogram nodes
    var root = this.radialdendrogramroot;
    this.radialdendrogramnodes = this.cluster.nodes(root);
};
d3_graph2d.prototype.set_radialdendrogramdata1links = function(){
    // compute radialdendrogram links
    var nodes = this.radialdendrogramnodes
    this.radialdendrogramlinks = this.this.cluster.links(nodes);
};
d3_graph2d.prototype.add_radialdendrogramdata1node = function(){
    // add tree layout nodes
    var nodes = this.radialdendrogramnodes;
    var _this = this;
    var duration= this.duration;
    var innerRadius = this.radius-this.radius/4.0;

    function mouseovered(active) {
        return function(d) {
            d3.select(this).classed("label--active", active);
            d3.select(d.linkExtensionNode).classed("link-extension--active", active).each(moveToFront);
            do d3.select(d.linkNode).classed("link--active", active).each(moveToFront); while (d = d.parent);
        };
    }

    function moveToFront() {
        this.parentNode.appendChild(this);
    }

    // node group
    this.radialdendrogramnodegroup = this.svgg.selectAll("g.labels")
        .data([nodes]);

    this.radialdendrogramnodegroup.exit().remove();
    this.radialdendrogramnodeentergroup = this.radialdendrogramnodegroup.enter();
    this.radialdendrogramnodeentergroup.append("g")
        .attr("class", "labels")
        ;

    //nodes
    this.radialdendrogramnode = this.radialdendrogramnodegroup.selectAll("text")
        //.data(nodes);
        .data(nodes.filter(function(n) {return !n.children;}));

    // Enter any new nodes at the parent's previous position.
    this.radialdendrogramnodeenter = this.radialdendrogramnode.enter();

    this.radialdendrogramnodeenter.append("text")
        .attr("dy", ".31em")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (innerRadius + 4) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
        .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .text(function(d) { return d.name; })
        .on("mouseover", mouseovered(true))
        .on("mouseout", mouseovered(false));

    // Transition nodes to their new position.
    this.radialdendrogramnodeupdate = this.radialdendrogramnode.transition()
        //.duration(duration)
        .attr("dy", ".31em")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (innerRadius + 4) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
        .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .text(function(d) { return d.name; });

    // Transition exiting nodes to the parent's new position.
    this.radialdendrogramnodeexit = this.radialdendrogramnode.exit().transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.add_radialdendrogramdata1link = function(){
    // add tree layout links
    var links = this.radialdendrogramlinks;
    var duration= this.duration;
    var innerRadius = this.radius-this.radius/4.0;
    var step = this.set_radiallayoutstep;

    //link groups
    this.radialdendrogramlinkgroup = this.svgg.selectAll("g.links")
        .data([links]);

    this.radialdendrogramlinkgroup.exit().remove();
    this.radialdendrogramlinkgroupenter = this.radialdendrogramlinkgroup.enter();
    this.radialdendrogramlinkgroupenter.append("g")
        .attr("class", "links");

    // Update the links…
    this.radialdendrogramlink = this.radialdendrogramlinkgroup.selectAll("path")
        .data(links.filter(function(d) { return !d.target.children; }));

    // Enter any new links at the parent's previous position.
    this.radialdendrogramlinkenter = this.radialdendrogramlink.enter();

    this.radialdendrogramlinkenter.append("path")
        .each(function(d) { d.target.linkNode = this; })
        .attr("d", function(d) { return step(d.source.x, d.source.y, d.target.x, d.target.y) })
        .style("stroke", function(d) { return d.target.color; });

    // Transition links to their new position.
    this.radialdendrogramlink.select("path").transition()
        //.duration(duration)
        .attr("d", function(d) { return step(d.source.x, d.source.y, d.target.x, d.target.y) })
        .style("stroke", function(d) { return d.target.color; });

    // Transition exiting nodes to the parent's new position.
    this.radialdendrogramlink.exit().transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.add_radialdendrogramdata1linkextension = function(){
    // add tree layout links
    var links = this.radialdendrogramlinks;
    var duration= this.duration;
    var innerRadius = this.radius-this.radius/4.0;
    var step = this.set_radiallayoutstep;

    //link groups
    this.radialdendrogramlinkgroup = this.svgg.selectAll("g.link-extensions")
        .data([links]);

    this.radialdendrogramlinkextensiongroup.exit().remove();
    this.radialdendrogramlinkextensiongroupenter = this.radialdendrogramlinkextensiongroup.enter();
    this.radialdendrogramlinkextensiongroupenter.append("g")
        .attr("class", "link-extensions");

    // Update the links…
    this.radialdendrogramlinkextension = this.radialdendrogramlinkextensiongroup.selectAll("path")
        .data(links.filter(function(d) { return !d.target.children; }));

    // Enter any new links at the parent's previous position.
    this.radialdendrogramlinkextensionenter = this.radialdendrogramlinkextension.enter();

    this.radialdendrogramlinkextensionenter.append("path")
      .each(function(d) { d.target.linkExtensionNode = this; })
      .attr("d", function(d) { return step(d.target.x, d.target.y, d.target.x, innerRadius); });

    // Transition links to their new position.
    this.radialdendrogramlinkextension.select("path").transition()
        //.duration(duration)
      .attr("d", function(d) { return step(d.target.x, d.target.y, d.target.x, innerRadius); });

    // Transition exiting nodes to the parent's new position.
    this.radialdendrogramlinkextension.exit().transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.set_radialdendrogramdata1linkcss = function () {
    // predefined css style links and link extensions
    var lineselector1 = '.links';
    var style1 = {
        'stroke': '#000',
        'fill': 'none',
        //'pointer-events': 'none',
    };
    var lineselector2 = '.link-extensions';
    var style2 = {
        'stroke': '#000',
        'stroke-opacity': '.25',
        'fill': 'none',
        //'pointer-events': 'none',
    };
    var lineselector3 = '.link--active';
    var style3 = {
        'stroke': '#000 !important',
        'stroke-width': '1.5px',
    };
    var lineselector4 = '.link-extension--active';
    var style4 = {
        'stroke-opacity': '.6',
    };
    var selectorstyle = [
    { 'selection': lineselector1, 'style': style1 },
    { 'selection': lineselector2, 'style': style2 },
    { 'selection': lineselector3, 'style': style3 },
    { 'selection': lineselector4, 'style': style4 },
    ]
    this.set_svggcss(selectorstyle);
};
d3_graph2d.prototype.set_radialdendrogramdata1labelcss = function () {
    // predefined css style links and link extensions
    var lineselector1 = '.labels';
    var style1 = {
        'font': '10px Arial',
    };
    var lineselector2 = '.label--active';
    var style2 = {
        'font-weight': 'bold',
    };
    var selectorstyle = [
    { 'selection': lineselector1, 'style': style1 },
    { 'selection': lineselector2, 'style': style2 },
    ]
    this.set_svggcss(selectorstyle);
};