"use strict";
function ddt_svg_forcedirectedgraph2d_01() {

	/*
	Description: collapsible force directed graph
	*/

    ddt_svg.call(this);
};
ddt_svg_forcedirectedgraph2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_forcedirectedgraph2d_01.prototype.constructor = ddt_svg_forcedirectedgraph2d_01;
ddt_svg_forcedirectedgraph2d_01.prototype.make_svg = function(data_I,parameters_I){
	// forcedirectedgraph definition

	this.ddtsvg = new d3_graph2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_duration(parameters_I.svgduration); //new!
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_optionsbuttongroup2footer();
    this.ddtsvg.add_svgmenubutton2optionsbuttongroup();
    this.ddtsvg.add_resizebuttons2optionsbuttongroup();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.render = function () {
        this.add_graph2d2tile();
        this.set_svgstyle();
		this.set_forcelayoutdata1force();
		this.add_forcelayoutdata1drag();
		this.set_forceDirectedGraphData1NodesAndLinks();
		var nodes = this.forcelayoutdata1nodes;
		var links = this.forcelayoutdata1links;
		this.forcelayoutdata1force //re-start the force layout
			.nodes(nodes)
			.links(links)
			.start();
		this.add_forceDirectedGraphData1Marker();
		this.add_forceDirectedGraphData1Node();
		this.add_forceDirectedGraphData1Link();
		this.add_forcelayoutdata1tick();
		this.set_forceDirectedGraphData1css();
		//add zoom and pan (zoom interferes with node drag)
//     	this.set_zoom();
//     	this.add_zoom();
    };
};