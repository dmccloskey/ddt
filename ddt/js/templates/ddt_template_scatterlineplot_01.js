var ddt_template = function (data1_I,data1_keys_I,data1_nestkeys_I,data1_keymap_I,parameters_I) {
    //Input
    var data1 = data1_I;
    var data1_keys = data1_keys_I;
    var data1_nestkeys = data1_nestkeys_I;
    var data1_keymap = data1_keymap_I;
    var parameters = parameters_I;
    //Data initialization
    var d3data1 = new d3_data();
    d3data1.set_keys(data1_keys);
    d3data1.set_listdata(data1,data1_nestkeys);
    d3data1.reset_filters();
    //Tile definition
    d3.selectAll('#row1').remove();
    var tile1 = new d3_tile();
    tile1.set_tileid("tile1");
    tile1.set_rowid("row1");
    tile1.set_colid("col1");
    tile1.set_rowclass("row");
    tile1.set_colclass("col-sm-12");
    tile1.add_tile2container();
    //tile1.add_title("custom box and whiskers plot");
    tile1.add_removebutton();
    //Chart definition
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap(data1_keymap);
    chart2d1.add_data2(d3data1);
    chart2d1.set_data2keymap(data1_keymap);
    chart2d1.set_filterdata1and2(true); //filter data 1 and 2 together
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin(parameters.chart1margin);
    chart2d1.set_width(parameters.chart1width);
    chart2d1.set_height(parameters.chart1height);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_colorscale(); //color for series_label will remain consistent
    //chart2d1.set_zoom();
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        this.copy_x1scalestox2scales();
        this.copy_y1scalestoy2scales();
        //this.set_colorscale(); //color for series_label will change each update
        this.add_pointsdata1();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_pointsdata1tooltipandfill();
        this.set_x1andy1axesstyle();
        this.set_pointsstyle();
        this.add_x1axislabel(parameters.chart1x1axislabel);
        this.add_y1axislabel(parameters.chart1y1axislabel);
        this.add_title(parameters.chart1title);
		this.set_linedata2("linear");
		this.add_linedata2();
		this.add_linedata2tooltipandstroke();
		this.add_linedata2filter();
        this.set_linestyle();
    };
    chart2d1.render();
};