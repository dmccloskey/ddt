"use strict";
function ddt_svg_radialdendrogram2d_01() {
    /*
    DESCRIPTION:
    generates a radial dendrogram

    addapted from
    http://bl.ocks.org/mbostock/c034d66572fd6bd6815a

    TODO:

    need to add css calls to highlight nodes/links on mousever
    */

    ddt_svg.call(this);
};
ddt_svg_radialdendrogram2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_radialdendrogram2d_01.prototype.constructor = ddt_svg_radialdendrogram2d_01;
ddt_svg_radialdendrogram2d_01.prototype.make_svg = function(data_I,parameters_I){
	// piechart definition

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
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_optionsbuttongroup2footer();
    this.ddtsvg.add_svgmenubutton2optionsbuttongroup();
    this.ddtsvg.add_resizebuttons2optionsbuttongroup();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
    	};
 		this.data1.format_keyvalues2namechildren(parameters_I.datalastchild); //new!
 		
        this.add_graph2d2tile();
        this.set_svgstyle();
        // add cluster nodes and links
		this.set_radius(parameters_I.svgradius);
		this.set_cluster();		
		this.set_radiallayoutstep();
		this.set_radialdendrogramdata1root()
		this.set_radialdendrogramdata1nodes();
		this.set_radialdendrogramdata1links();
		this.add_radialdendrogramdata1node();
		this.add_radialdendrogramdata1link();
    	this.add_radialdendrogramdata1linkextension();
		// add styles
    	this.set_radialdendrogramdata1labelcss();
		this.set_radialdendrogramdata1linkcss();
		// add zoom and pan
    	this.set_zoom();
    	this.add_zoom();
    	this.set_drag();
    	this.add_drag();
    };
};