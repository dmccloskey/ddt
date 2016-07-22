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

    this.tableheaderrow.exit().remove();
    this.tableheaderrowenter = this.tableheaderrow.enter()
        .append("tr");

    this.tableheader = this.tableheaderrow.selectAll("th")
        .data(tableheaders);

    this.tableheader.exit().remove();
    this.tableheaderupdate = this.tableheader.transition();
    this.tableheaderupdate.select("th")
        .attr('id',function (d) { return id+'th'+d; })
        .text(function (d) { return d; });

    this.tableheaderenter = this.tableheader.enter();
    this.tableheaderenter
    	.append("th")
        .attr('id',function (d) { return id+'th'+d; })
        .text(function (d) { return d; });

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
d3_table.prototype.get_tableheaders = function(){
    // return headers
    return this.tableheaders;
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
d3_table.prototype.set_tableheaderoptionsgroup = function(){
	/*set the row to append buttons
	that manipulate column headers
	and column data
	*/
    var id = this.id;
    var this_ = this;
    var tableheaders = this.tableheaders;

	this.tableheaderoptionsgroup = this.tableheader.data(tableheaders)
    this.tableheaderoptionsgroupenter = this.tableheaderoptionsgroup.enter()
		.append("div")
		.attr("id",id+"tableheaderoptionsgroup")
        .attr("class","row");
	this.tableheaderoptionsgroup.transition()
		.attr("id",id+"tableheaderoptionsgroup")
		.attr("class","row");
	this.tableheaderoptionsgroup.exit().remove();
}
d3_table.prototype.add_tablesort2tableheaderoptionsgroup = function(){
    // sort the data
    // DESCRIPTION:
    var id = this.id;
    var this_ = this;

	var tableheadersortasc = this.tableheaderoptionsgroup.selectAll('.glyphicon-sort-by-attributes')
		.data([0]);

	tableheadersortasc.exit().remove();
	tableheadersortasc.transition()
        .attr("class","glyphicon glyphicon glyphicon-sort-by-attributes")
        .attr("id", id + 'tableheadersortasc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");

	var tableheadersortascenter = tableheadersortasc.enter()
		.append("div")
        .attr("class","glyphicon glyphicon-sort-by-attributes")
        .attr("id", id + 'tableheadersortasc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");
    tableheadersortascenter.on("click", function (d, i) {
            var order = [];
            var key_dir = {};
            key_dir[this.parentNode.innerText]='asc';
            order.push(key_dir);
            this_.data.order_listdatafiltered(order);
            this_.data.order_nestdatafiltered(order);
            this_.render();
        });

	var tableheadersortdesc = this.tableheaderoptionsgroup.selectAll('.glyphicon-sort-by-attributes-alt')
		.data([0]);

	tableheadersortdesc.exit().remove();
	tableheadersortdesc.transition()
        .attr("class","glyphicon glyphicon-sort-by-attributes-alt")
        .attr("id", id + 'tableheadersortdesc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort descending");

	var tableheadersortdescenter = tableheadersortdesc.enter()
		.append("div")
        .attr("class","glyphicon glyphicon-sort-by-attributes-alt")
        .attr("id", id + 'tableheadersortdesc')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort descending");
    tableheadersortdescenter.on("click", function (d, i) {
            var order = [];
            var key_dir = {};
            key_dir[this.parentNode.innerText]='desc';
            order.push(key_dir);
//             this_.data.set_listdatafiltered(order);
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
d3_table.prototype.add_tablehidecolumn2tableheaderoptionsgroup = function(){
	/*add column hide

	TODO: fix bug that does not remove the headers
	*/
	var id = this.id;
    var this_ = this;

	var tableheaderhidecolumn = this.tableheaderoptionsgroup.selectAll('.glyphicon-remove-sign')
		.data([0]);

	function removeA(arr) {
		var what, a = arguments, L = a.length, ax;
		while (L > 1 && arr.length) {
			what = a[--L];
				while ((ax= arr.indexOf(what)) !== -1) {
				arr.splice(ax, 1);
			}
		}
		return arr;
	}

    function updatetablecolumns(){
        // update the table columns
        var header = this.parentNode.textContent;
        var currenttableheaders = this_.get_tableheaders();
        var tableheaders = removeA(currenttableheaders,header);
        this_.set_tableheaders(tableheaders);
        this_.render();
    };

	tableheaderhidecolumn.exit().remove();
	tableheaderhidecolumn.transition()
        .attr("class","glyphicon glyphicon-remove-sign")
        .attr("id", id + 'tableheaderhidecolumn')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","hide column");

	var tableheaderhidecolumnenter = tableheaderhidecolumn.enter()
		.append("div")
        .attr("class","glyphicon glyphicon-remove-sign")
        .attr("id", id + 'tableheaderhidecolumn')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","hide column");
    tableheaderhidecolumn.on("click", updatetablecolumns);
}
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
d3_table.prototype.add_tablecolumnunhidebutton2optionsbuttongroup = function (){
    // add refresh button to the footer of the chart

    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    function unhideheaders(){
    	this_.extract_tableheaders();
        this_.render();        
    };

    var tablecolumnunhidebutton = this.tableoptionsbuttongroup
    	.selectAll(".glyphicon-header")
    	.data([0]);
	tablecolumnunhidebutton.exit().remove();
	tablecolumnunhidebutton.transition()
        .attr("class","glyphicon glyphicon-header pull-right")
        .attr("id", tileid + 'unhidecolumns')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","unhide columns");

    var tablecolumnunhidebuttonenter = tablecolumnunhidebutton.enter()
    	.append("div")
        .attr("class","glyphicon glyphicon-header pull-right")
        .attr("id", tileid + 'unhidecolumns')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","unhide columns");
    tablecolumnunhidebutton.on("click",unhideheaders);
};
d3_table.prototype.add_tablecolumnoptionsbutton2optionsbuttongroup = function (){
    // add refresh button to the footer of the chart

    var id = this.id;
    var tileid = this.tileid;
    var this_ = this;

    var tablecolumnoptionsbutton = this.tableoptionsbuttongroup
    	.selectAll(".glyphicon-header")
    	.data([0]);
	tablecolumnoptionsbutton.exit().remove();
	tablecolumnoptionsbutton.transition()
        .attr("class","glyphicon glyphicon-header pull-right")
        .attr("id", tileid + 'refreshtile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","refresh");

    var tablecolumnoptionsbuttonenter = tablecolumnoptionsbutton.enter()
    	.append("div")
        .attr("class","glyphicon glyphicon-header pull-right")
        .attr("id", tileid + 'refreshtile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","refresh");
    this.add_tablecolumnoptions({'node':tablecolumnoptionsbutton,'inputarguments':null});
};
d3_table.prototype.add_tablecolumnoptions = function(inputarguments_I){
    // add or remove headers
    var id = this.id;
    var this_ = this;
    var tableheaders = this.tableheaders;

	if (typeof(inputarguments_I)!=="undefined"){
		var inputarguments = new ddt_inputarguments();
		inputarguments.validate_inputarguments(inputarguments_I)
		var node = inputarguments.get_node();
		var input = inputarguments.get_inputarguments();
	} else {
		var node = this.tableheader;
		var input = null;
	}

    function showcolumnoptionsmenumodal(){
        this_.show_columnoptionsmenumodal(id+"table");
    };    

	node.style({"cursor":"pointer"})
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