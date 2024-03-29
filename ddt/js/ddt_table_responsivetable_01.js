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
    this.ddttable.add_tablecolumnunhidebutton2optionsbuttongroup();
    this.ddttable.add_refreshbutton2optionsbuttongroup();
    this.ddttable.add_tablemenubutton2optionsbuttongroup();
    //set row limits and current page
	this.ddttable.set_ntablerows(parameters_I.ntablerows);
	this.ddttable.set_tablecurrentpage(parameters_I.tablecurrentpage);
    this.ddttable.render = function () {
    	// permanent filter on the data
    	if (parameters_I.tablefilters){
			this.data.change_filters(parameters_I.tablefilters);
			this.data.filter_listdata();
    	};
		// add table navigation bar
		// responsive navgar that moves independent of the table
		this.add_tablenavbar2tile();
        this.set_tablenavbarelements();
		this.set_tablenavbar();
		this.add_tablenavbar();
		this.add_tablepagination2tablenavbar();
		this.add_tablerowlimit2tablenavbar();
        // add table to the tile
        this.add_table2tile();
        this.set_tableheader();
		this.add_tableheader();
		this.set_tablebody();
		this.add_tablebody();
// 		this.set_tablefooter();
// 		this.add_tablefooter();
		// set css style
		this.set_headerstyle();
		//this.set_tablerowstyle();
		this.set_tablestyle();
		this.set_cellstyle();
		//this.set_tablebodystyle();
		// set table header options
		this.set_tableheaderoptionsgroup();
		this.add_tablesort2tableheaderoptionsgroup();
		this.add_tablehidecolumn2tableheaderoptionsgroup();		
		//this.add_tablecolumnoptionsbutton2optionsbuttongroup(); //works
		//this.set_tablecellszoom();
		//this.set_tablerowszoom();
		this.set_tablecellseditor();
    };
};