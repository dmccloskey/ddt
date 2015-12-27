"use strict";
// Area and stacked area chart
// http://bl.ocks.org/mbostock/3885211
// Stacked density and quantile graphs
// http://bl.ocks.org/NPashaP/113f7fea0751fa1513e1
// Streamgraph
// http://bl.ocks.org/mbostock/4060954
// https://github.com/mbostock/d3/wiki/Stack-Layout
d3_chart2d.prototype.set_stackedareadata1 = function () {
    // set area properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var stackdata1 = this.stackdata1;
    var nestdatafiltered = this.data1.nestdatafiltered

    this.stackedareadata1generator = d3.svg.area()
      .x(function(d) {
        //return x1scale(d.x); })
        return x1scale(d[x_data]); })
      .y0(function(d) {
        return y1scale(d.y0); })
      .y1(function(d) {
        //return y1scale(d.y0 + d.y); });
        return y1scale(d.y0 + d[y_data]); });

};
d3_chart2d.prototype.set_areadata1 = function () {
    // set area properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    //get the minimum y values
    var frequency = this.data1.get_uniquevaluesFromlistdatafiltered(y_data);
    var y0 = Math.min.apply(Math, frequency);

    this.areadata1generator = d3.svg.area()
      .x(function(d) {
        return x1scale(d[x_data]); })
      .y0(function(d) {
        return y1scale(y0); })
      .y1(function(d) {
        return y1scale(y0 + d[y_data]); });

};
d3_chart2d.prototype.add_stackedareadata1 = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var stackedareadata1generator = this.stackedareadata1generator;
    var stackdata1 = this.stackdata1;
    var nestdatafiltered = this.data1.nestdatafiltered

    this.areadata1 = this.svgg.selectAll(".area")
        .data(stackdata1(nestdatafiltered));

    this.areadata1enter = this.areadata1.enter()
        .append("g")
        .attr("class", "area");

    this.areadata1enter.append('path')
        .attr('class', id+'areaseries')
        .attr('id', function (d,i) {
            return id+'areaseries'+i.toString();})
        .attr("d", function(d) { 
          return stackedareadata1generator(d.values); 
          })
        .style("fill", function(d) {
          return colorscale(d.key);
          });

    this.areadata1.select("path."+id+'areaseries')
        .style("fill", function(d) { return colorscale(d.key); })
        .transition()
        .attr("d", function(d) { return stackedareadata1generator(d.values); });

    this.areadata1.exit()
      .remove();
};
d3_chart2d.prototype.add_areadata1 = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var areadata1generator = this.areadata1generator;
    var nestdatafiltered = this.data1.nestdatafiltered

    this.areadata1 = this.svgg.selectAll(".area")
        .data(nestdatafiltered);

    this.areadata1enter = this.areadata1.enter()
        .append("g")
        .attr("class", "area");

    this.areadata1enter.append('path')
        .attr('class', id+'areaseries')
        .attr('id', function (d,i) {
            return id+'areaseries'+i.toString();})
        .attr("d", function(d) { 
          return areadata1generator(d.values); 
          })
        .style("fill", function(d) {
          return colorscale(d.key);
          });

    this.areadata1.select("path."+id+'areaseries')
        .style("fill", function(d) { return colorscale(d.key); })
        .transition()
        .attr("d", function(d) { return areadata1generator(d.values); });

    this.areadata1.exit()
      .remove();
};
d3_chart2d.prototype.add_areadata1tooltipandstroke = function () {
    // add tooltip and change in stroke color on mouseover
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            return ("series_label" + ": " + d.key);
            })
        .style({
           'area-height': '1',
           'font-weight': 'bold',
           'padding': '12px',
           'background': 'rgba(0, 0, 0, 0.8)',
           'color': '#fff',
           'border-radius': '2px'
        });
    //this.set_d3tooltipstyle(); //not functional
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.areadata1enter.on('mouseover', function (d, i) {
        d3.select(this)
            .style("stroke", 'black');
        tip.show(d);
    })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", colorscale(d.key));
            tip.hide(d);
        });
};
d3_chart2d.prototype.add_areadata1filter = function () {
    //filter data on click

    var _this = this;
    var series_label = this.data1keymap.serieslabel;
    
    this.areadata1enter.on("click", function (d, i) {
        var filters = [];
        _this.data1.filters[series_label].forEach(function (n) { if (n !== d.key) { filters.push(n); }; });
        _this.data1.filters[series_label] = filters;
        _this.data1.filter_listdata();
        if (_this.filterdata1and2){
            _this.data2.filters[series_label] = filters;
            _this.data2.filter_listdata();
        };
        _this.render();
    });
};
d3_chart2d.prototype.add_areadata1text = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //get the minimum y values
    var frequency = this.data1.get_uniquevaluesFromlistdatafiltered(y_data);
    var y0 = Math.min.apply(Math, frequency);

    this.areadata1enter.append('text')
        .attr("x", -6)
        .attr("dy", ".35em");

    this.areadata1.select("text")
        .datum(function (d) {
            return {key: d.key,values: d.values[d.values.length - 1]};
        })
        .attr("transform", function (d) {
            return "translate(" + x1scale(d.values[x_data]) + "," + y1scale(y0 + d.values[y_data] / 2) + ")";
        })
        .text(function (d) {return d.key;});

    this.areadata1.exit()
      .remove();
};
d3_chart2d.prototype.add_stackedareadata1text = function () {
    //add area plots to chart
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    this.areadata1enter.append('text')
        .attr("x", -6)
        .attr("dy", ".35em");

    this.areadata1.select("text")
        .datum(function (d) {
            return {key: d.key,values: d.values[d.values.length - 1]};
        })
        .attr("transform", function (d) {
            return "translate(" + x1scale(d.values[x_data]) + "," + y1scale(d.values.y0 + d.values[y_data] / 2) + ")";
        })
        .text(function (d) {return d.key;});

    this.areadata1.exit()
      .remove();
};