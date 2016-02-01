"use strict";
function ddt_html_href_02() {
// 	href data list with a submit button
// 	DESCRIPTION:
// 	href data list with a submit button
// 	INPUT:
// 	data1 = [{}] list of data objects (see d3_data)
// 	data1_keys = 
// 		['analysis_id',
// 		'data_export_id',
// 		'pipeline_id'
// 		];
// 	data1_nestkeys = 
// 		[
// 		'data_export_id'
// 		];
// 	data1_keymap = 
// 		{
// 		'buttonparameter':'data_export_id',
// 		'liparameter':'analysis_id',
// 		'buttontext':'data_export_id',
// 		'litext':'analysis_id'
// 		};
// 	data_I = 
// 		[{
// 		"data":data1,
// 		"datakeys":data1_keys,
// 		"datanestkeys":data1_nestkeys
// 		});
// 	parameters_I = 
// 		{
// 		HTML parameters
// 		"hrefurl":'project.html',
// 		"htmlkeymap":[data1_keymap],
// 		'htmltype':'href_02',
// 		'htmlid':htmlid,
// 		"formsubmitbuttonidtext":{'id':'submit1','text':'submit'},
// 		Tile parameters
// 		'tileheader':tileheader,
// 		'tiletype':'html',
// 		'tileid':tileid,
// 		'rowid':"row2",
// 		'colid':colid,
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"};
                
    ddt_html.call(this);
};
ddt_html_href_02.prototype = Object.create(ddt_html.prototype);
ddt_html_href_02.prototype.constructor = ddt_html_href_02;
ddt_html_href_02.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);};

	// html specific properties
	this.ddthtml.set_url(parameters_I.hrefurl);
	if (parameters_I.formsubmitbuttonidtext){this.ddthtml.set_formsubmitbuttonidtext(parameters_I.formsubmitbuttonidtext)};
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters !== "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_headeranddatalist_href();
        //this.add_dropdownbuttongroup_href();
        if (parameters_I.formsubmitbuttonidtext){this.add_headeranddatalistsubmit_href()};
    };
};