"use strict";
function ddt_html_formquery_01() {
// 	responsive HTML form
// 	DESCRIPTION:
// 	HTML form tile
// 	utilized as a raw sql query
// 	INPUT:
// 	data1 = [{}] of database rows (see d3_data)
// 	data1_keys = list of column headers to use as keys when filtering/sorting/displaying 
//		[ e.g.
// 		'query_raw'
// 		];
// 	data1_nestkeys = [ list of column headers to use as the nest keys
// 		[ e.g.
// 		'query_raw'
// 		];
// 	data1_keymap = { map between tile parameters and data keys
// 		{
// 		'values':'',
// 		'key':''
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
// 		'htmlid':'html01',
// 		"htmltype":'formtext_01',
// 		"formsubmitbuttonidtext":{'id':'execute1','text':'execute'},
// 		
// 		Tile parameters
// 		'tileheader':'SQL Query',
// 		'tiletype':'html',
// 		'tileid':"sqlqueryform1",
// 		'rowid':"row1",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};

    ddt_html.call(this);
};
ddt_html_formquery_01.prototype = Object.create(ddt_html.prototype);
ddt_html_formquery_01.prototype.constructor = ddt_html_formquery_01;
ddt_html_formquery_01.prototype.make_html = function(data_I,parameters_I){
//ddt_html_formquery_01.prototype.make_html = function(parameters_I){
    // make form

	this.ddthtml = new d3_html_form();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.set_ndatakeymap(parameters_I.htmlkeymap);}
    
	this.ddthtml.add_postbutton2tile(parameters_I.formpostbuttonidtext);
	this.ddthtml.set_posturlbuttonmethod(parameters_I.formurl,parameters_I.formpostauthentication);
	
    this.ddthtml.add_htmlfooter2tile();
	this.ddthtml.add_jsonexportbutton2tile();
    this.ddthtml.add_jsonimportbutton2tile()

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_form();
        this.add_formgroup2form();
        this.add_label2formgroup();
        this.add_filterbuttongroup2formgroup();
        this.add_filterbutton2filterbuttongroup();
        //this.add_searchbutton2filterbuttongroup();
        this.add_sortbybutton2filterbuttongroup();
        this.add_textinput2formgroup();
        if(typeof(parameters_I.htmlalert)!=='undefined' && parameters_I.htmlalert){alert(parameters_I.htmlalert);}
        this.update_forminput();
    };
};
ddt_html_formquery_01.prototype.update_html = function(data_I){
    // update form
    this.ddthmtl.render();
};