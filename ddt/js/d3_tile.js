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
d3_tile.prototype.append_tile2container = function () {
    // set column id
    //ondrop="drop(event)" ondragover="allowDrop(event)"
    var row = d3.select("#" + this.containerid)
        .append("div")
        .attr("class", this.rowclass)
        .attr("id", this.rowid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
//         .on("drop", "drop(event);")
//         .on("dragover", "allowDrop(event);")
//         .on("dragenter","dragEnter(event);");
    var col = row.append("div")
        .attr("class", this.colclass)
        .attr("id", this.colid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
//         .on("drop", "drop(event);")
//         .on("dragover", "allowDrop(event);")
//         .on("dragenter","dragEnter(event);");
    this.tile = col.append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.append_tile2row = function () {
    // add tile as new column in an existing row
    var col = d3.select("#" + this.containerid).select("#" + this.rowid)
        .append("div")
        .attr("class", this.colclass)
        .attr("id", this.colid)
        .on("drop", drop)
        .on("dragover", allowDrop)
        .on("dragleave", dragLeave)
        .on("dragenter",dragEnter);
//         .on("drop", "drop(event);")
//         .on("dragover", "allowDrop(event);")
//         .on("dragenter","dragEnter(event);");
    this.tile = col.append("div")
        .attr("class", this.tileclass)
        .attr("id", this.tileid);
};
d3_tile.prototype.append_tile2col = function () {
    // add tile to as a new row in an existing column
    this.tile = d3.select("#" + this.containerid)
        .select("#" + this.rowid)
        .select("#" + this.colid)
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
    // remove tile from the container
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
d3_tile.prototype.add_header2tile = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    this.tileheader = d3.select('#'+tileid).append("div")
        .attr("class","panel-heading")
        .attr("id",tileid+"panel-heading");
};
d3_tile.prototype.add_title2header = function (title_I){
    //add title to tileid

    var tileid = this.tileid;

    var title = this.tileheader.append("h3")
        .text(title_I);
};
d3_tile.prototype.add_removebutton2header = function(){
    // add button to remove tile from the container

    var tileid = this.tileid;
    var this_ = this;

    function removetile(){
        d3.selectAll('#'+tileid).remove();
        this_.tile = null;
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
d3_tile.prototype.add_pan = function () {
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
d3_tile.prototype.add_swipe = function () {
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
d3_tile.prototype.add_tap = function () {
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
d3_tile.prototype.add_navigationmenu2header = function(){
    //add a navigation menu
    //move tile 1 column to the left
    //move tile 1 column to the right
    //move tile 1 row up
    //move tile 1 row down

    //TODO
    var tileid = this.tileid;
    var rowid = this.rowid;
    var colid = this.colid;

    var this_ = this;

    function movetileleft(){
        var colidint = parseInt(rowid.replace('col',''));
        var colidleftint = colidint-1;
        var colidleft = colidleftint.toString();
        var tileleft = d3.select("#"+colidleft+ " .panel");
        if (tileleft){
            //swap places with the tile to the left

        };
    };

    var navmenu = this.tileheader.append("div")
        .attr("id", tileid + 'navigationmenu');
    var moveleftbutton = navmenu.append("div")
        .attr("class","glyphicon glyphicon-arrow-left pull-left")
        .attr("id", tileid + 'movetileleft')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","move left");
    moveleftbutton.on("click",movetileleft);
}
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
};
function allowDrop() {
    if (d3.event){
        d3.event.preventDefault();
    };
};
function drop() {
    if (d3.event){
        d3.event.preventDefault();
        d3.event.target.style.background="";
        var tiletargetid = d3.event.target.id;
        if (tiletargetid.indexOf('col')===0){
            // append tile as a new column of the same row
            var tiledropid = d3.event.dataTransfer.getData("text");
            var tiledrop = d3.select("#"+tiledropid);
            d3.event.target.appendChild(document.getElementById(tiledropid));
        };
        if (tiletargetid.indexOf('row')===0){
            // append tile as a new row
            var tiledropid = d3.event.dataTransfer.getData("text");
            var tiledrop = d3.select("#"+tiledropid);
            d3.event.target.appendChild(document.getElementById(tiledropid));
        };
    };
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

