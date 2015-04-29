ddt_html_form_01 = function () {
    // form tile
    ddt_html.call(this);
};
ddt_html_form_01.prototype = Object.create(ddt_html.prototype);
ddt_html_form_01.prototype.constructor = ddt_html_form_01;
ddt_html_form_01.prototype.make_html = function(data_I,parameters_I){
    // make form

	this.ddthtml = new d3_html();
	
	// general html properties
	this.set_parameters(parameters_I);
	this.set_ddthtml()
    this.add_data(data_I[0]);
    this.set_datakeymap(parameters_I.htmlkeymap);

	// html specific properties
    this.ddthtml.render = function(){
        this.add_html2tile();
        this.add_form();
        this.add_input2form();
        this.add_submitbutton2form([parameters_I.formsubmitbuttonidtext,
        parameters_I.formresetbuttonidtext,
        parameters_I.formupdatebuttonidtext]);
        //this.add_submitbutton2form(parameters_I.formresetbuttonidtext);
        //this.add_submitbutton2form(parameters_I.formupdatebuttonidtext);
    };
};
// ddt_tile_form.prototype.update_tile = function(data_I){
//     // update form
//     input = data_I[0].convert_filter2stringmenuinput();
//     this.tile.update_form(input);
// };