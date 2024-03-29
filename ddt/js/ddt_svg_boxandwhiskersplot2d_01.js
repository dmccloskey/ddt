"use strict";
//var ddt_svg_boxandwhiskersplot2d_01 = function () {
function ddt_svg_boxandwhiskersplot2d_01() {
// 	Custom box and whiskers plot
// 	DESCRIPTION:
//  Bullet plot describes the mean and confidence intervals of the data
//	Box and whiskers describe the median, interquartile, and ranges of the data
// 	INPUT:
// 	data1 = points
// 	data1_keymap = {'xdata':'component_group_name',
// 		TODO: 'ydata':'calculated_concentrations', //vector of datapoints
// 		'ydatamean':'mean',
// 		'ydatalb':'ci_lb',
// 		'ydataub':'ci_ub',
// 		'ydatamin':'min',
// 		'ydatamax':'max',
// 		'ydataiq1':'iq_1',
// 		'ydataiq3':'iq_3',
// 		'ydatamedian':'median',
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'component_group_name'};
// 	parameters_I = e.g., {
// 	SVG parameters:
// 		"svgtype":'boxandwhiskersplot2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency"
// 	Tile parameters:
// 		'tileheader':'Custom box and whiskers plot',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"};

	ddt_svg.call(this);
};
ddt_svg_boxandwhiskersplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_boxandwhiskersplot2d_01.prototype.constructor = ddt_svg_boxandwhiskersplot2d_01;
ddt_svg_boxandwhiskersplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// boxandwhiskersplot definition

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
    //this.ddtsvg.set_zoom(); todo
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("linear");
        this.set_x1x2domain_verticalbarschart();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        // add legend
        this.add_legenddata1();
        this.add_legenddata1filter();
        // make the box and whiskers plot
        this.add_boxandwhiskersdata1();
        if (this.data1keymap.ydataiq1 && this.data1keymap.ydataiq3){
        	this.add_boxandwhiskersdata1_box();
        	this.add_boxandwhiskersdata1tooltipandfill_box();
        	};
        if (this.data1keymap.ydatamedian){this.add_boxandwhiskersdata1_median();};
        if (this.data1keymap.ydatamin && this.data1keymap.ydatamax){this.add_boxandwhiskersdata1_caps();};
        if (this.data1keymap.ydataiq1 && this.data1keymap.ydataiq3 && this.data1keymap.ydatamin && this.data1keymap.ydatamax){
        	this.add_boxandwhiskersdata1_whiskers();
        };
        
        // make the circle and whiskers plot
        if (this.data1keymap.ydatalb && this.data1keymap.ydataub){this.add_boxandwhiskersdata1_lbub();};
        if (this.data1keymap.ydata){
        	this.add_boxandwhiskersdata1_mean();
        	this.add_boxandwhiskersdata1tooltipandfill_mean();
        };
        this.set_x1andy1axesstyle_verticalbarschart();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        //// add zoom (todo)
        //this.set_zoom();
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.set_svgelementzoomcss();
    };
};