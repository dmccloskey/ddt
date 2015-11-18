"use strict";
//var ddt_html_media_01 = function () {
function ddt_html_media_01() {
// 	responsive HTML media
// 	DESCRIPTION:
// 	responsive HTML media
// 	INPUT:
// 	data2 = [{}] of data objects (see d3_data)
// 	data2_keys = 
// 		[
// 		'project_id',
// 		'project_section',
// 		'project_heading',
// 		'project_tileorder'
// 		];
// 	data2_nestkeys = 
// 		[
// 		'project_id'
// 		];
// 	data2_keymap = 
// 		{
// 		'htmlmediasrc':'project_media',
// 		'htmlmediaalt':'',
// 		'htmlmediahref':'project_href',
// 		'htmlmediaheading':'project_heading',
// 		'htmlmediaparagraph':'project_paragraph'
// 		};
// 	data_I = 
// 		[{
// 		"data":data2,
// 		"datakeys":data2_keys,
// 		"datanestkeys":data2_nestkeys
// 		}];
// 	parameters_I = 
// 		{
// 		HTML parameters
// 		"htmlkeymap":[data2_keymap],
// 		'htmltype':'media_01',
// 		'htmlid':htmlid,
// 		Tile parameters
// 		'tileheader':tileheader,
// 		'tiletype':'html',
// 		'tileid':tileid,
// 		'rowid':"row1",
// 		'colid':colid,
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};


    ddt_html.call(this);
};
ddt_html_media_01.prototype = Object.create(ddt_html.prototype);
ddt_html_media_01.prototype.constructor = ddt_html_media_01;
ddt_html_media_01.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I);
    if (parameters_I.htmlkeymap){this.set_datakeymap(parameters_I.htmlkeymap);}

	// html specific properties
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters != "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_mediasvg();
    };
};