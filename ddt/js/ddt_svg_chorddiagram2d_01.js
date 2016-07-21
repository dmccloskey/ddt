"use strict";
function ddt_svg_chorddiagram2d_01() {
    /*
    DESCRIPTION:
    generates a chorddiagram for pairWise data where each chord
    	that connects data_1 to data_2 is scaled by their respective values

    addapted from
    https://github.com/sghall/chord-transitions/blob/master/js/chordDirective.js
    and http://bl.ocks.org/mbostock/4062006
    */

    ddt_svg.call(this);
};
ddt_svg_chorddiagram2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_chorddiagram2d_01.prototype.constructor = ddt_svg_chorddiagram2d_01;
ddt_svg_chorddiagram2d_01.prototype.make_svg = function(data_I,parameters_I){
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
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
    	};
        this.add_graph2d2tile();
        this.set_svgstyle();
        // add chords
		this.set_radius(parameters_I.svgradius);
		this.set_chord();
		this.set_chordmatrix();
		this.set_arc(parameters_I.svgouterradius,parameters_I.svginnerradius);
		this.set_arclabel();

		this.set_chordpath(parameters_I.svginnerradius);
		this.add_chordgroupsdata1(parameters_I.svginnerradius)
        this.add_chordsdata1();
        //this.add_chordsdata1tooltip();
    };
};