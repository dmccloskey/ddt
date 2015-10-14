"use strict";
function d3_svg_data() {
    // generic svg element with data
    d3_svg.call(this);
    this.data1 = null; //d3_data
    this.data2 = null; //d3_data
    this.data1keymap = {}; // mapping of keys to data element, chart elements, or other descriptor
    this.data2keymap = {}; // mapping of keys to data element, chart elements, or other descriptor
    this.filterdata1and2 = false;
    this.colorscale = null;
};
d3_svg_data.prototype = Object.create(d3_svg.prototype);
d3_svg_data.prototype.constructor = d3_svg_data;
d3_svg_data.prototype.add_data1filtermenusubmitbutton = function (tileid_I,submitbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = this.submitbuttonid;};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        for (key in this_.data1.filters){
            var filterkey = d3.select("#"+tileid+'formlabel'+key).text();
            var filterstring = d3.select("#"+tileid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        this_.data1.convert_stringmenuinput2filter(filterstringmenu);
        this_.data1.filter_stringdata();
        this_.render();
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("mousedown",submit);
};
d3_svg_data.prototype.add_data2filtermenusubmitbutton = function (tileid_I,submitbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = this.submitbuttonid;};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        for (key in this_.data2.filters){
            var filterkey = d3.select("#"+tileid+'formlabel'+key).text();
            var filterstring = d3.select("#"+tileid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        this_.data2.convert_stringmenuinput2filter(filterstringmenu);
        this_.data2.filter_stringdata();
        this_.render();
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("mousedown",submit);
};
d3_svg_data.prototype.add_data2filtermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = this.resetbuttonid;};

    var this_ = this;
    
    function reset(){
        this_.data2.reset_filters();
        this_.data2.filter_stringdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_svg_data.prototype.add_data1filtermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = this.resetbuttonid;};

    var this_ = this;
    
    function reset(){
        this_.data1.reset_filters();
        this_.data1.filter_stringdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_svg_data.prototype.set_colorscale = function (colorscale_I,colorcategory_I,colordomain_I,colordatalabel_I) {
    // set color scale
    // INPUT:
    //  colorscale_I = ordinal (default), quantile
    //  colordomain_I = [] e.g., [0,1],[0,1000],[-1000,1000],[-10,0,10],[0.0,0.5,1.0]
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
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='colorbrewer'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(colorbrewer.YlGnBu[9]);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='heatmap21'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap21);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='heatmap10'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
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
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='heatmap10'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).range(heatmap10);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='heatmap21'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).range(heatmap21);
    }else if (colorscale_I==='quantile' && colorcategory_I==='colorbrewer'){
        this.colorscale = d3.scale.quantile().range(colorbrewer.YlGnBu[10]);
    }else if (colorscale_I==='quantile' && colorcategory_I==='category10c'){
        this.colorscale = d3.scale.quantile().category10c();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20'){
        this.colorscale = d3.scale.quantile().category20();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20a'){
        this.colorscale = d3.scale.quantile().category20a();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20b'){
        this.colorscale = d3.scale.quantile().domain(colordomain_I).category20b();
    }else if (colorscale_I==='quantile' &&  colorcategory_I==='category20c'){
        this.colorscale = d3.scale.quantile().category20c();
    }else{
        this.colorscale = d3.scale.category20c();
    };
};
d3_svg_data.prototype.add_data = function(data_I){
    //add data n
    if (!data_I){
       console.warn("no data");
    } else if (data_I.length===1){
        this.data1 = data_I[0];
    } else if (data_I.length===2){
        this.data1 = data_I[0];
        this.data2 = data_I[1];
    } else {console.warn("more data found than what is currently supported");
    };
};
d3_svg_data.prototype.set_datakeymaps = function(keymaps_I){
    //add data n
    if (!keymaps_I){
       console.warn("no data");
    } else if (keymaps_I.length===1){
        this.data1keymap = keymaps_I[0];
    } else if (keymaps_I.length===2){
        this.data1keymap = keymaps_I[0];
        this.data2keymap = keymaps_I[1];
    } else {console.warn("more data found than what is currently supported");
    };
};
d3_svg_data.prototype.add_data1 = function (data1_I) {
    //add data1
    this.data1 = data1_I;
};
d3_svg_data.prototype.add_data2 = function (data2_I) {
    //add data2 element export
    this.data2 = data2_I;
};
d3_svg_data.prototype.set_filterdata1and2 = function(filterdata1and2_I){
    // filter data 1 and 2 together based on the same series label
    this.filterdata1and2 = filterdata1and2_I;
};
d3_svg_data.prototype.filter_data1and2stringdata = function(){
    //filter all data
    if (this.data1){this.data1.filter_stringdata();};
    if (this.data2){this.data2.filter_stringdata();}; 
};
d3_svg_data.prototype.set_data1keymap = function (data1keymap_I) {
    //set the data1 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data1keymap = data1keymap_I;
};
d3_svg_data.prototype.set_data2keymap = function (data2keymap_I) {
    //set the data2 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data2keymap = data2keymap_I;
};