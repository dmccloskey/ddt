"use strict";
function ddt_html_containerheader_01() {
    // container header tile with container options
    ddt_html.call(this);

    //tileparameters_I = {'tileheader':'Container options','tiletype':'html',
    //		'tileid':"containerheader",'rowid':"containerheader",'colid':"col1",
    //      'tileclass':"panel panel-default",'rowclass':"row",'colclass':"col-sm-12"};
    //containerheaderparameters_I = {'htmlid':'containerheader',
    //		"htmltype":'containerheader_0'};
};
ddt_html_containerheader_01.prototype = Object.create(ddt_html.prototype);
ddt_html_containerheader_01.prototype.constructor = ddt_html_containerheader_01;
ddt_html_containerheader_01.prototype.make_html = function(data_I,parameters_I){
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

    };
};