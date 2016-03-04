"use strict";
function d3_html_popover() {
    // bootstrap popover element
    //d3_html.call(this);
    d3_html_form.call(this);
};
d3_html_popover.prototype = Object.create(d3_html_form.prototype);
d3_html_popover.prototype.constructor = d3_html_popover;
d3_html_popover.prototype.add_popovertriggerbutton = function (nodeid_I){
    // add popover trigger button to id
    //INPUT:
    //nodeid_I: = specific node id to attach the popover to

    var id = this.id;
    var this_ = this;

    if (typeof(nodeid_I)!=="undefined"){
        var tile = d3.select("#"+nodeid_I);
    } else if (this.htmlheader===null){
        var tile = this.tile;
    };
    
    this.htmlpopovertriggerbutton = tile.append("button")
        .attr("class","btn btn-primary")
        .attr("data-toggle","popover")
        .attr("data-target",id + "popover")
        .text("Show popover");
};
d3_html_popover.prototype.add_popover2tile = function (nodeid_I){
    //add a bootstrap popover element to the id
    //INPUT:
    //nodeid_I: = specific node id to attach the popover to

    var tileid = this.tileid;
    var id = this.id;
    var this_ = this;

    if (typeof(nodeid_I)!=="undefined"){
        var tile = d3.select(nodeid_I);
    } else if (this.html===null){
        var tile = this.html;
    };
    this.htmlpopover = tile.append("div")
        .attr("class","popover")
        .attr("id",id + "popover")
        .attr("aria-labelledby",id + "popover")
        .attr("tabindex","0")
        ;
};
d3_html_popover.prototype.add_header2popover = function (htmlpopover_I){
    // add header to bootstrap popover element
    // INPUT:
    // htmlpopover_I = htmlpopover node
    var id = this.id;

    if (typeof(htmlpopover_I)!=="undefined"){
        var htmlpopover = htmlpopover_I;
    } else if (this.htmlpopover!==null){
        var htmlpopover = this.htmlpopover;
    };

    this.htmlpopoverheader = htmlpopover.append("div")
        .attr("class","popover-header hide")
        .attr("id",id + "popoverheader");
};
d3_html_popover.prototype.add_title2popoverheader = function(title_I){
    //add a title to the popover header
    var id = this.id;
    this.htmlpopoverheader
        .text(title_I);
};
d3_html_popover.prototype.update_popoverheadertitle = function(title_I){
    //update the title of the popover header
    var id = this.id;
    var htmlpopoverheadertitle = d3.select("#"+id + "popoverheader");
    htmlpopoverheadertitle.text(title_I);
};
d3_html_popover.prototype.add_body2popover = function (htmlpopover_I){
    // add body to bootstrap popover element
    // INPUT:
    // htmlpopover_I = htmlpopover node
    var id = this.id;

    if (typeof(htmlpopover_I)!=="undefined"){
        var htmlpopover = htmlpopover_I;
    } else if (this.htmlpopover!==null){
        var htmlpopover = this.htmlpopover;
    };

    this.htmlpopoverbody = htmlpopover.append("div")
        .attr("class","popover-body hide")
        .attr("id",id + "popoverbody");
};
d3_html_popover.prototype.add_form2popoverbody = function (htmlpopover_I){
    // add form to popoverbody
    var id = this.id;

    this.popoverbodyform = this.htmlpopoverbody.append("form")
        .attr("role","form")
        .attr("id",id + "popoverbodyform");  
};
d3_html_popover.prototype.add_content2popoverbodyform = function (){
    // add content to the popover body form
    var id = this.id;

    var content = this.popoverbodyform
        .append("div")
        .attr("class","form-group");  
    // your code...
};
d3_html_popover.prototype.add_buttongroup2popoverbodyform = function (){
    // add button group to the popover body form
    var id = this.id;
    this.popoverbodyformbuttongroup = this.popoverbodyform
        .append("div")
        .attr("class","btn-group")
};
d3_html_popover.prototype.add_savebutton2popoverbodyformbuttongroup = function (){
    // add save button to the popover body
    var id = this.id;

    this.popoverbodysavebutton = this.popoverbodyformbuttongroup
        .append("button")
        .attr("class","btn")
        .attr("id",id+"popoverbodysavebutton")
        .attr("type","button")
        .text("Save");
};
d3_html_popover.prototype.add_discardbutton2popoverbodyformbuttongroup = function (){
    // add discard button to the popover body
    var id = this.id;

    this.popoverbodydiscardbutton = this.popoverbodyformbuttongroup
        .append("button")
        .attr("class","btn")
        .attr("id",id+"popoverbodydiscardbutton")
        .attr("type","button")
        .text("Discard");
};