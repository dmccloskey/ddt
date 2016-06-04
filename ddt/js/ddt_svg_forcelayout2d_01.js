"use strict";
function ddt_svg_forcelayout2d_01() {

    ddt_svg.call(this);
};
ddt_svg_forcelayout2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_forcelayout2d_01.prototype.constructor = ddt_svg_forcelayout2d_01;
ddt_svg_forcelayout2d_01.prototype.make_svg = function(data_I,parameters_I){
	// forcelayout definition

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
    this.ddtsvg.set_duration(parameters_I.svgduration); //new!
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_optionsbuttongroup2footer();
    this.ddtsvg.add_svgmenubutton2optionsbuttongroup();
    this.ddtsvg.add_resizebuttons2optionsbuttongroup();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
//     this.ddtsvg.set_forcelayoutdata1force();
//     this.ddtsvg.add_forcelayoutdata1tick();
//     this.ddtsvg.add_forcelayoutdata1drag();
    this.ddtsvg.render = function () {
 		this.data1.format_keyvalues2namechildren(parameters_I.datalastchild); //new!
		this.set_forcelayoutdata1nodeorigin(0);
        this.add_graph2d2tile();
        this.set_svgstyle();
        this.set_forcelayoutdata1root();
//         this.set_forcelayoutnode();
//         this.set_forcelayoutlink();

		this.set_forcelayoutdata1force();
		//this.add_forcelayoutdata1tick();
		this.add_forcelayoutdata1drag();
        //this.collapse_forcelayoutroot();
        this.update_forcelayout();
    };
};