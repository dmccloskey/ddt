"use strict";
function ddt_html_iframe_01() {
// 	responsive HTML iframe
// 	DESCRIPTION:
// 	HTML iframe tile

    ddt_html.call(this);
};
ddt_html_iframe_01.prototype = Object.create(ddt_html.prototype);
ddt_html_iframe_01.prototype.constructor = ddt_html_iframe_01;
ddt_html_iframe_01.prototype.make_html = function(data_I,parameters_I){
    // make iframe

	this.ddthtml = new d3_html_editor();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.set_ndatakeymap(parameters_I.htmlkeymap);}
    this.ddthtml.add_htmlfooter2tile();
	this.ddthtml.add_refreshbutton2tile();
	this.ddthtml.add_pdfexportbutton2tile();

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_iframe(
        	{"node":this.html,
        	"inputarguments":this.get_hmtldata1().listdatafiltered}
        	);
		this.add_document2iframeContentWindow(
			parameters_I.iframesrcid_I,
			parameters_I.iframesrclabeltex_I
			);
    };
};
ddt_html_form_01.prototype.update_html = function(data_I){
    // update form
    this.ddthmtl.render();
};