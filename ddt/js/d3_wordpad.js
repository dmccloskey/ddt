"use strict";
function d3_wordpad() {
    // bootstrap html wordpad element
    d3_html.call(this);
    // wordpad specific properties
    this.wordpadclass = null;
};
d3_wordpad.prototype = Object.create(d3_html.prototype);
d3_wordpad.prototype.constructor = d3_wordpad;

d3_wordpad.prototype.add_wordpad2tile = function(){
    // set the wordpad
    var id = this.id;
    var tileid = this.tileid;
    var wordpadclass = this.wordpadclass;
    var listdatafiltered = this.get_wordpaddata().listdatafiltered;

    this.wordpadelement = d3.select('#'+tileid+"panel-body").selectAll(".wordpad-responsive")
        .data([listdatafiltered]);
        //.data([0]);

    this.wordpadenter = this.wordpad.enter()
        .append("div")
        .attr("class","wordpad-responsive")
        .append("wordpad")
        .attr("class",wordpadclass)
        .attr("id",id+"wordpad");

    this.wordpad = this.wordpadelement.select("wordpad")
    this.wordpad.exit().remove();

};
d3_wordpad.prototype.set_wordpadclass = function(wordpadclass_I){
    // set the wordpadid
    this.wordpadclass = wordpadclass_I;
};
d3_wordpad.prototype.get_wordpaddata = function(){
    /* get the wordpad data
    data displayed on the wordpad will always be index 0
    all other data will be index 1 to n indices
    */
    return this.data[0];
}
d3_wordpad.prototype.set_wordpadstyle = function () {
    // predefined css style for wordpad header rows
    var wordpadselector = "#" + this.tileid + " .wordpad-responsive";
    var wordpadstyle = {
        //'wordpad-layout': 'fixed',
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': wordpadselector, 'style': wordpadstyle }]
    this.set_d3css(selectorstyle);
};
d3_wordpad.prototype.add_pdfexportbutton2tile = function () {
    /*add button to export the wordpad element
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
    var export_div = this.id+"wordpad";

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
