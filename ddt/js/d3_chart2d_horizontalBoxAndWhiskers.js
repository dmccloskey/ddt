"use strict";
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1 = function () {
    //add box and whiskers to the plot
//     boxes: the main body of the boxplot showing the quartiles and the medians confidence intervals if enabled.
//     medians: horizonal lines at the median of each box.
//     whiskers: the vertical lines extending to the most extreme, n-outlier data points.
//     caps: the horizontal lines at the ends of the whiskers.
//     fliers: points representing data that extend beyond the whiskers (outliers).
//     means: points or lines representing the means.

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var zoom = this.zoom;
    var this_ = this;

    //assign the positioning of the feature labels
    this.horizontalBoxAndWhiskerslabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered);

    this.horizontalBoxAndWhiskerslabel.transition()
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate("+ "0," + y1scale(d.key) + ")"; });

    this.horizontalBoxAndWhiskerslabel.exit().remove();

    this.horizontalBoxAndWhiskerslabelenter = this.horizontalBoxAndWhiskerslabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { return "translate("+ "0," + y1scale(d.key) + ")"; });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_box = function (){
    // add box for the quartiles to box and whiskers plot

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;

    //boxes: the main body of the boxplot showing the quartiles
    this.horizontalBoxAndWhiskersboxes = this.horizontalBoxAndWhiskerslabel.selectAll(".boxes")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersboxes.exit().remove();

    this.horizontalBoxAndWhiskersboxes.transition()
        .attr("height", y2scale.rangeBand())
        .attr("y", function (d) { return y2scale(d[series_label]); })
        .attr("x", function (d) {
            return x1scale(this_.data1.checkAndConvert_DateType(x_data_iq1,d[x_data_iq1]));
            })
        .attr("width", function (d) { return Math.abs(x1scale(this_.data1.checkAndConvert_DateType(x_data_iq3,d[x_data_iq3]))-x1scale(this_.data1.checkAndConvert_DateType(x_data_iq1,d[x_data_iq1]))); })
        .style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
      
    this.horizontalBoxAndWhiskersboxesenter = this.horizontalBoxAndWhiskersboxes.enter()
        .append("rect")
        .attr("class", "boxes");

    this.horizontalBoxAndWhiskersboxesenter
        .attr("height", y2scale.rangeBand())
        .attr("y", function (d) { 
            return y2scale(d[series_label]); 
            })
        .attr("x", function (d) { 
            return x1scale(this_.data1.checkAndConvert_DateType(x_data_iq1,d[x_data_iq1])); 
        })
        .attr("width", function (d) { return Math.abs(x1scale(this_.data1.checkAndConvert_DateType(x_data_iq3,d[x_data_iq3]))-x1scale(this_.data1.checkAndConvert_DateType(x_data_iq1,d[x_data_iq1]))); })
        .style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_median = function (){
    // add lines for the median to box and whiskers plot

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;
        
    //medians: horizonal lines at the median of each box.
    this.horizontalBoxAndWhiskersmedianlines = this.horizontalBoxAndWhiskerslabel.selectAll(".medianlines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersmedianlines.exit().remove();

    this.horizontalBoxAndWhiskersmedianlines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_median,d[x_data_median])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_median,d[x_data_median])); })
        //.style("stroke", "black");
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.horizontalBoxAndWhiskersmedianlinesenter = this.horizontalBoxAndWhiskersmedianlines.enter()
        .append("line")
        .attr("class", "medianlines");

    this.horizontalBoxAndWhiskersmedianlinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_median,d[x_data_median])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_median,d[x_data_median])); })
        //.style("stroke", "black");
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_mean = function (){
    // add lines for the mean to box and whiskers plot

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;
        
    //means: points or lines representing the means.
//     this.horizontalBoxAndWhiskersmeanlines = this.horizontalBoxAndWhiskerslabel.selectAll(".meanlines")
//         .data(function (d) { return d.values; });

//     this.horizontalBoxAndWhiskersmeanlines.exit().remove();

//     this.horizontalBoxAndWhiskersmeanlines.transition()
//         .attr("x1", function (d) { return y2scale(d[series_label]); })
//         .attr("x2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[x_data_mean]); })
//         .attr("y2", function (d) { return y1scale(d[x_data_mean]); })
//         .style("stroke", function (d) { return colorscale(d[series_label]); });
      
//     this.horizontalBoxAndWhiskersmeanlinesenter = this.horizontalBoxAndWhiskersmeanlines.enter()
//         .append("line")
//         .attr("class", "meanlines");

//     this.horizontalBoxAndWhiskersmeanlinesenter
//         .attr("x1", function (d) { return y2scale(d[series_label]); })
//         .attr("x2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
//         .attr("y1", function (d) { return y1scale(d[x_data_mean]); })
//         .attr("y2", function (d) { return y1scale(d[x_data_mean]); })
//         .style("stroke", function (d) { return colorscale(d[series_label]); });

    this.horizontalBoxAndWhiskersmeancircles = this.horizontalBoxAndWhiskerslabel.selectAll(".meancircles")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersmeancircles.exit().remove();

    this.horizontalBoxAndWhiskersmeancircles.transition()
        .attr("r", function (d) { return y2scale.rangeBand()*0.125;})
        .attr("cy", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("cx", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_mean,d[x_data_mean])); })
        .style("stroke", "black")
        .style("fill", function (d) { return colorscale(d[series_label]); });
      
    this.horizontalBoxAndWhiskersmeancirclesenter = this.horizontalBoxAndWhiskersmeancircles.enter()
        .append("circle")
        .attr("class", "meancircles");

    this.horizontalBoxAndWhiskersmeancirclesenter
        .attr("r", function (d) { return y2scale.rangeBand()*0.125;})
        .attr("cy", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("cx", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_mean,d[x_data_mean])); })
        .style("stroke", "black")
        .style("fill", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_caps = function (){
    // add lines for caps to box and whiskers plot

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;

    //caps (max): the horizontal lines at the ends of the whiskers.
    this.horizontalBoxAndWhiskersmaxlines = this.horizontalBoxAndWhiskerslabel.selectAll(".maxlines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersmaxlines.exit().remove();

    this.horizontalBoxAndWhiskersmaxlines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_max,d[x_data_max])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_max,d[x_data_max])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.horizontalBoxAndWhiskersmaxlinesenter = this.horizontalBoxAndWhiskersmaxlines.enter()
        .append("line")
        .attr("class", "maxlines");

    this.horizontalBoxAndWhiskersmaxlinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_max,d[x_data_max])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_max,d[x_data_max])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
        
    //caps (min): the horizontal lines at the ends of the whiskers.
    this.horizontalBoxAndWhiskersminlines = this.horizontalBoxAndWhiskerslabel.selectAll(".minlines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersminlines.exit().remove();

    this.horizontalBoxAndWhiskersminlines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_min,d[x_data_min])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_min,d[x_data_min])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.horizontalBoxAndWhiskersminlinesenter = this.horizontalBoxAndWhiskersminlines.enter()
        .append("line")
        .attr("class", "minlines");

    this.horizontalBoxAndWhiskersminlinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]); })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand(); })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_min,d[x_data_min])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_min,d[x_data_min])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_whiskers = function (){
    // add lines for whiskers to box and whiskers plot

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;

    //whiskers (min): the vertical lines extending from the qurtiles to the most extreme, n-outlier data points.
    this.horizontalBoxAndWhiskerswhiskersminlines = this.horizontalBoxAndWhiskerslabel.selectAll(".whiskersminlines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskerswhiskersminlines.exit().remove();

    this.horizontalBoxAndWhiskerswhiskersminlines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_iq1,d[x_data_iq1])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_min,d[x_data_min])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.horizontalBoxAndWhiskerswhiskersminlinesenter = this.horizontalBoxAndWhiskerswhiskersminlines.enter()
        .append("line")
        .attr("class", "whiskersminlines");

    this.horizontalBoxAndWhiskerswhiskersminlinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_iq1,d[x_data_iq1])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_min,d[x_data_min])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });

    //whiskers (max): the vertical lines extending from the qurtiles to the most extreme, n-outlier data points.
    this.horizontalBoxAndWhiskerswhiskersmaxlines = this.horizontalBoxAndWhiskerslabel.selectAll(".whiskersmaxlines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskerswhiskersmaxlines.exit().remove();

    this.horizontalBoxAndWhiskerswhiskersmaxlines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_iq3,d[x_data_iq3])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_max,d[x_data_max])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
      
    this.horizontalBoxAndWhiskerswhiskersmaxlinesenter = this.horizontalBoxAndWhiskerswhiskersmaxlines.enter()
        .append("line")
        .attr("class", "whiskersmaxlines");

    this.horizontalBoxAndWhiskerswhiskersmaxlinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_iq3,d[x_data_iq3])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_max,d[x_data_max])); })
        .style("stroke", function (d) { return colorscale(d[series_label]); });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_lbub = function (){
    // add lines for lb and ub to box and whiskers plot

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;

    //upperbounds: the horizontal lines representing the uppoer bounds of the confidence intervals.
    this.horizontalBoxAndWhiskersublines = this.horizontalBoxAndWhiskerslabel.selectAll(".ublines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersublines.exit().remove();

    this.horizontalBoxAndWhiskersublines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.25; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.75; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_ub,d[x_data_ub])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_ub,d[x_data_ub])); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.horizontalBoxAndWhiskersublinesenter = this.horizontalBoxAndWhiskersublines.enter()
        .append("line")
        .attr("class", "ublines");

    this.horizontalBoxAndWhiskersublinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.25; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.75; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_ub,d[x_data_ub])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_ub,d[x_data_ub])); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
        
    //lowerbound: the horizontal lines representing the lowerbound of the confidence intervals.
    this.horizontalBoxAndWhiskerslblines = this.horizontalBoxAndWhiskerslabel.selectAll(".lblines")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskerslblines.exit().remove();

    this.horizontalBoxAndWhiskerslblines.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.25; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.75; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_lb,d[x_data_lb])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_lb,d[x_data_lb])); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.horizontalBoxAndWhiskerslblinesenter = this.horizontalBoxAndWhiskerslblines.enter()
        .append("line")
        .attr("class", "lblines");

    this.horizontalBoxAndWhiskerslblinesenter
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.25; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.75; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_lb,d[x_data_lb])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_lb,d[x_data_lb])); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
        
    //connector: the vertical line connecting the confidence intervals.
    this.horizontalBoxAndWhiskerslbubconnector = this.horizontalBoxAndWhiskerslabel.selectAll(".lbubconnector")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskerslbubconnector.exit().remove();

    this.horizontalBoxAndWhiskerslbubconnector.transition()
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_lb,d[x_data_lb])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_ub,d[x_data_ub])); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
      
    this.horizontalBoxAndWhiskerslbubconnectorenter = this.horizontalBoxAndWhiskerslbubconnector.enter()
        .append("line")
        .attr("class", "lbubconnector");

    this.horizontalBoxAndWhiskerslbubconnectorenter
        .attr("y1", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("y2", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("x1", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_lb,d[x_data_lb])); })
        .attr("x2", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data_ub,d[x_data_ub])); })
        //.style("stroke", function (d) { return colorscale(d[series_label]); });
        .style("stroke","black");
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1tooltipandfill_box = function () {
    //add a tooltip upon moving the mouse over the box
    //add a change in color upon moving the mouse over the box
    //NOTE: both must be within the same "on" method

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;

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

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(tooltiplabel)!=="undefined" && typeof(tooltipdata)!=="undefined"){
                return d[tooltiplabel] + ': ' + d[tooltipdata];
            } else {
                return (d[series_label] + ': ' + "median: " + d[x_data_median].toFixed(2) + ', ' + "iq1/3: " + d[x_data_iq1].toFixed(2) + "/" + d[x_data_iq3].toFixed(2) + ', ' + "min/max: " + d[x_data_min].toFixed(2) + "/" + d[x_data_max].toFixed(2));
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

    this.horizontalBoxAndWhiskersboxesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 .text(d[series_label] + ': ' + "median: " + d[x_data_median].toFixed(2) + ', ' + "iq1/3: " + d[x_data_iq1].toFixed(2) + "/" + d[x_data_iq3].toFixed(2) + ', ' + "min/max: " + d[x_data_min].toFixed(2) + "/" + d[x_data_max].toFixed(2));
//             //Show the tooltip
//             d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "none");
            tip.hide(d);
//             d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1tooltipandfill_mean = function () {
    //add a tooltip upon moving the mouse over the box
    //add a change in color upon moving the mouse over the box
    //NOTE: both must be within the same "on" method

    var x_data_mean = this.data1keymap.xdatamean;
    var x_data_lb = this.data1keymap.xdatalb;
    var x_data_ub = this.data1keymap.xdataub;
    var x_data_median = this.data1keymap.xdatamedian;
    var x_data_iq1 = this.data1keymap.xdataiq1;
    var x_data_iq3 = this.data1keymap.xdataiq3;
    var x_data_min = this.data1keymap.xdatamin;
    var x_data_max = this.data1keymap.xdatamax;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var this_ = this;

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(d[x_data_lb])!=="undefined" && typeof(d[x_data_mean])!=="undefined"){
                return (d[series_label] + ': ' + "mean: " + d[x_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[x_data_lb].toFixed(2) + "/" + d[x_data_ub].toFixed(2));
            } else if (typeof(d[x_data_lb])==="undefined"){
                return (d[series_label] + ': ' + "mean: " + d[x_data_mean].toFixed(2));
            } else if (typeof(d[x_data_mean])==="undefined"){
                return (d[series_label] + ': ' + "ci 95%: " + d[x_data_lb].toFixed(2) + "/" + d[x_data_ub].toFixed(2));
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

    this.horizontalBoxAndWhiskersmeancirclesenter.on("mouseover", function (d) {
            //change color of the bar
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
//             //Update the tooltip position and value
//             d3.select("#" + id + "tooltip")
//                 .style("left", (d3.event.pageX + 10) + "px")
//                 .style("top", (d3.event.pageY - 10) + "px")
//                 .select("#" + id + "value")
//                 .text(d[series_label] + ': ' + "mean: " + d[x_data_mean].toFixed(2) + ', ' + "ci 95%: " + d[x_data_lb].toFixed(2) + "/" + d[x_data_ub].toFixed(2));
//             //Show the tooltip
//              d3.select("#" + id + "tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
            //d3.select("#" + id + "tooltip").classed("hidden", true);
        });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData1_points = function () {
    //points properties
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    var radius = 5.0;
    var this_ = this;
        
    //points: circles showing the individual data points of the box and whiskers plot
    this.horizontalBoxAndWhiskersPointsData1 = this.horizontalBoxAndWhiskerslabel.selectAll(".points")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersPointsData1.exit().remove();

    this.horizontalBoxAndWhiskersPointsData1.transition()
        .attr("r", radius)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cy", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("cx", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data,d[x_data])); })
        .style("stroke", "black")
        .style("fill", "none");
      
    this.horizontalBoxAndWhiskersPointsData1enter = this.horizontalBoxAndWhiskersPointsData1.enter()
        .append("circle")
        .attr("class", "points");

    this.horizontalBoxAndWhiskersPointsData1enter
        .attr("r", radius)
        .attr("id", function (d, i) {
            return id + "point" + i.toString(); })
        .attr("cy", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; })
        .attr("cx", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data,d[x_data])); })
        .style("stroke", "black")
        //.style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData2 = function () {
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
    var nestdatafiltered = this.data2.nestdatafiltered;

    //TODO: ensure nest keys of data1/2 are in the same order!

    //assign the positioning of the feature labels
    this.horizontalBoxAndWhiskersData2label = this.svgg.selectAll(".labels")
        .data(nestdatafiltered);

//     this.horizontalBoxAndWhiskersData2label.transition()
//         .attr("class", "labels")
//         .attr("transform", function (d) { return "translate(" + y1scale(d.key) + ",0)"; });

//     this.horizontalBoxAndWhiskersData2label.exit().remove();

//     this.horizontalBoxAndWhiskersData2labelenter = this.horizontalBoxAndWhiskersData2label.enter().append("g")
//         .attr("class", "labels")
//         .attr("transform", function (d) { return "translate(" + y1scale(d.key) + ",0)"; });
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersData2_points = function (radius_I) {
    //points properties
    var x_data = this.data2keymap.xdata;
    var y_data = this.data2keymap.ydata;
    var series_label = this.data2keymap.serieslabel;
    var x1scale = this.x1scale;
    var y2scale = this.y2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var id = this.id;
    if (typeof(radius_I)!=="undefined"){
        var radius = radius_I;
    } else {
        var radius = 5.0;
    };    
    var this_ = this;
        
    //points: circles showing the individual data points of the box and whiskers plot
    this.horizontalBoxAndWhiskersPointsData2 = this.horizontalBoxAndWhiskersData2label.selectAll(".points")
    //this.horizontalBoxAndWhiskersPointsData2 = this.horizontalBoxAndWhiskerslabel.selectAll(".points")
        .data(function (d) { return d.values; });

    this.horizontalBoxAndWhiskersPointsData2.exit().remove();

    this.horizontalBoxAndWhiskersPointsData2.transition()
        .attr("r", radius)
        .attr("id", function (d, i) { return id + "point" + i.toString(); })
        .attr("cy", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; ; })
        .attr("cx", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data,d[x_data])); })
        .style("stroke", "black")
        .style("fill", "none");
      
    this.horizontalBoxAndWhiskersPointsData2enter = this.horizontalBoxAndWhiskersPointsData2.enter()
        .append("circle")
        .attr("class", "points")

    this.horizontalBoxAndWhiskersPointsData2enter
        .attr("r", radius)
        .attr("id", function (d, i) {
            return id + "point" + i.toString(); })
        .attr("cy", function (d) { return y2scale(d[series_label]) + y2scale.rangeBand()*0.5; ; })
        .attr("cx", function (d) { return x1scale(this_.data1.checkAndConvert_DateType(x_data,d[x_data])); })
        .style("stroke", "black")
        //.style("stroke", function (d) { return colorscale(d[series_label]); })
        .style("fill", "none");
};
d3_chart2d.prototype.add_horizontalBoxAndWhiskersPointsData2tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the point
    //add a change in color upon moving the mouse over the point
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data2keymap.serieslabel;
    var feature_label = this.data2keymap.featureslabel;
    
    var y_data = this.data2keymap.ydata;
    var x_data = this.data2keymap.xdata;
    var id = this.id;
    var this_ = this;

    // set the tooltip
    this.horizontalBoxAndWhiskersPointsData2tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if (typeof(d[y_data]) === 'string' && feature_label && typeof(feature_label) !== "undefined"){
                return(d[feature_label] + '\nx: ' + d[y_data] + '; y: ' + d[x_data].toFixed(2));
            } else if (typeof(d[y_data]) !== 'string' && feature_label && typeof(feature_label) !== "undefined"){
                return(d[feature_label] + '\nx: ' + d[y_data].toFixed(2) + '; y: ' + d[x_data].toFixed(2));
            } else if (typeof(d[y_data]) === 'string' && series_label && typeof(series_label) !== "undefined"){
                return(d[series_label] + '\nx: ' + d[y_data] + '; y: ' + d[x_data].toFixed(2));
            } else if (typeof(d[y_data]) !== 'string' && series_label && typeof(series_label) !== "undefined"){
                return(d[series_label] + '\nx: ' + d[y_data].toFixed(2) + '; y: ' + d[x_data].toFixed(2));
            } else if (typeof(d[y_data]) === 'string'){
                return('x: ' + d[y_data] + '; y: ' + d[x_data].toFixed(2));
            } else {
                return ('x: ' + d[y_data].toFixed(2) + '; y: ' + d[x_data].toFixed(2));
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
    this.svgg.call(this.horizontalBoxAndWhiskersPointsData2tooltip);
    var tip = this.horizontalBoxAndWhiskersPointsData2tooltip;

    //show tooltip
    this.horizontalBoxAndWhiskersPointsData2enter
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