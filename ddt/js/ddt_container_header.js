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
    //TODO: this.add_newtilebutton2container();
    //TODO: this.add_tilelayoutbutton2container();
    this.add_newHTMLEditorButton2Container();
    this.add_updatelistdatabutton2container();

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
    // TODO: refactor in modal
    //       E.g.: http://www.jqueryscript.net/form/Drag-Drop-File-Upload-Dialog-with-jQuery-Bootstrap.html

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