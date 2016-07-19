"use strict";
//https://developer.mozilla.org/en-US/docs/Web/SVG/Element
//var d3_svg = function () {
function d3_svg() {
    // generic svg element
    this.id = '';
    this.tileid = '';
    this.svgelement = null;
    this.svgg = null;
    this.margin = {};
    this.width = 1;
    this.height = 1;
    this.render = null; // function defining the calls to make the svg element
};
d3_svg.prototype.set_tileid = function (tileid_I) {
    // set svg tile id
    this.tileid = tileid_I;
};
d3_svg.prototype.set_id = function (id_I) {
    // set svg id
    this.id = id_I;
};
d3_svg.prototype.set_margin = function (margin_I) {
    // set margin properties
    this.margin = margin_I;
};
d3_svg.prototype.set_width = function (width_I) {
    // set width properties
    this.width = width_I;
};
d3_svg.prototype.set_height = function (height_I) {
    // set height properties
    this.height = height_I;
};
d3_svg.prototype.set_radius = function (radius_I){
    // set the radius property
    if (typeof(radius_I)!=="undefined"){
        this.radius = radius_I;
    } else {
        this.radius = Math.min(this.width, this.height) / 2;
    };
};
d3_svg.prototype.add_svgelement2tile = function () {
    // add svg element to parent tile

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    var tileid = this.tileid;
    var id = this.id;

//     this.svgelement = d3.select('#'+this.tileid+"panel-body")
//         .append("svg").attr("id",this.id);

//     this.svgelement.attr("width", this.width + this.margin.left + this.margin.right)
//         .attr("height", this.height + this.margin.top + this.margin.bottom);

//     this.svgg = this.svgelement
//         .append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svgelement = d3.select('#' + tileid+"panel-body").selectAll(".svg-responsive")
        .data([0]);
    
    this.svgenter = this.svgelement.enter()    
        .append("div")
        .attr("class",'svg-responsive')
        .append("svg")
        .attr("id", id)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svgelement.selectAll("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_svg.prototype.add_svgexportbutton2tile = function () {
    // add button to export the svg element
    var this_ = this;
    var svgexportbutton = d3.select('#'+this.tileid+"panel-footer").append("form");

    function exportsvgelement(){
        this_.export_svgelement(); //necessary to pass svg as "this"
    };

    var svgexportbutton_input = svgexportbutton.append("input");
    svgexportbutton_input.attr("type", "button")
        .attr("value", "Download SVG");
    svgexportbutton_input.on("click", exportsvgelement);

};
d3_svg.prototype.export_svgelement = function () {
    // export the svg element

    //Input:
    // do_beautify = boolean (requires beautify plugin)

    var do_beautify_I = true;
    var a = document.createElement('a'), xml, ev;
    var svg_sel = "#" + this.id;
    var name = 'figure'

    // alert if blob isn't going to work
    _check_filesaver();

//     // convert node to xml string
     var xml = (new XMLSerializer()).serializeToString(d3.select(svg_sel).node()); //div element interferes with reading the svg file in illustrator/pdf/inkscape
     if (do_beautify_I){xml = vkbeautify.xml(xml);};
     xml = '<?xml version="1.0" encoding="utf-8"?>\n \
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n \
     "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + xml;

    // save
//     a.download = name + '.svg'; // file name
//     a.setAttribute("href-lang", "image/svg+xml");
//     a.href = 'data:image/svg+xml;base64,' + utf8_to_b64(xml); // create data uri
//     // <a> constructed, simulate mouse click on it
//     ev = document.createEvent("MouseEvents");
//     ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//     a.dispatchEvent(ev);

    var blob = new Blob([xml], {type: "image/svg+xml"});
    saveAs(blob, name + '.svg');

    // definitions
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    };
};
d3_svg.prototype.add_datalist2tile = function (datalist_valuetext_I) {
    // add datalist (menu) for input

    var tileid = this.tileid;

    var datalist = d3.select('#'+this.tileid).append("select")
        .attr("id", tileid + 'datalist');

    for (i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };

};
d3_svg.prototype.set_svgstyle = function () {
    // predefined css style for svg
    //var selector1 = "#" + this.id;
    var selector1 = "#" + this.tileid + ' .svg-responsive';
    var style1 = {
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 }];
    this.set_d3css(selectorstyle);
};
d3_svg.prototype.set_duration = function(duration_I=250){
    // set the transition duration
    this.duration = duration_I;
};
d3_svg.prototype.set_svggcss = function (selectionstyle_I) {
    //set custom css style to svgg
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        this.svgg.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_svg.prototype.set_d3css = function (selectionstyle_I) {
    //set custom css style to d3
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        d3.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_svg.prototype.set_zoom = function (){
    //add zoom
    var draw = this.draw;
    var render = this.render;
    var svgg = this.svgg;
    function zoomed() {
        svgg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    };

    this.zoom = d3.behavior.zoom()
        .scaleExtent([.1,10])
        //.on("zoom", render);
        .on("zoom", zoomed);
};
d3_svg.prototype.add_zoom = function(){
    //add zoom to svg
    var zoom = this.zoom;
    this.svgg.call(zoom);
    //this.zoom(svgelement);
};
d3_svg.prototype.set_drag = function(){
    // set drag
    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
    }

    function dragged(d) {
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
      d3.select(this).classed("dragging", false);
    }

    this.drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);
};
d3_svg.prototype.add_drag = function(){
    //add zoom to svg
    var drag = this.drag;
    this.svgg.call(drag);
};
d3_svg.prototype.render = function () {
    //render the svg

    //your code here...
};
d3_svg.prototype.draw = function () {
    //draw the svg

    //your code here...
};
d3_svg.prototype.add_optionsbuttongroup2footer = function(){
    // add options button group to footer

    var id = this.id;

    this.svgresizemenubutton = d3.select('#'+this.tileid+"panel-footer")
        .append("div")
        .attr("class","btn-group pull-right")
        .attr("id", id + 'svgoptionsbuttongroup');
};
d3_svg.prototype.add_resizebuttons2optionsbuttongroup = function(){
    // add svg resize
    // expand tile col width 1 increment

    var tileid = this.tileid;

    var this_ = this;

    function expandsvghorizontal(){
        this_.expand_svghorizontal();
    };
    function shrinksvghorizontal(){ 
        this_.shrink_svghorizontal();
    };
    function expandsvgvertical(){
        this_.expand_svgvertical();
    };
    function shrinksvgvertical(){ 
        this_.shrink_svgvertical();
    };

    //var svgresizemenubutton = d3.select('#'+this.tileid+"panel-footer").append("div");
    var svgresizemenubutton = this.svgresizemenubutton;


    var svgshrinkbuttonhorizontal = svgresizemenubutton.append("div")
        .attr("class","glyphicon  glyphicon-resize-small pull-right")
        .attr("id", tileid + 'shrinksvghorizontal')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","shrink svg width");
    svgshrinkbuttonhorizontal.on("click",shrinksvghorizontal);
    var svgexpandbuttonhorizontal = svgresizemenubutton.append("div")
        .attr("class","glyphicon glyphicon-resize-horizontal pull-right")
        .attr("id", tileid + 'expandsvghorizontal')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","expand svg width");
    svgexpandbuttonhorizontal.on("click",expandsvghorizontal);

    var svgshrinkbuttonvertical = svgresizemenubutton.append("div")
        .attr("class","glyphicon  glyphicon-resize-small pull-right")
        .attr("id", tileid + 'shrinksvgvertical')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","shrink svg height");
    svgshrinkbuttonvertical.on("click",shrinksvgvertical);
    var svgexpandbuttonvertical = svgresizemenubutton.append("div")
        .attr("class","glyphicon glyphicon-resize-vertical pull-right")
        .attr("id", tileid + 'expandsvgvertical')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","expand svg height");
    svgexpandbuttonvertical.on("click",expandsvgvertical);
};
d3_svg.prototype.expand_svghorizontal = function(){
    //expand svg horizontal
    var width = this.width;
    var height = this.height;
    var widthnew = width*1.5;
    this.set_width(widthnew);
    this.render();
};
d3_svg.prototype.shrink_svghorizontal = function(){ 
    //shrink svg horizontal
    var width = this.width;
    var height = this.height;
    var widthnew = width*2.0/3.0;
    this.set_width(widthnew);
    this.render();
};
d3_svg.prototype.expand_svgvertical = function(){
    //expand svg vertical
    var width = this.width;
    var height = this.height;
    var heightnew = height*1.5;
    this.set_height(heightnew);
    this.render();
};
d3_svg.prototype.shrink_svgvertical = function(){ 
    //shrink svg vertical
    var width = this.width;
    var height = this.height;
    var heightnew = height*2.0/3.0;
    this.set_height(heightnew);
    this.render();
};
d3_svg.prototype.add_navtabs2tile = function(navtabs_I){
    //add navigation tabs to tile body
    //INPUT
    //navtabs_I = [{"litext":"svg","href":,"data-target":},
    //             {"litext":"options","href":,"data-target":}
    // ];
    //
    //
    //

    var tileid = this.tileid;

    if (typeof(navtabs_I)!=="undefined"){
        var navtabs = navtabs_I;
    } else {
        var navtabs = [];
    };
    
    //extract out the navigation tabs
    var navtabstext = [];
    navtabs.forEach(function(d){
        navtabstext.push(d["litext"]);
    });

    this.svgnavtabs = d3.select('#' + tileid+"panel-body")
        .append("ul")
        .attr("id",tileid+"svgnavigationtabs")
        .attr("class","nav nav-tabs")
        .selectAll("li")
        .data(navtabs);

    //add the li elements
    this.svgnavtabs.exit().remove();
    this.svgnavtabsenter = this.svgnavtabs.enter();
    this.svgnavtabsenter.append("li")
        .append("a")
        .attr("href",function(d){
            return d["href"];
        })
        .attr("data-target",function(d){
            return d["data-target"];
        })
        .attr("data-toggle","tab")
        .text(function(d){
            return d["litext"];
        });

    this.svgnavtabs.transition()
        .attr("href",function(d){
            return d["href"];
        })
        .attr("data-target",function(d){
            return d["data-target"];
        })
        .attr("data-toggle","tab")
        .text(function(d){
            return d["litext"];
        });
};
d3_svg.prototype.show_svgmenumodal = function(){
    // show the svg menu options modal
    var this_ = this;
    var id = this.id;
    var tileid = this.tileid;

    function updatesvgparameters(){
        // update the svg parameters

        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid+'modal').modal('hide');
    };

    //add the modal menu object
    var modalid = id + "svgmenubuttonmodal";
    var modaltargetid = "#" + id + 'svgmenubutton';
    //var modaltargetid = "body";
    var menumodal = new d3_html_modal();
    //menumodal.add_ndata([this.data]);
    menumodal.set_id(modalid);
    menumodal.set_tileid(tileid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('SVG Options');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        // TODO:...
        // form to change svg parameters including height, width, labels, label styling, etc.

        d3.select('#'+id+"modalfootersubmitbutton").on("click",updatesvgparameters)
    };
    menumodal.add_content2modalbodyform();
    // show the modal
    $("#"+modalid+'modal').modal('show');
}
d3_svg.prototype.add_svgmenubutton2optionsbuttongroup = function (){
    //add a menu button to the footer of the chart
    //TODO: re-implement using tabs
    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    var svgmenubutton = this.svgresizemenubutton.append("div");

    function showsvgmenumodal(){
        this_.show_svgmenumodal();
    };

    svgmenubutton
        .attr("class","pull-right")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","svg options menu")
        .attr("id", id + 'svgmenubutton')

    var svgmenubuttontrigger = svgmenubutton
        .append("span")
        .attr("class","glyphicon  glyphicon glyphicon-menu-hamburger pull-right")
        .attr("id", id + 'svgmenubuttonglyphicon')
        .attr("aria-hidden","true");

    svgmenubuttontrigger.on("click",showsvgmenumodal);

};
d3_svg.prototype.add_refreshbutton2optionsbuttongroup = function (){
    // add refresh button to the footer of the chart

    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    function refreshtile(){
        //refresh the tile
        this_.render();        
    };

    var svgrefreshbutton = this.svgresizemenubutton.append("div");

    svgrefreshbutton
        .attr("class","glyphicon glyphicon glyphicon-refresh pull-right")
        .attr("id", tileid + 'refreshtile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","refresh");
    svgrefreshbutton.on("click",refreshtile);
};
d3_svg.prototype.make_colorscale = function(color_start_I,color_end_I,length_I){
    //make a custom color scale
    //INPUT:
    //color_start_I = rgb start e.g. "#007AFF"
    //color_end_I = rgb end e.g. '#FFF500'
    //length_I = # of colors in the scale
    //OUTPUT:
    //color_scale_O = linear d3 color scale

    var color_scale_O = d3.scale.linear().domain([1,length_I])
              .interpolate(d3.interpolateHcl)
              .range([d3.rgb(color_start_I), d3.rgb(color_end_I)]);
    return color_scale_O;
};
d3_svg.prototype.set_arc = function(outerradius_I,innerradius_I){
    /*set the pie arc outer and inner radii
    INPUT:
    outerradius_I = float, outer radius
    innerradius_I = float, inner radius (set to >0 to make a donut chart)
    TODO:
    scale radius?
    */

    var top = this.margin.top;
    if (typeof(outerradius_I)!=="undefined"){
        var outerradius = outerradius_I;
    } else {
        var outerradius = this.radius-top;
    };
    if (typeof(innerradius_I)!=="undefined"){
        var innerradius = innerradius_I;
    } else {
        var innerradius = outerradius/4.0;
    };

    this.arc = d3.svg.arc()
        .outerRadius(outerradius)
        .innerRadius(innerradius); 
};
d3_svg.prototype.set_arclabel = function(outerradiuslabel_I,innerradiuslabel_I){
    /*set the pie arc outer and inner label radii
    INPUT:
    outerradiuslabel_I = float, outer radius
    innerradiuslabel_I = float, inner radius
    */
    if (typeof(outerradiuslabel_I)!=="undefined"){
        var outerradiuslabel = outerradiuslabel_I;
    } else {
        var outerradiuslabel = this.radius-40.0;
    };
    if (typeof(innterradiuslabel_I)!=="undefined"){
        var innerradiuslabel = innerradiuslabel_I;
    } else {
        var innerradiuslabel = this.radius-40.0;
    };
    this.arclabel = d3.svg.arc()
        .outerRadius(outerradiuslabel)
        .innerRadius(innerradiuslabel);
};
d3_svg.prototype.set_defs = function(){
    /*
    set defs
    https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    */

    this.defs = this.svgg.append("defs");
};
d3_svg.prototype.set_symbol = function(){
    /*
    set symbol
    https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
    */

    this.symbol = this.svgg.append("symbol");
};
