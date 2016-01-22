"use strict";
function _check_filesaver() {
    /** Check if Blob is available, and alert if it is not. */
    try {
        var isFileSaverSupported = !!new Blob();
    } catch (e) {
        alert("Blob not supported");
    };
};
function load_json(f, callback, pre_fn, failure_fn) {
    /** Try to load the file as JSON.
     Arguments
     ---------
     f: The file path
     callback: A callback function that accepts arguments: error, data.
     pre_fn: (optional) A function to call before loading the data.
     failure_fn: (optional) A function to call if the load fails or is aborted.
     */
    // Check for the various File API support.
    if (!(window.File && window.FileReader && window.FileList && window.Blob))
        callback("The File APIs are not fully supported in this browser.", null);

    var reader = new window.FileReader();
    // Closure to capture the file information.
    reader.onload = function(event) {
        var result = event.target.result,
            data;
        // try JSON
        try {
            data = JSON.parse(result);
        } catch (e) {
            // if it failed, return the error
            callback(e, null);
            return;
        }
        // if successful, return the data
        callback(null, data);
    };
    if (pre_fn !== undefined && pre_fn !== null) {
        try { pre_fn(); }
        catch (e) { console.warn(e); }
    }
    reader.onabort = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    }
    reader.onerror = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    }
    // Read in the image file as a data URL.
    reader.readAsText(f);
}

function load_json_or_csv(f, csv_converter, callback, pre_fn, failure_fn,
                          debug_event) {
    /** Try to load the file as JSON or CSV (JSON first).
     Arguments
     ---------
     f: The file path
     csv_converter: A function to convert the CSV output to equivalent JSON.
     callback: A callback function that accepts arguments: error, data.
     pre_fn: (optional) A function to call before loading the data.
     failure_fn: (optional) A function to call if the load fails or is aborted.
     debug_event: (optional) An event, with a string at
     event.target.result, to load as though it was the contents of a
     loaded file.
     */
    // Check for the various File API support.
    if (!(window.File && window.FileReader && window.FileList && window.Blob))
        callback("The File APIs are not fully supported in this browser.", null);

    var reader = new window.FileReader(),
        // Closure to capture the file information.
        onload_function = function(event) {

            var result = event.target.result,
                data, errors;
            // try JSON
            try {
                data = JSON.parse(result);
            } catch (e) {
                errors = 'JSON error: ' + e;

                // try csv
                try {
                    data = csv_converter(d3.csv.parseRows(result));
                } catch (e) {
                    // if both failed, return the errors
                    callback(errors + '\nCSV error: ' + e, null);
                    return;
                }
            }
            // if successful, return the data
            callback(null, data);
        };
    if (debug_event !== undefined && debug_event !== null) {
        console.warn('Debugging load_json_or_csv');
        return onload_function(debug_event);
    }
    if (pre_fn !== undefined && pre_fn !== null) {
        try { pre_fn(); }
        catch (e) { console.warn(e); }
    }
    reader.onabort = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    };
    reader.onerror = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    };
    // Read in the image file as a data URL.
    reader.onload = onload_function;
    reader.readAsText(f);
};
function csv_converter(csv_rows) {
    /** Convert data from a csv file to json-style data.
     File must include a header row.
     */
    // count rows
    var c = csv_rows[0].length,
        converted = [];
    if (c < 2 || c > 3)
        throw new Error('CSV file must have 2 or 3 columns');
    // set up rows
    for (var i = 1; i < c; i++) {
        converted[i - 1] = {};
    }
    // fill
    csv_rows.slice(1).forEach(function(row) {
        for (var i = 1, l = row.length; i < l; i++) {
            converted[i - 1][row[0]] = row[i];
        }
    });
    return converted;
};
function download_json(json, name) {
    /** Download json file in a blob.
     */

    // alert if blob isn't going to work
    _check_filesaver();

    var j = JSON.stringify(json),
        blob = new Blob([j], {type: "application/json"});
    saveAs(blob, name + '.json');
};
function download_svg(name, svg_sel, do_beautify) {
    /** Download an svg file using FileSaver.js.
     *
     * Arguments
     * ---------
     *
     * name: The filename (without extension).
     *
     * svg_sel: The d3 selection for the SVG element.
     *
     * do_beautify: (Boolean) If true, then beautify the SVG output.
     *
     */

    // alert if blob isn't going to work
    _check_filesaver();

    // make the xml string
    var xml = (new XMLSerializer()).serializeToString(svg_sel.node());
    if (do_beautify) xml = vkbeautify.xml(xml);
    xml = '<?xml version="1.0" encoding="utf-8"?>\n \
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n \
    "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + xml;

    // save
    var blob = new Blob([xml], {type: "image/svg+xml"});
    saveAs(blob, name + '.svg');
};
class ddt_inputarguments{
    // generic html element
    constructor (){
        this.node=null;
        this.inputarguments={};
    };
    set node (node_I) { this.node = node_I}
    get node () { return this.node}
    set inputarguments (inputarguments_I) { this.inputarguments = inputarguments_I}
    get inputarguments () { return this.inputarguments}
};
ddt_inputarguments.prototype.set_node = function(node_I,node_id_I){
    //set the node

    //extract out the node
    if (typeof(node_I)!=="undefined"){
        this.node = node_I;
    } else if (typeof(node_id_I)!=="undefined"){
        this.node = d3.select(node_id_I);
    } else {
        this.node = null;
        console.log("node not defined.");
    };
    //validate the node
    if (typeof(node)==="undefined" || !node){
        this.node = null;
        console.log("node not found.");        
    };
};
ddt_inputarguments.prototype.get_node = function(){
    // return the node
    return this.node;
};
ddt_inputarguments.prototype.set_inputarguments = function(inputarguments_I){
    // set the inputarguments
    //inputarguments
    if (typeof(inputarguments_I)!=="undefined"){
        this.inputarguments = inputarguments_I;
    } else {
        this.inputarguments = null;
        console.log("inputarguments not defined.");
    };
};
ddt_inputarguments.prototype.get_inputarguments = function(){
    // return the inputarguments
    return this.inputarguments;
};
ddt_inputarguments.prototype.validate_inputarguments = function(input_I) {
    // validate user input arguments
    // INPUT:
    // input_I = {} of the following:
    // node = node to add the button to
    // node_id = node id to add the button to
    // inputarguments = {} of properties
    //

    var node_I = input_I.node;
    var node_id_I = input_I.node_id;
    var inputarguments_I = input_I.inputarguments;

    this.set_node(node_I,node_id_I);
    this.set_inputarguments(inputarguments_I);
};
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
d3_tile.prototype.update_colclass = function (colclass_I) {
    // update the column class
    var tileid = this.tileid;

    this.colclass = colclass_I;

    var tilecol = d3.select("#"+tileid).node().parentNode
    tilecol.className = colclass_I;
};
d3_tile.prototype.update_colid = function (colid_I){
    // update the column id
    var tileid = this.tileid;

    this.colid = colid_I;

    var tilecol = d3.select("#"+tileid).node().parentNode
    tilecol.id = colid_I;
}
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
d3_tile.prototype.append_tile2container = function (containerid_I,rowid_I,colid_I) {
    // set column id
    if(typeof(containerid_I)!=="undefined"){
        var containerid = containerid_I;
    } else {
        var containerid = this.containerid;
    };
    if(typeof(rowid_I)!=="undefined"){
        var rowid = rowid_I;
    } else {
        var rowid = this.rowid;
    };
    if(typeof(colid_I)!=="undefined"){
        var colid = colid_I;
    } else {
        var colid = this.colid;
    };

    var this_ = this;

    function allowDrop() {
        if (d3.event){
            d3.event.preventDefault();
        };
    };
    function drop() {
        this_.trigger_drop();
    };
    function dragEnter() {
        if (d3.event){
            var tiletargetid = d3.event.target.id;
            if (tiletargetid.indexOf('col')===0 || tiletargetid.indexOf('row')===0){
                d3.event.target.style.background="grey";
            };
        };
    };
    function dragLeave() {
        if (d3.event){
            d3.event.target.style.background="";
        };
    };
    var row = d3.select("#" + this.containerid)
        .append("div")
        .attr("class", this.rowclass)
        .attr("id", rowid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
    var col = row.append("div")
        .attr("class", this.colclass)
        .attr("id", colid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
    this.tile = col.append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.append_tile2row = function (containerid_I,rowid_I,colid_I) {
    // add tile as new column in an existing row
    if(typeof(containerid_I)!=="undefined"){
        var containerid = containerid_I;
    } else {
        var containerid = this.containerid;
    };
    if(typeof(rowid_I)!=="undefined"){
        var rowid = rowid_I;
    } else {
        var rowid = this.rowid;
    };
    if(typeof(colid_I)!=="undefined"){
        var colid = colid_I;
    } else {
        var colid = this.colid;
    };
    var this_ = this;

    function allowDrop() {
        if (d3.event){
            d3.event.preventDefault();
        };
    };
    function drop() {
        this_.trigger_drop();
    };
    function dragEnter() {
        if (d3.event){
            var tiletargetid = d3.event.target.id;
            if (tiletargetid.indexOf('col')===0 || tiletargetid.indexOf('row')===0){
                d3.event.target.style.background="grey";
            };
        };
    };
    function dragLeave() {
        if (d3.event){
            d3.event.target.style.background="";
        };
    };

    var col = d3.select("#" + this.containerid).select("#" + this.rowid)
        .append("div")
        .attr("class", this.colclass)
        .attr("id", this.colid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
    this.tile = col.append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.append_tile2col = function (containerid_I,rowid_I,colid_I) {
    // add tile to as a new row in an existing column
    if(typeof(containerid_I)!=="undefined"){
        var containerid = containerid_I;
    } else {
        var containerid = this.containerid;
    };
    if(typeof(rowid_I)!=="undefined"){
        var rowid = rowid_I;
    } else {
        var rowid = this.rowid;
    };
    if(typeof(colid_I)!=="undefined"){
        var colid = colid_I;
    } else {
        var colid = this.colid;
    };
    

    this.tile = d3.select("#" + containerid)
        .select("#" + rowid)
        .select("#" + colid)
        .append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
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

    function removetile(){
        d3.selectAll('#'+tileid).remove();
        this_.tile = null;
        //this_ = null;
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
        .attr("id",tileid+"panel-body");
};
d3_tile.prototype.add_navigationmenu2header = function(){
    //add a navigation menu
    //move tile 1 column to the left
    //move tile 1 column to the right
    //move tile 1 row up
    //move tile 1 row down

    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;

    var this_ = this;

    function movetileleft(){
        //swap places with the tile to the left

        // get all colids in the row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var colids = this_.get_colidsinrow(tileid);
        // get the current colid (it may have not been updated)
        var colid = colNode.id;
        // get the colid to the left
        if (colids.indexOf(colid)===0){
            // this is the first column in the row
            // do nothing
            return;
        };
        var colidleft = colids[0];
        for (var i=1;i<colids.length;i++){
            if (colids[i]===colid){
                colidleft = colids[i-1];
                break;
            };
        };
        // update the colid of left tile
        var colNodeLeft=rowNode.childNodes[colids.indexOf(colidleft)];
        colNodeLeft.id = colid;
        // update the colid of this tile
        this_.update_colid(colidleft);
        // swap tiles
        rowNode.insertBefore(colNode,colNodeLeft);
    };
    function movetileright(){
        //swap places with the tile to the left
        
        // get all colids in the row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var colids = this_.get_colidsinrow(tileid);
        // get the current colid (it may have not been updated)
        var colid = colNode.id;
        // get the colid to the right
        if (colids.indexOf(colid)===colids.length){
            // this is the last column in the row
            // do nothing
            return;
        };
        var colidright = colids[-1];
        for (var i=0;i<colids.length-1;i++){
            if (colids[i]===colid){
                colidright = colids[i+1];
                break;
            };
        };
        // update the colid of left tile
        var colNoderight=rowNode.childNodes[colids.indexOf(colidright)];
        colNoderight.id = colid;
        // update the colid of this tile
        this_.update_colid(colidright);
        // swap tiles
        rowNode.insertBefore(colNoderight,colNode);
    };
    function movetileup(){
        //add tile as last column of upper row
        
        // get all colids in the upper row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var parentRowNode = this_.get_parentrownode(tileid);
        var rowids = this_.get_rowidsinparentrow(tileid);
        // get the current colid and rowid (it may have not been updated)
        var colid = colNode.id;
        var rowid = rowNode.id;
        // get the row above
        if (rowids.indexOf(rowid)===0){
            // this is the first
            // do nothing
            return;
        };
        var rowidup = rowids[0];
        for (var i=1;i<rowids.length;i++){
            if (rowids[i]===rowid){
                rowidup = rowids[i-1];
                break;
            };
        };
        // update the rowid
        if (rowidup==="containerheader"){
            // do not add tiles to the containerheader row
            return;
        };
        this_.rowid = rowidup;
        // get the row up node
        var rowupnode = parentRowNode.childNodes[rowids.indexOf(rowidup)];
        var rowupnodechildrenlength = rowupnode.childNodes.length;
        if (rowupnodechildrenlength===0){
            //there is no column in the row
            //append as the first column
            // update the colid of this colnode
            this_.update_colid("col1")
            // insert the tile as the first column of the row
            rowupnode.appendChild(colNode);
        } else {
            // get the row up node id
            var lastcolid = rowupnode.childNodes[rowupnodechildrenlength-1].id;
            // increment the last col id
            var lastcolidint = this_.convert_colid2int(lastcolid);
            var newcolidint = lastcolidint + 1;
            var newcolid = this_.make_colidfromint(newcolidint);
            // update the colid of this colnode
            this_.update_colid(newcolid)
            // append the tile as the last column of the row
            rowupnode.appendChild(colNode);
        };
    };
    function movetiledown(){
        //add tile as first column of lower row
        // get all colids in the upper row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var parentRowNode = this_.get_parentrownode(tileid);
        var rowids = this_.get_rowidsinparentrow(tileid);
        // get the current colid and rowid (it may have not been updated)
        var colid = colNode.id;
        var rowid = rowNode.id;
        // get the row below
        if (rowids.indexOf(rowid)===rowids.length-1){
            // this is the last row
            // do nothing
            return;
        };
        var rowiddown = rowids[0];
        for (var i=1;i<rowids.length;i++){
            if (rowids[i]===rowid){
                rowiddown = rowids[i+1];
                break;
            };
        };
        // update the rowid
        this_.rowid = rowiddown;
        // get the row down node
        var rowdownnode = parentRowNode.childNodes[rowids.indexOf(rowiddown)];
        var rowdownnodechildrenlength = rowdownnode.childNodes.length;
        if (rowdownnodechildrenlength===0){
            //there is no column in the row
            //append as the first column
            // update the colid of this colnode
            this_.update_colid("col1")
            // insert the tile as the first column of the row
            rowdownnode.appendChild(colNode);
        } else {
            // get the row down node id
            var firstcol = rowdownnode.childNodes[0];
            var firstcolid = firstcol.id;
            var lastcol = rowdownnode.childNodes[rowdownnodechildrenlength-1];
            var lastcolid = rowdownnode.childNodes[rowdownnodechildrenlength-1].id;
            // get the row down column ids
            var colidsdown = this_.get_colidsinrow(firstcol.childNodes[0].id);
            // increment the last col id
            var lastcolidint = this_.convert_colid2int(lastcolid);
            var lastcolidint = lastcolidint + 1;
            var lastcolid = this_.make_colidfromint(lastcolidint);
            colidsdown.push(lastcolid); //add the updated lastcolid to the rowids list
            // increment all columns in the row down node
            for (var i=0;i<rowdownnodechildrenlength;i++){
                rowdownnode.childNodes[i].id = colidsdown[i+1];
            };
            // update the colid of this colnode
            this_.update_colid(firstcolid)
            // insert the tile as the first column of the row
            rowdownnode.insertBefore(colNode,firstcol);
        };
    };

    var navmenu = this.tileheader.append("div")
        .attr("id", tileid + 'navigationmenu');
    var moveleftbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-left pull-left")
        .attr("id", tileid + 'movetileleft')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","column left");
    moveleftbutton.on("click",movetileleft);
    var moverightbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-right pull-left")
        .attr("id", tileid + 'movetileright')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","column right");
    moverightbutton.on("click",movetileright);
    var moveupbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-up pull-left")
        .attr("id", tileid + 'movetileup')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","row up");
    moveupbutton.on("click",movetileup);
    var movedownbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-down pull-left")
        .attr("id", tileid + 'movetiledown')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","row down");
    movedownbutton.on("click",movetiledown);
};
d3_tile.prototype.add_resize2header = function(){
    // add tile resize
    // expand tile col width 1 increment
    // decrease tile width 1 increment
    // increments are the following:
    //  3, 4, 6, 8, 9, 12

    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;
    var colclass = this.colclass;
    var colsizes = [3,4,6,8,9,12];

    var this_ = this;
    function expandtilehorizontal(){
        var colclasslist = this_.colclass.split('-');
        var colclassint = parseInt(colclasslist.pop());
        var colclassbase = colclasslist.join('-')
        var colclassnewint = 12;
        for (var i=0;i<colsizes.length;i++){
            if(colsizes[i]>colclassint){
                colclassnewint = colsizes[i];
                break;
            };
        };
        var colclassnew = colclassbase + '-' + colclassnewint.toString();
        this_.update_colclass(colclassnew);
    };
    function shrinktilehorizontal(){ 
        var colclasslist = this_.colclass.split('-');
        var colclassint = parseInt(colclasslist.pop());
        var colclassbase = colclasslist.join('-')
        var colclassnewint = 3;
        for (var i=1;i<colsizes.length;i++){
            if(colsizes[i]>=colclassint){
                colclassnewint = colsizes[i-1];
                break;
            };
        };
        var colclassnew = colclassbase + '-' + colclassnewint.toString();
        this_.update_colclass(colclassnew);
//         this_.colclass = colclassnew;
//         var tilecol = d3.select("#"+tileid).node().parentNode
//         tilecol.className = colclassnew;
    };

    var resizemenu = this.tileheader.append("div")
        .attr("id", tileid + 'resizemenu');
    var expandbutton = resizemenu.append("div")
        .attr("class","glyphicon  glyphicon-resize-full pull-left")
        .attr("id", tileid + 'expandtile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","expand tile width");
    expandbutton.on("click",expandtilehorizontal);

    var shrinkbutton = resizemenu.append("div")
        .attr("class","glyphicon  glyphicon-resize-small pull-left")
        .attr("id", tileid + 'shrinktile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","shrink tile width");
    shrinkbutton.on("click",shrinktilehorizontal);
};
d3_tile.prototype.set_draganddrop = function () {
    // set drag and drop attribute to tile
    //draggable="true" ondragstart="drag(event)"
   
    var tileid = this.tileid;

    function drag() {
        if (d3.event){
            d3.event.dataTransfer.setData("text", d3.event.target.id);
        };
    };

    this.tile.attr("draggable", "true")
        .on("dragstart", drag);
};
d3_tile.prototype.trigger_drop = function() {
    // drop event function
    if (d3.event){
        d3.event.preventDefault();
        d3.event.target.style.background="";
        var tiletargetid = d3.event.target.id;
        if (tiletargetid.indexOf('col')===0){
            // append tile to an existing column
            //var tiletargetidrow = d3.event.target.parentNode.id;
            var tiledropid = d3.event.dataTransfer.getData("text");
            var tiledrop = d3.select("#"+tiledropid).node();
            //this.append_tile2col(this.containerid,tiletargetidrow,tiletargetid);
            d3.event.target.appendChild(tiledrop);
        };
        if (tiletargetid.indexOf('row')===0){
            // append tile as a new column to an existing row
            var tiledropid = d3.event.dataTransfer.getData("text");
            var tiledrop = d3.select("#"+tiledropid).node().parentNode;
            // get the last column id
            var rowchildrenlength = d3.event.target.childNodes.length;
            var lastcolid = d3.event.target.childNodes[rowchildrenlength-1].id;
            // make a new column id
            var lastcolidint = this.convert_colid2int(lastcolid);
            var newcolidint = lastcolidint + 1;
            var newcolid = this.make_colidfromint(newcolidint);
            // update the tile column id
            tiledrop.id=newcolid;
            // append the tile as the last column of the row
            d3.event.target.appendChild(tiledrop);
        };
    };
};
d3_tile.prototype.convert_colid2int = function(colid_I){
    //convert a column id string to an integer
    var colidint_O = 0;
    if (typeof(colid_I)!=="undefined"){
        var colidstr = colid_I;
    } else {
        console.log("no colid provided");
        return colidint_O;
    };

    if (colidstr.indexOf('col')===0){
        colidint_O = parseInt(colidstr.replace('col',''));
    } else {
        console.log("invalid colid provided");
        return colidint_O;
    };
    return colidint_O;
};
d3_tile.prototype.make_colidfromint = function(colidint_I){
    //convert a column id int to a string
    var colid_O = 'col0';
    if (typeof(colidint_I)!=="undefined"){
        var colidint = colidint_I;
    } else {
        console.log("no colid provided");
        return colid_O;
    };
    colid_O = 'col' + colidint.toString();
    return colid_O;
};
d3_tile.prototype.get_colnode = function(tileid_I){
    //get column node by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //colNode = node of the column  
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };
    var colNode = d3.select("#"+tileid).node().parentNode;
    return colNode;
};
d3_tile.prototype.get_rownode = function(tileid_I){
    //get row node by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //rowNode = node of the row 
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    return rowNode;
};
d3_tile.prototype.get_colidsinrow = function(tileid_I){
    //get all colids in a row by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //colids = list of colids in the row  
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };  
    var output_O = [];
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    var colids = [];
    for (var i=0;i<rowNode.childNodes.length;i++){
        colids.push(rowNode.childNodes[i].id);
    };
    return colids;
};
d3_tile.prototype.get_parentrownode = function(tileid_I){
    //get parent node of the row
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //rowParentNode = node of the row 
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    var parentRowNode = rowNode.parentNode;
    return parentRowNode;
};
d3_tile.prototype.get_rowidsinparentrow = function(tileid_I){
    //get all colids in a row by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //colids = list of colids in the row  
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };  
    var output_O = [];
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    var parentRowNode = rowNode.parentNode;
    var rowids = [];
    for (var i=0;i<parentRowNode.childNodes.length;i++){
        rowids.push(parentRowNode.childNodes[i].id);
    };
    return rowids;
};
d3_tile.prototype.add_duplicatebutton2header = function (){
    // add duplication button to tile
    // TODO: fix

    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;

    var this_ = this;

    function duplicatetile(){
        //duplicate the tile
        
        // get all colids in the row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var colids = this_.get_colidsinrow(tileid);
        // get the current colid (it may have not been updated)
        var colid = colNode.id;
        // duplicate the colNode
        var colNodeCopy=colNode.cloneNode(true);
        // make a new column id
        var colidint = this_.convert_colid2int(colid);
        var newcolidint = colidint + 1;
        var newcolid = this_.make_colidfromint(newcolidint);
        // make a new tileid
        var newtileid = tileid+"-copy"
        // update the copied node
        colNodeCopy.id = newcolid;
        colNodeCopy.childNodes[0].id = newtileid;
        // swap tiles
        rowNode.appendChild(colNodeCopy);
    };

    var duplicatetilebutton = this.tileheader.append("div")
        .attr("class","glyphicon glyphicon-duplicate pull-right")
        .attr("id", tileid + 'duplicatetile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","duplicate");
    duplicatetilebutton.on("click",duplicatetile);
};
d3_tile.prototype.enable_touch = function (){
    // all touch features
    this.add_touchpan();
    this.add_touchswipe();
    this.add_touchtap();
    this.add_touchpinch();
    this.add_touchpress();
}
d3_tile.prototype.add_touchpan = function () {
    // add pan functionality using hammer.js
   
    var tileid = this.tileid;

    var myElement = document.getElementById(tileid+"panel-heading");
    var hammertime = new Hammer(myElement);

    hammertime.get('pan').set(
        { direction: Hammer.DIRECTION_ALL});

    hammertime.on('panleft panright', function(ev) {
        console.log("horizontal");
    });
    hammertime.on('panup pandown', function(ev) {
        console.log("vertical");
    });
};
d3_tile.prototype.add_touchswipe = function () {
    // add swipe functionality using hammer.js
   
    var tileid = this.tileid;

    var myElement = document.getElementById(tileid+"panel-heading");
    var hammertime = new Hammer(myElement);

    hammertime.get('swipe').set(
        { direction: Hammer.DIRECTION_ALL,
        prevent_default: true,
        drag_min_distance:1,
        swipe_velocity:.1
        });

    hammertime.on('swipeleft', function(ev) {
        console.log("left");
    });
    hammertime.on('swiperight', function(ev) {
        console.log("right");
    });
    hammertime.on('swipeup', function(ev) {
        console.log("up");
    });
    hammertime.on('swipedown', function(ev) {
        console.log("down");
    });
};
d3_tile.prototype.add_touchtap = function () {
    // add tap functionality using hammer.js
   
    var tileid = this.tileid;

    var myElement = document.getElementById(tileid+"panel-heading");
    var hammertime = new Hammer(myElement);

    // Tap recognizer with minimal 2 taps
    hammertime.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
    // Single tap recognizer
    hammertime.add( new Hammer.Tap({ event: 'singletap' }) );
    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    hammertime.get('doubletap').recognizeWith('singletap');
    // we only want to trigger a tap, when we don't have detected a doubletap
    hammertime.get('singletap').requireFailure('doubletap');
    hammertime.on("doubletap", function(ev) {
        console.log(ev);
    });

//     hammertime.on('tap', function(ev) {
//         console.log(ev);
//     });
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
                       //NOTE: only string filters and string filtering is supported
                       //TODO: support filtering on boolean, numeric, date and time, and custom functions
    this.listdata = []; // data in database table form (must contain a column "used_");
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
    // BUG: entries of null/''/undefined break the nest
    
    var add_nestkey = this.add_nestkey;
    var nesteddata_O = d3.nest();
    for (var i=0;i<key_I.length;i++){
        nesteddata_O = nesteddata_O.key(add_nestkey(key_I[i]));
    };
    if (typeof(rollup_I)!=="undefined"){
        nesteddata_O = nesteddata_O.rollup(rollup_I);
    };
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
d3_data.prototype.add_usedkey2listdata = function (){
    // add used_ key to listdata
    // should be done once to ensure that here is a used_ key
    
    //set _used to false:
    for (var i = 0; i < this.listdata.length; i++) {
        if (typeof(this.listdata[i]["used_"])==="undefined"){
            this.listdata[i]['used_'] = true;
        };
    };
};
d3_data.prototype.reset_usedkey = function (){
    // reset used_ to true on listdata
    
    //set _used to false:
    for (var i = 0; i < this.listdata.length; i++) {
        this.listdata[i]['used_'] = true;
    };
};
d3_data.prototype.add_keysandvalues2listdata = function (key_values_I){
    // add a new key and default value to list data
    //INPUT:
    //key_values_I = {"key":"value",...}
    
    for (var i = 0; i < this.listdata.length; i++) {
        for (var key in key_values_I){
            if (typeof(this.listdata[i][key])==="undefined"){
                this.listdata[i][key] = key_values_I[key];
            };
        };
    };
};
d3_data.prototype.remove_keysfromlistdata = function (key_I){
    // remove a key from list data
    //INPUT:
    //key_I = string
    
    for (var i = 0; i < this.listdata.length; i++) {
        for(var k in key_I){
            delete this.listdata[i][k];
        };
    };
};
d3_data.prototype.filter_listdata = function () {
    // apply filters to list data for the following data types:
    // 1. string
    // 2. boolean
    // 3. numeric
    // 4. date and time
    // 5. custom function

    // clear listdatafiltered and nestdatafiltered
    this.listdatafiltered = [];
    this.nestdatafiltered = [];

    // apply each filter based on the data type
    // TODO filter based on datatype
    this.filter_stringdata();

    // remake nestdatafiltered
    this.nestdatafiltered = this.convert_list2nestlist(this.listdatafiltered,this.nestkey);

    // update the filters
    if (this.listdatafiltered.length!==0){
        this.update_filters();
        };
};
d3_data.prototype.filter_stringdata = function () {
    // apply filters to listdata

    // NOTE: changes made to listdatacopy are applied to this.listdata
    var listdatacopy = this.listdata;
    var listdatafiltered_O = this.listdatafiltered;

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
                    //NOTES: need to check for an array (arrays will break)
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
};
d3_data.prototype.set_listdata = function (listdata_I,nestkey_I) {
    // set list data and initialize filtered data
    this.nestkey = nestkey_I;
    this.listdata = listdata_I;
    this.listdatafiltered = listdata_I;
    this.nestdatafiltered = this.convert_list2nestlist(listdata_I,this.nestkey);
};
d3_data.prototype.set_keys = function (keys_I) {
    // set the keys
    //INPUT:
    //keys_I = list of strings
    this.keys = keys_I;
};
d3_data.prototype.add_keys = function (keys_I) {
    // add keys
    //INPUT:
    //keys_I = list of strings
    for (var i=0;i<keys_I.length;i++){
        var newkey = keys_I[i]; //should ensure that the key is a string
        this.keys.push(newkey);
    };
};
d3_data.prototype.remove_keys = function (keys_I) {
    // remove keys
    //INPUT:
    //keys_I = list of strings
    for (var i=0;i<keys_I.length;i++){
        var removekey = keys_I[i]; //should ensure that the key is a string
        this.keys.pop(removekey);
    };
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
d3_data.prototype.change_filters = function (filter_I) {
    // modify the filter according to the new filter
    // Behavior: 
    // 1. update existing filters
    // 2. add in new filters if they do not exist
    
    for (var key in filter_I) {
        this.filters[key] = filter_I[key];
    };
};
d3_data.prototype.change_filtersinkeys = function (filter_I) {
    // modify the filter according to the new filter
    // Behavior: 
    // 1. update existing filters that are in the keys
    
    for (var key in filter_I) {
        if (Object.keys(this.filters).indexOf(key) > -1){
            this.filters[key] = filter_I[key];
        };
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
    this.nestdatafiltered.forEach(rename);
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
    //this.change_filters(filtermap) //can lead to adding in filters unintentionally
    this.change_filtersinkeys(filtermap)
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
d3_data.prototype.clear_data = function () {
    // clear list data
    this.listdata = [];
    this.listdatafiltered = [];
    this.nestdatafiltered = [];
};
d3_data.prototype.get_listdata = function(){
    // retrieve rows from listdata
    return this.listdata;
};
d3_data.prototype.get_listdatafiltered = function(){
    // retrieve filtered rows from listdatafiltered
    return this.listdatafiltered;
};
d3_data.prototype.get_nestdatafiltered = function(){
    // retrieve filtered rows from nestdatafiltered
    return this.nestdatafiltered;
};
d3_data.prototype.update_listdata = function(key_values_I){
    // update rows in listdata that are used_
    //INPUT:
    //key_values_I = {"key":"new value",...};
    
    for (var i = 0; i < this.listdata.length; i++) {
        if (this.listdata[i]["used_"]){ //apply update to filtered data
            for (var key in key_values_I){
                if (typeof(this.listdata[i][key])!=="undefined"){ //do not add in new keys not presents
                    this.listdata[i][key] = key_values_I[key];
                };
            };
        };
    };    
};
d3_data.prototype.add_listdata = function(data_row_I){
    // add rows to listdata
    //INPUT:
    //data_row_I = [{}] of data to add

    var listdatakeys = Object.keys(this.listdata[0]);
    var listdata_O = this.listdata;

    data_row_I.forEach(function(d){
        //ensure each row has all keys
        var newdata = {};
        for (var key in listdatakeys){
            if(typeof(d[key]==="undefined")){
                newdata[key]=null;
            } else {
                newdata[key] = d[key];
            };
        };
        listdata_O.push(newdata);
    });
};
d3_data.prototype.remove_listdata = function(){
    // remove rows from listdata

    //make a new listdata
    var listdata_O = [];
    this.listdatafiltered.forEach(function(d){
        listdata_O.push(d);
    });
    this.listdata = listdata_O;
};
d3_data.prototype.convert_listdatafiltered2crosstable = function(){
    // donvert list data to cross table
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.listdatafiltered;
    var tableheaders = this.tableheaders;
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
};
d3_data.prototype.group_listdatafiltered = function(groups_I){
    // group list data
    // INPUT:
    // groups_I = list of keys 
    // OUTPUT:
    // group_O = grouped list data
    // TODO:
    // broken...

    var listdatafiltered = this.listdatafiltered;
    var group_set = new Set();
    for (var i=0; i<listdatafiltered.length; i++){
        var tmp = {};
        for (var j=0; j<groups_I.length; j++){
            tmp[groups_I[j]]=listdatafiltered[i][groups_I[j]];
        };
        group_set.add(tmp);
    };
    var group_O = Array.from(group_set);
    return group_O;
};
d3_data.prototype.get_uniquevaluesFromlistdatafiltered = function(key_I){
    // get unique values
    // INPUT:
    // key_I = column key to extract 
    // OUTPUT:
    // uniquevalues_O = array of unique values
    // TODO:
    // broken...

    var listdatafiltered = this.listdatafiltered;
    var uniquevalues_set = new Set();
    for (var i=0; i<listdatafiltered.length; i++){
        var tmp = listdatafiltered[i][key_I];
        uniquevalues_set.add(tmp);
    };
    var uniquevalues_O = Array.from(uniquevalues_set);
    return uniquevalues_O;
};
d3_data.prototype.order_listdatafiltered = function(order_I){
    // group list data
    // INPUT:
    // order_I = [{key:direction},...] e.g. [{'analysis_id':'asc'}]
    //      where direction = 'asc' ascending
    //                      = 'desc' descending

    var listdatafiltered =this.listdatafiltered;

    function sortproperty_asc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (a[prop] - b[prop]);
            } else {
                return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
            }
        };
    };
    function sortproperty_desc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (b[prop] - a[prop]);
            } else {
                return ((b[prop] < a[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0));
            }
        };
    };
    order_I.forEach(function(d){
        for (var key in d){
            if (d[key]==='asc'){
                listdatafiltered.sort(sortproperty_asc(key));
            } else if (d[key]==='desc'){
                listdatafiltered.sort(sortproperty_desc(key));         
            };
        };
    });
};
d3_data.prototype.order_nestdatafiltered = function(order_I){
    // group list data
    // INPUT:
    // order_I = [{key:direction},...] e.g. [{'analysis_id':'asc'}]
    //      where direction = 'asc' ascending
    //                      = 'desc' descending

    var nestdatafiltered =this.nestdatafiltered;

    function sortproperty_asc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (a[prop] - b[prop]);
            } else {
                return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
            }
        };
    };
    function sortproperty_desc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (b[prop] - a[prop]);
            } else {
                return ((b[prop] < a[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0));
            }
        };
    };
    order_I.forEach(function(d){
        for (var key in d){
            if (d[key]==='asc'){
                nestdatafiltered.sort(sortproperty_asc(key));
            } else if (d[key]==='desc'){
                nestdatafiltered.sort(sortproperty_desc(key));         
            };
        };
    });
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
d3_svg.prototype.set_radius = function (radius_I){
    // set the radius property
    if (typeof(radius_I)!=="undefined"){
        this.radius = Math.min(width_I, height_I) / 2;
    } else {
        this.radius = Math.min(this.width, this.height) / 2;
    };
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
    var name = 'figure'

    // alert if blob isn't going to work
    _check_filesaver();

//     // convert node to xml string
     var xml = (new XMLSerializer()).serializeToString(d3.select(svg_sel).node()); //div element interferes with reading the svg file in illustrator/pdf/inkscape
     if (do_beautify_I){xml = vkbeautify.xml(xml);};
     xml = '<?xml version="1.0" encoding="utf-8"?>\n \
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n \
     "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + xml;

    // save
//     a.download = name + '.svg'; // file name
//     a.setAttribute("href-lang", "image/svg+xml");
//     a.href = 'data:image/svg+xml;base64,' + utf8_to_b64(xml); // create data uri
//     // <a> constructed, simulate mouse click on it
//     ev = document.createEvent("MouseEvents");
//     ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//     a.dispatchEvent(ev);

    var blob = new Blob([xml], {type: "image/svg+xml"});
    saveAs(blob, name + '.svg');

    // definitions
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    };
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
d3_svg.prototype.add_resizebuttons2footer = function(){
    // add svg resize
    // expand tile col width 1 increment

    var tileid = this.tileid;

    var this_ = this;

    function expandsvghorizontal(){
        this_.expand_svghorizontal();
    };
    function shrinksvghorizontal(){ 
        this_.shrink_svghorizontal();
    };
    function expandsvgvertical(){
        this_.expand_svgvertical();
    };
    function shrinksvgvertical(){ 
        this_.shrink_svgvertical();
    };

    var svgresizemenubutton = d3.select('#'+this.tileid+"panel-footer").append("div");


    var svgshrinkbuttonhorizontal = svgresizemenubutton.append("div")
        .attr("class","glyphicon  glyphicon-resize-small pull-right")
        .attr("id", tileid + 'shrinksvghorizontal')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","shrink svg width");
    svgshrinkbuttonhorizontal.on("click",shrinksvghorizontal);
    var svgexpandbuttonhorizontal = svgresizemenubutton.append("div")
        .attr("class","glyphicon glyphicon-resize-horizontal pull-right")
        .attr("id", tileid + 'expandsvghorizontal')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","expand svg width");
    svgexpandbuttonhorizontal.on("click",expandsvghorizontal);

    var svgshrinkbuttonvertical = svgresizemenubutton.append("div")
        .attr("class","glyphicon  glyphicon-resize-small pull-right")
        .attr("id", tileid + 'shrinksvgvertical')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","shrink svg height");
    svgshrinkbuttonvertical.on("click",shrinksvgvertical);
    var svgexpandbuttonvertical = svgresizemenubutton.append("div")
        .attr("class","glyphicon glyphicon-resize-vertical pull-right")
        .attr("id", tileid + 'expandsvgvertical')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","expand svg height");
    svgexpandbuttonvertical.on("click",expandsvgvertical);
};
d3_svg.prototype.expand_svghorizontal = function(){
    //expand svg horizontal
    var width = this.width;
    var height = this.height;
    var widthnew = width*1.5;
    this.set_width(widthnew);
    this.render();
};
d3_svg.prototype.shrink_svghorizontal = function(){ 
    //shrink svg horizontal
    var width = this.width;
    var height = this.height;
    var widthnew = width*2.0/3.0;
    this.set_width(widthnew);
    this.render();
};
d3_svg.prototype.expand_svgvertical = function(){
    //expand svg vertical
    var width = this.width;
    var height = this.height;
    var heightnew = height*1.5;
    this.set_height(heightnew);
    this.render();
};
d3_svg.prototype.shrink_svgvertical = function(){ 
    //shrink svg vertical
    var width = this.width;
    var height = this.height;
    var heightnew = height*2.0/3.0;
    this.set_height(heightnew);
    this.render();
};
d3_svg.prototype.add_navtabs2tile = function(navtabs_I){
    //add navigation tabs to tile body
    //INPUT
    //navtabs_I = [{"litext":"svg","href":,"data-target":},
    //             {"litext":"options","href":,"data-target":}
    // ];
    //
    //
    //

    var tileid = this.tileid;

    if (typeof(navtabs_I)!=="undefined"){
        var navtabs = navtabs_I;
    } else {
        var navtabs = [];
    };
    
    //extract out the navigation tabs
    var navtabstext = [];
    navtabs.forEach(function(d){
        navtabstext.push(d["litext"]);
    });

    this.svgnavtabs = d3.select('#' + tileid+"panel-body")
        .append("ul")
        .attr("id",tileid+"svgnavigationtabs")
        .attr("class","nav nav-tabs")
        .selectAll("li")
        .data(navtabs);

    //add the li elements
    this.svgnavtabs.exit().remove();
    this.svgnavtabsenter = this.svgnavtabs.enter();
    this.svgnavtabsenter.append("li")
        .append("a")
        .attr("href",function(d){
            return d["href"];
        })
        .attr("data-target",function(d){
            return d["data-target"];
        })
        .attr("data-toggle","tab")
        .text(function(d){
            return d["litext"];
        });

    this.svgnavtabs.transition()
        .attr("href",function(d){
            return d["href"];
        })
        .attr("data-target",function(d){
            return d["data-target"];
        })
        .attr("data-toggle","tab")
        .text(function(d){
            return d["litext"];
        });
};
//TODO: re-implement using tabs
d3_svg.prototype.add_svgmenubutton2tile = function (){
    //add a menu button to the footer of the chart
    var tileid = this.tileid;
    var this_ = this;

    var svgmenubutton = d3.select('#'+this.tileid+"panel-footer").append("div");

    function showsvgmenu(){
        console.log("showsvgmenu triggered");
        $("#"+tileid + "modal").modal('show');
        //$("#"+tileid + "modal").modal('hide');
    };

    svgmenubutton
        .attr("class","pull-right")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","svg options menu")
        .attr("id", tileid + 'svgmenubutton')
        //a version (works, but limited in programmability)
//         .append("a")
//         .attr("href","#"+tileid + "modal")
//         .attr("data-toggle","modal")
        //button version (does no twork)
//         .append("button")
//         .attr("class","btn btn-default")
//         .attr("data-toggle","modal")
//         .attr("data-target",tileid + "modal")
    var svgmenubuttontrigger = svgmenubutton
        .append("span")
        .attr("class","glyphicon  glyphicon glyphicon-menu-hamburger")
        .attr("aria-hidden","true")
        //prefered version
        .attr("data-toggle","modal")
        .attr("data-target",tileid + "modal")
        ;

    //add the modal menu object
    var modaltargetid = "#" + tileid + 'svgmenubutton';
    //var modaltargetid = "body";
    var menumodal = new d3_html_modal();
    menumodal.set_tileid(tileid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('SVG Options');
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var tileid = this.tileid;

        var modalbodyformusername = this.modalbodyform
            .append("div")
            .attr("class","form-group")
            .attr("id",tileid+"modalbodyformusername")
            .append("label")
            .attr("for",tileid+"modalbodyformusernameinput")
            .text("Username")
            .append("input")
            .attr("type","text")
            .attr("class", "form-control")
            .attr("id",tileid+"modalbodyformusernameinput")
            .attr("placeholder","Username");
    };

    svgmenubuttontrigger.on("click",showsvgmenu);

};
d3_svg.prototype.make_colorscale = function(color_start_I,color_end_I,length_I){
    //make a custom color scale
    //INPUT:
    //color_start_I = rgb start e.g. "#007AFF"
    //color_end_I = rgb end e.g. '#FFF500'
    //length_I = # of colors in the scale
    //OUTPUT:
    //color_scale_O = linear d3 color scale

    var color_scale_O = d3.scale.linear().domain([1,length_I])
              .interpolate(d3.interpolateHcl)
              .range([d3.rgb(color_start_I), d3.rgb(color_end_I)]);
    return color_scale_O;
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
        this_.data1.filter_listdata();
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
        this_.data2.filter_listdata();
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
        this_.data2.filter_listdata();
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
        this_.data1.filter_listdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_svg_data.prototype.set_colorscale = function (colorscale_I,colorcategory_I,colordomain_I,colordatalabel_I,customcolorrange_I) {
    // set color scale
    // INPUT:
    //  colorscale_I = ordinal (default), quantile
    //  colordomain_I = [] e.g., [0,1],[0,1000],[-1000,1000],[-10,0,10],[0.0,0.5,1.0]
    //                           'min,0,max'
    //  colorcategory_I = category10, category20, category20a, category20b, category20c
    //                    brewer, heatmap21, heatmap10, blue2gold64RBG, blue2gold64HSV
    //  colordatalabel_I = data key of the data column to base the color range on
    //  customcolorrange_I = [] e.g., ["#aad", "#556"] 
    // NOTES:
    //  custom colors generated from http://www.perbang.dk/rgbgradient/
    // TODO:
    //  refactor into subfunctions

    // custom colorscale
    var heatmap21 = ["#081d58", "#162876", "#253494", "#23499E", "#2253A3", "#225ea8", "#1F77B4", "#1d91c0", "#2FA3C2", "#38ACC3", "#41b6c4", "#60C1BF", "#7fcdbb", "#91D4B9", "#A3DBB7", "#c7e9b4", "#DAF0B2", "#E3F4B1", "#edf8b1", "#F6FBC5", "#ffffd9"];
    var heatmap10 = ["#081d58", "#253494", "#2253A3", "#1F77B4", "#2FA3C2", "#7fcdbb", "#A3DBB7", "#DAF0B2", "#edf8b1", "#ffffd9"]; //specific to resequencing data (domain 0.0-1.0)
    //var blue2gold64 = ['#0026BF','#0328BB','#072AB8','#0A2CB5','#0E2FB2','#1231AF','#1533AC','#1936A9','#1D38A6','#203AA3','#243CA0','#273F9D','#2B419A','#2F4397','#324694','#364891','#3A4A8E','#3D4C8B','#414F88','#455185','#485382','#4C567F','#4F587C','#535A79','#575C76','#5A5F73','#5E6170','#62636D','#65666A','#696867','#6D6A64','#706C61','#746F5D','#77715A','#7B7357','#7F7654','#827851','#867A4E','#8A7C4B','#8D7F48','#918145','#958342','#98863F','#9C883C','#9F8A39','#A38C36','#A78F33','#AA9130','#AE932D','#B2962A','#B59827','#B99A24','#BD9C21','#C09F1E','#C4A11B','#C7A318','#CBA615','#CFA812','#D2AA0F','#D6AC0C','#DAAF09','#DDB106','#E1B303','#E5B600'];
    var blue2red64 = ['#0026BF','#0325BC','#0724B9','#0A24B6','#0E23B3','#1222B0','#1522AD','#1921AA','#1D21A7','#2020A4','#241FA1','#271F9E','#2B1E9B','#2F1E98','#321D95','#361C92','#3A1C8F','#3D1B8C','#411B89','#451A86','#481983','#4C1980','#4F187D','#53187A','#571777','#5A1674','#5E1671','#62156E','#65156B','#691468','#6D1365','#701362','#74125F','#77125C','#7B1159','#7F1056','#821053','#860F50','#8A0F4D','#8D0E4A','#910D47','#950D44','#980C41','#9C0C3E','#9F0B3B','#A30A38','#A70A35','#AA0932','#AE092F','#B2082C','#B50729','#B90726','#BD0623','#C00620','#C4051D','#C7041A','#CB0417','#CF0314','#D20311','#D6020E','#DA010B','#DD0108','#E10005','#E50003'];
    //var blue2gold21 = ['#0026BF','#0B2DB5','#1634AB','#223BA2','#2D4298','#394A8F','#445185','#50587C','#5B5F72','#676669','#726E5F','#7D7555','#897C4C','#948342','#A08A39','#AB922F','#B79926','#C2A01C','#CEA713','#D9AE09','#E5B600'];
    var blue2gold64RBG = ['#1D2B63','#202E63','#243164','#273465','#2B3766','#2E3A67','#323D68','#364069','#39436A','#3D466B','#40496C','#444C6D','#474F6E','#4B526F','#4F5570','#525871','#565B72','#595E73','#5D6174','#606475','#646776','#686B77','#6B6E78','#6F7179','#72747A','#76777B','#797A7C','#7D7D7D','#81807E','#84837F','#888680','#8B8981','#8F8C81','#928F82','#969283','#9A9584','#9D9885','#A19B86','#A49E87','#A8A188','#ABA489','#AFA78A','#B3AB8B','#B6AE8C','#BAB18D','#BDB48E','#C1B78F','#C4BA90','#C8BD91','#CCC092','#CFC393','#D3C694','#D6C995','#DACC96','#DDCF97','#E1D298','#E5D599','#E8D89A','#ECDB9B','#EFDE9C','#F3E19D','#F6E49E','#FAE79F','#FEEBA0'];
    var blue2gold64HSV = ['#1D2A63','#1E2965','#1F2767','#20256A','#22226C','#26236F','#2B2471','#302674','#362776','#3B2979','#412A7B','#462C7E','#4C2D80','#522F82','#583185','#5E3287','#64348A','#6A368C','#71378F','#773991','#7E3B94','#843D96','#8B3E99','#91409B','#98429E','#9F44A0','#A2469F','#A5489D','#A74A9B','#AA4C99','#AC4E97','#AF5095','#B15292','#B45490','#B6568E','#B9588C','#BB5B8A','#BE5D87','#C05F85','#C26183','#C56480','#C7667E','#CA687C','#CC6B7A','#CF6D77','#D16F75','#D47273','#D67874','#D97F77','#DB8679','#DE8D7C','#E0957E','#E29C81','#E5A384','#E7AA86','#EAB189','#ECB98C','#EFC08F','#F1C791','#F4CE94','#F6D597','#F9DC9A','#FBE39D','#FEEAA0'];
    //var blue2gold64RBG = ['#0E1B4E','#111E4F','#152150','#192451','#1D2853','#212B54','#242E55','#283257','#2C3558','#303859','#343C5B','#373F5C','#3B425D','#3F455E','#434960','#474C61','#4A4F62','#4E5364','#525665','#565966','#5A5D68','#5E6069','#61636A','#65666B','#696A6D','#6D6D6E','#71706F','#747471','#787772','#7C7A73','#807E75','#848176','#878477','#8B8778','#8F8B7A','#938E7B','#97917C','#9A957E','#9E987F','#A29B80','#A69F82','#AAA283','#AEA584','#B1A885','#B5AC87','#B9AF88','#BDB289','#C1B68B','#C4B98C','#C8BC8D','#CCC08F','#D0C390','#D4C691','#D7C992','#DBCD94','#DFD095','#E3D396','#E7D798','#EADA99','#EEDD9A','#F2E19C','#F6E49D','#FAE79E','#FEEBA0'];
    //var blue2gold64HSV = ['#0E1B4E','#0F1950','#101753','#111556','#121359','#16135B','#1B155E','#201661','#251764','#2A1967','#301A69','#351C6C','#3B1D6F','#411F72','#472075','#4E2277','#54247A','#5A257D','#612780','#682983','#6F2B85','#762D88','#7D2E8B','#84308E','#8B3291','#923493','#963793','#993991','#9C3B8F','#9F3D8D','#A13F8B','#A44289','#A74487','#AA4685','#AC4983','#AF4B81','#B24E7F','#B5507C','#B8537A','#BA5578','#BD5876','#C05A74','#C35D72','#C66070','#C8636E','#CB666C','#CE686A','#D16F6B','#D4776E','#D67F71','#D98674','#DC8E77','#DF967B','#E29E7E','#E4A681','#E7AD84','#EAB587','#EDBD8B','#F0C58E','#F2CC92','#F5D495','#F8DC98','#FBE39C','#FEEAA0'];
    var blue2red64RBG = ['#1D2B63','#202A61','#23295F','#26285E','#29285C','#2C275B','#302659','#332658','#362556','#392455','#3C2453','#3F2352','#432250','#46224F','#49214D','#4C204C','#4F204A','#521F49','#561E47','#591E46','#5C1D44','#5F1C43','#621B41','#661B3F','#691A3E','#6C193C','#6F193B','#721839','#751738','#791736','#7C1635','#7F1533','#821532','#851430','#88132F','#8C132D','#8F122C','#92112A','#951129','#981027','#9B0F26','#9F0F24','#A20E23','#A50D21','#A80C1F','#AB0C1E','#AF0B1C','#B20A1B','#B50A19','#B80918','#BB0816','#BE0815','#C20713','#C50612','#C80610','#CB050F','#CE040D','#D1040C','#D5030A','#D80209','#DB0207','#DE0106','#E10004','#E50003'];
    var blue2red64HSV = ['#1D2A63','#1D2965','#1D2667','#1D2469','#1D226B','#1D1F6D','#1E1D6F','#211D71','#241D73','#271D75','#2A1D77','#2E1D79','#311D7B','#351D7D','#391D7F','#3D1D81','#411C84','#451C86','#4A1C88','#4E1C8A','#531C8C','#581B8E','#5D1B90','#621B92','#671A94','#6D1A96','#731A98','#78199A','#7E199C','#84199E','#8B18A0','#9118A2','#9817A5','#9F17A7','#A616A9','#AB16A8','#AD15A5','#AF15A2','#B1149E','#B3149A','#B51396','#B71292','#B9128E','#BB1189','#BD1085','#BF1080','#C10F7B','#C30E75','#C60D70','#C80D6A','#CA0C64','#CC0B5E','#CE0A57','#D00951','#D2084A','#D40743','#D6063C','#D80634','#DA052C','#DC0425','#DE031C','#E00214','#E2010B','#E50002'];
//     var HSV_all_127 = ['#E51200','#E41C00','#E32700','#E33200','#E23C00','#E14700','#E15200','#E05C00','#E06700','#DF7100','#DE7B00','#DE8500','#DD9000','#DD9A00','#DCA400','#DBAE00','#DBB800','#DAC200','#DACC00','#D9D500','#D2D800','#C7D800','#BCD700','#B1D700','#A7D600','#9CD500','#91D500','#87D400','#7CD400','#72D300','#67D200','#5DD200','#53D100','#49D100','#3FD000','#34CF00','#2ACF00','#20CE00','#17CE00','#0DCD00','#03CC00','#00CC06','#00CB0F','#00CB19','#00CA23','#00C92C','#00C936','#00C83F','#00C848','#00C752','#00C65B','#00C664','#00C56D','#00C576','#00C47F','#00C388','#00C391','#00C29A','#00C2A3','#00C1AB','#00C0B4','#00C0BC','#00B9BF','#00B0BF',
//         '#00A7BF','#009EC0','#0096C0','#008DC1','#0084C2','#007BC2','#0072C3','#0069C3','#0060C4','#0057C5','#004EC5','#0045C6','#003CC6','#0032C7','#0029C8','#0020C8','#0016C9','#000CC9','#0003CA','#0600CB','#0F00CB','#1900CC','#2300CC','#2D00CD','#3700CE','#4100CE','#4B00CF','#5500CF','#5F00D0','#6A00D1','#7400D1','#7E00D2','#8900D2','#9300D3','#9E00D4','#A800D4','#B300D5','#BD00D5','#C800D6','#D300D7','#D700D1','#D800C7','#D800BD','#D900B3','#DA00A9','#DA009F','#DB0095','#DB008B','#DC0081','#DD0077','#DD006D','#DE0063','#DE0058','#DF004E','#E00043','#E00039','#E1002E','#E10024','#E20019','#E3000E','#E30003','#E40700','#E51100'];
//     var HSV_all_127 = ['#E51200','#E23C00','#E06700','#DD9000','#DBB800','#D2D800','#A7D600','#7CD400','#53D100','#2ACF00','#03CC00','#00CA23','#00C848','#00C56D','#00C391','#00C0B4','#E51100','#E20019','#E00043','#DD006D','#DB0095','#D800BD','#C800D6','#9E00D4','#7400D1','#4B00CF','#2300CC','#0003CA','#0029C8','#004EC5','#0072C3','#0096C0','#E41C00','#E14700','#DF7100','#DD9A00','#DAC200','#C7D800','#9CD500','#72D300','#49D100','#20CE00','#00CC06','#00C92C','#00C752','#00C576','#00C29A','#00C0BC','#E40700','#E10024','#DF004E','#DD0077','#DA009F','#D800C7','#BD00D5','#9300D3','#6A00D1','#4100CE','#1900CC','#000CC9','#0032C7','#0057C5','#007BC2','#009EC0','#E32700','#E15200','#DE7B00','#DCA400','#DACC00','#BCD700','#91D500','#67D200','#3FD000','#17CE00','#00CB0F','#00C936','#00C65B','#00C47F','#00C2A3','#00B9BF','#E30003','#E1002E','#DE0058','#DC0081','#DA00A9','#D700D1','#B300D5','#8900D2','#5F00D0','#3700CE','#0F00CB','#0016C9','#003CC6','#0060C4','#0084C2','#00A7BF','#E33200','#E05C00','#DE8500','#DBAE00','#D9D500','#B1D700','#87D400','#5DD200','#34CF00','#0DCD00','#00CB19','#00C83F','#00C664','#00C388','#00C1AB','#00B0BF','#E3000E','#E00039','#DE0063','#DB008B','#D900B3','#D300D7','#A800D4','#7E00D2','#5500CF','#2D00CD','#0600CB','#0020C8','#0045C6','#0069C3','#008DC1'];
    var HSV_all_127 = ['#E51200','#E23C00','#E06700','#DD9000','#DBB800','#D2D800','#A7D600','#7CD400','#53D100','#2ACF00','#03CC00','#00CA23','#00C848','#00C56D','#00C391','#00C0B4','#00A7BF','#0084C2','#0060C4','#003CC6','#0016C9','#0F00CB','#3700CE','#5F00D0','#8900D2','#B300D5','#D700D1','#DA00A9','#DC0081','#DE0058','#E1002E','#E30003','#E41C00','#E14700','#DF7100','#DD9A00','#DAC200','#C7D800','#9CD500','#72D300','#49D100','#20CE00','#00CC06','#00C92C','#00C752','#00C576','#00C29A','#00C0BC','#009EC0','#007BC2','#0057C5','#0032C7','#000CC9','#1900CC','#4100CE','#6A00D1','#9300D3','#BD00D5','#D800C7','#DA009F','#DD0077','#DF004E','#E10024','#E40700','#E32700','#E15200','#DE7B00','#DCA400','#DACC00','#BCD700','#91D500','#67D200','#3FD000','#17CE00','#00CB0F','#00C936','#00C65B','#00C47F','#00C2A3','#00B9BF','#0096C0','#0072C3','#004EC5','#0029C8','#0003CA','#2300CC','#4B00CF','#7400D1','#9E00D4','#C800D6','#D800BD','#DB0095','#DD006D','#E00043','#E20019','#E51100','#E33200','#E05C00','#DE8500','#DBAE00','#D9D500','#B1D700','#87D400','#5DD200','#34CF00','#0DCD00','#00CB19','#00C83F','#00C664','#00C388','#00C1AB','#00B0BF','#008DC1','#0069C3','#0045C6','#0020C8','#0600CB','#2D00CD','#5500CF','#7E00D2','#A800D4','#D300D7','#D900B3','#DB008B','#DE0063','#E00039','#E3000E'];
    
    var listdatafiltered = this.data1.listdatafiltered;
    if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='colorbrewer'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(colorbrewer.RdYlBu[10]);
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
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='blue2gold64RBG'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64RBG);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='blue2gold64HSV'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64HSV);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='blue2red64'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2red64);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='colorbrewer'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(colorbrewer.RdYlBu[10]);
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
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='blue2gold64RBG'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64RBG);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='blue2gold64HSV'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64HSV);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='blue2red64'){
            this.colorscale = d3.scale.quantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2red64);
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
    }else if (colorcategory_I==='HSV_all_127'){
        this.colorscale = d3.scale.ordinal().range(HSV_all_127);
    }else if (typeof(customcolorrange_I)!=="undefined"){
        this.colorscale = d3.scale.linear().range(customcolorrange_I);
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
    if (this.data1){this.data1.filter_listdata();};
    if (this.data2){this.data2.filter_listdata();}; 
};
d3_svg_data.prototype.set_data1keymap = function (data1keymap_I) {
    //set the data1 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data1keymap = data1keymap_I;
};
d3_svg_data.prototype.set_data2keymap = function (data2keymap_I) {
    //set the data2 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data2keymap = data2keymap_I;
};
d3_svg_data.prototype.set_stackdata1 = function (offset_I) {
//     set stack properties
//     offset_I = string,
//         silhouette - center the stream, as in ThemeRiver.
//         wiggle - minimize weighted change in slope.
//         expand - normalize layers to fill the range [0,1].
//         zero - use a zero baseline, i.e., the y-axis
    if (typeof(offset_I)!=='undefined'){
        var offset = offset_I;
    } else {
        var offset = "zero";
    }

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    this.stackdata1 = d3.layout.stack()
        .offset(offset_I)
        .values(function(d) {
            return d.values; 
            })
        .x(function(d){
            return d[x_data];
            })
        .y(function(d){
            return d[y_data];
            })
        .out(function(d,y0,y){
            d.y0 = y0;
            d.y = y;
        })
        ;
//         .values(function(d) {
//             var valuesmapped = d.values.map(function(xy){
//                 return {x:xy[x_data],y:xy[y_data]}
//                 }); 
//             return valuesmapped;
//             });
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
//inherit from d3_html? reasoning: inherit buttons (e.g. glyphicon sort)
//var d3_table = function (){
function d3_table(){
    this.id = '';
    this.tileid = '';
    this.tableclass = '';
    this.table = null;
    this.data = null;  
    this.tableheaders = [];
    this.datakeymap = null;
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
        _this.data.filter_listdata();
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
    //TODO: update using common json download method...

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
    //TODO: update using common csv download method...

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
        this_.data.filter_listdata();
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
        this_.data.filter_listdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_table.prototype.add_tablesort = function(sort_settings_I){
    // sort the data
    // DESCRIPTION:
    // single click: sort in ascending order
    // double click: sort in descenting order
    var id = this.id;
    var this_ = this;

//     this.tableheader
//         .on('click', function (d, i) {
//             var order = [];
//             var key_dir = {};
//             key_dir[d]='asc';
//             order.push(key_dir);
//             this_.data.order_listdatafiltered(order);
//             this_.render();
//         });

    this.tableheader
        .on('click', function (d, i) {
            var order = [];
            var key_dir = {};
            switch (d3.event.which) {
                case 1:
                    //alert('Left Mouse button pressed.');
                    key_dir[d]='asc';
                    order.push(key_dir);
                case 2:
                    //alert('Middle Mouse button pressed.');
                    key_dir[d]='asc';
                    order.push(key_dir);
                case 3:
                    //alert('Right Mouse button pressed.');
                    key_dir[d]='desc';
                    order.push(key_dir);
                default:
                    //alert('You have a strange Mouse!');
                    key_dir[d]='asc';
                    order.push(key_dir);
            };
            this_.data.order_listdatafiltered(order);
            this_.data.order_nestdatafiltered(order);
            this_.render();
        });


};
d3_table.prototype.set_datakeymaps = function(keymaps_I){
    //add datakeymaps
    if (!keymaps_I){
       console.warn("no data");
    } else if (keymaps_I.length===1){
        this.datakeymap = keymaps_I[0];
    } else {console.warn("more data found than what is currently supported");
    };
};
//implement sortable and editable cross table using d3 and bootstrap
d3_table.prototype.set_crosstable = function(){
    // add the table body
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;
    var x_data = this.datakeymap.xdata
    var y_data = this.datakeymap.ydata
    var z_data = this.datakeymap.zdata
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;
};
d3_table.prototype.extract_crosstableheaders = function(){
    // extract out headers from listdatafiltered
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;

    this.tableheaders = this.data.get_uniquevaluesFromlistdatafiltered(columnslabel);
    this.tableheaders.sort();
    this.tableheaders.splice(0, 0, rowslabel);
};
d3_table.prototype.set_crosstablebody = function(){
    // set the table body
    var id = this.id;
    var nestdatafiltered = this.data.nestdatafiltered;

    this.tbodyelement = this.table.selectAll("tbody")
        .data([nestdatafiltered]);

    this.tbodyenter = this.tbodyelement.enter()
        .append("tbody")
        .attr("id",id+"tablebody");

    this.tbody = this.table.select("tbody");
    //this.tbody = this.tbodyelement.select("tbody");

    this.tbodyelement.exit().remove();

};
d3_table.prototype.add_crosstablebody = function(){
    // add the table body
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var datanestdatafiltered = this.data.nestdatafiltered;
    var tableheaders = this.tableheaders;
    var tablerowslabels = this.tablerowslabels
    var x_data = this.datakeymap.xdata
    var y_data = this.datakeymap.ydata
    var z_data = this.datakeymap.zdata
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;
        
    //table body

    this.tablerows = this.tbody.selectAll("tr")
        .data(datanestdatafiltered);

    this.tablerows.exit().remove();

    this.tablerowsenter = this.tablerows.enter()
        .append("tr");

    //this.tablecells = this.tablerowsenter.selectAll("td")
    this.tablecells = this.tablerows.selectAll("td")
        .data(function(row) {
            return tableheaders.map(function(column) {
                var value = null;
                if (column===rowslabel){
                    value = row.key;
                } else {
                    for (var i=0;i<row.values.length;i++){
                        if (row.values[i].key===column){
                            //only the first value if multiple values are present
                            //will be displayed
                            value = row.values[i].values[0][z_data];
                            break;
                        };
                    };
                };
                //console.log(value);
                return {column: column, value: value};
            });
        });

    this.tablecells.exit().remove();

    this.tablecellsenter = this.tablecells.enter();
    this.tablecellsenter.append("td")
        .html(function(d) {
            return d.value;
            });

    this.tablecells.html(function(d) { return d.value; });

};
d3_table.prototype.add_crosstablecsvandjsonexportbutton2tile = function () {
    // add button to export the table element
    var this_ = this;

    function exporttableelementjson(){
        this_.export_crosstableelementjson(); //necessary to pass svg as "this"
    };

    function exporttableelementcsv(){
        this_.export_crosstableelementcsv(); //necessary to pass svg as "this"
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
d3_table.prototype.export_crosstableelementjson = function () {
    // export the table element as json

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
d3_table.prototype.export_crosstableelementcsv = function () {
    // export the table element as csv

    var a = document.createElement('a');
    a.download ="table" + '.csv'; // file name
    //generate the csv string
    var c = "";
    var tableheaderstableelements = this.partition_nestdatafiltered2tableheaderandelements();
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
d3_table.prototype.partition_nestdatafiltered2tableheaderandelements = function(){
    // partition list data to an array of headers and an array of values
    var id = this.id;
    var tileid = this.tileid;
    var datanestdatafiltered = this.data.nestdatafiltered;
    var tableheaders = this.tableheaders;
    var x_data = this.datakeymap.xdata
    var y_data = this.datakeymap.ydata
    var z_data = this.datakeymap.zdata
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;

    var tableelements = [];
    for (var j=0;j<datanestdatafiltered.length;j++){ //rowslabels
        tableelements.push([]);
        tableheaders.forEach(function(column) {
            var value = null;
            if (column===rowslabel){
                value = datanestdatafiltered[j].key;
            } else {
                for (var i=0;i<datanestdatafiltered[j].values.length;i++){
                    if (datanestdatafiltered[j].values[i].key===column){
                        value = datanestdatafiltered[j].values[i].values[0][z_data];
                        break;
                    };
                };
            };
            //console.log(value);
            tableelements[j].push(value);
        });
    };
    return {tableheaders:tableheaders,tableelements:tableelements};
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
    this.htmlfooter = null;
    this.htmlheader = null;
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
d3_html.prototype.add_progressbar = function(){
    // add progress bar
    //E.g.,
//     <div class="progress">
//       <div class="progress-bar" role="progressbar" aria-valuenow="70"
//       aria-valuemin="0" aria-valuemax="100" style="width:70%">
//         70%
//       </div>
//     </div>
}
d3_html.prototype.add_checkbox = function () {
    // add checkbox for input
};
d3_html.prototype.add_radio = function () {
    // add radio button for input
};
d3_html.prototype.add_inputgroup = function(){
    // add input group to node
};
d3_html.prototype.add_input = function (inputarguments_I) {
    // add input to node

    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    var div = node.append("div");
    var label = node.append("label");
    var input = node.append("input");

    //div properties
    if ('divid' in input) button.attr('id',input.divid);
    if ('divclass' in input) button.attr('class', input.divclass);
    if ('divtooltip' in input) {
        button.attr("data-toggle","tooltip")
        button.attr('title', input.divtooltip);
    };

    //label properties
    if ('labeltext' in input) label.text(input.labeltext);
    if ('labelid' in input) button.attr('id',input.labelid);
    if ('labelclass' in input) button.attr('class', input.labelclass);

    //input properties
    if ('inputtype' in input) button.attr('type',inputinputtype);
    if ('inputid' in input) button.attr('id',input.inputid);
    if ('inputclass' in input) button.attr('class', input.inputclass);
};
d3_html.prototype.set_buttonproperties = function (button,button_span,input){
    // set the button properties

    //button properties
    if ('buttonid' in input) button.attr('id',input.buttonid);
    if ('buttonstyle' in input) button.style(input.buttonstyle);
    if ('buttonclass' in input) button.attr('class', input.buttonclass);
    if ('buttonon' in input) {
        for (var i; i<input.buttonon.length; i++){
            this.set_onmethod(button, input.buttonon[i]);
        };
    };
    if ('buttontooltip' in input) {
        button.attr("data-toggle","tooltip")
        button.attr('title', input.buttontooltip);
    };

    //button_span properties
    if ('spanid' in input) button_span.attr('id',input.spanid);
    if ('spanstyle' in input) button_span.style(input.spanstyle);
    if ('spanclass' in input) button_span.attr('class', input.spanclass);
    if ('spantext' in input) button_span.text(input.spantext);
    if ('spanicon' in input) button_span.classed(input.spanicon, true);
    if ('spanaria-hidden' in input) button_span.attr('aria-hidden', input['spanaria-hidden']);
    if ('spandata-toggle' in input) button_span.attr('data-toggle', input['spandata-toggle']);
    if ('spandata-target' in input) button_span.attr('data-target', input['spandata-target']);
    if ('spannon' in input) {
        for (var i; i<input.spannon.length; i++){
            this.set_onmethod(button_span, input.spannon[i]);
        };
    };
};
d3_html.prototype.add_button = function (inputarguments_I) {
    // add button
    // INPUT:
    // node = node to add the button to
    // node_id = node id to add the button to
    // inputarguments = {} of button properties including the following:
    //      id = 
    //      class
    //      text
    //      icon
    //      on_method
    //      style = {} of styles

    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    var button = node.append('button');
    var button_span = button.append('span');

    this.set_buttonproperties(button,button_span,input);

};
d3_html.prototype.add_glyphiconbutton = function (inputarguments_I) {
    // add button
    // INPUT:
    // node = node to add the button to
    // node_id = node id to add the button to
    // inputarguments = {} of button properties including the following:
    //      id
    //      class
    //      text
    //      icon
    //      on
    //
    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    var button = node.append('div');
    var button_span = button.append('span');

    this.set_buttonproperties(button,button_span,input);
};
d3_html.prototype.set_onmethod = function (node_I, on_method_I) {
    // set on method for a node
    // INPUT:
    // node_I = button node
    // on_method_I = {} with properties
    //        method = name of the on method (e.g. click)
    //        function = on_method function
    //        target ?

    node_I.on(on_method_I.method, function() {
        on_method_I.function.call(on_method_I.target);
    });
};
d3_html.prototype.add_dropdown = function () {
    // add dropdown attribute
};
d3_html.prototype.add_color = function () {
    // add color pallet for input
};
d3_html.prototype.add_range = function () {
    // add range slider for input
};
d3_html.prototype.add_text = function () {
    // add text area
};
d3_html.prototype.add_search = function(){
    // add search feature
    // use selectisize.js
    //"https://github.com/brianreavis/selectize.js"
    // or datalist
    //E.g.,
//     <form action="demo_form.asp" method="get">
//       <input list="browsers" name="browser">
//       <datalist id="browsers">
//         <option value="Internet Explorer">
//         <option value="Firefox">
//         <option value="Chrome">
//         <option value="Opera">
//         <option value="Safari">
//       </datalist>
//       <input type="submit">
//     </form>
}
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
d3_html.prototype.add_htmlfooter2tile = function () {
    // add footer row to tile
    var tileid = this.tileid;

    // necessary to encapsolate import/export functions
    this.htmlfooter = d3.select('#'+this.tileid+"panel-footer")
        .append("div")
        .attr("class","row")
        .attr("id",tileid + 'footer')
        .append("div")
        .attr("class","col-lg-12");
};
d3_html.prototype.add_htmlheader2tile = function () {
    // add header row to tile
    var tileid = this.tileid;

    // necessary to encapsolate import/export functions
    this.htmlfooter = d3.select('#'+this.tileid+"panel-header")
        .append("div")
        .attr("class","row")
        .attr("id",tileid + 'header')
        .append("div")
        .attr("class","col-lg-12");
};
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
d3_html.prototype.add_jsonimportandexportbutton2tile = function (htmlfooter_I) {
    // add import and export buttons to tileid
    var tileid = this.tileid;

    // necessary to encapsolate import/export functions
    if (typeof(htmlfooter_I)!=="undefined"){
        this.htmlfooter = htmlfooter_I;
    } else if (this.htmlfooter===null){
        this.add_htmlfooter2tile();
    };
    
    this.add_jsonexportbutton2tile();
    this.add_jsonimportbutton2tile();
};
//TODO: convert import closure to seperate function
d3_html.prototype.import_filtermenujson = function(){
    // import the filter from json
    // TODO...
    var filtermenu = null;
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
                    this_.data.filter_listdata();
                    this_.render();
                };
            })(file1);

            reader.readAsText(file1);
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
d3_html.prototype.add_inputbuttongroup = function(button_text_I){
    /*add input button group
    INPUT:
    button_text_I = button text
    */
    var id = this.id;
    var listdatafiltered = [0];

    if(typeof(button_text_I)!=="undefined"){
        var button_text = button_text_I;
    } else {
        var button_text = "Browse...";
    };

    function updateData(e,d){
        //update the input with the name of the text file
        var input = d3.select("#" + id + 'inputgroupinput');
        input.val(d);  
        //replace the data object
        this.data=d;
    };

    function readFile(){
        var file1 = this.files[0];

        if (!file1) {
            alert("Failed to load file");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            load_json_or_csv(f, csv_converter, updateData);
        };
    };

    this.htmlinputgroup = this.html.selectAll(".input-group")
        .data(listdatafiltered);

    this.htmlinputgroup.exit().remove;
    this.htmlinputgroupenter = this.htmlinputgroup.enter()
        .append("div")
        .attr("class","input-group")
        .attr("id",id + 'input-group');

    this.htmpinputbuttongroup = this.htmlinputgroup.selectAll(".input-group-btn")
        .data(function(d){
            return listdatafiltered;
        });

    this.htmpinputbuttongroup.exit().remove;
    this.htmpinputbuttongroupenter = this.htmlinputbuttongroup.enter()
        .append("span")
        .attr("class","input-group-btn")
        .append("span")
        .attr("class","btn btn-primary btn-file")
        .text(button_text)
        .append("input")
        .attr("id",id + 'inputbuttongroupinput')
        .attr("type","file")
        .on("change",readFile);

    this.htmpinputgroupinput = this.htmlinputgroup.selectAll(".form-control")
        .data(function(d){
            return listdatafiltered;
        });

    this.htmpinputgroupinput.exit().remove;
    this.htmpinputgroupinputenter = this.htmlinputgroupinput.enter()
        .append("input")
        .attr("class","form-control")
        .attr("id",id + 'inputgroupinput')
        .attr("type","text");
};
d3_html.prototype.add_draganddrop = function (node_I,node_id_I,
                 drop_function_I,dragover_function_I,
                 dragenter_function_I,
                 dragleave_function_I) {
    // add drag and drop area
    var id = this.id;
    var listdatafiltered = [0]

    function cancel(e) {
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    }

    var this_ = this;

    function allowDrop() {
        if (d3.event){
            d3.event.preventDefault();
        };
    };
    function drop() {
        this_.trigger_drop();
    };
    function dragEnter() {
        if (d3.event){
            var tiletargetid = d3.event.target.id;
            if (tiletargetid.indexOf('col')===0 || tiletargetid.indexOf('row')===0){
                d3.event.target.style.background="grey";
            };
        };
    };

    this.htmldraganddrop = this.html.selectAll("draganddrop")
        .data([listdatafiltered]);

    this.htmldraganddropender = this.htmldraganddrop.enter()
        .append("div")
        .attr("id", id + 'draganddrop')
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragenter",dragEnter);

    this.draganddrop.exit().remove();
};  
d3_html.prototype.set_formsubmitbuttonidtext = function(button_idtext_I) {
    // set submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){this.button_idtext = {'id':'submit1','text':'submit'};}
    else{this.button_idtext = button_idtext_I;}
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
    } else if (scale_I === 'radial') {
        if (invert_I){
            this.y1scale = d3.scale.linear().range([0,2*Math.PI]); //starts at the top left
        } else {
            this.y1scale = d3.scale.linear().range([2*Math.PI, 0]); //starts at the bottom left
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
d3_chart2d.prototype.set_y1domainstacked = function () {
    // set y1-domain of the plot
    var y_data = this.data1keymap.ydata;
    var stackdata1 = this.stackdata1;
    var nestdatafiltered = this.data1.nestdatafiltered
    var _this = this;
    var data1 = [];
    var stackeddata1max = d3.max(stackdata1(nestdatafiltered), function(nest) {
        var nestvalues = []; 
        nest.values.forEach(function(d) {
            nestvalues.push(d.y0 + d.y);
            });
        var nestmax = d3.max(nestvalues);
        return nestmax;
        });
    var stackeddata1min = d3.min(stackdata1(nestdatafiltered), function(nest) {
        var nestvalues = []; 
        nest.values.forEach(function(d) {
            nestvalues.push(d.y0);
            });
        var nestmin = d3.min(nestvalues);
        return nestmin;
        });
    data1.push(stackeddata1max);
    data1.push(stackeddata1min);
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
    var tileid = this.tileid;
    this.x1axis.append("text")
        .attr("class", "label")
        .attr("x", this.width / 2)
        .attr("y", 28)
        .style("text-anchor", "middle")
        .text(x1axislabel_I)
        .attr("id",tileid+"x1axislabel");
};
d3_chart2d.prototype.add_x2axislabel = function (x2axislabel_I) {
    //set x2axis label properties
    var tileid = this.tileid;
    this.x1axis.append("text")
        .attr("class", "label")
        .attr("x", this.width / 2)
        .attr("y", -28)
        .style("text-anchor", "middle")
        .text(x2axislabel_I)
        .attr("id",tileid+"x2axislabel");
};
d3_chart2d.prototype.add_y1axislabel = function (y1axislabel_I) {
    //set y1axis label properties
    var tileid = this.tileid;
    this.y1axis.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -28)
        .attr("x", -this.height / 2)
        .style("text-anchor", "middle")
        .text(y1axislabel_I)
        .attr("id",tileid+"y1axislabel");
};
d3_chart2d.prototype.add_y2axislabel = function (y2axislabel_I) {
    //set y2axis label properties
    var tileid = this.tileid;
    this.y2axis.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 28)
        .attr("x", -this.height / 2)
        .style("text-anchor", "middle")
        .text(y2axislabel_I)
        .attr("id",tileid+"y2axislabel");
};
d3_chart2d.prototype.update_x1axislabel = function (x1axislabel_I) {
    //add x1axis label properties
    var tileid = this.tileid;
    var x1axislabel = d3.select("#"+tileid + "x1axislabel");
    x1axislabel.text(x1axislabel_I);
};
d3_chart2d.prototype.update_x2axislabel = function (x2axislabel_I) {
    //add x2axis label properties
    var tileid = this.tileid;
    var x2axislabel = d3.select("#"+tileid + "x2axislabel");
    x2axislabel.text(x2axislabel_I);
};
d3_chart2d.prototype.update_y1axislabel = function (y1axislabel_I) {
    //add y1axis label properties
    var tileid = this.tileid;
    var y1axislabel = d3.select("#"+tileid + "y1axislabel");
    y1axislabel.text(y1axislabel_I);
};
d3_chart2d.prototype.update_y2axislabel = function (y2axislabel_I) {
    //add y2axis label properties
    var tileid = this.tileid;
    var y2axislabel = d3.select("#"+tileid + "y2axislabel");
    y2axislabel.text(y2axislabel_I);
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
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
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
d3_chart2d.prototype.set_x1axistickstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
    var style = {
        'font-size': '12px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     ]
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
d3_chart2d.prototype.set_x1axislabelstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'Arial'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     ]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1andy1axeslabelstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var y1axisselector = '#' + this.id + 'y1axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'Arial'
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
        'font-family': 'Arial'
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
//     boxes: the main body of the boxplot showing the quartiles and the medians confidence intervals if enabled.
//     medians: horizonal lines at the median of each box.
//     whiskers: the vertical lines extending to the most extreme, n-outlier data points.
//     caps: the horizontal lines at the ends of the whiskers.
//     fliers: points representing data that extend beyond the whiskers (outliers).
//     means: points or lines representing the means.

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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

    var y_data_mean = this.data1keymap.ydatamean;
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
d3_chart2d.prototype.add_boxandwhiskersdata1_points = function () {
    //points properties
    var y_data = this.data1keymap.ydata;
    var x_data = this.data1keymap.xdata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var radius = 5.0;
        
    //points: circles showing the individual data points of the box and whiskers plot
    this.boxandwhiskerspointsdata1 = this.boxandwhiskerslabel.selectAll(".points")
        .data(function (d) { return d.values; });

    this.boxandwhiskerspointsdata1.exit().remove();

    this.boxandwhiskerspointsdata1.transition()
        .attr("r", radius)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("stroke", "black")
        .style("fill", "none");
      
    this.boxandwhiskerspointsdata1enter = this.boxandwhiskerspointsdata1.enter()
        .append("circle")
        .attr("class", "points");

    this.boxandwhiskerspointsdata1enter
        .attr("r", radius)
        .attr("id", function (d, i) {
            return id + "point" + i.toString(); })
        .attr("cx", function (d) {
            return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) {
            return y1scale(d[y_data]); })
        .style("stroke", "black")
        //.style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_boxandwhiskersdata2 = function () {
    //add box and whiskers to the plot
//     boxes: the main body of the boxplot showing the quartiles and the medians confidence intervals if enabled.
//     medians: horizonal lines at the median of each box.
//     whiskers: the vertical lines extending to the most extreme, n-outlier data points.
//     caps: the horizontal lines at the ends of the whiskers.
//     fliers: points representing data that extend beyond the whiskers (outliers).
//     means: points or lines representing the means.

    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var nestdatafiltered = this.data2.nestdatafiltered;

    //TODO: ensure nest keys of data1/2 are in the same order!

    //assign the positioning of the feature labels
    this.boxandwhiskersdata2label = this.svgg.selectAll(".labels")
        .data(nestdatafiltered);

//     this.boxandwhiskersdata2label.transition()
//         .attr("class", "labels")
//         .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });

//     this.boxandwhiskersdata2label.exit().remove();

//     this.boxandwhiskersdata2labelenter = this.boxandwhiskersdata2label.enter().append("g")
//         .attr("class", "labels")
//         .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });
};
d3_chart2d.prototype.add_boxandwhiskersdata2_points = function (radius_I) {
    //points properties
    var y_data = this.data2keymap.ydata;
    var x_data = this.data2keymap.xdata;
    var series_label = this.data2keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    if (typeof(radius_I)!=="undefined"){
        var radius = radius_I;
    } else {
        var radius = 5.0;
    };    
        
    //points: circles showing the individual data points of the box and whiskers plot
    this.boxandwhiskerspointsdata2 = this.boxandwhiskersdata2label.selectAll(".points")
    //this.boxandwhiskerspointsdata2 = this.boxandwhiskerslabel.selectAll(".points")
        .data(function (d) { return d.values; });

    this.boxandwhiskerspointsdata2.exit().remove();

    this.boxandwhiskerspointsdata2.transition()
        .attr("r", radius)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("stroke", "black")
        .style("fill", "none");
      
    this.boxandwhiskerspointsdata2enter = this.boxandwhiskerspointsdata2.enter()
        .append("circle")
        .attr("class", "points")

    this.boxandwhiskerspointsdata2enter
        .attr("r", radius)
        .attr("id", function (d, i) {
            return id + "point" + i.toString(); })
        .attr("cx", function (d) {
            return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) {
            return y1scale(d[y_data]); })
        .style("stroke", "black")
        //.style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_boxandwhiskerspointsdata2tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the point
    //add a change in color upon moving the mouse over the point
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data2keymap.serieslabel;
    var feature_label = this.data2keymap.featureslabel;
    
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var id = this.id;

    // set the tooltip
    this.boxandwhiskerspointsdata2tooltip = d3.tip().attr('class', 'd3-tip')
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
    this.svgg.call(this.boxandwhiskerspointsdata2tooltip);
    var tip = this.boxandwhiskerspointsdata2tooltip;

    //show tooltip
    this.boxandwhiskerspointsdata2enter
        .on("mouseover", function (d) {
            //Change fill color
            d3.select(this).style('fill', 'black');
            //Show the tooltip
            tip.show(d);
            })  
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "none");
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
    
    //heatmap specific properties
    this.cellsize = cellsize_I;
    this.legendelementwidth = cellsize_I*1.0;

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
        .style("fill", function(d) {
            return colorscale(d[zdata]); });

    this.heatmap.exit().remove();
    
    this.heatmapenter = this.heatmap
        .enter()
        .append("rect")
        .attr("x", function(d) { return d[columnsleaves] * cellsize; })
        .attr("y", function(d) { return d[rowsleaves] * cellsize; })
        .attr("class", function(d){return "cell cell-border cr"+(d[rowsindex])+" cc"+(d[columnsindex]);})
        .attr("width", cellsize)
        .attr("height", cellsize)
        .style("fill", function(d) {
            return colorscale(d[zdata]); });
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
        })
        .on("mouseout", function(d){
               d3.select(this).classed("cell-hover",false);
               d3.selectAll(".rowLabel").classed("text-highlight",false);
               d3.selectAll(".colLabel").classed("text-highlight", false);
               tip.hide(d);
        });

};
d3_chart2d.prototype.add_heatmapdata1legend = function(orientation_I){
    // add lengend to the heatmap
    // INPUT:
    // orientation_I = 'bottom left','top right'

    if (typeof orientation_I !== 'undefined'){
        var orientation = orientation_I;
    } else{ 
        var orientation = 'bottom left';
    };

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
        if ( (Math.floor10(maxvalue,3) - Math.ceil10(minvalue,3)) > 1000 ){
            var datarange = d3.range(Math.floor10(minvalue,3),Math.ceil10(maxvalue,3),1000);
            var round_exp = 3;
            var nsteps = 1000.;
        } else if ( (Math.floor10(maxvalue,2) - Math.ceil10(minvalue,2)) > 100 ){
            var datarange = d3.range(Math.floor10(minvalue,2),Math.ceil10(maxvalue,2),100);
            var round_exp = 2;
            var nsteps = 100.;
        } else if ( (Math.floor10(maxvalue,1) - Math.ceil10(minvalue,1)) > 10 ){
            var datarange = d3.range(Math.floor10(minvalue,1),Math.ceil10(maxvalue,1),10);
            var round_exp = 1;
            var nsteps = 10.;
        } else if ( (Math.floor10(maxvalue,0) - Math.ceil10(minvalue,0)) > 1 ){
            var datarange = d3.range(Math.floor10(minvalue,0),Math.ceil10(maxvalue,1),1);
            var round_exp = 0;
            var nsteps = 1.;
        } else if ( (Math.floor10(maxvalue,-1) - Math.ceil10(minvalue,-1)) > .1 ){
            var datarange = d3.range(Math.floor10(minvalue,-1),Math.ceil10(maxvalue,-1),.1);
            var round_exp = -1;
            var nsteps = .1;
        } else if ( (Math.floor10(maxvalue,-2) - Math.ceil10(minvalue,-2)) > .01 ){
            var datarange = d3.range(Math.floor10(minvalue,-2),Math.ceil10(maxvalue,-2),.01);
            var round_exp = -2;
            var nsteps = .01;
        } else if ( (Math.floor10(maxvalue,-3) - Math.ceil10(minvalue,-3)) > .001 ){
            var datarange = d3.range(Math.floor10(minvalue,-3),Math.ceil10(maxvalue,-3),.001);
            var round_exp = -3;
            var nsteps = .001;
        } else {
            var datarange = d3.range(Math.floor10(minvalue),Math.ceil10(maxvalue));
        }

        this.legenddata1 = this.svgg.selectAll(".legend")
          .data(datarange); //use for expression data (domain -10.0-10.0)
        this.legenddata1enter = this.legenddata1
          .enter().append("g")
          .attr("class", "legend");
        var colorfactor = Math.ceil10(1/datarange.length,-2);
      };
    
    this.legenddata1.exit().remove();

    // legend on the bottom
    if (orientation==='bottom left'){
        this.legenddata1.select("rect").transition()
            .attr("x", function (d, i) { return legendelementwidth * i; })
            .attr("y", height + (cellsize * 2))
            .attr("width", legendelementwidth)
            .attr("height", cellsize)
            .style("fill", function (d, i) { 
                return colorscale(i * colorfactor); });

        this.legenddata1enter.append("rect")
            .attr("x", function (d, i) { return legendelementwidth * i; })
            .attr("y", height + (cellsize * 2))
            .attr("width", legendelementwidth)
            .attr("height", cellsize)
            .style("fill", function (d, i) { 
                return colorscale(i * colorfactor); });

        this.legenddata1.select("text").transition()
            .attr("class", "mono")
            .text(function (d) { 
                    return d; })
            .attr("width", legendelementwidth)
            .attr("x", function (d, i) {return legendelementwidth * i; })
            .attr("y", height + (cellsize * 4));

        this.legenddata1enter.append("text")
            .attr("class", "mono")
            .text(function (d) { 
                return d; })
            .attr("width", legendelementwidth)
            .attr("x", function (d, i) { 
                return legendelementwidth * i; })
            .attr("y", height + (cellsize * 4));
    } else if (orientation==='top right'){
    //legend on the side
        this.legenddata1.select("rect").transition()
            .attr("x", width + (cellsize * 2))
            .attr("y", function (d, i) { return legendelementwidth * i; })
            .attr("width", cellsize)
            .attr("height", legendelementwidth)
            .style("fill", function (d, i) { 
                return colorscale(i * colorfactor); });

        this.legenddata1enter.append("rect")
            .attr("x", width + (cellsize * 2))
            .attr("y", function (d, i) { return legendelementwidth * i; })
            .attr("width", cellsize)
            .attr("height", legendelementwidth)
            .style("fill", function (d, i) { 
                return colorscale(i * colorfactor); });

        this.legenddata1.select("text").transition()
            .attr("class", "mono")
            .text(function (d) { 
                    return d; })
            .attr("height", legendelementwidth)
            .attr("x", width + (cellsize * 3))
            .attr("y", function (d, i) { 
                return legendelementwidth * i + legendelementwidth; });

        this.legenddata1enter.append("text")
            .attr("class", "mono")
            .text(function (d) { 
                return d; })
            .attr("height", legendelementwidth)
            .attr("x", width + (cellsize * 3))
            .attr("y", function (d, i) {
                return legendelementwidth * i + legendelementwidth; });
        };

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
        'font-family': 'Arial',
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

    if (typeof(this.data1keymap.tooltipdata)!=="undefined"){
        var x_data = this.data1keymap.tooltipdata;
    } else {
        var x_data = this.data1keymap.xdata;
    };

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
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
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
        _this.data2.filter_listdata();
        if (_this.filterdata1and2){
            _this.data1.filters[series_label] = filters;
            _this.data1.filter_listdata();
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
            })  
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
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
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
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
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[feature_label] = filters;
            _this.data2.filter_listdata();
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
        'font-family': 'Arial'
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
        'font-family': 'Arial',
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
        .attr("x", function (d) {
            return x2scale(d[series_label]); })
        .attr("y", function (d) {
            return y1scale(Math.max(d[y_data], 0)); })
        .attr("height", function (d) {
            return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .style("fill", function (d) {
            return colorscale(d[series_label]); });

};
d3_chart2d.prototype.add_verticalbarsdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the bar
    //add a change in color upon moving the mouse over the bar
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var metid = this.data1keymap.featureslabel;

    if (typeof(this.data1keymap.tooltipdata)!=="undefined"){
        var tooltipdata = this.data1keymap.tooltipdata;
    } else {
        var tooltipdata = this.data1keymap.ydata;
    };

    if (typeof(this.data1keymap.tooltiplabel)!=="undefined"){
        var tooltiplabel = this.data1keymap.tooltiplabel;
    } else {
        var tooltiplabel = this.data1keymap.serieslabel;
    };
    
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                return (d[tooltiplabel] + ': ' + "value: " + d[tooltipdata].toFixed(2));
            }
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                return (d[tooltiplabel] + ': ' + "value: " + d[tooltipdata].toFixed(2));
            }
            else{
                return (d[tooltiplabel] + ': ' + "value: " + d[tooltipdata].toFixed(2) + ', ' + "95% ci: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
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
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
        });
};
d3_chart2d.prototype.add_verticalbarsdata1errorbars = function () {
    //add vertical error bars to the chart

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
// TODO: transition from pie to pie
// http://jsfiddle.net/amitaviv99/x6RWs/42/
d3_chart2d.prototype.set_arc = function(outerradius_I,innerradius_I){
    //set the pie arc outer and inner radii
    //INPUT:
    //outerradius_I = float, outer radius
    //innerradius_I = float, inner radius (set to >0 to make a donut chart)
    //TODO:
    //scale radius?

    var y1scale = this.y1scale;

    var top = this.margin.top;
    if (typeof(outerradius_I)!=="undefined"){
        var outerradius = outerradius_I;
    } else {
        var outerradius = this.radius-top;
    };
    if (typeof(innterradius_I)!=="undefined"){
        var innerradius = innerradius_I;
    } else {
        var innerradius = outerradius/4.0;
    };

    this.arc = d3.svg.arc()
        .outerRadius(outerradius)
        .innerRadius(innerradius);
//         .startAngle(function(d){return y1scale(d[0]);})
//         .endAngle(function(d){return y1scale(d[1]);}); 
};
d3_chart2d.prototype.set_arclabel = function(outerradiuslabel_I,innerradiuslabel_I){
    //set the pie arc outer and inner label radii
    //INPUT:
    //outerradiuslabel_I = float, outer radius
    //innerradiuslabel_I = float, inner radius
    if (typeof(outerradiuslabel_I)!=="undefined"){
        var outerradiuslabel = outerradiuslabel_I;
    } else {
        var outerradiuslabel = this.radius-40.0;
    };
    if (typeof(innterradiuslabel_I)!=="undefined"){
        var innerradiuslabel = innerradiuslabel_I;
    } else {
        var innerradiuslabel = this.radius-40.0;
    };
    this.arclabel = d3.svg.arc()
        .outerRadius(outerradiuslabel)
        .innerRadius(innerradiuslabel);
};
d3_chart2d.prototype.set_piedata1 = function (sort_I){
    //set the pie svg element function
    //INPUT:
    //sort_I = true, to sort descending values
    //         null, to not sort
    if (typeof(sort_I)!=="undefined"){
        var sort = sort_I;
    } else {
        var sort = null;
    };
    var y_data = this.data1keymap.ydata;
    this.pie = d3.layout.pie()
        .sort(sort)
        //.sort(function(a, b) { return b[y_data] - a[y_data]; })
        .value(function(d){return +d[y_data];});
};
d3_chart2d.prototype.set_x1x2domain_verticalpieschart = function () {
    // set x1-domain and x1-domain for a piechart
    var series_label = this.data1keymap.serieslabel;
    var nestdatafiltered = this.data1.nestdatafiltered;
    var listdatafiltered = this.data1.listdatafiltered;
    this.x1scale.domain(nestdatafiltered.map(function (d) { return d.key; }));
    var x1scale = this.x1scale;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);
    this.x2scale.domain(series_labels_unique).rangeRoundBands([0,x1scale.rangeBand()]);
};
d3_chart2d.prototype.add_verticalpiesdata1 = function () {
    //add pies to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var pie = this.pie;
    var arc = this.arc;
    var arclabel = this.arclabel;
    var id = this.id;
    var radius = this.radius;
    var top = this.margin.top;

    this.pielabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered)

    this.pielabel.exit().remove();

    this.pielabel.transition()
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + "," + (radius+top)+")"; 
            });

    this.pielabelenter = this.pielabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + "," + (radius+top)+")"; 
            });

    this.piesarc = this.pielabel.selectAll(".pies")
        .data(function (d) { 
            return pie(d.values); }
            );

    this.piesarc.exit().remove();

    this.piesarc.transition()
//         .attr("x", function (d) { 
//             return x2scale(d[series_label]); 
//             })
//         .attr("y", function (d) { return y1scale(Math.max(d[y_data], 0)); })
//         .attr("width", x2scale.rangeBand())
//         .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .attr("d",arc)
        .style("fill", function (d) { return colorscale(d.data[series_label]); });
      
    this.piesarcenter = this.piesarc.enter()
        .append("path")
        .attr("class", "pies");

    this.piesarcenter
        .attr("x", function (d) {
            return x2scale(d.data[series_label]); 
            })
//         .attr("y", function (d) { return y1scale(Math.max(d.data[y_data], 0)); })
//         .attr("width", x2scale.rangeBand())
//         .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .attr("d",arc)
        .style("fill", function (d) { return colorscale(d.data[series_label]); });

};
d3_chart2d.prototype.add_verticalpiesdata1labels = function () {
    //add pies to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var arc = this.arc;
    var arclabel = this.arclabel;
    var id = this.id;

    // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    };

    this.piesarclabel = this.piesarc.enter()
        .append("text")
        .attr("transform", function(d) { return "translate(" + arclabel.centroid(d) + ")rotate(" + angle(d) + ")"; })
        .text(function(d){return d.data[series_label]});

};
d3_chart2d.prototype.add_verticalpiesdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the pie
    //add a change in color upon moving the mouse over the pie
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var metid = this.data1keymap.featureslabel;
    var y_data = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var id = this.id;

    if (typeof(this.data1keymap.tooltipdata)!=="undefined"){
        var y_data = this.data1keymap.tooltipdata;
    } else {
        var y_data = this.data1keymap.ydata;
    };

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                return (d.data[series_label] + ': ' + "value: " + d.data[y_data].toFixed(2));
            }
            else{
                return (d.data[series_label] + ': ' + "value: " + d.data[y_data].toFixed(2) + ', ' + "95% ci: " + d.data[y_data_lb].toFixed(2) + "/" + d.data[y_data_ub].toFixed(2));
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

    this.piesarcenter.on("mouseover", function (d) {
            //change color of the pie
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d.data[series_label]));
            tip.hide(d);
        });
};
d3_chart2d.prototype.set_x1axisstyle_verticalpieschart = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var x1axisstyle = {
        'fill': 'none', 'display':'none'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     ]
    this.set_svggcss(selectorstyle);
};
// Area and stacked area chart
// http://bl.ocks.org/mbostock/3885211
// Stacked density and quantile graphs
// http://bl.ocks.org/NPashaP/113f7fea0751fa1513e1
// Streamgraph
// http://bl.ocks.org/mbostock/4060954
// https://github.com/mbostock/d3/wiki/Stack-Layout
d3_chart2d.prototype.set_stackedareadata1 = function () {
    // set area properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var stackdata1 = this.stackdata1;
    var nestdatafiltered = this.data1.nestdatafiltered

    this.stackedareadata1generator = d3.svg.area()
      .x(function(d) {
        //return x1scale(d.x); })
        return x1scale(d[x_data]); })
      .y0(function(d) {
        return y1scale(d.y0); })
      .y1(function(d) {
        //return y1scale(d.y0 + d.y); });
        return y1scale(d.y0 + d[y_data]); });

};
d3_chart2d.prototype.set_areadata1 = function () {
    // set area properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    //get the minimum y values
    var frequency = this.data1.get_uniquevaluesFromlistdatafiltered(y_data);
    var y0 = Math.min.apply(Math, frequency);

    this.areadata1generator = d3.svg.area()
      .x(function(d) {
        return x1scale(d[x_data]); })
      .y0(function(d) {
        return y1scale(y0); })
      .y1(function(d) {
        return y1scale(y0 + d[y_data]); });

};
d3_chart2d.prototype.add_stackedareadata1 = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var stackedareadata1generator = this.stackedareadata1generator;
    var stackdata1 = this.stackdata1;
    var nestdatafiltered = this.data1.nestdatafiltered

    this.areadata1 = this.svgg.selectAll(".area")
        .data(stackdata1(nestdatafiltered));

    this.areadata1enter = this.areadata1.enter()
        .append("g")
        .attr("class", "area");

    this.areadata1enter.append('path')
        .attr('class', id+'areaseries')
        .attr('id', function (d,i) {
            return id+'areaseries'+i.toString();})
        .attr("d", function(d) { 
          return stackedareadata1generator(d.values); 
          })
        .style("fill", function(d) {
          return colorscale(d.key);
          });

    this.areadata1.select("path."+id+'areaseries')
        .style("fill", function(d) { return colorscale(d.key); })
        .transition()
        .attr("d", function(d) { return stackedareadata1generator(d.values); });

    this.areadata1.exit()
      .remove();
};
d3_chart2d.prototype.add_areadata1 = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var areadata1generator = this.areadata1generator;
    var nestdatafiltered = this.data1.nestdatafiltered

    this.areadata1 = this.svgg.selectAll(".area")
        .data(nestdatafiltered);

    this.areadata1enter = this.areadata1.enter()
        .append("g")
        .attr("class", "area");

    this.areadata1enter.append('path')
        .attr('class', id+'areaseries')
        .attr('id', function (d,i) {
            return id+'areaseries'+i.toString();})
        .attr("d", function(d) { 
          return areadata1generator(d.values); 
          })
        .style("fill", function(d) {
          return colorscale(d.key);
          });

    this.areadata1.select("path."+id+'areaseries')
        .style("fill", function(d) { return colorscale(d.key); })
        .transition()
        .attr("d", function(d) { return areadata1generator(d.values); });

    this.areadata1.exit()
      .remove();
};
d3_chart2d.prototype.add_areadata1tooltipandstroke = function () {
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
           'area-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.areadata1enter.on('mouseover', function (d, i) {
        d3.select(this)
            .style("stroke", 'black');
        tip.show(d);
    })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
            tip.hide(d);
        });
};
d3_chart2d.prototype.add_areadata1filter = function () {
    //filter data on click

    var _this = this;
    var series_label = this.data1keymap.serieslabel;
    
    this.areadata1enter.on("click", function (d, i) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d.key) { filters.push(n); }; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_areadata1text = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //get the minimum y values
    var frequency = this.data1.get_uniquevaluesFromlistdatafiltered(y_data);
    var y0 = Math.min.apply(Math, frequency);

    this.areadata1enter.append('text')
        .attr("x", -6)
        .attr("dy", ".35em");

    this.areadata1.select("text")
        .datum(function (d) {
            return {key: d.key,values: d.values[d.values.length - 1]};
        })
        .attr("transform", function (d) {
            return "translate(" + x1scale(d.values[x_data]) + "," + y1scale(y0 + d.values[y_data] / 2) + ")";
        })
        .text(function (d) {return d.key;});

    this.areadata1.exit()
      .remove();
};
d3_chart2d.prototype.add_stackedareadata1text = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.areadata1enter.append('text')
        .attr("x", -6)
        .attr("dy", ".35em");

    this.areadata1.select("text")
        .datum(function (d) {
            return {key: d.key,values: d.values[d.values.length - 1]};
        })
        .attr("transform", function (d) {
            return "translate(" + x1scale(d.values[x_data]) + "," + y1scale(d.values.y0 + d.values[y_data] / 2) + ")";
        })
        .text(function (d) {return d.key;});

    this.areadata1.exit()
      .remove();
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
function d3_html_form() {
    // bootstrap html form element
    d3_html.call(this);
    // form specific properties
    this.formclass = null;
};
d3_html_form.prototype = Object.create(d3_html.prototype);
d3_html_form.prototype.constructor = d3_html_form;
d3_html_form.prototype.add_form2tile = function(){
    // set the form
    var id = this.id;
    var tileid = this.tileid;
    var formclass = this.formclass;
    var listdatafiltered = this.data.listdatafiltered;

    this.formelement = d3.select('#'+tileid+"panel-body").selectAll(".form-responsive")
        .data([listdatafiltered]);
        //.data([0]);

    this.formenter = this.form.enter()
        .append("div")
        .attr("class","form-responsive")
        .append("form")
        .attr("class",formclass)
        .attr("id",id+"form");

    this.form = this.formelement.select("form")
    this.form.exit().remove();

};
d3_html_form.prototype.set_formclass = function(formclass_I){
    // set the formid
    this.formclass = formclass_I;
};
d3_html_form.prototype.set_id = function(formid_I){
    // set the formid
    this.id = formid_I;
};
d3_html_form.prototype.set_tileid = function(formtileid_I){
    // set the form tileid
    this.tileid = formtileid_I;
};
d3_html_form.prototype.add_data = function(data_I){
    // add data to tile
    this.data = data_I[0];
};
d3_html_form.prototype.set_datakeymap = function(datakeymap_I){
    // set form data key map
    this.datakeymap = datakeymap_I[0];  
};
d3_html_form.prototype.add_ndata = function(data_I){
    // add data to tile
    this.data = data_I;
};
d3_html_form.prototype.set_ndatakeymap = function(datakeymap_I){
    // set form data key map
    this.datakeymap = datakeymap_I;  
};
d3_html_form.prototype.set_formstyle = function () {
    // predefined css style for form header rows
    var formselector = "#" + this.tileid + " .form-responsive";
    var formstyle = {
        //'form-layout': 'fixed',
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': formselector, 'style': formstyle }]
    this.set_d3css(selectorstyle);
};
d3_html_form.prototype.set_d3css = function (selectionstyle_I) {
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
d3_html_form.prototype.add_draganddropinput2form = function () {
    // add file drag and drop for input
};
d3_html_form.prototype.add_checkboxinput2form = function () {
    // add checkbox for input
};
d3_html_form.prototype.add_colorinput2form = function () {
    // add color pallet for input
};
d3_html_form.prototype.add_rangeinput2form = function () {
    // add range slider for input
};
d3_html_form.prototype.add_textinput2form = function () {
    // add range slider for input
};
d3_html_form.prototype.add_form = function(textarea_valuetext_I){
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
};
d3_html_form.prototype.add_input2form = function (textarea_valuetext_I) {
    // add text area for input
    // INPUT:
    //TODO: refactor into a general function to call individual
    //      input elements, e.g., text, ...
    //      http://www.w3schools.com/tags/att_input_type.asp
    if (typeof texarea_valuetext_I !== "undefined"){var textarea_valuetext = textarea_valuetext_I;}
    else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};

    var id = this.id;

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
d3_html_form.prototype.update_forminput = function(textarea_valuetext_I){
    // update the form
    // update the form
    if (typeof texarea_valuetext_I !== "undefined"){var textarea_valuetext = textarea_valuetext_I;}
    else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};
    var id = this.id;

    for (var i=0;i<textarea_valuetext.length;i++){
        var node = d3.select("#"+id + 'forminput'+ textarea_valuetext[i].text).node();
        if (node){node.value=textarea_valuetext[i].value;};
    };
};
d3_html_form.prototype.add_submitbutton2form = function (button_idtext_I) {
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
d3_html_form.prototype.render = function(){
    // make render function here...
};
d3_html_form.prototype.add_datalist = function (datalist_valuetext_I) {
    // add datalist (menu) for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];

    var tileid = this.tileid;  

    var datalist = this.form.append("select")
        .attr("id", tileid + 'datalist');

    for (var i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };  
};  
d3_html_form.prototype.set_formsubmitbuttonidtext = function(button_idtext_I) {
    // set submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){this.button_idtext = {'id':'submit1','text':'submit'};}
    else{this.button_idtext = button_idtext_I;}
};
function d3_html_modal() {
    // bootstrap modal element
    d3_html.call(this);
};
d3_html_modal.prototype = Object.create(d3_html.prototype);
d3_html_modal.prototype.constructor = d3_html_modal;
d3_html_modal.prototype.add_modaltriggerbutton = function (nodeid_I){
    // add modal trigger button to tileid
    //INPUT:
    //nodeid_I: = specific node id to attach the modal to

    var tileid = this.tileid;
    var this_ = this;

    if (typeof(nodeid_I)!=="undefined"){
        var tile = d3.select("#"+nodeid_I);
    } else if (this.htmlheader===null){
        var tile = this.tile;
    };
    
    this.htmlmodaltriggerbutton = tile.append("button")
        .attr("class","btn btn-primary")
        .attr("data-toggle","modal")
        .attr("data-target",tileid + "modal")
        .text("Show modal");
};
d3_html_modal.prototype.add_modal2tile = function (nodeid_I){
    //add a bootstrap modal element to the tileid
    //INPUT:
    //nodeid_I: = specific node id to attach the modal to

    var tileid = this.tileid;
    var this_ = this;

    if (typeof(nodeid_I)!=="undefined"){
        //var tile = d3.select("#"+nodeid_I);
        var tile = d3.select(nodeid_I);
    } else if (this.html===null){
        var tile = this.html;
    };
    this.htmlmodal = tile.append("div")
        .attr("class","modal fade")
        .attr("id",tileid + "modal")
        .attr("tabindex","-1")
        .attr("role","dialog")
        .attr("aria-labelledby",tileid + "modal")
        .attr("aria-hidden","true")
        //.style({"display": "block"})
        .append("div")
        .attr("class","modal-dialog")
        .append("div")
        .attr("class","modal-content");
};
d3_html_modal.prototype.add_header2modal = function (htmlmodal_I){
    // add header to bootstrap modal element
    // INPUT:
    // htmlmodal_I = htmlmodal node
    var tileid = this.tileid;

    if (typeof(htmlmodal_I)!=="undefined"){
        var htmlmodal = htmlmodal_I;
    } else if (this.htmlmodal!==null){
        var htmlmodal = this.htmlmodal;
    };

    this.htmlmodalheader = htmlmodal.append("div")
        .attr("class","modal-header")
        .attr("id",tileid + "modalheader");
};
d3_html_modal.prototype.add_title2modalheader = function(title_I){
    //add a title to the modal header
    var tileid = this.tileid;
    this.htmlmodalheader.append("h4")
        .attr("class","modal-title")
        .attr("id",tileid + "modalheadertitle")
        .text(title_I);
};
d3_html_modal.prototype.update_modalheadertitle = function(title_I){
    //update the title of the modal header
    var tileid = this.tileid;
    var htmlmodalheadertitle = d3.select("#"+tileid + "modalheadertitle");
    htmlmodalheadertitle.text(title_I);
};
d3_html_modal.prototype.add_closebutton2modalheader = function(){
    // add a close button to the modal header
    var tileid = this.tileid;
    var this_ = this;

    var modalheaderclosebutton = this.htmlmodalheader.append("button")
        .attr("type","button")
        .attr("class","close")
        .attr("id",tileid+"modalheaderclosebutton")
        .attr("data-dismiss","modal")
        //.attr("aria-hidden","true")
        .attr("aria-label","Close")
        .append("span")
        .attr("class","glyphicon glyphicon-trash");
};
d3_html_modal.prototype.add_body2modal = function (htmlmodal_I){
    // add body to bootstrap modal element
    // INPUT:
    // htmlmodal_I = htmlmodal node
    var tileid = this.tileid;

    if (typeof(htmlmodal_I)!=="undefined"){
        var htmlmodal = htmlmodal_I;
    } else if (this.htmlmodal!==null){
        var htmlmodal = this.htmlmodal;
    };

    this.htmlmodalbody = htmlmodal.append("div")
        .attr("class","modal-body")
        .attr("id",tileid + "modalbody");
};
d3_html_modal.prototype.add_form2modalbody = function (htmlmodal_I){
    // add form to modalbody
    var tileid = this.tileid;

    this.modalbodyform = this.htmlmodalbody.append("form")
        .attr("role","form")
        .attr("id",tileid + "modalbodyform");  
};
d3_html_modal.prototype.add_content2modalbodyform = function (){
    // add content to the modal body form
    var tileid = this.tileid;

    var content = this.modalbodyform
        .append("div")
        .attr("class","form-group");  
    // your code...
};
d3_html_modal.prototype.add_login2modalbodyform = function (login_I){
    // add content to the modal body form
    var tileid = this.tileid;

    var modalbodyformusername = this.modalbodyform
        .append("div")
        .attr("class","form-group")
        .attr("id",tileid+"modalbodyformusername")
        .append("label")
        .attr("for",tileid+"modalbodyformusernameinput")
        .text("Username")
        .append("input")
        .attr("type","text")
        .attr("class", "form-control")
        .attr("id",tileid+"modalbodyformusernameinput")
        .attr("placeholder","Username");

    var modalbodyformpassword = this.modalbodyform
        .append("div")
        .attr("class","form-group")
        .attr("id",tileid+"modalbodyformpassword")
        .append("label")
        .attr("for",tileid+"modalbodyformpasswordinput")
        .text("Password")
        .append("input")
        .attr("type","password")
        .attr("class", "form-control")
        .attr("id",tileid+"modalbodyformpasswordinput")
        .attr("placeholder","Password");

    var modalbodyformcheckbox = this.modalbodyform
        .append("div")
        .attr("class","checkbox")
        .attr("id",tileid+"modalbodyformcheckbox")
        .append("label")
        .append("input")
        .attr("type","checkbox")
        .text("Remember me")
        .attr("id",tileid+"modalbodyformcheckboxinput");

    var modalbodyformbutton = this.modalbodyform
        .append("button")
        .attr("class","btn btn-default")
        .attr("id",tileid+"modalbodyformbutton")
        .attr("type","submit")
        .text("Submit");
};
d3_html_modal.prototype.add_footer2modal = function (htmlmodal_I){
    // add footer to bootstrap modal element
    // INPUT:
    // htmlmodal_I = htmlmodal node
    var tileid = this.tileid;
    
    if (typeof(htmlmodal_I)!=="undefined"){
        var htmlmodal = htmlmodal_I;
    } else if (this.htmlmodal!==null){
        var htmlmodal = this.htmlmodal;
    };

    this.htmlmodalfooter = htmlmodal.append("div")
        .attr("class","modal-footer")
        .attr("id",tileid + "modalfooter");
};
d3_html_modal.prototype.add_savebutton2modalbodyfooter = function (){
    // add save button to the modal body footer
    var tileid = this.tileid;

    var modalfootersavebutton = this.htmlmodalfooter
        .append("button")
        .attr("class","btn btn-primary")
        .attr("id",tileid+"modalfootersavebutton")
        .attr("type","button")
        .text("Save changes");
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
ddt_table.prototype.set_datakeymaps = function(datakeymaps_I){
    // add data to ddtsvg
    this.ddttable.set_datakeymaps(datakeymaps_I);
};
//var ddt_table_responsivetable_01 = function () {
function ddt_table_responsivetable_01() {
// 	responsive HTML table
// 	DESCRIPTION
// 	data is formatted and presented in tabular form
// 	INPUT:
// 	data1
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"tabletype":'table_01',
// 		'tableid':'table1',
// 		"tablefilters":{'met_id':['glc-D','ac'],
// 		"tableheaders":['experiment_id','sample_name_abbreviation','met_id','rate_average','rate_var','rate_lb','rate_ub','rate_units','n','comment_','used_'],
// 		"tableclass":"table  table-condensed table-hover",
// 		Tile parameters
// 		'tileheader':'Uptake/secretion rates','tiletype':'table','tileid':"tile3",'rowid':"row1",'colid':"col1",
// 		'tileclass':"panel panel-default",'rowclass':"row",'colclass':"col-sm-12"
// 		};

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
    this.ddttable.render = function () {
    	// permanent filter on the data
    	if (parameters_I.tablefilters){
			this.data.change_filters(parameters_I.tablefilters);
			this.data.filter_listdata();
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
//var ddt_table_responsivecrosstable_01 = function () {
function ddt_table_responsivecrosstable_01() {
// 	responsive HTML cross table
// 	DESCRIPTION
// 	data is formatted and presented in tabular form
// 	INPUT:
// 	data1 = [{},...]
// 	data1_keys = [
// 		'analysis_id',
// 		'experiment_id',
// 		'sample_name_abbreviation',
// 		'sample_name_short',
// 		'component_group_name',
// 		'component_name',
// 		'time_point',
// 		'calculated_concentration_units'
// 	];
// 	data1_nestkeys = [
// 		'component_name', //row label
// 		'sample_name_short' //column label
// 	];
// 	data1_keymap = {
// 		'xdata':'sample_name_short',
// 		'ydata':'component_name',
// 		'zdata':'calculated_concentration',
// 		'rowslabel':'component_name',
// 		'columnslabel':'sample_name_short',
// 	};
// 	data_I = [
// 		{"data":data_points_1,"datakeys":data1_keys,"datanestkeys":data1_nestkeys}
// 	];
// 	parameters_I = {
// 		//Table parameters
// 		"tabletype":'responsivecrosstable_01',
// 		"tablekeymap":[data1_keymap],
// 		'tableid':'table1',
// 		"tablefilters":None,
// 		"tableclass":"table  table-condensed table-hover",
// 		//Tile parameters
// 		'tileheader':'Cross Table',
// 		'tiletype':'table',
// 		'tileid':"tile3",
// 		'rowid':"row2",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 	};

    ddt_table.call(this);
};
ddt_table_responsivecrosstable_01.prototype = Object.create(ddt_table.prototype);
ddt_table_responsivecrosstable_01.prototype.constructor = ddt_table_responsivecrosstable_01;
ddt_table_responsivecrosstable_01.prototype.make_table = function(data_I,parameters_I){
	//

	this.ddttable = new d3_table();
	
	// general table properties
	this.set_parameters(parameters_I);
	this.set_ddttable()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.tablekeymap);

	// table specific properties
    this.ddttable.set_tableclass("table table-hover");
    this.ddttable.add_crosstablecsvandjsonexportbutton2tile();
    this.ddttable.render = function () {
    	// permanent filter on the data
    	if (parameters_I.tablefilters){
			this.data.change_filters(parameters_I.tablefilters);
			this.data.filter_listdata();
    	};
		this.extract_crosstableheaders();
        this.add_table2tile();
        this.set_tableheader();
		this.set_crosstablebody();
		this.add_tableheader();
		this.add_crosstablebody();
		this.set_tablestyle();
		this.set_headerstyle();
		this.set_cellstyle();
		this.add_tablesort(parameters_I.tablesort);
    };
}
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
//var ddt_svg_scatterlineplot2d_01 = function () {
function ddt_svg_scatterlineplot2d_01() {
// 	Scatter plot and line plot
// 	DESCRIPTION:
// 	A scatter plot and line plot are rendered on the same figure
// 	INPUT:
// 	data 1 and 2 are plotted along the same axis
// 	data1 = points
// 	data2 = line
// 	data1_keymap = {
// 		'xdata':'time_point',
// 		'ydata':'mutation_frequency',
// 		'serieslabel':'mutation_id',
// 		'featureslabel':''
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'scatterlineplot2d_01',
// 		"svgkeymap":[data1_keymap,data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,
// 		"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency",
// 		Tile parameters
// 		'tileheader':'Population mutation frequency',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"
// 		};
		
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

    //Testing in progress...
//     var navtabs_I = [
//                  {"litext":"options","href":"#" + parameters_I.svgid + "options","data-target":"#" + parameters_I.svgid + "options"}, 
//                  {"litext":"svg","href":"#" + parameters_I.svgid,"data-target":"#" + parameters_I.svgid}
//                  ];
//     this.ddtsvg.add_navtabs2tile(navtabs_I);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_resizebuttons2footer();
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
    this.ddtsvg.add_resizebuttons2footer();
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
//var ddt_svg_volcanoplot2d_01 = function () {
function ddt_svg_volcanoplot2d_01() {
// 	Volcano plot
// 	DESCRIPTION:
// 	scatterplot2d with 1 data set and filled x1x2/y1y2 axis
// 	utilized for a volcano plot or pca loadings plot
// 	INPUT:
// 	Data1
// 	data1_keymap = {
// 		'ydata':'pvalue_corrected_negLog10',
// 		'xdata':'fold_change_log2',
// 		'serieslabel':'',
// 		'featureslabel':'component_group_name'
// 		};
// 	parameters_I = {
// 		SVG parameters
// 		"svgtype":'volcanoplot2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 50, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,
// 		"svgheight":350,
// 		"svgx1axislabel":'Fold Change [log2(FC)]',
// 		"svgy1axislabel":'Probability [-log10(P)]',
// 		Tile parameters
// 		'tileheader':'Volcano plot',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"
// 		};
		
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
    this.ddtsvg.add_resizebuttons2footer();
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
// TODO: implement dendrogram (https://github.com/rstudio/d3heatmap/tree/master/inst/htmlwidgets/lib/d3heatmapcore)
function ddt_svg_heatmap_01() {
// 	Heatmap
// 	DESCRIPTION:
// 	Heatmap with column/row ordering
// 	INPUT:
// 	data1_keymap = {
// 		'xdata':'row_leaves',
// 		'ydata':'col_leaves',
// 		'zdata':'value',
// 		'rowslabel':'row_label',
// 		'columnslabel':'col_label',
// 		'rowsindex':'row_index',
// 		'columnsindex':'col_index',
// 		'rowsleaves':'row_leaves',
// 		'columnsleaves':'col_leaves'
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'heatmap2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		'svgcellsize':18,
// 		'svgmargin':{ 'top': 200, 'right': 150, 'bottom': 50, 'left': 10 },
// 		'svgcolorscale':'quantile',
// 		'svgcolorcategory':'heatmap10',
// 		'svgcolordomain':[0,1], (frequency) or "min,0,max" (log normalized)
// 		'svgcolordatalabel':'value',
// 		'svgdatalisttileid':'tile1' //tileid of the row/column sorting menu
// 		Tile parameters
// 		'tileheader':'heatmap',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row2",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 		};
		
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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    //this.ddtsvg.set_zoom();
    //this.ddtsvg.data1.filter_listdata();
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
        this.add_heatmapdata1legend(parameters_I.svglegendorientation);
        //this.add_heatmapdata1drowpdownmenu("tile1");
        this.add_heatmapdata1datalist(parameters_I.svgdatalisttileid);
        this.add_heatmapdata1tooltipandfill();
        this.set_heatmapdata1css();
    };
};
function ddt_svg_pcaplot2d_scores_01() {
// 	pcaplot2d_scores
// 	DESCRIPTION:
// 	PCA scores plot (compare to boxAndWhiskers)
// 	INPUT:
// 	data1
// 	data1_keymap = {
// 		'xdata':'score_'+str(PC[0]),
// 		'ydata':'score_'+str(PC[1]),
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'sample_name_short'
// 		};
// 	parameters_I = {
// 		SVG parameters
// 		"svgtype":'pcaplot2d_scores_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":400,
// 		"svgheight":350,
// 		"svgx1axislabel":data1_O[0]['axislabel'+str(PC[0])],
// 		"svgy1axislabel":data1_O[0]['axislabel'+str(PC[1])],
// 		Tile parameters
// 		'tileheader':'Scores','tiletype':'svg',
// 		'tileid':"scorestile"+str(PC_cnt),
// 		'rowid':"row1",
// 		'colid':"col"+str(PC_cnt+1),
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};

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
    this.ddtsvg.add_resizebuttons2footer();
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
//var ddt_svg_verticalbarschart2d_01 = function () {
function ddt_svg_verticalbarschart2d_01() {
// 	Vertical bars chart
// 	DESCRIPTION:
// 	Vertical bars with error bars
// 	INPUT:
// 	data1
// 	data1_keymap = {
// 		'xdata':'met_id',
// 		'ydata':'rate_average',
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'met_id',
// 		'ydatalb':'rate_lb',
// 		'ydataub':'rate_ub'
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'horizontalbarschart2d_01',"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,"svgheight":350,"svgy1axislabel":"rate (mmol*gDCW-1*hr-1)",
// 		"svgfilters":{'met_id':['glc-D','ac']}
// 		Tile parameters
// 		'tileheader':'Uptake/secretion rates',
// 		'tiletype':'svg',
// 		'tileid':"tile1",
// 		'rowid':"row1",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 		};

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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
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
//var ddt_svg_horizontalbarschart2d_01 = function () {
function ddt_svg_horizontalbarschart2d_01() {
// 	Horizontal bars chart
// 	DESCRIPTION:
// 	Horizontal bars with error bars
// 	INPUT:
// 	data1
// 	data1_keymap = {
// 		'xdata':'flux_distance',
// 		'ydata':'rxn_id',
// 		'serieslabel':'simulation_id_2',
// 		'featureslabel':'rxn_id'
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'horizontalbarschart2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 250, 'bottom': 50, 'left': 50 },
// 		"svgwidth":350,
// 		"svgheight":900,
// 		"svgx1axislabel":"flux_distance",
// 		"svgy1axislabel":"rxn_id",
// 		"svgfilters":{'met_id':['glc-D','ac']}
// 		Tile parameters
// 		'tileheader':'Flux distance',
// 		'tiletype':'svg','tileid':"tile1",
// 		'rowid':"row2",'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",'colclass':"col-sm-6"
// 		};

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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
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
//var ddt_svg_boxandwhiskersplot2d_01 = function () {
function ddt_svg_boxandwhiskersplot2d_01() {
// 	Custom box and whiskers plot
// 	DESCRIPTION:
//  Bullet plot describes the mean and confidence intervals of the data
//	Box and whiskers describe the median, interquartile, and ranges of the data
// 	INPUT:
// 	data1 = points
// 	data1_keymap = {'xdata':'component_group_name',
// 		TODO: 'ydata':'calculated_concentrations', //vector of datapoints
// 		'ydatamean':'mean',
// 		'ydatalb':'ci_lb',
// 		'ydataub':'ci_ub',
// 		'ydatamin':'min',
// 		'ydatamax':'max',
// 		'ydataiq1':'iq_1',
// 		'ydataiq3':'iq_3',
// 		'ydatamedian':'median',
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'component_group_name'};
// 	parameters_I = e.g., {
// 	SVG parameters:
// 		"svgtype":'boxandwhiskersplot2d_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency"
// 	Tile parameters:
// 		'tileheader':'Custom box and whiskers plot',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"};

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
    this.ddtsvg.add_resizebuttons2footer();
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
function ddt_svg_boxandwhiskersplot2d_02() {
// 	Custom box and whiskers plot
// 	DESCRIPTION:
//  Bullet plot describes the mean and confidence intervals of the data
//	Box and whiskers describe the median, interquartile, and ranges of the data
// 	INPUT:
// 	data1_keys = [
// 		'analysis_id',
// 		'experiment_id',
// 		'sample_name_abbreviation',
// 		'component_name',
// 		'time_point',
// 		'calculated_concentration_units',
// 		'component_group_name'
// 	];
// 	data1_nestkeys = [
// 		'component_name'
// 	];
// 	data1_keymap = {
// 		'xdata':'component_name',
// 		'ydatamean':'mean',
// 		'ydatalb':'ci_lb',
// 		'ydataub':'ci_ub',
// 		'ydatamin':'min',
// 		'ydatamax':'max',
// 		'ydataiq1':'iq_1',
// 		'ydataiq3':'iq_3',
// 		'ydatamedian':'median',
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'component_name'
// 	};
// 	data2_keys = [
// 		'analysis_id',
// 		'experiment_id',
// 		'sample_name_abbreviation',
// 		'component_name',
// 		'time_point',
// 		'calculated_concentration_units',
// 		'component_group_name'
// 	];
// 	data2_nestkeys = [
// 		'component_name'
// 	];
// 	data2_keymap = {
// 		'xdata':'component_name',
// 		'ydata':'calculated_concentration',
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'component_name'
// 	};
// 	data_I = [
// 		{"data":data_1,"datakeys":data1_keys,"datanestkeys":data1_nestkeys},
// 		{"data":data_2,"datakeys":data2_keys,"datanestkeys":data2_nestkeys},
// 	]
// 	parameters_I = e.g., {
// 	SVG parameters:
// 		"svgtype":'boxandwhiskersplot2d_02',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency"
//		"svgdata2pointsradius":5.0;
// 	Tile parameters:
// 		'tileheader':'Custom box and whiskers plot',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"};

	ddt_svg.call(this);
};
ddt_svg_boxandwhiskersplot2d_02.prototype = Object.create(ddt_svg.prototype);
ddt_svg_boxandwhiskersplot2d_02.prototype.constructor = ddt_svg_boxandwhiskersplot2d_02;
ddt_svg_boxandwhiskersplot2d_02.prototype.make_svg = function(data_I,parameters_I){
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
    this.ddtsvg.add_resizebuttons2footer();
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
        if (this.data1keymap.ydatamean){
        	this.add_boxandwhiskersdata1_mean();
        	this.add_boxandwhiskersdata1tooltipandfill_mean();
        };
        // add in the data points (either from data 1 or from data 2)
        if (typeof(this.data2keymap.ydata)!=="undefined"){
        	this.add_boxandwhiskersdata2();
        	this.add_boxandwhiskersdata2_points(parameters_I.svgdata2pointsradius);
        	this.add_boxandwhiskerspointsdata2tooltipandfill();
        	//this.add_boxandwhiskersdata2tooltipandfill_points();
        } else if (typeof(this.data1keymap.ydata)!=="undefined"){
        	this.add_boxandwhiskersdata1_points();        	
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
function ddt_svg_packlayout2d_01() {
    // packlayout
    // description:
    // generic packlayout
    // NOTES:
    // 1. data_I.datanestkeys = [] of multiple keys in order
    // 2. data_I.datalastchild = string describing the final child element
    // 3. data_I.svgpadding = float
    // parameters_I.svgduration
    // parameters_I.svgpadding
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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.data1.format_keyvalues2namechildren(data_I.datalastchild); //new!
    this.ddtsvg.set_packlayout(parameters_I.svgpadding); //new
    this.ddtsvg.render = function () {
        this.add_graph2d2tile();
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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
//     this.ddtsvg.data1.format_keyvalues2namechildren(data_I.datalastchild); //new!
//     this.ddtsvg.set_treelayoutdata1nodeorigin(0);
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
    };
};
function ddt_svg_verticalpieschart2d_01() {
// 	Vertical pies chart
// 	DESCRIPTION:
// 	Vertical bars with error bars
// 	INPUT:
// TODO
// 	data1_keys = [
// 		'feature_id',
// 		'feature_units',
// 	];
// 	data1_nestkeys = [
// 		'feature_id' //controls the x axis groupings
// 		//'element_id'
// 	];
// 	data1_keymap = {
// 		//'xdata':'element_id',
// 		'xdata':'feature_id', //specifies the x axis data
// 		'ydata':'frequency', //specifies the y axis data
// 		//'serieslabel':'feature_id',
// 		'serieslabel':'element_id', //controls the legend
// 		'featureslabel':'element_id', //controls the tooltip label for each feature
// 		'ydatalb':None,
// 		'ydataub':None};
// 	data_I = [{
// 		"data":data_table_O,
// 		"datakeys":data1_keys,
// 		"datanestkeys":data1_nestkeys
// 	}];
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'horizontalbarschart2d_01',"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,"svgheight":350,"svgy1axislabel":"rate (mmol*gDCW-1*hr-1)",
// 		"svgfilters":{'met_id':['glc-D','ac']}
		
//		"svgradius","svgouterradius","svginnerradius","svglabelouterradius","svglabelinnerradius"



// 		Tile parameters
// 		'tileheader':'Uptake/secretion rates',
// 		'tiletype':'svg',
// 		'tileid':"tile1",
// 		'rowid':"row1",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 		};

    ddt_svg.call(this);
};
ddt_svg_verticalpieschart2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_verticalpieschart2d_01.prototype.constructor = ddt_svg_verticalpieschart2d_01;
ddt_svg_verticalpieschart2d_01.prototype.make_svg = function(data_I,parameters_I){
	// piechart definition

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
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
    	// permanent filter on the data
    	if (parameters_I.svgfilters){
			this.data1.change_filters(parameters_I.svgfilters);
			this.data1.filter_listdata();
    	};
        this.add_chart2d2tile();
        this.set_svgstyle();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("radial");
        this.set_x1x2domain_verticalpieschart();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        //this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        // add pies
		this.set_radius(parameters_I.svgradius);
		this.set_arc();
		this.set_arclabel();
		this.set_piedata1();
        this.add_verticalpiesdata1();
        //this.add_verticalpiesdata1labels();
        this.add_verticalpiesdata1tooltipandfill();
        this.set_x1axisstyle_verticalpieschart();
        this.set_x1axistickstyle();
        //this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1axislabelstyle();
    };
};
function ddt_svg_horizontalareaplot2d_01() {
// 	Area plot
// 	DESCRIPTION:
// 	A scatter plot and line plot are rendered on the same figure
// 	INPUT:
// 	data 1 and 2 are plotted along the same axis
// 	data1 = points
// 	data2 = line
// 	data1_keymap = {
// 		'xdata':'time_point',
// 		'ydata':'mutation_frequency',
// 		'serieslabel':'mutation_id',
// 		'featureslabel':''
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'areaplot2d_01',
// 		"svgkeymap":[data1_keymap,data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,
// 		"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency",
// 		Tile parameters
// 		'tileheader':'Population mutation frequency',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"
// 		};
		
    ddt_svg.call(this);
};
ddt_svg_horizontalareaplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_horizontalareaplot2d_01.prototype.constructor = ddt_svg_horizontalareaplot2d_01;
ddt_svg_horizontalareaplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// areaplot definition

	this.ddtsvg = new d3_chart2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    //this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_resizebuttons2footer();
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
        //this.set_colorscale(); //color for series_label will change each update
        // add area
		this.set_areadata1();
		this.add_areadata1();
		//this.add_areadata1text();
		this.add_areadata1tooltipandstroke();
		this.add_areadata1filter();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        this.set_x1andy1axesstyle();
        this.set_x1andy1axestickstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
};
function ddt_svg_horizontalstackedareaplot2d_01() {
// 	Area plot
// 	DESCRIPTION:
// 	A scatter plot and line plot are rendered on the same figure
// 	INPUT:
// 	data 1 and 2 are plotted along the same axis
// 	data1 = points
// 	data2 = line
// 	data1_keymap = {
// 		'xdata':'time_point',
// 		'ydata':'mutation_frequency',
// 		'serieslabel':'mutation_id',
// 		'featureslabel':''
// 		};
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"svgtype":'areaplot2d_01',
// 		"svgkeymap":[data1_keymap,data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":500,
// 		"svgheight":350,
// 		"svgx1axislabel":"jump_time_point",
// 		"svgy1axislabel":"frequency",
//		"svgstackoffset":"wiggle",//wiggle = streamgraph, zero = area
// 		Tile parameters
// 		'tileheader':'Population mutation frequency',
// 		'tiletype':'svg',
// 		'tileid':"tile2",
// 		'rowid':"row1",
// 		'colid':"col2",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-8"
// 		};
		
    ddt_svg.call(this);
};
ddt_svg_horizontalstackedareaplot2d_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_horizontalstackedareaplot2d_01.prototype.constructor = ddt_svg_horizontalstackedareaplot2d_01;
ddt_svg_horizontalstackedareaplot2d_01.prototype.make_svg = function(data_I,parameters_I){
	// areaplot definition

	this.ddtsvg = new d3_chart2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    //this.ddtsvg.set_filterdata1and2(true); //filter data 1 and 2 together
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_resizebuttons2footer();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
		this.set_stackdata1(parameters_I.svgstackoffset);
        //this.add_title(parameters.svgtitle);
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        //this.set_y1domain();
        this.set_y1domainstacked();
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
        //this.set_colorscale(); //color for series_label will change each update
        // add area
		this.set_stackedareadata1();
		this.add_stackedareadata1();
		//this.add_areadata1text();
		this.add_areadata1tooltipandstroke();
		this.add_areadata1filter();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        this.set_x1andy1axesstyle();
        this.set_x1andy1axestickstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
    };
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
//var ddt_html_form_01 = function () {
function ddt_html_form_01() {
// 	responsive HTML form
// 	DESCRIPTION:
// 	HTML form tile
// 	utilized as a filter menu for svg and table tiles
// 	INPUT:
// 	data1 = [{}] of database rows (see d3_data)
// 	data1_keys = list of column headers to use as keys when filtering/sorting/displaying 
//		[ e.g.
// 		'experiment_id',
// 		'time_point',
// 		'sample_name_abbreviation',
// 		'dG_r',
// 		'dG_r_units'
// 		];
// 	data1_nestkeys = [ list of column headers to use as the nest keys
// 		[ e.g.
// 		'sample_name_abbreviation'
// 		];
// 	data1_keymap = { map between tile parameters and data keys
// 		{
// 		'values':'dG_r_mean',
// 		'key':'rxn_id'
// 		};
// 	data_I = [{ the data object
// 		[{
// 		"data":data1,
// 		"datakeys":data1_keys,
// 		"datanestkeys":data1_nestkeys
// 		},
// 		]
// 	parameters_I = { parameters that define the HTML and tile
// 		{
// 		HTML parameters
// 		'htmlid':'filtermenuform1',
// 		"htmltype":'form_01',
// 		"formsubmitbuttonidtext":{'id':'submit1','text':'submit'},
// 		"formresetbuttonidtext":{'id':'reset1','text':'reset'},
// 		"formupdatebuttonidtext":{'id':'update1','text':'update'}
// 		
// 		Tile parameters
// 		'tileheader':'Filter menu',
// 		'tiletype':'html',
// 		'tileid':"filtermenu1",
// 		'rowid':"row1",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};

    ddt_html.call(this);
};
ddt_html_form_01.prototype = Object.create(ddt_html.prototype);
ddt_html_form_01.prototype.constructor = ddt_html_form_01;
ddt_html_form_01.prototype.make_html = function(data_I,parameters_I){
//ddt_html_form_01.prototype.make_html = function(parameters_I){
    // make form

	this.ddthtml = new d3_html_form();
	
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
//var ddt_html_datalist_01 = function () {
function ddt_html_datalist_01() {
// 	data list tile
// 	DESCRIPTION
// 	drop down data list
// 	INPUT:
// 	parameters_I = e.g., {
// 		'datalist': [
// 			{'value':'hclust','text':'by cluster'},
// 			{'value':'probecontrast','text':'by row and column'},
// 			{'value':'probe','text':'by row'},
// 			{'value':'contrast','text':'by column'},
// 			{'value':'custom','text':'by value'}
// 			]
// 		};

    ddt_html.call(this);
};
ddt_html_datalist_01.prototype = Object.create(ddt_html.prototype);
ddt_html_datalist_01.prototype.constructor = ddt_html_datalist_01;
ddt_html_datalist_01.prototype.make_html = function(data_I,parameters_I){   
    // make the data list

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
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        //this.add_dropdownbuttongroup_href();
        this.add_headerandlistgroup_href();
    };
};
function ddt_html_href_02() {
// 	href data list with a submit button
// 	DESCRIPTION:
// 	href data list with a submit button
// 	INPUT:
// 	data1 = [{}] list of data objects (see d3_data)
// 	data1_keys = 
// 		['analysis_id',
// 		'data_export_id',
// 		'pipeline_id'
// 		];
// 	data1_nestkeys = 
// 		[
// 		'data_export_id'
// 		];
// 	data1_keymap = 
// 		{
// 		'buttonparameter':'data_export_id',
// 		'liparameter':'analysis_id',
// 		'buttontext':'data_export_id',
// 		'litext':'analysis_id'
// 		};
// 	data_I = 
// 		[{
// 		"data":data1,
// 		"datakeys":data1_keys,
// 		"datanestkeys":data1_nestkeys
// 		});
// 	parameters_I = 
// 		{
// 		HTML parameters
// 		"hrefurl":'project.html',
// 		"htmlkeymap":[data1_keymap],
// 		'htmltype':'href_02',
// 		'htmlid':htmlid,
// 		"formsubmitbuttonidtext":{'id':'submit1','text':'submit'},
// 		Tile parameters
// 		'tileheader':tileheader,
// 		'tiletype':'html',
// 		'tileid':tileid,
// 		'rowid':"row2",
// 		'colid':colid,
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"};
                
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
    	if (typeof parameters_I.htmlfilters !== "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_headeranddatalist_href();
        if (parameters_I.formsubmitbuttonidtext){this.add_headeranddatalistsubmit_href()};
    };
};
//var ddt_html_media_01 = function () {
function ddt_html_media_01() {
// 	responsive HTML media
// 	DESCRIPTION:
// 	responsive HTML media
// 	INPUT:
// 	data2 = [{}] of data objects (see d3_data)
// 	data2_keys = 
// 		[
// 		'project_id',
// 		'project_section',
// 		'project_heading',
// 		'project_tileorder'
// 		];
// 	data2_nestkeys = 
// 		[
// 		'project_id'
// 		];
// 	data2_keymap = 
// 		{
// 		'htmlmediasrc':'project_media',
// 		'htmlmediaalt':'',
// 		'htmlmediahref':'project_href',
// 		'htmlmediaheading':'project_heading',
// 		'htmlmediaparagraph':'project_paragraph'
// 		};
// 	data_I = 
// 		[{
// 		"data":data2,
// 		"datakeys":data2_keys,
// 		"datanestkeys":data2_nestkeys
// 		}];
// 	parameters_I = 
// 		{
// 		HTML parameters
// 		"htmlkeymap":[data2_keymap],
// 		'htmltype':'media_01',
// 		'htmlid':htmlid,
// 		Tile parameters
// 		'tileheader':tileheader,
// 		'tiletype':'html',
// 		'tileid':tileid,
// 		'rowid':"row1",
// 		'colid':colid,
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};


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
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_mediasvg();
    };
};
//var ddt_html_escher_01 = function () {
function ddt_html_escher_01() {
// 	Embedded escher map
// 	DESCRIPTION:
// 	Embedded escher map
// 	INPUT:
// 	Data1 = rxns
// 	Data2 = metabolites
// 	Data3 = genes
// 	data1_keymap = {
// 		'values':'dG_r_mean',
// 		'key':'rxn_id'
// 		};
// 	data2_keymap = {
// 		'values':'concentration',
// 		'key':'met_id'
// 		};
// 	parameters_I = {
// 		HTML parameters
// 		"htmlkeymap":[data1_keymap,data2_keymap],
// 		'htmltype':'escher_01','htmlid':'html1',
// 		'escherdataindex':{"reactiondata":0,"metabolitedata":1,"mapdata":2},
// 		'escherembeddedcss':None,
// 		'escheroptions':None
// 		Tile paramters
// 		'tileheader':'Escher map',
// 		'tiletype':'html',
// 		'tileid':"tile1",
// 		'rowid':"row3",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 		};


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
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlescherstyle();
        this.add_escher();
    };
};
function ddt_html_containerheader_01() {
// 	Container header row
// 	DESCRIPTION
// 	container header tile with container options
// 	INPUT:
// 	parameters_I = {
// 		HTML parameters
// 		'htmlid':'containerheader',
// 		"htmltype":'containerheader_0',
// 		Tile parameters
// 		'tileheader':'Container options',
// 		'tiletype':'html',
// 		'tileid':"containerheader",
// 		'rowid':"containerheader",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12",
// 		};

    ddt_html.call(this);

};
ddt_html_containerheader_01.prototype = Object.create(ddt_html.prototype);
ddt_html_containerheader_01.prototype.constructor = ddt_html_containerheader_01;
ddt_html_containerheader_01.prototype.make_html = function(data_I,parameters_I){
    // make container header

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
    	if (typeof parameters_I.htmlfilters !== "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_listdata();
    	};
        this.add_html2tile();

    };
};
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
    this.tile.add_navigationmenu2header();
    this.tile.add_resize2header();
    this.tile.add_removebutton2header();
    this.tile.add_duplicatebutton2header();
    this.tile.add_title2header(header_I);
    this.tile.add_body2tile();
    this.tile.add_footer2tile();
    
    this.tile.set_draganddrop();

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
    } else if (svgtype_I=='horizontalareaplot2d_01'){
        return new ddt_svg_horizontalareaplot2d_01();
    } else if (svgtype_I=='horizontalstackedareaplot2d_01'){
        return new ddt_svg_horizontalstackedareaplot2d_01();
    } else if (svgtype_I=='scatterplot2d_01'){
        return new ddt_svg_scatterplot2d_01();
    } else if (svgtype_I=='verticalbarschart2d_01'){
        return new ddt_svg_verticalbarschart2d_01();
    } else if (svgtype_I=='horizontalbarschart2d_01'){
        return new ddt_svg_horizontalbarschart2d_01();
    } else if (svgtype_I=='boxandwhiskersplot2d_01'){
        return new ddt_svg_boxandwhiskersplot2d_01();
    } else if (svgtype_I=='boxandwhiskersplot2d_02'){
        return new ddt_svg_boxandwhiskersplot2d_02();
    } else if (svgtype_I=='volcanoplot2d_01'){
        return new ddt_svg_volcanoplot2d_01();
    //} else if (svgtype_I=='pcaplot2d_loadings_01'){
    //    return new ddt_svg_pcaplot2d_loadings_01();
    } else if (svgtype_I=='pcaplot2d_scores_01'){
        return new ddt_svg_pcaplot2d_scores_01();
    } else if (svgtype_I=='treelayout2d_01'){
        return new ddt_svg_treelayout2d_01();
    } else if (svgtype_I=='circlepacklayout2d_01'){
        return new ddt_svg_circlepacklayout2d_01();
    } else if (svgtype_I=='verticalpieschart2d_01'){
        return new ddt_svg_verticalpieschart2d_01();
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
    this.tile.add_navigationmenu2header();
    this.tile.add_resize2header();
    this.tile.add_removebutton2header();
    this.tile.add_title2header(header_I);
    this.tile.add_body2tile();
    this.tile.add_footer2tile();
    
    //this.tile.add_swipe();
    this.tile.set_draganddrop();

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
    //this.ddttable.ddttable.data.filter_listdata();
    //re-render the table
    this.ddttable.ddttable.render();
};
ddt_tile_table.prototype.get_table = function(tabletype_I){
    // return the appropriate tile object
    if (tabletype_I==='responsivetable_01'){
        return new ddt_table_responsivetable_01();
    } else if (tabletype_I==='responsivecrosstable_01'){
        return new ddt_table_responsivecrosstable_01();
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
    this.tile.add_navigationmenu2header();
    this.tile.add_resize2header();
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
    //this.tile.set_draganddrop();

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
    } else if (htmltype_I=='containerheader_01'){
        return new ddt_html_containerheader_01();
    } else {
        return null;
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
    this.containerheader=null;
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
ddt_container.prototype.add_tile2datamap = function(tile2datamap_I){
    // add to tile2datamap
    // INPUT:
    // tile2datamap_I = {tileid:[dataindex,...],...}
    for(var key in tile2datamap_I){
        this.tile2datamap[key]=tile2datamap_I[key];
    };
};
ddt_container.prototype.add_parameters = function(parameters_I,pos_I){
    // add parameters to container
    if (typeof(pos_I)==="number"){
        this.parameters.splice(pos_I,0,parameters_I);
    } else {
        this.parameters.push(parameters_I);
    };
};
ddt_container.prototype.add_tile = function(tile_I,pos_I){
    // add tile to container
    if (typeof(pos_I)==="number"){
        this.tiles.splice(pos_I,0,tile_I);
    } else {
        this.tile.push(tile_I);
    };
};
ddt_container.prototype.add_data = function(data_I){
    // add data to container
    //INPUT:
    // data_I = [{data:[],datakeys:[],datanestkeys:[]},...]
    for (var cnt=0;cnt<data_I.length;cnt++){
        var d3data = new d3_data();
        d3data.set_keys(data_I[cnt].datakeys);
        d3data.set_listdata(data_I[cnt].data,data_I[cnt].datanestkeys);
        d3data.add_usedkey2listdata(); //ensure a used_ key in each data object
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
ddt_container.prototype.get_containertilebytileid = function(tileid_I){
    // retrieve a container tile
    //INPUT:
    //tileid_I = string, tileid
    //OUTPUT:
    //tile_O = tile object
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        console.log('no tileid provided.');
        return null;
    };
    var tile_O = null;
    for (var i=0; i<this.tiles.length; i++){
        if (this.tiles[i].tileid == tileid){
            tile_O = this.tiles[i];
            break;
        };
    };
    return tile_O;
};
ddt_container.prototype.make_container = function(){
    // call all tile make functions
    var data = this.data;
    this.add_containertiles();
    for (var cnt=0;cnt<this.tiles.length;cnt++){
        var tiledataindex = this.tile2datamap[this.parameters[cnt].tileid];
        var tiledata = [];
        tiledataindex.forEach(function(d){tiledata.push(data[d]);});
        this.tiles[cnt].make_tile(tiledata,this.parameters[cnt]);
    };
};
ddt_container.prototype.update_container = function(){
    // call all tile update functions
    var data = this.data;
    for (var cnt=0;cnt<this.tiles.length;cnt++){ 
        var tiledataindex = this.tile2datamap[this.parameters[cnt].tileid];
        var tiledata = [];
        tiledataindex.forEach(function(d){tiledata.push(data[d]);});
        this.tiles[cnt].update_tile(tiledata);
    };     
};
ddt_container.prototype.reset_containerdata = function(){
    // reset data filters and call all tile update functions
    for (cnt=0;cnt<this.data.length;cnt++){ 
        this.data[cnt].reset_usedkey(); //check reset_usedkey
        this.data[cnt].reset_filters();
    };
    var data = this.data;
    for (var cnt=0;cnt<this.tiles.length;cnt++){ 
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
    for (var cnt=0;cnt<this.data.length;cnt++){ 
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
        });
        tiledataindex.forEach(function(d){
            for (var key in this_.data[d].filters){
    //         for (var key in this_.data[tiledataindex].filters){
                var filterkey = d3.select("#"+htmlid+'formlabel'+key).text();
                var filterstring = d3.select("#"+htmlid+'forminput'+key).node().value;
                filterstringmenu.push({"text":filterkey,"value":filterstring});
            };
        });
        for (var cnt=0;cnt<this_.data.length;cnt++){
            this_.data[cnt].convert_stringmenuinput2filter(filterstringmenu);
            //this_.data[cnt].reset_usedkey(); //check reset_usedkey
            this_.data[cnt].filter_listdata();
        };
//         this_.tiles[tileindex].data[0].convert_stringmenuinput2filter(filterstringmenu);
//         this_.tiles[tileindex].data[0].filter_listdata();
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
        for (var cnt=0;cnt<this_.data.length;cnt++){
            this_.data[cnt].reset_usedkey(); //check reset_usedkey
            this_.data[cnt].reset_filters();
            this_.data[cnt].filter_listdata();
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
    if (typeof(parameters) !== "undefined") {ddt_test.set_parameters(parameters);};
    if (typeof(data) !== "undefined") {ddt_test.add_data(data);};
    if (typeof(tile2datamap) !== "undefined") {ddt_test.set_tile2datamap(tile2datamap);};
    //add container options menu
    if (!ddt_test.containerheader){
        ddt_test.add_headerparameters();
        ddt_test.add_headerdata();
        ddt_test.add_headertile2datamap();
    };
    //make the container
    ddt_test.make_container();
    ddt_test.add_header2container();
    //add the container filter buttons
    if (typeof filtermenu !== "undefined") { ddt_test.add_datafiltermenubuttons(filtermenu); }
    else { ddt_test.add_datafiltermenubuttons(); };
};
ddt_container.prototype.add_headerparameters = function(){
    // add a header row parameters
    var containerid = this.containerid;
    var parameters = {
        'tileheader':'Container options','tiletype':'html',
        'tileid':"containerheader",'rowid':"row0",'colid':"col1",
        'tileclass':"panel panel-default",'rowclass':"row",'colclass':"col-sm-12",
        'htmlid':'containerheader',
        "htmltype":'containerheader_01'
        };
    var pos = 0;

    this.add_parameters(parameters,pos);
};
ddt_container.prototype.add_headerdata = function(){
    // add header row data
    var data = {"data":[{"version":"developer"}],
            "datakeys":['version'],
            "datanestkeys":['version']}
    this.add_data(data);
};
ddt_container.prototype.add_headertile2datamap = function(){
    // add header row tile2datamap
    var datalength = this.data.length;
    var tile2datamap = {'containerheader':[datalength]};
    this.add_tile2datamap(tile2datamap);
};
ddt_container.prototype.add_header2container = function(){
    // add a header row to the container
    var containerid = this.containerid;
    
    if (!this.containerheader){
        var headernode = d3.select('#'+"containerheaderhtml");
        this.containerheader = d3.select('#'+"containerheaderhtml")
            .append("div")
            .attr("class","row")
            .append("div")
            .attr("class","col-sm-12")
            .attr("id",containerid + 'header');
    };
    // check for the version
    // options based on the version
    this.add_jsonimportbutton2container();
    this.add_jsonexportbutton2container();
    this.add_encryptionbutton2container();
    //TODO: this.add_newtilebutton2continer();

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
        .attr("class","glyphicon glyphicon-save-file pull-left")
        .attr("id", containerid + 'jsonexportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","save container");
    jsonexportbutton.on("click", exportalldatajson);
};
ddt_container.prototype.add_jsonimportbutton2container = function (){
    // add button to import new container from a json data file
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
                    //check for encryption
                    if (this_.password){
                        result=sjcl.decrypt(this_.password, result);
                    };
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
        .attr("class","glyphicon glyphicon-open-file pull-left")
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
    this.containerheader = null;
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
ddt_container.prototype.get_parameters = function(include_header_I){
    //return the parameters object in string format
    //INPUT:
    //include_header_I = boolean, include the header tile (default=false)

    //handle the input
    if (typeof(include_header_I)!=="undefined"){
        var include_header = include_header_I;
    } else {
        var include_header = false;
    };
    //get the parameters
    if (typeof this.parameters !== "undefined"){
        var parameters_O = this.parameters;
    } else {
        var parameters_O = null;
    };
    //remove the header parameters (if specified)
    if(parameters_O && !include_header){
       parameters_O = parameters_O.filter( function(d) {
            return d['htmlid']!=="containerheader";
            });
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
ddt_container.prototype.get_tile2datamap = function(include_header_I){
    //return the tile2datamap object in string format
    //INPUT:
    //include_header_I = boolean, include the header tile (default=false)

    //handle the input
    if (typeof(include_header_I)!=="undefined"){
        var include_header = include_header_I;
    } else {
        var include_header = false;
    };
    //get the tile2datamap
    if (typeof this.tile2datamap !== "undefined"){
        var tile2datamap_O = this.tile2datamap;
    } else {
        var tile2datamap_O = null;
    };
    //remove the header parameters (if specified)
    if(tile2datamap_O && !include_header){
       delete tile2datamap_O["containerheader"];
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

    //check for encryption
    if (this.password){
        j=sjcl.encrypt(this.password, j);
    };

    a.setAttribute("href-lang", "application/json");
    // test/json instead of application/json preserves white spaces!
    a.href = 'data:text/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};
ddt_container.prototype.set_password = function(password_I){
    // set the container password_I
    if (typeof(password_I)!=="undefined"){
        var password = password_I;
    } else {
        var password = null;
    }

    this.password = password;
};
ddt_container.prototype.check_containerencryption = function(){
    //check if the container is password protected
    //OUTPUT:
    //encrypted_O = boolean, true if password protected
    var encrypted_O = false;
    var currentbuttoncolor = this.jsonencryptionbuttontrigger.node().style['color'];
    if (!this.password && currentbuttoncolor==""){
        encrypted_O=false;
    } else if (this.password && currentbuttoncolor=="red"){
        encrypted_O=true;
    } else{
        encrypted=false;
        console.log("password and button color mismatch.");
    }
    ;
    return encrypted_O;
}
ddt_container.prototype.add_encryptionbutton2container = function(){
    // add data incryption when downloading a container json file
    // dependencies: https://bitwiseshiftleft.github.io/sjcl/

    // add button to export all json data from the container to file
    var this_ = this;
    var containerid = this.containerid;
    var password = this.password;

    //html alert version start
    //------------------------
//     function setpassword(){
//         var currentbuttoncolor = this_.jsonencryptionbutton.node().style['color'];
//         if (!this_.password && currentbuttoncolor==""){
//             // encrypt
//             // get user password:
//             var password = prompt("enter your password to lock the container");
//             this_.set_password(password); //necessary to pass svg as "this"
//             // change the button color
//             this_.jsonencryptionbutton.style({"color": "red"});
//             alert("input data will now be decrypted and output data will be encrypted")
//         } else if (this_.password && currentbuttoncolor=="red"){
//             // decrypt
//             // get user password:
//             var password = prompt("enter your password to unlock the container");
//             if (password===this_.password){
//                 this_.password = null;
//                 this_.jsonencryptionbutton.style({"color": ""});
//             } else {
//                 alert("invalid password provided");
//             };
            
//         };
//     };
//     this.jsonencryptionbutton = this.containerheader
//         .append("div")
//         .attr("class","glyphicon glyphicon-certificate pull-left ui-btn ui-btn-inline")
//         .attr("id", containerid + 'jsonencryptionbutton')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","encrypt container");
//     this.jsonencryptionbutton.on("click", setpassword);
//     // ensure that the button is colored red if the container is password protected
//     if (this.password){
//         this.jsonencryptionbutton.style({"color": "red"});
//     };
    //html alert version end
    //----------------------

    //bootstrap modal version start
    //-----------------------------
    function getpassword_modal(){
        //get the container password
        var encrypted = this_.check_containerencryption();
        if (!encrypted){
            // encrypt
            // get user password:
            menumodal.update_modalheadertitle('Encrypt container');
            $("#"+containerid + "modal").modal('show');
        } else {
            // decrypt
            // get user password:
            menumodal.update_modalheadertitle('Decrypt container');
            $("#"+containerid + "modal").modal('show');
        };
    };
    function setpassword_modal(){
        //set the container password
        var encrypted = this_.check_containerencryption();
        if (!encrypted){
            // encrypt
            // get user password:
            var password = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
            this_.set_password(password); //necessary to pass svg as "this"
            // change the button color
            this_.jsonencryptionbuttontrigger.style({"color": "red"});
            //alert("input data will now be decrypted and output data will be encrypted")
        } else {
            // decrypt
            // get user password:
            var password = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
            if (password===this_.password){
                this_.password = null;
                this_.jsonencryptionbuttontrigger.style({"color": ""});
            } else {
                alert("invalid password provided");
            };
            
        };
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+containerid + "modal").modal('hide');
    };
    this.jsonencryptionbutton = this.containerheader
        .append("div")
        .attr("id", containerid + 'jsonencryptionbutton')
        .attr("class","pull-left")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","encrypt container")
    this.jsonencryptionbuttontrigger = this.jsonencryptionbutton
        .append("span")
        .attr("class","glyphicon glyphicon-certificate pull-left ui-btn ui-btn-inline")
        .attr("aria-hidden","true")
        .attr("data-toggle","modal")
        .attr("data-target",containerid + "modal")
    // ensure that the button is colored red if the container is password protected
    if (this.password){
        this.jsonencryptionbutton.style({"color": "red"});
    };

    //add the modal menu object
    var modaltargetid = "#" + containerid + 'jsonencryptionbutton';
    //var modaltargetid = "body";
    var menumodal = new d3_html_modal();
    menumodal.set_tileid(containerid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('');
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var tileid = this.tileid;

        var modalbodyformpassword = this.modalbodyform
            .append("div")
            .attr("class","form-group")
            .attr("id",tileid+"modalbodyformpassword")
            .append("label")
            .attr("for",tileid+"modalbodyformpasswordinput")
            .text("Password")
            .append("input")
            .attr("type","password")
            .attr("class", "form-control")
            .attr("id",tileid+"modalbodyformpasswordinput")
            .attr("placeholder","Password");

        var modalbodyformbutton = this.modalbodyform
            .append("button")
            .attr("class","btn btn-default")
            .attr("id",tileid+"modalbodyformbutton")
            .text("Submit");

        modalbodyformbutton.on("click",setpassword_modal)
    };
    menumodal.add_content2modalbodyform();

    this.jsonencryptionbuttontrigger.on("click", getpassword_modal);
    //bootstrap modal version end
    //-----------------------------

//     var jsonencryptionbutton = this.containerheader
//         .append("div")
//         .attr("data-rol","main")
//         .attr("class","ui-content")
//         .append("a")
//         .attr("href","#encryptionpopup")
//         .attr("data-rel","passwordpopup")
//         .append("div")
//         .attr("class","glyphicon glyphicon-certificate pull-left ui-btn ui-btn-inline")
//         .attr("id", containerid + 'jsonencryptionbutton')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","encrypt container");
//     //jsonencryptionbutton.on("click", setpassword);

//     var passwordpopupform = d3.select("body")
//         .append("div")
//         .attr("data-role","passwordpopup")
//         .attr("id",'encryptionpopup')
//         .attr("class","ui-content")
//         .style({"min-width":"250px"})
//         .append("form")
//         .attr("method","post")
//         .attr("action","demoform.asp")
//         .append("div");
//     var passwordpopupformheader = passwordpopupform
//         .append("h3")
//         .text("loggin information");
//     var passwordpopupformusernamelabel = passwordpopupform
//         .append("label")
//         .attr("for","usrnam")
//         .attr("class","ui-hidden-accessible")
//         .text("Username");
//     var passwordpopupformusernameinput = passwordpopupform
//         .append("input")
//         .attr("type","text")
//         .attr("name","user")
//         .attr("id","usrnam")
//         .attr("placeholder","Username");
//     var passwordpopupformpasswordlabel = passwordpopupform
//         .append("label")
//         .attr("for","pswd")
//         .attr("class","ui-hidden-accessible")
//         .text("Password");
//     var passwordpopupformpasswordinput = passwordpopupform
//         .append("input")
//         .attr("type","text")
//         .attr("name","passw")
//         .attr("id","pswd")
//         .attr("placeholder","Password");
//     var passwordpopupformstayloggedininput = passwordpopupform
//         .append("input")
//         .attr("type","checkbox")
//         .attr("name","login")
//         .attr("id","log")
//         .attr("value","1")
//         .attr("data-mini","true");
//     var passwordpopupformsubmitinput = passwordpopupform
//         .append("input")
//         .attr("type","submit")
//         .attr("name","login")
//         .attr("id","passwordpopupsubmitbutton")
//         .attr("value","Log in")
//         .attr("data-inline","true");
};
ddt_container.prototype.add_newtilebutton2container = function(){
    //add a new tile to the container
    //Behavior:
    //1. popup modal
    //  a. select tile templates
    //  b. select associated data
    //  c. input tile parameters
    //2. add new tile on submit
    //  a. add the new tile parameters object
    //  b. add the new tile tile2datamap values
    //  c. make the tile
    //  d. add the new tile to the container
    //TODO:
};ddt_container.prototype.add_replacelistdatabutton2container = function(){
    // add a replace listdata button to the container

    // add button to export all json data from the container to file
    var this_ = this;
    var containerid = this.containerid;

    function updateData(e,d){
        //update the input with the name of the text file
        var input = d3.select("#" + id + 'inputgroupinput');
        input.val(d);  
        //replace the data object
        this.data=d;
    };
    
    function readFile(){
        var file1 = this.files[0];

        if (!file1) {
            alert("Failed to load file");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            load_json_or_csv(f, csv_converter, updateData);
        };
    };

    function updatelistdata_modal(){
        //update the listdata
        menumodal.update_modalheadertitle('Update list data');
        $("#"+containerid + "modal").modal('show');
    };
    function replacelistdata_modal(){
        //update the data
        var data_index = d3.select("#"+containerid+"modalbodyformdataindexinput").node().value;
        var listdata = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
        if (data_index && listdata){
            this_.password = null;
            this_.jsonencryptionbuttontrigger.style({"color": ""});
        } else {
            alert("data index or data file not provided.");
        };
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+containerid + "modal").modal('hide');
    };

    //add the modal menu object
    var modaltargetid = "#" + containerid + 'jsonencryptionbutton';
    //var modaltargetid = "body";
    var menumodal = new d3_html_modal();
    menumodal.set_tileid(containerid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('');
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var tileid = this.tileid;

        var modalbodyformdataindex = this.modalbodyform
            .append("div")
            .attr("class","form-group")
            .attr("id",tileid+"modalbodyformdataindex")
            .append("label")
            .attr("for",tileid+"modalbodyformdataindexinput")
            .text("data index")
            .append("input")
            .attr("type","number")
            .attr("class", "form-control")
            .attr("id",tileid+"modalbodyformdataindexinput")
            .attr("placeholder","Password");

        var modalbodyinputgroup = this.modalbodyform
            .append("div")
            .attr("class","input-group")
            .attr("id",id + 'input-group');

        var modalbodyinputbutton = modalbodyinputgroup.append("span")
            .attr("class","input-group-btn")
            .append("span")
            .attr("class","btn btn-primary btn-file")
            .text(button_text)
            .append("input")
            .attr("id",id + 'inputbuttongroupinput')
            .attr("type","file")
            .on("change",readFile);

        var modalbodyinputgroupinput = modalbodyinputgroup.append("input")
            .attr("class","form-control")
            .attr("id",id + 'inputgroupinput')
            .attr("type","text");

        var modalbodyformbutton = this.modalbodyform
            .append("button")
            .attr("class","btn btn-default")
            .attr("id",tileid+"modalbodyformbutton")
            .text("Submit");

        modalbodyformbutton.on("click",replacelistdata_modal);
    };
    menumodal.add_content2modalbodyform();

    this.jsonencryptionbuttontrigger.on("click", updatelistdata_modal);
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