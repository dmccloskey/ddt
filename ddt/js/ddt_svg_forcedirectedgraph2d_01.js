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
        //this.collapse_forcelayoutroot(); //TODO: buggy behavior...
        this.update_forceDirectedGraph();
//         //add zoom and pan
//         //todo: click interferes with collapse
//     	this.set_zoom();
//     	this.add_zoom();
    };
};