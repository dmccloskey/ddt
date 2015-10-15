"use strict";
//var d3_tile = function () {
function d3_tile() {
    // generic d3_tile element
    // based on the bootstrap panel model
    // panel panel-default
    // panel-heading
    // panel-body
    // panel-footer
    this.containerid = 'container'
    this.tileid = '';
    this.rowid = '';
    this.colid = '';
    this.rowclass = '';
    this.colclass = '';
    this.tileclass = '';
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
d3_tile.prototype.set_tileclass = function (tileclass_I) {
    // set tile class
    this.tileclass = tileclass_I;
};
d3_tile.prototype.add_tile2container = function () {
    // add tile to container
    if (d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).select("#" + this.tileid).node()){
        this.tile = d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).select("#" + this.tileid);
    } else if (d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).node()){
        this.append_tile2col();
    } else if (d3.select("#" + this.containerid).select("#" + this.rowid).node()){
        this.append_tile2row();
    } else if (d3.select("#" + this.containerid).node()){
        this.append_tile2container();
    };
};
d3_tile.prototype.append_tile2container = function () {
    // set column id
    var row = d3.select("#" + this.containerid).append("div").attr("class", this.rowclass).attr("id", this.rowid);
    var col = row.append("div").attr("class", this.colclass).attr("id", this.colid);
    this.tile = col.append("div").attr("class", this.tileclass).attr("id", this.tileid);
};
d3_tile.prototype.append_tile2row = function () {
    // add tile as new column in an existing row
    var col = d3.select("#" + this.containerid).select("#" + this.rowid).append("div").attr("class", this.colclass).attr("id", this.colid);
    this.tile = col.append("div").attr("class", this.tileclass).attr("id", this.tileid);
};
d3_tile.prototype.append_tile2col = function () {
    // add tile to as a new row in an existing column
    this.tile = d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).append("div").attr("class", this.tileclass).attr("id", this.tileid);
};
d3_tile.prototype.add_footer2tile = function () {
    // add footer to tile

    var tileid = this.tileid;

    this.tilefooter = d3.select('#'+tileid).append("div")
        .attr("class","panel-footer")
        .attr("id",tileid+"panel-footer");
};
d3_tile.prototype.add_submitbutton2footer = function (button_idtext_I) {
    // add submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
    else{var button_idtext = button_idtext_I;}

    var tileid = this.tileid;

    var submitbuttonrow = this.tilefooter.append("button")
        .attr("class","btn btn-default column-button")
        .attr("id", tileid + 'submitbutton'+button_idtext.id)
        .text(button_idtext.text);
};
d3_tile.prototype.remove_tile = function(){
    // remove tile from the container
    var tileid = this.tileid;
    d3.selectAll('#'+tileid).remove();
    this.tile = null;
};
d3_tile.prototype.add_datalist2body = function (datalist_valuetext_I) {
    // add datalist (menu) for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];

    var tileid = this.tileid;  

    var datalist = this.tilebody.append("select")
        .attr("id", tileid + 'datalist');

    for (i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };  
};
d3_tile.prototype.add_header2tile = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    this.tileheader = d3.select('#'+tileid).append("div")
        .attr("class","panel-heading")
        .attr("id",tileid+"panel-heading");
};
d3_tile.prototype.add_title2header = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    var title = this.tileheader.append("h3")
        .text(title_I);
};
d3_tile.prototype.add_removebutton2header = function(){
    // add button to remove tile from the container

    var tileid = this.tileid;
    var this_ = this;
    var remove_tile = this.remove_tile;

    function removetile(){
        d3.selectAll('#'+tileid).remove();
        this_.tile = null;
    };
    
    //Split #1
//     var removebutton = this.tileheader.append("a")
//         .attr("class","pull-right")
//         .attr("id", tileid + 'removebutton')
//         .text("remove")
//         .on("click",removetile);

    //Split #2
//     var removebutton = this.tileheader.append("button")
//         .attr("class","btn btn-danger pull-right")
//         .attr("id", tileid + 'removebutton')
//         .attr("type", 'button')
//         .append("span")
//         .attr("class","glyphicon glyphicon-trash");
//         //.text("remove")
//     removebutton.on("click",removetile);

    //Split #3
    var removebutton = this.tileheader.append("div")
        .attr("class","glyphicon glyphicon-trash pull-right")
        .attr("id", tileid + 'removebutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","remove");
    removebutton.on("click",removetile);
};
d3_tile.prototype.add_body2tile = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    this.tilebody = d3.select('#'+tileid).append("div")
        .attr("class","panel-body")
        .attr("id",tileid+"panel-body")
};

//var d3_data = function () {
function d3_data() {
    //the data object class
    //to handle the filtering and manipulation
    //of listed key-value paired data
    //(e.g., from a database)

    this.keys = []; // list of columns that can be applied as nest keys and filters
    this.nestkey = ''; // key to apply to nest
    this.filters = {}; // {key1:[string1,string2,...],...}
    this.listdata = []; // data in database table form (must contain a column "_used");
    this.listdatafiltered = []; // data in database table form
    this.nestdatafiltered = []; // data in nested form
};
d3_data.prototype.add_nestkey = function(key_I){
    //closure to add additional nest keys within a loop
    return function(d){
        return d[key_I];
    };
}
d3_data.prototype.convert_list2nestlist = function (data_I,key_I,rollup_I) {
    // convert a list of objects to a d3 nest by a key
    var add_nestkey = this.add_nestkey;
    var nesteddata_O = d3.nest();
    for (var i=0;i<key_I.length;i++){
        nesteddata_O = nesteddata_O.key(add_nestkey(key_I[i]));
    };
    if (rollup_I){nesteddata_O = nesteddata_O.rollup(rollup_I)};
    nesteddata_O = nesteddata_O.entries(data_I);
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
    for (var i = 0; i < listdatacopy.length; i++) {
        listdatacopy[i]['used_'] = true;
    };

    //pass each row through the filter
    for (var i = 0; i < listdatacopy.length; i++) {
        for (var filter in this.filters) {
            //console.log(filter);
            if (typeof listdatacopy[i][filter] !== "undefined"){
                if (listdatacopy[i][filter]){
                    var str_compare = listdatacopy[i][filter].toString(); //ensure that the value is a string
                    var lst_filters = [];
                    this.filters[filter].forEach(function(d){
                        var str_d = '^';
                        str_d += escapeRegExp(d);
                        str_d += '$';
                        lst_filters.push(str_d);
                    });
                    var str_filter = lst_filters.join('|');
                    //var str_filter = this.filters[filter].join('|');  //breaks for 'mmol*gDCW*hr-1' because * is a regular expression
                    if (!str_compare.match(str_filter)) {
                        listdatacopy[i]['used_'] = false;
                    };
                };
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

    // update the filters
    if (this.listdatafiltered.length!==0){
        this.update_filters();
        };
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
    for (var key_cnt = 0; key_cnt < this.keys.length;key_cnt++) {
        var colentries = d3.set();
        for (var i = 0; i < this.listdata.length; i++) {
            colentries.add(this.listdata[i][this.keys[key_cnt]]);
        };
        filters[this.keys[key_cnt]] = colentries.values();
    };
    this.filters = filters;
};
d3_data.prototype.update_filters = function () {
    // update the filter based on the current filtered data

    var filters = {};
    for (var key_cnt = 0; key_cnt < this.keys.length;key_cnt++) {
        var colentries = d3.set();
        for (var i = 0; i < this.listdatafiltered.length; i++) {
            colentries.add(this.listdatafiltered[i][this.keys[key_cnt]]);
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
    
    for (var key in filter_I) {
        this.filters[key] = filter_I[key];
    };
};
d3_data.prototype.format_keyvalues2namechildren = function(lastchild_I){
    // format nest key/values to name/children for use with layouts and clusters
    function rename(d){
        if (d.key){
            d['name']=d.key;
            delete d.key;
        } else {
            var lastchild = d[lastchild_I];
            for(var key in d){delete d[key];}; //remove all object properties
                                           //needed for proper rendering of data for d3 layouts
            d['name']=lastchild;
            //test
            d['size']=1;
        };
        if (d.values){
            d['children'] = d.values;
            d['children'].forEach(rename);
            delete d.values;
        };
    };
    this.nestdatafiltered.forEach(rename)
};
d3_data.prototype.convert_filter2stringmenuinput = function(){
    // convert filter list to filter string list
    var filterstring = [];
    for (var key in this.filters){
        filterstring.push({"text":key,"value":this.filters[key].toString()});
        };
    return filterstring;
};
d3_data.prototype.convert_stringmenuinput2filter = function(filterstring_I){
    // convert filter list to filter string list
    var filtermap = {};
    for (var i=0;i<filterstring_I.length;i++){
        //this.filters[filterstring_I[i].text]=filterstring_I[i].value.split(",");
        filtermap[filterstring_I[i].text]=filterstring_I[i].value.split(",");
    };
    this.change_filters(filtermap)
};
d3_data.prototype.change_nestkeys = function(nestkey_I) {
    // change the nest keys and update nestdatafiltered
    this.nestkey = nestkey_I;
    var listdatafiltered = this.listdatafiltered;
    this.nestdatafiltered = this.convert_list2nestlist(listdatafiltered,nestkey_I);
};
d3_data.prototype.convert_listdatafiltered2escherobjectlist = function(key_I,values_I){
    // convert list data to escher object
    // i.e. convert [{key_I:data,value_I:data},{key_I:data,value_I:data},{key_I:data,value_I:data},...]
    //      to [{key_I_data:value_I_data,key_I_data:value_I_data,...}]
    
    //var escherobjectlist_O = [];
    var escherobject = {};
    this.listdatafiltered.forEach(function(d){
        escherobject[d[key_I]]=d[values_I];
    });
    //escherobjectlist_O.push(escherobject);
    //return escherobjectlist_O;
    return escherobject;
};
d3_data.prototype.remove_filtereddata = function(){
    // remove unfiltered data
    this.listdata = this.listdatafiltered;
};
d3_data.prototype.get_datajson = function(filtereddataonly_I){
    // get the data in json format for re-input

    if (typeof filtereddataonly_I === "undefined"){
        var filtereddataonly = false;
    } else {
        var filtereddataonly = filtereddataonly_I;
    };

    var keys_O = this.keys;
    var nestkeys_O = this.nestkey;

    if (filtereddataonly){
        var data_O = this.listdatafiltered;
    } else {
        var data_O = this.listdata;
    }

    var datajson_O = {'datakeys':keys_O,
                    'datanestkeys':nestkeys_O,
                    'data':data_O};

    return datajson_O;
};
//additional functions
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
//var d3_svg = function () {
function d3_svg() {
    // generic svg element
    this.id = '';
    this.tileid = '';
    this.svgelement = null;
    this.svgg = null;
    this.margin = {};
    this.width = 1;
    this.height = 1;
    this.render = null; // function defining the calls to make the svg element
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

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    var tileid = this.tileid;
    var id = this.id;

//     this.svgelement = d3.select('#'+this.tileid+"panel-body")
//         .append("svg").attr("id",this.id);

//     this.svgelement.attr("width", this.width + this.margin.left + this.margin.right)
//         .attr("height", this.height + this.margin.top + this.margin.bottom);

//     this.svgg = this.svgelement
//         .append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svgelement = d3.select('#' + tileid+"panel-body").selectAll(".svg-responsive")
        .data([0]);
    
    this.svgenter = this.svgelement.enter()    
        .append("div")
        .attr("class",'svg-responsive')
        .append("svg")
        .attr("id", id)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svgelement.selectAll("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_svg.prototype.add_svgexportbutton2tile = function () {
    // add button to export the svg element
    var this_ = this;
    var svgexportbutton = d3.select('#'+this.tileid+"panel-footer").append("form");

    function exportsvgelement(){
        this_.export_svgelement(); //necessary to pass svg as "this"
    };

    var svgexportbutton_input = svgexportbutton.append("input");
    svgexportbutton_input.attr("type", "button")
        .attr("value", "Download SVG");
    svgexportbutton_input.on("click", exportsvgelement);

};
d3_svg.prototype.export_svgelement = function () {
    // export the svg element

    //Input:
    // do_beautify = boolean (requires beautify plugin)

    var do_beautify_I = true;
    var a = document.createElement('a'), xml, ev;
    var svg_sel = "#" + this.id;
    a.download = 'figure' + '.svg'; // file name
    // convert node to xml string
    xml = (new XMLSerializer()).serializeToString(d3.select(svg_sel).node()); //div element interferes with reading the svg file in illustrator/pdf/inkscape
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
d3_svg.prototype.set_svgstyle = function () {
    // predefined css style for svg
    //var selector1 = "#" + this.id;
    var selector1 = "#" + this.tileid + ' .svg-responsive';
    var style1 = {
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 }];
    this.set_d3css(selectorstyle);
};
d3_svg.prototype.set_duration = function(duration_I){
    // set the transition duration
    this.duration = duration_I;
};
d3_svg.prototype.set_svggcss = function (selectionstyle_I) {
    //set custom css style to svgg
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        this.svgg.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_svg.prototype.set_d3css = function (selectionstyle_I) {
    //set custom css style to d3
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        d3.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_svg.prototype.set_zoom = function (){
    //add zoom
    var draw = this.draw;
    var render = this.render;
    this.zoom = d3.behavior.zoom()
        .scaleExtent([1,10])
        //.on("zoom", render);
        .on("zoom", draw);
};
d3_svg.prototype.add_zoom = function(){
    //add zoom to svg
    var zoom = this.zoom;
    this.svgg.call(zoom);
    //this.zoom(svgelement);
};
d3_svg.prototype.render = function () {
    //render the svg

    //your code here...
};
d3_svg.prototype.draw = function () {
    //draw the svg

    //your code here...
};
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
//var d3_chart2d = function () {
function d3_chart2d() {
    // generic chart
    d3_svg_data.call(this);
    //this.svgdata = null;
    //this.svgenter = null;
    //this.svgsvg = null;
    //this.svgg = null;
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
    this.clippath = null;
    this.title = null;
    this.x1axisgridlines = null;
    this.y1axisgridlines = null;
    this.x1axisgridlinesenter = null;
    this.y1axisgridlinesenter = null;
    this.tooltip = null;

};
d3_chart2d.prototype = Object.create(d3_svg_data.prototype);
d3_chart2d.prototype.constructor = d3_chart2d;
d3_chart2d.prototype.add_chart2d2tile = function(){
    // add char2d to tile

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    var tileid = this.tileid;
    var id = this.id;
    var data1listdatafiltered = this.data1.listdatafiltered;

    this.svgelement = d3.select('#' + tileid+"panel-body").selectAll(".svg-responsive")
        .data([data1listdatafiltered]);
    
    this.svgenter = this.svgelement.enter()    
        .append("div")
        .attr("class",'svg-responsive')
        .append("svg")
        .attr("id", id)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svgelement.selectAll("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_chart2d.prototype.remove_chart2d = function(){
    // remove chart2d from tileid
    if (this.svgelement){
        this.svgelement.remove();
        this.svgelement = null;
        this.svgenter = null;
        this.svgg = null;
    };
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
        this.x1scale = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
    };
};
d3_chart2d.prototype.set_y1range = function (scale_I,invert_I) {
    // set y1-range of the plot
    if (typeof scale_I === "undefined"){scale_I=null;}
    if (typeof invert_I === "undefined"){invert_I=false;}
    if (scale_I === 'linear') {
        if (invert_I){
            this.y1scale = d3.scale.linear().range([0,this.height]); //starts at the top left
        } else {
            this.y1scale = d3.scale.linear().range([this.height, 0]); //starts at the bottom left
        };
    } else if (scale_I === 'ordinal') {
        this.y1scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        if (invert_I){
            this.y1scale = d3.scale.ordinal().rangeRoundBands([0,this.height], .1); //starts at the top left
        } else {
            this.y1scale = d3.scale.ordinal().rangeRoundBands([this.height, 0], .1); //starts at the bottom left
        };
    };
};
d3_chart2d.prototype.set_x2range = function (scale_I) {
    // set x2-range of the plot
    if (scale_I === 'linear') {
        this.x2scale = d3.scale.linear().range([0, this.width])
    } else if (scale_I === 'ordinal') {
        this.x2scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        this.x2scale = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
    };
};
d3_chart2d.prototype.set_y2range = function (scale_I,invert_I) {
    // set y1-range of the plot
    if (typeof scale_I === "undefined"){scale_I=null;}
    if (typeof invert_I === "undefined"){invert_I=false;}
    if (scale_I === 'linear') {
        if (invert_I){
            this.y2scale = d3.scale.linear().range([0,this.height]); //starts at the top left
        } else {
            this.y2scale = d3.scale.linear().range([this.height, 0]); //starts at the bottom left
        };
    } else if (scale_I === 'ordinal') {
        this.y2scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        if (invert_I){
            this.y2scale = d3.scale.ordinal().rangeRoundBands([0,this.height], .1); //starts at the top left
        } else {
            this.y2scale = d3.scale.ordinal().rangeRoundBands([this.height, 0], .1); //starts at the bottom left
        };
    };
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
            data1.push(d[_this.data1keymap.ydataub]);
        })
    } else{
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
        })
    };
    //this.y1scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[y_data]; })).nice();
    // check for unique values
    var unique = data1.filter( onlyUnique );
    // add in 0.0 if there is only 1 unique value to solve issue#1
    // Problem: This is caused by an auto-adjustment of the y-axis from min_value(data array) to max_value(data array). When only one or a constant y-value is supplied, the min/max of the y-axis are set to the same value.
    // Correction: ensure a minimum y-axis value of 0.0.
    //
    if (unique.length === 1){
        data1.push(0.0);
        };
    //define the y1 scale
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
    // check for unique values
    var unique = data1.filter( onlyUnique );
    // add in 0.0 if there is only 1 unique value to solve issue#1
    // Problem: This is caused by an auto-adjustment of the y-axis from min_value(data array) to max_value(data array). When only one or a constant y-value is supplied, the min/max of the y-axis are set to the same value.
    // Correction: ensure a minimum y-axis value of 0.0.
    //
    if (unique.length === 1){
        data1.push(0.0);
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
};
d3_chart2d.prototype.copy_x1scalestox2scales = function () {
    // copy x1 scale to x2scale
    this.x2scale = this.x1scale;
};
d3_chart2d.prototype.copy_y1scalestoy2scales = function () {
    // copy y1 scale to y2scale
    this.y2scale = this.y1scale;
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
d3_chart2d.prototype.set_x1axistickformat = function (x1axistickformat_I) {
    //x1 axis format
    //uses axis.tickFormat(d3.format())
    if (typeof x1axistickformat_I !== "undefined"){var x1axistickformat = x1axistickformat_I;}
    else {var x1axistickformat = null;}
    this._x1axis.tickFormat(d3.format(x1axistickformat));
};
d3_chart2d.prototype.set_y1axistickformat = function (y1axistickformat_I) {
    //y1 axis format
    //uses axis.tickFormat(d3.format())
    if (typeof y1axistickformat_I !== "undefined"){var y1axistickformat = y1axistickformat_I;}
    else {var y1axistickformat = null;}
    this._y1axis.tickFormat(d3.format(y1axistickformat));
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
    //TODO: implement bootstrap tooltip
    //http://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-tooltips.php
    var series_label = this.data1keymap.serieslabel;

    this.tooltip = d3.select("#" + this.tileid + "panel-body")
        .append("div")
        .attr('class', 'hidden')
        .attr('id', this.id + 'tooltip')
        .append('p')
        .attr('id', this.id + 'value');

//     $(document).ready(function(){
//         $('[data-toggle="tooltip"]').tooltip();   
//     });

//     this.tooltip = d3.select("#" + this.tileid + "panel-body")
//         .append("div")
//         .attr('class', 'tooltip hidden')
//         .attr('role', 'tooltip');
//         //.attr('id', this.id + 'tooltip');

//     this.tooltiparrow = this.tooltip
//         .append("div")
//         .attr("class","tooltip-arrow");

//     this.tooltipinner = this.tooltip
//         .append("div")
//         .attr("class","tooltip-inner")
//         .attr('id', this.id + 'value');
};
d3_chart2d.prototype.set_tooltipstyle = function () {
    //set tooltip css properties
    var tooltipselector = "#" + this.id + 'tooltip';
    var tooltipstyle = {
        'position': 'fixed',
        'width': 'auto',
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
d3_chart2d.prototype.set_d3tooltipstyle = function () {
    //set tooltip css properties
    var tooltipselector1 = '.d3-tip';
    var tooltipstyle1 = {
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
    };
    var tooltipselector2 = '.d3-tip:after';
    var tooltipstyle2 = {
          'box-sizing': 'border-box',
          'display': 'inline',
          'font-size': '10px',
          'width': '100%',
          'line-height': '1',
          'color': 'rgba(0, 0, 0, 0.8)',
          //'content': '"\25BC"',
          'position': 'absolute',
          'text-align': 'center'
    };
    var tooltipselector3 = '.d3-tip.n:after';
    var tooltipstyle3 = {
           'margin': '-1px 0 0 0',
          'top': '100%',
          'left': '0'
    };
    var selectionstyle = [{ 'selection': tooltipselector1, 'style': tooltipstyle1 },
                        { 'selection': tooltipselector2, 'style': tooltipstyle2 },
                        { 'selection': tooltipselector3, 'style': tooltipstyle3 }];
    this.set_svggcss(selectionstyle);
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

    this.legenddata1enter = this.legenddata1.enter()
         //adding the grouping here "hides" the rect and text
        .append('g')
        .attr('class', 'legendelement')
        .attr('id', function (d, i) { return id + 'legendelement' + i.toString() })
        .attr('transform', function (d, i) {
            return "translate(" + width + "," + 0 + ")";
        });

    //set the legend transition
    this.legenddata1.transition()
        .attr('transform', function (d, i) {
            return "translate(" + (width) + "," + 0 + ")";
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
d3_chart2d.prototype.set_x1andy1axestickstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
    var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
    var style = {
        'font-size': '12px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1andy1axeslabelstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var y1axisselector = '#' + this.id + 'y1axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'arial'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1x2andy1y2axestickstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var y1axisselector = '#' + this.id + 'y1axis' + ' text.label';
    var x2axisselector = '#' + this.id + 'x2axis' + ' text.label';
    var y2axisselector = '#' + this.id + 'y2axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'arial'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style },
                     { 'selection': x2axisselector, 'style': style },
                     { 'selection': y2axisselector, 'style': style }]
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
d3_chart2d.prototype.draw = function(){
    var svgg = this.svgg;
    var _x1axis = this._x1axis;
    var _x2axis = this._x2axis;
    var _y1axis = this._y1axis;
    var _y2axis = this._y2axis;

    return function(){
        if (this.x1axis){
            svgg.select('g.x1axis')
                .call(_x1axis);
                };
        if (this.x2axis){
            svgg.select('g.x2axis')
                .transition()
                .call(_x2axis);
                };
        if (this.y1axis){
            svgg.select('g.y1axis')
                .transition()
                .call(_x1axis);
                };
        if (this.y2axis){
            svgg.select('g.y2axis')
                .transition()
                .call(_y2axis);
                };
    };
};
d3_chart2d.prototype.set_svgelementzoomcss = function(){
    // set cursor style and pointer events on svgelement for zoom
    var selector1 = '#' + this.id;
    var style1 = {
        'cursor': 'move',
        'pointer-events': 'all'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 }]
    this.set_d3css(selectorstyle);
    //this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_legendstyle = function () {
    // predefined css style for legend
    var selector = '.legendelement text';
    var style = {
        'font-size': '10px'
    };
    var selectorstyle = [{ 'selection': selector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1axisticktextstyle = function (x1axisstyle_I) {
    // custom css styles for x1 axis
    // Input:
    //  style = {}, e.g. 'font-size': '12px'
    if (typeof x1axisstyle_I !== "undefined"){
        var style = x1axisstyle_I;
        var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
        var selectorstyle = [{ 'selection': x1axisselector, 'style': style }]
        this.set_svggcss(selectorstyle);
    };
};
d3_chart2d.prototype.set_svggattr = function (selectionattr_I) {
    //set custom css attributes to svgg
    //Input:
    // selectionattr_I = [{selection: string e.g., '.axis line, .axis path'
    //                      attr: {key:,value} strings e.g., [{'transform','rotate(90)'}]
    for (var i = 0; i < selectionattr_I.length; i++) {
        this.svgg.selectAll(selectionattr_I[i].selection)
            .attr(selectionattr_I[i].attr);
    };
};
d3_chart2d.prototype.set_x1axisticktextattr = function (x1axistickattr_I) {
    //x1 axis format
    //appends attributes to x1axis text
    if (typeof x1axistickattr_I !== "undefined"){
        var x1axistickattr = x1axistickattr_I;
        var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
        var selectorattr = [{ 'selection': x1axisselector, 'attr': x1axistickattr }]
        this.set_svggattr(selectorattr);
        };
};
d3_chart2d.prototype.set_y1axisticktextstyle = function (y1axisstyle_I) {
    // custom css styles for y1 axis
    // Input:
    //  style = {}, e.g. 'font-size': '12px'
    if (typeof y1axisstyle_I !== "undefined"){
        var style = y1axisstyle_I;
        var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
        var selectorstyle = [{ 'selection': y1axisselector, 'style': style }]
        this.set_svggcss(selectorstyle);
    };
};
d3_chart2d.prototype.set_y1axisticktextattr = function (y1axistickattr_I) {
    //y1 axis format
    //appends attributes to y1axis text
    if (typeof y1axistickattr_I !== "undefined"){
        var y1axistickattr = y1axistickattr_I;
        var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
        var selectorattr = [{ 'selection': y1axisselector, 'attr': y1axistickattr }]
        this.set_svggattr(selectorattr);
        };
};

// utility functions
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
};
d3_chart2d.prototype.add_boxandwhiskersdata1 = function () {
    //add box and whiskers to the plot
//     boxes: the main body of the boxplot showing the quartiles and the median�s confidence intervals if enabled.
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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            return (d[series_label] + ': ' + "median: " + d[y_data_median].toFixed(2) + ', ' + "iq1/3: " + d[y_data_iq1].toFixed(2) + "/" + d[y_data_iq3].toFixed(2) + ', ' + "min/max: " + d[y_data_min].toFixed(2) + "/" + d[y_data_max].toFixed(2));
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.boxandwhiskersboxesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 .text(d[series_label] + ': ' + "median: " + d[y_data_median].toFixed(2) + ', ' + "iq1/3: " + d[y_data_iq1].toFixed(2) + "/" + d[y_data_iq3].toFixed(2) + ', ' + "min/max: " + d[y_data_min].toFixed(2) + "/" + d[y_data_max].toFixed(2));
//             //Show the tooltip
//             d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "none");
            tip.hide(d);
//             d3.select("#" + id + "tooltip").classed("hidden", true);
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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(d[y_data_lb])!=="undefined" && typeof(d[y_data_mean])!=="undefined"){
                return (d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            } else if (typeof(d[y_data_lb])==="undefined"){
                return (d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2));
            } else if (typeof(d[y_data_mean])==="undefined"){
                return (d[series_label] + ': ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            } else {
                return d[series_label];
            };
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.boxandwhiskersmeancirclesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 .text(d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
//             //Show the tooltip
//              d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
            //d3.select("#" + id + "tooltip").classed("hidden", true);
        });
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
    for (var i=colindexmin;i<=colindexmax;i++){
        collabelsordered.push(i);
    };
    for (i=rowindexmin;i<=rowindexmax;i++){
        rowlabelsordered.push(i);
    };
    var columnleavesordered = [];
    var rowleavesordered = [];
    for (var i=0;i<collabelsordered.length;i++){
        for (var j=0;j<listdatafiltered.length;j++){
            if (collabelsordered[i]===listdatafiltered[j][columnsindex]){
                columnleavesordered.push(listdatafiltered[j][columnsleaves]);
                break;
            };
        };
    };
    for (var i=0;i<rowlabelsordered.length;i++){
        for (var j=0;j<listdatafiltered.length;j++){
            if (rowlabelsordered[i]===listdatafiltered[j][rowsindex]){
                rowleavesordered.push(listdatafiltered[j][rowsleaves]);
                break;
            };
        };
    };
    this.columnleavesordered=columnleavesordered;
    this.rowleavesordered=rowleavesordered;

    this.colnumber = this.uniquecollabels.length;
    this.rownumber = this.uniquerowlabels.length;

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
d3_chart2d.prototype.add_heatmapdata1rowlabels = function (tileid_I) {
    //add heatmap to the plot
    var uniquerowlabels = this.uniquerowlabels;
    var this_ = this;
    var rowsortorder = this.rowsortorder;
    var tileid = tileid_I;
    var cellsize = this.cellsize;
    var rowleavesordered = this.rowleavesordered

    this.rowlabels = this.svgg.append("g").selectAll(".rowLabelg")
        .data(uniquerowlabels);

    this.rowlabels.transition()
        .text(function (d) { 
            return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { 
            return rowleavesordered.indexOf(i) * cellsize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(" + (-cellsize) + "," + cellsize / 1.5 + ")")
        .attr("class", function (d,i) { return "rowLabel mono r"+i;} );

    this.rowlabels.exit().remove();

    this.rowlabelsenter = this.rowlabels.enter()
        .append("text")
        .text(function (d) { 
            return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { 
            return rowleavesordered.indexOf(i) * cellsize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(" + (-cellsize) + "," + cellsize / 1.5 + ")")
        .attr("class", function (d,i) { return "rowLabel mono r"+i;} )
        .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
        .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
        .on("click", function(d,i) {
            rowsortorder=!rowsortorder; 
            this_.sortbylabel("r",i,rowsortorder); 
            d3.select('#'+tileid+'datalist').property("selectedIndex", 4).node().focus();
            });

};
d3_chart2d.prototype.add_heatmapdata1columnlabels = function (tileid_I) {
    //add heatmap to the plot
    var uniquecollabels = this.uniquecollabels;
    var this_ = this;
    var colsortorder = this.colsortorder;
    var tileid = tileid_I;
    var cellsize = this.cellsize;
    var columnleavesordered = this.columnleavesordered

    this.collabels = this.svgg.append("g").selectAll(".colLabelg")
        .data(uniquecollabels);

    this.collabels.transition()
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return columnleavesordered.indexOf(i) * cellsize; })
        .style("text-anchor", "left")
        .attr("transform", "translate("+cellsize/2 + "," + (-cellsize) + ") rotate (-90)")
        .attr("class",  function (d,i) { return "colLabel mono c"+i;} );

    this.collabels.exit().remove();

    this.collabelsenter = this.collabels.enter()
        .append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return columnleavesordered.indexOf(i) * cellsize; })
        .style("text-anchor", "left")
        .attr("transform", "translate("+cellsize/2 + "," + (-cellsize) + ") rotate (-90)")
        .attr("class",  function (d,i) { return "colLabel mono c"+i;} )
        .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
        .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
        .on("click", function (d, i) {
            colsortorder = !colsortorder;
            this_.sortbylabel("c", i, colsortorder);
            //d3.select('#'+tileid+'datalist').property("selectedIndex", 4).node().focus(); 
            });

};
d3_chart2d.prototype.sortbylabel = function (rORc,i,sortOrder){
    var columnsindex_I = this.data1keymap.columnsindex;
    var rowsindex_I = this.data1keymap.rowsindex;
    var cellsize_I = this.cellsize;
    var col_number = this.colnumber;
    var row_number = this.rownumber;

    var t = this.svgg.transition().duration(3000); //todo: broken
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
       .attr("y", function(d) { 
        return sorted.indexOf(d[rowsindex_I]) * cellsize_I; })
       ;
     t.selectAll(".rowLabel")
      .attr("y", function (d, i) { 
      return sorted.indexOf(i) * cellsize_I; });
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

    this.heatmap.transition()
        .attr("x", function(d) { return d[columnsleaves] * cellsize; })
        .attr("y", function(d) { return d[rowsleaves] * cellsize; })
        .attr("class", function(d){return "cell cell-border cr"+(d[rowsindex])+" cc"+(d[columnsindex]);})
        .attr("width", cellsize)
        .attr("height", cellsize)
        .style("fill", function(d) { return colorscale(d[zdata]); });

    this.heatmap.exit().remove();
    
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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            return (rowslabel + ": " + d[rowslabel] + ",\n" + columnslabel + ": " + d[columnslabel] + ",\n" + zdata + ": " + d[zdata]);
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.heatmapenter
        .on("mouseover", function(d){
           //highlight text
           d3.select(this).classed("cell-hover",true);
           d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ return ri==(d[rowsindex]);});
           d3.selectAll(".colLabel").classed("text-highlight",function(c,ci){ return ci==(d[columnsindex]);});
           //update the tooltip
           tip.show(d);
//         //Update the tooltip position and value
//         d3.select("#" + id + "tooltip")
//          .style("left", (d3.event.pageX+10) + "px")
//          .style("top", (d3.event.pageY-10) + "px")
//              .select("#" + id + "value")
//              .text(rowslabel + ": " + d[rowslabel] + ",\n" + columnslabel + ": " + d[columnslabel] + ",\n" + zdata + ": " + d[zdata]);
//              //.text(d[rowslabel]+","+d[columnslabel]+"\ndata:"+d[zdata]);
//             //Show the tooltip
//             d3.select("#" + id + "tooltip").classed("hidden", false);        
        })
        .on("mouseout", function(d){
               d3.select(this).classed("cell-hover",false);
               d3.selectAll(".rowLabel").classed("text-highlight",false);
               d3.selectAll(".colLabel").classed("text-highlight", false);
               tip.hide(d);
               //d3.select("#" + id + "tooltip").classed("hidden", true);
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
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    // Closure 
    (function() {
      /**
       * Decimal adjustment of a number.
       *
       * @param {String}  type  The type of adjustment.
       * @param {Number}  value The number.
       * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
       * @returns {Number} The adjusted value.
       */
      function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
      }

      // Decimal round
      if (!Math.round10) {
        Math.round10 = function(value, exp) {
          return decimalAdjust('round', value, exp);
        };
      }
      // Decimal floor
      if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
          return decimalAdjust('floor', value, exp);
        };
      }
      // Decimal ceil
      if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
          return decimalAdjust('ceil', value, exp);
        };
      }
    })();

    //var colorfactor = Math.ceil(colorscale.length / (maxvalue - minvalue));
    if (minvalue===0.0 && maxvalue ===1.0){
        this.legenddata1 = this.svgg.selectAll(".legend")
          .data(d3.range(minvalue, maxvalue + (maxvalue - minvalue) / 10, (maxvalue - minvalue) / 10)); //specific to resequencing data (domain 0.0-1.0)
        this.legenddata1enter = this.legenddata1
          .enter().append("g")
          .attr("class", "legend");
        var colorfactor = 0.1;
    } else{
        this.legenddata1 = this.svgg.selectAll(".legend")
          .data(d3.range(Math.floor(minvalue), Math.ceil(maxvalue))); //use for expression data (domain -10.0-10.0)
        this.legenddata1enter = this.legenddata1
          .enter().append("g")
          .attr("class", "legend");
        var colorfactor = Math.ceil10(21.0 / (maxvalue - minvalue),-3);
          };
    
    this.legenddata1.exit().remove();

    this.legenddata1.select("rect").transition()
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 2))
        .attr("width", legendelementwidth)
        .attr("height", cellsize)
        .style("fill", function (d, i) { return colorscale(i * colorfactor); });

    this.legenddata1enter.append("rect")
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 2))
        .attr("width", legendelementwidth)
        .attr("height", cellsize)
        .style("fill", function (d, i) { return colorscale(i * colorfactor); });

    this.legenddata1.select("text").transition()
        .attr("class", "mono")
        .text(function (d) { 
                return d; })
        .attr("width", legendelementwidth)
        .attr("x", function (d, i) { return legendelementwidth * i; })
        .attr("y", height + (cellsize * 4));

    this.legenddata1enter.append("text")
        .attr("class", "mono")
        .text(function (d) { 
            return d; })
        .attr("width", legendelementwidth)
        .attr("x", function (d, i) { 
            return legendelementwidth * i; })
        .attr("y", height + (cellsize * 4));

};
d3_chart2d.prototype.add_heatmapdata1drowpdownmenu = function (tileid_I){
    // add data list (menu) to tile for the heatmap
    var tileid = this.tileid;
    var heatmaporder = this.heatmaporder;
    var svgg = this.svgg;
   
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;
    var cellsize = this.cellsize;
    var columnleavesordered = this.columnleavesordered;
    var rowleavesordered = this.rowleavesordered;

//     d3.select("#"+tileid_I + 'dropdownli').on("click",function(){
//         heatmaporder(cellsize,this.value,
//             rowsindex,columnsindex,
//             rowleavesordered, columnleavesordered,svgg);
//     });
    d3.select("#"+tileid + 'dropdownul').on("change",function(){
        heatmaporder(cellsize,this.value,
            rowsindex,columnsindex,
            rowleavesordered, columnleavesordered,svgg);
    });
};
d3_chart2d.prototype.add_heatmapdata1datalist = function (tileid_I){
    // add data list (menu) to tile for the heatmap
    var tileid = this.tileid;
    var heatmaporder = this.heatmaporder;
    var svgg = this.svgg;
   
    var columnsindex = this.data1keymap.columnsindex;
    var rowsindex = this.data1keymap.rowsindex;
    var cellsize = this.cellsize;
    var columnleavesordered = this.columnleavesordered;
    var rowleavesordered = this.rowleavesordered;

    d3.select("#"+tileid_I+"datalist").on("change",function(){
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
// TODO flip x and y, and rotate to horizontal
d3_chart2d.prototype.set_y1y2domain_horizontalbarschart = function () {
    // set y1-domain and y1-domain for a barchart
    var series_label = this.data1keymap.serieslabel;
    var nestdatafiltered = this.data1.nestdatafiltered;
    var listdatafiltered = this.data1.listdatafiltered;
    this.y1scale.domain(nestdatafiltered.map(function (d) { return d.key; }));
    var y1scale = this.y1scale;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);
    //series_labels_unique.reverse();
    this.y2scale.domain(series_labels_unique).rangeRoundBands([0,y1scale.rangeBand()]); // orders the data from bottom to top
    //this.y2scale.domain(series_labels_unique).rangeRoundBands([y1scale.rangeBand(),0]); // orders the data from top to bottom
};
d3_chart2d.prototype.add_horizontalbarsdata1 = function () {
    //add horizontal bars to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var height = this.height;
    var margintop = this.margin.top;

    this.barlabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered)

    this.barlabel
        .transition()
        .attr("class", "labels")
        .attr("transform", function (d) {
            //return "translate(" + "0," + (height-y1scale(d.key)) + ")"; });
            //return "translate(" + "0," + (y1scale(d.key)+margintop) + ")"; });
            return "translate(" + "0," + (y1scale(d.key)) + ")"; });

    this.barlabel
        .exit().remove();

    this.barlabelenter = this.barlabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) {
            //return "translate(" + "0," + (height-y1scale(d.key)) + ")"; });
            //return "translate(" + "0," + (y1scale(d.key)+margintop) + ")"; });
            return "translate(" + "0," + (y1scale(d.key)) + ")"; });

    this.barsrect = this.barlabel.selectAll(".bars")
        .data(function (d) { return d.values; });

    this.barsrect.exit().remove();

    this.barsrect.transition()
//         .attr("width", x2scale.rangeBand())
//         .attr("x", function (d) { return x2scale(d[series_label]); })
//         .attr("y", function (d) { return y1scale(Math.max(d[y_data], 0)); })
//         .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
//         .style("fill", function (d) { return colorscale(d[series_label]); });
        .attr("width", function (d) { 
                return Math.abs(x1scale(d[x_data]) - x1scale(0)); })
        .attr("y", function (d) {
            //return height-y2scale(d[series_label])-y2scale.rangeBand(); })
            //return -y2scale(d[series_label])-y2scale.rangeBand(); })
            return y2scale(d[series_label]); })
        .attr("x", function (d) {
            return x1scale(Math.min(d[x_data], 0)); })
        .attr("height", y2scale.rangeBand())
        .style("fill", function (d) { 
            return colorscale(d[series_label]); });
      
    this.barsrectenter = this.barsrect.enter()
        .append("rect")
        .attr("class", "bars");

    this.barsrectenter
        .attr("width", function (d) {
            return Math.abs(x1scale(d[x_data]) - x1scale(0)); })
        .attr("y", function (d) {
            //return height-y2scale(d[series_label])-y2scale.rangeBand(); })
            //return -y2scale(d[series_label])-y2scale.rangeBand(); })
            return y2scale(d[series_label]); })
        .attr("x", function (d) {
            return x1scale(Math.min(d[x_data], 0)); })
        .attr("height", y2scale.rangeBand())
        .style("fill", function (d) {
            return colorscale(d[series_label]); });

};
d3_chart2d.prototype.add_horizontalbarsdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the bar
    //add a change in color upon moving the mouse over the bar
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var metid = this.data1keymap.featureslabel;
    var x_data = this.data1keymap.xdata;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof d[x_data_lb] !== "undefined" && typeof d[x_data_ub] !== "undefined"){
                return (d[series_label] + ': ' + "value: " + d[x_data].toFixed(2) + ', ' + "95% ci: " + d[x_data_lb].toFixed(2) + "/" + d[x_data_ub].toFixed(2));
            } else {
                return (d[series_label] + ': ' + "value: " + d[x_data].toFixed(2))
            }
        })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.barsrectenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
        });
};
d3_chart2d.prototype.add_horizontalbarsdata1errorbars = function () {
    //add horizontal error bars to the chart
    //TODO: need to test correct positioning of error bars
    if (typeof this.data1keymap.xdatalb !== "undefined" && typeof this.data1keymap.xdatalb !== "undefined"){
        var x_data_lb = this.data1keymap.xdatalb;
        var x_data_ub = this.data1keymap.xdataub;
    } else {
        // do not attempt to draw error bars if there are no lb/ub
        return;
    };
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var height = this.height;

    //upperbounds: the horizontal lines representing the uppoer bounds of the confidence intervals.
    this.barsublines = this.barlabel.selectAll(".ublines")
        .data(function (d) { return d.values; });

    this.barsublines.exit().remove();

    this.barsublines.transition()
//         .attr("x1", function (d) { return x2scale(d[series_label]); })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
//         .attr("y1", function (d) { return height-y2scale(d[series_label]); })
//         .attr("y2", function (d) { return height-y2scale(d[series_label]) - y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(d[x_data_ub]); })
        .attr("x2", function (d) { return x1scale(d[x_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.barsublinesenter = this.barsublines.enter()
        .append("line")
        .attr("class", "ublines");

    this.barsublinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(d[x_data_ub]); })
        .attr("x2", function (d) { return x1scale(d[x_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[x_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
        
    //lowerbound: the horizontal lines representing the lowerbound of the confidence intervals.
    this.barslblines = this.barlabel.selectAll(".lblines")
        .data(function (d) { return d.values; });

    this.barslblines.exit().remove();

    this.barslblines.transition()
//         .attr("x1", function (d) { return x2scale(d[series_label]); })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
//         .attr("y1", function (d) { return height-y2scale(d[series_label]); })
//         .attr("y2", function (d) { return height-y2scale(d[series_label]) - y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(d[x_data_lb]); })
        .attr("x2", function (d) { return x1scale(d[x_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[x_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
      
    this.barslblinesenter = this.barslblines.enter()
        .append("line")
        .attr("class", "lblines");

    this.barslblinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(d[x_data_lb]); })
        .attr("x2", function (d) { return x1scale(d[x_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[x_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
        
    //connector: the horizontal line connecting the confidence intervals.
    this.barslbubconnector = this.barlabel.selectAll(".lbubconnector")
        .data(function (d) { return d.values; });

    this.barslbubconnector.exit().remove();

    this.barslbubconnector.transition()
//         .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
//         .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
//         .attr("y1", function (d) { return height-y2scale(d[series_label]) - y2scale.rangeBand()*0.5; })
//         .attr("y2", function (d) { return height-y2scale(d[series_label]) - y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(d[x_data_lb]); })
        .attr("x2", function (d) { return x1scale(d[x_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[x_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
      
    this.barslbubconnectorenter = this.barslbubconnector.enter()
        .append("line")
        .attr("class", "lbubconnector");

    this.barslbubconnectorenter
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(d[x_data_lb]); })
        .attr("x2", function (d) { return x1scale(d[x_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[x_data] == 0.0) { return 0; 
            } else { return 1; } 
        });

};
d3_chart2d.prototype.set_x1andy1axesstyle_horizontalbarschart = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var y1axisstyle = {
        'fill': 'none', 'display':'none'
    };
    var x1axisstyle = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     { 'selection': y1axisselector, 'style': y1axisstyle }]
    this.set_svggcss(selectorstyle);
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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            return ("series_label" + ": " + d.key);
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.linedata1enter.on('mouseover', function (d, i) {
        d3.select(this)
            .style("stroke", 'black');
        tip.show(d);
//         d3.select("#" + id + "tooltip")
//             .style("left", (d3.event.pageX + 10) + "px")
//             .style("top", (d3.event.pageY - 10) + "px")
//             .select("#value")
//             .text("series_label" + ": " + d.key);
//         //Show the tooltip
//         d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
            tip.hide(d);
//             d3.select("#"+id+"tooltip").classed("hidden", true);
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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            return ("series_label" + ": " + d.key);
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.linedata1enter.on('mouseover', function (d, i) {
        tip.show(d);
//         d3.select("#" + id + "tooltip")
//             .style("left", (d3.event.pageX + 10) + "px")
//             .style("top", (d3.event.pageY - 10) + "px")
//             .select("#value")
//             .text("series_label" + ": " + d.key);
//         //Show the tooltip
//         d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            tip.hide(d);
//             d3.select("#"+id+"tooltip").classed("hidden", true);
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
            .select("#" + id + "value")
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
    var feature_label = this.data1keymap.featureslabel;
    
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(d[x_data]) === 'string' && feature_label && typeof(feature_label) !== "undefined"){
                return(d[feature_label] + '\nx: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) !== 'string' && feature_label && typeof(feature_label) !== "undefined"){
                return(d[feature_label] + '\nx: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) === 'string' && series_label && typeof(series_label) !== "undefined"){
                return(d[series_label] + '\nx: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) !== 'string' && series_label && typeof(series_label) !== "undefined"){
                return(d[series_label] + '\nx: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) === 'string'){
                return('x: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
            } else {
                return ('x: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
                    };
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    //show tooltip
    this.pointsdata1enter
        .on("mouseover", function (d) {
            //Change fill color
            d3.select(this).style('fill', 'red');
            //Show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             if (typeof(d[x_data]) === 'string'){
//                 d3.select("#" + id + "tooltip")
//                     .style("left", (d3.event.pageX + 10) + "px")
//                     .style("top", (d3.event.pageY - 10) + "px")
//                     .select("#" + id + "value")
//                     .text('x: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
//             } else {
//                 d3.select("#" + id + "tooltip")
//                     .style("left", (d3.event.pageX + 10) + "px")
//                     .style("top", (d3.event.pageY - 10) + "px")
//                     .select("#" + id + "value")
//                     .text('x: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
//                     };
//             // Show the tooltip
//             d3.select("#" + id + "tooltip").classed("hidden", false);
            })  
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
            //d3.select("#" + id + "tooltip").classed("hidden", true);
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
        _this.data1.filters[feature_label].forEach(function (n) {
            if (n !== d[feature_label]) {
                filters.push(n); }
            //else {console.log(n);}; 
            });
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

    this.pointsdata1.exit().remove();

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
d3_chart2d.prototype.set_pointsstyle = function () {
    // predefined css style for points
    var pointsselector = '#' + this.id + 'points';
    var pointsstyle = {
        'stroke': 'none'
    };
    var pointsselector2 = '#' + this.id + 'points:hover';
    var pointsstyle2 = {
        'fill': 'red'
    };
    var selectorstyle = [{ 'selection': pointsselector, 'style': pointsstyle },
            { 'selection': pointsselector2, 'style': pointsstyle2 }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_pointsdata1featurestyle = function(){
    // predefined css style for featur labels
    var featuresselector = '#' + this.id + ' .featureslabels';
    var featuresstyle = {
        'font-size': '10px',
        'font-style': 'normal',
        'font-family': 'arial'
    };
    var selectorstyle = [{ 'selection': featuresselector, 'style': featuresstyle }]
    this.set_svggcss(selectorstyle);
    
}
d3_chart2d.prototype.set_pointsdata1featurestyle_notext = function(){
    // predefined css style for featur labels
    var featuresselector = '#' + this.id + ' .featureslabels';
    var featuresstyle = {
        'font-size': '10px',
        'font-style': 'normal',
        'font-family': 'arial',
        'opacity':'0.0'
    };
    var selectorstyle = [{ 'selection': featuresselector, 'style': featuresstyle }]
    this.set_svggcss(selectorstyle);
    
}
d3_chart2d.prototype.set_x1x2domain_verticalbarschart = function () {
    // set x1-domain and x1-domain for a barchart
    var series_label = this.data1keymap.serieslabel;
    var nestdatafiltered = this.data1.nestdatafiltered;
    var listdatafiltered = this.data1.listdatafiltered;
    this.x1scale.domain(nestdatafiltered.map(function (d) { return d.key; }));
    var x1scale = this.x1scale;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);
    this.x2scale.domain(series_labels_unique).rangeRoundBands([0,x1scale.rangeBand()]);
};
d3_chart2d.prototype.add_verticalbarsdata1 = function () {
    //add vertical bars to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

//    // Not needed
//     if (this.data1.nestdatafiltered.length===0){
//         return;
//         };

    this.barlabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered)

    this.barlabel.exit().remove();

    this.barlabel.transition()
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + ",0)"; 
            });

    this.barlabelenter = this.barlabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + ",0)"; 
            });

    this.barsrect = this.barlabel.selectAll(".bars")
        .data(function (d) { 
            return d.values; }
            );

    this.barsrect.exit().remove();

    this.barsrect.transition()
        .attr("width", x2scale.rangeBand())
        .attr("x", function (d) { 
            return x2scale(d[series_label]); 
            })
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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                return (d[series_label] + ': ' + "value: " + d[y_data].toFixed(2));
            }
            else{
                return (d[series_label] + ': ' + "value: " + d[y_data].toFixed(2) + ', ' + "95% ci: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            };
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.barsrectenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 //.text("series_label: " + d[series_label] + ', ' + "met_id: " + d[met_id] + ', ' + "Value: " + d[y_data].toFixed(2) + ', ' + "95% CI: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
//                 .text(d[series_label] + ': ' + "value: " + d[y_data].toFixed(2) + ', ' + "95% ci: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
//             //Show the tooltip
//             d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
            //d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_verticalbarsdata1errorbars = function () {
    //add vertical error bars to the chart
    //TODO: change from poly line to 3 lines: lb,ub,and connector

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    if (typeof(this.data1keymap.ydatalb)!=="undefined" && this.data1keymap.ydatalb!==null){var y_data_lb = this.data1keymap.ydatalb;}
    else{return;}
    if (typeof(this.data1keymap.ydataub)!=="undefined" && this.data1keymap.ydataub!==null){var y_data_ub = this.data1keymap.ydataub;}
    else{return;}
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
d3_chart2d.prototype.set_x1andy1axesstyle_verticalbarschart = function () {
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
//TODO:
// d3_graph(childclass of d3_svg):
// collapsible force layout: http://bl.ocks.org/mbostock/1062288
// collapsible force layout with data and labels: http://bl.ocks.org/mbostock/1093130
// labeled force layout: http://bl.ocks.org/mbostock/950642
// sticky for layout: http://bl.ocks.org/mbostock/3750558
// add nodes: http://bl.ocks.org/mbostock/929623
// metabolites, proteins, genes, reactions as nodes
// metabolite to reaction, reaction to protein to genes as links
function d3_graph2d() {
    // generic graph
    d3_svg_data.call(this);
};
d3_graph2d.prototype = Object.create(d3_svg_data.prototype);
d3_graph2d.prototype.constructor = d3_graph2d;
d3_graph2d.prototype.add_graph2d2tile = function(){
    // add graph2d to tile

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    var tileid = this.tileid;
    var id = this.id;
    var data1listdatafiltered = this.data1.listdatafiltered;

    this.svgelement = d3.select('#' + tileid+"panel-body").selectAll(".svg-responsive")
        .data([data1listdatafiltered]);
    
    this.svgenter = this.svgelement.enter()    
        .append("div")
        .attr("class",'svg-responsive')
        .append("svg")
        .attr("id", id)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svgelement.selectAll("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_graph2d.prototype.remove_graph2d = function(){
    // remove graph2d from tileid
    if (this.svgelement){
        this.svgelement.remove();
        this.svgelement = null;
        this.svgenter = null;
        this.svgg = null;
    };
};
d3_graph2d.prototype.add_title = function (title_I) {
    // add graph title
    this.title = this.svgg.append("text")
    .attr("x", this.width / 2)
    .attr("y", -this.margin.top / 2)
    .attr("class", "title")
    .attr("id", this.id+"title")
    .style("text-anchor", "middle")
    .text(title_I);
};
d3_graph2d.prototype.remove_title = function () {
    // remove graph title
    this.title.remove();
    this.title = null;
};
d3_graph2d.prototype.add_graph2d2tile_packlayoutcircle = function(){
    // add char2d to tile

    this.svgelement = d3.select('#' + this.tileid+"panel-body").selectAll("svg")
        .data([this.data1.listdatafiltered]);
    this.svgenter = this.svgelement.enter()
        .append("svg")
        .attr("id", this.id)
        .append('g')
        .attr("transform", "translate(" + this.width/2 + "," + this.width/2 + ")");
    this.svgelement.attr("width", this.width)
        .attr("height", this.height);

    this.svgg = this.svgelement.select('g');

};
//TODO:
d3_graph2d.prototype.set_diameter = function(diameter_I){
    // set uniform width and height
    this.width = diameter_I;
    this.height= diameter_I;
};
d3_graph2d.prototype.set_packlayout = function(padding_I){
    //set pack layout
    var margin = this.margin;
    var width = this.width;
    var height = this.height;
    if (typeof this.data1keymap.xdata !== "undefined"){
        var size = this.data1keymap.xdata;
    } else {
        var size = 'size';
    };

    this.packlayout = d3.layout.pack()
        .padding(padding_I)
        .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
        .value(function(d) { return d[size]; })
};
d3_graph2d.prototype.set_packlayoutfocusdata1 = function(packlayoutfocus_I){
    //set pack layout focus
    if (packlayoutfocus_I){this.packlayoutfocus = packlayoutfocus_I;}
    else {this.packlayoutfocus=this.data1.nestdatafiltered[0]};    
};
d3_graph2d.prototype.set_packlayoutnodesdata1 = function(){
    //set pack layout nodes
    this.packlayoutnodes = this.packlayout.nodes(this.data1.nestdatafiltered[0]);
};
d3_graph2d.prototype.set_packlayoutviewdata1 = function(packlayoutview_I){
    //set pack layout view
    if (packlayoutview_I){this.packlayoutview = packlayoutview_I;}
    else {this.packlayoutview=null}; 
};
d3_graph2d.prototype.add_packlayoutcirclesdata1 = function(){
    // add circles to pack layout
    var focus = this.packlayoutfocus;
    var nodes = this.packlayoutnodes;
    var root = this.data1.nestdatafiltered[0];
    var colorscale = this.colorscale;
    var zoom_packlayout = this.zoom_packlayout;
    var _this = this;
    
    this.packlayoutcircle = this.svgg.selectAll("circle")
        .data(nodes);

//     this.packlayoutcircle.exit().remove();

//     this.packlayoutcircle.transition()
//         .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
//         .style("fill", function(d) { return d.children ? colorscale(d.depth) : null; })
//         .on("click", function(d) { if (focus !== d){ zoom_packlayout(d), d3.event.stopPropagation(); };});

    this.packlayoutcircleenter = this.packlayoutcircle.enter()
        .append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { return d.children ? colorscale(d.depth) : null; })
        .on("click", function(d) { if (focus !== d){ zoom_packlayout(d,_this), d3.event.stopPropagation(); };});

};
d3_graph2d.prototype.add_packlayouttextdata1 = function(){
    // add text to pack layout
    var focus = this.packlayoutfocus;
    var nodes = this.packlayoutnodes;
    var root = this.data1.nestdatafiltered[0];
    var colorscale = this.colorscale;
    var packlayoutzoom = this.packlayoutzoom;
    
    this.packlayouttext = this.svgg.selectAll("text")
        .data(nodes);

//     this.packlayouttext.exit().remove();

//     this.packlayouttext.transition()
//         .attr("class", "label")
//         .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
//         .style("display", function(d) { return d.parent === root ? null : "none"; })
//         .text(function(d) { return d.key; });

    this.packlayouttextenter = this.packlayouttext.enter()
        .append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? null : "none"; })
        .text(function(d) { return d.key; });

};
d3_graph2d.prototype.set_packlayoutnode = function(d){
    // set the node selection for the packlayoutzoom
    this.node = this.svgg.selectAll("circle,text");
}
d3_graph2d.prototype.zoom_packlayout = function(d,_this){
   // pack layout zoom function 
    _this.set_packlayoutfocusdata1(d);
    var focus = _this.packlayoutfocus;
    var view = _this.packlayoutview;
    var margin = _this.margin.top;
    var diameter = _this.width;
    var packlayoutzoomto = _this.zoomto_packlayout;

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
d3_graph2d.prototype.zoomto_packlayout = function(view_I,diameter_I){
    // pack layout zoomto function
    // INPUT: 
    // view_I = [root.x, root.y, root.r * 2 + margin]
    // TODO:
    // where are the .r, .x, and .y properties coming from?
    if (view_I && diameter_I){
        var k = diameter_I / view_I[2]; 
        this.set_packlayoutviewdata1(view_I);
        var view = this.view;
    } else {
        var k = this.width / this.data1.nestdatafiltered[0].r + this.margin.top;
        var view = [this.data1.nestdatafiltered[0].x,this.data1.nestdatafiltered[0].y,this.data1.nestdatafiltered[0].r*2 + this.margin.top];
    };
    this.node.attr("transform", function(d) { return "translate(" + (d.x - view[0]) * k + "," + (d.y - view[1]) * k + ")"; });
    this.packlayoutcircle.attr("r", function(d) { return d.r * k; });
};
d3_graph2d.prototype.add_packlayoutdata1zoom = function(){
    // add zoom to svg element of the packlayoutzoom
    var packlayoutzoom = this.zoomto_packlayout;
    //var packlayoutzoom = this.packlayoutzoom;
    var id = this.id
    var root = this.data1.nestdatafiltered[0];
    d3.select("#"+this.id).on("click",function() { packlayoutzoom(root); });
};
// TODO: css
// <style>

// .node {
//   cursor: pointer;
// }

// .node:hover {
//   stroke: #000;
//   stroke-width: 1.5px;
// }

// .node--leaf {
//   fill: white;
// }

// .label {
//   font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
//   text-anchor: middle;
//   text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
// }

// .label,
// .node--root,
// .node--leaf {
//   pointer-events: none;
// }

// </style>
d3_graph2d.prototype.set_treelayoutdata1root = function(treelayoutroot_I){
    //set tree layout root
    if (treelayoutroot_I){this.treelayoutroot = treelayoutroot_I;}
    else {this.treelayoutroot=this.data1.nestdatafiltered[0]};  
    this.treelayoutroot.x0 = this.height/2;
    this.treelayoutroot.y0 = 0;  
};
d3_graph2d.prototype.set_treelayoutdata1nodeorigin = function(nodeorigin_I){
    //set tree layout nodes
    this.treelayoutnodeorigin = nodeorigin_I;
};
d3_graph2d.prototype.set_treelayoutdata1tree = function(){
    // set the layout tree
    var height = this.height;
    var width = this.width;
    this.treelayouttree = d3.layout.tree()
        .size([height,width]);
};
d3_graph2d.prototype.set_treelayoutdata1diagonal = function(){
    // set the layout diagonal
    this.treelayoutdiagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });
};
d3_graph2d.prototype.collapse_treelayoutroot = function(){
    // initialize with a collapse root
    // collapse function
    function collapse(d){
        if (d.children){
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        };
    };
    this.treelayoutroot.children.forEach(collapse);
};
// update
d3_graph2d.prototype.set_treelayoutdata1nodes = function(){
    // compute treelayout nodes
    var root = this.treelayoutroot
    this.treelayoutnodes = this.treelayouttree.nodes(root).reverse();

    //normalize for fixed depth
    this.treelayoutnodes.forEach(function(d) { d.y = d.depth * 180; });
};
d3_graph2d.prototype.set_treelayoutdata1links = function(){
    // compute treelayout links
    var nodes = this.treelayoutnodes
    this.treelayoutlinks = this.treelayouttree.links(nodes);
};
d3_graph2d.prototype.add_treelayoutdata1node = function(source_I){
    // add tree layout nodes
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var source = source_I;
    var click = this.togglechildren_treelayout;
    var _this = this;
    var duration= this.duration;

    this.treelayoutnode = this.svgg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // update node origin
    this.set_treelayoutdata1nodeorigin(i);

    // Enter any new nodes at the parent's previous position.
    this.treelayoutnodeenter = this.treelayoutnode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click(_this));

    this.treelayoutnodeenter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    this.treelayoutnodeenter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    this.treelayoutnodeupdate = this.treelayoutnode.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    this.treelayoutnodeupdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    this.treelayoutnodeupdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    this.treelayoutnodeexit = this.treelayoutnode.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    this.treelayoutnodeexit.select("circle")
        .attr("r", 1e-6);

    this.treelayoutnodeexit.select("text")
        .style("fill-opacity", 1e-6);
};
d3_graph2d.prototype.add_treelayoutdata1link = function(source_I){
    // add tree layout links
    var i = this.treelayoutnodeorigin;
    var nodes = this.treelayoutnodes;
    var links = this.treelayoutlinks;
    var source = source_I;
    var duration= this.duration;
    var diagonal = this.treelayoutdiagonal;

    // Update the links…
    this.treelayoutlink = this.svgg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    this.treelayoutlink.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
    }); 

    // Transition links to their new position.
    this.treelayoutlink.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    this.treelayoutlink.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
        })
        .remove();
};
d3_graph2d.prototype.save_treelayoutdata1positions = function(){
    // Stash the old positions for transition.
    this.treelayoutnodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
        });
};
d3_graph2d.prototype.togglechildren_treelayout = function(_this_I){
    // toggle children on click
    return function(d){
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        };
       //_this_I.render(d);
       _this_I.update_treelayout(d);
    };
};
d3_graph2d.prototype.set_treelayoutdata1css = function () {
    //set predefined treelayout style

    var selector1 = '#' + this.id + ' .node';
    var style1 = {
        'cursor': 'pointer'
    };
    var selector2 = '#' + this.id + ' .node circle';
    var style2= {
        'fill': '#fff',
        'stroke': 'steelblue',
        'stroke-width': '1.5px'
    };
    var selector3 = '#' + this.id + ' .node text';
    var style3 = {
        'font': '10px sans-serif'
    };
    var selector4 = '#' + this.id + ' .link';
    var style4 = {
        'fill': 'none',
        'stroke': '#ccc',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 },
                     { 'selection': selector2, 'style': style2 },
                     { 'selection': selector3, 'style': style3 },
                     { 'selection': selector4, 'style': style4 }];
    this.set_svggcss(selectorstyle);
};
d3_graph2d.prototype.update_treelayout = function (source_I) {
    // update tree layout
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
//var d3_html = function () {
function d3_html() {
    // generic html element
    this.id = '';
    this.tileid = '';
    this.htmlelement = null;
    this.html = null;
    this.data = null;
    this.datakeymap = {}; // mapping of keys to data element, chart elements, or other descriptor
};
d3_html.prototype.add_html2tile = function(){
    // set the html
    var id = this.id;
    var tileid = this.tileid;
    var htmlclass = this.htmlclass;
    //var listdatafiltered = this.data.listdatafiltered;
    var htmlheaders = this.htmlheaders;

    this.html = d3.select('#'+tileid+"panel-body").selectAll(".html-responsive")
        //.data([listdatafiltered]);
        .data([0]);

    this.htmlenter = this.html.enter()
        .append("div")
        .attr("class","html-responsive")
        .attr("id",id+"html");

    this.html.exit().remove();

};
d3_html.prototype.set_id = function(htmlid_I){
    // set the htmlid
    this.id = htmlid_I;
};
d3_html.prototype.set_tileid = function(htmltileid_I){
    // set the html tileid
    this.tileid = htmltileid_I;
};
d3_html.prototype.add_data = function(data_I){
    // add data to tile
    this.data = data_I[0];
};
d3_html.prototype.set_datakeymap = function(datakeymap_I){
    // set html data key map
    this.datakeymap = datakeymap_I[0];  
};
d3_html.prototype.add_ndata = function(data_I){
    // add data to tile
    this.data = data_I;
};
d3_html.prototype.set_ndatakeymap = function(datakeymap_I){
    // set html data key map
    this.datakeymap = datakeymap_I;  
};
d3_html.prototype.set_htmlstyle = function () {
    // predefined css style for html header rows
    var htmlselector = "#" + this.tileid + " .html-responsive";
    var htmlstyle = {
        //'html-layout': 'fixed',
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': htmlselector, 'style': htmlstyle }]
    this.set_d3css(selectorstyle);
};
d3_html.prototype.set_htmlescherstyle = function () {
    // predefined css style for html header rows
    var htmlselector = "#" + this.tileid + " .html-responsive";
    var htmlstyle = {
        //'html-layout': 'fixed',
        'width': '100%',
        'height':'500px',
        'margin-bottom': '15px',
        'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': htmlselector, 'style': htmlstyle }]
    this.set_d3css(selectorstyle);
};
d3_html.prototype.set_d3css = function (selectionstyle_I) {
    //set custom css style to d3
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        d3.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_html.prototype.add_draganddrop = function () {
    // add file drag and drop for input
};
d3_html.prototype.add_checkbox = function () {
    // add checkbox for input
};
d3_html.prototype.add_color = function () {
    // add color pallet for input
};
d3_html.prototype.add_range = function () {
    // add range slider for input
};
d3_html.prototype.add_form = function(textarea_valuetext_I){
    // add form to tile
    if (typeof texarea_valuetext_I !== "undefined"){var textarea_valuetext = textarea_valuetext_I;}
    else{var textarea_valuetext = this.data.listdatafiltered;}
    var id = this.id;

    this.htmlform = this.html.selectAll("form")
        .data([textarea_valuetext]);

    this.htmlformenter = this.htmlform.enter()
        .append("form")
        .attr("id", id + 'form');

    this.htmlform.exit().remove();

}
d3_html.prototype.add_input2form = function (textarea_valuetext_I) {
    // add text area for input
    // INPUT:
    if (typeof texarea_valuetext_I !== "undefined"){var textarea_valuetext = textarea_valuetext_I;}
    else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};

    var id = this.id;

//     this.htmlform = this.html.append("div")
//         .attr("class","form-group")
//         .attr("id", id + 'form');

//     for (i=0;i<textarea_valuetext.length;i++){
//         var formlabel = this.htmlform.append("label")
//             .text(textarea_valuetext[i].text)
//             .attr("id", id + 'formlabel' + textarea_valuetext[i].text);
//         var forminput = this.htmlform.append("input")
//             .attr("class","form-control")
//             .attr("type","text")
//             .attr("placeholder",textarea_valuetext[i].value)
//             .attr("value",textarea_valuetext[i].value)
//             .attr("id", id + 'forminput'+ textarea_valuetext[i].text);
//     };

    this.htmlformgroup = this.htmlform.selectAll(".form-group")
        .data(textarea_valuetext);

    this.htmlformgroupenter = this.htmlformgroup.enter()
        .append("div")
        .attr("class","form-group")
        .attr("id", id + 'form-group');

    this.htmlformgroup.exit().remove();

    this.htmlformlabel = this.htmlformgroup.selectAll("label")
        .data(function(row){
            var textvalue = [];
            textvalue.push({text:row.text,value:row.value});
            return textvalue;
        });

    this.htmlformlabelenter = this.htmlformlabel.enter()
        .append("label")
        .attr("id", function(d){return id + 'formlabel' + d.text;})
        .text(function(d){return d.text;});

    this.htmlformlabel.transition()
        .attr("id", function(d){return id + 'formlabel' + d.text;})
        .text(function(d){return d.text;});

    this.htmlformlabel.exit().remove();

    this.htmlforminput = this.htmlformgroup.selectAll("input")
        .data(function(row){
            var textvalue = [];
            textvalue.push({text:row.text,value:row.value});
            return textvalue;
        });

    this.htmlforminput.exit().remove();

    this.htmlforminput.transition()
        .attr("class","form-control")
        .attr("type","text")
        .attr("value",function(d){return d.value;})
        .attr("id", function(d){return id + 'forminput' + d.text;});

    this.htmlforminputenter = this.htmlforminput.enter()
        .append("input")
        .attr("class","form-control")
        .attr("type","text")
        //.attr("placeholder",textarea_valuetext[i].value)
        .attr("value",function(d){return d.value;})
        .attr("id", function(d){return id + 'forminput' + d.text;});
};
d3_html.prototype.update_forminput = function(textarea_valuetext_I){
    // update the form
    if (typeof texarea_valuetext_I !== "undefined"){var textarea_valuetext = textarea_valuetext_I;}
    else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};
    var id = this.id;

    for (var i=0;i<textarea_valuetext.length;i++){
        var node = d3.select("#"+id + 'forminput'+ textarea_valuetext[i].text).node();
        if (node){node.value=textarea_valuetext[i].value;};
    };
};
d3_html.prototype.add_submitbutton2form = function (button_idtext_I) {
    // add submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
    else{var button_idtext = button_idtext_I;}

    var id = this.id;
    var tileid = this.tileid;

    // note: chaining submitbuttongroup to htmlformenter instead of htmlform
    // reason:      ensures that buttons will be added only once after a listener event
    //              has been added to the property of the button.
    this.submitbuttongroup = this.htmlformenter.selectAll(".btn-group")
        .data(button_idtext)

    this.submitbuttongroup.exit().remove();

    this.submitbuttongroupenter = this.submitbuttongroup.enter()
        .append("div")
        .attr("class","btn-group")
        .attr("id", id + "submitbtn-group");

    this.submitbutton = this.submitbuttongroup.selectAll(".btn btn-default")
        .data(function(row){
            var idtext = [];
            idtext.push({id:row.id,text:row.text});
            return idtext;
        });

    this.submitbutton.exit().remove();

    this.submitbutton.transition()
        .attr("type","submit")
        .attr("class", "btn btn-default")
        .attr("id", function(d){return id + 'submitbutton' + d.id;})
        .text(function(d){return d.text;});

    this.submitbuttonenter = this.submitbutton.enter()
        .append("button")
        .attr("type","submit")
        .attr("class", "btn btn-default")
        .attr("id", function(d){return id + 'submitbutton' + d.id;})
        .text(function(d){return d.text;});
};
d3_html.prototype.add_dropdownbuttongroup_href = function () {
    // add dropdown button group to the body of the html
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.datakeymap.buttonparameter;
    var liparameter = this.datakeymap.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;

    this.buttongroup = this.html.selectAll(".btn-group")
        .data(nestdatafiltered)

    this.buttongroupenter = this.buttongroup.enter()
        .append("div")
        .attr("class","btn-group")
        .attr("id", id + "btn-group");

    this.buttongroup.exit().remove();

    this.button = this.buttongroup.selectAll(".btn btn-group-sm btn-default dropdown-toggle")
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.buttonenter = this.button.enter()
        .append("button")
        .attr("class", "btn btn-group-sm btn-default dropdown-toggle" )
        .attr("data-toggle", "dropdown")
        .attr("aria-expanded", "true")
        .attr("id", function(d){return id + "button" + d.key;})
        //.attr("aria-expanded", "false")
        .text(function(d){return d.key;})
        .append("span")
        .attr("class","caret");

    this.button
        .attr("class", "btn btn-group-sm btn-default dropdown-toggle" )
        .attr("data-toggle", "dropdown")
        .attr("aria-expanded", "true")
        .attr("id", function(d){return id + "button" + d.key;})
        .text(function(d){return d.key;})
        .append("span")
        .attr("class","caret");

    this.button.exit().remove();

    this.ul = this.buttongroup.selectAll(".dropdown-menu")
        .data(function(row){
            var keyvalues = [];
            keyvalues.push({key:row.key,values:row.values});
            return keyvalues;
            });

    this.ulenter = this.ul.enter()
        .append("ul")
        .attr("class","dropdown-menu")
        .attr("aria-labelledby", function(d){return id + "button" + d.key;})
        .attr("id",function(d){return id + "dropdown-menu"+ d.key;})
        .attr("role","menu");

    this.ul.exit().remove();

    this.li = this.ul.selectAll("li")
        .data(function(row){
            var buttonlitext = [];
            var key = row.key;
            row.values.forEach(function(d){
                buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
                });
            return buttonlitext;
            });
    
    this.lienter = this.li.enter()
        .append("li").append("a")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.select("a")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.exit().remove();
};
d3_html.prototype.render = function(){
    // make render function here...
};
d3_html.prototype.set_url = function(url_I){
    // set the base url_I
    this.url = url_I;
};
d3_html.prototype.add_datalist = function (datalist_valuetext_I) {
    // add datalist (menu) for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];

    var tileid = this.tileid;  

    var datalist = this.html.append("select")
        .attr("id", tileid + 'datalist');

    for (var i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };  
};
d3_html.prototype.add_paragraphs = function(paragraph_I){
    // add paragraphs to tile body
    // INPUT:
    // paragraph_I = [{pclass:"text-left",ptext:"",pclass:"text-muted"},...]

    this.paragraph = this.html.selectAll("p")
        .data(paragraph_I);

    this.paragraphenter = this.paragraph.enter()
        .append("p")
        .attr("class",function(d){return d.pclass;})
        .text(function(d){return d.ptext;})
        .append("br");

    this.paragraph
        .attr("class",function(d){return d.pclass;})
        .text(function(d){return d.ptext;})
        .append("br");

    this.paragraph.exit().remove();
    
};
d3_html.prototype.add_headerandlistgroup_href = function(){
    // add list groups with individual headers to the tile body
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.datakeymap.buttonparameter;
    var liparameter = this.datakeymap.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;

    this.headergroup = this.html.selectAll("#" + id + "header-group")
        .data(nestdatafiltered)

    this.headergroupenter = this.headergroup.enter()
        .append("div")
        .attr("class","list-group")
        .attr("id", id + "header-group");

    this.headergroup.exit().remove();

    this.header = this.headergroup.selectAll("#" + id + "header")
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.headerenter = this.header.enter()
        .append("div")
        .attr("class","list-group-item")
        .attr("id",id + "header")
        .append("h4")
        .attr("class","list-group-item-heading")
        .attr("id", function(d){return id + "h4" + d.key;})
        //.attr("aria-expanded", "false")
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","");});

    this.header.selectAll("h4")
        .attr("class","list-group-item-heading")
        .attr("id", function(d){return id + "h4" + d.key;})
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","");});

    this.header.exit().remove();

//     this.ul = this.headergroup.selectAll(".list-group")
//         .data(function(row){
//             var keyvalues = [];
//             keyvalues.push({key:row.key,values:row.values});
//             return keyvalues;
//             });

//     this.ulenter = this.ul.enter()
//         .append("div")
//         .attr("class","list-group")
//         .attr("id",function(d){return id + "list-group"+ d.key;});

//     this.ul.exit().remove();

    //this.li = this.ul.selectAll("list-group-item")
    this.li = this.headergroup.selectAll("#" + id + "li")
        .data(function(row){
            var buttonlitext = [];
            var key = row.key;
            row.values.forEach(function(d){
                buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
                });
            return buttonlitext;
            });
    
    this.lienter = this.li.enter()
        .append("a")
        .attr("class","list-group-item")
        .attr("id",id + "li")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.select("a")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.exit().remove();
}
d3_html.prototype.add_media = function(){
    // add media to the tile body

    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;
    var mediasrc = this.datakeymap.htmlmediasrc;
    var mediaalt = this.datakeymap.htmlmediaalt;
    var mediahref = this.datakeymap.htmlmediahref;
    var mediaheading = this.datakeymap.htmlmediaheading;
    var mediaparagraph = this.datakeymap.htmlmediaparagraph;

    this.htmlmedia = this.html.selectAll(".media")
        .data(listdatafiltered);

    this.htmlmediaenter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media");
    
    this.htmlmedia.exit().remove();

    this.htmlmediaimg = this.htmlmedia.selectAll(".media-left media-top")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediaimg.selectAll("a")
        .attr("href",function(d){return d[mediahref];})
    this.htmlmediaimg.selectAll("img")
        .attr("class","media-object img-responsive")
        .attr("src",function(d){return d[mediasrc];})
        .attr("alt",function(d){return d[mediaalt];});

    this.htmlmediaimg.exit().remove();
    
    this.htmlmediaimgenter = this.htmlmediaimg.enter()
        .append("div")
        .attr("class","media-left media-top")
        .append("a")
        .attr("href",function(d){return d[mediahref];})
        .append("img")
        .attr("class","media-object img-responsive")
        .attr("src",function(d){return d[mediasrc];})
        .attr("alt",function(d){return d[mediaalt];});

    this.htmlmediabody = this.htmlmedia.selectAll(".media-body")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediabody.selectAll("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});
    this.htmlmediabody.selectAll("p")
        .text(function(d){return d[mediaparagraph];});

    this.htmlmediabody.exit().remove();

    this.htmlmediabodyh4enter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media-body")
        .append("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});

    this.htmlmediabodypenter = this.htmlmedia.enter()
        .append("p")
        .text(function(d){return d[mediaparagraph];});
        
}
d3_html.prototype.add_mediasvg = function(){
    // add svg media to the tile body

    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;
    var mediasrc = this.datakeymap.htmlmediasrc;
    var mediaalt = this.datakeymap.htmlmediaalt;
    var mediahref = this.datakeymap.htmlmediahref;
    var mediaheading = this.datakeymap.htmlmediaheading;
    var mediaparagraph = this.datakeymap.htmlmediaparagraph;
    
    this.htmlmedia = this.html.selectAll(".media")
        .data(listdatafiltered);

    this.htmlmediaenter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media");
    
    this.htmlmedia.exit().remove();

    this.htmlmediaimg = this.htmlmedia.selectAll(".media-left media-top")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediaimg.selectAll("a")
        .attr("href",function(d){return d[mediahref];})
    this.htmlmediaimg.selectAll("svg")
        .attr("class","media-object img-responsive")
        .html(function(d){return d[mediasrc];});

    this.htmlmediaimg.exit().remove();
    
    this.htmlmediaimgenter = this.htmlmediaimg.enter()
        .append("div")
        .attr("class","media-left media-top")
        .append("a")
        .attr("href",function(d){return d[mediahref];})
        .html(function(d){return d[mediasrc];});

    this.htmlmediabody = this.htmlmedia.selectAll(".media-body")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediabody.selectAll("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});
    this.htmlmediabody.selectAll("p")
        .text(function(d){return d[mediaparagraph];});

    this.htmlmediabody.exit().remove();

    this.htmlmediabodyh4enter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media-body")
        .append("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});

    this.htmlmediabodypenter = this.htmlmedia.enter()
        .append("p")
        .text(function(d){return d[mediaparagraph];});
        
};
d3_html.prototype.add_iphrame = function(){
    // add an iphrame to tile body
    // todo:
    var iphrameclass = this.datakeymap.htmliphrameclass;
    var iphramehref = this.datakeymap.htmliphramehref;
};
d3_html.prototype.add_escher = function(escherdataindex_I,escherembeddedcss_I,escheroptions_I){
    // add escher map to tile body
    var id = this.id;
    if (this.eschermetabolitedata!==null){
        var metaboliteid = this.datakeymap[this.eschermetabolitedata].key;
        var metabolitevalues = this.datakeymap[this.eschermetabolitedata].values;
        };
    if (this.escherreactiondata!==null){
        var reactionid = this.datakeymap[this.escherreactiondata].key;
        var reactionvalues = this.datakeymap[this.escherreactiondata].values;
        };
    if (this.eschergenedata!==null){
        var geneid = this.datakeymap[this.eschergenedata].key;
        var genevalues = this.datakeymap[this.eschergenedata].values;
        };


    if (typeof escherdataindex_I === "undefined" && this.eschermetabolitedata!==null){
        var metdata = this.data[this.eschermetabolitedata].convert_listdatafiltered2escherobjectlist(metaboliteid,metabolitevalues);
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.metabolitedata !== "undefined"){
        var metdata = this.data[escherdataindex_I.metabolitedata].nestdatafiltered[0].values;
    } else{ 
        var metdata = null;
    };
    if (typeof escherdataindex_I === "undefined" && this.escherreactiondata!==null){
        var rxndata = this.data[this.escherreactiondata].convert_listdatafiltered2escherobjectlist(reactionid,reactionvalues);
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.reactiondata !== "undefined"){
        var rxndata = this.data[escherdataindex_I.reactiondata].nestdatafiltered[0].values;
    }else{ 
        var rxndata = null;
    };
    if (typeof escherdataindex_I === "undefined" &&  this.eschergenedata!==null){
        var genedata = this.data[this.eschergenedata].convert_listdatafiltered2escherobjectlist(geneid,genevalues);;
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.genedata !== "undefined"){
        var genedata = this.data[escherdataindex_I.genedata].nestdatafiltered[0].values;
    }else{ 
        var genedata = null;
    };
    if (typeof escherdataindex_I === "undefined" && this.eschermapdata!==null){
        var mapdata = this.data[this.eschermapdata].listdatafiltered[0].eschermap_json;
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.mapdata !== "undefined") {
        var mapdata = this.data[escherdataindex_I.mapdata].listdatafiltered[0].eschermap_json;
    }else{ 
        var mapdata = null;
    };
    if (typeof escherdataindex_I === "undefined" && this.eschermodeldata!==null){
        var modeldata = this.data[this.eschermodeldata];
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.modeldata !== "undefined"){
        var modeldata = this.data[escherdataindex_I.modeldata];
    }else{ 
        var modeldata = null;
    };
    if (typeof escherembeddedcss_I === "undefined"){
        var embeddedcss = this.escherembeddedcss;
    } else {
        var embeddedcss = escherembeddedcss_I;
    };
    if (typeof escheroptions_I === "undefined"){
        var options = this.escheroptions;
    } else {
        var options = escheroptions_I;
    };

    this.html.select("#"+id+"escher").remove();

    var htmlescher = this.html
        .append("div")
        //.attr("class","")
        .attr("id",id + "escher")
        .style("height","100%")
        .style("width","100%");

    // make the escher object
    d3.text('lib/builder-embed-1.0.0.css', function(e, css) {
        if (e) console.warn(e);
        var embeddedcss = "#"+id+"escher.div";
        var options = {unique_map_id:'escher01'};
        //var escherbuilder = escher.Builder(mapdata,modeldata,css,htmlescher,options);
        var escherbuilder = escher.Builder(null,null,css,htmlescher,options);
        if (mapdata){escherbuilder.load_map(mapdata,false);};
        if (modeldata){escherbuilder.load_model(modeldata,false);};
        if (metdata){escherbuilder.set_metabolite_data(metdata);};
        if (rxndata){escherbuilder.set_reaction_data(rxndata);};
        if (genedata){escherbuilder.set_gene_data(genedata);};
    });

};
d3_html.prototype.set_escher = function(escherdataindex_I,escherembeddedcss_I,escheroptions_I){
    // set escher parameters
    if (typeof escherdataindex_I.metabolitedata !== "undefined"){
        this.eschermetabolitedata = escherdataindex_I.metabolitedata;
    } else {
        this.eschermetabolitedata = null;
    };
    if (typeof escherdataindex_I.reactiondata !== "undefined"){
        this.escherreactiondata = escherdataindex_I.reactiondata;
    } else {
        this.escherreactiondata = null;
    };
    if (typeof escherdataindex_I.genedata !== "undefined"){
        this.eschergenedata = escherdataindex_I.genedata;
    } else {
        this.eschergenedata = null;
    };
    if (typeof escherdataindex_I.mapdata !== "undefined"){
        this.eschermapdata = escherdataindex_I.mapdata;
    } else {
        this.eschermetdata = null;
    };
    if (typeof escherdataindex_I.modeldata !== "undefined"){
        this.eschermodeldata = escherdataindex_I.modeldata;
    } else {
        this.eschermodeldata = null;
    };
    if (typeof escherembeddedcss_I !== "undefined"){
        this.escherembeddedcss = escherembeddedcss_I;
    } else {
        this.escherembeddedcss = null;
    };
    if (typeof escheroptions_I !== "undefined"){
        this.escheroptions = escheroptions_I;
    } else {
        this.escheroptions = null;
    };

};
d3_html.prototype.add_headeranddatalist_href = function(){
    // adds data lists groups with individual headers to the tile body
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.datakeymap.buttonparameter;
    var liparameter = this.datakeymap.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;;

    this.headergroup = this.html.selectAll("#" + id + "header-group")
        .data(nestdatafiltered)

    this.headergroupenter = this.headergroup.enter()
        .append("div")
        .attr("class","list-group-item")
//         .append("div")
//         .attr("class","row")
//         .append("div")
//         .attr("class","col-sm-6")
        .attr("id", id + "header-group");

    this.headergroup.exit().remove();

    this.header = this.headergroup.selectAll("#" + id + "header")
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.headerenter = this.header.enter()
        .append("h4")
        .attr("class","list-group-item-heading")
        //.attr("id",id + "header")
        .attr("id", function(d){return id + "h4" + d.key;})
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","");});

    this.header.selectAll("h4")
        .attr("class","list-group-item-heading")
        //.attr("id",id + "header")
        .attr("id", function(d){return id + "h4" + d.key;})
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","");});

    this.header.exit().remove();

    this.select = this.headergroup.selectAll("select")
        .data(function(row){
            var keyvalues = [];
            keyvalues.push({key:row.key,values:row.values});
            return keyvalues;
            });

    this.selectenter = this.select.enter()
        .append("select")
        .attr("class","form-control")
        //.attr("id",function(d){return id + "select"+ d.key;});
        .attr("id",id + "select");

    this.select.selectAll("select")
        .attr("class","form-control")
        //.attr("id",function(d){return id + "select"+ d.key;});
        .attr("id",id + "select");

    this.select.exit().remove();

    this.option = this.select.selectAll("option")
        .data(function(row){
            var buttonlitext = [];
            var key = row.key;
            row.values.forEach(function(d){
                buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
                });
            return buttonlitext;
            });
    
    this.optionenter = this.option.enter()
        .append("option")
        .attr("id",id + "option")
        .attr("value",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.option.select("option")
        .attr("value",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.option.exit().remove();
};
d3_html.prototype.add_headeranddatalistsubmit_href = function(){
    // add submit button trigger even for header and datalist html

    var button_idtext = this.button_idtext;
    var id = this.id;
    var tileid = this.tileid;
	
	function go2url(){
	    window.location.href = d3.select("#"+ id + "select").node().value;
        // submit on enter
        var selection = d3.select(window),
        kc = 13;
        selection.on('keydown.' + kc, function () {
            if (d3.event.keyCode == kc) {
                submit();
            }
        });
	};

    d3.select("#"+ tileid + 'submitbutton'+button_idtext.id).on("click",go2url);

};
d3_html.prototype.set_formsubmitbuttonidtext = function(button_idtext_I) {
    // set submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){this.button_idtext = {'id':'submit1','text':'submit'};}
    else{this.button_idtext = button_idtext_I;}
};

d3_html.prototype.export_filtermenujson = function () {
    // export the filter as json

    var a = document.createElement('a');
    a.download ="filter" + '.json'; // file name
    var j = JSON.stringify(this.data.filters);
    a.setAttribute("href-lang", "application/json");
    a.href = 'data:text/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};

//TODO: convert import closure to seperate function
d3_html.prototype.import_filtermenujson = function(){
    // import the filter from json
    // TODO...
    var filtermenu = null;
};

//TODO: convert add_jsonimportandexportbutton2tile
// d3_html.prototype.add_submitbutton2form = function (button_idtext_I) {
//     // add submit button
//     // INPUT:
//     //e.g. {'id':'submit1','text':'submit'};
//     if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
//     else{var button_idtext = button_idtext_I;}

//     var id = this.id;
//     var tileid = this.tileid;

//     // note: chaining submitbuttongroup to htmlformenter instead of htmlform
//     // reason:      ensures that buttons will be added only once after a listener event
//     //              has been added to the property of the button.
//     this.submitbuttongroup = this.htmlformenter.selectAll(".btn-group")
//         .data(button_idtext)

//     this.submitbuttongroup.exit().remove();

//     this.submitbuttongroupenter = this.submitbuttongroup.enter()
//         .append("div")
//         .attr("class","btn-group")
//         .attr("id", id + "submitbtn-group");

//     this.submitbutton = this.submitbuttongroup.selectAll(".btn btn-default")
//         .data(function(row){
//             var idtext = [];
//             idtext.push({id:row.id,text:row.text});
//             return idtext;
//         });

//     this.submitbutton.exit().remove();

//     this.submitbutton.transition()
//         .attr("type","submit")
//         .attr("class", "btn btn-default")
//         .attr("id", function(d){return id + 'submitbutton' + d.id;})
//         .text(function(d){return d.text;});

//     this.submitbuttonenter = this.submitbutton.enter()
//         .append("button")
//         .attr("type","submit")
//         .attr("class", "btn btn-default")
//         .attr("id", function(d){return id + 'submitbutton' + d.id;})
//         .text(function(d){return d.text;});
// };

d3_html.prototype.add_jsonexportbutton2tile = function () {
    // add button to export the table element
    // http://www.html5rocks.com/en/tutorials/file/dndfiles/
    var this_ = this;
    var tileid = this.tileid;

    function exportfiltermenujson(){
        this_.export_filtermenujson(); //necessary to pass svg as "this"
    };

    var jsonexportbutton = this.htmlfooter
        .append("div")
        //.attr("class","glyphicon glyphicon-download pull-right")
        .attr("class","glyphicon glyphicon-save pull-right")
        .attr("id", tileid + 'jsonexportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","save filter");
    jsonexportbutton.on("click", exportfiltermenujson);
};
d3_html.prototype.add_jsonimportandexportbutton2tile = function () {
    // add import and export buttons to tileid
    var tileid = this.tileid;

    // necessary to encapsolate import/export functions
    this.htmlfooter = d3.select('#'+this.tileid+"panel-footer")
        .append("div")
        .attr("class","row")
        .attr("id",tileid + 'footer')
        .append("div")
        .attr("class","col-lg-12");
    
    this.add_jsonexportbutton2tile();
    this.add_jsonimportbutton2tile();
};
d3_html.prototype.add_jsonimportbutton2tile = function () {
    // add button to export the table element
    // http://www.html5rocks.com/en/tutorials/file/dndfiles/
    var this_ = this;
    var tileid = this.tileid;

    function importfiltermenujson(){
        var file1 = this.files[0];

        if (!file1) {
            alert("Failed to load file");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Get the data file
                    var result = e.target.result;
                    var filtermenu = JSON.parse(result);
                    this_.data.filters = filtermenu;
                    this_.data.filter_stringdata();
                    this_.render();
                };
            })(file1);

    //         // Closure to remove the file information.
    //         reader.onloadend = (function(theFile) {
    //             return function(e) {
    //                 // Get the data file
    //                 var result = e.target.result;
    //                 var filtermenu = JSON.parse(result);
    //                 this_.data.filters = filtermenu;
    //                 this_.data.filter_stringdata();
    //                 this_.render();
    //             };
    //         })(file1);

            reader.readAsText(file1);
    //         this_.import_filtermenujson(filtermenu); //necessary to pass svg as "this"
        };
    };

    var jsonimportbutton = this.htmlfooter
        .append("div")
        //.attr("class","glyphicon glyphicon-upload pull-right")
        .attr("class","glyphicon glyphicon-open pull-right")
        .attr("id", tileid + 'jsonimportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","import filter");

    var jsonimportbutton_input = jsonimportbutton
        .append("input")
        .attr("type", "file")
        .style({
            "position": "absolute",
            "top": "0",
            "right": "0",
            "min-width": "100%",
            "min-height": "100%",
            "font-size": "100px",
            "text-align": "right",
            "filter": "alpha(opacity=0)",
            "opacity":"0",
            "outline": "none",
            "background": "white",
            "cursor": "inherit",
            "display": 'block',
        });
    jsonimportbutton_input.on("change", importfiltermenujson);
};
//TODO:
//var d3_map2d = function () {
function d3_map2d() {
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
//implement sortable and editable table using d3 and bootstrap
//var d3_table = function (){
function d3_table(){
    this.id = '';
    this.tileid = '';
    this.tableclass = '';
    this.table = null;
    this.data = null;  
    this.tableheaders = [];
};
d3_table.prototype.add_table2tile = function(){
    // set the table
    var id = this.id;
    var tileid = this.tileid;
    var tableclass = this.tableclass;
    var listdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;

//     this.table = d3.select('#'+tileid+"panel-body").append("div")
//         .attr("class","table-responsive")
//         .append("table")
//         .attr("class",tableclass)
//         .attr("id",id+"table");

    this.tableelement = d3.select('#'+tileid+"panel-body").selectAll(".table-responsive")
        .data([listdatafiltered]);

    this.tableenter = this.tableelement.enter()
        .append("div")
        .attr("class","table-responsive")
        .append("table")
        .attr("class",tableclass)
        .attr("id",id+"table");

    this.table = this.tableelement.select("table");
    this.tableelement.exit().remove();

};
d3_table.prototype.set_tableheader = function(){
    // set the table header
    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;

//     this.thead = this.table
//         .append("thead")
//         .attr("id",id+"tableheader");
    
    this.theadelement = this.table.selectAll("thead")
        .data([listdatafiltered]);

    this.theadenter = this.theadelement.enter()
        .append("thead")
        .attr("id",id+"tableheader");

    this.thead = this.table.select("thead");
    //this.thead = this.theadelement.select("thead");
    this.theadelement.exit().remove();

};
d3_table.prototype.add_tableheader = function(){
    // add the table header
    var id = this.id;
    var tileid = this.tileid;
    var tableheaders = this.tableheaders;

    //table header
// //     this.tableheader = this.thead.append("tr").selectAll("th")
// //         .data(tableheaders);

//     this.tableheader = this.thead.append("tr").selectAll("th")
//         .data(tableheaders);
// //     this.tableheader = this.theadenter.append("tr").selectAll("th")
// //         .data(tableheaders);
        
    this.tableheaderrow = this.thead.selectAll("tr")
        .data([tableheaders]);

    this.tableheaderrowenter = this.tableheaderrow.enter()
        .append("tr");

    this.tableheader = this.tableheaderrow.selectAll("th")
        .data(tableheaders);

    this.tableheaderenter = this.tableheader.enter();
    this.tableheaderenter.append("th")
        .text(function (d) { return d; });

    this.tableheader.transition().text(function (d) { return d; });

    this.tableheader.exit().remove();

    this.tableheaderrow.exit().remove();

};
d3_table.prototype.set_tablebody = function(){
    // set the table body
    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;

    this.tbodyelement = this.table.selectAll("tbody")
        .data([listdatafiltered]);

    this.tbodyenter = this.tbodyelement.enter()
        .append("tbody")
        .attr("id",id+"tablebody");

    this.tbody = this.table.select("tbody");
    //this.tbody = this.tbodyelement.select("tbody");

    this.tbodyelement.exit().remove();

};
d3_table.prototype.add_tablebody = function(){
    // add the table body
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;
        
    //table body

    this.tablerows = this.tbody.selectAll("tr")
        .data(datalistdatafiltered);

    this.tablerows.exit().remove();

    this.tablerowsenter = this.tablerows.enter()
        .append("tr");

    //this.tablecells = this.tablerowsenter.selectAll("td")
    this.tablecells = this.tablerows.selectAll("td")
        .data(function(row) {
            return tableheaders.map(function(column) {
                return {column: column, value: row[column]};
            });
        });

    this.tablecells.exit().remove();

    this.tablecellsenter = this.tablecells.enter();
    this.tablecellsenter.append("td")
        .html(function(d) { return d.value; });

    this.tablecells.html(function(d) { return d.value; });

};
d3_table.prototype.set_id = function(tableid_I){
    // set the tableid
    this.id = tableid_I;
};
d3_table.prototype.set_tileid = function(tabletileid_I){
    // set the table tileid
    this.tileid = tabletileid_I;
};
d3_table.prototype.set_tableclass = function(tableclass_I){
    // set the tableid
    this.tableclass = tableclass_I;
};
d3_table.prototype.add_data = function(data_I){
    // set the tableid
    this.data = data_I;
};
d3_table.prototype.partition_listdatafiltered2tableheaderandelements = function(){
    // partition list data to an array of headers and an array of values
    var tableheaders = [];
    var tableelements = [];
    var datalistdatafiltered = this.data.listdatafiltered;
    for (var i=0;i<datalistdatafiltered.length;i++){
        tableelements.push([]);
        for (var key in datalistdatafiltered[i]){
            if (i===0){
                tableheaders.push(key);
            };
            tableelements[i].push(datalistdatafiltered[i][key])
        };
    };
    return {tableheaders:tableheaders,tableelements:tableelements};
};
d3_table.prototype.extract_tableheaders = function(){
    // extract out headers from listdatafiltered
    this.tableheaders = [];
    var datalistdatafiltered = this.data.listdatafiltered;
    for (var key in datalistdatafiltered[0]){
        this.tableheaders.push(key);
    };
};
d3_table.prototype.set_tableheaders = function(headers_I){
    // set headers
    this.tableheaders = headers_I;
};
d3_table.prototype.add_tablecellfilter = function(){
    //filter the data on click
    //TODO:...
    var _this = this;

    this.tablecellsenter.on("click", function (d) {
        var column = null;
        var filters = [];
        _this.data.filters[column].forEach(function (n) { if (n !== d) { filters.push(n);}; });
        _this.data.filters[column] = filters;
        _this.data.filter_stringdata();
        _this.render();
    });
};
d3_table.prototype.render = function(){
    //define the render function here...
};
d3_table.prototype.add_csvexportbutton2tile = function () {
    // add button to export the table element
    var csvexportbutton = d3.select('#'+this.tileid+"panel-footer").append("form");

//     var csvexportbutton_label = csvexportbutton.append("label");
//     csvexportbutton_label.text("Export as csv");

    var csvexportbutton_input = csvexportbutton.append("input");
    csvexportbutton_input.attr("type", "button")
        .attr("value", "Download CSV");
    csvexportbutton_input.on("click", this.export_tableelementcsv);

};
d3_table.prototype.add_jsonexportbutton2tile = function () {
    // add button to export the table element
    var jsonexportbutton = d3.select('#'+this.tileid+"panel-footer").append("form");

//     var jsonexportbutton_label = jsonexportbutton.append("label");
//     jsonexportbutton_label.text("Export as json");

    var jsonexportbutton_input = jsonexportbutton.append("input");
    jsonexportbutton_input.attr("type", "button")
        .attr("value", "Download JSON");
    jsonexportbutton_input.on("click", this.export_tableelementjson);

};
d3_table.prototype.add_csvandjsonexportbutton2tile = function () {
    // add button to export the table element
    var this_ = this;

    function exporttableelementjson(){
        this_.export_tableelementjson(); //necessary to pass svg as "this"
    };

    function exporttableelementcsv(){
        this_.export_tableelementcsv(); //necessary to pass svg as "this"
    };


    var exportbutton = d3.select('#'+this.tileid+"panel-footer").append("form")
        .attr("class","form-group")
        .append("div")
        .attr("class","btn-group");

    var csvexportbutton_input = exportbutton.append("input");
    csvexportbutton_input.attr("type", "button")
        .attr("value", "Download CSV");
    csvexportbutton_input.on("click", exporttableelementcsv);

    var jsonexportbutton_input = exportbutton.append("input");
    jsonexportbutton_input.attr("type", "button")
        .attr("value", "Download JSON");
    jsonexportbutton_input.on("click", exporttableelementjson);

};
d3_table.prototype.export_tableelementjson = function () {
    // export the table element as json
    //TODO:...

    var a = document.createElement('a');
    a.download ="table" + '.json'; // file name
    var j = JSON.stringify(this.data.listdatafiltered);
    a.setAttribute("href-lang", "application/json");
    a.href = 'data:application/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);

    // definitions
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
};
d3_table.prototype.export_tableelementcsv = function () {
    // export the table element as csv
    //TODO:...

    var a = document.createElement('a');
    a.download ="table" + '.csv'; // file name
    //generate the csv string
    var c = "";
    var tableheaderstableelements = this.partition_listdatafiltered2tableheaderandelements(this.data.listdatafiltered);
    c = tableheaderstableelements.tableheaders.join(",");
    c += '\n';
    tableheaderstableelements.tableelements.forEach(function(infoArray,index){
        var dataString = infoArray.join(",");
        c += index < tableheaderstableelements.tableelements.length ? dataString+ '\n' : dataString;
    }); 
    a.setAttribute("href-lang", "application/csv");
    a.href = 'data:application/csv;charset=utf-8,' + encodeURI(c);
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};
d3_table.prototype.set_tablecss = function (selectionstyle_I) {
    //set custom css style to table
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        this.table.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_table.prototype.set_headerstyle = function () {
    // predefined css style for table header rows
    var headerselector = ' th';
    var headerstyle = {
        'font-size': '10px',
        'word-wrap':'break-word',
        'text-align': 'center'
        };
    var selectorstyle = [{ 'selection': headerselector, 'style': headerstyle }]
    this.set_tablecss(selectorstyle);
};
d3_table.prototype.set_cellstyle = function () {
    // predefined css style table cells
    var cellselector = ' td';
    var cellstyle = {
        'font-size': '8px',
        'word-wrap':'break-word',
        'text-align': 'center'
    };
    var selectorstyle = [{ 'selection': cellselector, 'style': cellstyle }]
    this.set_tablecss(selectorstyle);
};
d3_table.prototype.set_tablestyle = function () {
    // predefined css style for table header rows
    var tableselector = "#" + this.tileid + " .table-responsive";
    var tablestyle = {
        //'table-layout': 'fixed',
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': tableselector, 'style': tablestyle }]
    this.set_d3css(selectorstyle);
};
d3_table.prototype.set_d3css = function (selectionstyle_I) {
    //set custom css style to d3
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        d3.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_table.prototype.add_datafiltermenusubmitbutton = function (tileid_I,submitbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = this.submitbuttonid;};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        for (var key in this_.data.filters){
            var filterkey = d3.select("#"+tileid+'formlabel'+key).text();
            var filterstring = d3.select("#"+tileid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        this_.data.convert_stringmenuinput2filter(filterstringmenu);
        this_.data.filter_stringdata();
        this_.render();
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("mousedown",submit);
};
d3_table.prototype.add_datafiltermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = this.resetbuttonid;};

    var this_ = this;
    
    function reset(){
        this_.data.reset_filters();
        this_.data.filter_stringdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_table.prototype.add_tablesort = function(sort_settings_I){
    // add table sort using jquery
    var id = this.id;
    $(document).ready(function() 
        { 
            $("#"+id+"table").tablesorter(); 
        } 
    );  
};
//var ddt_html = function(){
function ddt_html(){
    // ddt_html template class
    this.parameters = {};
    this.ddthtml = null;
};
ddt_html.prototype.set_parameters = function(parameters_I){
    // set html parameters
    this.parameters = parameters_I;
};
ddt_html.prototype.set_ddthtml = function(){
    // set ddthtml tileid
	var tileid_I = this.parameters.tileid;
	var id_I = this.parameters.htmlid;

    this.ddthtml.set_tileid(tileid_I);
    this.ddthtml.set_id(id_I);
};
ddt_html.prototype.add_data = function(data_I){
    // add data to ddthtml
    this.ddthtml.add_data(data_I);
};
ddt_html.prototype.set_datakeymap = function(datakeymap_I){
    // add data to ddthtml
    this.ddthtml.set_datakeymap(datakeymap_I);
};
//var ddt_html_datalist_01 = function () {
function ddt_html_datalist_01() {
    // data list tile
    ddt_html.call(this);
};
ddt_html_datalist_01.prototype = Object.create(ddt_html.prototype);
ddt_html_datalist_01.prototype.constructor = ddt_html_datalist_01;
ddt_html_datalist_01.prototype.make_html = function(data_I,parameters_I){   
    // make the data list
    // INPUT:
    // parameters_I = e.g., {
    //        'datalist': [{'value':'hclust','text':'by cluster'},
    //                        {'value':'probecontrast','text':'by row and column'},
    //                        {'value':'probe','text':'by row'},
    //                        {'value':'contrast','text':'by column'},
    //                        {'value':'custom','text':'by value'}]};

	this.ddthtml = new d3_html();
    var datalist_I = parameters_I.datalist;
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);}

	// html specific properties
	this.ddthtml.add_html2tile();
    this.ddthtml.add_datalist(datalist_I);
};
//var ddt_html_escher_01 = function () {
function ddt_html_escher_01() {
    // dropdown button group with href tile
    ddt_html.call(this);
};
ddt_html_escher_01.prototype = Object.create(ddt_html.prototype);
ddt_html_escher_01.prototype.constructor = ddt_html_escher_01;
ddt_html_escher_01.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()

	// html specific properties
    this.ddthtml.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.ddthtml.set_ndatakeymap(parameters_I.htmlkeymap);}
	this.ddthtml.set_escher(parameters_I.escherdataindex,parameters_I.escherembeddedcss,parameters_I.escheroptions)
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters != "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_stringdata();
    	};
        this.add_html2tile();
		this.set_htmlescherstyle();
        this.add_escher();
    };
};
//var ddt_html_form_01 = function () {
function ddt_html_form_01() {
    // form tile
    ddt_html.call(this);
};
ddt_html_form_01.prototype = Object.create(ddt_html.prototype);
ddt_html_form_01.prototype.constructor = ddt_html_form_01;
ddt_html_form_01.prototype.make_html = function(data_I,parameters_I){
//ddt_html_form_01.prototype.make_html = function(parameters_I){
    // make form

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);}
	this.ddthtml.add_jsonimportandexportbutton2tile();

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_form();
        this.add_input2form();
        this.update_forminput();
        // The below code causes the application to crash
        // reason: unknown
        // hypothesis: binding of "onclick" event generates an infinite loop
        // workaround: added submitbuttons to the tile where they are not associated with any bound data
//         this.add_submitbutton2form([parameters_I.formsubmitbuttonidtext,
//         	parameters_I.formresetbuttonidtext,
//         	parameters_I.formupdatebuttonidtext]);
    };
};
ddt_html_form_01.prototype.update_html = function(data_I){
    // update form
    this.ddthmtl.render();
//     var input = data_I[0].convert_filter2stringmenuinput();
//     this.ddthtml.update_forminput(input);
};
//var ddt_html_href_01 = function () {
function ddt_html_href_01() {
    // dropdown button group with href tile
    ddt_html.call(this);
};
ddt_html_href_01.prototype = Object.create(ddt_html.prototype);
ddt_html_href_01.prototype.constructor = ddt_html_href_01;
ddt_html_href_01.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);};

	// html specific properties
	this.ddthtml.set_url(parameters_I.hrefurl);
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters != "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_stringdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        //this.add_dropdownbuttongroup_href();
        this.add_headerandlistgroup_href();
    };
};
function ddt_html_href_02() {
    // dropdown button group with href tile
    ddt_html.call(this);
};
ddt_html_href_02.prototype = Object.create(ddt_html.prototype);
ddt_html_href_02.prototype.constructor = ddt_html_href_02;
ddt_html_href_02.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);};

	// html specific properties
	this.ddthtml.set_url(parameters_I.hrefurl);
	if (parameters_I.formsubmitbuttonidtext){this.ddthtml.set_formsubmitbuttonidtext(parameters_I.formsubmitbuttonidtext)};
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters != "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_stringdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_headeranddatalist_href();
        if (parameters_I.formsubmitbuttonidtext){this.add_headeranddatalistsubmit_href()};
    };
};
//var ddt_html_media_01 = function () {
function ddt_html_media_01() {
    // dropdown button group with href tile
    ddt_html.call(this);
};
ddt_html_media_01.prototype = Object.create(ddt_html.prototype);
ddt_html_media_01.prototype.constructor = ddt_html_media_01;
ddt_html_media_01.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);}

	// html specific properties
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters != "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_stringdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_mediasvg();
    };
};
//var ddt_svg = function(){
function ddt_svg(){
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
	var tileid_I = this.parameters.tileid;
	var id_I = this.parameters.svgid;

    this.ddtsvg.set_tileid(tileid_I);
    this.ddtsvg.set_id(id_I);
};
ddt_svg.prototype.add_data = function(data_I){
    // add data to ddtsvg
    this.ddtsvg.add_data(data_I);
};
ddt_svg.prototype.set_datakeymaps = function(set_datakeymaps_I){
    // add data to ddtsvg
    this.ddtsvg.set_datakeymaps(set_datakeymaps_I);
};
ddt_svg.prototype.filter_data1and2stringdata = function(){
    // add data to ddtsvg
    this.ddtsvg.filter_data1and2stringdata();
};
//var ddt_svg_boxandwhiskersplot2d_01 = function () {
function ddt_svg_boxandwhiskersplot2d_01() {
    // boxandwhiskersplot
    // description:
    // data 1 and 2 are plotted along the same axis
    // data 1 = points
    // data 2 = line
    // parameters:
    // parameters_I = e.g., {"svgtype":'boxandwhiskersplot2d_01',"svgkeymap":[data1_keymap],
    //                        'svgid':'svg1',
    //                        "svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
    //                        "svgwidth":500,"svgheight":350,
    //                        "svgx1axislabel":"jump_time_point","svgy1axislabel":"frequency"};
    ddt_svg.call(this);
};
ddt_svg_boxandwhiskersplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_boxandwhiskersplot2d_01.prototype.constructor = ddt_svg_boxandwhiskersplot2d_01;
ddt_svg_boxandwhiskersplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// boxandwhiskersplot definition

	this.ddtsvg = new d3_chart2d();
	
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
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    //this.ddtsvg.set_zoom(); todo
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("linear");
        this.set_x1x2domain_verticalbarschart();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        // add legend
        this.add_legenddata1();
        this.add_legenddata1filter();
        // make the box and whiskers plot
        this.add_boxandwhiskersdata1();
        if (this.data1keymap.ydataiq1 && this.data1keymap.ydataiq3){
        	this.add_boxandwhiskersdata1_box();
        	this.add_boxandwhiskersdata1tooltipandfill_box();
        	};
        if (this.data1keymap.ydatamedian){this.add_boxandwhiskersdata1_median();};
        if (this.data1keymap.ydatamin && this.data1keymap.ydatamax){this.add_boxandwhiskersdata1_caps();};
        if (this.data1keymap.ydataiq1 && this.data1keymap.ydataiq3 && this.data1keymap.ydatamin && this.data1keymap.ydatamax){
        	this.add_boxandwhiskersdata1_whiskers();
        };
        
        // make the circle and whiskers plot
        if (this.data1keymap.ydatalb && this.data1keymap.ydataub){this.add_boxandwhiskersdata1_lbub();};
        if (this.data1keymap.ydata){
        	this.add_boxandwhiskersdata1_mean();
        	this.add_boxandwhiskersdata1tooltipandfill_mean();
        };
        this.set_x1andy1axesstyle_verticalbarschart();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        //// add zoom (todo)
        //this.set_zoom();
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.set_svgelementzoomcss();
    };
};
//var ddt_svg_heatmap_01 = function () {
function ddt_svg_heatmap_01() {
    // heatmap
    // description:
    // generic heatmap
    // parameters:
    // parameters_I = e.g., {"svgtype":'heatmap2d_01',"svgkeymap":[data1_keymap],
    //                        'svgid':'svg1',
    //                         'svgcellsize':18,'svgmargin':{ 'top': 200, 'right': 150, 'bottom': 50, 'left': 10 },
    //                        'svgcolorscale':'quantile',
    //                        'svgcolorcategory':'heatmap10',
    //                        'svgcolordomain':[0,1], (frequency) or "min,0,max" (log normalized)
    //                        'svgcolordatalabel':'value',
    //                        'svgdatalisttileid':'tile1'};
    //                  where data1_keymap = {'xdata':'row_leaves','ydata':'col_leaves','zdata':'value',
    //                          'rowslabel':'row_label','columnslabel':'col_label',
    //                          'rowsindex':'row_index','columnsindex':'col_index',
    //                          'rowsleaves':'row_leaves','columnsleaves':'col_leaves'};
    ddt_svg.call(this);
};
ddt_svg_heatmap_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_heatmap_01.prototype.constructor = ddt_svg_heatmap_01;
ddt_svg_heatmap_01.prototype.make_svg = function(data_I,parameters_I){
	// heatmap definition

	this.ddtsvg = new d3_chart2d();

	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// heatmap properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    //this.ddtsvg.set_heatmapdata1(parameters_I.svgcellsize); //must be done initially to set the height/width correctly
    this.ddtsvg.add_svgexportbutton2tile();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    //this.ddtsvg.set_zoom();
    //this.ddtsvg.data1.filter_stringdata();
//     this.ddtsvg.set_colorscale(parameters_I.svgcolorscale,
// 								parameters_I.svgcolorcategory,
// 								parameters_I.svgcolordomain,
// 								parameters_I.svgcolordatalabel);
    this.ddtsvg.render = function () {
    	this.set_heatmapdata1(parameters_I.svgcellsize); //must be done initially to set the height/width correctly
    													 //inclusion in the render function results in slower performance
    													 //but appears necessary to correctly update the table
    	this.remove_chart2d();
        this.add_chart2d2tile();
        this.set_svgstyle();
    	this.set_colorscale(parameters_I.svgcolorscale,
								parameters_I.svgcolorcategory,
								parameters_I.svgcolordomain,
								parameters_I.svgcolordatalabel);
        this.set_heatmapdata1(18); //update the heatmap properties
        this.add_heatmapdata1();
        this.add_heatmapdata1animation();
        this.add_heatmapdata1rowlabels(parameters_I.svgdatalisttileid);
        this.add_heatmapdata1columnlabels(parameters_I.svgdatalisttileid);
        this.add_heatmapdata1legend();
        //this.add_heatmapdata1drowpdownmenu("tile1");
        this.add_heatmapdata1datalist(parameters_I.svgdatalisttileid);
        this.add_heatmapdata1tooltipandfill();
        this.set_heatmapdata1css();
    };
};
//var ddt_svg_horizontalbarschart2d_01 = function () {
function ddt_svg_horizontalbarschart2d_01() {
    // horizontalbarschart
    // description:
    // data 1 and 2 are plotted along the same axis
    // data 1 = points
    // data 2 = line
    // parameters:
    // parameters_I = e.g., {"svgtype":'horizontalbarschart2d_01',"svgkeymap":[data1_keymap],
	//					'svgid':'svg1',
	//					"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
	//					"svgwidth":500,"svgheight":350,"svgy1axislabel":"rate (mmol*gDCW-1*hr-1)",
	//					"svgfilters":{'met_id':['glc-D','ac']}
	//			where data1_keymap = {'xdata':'met_id','ydata':'rate_average',
	//				'serieslabel':'sample_name_abbreviation','featureslabel':'met_id',
	//				'ydatalb':'rate_lb','ydataub':'rate_ub'};
    ddt_svg.call(this);
};
ddt_svg_horizontalbarschart2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_horizontalbarschart2d_01.prototype.constructor = ddt_svg_horizontalbarschart2d_01;
ddt_svg_horizontalbarschart2d_01.prototype.make_svg = function(data_I,parameters_I){
	// horizontalbarschart definition

	this.ddtsvg = new d3_chart2d();
	
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
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_stringdata();
    	};
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_y1range("ordinal-rangeRoundBands",true);
        this.set_y2range("ordinal",true);
        this.set_x1range("linear");
        this.set_y1y2domain_horizontalbarschart();
        this.set_x1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        // add horizontal bars
        this.add_horizontalbarsdata1();
        this.add_horizontalbarsdata1tooltipandfill();
		this.add_horizontalbarsdata1errorbars();
        this.set_x1andy1axesstyle_horizontalbarschart();
        this.set_x1andy1axestickstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};
function ddt_svg_packlayout2d_01() {
    // packlayout
    // description:
    // generic packlayout
    // NOTES:
    // 1. data_I.datanestkeys = [] of multiple keys in order
    // 2. data_I.datalastchild = string describing the final child element
    // 2. data_I.svgpadding = float
    ddt_svg.call(this);
};
ddt_svg_packlayout2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_packlayout2d_01.prototype.constructor = ddt_svg_packlayout2d_01;
ddt_svg_packlayout2d_01.prototype.make_svg = function(data_I,parameters_I){
	// packlayout definition

	this.ddtsvg = new d3_graph2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_duration(parameters_I.svgduration); //new!
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.data1.format_keyvalues2namechildren(data_I.datalastchild); //new!
    this.ddtsvg.set_packlayout(parameters_I.svgpadding); //new
    this.ddtsvg.render = function () {
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
};
function ddt_svg_pcaplot2d_scores_01() {
//var ddt_svg_pcaplot2d_scores_01 = function () {
    // pcaplot2d_scores
    // description:
    // 
    ddt_svg.call(this);
};
ddt_svg_pcaplot2d_scores_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_pcaplot2d_scores_01.prototype.constructor = ddt_svg_pcaplot2d_scores_01;
ddt_svg_pcaplot2d_scores_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

	this.ddtsvg = new d3_chart2d();
	
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
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1x2axis();
        this.set_y1y2axis();
        this.add_x1x2axis();
        this.add_y1y2axis();
        this.add_x1axisgridlines();
        this.add_y1axisgridlines();
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1featurefilter();
        //this.add_data1featureslabels();
        this.set_pointsdata1featurestyle();
        this.set_pointsstyle();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
        this.set_x1x2andy1y2axesstyle();
        this.set_x1x2andy1y2axestickstyle();
    };
};
//var ddt_svg_scatterlineplot2d_01 = function () {
function ddt_svg_scatterlineplot2d_01() {
    // scatterlineplot
    // description:
    // data 1 and 2 are plotted along the same axis
    // data 1 = points
    // data 2 = line
    // parameters:
    // parameters_I = e.g., {"svgtype":'scatterlineplot2d_01',"svgkeymap":[data1_keymap,data1_keymap],
    //                        'svgid':'svg1',
    //                        "svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
    //                        "svgwidth":500,"svgheight":350,
    //                        "svgx1axislabel":"jump_time_point","svgy1axislabel":"frequency",
    //						  'svgformtileid':'tile1','svgresetbuttonid':'reset1','svgsubmitbuttonid':'submit1'};
    //                where data1_keymap = {'xdata':'time_point',
    //                    'ydata':'mutation_frequency',
    //                    'serieslabel':'mutation_id',
    //                    'featureslabel':''};
    ddt_svg.call(this);
};
ddt_svg_scatterlineplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_scatterlineplot2d_01.prototype.constructor = ddt_svg_scatterlineplot2d_01;
ddt_svg_scatterlineplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

	this.ddtsvg = new d3_chart2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
//     this.ddtsvg.add_data1filtermenuresetbutton(parameters_I.svgformtileid,parameters_I.svgresetbuttonid)
//     this.ddtsvg.add_data2filtermenuresetbutton(parameters_I.svgformtileid,parameters_I.svgresetbuttonid)
//     this.ddtsvg.add_data1filtermenusubmitbutton(parameters_I.svgformtileid,parameters_I.svgsubmitbuttonid)
//     this.ddtsvg.add_data2filtermenusubmitbutton(parameters_I.svgformtileid,parameters_I.svgsubmitbuttonid)
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        //this.add_title(parameters.svgtitle);
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1axis();
        this.set_x1axistickformat(parameters_I.svgx1axistickformat);
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.set_x1axisticktextattr(parameters_I.svgx1axisticktextattr)
        this.set_x1axisticktextstyle(parameters_I.svgx1axisticktextstyle)
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        // use the same x1/y1 scales for x2/y2
        this.copy_x1scalestox2scales();
        this.copy_y1scalestoy2scales();
        //this.set_colorscale(); //color for series_label will change each update
        // add points
        this.add_pointsdata1();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        this.add_pointsdata1tooltipandfill();
        this.set_x1andy1axesstyle();
        this.set_x1andy1axestickstyle();
        this.set_pointsstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
        // add line
		this.set_linedata2("linear");
		this.add_linedata2();
		this.add_linedata2tooltipandstroke();
		this.add_linedata2filter();
        this.set_linestyle();
    };
};
//var ddt_svg_scatterlot2d_01 = function () {
function ddt_svg_scatterplot2d_01() {
    // scatterplot
    // description:
    // generic scatter plot
    ddt_svg.call(this);
};
ddt_svg_scatterplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_scatterplot2d_01.prototype.constructor = ddt_svg_scatterplot2d_01;
ddt_svg_scatterplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

	this.ddtsvg = new d3_chart2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1axis();
        this.set_x1axistickformat(parameters_I.svgx1axistickformat);
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.set_x1axisticktextattr(parameters_I.svgx1axisticktextattr)
        this.set_x1axisticktextstyle(parameters_I.svgx1axisticktextstyle)
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        this.add_pointsdata1();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_pointsdata1tooltipandfill();
        this.set_x1andy1axesstyle();
        this.set_x1andy1axestickstyle();
        this.set_pointsstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};
//var ddt_svg_scatterlot2d_01 = function () {
function ddt_svg_treelayout2d_01() {
    // treelayout
    // description:
    // generic treelayout
    // NOTES:
    // 1. data_I.datanestkeys = [] of multiple keys in order
    // 2. data_I.datalastchild = string describing the final child element
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
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_duration(parameters_I.svgduration); //new!
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.data1.format_keyvalues2namechildren(data_I.datalastchild); //new!
    this.ddtsvg.set_treelayoutdata1nodeorigin(0);
    this.ddtsvg.set_treelayoutdata1tree();
    this.ddtsvg.set_treelayoutdata1diagonal()
    this.ddtsvg.render = function () {
        this.add_graph2d2tile();
        this.set_svgstyle();
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_treelayoutdata1root();
        this.collapse_treelayoutroot();
        this.update_treelayout();
    };
};
//var ddt_svg_verticalbarschart2d_01 = function () {
function ddt_svg_verticalbarschart2d_01() {
    // verticalbarschart
    // description:
    // data 1 and 2 are plotted along the same axis
    // data 1 = points
    // data 2 = line
    // parameters:
    // parameters_I = e.g., {"svgtype":'verticalbarschart2d_01',"svgkeymap":[data1_keymap],
	//					'svgid':'svg1',
	//					"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
	//					"svgwidth":500,"svgheight":350,"svgy1axislabel":"rate (mmol*gDCW-1*hr-1)",
	//					"svgfilters":{'met_id':['glc-D','ac']}
	//			where data1_keymap = {'xdata':'met_id','ydata':'rate_average',
	//				'serieslabel':'sample_name_abbreviation','featureslabel':'met_id',
	//				'ydatalb':'rate_lb','ydataub':'rate_ub'};
    ddt_svg.call(this);
};
ddt_svg_verticalbarschart2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_verticalbarschart2d_01.prototype.constructor = ddt_svg_verticalbarschart2d_01;
ddt_svg_verticalbarschart2d_01.prototype.make_svg = function(data_I,parameters_I){
	// verticalbarschart definition

	this.ddtsvg = new d3_chart2d();
	
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
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_stringdata();
    	};
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("linear");
        this.set_x1x2domain_verticalbarschart();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        // add vertical bars
        this.add_verticalbarsdata1();
        this.add_verticalbarsdata1tooltipandfill();
        this.add_verticalbarsdata1errorbars();
        this.set_x1andy1axesstyle_verticalbarschart();
        this.set_x1andy1axestickstyle();
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};
//var ddt_svg_volcanoplot2d_01 = function () {
function ddt_svg_volcanoplot2d_01() {
    // scatterplot2d with 1 data set and filled x1x2/y1y2 axis
    // utilized for a volcano plot or pca loadings plot
    // description:
    // 
    ddt_svg.call(this);
};
ddt_svg_volcanoplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_volcanoplot2d_01.prototype.constructor = ddt_svg_volcanoplot2d_01;
ddt_svg_volcanoplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

	this.ddtsvg = new d3_chart2d();
	
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
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1x2axis();
        this.set_y1y2axis();
        this.add_x1x2axis();
        this.add_y1y2axis();
        this.add_x1axisgridlines();
        this.add_y1axisgridlines();
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1featurefilter();
        this.add_data1featureslabels();
        this.set_pointsstyle();
        this.set_x1x2andy1y2axesstyle();
        this.set_x1andy1axestickstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};
//var ddt_table = function(){
function ddt_table(){
    // ddt_table template class
    this.parameters = {};
    this.ddttable = null;
};
ddt_table.prototype.set_parameters = function(parameters_I){
    // set chart2d parameters
    this.parameters = parameters_I;
};
ddt_table.prototype.set_ddttable = function(){
    // set ddttable tileid
	var tileid_I = this.parameters.tileid;
	var id_I = this.parameters.tableid;

    this.ddttable.set_tileid(tileid_I);
    this.ddttable.set_id(id_I);
};
ddt_table.prototype.add_data = function(data_I){
    // add data to ddttable
    this.ddttable.add_data(data_I[0]);
};
//var ddt_table_responsivetable_01 = function () {
function ddt_table_responsivetable_01() {
    // responsive table
    // description:
    // data is formatted and presented in tabular form
    // parameters:
    // parameters_I = e.g., {"tabletype":'table_01',
	//					'tableid':'table1',
	//					"tablefilters":{'met_id':['glc-D','ac'],
	//					"tableclass":"table table-hover"}
    ddt_table.call(this);
};
ddt_table_responsivetable_01.prototype = Object.create(ddt_table.prototype);
ddt_table_responsivetable_01.prototype.constructor = ddt_table_responsivetable_01;
ddt_table_responsivetable_01.prototype.make_table = function(data_I,parameters_I){
	//

	this.ddttable = new d3_table();
	
	// general table properties
	this.set_parameters(parameters_I);
	this.set_ddttable()
    this.add_data(data_I);

	// table specific properties
    this.ddttable.set_tableclass("table table-hover");
    if (parameters_I.tableheaders){this.ddttable.set_tableheaders(parameters_I.tableheaders);}
    else {this.ddttable.extract_tableheaders();};
    this.ddttable.add_csvandjsonexportbutton2tile();
//     this.ddttable.add_datafiltermenuresetbutton(parameters_I.tableformtileid,parameters_I.tableresetbuttonid)
//     this.ddttable.add_datafiltermenusubmitbutton(parameters_I.tableformtileid,parameters_I.tablesubmitbuttonid)
    this.ddttable.render = function () {
    	// permanent filter on the data
    	if (parameters_I.tablefilters){
			this.data.change_filters(parameters_I.tablefilters);
			this.data.filter_stringdata();
    	};
        this.add_table2tile();
        this.set_tableheader();
		this.set_tablebody();
		this.add_tableheader();
		this.add_tablebody();
		this.set_tablestyle();
		this.set_headerstyle();
		this.set_cellstyle();
		this.add_tablesort(parameters_I.tablesort);
    };
}
//var ddt_tile = function(){
function ddt_tile(){
    // ddt_tile class
    // a generic data driven tile
    this.parameters = {};
    this.tile = null;
};
ddt_tile.prototype.set_parameters = function(parameters_I){
    // set input tile parameters
    if (parameters_I){this.parameters = parameters_I;}
    else {this.parameters = {tileid:"tile1",rowid:"row1",colid:"col1",
        tileclass:"panel panel-default",rowclass:"row",colclass:"col-sm-12"};};
    
};
ddt_tile.prototype.set_tile = function(){
    // set input tile parameters
    var tileid = this.parameters.tileid
    var rowid = this.parameters.rowid
    var colid = this.parameters.colid
    var tileclass = this.parameters.tileclass
    var rowclass = this.parameters.rowclass
    var colclass = this.parameters.colclass

    this.tile = new d3_tile();
    this.tile.set_tileid(tileid);
    this.tile.set_rowid(rowid);
    this.tile.set_colid(colid);
    this.tile.set_tileclass(tileclass);
    this.tile.set_rowclass(rowclass);
    this.tile.set_colclass(colclass);
};
ddt_tile.prototype.make_tile = function(){
    // make the tile
    // define tile make function call sequence here...
};
// update functions
ddt_tile.prototype.update_tile = function(){
    // update the tile
    // define tile update function call sequence here...
};
//var ddt_tile_svg = function () {
function ddt_tile_svg() {
    // data driven svg tile
	//1. defines the lookup table (get_svg) to instantiate the svg template object based on input
	//2. defines the make_tile function that adds the svg template object to the tile and renders the object
	//3. defines the update_tile function that updates the svg template object when the associated data is changed
    ddt_tile.call(this);
    this.ddtsvg = null;
};
ddt_tile_svg.prototype = Object.create(ddt_tile.prototype);
ddt_tile_svg.prototype.constructor = ddt_tile_svg;
ddt_tile_svg.prototype.make_tile = function(data_I,parameters_I){
    // make svg tile
    var header_I = parameters_I.tileheader;
    var svgtype_I = parameters_I.svgtype;

    this.set_parameters(parameters_I);
    this.set_tile();

    this.tile.add_tile2container();
    this.tile.add_header2tile();
    this.tile.add_removebutton2header();
    this.tile.add_title2header(header_I);
    this.tile.add_body2tile();
    this.tile.add_footer2tile();

    //svg
    this.ddtsvg = this.get_svg(svgtype_I);
    this.ddtsvg.make_svg(data_I,parameters_I)

    this.ddtsvg.ddtsvg.render();
};
ddt_tile_svg.prototype.update_tile = function(data_I){
    // update tile

    //update the data filters...
    //this.ddtsvg.add_data(data_I);
    //this.ddtsvg.filter_data1and2stringdata();
    //re-render the svg
    this.ddtsvg.ddtsvg.render();
};
ddt_tile_svg.prototype.get_svg = function(svgtype_I){
    // return the appropriate tile object
    if (svgtype_I=='heatmap2d_01'){
        return new ddt_svg_heatmap_01();
    } else if (svgtype_I=='scatterlineplot2d_01'){
        return new ddt_svg_scatterlineplot2d_01();
    } else if (svgtype_I=='scatterlineplot2d_02'){
        return new ddt_svg_scatterlineplot2d_02();
    } else if (svgtype_I=='scatterplot2d_01'){
        return new ddt_svg_scatterplot2d_01();
    } else if (svgtype_I=='verticalbarschart2d_01'){
        return new ddt_svg_verticalbarschart2d_01();
    } else if (svgtype_I=='horizontalbarschart2d_01'){
        return new ddt_svg_horizontalbarschart2d_01();
    } else if (svgtype_I=='boxandwhiskersplot2d_01'){
        return new ddt_svg_boxandwhiskersplot2d_01();
    } else if (svgtype_I=='volcanoplot2d_01'){
        return new ddt_svg_volcanoplot2d_01();
    //} else if (svgtype_I=='pcaplot2d_loadings_01'){
    //    return new ddt_svg_pcaplot2d_loadings_01();
    } else if (svgtype_I=='pcaplot2d_scores_01'){
        return new ddt_svg_pcaplot2d_scores_01();
    } else if (svgtype_I=='treelayout2d_01'){
        return new ddt_svg_treelayout2d2d_01();
    } else if (svgtype_I=='circlepacklayout2d_01'){
        return new ddt_svg_circlepacklayout2d2d_01();
    } else {
        return null;
    };
};
//var ddt_tile_table = function () {
function ddt_tile_table() {
    // data driven table tile
	//1. defines the lookup table (get_table) to instantiate the table template object based on input
	//2. defines the make_tile function that adds the table template object to the tile and renders the object
	//3. defines the update_tile function that updates the table template object when the associated data is changed
    
    ddt_tile.call(this);
    this.ddttable = null;
};
ddt_tile_table.prototype = Object.create(ddt_tile.prototype);
ddt_tile_table.prototype.constructor = ddt_tile_table;
ddt_tile_table.prototype.make_tile = function(data_I,parameters_I){
    // make table tile
    var header_I = parameters_I.tileheader;
    var tabletype_I = parameters_I.tabletype;

    this.set_parameters(parameters_I);
    this.set_tile();

    this.tile.add_tile2container();
    this.tile.add_header2tile();
    this.tile.add_removebutton2header();
    this.tile.add_title2header(header_I);
    this.tile.add_body2tile();
    this.tile.add_footer2tile();

    //table
    this.ddttable = this.get_table(tabletype_I);
    this.ddttable.make_table(data_I,parameters_I);
    //this.ddttable.make_table(parameters_I);

    this.ddttable.ddttable.render();
    //this.ddttable.ddttable.render(data_I[0]);
};
ddt_tile_table.prototype.update_tile = function(data_I){
    // update tile

    //update the data filters...
    //this.ddttable.add_data(data_I);
    //this.ddttable.ddttable.data.filter_stringdata();
    //re-render the table
    this.ddttable.ddttable.render();
};
ddt_tile_table.prototype.get_table = function(tabletype_I){
    // return the appropriate tile object
    if (tabletype_I=='responsivetable_01'){
        return new ddt_table_responsivetable_01();
    } else {
        return null;
    };
};
//var ddt_tile_html = function () {
function ddt_tile_html() {
    // data driven html tile
	//1. defines the lookup html (get_html) to instantiate the html template object based on input
	//2. defines the make_tile function that adds the html template object to the tile and renders the object
	//3. defines the update_tile function that updates the html template object when the associated data is changed
    
    ddt_tile.call(this);
    this.ddthtml = null;
};
ddt_tile_html.prototype = Object.create(ddt_tile.prototype);
ddt_tile_html.prototype.constructor = ddt_tile_html;
ddt_tile_html.prototype.make_tile = function(data_I,parameters_I){
    // make html tile
    var header_I = parameters_I.tileheader;
    var htmltype_I = parameters_I.htmltype;

    this.set_parameters(parameters_I);
    this.set_tile();

    this.tile.add_tile2container();
    this.tile.add_header2tile();
    this.tile.add_removebutton2header();
    this.tile.add_title2header(header_I);
    this.tile.add_body2tile();
    this.tile.add_footer2tile();
    if (parameters_I.formsubmitbuttonidtext){
        this.tile.add_submitbutton2footer(parameters_I.formsubmitbuttonidtext);
        };
    if (parameters_I.formresetbuttonidtext){
        this.tile.add_submitbutton2footer(parameters_I.formresetbuttonidtext);
        };
    if (parameters_I.formupdatebuttonidtext){
        this.tile.add_submitbutton2footer(parameters_I.formupdatebuttonidtext);
        };

    //html
    this.ddthtml = this.get_html(htmltype_I);
    this.ddthtml.make_html(data_I,parameters_I);
    //this.ddthtml.make_html(parameters_I);

    this.ddthtml.ddthtml.render();
    //this.ddthtml.ddthtml.render(data_I[0]);
};
ddt_tile_html.prototype.update_tile = function(data_I){
    // update tile

    //update the data filters...
    //this.ddthtml.add_data(data_I);
    //re-render the html
    this.ddthtml.ddthtml.render();
    //this.ddthtml.update_html(data_I);
};
ddt_tile_html.prototype.get_html = function(htmltype_I){
    // return the appropriate tile object
    if (htmltype_I=='form_01'){
        return new ddt_html_form_01();
    } else if (htmltype_I=='datalist_01'){
        return new ddt_html_datalist_01();
    } else if (htmltype_I=='href_01'){
        return new ddt_html_href_01();
    } else if (htmltype_I=='href_02'){
        return new ddt_html_href_02();
    } else if (htmltype_I=='media_01'){
        return new ddt_html_media_01();
    } else if (htmltype_I=='escher_01'){
        return new ddt_html_escher_01();
    } else {
        return null;
    };
};
function ddt_input() {
    // parse and validate input data
    this.parameters=null;
    this.data=null;
    this.tile2datamap=null;
    this.filtermenu=null;
};
ddt_input.prototype.set_ddtdatajson = function(ddtdatajson_I){
    // parse out ddt_data in string format
    if (typeof ddtdatajson_I.parameters !== undefined){
        this.parameters = ddtdatajson_I.parameters
    } else {
        this.parameters = null;
    };
    if (typeof ddtdatajson_I.data !== undefined){
        this.data = ddtdatajson_I.data
    } else {
        this.data = null;
    };
    if (typeof ddtdatajson_I.tile2datamap !== undefined){
        this.tile2datamap = ddtdatajson_I.tile2datamap
    } else {
        this.tile2datamap = null;
    };
    if (typeof ddtdatajson_I.filtermenu !== undefined){
        this.filtermenu = ddtdatajson_I.filtermenu
    } else {
        this.filtermenu = null;
    };

};
function ddt_container(){
//var ddt_container = function (){
    // ddt_container class
    // class to organize and handle individual tiles that make up the container
    this.parameters = [];
    this.tiles = [];
    this.data = [];
    this.tile2datamap = {};
    this.containerid = 'container'
    this.container=null;
};
ddt_container.prototype.set_parameters = function(parameters_I){
    // set parameters to container
    //INPUT:
    // parameters_I = [
    //           {tileid:'',...//tileproperties 
    //            svgid:'',...//svgproperties},...]
    this.parameters=parameters_I;
};
ddt_container.prototype.set_tile = function(tiles_I){
    // set tile to container
    this.tiles=tiles_I;
};
ddt_container.prototype.set_data = function(data_I){
    // set data to container
    this.data=data_I;
};
ddt_container.prototype.set_tile2datamap = function(tile2datamap_I){
    // set tile2datamap to container
    // INPUT:
    // tile2datamap_I = {tileid:[dataindex,...],...}
    this.tile2datamap=tile2datamap_I;
};
ddt_container.prototype.add_parameters = function(parameters_I){
    // add parameters to container
    this.parameters.push(parameters_I);
};
ddt_container.prototype.add_tile = function(tile_I){
    // add tile to container
    this.tiles.push(tile_I);
};
ddt_container.prototype.add_data = function(data_I){
    // add data to container
    //INPUT:
    // data_I = [{data:[],datakeys:[],datanestkeys:[]},...]
    for (var cnt=0;cnt<data_I.length;cnt++){ //switched from i to cnt due to i changing within the loop
        var d3data = new d3_data();
        d3data.set_keys(data_I[cnt].datakeys);
        d3data.set_listdata(data_I[cnt].data,data_I[cnt].datanestkeys);
        d3data.reset_filters();
        this.data.push(d3data);
    };
};
ddt_container.prototype.add_containertiles = function(){
    // get all container tiles based on parameters
    // tiles will be added in the same order as the parameters
    for (var i=0;i<this.parameters.length;i++){
        var tiletype = this.parameters[i].tiletype
        var tile = this.get_tile(tiletype);
        this.tiles.push(tile);
    };
};
ddt_container.prototype.make_container = function(){
    // call all tile make functions
    var data = this.data;
    this.add_containertiles();
    for (var cnt=0;cnt<this.tiles.length;cnt++){ //switched from i to cnt due to i changing within the loop
        var tiledataindex = this.tile2datamap[this.parameters[cnt].tileid];
        var tiledata = [];
        tiledataindex.forEach(function(d){tiledata.push(data[d]);});
        this.tiles[cnt].make_tile(tiledata,this.parameters[cnt]);
    };
};
ddt_container.prototype.update_container = function(){
    // call all tile update functions
    var data = this.data;
    for (var cnt=0;cnt<this.tiles.length;cnt++){ //switched from i to cnt due to i changing within the loop
        var tiledataindex = this.tile2datamap[this.parameters[cnt].tileid];
        var tiledata = [];
        tiledataindex.forEach(function(d){tiledata.push(data[d]);});
        this.tiles[cnt].update_tile(tiledata);
    };     
};
ddt_container.prototype.reset_containerdata = function(){
    // reset data filters and call all tile update functions
    for (cnt=0;cnt<this.data.length;cnt++){ //switched from i to cnt due to i changing within the loop
        this.data[cnt].reset_filters();
    };
    var data = this.data;
    for (var cnt=0;cnt<this.tiles.length;cnt++){ //switched from i to cnt due to i changing within the loop
        var tiledataindex = this.tile2datamap[this.parameters[cnt].tileid];
        var tiledata = [];
        tiledataindex.forEach(function(d){tiledata.push(data[d]);});
        this.tiles[cnt].update_tile(tiledata);
    };     
};
ddt_container.prototype.get_tile = function(tiletype_I){
    // return the appropriate tile object
    if (tiletype_I=='html'){
        return new ddt_tile_html();
    } else if (tiletype_I=='svg'){
        return new ddt_tile_svg();
    } else if (tiletype_I=='table'){
        return new ddt_tile_table();
    } else {
        return null;
    };
};
ddt_container.prototype.filter_containerdata = function(filter_I){
    // apply a global filter to all container data
    // INPUT:
    // filter_I = {key:value,...}
    for (var cnt=0;cnt<this.data.length;cnt++){ //switched from i to cnt due to i changing within the loop
        this.data[cnt].change_filters(filter_I);
    };
};
ddt_container.prototype.sync_containerdata = function(){
    // update all tiles on tile change
    // TODO: 1. pass target syncs as parameters
    //       2. implement "onchange"
    var data = this.data;
    var tiles_ = this.tiles;
    var parameters_ = this.parameters;
    var tile2datamap_ = this.tile2datamap;
    function update(){
        for (var cnt=0;cnt<tiles_.length;cnt++){ //switched from i to cnt due to i changing within the loop
            var tiledataindex = tile2datamap_[parameters_[cnt].tileid];
            var tiledata = [];
            tiledataindex.forEach(function(d){tiledata.push(data[d]);});
            tiles_[cnt].update_tile(tiledata);
        };     
    };
    for (var cnt=0;cnt<this.tiles.length;cnt++){ //switched from i to cnt due to i changing within the loop
        // sync svg
        if (this.tiles[cnt].parameters.svgid){
            //var synctiles = d3.select("#" + this.tiles[cnt].parameters.svgid + " g").on("haschange",update);
            var synctiles = d3.select("#" + this.tiles[cnt].parameters.tileid + "panel-body").on("click",update);
        };
        // sync table elements
        if (this.tiles[cnt].parameters.tableid){
            //var synctiles = d3.select("#" + this.tiles[cnt].parameters.tileid + " tbody").on("haschange",update);
            var synctiles = d3.select("#" + this.tiles[cnt].parameters.tileid + "panel-body").on("click",update);
        };
    };
};
ddt_container.prototype.add_datafiltermenusubmitbutton = function (tileid_I,htmlid_I,submitbuttonid_I){
    // add filter menu submit button listener to tile
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = 'filtermenu1'; //this.tiles[0].parameters.tileid;
        };
    if (htmlid_I){var htmlid = htmlid_I;}
    else{var htmlid = 'filtermenuform1';};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = 'submit1';};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        var tileindex = 0;
        var tiledataindex = 0;
        this_.tiles.forEach(function(d,i){
            if (d.parameters.tileid === tileid){
                tileindex=i;
                tiledataindex = this_.tile2datamap[d.parameters.tileid];
            };
        })
        for (var key in this_.data[tiledataindex].filters){
            var filterkey = d3.select("#"+htmlid+'formlabel'+key).text();
            var filterstring = d3.select("#"+htmlid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        for (var cnt=0;cnt<this_.data.length;cnt++){
            this_.data[cnt].convert_stringmenuinput2filter(filterstringmenu);
            this_.data[cnt].filter_stringdata();
        };
//         this_.tiles[tileindex].data[0].convert_stringmenuinput2filter(filterstringmenu);
//         this_.tiles[tileindex].data[0].filter_stringdata();
        this_.update_container();  
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("click",submit);
};
ddt_container.prototype.add_datafiltermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add filter menu reset button listener to tile
    if (tileid_I){var tileid = tileid_I;}
    //else{var tileid = this.tiles[0].parameters.htmlid;};
    else{var tileid = 'filtermenu1'; //this.tiles[0].parameters.tileid;
        };
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = 'reset1';};
    
    var this_ = this;
    
    function reset(){
        // reset data filters and call all tile update functions
        for (var cnt=0;cnt<this_.data.length;cnt++){ //switched from i to cnt due to i changing within the loop
            this_.data[cnt].reset_filters();
            this_.data[cnt].filter_stringdata();
        };
        this_.update_container();    
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
ddt_container.prototype.add_datafiltermenuupdatebutton = function (tileid_I,updatebuttonid_I){
    // add filter menu reset button listener to tile
    if (tileid_I){var tileid = tileid_I;}
    //else{var tileid = this.tiles[0].parameters.htmlid;};
    else{var tileid = 'filtermenu1'; //this.tiles[0].parameters.tileid;
        };
    if (updatebuttonid_I){var updatebuttonid = updatebuttonid_I;}
    else{var updatebuttonid = 'update1';};
    
    var this_ = this;
    
    function update(){
        this_.update_container();    
    };

    this.updatebutton = d3.select("#"+tileid+'submitbutton'+updatebuttonid)
        .on("click",update);
};
ddt_container.prototype.add_datafiltermenubuttons = function(datafiltermenu_I){
    // add filtermenu buttons for submit, reset, and update
    if (typeof datafiltermenu_I !== "undefined"){
        var datafiltermenu = datafiltermenu_I}
    else {
        var datafiltermenu = [{"filtermenuid":"filtermenu1","filtermenuhtmlid":"filtermenuform1",
        "filtermenusubmitbuttonid":"submit1","filtermenuresetbuttonid":"reset1",
        "filtermenuupdatebuttonid":"update1"}]};

    for (var i=0;i<datafiltermenu.length;i++){
        this.add_datafiltermenusubmitbutton(datafiltermenu[i].filtermenuid,datafiltermenu[i].filtermenuhtmlid,datafiltermenu[i].filtermenusubmitbuttonid);
        this.add_datafiltermenuresetbutton(datafiltermenu[i].filtermenuid,datafiltermenu[i].filtermenuresetbuttonid);
        this.add_datafiltermenuupdatebutton(datafiltermenu[i].filtermenuid,datafiltermenu[i].filtermenuupdatebuttonid);
    };
};
ddt_container.prototype.__main__ = function(parameters,data,tile2datamap,filtermenu){
    //run
    //ddt_test = new ddt_container();
    //container manipuation features
    this.add_header2container();
    this.add_jsonimportbutton2container();
    this.add_jsonexportbutton2container();
    //ddt data and template
    this.set_parameters(parameters);
    this.add_data(data);
    this.set_tile2datamap(tile2datamap);
    //make the container
    this.make_container();
    //add the container filter buttons
    if (typeof filtermenu !== "undefined") { ddt_test.add_datafiltermenubuttons(filtermenu); }
    else { ddt_test.add_datafiltermenubuttons(); };
};
ddt_container.prototype.add_header2container = function(){
    // add a header row to the container
    var containerid = this.containerid;

    this.containerheader = d3.select('#'+this.containerid)
        .append("div")
        .attr("class","row")
        .attr("id",containerid + 'header')
        .append("div")
        .attr("class","col-lg-12");

};
ddt_container.prototype.add_jsonexportbutton2container = function (){
    // add button to export all json data from the container to file
    var this_ = this;
    var containerid = this.containerid;

    function exportalldatajson(){
        this_.export_alldatajson(); //necessary to pass svg as "this"
    };

    var jsonexportbutton = this.containerheader
        .append("div")
        //.attr("class","glyphicon glyphicon-download pull-right")
        .attr("class","glyphicon glyphicon-floppy-save pull-left")
        .attr("id", containerid + 'jsonexportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","save container");
    jsonexportbutton.on("click", exportalldatajson);
};
ddt_container.prototype.add_jsonimportbutton2container = function (){
    // add button to import all a new container from a json data file
    var this_ = this;
    var containerid = this.containerid;

    function importalldatajson(){
        var file1 = this.files[0];

        if (!file1) {
            alert("Failed to load file");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Get the data file
                    var result = e.target.result;
                    // validate the input
                    var ddtinput = new ddt_input();
                    var ddtinputjson = JSON.parse(result);
                    ddtinput.set_ddtdatajson(ddtinputjson);
                    // delete the existing container
                    this_.remove_container();
                    // make a new container with the new data
                    this_.__main__(ddtinput.parameters,ddtinput.data,ddtinput.tile2datamap,ddtinput.filtermenu);
                };
            })(file1);

            reader.readAsText(file1);
        };
    };

    var jsonimportbutton = this.containerheader
        .append("div")
        //.attr("class","glyphicon glyphicon-download pull-right")
        .attr("class","glyphicon glyphicon-floppy-open pull-left")
        .attr("id", containerid + 'jsonexportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","open container");

    var jsonimportbutton_input = jsonimportbutton
        .append("input")
        .attr("type", "file")
        .style({
            "position": "absolute",
            "top": "0",
            "right": "0",
            "min-width": "100%",
            "min-height": "100%",
            "font-size": "100px",
            "text-align": "right",
            "filter": "alpha(opacity=0)",
            "opacity":"0",
            "outline": "none",
            "background": "white",
            "cursor": "inherit",
            "display": 'block',
        });
    jsonimportbutton_input.on("change", importalldatajson);
};
ddt_container.prototype.remove_tiles = function(){
    // remove all tiles in the container

    this.tiles.forEach(function(d){
        d.tile.remove_tile();
    });
};
ddt_container.prototype.remove_containerheaderandrows = function(){
    // remove the container header and rows
    
    var containerid = this.containerid;

    this.containerheader.remove();

    d3.selectAll('#'+containerid + ' .row').remove();
};
ddt_container.prototype.remove_container = function(){
    // remove the container
    this.remove_tiles();
    this.remove_containerheaderandrows();
    this.parameters = [];
    this.tiles = [];
    this.data = [];
    this.tile2datamap = {};
};
ddt_container.prototype.get_parameters_string = function(){
    //return the parameters object in string format
    if (typeof this.parameters !== "undefined"){
        var parameters_O = JSON.stringify(this.parameters);
    } else {
        var parameters_O = null;
    };
    return parameters_O
};
ddt_container.prototype.get_data_string = function(filtereddataonly_I){
    //return the data object in string format
    //need to update to return the only keys, nestkeys, and data

    if (typeof filtereddataonly_I === "undefined"){
        var filtereddataonly = false;
    } else {
        var filtereddataonly = filtereddataonly_I;
    };

    if (typeof this.data !== "undefined"){
        var data_tmp = [];
        this.data.forEach(function(d){
            data_tmp.push(d.get_datajson(filtereddataonly));
        });
        var data_O = JSON.stringify(data_tmp);
    } else {
        var data_O = null;
    };

    return data_O
};
ddt_container.prototype.get_tile2datamap_string = function(){
    //return the tile2datamap object in string format
    if (typeof this.tile2datamap !== "undefined"){
        var tile2datamap_O = JSON.stringify(this.tile2datamap);
    } else {
        var tile2datamap_O = null;
    };
    return tile2datamap_O
};
ddt_container.prototype.get_filtermenu_string = function(){
    //return the filtermenu object in string format
    if (typeof this.filtermenu !== "undefined"){
        var filtermenu_O = JSON.stringify(this.filtermenu);
    } else {
        var filtermenu_O = null;
    };
    return filtermenu_O
};
ddt_container.prototype.get_alldata_string = function(){
    //return all container data in string format
    var parameters_str = this.get_parameters_string();
    var data_str = this.get_data_string(true);
    var tile2datamap_str = this.get_tile2datamap_string();
    var filtermenu_str = this.get_filtermenu_string();
    var alldata_O = '';
    if (parameters_str){alldata_O += 'var parameters = ' + parameters_str + ';'};
    if (data_str){alldata_O += 'var data = ' + data_str + ';'};
    if (tile2datamap_str){alldata_O += 'var tile2datamap = ' + tile2datamap_str + ';'};
    if (filtermenu_str){alldata_O += 'var filtermenu = ' + filtermenu_str + ';'};
    return alldata_O;
};
ddt_container.prototype.export_alldatajson_string = function () {
    // export all container data as json

    var a = document.createElement('a');
    a.download ="container" + '.json'; // file name
    var j = this.get_alldata_string();
    a.setAttribute("href-lang", "application/json");
    // test/json instead of application/json preserves white spaces!
    a.href = 'data:text/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};




ddt_container.prototype.get_parameters = function(){
    //return the parameters object in string format
    if (typeof this.parameters !== "undefined"){
        var parameters_O = this.parameters;
    } else {
        var parameters_O = null;
    };
    return parameters_O
};
ddt_container.prototype.get_data = function(filtereddataonly_I){
    //return the data object in string format

    if (typeof filtereddataonly_I === "undefined"){
        var filtereddataonly = false;
    } else {
        var filtereddataonly = filtereddataonly_I;
    };
    
    var data_O = [];
    if (typeof this.data !== "undefined"){
        this.data.forEach(function(d){
            data_O.push(d.get_datajson(filtereddataonly));
        });
    } else {
        var data_O = null;
    };

    return data_O
};
ddt_container.prototype.get_tile2datamap = function(){
    //return the tile2datamap object in string format
    if (typeof this.tile2datamap !== "undefined"){
        var tile2datamap_O = this.tile2datamap;
    } else {
        var tile2datamap_O = null;
    };
    return tile2datamap_O
};
ddt_container.prototype.get_filtermenu = function(){
    //return the filtermenu object in string format
    if (typeof this.filtermenu !== "undefined"){
        var filtermenu_O = this.filtermenu;
    } else {
        var filtermenu_O = null;
    };
    return filtermenu_O
};
ddt_container.prototype.get_alldata = function(){
    //return all container data in string format
    var parameters_json = this.get_parameters();
    var data_json = this.get_data(true);
    var tile2datamap_json = this.get_tile2datamap();
    var filtermenu_json = this.get_filtermenu();
    var alldata_O = {};
    if (parameters_json){alldata_O['parameters'] = parameters_json;};
    if (data_json){alldata_O['data'] = data_json;};
    if (tile2datamap_json){alldata_O['tile2datamap'] = tile2datamap_json;};
    if (filtermenu_json){alldata_O['filtermenu'] = filtermenu_json;};
    return alldata_O;
};
ddt_container.prototype.export_alldatajson = function () {
    // export all container data as json

    var a = document.createElement('a');
    a.download ="container" + '.json'; // file name
    var j = JSON.stringify(this.get_alldata());
    a.setAttribute("href-lang", "application/json");
    // test/json instead of application/json preserves white spaces!
    a.href = 'data:text/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};