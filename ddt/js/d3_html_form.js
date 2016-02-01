"use strict";
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
d3_html_form.prototype.add_radioinput2form = function (labeltext_I,radioinput_I) {
    // add radio for input
    //INPUT:
    //labeltext_I = string
    //radioinput_I = [{inputtext:,inputvalue:,inputtype:'radio'},...}

    //TODO: validate the input
    var labeltext = labeltext_I;
    var radioinput = radioinput_I;

    var id = this.id;
    var inputtype = 'radio';
    var formgroupid = id + 'form-group' + labeltext_I;
    var formlabelid = id + 'formlabel' + labeltext_I;

    var radioinputgroup = d3.select('#'+formgroupid)
        .selectAll("input")
        .data(radioinput);

    radioinputgroup.exit().remove();

    radioinputgroup.transition()
        .attr("class","form-control")
        .attr("type",function(d){return d.inputtype;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'form' + d.inputtype + labeltext + d.inputtext;});

    radioinputgroupenter = radioinputgroup.enter()
        .append("input")
        .attr("class","form-control")
        .attr("type",function(d){return d.inputtype;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'form' + d.inputtype + labeltext + d.inputtext;});
};
d3_html_form.prototype.add_checkboxinput2form = function (inputarguments_I) {
    // add checkbox as input

    // handle the input
    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    // default variables
    var id = this.id;
    var this_ = this;
    var inputtype = 'checkbox';
    var labeltextdata = this.data.get_uniquevaluesFromlistdata(input.labeltext);
    var checkboxoptions = [
        {'inputtype':'checkbox','inputvalue':'toggle all','inputtext':'toggle all',}
        ]; 

    function updatefilter(){
        if (this.value==="toggle all" && this.checked){
            //check all checkboxes
            var formgroup = d3.select('#' + id + 'form-group' + input.labeltext);
            var checkboxes = formgroup.selectAll("input");
            checkboxes[0].forEach(function(d){d.checked=true;});
            //remove all data from filters
            for (var i=0;i<input.input.length;i++){
                this_.data.add_element2FiltersByKey(input.labeltext,input.input[i]['inputvalue']);                
            };

        } else if (this.value==="toggle all"){
            //uncheck check all checkboxes
            var formgroup = d3.select('#' + id + 'form-group' + input.labeltext);
            var checkboxes = formgroup.selectAll("input");
            checkboxes[0].forEach(function(d){d.checked=false;});
            //add all data to filters
            for (var i=0;i<input.input.length;i++){
                this_.data.remove_elementFromFiltersByKey(input.labeltext,input.input[i]['inputvalue']);
            };
            
        }
        if (this.checked){
            this_.data.add_element2FiltersByKey(input.labeltext,this.value);
        } else {
            this_.data.remove_elementFromFiltersByKey(input.labeltext,this.value);
            // uncheck toggle all

        };
    };

    // check box div
    var checkboxinputgroup = node
        .selectAll("div")
        .data(checkboxoptions.concat(input.input));
        //.data(input.input);

    checkboxinputgroup.exit().remove();

    var checkboxinputgroupenter = checkboxinputgroup.enter()
        .append("div")
        .attr("class","checkbox");

    // check box label
    var checkboxlabel = checkboxinputgroupenter.selectAll('label')
        .data(function(row){
            var textvalue = [];
            textvalue.push({inputtype:row.inputtype,
                inputtext:row.inputtext,
                inputvalue:row.inputvalue,
                });
            return textvalue;
        });

    checkboxlabel.exit().remove;

    checkboxlabel.transition()
        .text(function(d){return d.inputtext;});

    var checkboxlabelenter = checkboxlabel.enter()
        .append("label")
        .text(function(d){return d.inputtext;});

    // check box input
    var checkboxinput = checkboxlabel.selectAll('input')
        .data(function(row){
            var textvalue = [];
            textvalue.push({inputtype:row.inputtype,
                inputtext:row.inputtext,
                inputvalue:row.inputvalue,
                });
            return textvalue;
        });

    checkboxinput.exit().remove;

    checkboxinput.transition()
        .attr("type",function(d){return d.inputtype;})
        //.attr("class","form-control")
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'form' + d.inputtype + input.labeltext + d.inputtext;})
        .attr("checked",function(d){
            if (labeltextdata.indexOf(d.inputvalue) > -1){
                return true;
            } else {
                return false;
            };
            });

    var checkboxinputenter = checkboxinput.enter()
        .append("input")
        .attr("type",function(d){
            return d.inputtype;})
        //.attr("class","form-control")
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'form' + d.inputtype + input.labeltext + d.inputtext;})
        .attr("checked",function(d){
            if (labeltextdata.indexOf(d.inputvalue) > -1){
                return true;
            } else {
                return false;
            };
            });
    checkboxinputenter.on("click",updatefilter);
};
d3_html_form.prototype.add_colorinput2form = function () {
    // add color pallet for input
};
d3_html_form.prototype.add_rangeinput2form = function () {
    // add range slider for input
};
d3_html_form.prototype.add_textinput2form = function (forminput_I) {
    /* add text for input
    INPUT:
	forminput_I = 
        {labeltext:'sqlquery',inputtype:'text',input:[
                 {'inputtext':'sql_query','inputvalue':'','inputtype':'text','inputrows':'3'},
                ]
        },
    */

    //TODO: validate the input
    var forminput = forminput_I;
    var labeltext = forminput.labeltext;
    var textinput = forminput.input;

    var id = this.id;
    var inputtype = 'text';
    var formgroupid = id + 'form-group' + labeltext;
    var formlabelid = id + 'formlabel' + labeltext;

    var textinputgroup = d3.select('#'+formgroupid)
        .selectAll("input")
        .data(textinput);

    textinputgroup.exit().remove();

    textinputgroup.transition()
        .attr("class","form-control")
        .attr("type",function(d){return d.inputtype;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'form' + d.inputtype + labeltext + d.inputtext;});

    var textinputgroupenter = textinputgroup.enter()
        .append("input")
        .attr("class","form-control")
        .attr("type",function(d){return d.inputtype;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'form' + d.inputtype + labeltext + d.inputtext;});
};
d3_html_form.prototype.add_textareainput2form = function (inputarguments_I) {
    // add textarea as input

    // handle the input
    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    // default variables
    var id = this.id;
    var this_ = this;
    var inputtype = 'textarea';
    var formgroupid = id + 'form-group' + input.labeltext;
    var formlabelid = id + 'formlabel' + input.labeltext;

    function updatefilter(){
        //update the text
        this.textContent = this.value;
        var formgroup = d3.select('#' + id + 'form-group' + input.labeltext);
        var textarea = formgroup.selectAll("textarea");
        var key = input.labeltext;
        var values = [this.value];
        var newfilter = {};
        newfilter[key]=values;
        this_.data.change_filtersinkeys(newfilter);
    };

    var textareainputgroup = d3.select('#'+formgroupid)
        .selectAll("textarea")
        .data(input.input);

    textareainputgroup.exit().remove();

    textareainputgroup.transition()
        .attr("class","form-control")
        //.attr("placeholder",textarea_valuetext[i].value)
        .attr("rows",function(d){return d.inputrows;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        //.attr("id", function(d){return id + 'form' + d.inputtype + labeltext + d.inputtext;});
        .attr("id", function(d){return id + 'forminput' + input.labeltext;});

    var textareainputgroupenter = textareainputgroup.enter()
        .append("textarea")
        .attr("class","form-control")
        .attr("type",function(d){return d.inputtype;})
        //.attr("placeholder",textarea_valuetext[i].value)
        .attr("rows",function(d){
            return d.inputrows;
            })
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'forminput' + input.labeltext;});

    textareainputgroupenter.on("change",updatefilter);
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
d3_html_form.prototype.add_formgroup2form = function (inputarguments_I) {
    // add form group to the form
    // INPUT:
    // forminput_I = [{labeltext:,}]

    if (typeof inputarguments_I !== "undefined"){
        var inputarguments = new ddt_inputarguments();
        inputarguments.validate_inputarguments(inputarguments_I)
        var node = inputarguments.get_node();
        var forminput = inputarguments.get_inputarguments();
        }
    else{
        var node = this.htmlform;
        var forminput = this.data.convert_filter2forminput();
    };

//     if (typeof(forminput_I) !== "undefined"){
//         var forminput = forminput_I;
//     }else{
//         var forminput = this.data.convert_filter2forminput();
//     };
    
    var id = this.id;

    this.htmlformgroup = node.selectAll(".form-group")
        .data(forminput);

    this.htmlformgroupenter = this.htmlformgroup.enter()
        .append("div")
        .attr("class","form-group")
        .attr("value", function(d){return d.labeltext;})
        .attr("id",function(d){return id + 'form-group' + d.labeltext;});

    this.htmlformgroup.exit().remove();
};
d3_html_form.prototype.add_label2formgroup = function (inputarguments_I) {
    // add labels to the form groups

    if (typeof inputarguments_I !== "undefined"){
        var inputarguments = new ddt_inputarguments();
        inputarguments.validate_inputarguments(inputarguments_I)
        var node = inputarguments.get_node();
        var forminput = inputarguments.get_inputarguments();
        }
    else{
        //var node = this.htmlformgroup;
        var node = this.htmlformgroupenter;
        var forminput = this.data.convert_filter2forminput();
    };

    var id = this.id;

    this.htmlformlabel = node.selectAll("label")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,inputvalue:row.inputvalue});
            return textvalue;
        });

    this.htmlformlabelenter = this.htmlformlabel.enter()
        .append("label")
        .attr("id", function(d){return id + 'formlabel' + d.labeltext;})
        .text(function(d){return d.labeltext;})
        ;

    this.htmlformlabel.transition()
        .attr("id", function(d){return id + 'formlabel' + d.labeltext;})
        .text(function(d){return d.labeltext;})
        ;

    this.htmlformlabel.exit().remove();
};
d3_html_form.prototype.add_filterbuttongroup2formgroup = function () {
    // add filter button groups to the form groups

    var id = this.id;

    this.htmlformfilterbuttongroup = this.htmlformgroupenter.selectAll(".btn-group")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,
                inputvalue:row.inputvalue,
                inputtype:row.inputtype,
                input:row.input
                });
            return textvalue;
        });

    this.htmlformfilterbuttongroup.exit().remove();

    this.htmlformfilterbuttongroup.transition()
        .attr("class","btn-group")
        .attr("id", function(d){return id + 'formfilterbuttongroup' + d.labeltext;});

    this.htmlformfilterbuttongroupenter = this.htmlformfilterbuttongroup.enter()
        .append("div")
        .attr("class","btn-group")
        .attr("id", function(d){return id + 'formfilterbuttongroup' + d.labeltext;});
};
d3_html_form.prototype.add_filterbutton2filterbuttongroup = function (){
    // add filter button to the filter button groups

    var this_ = this;
    var id = this.id;

    function showfilterbuttonmodal(){
        // get the target id and associated filter key
        var targetnode = d3.event.target;
        //var targetid = targetnode.id;
        var targetid = targetnode.parentNode.parentNode.id;
        var key = targetnode.parentNode.parentNode.getAttribute('value');
        this_.show_filterbuttonmodal(targetid,key);
    };

    this.htmlformfilterbutton = this.htmlformfilterbuttongroup.selectAll(".glyphicon glyphicon-filter")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,
                inputvalue:row.inputvalue,
                inputtype:row.inputtype,
                input:row.input
                });
            return textvalue;
        });

    this.htmlformfilterbutton.exit().remove();

    this.htmlformfilterbutton.transition()
        .attr("class","glyphicon glyphicon-filter pull-left")
        .attr("id", function(d){return id + 'formfilterbuttongroup' + d.labeltext;});

    this.htmlformfilterbuttonenter = this.htmlformfilterbutton.enter()
        .append("div")
        .attr("class","glyphicon glyphicon-filter pull-left")
        .attr("id", function(d){return id + 'formfilterbutton' + d.labeltext;})
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","filter data");

    this.htmlformfilterbuttonenter.on("click", showfilterbuttonmodal);
};
d3_html_form.prototype.show_filterbuttonmodal = function (targetid_I,key_I) {
    // show the filter button modal element
    // INPUT:
    // targetid_I = event node button id
    // key_I = associated filter key

    var this_ = this;
    var id = this.id;

    var formgroup_I = {};
    formgroup_I['inputarguments']=this_.data.convert_filter2forminput([key_I]);

    function updatetextinput(){
        // update the filterstringmenu
        this_.update_forminput();
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid+'modal').modal('hide');
    };

    //instantiate the modal menu object
    var modaltargetid = "#" + targetid_I;
    var modalid = id+key_I;
    var menumodal = new d3_html_modal();
    menumodal.add_data([this.data]);
    menumodal.set_id(modalid);
    menumodal.set_tileid(id);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_title2modalheader('Filter by ' + key_I); //order matters (add title after close button)
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('');
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;
        var formid = id + "modalbodyform";
        formgroup_I['node_id']='#'+formid;

        this.add_forminput2form(formgroup_I);

        var modalbodyformbutton = this.modalbodyform
            .append("button")
            .attr("class","btn btn-default")
            .attr("id",id+"modalbodyformbutton")
            .text("Submit");

        modalbodyformbutton.on("click",updatetextinput)
    };
    menumodal.add_content2modalbodyform();

    // show the modal
    $("#"+modalid+'modal').modal('show');
};
d3_html_form.prototype.add_searchbutton2filterbuttongroup = function (){
    // add filter button to the filter button groups
    //TODO: add searchbox below filterbuttongroup

    var this_ = this;
    var id = this.id;

    function showsearchbuttonpopover(){
//         // get the target id and associated filter key
         var targetnode = d3.event.target;
         var targetid = targetnode.id;
         var targetid = targetnode.parentNode.parentNode.id;
         var key = targetnode.parentNode.parentNode.getAttribute('value');
         this_.show_searchbuttonpopover(targetid,key);
    };

    this.htmlformsearchbutton = this.htmlformfilterbuttongroup.selectAll(".glyphicon glyphicon-search")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,
                inputvalue:row.inputvalue,
                inputtype:row.inputtype,
                input:row.input
                });
            return textvalue;
        });

    this.htmlformsearchbutton.exit().remove();

    this.htmlformsearchbutton.transition()
        .attr("class","glyphicon glyphicon-search pull-left")
        .attr("id", function(d){return id + 'formsearchbuttongroup' + d.labeltext;});

    this.htmlformsearchbuttonenter = this.htmlformsearchbutton.enter()
        .append("div")
        .attr("class","glyphicon glyphicon-search pull-left")
        .attr("id", function(d){return id + 'formsearchbutton' + d.labeltext;})
        .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","search data")
        .attr("data-toggle","popover")
        .attr("data-placement","top")
        .attr("data-html","true")
        .attr("data-trigger","focus")
        ;

    this.htmlformsearchbuttonenter.on("click", showsearchbuttonpopover);
};
d3_html_form.prototype.show_searchbuttonpopover = function (targetid_I,key_I) {
    // show the search button popover element
    // INPUT:
    // targetid_I = event node button id
    // key_I = associated filter key

    var this_ = this;
    var id = this.id;

    var formgroup_I = {};
    formgroup_I['inputarguments']=this_.data.convert_filter2forminput([key_I]);

    function updatetextinput(){
        // update the filterstringmenu
        this_.update_forminput();
        // prevent browser default page refresh
        d3.event.preventDefault();
        $(popovertargetid).popover('hide');
    };

    //instantiate the popover menu object
    var popovertargetid = "#" + targetid_I;
    var popoverid = id+key_I;
    var menupopover = new d3_html_popover();
    menupopover.add_data([this.data]);
    menupopover.set_id(popoverid);
    menupopover.set_tileid(id);
    menupopover.add_popover2tile(popovertargetid);
    menupopover.add_header2popover();
    menupopover.add_title2popoverheader('Search');
    menupopover.add_body2popover();
    menupopover.add_form2popoverbody();
    menupopover.add_content2popoverbodyform = function (){
        // add content to the popover body form
        var id = this.id;
        var formid = id + "popoverbodyform";
        formgroup_I['node_id']='#'+formid;

        this.add_forminput2form(formgroup_I);

        var popoverbodyformbutton = this.popoverbodyform
            .append("button")
            .attr("class","btn btn-default")
            .attr("id",id+"popoverbodyformbutton")
            .text("Submit");

        popoverbodyformbutton.on("click",updatetextinput)
    };
    menupopover.add_content2popoverbodyform();

    // show the popover
    $(popovertargetid).popover({
        html: true,
        title: function () {
            return $("#"+popoverid+'popoverheader').html();
        },
        content: function () {
            return $("#"+popoverid+'popoverbody').html();
        }
    });
};
d3_html_form.prototype.add_sortbybutton2filterbuttongroup = function (){
    // add sort by to the filter button groups

    var this_ = this;
    var id = this.id;

    function sortby(){
        // get the target id and associated filter key
        var targetnode = d3.event.target;
        var key = targetnode.parentNode.parentNode.getAttribute('value');
        // sort the data
        var order = [];
        var key_dir = {};
        key_dir[key]='asc';
        order.push(key_dir);
        this_.data.order_listdatafiltered(order);
        this_.data.order_nestdatafiltered(order);
        this_.data.order_filters(order);
        //var textarea_valuetext_I = this_.data.convert_filter2stringmenuinput([key]);
        //this_.update_forminput(textarea_valuetext_I);
        this_.update_forminput();
    };

    this.htmlformsortbybutton = this.htmlformfilterbuttongroup.selectAll(".glyphicon glyphicon-sort-by-attributes")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,
                inputvalue:row.inputvalue,
                inputtype:row.inputtype,
                input:row.input
                });
            return textvalue;
        });

    this.htmlformsortbybutton.exit().remove();

    this.htmlformsortbybutton.transition()
        .attr("class","glyphicon glyphicon-sort-by-attributes pull-left")
        .attr("id", function(d){return id + 'formsortbybuttongroup' + d.labeltext;});

    this.htmlformsortbybuttonenter = this.htmlformsortbybutton.enter()
        .append("div")
        .attr("class","glyphicon glyphicon-sort-by-attributes pull-left")
        .attr("id", function(d){return id + 'formsortbybutton' + d.labeltext;})
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");

    this.htmlformsortbybuttonenter.on("click", sortby);

    function sortbyalt(){
        // get the target id and associated filter key
        var targetnode = d3.event.target;
        var key = targetnode.parentNode.parentNode.getAttribute('value');
        // sort the data
        var order = [];
        var key_dir = {};
        key_dir[key]='desc';
        order.push(key_dir);
        this_.data.order_listdatafiltered(order);
        this_.data.order_nestdatafiltered(order);
        this_.data.order_filters(order);
        //var textarea_valuetext_I = this_.data.convert_filter2stringmenuinput([key]);
        //this_.update_forminput(textarea_valuetext_I);
        this_.update_forminput();
    };

    this.htmlformsortbyaltbutton = this.htmlformfilterbuttongroup.selectAll(".glyphicon glyphicon-sort-by-attributes-alt")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,
                inputvalue:row.inputvalue,
                inputtype:row.inputtype,
                input:row.input
                });
            return textvalue;
        });

    this.htmlformsortbyaltbutton.exit().remove();

    this.htmlformsortbyaltbutton.transition()
        .attr("class","glyphicon glyphicon-sort-by-attributes-alt pull-left")
        .attr("id", function(d){return id + 'formsortbyaltbuttongroup' + d.labeltext;});

    this.htmlformsortbyaltbuttonenter = this.htmlformsortbyaltbutton.enter()
        .append("div")
        .attr("class","glyphicon glyphicon-sort-by-attributes-alt pull-left")
        .attr("id", function(d){return id + 'formsortbyaltbutton' + d.labeltext;})
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort descending");

    this.htmlformsortbyaltbuttonenter.on("click", sortbyalt);
};
d3_html_form.prototype.add_textinput2formgroup = function () {
    // add text input to the form groups
    var id = this.id;

//     this.htmlforminput = this.htmlformgroup.selectAll("textarea")
    this.htmlforminput = this.htmlformgroupenter.selectAll("input")
//     this.htmlforminput = this.htmlformgroup.selectAll("input")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,inputvalue:row.inputvalue});
            return textvalue;
        });

    this.htmlforminput.exit().remove();

    this.htmlforminput.transition()
        .attr("class","form-control")
//         .attr("rows","1")
        .attr("type","text")
        .attr("value",function(d){
            return d.inputvalue;
            })
        .attr("id", function(d){return id + 'forminput' + d.labeltext;});

    this.htmlforminputenter = this.htmlforminput.enter()
//         .append("textarea")
        .append("input")
        .attr("class","form-control")
//         .attr("rows","1")
        .attr("type","text")
        //.attr("placeholder",textarea_valuetext[i].value)
        .attr("value",function(d){
            return d.inputvalue;
            })
        .attr("id", function(d){return id + 'forminput' + d.labeltext;});
};
d3_html_form.prototype.add_forminput2form = function (inputarguments_I) {
    /* add text area for input
    INPUT:
    INPUT TYPES:
        http://www.w3schools.com/tags/att_input_type.asp
        color
        date
        datetime
        datetime-local
        email
        month
        number
        range
        search
        tel
        time
        url
        week
     */

    if (typeof inputarguments_I !== "undefined"){
        var inputarguments = new ddt_inputarguments();
        inputarguments.validate_inputarguments(inputarguments_I)
        var node = inputarguments.get_node();
        var forminput = inputarguments.get_inputarguments();
        }
    else{
        var node = this.htmlformenter;
        var forminput = this.data.convert_filter2forminput();
    };

    var id = this.id;

    //add formgroups with labels
    this.add_formgroup2form(inputarguments_I);
    this.add_label2formgroup({'node':this.htmlformgroupenter,'inputarguments':forminput});

    //add individual form input elements
    for (var i=0; i<forminput.length; i++){
        var nodeid = '#'+this.htmlformgroup[i][0].id
        if (forminput[i].inputtype === 'textarea'){
            this.add_textareainput2form({'node_id':nodeid,'inputarguments':forminput[i]});
        } else if (forminput[i].inputtype === 'text') {
            this.add_textinput2form(forminput[i]);
        } else if (forminput[i].inputtype === 'radio') {
            this.add_radioinput2form(forminput[i]);
        } else if (forminput[i].inputtype === 'checkbox') {
            this.add_checkboxinput2form({'node_id':nodeid,'inputarguments':forminput[i]});
        } else if (forminput[i].inputtype === 'range') {
            this.add_rangeinput2form(forminput[i]);
        } else if (forminput[i].inputtype === 'color') {
            this.add_colorinput2form(forminput[i]);
        } else if (forminput[i].inputtype === 'time') { //TODO
            this.add_timeinput2form(forminput[i]);
        } else if (forminput[i].inputtype === 'datetime') { //TODO
            this.add_datetimeinput2form(forminput[i]);
        } else {
            console.log('inputtype not recognized.');
            console.log('defaulting to text input.');
            this.add_textinput2form(forminput[i]);
        };
    };
};
d3_html_form.prototype.add_input2form = function (textarea_valuetext_I) {
    // add text area for input
    // INPUT:
    //TODO: refactor into a general function to call individual
    //      input elements, e.g., text, ...
    //      http://www.w3schools.com/tags/att_input_type.asp
    if (typeof texarea_valuetext_I !== "undefined"){
        var textarea_valuetext = textarea_valuetext_I;
        }
    //else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};
    else{
        var textarea_valuetext = this.data.convert_filter2forminput();
    };    

    var id = this.id;

    this.htmlformgroup = this.htmlformenter.selectAll(".form-group")
        .data(textarea_valuetext);

    this.htmlformgroupenter = this.htmlformgroup.enter()
        .append("div")
        .attr("class","form-group")
        .attr("id", id + 'form-group');

    this.htmlformgroup.exit().remove();

    this.htmlformlabel = this.htmlformgroup.selectAll("label")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,inputvalue:row.inputvalue});
            return textvalue;
        });

    this.htmlformlabelenter = this.htmlformlabel.enter()
        .append("label")
        .attr("id", function(d){return id + 'formlabel' + d.labeltext;})
        .text(function(d){return d.labeltext;});

    this.htmlformlabel.transition()
        .attr("id", function(d){return id + 'formlabel' + d.labeltext;})
        .text(function(d){return d.labeltext;});

    this.htmlformlabel.exit().remove();

//     this.htmlforminput = this.htmlformgroup.selectAll("textarea")
    this.htmlforminput = this.htmlformgroup.selectAll("input")
        .data(function(row){
            var textvalue = [];
            textvalue.push({labeltext:row.labeltext,inputvalue:row.inputvalue});
            return textvalue;
        });

    this.htmlforminput.exit().remove();

    this.htmlforminput.transition()
        .attr("class","form-control")
//         .attr("rows","1")
        .attr("type","text")
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'forminput' + d.labeltext;});

    this.htmlforminputenter = this.htmlforminput.enter()
//         .append("textarea")
        .append("input")
        .attr("class","form-control")
//         .attr("rows","1")
        .attr("type","text")
        //.attr("placeholder",textarea_valuetext[i].value)
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'forminput' + d.labeltext;});
};
d3_html_form.prototype.update_forminput = function(textarea_valuetext_I){
    // update the form
    if (typeof texarea_valuetext_I !== "undefined"){var textarea_valuetext = textarea_valuetext_I;}
    //else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};
    else{var textarea_valuetext = this.data.convert_filter2forminput();};
    var id = this.id;

    for (var i=0;i<textarea_valuetext.length;i++){
        var node = d3.select("#"+id + 'forminput'+ textarea_valuetext[i].labeltext).node();
        if (node){node.value=textarea_valuetext[i].inputvalue;};
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
d3_html_form.prototype.add_postbutton2tile = function (button_idtext_I) {
    // add submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'}
    if (!button_idtext_I){var button_idtext = {'id':'post1','text':'post'};}
    else{var button_idtext = button_idtext_I;}

    var id = this.id;
    var tileid = this.tileid;

    this.postbutton = d3.select('#'+this.tileid+"panel-footer").selectAll(".btn btn-default")
        .data([button_idtext])

    this.postbutton.exit().remove;

    this.postbutton.transition()
        .attr("type","submit")
        .attr("class", "btn btn-default")
        .attr("id", function(d){return id + 'postbutton' + d.id;})
        .text(function(d){return d.text;});

    this.postbuttonenter = this.postbutton.enter()
        .append("button")
        .attr("type","submit")
        .attr("class", "btn btn-default")
        .attr("id", function(d){return id + 'posttbutton' + d.id;})
        .text(function(d){return d.text;});
};
d3_html_form.prototype.set_postbuttonmethod = function (url_I){
    // add post url and arguments
    //INPUT:
    //url_I = string, base url, e.g., 'SQLQuery'
    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    function post(){
        this_.post_query(url_I);
    };

    this.postbuttonenter.on("click",post);
};
d3_html_form.prototype.post_query = function(url_I){
    // post query

    var id = this.id;
    var tileid = this.tileid;
    var filterstringmenu = [];
    for (var key in this.data.filters){
        var filterkey = d3.select("#"+id+'formlabel'+key).text();
        var filterstring = d3.select("#"+id+'forminput'+key).node().value;
        filterstringmenu.push({"labeltext":filterkey,"inputvalue":filterstring});
    };
    //this.data.convert_stringmenuinput2filter(filterstringmenu);

    var url = url_I + '.html';
    url += '?';
    for (var i = 0, l = filterstringmenu.length; i < l; i++) {
        if (i > 0) url += '&';
        url += filterstringmenu[i]['labeltext'] + '=' + filterstringmenu[i]['inputvalue'];
    };
    window.location.href = url;

};