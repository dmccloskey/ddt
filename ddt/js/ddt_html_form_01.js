"use strict";
//var ddt_html_form_01 = function () {
function ddt_html_form_01() {
// 	responsive HTML form
// 	DESCRIPTION:
// 	HTML form tile
// 	utilized as a filter menu for svg and table tiles
// 	INPUT:
// 	data1 = [{}] of database rows (see d3_data)
// 	data1_keys = list of column headers to use as keys when filtering/sorting/displaying 
//		[ e.g.
// 		'experiment_id',
// 		'time_point',
// 		'sample_name_abbreviation',
// 		'dG_r',
// 		'dG_r_units'
// 		];
// 	data1_nestkeys = [ list of column headers to use as the nest keys
// 		[ e.g.
// 		'sample_name_abbreviation'
// 		];
// 	data1_keymap = { map between tile parameters and data keys
// 		{
// 		'values':'dG_r_mean',
// 		'key':'rxn_id'
// 		};
// 	data_I = [{ the data object
// 		[{
// 		"data":data1,
// 		"datakeys":data1_keys,
// 		"datanestkeys":data1_nestkeys
// 		},
// 		]
// 	parameters_I = { parameters that define the HTML and tile
// 		{
// 		HTML parameters
// 		'htmlid':'filtermenuform1',
// 		"htmltype":'form_01',
// 		"formsubmitbuttonidtext":{'id':'submit1','text':'submit'},
// 		"formresetbuttonidtext":{'id':'reset1','text':'reset'},
// 		"formupdatebuttonidtext":{'id':'update1','text':'update'}
// 		
// 		Tile parameters
// 		'tileheader':'Filter menu',
// 		'tiletype':'html',
// 		'tileid':"filtermenu1",
// 		'rowid':"row1",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};

    ddt_html.call(this);
};
ddt_html_form_01.prototype = Object.create(ddt_html.prototype);
ddt_html_form_01.prototype.constructor = ddt_html_form_01;
ddt_html_form_01.prototype.make_html = function(data_I,parameters_I){
//ddt_html_form_01.prototype.make_html = function(parameters_I){
    // make form

	this.ddthtml = new d3_html_form();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);}
	this.ddthtml.add_jsonimportandexportbutton2tile();

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_form();
        //this.add_forminput2form(); //Testing in progress...
        this.add_formgroup2form();
        this.add_label2formgroup();
        this.add_filterbuttongroup2formgroup();
        this.add_filterbutton2filterbuttongroup();
        this.add_searchbutton2filterbuttongroup();
        this.add_sortbybutton2filterbuttongroup();
        this.add_textinput2formgroup();
        //this.add_input2form();
        this.update_forminput();
        // The below code causes the application to crash
        // reason: unknown
        // hypothesis: binding of "onclick" event generates an infinite loop
        // workaround: added submitbuttons to the tile where they are not associated with any bound data
//         this.add_submitbutton2form([parameters_I.formsubmitbuttonidtext,
//         	parameters_I.formresetbuttonidtext,
//         	parameters_I.formupdatebuttonidtext]);
    };
};
ddt_html_form_01.prototype.update_html = function(data_I){
    // update form
    this.ddthmtl.render();
//     var input = data_I[0].convert_filter2stringmenuinput();
//     this.ddthtml.update_forminput(input);
};