var ddt_svg = function(){
    // ddt_svg template class
    this.parameters = {};
    this.ddtsvg = null;
};
ddt_svg.prototype.set_parameters = function(parameters_I){
    // set chart2d parameters
    this.parameters = parameters_I;
};
ddt_svg.prototype.set_ddtsvg = function(){
    // set ddtsvg tileid
	var tileid_I = this.parameters_I.tileid;
	var id_I = this.parameters_I.svgid;

    this.ddtsvg.set_tileid(tileid_I);
    this.ddtsvg.set_id(id_I);
};
ddt_svg_heatmap = function () {
    // form tile
    ddt_svg.call(this);
};
ddt_svg_heatmap.prototype = Object.create(ddt_svg.prototype);
ddt_svg_heatmap.prototype.constructor = ddt_svg_heatmap;
ddt_svg_heatmap.prototype.make_svg = function(data_I,parameters_I){
	// heatmap definition

	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()

	// heatmap properties
	this.ddtsvg = new d3_chart2d();
    this.ddtsvg.add_data(data_I);
    this.ddtsvg.set_datakeymaps(parameters_I.svgdatakeymaps);
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_heatmapdata1(parameters_I.svgcellsize); //must be done initially to set the height/width correctly
    this.ddtsvg.add_svgexportbutton2tile();
    //this.ddtsvg.add_datalist2tile(datalist);
    this.ddtsvg.set_tooltip();
    this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    //this.ddtsvg.data1.change_filters({});
    this.ddtsvg.data1.filter_stringdata();
    this.ddtsvg.set_colorscale(parameters_I.svgcolorscale,
								parameters_I.svgcolorcategory,
								parameters_I.svgcolordomain,
								parameters_I.svgcolordatalabel);
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_heatmapdata1(18); //update the heatmap properties
        this.add_heatmapdata1();
        this.add_heatmapdata1animation();
        this.add_heatmapdata1rowlabels();
        this.add_heatmapdata1columnlabels();
        this.add_heatmapdata1legend();
        //this.add_heatmapdata1drowpdownmenu("tile1");
        this.add_heatmapdata1datalist(parameters_I.svgdatalisttileid);
        this.add_heatmapdata1tooltipandfill();
        this.set_heatmapdata1css();
    };
};