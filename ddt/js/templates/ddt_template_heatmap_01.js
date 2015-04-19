var ddt_template = function(data1_I,data1_keys_I,data1_nestkeys_I,data1_keymap_I,parameters_I){
    // parse the input
	var data1 = data1_I;
	var data1keymap = data1_keymap_I;
    var data1keys = data1_keys_I;
	var data1nestkeys = data1_nestkeys_I;
	var parameters = parameters_I;
    var datalist = [{'value':'hclust','text':'by cluster'}, //values are predifined in heatmaporder function
        {'value':'probecontrast','text':'by row and column'},
        {'value':'probe','text':'by row'},
        {'value':'contrast','text':'by column'},
        {'value':'custom','text':'by value'}];
    //Data definition
    var d3data1 = new d3_data();
    d3data1.set_keys(data1keys);
    d3data1.set_listdata(data1, data1nestkeys);
    d3data1.reset_filters();
    //Tile definition
    d3.selectAll('#row1').remove();
    var tile1 = new d3_tile();
    tile1.set_tileid("tile1");
    tile1.set_rowid("row1");
    tile1.set_colid("col1");
    tile1.set_rowclass("row");
    tile1.set_colclass("col-sm-12");
    tile1.add_removebutton();
    //Chart
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin(parameters.chart2d1margin);
    chart2d1.set_heatmapdata1(parameters.chart2d1cellsize); //must be done initially to set the height/width correctly
    chart2d1.add_svgexportbutton2tile();
    chart2d1.add_datalist2tile(datalist);
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_zoom();
    //chart2d1.data1.change_filters({});
    chart2d1.data1.filter_stringdata();
    chart2d1.set_colorscale(parameters.chart2d1colorscale,
		parameters.chart2d1colorcategory,
		parameters.chart2d1colordomain,
		parameters.chart2d1colordatalabel);
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.set_heatmapdata1(18); //update the heatmap properties
        this.add_heatmapdata1();
        this.add_heatmapdata1animation();
        this.add_heatmapdata1rowlabels();
        this.add_heatmapdata1columnlabels();
        this.add_heatmapdata1legend();
        this.add_heatmapdata1datalist();
        this.add_heatmapdata1tooltipandfill();
        this.set_heatmapdata1css();
    };
    chart2d1.render();
};