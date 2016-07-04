"use strict";
d3_graph2d.prototype.set_treemaplayoutdata1root = function(treemaplayoutroot_I){
    //set treemap layout root
    if (treemaplayoutroot_I){this.treemaplayoutroot = treemaplayoutroot_I;}
    else {
        //this.treemaplayoutroot={'name':"",'children':this.data1.nestdatafiltered};
        this.treemaplayoutroot=this.data1.nestdatafiltered[0];
        };  
};
// update
d3_graph2d.prototype.set_treemaplayoutdata1nodes = function(){
    // compute treemaplayout nodes
    var root = this.treemaplayoutroot;
    this.treemaplayoutnodes = this.treemaplayouttreemap.nodes(root);
};
d3_graph2d.prototype.add_treemaplayoutdata1node = function(){
    // add treemap layout nodes
    var nodes = this.treemaplayoutnodes;
    var _this = this;
    var duration= this.duration;
    var colorscale = this.colorscale;

    function position() {
        this.style("left", function(d) { return d.x + "px"; })
            .style("top", function(d) { return d.y + "px"; })
            .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
            .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
    }

    this.treemaplayoutnode = this.svgg.selectAll(".node")
        .data(nodes);

    // Enter any new nodes at the parent's previous position.
    this.treemaplayoutnodeenter = this.treemaplayoutnode.enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) { return d.children ? colorscale(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });

    // Transition nodes to their new position.
    this.treemaplayoutnodeupdate = this.treemaplayoutnode.transition()
        .duration(duration)
        .call(position)
        .style("background", function(d) { return d.children ? colorscale(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });

    // Transition exiting nodes to the parent's new position.
    this.treemaplayoutnodeexit = this.treemaplayoutnode.exit().transition()
        .duration(duration)
        .remove();
};
d3_graph2d.prototype.set_treemaplayoutdata1css = function () {
    //set predefined treemaplayout style

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