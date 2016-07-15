"use strict";
function ddt_svg_sankeydiagram2d_01() {
    /*
    DESCRIPTION:
    generates a sankey diagram for binary acyclic graphs

    INPUT:
    xdata is used as the value
    xdatalabel is used as the source
    ydatalabel is used as the target

    addapted from
    https://bl.ocks.org/mbostock/4063582 (v3)
    http://bl.ocks.org/xaranke/9ada4c74a87b57ae7308 (v4)

    TODO: add node drag behavior
    
    */

    ddt_svg.call(this);
};
ddt_svg_sankeydiagram2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_sankeydiagram2d_01.prototype.constructor = ddt_svg_sankeydiagram2d_01;
ddt_svg_sankeydiagram2d_01.prototype.make_svg = function(data_I,parameters_I){
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
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_optionsbuttongroup2footer();
    this.ddtsvg.add_svgmenubutton2optionsbuttongroup();
    this.ddtsvg.add_resizebuttons2optionsbuttongroup();
    this.ddtsvg.set_duration(250);
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
    	};
 		
        this.add_graph2d2tile();
        this.set_svgstyle();
    	this.set_colorscale(parameters_I.svgcolorscale,
								parameters_I.svgcolorcategory,
								parameters_I.svgcolordomain,
								parameters_I.svgcolordatalabel);
        // add cluster nodes and links
		this.set_sankeydiagramsankey(parameters_I.svgwidth,parameters_I.svgheight);
		//this.set_sankeydiagramdata1root()
//  		this.set_sankeydiagramdata1nodes();
// 		this.set_sankeydiagramdata1links();
// 		this.set_sankeydiagramdata1_nodesandlinks_sourcetarget();
		this.set_sankeydiagramdata1_nodesandlinks();
		this.update_sankeydiagramsankey();
		this.add_sankeydiagramdata1link();
		this.add_sankeydiagramdata1node();
		// add styles
    	this.set_sankeydiagramdata1css();
		// add zoom and pan
    	this.set_zoom();
    	this.add_zoom();
    	this.set_drag(); //interferes with node drag
    	this.add_drag();
    };
};