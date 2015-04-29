ddt_html_dropdownbuttongrouphref_01 = function () {
    // dropdown button group with href tile
    ddt_html.call(this);
};
ddt_html_dropdownbuttongrouphref_01.prototype = Object.create(ddt_html.prototype);
ddt_html_dropdownbuttongrouphref_01.prototype.constructor = ddt_html_dropdownbuttongrouphref_01;
ddt_html_dropdownbuttongrouphref_01.prototype.make_html = function(data_I,parameters_I){
    // make dropdownbuttongrouphref

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I[0]);
    this.set_datakeymap(parameters_I.htmlkeymap);

	// html specific properties
	this.ddthtml.set_url(parameters_I.hrefurl);
	this.ddthtml.set_buttonliparameters(parameters_I.buttonparameter,parameters_I.liparameter);
    this.ddthtml.render = function(){
    	// permanent filter on the data
    	if (parameters_I.htmlfilters){
			this.data.change_filters(parameters_I.htmlfilters);
			this.data.filter_stringdata();
    	};
        this.add_html2tile();
		this.set_htmlstyle();
        this.add_dropdownbuttongroup_href();
    };
};