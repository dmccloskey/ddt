"use strict";
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
		//ddt data and template
    this.set_parameters(parameters);
    this.add_data(data);
    this.set_tile2datamap(tile2datamap);
    //container manipuation features
    this.add_header2container();
    this.add_jsonimportbutton2container();
    this.add_jsonexportbutton2container();
    //make the container
    this.make_container();
    //add the container filter buttons
    if (typeof filtermenu !== "undefined") { ddt_test.add_datafiltermenubuttons(filtermenu); }
    else { ddt_test.add_datafiltermenubuttons(); };
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
ddt_container.prototype.get_data_string = function(){
    //return the data object in string format
    if (typeof this.data !== "undefined"){
        var data_O = JSON.stringify(this.data);
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
    var parameters_str = this.get_data_string();
    var data_str = this.get_data_string();
    var tile2datamap_str = this.get_data_string();
    var filtermenu_str = this.get_data_string();
    var alldata_O = '';
    if (parameters_str){alldata_O += 'var parameters = ' + parameters_str + ';'};
    if (data_str){alldata_O += 'var data = ' + data_str + ';'};
    if (tile2datamap_str){alldata_O += 'var tile2datamap = ' + tile2datamap_str + ';'};
    if (filtermenu_str){alldata_O += 'var filtermenu = ' + filtermenu_str + ';'};
    return alldata_O;
};
ddt_container.prototype.export_alldatajson = function () {
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
                    //TODO: validate the input
    //                 var parameters = undefined;
    //                 var data = undefined;
    //                 var tile2datamap = undefined;
    //                 var filtermenu = undefined;
                    eval(result);
                    if (typeof filtermenu === "undefined") { var filtermenu = undefined; };
                    // delete the existing container
                    this_.remove_container();
                    // make a new container with the new data
                    this_.__main__(parameters,data,tile2datamap,filtermenu);
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
}