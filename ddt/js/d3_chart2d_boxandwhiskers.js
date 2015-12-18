"use strict";
d3_chart2d.prototype.add_boxandwhiskersdata1 = function () {
    //add box and whiskers to the plot
//     boxes: the main body of the boxplot showing the quartiles and the median�s confidence intervals if enabled.
//     medians: horizonal lines at the median of each box.
//     whiskers: the vertical lines extending to the most extreme, n-outlier data points.
//     caps: the horizontal lines at the ends of the whiskers.
//     fliers: points representing data that extend beyond the whiskers (outliers).
//     means: points or lines representing the means.

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var zoom = this.zoom;

    //assign the positioning of the feature labels
    this.boxandwhiskerslabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered);

    this.boxandwhiskerslabel.transition()
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });

    this.boxandwhiskerslabel.exit().remove();

    this.boxandwhiskerslabelenter = this.boxandwhiskerslabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_box = function (){
    // add box for the quartiles to box and whiskers plot

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //boxes: the main body of the boxplot showing the quartiles
    this.boxandwhiskersboxes = this.boxandwhiskerslabel.selectAll(".boxes")
        .data(function (d) { return d.values; });

    this.boxandwhiskersboxes.exit().remove();

    this.boxandwhiskersboxes.transition()
        .attr("width", x2scale.rangeBand())
        .attr("x", function (d) { return x2scale(d[series_label]); })
        .attr("y", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data_iq3])-y1scale(d[y_data_iq1])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
      
    this.boxandwhiskersboxesenter = this.boxandwhiskersboxes.enter()
        .append("rect")
        .attr("class", "boxes");

    this.boxandwhiskersboxesenter.attr("width", x2scale.rangeBand())
        .attr("x", function (d) { return x2scale(d[series_label]); })
        .attr("y", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("height", function (d) { return Math.abs(y1scale(d[y_data_iq3])-y1scale(d[y_data_iq1])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_boxandwhiskersdata1_median = function (){
    // add lines for the median to box and whiskers plot

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
        
    //medians: horizonal lines at the median of each box.
    this.boxandwhiskersmedianlines = this.boxandwhiskerslabel.selectAll(".medianlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersmedianlines.exit().remove();

    this.boxandwhiskersmedianlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_median]); })
        .attr("y2", function (d) { return y1scale(d[y_data_median]); })
        //.style("stroke", "black");
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersmedianlinesenter = this.boxandwhiskersmedianlines.enter()
        .append("line")
        .attr("class", "medianlines");

    this.boxandwhiskersmedianlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_median]); })
        .attr("y2", function (d) { return y1scale(d[y_data_median]); })
        //.style("stroke", "black");
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_mean = function (){
    // add lines for the mean to box and whiskers plot

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
        
    //means: points or lines representing the means.
//     this.boxandwhiskersmeanlines = this.boxandwhiskerslabel.selectAll(".meanlines")
//         .data(function (d) { return d.values; });

//     this.boxandwhiskersmeanlines.exit().remove();

//     this.boxandwhiskersmeanlines.transition()
//         .attr("x1", function (d) { return x2scale(d[series_label]); })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[y_data_mean]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_mean]); })
//         .style("stroke", function (d) { return colorscale(d[series_label]); });
      
//     this.boxandwhiskersmeanlinesenter = this.boxandwhiskersmeanlines.enter()
//         .append("line")
//         .attr("class", "meanlines");

//     this.boxandwhiskersmeanlinesenter
//         .attr("x1", function (d) { return x2scale(d[series_label]); })
//         .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[y_data_mean]); })
//         .attr("y2", function (d) { return y1scale(d[y_data_mean]); })
//         .style("stroke", function (d) { return colorscale(d[series_label]); });

    this.boxandwhiskersmeancircles = this.boxandwhiskerslabel.selectAll(".meancircles")
        .data(function (d) { return d.values; });

    this.boxandwhiskersmeancircles.exit().remove();

    this.boxandwhiskersmeancircles.transition()
        .attr("r", function (d) { return x2scale.rangeBand()*0.125;})
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("cy", function (d) { return y1scale(d[y_data_mean]); })
        .style("stroke", "black")
        .style("fill", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersmeancirclesenter = this.boxandwhiskersmeancircles.enter()
        .append("circle")
        .attr("class", "meancircles");

    this.boxandwhiskersmeancirclesenter
        .attr("r", function (d) { return x2scale.rangeBand()*0.125;})
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("cy", function (d) { return y1scale(d[y_data_mean]); })
        .style("stroke", "black")
        .style("fill", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_caps = function (){
    // add lines for caps to box and whiskers plot

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //caps (max): the horizontal lines at the ends of the whiskers.
    this.boxandwhiskersmaxlines = this.boxandwhiskerslabel.selectAll(".maxlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersmaxlines.exit().remove();

    this.boxandwhiskersmaxlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_max]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersmaxlinesenter = this.boxandwhiskersmaxlines.enter()
        .append("line")
        .attr("class", "maxlines");

    this.boxandwhiskersmaxlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_max]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
        
    //caps (min): the horizontal lines at the ends of the whiskers.
    this.boxandwhiskersminlines = this.boxandwhiskerslabel.selectAll(".minlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersminlines.exit().remove();

    this.boxandwhiskersminlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_min]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskersminlinesenter = this.boxandwhiskersminlines.enter()
        .append("line")
        .attr("class", "minlines");

    this.boxandwhiskersminlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]); })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("y1", function (d) { return y1scale(d[y_data_min]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_whiskers = function (){
    // add lines for whiskers to box and whiskers plot

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //whiskers (min): the vertical lines extending from the qurtiles to the most extreme, n-outlier data points.
    this.boxandwhiskerswhiskersminlines = this.boxandwhiskerslabel.selectAll(".whiskersminlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskerswhiskersminlines.exit().remove();

    this.boxandwhiskerswhiskersminlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq1]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskerswhiskersminlinesenter = this.boxandwhiskerswhiskersminlines.enter()
        .append("line")
        .attr("class", "whiskersminlines");

    this.boxandwhiskerswhiskersminlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq1]); })
        .attr("y2", function (d) { return y1scale(d[y_data_min]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });

    //whiskers (max): the vertical lines extending from the qurtiles to the most extreme, n-outlier data points.
    this.boxandwhiskerswhiskersmaxlines = this.boxandwhiskerslabel.selectAll(".whiskersmaxlines")
        .data(function (d) { return d.values; });

    this.boxandwhiskerswhiskersmaxlines.exit().remove();

    this.boxandwhiskerswhiskersmaxlines.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.boxandwhiskerswhiskersmaxlinesenter = this.boxandwhiskerswhiskersmaxlines.enter()
        .append("line")
        .attr("class", "whiskersmaxlines");

    this.boxandwhiskerswhiskersmaxlinesenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_iq3]); })
        .attr("y2", function (d) { return y1scale(d[y_data_max]); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_lbub = function (){
    // add lines for lb and ub to box and whiskers plot

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //upperbounds: the horizontal lines representing the uppoer bounds of the confidence intervals.
    this.boxandwhiskersublines = this.boxandwhiskerslabel.selectAll(".ublines")
        .data(function (d) { return d.values; });

    this.boxandwhiskersublines.exit().remove();

    this.boxandwhiskersublines.transition()
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.boxandwhiskersublinesenter = this.boxandwhiskersublines.enter()
        .append("line")
        .attr("class", "ublines");

    this.boxandwhiskersublinesenter
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_ub]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
        
    //lowerbound: the horizontal lines representing the lowerbound of the confidence intervals.
    this.boxandwhiskerslblines = this.boxandwhiskerslabel.selectAll(".lblines")
        .data(function (d) { return d.values; });

    this.boxandwhiskerslblines.exit().remove();

    this.boxandwhiskerslblines.transition()
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.boxandwhiskerslblinesenter = this.boxandwhiskerslblines.enter()
        .append("line")
        .attr("class", "lblines");

    this.boxandwhiskerslblinesenter
        //.attr("x1", function (d) { return x2scale(d[series_label]); })
        //.attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand(); })
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.25; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.75; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_lb]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
        
    //connector: the vertical line connecting the confidence intervals.
    this.boxandwhiskerslbubconnector = this.boxandwhiskerslabel.selectAll(".lbubconnector")
        .data(function (d) { return d.values; });

    this.boxandwhiskerslbubconnector.exit().remove();

    this.boxandwhiskerslbubconnector.transition()
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.boxandwhiskerslbubconnectorenter = this.boxandwhiskerslbubconnector.enter()
        .append("line")
        .attr("class", "lbubconnector");

    this.boxandwhiskerslbubconnectorenter
        .attr("x1", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("x2", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; })
        .attr("y1", function (d) { return y1scale(d[y_data_lb]); })
        .attr("y2", function (d) { return y1scale(d[y_data_ub]); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
};
d3_chart2d.prototype.add_boxandwhiskersdata1tooltipandfill_box = function () {
    //add a tooltip upon moving the mouse over the box
    //add a change in color upon moving the mouse over the box
    //NOTE: both must be within the same "on" method

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            return (d[series_label] + ': ' + "median: " + d[y_data_median].toFixed(2) + ', ' + "iq1/3: " + d[y_data_iq1].toFixed(2) + "/" + d[y_data_iq3].toFixed(2) + ', ' + "min/max: " + d[y_data_min].toFixed(2) + "/" + d[y_data_max].toFixed(2));
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

    this.boxandwhiskersboxesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 .text(d[series_label] + ': ' + "median: " + d[y_data_median].toFixed(2) + ', ' + "iq1/3: " + d[y_data_iq1].toFixed(2) + "/" + d[y_data_iq3].toFixed(2) + ', ' + "min/max: " + d[y_data_min].toFixed(2) + "/" + d[y_data_max].toFixed(2));
//             //Show the tooltip
//             d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "none");
            tip.hide(d);
//             d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_boxandwhiskersdata1tooltipandfill_mean = function () {
    //add a tooltip upon moving the mouse over the box
    //add a change in color upon moving the mouse over the box
    //NOTE: both must be within the same "on" method

    var y_data_mean = this.data1keymap.ydatamean;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var y_data_median = this.data1keymap.ydatamedian;
    var y_data_iq1 = this.data1keymap.ydataiq1;
    var y_data_iq3 = this.data1keymap.ydataiq3;
    var y_data_min = this.data1keymap.ydatamin;
    var y_data_max = this.data1keymap.ydatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(d[y_data_lb])!=="undefined" && typeof(d[y_data_mean])!=="undefined"){
                return (d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            } else if (typeof(d[y_data_lb])==="undefined"){
                return (d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2));
            } else if (typeof(d[y_data_mean])==="undefined"){
                return (d[series_label] + ': ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
            } else {
                return d[series_label];
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

    this.boxandwhiskersmeancirclesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 .text(d[series_label] + ': ' + "mean: " + d[y_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[y_data_lb].toFixed(2) + "/" + d[y_data_ub].toFixed(2));
//             //Show the tooltip
//              d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
            //d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_boxandwhiskersdata1_points = function () {
    //points properties
    var y_data = this.data1keymap.ydata;
    var x_data = this.data1keymap.xdata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var radius = 5.0;
        
    //points: circles showing the individual data points of the box and whiskers plot
    this.boxandwhiskerspointsdata1 = this.boxandwhiskerslabel.selectAll(".points")
        .data(function (d) { return d.values; });

    this.boxandwhiskerspointsdata1.exit().remove();

    this.boxandwhiskerspointsdata1.transition()
        .attr("r", radius)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("stroke", "black")
        .style("fill", "none");
      
    this.boxandwhiskerspointsdata1enter = this.boxandwhiskerspointsdata1.enter()
        .append("circle")
        .attr("class", "points");

    this.boxandwhiskerspointsdata1enter
        .attr("r", radius)
        .attr("id", function (d, i) {
            return id + "point" + i.toString(); })
        .attr("cx", function (d) {
            return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) {
            return y1scale(d[y_data]); })
        .style("stroke", "black")
        //.style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_boxandwhiskersdata2 = function () {
    //add box and whiskers to the plot
//     boxes: the main body of the boxplot showing the quartiles and the medians confidence intervals if enabled.
//     medians: horizonal lines at the median of each box.
//     whiskers: the vertical lines extending to the most extreme, n-outlier data points.
//     caps: the horizontal lines at the ends of the whiskers.
//     fliers: points representing data that extend beyond the whiskers (outliers).
//     means: points or lines representing the means.

    var x1scale = this.x1scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;

    //assign the positioning of the feature labels
    this.boxandwhiskersdata2label = this.svgg.selectAll(".labels")
        .data(this.data2.nestdatafiltered);

    this.boxandwhiskersdata2label.transition()
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });

    this.boxandwhiskersdata2label.exit().remove();

    this.boxandwhiskersdata2labelenter = this.boxandwhiskersdata2label.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate(" + x1scale(d.key) + ",0)"; });
};
d3_chart2d.prototype.add_boxandwhiskersdata2_points = function (radius_I) {
    //points properties
    var y_data = this.data2keymap.ydata;
    var x_data = this.data2keymap.xdata;
    var series_label = this.data2keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    if (typeof(radius_I)!=="undefined"){
        var radius = radius_I;
    } else {
        var radius = 5.0;
    };    
        
    //points: circles showing the individual data points of the box and whiskers plot
    this.boxandwhiskerspointsdata2 = this.boxandwhiskersdata2label.selectAll(".points")
        .data(function (d) { return d.values; });

    this.boxandwhiskerspointsdata2.exit().remove();

    this.boxandwhiskerspointsdata2.transition()
        .attr("r", radius)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cx", function (d) { return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) { return y1scale(d[y_data]); })
        .style("stroke", "black")
        .style("fill", "none");
      
    this.boxandwhiskerspointsdata2enter = this.boxandwhiskerspointsdata2.enter()
        .append("circle")
        .attr("class", "points")

    this.boxandwhiskerspointsdata2enter
        .attr("r", radius)
        .attr("id", function (d, i) {
            return id + "point" + i.toString(); })
        .attr("cx", function (d) {
            return x2scale(d[series_label]) + x2scale.rangeBand()*0.5; ; })
        .attr("cy", function (d) {
            return y1scale(d[y_data]); })
        .style("stroke", "black")
        //.style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_boxandwhiskerspointsdata2tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the point
    //add a change in color upon moving the mouse over the point
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data2keymap.serieslabel;
    var feature_label = this.data2keymap.featureslabel;
    
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var id = this.id;

    // set the tooltip
    this.boxandwhiskerspointsdata2tooltip = d3.tip().attr('class', 'd3-tip')
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
    this.svgg.call(this.boxandwhiskerspointsdata2tooltip);
    var tip = this.boxandwhiskerspointsdata2tooltip;

    //show tooltip
    this.boxandwhiskerspointsdata2enter
        .on("mouseover", function (d) {
            //Change fill color
            d3.select(this).style('fill', 'black');
            //Show the tooltip
            tip.show(d);
            })  
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "none");
            tip.hide(d);
            //d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};