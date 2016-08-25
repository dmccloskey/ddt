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
ddt_container.prototype.update_data = function(data_I,index_I){
    /* update data in the container
    INPUT:
    data_I = [{data:[],datakeys:[],datanestkeys:[]},...]
    index_I = integer, data index to update
    */

    var d3data = this.data[index_I];
    d3data.set_listdata(data_I,d3data.nestkey);
    d3data.reset_filters();
};
ddt_container.prototype.add_data = function(data_I){
    // add data to container
    //INPUT:
    // data_I = [{data:[],datakeys:[],datanestkeys:[],metadata:{}},...]
    for (var cnt=0;cnt<data_I.length;cnt++){
        var d3data = new d3_data();
        d3data.set_d3data(data_I[cnt]);
        this.data.push(d3data);
    };
};
ddt_container.prototype.get_tileidsBydataindex = function(index_I){
    /*get a list of tile ids associated with the data index
    INPUT:
    index_I = integer, data index 
    */
    var tileids_O = [];
    for (var key in this.tile2datamap){
        if (this.tile2datamap[key].indexOf(index_I) > -1){
            tileids_O.push(key);
        };
    };
    return tileids_O;
};
ddt_container.prototype.update_containertilesdata = function(data_I,index_I){
    /*update container tiles
    INPUT:
    data_I = [{data:[],datakeys:[],datanestkeys:[]},...]
    index_I = integer, data index to update
    */

    // get tileids by data index
    var tileids = this.get_tileidsBydataindex(index_I);
    for (var i=0; i<tileids.length; i++){
        for (var j=0; j<this.tiles.length; j++){
            if (this.tiles[j].tile.tileid === tileids[i]){
                this.tiles[j].update_tile(data_I);
            };
        };
    };
};
ddt_container.prototype.add_containertiles = function(start_index_I=0){
    /*
    get all container tiles based on parameters
    tiles will be added in the same order as the parameters
    INPUT:
    start_index_I = int, starting parameter index
    */ 
    // 
    for (var i=start_index_I;i<this.parameters.length;i++){
        var tiletype = this.parameters[i].tiletype;
        var tile = this.get_tile(tiletype);
        this.tiles.push(tile);
    };
};
ddt_container.prototype.append_containertiles = function(start_index_I=0){
    /*
    append tiles to the container
    INPUT:
    start_index_I = int, starting parameter index
    */ 
    var data = this.data;
    for (var cnt=start_index_I;cnt<this.tiles.length;cnt++){
        var tiledataindex = this.tile2datamap[this.parameters[cnt].tileid];
        if (typeof(tiledataindex)!=="undefined"){
            var tiledata = [];
            tiledataindex.forEach(function(d){tiledata.push(data[d]);});
            this.tiles[cnt].make_tile(tiledata,this.parameters[cnt]);
        };
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
    this.add_containertiles();
    this.append_containertiles();
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
        //this.data[cnt].reset_usedkey(); //check reset_usedkey
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

        //Apply a global filter to all keys in the container
        var tiledataindex = 0;
        this_.tiles.forEach(function(d,i){
            if (d.parameters.tileid === tileid){
                tileindex=i;
                tiledataindex = this_.tile2datamap[d.parameters.tileid];
            };
        });
        tiledataindex.forEach(function(d){
            for (var key in this_.data[d].filters){
                var filterkey = d3.select("#"+htmlid+'formlabel'+key).text();
                var filterstring = d3.select("#"+htmlid+'forminput'+key).node().value;
                filterstringmenu.push({"labeltext":filterkey,"inputvalue":filterstring});
            };
        });
        for (var cnt=0;cnt<this_.data.length;cnt++){
            this_.data[cnt].convert_stringmenuinput2filter(filterstringmenu);
            //this_.data[cnt].reset_usedkey(); //check reset_usedkey
            this_.data[cnt].filter_listdata();
        };
        this_.update_container();  

//         //TODO: filter only objects associated with the filter menu?
//         for (var cnt=0;cnt<this_.data.length;cnt++){
//             this_.data[cnt].filter_listdata();
//         };
//         this_.update_container(); 
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
            //this_.data[cnt].reset_usedkey(); //check reset_usedkey
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