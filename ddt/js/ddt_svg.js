"use strict";
//var ddt_svg = function(){
function ddt_svg(){
    // ddt_svg template class
    this.parameters = {};
    this.ddtsvg = null;
};
ddt_svg.prototype.set_parameters = function(parameters_I){
    // set parameters
    this.parameters = parameters_I;
};
ddt_svg.prototype.set_ddtsvg = function(){
    // set ddtsvg tileid
	var tileid_I = this.parameters.tileid;
	var id_I = this.parameters.svgid;

    this.ddtsvg.set_tileid(tileid_I);
    this.ddtsvg.set_id(id_I);
};
ddt_svg.prototype.add_data = function(data_I){
    // add data to ddtsvg
    this.ddtsvg.add_data(data_I);
};
ddt_svg.prototype.set_datakeymaps = function(set_datakeymaps_I){
    // add datakeymaps to ddtsvg
    this.ddtsvg.set_datakeymaps(set_datakeymaps_I);
};
ddt_svg.prototype.filter_data1and2stringdata = function(){
    // add data to ddtsvg
    this.ddtsvg.filter_data1and2stringdata();
};
ddt_svg.prototype.get_parameters = function(){
    // return ddtsvg parameters
	return this.parameters;
};
ddt_svg.prototype.update_parameters = function(){
    // update parameters	
	 
	this.parameters.width = this.ddtsvg.width;
	this.parameters.height = this.ddtsvg.height;
	this.parameters.margin = this.ddtsvg.margin;
	this.parameters.duration = this.ddtsvg.duration;
	this.parameters.radius = this.ddtsvg.radius;
	// others?...
};