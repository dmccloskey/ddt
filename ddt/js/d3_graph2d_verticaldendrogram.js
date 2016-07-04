"use strict";
d3_graph2d.prototype.set_verticaldendrogramdata1root = function(verticaldendrogramroot_I){
    //set verticaldendrogram root
    // TODO: there is either a problem with scaling the lengths for calculating the steps
    //
    var xdata = this.data1keymap.xdata;

    if (verticaldendrogramroot_I){var root = verticaldendrogramroot_I;}
    else {
        var root = stratify()
            .id(function(d) { return d.name; })
            .parentId(function(d) { return d.parent; })
            (this.data1.listdatafiltered);
        };  

    // Compute the maximum cumulative length of any node in the tree.
    function maxLength(d) {
        //return d.length + (d.children ? d3.max(d.children, maxLength) : 0);
        return d.data[xdata] + (d.children ? d3.max(d.children, maxLength) : 0);
    }

    // Set the distance of each node by recursively summing and scaling the distance from the root.
    function setDistance(d, y0, k) {
        d.y = (y0 += d.data[xdata]) * k;
        if (d.children) d.children.forEach(function(d) { setDistance(d, y0, k); });
    }

    // Set the color of each node by recursively inheriting.
    function setColor(d) {
        d.color = color.domain().indexOf(d.name) >= 0 ? color(d.name) : d.parent ? d.parent.color : null;
        if (d.children) d.children.forEach(setColor);
    }

    setDistance(root, root.length = 0, maxLength(root));
    //setColor(root);

    this.verticaldendrogramroot = root;
};
d3_graph2d.prototype.set_verticaldendrogramdata1nodes = function(){
    // compute verticaldendrogram nodes
    var root = this.verticaldendrogramroot;
    this.verticaldendrogramnodes = this.cluster.nodes(root);
};
d3_graph2d.prototype.set_verticaldendrogramdata1links = function(){
    // compute verticaldendrogram links
    var nodes = this.verticaldendrogramnodes
    this.verticaldendrogramlinks = this.cluster.links(nodes);
};
d3_graph2d.prototype.add_verticaldendrogramdata1node = function(){
    // add tree layout nodes
    var nodes = this.verticaldendrogramnodes;
    var _this = this;
    var duration= this.duration;

    function mouseovered(active) {
        return function(d) {
            if (active){
                d3.select(this)
                    .style({
                            'font': '10px Arial',
                            'font-weight': 'bold',
                        });
                d3.select(d.linkExtensionNode)
                    .style({
                        'stroke': '#000',
                        'stroke-opacity': '.6',
                        'fill': 'none',})
                    .each(moveToFront);
                do d3.select(d.linkNode)
                    .style({
                        'stroke': '#000 !important',
                        'stroke-width': '3px',
                    })
                    .each(moveToFront);
                    while (d = d.parent);
            } else {
                d3.select(this)
                    .style({
                            'font': '10px Arial',
                            'font-weight': 'normal',
                        });
                d3.select(d.linkExtensionNode)
                    .style({
                        'stroke': '#000',
                        'stroke-opacity': '.25',
                        'fill': 'none',
                        //'pointer-events': 'none',

                    })
                    .style("stroke", function(d) { return d.target.data.color; })
                    .each(moveToFront);
                do d3.select(d.linkNode)
                    .style({
                        'stroke': '#000',
                        'stroke-opacity':'1',
                        'fill': 'none',
                        'stroke-width': '1px',
                        //'pointer-events': 'none',
                    })
                    .style("stroke", function(d) { return d.target.data.color; })
                    .each(moveToFront);
                    while (d = d.parent);
            };
        };
    }

    function moveToFront() {
        this.parentNode.appendChild(this);
    }

    // node group
    this.verticaldendrogramnodegroup = this.svgg.selectAll("g.labels")
        .data([nodes]);

    this.verticaldendrogramnodegroup.exit().remove();
    this.verticaldendrogramnodeentergroup = this.verticaldendrogramnodegroup.enter();
    this.verticaldendrogramnodeentergroup.append("g")
        .attr("class", "labels")
        ;

    //nodes
    this.verticaldendrogramnode = this.verticaldendrogramnodegroup.selectAll("text")
        //.data(nodes);
        .data(nodes.filter(function(n) {
            return !n.children;
            }));

    // Enter any new nodes at the parent's previous position.
    this.verticaldendrogramnodeenter = this.verticaldendrogramnode.enter();

    this.verticaldendrogramnodeenter.append("text")
        .attr("dy", ".31em")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"+"rotate(90)"; })
        //.text(function(d) { return d.name; })
        .text(function(d) { return d.id; })
        .on("mouseover", mouseovered(true))
        .on("mouseout", mouseovered(false));

    // Transition nodes to their new position.
    this.verticaldendrogramnodeupdate = this.verticaldendrogramnode.transition()
        //.duration(duration)
        .attr("dy", ".31em")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"+"rotate(90)"; })
        .text(function(d) { return d.id; });

    // Transition exiting nodes to the parent's new position.
    this.verticaldendrogramnodeexit = this.verticaldendrogramnode.exit().transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.add_verticaldendrogramdata1link = function(){
    // add tree layout links
    var links = this.verticaldendrogramlinks;
    var duration= this.duration;
    var step = this.verticallayoutstep;

    //link groups
    this.verticaldendrogramlinkgroup = this.svgg.selectAll("g.links")
        .data([links]);

    this.verticaldendrogramlinkgroup.exit().remove();
    this.verticaldendrogramlinkgroupenter = this.verticaldendrogramlinkgroup.enter();
    this.verticaldendrogramlinkgroupenter.append("g")
        .attr("class", "links");

    // Update the links…
    this.verticaldendrogramlink = this.verticaldendrogramlinkgroup.selectAll("path")
        .data(links);
//         .data(links.filter(function(d) {
//             return !d.target.children;
//             }));

    // Enter any new links at the parent's previous position.
    this.verticaldendrogramlinkenter = this.verticaldendrogramlink.enter();

    this.verticaldendrogramlinkenter.append("path")
        .each(function(d) { d.target.linkNode = this; })
        .attr("d", function(d) { return step(d.source.x, d.source.y, d.target.x, d.target.y) })
        .style("stroke", function(d) {
            //return d.target.color;
            return d.target.data.color;
            });

    // Transition links to their new position.
    this.verticaldendrogramlink.select("path").transition()
        //.duration(duration)
        .attr("d", function(d) { return step(d.source.x, d.source.y, d.target.x, d.target.y) })
        .style("stroke", function(d) { return d.target.data.color; });

    // Transition exiting nodes to the parent's new position.
    this.verticaldendrogramlink.exit().transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.add_verticaldendrogramdata1linkextension = function(){
    // add tree layout links
    var links = this.verticaldendrogramlinks;
    var duration= this.duration;
    var innerRadius = this.radius-this.radius/4.0;
    var step = this.verticallayoutstep;

    //link groups
    this.verticaldendrogramlinkextensiongroup = this.svgg.selectAll("g.link-extensions")
        .data([links]);

    this.verticaldendrogramlinkextensiongroup.exit().remove();
    this.verticaldendrogramlinkextensiongroupenter = this.verticaldendrogramlinkextensiongroup.enter();
    this.verticaldendrogramlinkextensiongroupenter.append("g")
        .attr("class", "link-extensions");

    // Update the links…
    this.verticaldendrogramlinkextension = this.verticaldendrogramlinkextensiongroup.selectAll("path")
        .data(links.filter(function(d) { return !d.target.children; }));

    // Enter any new links at the parent's previous position.
    this.verticaldendrogramlinkextensionenter = this.verticaldendrogramlinkextension.enter();

    this.verticaldendrogramlinkextensionenter.append("path")
      .each(function(d) { d.target.linkExtensionNode = this; })
      .attr("d", function(d) { return step(d.target.x, d.target.y, d.target.x, innerRadius); })
      .style("stroke", function(d) { return d.target.data.color; });

    // Transition links to their new position.
    this.verticaldendrogramlinkextension.select("path").transition()
        //.duration(duration)
      .attr("d", function(d) { return step(d.target.x, d.target.y, d.target.x, innerRadius); })
      .style("stroke", function(d) { return d.target.data.color; });

    // Transition exiting nodes to the parent's new position.
    this.verticaldendrogramlinkextension.exit().transition()
        //.duration(duration)
        .remove();
};
d3_graph2d.prototype.set_verticaldendrogramdata1linkcss = function () {
    // predefined css style links and link extensions
    var lineselector1 = '.links';
    var style1 = {
        'stroke': '#000',
        'stroke-opacity':'1',
        'fill': 'none',
        'stroke-width': '1px',
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
        'stroke': '#000',
        'stroke-opacity': '.6',
        'fill': 'none',
    };
    var selectorstyle = [
    { 'selection': lineselector1, 'style': style1 },
    { 'selection': lineselector2, 'style': style2 },
    { 'selection': lineselector3, 'style': style3 },
    { 'selection': lineselector4, 'style': style4 },
    ]
    this.set_svggcss(selectorstyle);
};
d3_graph2d.prototype.set_verticaldendrogramdata1labelcss = function () {
    // predefined css style links and link extensions
    var lineselector1 = '.labels';
    var style1 = {
        'font': '10px Arial',
        'font-weight': 'normal',
    };
    var lineselector2 = '.label--active';
    var style2 = {
        'font': '10px Arial',
        'font-weight': 'bold',
    };
    var selectorstyle = [
    { 'selection': lineselector1, 'style': style1 },
    { 'selection': lineselector2, 'style': style2 },
    ]
    this.set_svggcss(selectorstyle);
};