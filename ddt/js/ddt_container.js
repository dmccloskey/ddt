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
};