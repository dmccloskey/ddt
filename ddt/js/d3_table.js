//implement sortable and editable table using d3 and bootstrap
var d3_table = function (){
    this.id = '';
    this.tileid = '';
    this.tableclass = '';
    this.table = null;
    this.data = null;  
    this.tableheaders = [];
};
d3_table.prototype.set_table = function(){
    // set the table
    var id = this.id;
    var tileid = this.tileid;
    var tableclass = this.tableclass;
    var datalistdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;

    this.table = d3.select('#'+tileid+"panel-body").append("div")
        .attr("class","table-responsive")
        .append("table")
        .attr("class",tableclass)
        .attr("id",id+"table");

};
d3_table.prototype.set_tableheader = function(){
    // set the table header
    var id = this.id;
    
    this.thead = this.table.append("thead")
        .attr("id",id+"tableheader");

};
d3_table.prototype.add_tableheader = function(){
    // add the table header
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;

    //table header
    this.tableheader = this.thead.append("tr").selectAll("th")
        .data(tableheaders);

    this.tableheaderenter = this.tableheader.enter();
    this.tableheaderenter.append("th")
        .text(function (d) { return d; });

    this.tableheader.transition().text(function (d) { return d; });

    this.tableheader.exit().remove();

};
d3_table.prototype.set_tablebody = function(){
    // set the table body
    var id = this.id;
    
    this.tbody = this.table.append("tbody")
        .attr("id",id+"tablebody");

};
d3_table.prototype.add_tablebody = function(){
    // add the table body
    var id = this.id;
    var tileid = this.tileid;
    var datalistdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;
        
    //table body
    this.tablerowsenter = this.tbody.selectAll("tr")
        .data(datalistdatafiltered)
        .enter()
        .append("tr");

    this.tablecells = this.tablerowsenter.selectAll("td")
        .data(function(row) {
            return tableheaders.map(function(column) {
                return {column: column, value: row[column]};
            });
        });

    this.tablecellsenter = this.tablecells.enter();
    this.tablecellsenter.append("td")
        .html(function(d) { return d.value; });

//     this.tablecells.transition()
//         .html(function(d) { return d.value; });

    this.tablecells.exit().remove();

};
d3_table.prototype.set_tableid = function(tableid_I){
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
d3_table.prototype.partition_listdatafiltered2headerandelements = function(){
    // partition list data to an array of headers and an array of values
    this.tableheaders = [];
    this.tableelements = [];
    var datalistdatafiltered = this.data.listdatafiltered;
    for (i=0;i<datalistdatafiltered.length;i++){
        for (key in datalistdatafiltered[i]){
            if (i===0){
                this.tableheaders.push(key);
            };
            this.tableelements.push(datalistdatafiltered[i][key])
        };
    };
};
d3_table.prototype.extract_headers = function(){
    // extract out headers from listdatafiltered
    this.tableheaders = [];
    var datalistdatafiltered = this.data.listdatafiltered;
    for (key in datalistdatafiltered[0]){
        this.tableheaders.push(key);
    };
};
d3_table.prototype.set_headers = function(headers_I){
    // set headers
    this.tableheaders = headers_I;
};