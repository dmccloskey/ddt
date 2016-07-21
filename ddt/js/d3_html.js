"use strict";
//var d3_html = function () {
function d3_html() {
    // generic html element
    this.id = '';
    this.tileid = '';
    this.htmlelement = null;
    this.html = null;
    this.data = null;
    this.datakeymap = {}; // mapping of keys to data element, chart elements, or other descriptor
    this.htmlfooter = null;
    this.htmlheader = null;
};
d3_html.prototype.add_html2tile = function(){
    // set the html
    var id = this.id;
    var tileid = this.tileid;
    var htmlclass = this.htmlclass;
    //var listdatafiltered = this.data.listdatafiltered;
    var htmlheaders = this.htmlheaders;

    this.html = d3.select('#'+tileid+"panel-body").selectAll(".html-responsive")
        //.data([listdatafiltered]);
        .data([0]);

    this.htmlenter = this.html.enter()
        .append("div")
        .attr("class","html-responsive")
        .attr("id",id+"html");

    this.html.exit().remove();

};
d3_html.prototype.set_id = function(htmlid_I){
    // set the htmlid
    this.id = htmlid_I;
};
d3_html.prototype.set_tileid = function(htmltileid_I){
    // set the html tileid
    this.tileid = htmltileid_I;
};
d3_html.prototype.add_data = function(data_I){
    // add data to tile
    this.data = data_I[0];
};
d3_html.prototype.set_datakeymap = function(datakeymap_I){
    // set html data key map
    this.datakeymap = datakeymap_I[0];  
};
d3_html.prototype.add_ndata = function(data_I){
    // add data to tile
    this.data = data_I;
};
d3_html.prototype.set_ndatakeymap = function(datakeymap_I){
    // set html data key map
    this.datakeymap = datakeymap_I;  
};
d3_html.prototype.set_htmlstyle = function () {
    // predefined css style for html header rows
    var htmlselector = "#" + this.tileid + " .html-responsive";
    var htmlstyle = {
        //'html-layout': 'fixed',
        'width': '100%',
        'margin-bottom': '15px',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': htmlselector, 'style': htmlstyle }]
    this.set_d3css(selectorstyle);
};
d3_html.prototype.set_htmlescherstyle = function () {
    // predefined css style for html header rows
    var htmlselector = "#" + this.tileid + " .html-responsive";
    var htmlstyle = {
        //'html-layout': 'fixed',
        'width': '100%',
        'height':'500px',
        'margin-bottom': '15px',
        'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch'
    };
    var selectorstyle = [{ 'selection': htmlselector, 'style': htmlstyle }]
    this.set_d3css(selectorstyle);
};
d3_html.prototype.set_d3css = function (selectionstyle_I) {
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
d3_html.prototype.add_progressbar = function(){
    /*
    add progress bar
    */ 
//     E.g.,
//     http://www.w3schools.com/bootstrap/bootstrap_progressbars.asp
//     <div class="progress">
//       <div class="progress-bar" role="progressbar" aria-valuenow="70"
//       aria-valuemin="0" aria-valuemax="100" style="width:70%">
//         70%
//       </div>
//     </div>
}
d3_html.prototype.update_progressbar = function(){
    /*
    update the progress bar value
    */ 
}
d3_html.prototype.add_checkbox = function () {
    // add checkbox for input
};
d3_html.prototype.add_radio = function () {
    // add radio button for input
};
d3_html.prototype.add_input = function (inputarguments_I) {
    // add input to node

    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    var nodediv = node.append("div");
    var nodelabel = node.append("label");
    var nodeinput = node.append("input");

    //div properties
    if ('divid' in input) nodediv.attr('id',input.divid);
    if ('divclass' in input) nodediv.attr('class', input.divclass);
    if ('divtooltip' in input) {
        nodediv.attr("data-toggle","tooltip")
        nodediv.attr('title', input.divtooltip);
    };

    //label properties
    if ('labeltext' in input) nodelabel.text(input.labeltext);
    if ('labelid' in input) nodelabel.attr('id',input.labelid);
    if ('labelclass' in input) nodelabel.attr('class', input.labelclass);

    //input properties
    if ('inputtype' in input) nodeinput.attr('type',input.inputtype);
    if ('inputid' in input) nodeinput.attr('id',input.inputid);
    if ('inputclass' in input) nodeinput.attr('class', input.inputclass);
    if ('inputvalue' in input) nodeinput.attr('value', input.inputvalue);
};
d3_html.prototype.set_buttonproperties = function (button,button_span,input){
    // set the button properties

    //button properties
    if ('buttonid' in input) button.attr('id',input.buttonid);
    if ('buttonstyle' in input) button.style(input.buttonstyle);
    if ('buttonclass' in input) button.attr('class', input.buttonclass);
    if ('buttonon' in input) {
        for (var i; i<input.buttonon.length; i++){
            this.set_onmethod(button, input.buttonon[i]);
        };
    };
    if ('buttontooltip' in input) {
        button.attr("data-toggle","tooltip")
        button.attr('title', input.buttontooltip);
    };

    //button_span properties
    if ('spanid' in input) button_span.attr('id',input.spanid);
    if ('spanstyle' in input) button_span.style(input.spanstyle);
    if ('spanclass' in input) button_span.attr('class', input.spanclass);
    if ('spantext' in input) button_span.text(input.spantext);
    if ('spanicon' in input) button_span.classed(input.spanicon, true);
    if ('spanaria-hidden' in input) button_span.attr('aria-hidden', input['spanaria-hidden']);
    if ('spandata-toggle' in input) button_span.attr('data-toggle', input['spandata-toggle']);
    if ('spandata-target' in input) button_span.attr('data-target', input['spandata-target']);
    if ('spannon' in input) {
        for (var i; i<input.spannon.length; i++){
            this.set_onmethod(button_span, input.spannon[i]);
        };
    };
};
d3_html.prototype.add_button = function (inputarguments_I) {
    // add button
    // INPUT:
    // node = node to add the button to
    // node_id = node id to add the button to
    // inputarguments = {} of button properties including the following:
    //      id = 
    //      class
    //      text
    //      icon
    //      on_method
    //      style = {} of styles

    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    var button = node.append('button');
    var button_span = button.append('span');

    this.set_buttonproperties(button,button_span,input);

};
d3_html.prototype.add_glyphiconbutton = function (inputarguments_I) {
    // add button
    // INPUT:
    // node = node to add the button to
    // node_id = node id to add the button to
    // inputarguments = {} of button properties including the following:
    //      id
    //      class
    //      text
    //      icon
    //      on
    //
    var inputarguments = new ddt_inputarguments();
    inputarguments.validate_inputarguments(inputarguments_I)
    var node = inputarguments.get_node();
    var input = inputarguments.get_inputarguments();

    var button = node.append('div');
    var button_span = button.append('span');

    this.set_buttonproperties(button,button_span,input);
};
d3_html.prototype.set_onmethod = function (node_I, on_method_I) {
    // set on method for a node
    // INPUT:
    // node_I = button node
    // on_method_I = {} with properties
    //        method = name of the on method (e.g. click)
    //        function = on_method function
    //        target ?

    node_I.on(on_method_I.method, function() {
        on_method_I.function.call(on_method_I.target);
    });
};
d3_html.prototype.add_dropdown = function () {
    // add dropdown attribute
};
d3_html.prototype.add_color = function () {
    // add color pallet for input
};
d3_html.prototype.add_range = function () {
    // add range slider for input
};
d3_html.prototype.add_form = function(inputarguments_I) {
    /* add form to tile
    INPUT:
    inputarguments_I
    */

    // handle the input
    if (typeof(inputarguments_I)!=="undefined"){
        var inputarguments = new ddt_inputarguments();
        inputarguments.validate_inputarguments(inputarguments_I)
        var node = inputarguments.get_node();
        var input = inputarguments.get_inputarguments();
    } else {
        var node = this.html;
        var input = this.get_htmldata1();
    };

    var id = this.id;

    this.htmlform = node.selectAll("form")
        .data([input]);

    this.htmlformenter = this.htmlform.enter()
        .append("form")
        .attr("id", id + 'form');

    this.htmlform.exit().remove();
};
d3_html.prototype.add_textarea = function (inputarguments_I) {
    /* add textarea as input
    INPUT:
    inputarguments_I
    */

    // handle the input
    //SPLIT 1
    if (typeof(inputarguments_I)!=="undefined"){
        var inputarguments = new ddt_inputarguments();
        inputarguments.validate_inputarguments(inputarguments_I)
        var node = inputarguments.get_node();
        var input = inputarguments.get_inputarguments();
    } else {
        var node = this.html;
        var input = this.html.get_htmldata1();
    };
//     //SPLIT 2
//     if (typeof(node_I)!=="undefined"){
//         var node = node_I;
//     } else {
//         var node = this.html;
//     };
//     if (typeof(listdatafiltered_I)!=="undefined"){
//         var listdatafiltered = listdatafiltered_I;
//     } else {
//         var listdatafiltered = this.html.get_htmldata1().listdatafiltered;
//     };

    // default variables
    var id = this.id;
    var this_ = this;
    var inputtype = 'textarea';

    this.htmltextareagroup = node.selectAll("textarea")
//         .data(listdatafiltered,function(d){
//             if(typeof(d.inputtype)!=="undefined" && d.inputtype==="textarea"){
//                 return d;
//                 };
//             });
        .data(input);

    this.htmltextareagroup.exit().remove();

    this.htmltextareagroup.transition()
        .attr("class","form-control")
        //.attr("rows",function(d){return d.inputrows;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'textarea' + d.inputlabel;});

    this.htmltextareagroupenter = this.htmltextareagroup.enter()
        .append("textarea")
        .attr("class","form-control")
        .attr("type",function(d){return d.inputtype;})
        //.attr("rows",function(d){return d.inputrows;})
        .text(function(d){return d.inputtext;})
        .attr("value",function(d){return d.inputvalue;})
        .attr("id", function(d){return id + 'textarea' + d.inputlabel;});
};
d3_html.prototype.add_search = function(){
    // add search feature
    // use selectisize.js
    //"https://github.com/brianreavis/selectize.js"
    // or datalist
    //E.g.,
//     <form action="demo_form.asp" method="get">
//       <input list="browsers" name="browser">
//       <datalist id="browsers">
//         <option value="Internet Explorer">
//         <option value="Firefox">
//         <option value="Chrome">
//         <option value="Opera">
//         <option value="Safari">
//       </datalist>
//       <input type="submit">
//     </form>
}
d3_html.prototype.add_dropdownbuttongroup_href = function () {
    // add dropdown button group to the body of the html
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.datakeymap.buttonparameter;
    var liparameter = this.datakeymap.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;

    this.buttongroup = this.html.selectAll(".btn-group")
        .data(nestdatafiltered)

    this.buttongroupenter = this.buttongroup.enter()
        .append("div")
        .attr("class","btn-group")
        .attr("id", id + "btn-group");

    this.buttongroup.exit().remove();

    this.button = this.buttongroup.selectAll(".btn btn-group-sm btn-default dropdown-toggle")
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.buttonenter = this.button.enter()
        .append("button")
        .attr("class", "btn btn-group-sm btn-default dropdown-toggle" )
        .attr("data-toggle", "dropdown")
        .attr("aria-expanded", "true")
        .attr("id", function(d){return id + "button" + d.key;})
        //.attr("aria-expanded", "false")
        .text(function(d){return d.key;})
        .append("span")
        .attr("class","caret");

    this.button
        .attr("class", "btn btn-group-sm btn-default dropdown-toggle" )
        .attr("data-toggle", "dropdown")
        .attr("aria-expanded", "true")
        .attr("id", function(d){return id + "button" + d.key;})
        .text(function(d){return d.key;})
        .append("span")
        .attr("class","caret");

    this.button.exit().remove();

    this.ul = this.buttongroup.selectAll(".dropdown-menu")
        .data(function(row){
            var keyvalues = [];
            keyvalues.push({key:row.key,values:row.values});
            return keyvalues;
            });

    this.ulenter = this.ul.enter()
        .append("ul")
        .attr("class","dropdown-menu")
        .attr("aria-labelledby", function(d){return id + "button" + d.key;})
        .attr("id",function(d){return id + "dropdown-menu"+ d.key;})
        .attr("role","menu");

    this.ul.exit().remove();

    this.li = this.ul.selectAll("li")
        .data(function(row){
            var buttonlitext = [];
            var key = row.key;
            row.values.forEach(function(d){
                buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
                });
            return buttonlitext;
            });
    
    this.lienter = this.li.enter()
        .append("li").append("a")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.select("a")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.exit().remove();
};
d3_html.prototype.render = function(){
    // make render function here...
};
d3_html.prototype.set_url = function(url_I){
    // set the base url_I
    this.url = url_I;
};
d3_html.prototype.add_datalist = function (datalist_valuetext_I) {
    // add datalist (menu) for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];

    var tileid = this.tileid;  

    var datalist = this.html.append("select")
        .attr("id", tileid + 'datalist');

    for (var i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };  
};
d3_html.prototype.add_paragraphs = function(paragraph_I){
    // add paragraphs to tile body
    // INPUT:
    // paragraph_I = [{pclass:"text-left",ptext:"",pclass:"text-muted"},...]

    this.paragraph = this.html.selectAll("p")
        .data(paragraph_I);

    this.paragraphenter = this.paragraph.enter()
        .append("p")
        .attr("class",function(d){return d.pclass;})
        .text(function(d){return d.ptext;})
        .append("br");

    this.paragraph
        .attr("class",function(d){return d.pclass;})
        .text(function(d){return d.ptext;})
        .append("br");

    this.paragraph.exit().remove();
    
};
d3_html.prototype.add_headerandlistgroup_href = function(){
    // add list groups with individual headers to the tile body
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.datakeymap.buttonparameter;
    var liparameter = this.datakeymap.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;

    this.headergroup = this.html.selectAll("#" + id + "header-group")
        .data(nestdatafiltered)

    this.headergroupenter = this.headergroup.enter()
        .append("div")
        .attr("class","list-group")
        .attr("id", id + "header-group");

    this.headergroup.exit().remove();

    this.header = this.headergroup.selectAll("#" + id + "header")
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.headerenter = this.header.enter()
        .append("div")
        .attr("class","list-group-item")
        .attr("id",id + "header")
        .append("h4")
        .attr("class","list-group-item-heading")
        .attr("id", function(d){return id + "h4" + d.key;})
        //.attr("aria-expanded", "false")
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","");});

    this.header.selectAll("h4")
        .attr("class","list-group-item-heading")
        .attr("id", function(d){return id + "h4" + d.key;})
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","");});

    this.header.exit().remove();

//     this.ul = this.headergroup.selectAll(".list-group")
//         .data(function(row){
//             var keyvalues = [];
//             keyvalues.push({key:row.key,values:row.values});
//             return keyvalues;
//             });

//     this.ulenter = this.ul.enter()
//         .append("div")
//         .attr("class","list-group")
//         .attr("id",function(d){return id + "list-group"+ d.key;});

//     this.ul.exit().remove();

    //this.li = this.ul.selectAll("list-group-item")
    this.li = this.headergroup.selectAll("#" + id + "li")
        .data(function(row){
            var buttonlitext = [];
            var key = row.key;
            row.values.forEach(function(d){
                buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
                });
            return buttonlitext;
            });
    
    this.lienter = this.li.enter()
        .append("a")
        .attr("class","list-group-item")
        .attr("id",id + "li")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.select("a")
        .attr("href",function(d,i){
            var url = hrefurl+"?";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.li.exit().remove();
}
d3_html.prototype.add_media = function(){
    // add media to the tile body

    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;
    var mediasrc = this.datakeymap.htmlmediasrc;
    var mediaalt = this.datakeymap.htmlmediaalt;
    var mediahref = this.datakeymap.htmlmediahref;
    var mediaheading = this.datakeymap.htmlmediaheading;
    var mediaparagraph = this.datakeymap.htmlmediaparagraph;

    this.htmlmedia = this.html.selectAll(".media")
        .data(listdatafiltered);

    this.htmlmediaenter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media");
    
    this.htmlmedia.exit().remove();

    this.htmlmediaimg = this.htmlmedia.selectAll(".media-left media-top")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediaimg.selectAll("a")
        .attr("href",function(d){return d[mediahref];})
    this.htmlmediaimg.selectAll("img")
        .attr("class","media-object img-responsive")
        .attr("src",function(d){return d[mediasrc];})
        .attr("alt",function(d){return d[mediaalt];});

    this.htmlmediaimg.exit().remove();
    
    this.htmlmediaimgenter = this.htmlmediaimg.enter()
        .append("div")
        .attr("class","media-left media-top")
        .append("a")
        .attr("href",function(d){return d[mediahref];})
        .append("img")
        .attr("class","media-object img-responsive")
        .attr("src",function(d){return d[mediasrc];})
        .attr("alt",function(d){return d[mediaalt];});

    this.htmlmediabody = this.htmlmedia.selectAll(".media-body")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediabody.selectAll("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});
    this.htmlmediabody.selectAll("p")
        .text(function(d){return d[mediaparagraph];});

    this.htmlmediabody.exit().remove();

    this.htmlmediabodyh4enter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media-body")
        .append("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});

    this.htmlmediabodypenter = this.htmlmedia.enter()
        .append("p")
        .text(function(d){return d[mediaparagraph];});
        
}
d3_html.prototype.add_mediasvg = function(){
    // add svg media to the tile body

    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;
    var mediasrc = this.datakeymap.htmlmediasrc;
    var mediaalt = this.datakeymap.htmlmediaalt;
    var mediahref = this.datakeymap.htmlmediahref;
    var mediaheading = this.datakeymap.htmlmediaheading;
    var mediaparagraph = this.datakeymap.htmlmediaparagraph;
    
    this.htmlmedia = this.html.selectAll(".media")
        .data(listdatafiltered);

    this.htmlmediaenter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media");
    
    this.htmlmedia.exit().remove();

    this.htmlmediaimg = this.htmlmedia.selectAll(".media-left media-top")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediaimg.selectAll("a")
        .attr("href",function(d){return d[mediahref];})
    this.htmlmediaimg.selectAll("svg")
        .attr("class","media-object img-responsive")
        .html(function(d){return d[mediasrc];});

    this.htmlmediaimg.exit().remove();
    
    this.htmlmediaimgenter = this.htmlmediaimg.enter()
        .append("div")
        .attr("class","media-left media-top")
        .append("a")
        .attr("href",function(d){return d[mediahref];})
        .html(function(d){return d[mediasrc];});

    this.htmlmediabody = this.htmlmedia.selectAll(".media-body")
        .data(function(d){
            var rows = [];
            rows.push(d);
            return rows;
        });

    this.htmlmediabody.selectAll("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});
    this.htmlmediabody.selectAll("p")
        .text(function(d){return d[mediaparagraph];});

    this.htmlmediabody.exit().remove();

    this.htmlmediabodyh4enter = this.htmlmedia.enter()
        .append("div")
        .attr("class","media-body")
        .append("h4")
        .attr("class","media-heading")
        .text(function(d){return d[mediaheading];});

    this.htmlmediabodypenter = this.htmlmedia.enter()
        .append("p")
        .text(function(d){return d[mediaparagraph];});
        
};
d3_html.prototype.add_iframe = function(iframeclass_I="iframe-responsive",iframehref_I='',iframeborder_I=0){
    // add an iframe to tile body
    // todo:
    var iframeclass = iframeclass_I;
    var iframehref = iframehref_I;
    var iframeborder = iframeborder_I;
    var listdatafiltered = this.get_htmldata1().listdatafiltered;
    var id = this.id;

    this.htmliframewrapper = this.html.selectAll(".iframewrapper")
        .data([listdatafiltered]);

    this.htmliframewrapper.exit().remove();
    this.htmliframewrapper.transition()
        .attr("class",'iframewrapper')
        .attr("id",id + 'iframewrapper');
    this.htmliframewrapperenter = this.htmliframewrapper.enter()
        .append("div")
        .attr("class",'iframewrapper')
        .attr("id",id + 'iframewrapper');

    this.htmliframe = this.htmliframewrapper.selectAll("iframe")
        .data([listdatafiltered]);

    this.htmliframeenter = this.htmliframe.enter()
        .append("iframe")
        .attr("class",iframeclass)
        .attr("frameborder",iframeborder)
        .attr("src",iframehref)
        .attr("id",id+"iframe");

    this.htmliframe.transition()
        .attr("class",iframeclass)
        .attr("frameborder",iframeborder)
        .attr("src",iframehref)
        .attr("id",id+"iframe");
    
    this.htmliframe.exit().remove();
};
d3_html.prototype.set_iframestyle = function () {
    // predefined css style for iframe
    var htmlselector = "#" + this.tileid + " iframe";
    var htmlstyle = {
        'width': '100%',
        'height': '100%',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        //'margin-bottom': '15px',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch',
    };
    var selectorstyle = [{ 'selection': htmlselector, 'style': htmlstyle }]
    this.set_d3css(selectorstyle);
};
d3_html.prototype.add_document2iframeContentWindow = function(iframesrcid_I,iframesrclabeltext_I,document_I=null){
    // add iframe text document to tile body

    var iframesrcid = iframesrcid_I;
    var iframesrclabeltext = iframesrclabeltext_I;
    var id = this.id;

    if (document_I){var text = document_I}
    else {var text = document.getElementById(iframesrcid + 'textarea' + iframesrclabeltext).value;};

    //SPLIT 1:
    var ifrw = this.htmliframe[0][0].contentDocument;
    ifrw.clear();
    ifrw.open();
    ifrw.write(text);  
    ifrw.close();

    //SPLIT 2: from the web
//     var ifr = document.createElement("iframe");
//     ifr.setAttribute("frameborder", "0");
//     ifr.setAttribute("id", id+"iframe");  
//     document.getElementById(id + 'iframewrapper').innerHTML = "";
//     document.getElementById(id + 'iframewrapper').appendChild(ifr);
//     var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
//     ifrw.document.open();
//     ifrw.document.write(text);  
//     ifrw.document.close();
//     //23.02.2016: contentEditable is set to true, to fix text-selection (bug) in firefox.
//     //(and back to false to prevent the content from being editable)
//     //(To reproduce the error: Select text in the result window with, and without, the contentEditable statements below.)  
//     if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
//         ifrw.document.body.contentEditable = true;
//         ifrw.document.body.contentEditable = false;
//     }
};
d3_html.prototype.add_escher = function(escherdataindex_I,escherembeddedcss_I,escheroptions_I){
    // add escher map to tile body
    var id = this.id;
    if (this.eschermetabolitedata!==null){
        var metaboliteid = this.datakeymap[this.eschermetabolitedata].key;
        var metabolitevalues = this.datakeymap[this.eschermetabolitedata].values;
        };
    if (this.escherreactiondata!==null){
        var reactionid = this.datakeymap[this.escherreactiondata].key;
        var reactionvalues = this.datakeymap[this.escherreactiondata].values;
        };
    if (this.eschergenedata!==null){
        var geneid = this.datakeymap[this.eschergenedata].key;
        var genevalues = this.datakeymap[this.eschergenedata].values;
        };


    if (typeof escherdataindex_I === "undefined" && this.eschermetabolitedata!==null){
        var metdata = this.data[this.eschermetabolitedata].convert_listdatafiltered2escherobjectlist(metaboliteid,metabolitevalues);
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.metabolitedata !== "undefined"){
        var metdata = this.data[escherdataindex_I.metabolitedata].nestdatafiltered[0].values;
    } else{ 
        var metdata = null;
    };
    if (typeof escherdataindex_I === "undefined" && this.escherreactiondata!==null){
        var rxndata = this.data[this.escherreactiondata].convert_listdatafiltered2escherobjectlist(reactionid,reactionvalues);
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.reactiondata !== "undefined"){
        var rxndata = this.data[escherdataindex_I.reactiondata].nestdatafiltered[0].values;
    }else{ 
        var rxndata = null;
    };
    if (typeof escherdataindex_I === "undefined" &&  this.eschergenedata!==null){
        var genedata = this.data[this.eschergenedata].convert_listdatafiltered2escherobjectlist(geneid,genevalues);;
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.genedata !== "undefined"){
        var genedata = this.data[escherdataindex_I.genedata].nestdatafiltered[0].values;
    }else{ 
        var genedata = null;
    };
    if (typeof escherdataindex_I === "undefined" && this.eschermapdata!==null){
        var mapdata = this.data[this.eschermapdata].listdatafiltered[0].eschermap_json;
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.mapdata !== "undefined") {
        var mapdata = this.data[escherdataindex_I.mapdata].listdatafiltered[0].eschermap_json;
    }else{ 
        var mapdata = null;
    };
    if (typeof escherdataindex_I === "undefined" && this.eschermodeldata!==null){
        var modeldata = this.data[this.eschermodeldata];
    } else if (typeof escherdataindex_I !== "undefined" && typeof escherdataindex_I.modeldata !== "undefined"){
        var modeldata = this.data[escherdataindex_I.modeldata];
    }else{ 
        var modeldata = null;
    };
    if (typeof escherembeddedcss_I === "undefined"){
        var embeddedcss = this.escherembeddedcss;
    } else {
        var embeddedcss = escherembeddedcss_I;
    };
    if (typeof escheroptions_I === "undefined"){
        var options = this.escheroptions;
    } else {
        var options = escheroptions_I;
    };

    this.html.select("#"+id+"escher").remove();

    var htmlescher = this.html
        .append("div")
        //.attr("class","")
        .attr("id",id + "escher")
        .style("height","100%")
        .style("width","100%");

    // make the escher object
    d3.text('lib/builder-embed-1.0.0.css', function(e, css) {
        if (e) console.warn(e);
        var embeddedcss = "#"+id+"escher.div";
        var options = {unique_map_id:'escher01'};
        //var escherbuilder = escher.Builder(mapdata,modeldata,css,htmlescher,options);
        var escherbuilder = escher.Builder(null,null,css,htmlescher,options);
        if (mapdata){escherbuilder.load_map(mapdata,false);};
        if (modeldata){escherbuilder.load_model(modeldata,false);};
        if (metdata){escherbuilder.set_metabolite_data(metdata);};
        if (rxndata){escherbuilder.set_reaction_data(rxndata);};
        if (genedata){escherbuilder.set_gene_data(genedata);};
    });

};
d3_html.prototype.set_escher = function(escherdataindex_I,escherembeddedcss_I,escheroptions_I){
    // set escher parameters
    if (typeof escherdataindex_I.metabolitedata !== "undefined"){
        this.eschermetabolitedata = escherdataindex_I.metabolitedata;
    } else {
        this.eschermetabolitedata = null;
    };
    if (typeof escherdataindex_I.reactiondata !== "undefined"){
        this.escherreactiondata = escherdataindex_I.reactiondata;
    } else {
        this.escherreactiondata = null;
    };
    if (typeof escherdataindex_I.genedata !== "undefined"){
        this.eschergenedata = escherdataindex_I.genedata;
    } else {
        this.eschergenedata = null;
    };
    if (typeof escherdataindex_I.mapdata !== "undefined"){
        this.eschermapdata = escherdataindex_I.mapdata;
    } else {
        this.eschermetdata = null;
    };
    if (typeof escherdataindex_I.modeldata !== "undefined"){
        this.eschermodeldata = escherdataindex_I.modeldata;
    } else {
        this.eschermodeldata = null;
    };
    if (typeof escherembeddedcss_I !== "undefined"){
        this.escherembeddedcss = escherembeddedcss_I;
    } else {
        this.escherembeddedcss = null;
    };
    if (typeof escheroptions_I !== "undefined"){
        this.escheroptions = escheroptions_I;
    } else {
        this.escheroptions = null;
    };

};
d3_html.prototype.add_headeranddatalist_href = function(){
    // adds data lists groups with individual headers to the tile body
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.datakeymap.buttonparameter;
    var liparameter = this.datakeymap.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;;

    this.headergroup = this.html.selectAll("#" + id + "header-group")
        .data(nestdatafiltered)

    this.headergroupenter = this.headergroup.enter()
        .append("div")
        .attr("class","list-group-item")
//         .append("div")
//         .attr("class","row")
//         .append("div")
//         .attr("class","col-sm-6")
        .attr("id", id + "header-group");

    this.headergroup.exit().remove();

    //this.header = this.headergroup.selectAll("#" + id + "header")
    this.header = this.headergroup.selectAll('h4')
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.headerenter = this.header.enter()
        .append("h4")
        .attr("class","list-group-item-heading")
        //.attr("id",id + "header")
        .attr("id", function(d){return id + "h4" + d.key;})
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","").replace("_io","");});

    this.header.selectAll("h4")
        .attr("class","list-group-item-heading")
        //.attr("id",id + "header")
        .attr("id", function(d){return id + "h4" + d.key;})
        //specific text replace for sbaas:
        .text(function(d){return d.key.replace("export_data","").replace("_js","").replace("_io","");});

    this.header.exit().remove();

    this.select = this.headergroup.selectAll("select")
        .data(function(row){
            var keyvalues = [];
            keyvalues.push({key:row.key,values:row.values});
            return keyvalues;
            });

    this.selectenter = this.select.enter()
        .append("select")
        .attr("class","form-control")
        //.attr("id",function(d){return id + "select"+ d.key;});
        .attr("id",id + "select");

    this.select.selectAll("select")
        .attr("class","form-control")
        //.attr("id",function(d){return id + "select"+ d.key;});
        .attr("id",id + "select");

    this.select.exit().remove();

    this.option = this.select.selectAll("option")
        .data(function(row){
            var buttonlitext = [];
            var key = row.key;
            row.values.forEach(function(d){
                buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
                });
            return buttonlitext;
            });
    
    this.optionenter = this.option.enter()
        .append("option")
        .attr("id",id + "option")
        .attr("value",function(d,i){
            //var url = hrefurl+"?";
            var url = "";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.option.select("option")
        .attr("value",function(d,i){
            //var url = hrefurl+"?";
            var url = "";
            url += d.buttonparameter + "=" +d.buttontext+"&";
            url += d.liparameter + "=" + d.litext;
            return url;
            })
        .text(function(d,i){return d.litext;});

    this.option.exit().remove();
};
d3_html.prototype.add_headeranddatalistsubmit_href = function(){
    // add submit button trigger event for header and datalist html

    var button_idtext = this.button_idtext;
    var id = this.id;
    var tileid = this.tileid;
    var hrefurl = this.url;
	
	function go2url(){
	    //window.location.href = d3.select("#"+ id + "select").node().value;
        var url = hrefurl+"?";
        var nodevalue = d3.select("#"+ id + "select").node().value;
        //var selectnodes = d3.selectAll("#"+ id + "select");
        url += nodevalue;
	    window.location.href = url;
        // submit on enter
        var selection = d3.select(window),
        kc = 13;
        selection.on('keydown.' + kc, function () {
            if (d3.event.keyCode == kc) {
                submit();
            }
        });
	};

    d3.select("#"+ tileid + 'submitbutton'+button_idtext.id).on("click",go2url);

};
d3_html.prototype.export_filtermenujson = function () {
    // export the filter as json

    var a = document.createElement('a');
    a.download ="filter" + '.json'; // file name
    var j = JSON.stringify(this.data[0].filters);
    a.setAttribute("href-lang", "application/json");
    a.href = 'data:text/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};
//TODO: convert add_jsonimportandexportbutton2tile
// d3_html.prototype.add_submitbutton2form = function (button_idtext_I) {
//     // add submit button
//     // INPUT:
//     //e.g. {'id':'submit1','text':'submit'};
//     if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
//     else{var button_idtext = button_idtext_I;}

//     var id = this.id;
//     var tileid = this.tileid;

//     // note: chaining submitbuttongroup to htmlformenter instead of htmlform
//     // reason:      ensures that buttons will be added only once after a listener event
//     //              has been added to the property of the button.
//     this.submitbuttongroup = this.htmlformenter.selectAll(".btn-group")
//         .data(button_idtext)

//     this.submitbuttongroup.exit().remove();

//     this.submitbuttongroupenter = this.submitbuttongroup.enter()
//         .append("div")
//         .attr("class","btn-group")
//         .attr("id", id + "submitbtn-group");

//     this.submitbutton = this.submitbuttongroup.selectAll(".btn btn-default")
//         .data(function(row){
//             var idtext = [];
//             idtext.push({id:row.id,text:row.text});
//             return idtext;
//         });

//     this.submitbutton.exit().remove();

//     this.submitbutton.transition()
//         .attr("type","submit")
//         .attr("class", "btn btn-default")
//         .attr("id", function(d){return id + 'submitbutton' + d.id;})
//         .text(function(d){return d.text;});

//     this.submitbuttonenter = this.submitbutton.enter()
//         .append("button")
//         .attr("type","submit")
//         .attr("class", "btn btn-default")
//         .attr("id", function(d){return id + 'submitbutton' + d.id;})
//         .text(function(d){return d.text;});
// };
d3_html.prototype.add_htmlfooter2tile = function () {
    // add footer row to tile
    var tileid = this.tileid;

    // necessary to encapsolate import/export functions
    this.htmlfooter = d3.select('#'+this.tileid+"panel-footer")
        .append("div")
        .attr("class","row")
        .attr("id",tileid + 'footer')
        .append("div")
        .attr("class","col-lg-12");
};
d3_html.prototype.add_htmlheader2tile = function () {
    // add header row to tile
    var tileid = this.tileid;

    // necessary to encapsolate import/export functions
    this.htmlfooter = d3.select('#'+this.tileid+"panel-header")
        .append("div")
        .attr("class","row")
        .attr("id",tileid + 'header')
        .append("div")
        .attr("class","col-lg-12");
};
d3_html.prototype.add_jsonexportbutton2tile = function () {
    // add button to export the table element
    // http://www.html5rocks.com/en/tutorials/file/dndfiles/
    var this_ = this;
    var tileid = this.tileid;

    function exportfiltermenujson(){
        this_.export_filtermenujson(); //necessary to pass svg as "this"
    };

    var jsonexportbutton = this.htmlfooter
        .append("div")
        //.attr("class","glyphicon glyphicon-download pull-right")
        .attr("class","glyphicon glyphicon-save pull-right")
        .attr("id", tileid + 'jsonexportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","save filter");
    jsonexportbutton.on("click", exportfiltermenujson);
};
// d3_html.prototype.add_jsonimportandexportbutton2tile = function (htmlfooter_I) {
//     // add import and export buttons to tileid
//     var tileid = this.tileid;

//     // necessary to encapsolate import/export functions
//     if (typeof(htmlfooter_I)!=="undefined"){
//         this.htmlfooter = htmlfooter_I;
//     } else if (this.htmlfooter===null){
//         this.add_htmlfooter2tile();
//     };
    
//     this.add_jsonexportbutton2tile();
//     this.add_jsonimportbutton2tile();
// };
d3_html.prototype.add_refreshbutton2tile = function (htmlfooter_I) {
    // add refresh button to tile
    var this_ = this;
    var tileid = this.tileid;

    function refresh(){
        this_.render();
    };

    var refreshbutton = this.htmlfooter
        .append("div")
        .attr("class","glyphicon glyphicon-refresh pull-right")
        .attr("id", tileid + 'jsonexportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","refresh");
    refreshbutton.on("click", refresh);

};
//TODO: convert import closure to seperate function
d3_html.prototype.import_filtermenujson = function(){
    // import the filter from json
    // TODO...
    var filtermenu = null;
};
d3_html.prototype.add_jsonimportbutton2tile = function () {
    // add button to export the table element
    // http://www.html5rocks.com/en/tutorials/file/dndfiles/
    var this_ = this;
    var tileid = this.tileid;

    function importfiltermenujson(){
        var file1 = this.files[0];

        if (!file1) {
            alert("Failed to load file");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Get the data file
                    var result = e.target.result;
                    var filtermenu = JSON.parse(result);
                    this_.data[0].filters = filtermenu;
                    this_.data[0].filter_listdata();
                    this_.render();
                };
            })(file1);

            reader.readAsText(file1);
        };
    };

    var jsonimportbutton = this.htmlfooter
        .append("div")
        //.attr("class","glyphicon glyphicon-upload pull-right")
        .attr("class","glyphicon glyphicon-open pull-right")
        .attr("id", tileid + 'jsonimportbutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","import filter");

    var jsonimportbutton_input = jsonimportbutton
        .append("input")
        .attr("type", "file")
        .style({
            "position": "absolute",
            "top": "0",
            "right": "0",
            "min-width": "100%",
            "min-height": "100%",
            "font-size": "100px",
            "text-align": "right",
            "filter": "alpha(opacity=0)",
            "opacity":"0",
            "outline": "none",
            "background": "white",
            "cursor": "inherit",
            "display": 'block',
        });
    jsonimportbutton_input.on("change", importfiltermenujson);
};
d3_html.prototype.add_inputbuttongroup = function(button_text_I){
    /*add input button group
    INPUT:
    button_text_I = button text
    */
    var id = this.id;
    var listdatafiltered = [0];

    if(typeof(button_text_I)!=="undefined"){
        var button_text = button_text_I;
    } else {
        var button_text = "Browse...";
    };

    function updateData(e,d){
        //update the input with the name of the text file
        var input = d3.select("#" + id + 'inputgroupinput');
        input.val(d);  
        //replace the data object
        this.data=d;
    };

    function readFile(){
        var file1 = this.files[0];

        if (!file1) {
            alert("Failed to load file");
        } else if (!file1.type.match('')) {
            alert(file1.name + " is not a valid text file.");
        } else {
            load_json_or_csv(f, csv_converter, updateData);
        };
    };

    this.htmlinputgroup = this.html.selectAll(".input-group")
        .data(listdatafiltered);

    this.htmlinputgroup.exit().remove;
    this.htmlinputgroupenter = this.htmlinputgroup.enter()
        .append("div")
        .attr("class","input-group")
        .attr("id",id + 'input-group');

    this.htmpinputbuttongroup = this.htmlinputgroup.selectAll(".input-group-btn")
        .data(function(d){
            return listdatafiltered;
        });

    this.htmpinputbuttongroup.exit().remove;
    this.htmpinputbuttongroupenter = this.htmlinputbuttongroup.enter()
        .append("span")
        .attr("class","input-group-btn")
        .append("span")
        .attr("class","btn btn-primary btn-file")
        .text(button_text)
        .append("input")
        .attr("id",id + 'inputbuttongroupinput')
        .attr("type","file")
        .on("change",readFile);

    this.htmpinputgroupinput = this.htmlinputgroup.selectAll(".form-control")
        .data(function(d){
            return listdatafiltered;
        });

    this.htmpinputgroupinput.exit().remove;
    this.htmpinputgroupinputenter = this.htmlinputgroupinput.enter()
        .append("input")
        .attr("class","form-control")
        .attr("id",id + 'inputgroupinput')
        .attr("type","text");
};
d3_html.prototype.add_draganddrop = function (node_I,node_id_I,
                 drop_function_I,dragover_function_I,
                 dragenter_function_I,
                 dragleave_function_I) {
    // add drag and drop area
    var id = this.id;
    var listdatafiltered = [0]

    function cancel(e) {
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    }

    var this_ = this;

    function allowDrop() {
        if (d3.event){
            d3.event.preventDefault();
        };
    };
    function drop() {
        this_.trigger_drop();
    };
    function dragEnter() {
        if (d3.event){
            var tiletargetid = d3.event.target.id;
            if (tiletargetid.indexOf('col')===0 || tiletargetid.indexOf('row')===0){
                d3.event.target.style.background="grey";
            };
        };
    };

    this.htmldraganddrop = this.html.selectAll("draganddrop")
        .data([listdatafiltered]);

    this.htmldraganddropender = this.htmldraganddrop.enter()
        .append("div")
        .attr("id", id + 'draganddrop')
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragenter",dragEnter);

    this.draganddrop.exit().remove();
};  
d3_html.prototype.set_formsubmitbuttonidtext = function(button_idtext_I) {
    // set submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){this.button_idtext = {'id':'submit1','text':'submit'};}
    else{this.button_idtext = button_idtext_I;}
};
d3_html.prototype.get_htmldata1 = function(){
    /* get the html data1
    */
    return this.data[0];
};