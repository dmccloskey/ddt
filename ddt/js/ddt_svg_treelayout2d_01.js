"use strict";
//var ddt_svg_scatterlot2d_01 = function () {
function ddt_svg_treelayout2d_01() {
// 	treelayout
// 	DESCRIPTION:
// 	generic treelayout
// 	INPUT:
//	data1 = [{}];
// 	data1_keys = [
// 		'experiment_id',
// 		'sample_name',
// 		'mutation_id',
// 		'mutation_type',
// 		'mutation_position',
// 		'mutation_annotations',
// 		'mutation_genes',
// 		'mutation_locations'
// 	];
// 	data1_nestkeys = [
// 		'analysis_id',
// 		'mutation_genes',
// 		'mutation_position',
// 		'mutation_type',
// 	];
// 	data1_keymap = {};
// 	data_I = [
// 	{
// 		"data":data1,
// 		"datakeys":data1_keys,
// 		"datanestkeys":data1_nestkeys
// 	}
// 	];
// 	parameters_I = {
// 	//svg parameters
// 		"svgtype":'treelayout2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 100, 'right': 100, 'bottom': 100, 'left': 100 },
// 		"svgwidth":1000,
// 		"svgheight":1000,
// 		"svgduration":750,
// 		"datalastchild":'sample_name',
// 		//tile parameters
// 		'tileheader':'Mutations annotated',
// 		'tiletype':'svg',
// 		'tileid':"tile1",
// 		'rowid':"row2",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 	};

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
    this.ddtsvg.set_treelayoutdata1tree();
    this.ddtsvg.set_treelayoutdata1diagonal();
    this.ddtsvg.render = function () {
 		this.data1.format_keyvalues2namechildren(parameters_I.datalastchild); //new!
		this.set_treelayoutdata1nodeorigin(0);
// 		this.set_treelayoutdata1tree();
// 		this.set_treelayoutdata1diagonal()
        this.add_graph2d2tile();
        this.set_svgstyle();
        this.set_treelayoutdata1root();
        this.collapse_treelayoutroot();
        this.update_treelayout();
    	this.set_zoom();
    	this.add_zoom();
    	this.set_drag();
    	this.add_drag();
    };
};