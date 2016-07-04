"use strict";
d3_graph2d.prototype.set_partitionlayoutdata1root = function(partitionlayoutroot_I){
    //set partition layout root
    if (partitionlayoutroot_I){this.partitionlayoutroot = partitionlayoutroot_I;}
    else {
        //this.partitionlayoutroot={'name':"",'children':this.data1.nestdatafiltered};
        this.partitionlayoutroot=this.data1.nestdatafiltered[0];
        };  
};
// update
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

    function position() {
        this.style("left", function(d) { return d.x + "px"; })
            .style("top", function(d) { return d.y + "px"; })
            .style("width", function(d) { return d.dx + "px"; })
            .style("height", function(d) { return d.dy + "px"; })
            ;
    }

    this.partitionlayoutnode = this.svgg.selectAll(".node")
        .data(nodes);

    // Enter any new nodes at the parent's previous position.
    this.partitionlayoutnodeenter = this.partitionlayoutnode.enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background-color", function(d) { return d.children ? colorscale(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });

    // Transition nodes to their new position.
    this.partitionlayoutnodeupdate = this.partitionlayoutnode.transition()
        .duration(duration)
        .call(position)
        .style("background-color", function(d) { return d.children ? colorscale(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });

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