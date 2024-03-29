"use strict";
//var ddt_table = function(){
function ddt_table(){
    // ddt_table template class
    this.parameters = {};
    this.ddttable = null;
};
ddt_table.prototype.set_parameters = function(parameters_I){
    // set ddttable parameters
    this.parameters = parameters_I;
};
ddt_table.prototype.set_ddttable = function(){
    // set ddttable tileid
	var tileid_I = this.parameters.tileid;
	var id_I = this.parameters.tableid;

    this.ddttable.set_tileid(tileid_I);
    this.ddttable.set_id(id_I);
};
ddt_table.prototype.add_data = function(data_I){
    // add data to ddttable
    this.ddttable.add_data(data_I[0]);
};
ddt_table.prototype.set_datakeymaps = function(datakeymaps_I){
    // add datakeymap to ddttable
    this.ddttable.set_datakeymaps(datakeymaps_I);
};
ddt_table.prototype.get_parameters = function(){
    // return ddttable parameters
	return this.parameters;
};
ddt_table.prototype.update_parameters = function(){
    // return ddttable parameters
    	
	// update the table headers, row #s, and current page
	this.parameters.tableheaders = this.ddttable.tableheaders;
	this.parameters.ntablerows = this.ddttable.ntablerows;
	this.parameters.tablecurrentpage = this.ddttable.tablecurrentpage;
	this.parameters.tablesearch = this.ddttable.tablesearch;
    this.parameters.tableclass = this.ddttable.tableclass;
};