"use strict";
d3_chart2d.prototype.set_x1x2domain_verticalbarschart = function () {
    // set x1-domain and x1-domain for a barchart
    var series_label = this.data1keymap.serieslabel;
    var nestdatafiltered = this.data1.nestdatafiltered;
    var listdatafiltered = this.data1.listdatafiltered;
    this.x1scale.domain(nestdatafiltered.map(function (d) { return d.key; }));
    var x1scale = this.x1scale;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);
    this.x2scale.domain(series_labels_unique).rangeRoundBands([0,x1scale.rangeBand()]);
};
d3_chart2d.prototype.add_verticalbarsdata1 = function () {
    //add vertical bars to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

//    // Not needed
//     if (this.data1.nestdatafiltered.length===0){
//         return;
//         };

    this.barlabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered)

    this.barlabel.exit().remove();

    this.barlabel.transition()
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + ",0)"; 
            });

    this.barlabelenter = this.barlabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + ",0)"; 
            });

    this.barsrect = this.barlabel.selectAll(".bars")
        .data(function (d) { 
            return d.values; }
            );

    this.barsrect.exit().remove();

    this.barsrect.transition()
        .attr("width", x2scale.rangeBand())
        .attr("x", function (d) { 
            return x2scale(d[series_label]); 
            })
        .attr("y", function (d) { return y1scale(Math.max(d[y_data], 0)); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .style("fill", function (d) { return colorscale(d[series_label]); });
      
    this.barsrectenter = this.barsrect.enter()
        .append("rect")
        .attr("class", "bars");

    this.barsrectenter.attr("width", x2scale.rangeBand())
        .attr("x", function (d) {
            return x2scale(d[series_label]); })
        .attr("y", function (d) {
            return y1scale(Math.max(d[y_data], 0)); })
        .attr("height", function (d) {
            return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .style("fill", function (d) {
            return colorscale(d[series_label]); });

};
d3_chart2d.prototype.add_verticalbarsdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the bar
    //add a change in color upon moving the mouse over the bar
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var metid = this.data1keymap.featureslabel;

    if (typeof(this.data1keymap.tooltipdata)!=="undefined"){
        var tooltipdata = this.data1keymap.tooltipdata;
    } else {
        var tooltipdata = this.data1keymap.ydata;
    };

    if (typeof(this.data1keymap.tooltiplabel)!=="undefined"){
        var tooltiplabel = this.data1keymap.tooltiplabel;
    } else {
        var tooltiplabel = this.data1keymap.serieslabel;
    };
    
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                if (!isNaN(d[tooltipdata]) && d[tooltipdata].toString().indexOf('.') != -1){
                    var tooltipdat = d[tooltipdata].toFixed(2);
                } else {
                    var tooltipdat = d[tooltipdata];
                }
                return (d[tooltiplabel] + ': ' + "value: " + tooltipdat);
            }
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                if (!isNaN(value) && value.toString().indexOf('.') != -1){
                    var tooltipdat = d[tooltipdata].toFixed(2);
                } else {
                    var tooltipdat = d[tooltipdata];
                }
                return (d[tooltiplabel] + ': ' + "value: " + tooltipdat);
            }
            else{
                return (d[tooltiplabel] + ': ' + "value: " + d[tooltipdata].toFixed(2) + ', ' + "95% ci: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
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
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    this.barsrectenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
        });
};
d3_chart2d.prototype.add_verticalbarsdata1errorbars = function () {
    //add vertical error bars to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    if (typeof(this.data1keymap.ydatalb)!=="undefined" && this.data1keymap.ydatalb!==null){var y_data_lb = this.data1keymap.ydatalb;}
    else{return;}
    if (typeof(this.data1keymap.ydataub)!=="undefined" && this.data1keymap.ydataub!==null){var y_data_ub = this.data1keymap.ydataub;}
    else{return;}
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //upperbounds: the horizontal lines representing the uppoer bounds of the confidence intervals.
    this.barsublines = this.barlabel.selectAll(".ublines")
        .data(function (d) { return d.values; });

    this.barsublines.exit().remove();

    this.barsublines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.barsublinesenter = this.barsublines.enter()
        .append("line")
        .attr("class", "ublines");

    this.barsublinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
        
    //lowerbound: the horizontal lines representing the lowerbound of the confidence intervals.
    this.barslblines = this.barlabel.selectAll(".lblines")
        .data(function (d) { return d.values; });

    this.barslblines.exit().remove();

    this.barslblines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
      
    this.barslblinesenter = this.barslblines.enter()
        .append("line")
        .attr("class", "lblines");

    this.barslblinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
        
    //connector: the vertical line connecting the confidence intervals.
    this.barslbubconnector = this.barlabel.selectAll(".lbubconnector")
        .data(function (d) { return d.values; });

    this.barslbubconnector.exit().remove();

    this.barslbubconnector.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });
      
    this.barslbubconnectorenter = this.barslbubconnector.enter()
        .append("line")
        .attr("class", "lbubconnector");

    this.barslbubconnectorenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black")
        .style("stroke-width", function (d) {
            if (d[y_data] == 0.0) { return 0; 
            } else { return 1; } 
        });

};
d3_chart2d.prototype.set_x1andy1axestickstyle_verticalbarschart = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' g.tick text';
    var y1axisselector = '#' + this.id + 'y1axis' + ' g.tick text';
    var x1axisstyle = {
        'font-size': '12px',
        'text-anchor': 'end',
        '-ms-transform': 'rotate(-90deg)', /* IE 9 */
        '-webkit-transform': 'rotate(-90deg)', /* Chrome, Safari, Opera */
        'transform': 'rotate(-90deg)',
    };
    var y1axisstyle = {
        'font-size': '12px',
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     { 'selection': y1axisselector, 'style': y1axisstyle }]
    this.set_svggcss(selectorstyle);
};
d3_chart2d.prototype.set_x1andy1axesstyle_verticalbarschart = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var y1axisselector = '#' + this.id + 'y1axis' + ' path';
    var x1axisstyle = {
        'fill': 'none', 'display':'none'
    };
    var y1axisstyle = {
        'fill': 'none', 'stroke': '#000',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1.5px'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     { 'selection': y1axisselector, 'style': y1axisstyle }]
    this.set_svggcss(selectorstyle);
};