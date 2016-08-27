ddt_container.prototype.get_parameters_string = function(){
    //return the parameters object in string format
    if (typeof(this.parameters)!== "undefined"){
        var parameters_O = JSON.stringify(this.parameters);
    } else {
        var parameters_O = null;
    };
    return parameters_O
};
ddt_container.prototype.get_data_string = function(filtereddataonly_I){
    //return the data object in string format
    //need to update to return the only keys, nestkeys, and data

    if (typeof(filtereddataonly_I) === "undefined"){
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
    if (typeof(this.tile2datamap)!== "undefined"){
        var tile2datamap_O = JSON.stringify(this.tile2datamap);
    } else {
        var tile2datamap_O = null;
    };
    return tile2datamap_O
};
ddt_container.prototype.get_filtermenu_string = function(){
    //return the filtermenu object in string format
    if (typeof(this.filtermenu)!== "undefined"){
        var filtermenu_O = JSON.stringify(this.filtermenu);
    } else {
        var filtermenu_O = null;
    };
    return filtermenu_O
};
ddt_container.prototype.get_alldata_string = function(){
    //return all container data in string format
    this.update_tileParametersFromNodes();
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
    if (typeof(this.parameters)!== "undefined"){
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

    if (typeof(filtereddataonly_I)=== "undefined"){
        var filtereddataonly = false;
    } else {
        var filtereddataonly = filtereddataonly_I;
    };
    
    var data_O = [];
    if (typeof(this.data)!== "undefined"){
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
    if (typeof(this.tile2datamap)!== "undefined"){
        var tile2datamap = this.tile2datamap;
    } else {
        var tile2datamap = null;
    };
    //remove the header parameters (if specified)
    if(tile2datamap_O && !include_header){
        var tile2datamap_O = {};
        for (var k in tile2datamap){
            if (k!=="containerheader"){
                tile2datamap_O[k] = tile2datamap[k];
            };
        };
       //delete tile2datamap_O["containerheader"];
    } else {
        var tile2datamap_O = tile2datamap;
    };
    return tile2datamap_O
};
ddt_container.prototype.get_filtermenu = function(){
    //return the filtermenu object in string format
    if (typeof(this.filtermenu)!== "undefined"){
        var filtermenu_O = this.filtermenu;
    } else {
        var filtermenu_O = null;
    };
    return filtermenu_O
};
ddt_container.prototype.get_alldata = function(){
    //return all container data in string format
    this.update_tileParametersFromNodes();
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
ddt_container.prototype.show_updatelistdatamodal = function(){
    // show the update listdata modal

    var this_ = this;
    var containerid = this.containerid;
    var mindataindex = 0;
    var maxdataindex = this.data.length-1;

    function updateData(e,d){
        // check for an error
        if (e){
            alert(e);
        } else {
            //get the data index
            var index_str = d3.select("#" + modalid + 'modalbodyformdataindexinput').node().value;
            var index = parseInt(index_str);
            //update the data object
            this_.update_data(d,index);
            //update the tiles
            this_.update_containertilesdata(d,index);
        };
    };
    
    function readFile(){
        //retrieve the file
        var file1 = d3.select("#" + modalid + 'inputbuttongroupinputfile').node().files[0];
        //var file1 = this.files[0];
        //read in the file
        if (!file1) {
            alert("Failed to load file or no file chosen.");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            load_json_or_csv(file1, csv_converter, updateData);
        };
    };

    function updatelistdata_modal(){
        //read the file
        readFile();
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid + "modal").modal('hide');
    };

    //add the modal menu object
    var modalid = containerid + 'modal' + 'updatelistdatabutton';
    var modaltargetid = "#" + containerid + 'updatelistdatabutton';
    //var modaltargetid = "body";
    var menumodal = new d3_html_modal();
    menumodal.set_id(modalid);
    menumodal.set_tileid(containerid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('Update list data');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        //model like E.g.: http://www.jqueryscript.net/form/Drag-Drop-File-Upload-Dialog-with-jQuery-Bootstrap.html
        
        // data index
        var modalbodyformdataindex = this.modalbodyform
            .append("div")
            .attr("class","form-group")
            .attr("id",id+"modalbodyformdataindex")
            .append("label")
            .attr("for",id+"modalbodyformdataindexlabel")
            .text("data index")
            .append("input")
            .attr("type","number")
            .attr("class", "form-control")
            .attr("id",id+"modalbodyformdataindexinput")
            .attr("min",mindataindex)
            .attr("max",maxdataindex);
            //.attr("placeholder","Password");

        // file input button
        var modalbodyinputgroup = this.modalbodyform
            .append("div")
            .attr("class","input-group")
            .attr("id",id + 'input-group');
        var modalbodyinputbutton = modalbodyinputgroup.append("span")
            .attr("class","input-group-btn")
            .append("span")
            .attr("class","btn btn-primary btn-file")
            .append("input")
            .attr("id",id + 'inputbuttongroupinputfile')
            .attr("type","file")
            //.on("change",readFile);

        // file drag and drop

        // remove file button, file name(s), upload progress bar

        d3.select('#'+id+"modalfootersubmitbutton").on("click",updatelistdata_modal);
    };
    menumodal.add_content2modalbodyform();

    //show the modal
    $("#"+modalid + "modal").modal('show');

};
ddt_container.prototype.add_updatelistdatabutton2container = function(){
    // add an update listdata button to the container

    // add button to export all json data from the container to file
    var this_ = this;
    var containerid = this.containerid;

    function showupdatelistdatamodal(){
        this_.show_updatelistdatamodal();
    };

    this.updatelistdatabutton = this.containerheader
        .append("div")
        .attr("id", containerid + 'updatelistdatabutton')
        .attr("class","pull-left")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","update data")
    this.updatelistdatabuttontrigger = this.updatelistdatabutton
        .append("span")
        .attr("class","glyphicon glyphicon-upload pull-left ui-btn ui-btn-inline");

    this.updatelistdatabuttontrigger.on("click", showupdatelistdatamodal);
};
ddt_container.prototype.update_tileParametersFromNodes = function(start_index_I=0){
    /* 
    Udate the tile parameters based on node attributes
    tiles will be in the same order as the parameters
    INPUT:
    start_index_I = int, starting parameter index

    TODO:
    1. update each ddttable/ddtsvg parameters
    2. update each tile with ddttable/ddtsvg parameters

    */ 
    var this_ = this;
    for (var i=start_index_I;i<this.parameters.length;i++){
        // common methods to tiletypes = 'svg','table','html'
        this_.tiles[i].update_parameters();
//         this_.parameters[i] = this_.tiles[i].get_parameters();
        var tileid = this_.parameters[i].tileid;
        var tiletype = this_.parameters[i].tiletype;	
        // update tiletype-specific parameters
        if (tiletype==='svg'){
            this_.tiles[i].ddtsvg.update_parameters();
//             this_.parameters[i] = this_.tiles[i].ddtsvg.get_parameters();
        } else if (tiletype==='table'){
            this_.tiles[i].ddttable.update_parameters();
//             this_.parameters[i] = this_.tiles[i].ddttable.get_parameters();
        } else if (tiletype==='html'){
            this_.tiles[i].ddthtml.update_parameters();
//             this_.parameters[i] = this_.tiles[i].ddthtml.get_parameters();
        
        };
    };

};