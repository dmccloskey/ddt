"use strict";
//var ddt_table_responsivecrosstable_01 = function () {
function ddt_table_responsivecrosstable_01() {
// 	responsive HTML cross table
// 	DESCRIPTION
// 	data is formatted and presented in tabular form
// 	INPUT:
// 	data1 = [{},...]
// 	data1_keys = [
// 		'analysis_id',
// 		'experiment_id',
// 		'sample_name_abbreviation',
// 		'sample_name_short',
// 		'component_group_name',
// 		'component_name',
// 		'time_point',
// 		'calculated_concentration_units'
// 	];
// 	data1_nestkeys = [
// 		'component_name', //row label
// 		'sample_name_short' //column label
// 	];
// 	data1_keymap = {
// 		'xdata':'sample_name_short',
// 		'ydata':'component_name',
// 		'zdata':'calculated_concentration',
// 		'rowslabel':'component_name',
// 		'columnslabel':'sample_name_short',
// 	};
// 	data_I = [
// 		{"data":data_points_1,"datakeys":data1_keys,"datanestkeys":data1_nestkeys}
// 	];
// 	parameters_I = {
// 		//Table parameters
// 		"tabletype":'responsivecrosstable_01',
// 		"tablekeymap":[data1_keymap],
// 		'tableid':'table1',
// 		"tablefilters":None,
// 		"tableclass":"table  table-condensed table-hover",
// 		//Tile parameters
// 		'tileheader':'Cross Table',
// 		'tiletype':'table',
// 		'tileid':"tile3",
// 		'rowid':"row2",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 	};

    ddt_table.call(this);
};
ddt_table_responsivecrosstable_01.prototype = Object.create(ddt_table.prototype);
ddt_table_responsivecrosstable_01.prototype.constructor = ddt_table_responsivecrosstable_01;
ddt_table_responsivecrosstable_01.prototype.make_table = function(data_I,parameters_I){
	//

	this.ddttable = new d3_table();
	
	// general table properties
	this.set_parameters(parameters_I);
	this.set_ddttable()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.tablekeymap);

	// table specific properties
    this.ddttable.set_tableclass("table table-hover");
    this.ddttable.add_crosstablecsvandjsonexportbutton2tile();
    this.ddttable.add_optionsbuttongroup2footer();
    this.ddttable.add_refreshbutton2optionsbuttongroup();
    this.ddttable.add_tablemenubutton2optionsbuttongroup();
    this.ddttable.render = function () {
    	// permanent filter on the data
    	if (parameters_I.tablefilters){
			this.data.change_filters(parameters_I.tablefilters);
			this.data.filter_listdata();
    	};
		this.extract_crosstableheaders();
        this.add_table2tile();
        this.set_tableheader();
		this.set_crosstablebody();
		this.add_tableheader();
		this.add_crosstablebody();
		this.set_tablestyle();
		this.set_headerstyle();
		this.set_cellstyle();
		//this.add_tablesort(parameters_I.tablesort);
    };
}