"use strict";
function ddt_svg_verticaldendrogram2d_01() {
    /*
    DESCRIPTION:
    generates a vertical dendrogram

    addapted from
    http://bl.ocks.org/mbostock/c034d66572fd6bd6815a
    
    TODO: there is either a problem with scaling the lengths for calculating the steps

    */

    ddt_svg.call(this);
};
ddt_svg_verticaldendrogram2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_verticaldendrogram2d_01.prototype.constructor = ddt_svg_verticaldendrogram2d_01;
ddt_svg_verticaldendrogram2d_01.prototype.make_svg = function(data_I,parameters_I){
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
		this.set_cluster();		
		this.set_verticallayoutstep();
		this.set_verticaldendrogramdata1root()
		this.set_verticaldendrogramdata1nodes();
		this.set_verticaldendrogramdata1links();
		this.add_verticaldendrogramdata1node();
		this.add_verticaldendrogramdata1link();
    	//this.add_verticaldendrogramdata1linkextension();
		// add styles
    	this.set_verticaldendrogramdata1labelcss();
		this.set_verticaldendrogramdata1linkcss();
		// add zoom and pan
    	this.set_zoom();
    	this.add_zoom();
    	this.set_drag();
    	this.add_drag();
    };
};