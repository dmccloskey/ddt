//unit tests
var check_add_tile2container = function () {
    d3.selectAll('#row1').remove();
    var tile1 = new d3_tile();
    tile1.set_tileid("tile1");
    tile1.set_rowid("row1");
    tile1.set_colid("col1");
    tile1.set_rowclass("row");
    tile1.set_colclass("col-sm-12");
    tile1.add_tile2container();
    tile1.add_header2tile();
    tile1.add_removebutton2header();
    tile1.add_title2header("Test");
    tile1.add_body2tile();
    tile1.add_footer2tile();
    if (tile1.tile.length === 1) {
        console.log("passed unit test add_tile2container");
    }
    else {
        console.log("failed unit test add_tile2container")
    };
    return tile1;
};
var check_add_dropdownbuttongroup2body_href = function(){
    var tile1 = check_add_tile2container();
    var btntext_litext_I = [{"buttontext":"button1","litext":["option1","option2","option3"]}];
    var url_I = "project.html";
    tile1.add_dropdownbuttongroup2body_href(btntext_litext_I,url_I);
};
var check_add_textarea = function(){
    tile1 = check_add_tile2container();
    var tileid = tile1.tileid;
    var textarearow = d3.select('#'+tileid).append("div")
        .attr("class","row")
        .attr("id", tileid + 'textarearow');
    var textareacol = textarearow.append("div")
            .attr("class","col-sm-3")
            .attr("id", tileid + 'textareacol-sm-3');
        textareacol.append("form")
            .attr("id", tileid + 'textarea');
        textareacol.text("option1").append("br");
        textareacol.append("input")
            .attr("value","text");
    var textareacol = textarearow.append("div")
            .attr("class","col-sm-3")
            .attr("id", tileid + 'textareacol-sm-3');
        textareacol.append("form")
            .attr("id", tileid + 'textarea');
        textareacol.text("option2").append("br");
        textareacol.append("input")
            .attr("value","text");
    var button_idtext = {'id':'submit1','text':'submit'};
    var submitbuttonrow = d3.select('#'+tileid).append("div")
        .attr("class","row");
    var submitbutton = submitbuttonrow.append("div")
        .attr("class","col-sm-3")
        .append("button")
        .attr("class","btn btn-default column-button")
        .attr("id", tileid + 'submitbutton'+button_idtext.id)
        .text(button_idtext.text);

};
var check_add_title2tile = function(){
    tile1 = check_add_tile2container();
    var tileid = tile1.tileid;
    var title = d3.select('#'+tileid).append("div")
        .attr("class","row")
        .append("div")
        .attr("class","col-sm-12")
        .append("div")
        .attr("id", tileid + 'title-box')
        .append("h3")
        .attr("id", tileid + 'title')
        .text("Title");

};
var check_add_svgelement2tile = function(){
    var svg1 = new d3_svg();
    svg1.set_id('svg1');
    svg1.set_tileid('tile1');
    svg1.set_margin({ top: 50, right: 150, bottom: 30, left: 40 });
    svg1.set_width(990);
    svg1.set_height(500);
    svg1.add_svgelement2tile();
    if (svg1.svgg.length === 1) {
        console.log("passed unit test add_svgelement2tiler");
    }
    else {
        console.log("failed unit test add_svgelement2tile")
    };
    return svg1;
};
var check_xmlserializer = function () {
    xml = (new XMLSerializer()).serializeToString(svg1.svgelement[0][0]);
    if (typeof(xml) == "string"){
        console.log("passed unit test xmlserializer");
    }
    else {
        console.log("failed unit test xmlserializer")
    };
};
var check_add_svgexportbutton2tile = function () {
    // check if an export button is added
    // and figure.svg can be downloaded on click
    var svg1 = new d3_svg();
    svg1.set_id('svg1');
    svg1.set_tileid('tile1');
    svg1.set_margin({ top: 50, right: 150, bottom: 30, left: 40 });
    svg1.set_width(990);
    svg1.set_height(500);
    svg1.add_svgelement2tile();
    svg1.add_svgexportbutton2tile();
};
var check_svg_circle = function () {
    // check if circles appear
    // TODO:
    var svg1 = new d3_svg();
    svg1.set_id('svg1');
    svg1.set_tileid('tile1');
    svg1.set_margin({ top: 50, right: 150, bottom: 30, left: 40 });
    svg1.set_width(990);
    svg1.set_height(500);
    svg1.add_svgelement2tile();
    var data = [0, 1, 2, 3, 4, 5];
    var dot = svg1.svgg.selectAll('.dot');
    var dotdata = dot.data(data);
    var dotenter = dotdata.enter();
    dotenter.append('circle').attr('r', 10).style('fill', 'red').attr('cx', function (d) { return d; }).attr('cy', function (d) { return d; });
    dot.remove()

};
var check_add_chart2d2tile = function () {
    var chart2d1 = new d3_chart2d();
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_data1ids('ale_time','rate','sample_name_abbreviation','');
    chart2d1.set_margin({ top: 50, right: 150, bottom: 30, left: 40 });
    chart2d1.set_width(990);
    chart2d1.set_height(500);
    chart2d1.add_chart2d2tile();
    if (chart2d1.svgg.length === 1) {
        console.log("passed unit test chart2d2tile");
    }
    else {
        console.log("failed unit test chart2d2tile")
    };
    return chart2d1;
};
var check_add_xandyaxis = function () {
    //make the chart
    var d3data1 = check_convert_list2nestlist();
    var chart2d1 = check_add_chart2d2tile();
    chart2d1.add_data1(d3data1);
    chart2d1.set_x1range("linear");
    chart2d1.set_y1range("linear");
    chart2d1.set_x1domain();
    chart2d1.set_y1domain();
    chart2d1.set_x1axis();
    chart2d1.set_y1axis();
    chart2d1.add_x1axis();
    chart2d1.add_y1axis();
    chart2d1.set_colorscale();

    if (chart2d1.x1axis.length === 1 && chart2d1.y1axis.length === 1) {
        console.log("passed unit test add_x1axis and add_y1axis");
    }
    else {
        console.log("failed unit test add_x1axis and add_y1axis")
    };
    return chart2d1;
};
var check_remove_xandyaxis = function () {
    //make the chart
    var chart2d1 = check_add_xandyaxis();
    char2d1.remove_x1axis();
    char2d1.remove_y1axis();

    if (!chart2d1.x1axis && !chart2d1.y1axis.length) {
        console.log("passed unit test remove_x1axis and remove_y1axis");
    }
    else {
        console.log("failed unit test remove_x1axis and remove_y1axis")
    };
    return chart2d1;
};
var check_add_title = function () {
    var chart2d1 = check_add_chart2d2tile();
    chart2d1.add_title("char2d1")

    if (chart2d1.title.length === 1) {
        console.log("passed unit test add_title");
    }
    else {
        console.log("failed unit test add_title")
    };
    return chart2d1;
};
var check_remove_title = function () {
    var chart2d1 = check_add_title();
    chart2d1.remove_title();

    if (!chart2d1.title.length) {
        console.log("passed unit test remove_title");
    }
    else {
        console.log("failed unit test remove_title")
    };
    return chart2d1;

};
var check_add_x1andy1axisgridlines = function () {
    //TODO:
    var chart2d1 = check_add_xandyaxis();
    chart2d1.add_x1axisgridlines();
    chart2d1.add_y1axisgridlines();

    if (chart2d1.x1axisgridlines.length > 1 && chart2d1.y1axisgridlines.length > 1) {
        console.log("passed unit test add_x1axisgridlines and add_y1axisgridlines");
    }
    else {
        console.log("failed unit test add_x1axisgridlines and add_y1axisgridlines")
    };
    return chart2d1;
};
var check_set_svggcss = function () {
    var chart2d1 = check_add_xandyaxis();
    var x1axisselector = '#' + chart2d1.id + 'x1axis' + ' path';
    var y1axisselector = '#' + chart2d1.id + 'y1axis' + ' path';
    var style = {'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'};
    var selectorstyle = [{ 'selection':x1axisselector,'style':style },
                     { 'selection': y1axisselector, 'style': style }]
    chart2d1.set_svggcss(selectorstyle);

    if (chart2d1.x1axisgridlines.length > 1 && chart2d1.y1axisgridlines.length > 1) {
        console.log("passed unit test add_x1axisgridlines and add_y1axisgridlines");
    }
    else {
        console.log("failed unit test add_x1axisgridlines and add_y1axisgridlines")
    };
    return chart2d1;
};
var check_add_pointsdata1 = function () {
    var chart2d1 = check_add_xandyaxis();
    chart2d1.add_pointsdata1();

    if (chart2d1.pointsdata1enter.length > 1) {
        console.log("passed unit test add_pointsdata1");
    }
    else {
        console.log("failed unit test add_pointsdata1")
    };
    return chart2d1;
};
var check_add_legenddata1 = function () {
    var chart2d1 = check_add_xandyaxis();
    chart2d1.add_legenddata1();

    if (chart2d1.this.legendenter.length > 1) {
        console.log("passed unit test add_legenddata1");
    }
    else {
        console.log("failed unit test add_legenddata1")
    };
    return chart2d1;
};
var check_render = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data1.set_listdata(data1, ['sample_name_abbreviation']);
    d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.render = function () {
        this.set_data1ids('ale_time', 'rate', 'sample_name_abbreviation', '');
        this.set_id('chart2d1');
        this.set_tileid('tile1');
        this.set_data1ids('ale_time', 'rate', 'sample_name_abbreviation', '');
        this.set_margin({ top: 50, right: 150, bottom: 30, left: 40 });
        this.set_width(990);
        this.set_height(500);
        this.add_chart2d2tile();
        this.add_data1(d3data1);
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.set_colorscale();
        this.add_pointsdata1();
        //this.add_legenddata1();
    };
    chart2d1.render();
    if (chart2d1.pointsdata1enter.length > 1) {
        console.log("passed unit test render");
    }
    else {
        console.log("failed unit test render")
    };
    return chart2d1;
};
var check_lengendupdate = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data1.set_listdata(data1, ['sample_name_abbreviation']);
    d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1ids('ale_time', 'rate', 'sample_name_abbreviation', '');
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_data1ids('ale_time', 'rate', 'sample_name_abbreviation', '');
    chart2d1.set_margin({ top: 50, right: 150, bottom: 30, left: 40 });
    chart2d1.set_width(990);
    chart2d1.set_height(500);
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
        this.set_colorscale();
        this.add_pointsdata1();
        this.add_legenddata1();
        this.add_legenddata1filter();
    };
    chart2d1.render();
    if (chart2d1.legendenter.length > 1) {
        console.log("passed unit test add_legened");
    }
    else {
        console.log("failed unit test add_legened")
    };
    return chart2d1;
}
var check_add_pointsdata1onfill = function () {
    var chart2d1 = check_add_pointsdata1();
    chart2d1.add_pointsdata1onfill();

    return chart2d1;
};
var check_add_tooltip = function () {
    var chart2d1 = check_add_xandyaxis();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.add_pointsdata1tooltip();
    //TODO
};

var check_convert_list2nestlist = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data1.set_listdata(data1, ['sample_name_abbreviation']);

    if (d3data1.nestdatafiltered > 1) {
        console.log("passed unit test convert_list2nestlist");
    }
    else {
        console.log("failed unit test convert_list2nestlist")
    };
    return d3data1;

};
var check_reset_filters = function () {
    var d3data1 = check_convert_list2nestlist();
    d3data1.reset_filters();

    if (d3data1.filters.length > 1) {
        console.log("passed unit test reset_filters");
    }
    else {
        console.log("failed unit test reset_filters")
    };
    return d3data1;

};
var check_filter_stringdata = function () {
    var d3data1 = check_reset_filters();
    d3data1.change_filters({
        'sample_name_abbreviation': ["OxicEvo04pgiEvo01EcoliGlc",
            "OxicEvo04pgiEvo02EcoliGlc",
            "OxicEvo04pgiEvo07EcoliGlc"],
        'SNP_icd_1195528':['false']
    });
    d3data1.filter_stringdata();

    if (d3data1.nestdatafiltered.length === 1) {
        console.log("passed unit test filter_stringdata");
    }
    else {
        console.log("failed unit test filter_stringdata")
    };
    return d3data1;

};
var check_list2nest = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name', 'experimentor_id','id','exp_type_id']);
    d3data1.set_listdata(nest_test, ['id','exp_type_id']);
    d3data1.reset_filters();
    d3data1.filter_stringdata();

    if (d3data1.nestdatafiltered.length === 1) {
        console.log("passed unit test filter_stringdata");
    }
    else {
        console.log("failed unit test filter_stringdata")
    };
    return d3data1;

};