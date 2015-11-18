"use strict";
//var ddt_html_escher_01 = function () {
function ddt_html_escher_01() {
// 	Embedded escher map
// 	DESCRIPTION:
// 	Embedded escher map
// 	INPUT:
// 	Data1 = rxns
// 	Data2 = metabolites
// 	Data3 = genes
// 	data1_keymap = {
// 		'values':'dG_r_mean',
// 		'key':'rxn_id'
// 		};
// 	data2_keymap = {
// 		'values':'concentration',
// 		'key':'met_id'
// 		};
// 	parameters_I = {
// 		HTML parameters
// 		"htmlkeymap":[data1_keymap,data2_keymap],
// 		'htmltype':'escher_01','htmlid':'html1',
// 		'escherdataindex':{"reactiondata":0,"metabolitedata":1,"mapdata":2},
// 		'escherembeddedcss':None,
// 		'escheroptions':None
// 		Tile paramters
// 		'tileheader':'Escher map',
// 		'tiletype':'html',
// 		'tileid':"tile1",
// 		'rowid':"row3",
// 		'colid':"col1",
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-12"
// 		};


    ddt_html.call(this);
};
ddt_html_escher_01.prototype = Object.create(ddt_html.prototype);
ddt_html_escher_01.prototype.constructor = ddt_html_escher_01;
ddt_html_escher_01.prototype.make_html = function(data_I,parameters_I){
    // make href

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()

	// html specific properties
    this.ddthtml.add_ndata(data_I);
    if (parameters_I.htmlkeymap){this.ddthtml.set_ndatakeymap(parameters_I.htmlkeymap);}
	this.ddthtml.set_escher(parameters_I.escherdataindex,parameters_I.escherembeddedcss,parameters_I.escheroptions)
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (typeof parameters_I.htmlfilters != "undefined"){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_listdata();
    	};
        this.add_html2tile();
		this.set_htmlescherstyle();
        this.add_escher();
    };
};