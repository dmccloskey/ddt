"use strict";
//var ddt_svg_volcanoplot2d_01 = function () {
function ddt_svg_volcanoplot2d_01() {
// 	Volcano plot
// 	DESCRIPTION:
// 	scatterplot2d with 1 data set and filled x1x2/y1y2 axis
// 	utilized for a volcano plot or pca loadings plot
// 	INPUT:
// 	Data1
// 	data1_keymap = {
// 		'ydata':'pvalue_corrected_negLog10',
// 		'xdata':'fold_change_log2',
// 		'serieslabel':'',
// 		'featureslabel':'component_group_name'
// 		};
// 	parameters_I = {
// 		SVG parameters
// 		"svgtype":'volcanoplot2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 50, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,
// 		"svgheight":350,
// 		"svgx1axislabel":'Fold Change [log2(FC)]',
// 		"svgy1axislabel":'Probability [-log10(P)]',
// 		Tile parameters
// 		'tileheader':'Volcano plot',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"
// 		};
		
    ddt_svg.call(this);
};
ddt_svg_volcanoplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_volcanoplot2d_01.prototype.constructor = ddt_svg_volcanoplot2d_01;
ddt_svg_volcanoplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

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
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1x2axis();
        this.set_y1y2axis();
        this.add_x1x2axis();
        this.add_y1y2axis();
        this.add_x1axisgridlines();
        this.add_y1axisgridlines();
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1featurefilter();
        this.add_data1featureslabels();
        this.set_pointsstyle();
        this.set_x1x2andy1y2axesstyle();
        this.set_x1andy1axestickstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};