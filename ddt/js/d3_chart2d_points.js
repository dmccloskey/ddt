"use strict";
d3_chart2d.prototype.add_pointsdata1onfill = function () {
    //add a change in color upon moving the mouse over the point
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var id = this.id;

    //change color upon mouseover/mouseout
    this.pointsdata1enter.on("mouseover", function (d, i) {
        d3.select(this).style('fill', 'red');
    })
        .on("mouseout", function (d, i) {
            d3.select(this).style("fill", colorscale(d[series_label]));
        });
};
d3_chart2d.prototype.add_pointsdata1tooltip = function () {
    //add a tooltip upon moving the mouse over the point
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var id = this.id;

    //show tooltip
    this.pointsdata1enter.on("mouseover", function (d) {
        //Update the tooltip position and value
        d3.select("#" + id + "tooltip")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 10) + "px")
            .select("#" + id + "value")
            .text('x: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
        //Show the tooltip
        d3.select("#" + id + "tooltip").classed("hidden", false);
    })
        .on("mouseout", function (d) {
            d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_pointsdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the point
    //add a change in color upon moving the mouse over the point
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var feature_label = this.data1keymap.featureslabel;
    
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(d[x_data]) === 'string' && feature_label && typeof(feature_label) !== "undefined"){
                return(d[feature_label] + '\nx: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) !== 'string' && feature_label && typeof(feature_label) !== "undefined"){
                return(d[feature_label] + '\nx: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) === 'string' && series_label && typeof(series_label) !== "undefined"){
                return(d[series_label] + '\nx: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) !== 'string' && series_label && typeof(series_label) !== "undefined"){
                return(d[series_label] + '\nx: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
            } else if (typeof(d[x_data]) === 'string'){
                return('x: ' + d[x_data] + '; y: ' + d[y_data].toFixed(2));
            } else {
                return ('x: ' + d[x_data].toFixed(2) + '; y: ' + d[y_data].toFixed(2));
                    };
            })
        .style({
           'line-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    if (this.svgg.length!==0){
        this.svgg.call(this.tooltip);
        var tip = this.tooltip;
    } else {
        var tip = null;
    }

    //show tooltip
    this.pointsdata1enter
        .on("mouseover", function (d) {
            //Change fill color
            d3.select(this).style('fill', 'red');
            //Show the tooltip
            if (tip!==null){tip.show(d);};
            })  
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            if (tip!==null){tip.hide(d)};
        });
};
d3_chart2d.prototype.add_pointsdata1seriesfilter = function () {
    //filter series on click
    var series_label = this.data1keymap.serieslabel;
    var _this = this;
    this.pointsdata1enter.on('click', function (d, i) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d[series_label]) { filters.push(n); }; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_pointsdata1featurefilter = function () {
    //filter feature on click
    var feature_label = this.data1keymap.featureslabel
    var _this = this;
    this.pointsdata1enter.on('click', function (d, i) {
        var filters = [];
        _this.data1.filters[feature_label].forEach(function (n) {
            if (n !== d[feature_label]) {
                filters.push(n); }
            //else {console.log(n);}; 
            });
        _this.data1.filters[feature_label] = filters;
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[feature_label] = filters;
            _this.data2.filter_listdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_pointsdata1 = function () {
    //points properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //var pointsdata1g = this.svgg.append('g')
    //    .attr("class", "points")
    //    .attr("id", this.id + "points");

    //this.pointsdata1 = pointsdata1g.selectAll("circle")
    //    .data(this.data1.listdatafiltered);

    this.pointsdata1 = this.svgg.selectAll(".points")
        .data(this.data1.listdatafiltered);

    //this.pointsdata1enter = this.pointsdata1.enter();

    this.pointsdata1.exit().remove();

    this.pointsdata1.transition()
        .attr("cx", function (d) { return x1scale(d[x_data]); })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("fill", function (d) { return colorscale(d[series_label]); });

    this.pointsdata1enter = this.pointsdata1.enter().append("circle")
    //this.pointsdata1enter.append("circle")
        .attr("class", "points")
        .attr("r", 3.5)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cx", function (d) { return x1scale(d[x_data]); })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("fill", function (d) { return colorscale(d[series_label]); });

    //this.pointsdata1enter = this.pointsdata1.enter();
    
    //this.pointsdata1enter.append("circle")
    //    .attr("r", 3.5)
    //    .attr("id", function (d, i) { return id + "point" + i.toString(); })
    //    .attr("cx", function (d) { return x1scale(d[x_data]); })
    //    .attr("cy", function (d) { return y1scale(d[y_data]); })
    //    .style("fill", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_pointsdata2 = function () {
    //points properties
};
d3_chart2d.prototype.set_pointsstyle = function () {
    // predefined css style for points
    var pointsselector = '#' + this.id + 'points';
    var pointsstyle = {
        'stroke': 'none'
    };
    var pointsselector2 = '#' + this.id + 'points:hover';
    var pointsstyle2 = {
        'fill': 'red'
    };
    var selectorstyle = [{ 'selection': pointsselector, 'style': pointsstyle },
            { 'selection': pointsselector2, 'style': pointsstyle2 }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_pointsdata1featurestyle = function(){
    // predefined css style for featur labels
    var featuresselector = '#' + this.id + ' .featureslabels';
    var featuresstyle = {
        'font-size': '10px',
        'font-style': 'normal',
        'font-family': 'Arial'
    };
    var selectorstyle = [{ 'selection': featuresselector, 'style': featuresstyle }]
    this.set_svggcss(selectorstyle);
    
}
d3_chart2d.prototype.set_pointsdata1featurestyle_notext = function(){
    // predefined css style for featur labels
    var featuresselector = '#' + this.id + ' .featureslabels';
    var featuresstyle = {
        'font-size': '10px',
        'font-style': 'normal',
        'font-family': 'Arial',
        'opacity':'0.0'
    };
    var selectorstyle = [{ 'selection': featuresselector, 'style': featuresstyle }]
    this.set_svggcss(selectorstyle);
    
}