"use strict";
//implement sortable and editable table using d3 and bootstrap
//inherit from d3_html? reasoning: inherit buttons (e.g. glyphicon sort)
//var d3_table = function (){
function d3_table(){
    this.id = '';
    this.tileid = '';
    this.tableclass = '';
    this.table = null;
    this.data = null;  
    this.tableheaders = [];
    this.datakeymap = null;
    this.ntablerows = 25;
    this.tablecurrentpage = 1;
    this.tablesearch = true;

};
d3_table.prototype.add_table2tile = function(){
    // set the table
    var id = this.id;
    var tileid = this.tileid;
    var tableclass = this.tableclass;
    var listdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;

//     this.table = d3.select('#'+tileid+"panel-body").append("div")
//         .attr("class","table-responsive")
//         .append("table")
//         .attr("class",tableclass)
//         .attr("id",id+"table");

    this.tableelement = d3.select('#'+tileid+"panel-body").selectAll(".table-responsive")
        .data([listdatafiltered]);

    this.tableenter = this.tableelement.enter()
        .append("div")
        .attr("class","table-responsive")
        .append("table")
        .attr("class",tableclass)
        .attr("id",id+"table");

    this.table = this.tableelement.select("table");
    this.tableelement.exit().remove();

};
d3_table.prototype.set_tableheader = function(){
    // set the table header
    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;

//     this.thead = this.table
//         .append("thead")
//         .attr("id",id+"tableheader");
    
    this.theadelement = this.table.selectAll("thead")
        .data([listdatafiltered]);

    this.theadenter = this.theadelement.enter()
        .append("thead")
        .attr("id",id+"tableheader");

    this.thead = this.table.select("thead");
    //this.thead = this.theadelement.select("thead");
    this.theadelement.exit().remove();

};
d3_table.prototype.add_tableheader = function(){
    // add the table header
    var id = this.id;
    var tileid = this.tileid;
    var tableheaders = this.tableheaders;

    //table header
// //     this.tableheader = this.thead.append("tr").selectAll("th")
// //         .data(tableheaders);

//     this.tableheader = this.thead.append("tr").selectAll("th")
//         .data(tableheaders);
// //     this.tableheader = this.theadenter.append("tr").selectAll("th")
// //         .data(tableheaders);
        
    this.tableheaderrow = this.thead.selectAll("tr")
        .data([tableheaders]);

    this.tableheaderrowenter = this.tableheaderrow.enter()
        .append("tr");

    this.tableheader = this.tableheaderrow.selectAll("th")
        .data(tableheaders);

    this.tableheaderenter = this.tableheader.enter();
    this.tableheaderenter
    	.append("th")
        .attr('id',function (d) { return id+'th'+d; })
        .text(function (d) { return d; });

    this.tableheaderupdate = this.tableheader.transition();
    this.tableheaderupdate.select("th")
        .attr('id',function (d) { return id+'th'+d; })
        .text(function (d) { return d; });

    this.tableheader.exit().remove();

    this.tableheaderrow.exit().remove();

};
d3_table.prototype.set_tablebody = function(){
    // set the table body
    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;

    this.tbodyelement = this.table.selectAll("tbody")
        .data([listdatafiltered]);

    this.tbodyenter = this.tbodyelement.enter()
        .append("tbody")
        .attr("id",id+"tablebody");

    this.tbody = this.table.select("tbody");
    //this.tbody = this.tbodyelement.select("tbody");

    this.tbodyelement.exit().remove();

};
d3_table.prototype.add_tablebody = function(){
    /* add the table body
    */

    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered.slice(
//     	0,this.ntablerows);
    	this.ntablerows * (this.tablecurrentpage - 1), +((this.ntablerows * this.tablecurrentpage) - 1) + 1 || 9e9);
    var tableheaders = this.tableheaders;
        
    //table body

    this.tablerows = this.tbody.selectAll("tr")
        .data(datalistdatafiltered);

    this.tablerows.exit().remove();

    this.tablerowsenter = this.tablerows.enter()
        .append("tr")
        .attr('id',function (d,i) { return id+'tr'+i.toString(); });

    //this.tablecells = this.tablerowsenter.selectAll("td")
    this.tablecells = this.tablerows.selectAll("td")
        .data(function(row) {
            return tableheaders.map(function(column) {
                return {column: column, value: row[column], index_: row['index_']};
            });
        });

    this.tablecells.exit().remove();

    this.tablecellsenter = this.tablecells.enter();
    this.tablecellsenter.append("td")
        .html(function(d) { return d.value; })
        .attr('id',function (d) {
        	return id+'td'+d.index_.toString()+d.column;
        	});

    this.tablecells
    	.html(function(d) { return d.value; })
        .attr('id',function (d) { return id+'td'+d.index_.toString()+d.column; });

};
d3_table.prototype.set_tablefooter = function(){
    // set the table footer
    var id = this.id;
    var listdatafiltered = this.data.listdatafiltered;

    this.tfootelement = this.table.selectAll("tfoot")
        .data([listdatafiltered]);

    this.tfootenter = this.tfootelement.enter()
        .append("tfoot")
        .attr("id",id+"tablefooter");

    this.tfoot = this.table.select("tfoot");
    //this.tfoot = this.tfootelement.select("tfoot");

    this.tfootelement.exit().remove();

};
d3_table.prototype.add_tablefooter = function(){
    /* add the table footer
    TODO: implement as a blank for adding in new rows?
    */

    var id = this.id;
    var tileid = this.tileid;
    var tablefooters = this.tablefooters;
        
    //table footer rows
    this.tablefooterrows = this.tfoot.selectAll("tr")
        .data([tablefooters]); //single row
    this.tablefooterrows.exit().remove();
    this.tablefooterrows.transition()
        .attr('id',function (d,i) { return id+'trfooter'+i.toString(); });
    this.tablefooterrowsenter = this.tablefooterrows.enter()
        .append("tr")
        .attr('id',function (d,i) { return id+'trfooter'+i.toString(); });
	//table footer cells
    this.tablefootercells = this.tablefooterrows.selectAll("td")
        .data(function(row) {
            return tableheaders.map(function(column) {
                return {column: column, value: row[column], index_: row['index_']};
            });
        });
    this.tablefootercells.exit().remove();
    this.tablefootercellsenter = this.tablefootercells.enter();
    this.tablefootercellsenter.append("td")
        .html(function(d) { return d.value; })
        .attr('id',function (d) {
        	return id+'td'+d.index_.toString()+d.column;
        	});
    this.tablefootercells
    	.html(function(d) { return d.value; })
        .attr('id',function (d) { return id+'td'+d.index_.toString()+d.column; });
// 	// TESTING for tablerows,pagination,search
// 	// table footer cells
//     this.tablefootercells = this.tablefooterrows.selectAll("td")
//         .data(tablefooters);
//     this.tablefootercells.exit().remove();
//     this.tablefootercellsenter = this.tablefootercells.enter();
//     this.tablefootercellsenter.append("td")
//         .html(function(d) { return d; })
//         .attr('id',function (d) {return id+'tdfooter'+d;});
//     this.tablefootercells
//     	.html(function(d) { return d; })
//         .attr('id',function (d) { return id+'tdfooter'+d; });

};
d3_table.prototype.set_id = function(tableid_I){
    // set the tableid
    this.id = tableid_I;
};
d3_table.prototype.set_tileid = function(tabletileid_I){
    // set the table tileid
    this.tileid = tabletileid_I;
};
d3_table.prototype.set_tableclass = function(tableclass_I){
    // set the tableid
    this.tableclass = tableclass_I;
};
d3_table.prototype.add_data = function(data_I){
    // set the tableid
    this.data = data_I;
};
d3_table.prototype.partition_listdatafiltered2tableheaderandelements = function(){
    // partition list data to an array of headers and an array of values
    var tableheaders = [];
    var tableelements = [];
    var datalistdatafiltered = this.data.listdatafiltered;
    for (var i=0;i<datalistdatafiltered.length;i++){
        tableelements.push([]);
        for (var key in datalistdatafiltered[i]){
            if (i===0){
                tableheaders.push(key);
            };
            tableelements[i].push(datalistdatafiltered[i][key])
        };
    };
    return {tableheaders:tableheaders,tableelements:tableelements};
};
d3_table.prototype.extract_tableheaders = function(){
    // extract out headers from listdatafiltered
    this.tableheaders = [];
    var datalistdatafiltered = this.data.listdatafiltered;
    for (var key in datalistdatafiltered[0]){
        this.tableheaders.push(key);
    };
};
d3_table.prototype.set_tableheaders = function(headers_I){
    // set headers
    this.tableheaders = headers_I;
};
d3_table.prototype.add_tablecellfilter = function(){
    //filter the data on click
    //TODO:...
    var _this = this;

    this.tablecellsenter.on("click", function (d) {
        var column = null;
        var filters = [];
        _this.data.filters[column].forEach(function (n) { if (n !== d) { filters.push(n);}; });
        _this.data.filters[column] = filters;
        _this.data.filter_listdata();
        _this.render();
    });
};
d3_table.prototype.render = function(){
    //define the render function here...
};
d3_table.prototype.add_csvexportbutton2tile = function () {
    // add button to export the table element
    var csvexportbutton = d3.select('#'+this.tileid+"panel-footer").append("form");

//     var csvexportbutton_label = csvexportbutton.append("label");
//     csvexportbutton_label.text("Export as csv");

    var csvexportbutton_input = csvexportbutton.append("input");
    csvexportbutton_input.attr("type", "button")
        .attr("value", "Download CSV");
    csvexportbutton_input.on("click", this.export_tableelementcsv);

};
d3_table.prototype.add_jsonexportbutton2tile = function () {
    // add button to export the table element
    var jsonexportbutton = d3.select('#'+this.tileid+"panel-footer").append("form");

//     var jsonexportbutton_label = jsonexportbutton.append("label");
//     jsonexportbutton_label.text("Export as json");

    var jsonexportbutton_input = jsonexportbutton.append("input");
    jsonexportbutton_input.attr("type", "button")
        .attr("value", "Download JSON");
    jsonexportbutton_input.on("click", this.export_tableelementjson);

};
d3_table.prototype.add_csvandjsonexportbutton2tile = function () {
    // add button to export the table element
    var this_ = this;

    function exporttableelementjson(){
        this_.export_tableelementjson(); //necessary to pass svg as "this"
    };

    function exporttableelementcsv(){
        this_.export_tableelementcsv(); //necessary to pass svg as "this"
    };


    var exportbutton = d3.select('#'+this.tileid+"panel-footer").append("form")
        .attr("class","form-group")
        .append("div")
        .attr("class","btn-group");

    var csvexportbutton_input = exportbutton.append("input");
    csvexportbutton_input.attr("type", "button")
        .attr("value", "Download CSV");
    csvexportbutton_input.on("click", exporttableelementcsv);

    var jsonexportbutton_input = exportbutton.append("input");
    jsonexportbutton_input.attr("type", "button")
        .attr("value", "Download JSON");
    jsonexportbutton_input.on("click", exporttableelementjson);

};
d3_table.prototype.export_tableelementjson = function () {
    // export the table element as json
    //TODO: update using common json download method...

    var a = document.createElement('a');
    a.download ="table" + '.json'; // file name
    var j = JSON.stringify(this.data.listdatafiltered);
    a.setAttribute("href-lang", "application/json");
    a.href = 'data:application/json;charset=utf-8,' + j;
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);

    // definitions
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
};
d3_table.prototype.export_tableelementcsv = function () {
    // export the table element as csv
    //TODO: update using common csv download method...

    var a = document.createElement('a');
    a.download ="table" + '.csv'; // file name
    //generate the csv string
    var c = "";
    var tableheaderstableelements = this.partition_listdatafiltered2tableheaderandelements(this.data.listdatafiltered);
    c = tableheaderstableelements.tableheaders.join(",");
    c += '\n';
    tableheaderstableelements.tableelements.forEach(function(infoArray,index){
        var dataString = infoArray.join(",");
        c += index < tableheaderstableelements.tableelements.length ? dataString+ '\n' : dataString;
    }); 
    a.setAttribute("href-lang", "application/csv");
    a.href = 'data:application/csv;charset=utf-8,' + encodeURI(c);
    // <a> constructed, simulate mouse click on it
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
};
d3_table.prototype.set_tablecss = function (selectionstyle_I) {
    //set custom css style to table
    //Input:
    // selectionstyle_I = [{selection: string e.g., '.axis line, .axis path'
    //                      style: key:value strings e.g., {'fill': 'none', 'stroke': '#000',
    //                                                      'shape-rendering': 'crispEdges'}}]
    for (var i = 0; i < selectionstyle_I.length; i++) {
        this.table.selectAll(selectionstyle_I[i].selection)
            .style(selectionstyle_I[i].style);
    };
};
d3_table.prototype.set_headerstyle = function () {
    // predefined css style for table header rows
    var headerselector = ' th';
    var headerstyle = {
        'font-size': '14px',
        'word-wrap':'break-word',
        'text-align': 'center'
        };
    var selectorstyle = [{ 'selection': headerselector, 'style': headerstyle }]
    this.set_tablecss(selectorstyle);
};
d3_table.prototype.set_cellstyle = function () {
    // predefined css style table cells
    var cellselector = ' td';
    var cellstyle = {
        'font-size': '12px',
        'word-wrap':'break-word',
        'text-align': 'center'
    };
    var selectorstyle = [{ 'selection': cellselector, 'style': cellstyle }]
    this.set_tablecss(selectorstyle);
};
d3_table.prototype.set_tablestyle = function () {
    // predefined css style for table header rows
    var tableselector = "#" + this.tileid + " .table-responsive";
    //var tableselector = "#" + this.tileid + " table";
    var tablestyle = {
        //'table-layout': 'fixed',
    	//'display': 'block',
        'width': '100%',
        'height': '100%',
        //'height': '500px',
        'overflow-y': 'scroll',
        //'overflow-y': 'hidden',
        'overflow-x': 'scroll',
        'margin-bottom': '15px',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        //'border': '1px solid #ddd',
        '-webkit-overflow-scrolling': 'touch',
    };
    var selectorstyle = [{ 'selection': tableselector, 'style': tablestyle }]
    this.set_d3css(selectorstyle);
};
d3_table.prototype.set_tablebodystyle = function () {
    // predefined css style for table header rows
    var tableselector = "#" + this.tileid + " tbody";
    var tablestyle = {
    	'display': 'block',
    	'position': 'absolute', 
        'width': '100%',
        'height': '100%',
        //'height': '500px',
        'overflow-y': 'scroll',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        '-webkit-overflow-scrolling': 'touch',
    };
    var selectorstyle = [{ 'selection': tableselector, 'style': tablestyle }]
    this.set_d3css(selectorstyle);
};
d3_table.prototype.set_tablerowstyle = function () {
    // predefined css style for table rows
    var tableselector = "#" + this.tileid + " tr";
    var tablestyle = {
        'width': '100%',
    	'display': 'inline-table', 
		'table-layout': 'fixed',
    };
    var selectorstyle = [{ 'selection': tableselector, 'style': tablestyle }]
    this.set_d3css(selectorstyle);
};
d3_table.prototype.set_d3css = function (selectionstyle_I) {
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
d3_table.prototype.add_datafiltermenusubmitbutton = function (tileid_I,submitbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = this.submitbuttonid;};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        for (var key in this_.data.filters){
            var filterkey = d3.select("#"+tileid+'formlabel'+key).text();
            var filterstring = d3.select("#"+tileid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        this_.data.convert_stringmenuinput2filter(filterstringmenu);
        this_.data.filter_listdata();
        this_.render();
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("mousedown",submit);
};
d3_table.prototype.add_datafiltermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = this.resetbuttonid;};

    var this_ = this;
    
    function reset(){
        this_.data.reset_filters();
        this_.data.filter_listdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_table.prototype.set_datakeymaps = function(keymaps_I){
    //add datakeymaps
    if (!keymaps_I){
       console.warn("no data");
    } else if (keymaps_I.length===1){
        this.datakeymap = keymaps_I[0];
    } else {console.warn("more data found than what is currently supported");
    };
};
d3_table.prototype.add_tablesort = function(sort_settings_I){
    // sort the data
    // DESCRIPTION:
    // single click: sort in ascending order
    // double click: sort in descenting order
    // TODO:
    // add tooltip
    // add popover with sort asc and desc
    var id = this.id;
    var this_ = this;
    var tableheaders = this.tableheaders;

	var tableheadersortgroup = this.tableheader.data(tableheaders)
    var tableheadersortgroupenter = tableheadersortgroup.enter()
		.append("div")
        .attr("class","row");
	tableheadersortgroup.transition().attr("class","row");
	tableheadersortgroup.exit().remove();

	var tableheadersortasc = tableheadersortgroup.selectAll('.glyphicon-arrow-up')
		.data([0]);

	tableheadersortasc.exit().remove();
	tableheadersortasc.transition()
        .attr("class","glyphicon glyphicon-arrow-up")
        .attr("id", id + 'tableheadersortasc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");

	var tableheadersortascenter = tableheadersortasc.enter()
		.append("div")
        .attr("class","glyphicon glyphicon-arrow-up")
        .attr("id", id + 'tableheadersortasc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");
    tableheadersortascenter.on("click", function (d, i) {
            var order = [];
            var key_dir = {};
            key_dir[d]='asc';
            order.push(key_dir);
            this_.data.order_listdatafiltered(order);
            this_.data.order_nestdatafiltered(order);
            this_.render();
        });

	var tableheadersortdesc = tableheadersortgroup.selectAll('.glyphicon-arrow-down')
		.data([0]);

	tableheadersortdesc.exit().remove();
	tableheadersortdesc.transition()
        .attr("class","glyphicon glyphicon-arrow-down")
        .attr("id", id + 'tableheadersortdesc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort descending");

	var tableheadersortdescenter = tableheadersortdesc.enter()
		.append("div")
        .attr("class","glyphicon glyphicon-arrow-down")
        .attr("id", id + 'tableheadersortdesc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort descending");
    tableheadersortdescenter.on("click", function (d, i) {
            var order = [];
            var key_dir = {};
            key_dir[d]='desc';
            order.push(key_dir);
            this_.data.order_listdatafiltered(order);
            this_.data.order_nestdatafiltered(order);
            this_.render();
        });
};
// d3_table.prototype.add_tablesort = function(sort_settings_I){
//     // sort the data
//     // DESCRIPTION:
//     // single click: sort in ascending order
//     // double click: sort in descenting order
//     // TODO:
//     // add tooltip
//     // add popover with sort asc and desc
//     var id = this.id;
//     var this_ = this;

//     function showheaderpopover(key){
// //         // get the target id and associated filter key
//          var targetnode = d3.event.target;
//          var targetid = targetnode.id;
//          this_.show_headerpopover(targetid,key);
//     };

//     this.tableheader
//         .attr("data-toggle","popover")
//         .attr("data-placement","top")
//         .attr("data-html","true")
//         .attr("data-trigger","focus")
//         .on('click', function(d){
//             showheaderpopover(d);
//             });
// };
d3_table.prototype.show_headerpopover = function (targetid_I,key_I) {
    // show the search button popover element
    // INPUT:
    // targetid_I = event node button id
    // key_I = associated filter key

    var this_ = this;
    var id = this.id;

    function updatetextinput(){

    };

    //instantiate the popover menu object
    var popovertargetid = "#" + targetid_I;
    var popoverid = id+key_I;
    var menupopover = new d3_html_popover();
    menupopover.add_data([this.data]);
    menupopover.set_id(popoverid);
    menupopover.set_tileid(id);
    menupopover.add_popover2tile(popovertargetid);
    menupopover.add_header2popover();
    menupopover.add_title2popoverheader('Sort');
    menupopover.add_body2popover();
    menupopover.add_form2popoverbody();
    menupopover.add_content2popoverbodyform = function (){
        // add content to the popover body form
        var id = this.id;
        var formid = id + "popoverbodyform";

        var popoverbodyformbutton = this.popoverbodyform
            .append("button")
            .attr("class","btn btn-default")
            .attr("id",id+"popoverbodyformbutton")
            .text("Submit");

        popoverbodyformbutton.on("click",updatetextinput)
    };
    menupopover.add_content2popoverbodyform();

    // show the popover
    $(popovertargetid).popover({
        html: true,
        title: function () {
            return $("#"+popoverid+'popoverheader').html();
        },
        content: function () {
            return $("#"+popoverid+'popoverbody').html();
        }
    });
};
d3_table.prototype.show_tablemenumodal = function(){
    // show the table menu options modal
    var this_ = this;
    var id = this.id;
    var tileid = this.tileid;

    function updatetableparameters(){
        // update the table parameters

        // re-render the table

        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid+'modal').modal('hide');
    };

    //add the modal menu object
    var modalid = id + "tablemenubuttonmodal";
    var modaltargetid = "#" + id + 'tablemenubutton';
    var menumodal = new d3_html_modal();
    //menumodal.add_data([this.data]);
    menumodal.set_id(modalid);
    menumodal.set_tileid(tileid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('Table Options');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        // TODO:...
        // form to change table parameters including height, width, labels, label styling, etc.

        d3.select('#'+id+"modalfootersubmitbutton").on("click",updatetableparameters)
    };
    menumodal.add_content2modalbodyform();
    // show the modal
    $("#"+modalid+'modal').modal('show');
}
d3_table.prototype.add_tablemenubutton2optionsbuttongroup = function (){
    //add a menu button to the footer of the chart
    //TODO: re-implement using tabs
    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    var tablemenubutton = this.tableoptionsbuttongroup.append("div");

    function showtablemenumodal(){
        this_.show_tablemenumodal();
    };

    tablemenubutton
        .attr("class","pull-right")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","table options menu")
        .attr("id", id + 'tablemenubutton')

    var tablemenubuttontrigger = tablemenubutton
        .append("span")
        .attr("class","glyphicon  glyphicon glyphicon-menu-hamburger pull-right")
        .attr("id", id + 'tablemenubuttonglyphicon')
        .attr("aria-hidden","true");

    tablemenubuttontrigger.on("click",showtablemenumodal);

};
d3_table.prototype.add_optionsbuttongroup2footer = function(){
    // add options button group to footer

    var id = this.id;

    this.tableoptionsbuttongroup = d3.select('#'+this.tileid+"panel-footer")
        .append("div")
        .attr("class","btn-group pull-right")
        .attr("id", id + 'tableoptionsbuttongroup');
};
d3_table.prototype.add_tablecolumnoptions = function(){
    // sort the data
    // DESCRIPTION:
    // single click: sort in ascending order
    // double click: sort in descenting order
    // TODO:
    // add tooltip
    // add popover with sort asc and desc
    var id = this.id;
    var this_ = this;
    var tableheaders = this.tableheaders;

    function showcolumnoptionsmenumodal(){
        this_.show_columnoptionsmenumodal(id+"table");
    };    

	this.tableheader
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","column options")
        .on('click', showcolumnoptionsmenumodal);
};
d3_table.prototype.show_columnoptionsmenumodal = function(targetid_I){
    // show the column menu options modal
    var this_ = this;
    var id = this.id;
    var tileid = this.tileid;
    var tableheadersd3data = this.convert_tableheaders2d3data();

    function changetablecolumns(){
        //...
    };

    function updatetablecolumns(){
        // update the table columns
        this.update_forminput();
        var tableheaders = this.get_formdata().filters['column_name'];
        this_.set_tableheaders(tableheaders);
        this_.render();
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid+'modal').modal('hide');
    };

    //add the modal menu object
    var modalid = id + "columnmenu";
    var modaltargetid = "#" + targetid_I;
    //remove the previous modal
    d3.select("#"+modalid+'modal').remove();
    var menumodal = new d3_html_modal();

    menumodal.add_ndata([tableheadersd3data]);
    menumodal.set_id(modalid);
    menumodal.set_tileid(tileid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('Column Options');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        var formgroup_I = {};
        formgroup_I['inputarguments']=this.get_formdata().convert_filter2forminput();

        var formid = id + "modalbodyform";
        formgroup_I['node_id']='#'+formid;

        this.add_forminput2form(formgroup_I);

        d3.select('#'+id+"modalfootersubmitbutton").on("click",updatetablecolumns.bind(this))
    };
    menumodal.add_content2modalbodyform();
    // show the modal
    $("#"+modalid+'modal').modal('show');
};
d3_table.prototype.convert_tableheaders2listdata = function(){
    // convert table headers to listdata
    var tableheaders = this.tableheaders;
    
    var tableheaderslistdata = [];
    tableheaders.forEach(function(d){
        tableheaderslistdata.push({'column_name':d});
    });
    return tableheaderslistdata;
};
d3_table.prototype.convert_tableheaderslistdata2tableheaders = function(tableheaderslistdata_I){
    // convert table headers to listdata
    var tableheaderslistdata = tableheaderslistdata_I;
    var tableheaders = [];
    
    tableheaderslistdata.forEach(function(d){
        tableheaders.push(d['column_name']);
    });
    return tableheaders;
};
d3_table.prototype.convert_tableheaders2d3data = function(){
    //convert tableheaders to d3_data
    var tableheaderslistdata = this.convert_tableheaders2listdata();
    var tablekeys = ['column_name'];
    var tablenestkeys = ['column_name'];
    var d3data = new d3_data();
    d3data.set_keys(tablekeys);
    d3data.set_listdata(tableheaderslistdata,tablenestkeys);
    d3data.add_usedkey2listdata(); //ensure a used_ key in each data object
    d3data.reset_filters();
    return d3data;
};
d3_table.prototype.set_tablecellszoom = function (fontsizezoom_I,fontsizeoriginal_I){
	/*add table row zoom on row hover
	INPUT:
	fontsizezoom_I = string, fontsize zoom (e.g. default = '14px')
	fontsizeoriginal_I = string, fontsize original (e.g. default = '8px')
	TODO: maintain column width on fontSize change
	*/

	if (typeof(fontsizezoom_I)!=="undefined"){
	    var fontsizezoom = fontsizezoom_I;
	} else {
	    var fontsizezoom = '14px';
	};
	if (typeof(fontsizeoriginal_I)!=="undefined"){
	    var fontsizeoriginal = fontsizeoriginal_I;
	} else {
	    var fontsizeoriginal = '12px';
	};

	this.tablecells
	   .on("mouseover",function(d){
            //Change cell font size
            d3.event.target.style['fontSize']=fontsizezoom;
        })
        .on("mouseout", function (d) {
            //Change cell font size
            d3.event.target.style['fontSize']=fontsizeoriginal;
        });
};
d3_table.prototype.set_tablerowszoom = function (fontsizezoom_I,fontsizeoriginal_I){
	/*add table row zoom on row hover
	fontsizezoom_I = string, fontsize zoom (e.g. default = '14px')
	fontsizeoriginal_I = string, fontsize original (e.g. default = '8px')
	TODO: maintain column width on fontSize change
	*/

	if (typeof(fontsizezoom_I)!=="undefined"){
	    var fontsizezoom = fontsizezoom_I;
	} else {
	    var fontsizezoom = '14px';
	};
	if (typeof(fontsizeoriginal_I)!=="undefined"){
	    var fontsizeoriginal = fontsizeoriginal_I;
	} else {
	    var fontsizeoriginal = '12px';
	};

	this.tablerowsenter
	   .on("mouseover",function(d){
            //Change row font size
            var cell = d3.event.target;
            var cells = cell.parentNode.children;
            for (var i=0; i<cells.length; i++){
               cells[i].style['fontSize']=fontsizezoom;
            };
        })
        .on("mouseout", function (d) {
            //Change row font size
            var cell = d3.event.target;
            var cells = cell.parentNode.children;
            for (var i=0; i<cells.length; i++){
               cells[i].style['fontSize']=fontsizeoriginal;
            };
        });
};
d3_table.prototype.set_tablecellseditor = function (options_I){
	/*add table row zoom on row hover
	INPUT:
	*/

	if (typeof(options_I)!=="undefined"){
	    var options = options_I;
	} else {
	    var options = null;
	};

    var id = this.id;
    var this_ = this;

	//split #1
	this.tablecells
	   .on("click",function(d){
            //Change cell font size
            var cell = d3.event.target;
            cell.contentEditable="true";
        })
        .on("blur",function(d){
            var cell = d3.event.target;
            var cellupdate = {};
            cellupdate[d.column]=cell.innerHTML;
            //cellupdate[d.column]=d.value;
            this_.data.update_listdata(cellupdate,d.index_);

		})
		;
	//split #2
//     function tablecellseditorpopover(d){
// //         // get the target id and associated filter key
//          var targetnode = d3.event.target;
//          var targetid = targetnode.id;
//          this_.show_tablecellseditorpopover(targetid,d);
//     };

//     this.tablecells
//         .attr("data-toggle","popover")
//         .attr("data-placement","top")
//         .attr("data-html","true")
//         .attr("data-trigger","focus")
//         .on('click', function(d){
//             tablecellseditorpopover(d);
//             });
};
d3_table.prototype.show_tablecellseditorpopover = function (targetid_I,d_I) {
    /* show the search button popover element
    INPUT:
    targetid_I = event node button id
    d_I = associated cell data
    TODO: fix bugs to allow modal to close
    TODO: add in functions to update the data
    */ 

    var this_ = this;
    var id = this.id;

    function savetextinput(){
    	// update the data by index and key

        // prevent browser default page refresh
        d3.event.preventDefault();
    };
		
    function discardtextinput(){
        // prevent browser default page refresh
        d3.event.preventDefault();
		$(popovertargetid).popover('hide');
    };

	//make the popover data
	//var data_I = {'data':[{"value":d_I.value}],'datakeys':Object.keys(d_I),'datanestkeys':Object.keys(d_I)[0]}
	var data_I = {'data':[{"value":d_I.value}],'datakeys':["value"],'datanestkeys':["value"]}
	var d3data = new d3_data();
	d3data.set_keys(data_I.datakeys);
	d3data.set_listdata(data_I.data,data_I.datanestkeys);
	d3data.add_usedkey2listdata(); //ensure a used_ key in each data object
	d3data.add_indexkey2listdata(); //ensure a index_ key in each data object
	d3data.reset_filters();

    //instantiate the popover menu object
    var popovertargetid = "#" + targetid_I;
    var popoverid = id+d_I.column;
    //remove the previous modal
    d3.select("#"+popoverid+'popover').remove();
    var menupopover = new d3_html_popover();

    menupopover.add_ndata([d3data]);
    menupopover.set_id(popoverid);
    menupopover.set_tileid(id);
    menupopover.add_popover2tile(popovertargetid);
    menupopover.add_header2popover();
    menupopover.add_title2popoverheader('Edit cell');
    menupopover.add_body2popover();
    menupopover.add_form2popoverbody();
    menupopover.add_content2popoverbodyform = function (){
        // add content to the popover body form
        var id = this.id;
        var formid = id + "popoverbodyform";

        var formgroup_I = {};
        formgroup_I['inputarguments']=this.get_formdata().convert_filter2forminput();
        formgroup_I['node_id']='#'+formid;

        this.add_forminput2form(formgroup_I);
        this.add_buttongroup2popoverbodyform();
		this.add_savebutton2popoverbodyformbuttongroup();
		this.add_discardbutton2popoverbodyformbuttongroup();

        this.popoverbodysavebutton.on("click",savetextinput.bind(this));
        this.popoverbodydiscardbutton.on("click",discardtextinput);
    };
    menupopover.add_content2popoverbodyform();

    // show the popover
    $(popovertargetid).popover({
        html: true,
        title: function () {
            return $("#"+popoverid+'popoverheader').html();
        },
        content: function () {
            return $("#"+popoverid+'popoverbody').html();
        }
    })
    $(popovertargetid).popover('show');
};
d3_table.prototype.set_tablefooters = function(footers_I){
	/*set the default number of table rows displayed
	INPUT:
	footers_I = list of table footers
	*/
	if (typeof(footers_I)!=="undefined"){
		this.tablefooters = footers_I;
	} else {
		this.tablefooters = ["table rows","pagination","search"];
	};
};
d3_table.prototype.add_refreshbutton2optionsbuttongroup = function (){
    // add refresh button to the footer of the chart

    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    function refreshtile(){
        //refresh the tile
        this_.render();        
    };

    var tablerefreshbutton = this.tableoptionsbuttongroup.append("div");

    tablerefreshbutton
        .attr("class","glyphicon glyphicon glyphicon-refresh pull-right")
        .attr("id", tileid + 'refreshtile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","refresh");
    tablerefreshbutton.on("click",refreshtile);
};
// table navbar logic:
d3_table.prototype.set_ntablerows = function(ntablerows_I){
	/*set the default number of table rows displayed
	INPUT:
	ntablerows_I = integer
	*/
	if (typeof(ntablerows_I)!=="undefined"){
		var ntablerows = ntablerows_I;
	} else {
		var ntablerows = 100;
	};
	this.ntablerows = ntablerows>this.data.listdatafiltered.length ? this.data.listdatafiltered.length : ntablerows;
};
d3_table.prototype.get_ntablerows = function(){
	/*return the default number of table rows displayed
	*/
	return this.ntablerows;
};
d3_table.prototype.set_tablecurrentpage = function(tablecurrentpage_I){
	/*set the current table page
	INPUT:
	tablecurrentpage_I = integer
	*/
	if (typeof(tablecurrentpage_I)!=="undefined"){
		this.tablecurrentpage = tablecurrentpage_I;
	} else {
		this.tablecurrentpage = 1;
	};
};
d3_table.prototype.get_tablecurrentpage = function(){
	/*return the current table page
	*/
	return this.tablecurrentpage;
};
d3_table.prototype.add_tablerowlimit2tablenavbar = function(){
    /* add the table row limit input

    */

    var id = this.id;
    var this_ = this;
    var tileid = this.tileid;
    var ntablerows = this.ntablerows;

	var tablerowlimitgroup = this.tablenavbarenter
		.select('#'+id+"tablenavbarlabels"+"rows")
		.selectAll(".input-group")
		.data([0]);
	tablerowlimitgroup.exit().remove();
	tablerowlimitgroup.transition()
        .attr("class","input-group");
	var tablerowlimitgroupenter = tablerowlimitgroup.enter()
		.append("div")
        .attr("class","input-group");

	var tablerowlimitinput = tablerowlimitgroup
		.selectAll("input")
		.data([ntablerows]);
	tablerowlimitinput.exit().remove();
	tablerowlimitinput.transition()
        .attr("type","text")
        .attr("placeholder",function(d){return d;})
        .attr("value",function(d){return d;})
        .attr("class","form-control");
	var tablerowlimitinputenter = tablerowlimitinput.enter()
		.append("input")
        .attr("type","text")
        .attr("placeholder",function(d){return d;})
        .attr("value",function(d){return d;})
        .attr("class","form-control");

	var tablerowlimitbutton = tablerowlimitgroup
		.selectAll("button")
		.data([ntablerows]);
	tablerowlimitbutton.exit().remove();
	tablerowlimitbutton.transition()
        .attr("type","text")
        .attr("type","button")
        .text("Change")
        .attr("class","btn btn-default");
	var tablerowlimitbuttonenter = tablerowlimitbutton.enter()
		.append("span")
		.attr("class",'input-group-btn')
		.append("button")
        .attr("type","button")
        .text("Change")
        .attr("class","btn btn-default");
	tablerowlimitbutton.on("click",function(d){
		var value = parseFloat(this.parentNode.children[0].value);
		this_.set_ntablerows(value);
		this_.render();

	})

// ntable rows
	//<div class="row">
//   <div class="col-lg-6">
// 	<label>Your vanity URL</label>
//     <div class="input-group">
//       <input type="text" class="form-control" placeholder="Search for...">
//       <span class="input-group-btn">
//         <button class="btn btn-default" type="button">update</button>
//       </span>
//     </div><!-- /input-group -->
//   </div><!-- /.col-lg-6 -->
// </div><!-- /.row -->
};
d3_table.prototype.add_tablepagination2tablenavbar = function(npagesmax_I=4){
    /* add the table pagination input
	TODO: page numbers are not updating...
    */
	var this_ = this;
	var id = this.id;
	var npagesmax = npagesmax_I;
    var currentpage = this.tablecurrentpage;
    var lastpage = Math.ceil(this.data.listdatafiltered.length / this.ntablerows);
    
	//TODO: move code block to seperate function?
    //dynamically determine the page number buttons to show
    //assumption: startpage = 1
	function calculate_pagesStartAndEnd(npagesmax,currentpage,lastpage){
		var pagesstart = currentpage-Math.floor(npagesmax_I/2)<1 ? 1 : currentpage-Math.floor(npagesmax_I/2);
		var pagesend = pagesstart + npagesmax;
		//var pagesend = currentpage+Math.ceil(npagesmax_I/2)>lastpage ? lastpage : currentpage+Math.ceil(npagesmax_I/2);
		return {pagesstart:pagesstart,pagesend:pagesend};
	};
	function check_pagesStartAndEnd(npagesmax,currentpage,lastpage,pagesstart,pagesend){
		if (pagesstart === 1 && pagesend === lastpage && pagesend-pagesstart < npagesmax){
			npagesmax = pagesend-pagesstart;
			get_pagesStartAndEnd(npagesmax,currentpage,lastpage);
		} else if (pagesend > npagesmax){
			pagesstart = pagesend - npagesmax;
			check_pagesStartAndEnd(npagesmax,currentpage,lastpage,pagesstart,pagesend);
// 		} else if (pagesstart === 1){
// 			pagesend = pagesstart + npagesmax;
// 			check_pagesStartAndEnd(npagesmax,currentpage,lastpage,pagesstart,pagesend);
		} else {
			return {pagesstart:pagesstart,pagesend:pagesend};
		};
	};
    function get_pagesStartAndEnd(npagesmax,currentpage,lastpage){
		var pages1 = calculate_pagesStartAndEnd(npagesmax,currentpage,lastpage);
		var pages2 = calculate_pagesStartAndEnd(
			npagesmax,currentpage,lastpage,
			pages1.pagesstart,pages1.pagesend);
		return pages2;
    };
    function get_pages(npagesmax,currentpage,lastpage){
		var pagesStartAndEnd = get_pagesStartAndEnd(npagesmax,currentpage,lastpage);
		var pages = [];
		for (var i=pagesStartAndEnd.pagesstart; i<pagesStartAndEnd.pagesend; i++){
			pages.push(i);
		};
		return pages;
    };
    var pages = get_pages(npagesmax,currentpage,lastpage);

	//Split 1
	// 1. buttons are not duplicated each refresh
	// 2. explicitly select the element to append
	// 3. may need to change from cell to an arbitrary footer row
	//		to avoid resizing issues each refresh
	//tablefooterpaginationtoolbar
// 	var tablefooterpaginationtoolbar = d3
// 		.select('#'+id+"tablenavbarlabels"+"pagination")
// 		.append("div")
//         .attr("class","btn-toolbar")
//         .attr("id", id + 'tablefooterpaginationtoolbar')
//         .attr("role","toolbar")
//         .attr("aria-label","true");
// 	//tablefooterpagination left arrows
// 	var tablefooterpaginationleftarrows = tablefooterpaginationtoolbar
// 		.append("div")
// 		.attr('class','btn-group leftarrows')
// 		.attr('role','group');
// 	var tablefooterpaginationfirst = tablefooterpaginationleftarrows
// 		.append("div")
// 		.attr('class','glyphicon glyphicon-step-backward')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","first page");
// 	tablefooterpaginationfirst.on("click",function(d){
// 		this_.set_tablecurrentpage(1);
// 		this_.render();
// 	});	
// 	var tablefooterpaginationprevious = tablefooterpaginationleftarrows.append("div")
// 		.attr('class','glyphicon glyphicon-triangle-left')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","previous page");
// 	tablefooterpaginationprevious.on("click",function(d){
// 		var newcurrentpage = currentpage-1<0 ? 0: currentpage-1;
// 		this_.set_tablecurrentpage(newcurrentpage);
// 		this_.render();
// 	});
// 	//tablefooterpagination middle pages
// 	var tablefooterpaginationbuttonsgroup = tablefooterpaginationtoolbar
// 		.append("div")
// 		.attr('class','btn-group pages')
// 		.attr('role','group');
// 	var tablefooterpaginationbuttons = tablefooterpaginationbuttonsgroup
// 		.selectAll("button")
// 		.data(pages);
// 	tablefooterpaginationbuttons.exit().remove();
// 	tablefooterpaginationbuttons.transition()
// 		.attr("class","btn btn-default")
// 		.attr("type","button")
// 		.style("color",function(d){
// 			if (d===currentpage){
// 				return "#ff0000";
// 			} else {
// 				return "#000000";
// 			};
// 		})
// 		.text(function(d){ return d;});
// 	var tablefooterpaginationbuttonsenter=tablefooterpaginationbuttons.enter()
// 		.append("button")
// 		.attr("class","btn btn-default")
// 		.attr("type","button")
// 		.style("color",function(d){
// 			if (d===currentpage){
// 				return "#ff0000";
// 			} else {
// 				return "#000000";
// 			};
// 		})
// 		.text(function(d){ return d;});
// 	tablefooterpaginationbuttons.on("click",function(d){
// 		this_.set_tablecurrentpage(d);
// 		this_.render();
// 	});

// 	//tablefooterpagination right arrows
// 	var tablefooterpaginationrightarrows = tablefooterpaginationtoolbar
// 		.append("div")
// 		.attr('class','btn-group rightarrows')
// 		.attr('role','group');
// 	var tablefooterpaginationnext = tablefooterpaginationrightarrows
// 		.append("div")
// 		.attr('class','glyphicon glyphicon-triangle-right')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","next page");

// 	tablefooterpaginationnext.on("click",function(d){
// 		var newcurrentpage = currentpage+1>lastpage ? lastpage: currentpage+1;
// 		this_.set_tablecurrentpage(newcurrentpage);
// 		this_.render();
// 	});
// 	var tablefooterpaginationlast = tablefooterpaginationrightarrows
// 		.append("div")
// 		.attr('class','glyphicon glyphicon-step-forward')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","last page");
// 	tablefooterpaginationlast.on("click",function(d){
// 		this_.set_tablecurrentpage(lastpage);
// 		this_.render();
// 	});	

	//Split 2
	// 1. appends buttons each refresh...
	// 2. appends buttons to the footer row and not footer cell
	//tablefooterpaginationtoolbar
	var tablefooterpaginationtoolbar = this.tablenavbarenter
		.select('#'+id+"tablenavbarlabels"+"pagination")
// 	var tablefooterpaginationtoolbar = this.tablenavbarlabels
		.selectAll('.btn-toolbar')
		.data([0]);

	tablefooterpaginationtoolbar.exit().remove();
	tablefooterpaginationtoolbar.transition()
        .attr("class","glyphicon glyphicon-arrow-up")
        .attr("id", id + 'tablefooterpaginationtoolbar')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");

	var tablefooterpaginationtoolbarcenter = tablefooterpaginationtoolbar.enter()
		.append("div")
        .attr("class","btn-toolbar")
        .attr("id", id + 'tablefooterpaginationtoolbar')
        .attr("role","toolbar")
        .attr("aria-label","true");

	//tablefooterpagination left arrows
	var tablefooterpaginationleftarrows = tablefooterpaginationtoolbar
		.selectAll('.leftarrows').data([0]);
	tablefooterpaginationleftarrows.transition()
		.attr('class','btn-group leftarrows')
		.attr('role','group');
	tablefooterpaginationleftarrows.exit().remove();
	var tablefooterpaginationleftarrowsenter = tablefooterpaginationleftarrows.enter();
	tablefooterpaginationleftarrowsenter.append("div")
		.attr('class','btn-group leftarrows')
		.attr('role','group');

	var tablefooterpaginationfirst = tablefooterpaginationleftarrows
		.selectAll('.glyphicon glyphicon-step-backward')
		.data([0]);
	tablefooterpaginationfirst.transition()
		.attr('class','glyphicon glyphicon-step-backward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","first page");
	tablefooterpaginationfirst.exit().remove();
	var tablefooterpaginationfirstenter = tablefooterpaginationfirst.enter();
	tablefooterpaginationfirstenter.append("div")
		.attr('class','glyphicon glyphicon-step-backward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","first page");
	tablefooterpaginationfirst.on("click",function(d){
		this_.set_tablecurrentpage(1);
		this_.render();
	});	

	var tablefooterpaginationprevious = tablefooterpaginationleftarrows
		.selectAll('.glyphicon glyphicon-triangle-left')
		.data([0]);
	tablefooterpaginationprevious.transition()
		.attr('class','glyphicon glyphicon-triangle-left')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","previous page");
	tablefooterpaginationprevious.exit().remove();
	var tablefooterpaginationpreviousenter = tablefooterpaginationprevious.enter();
	tablefooterpaginationpreviousenter.append("div")
		.attr('class','glyphicon glyphicon-triangle-left')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","previous page");
	tablefooterpaginationprevious.on("click",function(d){
		var newcurrentpage = currentpage-1<1 ? 1: currentpage-1;
		this_.set_tablecurrentpage(newcurrentpage);
		this_.render();
	});
	
	//tablefooterpagination middle pages
	var tablefooterpaginationbuttonsgroup = tablefooterpaginationtoolbar
		.selectAll('btn-group pages')
		.data([pages]);
	var tablefooterpaginationbuttonsgroupenter = tablefooterpaginationbuttonsgroup.enter()
		.append("div")
		.attr('class','btn-group pages')
		.attr('role','group');
	tablefooterpaginationbuttonsgroup.transition()
		.attr('class','btn-group pages')
		.attr('role','group');
	tablefooterpaginationbuttonsgroup.exit().remove();
	
	var tablefooterpaginationbuttons = tablefooterpaginationbuttonsgroup
		.selectAll("button")
		.data(pages);
	tablefooterpaginationbuttons.exit().remove();
	tablefooterpaginationbuttons.transition()
		.attr("class","btn btn-default")
		.attr("type","button")
		.style("color",function(d){
			if (d===currentpage){
				return "#ff0000";
			} else {
				return "#000000";
			};
		})
		.text(function(d){ return d;});
	var tablefooterpaginationbuttonsenter=tablefooterpaginationbuttons.enter()
		.append("button")
		.attr("class","btn btn-default")
		.attr("type","button")
		.style("color",function(d){
			if (d===currentpage){
				return "#ff0000";
			} else {
				return "#000000";
			};
		})
		.text(function(d){ return d;});
	tablefooterpaginationbuttons.on("click",function(d){
		this_.set_tablecurrentpage(d);
		this_.render();
	});


	//tablefooterpagination right arrows
	var tablefooterpaginationrightarrows = tablefooterpaginationtoolbar
		.selectAll('.rightarrows').data([0]);
	tablefooterpaginationrightarrows.transition()
		.attr('class','btn-group rightarrows')
		.attr('role','group');
	tablefooterpaginationrightarrows.exit().remove();
	var tablefooterpaginationrightarrowsenter = tablefooterpaginationrightarrows.enter();
	tablefooterpaginationrightarrowsenter.append("div")
		.attr('class','btn-group rightarrows')
		.attr('role','group');

	var tablefooterpaginationnext = tablefooterpaginationrightarrows
		.selectAll('.glyphicon glyphicon-triangle-right')
		.data([0]);
	tablefooterpaginationnext.transition()
		.attr('class','glyphicon glyphicon-triangle-right')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","next page");
	tablefooterpaginationnext.exit().remove();
	var tablefooterpaginationnextenter = tablefooterpaginationnext.enter();
	tablefooterpaginationnextenter.append("div")
		.attr('class','glyphicon glyphicon-triangle-right')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","next page");
	tablefooterpaginationnext.on("click",function(d){
		var newcurrentpage = currentpage+1>lastpage ? lastpage: currentpage+1;
		this_.set_tablecurrentpage(newcurrentpage);
		this_.render();
	});

	var tablefooterpaginationlast = tablefooterpaginationrightarrows
		.selectAll('.glyphicon glyphicon-step-forward')
		.data([0]);
	tablefooterpaginationlast.transition()
		.attr('class','glyphicon glyphicon-step-forward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","last page");
	tablefooterpaginationlast.exit().remove();
	var tablefooterpaginationlastenter = tablefooterpaginationlast.enter();
	tablefooterpaginationlastenter.append("div")
		.attr('class','glyphicon glyphicon-step-forward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","last page");
	tablefooterpaginationlast.on("click",function(d){
		this_.set_tablecurrentpage(lastpage);
		this_.render();
	});	
};
d3_table.prototype.add_tablesearch2tablenavbar = function(){
    /* add the table search bar input

    */

// search
	//<div class="row">
//   <div class="col-lg-6">
// 	<label>Your vanity URL</label>
//     <div class="input-group">
//       <input type="text" class="form-control" placeholder="Search for...">
//         .append("div")
//         .attr("class","glyphicon glyphicon-search")
//         .attr("class","glyphicon glyphicon-open pull-right")
//         .attr("id", tileid + 'jsonimportbutton')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","search");
//     </div><!-- /input-group -->
//   </div><!-- /.col-lg-6 -->
// </div><!-- /.row -->
};
d3_table.prototype.set_tablenavbarelements = function (elements_I){
	/*
	Set the table navigation bar elements
	*/
	if (typeof(elements_I)!=="undefined"){
		this.tablenavbarelements = elements_I;
	} else {
		this.tablenavbarelements = ["rows","pagination","search"];
	};
};
d3_table.prototype.set_tablenavbar = function(){
    /*set the table navbar*/ 
    var id = this.id;
    var tileid = this.tileid;
	var tablenavbarelements = this.tablenavbarelements;

// 	this.tablenavbar = d3.select('#'+tileid+"panel-body")
    this.tablenavbar = this.tablenavbarelement
    	.selectAll("#"+id+"tablenavbar")
        .data([tablenavbarelements]);

	this.tablenavbar.exit().remove();
	this.tablenavbar.transition()
    	.attr("class","row")
    	.attr("id",id+"tablenavbar");
	this.tablenavbarenter = this.tablenavbar.enter()
    	.append("div")
    	.attr("class","row")
    	.attr("id",id+"tablenavbar");
};
d3_table.prototype.add_tablenavbar = function(){
    /*add the table navbar*/ 
    var id = this.id;
	var tablenavbarelements = this.tablenavbarelements;
	
	this.tablenavbarlabels = this.tablenavbar.selectAll("label")
        .data(tablenavbarelements);

	this.tablenavbarlabels.exit().remove();
	this.tablenavbarlabels.transition()
    	.text(function(d){return d;});
	this.tablenavbarlabelsenter = this.tablenavbarlabels.enter()
    	.append("div")
    	.attr("class","col-sm-4")
    	.attr("id",function(d){return id+"tablenavbarlabels"+d;})
    	.append("label")
    	.text(function(d){return d;});
};
d3_table.prototype.add_tablenavbar2tile = function(){
    // set the table
    var id = this.id;
    var tileid = this.tileid;
    var tableclass = this.tableclass;
    var listdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;

//     this.table = d3.select('#'+tileid+"panel-body").append("div")
//         .attr("class","table-responsive")
//         .append("table")
//         .attr("class",tableclass)
//         .attr("id",id+"table");

    this.tablenavbarelement = d3.select('#'+tileid+"panel-body")
    	.selectAll(".tablenavbar-responsive")
        .data([listdatafiltered]);

    this.tablenavbarelemententer = this.tablenavbarelement.enter()
        .append("div")
        .attr("class","tablenavbar-responsive")
    this.tablenavbarelement.exit().remove();

};