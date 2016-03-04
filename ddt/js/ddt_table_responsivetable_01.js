"use strict";
//var ddt_table_responsivetable_01 = function () {
function ddt_table_responsivetable_01() {
// 	responsive HTML table
// 	DESCRIPTION
// 	data is formatted and presented in tabular form
// 	INPUT:
// 	data1
// 	parameters_I = e.g., {
// 		SVG parameters
// 		"tabletype":'table_01',
// 		'tableid':'table1',
// 		"tablefilters":{'met_id':['glc-D','ac'],
// 		"tableheaders":['experiment_id','sample_name_abbreviation','met_id','rate_average','rate_var','rate_lb','rate_ub','rate_units','n','comment_','used_'],
// 		"tableclass":"table  table-condensed table-hover",
// 		Tile parameters
// 		'tileheader':'Uptake/secretion rates','tiletype':'table','tileid':"tile3",'rowid':"row1",'colid':"col1",
// 		'tileclass':"panel panel-default",'rowclass':"row",'colclass':"col-sm-12"
// 		};

    ddt_table.call(this);
};
ddt_table_responsivetable_01.prototype = Object.create(ddt_table.prototype);
ddt_table_responsivetable_01.prototype.constructor = ddt_table_responsivetable_01;
ddt_table_responsivetable_01.prototype.make_table = function(data_I,parameters_I){
	//

	this.ddttable = new d3_table();
	
	// general table properties
	this.set_parameters(parameters_I);
	this.set_ddttable()
    this.add_data(data_I);

	// table specific properties
    this.ddttable.set_tableclass("table table-hover");
    if (parameters_I.tableheaders){this.ddttable.set_tableheaders(parameters_I.tableheaders);}
    else {this.ddttable.extract_tableheaders();};
    this.ddttable.add_csvandjsonexportbutton2tile();
    this.ddttable.add_optionsbuttongroup2footer();
    this.ddttable.add_tablemenubutton2optionsbuttongroup();
    this.ddttable.render = function () {
    	// permanent filter on the data
    	if (parameters_I.tablefilters){
			this.data.change_filters(parameters_I.tablefilters);
			this.data.filter_listdata();
    	};
        this.add_table2tile();
        this.set_tableheader();
		this.set_tablebody();
		this.add_tableheader();
		this.add_tablebody();
		this.set_headerstyle();
		//this.set_tablerowstyle();
		this.set_tablestyle();
		this.set_cellstyle();
		//this.set_tablebodystyle();
		this.add_tablesort(parameters_I.tablesort);
		this.add_tablecolumnoptions();
		// this.set_tablecellszoom();
		//this.set_tablerowszoom();
		this.set_tablecellseditor();
    };
};