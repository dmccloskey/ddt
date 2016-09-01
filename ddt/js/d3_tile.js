"use strict";
//var d3_tile = function () {
function d3_tile() {
    // generic d3_tile element
    // based on the bootstrap panel model
    // panel panel-default
    // panel-heading
    // panel-body
    // panel-footer
    this.containerid = 'container'
    this.tileid = '';
    this.rowid = '';
    this.colid = '';
    this.rowclass = '';
    this.colclass = '';
    this.tileclass = '';
    this.tile = null;
    this.headertitle = '';
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
d3_tile.prototype.update_colclass = function (colclass_I) {
    // update the column class
    var tileid = this.tileid;

    this.colclass = colclass_I;

    var tilecol = d3.select("#"+tileid).node().parentNode
    tilecol.className = colclass_I;
};
d3_tile.prototype.update_colid = function (colid_I){
    // update the column id
    var tileid = this.tileid;

    this.colid = colid_I;

    var tilecol = d3.select("#"+tileid).node().parentNode
    tilecol.id = colid_I;
}
d3_tile.prototype.set_tileclass = function (tileclass_I) {
    // set tile class
    this.tileclass = tileclass_I;
};
d3_tile.prototype.add_tile2container = function () {
    // add tile to container
    if (d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).select("#" + this.tileid).node()){
        this.tile = d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).select("#" + this.tileid);
    } else if (d3.select("#" + this.containerid).select("#" + this.rowid).select("#" + this.colid).node()){
        this.append_tile2col();
    } else if (d3.select("#" + this.containerid).select("#" + this.rowid).node()){
        this.append_tile2row();
    } else if (d3.select("#" + this.containerid).node()){
        this.append_tile2container();
    };
};
d3_tile.prototype.append_tile2container = function (containerid_I,rowid_I,colid_I) {
    // set column id
    if(typeof(containerid_I)!=="undefined"){
        var containerid = containerid_I;
    } else {
        var containerid = this.containerid;
    };
    if(typeof(rowid_I)!=="undefined"){
        var rowid = rowid_I;
    } else {
        var rowid = this.rowid;
    };
    if(typeof(colid_I)!=="undefined"){
        var colid = colid_I;
    } else {
        var colid = this.colid;
    };

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
    function dragLeave() {
        if (d3.event){
            d3.event.target.style.background="";
        };
    };
    var row = d3.select("#" + this.containerid)
        .append("div")
        .attr("class", this.rowclass)
        .attr("id", rowid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
    var col = row.append("div")
        .attr("class", this.colclass)
        .attr("id", colid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
    this.tile = col.append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.append_tile2row = function (containerid_I,rowid_I,colid_I) {
    // add tile as new column in an existing row
    if(typeof(containerid_I)!=="undefined"){
        var containerid = containerid_I;
    } else {
        var containerid = this.containerid;
    };
    if(typeof(rowid_I)!=="undefined"){
        var rowid = rowid_I;
    } else {
        var rowid = this.rowid;
    };
    if(typeof(colid_I)!=="undefined"){
        var colid = colid_I;
    } else {
        var colid = this.colid;
    };
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
    function dragLeave() {
        if (d3.event){
            d3.event.target.style.background="";
        };
    };

    var col = d3.select("#" + this.containerid).select("#" + this.rowid)
        .append("div")
        .attr("class", this.colclass)
        .attr("id", this.colid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
    this.tile = col.append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.append_tile2col = function (containerid_I,rowid_I,colid_I) {
    // add tile to as a new row in an existing column
    if(typeof(containerid_I)!=="undefined"){
        var containerid = containerid_I;
    } else {
        var containerid = this.containerid;
    };
    if(typeof(rowid_I)!=="undefined"){
        var rowid = rowid_I;
    } else {
        var rowid = this.rowid;
    };
    if(typeof(colid_I)!=="undefined"){
        var colid = colid_I;
    } else {
        var colid = this.colid;
    };
    

    this.tile = d3.select("#" + containerid)
        .select("#" + rowid)
        .select("#" + colid)
        .append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.add_footer2tile = function () {
    // add footer to tile

    var tileid = this.tileid;

    this.tilefooter = d3.select('#'+tileid).append("div")
        .attr("class","panel-footer")
        .attr("id",tileid+"panel-footer");
};
d3_tile.prototype.add_submitbutton2footer = function (button_idtext_I) {
    // add submit button
    // INPUT:
    //e.g. {'id':'submit1','text':'submit'};
    if (!button_idtext_I){var button_idtext = {'id':'submit1','text':'submit'};}
    else{var button_idtext = button_idtext_I;}

    var tileid = this.tileid;

    var submitbuttonrow = this.tilefooter.append("button")
        .attr("class","btn btn-default column-button")
        .attr("id", tileid + 'submitbutton'+button_idtext.id)
        .text(button_idtext.text);
};
d3_tile.prototype.remove_tile = function(){
    /*remove tile from the container

    TODO: remove associated parameters and tile2data
    */
    var tileid = this.tileid;
    d3.selectAll('#'+tileid).remove();
    this.tile = null;
};
d3_tile.prototype.add_datalist2body = function (datalist_valuetext_I) {
    // add datalist (menu) for input
    // INPUT:
    //e.g. [{'value':'hclust','text':'by cluster'},...];

    var tileid = this.tileid;  

    var datalist = this.tilebody.append("select")
        .attr("id", tileid + 'datalist');

    for (i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };  
};
d3_tile.prototype.add_header2tile = function (){
    //add title to tileid

    var tileid = this.tileid;

    this.tileheader = d3.select('#'+tileid).append("div")
        .attr("class","panel-heading")
        .attr("id",tileid+"panel-heading");
};
d3_tile.prototype.set_headertitle = function (headertitle_I){
    /*
    set the tileheader
    */
    this.headertitle = headertitle_I;
}
d3_tile.prototype.get_headertitle = function (){
    /*
    return the headertitle
    */
    return this.headertitle;
}
d3_tile.prototype.add_title2header = function (){
    //add title to tileid

    var tileid = this.tileid;
    var headertitle = this.headertitle;

    var title = this.tileheader.append("h3")
        .text(headertitle);
};
d3_tile.prototype.add_removebutton2header = function(){
    // add button to remove tile from the container

    var tileid = this.tileid;
    var this_ = this;

    function removetile(){
        this_.remove_tile()
    };
    
    //Split #1
//     var removebutton = this.tileheader.append("a")
//         .attr("class","pull-right")
//         .attr("id", tileid + 'removebutton')
//         .text("remove")
//         .on("click",removetile);

    //Split #2
//     var removebutton = this.tileheader.append("button")
//         .attr("class","btn btn-danger pull-right")
//         .attr("id", tileid + 'removebutton')
//         .attr("type", 'button')
//         .append("span")
//         .attr("class","glyphicon glyphicon-trash");
//         //.text("remove")
//     removebutton.on("click",removetile);

    //Split #3
    var removebutton = this.tileheader.append("div")
        .attr("class","glyphicon glyphicon-trash pull-right")
        .attr("id", tileid + 'removebutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","remove");
    removebutton.on("click",removetile);
};
d3_tile.prototype.add_body2tile = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    this.tilebody = d3.select('#'+tileid).append("div")
        .attr("class","panel-body")
        .attr("id",tileid+"panel-body");
};
d3_tile.prototype.add_navigationmenu2header = function(){
    //add a navigation menu
    //move tile 1 column to the left
    //move tile 1 column to the right
    //move tile 1 row up
    //move tile 1 row down

    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;

    var this_ = this;

    function movetileleft(){
        //swap places with the tile to the left

        // get all colids in the row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var colids = this_.get_colidsinrow(tileid);
        // get the current colid (it may have not been updated)
        var colid = colNode.id;
        // get the colid to the left
        if (colids.indexOf(colid)===0){
            // this is the first column in the row
            // do nothing
            return;
        };
        var colidleft = colids[0];
        for (var i=1;i<colids.length;i++){
            if (colids[i]===colid){
                colidleft = colids[i-1];
                break;
            };
        };
        // update the colid of left tile
        var colNodeLeft=rowNode.childNodes[colids.indexOf(colidleft)];
        colNodeLeft.id = colid;
        // update the colid of this tile
        this_.update_colid(colidleft);
        // swap tiles
        rowNode.insertBefore(colNode,colNodeLeft);
    };
    function movetileright(){
        //swap places with the tile to the left
        
        // get all colids in the row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var colids = this_.get_colidsinrow(tileid);
        // get the current colid (it may have not been updated)
        var colid = colNode.id;
        // get the colid to the right
        if (colids.indexOf(colid)===colids.length){
            // this is the last column in the row
            // do nothing
            return;
        };
        var colidright = colids[-1];
        for (var i=0;i<colids.length-1;i++){
            if (colids[i]===colid){
                colidright = colids[i+1];
                break;
            };
        };
        // update the colid of left tile
        var colNoderight=rowNode.childNodes[colids.indexOf(colidright)];
        colNoderight.id = colid;
        // update the colid of this tile
        this_.update_colid(colidright);
        // swap tiles
        rowNode.insertBefore(colNoderight,colNode);
    };
    function movetileup(){
        //add tile as last column of upper row
        
        // get all colids in the upper row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var parentRowNode = this_.get_parentrownode(tileid);
        var rowids = this_.get_rowidsinparentrow(tileid);
        // get the current colid and rowid (it may have not been updated)
        var colid = colNode.id;
        var rowid = rowNode.id;
        // get the row above
        if (rowids.indexOf(rowid)===0){
            // this is the first
            // do nothing
            return;
        };
        var rowidup = rowids[0];
        for (var i=1;i<rowids.length;i++){
            if (rowids[i]===rowid){
                rowidup = rowids[i-1];
                break;
            };
        };
        // update the rowid
        if (rowidup==="containerheader"){
            // do not add tiles to the containerheader row
            return;
        };
        this_.rowid = rowidup;
        // get the row up node
        var rowupnode = parentRowNode.childNodes[rowids.indexOf(rowidup)];
        var rowupnodechildrenlength = rowupnode.childNodes.length;
        if (rowupnodechildrenlength===0){
            //there is no column in the row
            //append as the first column
            // update the colid of this colnode
            this_.update_colid("col1")
            // insert the tile as the first column of the row
            rowupnode.appendChild(colNode);
        } else {
            // get the row up node id
            var lastcolid = rowupnode.childNodes[rowupnodechildrenlength-1].id;
            // increment the last col id
            var lastcolidint = this_.convert_colid2int(lastcolid);
            var newcolidint = lastcolidint + 1;
            var newcolid = this_.make_colidfromint(newcolidint);
            // update the colid of this colnode
            this_.update_colid(newcolid)
            // append the tile as the last column of the row
            rowupnode.appendChild(colNode);
        };
    };
    function movetiledown(){
        //add tile as first column of lower row
        // get all colids in the upper row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var parentRowNode = this_.get_parentrownode(tileid);
        var rowids = this_.get_rowidsinparentrow(tileid);
        // get the current colid and rowid (it may have not been updated)
        var colid = colNode.id;
        var rowid = rowNode.id;
        // get the row below
        if (rowids.indexOf(rowid)===rowids.length-1){
            // this is the last row
            // do nothing
            return;
        };
        var rowiddown = rowids[0];
        for (var i=1;i<rowids.length;i++){
            if (rowids[i]===rowid){
                rowiddown = rowids[i+1];
                break;
            };
        };
        // update the rowid
        this_.rowid = rowiddown;
        // get the row down node
        var rowdownnode = parentRowNode.childNodes[rowids.indexOf(rowiddown)];
        var rowdownnodechildrenlength = rowdownnode.childNodes.length;
        if (rowdownnodechildrenlength===0){
            //there is no column in the row
            //append as the first column
            // update the colid of this colnode
            this_.update_colid("col1")
            // insert the tile as the first column of the row
            rowdownnode.appendChild(colNode);
        } else {
            // get the row down node id
            var firstcol = rowdownnode.childNodes[0];
            var firstcolid = firstcol.id;
            var lastcol = rowdownnode.childNodes[rowdownnodechildrenlength-1];
            var lastcolid = rowdownnode.childNodes[rowdownnodechildrenlength-1].id;
            // get the row down column ids
            var colidsdown = this_.get_colidsinrow(firstcol.childNodes[0].id);
            // increment the last col id
            var lastcolidint = this_.convert_colid2int(lastcolid);
            var lastcolidint = lastcolidint + 1;
            var lastcolid = this_.make_colidfromint(lastcolidint);
            colidsdown.push(lastcolid); //add the updated lastcolid to the rowids list
            // increment all columns in the row down node
            for (var i=0;i<rowdownnodechildrenlength;i++){
                rowdownnode.childNodes[i].id = colidsdown[i+1];
            };
            // update the colid of this colnode
            this_.update_colid(firstcolid)
            // insert the tile as the first column of the row
            rowdownnode.insertBefore(colNode,firstcol);
        };
    };

    var navmenu = this.tileheader.append("div")
        .attr("id", tileid + 'navigationmenu');
    var moveleftbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-left pull-left")
        .attr("id", tileid + 'movetileleft')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","column left");
    moveleftbutton.on("click",movetileleft);
    var moverightbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-right pull-left")
        .attr("id", tileid + 'movetileright')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","column right");
    moverightbutton.on("click",movetileright);
    var moveupbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-up pull-left")
        .attr("id", tileid + 'movetileup')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","row up");
    moveupbutton.on("click",movetileup);
    var movedownbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-down pull-left")
        .attr("id", tileid + 'movetiledown')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","row down");
    movedownbutton.on("click",movetiledown);
};
d3_tile.prototype.add_resize2header = function(){
    // add tile resize
    // expand tile col width 1 increment
    // decrease tile width 1 increment
    // increments are the following:
    //  3, 4, 6, 8, 9, 12

    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;
    var colclass = this.colclass;
    var colsizes = [3,4,6,8,9,12];

    var this_ = this;
    function expandtilehorizontal(){
        var colclasslist = this_.colclass.split('-');
        var colclassint = parseInt(colclasslist.pop());
        var colclassbase = colclasslist.join('-')
        var colclassnewint = 12;
        for (var i=0;i<colsizes.length;i++){
            if(colsizes[i]>colclassint){
                colclassnewint = colsizes[i];
                break;
            };
        };
        var colclassnew = colclassbase + '-' + colclassnewint.toString();
        this_.update_colclass(colclassnew);
    };
    function shrinktilehorizontal(){ 
        var colclasslist = this_.colclass.split('-');
        var colclassint = parseInt(colclasslist.pop());
        var colclassbase = colclasslist.join('-')
        var colclassnewint = 3;
        for (var i=1;i<colsizes.length;i++){
            if(colsizes[i]>=colclassint){
                colclassnewint = colsizes[i-1];
                break;
            };
        };
        var colclassnew = colclassbase + '-' + colclassnewint.toString();
        this_.update_colclass(colclassnew);
//         this_.colclass = colclassnew;
//         var tilecol = d3.select("#"+tileid).node().parentNode
//         tilecol.className = colclassnew;
    };

    var resizemenu = this.tileheader.append("div")
        .attr("id", tileid + 'resizemenu');
    var expandbutton = resizemenu.append("div")
        .attr("class","glyphicon  glyphicon-resize-full pull-left")
        .attr("id", tileid + 'expandtile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","expand tile width");
    expandbutton.on("click",expandtilehorizontal);

    var shrinkbutton = resizemenu.append("div")
        .attr("class","glyphicon  glyphicon-resize-small pull-left")
        .attr("id", tileid + 'shrinktile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","shrink tile width");
    shrinkbutton.on("click",shrinktilehorizontal);
};
d3_tile.prototype.set_draganddrop = function () {
    // set drag and drop attribute to tile
    //draggable="true" ondragstart="drag(event)"
   
    var tileid = this.tileid;

    function drag() {
        if (d3.event){
            d3.event.dataTransfer.setData("text", d3.event.target.id);
        };
    };

    this.tile.attr("draggable", "true")
        .on("dragstart", drag);
//     this.tileheader.attr("draggable", "true")
//         .on("dragstart", drag);
};
d3_tile.prototype.trigger_drop = function() {
    // drop event function
    if (d3.event){
        d3.event.preventDefault();
        d3.event.target.style.background="";
        var tiletargetid = d3.event.target.id;
        if (tiletargetid.indexOf('col')===0){
            // append tile to an existing column
            //var tiletargetidrow = d3.event.target.parentNode.id;
            var tiledropid = d3.event.dataTransfer.getData("text");
            var tiledrop = d3.select("#"+tiledropid).node();
            //this.append_tile2col(this.containerid,tiletargetidrow,tiletargetid);
            d3.event.target.appendChild(tiledrop);
        };
        if (tiletargetid.indexOf('row')===0){
            // append tile as a new column to an existing row
            var tiledropid = d3.event.dataTransfer.getData("text");
            var tiledrop = d3.select("#"+tiledropid).node().parentNode;
            // get the last column id
            var rowchildrenlength = d3.event.target.childNodes.length;
            var lastcolid = d3.event.target.childNodes[rowchildrenlength-1].id;
            // make a new column id
            var lastcolidint = this.convert_colid2int(lastcolid);
            var newcolidint = lastcolidint + 1;
            var newcolid = this.make_colidfromint(newcolidint);
            // update the tile column id
            tiledrop.id=newcolid;
            // append the tile as the last column of the row
            d3.event.target.appendChild(tiledrop);
        };
    };
};
d3_tile.prototype.convert_colid2int = function(colid_I){
    //convert a column id string to an integer
    var colidint_O = 0;
    if (typeof(colid_I)!=="undefined"){
        var colidstr = colid_I;
    } else {
        console.log("no colid provided");
        return colidint_O;
    };

    if (colidstr.indexOf('col')===0){
        colidint_O = parseInt(colidstr.replace('col',''));
    } else {
        console.log("invalid colid provided");
        return colidint_O;
    };
    return colidint_O;
};
d3_tile.prototype.convert_rowid2int = function(rowid_I){
    //convert a row id string to an integer
    var rowidint_O = 0;
    if (typeof(rowid_I)!=="undefined"){
        var rowidstr = rowid_I;
    } else {
        console.log("no rowid provided");
        return rowidint_O;
    };

    if (rowidstr.indexOf('row')===0){
        rowidint_O = parseInt(rowidstr.replace('row',''));
    } else {
        console.log("invalid rowid provided");
        return rowidint_O;
    };
    return rowidint_O;
};
d3_tile.prototype.make_colidfromint = function(colidint_I){
    //convert a column id int to a string
    var colid_O = 'col0';
    if (typeof(colidint_I)!=="undefined"){
        var colidint = colidint_I;
    } else {
        console.log("no colid provided");
        return colid_O;
    };
    colid_O = 'col' + colidint.toString();
    return colid_O;
};
d3_tile.prototype.make_rowidfromint = function(rowidint_I){
    //convert a row id int to a string
    var rowid_O = 'row0';
    if (typeof(rowidint_I)!=="undefined"){
        var rowidint = rowidint_I;
    } else {
        console.log("no rowid provided");
        return rowid_O;
    };
    rowid_O = 'row' + rowidint.toString();
    return rowid_O;
};
d3_tile.prototype.get_colnode = function(tileid_I){
    //get column node by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //colNode = node of the column  
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };
    var colNode = d3.select("#"+tileid).node().parentNode;
    return colNode;
};
d3_tile.prototype.get_rownode = function(tileid_I){
    //get row node by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //rowNode = node of the row 
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    return rowNode;
};
d3_tile.prototype.get_colidsinrow = function(tileid_I){
    //get all colids in a row by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //colids = list of colids in the row  
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };  
    var output_O = [];
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    var colids = [];
    for (var i=0;i<rowNode.childNodes.length;i++){
        colids.push(rowNode.childNodes[i].id);
    };
    return colids;
};
d3_tile.prototype.get_parentrownode = function(tileid_I){
    //get parent node of the row
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //rowParentNode = node of the row 
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    var parentRowNode = rowNode.parentNode;
    return parentRowNode;
};
d3_tile.prototype.get_rowidsinparentrow = function(tileid_I){
    //get all colids in a row by the tileid
    //INPUT:
    //tileid_I = tileid;
    //OUTPUT:
    //colids = list of colids in the row  
    if (typeof(tileid_I)!=="undefined"){
        var tileid = tileid_I;
    } else {
        var tileid = this.tileid;
    };  
    var output_O = [];
    var colNode = d3.select("#"+tileid).node().parentNode;
    var rowNode = colNode.parentNode;
    var parentRowNode = rowNode.parentNode;
    var rowids = [];
    for (var i=0;i<parentRowNode.childNodes.length;i++){
        rowids.push(parentRowNode.childNodes[i].id);
    };
    return rowids;
};
d3_tile.prototype.add_duplicatebutton2header = function (){
    // add duplication button to tile
    // TODO: fix

    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;

    var this_ = this;

    function duplicatetile(){
        //duplicate the tile
        
        // get all colids in the row
        var colNode = this_.get_colnode(tileid);
        var rowNode = this_.get_rownode(tileid);
        var colids = this_.get_colidsinrow(tileid);
        // get the current colid (it may have not been updated)
        var colid = colNode.id;
        // duplicate the colNode
        var colNodeCopy=colNode.cloneNode(true);
        // make a new column id
        var colidint = this_.convert_colid2int(colid);
        var newcolidint = colidint + 1;
        var newcolid = this_.make_colidfromint(newcolidint);
        // make a new tileid
        var newtileid = tileid+"-copy"
        // update the copied node
        colNodeCopy.id = newcolid;
        colNodeCopy.childNodes[0].id = newtileid;
        // swap tiles
        rowNode.appendChild(colNodeCopy);
    };

    var duplicatetilebutton = this.tileheader.append("div")
        .attr("class","glyphicon glyphicon-duplicate pull-right")
        .attr("id", tileid + 'duplicatetile')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","duplicate");
    duplicatetilebutton.on("click",duplicatetile);
};
d3_tile.prototype.show_tilemenumodal = function(){
    // show the tile menu options modal
    var this_ = this;
    var tileid = this.tileid;

    function updatetileparameters(){
        // update the tile parameters
        
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid+'modal').modal('hide');
    };

    //add the modal menu object
    var modalid = tileid + "tilemenubuttonmodal";
    var modaltargetid = "#" + tileid + 'tilemenubutton';
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
    menumodal.add_title2modalheader('Tile Options');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        // TODO:...
        // form to change tile size and position
        // form to change tile content (plot, table, etc.)

        d3.select('#'+id+"modalfootersubmitbutton").on("click",updatetileparameters)
    };
    // show the modal
    $("#"+modalid+'modal').modal('show');
};
d3_tile.prototype.add_tilemenubutton2header = function (){
    // add tile menu button to header

    var tileid = this.tileid;
    var this_ = this;

    function showtilemenumodal(){
        this_.show_tilemenumodal();
    };

    var tilemenubutton = this.tileheader.append("div")
        .attr("class","pull-right")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","tile options menu")
        .attr("id", tileid + 'tilemenubutton');

    var tilemenubuttontrigger = tilemenubutton
        .append("span")
        .attr("class","glyphicon  glyphicon glyphicon-wrench pull-right")
        .attr("id", tileid + 'tilemenubuttonglyphicon')
        .attr("aria-hidden","true");

    tilemenubuttontrigger.on("click",showtilemenumodal);
};
d3_tile.prototype.enable_touch = function (){
    // all touch features
    this.add_touchpan();
    this.add_touchswipe();
    this.add_touchtap();
    this.add_touchpinch();
    this.add_touchpress();
}
d3_tile.prototype.add_touchpan = function () {
    // add pan functionality using hammer.js
   
    var tileid = this.tileid;

    var myElement = document.getElementById(tileid+"panel-heading");
    var hammertime = new Hammer(myElement);

    hammertime.get('pan').set(
        { direction: Hammer.DIRECTION_ALL});

    hammertime.on('panleft panright', function(ev) {
        console.log("horizontal");
    });
    hammertime.on('panup pandown', function(ev) {
        console.log("vertical");
    });
};
d3_tile.prototype.add_touchswipe = function () {
    // add swipe functionality using hammer.js
   
    var tileid = this.tileid;

    var myElement = document.getElementById(tileid+"panel-heading");
    var hammertime = new Hammer(myElement);

    hammertime.get('swipe').set(
        { direction: Hammer.DIRECTION_ALL,
        prevent_default: true,
        drag_min_distance:1,
        swipe_velocity:.1
        });

    hammertime.on('swipeleft', function(ev) {
        console.log("left");
    });
    hammertime.on('swiperight', function(ev) {
        console.log("right");
    });
    hammertime.on('swipeup', function(ev) {
        console.log("up");
    });
    hammertime.on('swipedown', function(ev) {
        console.log("down");
    });
};
d3_tile.prototype.add_touchtap = function () {
    // add tap functionality using hammer.js
   
    var tileid = this.tileid;

    var myElement = document.getElementById(tileid+"panel-heading");
    var hammertime = new Hammer(myElement);

    // Tap recognizer with minimal 2 taps
    hammertime.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
    // Single tap recognizer
    hammertime.add( new Hammer.Tap({ event: 'singletap' }) );
    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    hammertime.get('doubletap').recognizeWith('singletap');
    // we only want to trigger a tap, when we don't have detected a doubletap
    hammertime.get('singletap').requireFailure('doubletap');
    hammertime.on("doubletap", function(ev) {
        console.log(ev);
    });

//     hammertime.on('tap', function(ev) {
//         console.log(ev);
//     });
};