"use strict";
//var ddt_tile = function(){
function ddt_tile(){
    // ddt_tile class
    // a generic data driven tile
    this.parameters = {};
    this.tile = null;
};
ddt_tile.prototype.set_parameters = function(parameters_I){
    // set input tile parameters
    if (parameters_I){this.parameters = parameters_I;}
    else {this.parameters = {tileid:"tile1",rowid:"row1",colid:"col1",
        tileclass:"panel panel-default",rowclass:"row",colclass:"col-sm-12"};};
    
};
ddt_tile.prototype.get_parameters = function(){
    // get tile parameters
    return this.parameters;
    
};
ddt_tile.prototype.update_parameters = function(){
    // update input tile parameters
    
	var tileid = this.tile.tileid;
	var tiletype = this.tile.tiletype;
	// update the row/col ids
	var colNode = this.tile.get_colnode(tileid);
	var rowNode = this.tile.get_rownode(tileid);
	var colid = colNode.id;
	var rowid = rowNode.id;
	this.parameters.colid = colid;
	this.parameters.rowid = rowid;	
	// update the row/col/tile classes
    this.parameters.rowclass = this.tile.rowclass;
    this.parameters.colclass = this.tile.colclass;
    this.parameters.tileclass = this.tile.tileclass;
    // TODO: rename to avoid confusion...
    this.parameters.tileheader = this.tile.headertitle;
    
};
ddt_tile.prototype.set_tile = function(){
    // set input tile parameters
    var tileid = this.parameters.tileid
    var rowid = this.parameters.rowid
    var colid = this.parameters.colid
    var tileclass = this.parameters.tileclass
    var rowclass = this.parameters.rowclass
    var colclass = this.parameters.colclass

    this.tile = new d3_tile();
    this.tile.set_tileid(tileid);
    this.tile.set_rowid(rowid);
    this.tile.set_colid(colid);
    this.tile.set_tileclass(tileclass);
    this.tile.set_rowclass(rowclass);
    this.tile.set_colclass(colclass);

};
ddt_tile.prototype.make_tile = function(){
    // make the tile
    // define tile make function call sequence here...
};
// update functions
ddt_tile.prototype.update_tile = function(){
    // update the tile
    // define tile update function call sequence here...
};
//var ddt_tile_svg = function () {
function ddt_tile_svg() {
    // data driven svg tile
	//1. defines the lookup table (get_svg) to instantiate the svg template object based on input
	//2. defines the make_tile function that adds the svg template object to the tile and renders the object
	//3. defines the update_tile function that updates the svg template object when the associated data is changed
    ddt_tile.call(this);
    this.ddtsvg = null;
};
ddt_tile_svg.prototype = Object.create(ddt_tile.prototype);
ddt_tile_svg.prototype.constructor = ddt_tile_svg;
ddt_tile_svg.prototype.make_tile = function(data_I,parameters_I){
    // make svg tile
    var header_I = parameters_I.tileheader; //rename to avoid confusion
    var svgtype_I = parameters_I.svgtype;

    this.set_parameters(parameters_I);
    this.set_tile();

    this.tile.add_tile2container();
    this.tile.add_header2tile();
    this.tile.add_navigationmenu2header();
    this.tile.add_resize2header();
    this.tile.add_tilemenubutton2header();
    this.tile.add_removebutton2header();
    this.tile.add_duplicatebutton2header();
    this.tile.set_headertitle(header_I);
    this.tile.add_title2header();
    this.tile.add_body2tile();
    this.tile.add_footer2tile();
    
    this.tile.set_draganddrop();

    //svg
    this.ddtsvg = this.get_svg(svgtype_I);
    this.ddtsvg.make_svg(data_I,parameters_I)

    this.ddtsvg.ddtsvg.render();
};
ddt_tile_svg.prototype.update_tile = function(data_I){
    // update tile

    //update the data filters...
    //this.ddtsvg.add_data(data_I);
    //this.ddtsvg.filter_data1and2stringdata();
    //re-render the svg
    this.ddtsvg.ddtsvg.render();
};
ddt_tile_svg.prototype.get_svg = function(svgtype_I){
    // return the appropriate tile object
    if (svgtype_I=='heatmap2d_01'){
        return new ddt_svg_heatmap_01();
    } else if (svgtype_I=='scatterlineplot2d_01'){
        return new ddt_svg_scatterlineplot2d_01();
    } else if (svgtype_I=='scatterlineplot2d_02'){
        return new ddt_svg_scatterlineplot2d_02();
    } else if (svgtype_I=='horizontalareaplot2d_01'){
        return new ddt_svg_horizontalareaplot2d_01();
    } else if (svgtype_I=='horizontalstackedareaplot2d_01'){
        return new ddt_svg_horizontalstackedareaplot2d_01();
    } else if (svgtype_I=='scatterplot2d_01'){
        return new ddt_svg_scatterplot2d_01();
    } else if (svgtype_I=='verticalbarschart2d_01'){
        return new ddt_svg_verticalbarschart2d_01();
    } else if (svgtype_I=='horizontalbarschart2d_01'){
        return new ddt_svg_horizontalbarschart2d_01();
    } else if (svgtype_I=='boxandwhiskersplot2d_01'){
        return new ddt_svg_boxandwhiskersplot2d_01();
    } else if (svgtype_I=='boxandwhiskersplot2d_02'){
        return new ddt_svg_boxandwhiskersplot2d_02();
    } else if (svgtype_I=='volcanoplot2d_01'){
        return new ddt_svg_volcanoplot2d_01();
    //} else if (svgtype_I=='pcaplot2d_loadings_01'){
    //    return new ddt_svg_pcaplot2d_loadings_01();
    } else if (svgtype_I=='pcaplot2d_scores_01'){
        return new ddt_svg_pcaplot2d_scores_01();
    } else if (svgtype_I=='treelayout2d_01'){
        return new ddt_svg_treelayout2d_01();
    } else if (svgtype_I=='forcelayout2d_01'){
        return new ddt_svg_forcelayout2d_01();
    } else if (svgtype_I=='circlepacklayout2d_01'){
        return new ddt_svg_circlepacklayout2d_01();
    } else if (svgtype_I=='verticalpieschart2d_01'){
        return new ddt_svg_verticalpieschart2d_01();
    } else if (svgtype_I=='chorddiagram2d_01'){
        return new ddt_svg_chorddiagram2d_01();
    } else if (svgtype_I=='bundlediagram2d_01'){
        return new ddt_svg_bundlediagram2d_01();
    } else if (svgtype_I=='radialtreelayout2d_01'){
        return new ddt_svg_radialtreelayout2d_01();
    } else if (svgtype_I=='indentedtreelayout2d_01'){
        return new ddt_svg_indentedtreelayout2d_01();
    } else if (svgtype_I=='radialdendrogram2d_01'){
        return new ddt_svg_radialdendrogram2d_01();
    } else if (svgtype_I=='verticaldendrogram2d_01'){
        return new ddt_svg_verticaldendrogram2d_01();
    } else if (svgtype_I=='treemaplayout2d_01'){
        return new ddt_svg_treemaplayout2d_01();
    } else if (svgtype_I=='partitionlayout2d_01'){
        return new ddt_svg_partitionlayout2d_01();
    } else if (svgtype_I=='sankeydiagram2d_01'){
        return new ddt_svg_sankeydiagram2d_01();
    } else if (svgtype_I=='forcedirectedgraph2d_01'){
        return new ddt_svg_forcedirectedgraph2d_01();
    } else if (svgtype_I=='horizontalBoxAndWhiskersPlot2d_01'){
        return new ddt_svg_horizontalBoxAndWhiskersPlot2d_01();
    } else if (svgtype_I=='horizontalBoxAndWhiskersPlot2d_02'){
        return new ddt_svg_horizontalBoxAndWhiskersPlot2d_02();
    } else {
        return null;
    };
};
//var ddt_tile_table = function () {
function ddt_tile_table() {
    // data driven table tile
	//1. defines the lookup table (get_table) to instantiate the table template object based on input
	//2. defines the make_tile function that adds the table template object to the tile and renders the object
	//3. defines the update_tile function that updates the table template object when the associated data is changed
    
    ddt_tile.call(this);
    this.ddttable = null;
};
ddt_tile_table.prototype = Object.create(ddt_tile.prototype);
ddt_tile_table.prototype.constructor = ddt_tile_table;
ddt_tile_table.prototype.make_tile = function(data_I,parameters_I){
    // make table tile
    var header_I = parameters_I.tileheader;
    var tabletype_I = parameters_I.tabletype;

    this.set_parameters(parameters_I);
    this.set_tile();

    this.tile.add_tile2container();
    this.tile.add_header2tile();
    this.tile.add_navigationmenu2header();
    this.tile.add_resize2header();
    this.tile.add_removebutton2header();
    this.tile.set_headertitle(header_I);
    this.tile.add_title2header();
    this.tile.add_body2tile();
    this.tile.add_footer2tile();
    
    //this.tile.add_swipe();
    this.tile.set_draganddrop();

    //table
    this.ddttable = this.get_table(tabletype_I);
    this.ddttable.make_table(data_I,parameters_I);
    //this.ddttable.make_table(parameters_I);

    this.ddttable.ddttable.render();
    //this.ddttable.ddttable.render(data_I[0]);
};
ddt_tile_table.prototype.update_tile = function(data_I){
    // update tile

    //update the data filters...
    //this.ddttable.add_data(data_I);
    //this.ddttable.ddttable.data.filter_listdata();
    //re-render the table
    this.ddttable.ddttable.render();
};
ddt_tile_table.prototype.get_table = function(tabletype_I){
    // return the appropriate tile object
    if (tabletype_I==='responsivetable_01'){
        return new ddt_table_responsivetable_01();
    } else if (tabletype_I==='responsivecrosstable_01'){
        return new ddt_table_responsivecrosstable_01();
    } else {
        return null;
    };
};
//var ddt_tile_html = function () {
function ddt_tile_html() {
    // data driven html tile
	//1. defines the lookup html (get_html) to instantiate the html template object based on input
	//2. defines the make_tile function that adds the html template object to the tile and renders the object
	//3. defines the update_tile function that updates the html template object when the associated data is changed
    
    ddt_tile.call(this);
    this.ddthtml = null;
};
ddt_tile_html.prototype = Object.create(ddt_tile.prototype);
ddt_tile_html.prototype.constructor = ddt_tile_html;
ddt_tile_html.prototype.make_tile = function(data_I,parameters_I){
    // make html tile
    var header_I = parameters_I.tileheader; //todo rename to avoid confusion
    var htmltype_I = parameters_I.htmltype;

    this.set_parameters(parameters_I);
    this.set_tile();

    this.tile.add_tile2container();
    this.tile.add_header2tile();
    this.tile.add_navigationmenu2header();
    this.tile.add_resize2header();
    this.tile.add_removebutton2header();
    this.tile.set_headertitle(header_I);
    this.tile.add_title2header();
    this.tile.add_body2tile();
    this.tile.add_footer2tile();
    if (parameters_I.formsubmitbuttonidtext){
        this.tile.add_submitbutton2footer(parameters_I.formsubmitbuttonidtext);
        };
    if (parameters_I.formresetbuttonidtext){
        this.tile.add_submitbutton2footer(parameters_I.formresetbuttonidtext);
        };
    if (parameters_I.formupdatebuttonidtext){
        this.tile.add_submitbutton2footer(parameters_I.formupdatebuttonidtext);
        };
    //this.tile.set_draganddrop();

    //html
    this.ddthtml = this.get_html(htmltype_I);
    this.ddthtml.make_html(data_I,parameters_I);
    //this.ddthtml.make_html(parameters_I);

    this.ddthtml.ddthtml.render();
    //this.ddthtml.ddthtml.render(data_I[0]);
};
ddt_tile_html.prototype.update_tile = function(data_I){
    // update tile

    //update the data filters...
    //this.ddthtml.add_data(data_I);
    //re-render the html
    this.ddthtml.ddthtml.render();
    //this.ddthtml.update_html(data_I);
};
ddt_tile_html.prototype.get_html = function(htmltype_I){
    // return the appropriate tile object
    if (htmltype_I=='form_01'){
        return new ddt_html_form_01();
    } else if (htmltype_I=='datalist_01'){
        return new ddt_html_datalist_01();
    } else if (htmltype_I=='href_01'){
        return new ddt_html_href_01();
    } else if (htmltype_I=='href_02'){
        return new ddt_html_href_02();
    } else if (htmltype_I=='media_01'){
        return new ddt_html_media_01();
    } else if (htmltype_I=='escher_01'){
        return new ddt_html_escher_01();
    } else if (htmltype_I=='containerheader_01'){
        return new ddt_html_containerheader_01();
    } else if (htmltype_I=='formquery_01'){
        return new ddt_html_formquery_01();
    } else if (htmltype_I=='formquery_02'){
        return new ddt_html_formquery_02();        
    } else if (htmltype_I=='iframe_01'){
        return new ddt_html_iframe_01();
    } else if (htmltype_I=='editor_01'){
        return new ddt_html_editor_01();
    } else {
        return null;
    };
};