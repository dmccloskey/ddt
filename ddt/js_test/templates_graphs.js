"use strict";
//Template d3 graph visualizations
var make_circlepacklayout = function(){
    //zoom features appear to be broken, but the initial layout seems to be rendered correctly
    var d3tile = new d3_tile();
    var parameters = {tileid:"tile1",rowid:"row1",colid:"col1",
        tileclass:"panel panel-default",rowclass:"row",colclass:"col-sm-12",
        svgpadding:2};
    d3tile.set_tileid(parameters.tileid);
    d3tile.set_rowid(parameters.rowid);
    d3tile.set_colid(parameters.colid);
    d3tile.set_tileclass(parameters.tileclass);
    d3tile.set_rowclass(parameters.rowclass);
    d3tile.set_colclass(parameters.colclass);
    d3tile.add_tile2container();
    d3tile.add_header2tile();
    d3tile.add_removebutton2header();
    d3tile.add_title2header('test');
    d3tile.add_body2tile();
    d3tile.add_footer2tile();
    var data1keymap = {};
    var keys = ['sample_name', 'experimentor_id','id','exp_type_id']
    var d3data1 = new d3_data();
    d3data1.set_keys(keys);
    // add in a size attribute for testing
    data1_treelayout.forEach(function(d){
        d['size']=100;
    });
    d3data1.set_listdata(data1_treelayout, ['id','exp_type_id']);
    d3data1.reset_filters();
    var chart2d1 = new d3_graph2d();
    chart2d1.add_data1(d3data1);
    //chart2d1.data1 = {'nestdatafiltered':flare}; //test with flare
    chart2d1.data1.format_keyvalues2namechildren('sample_name');
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 10, right: 10, bottom: 10, left: 10 });
    chart2d1.set_diameter(960);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_packlayout(parameters.svgpadding); //add parameters_I.svgpadding = 2;
    chart2d1.set_colorscale();
    chart2d1.render = function () {
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
    chart2d1.render();
};
var make_treelayout = function(){
    var d3tile = new d3_tile();
    var parameters = {tileid:"tile1",rowid:"row1",colid:"col1",
        tileclass:"panel panel-default",rowclass:"row",colclass:"col-sm-12",
        svgduration:750,};
    d3tile.set_tileid(parameters.tileid);
    d3tile.set_rowid(parameters.rowid);
    d3tile.set_colid(parameters.colid);
    d3tile.set_tileclass(parameters.tileclass);
    d3tile.set_rowclass(parameters.rowclass);
    d3tile.set_colclass(parameters.colclass);
    d3tile.add_tile2container();
    d3tile.add_header2tile();
    d3tile.add_removebutton2header();
    d3tile.add_title2header('test');
    d3tile.add_body2tile();
    d3tile.add_footer2tile();
    var data1keymap = {};
    var keys = ['sample_name', 'experimentor_id','id','exp_type_id']
    var d3data1 = new d3_data();
    d3data1.set_keys(keys);
    d3data1.set_listdata(data1_treelayout, ['id','exp_type_id']);
    d3data1.reset_filters();
    //d3data1.nestdatafiltered = flare;  //test with flare
    var chart2d1 = new d3_graph2d();
    chart2d1.add_data1(d3data1);
    chart2d1.data1.format_keyvalues2namechildren('sample_name');
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 100, right: 100, bottom: 100, left: 100 });
    chart2d1.set_width(500);
    chart2d1.set_height(1000);
    chart2d1.set_duration(750);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_treelayoutdata1nodeorigin(0);
    chart2d1.set_treelayoutdata1tree();
    chart2d1.set_treelayoutdata1diagonal();
    chart2d1.render = function () {
        this.add_graph2d2tile();
        this.set_svgstyle();
        this.set_treelayoutdata1root();
        this.collapse_treelayoutroot();
        this.update_treelayout();
    };
    chart2d1.render();
};