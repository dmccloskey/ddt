d3_tile = function () {
    // generic d3_tile element
    this.containerid = 'container'
    this.tileid = '';
    this.rowid = '';
    this.colid = '';
    this.rowclass = '';
    this.colclass = '';
    this.tile = null;
    this.width = 1;
    this.height = 1;
};
d3_tile.prototype.set_tileid = function (tileid_I) {
    // set d3_tile id
    this.tileid = tileid_I;
};
d3_tile.prototype.set_rowid = function (rowid_I) {
    // set row id
    this.rowid = rowid_I;
};
d3_tile.prototype.set_colid = function (colid_I) {
    // set column id
    this.colid = colid_I;
};
d3_tile.prototype.set_rowclass = function (rowclass_I) {
    // set row class
    this.rowclass = rowclass_I;
};
d3_tile.prototype.set_colclass = function (colclass_I) {
    // set column class
    this.colclass = colclass_I;
};
d3_tile.prototype.add_tile2container = function () {
    // set column id
    var row = d3.select("#" + this.containerid).append("div").attr("class", this.rowclass).attr("id", this.rowid);
    var col = row.append("div").attr("class", this.colclass).attr("id", this.colid);
    this.tile = col.append("div").attr("id", this.tileid);
};
d3_tile.prototype.add_tile2col = function () {
    // set column id
    var col = d3.select("#" + this.rowid).append("div").attr("class", this.colclass).attr("id", this.colid);
    this.tile = col.append("div").attr("id", this.tileid);
};
d3_tile.prototype.set_height = function () {
    // set d3_tile height
};
d3_tile.prototype.add_draganddrop = function () {
    // add file drag and drop for input
};
d3_tile.prototype.add_textarea = function () {
    // add text area for input
};
d3_tile.prototype.add_checkbox = function () {
    // add checkbox for input
};
d3_tile.prototype.add_color = function () {
    // add color pallet for input
};
d3_tile.prototype.add_range = function () {
    // add range slider for input
};
d3_tile.prototype.add_submitbutton = function () {
    // add submit button
};
d3_tile.prototype.add_table = function () {
    // add button for output
};
d3_tile.prototype.add_svg = function () {
    // add svg for interaction
};
d3_tile.prototype.remove_tile = function(){
    // remove tile from the container
    d3.selectAll('#'+this.tileid).remove();
    this.tile = null;
};