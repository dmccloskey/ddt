d3_html = function () {
    // generic html element
    this.id = '';
    this.tileid = '';
    this.htmlelement = null;
    this.html = null;
    this.data = null;
    this.datakeymap = {}; // mapping of keys to data element, chart elements, or other descriptor
};
d3_html.prototype.add_html2tile = function(){
    // set the html
    var id = this.id;
    var tileid = this.tileid;
    var htmlclass = this.htmlclass;
    var listdatafiltered = this.data.listdatafiltered;
    var htmlheaders = this.htmlheaders;

    this.html = d3.select('#'+tileid+"panel-body").selectAll(".html-responsive")
        .data([listdatafiltered]);

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
    // set the htmlid
    this.data = data_I;
};
d3_html.prototype.set_datakeymap = function(datakeymap_I){
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
    for (i = 0; i < selectionstyle_I.length; i++) {
        d3.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_html.prototype.add_draganddrop = function () {
    // add file drag and drop for input
};
d3_html.prototype.add_checkbox = function () {
    // add checkbox for input
};
d3_html.prototype.add_color = function () {
    // add color pallet for input
};
d3_html.prototype.add_range = function () {
    // add range slider for input
};
d3_html.prototype.add_form = function(){
    // add form to tile
    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;

    this.htmlform = this.html.selectAll("form")
        .data([listdatafiltered]);

    this.htmlformenter = this.htmlform.enter()
        .append("form")
        .attr("id", id + 'form');

    this.htmlform.exit().remove();

}
d3_html.prototype.add_input2form = function () {
    // add text area for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];
//     if (texarea_valuetext_I){var textarea_valuetext = texarea_valuetext_I;}
//     else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};

    var id = this.id;
    var textarea_valuetext = this.data.convert_filter2stringmenuinput();

//     this.htmlform = this.html.append("div")
//         .attr("class","form-group")
//         .attr("id", id + 'form');

//     for (i=0;i<textarea_valuetext.length;i++){
//         var formlabel = this.htmlform.append("label")
//             .text(textarea_valuetext[i].text)
//             .attr("id", id + 'formlabel' + textarea_valuetext[i].text);
//         var forminput = this.htmlform.append("input")
//             .attr("class","form-control")
//             .attr("type","text")
//             .attr("placeholder",textarea_valuetext[i].value)
//             .attr("value",textarea_valuetext[i].value)
//             .attr("id", id + 'forminput'+ textarea_valuetext[i].text);
//     };

    this.htmlformgroup = this.htmlform.selectAll(".form-group")
        .data(textarea_valuetext);

    this.htmlformgroupenter = this.htmlformgroup.enter()
        .append("div")
        .attr("class","form-group")
        .attr("id", id + 'form-group');

    this.htmlformgroup.exit().remove();

    this.htmlformlabel = this.htmlformgroup.selectAll("label")
        .data(function(row){
            var textvalue = [];
            textvalue.push({text:row.text,value:row.value});
            return textvalue;
        });

    this.htmlformlabelenter = this.htmlformlabel.enter()
        .append("label")
        .attr("id", function(d){return id + 'formlabel' + d.text;})
        .text(function(d){return d.text;});

    this.htmlformlabel.transition()
        .attr("id", function(d){return id + 'formlabel' + d.text;})
        .text(function(d){return d.text;});

    this.htmlformlabel.exit().remove();

    this.htmlforminput = this.htmlformgroup.selectAll("input")
        .data(function(row){
            var textvalue = [];
            textvalue.push({text:row.text,value:row.value});
            return textvalue;
        });

    this.htmlforminput.exit().remove();

    this.htmlforminput.transition()
        .attr("class","form-control")
        .attr("type","text")
        .attr("value",function(d){return d.value;})
        .attr("id", function(d){return id + 'forminput' + d.text;});

    this.htmlforminputenter = this.htmlforminput.enter()
        .append("input")
        .attr("class","form-control")
        .attr("type","text")
        //.attr("placeholder",textarea_valuetext[i].value)
        .attr("value",function(d){return d.value;})
        .attr("id", function(d){return id + 'forminput' + d.text;});
};
d3_html.prototype.update_forminput = function(textarea_valuetext_I){
    // update the form
    var id = this.id;
    if (texarea_valuetext_I){var textarea_valuetext = texarea_valuetext_I;}
    else{var textarea_valuetext = this.data.convert_filter2stringmenuinput();};

    for (i=0;i<textarea_valuetext_I.length;i++){
        d3.select("#"+id + 'forminput'+ textarea_valuetext[i].text).node().value=textarea_valuetext[i].value;
    };
};
d3_html.prototype.add_submitbutton2form = function (button_idtext_I) {
    // add submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
    else{var button_idtext = button_idtext_I;}

    var id = this.id;
    var tileid = this.tileid;

    // note: chaining submitbuttongroup to htmlformenter instead of htmlform
    // reason:      ensures that buttons will be added only once after a listener event
    //              has been added to the property of the button.
    this.submitbuttongroup = this.htmlformenter.selectAll(".btn-group")
        .data(button_idtext)

    this.submitbuttongroup.exit().remove();

    this.submitbuttongroupenter = this.submitbuttongroup.enter()
        .append("div")
        .attr("class","btn-group")
        .attr("id", id + "submitbtn-group");

    this.submitbutton = this.submitbuttongroup.selectAll(".btn btn-default")
        .data(function(row){
            var idtext = [];
            idtext.push({id:row.id,text:row.text});
            return idtext;
        });

    this.submitbutton.exit().remove();

    this.submitbutton.transition()
        .attr("type","submit")
        .attr("class", "btn btn-default")
        .attr("id", function(d){return id + 'submitbutton' + d.id;})
        .text(function(d){return d.text;});

    this.submitbuttonenter = this.submitbutton.enter()
        .append("button")
        .attr("type","submit")
        .attr("class", "btn btn-default")
        .attr("id", function(d){return id + 'submitbutton' + d.id;})
        .text(function(d){return d.text;});
};
d3_html.prototype.add_dropdownbuttongroup_href = function () {
    // add dropdown button group to the body of the html
    // each list element will have an href of the form:
    //      url_I?buttonparametername=buttontext&lliparametername=litextoption1

    var listdatafiltered = this.data.listdatafiltered;
    var nestdatafiltered = this.data.nestdatafiltered;
    var buttonparameter = this.buttonparameter;
    var liparameter = this.liparameter;
    var litext = this.datakeymap.litext;
    var hrefurl = this.url;

    var id = this.id;
    var tileid = this.tileid;

    //v1:
//     this.buttongroup = this.html.append("div")
//         .attr("class","btn-group")
//         .attr("id", id + "btn-group");

//     for (i=0;i<btntext_litext.length;i++){
//         var button = this.buttongroup.append("button")
//             .attr("id", id + 'button' + btntext_litext[i].buttontext)
//             .attr("class", "btn btn-default btn-lg dropdown-toggle" )
//             .attr("data-toggle", "dropdown")
//             .attr("aria-expanded", "false")
//             .text(btntext_litext[i].buttontext)
//             .append("span")
//             .attr("class","caret");
//         var ul = this.buttongroup.append("ul")
//             .attr("class","dropdown-menu")
//             .attr("id",id + "dropdown-menu"+ btntext_litext[i].buttontext)
//             .attr("role","menu");
//         for (j=0;j<btntext_litext[i].litext.length;j++){
//             var url = url_I+"?"
//             url += btntext_litext[i].buttonparameter + "=" +btntext_litext[i].buttontext+"&";
//             url += btntext_litext[i].liparameter + "=" +btntext_litext[i].litext[j];
//             var li = ul.append("li").append("a")
//                 //.attr("href","#")//default
//                 .attr("href",url)//default
//                 .text(btntext_litext[i].litext[j]);
//         };
//     };

    //v2:
//     this.buttongroup = this.html.selectAll(".btn-group")
//         .data([nestdatafiltered])

//     this.buttongroupenter = this.buttongroup.enter()
//         .append("div")
//         .attr("class","btn-group")
//         .attr("id", id + "btn-group");

//     this.buttongroup.exit().remove();

//     this.button = this.buttongroup.selectAll(".btn btn-default dropdown-toggle")
//         .data(nestdatafiltered);

//     this.buttonenter = this.button.enter()
//         .append("button")
//         .attr("class", "btn btn-default dropdown-toggle" )
//         .attr("data-toggle", "dropdown")
//         .attr("aria-expanded", "false")
//         .text(function(d){return d.key;})
//         .append("span")
//         .attr("class","caret");

//     this.button
//         .attr("class", "btn btn-default dropdown-toggle" )
//         .attr("data-toggle", "dropdown")
//         .attr("aria-expanded", "false")
//         .text(function(d){return d.key;})
//         .append("span")
//         .attr("class","caret");

//     this.button.exit().remove();

//     this.ul = this.buttongroup.selectAll(".dropdown-menu")
//         .data(nestdatafiltered);

//     this.ulenter = this.ul.enter()
//         .append("ul")
//         .attr("class","dropdown-menu")
//         .attr("id",function(d){return id + "dropdown-menu"+ d.key;})
//         .attr("role","menu");

//     this.ul.exit().remove();

//     this.li = this.ul.selectAll("li")
//         .data(function(row){
//             var buttonlitext = [];
//             var key = row.key;
//             row.values.forEach(function(d){
//                 buttonlitext.push({buttontext:key, litext:d[litext],buttonparameter:buttonparameter,liparameter:liparameter});
//                 });
//             return buttonlitext;
//             });
    
//     this.lienter = this.li.enter()
//         .append("li").append("a")
//         .attr("href",function(d,i){
//             var url = hrefurl+"?";
//             url += d.buttonparameter + "=" +d.buttontext+"&";
//             url += d.liparameter + "=" + d.litext;
//             return url;
//             })
//         .text(function(d,i){return d.litext;});

//     this.li.select("a")
//         .attr("href",function(d,i){
//             var url = hrefurl+"?";
//             url += d.buttonparameter + "=" +d.buttontext+"&";
//             url += d.liparameter + "=" + d.litext;
//             return url;
//             })
//         .text(function(d,i){return d.litext;});

//     this.li.exit().remove();

    this.buttongroup = this.html.selectAll(".btn-group")
        .data(nestdatafiltered)

    this.buttongroupenter = this.buttongroup.enter()
        .append("div")
        .attr("class","btn-group")
        .attr("id", id + "btn-group");

    this.buttongroup.exit().remove();

    this.button = this.buttongroup.selectAll(".btn btn-default dropdown-toggle")
        .data(function(row){
            var keys = [];
            keys.push({key:row.key});
            return keys;
        });

    this.buttonenter = this.button.enter()
        .append("button")
        .attr("class", "btn btn-default dropdown-toggle" )
        .attr("data-toggle", "dropdown")
        .attr("aria-expanded", "false")
        .text(function(d){return d.key;})
        .append("span")
        .attr("class","caret");

    this.button
        .attr("class", "btn btn-default dropdown-toggle" )
        .attr("data-toggle", "dropdown")
        .attr("aria-expanded", "false")
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
d3_html.prototype.set_buttonliparameters = function(buttonparameter_I,liparameter_I){
    // set button parameter and li parameters
    this.buttonparameter = buttonparameter_I;
    this.liparameter = liparameter_I;
}