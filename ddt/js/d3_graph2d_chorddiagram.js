"use strict";
/*
Chord Diagram
for e.g. visualization of genomic data
example input data format: (e.g., pairwise correlation table)
year	xdatalabel	ydatalabel	xdata	ydata
1870	Belgium	France	44.42	54.61
1870	Belgium	Germany	23.26	26.5
*/
d3_graph2d.prototype.set_chord = function(padding_I=0.5,sortSubgroups_I='desc'){
    /*Set the chord attribute
    INPUT:
    padding_I = float, default=0.5
    sortSubgroups_I = string, 'desc' or 'asc', default='desc'
    */

    
    if (sortSubgroups_I==='desc'){
        this.chord = d3.layout.chord()
            .padding(padding_I)
            .sortSubgroups_I(d3.descending);
    } else if (sortSubgroups_I==='asc'){
        this.chord = d3.layout.chord()
            .padding(padding_I)
            .sortSubgroups_I(d3.ascending);
    };
};
d3_graph2d.prototype.set_chordmatrix = function(){
    /*Set the chordmatrix
    */

    var chord = this.chord;
    var x_data_label = this.data1keymap.xdatalabel;
    var y_data_label = this.data1keymap.ydatalabel;
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var listdatafiltered = this.data1.listdatafiltered;

    this.chordmatrix = matrix = chordMatrix()
        .layout(chord)
        .filter(function (item, r, c) {
        return (item[x_data_label] === r.name && item[y_data_label] === c.name) ||
               (item[x_data_label] === c.name && item[y_data_label] === r.name);
        })
        .reduce(function (items, r, c) {
        var value;
        if (!items[0]) {
          value = 0;
        } else {
          value = items.reduce(function (m, n) {
            if (r === c) {
              return m + (n[x_data] + n[y_data]);
            } else {
              return m + (n[x_data_label] === r.name ? n[x_data]: n[y_data]);
            }
          }, 0);
        }
        return {value: value, data: items};
        });

   this.chordmatrix.data(listdatafiltered)
        .resetKeys()
        .addKeys(['x_data_label', 'y_data_label'])
        .update();
};
d3_graph2d.prototype.set_chordpath = function(innerradius_I){
    /*Set the chordpath
    INPUT:
    innerradius_I = float
    */

    this.chordpath = d3.svg.chord()
        .radius(innerradius_I);
};
d3_graph2d.prototype.add_chordgroupsdata1 = function(){
    /*Add the chordgroups
    INPUT:
    */
    var matrix = this.chordmatrix;
    var x_data_label = this.data1keymap.xdatalabel;
    var y_data_label = this.data1keymap.ydatalabel;
    var colors = this.colorscale;

    function groupClick(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        resetChords();
        };

    function dimChords(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        container.selectAll("path.chord").style("opacity", function (p) {
            if (d.source) { // COMPARE CHORD IDS
                return (p._id === d._id) ? 0.9: 0.1;
            } else { // COMPARE GROUP IDS
                return (p.source._id === d._id || p.target._id === d._id) ? 0.9: 0.1;
            }
        });
        };

    function resetChords() {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        container.selectAll("path.chord").style("opacity",0.9);
    }

    this.chordgroupsdata1 = this.svgg.selectAll(".group")
        .data(matrix.groups());

    this.chordgroupsdata1enter = groups.enter()
        .append("g")
        .attr("class", "group");

    chordgroupsdata1enter.append("path")
        .style("pointer-events", "none")
        .style("fill", function (d) { return colors(d._id); })
        .attr("d", arc);

    chordgroupsdata1enter.append("text")
        .attr("dy", ".35em")
        .on("click", groupClick)
        .on("mouseover", dimChords)
        .on("mouseout", resetChords)
        .text(function (d) {
        return d._id;
        });

    this.chordgroupsdata1.select("path")
        .transition().duration(2000)
        .attrTween("d", matrix.groupTween(arc));

    this.chordgroupsdata1.select("text")
        .transition()
        .duration(2000)
        .attr("transform", function (d) {
            d.angle = (d.startAngle + d.endAngle) / 2;
            var r = "rotate(" + (d.angle * 180 / Math.PI - 90) + ")";
            var t = " translate(" + (innerRadius + 26) + ")";
            return r + t + (d.angle > Math.PI ? " rotate(180)" : " rotate(0)"); 
        })
        .attr("text-anchor", function (d) {
            return d.angle > Math.PI ? "end" : "begin";
        });

    this.chordgroupsdata1.exit().select("text").attr("fill", "orange");
    this.chordgroupsdata1.exit().select("path").remove();

    this.chordgroupsdata1.exit().transition().duration(1000)
        .style("opacity", 0).remove();
};
d3_graph2d.prototype.add_chordsdata1 = function(){
    /*
    */

    var matrix = this.chordmatrix;
    var path = this.chordpath;
    var x_data_label = this.data1keymap.xdatalabel;
    var y_data_label = this.data1keymap.ydatalabel;

    function hideTooltip() {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        //TODO:
        d3.select("#tooltip").style("opacity", 0);
        resetChords();
    };

    function dimChords(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        container.selectAll("path.chord").style("opacity", function (p) {
            if (d.source) { // COMPARE CHORD IDS
                return (p._id === d._id) ? 0.9: 0.1;
            } else { // COMPARE GROUP IDS
                return (p.source._id === d._id || p.target._id === d._id) ? 0.9: 0.1;
            }
        });
        };

    function resetChords() {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        container.selectAll("path.chord").style("opacity",0.9);
    }
    function chordMouseover(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        dimChords(d);
        //TODO:
        d3.select("#tooltip").style("opacity", 1);
        //TODO:
        //$scope.updateTooltip(matrix.read(d));
    }

    this.chordsdata1 = container.selectAll("path.chord")
        .data(matrix.chords(), function (d) { return d._id; });

    this.chordsdata1enter = chordsdata1.enter().append("path")
        .attr("class", "chord")
        .style("fill", function (d) {
          return colors(d.source._id);
        })
        .attr("d", path)
        .on("mouseover", chordMouseover)
        .on("mouseout", hideTooltip);

    this.chordsdata1.transition().duration(2000)
        .attrTween("d", matrix.chordTween(path));

    this.chordsdata1.exit().remove()
};
d3_graph2d.prototype.add_chordsdata1tooltip = function () {
    /*add a tooltip
    */

    var colorscale = this.colorscale;
    var series_label = this.data1keymap.serieslabel;
    var feature_label = this.data1keymap.featureslabel;
    
    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var id = this.id;

    if (typeof(this.data1keymap.tooltipdata)!=="undefined"){
        var y_data = this.data1keymap.tooltipdata;
    } else {
        var y_data = this.data1keymap.ydata;
    };

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
    this.svgg.call(this.tooltip);
    var tip = this.tooltip;

    //show tooltip
    this.chordsdata1enter
        .on("mouseover", function (d) {
            //Change fill color
            d3.select(this).style('fill', 'red');
            //Show the tooltip
            tip.show(d);
            })  
        .on("mouseout", function (d) {
            d3.select(this).style("fill", colorscale(d[series_label]));
            tip.hide(d);
        });
};



var chordMatrix = function () {
    /*
    adapted from
    https://github.com/sghall/chord-transitions/blob/master/js/matrixFactory.js
    */

    var _matrix = [], dataStore = [], _id = 0;
    var matrixIndex = [], indexHash = {};
    var chordLayout, layoutCache;

    var filter = function () {};
    var reduce = function () {};

    var matrix = {};

    matrix.update = function () {
      _matrix = [], objs = [], entry = {};

      layoutCache = {groups: {}, chords: {}};

      this.groups().forEach(function (group) {
        layoutCache.groups[group._id] = {
          startAngle: group.startAngle,
          endAngle: group.endAngle
        };
      });

      this.chords().forEach(function (chord) {
        layoutCache.chords[chordID(chord)] = {
          source: {
            _id: chord.source._id,
            startAngle: chord.source.startAngle,
            endAngle: chord.source.endAngle
          },
          target: {
            _id: chord.target._id,
            startAngle: chord.target.startAngle,
            endAngle: chord.target.endAngle
          }
        };
      });

      matrixIndex = Object.keys(indexHash);

      for (var i = 0; i < matrixIndex.length; i++) {
        if (!_matrix[i]) {
          _matrix[i] = [];
        }
        for (var j = 0; j < matrixIndex.length; j++) {
          objs = dataStore.filter(function (obj) {
            return filter(obj, indexHash[matrixIndex[i]], indexHash[matrixIndex[j]]);
          });
          entry = reduce(objs, indexHash[matrixIndex[i]], indexHash[matrixIndex[j]]);
          entry.valueOf = function () { return +this.value };
          _matrix[i][j] = entry;
        }
      }
      chordLayout.matrix(_matrix);
      return _matrix;
    };

    matrix.data = function (data) {
      dataStore = data;
      return this;
    };

    matrix.filter = function (func) {
      filter = func;
      return this;
    };

    matrix.reduce = function (func) {
      reduce = func;
      return this;
    };

    matrix.layout = function (d3_chordLayout) {
      chordLayout = d3_chordLayout;
      return this;
    };

    matrix.groups = function () {
      return chordLayout.groups().map(function (group) {
        group._id = matrixIndex[group.index];
        return group;
      });
    };

    matrix.chords = function () {
      return chordLayout.chords().map(function (chord) {
        chord._id = chordID(chord);
        chord.source._id = matrixIndex[chord.source.index];
        chord.target._id = matrixIndex[chord.target.index];
        return chord;
      });
    };

    matrix.addKey = function (key, data) {
      if (!indexHash[key]) {
        indexHash[key] = {name: key, data: data || {}};
      }
    };

    matrix.addKeys = function (props, fun) {
      for (var i = 0; i < dataStore.length; i++) {
        for (var j = 0; j < props.length; j++) {
          this.addKey(dataStore[i][props[j]], fun ? fun(dataStore[i], props[j]):{});
        }
      }
      return this;
    };

    matrix.resetKeys = function () {
      indexHash = {};
      return this;
    };

    function chordID(d) {
      var s = matrixIndex[d.source.index];
      var t = matrixIndex[d.target.index];
      return (s < t) ? s + "__" + t: t + "__" + s;
    }

    matrix.groupTween = function (d3_arc) {
      return function (d, i) {
        var tween; 
        var cached = layoutCache.groups[d._id];

        if (cached) {
          tween = d3.interpolateObject(cached, d);
        } else {
          tween = d3.interpolateObject({
            startAngle:d.startAngle,
            endAngle:d.startAngle
          }, d);
        }

        return function (t) {
          return d3_arc(tween(t));
        };
      };
    };

    matrix.chordTween = function (d3_path) {
      return function (d, i) {
        var tween, groups;
        var cached = layoutCache.chords[d._id];

        if (cached) {
          if (d.source._id !== cached.source._id){
            cached = {source: cached.target, target: cached.source};
          }
          tween = d3.interpolateObject(cached, d);
        } else {
          if (layoutCache.groups) {
            groups = [];
            for (var key in layoutCache.groups) {
              cached = layoutCache.groups[key];
              if (cached._id === d.source._id || cached._id === d.target._id) {
                groups.push(cached);
              }
            }
            if (groups.length > 0) {
              cached = {source: groups[0], target: groups[1] || groups[0]};
              if (d.source._id !== cached.source._id) {
                cached = {source: cached.target, target: cached.source};
              }
            } else {
              cached = d;
            }
          } else {
            cached = d;
          }

          tween = d3.interpolateObject({
            source: { 
              startAngle: cached.source.startAngle,
              endAngle: cached.source.startAngle
            },
            target: { 
              startAngle: cached.target.startAngle,
              endAngle: cached.target.startAngle
            }
          }, d);
        }

        return function (t) {
          return d3_path(tween(t));
        };
      };
    };

    matrix.read = function (d) {
      var g, m = {};

      if (d.source) {
        m.sname  = d.source._id;
        m.sdata  = d.source.value;
        m.svalue = +d.source.value;
        m.stotal = _matrix[d.source.index].reduce(function (k, n) { return k + n; }, 0);
        m.tname  = d.target._id;
        m.tdata  = d.target.value;
        m.tvalue = +d.target.value;
        m.ttotal = _matrix[d.target.index].reduce(function (k, n) { return k + n; }, 0);
      } else {
        g = indexHash[d._id];
        m.gname  = g.name;
        m.gdata  = g.data;
        m.gvalue = d.value;
      }
      m.mtotal = _matrix.reduce(function (m1, n1) { 
        return m1 + n1.reduce(function (m2, n2) { return m2 + n2; }, 0);
      }, 0);
      return m;
    };

    return matrix;
  };
