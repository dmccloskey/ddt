"use strict";
//var ddt_svg_horizontalbarschart2d_01 = function () {
function ddt_svg_horizontalbarschart2d_01() {
// 	Horizontal bars chart
// 	DESCRIPTION:
// 	Horizontal bars with error bars
// 	INPUT:
// 	data1
// 	data1_keymap = {
// 		'xdata':'flux_distance',
// 		'ydata':'rxn_id',
// 		'serieslabel':'simulation_id_2',
// 		'featureslabel':'rxn_id'
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'horizontalbarschart2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 250, 'bottom': 50, 'left': 50 },
// 		"svgwidth":350,
// 		"svgheight":900,
// 		"svgx1axislabel":"flux_distance",
// 		"svgy1axislabel":"rxn_id",
// 		"svgfilters":{'met_id':['glc-D','ac']}
// 		Tile parameters
// 		'tileheader':'Flux distance',
// 		'tiletype':'svg','tileid':"tile1",
// 		'rowid':"row2",'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",'colclass':"col-sm-6"
// 		};

    ddt_svg.call(this);
};
ddt_svg_horizontalbarschart2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_horizontalbarschart2d_01.prototype.constructor = ddt_svg_horizontalbarschart2d_01;
ddt_svg_horizontalbarschart2d_01.prototype.make_svg = function(data_I,parameters_I){
	// horizontalbarschart definition

	this.ddtsvg = new d3_chart2d();
	
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
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
    	};
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_y1range("ordinal-rangeRoundBands",true);
        this.set_y2range("ordinal",true);
        this.set_x1range("linear");
        this.set_y1y2domain_horizontalbarschart();
        this.set_x1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        // add horizontal bars
        this.add_horizontalbarsdata1();
        this.add_horizontalbarsdata1tooltipandfill();
		this.add_horizontalbarsdata1errorbars();
        this.set_x1andy1axesstyle_horizontalbarschart();
        this.set_x1andy1axestickstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};