"use strict";
//var ddt_svg_scatterlot2d_01 = function () {
function ddt_svg_treelayout2d_01() {
    // treelayout
    // description:
    // generic treelayout
    // NOTES:
    // 1. data_I.datanestkeys = [] of multiple keys in order
    // 2. data_I.datalastchild = string describing the final child element
    ddt_svg.call(this);
};
ddt_svg_treelayout2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_treelayout2d_01.prototype.constructor = ddt_svg_treelayout2d_01;
ddt_svg_treelayout2d_01.prototype.make_svg = function(data_I,parameters_I){
	// treelayout definition

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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.data1.format_keyvalues2namechildren(data_I.datalastchild); //new!
    this.ddtsvg.set_treelayoutdata1nodeorigin(0);
    this.ddtsvg.set_treelayoutdata1tree();
    this.ddtsvg.set_treelayoutdata1diagonal()
    this.ddtsvg.render = function () {
        this.add_graph2d2tile();
        this.set_svgstyle();
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_treelayoutdata1root();
        this.collapse_treelayoutroot();
        this.update_treelayout();
    };
};