"use strict";
//var ddt_html_form_01 = function () {
function ddt_html_editor_01() {
// 	responsive HTML editor
// 	DESCRIPTION:
// 	HTML editor tile

    ddt_html.call(this);
};
ddt_html_editor_01.prototype = Object.create(ddt_html.prototype);
ddt_html_editor_01.prototype.constructor = ddt_html_editor_01;
ddt_html_editor_01.prototype.make_html = function(data_I,parameters_I){
    // make editor

	this.ddthtml = new d3_html_editor();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.set_ndatakeymap(parameters_I.htmlkeymap);}
    this.ddthtml.add_htmlfooter2tile();
	this.ddthtml.add_refreshbutton2tile();

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_form();
        this.add_textarea(
        	{"node":this.htmlform,
        	"inputarguments":this.get_htmldata1().listdatafiltered}
        	);		

		var id = this.id;
		var this_ = this;
		//TODO: add to d3_html?
		//update data upon textarea change
		this.htmltextareagroup.on("change",function(d){
			var text = document.getElementById(id + 'textarea' + d.inputlabel).value;
            var inputvalueupdate = {};
            inputvalueupdate["inputvalue"]=text;
            inputvalueupdate["inputtext"]=text; //required to persist new textarea value
            this_.get_htmldata1().update_listdata(inputvalueupdate,d.index_);
		});
        //add css
		this.set_htmlstyle();
		//this.convert_textarea2codeeditor();
    };
};
ddt_html_editor_01.prototype.update_html = function(data_I){
    // update editor
    this.ddthmtl.render();
};
ddt_html_editor_01.prototype.make_templateParameters = function(parameters_I=null){
    /*make template parameters
	INPUT:
	OUTPUT:
	data_O = {}
	*/

    var parameters_O = {
    	//tile parameters
		'tileheader':'HTML editor',
		'tiletype':'html',
		'tileid':"editor01",
		'rowid':"row1",
		'colid':"col1",
		'tileclass':"panel panel-default",
		'rowclass':"row",
		'colclass':"col-sm-6",
		//html parameters
		'htmlid':'htmleditor01',
		'htmltype':'editor_01',
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
ddt_html_editor_01.prototype.make_templateTile2Datamap = function(tileid_I='html01',dataindices_I=[0]){
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
ddt_html_editor_01.prototype.make_templateData = function(){
    /*
    make template data
	INPUT:
	OUTPUT:
	data_O = {}
    */
    // data object
	var data = {};
    data['document_name'] = 'document01';
    data['document_id'] = 'document01';
    var html = `<!DOCTYPE html>
<html>
<head>
<style>
body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
</style>
</head>
<body>

<section>
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
</section>

<details>
  <summary>Copyright 1999-2014.</summary>
  <p> - by Refsnes Data. All Rights Reserved.</p>
  <p>All content and graphics on this web site are the property of the company Refsnes Data.</p>
</details>

<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>

</body>
</html>`;
	data['inputvalue'] = html;
    data['inputtext'] = html;
    data['inputlabel'] = 'document01';
	//metadata, keys, and nestkey
	var metadata = {'inputlabel':{'datatype':'string'},'inputvalue':{'datatype':'string'},'document_name':{'datatype':'string'},'document_id':{'datatype':'string'}};
	var datakeys = ['inputlabel','inputvalue','document_name','document_id'];
	var datanestkeys = ['inputlabel'];
	//final data object
	var data_O = {'data':[data],'metadata':metadata,'datakeys':datakeys,'datanestkeys':datanestkeys};
	return data_O;    
};
