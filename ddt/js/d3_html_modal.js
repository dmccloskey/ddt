"use strict";
function d3_html_modal() {
    // generic chart
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

    this.add_header2modal();
    this.add_closebutton2modalheader();
    this.add_body2modal();
    this.add_form2modalbody();
    this.add_login2modalbodyform();
    this.add_footer2modal();
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
    this.htmlmodalheader.append("h4")
        .attr("class","modal_title")
        .text(title_I);
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
        .attr("aria-hidden","true")
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
d3_html_modal.prototype.add_content2modalbodyform = function (content_I){
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