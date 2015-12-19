"use strict";
//var ddt_table_responsivecrosstable_01 = function () {
function ddt_table_responsivecrosstable_01() {
// 	responsive HTML cross table
// 	DESCRIPTION
// 	data is formatted and presented in tabular form
// 	INPUT:
// 	data1

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
		this.add_tablesort(parameters_I.tablesort);
    };
}