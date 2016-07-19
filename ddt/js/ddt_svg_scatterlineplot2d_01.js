"use strict";
//var ddt_svg_scatterlineplot2d_01 = function () {
function ddt_svg_scatterlineplot2d_01() {
// 	Scatter plot and line plot
// 	DESCRIPTION:
// 	A scatter plot and line plot are rendered on the same figure
// 	INPUT:
// 	data 1 and 2 are plotted along the same axis
// 	data1 = points
// 	data2 = line
// 	data1_keymap = {
// 		'xdata':'time_point',
// 		'ydata':'mutation_frequency',
// 		'serieslabel':'mutation_id',
// 		'featureslabel':''
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'scatterlineplot2d_01',
// 		"svgkeymap":[data1_keymap,data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,
// 		"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency",
// 		Tile parameters
// 		'tileheader':'Population mutation frequency',
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
ddt_svg_scatterlineplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_scatterlineplot2d_01.prototype.constructor = ddt_svg_scatterlineplot2d_01;
ddt_svg_scatterlineplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

	this.ddtsvg = new d3_chart2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

    //Testing in progress...
//     var navtabs_I = [
//                  {"litext":"options","href":"#" + parameters_I.svgid + "options","data-target":"#" + parameters_I.svgid + "options"}, 
//                  {"litext":"svg","href":"#" + parameters_I.svgid,"data-target":"#" + parameters_I.svgid}
//                  ];
//     this.ddtsvg.add_navtabs2tile(navtabs_I);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
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
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        //this.add_title(parameters.svgtitle);
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1axis();
        this.set_x1axistickformat(parameters_I.svgx1axistickformat);
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.set_x1axisticktextattr(parameters_I.svgx1axisticktextattr)
        this.set_x1axisticktextstyle(parameters_I.svgx1axisticktextstyle)
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
    	this.set_zoom();
    	this.add_zoom();
    	this.set_drag();
    	this.add_drag();
        // use the same x1/y1 scales for x2/y2
        this.copy_x1scalestox2scales();
        this.copy_y1scalestoy2scales();
        //this.set_colorscale(); //color for series_label will change each update
        // add points
        this.add_pointsdata1();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        this.add_pointsdata1tooltipandfill();
        this.set_x1andy1axesstyle();
        this.set_x1andy1axestickstyle();
        this.set_pointsstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel); // update_x1axislabel
        this.add_y1axislabel(parameters_I.svgy1axislabel); // update_y1axislabel
        this.set_x1andy1axeslabelstyle();
        // add line
		this.set_linedata2("linear");
		this.add_linedata2();
		this.add_linedata2tooltipandstroke();
		this.add_linedata2filter();
        this.set_linestyle();
    };
};