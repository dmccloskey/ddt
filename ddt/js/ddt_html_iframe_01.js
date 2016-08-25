"use strict";
function ddt_html_iframe_01() {
// 	responsive HTML iframe
// 	DESCRIPTION:
// 	HTML iframe tile

    ddt_html.call(this);
};
ddt_html_iframe_01.prototype = Object.create(ddt_html.prototype);
ddt_html_iframe_01.prototype.constructor = ddt_html_iframe_01;
ddt_html_iframe_01.prototype.make_html = function(data_I,parameters_I){
    // make iframe

	this.ddthtml = new d3_html_editor();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml();
    this.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.set_ndatakeymap(parameters_I.htmlkeymap);}
    this.ddthtml.add_htmlfooter2tile();
	this.ddthtml.add_refreshbutton2tile();
	this.ddthtml.add_pdfexportbutton2tile();

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_iframe(
        	{"node":this.html,
        	"inputarguments":this.get_htmldata1().listdatafiltered}
        	);
		this.add_document2iframeContentWindow(
			parameters_I.iframesrcid,
			parameters_I.iframesrclabeltext
			);
		this.set_htmlstyle();
		this.set_iframestyle();
    };
};
ddt_html_iframe_01.prototype.update_html = function(data_I){
    // update form
    this.ddthmtl.render();
};
ddt_html_iframe_01.prototype.make_templateTile2Datamap = function(tileid_I='iframe01',dataindices_I=[0]){
    /*
    make template tile2datamap
	INPUT:
	OUTPUT:
	tile2datamap_O = {}
	*/

    var tile2datamap_O = {}
    tile2datamap_O[tileid_I]=dataindices_I;
    return tile2datamap_O;
    
};
ddt_html_iframe_01.prototype.make_templateParameters = function(parameters_I=null){
    /*make template parameters
	INPUT:
	OUTPUT:
	data_O = {}
	*/

    var parameters_O = {
    	//tile parameters
		'tileheader':'HTML rendor',
		'tiletype':'html',
		'tileid':"iframe01",
		'rowid':"row1",
		'colid':"col2",
		'tileclass':"panel panel-default",
		'rowclass':"row",
		'colclass':"col-sm-6",
		//html parameters
		'htmlid':'htmliframe01',
		'htmltype':'iframe_01',
		'iframeclass':"iframe-responsive",
		'iframehref':'',
		'iframeborder':0,
		'iframesrcid':'htmleditor01',
		'iframesrclabeltext':'document01',
    };
    //update the default parameters
    if (parameters_I){
    	for (var k in parameters_O){
    		if (typeof(parameters_I[k])!=="undefined"){
    			parameters_O[k]=parameters_I[k];
    		};
    	};
    };
    return parameters_O;
    
};
ddt_html_iframe_01.prototype.make_templateData = function(){
    /*
    make template data
	INPUT:
	OUTPUT:
	data_O = {}
    */

    // data object
	var data = {};
	//metadata, keys, and nestkey
	var metadata = {};
	var datakeys = [];
	var datanestkeys = [];
	//final data object
	var data_O = {'data':data,'metadata':metadata,'datakeys':datakeys,'datanestkeys':datanestkeys};
	return data_O;    
};