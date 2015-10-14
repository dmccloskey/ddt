"use strict";
function ddt_svg_circlepacklayout2d_01() {
    // circlepacklayout
    // description:
    // generic circlepacklayout
    // NOTES:
    // 1. data_I.datanestkeys = [] of multiple keys in order
    // 2. data_I.datalastchild = string describing the final child element
    // 2. data_I.svgpadding = float
    ddt_svg.call(this);
};
ddt_svg_circlepacklayout2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_circlepacklayout2d_01.prototype.constructor = ddt_svg_circlepacklayout2d_01;
ddt_svg_circlepacklayout2d_01.prototype.make_svg = function(data_I,parameters_I){
	// circlepacklayout definition

	this.ddtsvg = new d3_graph2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_duration(parameters_I.svgduration); //new!
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.data1.format_keyvalues2namechildren(data_I.datalastchild); //new!
    this.ddtsvg.set_packlayout(parameters_I.svgpadding};); //new
    this.ddtsvg.render = function () {
        this.add_graph2d2tile();
        //this.add_chart2d2tile_packlayoutcircle();
        this.set_packlayoutfocusdata1();
        this.set_packlayoutnodesdata1();
        this.set_packlayoutviewdata1();
        this.add_packlayoutcirclesdata1();
        this.add_packlayouttextdata1();
        this.set_packlayoutnode();
        this.add_packlayoutdata1zoom();
        this.zoomto_packlayout();
    };
};