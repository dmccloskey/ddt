"use strict";
function d3_htmltextpad() {
    // bootstrap html htmltextpad element
    d3_html.call(this);
    // htmltextpad specific properties
    this.htmltextpadclass = null;
};
d3_htmltextpad.prototype = Object.create(d3_html.prototype);
d3_htmltextpad.prototype.constructor = d3_htmltextpad;

d3_htmltextpad.prototype.add_htmltextpad2tile = function(){
    // set the htmltextpad
    var id = this.id;
    var tileid = this.tileid;
    var htmltextpadclass = this.htmltextpadclass;
    var listdatafiltered = this.get_htmltextpaddata().listdatafiltered;

    this.htmltextpadelement = d3.select('#'+tileid+"panel-body").selectAll(".htmltextpad-responsive")
        .data([listdatafiltered]);
        //.data([0]);

    this.htmltextpadenter = this.htmltextpad.enter()
        .append("div")
        .attr("class","htmltextpad-responsive")
        .append("htmltextpad")
        .attr("class",htmltextpadclass)
        .attr("id",id+"htmltextpad");

    this.htmltextpad = this.htmltextpadelement.select("htmltextpad")
    this.htmltextpad.exit().remove();

};
d3_htmltextpad.prototype.set_htmltextpadclass = function(htmltextpadclass_I){
    // set the htmltextpadid
    this.htmltextpadclass = htmltextpadclass_I;
};
d3_htmltextpad.prototype.get_htmltextpaddata = function(){
    /* get the htmltextpad data
    data displayed on the htmltextpad will always be index 0
    all other data will be index 1 to n indices
    */
    return this.data[0];
}
d3_htmltextpad.prototype.set_htmltextpadstyle = function () {
    // predefined css style for htmltextpad header rows
    var htmltextpadselector = "#" + this.tileid + " .htmltextpad-responsive";
    var htmltextpadstyle = {
        //'table-layout': 'fixed',
    	//'display': 'block',
        'width': '100%',
        'height': '500px',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        'margin-bottom': '15px',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch',
    };
    var selectorstyle = [{ 'selection': htmltextpadselector, 'style': htmltextpadstyle }]
    this.set_d3css(selectorstyle);
};
d3_htmltextpad.prototype.add_pdfexportbutton2tile = function () {
    /*add button to export the htmltextpad element
    https://github.com/Xportability/css-to-pdf
    http://www.cloudformatter.com/css2pdf



    */ 

    // PDF formater options
    var xepFormatOptions = [];
    // A4 letter size (216mm x 279mm) output
    xepFormatOptions.push({pageWidth:'216mm', pageHeight:'279mm'});
    // download
    xepFormatOptions.push({render:'download'});

    // Export div
    var export_div = this.id+"htmltextpad";

    var exportbutton = d3.select('#'+this.tileid+"panel-footer").append("form")
        .attr("class","form-group")
        .append("div")
        .attr("class","btn-group");

    var pdfexportbutton_input = exportbutton.append("input");
    pdfexportbutton_input.attr("type", "button")
        .attr("value", "Download PDF");
    //pdfexportbutton_input.on("click", "return xepOnline.Formatter.Format('Usage');");
    pdfexportbutton_input.on("click", xepOnline.Formatter.Format('Usage',
        {pageWidth:'216mm', pageHeight:'279mm'},
        {render:'download'}
        ));
};


// <script src="//raw.githubusercontent.com/Xportability/css-to-pdf/master/js/xepOnline.jqPlugin.js"></script> 
