"use strict";
//var ddt_html_form_01 = function () {
function ddt_html_editor_01() {
// 	responsive HTML editor
// 	DESCRIPTION:
// 	HTML editor tile

    ddt_html.call(this);
};
ddt_html_editor_01.prototype = Object.create(ddt_html.prototype);
ddt_html_editor_01.prototype.constructor = ddt_html_editor_01;
ddt_html_editor_01.prototype.make_html = function(data_I,parameters_I){
    // make editor

	this.ddthtml = new d3_html_editor();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.set_ndatakeymap(parameters_I.htmlkeymap);}
	this.ddthtml.add_jsonimportandexportbutton2tile();
	this.ddthtml.add_renderhtmlbutton2footer(); //render button

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_form();
        this.add_textarea(
        	{"node":this.htmlform,
        	"inputarguments":this.get_hmtldata1().listdatafiltered}
        	);
		//this.add_button2footer(); //render button
        //add css
    };
};
ddt_html_form_01.prototype.update_html = function(data_I){
    // update editor
    this.ddthmtl.render();
};