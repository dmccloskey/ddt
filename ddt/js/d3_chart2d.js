"use strict";
//var d3_chart2d = function () {
function d3_chart2d() {
    // generic chart
    d3_svg_data.call(this);
    //this.svgdata = null;
    //this.svgenter = null;
    //this.svgsvg = null;
    //this.svgg = null;
    this.duration = 1;
    this.x1scale = null;
    this.y1scale = null;
    this.x2scale = null;
    this.y2scale = null;
    this._x1axis = null;
    this._x2axis = null;
    this._y1axis = null;
    this._y2axis = null;
    this.x1axis = null;
    this.x2axis = null;
    this.y1axis = null;
    this.y2axis = null;
    this.clippath = null;
    this.title = null;
    this.x1axisgridlines = null;
    this.y1axisgridlines = null;
    this.x1axisgridlinesenter = null;
    this.y1axisgridlinesenter = null;
    this.tooltip = null;

};
d3_chart2d.prototype = Object.create(d3_svg_data.prototype);
d3_chart2d.prototype.constructor = d3_chart2d;
d3_chart2d.prototype.add_chart2d2tile = function(){
    // add char2d to tile

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    var tileid = this.tileid;
    var id = this.id;
    var data1listdatafiltered = this.data1.listdatafiltered;

    this.svgelement = d3.select('#' + tileid+"panel-body").selectAll(".svg-responsive")
        .data([data1listdatafiltered]);
    
    this.svgenter = this.svgelement.enter()    
        .append("div")
        .attr("class",'svg-responsive')
        .append("svg")
        .attr("id", id)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svgelement.selectAll("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    this.svgg = this.svgelement.select('g');

};
d3_chart2d.prototype.remove_chart2d = function(){
    // remove chart2d from tileid
    if (this.svgelement){
        this.svgelement.remove();
        this.svgelement = null;
        this.svgenter = null;
        this.svgg = null;
    };
};
d3_chart2d.prototype.add_title = function (title_I) {
    // add chart title
    this.title = this.svgg.append("text")
    .attr("x", this.width / 2)
    .attr("y", -this.margin.top / 2)
    .attr("class", "title")
    .attr("id", this.id+"title")
    .style("text-anchor", "middle")
    .text(title_I);
};
d3_chart2d.prototype.remove_title = function () {
    // remove chart title
    this.title.remove();
    this.title = null;
};
d3_chart2d.prototype.add_clippath = function () {
    // add clippath to chart
    this.clippath = this.svgenter.append("clippath")
        .attr("class", "clippath")
        .attr("id", this.id + "clippath")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("pointer-events", "all");
};
d3_chart2d.prototype.remove_clippath = function () {
    // remove clippath from chart
    this.clippath.node().parentNode.remove();
    this.clippath = null;
};
d3_chart2d.prototype.set_x1range = function (scale_I) {
    // set x1-range of the plot
    if (scale_I === 'linear') {
        this.x1scale = d3.scale.linear().range([0,this.width]);
    } else if (scale_I === 'ordinal') {
        this.x1scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        this.x1scale = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
    };
};
d3_chart2d.prototype.set_y1range = function (scale_I,invert_I) {
    // set y1-range of the plot
    if (typeof scale_I === "undefined"){scale_I=null;}
    if (typeof invert_I === "undefined"){invert_I=false;}
    if (scale_I === 'linear') {
        if (invert_I){
            this.y1scale = d3.scale.linear().range([0,this.height]); //starts at the top left
        } else {
            this.y1scale = d3.scale.linear().range([this.height, 0]); //starts at the bottom left
        };
    } else if (scale_I === 'radial') {
        if (invert_I){
            this.y1scale = d3.scale.linear().range([0,2*Math.PI]); //starts at the top left
        } else {
            this.y1scale = d3.scale.linear().range([2*Math.PI, 0]); //starts at the bottom left
        };
    } else if (scale_I === 'ordinal') {
        this.y1scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        if (invert_I){
            this.y1scale = d3.scale.ordinal().rangeRoundBands([0,this.height], .1); //starts at the top left
        } else {
            this.y1scale = d3.scale.ordinal().rangeRoundBands([this.height, 0], .1); //starts at the bottom left
        };
    };
};
d3_chart2d.prototype.set_x2range = function (scale_I) {
    // set x2-range of the plot
    if (scale_I === 'linear') {
        this.x2scale = d3.scale.linear().range([0, this.width])
    } else if (scale_I === 'ordinal') {
        this.x2scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        this.x2scale = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
    };
};
d3_chart2d.prototype.set_y2range = function (scale_I,invert_I) {
    // set y1-range of the plot
    if (typeof scale_I === "undefined"){scale_I=null;}
    if (typeof invert_I === "undefined"){invert_I=false;}
    if (scale_I === 'linear') {
        if (invert_I){
            this.y2scale = d3.scale.linear().range([0,this.height]); //starts at the top left
        } else {
            this.y2scale = d3.scale.linear().range([this.height, 0]); //starts at the bottom left
        };
    } else if (scale_I === 'ordinal') {
        this.y2scale = d3.scale.ordinal();
    } else if (scale_I === 'ordinal-rangeRoundBands') {
        if (invert_I){
            this.y2scale = d3.scale.ordinal().rangeRoundBands([0,this.height], .1); //starts at the top left
        } else {
            this.y2scale = d3.scale.ordinal().rangeRoundBands([this.height, 0], .1); //starts at the bottom left
        };
    };
};
d3_chart2d.prototype.set_x1domain = function () {
    // set x1-domain of the plot
    var x_data = this.data1keymap.xdata;
    var _this = this;
    var data1 = [];

    // required to prevent error bars from being cutoff
    if (this.data1keymap.xdatamin && this.data1keymap.xdatamax){
        _this.data1.listdatafiltered.forEach(function(d){
            var xdatamin = _this.data1.checkAndConvert_DateType(
                _this.data1keymap.xdatamin,
                d[_this.data1keymap.xdatamin]);
            var xdatamax = _this.data1.checkAndConvert_DateType(
                _this.data1keymap.xdatamax,
                d[_this.data1keymap.xdatamax]);
            data1.push(xdatamin);
            data1.push(xdatamax);
        })
    } else if (this.data1keymap.xdatalb && this.data1keymap.xdataub){
        _this.data1.listdatafiltered.forEach(function(d){
            var xdatalb = _this.data1.checkAndConvert_DateType(
                _this.data1keymap.xdatalb,
                d[_this.data1keymap.xdatalb]);
            var xdataub = _this.data1.checkAndConvert_DateType(
                _this.data1keymap.xdataub,
                d[_this.data1keymap.xdataub]);
            data1.push(xdatalb);
            data1.push(xdataub);
        })
    } else{
        _this.data1.listdatafiltered.forEach(function(d){
            var xdata = _this.data1.checkAndConvert_DateType(
                _this.data1keymap.xdata,
                d[_this.data1keymap.xdata]);
            data1.push(xdata);
        })
    };
    //this.y1scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[y_data]; })).nice();
    // check for unique values
    var unique = data1.filter( onlyUnique );
    // add in 0.0 if there is only 1 unique value to solve issue#1
    // Problem: This is caused by an auto-adjustment of the y-axis from min_value(data array) to max_value(data array). When only one or a constant y-value is supplied, the min/max of the y-axis are set to the same value.
    // Correction: ensure a minimum y-axis value of 0.0.
    //
    if (unique.length === 1){
        data1.push(0.0);
        };
    //define the y1 scale
    this.x1scale.domain(d3.extent(data1)).nice();
//     this.x1scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[x_data]; })).nice();
};
d3_chart2d.prototype.set_y1domain = function () {
    // set y1-domain of the plot
    var y_data = this.data1keymap.ydata;
    var _this = this;
    var data1 = [];
    // required to prevent error bars from being cutoff
    if (this.data1keymap.ydatamin && this.data1keymap.ydatamax){
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
            data1.push(d[_this.data1keymap.ydatamin]);
            data1.push(d[_this.data1keymap.ydatamax]);
        })
    } else if (this.data1keymap.ydatalb && this.data1keymap.ydataub){
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
            data1.push(d[_this.data1keymap.ydatalb]);
            data1.push(d[_this.data1keymap.ydataub]);
        })
    } else{
        _this.data1.listdatafiltered.forEach(function(d){
            data1.push(d[y_data]);
        })
    };
    //this.y1scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[y_data]; })).nice();
    // check for unique values
    var unique = data1.filter( onlyUnique );
    // add in 0.0 if there is only 1 unique value to solve issue#1
    // Problem: This is caused by an auto-adjustment of the y-axis from min_value(data array) to max_value(data array). When only one or a constant y-value is supplied, the min/max of the y-axis are set to the same value.
    // Correction: ensure a minimum y-axis value of 0.0.
    //
    if (unique.length === 1){
        data1.push(0.0);
        };
    //define the y1 scale
    this.y1scale.domain(d3.extent(data1)).nice();
};
d3_chart2d.prototype.set_x2domain = function () {
    // set x1-domain of the plot
    var x_data = this.data2keymap.xdata;
    var _this = this;
    this.x2scale.domain(d3.extent(_this.data1.listdatafiltered, function (d) { return d[x_data]; })).nice();
};
d3_chart2d.prototype.set_y2domain = function () {
    // set y2-domain of the plot
    var y_data = this.data2keymap.ydata;
    var _this = this;
    var data2 = [];
    // required to prevent error bars from being cutoff
    if (this.data2keymap.ydatamin && this.data2keymap.ydatamax){
        _this.data2.listdatafiltered.forEach(function(d){
            data2.push(d[y_data]);
            data2.push(d[_this.data2keymap.ydatamin]);
            data2.push(d[_this.data2keymap.ydatamax]);
        })
    } else if (this.data2keymap.ydatalb && this.data2keymap.ydataub){
        _this.data2.listdatafiltered.forEach(function(d){
            data2.push(d[y_data]);
            data2.push(d[_this.data2keymap.ydatalb]);
            data2.push(d[_this.data2keymap.ydatalb]);
        })
    } else{
        _this.data2.listdatafiltered.forEach(function(d){
            data2.push(d[y_data]);
        })
    };
    // check for unique values
    var unique = data1.filter( onlyUnique );
    // add in 0.0 if there is only 1 unique value to solve issue#1
    // Problem: This is caused by an auto-adjustment of the y-axis from min_value(data array) to max_value(data array). When only one or a constant y-value is supplied, the min/max of the y-axis are set to the same value.
    // Correction: ensure a minimum y-axis value of 0.0.
    //
    if (unique.length === 1){
        data1.push(0.0);
        };
    this.y2scale.domain(d3.extent(data2)).nice();
};
d3_chart2d.prototype.set_y1domainstacked = function () {
    // set y1-domain of the plot
    var y_data = this.data1keymap.ydata;
    var stackdata1 = this.stackdata1;
    var nestdatafiltered = this.data1.nestdatafiltered
    var _this = this;
    var data1 = [];
    var stackeddata1max = d3.max(stackdata1(nestdatafiltered), function(nest) {
        var nestvalues = []; 
        nest.values.forEach(function(d) {
            nestvalues.push(d.y0 + d.y);
            });
        var nestmax = d3.max(nestvalues);
        return nestmax;
        });
    var stackeddata1min = d3.min(stackdata1(nestdatafiltered), function(nest) {
        var nestvalues = []; 
        nest.values.forEach(function(d) {
            nestvalues.push(d.y0);
            });
        var nestmin = d3.min(nestvalues);
        return nestmin;
        });
    data1.push(stackeddata1max);
    data1.push(stackeddata1min);
    // check for unique values
    var unique = data1.filter( onlyUnique );
    // add in 0.0 if there is only 1 unique value to solve issue#1
    // Problem: This is caused by an auto-adjustment of the y-axis from min_value(data array) to max_value(data array). When only one or a constant y-value is supplied, the min/max of the y-axis are set to the same value.
    // Correction: ensure a minimum y-axis value of 0.0.
    //
    if (unique.length === 1){
        data1.push(0.0);
        };
    //define the y1 scale
    this.y1scale.domain(d3.extent(data1)).nice();
};
d3_chart2d.prototype.get_uniquelabels = function (data_I,label_I){
    // extract out unique series labels from listdatafiltered
    var label = label_I;
    var labels_unique = d3.set();
    data_I.forEach(function(d){
        labels_unique.add(d[label]);
        });
    return labels_unique.values();
};
d3_chart2d.prototype.copy_x1scalestox2scales = function () {
    // copy x1 scale to x2scale
    this.x2scale = this.x1scale;
};
d3_chart2d.prototype.copy_y1scalestoy2scales = function () {
    // copy y1 scale to y2scale
    this.y2scale = this.y1scale;
};
d3_chart2d.prototype.set_x1axis = function () {
    //x1 axis properties
    var this_ = this;
    var datatype = this.data1.get_metadata_datatype(this.data1keymap.xdata);
    if (datatype==="Date"){
        var format = function(d){
            return this_.data1.convert_number2Date(d,this_.data1keymap.xdata);
        };
    } else {
        var format = null;
    }
    //var format = 
    this._x1axis = d3.svg.axis().scale(this.x1scale)
            .orient("bottom")
            .tickFormat(format);
};
d3_chart2d.prototype.set_x1x2axis = function () {
    //x1 and x2 axis properties using data1
    this._x1axis = d3.svg.axis().scale(this.x1scale)
            .orient("bottom");
    this._x2axis = d3.svg.axis().scale(this.x1scale)
            .orient("top");
};
d3_chart2d.prototype.set_x2axis = function () {
    //x2 axis properties
    this._x2axis = d3.svg.axis().scale(this.x2scale)
            .orient("top");
};
d3_chart2d.prototype.set_y1axis = function () {
    //y1 axis properties
    this._y1axis = d3.svg.axis()
            .scale(this.y1scale)
            .orient("left");
};
d3_chart2d.prototype.set_y1y2axis = function () {
    //y1 and y2 axis properties using data1
    this._y1axis = d3.svg.axis()
            .scale(this.y1scale)
            .orient("left");
    this._y2axis = d3.svg.axis()
            .scale(this.y1scale)
            .orient("right");
};
d3_chart2d.prototype.set_y2axis = function () {
    //y2 axis properties
    this._y2axis = d3.svg.axis()
            .scale(this.y2scale)
            .orient("right");
};
d3_chart2d.prototype.add_x1axis = function () {
    //add x1 axis
    this.x1axis = this.svgenter.append("g")
            .attr("class", "x1axis")
            .attr("id", this.id + "x1axis")
            .attr("transform", "translate(0," + this.height + ")");
    this.svgg.select('g.x1axis')
            .transition()
            .call(this._x1axis);
};
d3_chart2d.prototype.add_x1x2axis = function () {
    //add x1 and x2 axis using data1
    this.x1axis = this.svgenter.append("g")
            .attr("class", "x1axis")
            .attr("id", this.id + "x1axis")
            .attr("transform", "translate(0," + this.height + ")");
    this.svgg.select('g.x1axis')
            .transition()
            .call(this._x1axis);
    this.x2axis = this.svgenter.append("g")
            .attr("class", "x2axis")
            .attr("id", this.id + "x2axis");
    this.svgg.select('g.x2axis')
            .transition()
            .call(this._x2axis);
};
d3_chart2d.prototype.set_x1axistickformat = function (x1axistickformat_I) {
    //x1 axis format
    //uses axis.tickFormat(d3.format())
    if (typeof x1axistickformat_I !== "undefined"){var x1axistickformat = x1axistickformat_I;}
    else {var x1axistickformat = null;}
    this._x1axis.tickFormat(d3.format(x1axistickformat));
};
d3_chart2d.prototype.set_y1axistickformat = function (y1axistickformat_I) {
    //y1 axis format
    //uses axis.tickFormat(d3.format())
    if (typeof y1axistickformat_I !== "undefined"){var y1axistickformat = y1axistickformat_I;}
    else {var y1axistickformat = null;}
    this._y1axis.tickFormat(d3.format(y1axistickformat));
};
d3_chart2d.prototype.add_x2axis = function () {
    //add x2 axis
    this.x2axis = this.svgenter.append("g")
            .attr("class", "x2axis")
            .attr("id", this.id + "x2axis");
    this.svgg.select('g.x2axis').transition()
            .call(this._x2axis);
};
d3_chart2d.prototype.add_y1axis = function () {
    //add y1 axis
    this.y1axis = this.svgenter.append("g")
            .attr("class", "y1axis")
            .attr("id", this.id + "y1axis");
    this.svgg.select('g.y1axis') //can be used as well
            .transition()
            .call(this._y1axis);
};
d3_chart2d.prototype.add_y1y2axis = function () {
    //add y1 and y2 axis using data1
    var width = this.width;
    this.y1axis = this.svgenter.append("g")
            .attr("class", "y1axis")
            .attr("id", this.id + "y1axis");
    this.svgg.select('g.y1axis').transition()
            .call(this._y1axis);
    this.y2axis = this.svgenter.append("g")
            .attr("class", "y2axis")
            .attr("id", this.id + "y2axis")
            .attr("transform", "translate(" + width + ",0)");
    this.svgg.select('g.y2axis').transition()
            .call(this._y2axis);
};
d3_chart2d.prototype.add_y2axis = function () {
    //add y2 axis
    var width = this.width;
    this.y2axis = this.svgenter.append("g")
            .attr("class", "y2axis")
            .attr("id", this.id + "y2axis")
            .attr("transform", "translate(" + width + ",0)");

    this.svgg.select('g.y2axis').transition()
            .call(this._y2axis);
};
d3_chart2d.prototype.set_x1tickformat = function () {
    //set x1ticklabels properties
};
d3_chart2d.prototype.set_x2tickformat = function () {
    //set x2ticklabels properties
};
d3_chart2d.prototype.set_y1tickformat = function () {
    //set y1ticklabels properties
};
d3_chart2d.prototype.set_y2tickformat = function () {
    //set y2ticklabels properties
};
d3_chart2d.prototype.add_x1axisgridlines = function () {
    //x axis grid lines properties
    //TODO:
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var listdatafiltered = this.data1.listdatafiltered;

    this.x1axisgridlines = this.svgg.selectAll(".xgridlines")
      .data(this.x1scale.ticks(10));

    this.x1axisgridlines.exit().remove();

    this.x1axisgridlines.transition()
      .attr("x1", x1scale)
      .attr("x2", x1scale)
      .attr("y1", d3.min(listdatafiltered, function (d) { return d[y_data]; }))
      .attr("y2", d3.max(listdatafiltered, function (d) { return d[y_data]; }))
      .style("stroke", "#ccc");

    this.x1axisgridlinesenter = this.x1axisgridlines.enter()
      .append("line")
      .attr("class", "xgridlines")
      .attr("id", this.id + "xgridlines")
      .attr("x1", x1scale)
      .attr("x2", x1scale)
      .attr("y1", d3.min(listdatafiltered, function (d) { return d[y_data]; }))
      .attr("y2", d3.max(listdatafiltered, function (d) { return d[y_data]; }))
      .style("stroke", "#ccc");
};
d3_chart2d.prototype.add_y1axisgridlines = function () {
    //y axis grid lines properties
    //TODO:
    var x_data = this.data1keymap.ydata;
    var y1scale = this.y1scale;
    var listdatafiltered = this.data1.listdatafiltered;

    this.y1axisgridlines = this.svgg.selectAll(".ygridlines")
    .data(this.y1scale.ticks(10));

    this.y1axisgridlines.exit().remove();

    this.y1axisgridlines.transition()
        .attr("x1", d3.min(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("x2", d3.max(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("y1", y1scale)
        .attr("y2", y1scale)
        .style("stroke", "#ccc");

    this.y1axisgridlinesenter = this.y1axisgridlines.enter()
        .append("line")
        .attr("class", "ygridlines")
        .attr("id", this.id + "ygridlines")
        .attr("x1", d3.min(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("x2", d3.max(listdatafiltered, function (d) { return d[x_data]; }))
        .attr("y1", y1scale)
        .attr("y2", y1scale)
        .style("stroke", "#ccc");
};
d3_chart2d.prototype.add_x1axislabel = function (x1axislabel_I) {
    //add x1axis label properties
    var tileid = this.tileid;
    this.x1axis.append("text")
        .attr("class", "label")
        .attr("x", this.width / 2)
        .attr("y", 28)
        .style("text-anchor", "middle")
        .text(x1axislabel_I)
        .attr("id",tileid+"x1axislabel");
};
d3_chart2d.prototype.add_x2axislabel = function (x2axislabel_I) {
    //set x2axis label properties
    var tileid = this.tileid;
    this.x1axis.append("text")
        .attr("class", "label")
        .attr("x", this.width / 2)
        .attr("y", -28)
        .style("text-anchor", "middle")
        .text(x2axislabel_I)
        .attr("id",tileid+"x2axislabel");
};
d3_chart2d.prototype.add_y1axislabel = function (y1axislabel_I) {
    //set y1axis label properties
    var tileid = this.tileid;
    this.y1axis.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -28)
        .attr("x", -this.height / 2)
        .style("text-anchor", "middle")
        .text(y1axislabel_I)
        .attr("id",tileid+"y1axislabel");
};
d3_chart2d.prototype.add_y2axislabel = function (y2axislabel_I) {
    //set y2axis label properties
    var tileid = this.tileid;
    this.y2axis.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 28)
        .attr("x", -this.height / 2)
        .style("text-anchor", "middle")
        .text(y2axislabel_I)
        .attr("id",tileid+"y2axislabel");
};
d3_chart2d.prototype.update_x1axislabel = function (x1axislabel_I) {
    //add x1axis label properties
    var tileid = this.tileid;
    var x1axislabel = d3.select("#"+tileid + "x1axislabel");
    x1axislabel.text(x1axislabel_I);
};
d3_chart2d.prototype.update_x2axislabel = function (x2axislabel_I) {
    //add x2axis label properties
    var tileid = this.tileid;
    var x2axislabel = d3.select("#"+tileid + "x2axislabel");
    x2axislabel.text(x2axislabel_I);
};
d3_chart2d.prototype.update_y1axislabel = function (y1axislabel_I) {
    //add y1axis label properties
    var tileid = this.tileid;
    var y1axislabel = d3.select("#"+tileid + "y1axislabel");
    y1axislabel.text(y1axislabel_I);
};
d3_chart2d.prototype.update_y2axislabel = function (y2axislabel_I) {
    //add y2axis label properties
    var tileid = this.tileid;
    var y2axislabel = d3.select("#"+tileid + "y2axislabel");
    y2axislabel.text(y2axislabel_I);
};
d3_chart2d.prototype.set_tooltip = function () {
    //set tooltip properties
    //TODO: implement bootstrap tooltip
    //http://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-tooltips.php
    var series_label = this.data1keymap.serieslabel;

    this.tooltip = d3.select("#" + this.tileid + "panel-body")
        .append("div")
        .attr('class', 'hidden')
        .attr('id', this.id + 'tooltip')
        .append('p')
        .attr('id', this.id + 'value');

//     $(document).ready(function(){
//         $('[data-toggle="tooltip"]').tooltip();   
//     });

//     this.tooltip = d3.select("#" + this.tileid + "panel-body")
//         .append("div")
//         .attr('class', 'tooltip hidden')
//         .attr('role', 'tooltip');
//         //.attr('id', this.id + 'tooltip');

//     this.tooltiparrow = this.tooltip
//         .append("div")
//         .attr("class","tooltip-arrow");

//     this.tooltipinner = this.tooltip
//         .append("div")
//         .attr("class","tooltip-inner")
//         .attr('id', this.id + 'value');
};
d3_chart2d.prototype.set_tooltipstyle = function () {
    //set tooltip css properties
    var tooltipselector = "#" + this.id + 'tooltip';
    var tooltipstyle = {
        'position': 'fixed',
        'width': 'auto',
        'height': 'auto',
        'padding': '10px',
        'background-color': 'white',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        'border-radius': '10px',
        '-webkit-box-shadow': '4px 4px 10px rgba(0, 0, 0, 0.4)',
        '-moz-box-shadow': '4px 4px 10px rgba(0, 0, 0, 0.4)',
        'box-shadow': '4px 4px 10px rgba(0, 0, 0, 0.4)',
        'pointer-events': 'none'
    };
    var selectionstyle = [{ 'selection': tooltipselector, 'style': tooltipstyle }];
    this.set_d3css(selectionstyle);
};
d3_chart2d.prototype.set_d3tooltipstyle = function () {
    //set tooltip css properties
    var tooltipselector1 = '.d3-tip';
    var tooltipstyle1 = {
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
    };
    var tooltipselector2 = '.d3-tip:after';
    var tooltipstyle2 = {
          'box-sizing': 'border-box',
          'display': 'inline',
          'font-size': '10px',
          'width': '100%',
          'line-height': '1',
          'color': 'rgba(0, 0, 0, 0.8)',
          //'content': '"\25BC"',
          'position': 'absolute',
          'text-align': 'center'
    };
    var tooltipselector3 = '.d3-tip.n:after';
    var tooltipstyle3 = {
           'margin': '-1px 0 0 0',
          'top': '100%',
          'left': '0'
    };
    var selectionstyle = [{ 'selection': tooltipselector1, 'style': tooltipstyle1 },
                        { 'selection': tooltipselector2, 'style': tooltipstyle2 },
                        { 'selection': tooltipselector3, 'style': tooltipstyle3 }];
    this.set_svggcss(selectionstyle);
};
d3_chart2d.prototype.add_legenddata1filter = function () {
    //filter the data on click

    //update data and graphic upon click
    var series_label = this.data1keymap.serieslabel;
    var _this = this;

    this.legenddata1enter.on("click", function (d) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d) { filters.push(n);}; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_legenddata1 = function () {
    //legend properties
    //legend location is predifined

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var colorscale = this.colorscale;
    var width = this.width;
    var id = this.id;
    var listdatafiltered = this.data1.listdatafiltered;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);

    this.legenddata1 = this.svgg.selectAll('.legendelement')
        .data(series_labels_unique);

    this.legenddata1enter = this.legenddata1.enter()
         //adding the grouping here "hides" the rect and text
        .append('g')
        .attr('class', 'legendelement')
        .attr('id', function (d, i) { return id + 'legendelement' + i.toString() })
        .attr('transform', function (d, i) {
            return "translate(" + width + "," + 0 + ")";
        });

    //set the legend transition
    this.legenddata1.transition()
        .attr('transform', function (d, i) {
            return "translate(" + (width) + "," + 0 + ")";
        });

    //add filled rectangles
    this.legenddata1enter.append('rect')
        .attr('x', 0)
        .attr('width', 10)
        .attr('y', function (d, i) { return i * 20; })
        .attr('height', 10);

    this.legenddata1.select('rect')
        .transition()
        .attr('y', function (d, i) { return i * 20; })
        .style('fill', function (d) {
            return colorscale(d);
        });

    //annotate with text

    this.legenddata1enter.append('text')
        .attr('x', 12)
        .attr('y', function (d, i) {
            return i * 20 + 9;
        });
    this.legenddata1.select('text')
        .transition()
        .attr('x', 12)
        .attr('y', function (d, i) {
            return i * 20 + 9;
        })
        .text(function (d) {
            return d;
        });

    this.legenddata1.exit()
      .transition()
        .attr('transform', function (d, i) {
            return "translate(" + width + "," + 0 + ")";
        })
        .remove();
};
d3_chart2d.prototype.add_data1featureslabels = function () {
    //add a change in color upon moving the mouse over the point
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var colorscale = this.colorscale;
    var features_label = this.data1keymap.featureslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var id = this.id;

    //points text labels
    this.data1featureslabelstext = this.svgg.selectAll(".featureslabels")
        .data(this.data1.listdatafiltered);

    this.data1featureslabelstext
        .transition()
        .attr("x", function (d) { return x1scale(d[x_data]) + 5; })
        .attr("y", function (d) { return y1scale(d[y_data]) - 5; })
        .text(function (d) { return d[features_label]; });

    this.data1featureslabelstextenter = this.data1featureslabelstext.enter()

    this.data1featureslabelstextenter.append("text")
        .attr("class", "featureslabels")
        .attr("id", function (d) { return id + "featureslabels"+ d[features_label]; })
        .attr("x", function (d) { return x1scale(d[x_data]) + 5; })
        .attr("y", function (d) { return y1scale(d[y_data]) - 5; })
        .text(function (d) { return d[features_label]; });

    this.data1featureslabelstext.exit().remove();
};
d3_chart2d.prototype.remove_x1axis = function () {
    //remove x1 axis
    d3.selectAll('#'+this.id + 'x1axis').remove();
    this.x1axis = null;
};
d3_chart2d.prototype.remove_x2axis = function () {
    //remove x2 axis
    d3.selectAll('#' + this.id + 'x2axis').remove();
    this.x2axis = null;
};
d3_chart2d.prototype.remove_y1axis = function () {
    //remove y1 axis
    d3.selectAll('#' + this.id + 'y1axis').remove();
    this.y1axis = null;
};
d3_chart2d.prototype.remove_y2axis = function () {
    //remove y2 axis
    d3.selectAll('#' + this.id + 'y2axis').remove();
    this.y2axis = null;
};
d3_chart2d.prototype.set_x1andy1axesstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var style = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1axistickstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
    var style = {
        'font-size': '12px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     ]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1andy1axestickstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
    var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
    var x1axisstyle = {
        'font-size': '12px',
    };
    var y1axisstyle = {
        'font-size': '12px',
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     { 'selection': y1axisselector, 'style': y1axisstyle }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1axislabelstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'Arial'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     ]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1andy1axeslabelstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var y1axisselector = '#' + this.id + 'y1axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'Arial'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1x2andy1y2axestickstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' text.label';
    var y1axisselector = '#' + this.id + 'y1axis' + ' text.label';
    var x2axisselector = '#' + this.id + 'x2axis' + ' text.label';
    var y2axisselector = '#' + this.id + 'y2axis' + ' text.label';
    var style = {
        'font-size': '14px',
        'font-style': 'normal',
        'font-family': 'Arial'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style },
                     { 'selection': x2axisselector, 'style': style },
                     { 'selection': y2axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1x2andy1y2axesstyle = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var x2axisselector = '#' + this.id + 'x2axis' + ' path';
    var y2axisselector = '#' + this.id + 'y2axis' + ' path';
    var style = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': style },
                     { 'selection': y1axisselector, 'style': style },
                     { 'selection': x2axisselector, 'style': style },
                     { 'selection': y2axisselector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1axiszoom = function(){
    //set the x1axsis scale for the zoom
    var x1scale = this.x1scale;
    this.zoom.x(x1scale);
};
d3_chart2d.prototype.set_y1axiszoom = function(){
    //set the x1axsis scale for the zoom
    var y1scale = this.y1scale;
    this.zoom.y(y1scale);
};
d3_chart2d.prototype.draw = function(){
    var svgg = this.svgg;
    var _x1axis = this._x1axis;
    var _x2axis = this._x2axis;
    var _y1axis = this._y1axis;
    var _y2axis = this._y2axis;

    return function(){
        if (this.x1axis){
            svgg.select('g.x1axis')
                .call(_x1axis);
                };
        if (this.x2axis){
            svgg.select('g.x2axis')
                .transition()
                .call(_x2axis);
                };
        if (this.y1axis){
            svgg.select('g.y1axis')
                .transition()
                .call(_x1axis);
                };
        if (this.y2axis){
            svgg.select('g.y2axis')
                .transition()
                .call(_y2axis);
                };
    };
};
d3_chart2d.prototype.set_svgelementzoomcss = function(){
    // set cursor style and pointer events on svgelement for zoom
    var selector1 = '#' + this.id;
    var style1 = {
        'cursor': 'move',
        'pointer-events': 'all'
    };
    var selectorstyle = [{ 'selection': selector1, 'style': style1 }]
    this.set_d3css(selectorstyle);
    //this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_legendstyle = function () {
    // predefined css style for legend
    var selector = '.legendelement text';
    var style = {
        'font-size': '10px'
    };
    var selectorstyle = [{ 'selection': selector, 'style': style }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1axisticktextstyle = function (x1axisstyle_I) {
    // custom css styles for x1 axis
    // Input:
    //  style = {}, e.g. 'font-size': '12px'
    if (typeof x1axisstyle_I !== "undefined"){
        var style = x1axisstyle_I;
        var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
        var selectorstyle = [{ 'selection': x1axisselector, 'style': style }]
        this.set_svggcss(selectorstyle);
    };
};
d3_chart2d.prototype.set_svggattr = function (selectionattr_I) {
    //set custom css attributes to svgg
    //Input:
    // selectionattr_I = [{selection: string e.g., '.axis line, .axis path'
    //                      attr: {key:,value} strings e.g., [{'transform','rotate(90)'}]
    for (var i = 0; i < selectionattr_I.length; i++) {
        this.svgg.selectAll(selectionattr_I[i].selection)
            .attr(selectionattr_I[i].attr);
    };
};
d3_chart2d.prototype.set_x1axisticktextattr = function (x1axistickattr_I) {
    //x1 axis format
    //appends attributes to x1axis text
    if (typeof x1axistickattr_I !== "undefined"){
        var x1axistickattr = x1axistickattr_I;
        var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
        var selectorattr = [{ 'selection': x1axisselector, 'attr': x1axistickattr }]
        this.set_svggattr(selectorattr);
        };
};
d3_chart2d.prototype.set_y1axisticktextstyle = function (y1axisstyle_I) {
    // custom css styles for y1 axis
    // Input:
    //  style = {}, e.g. 'font-size': '12px'
    if (typeof y1axisstyle_I !== "undefined"){
        var style = y1axisstyle_I;
        var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
        var selectorstyle = [{ 'selection': y1axisselector, 'style': style }]
        this.set_svggcss(selectorstyle);
    };
};
d3_chart2d.prototype.set_y1axisticktextattr = function (y1axistickattr_I) {
    //y1 axis format
    //appends attributes to y1axis text
    if (typeof y1axistickattr_I !== "undefined"){
        var y1axistickattr = y1axistickattr_I;
        var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
        var selectorattr = [{ 'selection': y1axisselector, 'attr': y1axistickattr }]
        this.set_svggattr(selectorattr);
        };
};

// utility functions
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
};