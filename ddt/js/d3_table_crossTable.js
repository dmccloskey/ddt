"use strict";
//implement sortable and editable cross table using d3 and bootstrap
d3_table.prototype.set_crosstable = function(){
    // add the table body
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;
    var x_data = this.datakeymap.xdata
    var y_data = this.datakeymap.ydata
    var z_data = this.datakeymap.zdata
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;
};
d3_table.prototype.extract_crosstableheaders = function(){
    // extract out headers from listdatafiltered
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;

    this.tableheaders = this.data.get_uniquevaluesFromlistdatafiltered(columnslabel);
    this.tableheaders.sort();
    this.tableheaders.splice(0, 0, rowslabel);
};
d3_table.prototype.set_crosstablebody = function(){
    // set the table body
    var id = this.id;
    var nestdatafiltered = this.data.nestdatafiltered;

    this.tbodyelement = this.table.selectAll("tbody")
        .data([nestdatafiltered]);

    this.tbodyenter = this.tbodyelement.enter()
        .append("tbody")
        .attr("id",id+"tablebody");

    this.tbody = this.table.select("tbody");
    //this.tbody = this.tbodyelement.select("tbody");

    this.tbodyelement.exit().remove();

};
d3_table.prototype.add_crosstablebody = function(){
    // add the table body
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var datanestdatafiltered = this.data.nestdatafiltered;
    var tableheaders = this.tableheaders;
    var tablerowslabels = this.tablerowslabels
    var x_data = this.datakeymap.xdata
    var y_data = this.datakeymap.ydata
    var z_data = this.datakeymap.zdata
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;
        
    //table body

    this.tablerows = this.tbody.selectAll("tr")
        .data(datanestdatafiltered);

    this.tablerows.exit().remove();

    this.tablerowsenter = this.tablerows.enter()
        .append("tr");

    //this.tablecells = this.tablerowsenter.selectAll("td")
    this.tablecells = this.tablerows.selectAll("td")
        .data(function(row) {
            return tableheaders.map(function(column) {
                var value = null;
                if (column===rowslabel){
                    value = row.key;
                } else {
                    for (var i=0;i<row.values.length;i++){
                        if (row.values[i].key===column){
                            //only the first value if multiple values are present
                            //will be displayed
                            value = row.values[i].values[0][z_data];
                            break;
                        };
                    };
                };
                //console.log(value);
                return {column: column, value: value};
            });
        });

    this.tablecells.exit().remove();

    this.tablecellsenter = this.tablecells.enter();
    this.tablecellsenter.append("td")
        .html(function(d) {
            return d.value;
            });

    this.tablecells.html(function(d) { return d.value; });

};
d3_table.prototype.add_crosstablecsvandjsonexportbutton2tile = function () {
    // add button to export the table element
    var this_ = this;

    function exporttableelementjson(){
        this_.export_crosstableelementjson(); //necessary to pass svg as "this"
    };

    function exporttableelementcsv(){
        this_.export_crosstableelementcsv(); //necessary to pass svg as "this"
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
d3_table.prototype.export_crosstableelementjson = function () {
    // export the table element as json

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
d3_table.prototype.export_crosstableelementcsv = function () {
    // export the table element as csv

    var a = document.createElement('a');
    a.download ="table" + '.csv'; // file name
    //generate the csv string
    var c = "";
    var tableheaderstableelements = this.partition_nestdatafiltered2tableheaderandelements();
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
d3_table.prototype.partition_nestdatafiltered2tableheaderandelements = function(){
    // partition list data to an array of headers and an array of values
    var id = this.id;
    var tileid = this.tileid;
    var datanestdatafiltered = this.data.nestdatafiltered;
    var tableheaders = this.tableheaders;
    var x_data = this.datakeymap.xdata
    var y_data = this.datakeymap.ydata
    var z_data = this.datakeymap.zdata
    var columnslabel = this.datakeymap.columnslabel;
    var rowslabel = this.datakeymap.rowslabel;

    var tableelements = [];
    for (var j=0;j<datanestdatafiltered.length;j++){ //rowslabels
        tableelements.push([]);
        tableheaders.forEach(function(column) {
            var value = null;
            if (column===rowslabel){
                value = datanestdatafiltered[j].key;
            } else {
                for (var i=0;i<datanestdatafiltered[j].values.length;i++){
                    if (datanestdatafiltered[j].values[i].key===column){
                        value = datanestdatafiltered[j].values[i].values[0][z_data];
                        break;
                    };
                };
            };
            //console.log(value);
            tableelements[j].push(value);
        });
    };
    return {tableheaders:tableheaders,tableelements:tableelements};
};