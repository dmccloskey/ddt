//Template d3 graph visualizations
var make_circlepacklayout = function(){
    var data1keymap = {};
//     var keys = ['sample_name', 'experimentor_id','id','exp_type_id']
//     var d3data1 = new d3_data();
//     d3data1.set_keys(keys);
//     d3data1.set_listdata(data1_packlayoutcircle, ['id','exp_type_id']);
//     d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    //chart2d1.add_data1(d3data1);
    chart2d1.data1 = {'nestdatafiltered':flare}; //test with flare
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 10, right: 10, bottom: 10, left: 10 });
    chart2d1.set_diameter(960);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_packlayout(2);
    //chart2d1.data1.change_filters({});
    //chart2d1.data1.filter_stringdata();
    chart2d1.set_colorscale();
    chart2d1.render = function () {
        this.add_chart2d2tile();
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
    var data1keymap = {};
    var keys = ['sample_name', 'experimentor_id','id','exp_type_id']
    var d3data1 = new d3_data();
    d3data1.set_keys(keys);
    d3data1.set_listdata(data1_treelayout, ['id','exp_type_id']);
    d3data1.reset_filters();
    //d3data1.nestdatafiltered = flare;  //test with flare
    var chart2d1 = new d3_chart2d();
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
    chart2d1.add_svgelement2tile();
    chart2d1.set_treelayoutdata1root();
    chart2d1.set_treelayoutdata1nodeorigin(0);
    chart2d1.set_treelayoutdata1tree();
    chart2d1.set_treelayoutdata1diagonal();
    chart2d1.collapse_treelayoutroot();
    chart2d1.render = function (source_I) {
        if (source_I){
            var source = source_I;
        } else {
            var source = this.data1.nestdatafiltered[0];
        };

        this.set_treelayoutdata1nodes();
        this.set_treelayoutdata1links();
        this.add_treelayoutdata1node(source)
        this.add_treelayoutdata1link(source)
        this.save_treelayoutdata1positions();
        this.set_treelayoutdata1css();
    };
    chart2d1.render();
};