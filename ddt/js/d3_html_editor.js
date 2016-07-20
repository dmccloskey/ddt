"use strict";
function d3_html_editor() {
    // bootstrap html htmleditor element
    d3_html.call(this);
    // htmleditor specific properties
    this.htmleditorclass = null;
};
d3_html_editor.prototype = Object.create(d3_html.prototype);
d3_html_editor.prototype.constructor = d3_html_editor;
d3_html_editor.prototype.add_htmleditor2tile = function(){
    // set the htmleditor
    var id = this.id;
    var tileid = this.tileid;
    var htmleditorclass = this.htmleditorclass;
    var listdatafiltered = this.get_htmleditordata().listdatafiltered;

    this.htmleditorelement = d3.select('#'+tileid+"panel-body").selectAll(".htmleditor-responsive")
        .data([listdatafiltered]);
        //.data([0]);

    this.htmleditorenter = this.htmleditor.enter()
        .append("div")
        .attr("class","htmleditor-responsive")
        .append("textarea")
        .attr("class",htmleditorclass)
        .attr("id",id+"htmleditor");

    this.htmleditor = this.htmleditorelement.select("htmleditor")
    this.htmleditor.exit().remove();

};
d3_html_editor.prototype.set_htmleditorclass = function(htmleditorclass_I){
    // set the htmleditorid
    this.htmleditorclass = htmleditorclass_I;
};
d3_html_editor.prototype.set_htmleditorstyle = function () {
    // predefined css style for htmleditor header rows
    var htmleditorselector = "#" + this.tileid + " .htmleditor-responsive";
    var htmleditorstyle = {
        //'table-layout': 'fixed',
    	//'display': 'block',
        'width': '100%',
        'height': '100%',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        'margin-bottom': '15px',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch',
    };
    var selectorstyle = [{ 'selection': htmleditorselector, 'style': htmleditorstyle }]
    this.set_d3css(selectorstyle);
};
d3_html_editor.prototype.add_pdfexportbutton2tile = function () {
    /*add button to export the htmleditor element
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
    var export_div = this.id+"iframe";
//     var export_div = this.id + 'iframewrapper';

    var pdfexportbutton = this.htmlfooter.append("input");
    
    pdfexportbutton.attr("type", "button")
        .attr("value", "Download PDF");
    pdfexportbutton.on("click", function(d){
        return xepOnline.Formatter.Format(export_div,
        {pageWidth:'216mm', pageHeight:'279mm',
        render:'download',
        //srctype:'#document'
        srctype:'html'
        })
        });
};