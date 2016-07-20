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
ddt_container.prototype.add_newtilebutton2container = function (){
    /*add button to add a new tile to the container
    */ 

    var this_ = this;
    var containerid = this.containerid;

//     function appendnewtile(){
//         this_.append_newtile();
//     };
    function shownewtilemodal(){
        this_.show_newtilemodal();
    };

    var newtilebutton = this.containerheader
        .append("div")
        .attr("class","glyphicon glyphicon-plus pull-left")
        .attr("id", containerid + 'newtilebutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","new tile");
    newtilebutton.on("click", show_newtilemodal);
};
ddt_container.prototype.show_newtilemodal = function(){
    /*show the newtile modal

    form with the following input:
    tile templates
    existing data or empty data
    input tile parameters
    */ 
    var this_ = this;

    function getpassword_modal(){
        menumodal.update_modalheadertitle('Decrypt container');
        $("#"+modalid + "modal").modal('show');
    };
    function setpassword_modal(){
            
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid + "modal").modal('hide');
    };

    //add the modal menu object
    var modalid = containerid + 'modal' + 'newtilebutton';
    var modaltargetid = "#" + containerid + 'newtilebutton';
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
    menumodal.add_title2modalheader('');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        d3.select('#'+id+"modalfootersubmitbutton").on("click",setpassword_modal);
    };
    menumodal.add_content2modalbodyform();
    getpassword_modal();

};
ddt_container.prototype.add_newHTMLEditorButton2Container = function(){
    /*
    add button to trigger adding
    an empty html editor and
    an empty html iframe for rendoring the contents of the editor
    */

    var this_ = this;
    var containerid = this.containerid;

    function addEditorAndRenderer(){
        this_.add_HTMLeditorAndRenderer();
    };

    this.HTMLEditorButton = this.containerheader
        .append("div")
        .attr("id", containerid + 'HTMLEditorButton')
        .attr("class","pull-left")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","new HTML editor")
    this.HTMLEditorButtonTrigger = this.HTMLEditorButton
        .append("span")
        //.attr("class","glyphicon glyphicon-pencil pull-left ui-btn ui-btn-inline");
        .attr("class","glyphicon glyphicon-file pull-left ui-btn ui-btn-inline");

    this.HTMLEditorButtonTrigger.on("click", addEditorAndRenderer);
};
ddt_container.prototype.add_HTMLeditorAndRenderer = function(){
    /*
    add an empty html editor and
    add an empty html iframe for rendoring the contents of the editor
    to the container
    */

    // get the last row
    var containerheadertile = this.tiles[0].tile; //object of d3_tile to call below functions
    var tileid = this.tiles[0].parameters.tileid;
    //from d3_tile:
    var parentRowNode = containerheadertile.get_parentrownode(tileid);
    var rowids = containerheadertile.get_rowidsinparentrow(tileid);
    var lastrow = rowids[rowids.length-1];
    // increment the last row id
    var lastrowidint = containerheadertile.convert_rowid2int(lastrow);
    var nextrowidint = lastrowidint + 1;
    var nextrowid = containerheadertile.make_rowidfromint(nextrowidint);
    // get the next data index
    var nextdataindex = $.extend(true, {}, {data:this.data.length});
    var nextdataindex = nextdataindex.data;
    // get the next parameters index
    var nextparameterindex = $.extend(true, {}, {data:this.parameters.length});
    var nextparameterindex = nextparameterindex.data;
    // make the default parameters and data
    var iframe = new ddt_html_iframe_01();
    var iframeParameters = iframe.make_templateParameters(
        {'rowid':nextrowid}
        );
    var iframeTile2Datamap = iframe.make_templateTile2Datamap(
        'iframe01',[nextdataindex]
        );
    var editor = new ddt_html_editor_01();
    var editorParameters = editor.make_templateParameters(
        {'rowid':nextrowid}
        );
    var editorTile2Datamap = editor.make_templateTile2Datamap(
        'editor01',[nextdataindex]
        );
    var editorData = editor.make_templateData();
    // append html editor and html iframe to the container
    this.add_tile2datamap(editorTile2Datamap);
    this.add_tile2datamap(iframeTile2Datamap);
    this.add_parameters(editorParameters);
    this.add_parameters(iframeParameters);
    this.add_data([editorData]);
    this.add_containertiles(nextparameterindex);
    this.append_containertiles(nextparameterindex);
};
