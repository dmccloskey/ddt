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