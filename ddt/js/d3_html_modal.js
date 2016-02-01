"use strict";
function d3_html_modal() {
    // bootstrap modal element
    //d3_html.call(this);
    d3_html_form.call(this);
};
d3_html_modal.prototype = Object.create(d3_html_form.prototype);
d3_html_modal.prototype.constructor = d3_html_modal;
d3_html_modal.prototype.add_modaltriggerbutton = function (nodeid_I){
    // add modal trigger button to id
    //INPUT:
    //nodeid_I: = specific node id to attach the modal to

    var id = this.id;
    var this_ = this;

    if (typeof(nodeid_I)!=="undefined"){
        var tile = d3.select("#"+nodeid_I);
    } else if (this.htmlheader===null){
        var tile = this.tile;
    };
    
    this.htmlmodaltriggerbutton = tile.append("button")
        .attr("class","btn btn-primary")
        .attr("data-toggle","modal")
        .attr("data-target",id + "modal")
        .text("Show modal");
};
d3_html_modal.prototype.add_modal2tile = function (nodeid_I){
    //add a bootstrap modal element to the id
    //INPUT:
    //nodeid_I: = specific node id to attach the modal to

    var tileid = this.tileid;
    var id = this.id;
    var this_ = this;

    if (typeof(nodeid_I)!=="undefined"){
        //var tile = d3.select("#"+nodeid_I);
        var tile = d3.select(nodeid_I);
    } else if (this.html===null){
        var tile = this.html;
    };
    this.htmlmodal = tile.append("div")
        .attr("class","modal fade")
        .attr("id",id + "modal")
        .attr("tabindex","-1")
        .attr("role","dialog")
        .attr("aria-labelledby",id + "modal")
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
    var id = this.id;

    if (typeof(htmlmodal_I)!=="undefined"){
        var htmlmodal = htmlmodal_I;
    } else if (this.htmlmodal!==null){
        var htmlmodal = this.htmlmodal;
    };

    this.htmlmodalheader = htmlmodal.append("div")
        .attr("class","modal-header")
        .attr("id",id + "modalheader");
};
d3_html_modal.prototype.add_title2modalheader = function(title_I){
    //add a title to the modal header
    var id = this.id;
    this.htmlmodalheader.append("h4")
        .attr("class","modal-title")
        .attr("id",id + "modalheadertitle")
        .text(title_I);
};
d3_html_modal.prototype.update_modalheadertitle = function(title_I){
    //update the title of the modal header
    var id = this.id;
    var htmlmodalheadertitle = d3.select("#"+id + "modalheadertitle");
    htmlmodalheadertitle.text(title_I);
};
d3_html_modal.prototype.add_closebutton2modalheader = function(){
    // add a close button to the modal header
    var id = this.id;
    var this_ = this;

    var modalheaderclosebutton = this.htmlmodalheader.append("button")
        .attr("type","button")
        .attr("class","close")
        .attr("id",id+"modalheaderclosebutton")
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
    var id = this.id;

    if (typeof(htmlmodal_I)!=="undefined"){
        var htmlmodal = htmlmodal_I;
    } else if (this.htmlmodal!==null){
        var htmlmodal = this.htmlmodal;
    };

    this.htmlmodalbody = htmlmodal.append("div")
        .attr("class","modal-body")
        .attr("id",id + "modalbody");
};
d3_html_modal.prototype.add_form2modalbody = function (htmlmodal_I){
    // add form to modalbody
    var id = this.id;

    this.modalbodyform = this.htmlmodalbody.append("form")
        .attr("role","form")
        .attr("id",id + "modalbodyform");  
};
d3_html_modal.prototype.add_content2modalbodyform = function (){
    // add content to the modal body form
    var id = this.id;

    var content = this.modalbodyform
        .append("div")
        .attr("class","form-group");  
    // your code...
};
d3_html_modal.prototype.add_login2modalbodyform = function (login_I){
    // add content to the modal body form
    var id = this.id;

    var modalbodyformusername = this.modalbodyform
        .append("div")
        .attr("class","form-group")
        .attr("id",id+"modalbodyformusername")
        .append("label")
        .attr("for",id+"modalbodyformusernameinput")
        .text("Username")
        .append("input")
        .attr("type","text")
        .attr("class", "form-control")
        .attr("id",id+"modalbodyformusernameinput")
        .attr("placeholder","Username");

    var modalbodyformpassword = this.modalbodyform
        .append("div")
        .attr("class","form-group")
        .attr("id",id+"modalbodyformpassword")
        .append("label")
        .attr("for",id+"modalbodyformpasswordinput")
        .text("Password")
        .append("input")
        .attr("type","password")
        .attr("class", "form-control")
        .attr("id",id+"modalbodyformpasswordinput")
        .attr("placeholder","Password");

    var modalbodyformcheckbox = this.modalbodyform
        .append("div")
        .attr("class","checkbox")
        .attr("id",id+"modalbodyformcheckbox")
        .append("label")
        .append("input")
        .attr("type","checkbox")
        .text("Remember me")
        .attr("id",id+"modalbodyformcheckboxinput");

    var modalbodyformbutton = this.modalbodyform
        .append("button")
        .attr("class","btn btn-default")
        .attr("id",id+"modalbodyformbutton")
        .attr("type","submit")
        .text("Submit");
};
d3_html_modal.prototype.add_footer2modal = function (htmlmodal_I){
    // add footer to bootstrap modal element
    // INPUT:
    // htmlmodal_I = htmlmodal node
    var id = this.id;
    
    if (typeof(htmlmodal_I)!=="undefined"){
        var htmlmodal = htmlmodal_I;
    } else if (this.htmlmodal!==null){
        var htmlmodal = this.htmlmodal;
    };

    this.htmlmodalfooter = htmlmodal.append("div")
        .attr("class","modal-footer")
        .attr("id",id + "modalfooter");
};
d3_html_modal.prototype.add_savebutton2modalfooter = function (){
    // add save button to the modal body footer
    var id = this.id;

    var modalfootersavebutton = this.htmlmodalfooter
        .append("button")
        .attr("class","btn btn-primary")
        .attr("id",id+"modalfootersavebutton")
        .attr("type","button")
        .text("Save changes");
};
d3_html_modal.prototype.add_submitbutton2modalfooter = function (){
    // add save button to the modal body footer
    var id = this.id;

    var modalfootersavebutton = this.htmlmodalfooter
        .append("button")
        .attr("class","btn btn-primary")
        .attr("id",id+"modalfootersubmitbutton")
        .attr("type","button")
        .text("Submit");
};