"use strict";
// TODO: transition from pie to pie
// http://jsfiddle.net/amitaviv99/x6RWs/42/
d3_chart2d.prototype.set_arc = function(outerradius_I,innerradius_I){
    //set the pie arc outer and inner radii
    //INPUT:
    //outerradius_I = float, outer radius
    //innerradius_I = float, inner radius (set to >0 to make a donut chart)
    //TODO:
    //scale radius?

    var y1scale = this.y1scale;

    var top = this.margin.top;
    if (typeof(outerradius_I)!=="undefined"){
        var outerradius = outerradius_I;
    } else {
        var outerradius = this.radius-top;
    };
    if (typeof(innterradius_I)!=="undefined"){
        var innerradius = innerradius_I;
    } else {
        var innerradius = outerradius/4.0;
    };

    this.arc = d3.svg.arc()
        .outerRadius(outerradius)
        .innerRadius(innerradius);
//         .startAngle(function(d){return y1scale(d[0]);})
//         .endAngle(function(d){return y1scale(d[1]);}); 
};
d3_chart2d.prototype.set_arclabel = function(outerradiuslabel_I,innerradiuslabel_I){
    //set the pie arc outer and inner label radii
    //INPUT:
    //outerradiuslabel_I = float, outer radius
    //innerradiuslabel_I = float, inner radius
    if (typeof(outerradiuslabel_I)!=="undefined"){
        var outerradiuslabel = outerradiuslabel_I;
    } else {
        var outerradiuslabel = this.radius-40.0;
    };
    if (typeof(innterradiuslabel_I)!=="undefined"){
        var innerradiuslabel = innerradiuslabel_I;
    } else {
        var innerradiuslabel = this.radius-40.0;
    };
    this.arclabel = d3.svg.arc()
        .outerRadius(outerradiuslabel)
        .innerRadius(innerradiuslabel);
};
d3_chart2d.prototype.set_piedata1 = function (sort_I){
    //set the pie svg element function
    //INPUT:
    //sort_I = true, to sort descending values
    //         null, to not sort
    if (typeof(sort_I)!=="undefined"){
        var sort = sort_I;
    } else {
        var sort = null;
    };
    var y_data = this.data1keymap.ydata;
    this.pie = d3.layout.pie()
        .sort(sort)
        //.sort(function(a, b) { return b[y_data] - a[y_data]; })
        .value(function(d){return +d[y_data];});
};
d3_chart2d.prototype.set_x1x2domain_verticalpieschart = function () {
    // set x1-domain and x1-domain for a piechart
    var series_label = this.data1keymap.serieslabel;
    var nestdatafiltered = this.data1.nestdatafiltered;
    var listdatafiltered = this.data1.listdatafiltered;
    this.x1scale.domain(nestdatafiltered.map(function (d) { return d.key; }));
    var x1scale = this.x1scale;
    var series_labels_unique = this.get_uniquelabels(listdatafiltered,series_label);
    this.x2scale.domain(series_labels_unique).rangeRoundBands([0,x1scale.rangeBand()]);
};
d3_chart2d.prototype.add_verticalpiesdata1 = function () {
    //add pies to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var pie = this.pie;
    var arc = this.arc;
    var arclabel = this.arclabel;
    var id = this.id;
    var radius = this.radius;
    var top = this.margin.top;

    this.pielabel = this.svgg.selectAll(".labels")
        .data(this.data1.nestdatafiltered)

    this.pielabel.exit().remove();

    this.pielabel.transition()
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + "," + (radius+top)+")"; 
            });

    this.pielabelenter = this.pielabel.enter().append("g")
        .attr("class", "labels")
        .attr("transform", function (d) { 
            return "translate(" + x1scale(d.key) + "," + (radius+top)+")"; 
            });

    this.piesarc = this.pielabel.selectAll(".pies")
        .data(function (d) { 
            return pie(d.values); }
            );

    this.piesarc.exit().remove();

    this.piesarc.transition()
//         .attr("x", function (d) { 
//             return x2scale(d[series_label]); 
//             })
//         .attr("y", function (d) { return y1scale(Math.max(d[y_data], 0)); })
//         .attr("width", x2scale.rangeBand())
//         .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .attr("d",arc)
        .style("fill", function (d) { return colorscale(d.data[series_label]); });
      
    this.piesarcenter = this.piesarc.enter()
        .append("path")
        .attr("class", "pies");

    this.piesarcenter
        .attr("x", function (d) {
            return x2scale(d.data[series_label]); 
            })
//         .attr("y", function (d) { return y1scale(Math.max(d.data[y_data], 0)); })
//         .attr("width", x2scale.rangeBand())
//         .attr("height", function (d) { return Math.abs(y1scale(d[y_data]) - y1scale(0)); })
        .attr("d",arc)
        .style("fill", function (d) { return colorscale(d.data[series_label]); });

};
d3_chart2d.prototype.add_verticalpiesdata1labels = function () {
    //add pies to the chart

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var series_label = this.data1keymap.serieslabel;
    var x1scale = this.x1scale;
    var x2scale = this.x2scale;
    var y1scale = this.y1scale;
    var colorscale = this.colorscale;
    var arc = this.arc;
    var arclabel = this.arclabel;
    var id = this.id;

    // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    };

    this.piesarclabel = this.piesarc.enter()
        .append("text")
        .attr("transform", function(d) { return "translate(" + arclabel.centroid(d) + ")rotate(" + angle(d) + ")"; })
        .text(function(d){return d.data[series_label]});

};
d3_chart2d.prototype.add_verticalpiesdata1tooltipandfill = function () {
    //add a tooltip upon moving the mouse over the pie
    //add a change in color upon moving the mouse over the pie
    //NOTE: both must be within the same "on" method
    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var metid = this.data1keymap.featureslabel;
    var y_data = this.data1keymap.ydata;
    var y_data_lb = this.data1keymap.ydatalb;
    var y_data_ub = this.data1keymap.ydataub;
    var id = this.id;

    if (typeof(this.data1keymap.tooltipdata)!=="undefined"){
        var y_data = this.data1keymap.tooltipdata;
    } else {
        var y_data = this.data1keymap.ydata;
    };

    // set the tooltip
    this.tooltip = d3.tip().attr('class', 'd3-tip')
        .html(function(d){
            if(typeof(y_data_lb)==="undefined" || typeof(y_data_ub)==="undefined" || y_data_lb===null || y_data_ub===null){
                return (d.data[series_label] + ': ' + "value: " + d.data[y_data].toFixed(2));
            }
            else{
                return (d.data[series_label] + ': ' + "value: " + d.data[y_data].toFixed(2) + ', ' + "95% ci: " + d.data[y_data_lb].toFixed(2) + "/" + d.data[y_data_ub].toFixed(2));
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

    this.piesarcenter.on("mouseover", function (d) {
            //change color of the pie
            d3.select(this).style('fill', 'black');
            //show the tooltip
            tip.show(d);
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d.data[series_label]));
            tip.hide(d);
        });
};
d3_chart2d.prototype.set_x1axisstyle_verticalpieschart = function () {
    // predefined css style for x1 and y1 axis
    var x1axisselector = '#' + this.id + 'x1axis' + ' path';
    var x1axisstyle = {
        'fill': 'none', 'display':'none'
    };
    var selectorstyle = [{ 'selection': x1axisselector, 'style': x1axisstyle },
                     ]
    this.set_svggcss(selectorstyle);
};