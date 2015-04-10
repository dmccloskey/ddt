var d3_data = function () {
    //data function
    this.keys = []; // list of columns that can be applied as nest keys and filters
    this.nestkey = ''; // key to apply to nest
    this.filters = {}; // {key1:[string1,string2,...],...}
    this.listdata = []; // data in database table form (must contain a column "_used");
    this.listdatafiltered = []; // data in database table form
    this.nestdatafiltered = []; // data in nested form
};
d3_data.prototype.convert_list2nestlist = function (data_I,key_I) {
    // convert a list of objects to a d3 nest by a key
    var nesteddata_O = d3.nest()
        .key(function (d) { return d[key_I]; })
        //.rollup()
        .entries(data_I);
    return nesteddata_O;
};
d3_data.prototype.convert_list2nestmap = function (data_I,key_I) {
    // convert a list of objects to a d3 nest by a key
    var nesteddata_O = d3.nest()
        .key(function (d) { return d[key_I]; })
        //.rollup()
        .map(data_I);
    return nesteddata_O;
};
d3_data.prototype.filter_stringdata = function () {
    // apply filters to listdata

    var listdatacopy = this.listdata;
    var listdatafiltered_O = [];
    
    //set _used to false:
    for (i = 0; i < listdatacopy.length; i++) {
        listdatacopy[i]['used_'] = true;
    };

    //pass each row through the filter
    for (i = 0; i < listdatacopy.length; i++) {
        for (filter in this.filters) {
            //console.log(filter);
            var str_compare = listdatacopy[i][filter].toString(); //ensure that the value is a string
            if (!str_compare.match(this.filters[filter].join('|'))) {
                listdatacopy[i]['used_'] = false;
            };
        };
    };

    // add in the filtered data
    listdatacopy.forEach(function (d) {
        if (d['used_']) {
            listdatafiltered_O.push(d)
        };
    });

    // re-make the nestdatafiltered
    this.listdatafiltered = listdatafiltered_O;
    this.nestdatafiltered = this.convert_list2nestlist(listdatafiltered_O,this.nestkey);
};
d3_data.prototype.set_listdata = function (listdata_I,nestkey_I) {
    // set list data and initialize filtered data
    this.nestkey = nestkey_I;
    this.listdata = listdata_I;
    this.listdatafiltered = listdata_I;
    this.nestdatafiltered = this.convert_list2nestlist(listdata_I,this.nestkey);
};
d3_data.prototype.set_keys = function (keys_I) {
    // add list data
    this.keys = keys_I;
};
d3_data.prototype.reset_filters = function () {
    // generate the initial filter

    var filters = {};
    for (key_cnt = 0; key_cnt < this.keys.length;key_cnt++) {
        var colentries = d3.set();
        for (i = 0; i < this.listdata.length; i++) {
            colentries.add(this.listdata[i][this.keys[key_cnt]]);
        };
        filters[this.keys[key_cnt]] = colentries.values();
    };
    this.filters = filters;
};
d3_data.prototype.clear_data = function () {
    // add list data
    this.listdata = [];
    this.listdatafiltered = [];
    this.nestdatafiltered = [];
};
d3_data.prototype.change_filters = function (filter_I) {
    // modify the filter according to the new filter
    
    for (key in filter_I) {
        this.filters[key] = filter_I[key];
    };
};
d3_tile = function () {
    // generic d3_tile element
    this.containerid = 'container'
    this.tileid = '';
    this.rowid = '';
    this.colid = '';
    this.rowclass = '';
    this.colclass = '';
    this.tile = null;
    this.width = 1;
    this.height = 1;
};
d3_tile.prototype.set_tileid = function (tileid_I) {
    // set d3_tile id
    this.tileid = tileid_I;
};
d3_tile.prototype.set_rowid = function (rowid_I) {
    // set row id
    this.rowid = rowid_I;
};
d3_tile.prototype.set_colid = function (colid_I) {
    // set column id
    this.colid = colid_I;
};
d3_tile.prototype.set_rowclass = function (rowclass_I) {
    // set row class
    this.rowclass = rowclass_I;
};
d3_tile.prototype.set_colclass = function (colclass_I) {
    // set column class
    this.colclass = colclass_I;
};
d3_tile.prototype.add_tile2container = function () {
    // set column id
    var row = d3.select("#" + this.containerid).append("div").attr("class", this.rowclass).attr("id", this.rowid);
    var col = row.append("div").attr("class", this.colclass).attr("id", this.colid);
    this.tile = col.append("div").attr("id", this.tileid);
};
d3_tile.prototype.add_tile2col = function () {
    // set column id
    var col = d3.select("#" + this.rowid).append("div").attr("class", this.colclass).attr("id", this.colid);
    this.tile = col.append("div").attr("id", this.tileid);
};
d3_tile.prototype.set_height = function () {
    // set d3_tile height
};
d3_tile.prototype.add_draganddrop = function () {
    // add file drag and drop for input
};
d3_tile.prototype.add_textarea = function () {
    // add text area for input
};
d3_tile.prototype.add_checkbox = function () {
    // add checkbox for input
};
d3_tile.prototype.add_color = function () {
    // add color pallet for input
};
d3_tile.prototype.add_range = function () {
    // add range slider for input
};
d3_tile.prototype.add_submitbutton = function () {
    // add submit button
};
d3_tile.prototype.add_table = function () {
    // add button for output
};
d3_tile.prototype.add_svg = function () {
    // add svg for interaction
};
d3_tile.prototype.add_chart2d = function () {
    // add chart for interaction
};
d3_tile.prototype.add_map2d = function () {
    // add chart for interaction
};
d3_svg = function () {
    // generic chart
    this.id = '';
    this.tileid = '';
    this.svgelement = null;
    this.svgg = null;
    this.margin = {};
    this.width = 1;
    this.height = 1;
};
d3_svg.prototype.set_tileid = function (tileid_I) {
    // set svg tile id
    this.tileid = tileid_I;
};
d3_svg.prototype.set_id = function (id_I) {
    // set svg id
    this.id = id_I;
};
d3_svg.prototype.set_margin = function (margin_I) {
    // set margin properties
    this.margin = margin_I;
};
d3_svg.prototype.set_width = function (width_I) {
    // set width properties
    this.width = width_I;
};
d3_svg.prototype.set_height = function (height_I) {
    // set height properties
    this.height = height_I;
};
d3_svg.prototype.add_svgelement2tile = function () {
    // add svg element to parent tile

    this.svgelement = d3.select('#'+this.tileid)
        .append("svg").attr("id",this.id);

    this.svgelement.attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    this.svgg = this.svgelement
        .append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

};
d3_svg.prototype.add_svgexportbutton2tile = function () {
    // add button to export the svg element
    var svgexportbutton = d3.select('#'+this.tileid).append("form");

    var svgexportbutton_label = svgexportbutton.append("label");
    svgexportbutton_label.text("Export as SVG");

    var svgexportbutton_input = svgexportbutton.append("input");
    svgexportbutton_input.attr("type", "button")
        .attr("value", "Download");
    svgexportbutton_input.on("click", this.export_svgelement);

};
d3_svg.prototype.export_svgelement = function () {
    // export the svg element

    //Input:
    // do_beautify = boolean (requires beautify plugin)

    var do_beautify_I = true;
    var a = document.createElement('a'), xml, ev;
    var id = this.id;
    a.download = 'figure' + '.svg'; // file name
    // convert node to xml string
    //xml = (new XMLSerializer()).serializeToString(d3.select(svg_sel).node()); //div element interferes with reading the svg file in illustrator/pdf/inkscape
    //xml = (new XMLSerializer()).serializeToString(this.svgelement[0][0]);
    var form = d3.select(this.parentNode);
    var tile = form.node().parentNode;
    // find the index of the svg element
    var svgid = null;
    for (i = 0; i < tile.children.length; i++) {
        if (tile.children[i].nodeName === 'svg') {
            svgid = i;};
    };
    xml = (new XMLSerializer()).serializeToString(tile.children[svgid]);
    if (do_beautify_I) xml = vkbeautify.xml(xml);
    xml = '<?xml version="1.0" encoding="utf-8"?>\n \
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n \
        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + xml;
    a.setAttribute("href-lang", "image/svg+xml");
    a.href = 'data:image/svg+xml;base64,' + utf8_to_b64(xml); // create data uri
    // <a> constructed, simulate mouse click on it
    ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);

    // definitions
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
};
d3_svg.prototype.add_datalist2tile = function (datalist_valuetext_I) {
    // add datalist (menu) for input

    var tileid = this.tileid;

    var datalist = d3.select('#'+this.tileid).append("select")
        .attr("id", tileid + 'datalist');

    for (i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };

};
d3_map2d = function () {
    // generic map
    this.id = '';
    this.margin = {};
    this.width = 1;
    this.height = 1;
    this.duration = 1;
    this.mapprojection = null;
    this.xnscale = null; //x scale for each data type
    this.ynscale = null; //y scale for each data type
    this.mapcolorscale = null;
    this.datancolorscale = null; //color scale for each data type
    this.mapdata = {};
    this.datan = {}; //container for each data type
};
d3_map2d.prototype = Object.create(d3_svg.prototype);
d3_map2d.prototype.constructor = d3_map2d;
d3_map2d.prototype.set_svgelement = function () {
    // set svg element
};
d3_map2d.prototype.set_title = function () {
    // set chart title
};
d3_map2d.prototype.set_margin = function () {
    // set margin properties
};
d3_map2d.prototype.set_width = function () {
    // set width properties
};
d3_map2d.prototype.set_height = function () {
    // set height properties
};
d3_map2d.prototype.add_svgexport = function () {
    //add svg element export
};
d3_chart2d = function () {
    // generic chart
    d3_svg.call(this);
    //this.svgdata = null;
    this.svgenter = null;
    //this.svgsvg = null;
    this.svgg = null;
    this.duration = 1;
    this.x1scale = null;
    this.y1scale = null;
    this.x2scale = null;
    this.y2scale = null;
    this._x1axis = null;
    this._x2axis = null;
    this._y1axis = null;
    this._y2axis = null;
    this.x1axis = null;
    this.x2axis = null;
    this.y1axis = null;
    this.y2axis = null;
    this.colorscale = null;
    this.data1 = null; //d3_data
    this.data2 = null; //d3_data
    this.clippath = null;
    this.title = null;
    this.x1axisgridlines = null;
    this.y1axisgridlines = null;
    this.x1axisgridlinesenter = null;
    this.y1axisgridlinesenter = null;
    this.tooltip = null;
    this.pointsdata1 = null;
    this.pointsdata2 = null;
    this.pointsdata1enter = null;
    this.pointsdata2enter = null;
    this.legenddata1 = null;
    this.legenddata1enter = null;
    this.render = null; // function defining the calls to make the chart
    this.filterdata1and2 = false;
    this.keymap = {}; // mapping of keys to data element, chart elements, or other descriptor

};
d3_chart2d.prototype = Object.create(d3_svg.prototype);
d3_chart2d.prototype.constructor = d3_chart2d;
d3_chart2d.prototype.set_filterdata1and2 = function(filterdata1and2_I){
    // filter data 1 and 2 together based on the same series label
    this.filterdata1and2 = filterdata1and2_I;
};
d3_chart2d.prototype.add_chart2d2tile = function(){
    // add char2d to tile

    this.svgelement = d3.select('#' + this.tileid).selectAll("svg")
        .data([this.data1.listdatafiltered]);
    this.svgenter = this.svgelement.enter()
        .append("svg")
        .attr("id", this.id)
        .append('g')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.svgelement.attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_chart2d.prototype.add_title = function (title_I) {
    // add chart title
    this.title = this.svgg.append("text")
    .attr("x", this.width / 2)
    .attr("y", -this.margin.top / 2)
    .attr("class", "title")
    .attr("id", this.id+"title")
    .style("text-anchor", "middle")
    .text(title_I);
};
d3_chart2d.prototype.remove_title = function () {
    // remove chart title
    this.title.remove();
    this.title = null;
};
d3_chart2d.prototype.add_clippath = function () {
    // add clippath to chart
    this.clippath = this.svgenter.append("clippath")
        .attr("class", "clippath")
        .attr("id", this.id + "clippath")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("pointer-events", "all");
};
d3_chart2d.prototype.remove_clippath = function () {
    // remove clippath from chart
    this.clippath.node().parentNode.remove();
    this.clippath = null;
};
d3_chart2d.prototype.set_x1range = function (scale_I) {
    // set x1-range of the plot
    if (scale_I === 'linear') {
        this.x1scale = d3.scale.linear().range([0,this.width]);
    } else if (scale_I === 'ordinal') {
        this.x1scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        this.x1scale = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);;
    };
};
d3_chart2d.prototype.set_y1range = function (scale_I) {
    // set y1-range of the plot
    if (scale_I === 'linear') {
        this.y1scale = d3.scale.linear().range([this.height, 0])
    };
};
d3_chart2d.prototype.set_x2range = function (scale_I) {
    // set x2-range of the plot
    if (scale_I === 'linear') {
        this.x2scale = d3.scale.linear().range([0, this.width])
    } else if (scale_I === 'ordinal') {
        this.x2scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        this.x2scale = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);;
    };
};
d3_chart2d.prototype.set_y2range = function (scale_I) {
    // set y1-range of the plot
    if (scale_I === 'linear') {
        this.y2scale = d3.scale.linear().range([this.height, 0])
    }
};
d3_chart2d.prototype.add_data1 = function (data1_I) {
    //add data1
    this.data1 = data1_I;
};
d3_chart2d.prototype.add_data2 = function (data2_I) {
    //add data2 element export
    this.data2 = data2_I;
};
d3_chart2d.prototype.set_x1domain = function () {
    // set x1-domain of the plot
    var x_data = this.data1keymap.xdata;
    var _this = this;
    this.x1scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[x_data]; })).nice();
};
d3_chart2d.prototype.set_y1domain = function () {
    // set y1-domain of the plot
    var y_data = this.data1keymap.ydata;
    var _this = this;
    var data1 = [];
    // required to prevent error bars from being cutoff
    if (this.data1keymap.ydatamin && this.data1keymap.ydatamax){
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
            data1.push(d[_this.data1keymap.ydatamin]);
            data1.push(d[_this.data1keymap.ydatamax]);
        })
    } else if (this.data1keymap.ydatalb && this.data1keymap.ydataub){
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
            data1.push(d[_this.data1keymap.ydatalb]);
            data1.push(d[_this.data1keymap.ydatalb]);
        })
    } else{
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
        })
    };
    //this.y1scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[y_data]; })).nice();
    this.y1scale.domain(d3.extent(data1)).nice();
};
d3_chart2d.prototype.set_x2domain = function () {
    // set x1-domain of the plot
    var x_data = this.data2keymap.xdata;
    var _this = this;
    this.x2scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[x_data]; })).nice();
};
d3_chart2d.prototype.set_y2domain = function () {
    // set y2-domain of the plot
    var y_data = this.data2keymap.ydata;
    var _this = this;
    var data2 = [];
    // required to prevent error bars from being cutoff
    if (this.data2keymap.ydatamin && this.data2keymap.ydatamax){
        _this.data2.listdatafiltered.forEach(function(d){
            data2.push(d[y_data]);
            data2.push(d[_this.data2keymap.ydatamin]);
            data2.push(d[_this.data2keymap.ydatamax]);
        })
    } else if (this.data2keymap.ydatalb && this.data2keymap.ydataub){
        _this.data2.listdatafiltered.forEach(function(d){
            data2.push(d[y_data]);
            data2.push(d[_this.data2keymap.ydatalb]);
            data2.push(d[_this.data2keymap.ydatalb]);
        })
    } else{
        _this.data2.listdatafiltered.forEach(function(d){
            data2.push(d[y_data]);
        })
    };
    this.y2scale.domain(d3.extent(data2)).nice();
};
d3_chart2d.prototype.get_uniquelabels = function (data_I,label_I){
    // extract out unique series labels from listdatafiltered
    var label = label_I;
    var labels_unique = d3.set();
    data_I.forEach(function(d){
        labels_unique.add(d[label]);
        });
    return labels_unique.values();
}
d3_chart2d.prototype.set_x1x2domain_verticalbarsplot = function () {
    // set x1-domain and x1-domain for a barplot
    var series_label = this.data1keymap.serieslabel;
    var nestdatafiltered = this.data1.nestdatafiltered;
    var listdatafiltered = this.data1.listdatafiltered;
    this.x1scale.domain(nestdatafiltered.map(function (d) { return d.key; }));
    var x1scale = this.x1scale;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);
//     var series_labels_unique = d3.set();
//     this.data1.listdatafiltered.forEach(function(d){
//         series_labels_unique.add(d[series_label]);
//         });
    this.x2scale.domain(series_labels_unique).rangeRoundBands([0,x1scale.rangeBand()]);
};
d3_chart2d.prototype.copy_x1scalestox2scales = function () {
    // copy x1 scale to x2scale
    this.x2scale = this.x1scale;
};
d3_chart2d.prototype.copy_y1scalestoy2scales = function () {
    // copy y1 scale to y2scale
    this.y2scale = this.y1scale;
};
d3_chart2d.prototype.set_colorscale = function (colorscale_I,colorcategory_I,colordomain_I,colordatalabel_I) {
    // set color scale
    // INPUT:
    //  colorscale_I = ordinal (default), quantile
    //  colordomain_I = [] e.g., [0,1000],[-1000,1000],[-10,0,10],[0.0,0.5,1.0]
    //                           'min,0,max'
    //  colorcategory_I = category10, category20, category20a, category20b, category20c
    //                    brewer, heatmap21, heatmap10


    // custom colorscale
    var heatmap21 = ["#081d58", "#162876", "#253494", "#23499E", "#2253A3", "#225ea8", "#1F77B4", "#1d91c0", "#2FA3C2", "#38ACC3", "#41b6c4", "#60C1BF", "#7fcdbb", "#91D4B9", "#A3DBB7", "#c7e9b4", "#DAF0B2", "#E3F4B1", "#edf8b1", "#F6FBC5", "#ffffd9"];
    var heatmap10 = ["#081d58", "#253494", "#2253A3", "#1F77B4", "#2FA3C2", "#7fcdbb", "#A3DBB7", "#DAF0B2", "#edf8b1", "#ffffd9"]; //specific to resequencing data (domain 0.0-1.0)


    var listdatafiltered = this.data1.listdatafiltered;
    if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='colorbrewer'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(colorbrewer.YlGnBu[9]);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='heatmap21'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap21);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='heatmap10'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap10);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='colorbrewer'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).range(colorbrewer.YlGnBu[9]);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category10c'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category10c();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20a'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20a();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20b'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20b();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20c'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20c();
    }else if (colorscale_I==='quantile' && colorcategory_I==='colorbrewer'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).range(colorbrewer.YlGnBu[10]);
    }else if (colorscale_I==='quantile' && colorcategory_I==='category10c'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category10c();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20a'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20a();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20b'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20b();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20c'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20c();
    }else{
        this.colorscale = d3.scale.category20c();
    };
};
d3_chart2d.prototype.set_x1axis = function () {
    //x1 axis properties
    this._x1axis = d3.svg.axis().scale(this.x1scale)
            .orient("bottom");
};
d3_chart2d.prototype.set_x1x2axis = function () {
    //x1 and x2 axis properties using data1
    this._x1axis = d3.svg.axis().scale(this.x1scale)
            .orient("bottom");
    this._x2axis = d3.svg.axis().scale(this.x1scale)
            .orient("top");
};
d3_chart2d.prototype.set_x2axis = function () {
    //x2 axis properties
    this._x2axis = d3.svg.axis().scale(this.x2scale)
            .orient("top");
};
d3_chart2d.prototype.set_y1axis = function () {
    //y1 axis properties
    this._y1axis = d3.svg.axis()
            .scale(this.y1scale)
            .orient("left");
};
d3_chart2d.prototype.set_y1y2axis = function () {
    //y1 and y2 axis properties using data1
    this._y1axis = d3.svg.axis()
            .scale(this.y1scale)
            .orient("left");
    this._y2axis = d3.svg.axis()
            .scale(this.y1scale)
            .orient("right");
};
d3_chart2d.prototype.set_y2axis = function () {
    //y2 axis properties
    this._y2axis = d3.svg.axis()
            .scale(this.y2scale)
            .orient("right");
};
d3_chart2d.prototype.add_x1axis = function () {
    //add x1 axis
    this.x1axis = this.svgenter.append("g")
            .attr("class", "x1axis")
            .attr("id", this.id + "x1axis")
            .attr("transform", "translate(0," + this.height + ")");
    this.svgg.select('g.x1axis')
            .transition()
            .call(this._x1axis);
};
d3_chart2d.prototype.add_x1x2axis = function () {
    //add x1 and x2 axis using data1
    this.x1axis = this.svgenter.append("g")
            .attr("class", "x1axis")
            .attr("id", this.id + "x1axis")
            .attr("transform", "translate(0," + this.height + ")");
    this.svgg.select('g.x1axis')
            .transition()
            .call(this._x1axis);
    this.x2axis = this.svgenter.append("g")
            .attr("class", "x2axis")
            .attr("id", this.id + "x2axis");
    this.svgg.select('g.x2axis')
            .transition()
            .call(this._x2axis);
};
d3_chart2d.prototype.add_x2axis = function () {
    //add x2 axis
    this.x2axis = this.svgenter.append("g")
            .attr("class", "x2axis")
            .attr("id", this.id + "x2axis");
    this.svgg.select('g.x2axis').transition()
            .call(this._x2axis);
};
d3_chart2d.prototype.add_y1axis = function () {
    //add y1 axis
    this.y1axis = this.svgenter.append("g")
            .attr("class", "y1axis")
            .attr("id", this.id + "y1axis");
    this.svgg.select('g.y1axis') //can be used as well
            .transition()
            .call(this._y1axis);
};
d3_chart2d.prototype.add_y1y2axis = function () {
    //add y1 and y2 axis using data1
    var width = this.width;
    this.y1axis = this.svgenter.append("g")
            .attr("class", "y1axis")
            .attr("id", this.id + "y1axis");
    this.svgg.select('g.y1axis').transition()
            .call(this._y1axis);
    this.y2axis = this.svgenter.append("g")
            .attr("class", "y2axis")
            .attr("id", this.id + "y2axis")
            .attr("transform", "translate(" + width + ",0)");
    this.svgg.select('g.y2axis').transition()
            .call(this._y2axis);
};
d3_chart2d.prototype.add_y2axis = function () {
    //add y2 axis
    var width = this.width;
    this.y2axis = this.svgenter.append("g")
            .attr("class", "y2axis")
            .attr("id", this.id + "y2axis")
            .attr("transform", "translate(" + width + ",0)");

    this.svgg.select('g.y2axis').transition()
            .call(this._y2axis);
};
d3_chart2d.prototype.set_x1tickformat = function () {
    //set x1ticklabels properties
};
d3_chart2d.prototype.set_x2tickformat = function () {
    //set x2ticklabels properties
};
d3_chart2d.prototype.set_y1tickformat = function () {
    //set y1ticklabels properties
};
d3_chart2d.prototype.set_y2tickformat = function () {
    //set y2ticklabels properties
};
d3_chart2d.prototype.add_x1axisgridlines = function () {
    //x axis grid lines properties
    //TODO:
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var listdatafiltered = this.data1.listdatafiltered;

    this.x1axisgridlines = this.svgg.selectAll(".xgridlines")
      .data(this.x1scale.ticks(10));

    this.x1axisgridlines.exit().remove();

    this.x1axisgridlines.transition()
      .attr("x1", x1scale)
      .attr("x2", x1scale)
      .attr("y1", d3.min(listdatafiltered, function (d) { return d[y_data]; }))
      .attr("y2", d3.max(listdatafiltered, function (d) { return d[y_data]; }))
      .style("stroke", "#ccc");

    this.x1axisgridlinesenter = this.x1axisgridlines.enter()
      .append("line")
      .attr("class", "xgridlines")
      .attr("id", this.id + "xgridlines")
      .attr("x1", x1scale)
      .attr("x2", x1scale)
      .attr("y1", d3.min(listdatafiltered, function (d) { return d[y_data]; }))
      .attr("y2", d3.max(listdatafiltered, function (d) { return d[y_data]; }))
      .style("stroke", "#ccc");
};
d3_chart2d.prototype.add_y1axisgridlines = function () {
    //y axis grid lines properties
    //TODO:
    var x_data = this.data1keymap.ydata;
    var y1scale = this.y1scale;
    var listdatafiltered = this.data1.listdatafiltered;

    this.y1axisgridlines = this.svgg.selectAll(".ygridlines")
    .data(this.y1scale.ticks(10));

    this.y1axisgridlines.exit().remove();

    this.y1axisgridlines.transition()
        .attr("x1", d3.min(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("x2", d3.max(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("y1", y1scale)
        .attr("y2", y1scale)
        .style("stroke", "#ccc");

    this.y1axisgridlinesenter = this.y1axisgridlines.enter()
        .append("line")
        .attr("class", "ygridlines")
        .attr("id", this.id + "ygridlines")
        .attr("x1", d3.min(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("x2", d3.max(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("y1", y1scale)
        .attr("y2", y1scale)
        .style("stroke", "#ccc");
};
d3_chart2d.prototype.add_x1axislabel = function (x1axislabel_I) {
    //add x1axis label properties
    this.x1axis.append("text")
        .attr("class", "label")
        .attr("x", this.width / 2)
        .attr("y", 28)
        .style("text-anchor", "middle")
        .text(x1axislabel_I);
};
d3_chart2d.prototype.add_x2axislabel = function (x2axislabel_I) {
    //set x2axis label properties
    this.x1axis.append("text")
        .attr("class", "label")
        .attr("x", this.width / 2)
        .attr("y", -28)
        .style("text-anchor", "middle")
        .text(x2axislabel_I);
};
d3_chart2d.prototype.add_y1axislabel = function (y1axislabel) {
    //set y1axis label properties
    this.y1axis.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -28)
        .attr("x", -this.height / 2)
        .style("text-anchor", "middle")
        .text(y1axislabel);
};
d3_chart2d.prototype.add_y2axislabel = function (y2axislabel) {
    //set y2axis label properties
    this.y2axis.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 28)
        .attr("x", -this.height / 2)
        .style("text-anchor", "middle")
        .text(y2axislabel);
};
d3_chart2d.prototype.set_tooltip = function () {
    //set tooltip properties
    var series_label = this.data1keymap.serieslabel;

    this.tooltip = d3.select("#" + this.tileid)
        .append("div")
        .attr('class', 'hidden')
        .attr('id', this.id + 'tooltip')
        .append('p')
        .attr('id', this.id + 'value');
};
d3_chart2d.prototype.set_tooltipstyle = function () {
    //set tooltip css properties
    var tooltipselector = "#" + this.id + 'tooltip';
    //var tooltipstyle = {
    //        'line-height': '1',
    //        'font-weight': 'bold',
    //        'padding': '12px',
    //        'background': 'rgba(0, 0, 0, 0.8)',
    //        'color': '#fff',
    //        'border-radius': '2px'
    //};
    var tooltipstyle = {'position': 'fixed',
        'width': '200px',
        'height': 'auto',
        'padding': '10px',
        'background-color': 'white',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        'border-radius': '10px',
        '-webkit-box-shadow': '4px 4px 10px rgba(0, 0, 0, 0.4)',
        '-moz-box-shadow': '4px 4px 10px rgba(0, 0, 0, 0.4)',
        'box-shadow': '4px 4px 10px rgba(0, 0, 0, 0.4)',
        'pointer-events': 'none'
    };
    var selectionstyle = [{ 'selection': tooltipselector, 'style': tooltipstyle }];
    this.set_d3css(selectionstyle);
};
d3_chart2d.prototype.add_legenddata1filter = function () {
    //filter the data on click

    //update data and graphic upon click
    var series_label = this.data1keymap.serieslabel;
    var _this = this;

    this.legenddata1enter.on("click", function (d) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d) { filters.push(n);}; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_stringdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_stringdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_legenddata1 = function () {
    //legend properties
    //legend location is predifined

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var colorscale = this.colorscale;
    var width = this.width;
    var id = this.id;
    var listdatafiltered = this.data1.listdatafiltered;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);

    this.legenddata1 = this.svgg.selectAll('.legendelement')
        .data(series_labels_unique);

    //var legendg = this.svgg.append('g')
    //    .attr('class', 'legend')
    //    .attr('id', this.id + 'legend')
    //    .attr('transform', "translate(" + width + "," + 0 + ")");

    //this.legend = legendg.selectAll('legendelement')
    //    .data(this.data1.nestdatafiltered);

    this.legenddata1enter = this.legenddata1.enter()
         //adding the grouping here "hides" the rect and text
        .append('g')
        .attr('class', 'legendelement')
        .attr('id', function (d, i) { return id + 'legendelement' + i.toString() })
        .attr('transform', function (d, i) {
            return "translate(" + width + "," + 0 + ")";
        });

    //this.legendenterg = this.legendenter
    //    // adding the grouping here adds ungroups the rect and text from each legend element
    //    .append('g')
    //    .attr('class', 'legendelement')
    //    .attr('id', function (d, i) { return id + 'legendelement' + i.toString() })
    //    .attr('transform', function (d, i) {
    //        return "translate(" + width + "," + 0 + ")";
    //    });

    //set the legend transition
    this.legenddata1.transition()
        .attr('transform', function (d, i) {
            return "translate(" + (width + 10) + "," + 0 + ")";
        });

    //add filled rectangles
    this.legenddata1enter.append('rect')
        .attr('x', 0)
        .attr('width', 10)
        .attr('y', function (d, i) { return i * 20; })
        .attr('height', 10);

    this.legenddata1.select('rect')
        .transition()
        .attr('y', function (d, i) { return i * 20; })
        .style('fill', function (d) {
            return colorscale(d);
        });

    //annotate with text

    this.legenddata1enter.append('text')
        .attr('x', 12)
        .attr('y', function (d, i) {
            return i * 20 + 9;
        });
    this.legenddata1.select('text')
        .transition()
        .attr('x', 12)
        .attr('y', function (d, i) {
            return i * 20 + 9;
        })
        .text(function (d) {
            return d;
        });

    this.legenddata1.exit()
      .transition()
        .attr('transform', function (d, i) {
            return "translate(" + width + "," + 0 + ")";
        })
        .remove();
};
d3_chart2d.prototype.render = function () {
    //render the chart

    //your code here...
};
d3_chart2d.prototype.set_linedata1 = function (interoplate_I) {
    // set the line generator properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    this.linedata1generator = d3.svg.line()
        .interpolate(interoplate_I)
        .x(function (d) { return x1scale(d[x_data]); })
        .y(function (d) { return y1scale(d[y_data]); });
};
d3_chart2d.prototype.set_linedata2 = function (interoplate_I) {
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var x2scale = this.x2scale;
    var y2scale = this.y2scale;

    this.linedata2generator = d3.svg.line()
        .interpolate(interoplate_I)
        .x(function (d) { return x2scale(d[x_data]); })
        .y(function (d) { return y2scale(d[y_data]); });
};
d3_chart2d.prototype.add_linedata1 = function () {
    //add lines to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var linedata1generator = this.linedata1generator;

    this.linedata1 = this.svgg.selectAll(".line")
        .data(this.data1.nestdatafiltered);

    this.linedata1enter = this.linedata1.enter()
        .append("g")
        .attr("class", "line");

    this.linedata1enter.append('path')
        .attr('class', id+'lineseries')
        .attr('id', function (d,i) {
            return id+'lineseries'+i.toString();})
        .style("stroke", function (d) {
            return colorscale(d.key);
        });

    this.linedata1.select("path."+id+'lineseries')
        .style("stroke", function (d) {
            return colorscale(d.key);
        })
        .transition()
        .attr("d", function (d) {
            return linedata1generator(d.values);
        });

    this.linedata1enter.append('text')
        .attr("x", 3)
        .attr("dy", ".35em");

    this.linedata1.select("text")
        .datum(function (d) {
            return {values: d.values[d.values.length - 1]};
        })
        .attr("transform", function (d) {
            return "translate(" + x1scale(d.values[x_data]) + "," + y1scale(d.values[y_data]) + ")";
        })
        .text(function (d) {return d.key;});

    this.linedata1.exit()
      .remove();
};
d3_chart2d.prototype.add_linedata1tooltipandstroke = function () {
    // add tooltip and change in stroke color on mouseover
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.linedata1enter.on('mouseover', function (d, i) {
        d3.select(this)
            .style("stroke", 'black');
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#value")
            .text("series_label" + ": " + d.key);
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
            d3.select("#"+id+"tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_linedata1onstroke = function () {
    // add change in stroke color on mouseover
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.linedata1enter.on('mouseover', function (d, i) {
        d3.select(this).style("stroke", 'black');
        })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
        });
};
d3_chart2d.prototype.add_linedata1tooltip = function () {
    // add tooltip on mouseover
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.linedata1enter.on('mouseover', function (d, i) {
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#value")
            .text("series_label" + ": " + d.key);
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_linedata1filter = function () {
    //filter data on click

    var _this = this;
    
    this.linedata1enter.on("click", function (d, i) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d.key) { filters.push(n); }; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_stringdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_stringdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_linedata2 = function () {
    //add lines to chart
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var series_label = this.data2keymap.serieslabel;
    var x2scale = this.x2scale;
    var y2scale = this.y2scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var linedata2generator = this.linedata2generator;

    this.linedata2 = this.svgg.selectAll(".line")
        .data(this.data2.nestdatafiltered);

    this.linedata2enter = this.linedata2.enter()
        .append("g")
        .attr("class", "line");

    this.linedata2enter.append('path')
        .attr('class', id+'lineseries')
        .attr('id', function (d, i) {
            return id + 'lineseries' + i.toString();
        })
        .style("stroke", function (d) {
            return colorscale(d.key);
        });

    this.linedata2.select("path."+id+'lineseries')
        .style("stroke", function (d) {
            return colorscale(d.key);
        })
        .transition()
        .attr("d", function (d) {
            return linedata2generator(d.values);
        });

    this.linedata2enter.append('text')
        .attr("x", 3)
        .attr("dy", ".35em");

    this.linedata2.select("text")
        .datum(function (d) {
            return { values: d.values[d.values.length - 1] };
        })
        .attr("transform", function (d) {
            return "translate(" + x2scale(d.values[x_data]) + "," + y2scale(d.values[y_data]) + ")";
        })
        .text(function (d) { return d.key; });

    this.linedata2.exit().remove();
};
d3_chart2d.prototype.add_linedata2tooltipandstroke = function () {
    // add tooltip and change in stroke color on mouseover
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var series_label = this.data2keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.linedata2enter.on('mouseover', function (d, i) {
        d3.select(this)
            .style("stroke", 'black');
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#value")
            .text("series_label" + ": " + d.key);
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_linedata2onstroke = function () {
    // add change in stroke color on mouseover
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var series_label = this.data2keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.linedata2enter.on('mouseover', function (d, i) {
        d3.select(this).style("stroke", 'black');
    })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
        });
};
d3_chart2d.prototype.add_linedata2tooltip = function () {
    // add tooltip on mouseover
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var series_label = this.data2keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.linedata2enter.on('mouseover', function (d, i) {
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#value")
            .text("series_label" + ": " + d.key);
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_linedata2filter = function () {
    //filter data on click
    var series_label = this.data2keymap.serieslabel;
    var _this = this;

    this.linedata2enter.on("click", function (d, i) {
        var filters = [];
        _this.data2.filters[series_label].forEach(function (n) { if (n !== d.key) { filters.push(n); }; });
        _this.data2.filters[series_label] = filters;
        _this.data2.filter_stringdata();
        if (_this.filterdata1and2){
            _this.data1.filters[series_label] = filters;
            _this.data1.filter_stringdata();
        }
        _this.render();
    });
};
d3_chart2d.prototype.add_data1featureslabels = function () {
    //add a change in color upon moving the mouse over the point
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var colorscale = this.colorscale;
    var features_label = this.data1keymap.featureslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var id = this.id;

    //points text labels
    this.data1featureslabelstext = this.svgg.selectAll(".featureslabels")
        .data(this.data1.listdatafiltered);

    this.data1featureslabelstext
        .transition()
        .attr("x", function (d) { return x1scale(d[x_data]) + 5; })
        .attr("y", function (d) { return y1scale(d[y_data]) - 5; })
        .text(function (d) { return d[features_label]; });

    this.data1featureslabelstextenter = this.data1featureslabelstext.enter()

    this.data1featureslabelstextenter.append("text")
        .attr("class", "featureslabels")
        .attr("id", function (d) { return id + "featureslabels"+ d[features_label]; })
        .attr("x", function (d) { return x1scale(d[x_data]) + 5; })
        .attr("y", function (d) { return y1scale(d[y_data]) - 5; })
        .text(function (d) { return d[features_label]; });

    this.data1featureslabelstext.exit().remove();
};
d3_chart2d.prototype.add_pointsdata1onfill = function () {
    //add a change in color upon moving the mouse over the point
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var id = this.id;

    //change color upon mouseover/mouseout
    this.pointsdata1enter.on("mouseover", function (d, i) {
        d3.select(this).style('fill', 'red');
    })
        .on("mouseout", function (d, i) {
            d3.select(this).style("fill", colorscale(d[series_label]));
        });
};
d3_chart2d.prototype.add_pointsdata1tooltip = function () {
    //add a tooltip upon moving the mouse over the point
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var id = this.id;

    //show tooltip
    this.pointsdata1enter.on("mouseover", function (d) {
        //Update the tooltip position and value
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#" + id + "value")
            .text('x: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_pointsdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the point
    //add a change in color upon moving the mouse over the point
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var id = this.id;

    //show tooltip
    this.pointsdata1enter.on("mouseover", function (d) {
        //Change fill color
        d3.select(this).style('fill', 'red');
        //Update the tooltip position and value
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#" + id + "value")
            .text('x: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_pointsdata1seriesfilter = function () {
    //filter series on click
    var series_label = this.data1keymap.serieslabel;
    var _this = this;
    this.pointsdata1enter.on('click', function (d, i) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d[series_label]) { filters.push(n); }; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_stringdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_stringdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_pointsdata1featurefilter = function () {
    //filter feature on click
    var feature_label = this.data1keymap.featureslabel
    var _this = this;
    this.pointsdata1enter.on('click', function (d, i) {
        var filters = [];
        _this.data1.filters[feature_label].forEach(function (n) { if (n !== d[feature_label]) { filters.push(n); }; });
        _this.data1.filters[feature_label] = filters;
        _this.data1.filter_stringdata();
        if (_this.filterdata1and2){
            _this.data2.filters[feature_label] = filters;
            _this.data2.filter_stringdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_pointsdata1 = function () {
    //points properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //var pointsdata1g = this.svgg.append('g')
    //    .attr("class", "points")
    //    .attr("id", this.id + "points");

    //this.pointsdata1 = pointsdata1g.selectAll("circle")
    //    .data(this.data1.listdatafiltered);

    this.pointsdata1 = this.svgg.selectAll(".points")
        .data(this.data1.listdatafiltered);

    //this.pointsdata1enter = this.pointsdata1.enter();

    this.pointsdata1.transition()
        .attr("cx", function (d) { return x1scale(d[x_data]); })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("fill", function (d) { return colorscale(d[series_label]); });

    this.pointsdata1enter = this.pointsdata1.enter().append("circle")
    //this.pointsdata1enter.append("circle")
        .attr("class", "points")
        .attr("r", 3.5)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cx", function (d) { return x1scale(d[x_data]); })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("fill", function (d) { return colorscale(d[series_label]); });

    this.pointsdata1.exit().remove();

    //this.pointsdata1enter = this.pointsdata1.enter();
    
    //this.pointsdata1enter.append("circle")
    //    .attr("r", 3.5)
    //    .attr("id", function (d, i) { return id + "point" + i.toString(); })
    //    .attr("cx", function (d) { return x1scale(d[x_data]); })
    //    .attr("cy", function (d) { return y1scale(d[y_data]); })
    //    .style("fill", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_pointsdata2 = function () {
    //points properties
};
d3_chart2d.prototype.add_verticalbarsdata1 = function () {
    //add vertical bars to the plot

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.barlabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered)

    this.barlabelenter = this.barlabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });

    this.barsrect = this.barlabel.selectAll(".bars")
        .data(function (d) { return d.values; });

    this.barsrect.exit().remove();

    this.barsrect.transition()
        .attr("width", x2scale.rangeBand())
        .attr("x", function (d) { return x2scale(d[series_label]); })
        .attr("y", function (d) { return y1scale(Math.max(d[y_data], 0)); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .style("fill", function (d) { return colorscale(d[series_label]); });
      
    this.barsrectenter = this.barsrect.enter()
        .append("rect")
        .attr("class", "bars");

    this.barsrectenter.attr("width", x2scale.rangeBand())
        .attr("x", function (d) { return x2scale(d[series_label]); })
        .attr("y", function (d) { return y1scale(Math.max(d[y_data], 0)); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .style("fill", function (d) { return colorscale(d[series_label]); });

};
d3_chart2d.prototype.add_verticalbarsdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the bar
    //add a change in color upon moving the mouse over the bar
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var metid = this.data1keymap.featureslabel;
    var y_data = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var id = this.id;

    this.barsrectenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //Update the tooltip position and value
            d3.select("#" + id + "tooltip")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px")
                .select("#" + id + "value")
                //.text("series_label: " + d[series_label] + ', ' + "met_id: " + d[met_id] + ', ' + "Value: " + d[y_data].toFixed(2) + ', ' + "95% CI: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
                .text(d[series_label] + ': ' + "value: " + d[y_data].toFixed(2) + ', ' + "95% ci: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            //Show the tooltip
            d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_verticalbarsdata1errorbars = function () {
    //add vertical error bars to the plot
    //TODO: change from poly line to 3 lines: lb,ub,and connector

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //upperbounds: the horizontal lines representing the uppoer bounds of the confidence intervals.
    this.barsublines = this.barlabel.selectAll(".ublines")
        .data(function (d) { return d.values; });

    this.barsublines.exit().remove();

    this.barsublines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.barsublinesenter = this.barsublines.enter()
        .append("line")
        .attr("class", "ublines");

    this.barsublinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
        
    //lowerbound: the horizontal lines representing the lowerbound of the confidence intervals.
    this.barslblines = this.barlabel.selectAll(".lblines")
        .data(function (d) { return d.values; });

    this.barslblines.exit().remove();

    this.barslblines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
      
    this.barslblinesenter = this.barslblines.enter()
        .append("line")
        .attr("class", "lblines");

    this.barslblinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
        
    //connector: the vertical line connecting the confidence intervals.
    this.barslbubconnector = this.barlabel.selectAll(".lbubconnector")
        .data(function (d) { return d.values; });

    this.barslbubconnector.exit().remove();

    this.barslbubconnector.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
      
    this.barslbubconnectorenter = this.barslbubconnector.enter()
        .append("line")
        .attr("class", "lbubconnector");

    this.barslbubconnectorenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });

};
d3_chart2d.prototype.add_horizontalbars = function () {
    //add horizontal bars to the plot
};
d3_chart2d.prototype.add_horizontalerrorbars = function () {
    //add horizontal error bars to the plot
};
d3_chart2d.prototype.remove_x1axis = function () {
    //remove x1 axis
    d3.selectAll('#'+this.id + 'x1axis').remove();
    this.x1axis = null;
};
d3_chart2d.prototype.remove_x2axis = function () {
    //remove x2 axis
    d3.selectAll('#' + this.id + 'x2axis').remove();
    this.x2axis = null;
};
d3_chart2d.prototype.remove_y1axis = function () {
    //remove y1 axis
    d3.selectAll('#' + this.id + 'y1axis').remove();
    this.y1axis = null;
};
d3_chart2d.prototype.remove_y2axis = function () {
    //remove y2 axis
    d3.selectAll('#' + this.id + 'y2axis').remove();
    this.y2axis = null;
};
d3_chart2d.prototype.set_svggcss = function (selectionstyle_I) {
    //set custom css style to svgg
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (i = 0; i < selectionstyle_I.length; i++) {
        this.svgg.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_chart2d.prototype.set_d3css = function (selectionstyle_I) {
    //set custom css style to d3
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (i = 0; i < selectionstyle_I.length; i++) {
        d3.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_chart2d.prototype.set_x1andy1axesstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var style = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1andy1axesstyle_verticalbarsplot = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var x1axisstyle = {
        'fill': 'none', 'display':'none'
    };
    var y1axisstyle = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     { 'selection': y1axisselector, 'style': y1axisstyle }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1x2andy1y2axesstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var x2axisselector = '#' + this.id + 'x2axis' + ' path';
    var y2axisselector = '#' + this.id + 'y2axis' + ' path';
    var style = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style },
                     { 'selection': x2axisselector, 'style': style },
                     { 'selection': y2axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_linestyle = function () {
    // predefined css style for x1 and y1 axis
    var lineselector = 'path.'+ this.id + 'lineseries';
    var style = {
        'fill': 'none',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': lineselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_pointsstyle = function () {
    // predefined css style for points
    var pointsselector = '#' + this.id + 'points';
    var pointsstyle = {
        'stroke': 'none'
    };
    var selectorstyle = [{ 'selection': pointsselector, 'style': pointsstyle }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_data1keymap = function (data1keymap_I) {
    //set the data1 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data1keymap = data1keymap_I;
};
d3_chart2d.prototype.set_data2keymap = function (data2keymap_I) {
    //set the data2 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data2keymap = data2keymap_I;
};
d3_chart2d.prototype.add_boxandwhiskersdata1 = function () {
    //add box and whiskers to the plot
//     boxes: the main body of the boxplot showing the quartiles and the median’s confidence intervals if enabled.
//     medians: horizonal lines at the median of each box.
//     whiskers: the vertical lines extending to the most extreme, n-outlier data points.
//     caps: the horizontal lines at the ends of the whiskers.
//     fliers: points representing data that extend beyond the whiskers (outliers).
//     means: points or lines representing the means.

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var zoom = this.zoom;

    //assign the positioning of the feature labels
    this.boxandwhiskerslabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered);

    this.boxandwhiskerslabel.transition()
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });

    this.boxandwhiskerslabel.exit().remove();

    this.boxandwhiskerslabelenter = this.boxandwhiskerslabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_box = function (){
    // add box for the quartiles to box and whiskers plot

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //boxes: the main body of the boxplot showing the quartiles
    this.boxandwhiskersboxes = this.boxandwhiskerslabel.selectAll(".boxes")
        .data(function (d) { return d.values; });

    this.boxandwhiskersboxes.exit().remove();

    this.boxandwhiskersboxes.transition()
        .attr("width", x2scale.rangeBand())
        .attr("x", function (d) { return x2scale(d[series_label]); })
        .attr("y", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data_iq3])-y1scale(d[y_data_iq1])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
      
    this.boxandwhiskersboxesenter = this.boxandwhiskersboxes.enter()
        .append("rect")
        .attr("class", "boxes");

    this.boxandwhiskersboxesenter.attr("width", x2scale.rangeBand())
        .attr("x", function (d) { return x2scale(d[series_label]); })
        .attr("y", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data_iq3])-y1scale(d[y_data_iq1])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_boxandwhiskersdata1_median = function (){
    // add lines for the median to box and whiskers plot

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
        
    //medians: horizonal lines at the median of each box.
    this.boxandwhiskersmedianlines = this.boxandwhiskerslabel.selectAll(".medianlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersmedianlines.exit().remove();

    this.boxandwhiskersmedianlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_median]); })
        .attr("y2", function (d) { return y1scale(d[y_data_median]); })
        //.style("stroke", "black");
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersmedianlinesenter = this.boxandwhiskersmedianlines.enter()
        .append("line")
        .attr("class", "medianlines");

    this.boxandwhiskersmedianlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_median]); })
        .attr("y2", function (d) { return y1scale(d[y_data_median]); })
        //.style("stroke", "black");
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_mean = function (){
    // add lines for the mean to box and whiskers plot

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
        
    //means: points or lines representing the means.
//     this.boxandwhiskersmeanlines = this.boxandwhiskerslabel.selectAll(".meanlines")
//         .data(function (d) { return d.values; });

//     this.boxandwhiskersmeanlines.exit().remove();

//     this.boxandwhiskersmeanlines.transition()
//         .attr("x1", function (d) { return x2scale(d[series_label]); })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[y_data_mean]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_mean]); })
//         .style("stroke", function (d) { return colorscale(d[series_label]); });
      
//     this.boxandwhiskersmeanlinesenter = this.boxandwhiskersmeanlines.enter()
//         .append("line")
//         .attr("class", "meanlines");

//     this.boxandwhiskersmeanlinesenter
//         .attr("x1", function (d) { return x2scale(d[series_label]); })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[y_data_mean]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_mean]); })
//         .style("stroke", function (d) { return colorscale(d[series_label]); });

    this.boxandwhiskersmeancircles = this.boxandwhiskerslabel.selectAll(".meancircles")
        .data(function (d) { return d.values; });

    this.boxandwhiskersmeancircles.exit().remove();

    this.boxandwhiskersmeancircles.transition()
        .attr("r", function (d) { return x2scale.rangeBand()*0.125;})
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("cy", function (d) { return y1scale(d[y_data_mean]); })
        .style("stroke", "black")
        .style("fill", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersmeancirclesenter = this.boxandwhiskersmeancircles.enter()
        .append("circle")
        .attr("class", "meancircles");

    this.boxandwhiskersmeancirclesenter
        .attr("r", function (d) { return x2scale.rangeBand()*0.125;})
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("cy", function (d) { return y1scale(d[y_data_mean]); })
        .style("stroke", "black")
        .style("fill", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_caps = function (){
    // add lines for caps to box and whiskers plot

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //caps (max): the horizontal lines at the ends of the whiskers.
    this.boxandwhiskersmaxlines = this.boxandwhiskerslabel.selectAll(".maxlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersmaxlines.exit().remove();

    this.boxandwhiskersmaxlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_max]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersmaxlinesenter = this.boxandwhiskersmaxlines.enter()
        .append("line")
        .attr("class", "maxlines");

    this.boxandwhiskersmaxlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_max]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
        
    //caps (min): the horizontal lines at the ends of the whiskers.
    this.boxandwhiskersminlines = this.boxandwhiskerslabel.selectAll(".minlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersminlines.exit().remove();

    this.boxandwhiskersminlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_min]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersminlinesenter = this.boxandwhiskersminlines.enter()
        .append("line")
        .attr("class", "minlines");

    this.boxandwhiskersminlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_min]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_whiskers = function (){
    // add lines for whiskers to box and whiskers plot

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //whiskers (min): the vertical lines extending from the qurtiles to the most extreme, n-outlier data points.
    this.boxandwhiskerswhiskersminlines = this.boxandwhiskerslabel.selectAll(".whiskersminlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskerswhiskersminlines.exit().remove();

    this.boxandwhiskerswhiskersminlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq1]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskerswhiskersminlinesenter = this.boxandwhiskerswhiskersminlines.enter()
        .append("line")
        .attr("class", "whiskersminlines");

    this.boxandwhiskerswhiskersminlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq1]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });

    //whiskers (max): the vertical lines extending from the qurtiles to the most extreme, n-outlier data points.
    this.boxandwhiskerswhiskersmaxlines = this.boxandwhiskerslabel.selectAll(".whiskersmaxlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskerswhiskersmaxlines.exit().remove();

    this.boxandwhiskerswhiskersmaxlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskerswhiskersmaxlinesenter = this.boxandwhiskerswhiskersmaxlines.enter()
        .append("line")
        .attr("class", "whiskersmaxlines");

    this.boxandwhiskerswhiskersmaxlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_lbub = function (){
    // add lines for lb and ub to box and whiskers plot

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //upperbounds: the horizontal lines representing the uppoer bounds of the confidence intervals.
    this.boxandwhiskersublines = this.boxandwhiskerslabel.selectAll(".ublines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersublines.exit().remove();

    this.boxandwhiskersublines.transition()
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.boxandwhiskersublinesenter = this.boxandwhiskersublines.enter()
        .append("line")
        .attr("class", "ublines");

    this.boxandwhiskersublinesenter
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
        
    //lowerbound: the horizontal lines representing the lowerbound of the confidence intervals.
    this.boxandwhiskerslblines = this.boxandwhiskerslabel.selectAll(".lblines")
        .data(function (d) { return d.values; });

    this.boxandwhiskerslblines.exit().remove();

    this.boxandwhiskerslblines.transition()
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.boxandwhiskerslblinesenter = this.boxandwhiskerslblines.enter()
        .append("line")
        .attr("class", "lblines");

    this.boxandwhiskerslblinesenter
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
        
    //connector: the vertical line connecting the confidence intervals.
    this.boxandwhiskerslbubconnector = this.boxandwhiskerslabel.selectAll(".lbubconnector")
        .data(function (d) { return d.values; });

    this.boxandwhiskerslbubconnector.exit().remove();

    this.boxandwhiskerslbubconnector.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.boxandwhiskerslbubconnectorenter = this.boxandwhiskerslbubconnector.enter()
        .append("line")
        .attr("class", "lbubconnector");

    this.boxandwhiskerslbubconnectorenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
};
d3_chart2d.prototype.add_boxandwhiskersdata1tooltipandfill_box = function () {
    //add a tooltip upon moving the mouse over the box
    //add a change in color upon moving the mouse over the box
    //NOTE: both must be within the same "on" method

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.boxandwhiskersboxesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //Update the tooltip position and value
            d3.select("#" + id + "tooltip")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px")
                .select("#" + id + "value")
                .text(d[series_label] + ': ' + "median: " + d[y_data_median].toFixed(2) + ', ' + "iq1/3: " + d[y_data_iq1].toFixed(2) + "/" + d[y_data_iq3].toFixed(2) + ', ' + "min/max: " + d[y_data_min].toFixed(2) + "/" + d[y_data_max].toFixed(2));
            //Show the tooltip
            d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "none");
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_boxandwhiskersdata1tooltipandfill_mean = function () {
    //add a tooltip upon moving the mouse over the box
    //add a change in color upon moving the mouse over the box
    //NOTE: both must be within the same "on" method

    var y_data_mean = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.boxandwhiskersmeancirclesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //Update the tooltip position and value
            d3.select("#" + id + "tooltip")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px")
                .select("#" + id + "value")
                .text(d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            //Show the tooltip
            d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.set_zoom = function (){
    //add zoom
    var draw = this.draw;
    this.zoom = d3.behavior.zoom()
    .on("zoom", draw);
};
d3_chart2d.prototype.set_x1axiszoom = function(){
    //set the x1axsis scale for the zoom
    var x1scale = this.x1scale;
    this.zoom.x(x1scale);
};
d3_chart2d.prototype.set_y1axiszoom = function(){
    //set the x1axsis scale for the zoom
    var y1scale = this.y1scale;
    this.zoom.y(y1scale);
};
d3_chart2d.prototype.add_zoom = function(){
    //add zoom to svg
    var svgelement = this.svgelement;
    var zoom = this.zoom;
    this.svgelement.call(zoom);
    //this.svgenter.call(zoom);
    //this.zoom(svgelement);
};
d3_chart2d.prototype.draw = function(){
    if (this.x1axis){
        svgg.select('g.x1axis')
            .call(this._x1axis);
            };
    if (this.x2axis){
        svgg.select('g.x2axis')
            .transition()
            .call(this._x2axis);
            };
    if (this.y1axis){
        svgg.select('g.y1axis')
            .transition()
            .call(this._x1axis);
            };
    if (this.y2axis){
        svgg.select('g.y2axis')
            .transition()
            .call(this._y2axis);
            };
};
d3_chart2d.prototype.set_heatmapdata1 = function (cellsize_I) {
    //add heatmap to the plot

    var listdatafiltered = this.data1.listdatafiltered;
    var columnslabel = this.data1keymap.columnslabel;
    var rowslabel = this.data1keymap.rowslabel;
    var zdata = this.data1keymap.zdata;
    var rowsleaves = this.data1keymap.rowsleaves;
    var columnsleaves = this.data1keymap.columnsleaves;
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;
    
    //heatmap specific properties
    this.cellsize = cellsize_I;
    this.legendelementwidth = cellsize_I*1.5;

    this.uniquecollabels = this.get_uniquelabels(listdatafiltered,columnslabel);
    this.uniquerowlabels = this.get_uniquelabels(listdatafiltered,rowslabel);

    //reduce the data to index and corresponding leaves
    var collabelsset = d3.set();
    var rowlabelsset = d3.set();
    listdatafiltered.forEach(function(d){
        collabelsset.add(Math.round(d[columnsindex]));
        rowlabelsset.add(Math.round(d[rowsindex]));
        });
    var colindexmin = Math.round(d3.min(collabelsset.values()));
    var rowindexmin = Math.round(d3.min(rowlabelsset.values()));
    var colindexmax = collabelsset.values().length-1;
    var rowindexmax = rowlabelsset.values().length-1;
    var collabelsordered = [];
    var rowlabelsordered = [];
    for (i=colindexmin;i<=colindexmax;i++){
        collabelsordered.push(i);
    };
    for (i=rowindexmin;i<=rowindexmax;i++){
        rowlabelsordered.push(i);
    };
    var columnleavesordered = [];
    var rowleavesordered = [];
    for (i=0;i<collabelsordered.length;i++){
        for (j=0;j<listdatafiltered.length;j++){
            if (collabelsordered[i]===listdatafiltered[j][columnsindex]){
                columnleavesordered.push(listdatafiltered[j][columnsleaves]);
                break;
            };
        };
    };
    for (i=0;i<rowlabelsordered.length;i++){
        for (j=0;j<listdatafiltered.length;j++){
            if (rowlabelsordered[i]===listdatafiltered[j][rowsindex]){
                rowleavesordered.push(listdatafiltered[j][rowsleaves]);
                break;
            };
        };
    };
    this.columnleavesordered=columnleavesordered;
    this.rowleavesordered=rowleavesordered;

//     this.colnumber = this.uniquecollabels.length;
//     this.rownumber = this.uniquerowlabels.length;

    //define the width and height
    this.width = cellsize_I*this.uniquecollabels.length;
    this.height = cellsize_I*this.uniquerowlabels.length;

    var values = [];
    listdatafiltered.forEach(function(d){values.push(d[zdata]);});
    this.maxvalue = d3.max(values);
    this.minvalue = d3.min(values);

    //initial row/col sort order
    this.rowsortorder=false;
    this.colsortorder=false;

};
d3_chart2d.prototype.add_heatmapdata1rowlabels = function () {
    //add heatmap to the plot
    var uniquerowlabels = this.uniquerowlabels;
    var sortbylabel = this.sortbylabel;
    var rowsortorder = this.rowsortorder;
    var cellsize = this.cellsize;
    var rowleavesordered = this.rowleavesordered

    this.rowlabels = this.svgg.append("g").selectAll(".rowLabelg")
        .data(uniquerowlabels);

    this.rowlabelsenter = this.rowlabels.enter()
        .append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return rowleavesordered.indexOf(i) * cellsize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-25," + cellsize / 1.5 + ")")
        .attr("class", function (d,i) { return "rowLabel mono r"+i;} )
        .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
        .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
        .on("click", function(d,i) {
            rowsortorder=!rowsortorder; 
            sortbylabel("r",i,rowsortorder); 
            this.$('#order').property("selectedIndex", 4).node().focus();
            });

};
d3_chart2d.prototype.add_heatmapdata1columnlabels = function () {
    //add heatmap to the plot
    var uniquecollabels = this.uniquecollabels;
    var sortbylabel = this.sortbylabel;
    var colsortorder = this.colsortorder;
    var tileid = this.tileid;
    var cellsize = this.cellsize;
    var columnleavesordered = this.columnleavesordered
    var svgg = this.svgg;

    this.collabels = this.svgg.append("g").selectAll(".colLabelg")
        .data(uniquecollabels);

    this.collabelsenter = this.collabels.enter()
        .append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return columnleavesordered.indexOf(i) * cellsize; })
            .style("text-anchor", "left")
            .attr("transform", "translate("+cellsize/2 + ",-25) rotate (-90)")
            .attr("class",  function (d,i) { return "colLabel mono c"+i;} )
            .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
            .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
            .on("click", function (d, i) {
                colsortorder = !colsortorder;
                sortbylabel("c", i, colsortorder,svgg);
                this.$('#'+tileid+'datalist').property("selectedIndex", 4).node().focus(); 
                });

};
d3_chart2d.prototype.sortbylabel = function (rORc,i,sortOrder,cellsize_I,rowsindex_I,columnsindex_I,svgg_I){
    var t = svgg_I.transition().duration(3000);
    var log2r=[];
    var sorted; // sorted is zero-based index
    d3.selectAll(".c"+rORc+i)
     .filter(function(ce){
        log2r.push(ce.value);
      })
    ;
    if(rORc=="r"){ // sort log2ratio of a gene
     sorted=d3.range(col_number).sort(function(a,b){ if(sortOrder){ return log2r[b]-log2r[a];}else{ return log2r[a]-log2r[b];}});
     t.selectAll(".cell")
       .attr("x", function(d) { return sorted.indexOf(d[columnsindex_I]) * cellsize_I; })
       ;
     t.selectAll(".colLabel")
      .attr("y", function (d, i) { return sorted.indexOf(i) * cellsize_I; })
     ;
    }else{ // sort log2ratio of a contrast
     sorted=d3.range(row_number).sort(function(a,b){if(sortOrder){ return log2r[b]-log2r[a];}else{ return log2r[a]-log2r[b];}});
     t.selectAll(".cell")
       .attr("y", function(d) { return sorted.indexOf(d[rowsindex_I]) * cellsize_I; })
       ;
     t.selectAll(".rowLabel")
      .attr("y", function (d, i) { return sorted.indexOf(i) * cellsize_I; });
    };
};
d3_chart2d.prototype.heatmaporder = function (cellsize_I,value_I,
            rowsindex_I,columnsindex_I,
            rowleavesordered_I,columnleavesordered_I,
            svgg_I){
    if(value_I=="hclust"){
        var t = svgg_I.transition().duration(3000);
        t.selectAll(".cell")
            //check indexing (may need to add +1)
          .attr("x", function(d) { return columnleavesordered_I.indexOf(d[columnsindex_I]) * cellsize_I; })
          .attr("y", function(d) { return rowleavesordered_I.indexOf(d[rowsindex_I]) * cellsize_I; })
          ;

        t.selectAll(".rowLabel")
          .attr("y", function (d, i) { return rowleavesordered_I.indexOf(i) * cellsize_I; })
          ;

        t.selectAll(".colLabel")
          .attr("y", function (d, i) { return columnleavesordered_I.indexOf(i) * cellsize_I; })
          ;

    }else if (value_I=="probecontrast"){
        var t = svgg_I.transition().duration(3000);
        t.selectAll(".cell")
          .attr("x", function(d) { return (d[columnsindex_I]) * cellsize_I; })
          .attr("y", function(d) { return (d[rowsindex_I]) * cellsize_I; })
          ;

        t.selectAll(".rowLabel")
          .attr("y", function (d, i) { return i * cellsize_I; })
          ;

        t.selectAll(".colLabel")
          .attr("y", function (d, i) { return i * cellsize_I; })
          ;

    }else if (value_I=="probe"){
        var t = svgg_I.transition().duration(3000);
        t.selectAll(".cell")
          .attr("y", function(d) { return (d[rowsindex_I]) * cellsize_I; })
          ;

        t.selectAll(".rowLabel")
          .attr("y", function (d, i) { return i * cellsize_I; })
          ;
    }else if (value_I=="contrast"){
        var t = svgg_I.transition().duration(3000);
        t.selectAll(".cell")
          .attr("x", function(d) { return (d[columnsindex_I]) * cellsize_I; })
          ;
        t.selectAll(".colLabel")
          .attr("y", function (d, i) { return i * cellsize_I; })
          ;
    };
};
d3_chart2d.prototype.add_heatmapdata1 = function () {
    //add heatmap to the plot

    var listdatafiltered = this.data1.listdatafiltered;
    var columnslabel = this.data1keymap.columnslabel;
    var rowslabel = this.data1keymap.rowslabel;   
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;   
    var columnsleaves = this.data1keymap.columnsleaves;
    var rowsleaves = this.data1keymap.rowsleaves;   
    var zdata = this.data1keymap.zdata;
    var colorscale = this.colorscale;
    var cellsize = this.cellsize

    this.heatmap = this.svgg.append("g")
        .attr("class","g3")
        .selectAll(".cellg")
        .data(listdatafiltered,function(d){return d[rowsindex]+":"+d[columnsindex];});
    
    this.heatmapenter = this.heatmap
        .enter()
        .append("rect")
        .attr("x", function(d) { return d[columnsleaves] * cellsize; })
        .attr("y", function(d) { return d[rowsleaves] * cellsize; })
        .attr("class", function(d){return "cell cell-border cr"+(d[rowsindex])+" cc"+(d[columnsindex]);})
        .attr("width", cellsize)
        .attr("height", cellsize)
        .style("fill", function(d) { return colorscale(d[zdata]); });
};
d3_chart2d.prototype.add_heatmapdata1animation = function () {
    //add animation to heatmapdata1

    var sa=d3.select(".g3")
      .on("mousedown", function() {
          if( !d3.event.altKey) {
             d3.selectAll(".cell-selected").classed("cell-selected",false);
             d3.selectAll(".rowLabel").classed("text-selected",false);
             d3.selectAll(".colLabel").classed("text-selected",false);
          }
         var p = d3.mouse(this);
         sa.append("rect")
         .attr({
             rx      : 0,
             ry      : 0,
             class   : "selection",
             x       : p[0],
             y       : p[1],
             width   : 1,
             height  : 1
         })
      })
      .on("mousemove", function() {
         var s = sa.select("rect.selection");

         if(!s.empty()) {
             var p = d3.mouse(this),
                 d = {
                     x       : parseInt(s.attr("x"), 10),
                     y       : parseInt(s.attr("y"), 10),
                     width   : parseInt(s.attr("width"), 10),
                     height  : parseInt(s.attr("height"), 10)
                 },
                 move = {
                     x : p[0] - d.x,
                     y : p[1] - d.y
                 }
             ;

             if(move.x < 1 || (move.x*2<d.width)) {
                 d.x = p[0];
                 d.width -= move.x;
             } else {
                 d.width = move.x;
             }

             if(move.y < 1 || (move.y*2<d.height)) {
                 d.y = p[1];
                 d.height -= move.y;
             } else {
                 d.height = move.y;
             }
             s.attr(d);

                 // deselect all temporary selected state objects
             d3.selectAll('.cell-selection.cell-selected').classed("cell-selected", false);
             d3.selectAll(".text-selection.text-selected").classed("text-selected",false);

             d3.selectAll('.cell').filter(function(cell_d, i) {
                 if(
                     !d3.select(this).classed("cell-selected") &&
                         // inner circle inside selection frame
                     (this.x.baseVal.value)+cellsize >= d.x && (this.x.baseVal.value)<=d.x+d.width &&
                     (this.y.baseVal.value)+cellsize >= d.y && (this.y.baseVal.value)<=d.y+d.height
                 ) {

                     d3.select(this)
                     .classed("cell-selection", true)
                     .classed("cell-selected", true);

                     d3.select(".r"+(cell_d[rowsindex]))
                     .classed("text-selection",true)
                     .classed("text-selected",true);

                     d3.select(".c"+(cell_d[columnsindex]))
                     .classed("text-selection",true)
                     .classed("text-selected",true);
                 }
             });
         }
      })
      .on("mouseup", function() {
            // remove selection frame
         sa.selectAll("rect.selection").remove();

             // remove temporary selection marker class
         d3.selectAll('.cell-selection').classed("cell-selection", false);
         d3.selectAll(".text-selection").classed("text-selection",false);
      })
      .on("mouseout", function() {
         if(d3.event.relatedTarget.tagName=='html') {
                 // remove selection frame
             sa.selectAll("rect.selection").remove();
                 // remove temporary selection marker class
             d3.selectAll('.cell-selection').classed("cell-selection", false);
             d3.selectAll(".rowLabel").classed("text-selected",false);
             d3.selectAll(".colLabel").classed("text-selected",false);
         }
      });

};
d3_chart2d.prototype.add_heatmapdata1tooltipandfill = function () {
    //add tooltip and fill on cell mouseover

    var listdatafiltered = this.data1.listdatafiltered;
    var columnslabel = this.data1keymap.columnslabel;
    var rowslabel = this.data1keymap.rowslabel;   
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;   
    var zdata = this.data1keymap.zdata;
    var colorscale = this.colorscale;
    var id = this.id;

    this.heatmapenter
        .on("mouseover", function(d){
               //highlight text
               d3.select(this).classed("cell-hover",true);
               d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ return ri==(d[rowsindex]);});
               d3.selectAll(".colLabel").classed("text-highlight",function(c,ci){ return ci==(d[columnsindex]);});
            //Update the tooltip position and value
                d3.select("#" + id + "tooltip")
                 .style("left", (d3.event.pageX+10) + "px")
                 .style("top", (d3.event.pageY-10) + "px")
                     .select("#" + id + "value")
                     .text(rowslabel + ": " + d[rowslabel] + ",\n" + columnslabel + ": " + d[columnslabel] + ",\n" + zdata + ": " + d[zdata]);
                     //.text(d[rowslabel]+","+d[columnslabel]+"\ndata:"+d[zdata]);
            //Show the tooltip
               d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function(){
               d3.select(this).classed("cell-hover",false);
               d3.selectAll(".rowLabel").classed("text-highlight",false);
               d3.selectAll(".colLabel").classed("text-highlight", false);
               d3.select("#" + id + "tooltip").classed("hidden", true);
        });

};
d3_chart2d.prototype.add_heatmapdata1legend = function(){
    // add lengend to the heatmap

    var listdatafiltered = this.data1.listdatafiltered;
    var columnslabel = this.data1keymap.columnslabel;
    var rowslabel = this.data1keymap.rowslabel;   
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;   
    var zdata = this.data1keymap.zdata;
    var colorscale = this.colorscale;
    var id = this.id;
    var minvalue = this.minvalue;
    var maxvalue = this.maxvalue;
    var legendelementwidth = this.legendelementwidth;
    var cellsize = this.cellsize;
    var height = this.height;
    var width = this.width;

    var colorfactor = Math.ceil(colorscale.length / (maxvalue - minvalue));
    if (minvalue===0.0 && maxvalue ===1.0){
        this.legenddata1 = this.svgg.selectAll(".legend")
          .data(d3.range(minval, maxval, (maxval - minval) / 10)); //specific to resequencing data (domain 0.0-1.0)
        this.legenddata1enter = this.legenddata1
          .enter().append("g")
          .attr("class", "legend");
        colorfactor = 1.0;
    } else{
        this.legenddata1 = this.svgg.selectAll(".legend")
          .data(d3.range(Math.floor(minvalue), Math.ceil(maxvalue))); //use for expression data (domain -10.0-10.0)
        this.legenddata1enter = this.legenddata1
          .enter().append("g")
          .attr("class", "legend");
          };
    
    this.legenddata1.exit().remove();

    this.legenddata1.select("rect").transition()
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 2))
        .attr("width", legendelementwidth)
        .attr("height", cellsize)
        .style("fill", function (d, i) { return colorscale[i * colorfactor]; });

    this.legenddata1enter.append("rect")
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 2))
        .attr("width", legendelementwidth)
        .attr("height", cellsize)
        .style("fill", function (d, i) { return colorscale[i * colorfactor]; });

    this.legenddata1.select("text").transition()
        .attr("class", "mono")
        .text(function (d) { return d; })
        .attr("width", legendelementwidth)
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 4));

    this.legenddata1enter.append("text")
        .attr("class", "mono")
        .text(function (d) { return d; })
        .attr("width", legendelementwidth)
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 4));

};
d3_chart2d.prototype.add_heatmapdata1datalist = function (){
    // att data list (menu) to tile for the heatmap
    var tileid = this.tileid;
    var heatmaporder = this.heatmaporder;
    var svgg = this.svgg;
   
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;
    var cellsize = this.cellsize;
    var columnleavesordered = this.columnleavesordered;
    var rowleavesordered = this.rowleavesordered;

    d3.select("#"+tileid+"datalist").on("change",function(){
        heatmaporder(cellsize,this.value,
            rowsindex,columnsindex,
            rowleavesordered, columnleavesordered,svgg);
    });
}
d3_chart2d.prototype.set_heatmapdata1css = function () {
    //set predefined heatmap style

    var selector1 = '#' + this.id + ' rect.selection';
    var style1 = {
        'stroke': '#333',
        'stroke-dasharray': '4px',
        'stroke-opacity': '0.5',
        'fill': 'transparent'
    };
    var selector2 = '#' + this.id + ' rect.cell-border';
    var style2= {
        'stroke': '#eee',
        'stroke-width': '0.3px'
    };
    var selector3 = '#' + this.id + ' rect.cell-selected';
    var style3 = {
        'stroke': 'rgb(51,102,153)',
        'stroke-width': '0.5px'
    };
    var selector4 = '#' + this.id + ' rect.cell-hover';
    var style4 = {
        'stroke': '#F00',
        'stroke-width': '0.3px'
    };
    var selector5 = '#' + this.id + ' text.mono';
    var style5 = {
        'font-size': '10pt',
        'font-family': 'Consolas, courier',
        'fill': '#aaa'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 },
                     { 'selection': selector2, 'style': style2 },
                     { 'selection': selector3, 'style': style3 },
                     { 'selection': selector4, 'style': style4 },
                     { 'selection': selector5, 'style': style5 }];
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_diameter(diameter_I){
    // set uniform width and height
    this.width = diameter_I;
    this.height= diameter_I;
}
d3_chart2d.prototype.set_packlayout = function(padding_I){
    //set pack layout
    var margin = this.margin;
    var width = this.width;
    var height = this.height;

    this.packlayout = d3.layout.pack()
        .padding(padding_I),
        .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
        .value(function(d) { return d.size; })
};
d3_chart2d.prototype.set_packlayoutfocusdata1 = function(packlayoutfocus_I){
    //set pack layout focus
    if (packlayoutfocus_I){this.packlayoutfocus = packlayoutfocus_I;}
    else {this.packlayoutfocus=this.data1.nestdatafiltered};    
};
d3_chart2d.prototype.set_packlayoutnodesdata1 = function(){
    //set pack layout nodes
    this.packlayoutnodes = this.packlayout.nodes(this.data1.nestdatafiltered);
};
d3_chart2d.prototype.set_packlayoutviewdata1 = function(packlayoutview_I){
    //set pack layout view
    if (packlayoutview_I){this.packlayoutview = packlayoutview_I;}
    else {this.packlayoutview=null}; 
};
d3_chart2d.prototype.add_packlayoutcirclesdata1 = function(){
    // add circles to pack layout
    var focus = this.focus;
    var nodes = this.nodes;
    var root = this.data1.nestdatafiltered;
    var colorscale = this.colorscale;
    var packlayoutzoom = this.packlayoutzoom;
    
    this.packlayoutcircle = this.svgg.selectAll("circle")
        .data(nodes);

    this.packlayoutcircle.exit().remove();

    this.packlayoutcircle.transition()
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { return d.children ? colorscale(d.depth) : null; })
        .on("click", function(d) { if (focus !== d) packlayoutzoom(d), d3.event.stopPropagation(); });

    this.packlayoutcircleenter = this.packlayoutcircle.enter();
        .append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { return d.children ? colorscale(d.depth) : null; })
        .on("click", function(d) { if (focus !== d) packlayoutzoom(d), d3.event.stopPropagation(); });

};
d3_chart2d.prototype.add_packlayouttextdata1 = function(){
    // add text to pack layout
    var focus = this.focus;
    var nodes = this.nodes;
    var root = this.data1.nestdatafiltered;
    var colorscale = this.colorscale;
    var packlayoutzoom = this.packlayoutzoom;
    
    this.packlayouttext = this.svgg.selectAll("text")
        .data(nodes);

    this.packlayouttext.exit().remove();

    this.packlayouttext.transition()
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? null : "none"; })
        .text(function(d) { return d.key; });

    this.packlayouttextenter = this.packlayouttext.enter();
        .append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? null : "none"; })
        .text(function(d) { return d.key; });

};
d3_chart2d.prototype.zoom_packlayout(d){
   // pack layout zoom function 
    this.set_packlayoutfocusdata1(d);
    var focus = this.focus;
    var view = this.view;
    var margin = this.margin.top;
    var diameter = this.width;
    var packlayoutzoomto = this.zoomto_packlayout;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { packlayoutzoomto(i(t),diameter); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
};
d3_chart2d.prototype.zoomto_packlayout = function(view_I,diameter_I){
    // pack layout zoomto function
    // INPUT: 
    // view_I = [root.x, root.y, root.r * 2 + margin]
    if (view_I && diameter_I){
        var k = diameter_I / view_I[2]; 
        this.set_packlayoutviewdata1(view_I);
        var view = this.view;
    } else {
        var k = this.width / this.data1.nestdatafiltered.r + this.margin.top;
        var view = this.view;
    };
;
    node.attr("transform", function(d) { return "translate(" + (d.x - view_I[0]) * k + "," + (d.y - view_I[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
};
d3_chart2d.prototype.add_packlayoutdata1zoom(){
    // add zoom to svg element of the packlayoutzoom
    var packlayoutzoom = this.packlayoutzoom;
    var id = this.id
    var root = this.data1.nestdatafiltered;
    d3.select("#"+this.id).on("click",function() { packlayoutzoom(root); });
}