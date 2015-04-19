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
d3_tile.prototype.add_textarea = function (textarea_valuetext_I,size_I) {
    // add text area for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];
    if (size_I){var size = size_I;}
    else{var size = 20;}

    var tileid = this.tileid;

    var textarearow = d3.select('#'+tileid).append("div")
        .attr("class","row")
        .attr("id", tileid + 'textarearow');

    for (i=0;i<textarea_valuetext_I.length;i++){
        var textareacol = textarearow.append("div")
            .attr("class","col-sm-12")
            .attr("id", tileid + 'textareacol' + textarea_valuetext_I[i].text);
        textareacol.append("form")
            .attr("id", tileid + 'textarea'+ textarea_valuetext_I[i].text);
        textareacol.text(textarea_valuetext_I[i].text).append("br");
        textareacol.append("input")
            .attr("value",textarea_valuetext_I[i].value)
            .attr("size",size);
    };
};
d3_tile.prototype.update_textarea = function(textarea_valuetext_I){
    // update the text area
    var tileid = this.tileid;

    for (i=0;i<textarea_valuetext_I.length;i++){
        d3.select("#"+tileid + 'textareacol'+ textarea_valuetext_I[i].text + " input").node().value=textarea_valuetext_I[i].value;
    };
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
d3_tile.prototype.add_submitbutton = function (button_idtext_I) {
    // add submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
    else{var button_idtext = button_idtext_I;}

    var tileid = this.tileid;

    var submitbuttonrow = d3.select('#'+tileid).append("div")
        .attr("class","row");

    var submitbutton = submitbuttonrow.append("div")
        .attr("class","col-sm-3")
        .append("button")
        .attr("class","btn btn-default column-button")
        .attr("id", tileid + 'submitbutton'+button_idtext.id)
        .text(button_idtext.text);

};
d3_tile.prototype.add_table = function () {
    // add button for output
};
d3_tile.prototype.add_svg = function () {
    // add svg for interaction
};
d3_tile.prototype.remove_tile = function(){
    // remove tile from the container
    var tileid = this.tileid;
    d3.selectAll('#'+tileid).remove();
    this.tile = null;
};
d3_tile.prototype.add_datalist2tile = function (datalist_valuetext_I) {
    // add datalist (menu) for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];

    var tileid = this.tileid;
//TODO:
//     var datalist = d3.select('#'+this.tileid).append("select")
//         .attr("id", tileid + 'datalist');

//     for (i=0;i<datalist_valuetext_I.length;i++){
//         datalist.append("option")
//             .attr("value",datalist_valuetext_I[i].value)
//             .text(datalist_valuetext_I[i].text);
//     };

};
d3_tile.prototype.add_title = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    var title = d3.select('#'+tileid).append("div")
        .attr("class","row")
        .append("div")
        .attr("class","col-sm-12")
        .append("div")
        .attr("id", tileid + 'title-box')
        .append("h3")
        .attr("id", tileid + 'title')
        .text(title_I);
};
d3_tile.prototype.add_removebutton = function(){
    // add button to remove tile from the container

    var tileid = this.tileid;
    var this_ = this;
    var remove_tile = this.remove_tile;

    function removetile(){
        d3.selectAll('#'+tileid).remove();
        this_.tile = null;
    };

    var removetbuttonrow = d3.select('#'+tileid).append("div")
        .attr("class","row");

    var removebutton = removetbuttonrow.append("div")
        .attr("class","col-sm-3")
        .append("button")
        .attr("class","btn btn-default column-button")
        .attr("id", tileid + 'removebutton')
        .text("remove")
        .on("click",removetile);
};