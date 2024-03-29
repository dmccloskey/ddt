"use strict";
//var ddt_html = function(){
function ddt_html(){
    // ddt_html template class
    this.parameters = {};
    this.ddthtml = null;
};
ddt_html.prototype.set_parameters = function(parameters_I){
    // set html parameters
    this.parameters = parameters_I;
};
ddt_html.prototype.set_ddthtml = function(){
    // set ddthtml tileid
	var tileid_I = this.parameters.tileid;
	var id_I = this.parameters.htmlid;

    this.ddthtml.set_tileid(tileid_I);
    this.ddthtml.set_id(id_I);
};
ddt_html.prototype.add_data = function(data_I){
    // add data to ddthtml
    this.ddthtml.add_data(data_I);
};
ddt_html.prototype.set_datakeymap = function(datakeymap_I){
    // add data to ddthtml
    this.ddthtml.set_datakeymap(datakeymap_I);
};
ddt_html.prototype.add_ndata = function(data_I){
    // add data to ddthtml
    this.ddthtml.add_ndata(data_I);
};
ddt_html.prototype.set_ndatakeymap = function(datakeymap_I){
    // add data to ddthtml
    this.ddthtml.set_ndatakeymap(datakeymap_I);
};
ddt_html.prototype.get_parameters = function(){
    // return ddthtml parameters
	return this.parameters;
};
ddt_html.prototype.update_parameters = function(){
    // return ddthtml parameters
	
	// update the 
    this.parameters.htmlclass = this.ddthtml.htmlclass;
    this.parameters.htmlheaders = this.ddthtml.htmlheaders;
	// others?...
};