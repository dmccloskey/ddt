"use strict";
function ddt_svg_bundlediagram2d_01() {
    /*
    DESCRIPTION:
    generates a bundlediagram for 

    addapted from
    http://bl.ocks.org/mbostock/7607999

    TODO:
    issue with formatting the data to match cluster.nodes(root) root input
    need to add css calls to highlight nodes/links on mousever
    */

    ddt_svg.call(this);
};
ddt_svg_bundlediagram2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_bundlediagram2d_01.prototype.constructor = ddt_svg_bundlediagram2d_01;
ddt_svg_bundlediagram2d_01.prototype.make_svg = function(data_I,parameters_I){
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
    this.ddtsvg.add_refreshbutton2optionsbuttongroup();
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
        // add bundles
		this.set_radius(parameters_I.svgradius);
		this.set_cluster();
		this.set_bundle();
		this.set_bundlediagramline(parameters_I.svginterpolate,parameters_I.svgtension);
		this.set_bundlediagramdata1root()
		this.set_bundlediagramdata1nodes();
		this.set_bundlediagramdata1links();
		//this.set_bundlediagramdata1_nodesandlinks_sourcetarget();
		this.add_bundlediagramdata1node();
		this.add_bundlediagramdata1link();
		// add styles
		this.set_bundlediagramdata1linkcss();
		// add zoom and pan
    	this.set_zoom();
    	this.add_zoom();
    	this.set_drag();
    	this.add_drag();
    };
};