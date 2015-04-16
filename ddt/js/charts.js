var make_scatterlineplot2d = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data1.set_listdata(data1, ['sample_name_abbreviation']);
    d3data1.reset_filters();
	var d3data2 = new d3_data();
    d3data2.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data2.set_listdata(data2, ['sample_name_abbreviation']);
    d3data2.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap({'xdata':'ale_time','ydata':'rate','serieslabel':'sample_name_abbreviation','featureslabel':''});
    chart2d1.add_data2(d3data2);
    chart2d1.set_data2keymap({'xdata':'ale_time','ydata':'rate','serieslabel':'sample_name_abbreviation','featureslabel':''});
    chart2d1.set_filterdata1and2(true); //filter data 1 and 2 together
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 50, right: 150, bottom: 50, left: 50 });
    chart2d1.set_width(500);
    chart2d1.set_height(350);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_colorscale(); //color for series_label will remain consistent
    chart2d1.set_zoom();
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.set_x1axiszoom();
        this.set_y1axiszoom();
        this.add_zoom();
        this.copy_x1scalestox2scales();
        this.copy_y1scalestoy2scales();
        //this.set_colorscale(); //color for series_label will change each update
        this.add_pointsdata1();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_pointsdata1tooltipandfill();
        this.set_x1andy1axesstyle();
        this.set_pointsstyle();
        this.add_x1axislabel("time (days)");
        this.add_y1axislabel("growth rate (hr-1)");
        this.add_title("ALE trajectories");
		this.set_linedata2("linear");
		this.add_linedata2();
		this.add_linedata2tooltipandstroke();
		this.add_linedata2filter();
        this.set_linestyle();
    };
    chart2d1.render();
};
var make_volcanoplot2d = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['component_group_name', 'concentration_units']);
    d3data1.set_listdata(data1_scatterplot2d_volcanoplot, ['component_group_name']);
    d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap({'xdata':'fold_change','ydata':'p_value','serieslabel':'sna1_sna2','featureslabel':'component_group_name'});
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 50, right: 50, bottom: 50, left: 50 });
    chart2d1.set_width(750);
    chart2d1.set_height(500);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1x2axis();
        this.set_y1y2axis();
        this.add_x1x2axis();
        this.add_y1y2axis();
        this.add_x1axisgridlines();
        this.add_y1axisgridlines();
        this.set_colorscale();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1featurefilter();
        this.add_data1featureslabels();
        this.set_x1x2andy1y2axesstyle();
        this.set_pointsstyle();
        this.add_x1axislabel("-log 2 fold change");
        this.add_y1axislabel("log 10 p-value");
        this.add_title("Volcano plot");
    };
    chart2d1.data1.change_filters({'concentration_units':['mM_glog_normalized']});
    chart2d1.data1.filter_stringdata();
    chart2d1.render();
};
var make_pcaplot2d = function () {
    //Scores
    var d3data1 = new d3_data();
    d3data1.set_keys(['calculated_concentration_units','sample_name_short', 'sample_name_abbreviation']);
    d3data1.set_listdata(data1_scatterplot2d_pcascores, ['sample_name_abbreviation']);
    d3data1.reset_filters();
    var scores2d1 = new d3_chart2d();
    scores2d1.add_data1(d3data1);
    scores2d1.set_data1keymap({'xdata':'score_1','ydata':'score_2','serieslabel':'sample_name_abbreviation','featureslabel':'sample_name_short'});
    scores2d1.set_id('scores2d1');
    scores2d1.set_tileid('tile1');
    scores2d1.set_margin({ top: 50, right: 150, bottom: 50, left: 50 });
    scores2d1.set_width(750);
    scores2d1.set_height(500);
    scores2d1.add_svgexportbutton2tile();
    scores2d1.set_tooltip();
    scores2d1.set_tooltipstyle();
    scores2d1.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1x2axis();
        this.set_y1y2axis();
        this.add_x1x2axis();
        this.add_y1y2axis();
        this.set_colorscale();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1seriesfilter();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_data1featureslabels();
        this.set_x1x2andy1y2axesstyle();
        this.set_pointsstyle();
        this.add_x1axislabel("PC1 ["+ this.data1.listdatafiltered[0]["var_proportion_1"].toString() + "%]");
        this.add_y1axislabel("PC2 [" +this.data1.listdatafiltered[0]["var_proportion_2"].toString() + "%]");
        this.add_title("Scores");
    };
    scores2d1.data1.change_filters({'calculated_concentration_units':['mM_glog_normalized']});
    scores2d1.data1.filter_stringdata();
    scores2d1.render();
    //make a new tile for the loadings plot
    var tile2 = new d3_tile();
    tile2.set_tileid("tile2");
    tile2.set_rowid("row2");
    tile2.set_colid("col2");
    tile2.set_rowclass("row");
    tile2.set_colclass("col-sm-12");
    tile2.add_tile2container();
    //Loadings
    var d3data2 = new d3_data();
    d3data2.set_keys(['component_group_name', 'calculated_concentration_units','component_name']);
    d3data2.set_listdata(data1_scatterplot2d_pcaloadings, ['component_name']);
    d3data2.reset_filters();
    var loadings2d1 = new d3_chart2d();
    loadings2d1.add_data1(d3data2);
    loadings2d1.set_data1keymap({'xdata':'loadings_1','ydata':'loadings_2','serieslabel':'','featureslabel':'component_name'});
    loadings2d1.set_id('loadings2d2');
    loadings2d1.set_tileid('tile2');
    loadings2d1.set_margin({ top: 50, right: 50, bottom: 50, left: 50 });
    loadings2d1.set_width(750);
    loadings2d1.set_height(500);
    loadings2d1.add_svgexportbutton2tile();
    loadings2d1.set_tooltip();
    loadings2d1.set_tooltipstyle();
    loadings2d1.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("linear");
        this.set_y1range("linear");
        this.set_x1domain();
        this.set_y1domain();
        this.set_x1x2axis();
        this.set_y1y2axis();
        this.add_x1x2axis();
        this.add_y1y2axis();
        this.set_colorscale();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1featurefilter();
        this.add_data1featureslabels();
        this.set_x1x2andy1y2axesstyle();
        this.set_pointsstyle();
        this.add_x1axislabel("PC1");
        this.add_y1axislabel("PC2");
        this.add_title("Loadings");
    };
    loadings2d1.data1.change_filters({'calculated_concentration_units':['mM_glog_normalized']});
    loadings2d1.data1.filter_stringdata();
    loadings2d1.render();
};
var make_varticalbarschart2d = function () {
    //uptake/secretion rates
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name_abbreviation','rate_units', 'met_id']);
    d3data1.set_listdata(data1_barchart, ['met_id']);
    d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap({'xdata':'met_id','ydata':'rate_average',
                'serieslabel':'sample_name_abbreviation','featureslabel':'met_id',
                'ydatalb':'rate_lb','ydataub':'rate_ub'});
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 50, right: 150, bottom: 50, left: 50 });
    chart2d1.set_width(990);
    chart2d1.set_height(500);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_colorscale(); //color for series_label will remain consistent
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("linear");
        this.set_x1x2domain_verticalbarsplot();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_verticalbarsdata1();
        this.add_verticalbarsdata1tooltipandfill();
        this.add_verticalbarsdata1errorbars();
        this.set_x1andy1axesstyle_verticalbarsplot();
        this.add_y1axislabel("rate (mmol*gDCW-1*hr-1)");
        this.add_title("uptake/secretion rates");
    };
    chart2d1.data1.change_filters({'met_id':['glc-D','ac'],
    'sample_name_abbreviation':["OxicEvo04pgiEcoliGlc","OxicEvo04pgiEvo01EPEcoliGlc","OxicEvo04pgiEvo02EPEcoliGlc","OxicEvo04pgiEvo03EPEcoliGlc","OxicEvo04pgiEvo04EPEcoliGlc","OxicEvo04pgiEvo05EPEcoliGlc","OxicEvo04pgiEvo06EPEcoliGlc","OxicEvo04pgiEvo07EPEcoliGlc","OxicEvo04pgiEvo08EPEcoliGlc"]});
    chart2d1.data1.filter_stringdata();
    chart2d1.render();
    //make a new tile
    var tile2 = new d3_tile();
    tile2.set_tileid("tile2");
    tile2.set_rowid("row2");
    tile2.set_colid("col2");
    tile2.set_rowclass("row");
    tile2.set_colclass("col-sm-12");
    tile2.add_tile2container();
    //uptake/secretion rates
    var d3data2 = new d3_data();
    d3data2.set_keys(['sample_name_abbreviation','rate_units', 'met_id']);
    d3data2.set_listdata(data1_barchart, ['met_id']);
    d3data2.reset_filters();
    var chart2d2 = new d3_chart2d();
    chart2d2.add_data1(d3data2);
    chart2d2.set_data1keymap({'xdata':'met_id','ydata':'rate_average',
                'serieslabel':'sample_name_abbreviation','featureslabel':'met_id',
                'ydatalb':'rate_lb','ydataub':'rate_ub'});
    chart2d2.set_id('chart2d2');
    chart2d2.set_tileid('tile2');
    chart2d2.set_margin({ top: 50, right: 150, bottom: 50, left: 50 });
    chart2d2.set_width(990);
    chart2d2.set_height(500);
    chart2d2.add_svgexportbutton2tile();
    chart2d2.set_tooltip();
    chart2d2.set_tooltipstyle();
    chart2d2.set_colorscale(); //color for series_label will remain consistent
    chart2d2.render = function () {
        this.add_chart2d2tile();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("linear");
        this.set_x1x2domain_verticalbarsplot();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_verticalbarsdata1();
        this.add_verticalbarsdata1tooltipandfill();
        this.add_verticalbarsdata1errorbars();
        this.set_x1andy1axesstyle_verticalbarsplot();
        this.add_y1axislabel("rate (hr-1)");
        this.add_title("growth rate");
    };
    chart2d2.data1.change_filters({'met_id':['biomass'],
    'sample_name_abbreviation':["OxicEvo04pgiEcoliGlc","OxicEvo04pgiEvo01EPEcoliGlc","OxicEvo04pgiEvo02EPEcoliGlc","OxicEvo04pgiEvo03EPEcoliGlc","OxicEvo04pgiEvo04EPEcoliGlc","OxicEvo04pgiEvo05EPEcoliGlc","OxicEvo04pgiEvo06EPEcoliGlc","OxicEvo04pgiEvo07EPEcoliGlc","OxicEvo04pgiEvo08EPEcoliGlc"]});
    chart2d2.data1.filter_stringdata();
    chart2d2.render();
};
var make_boxandwhiskersplot = function(){ 
    // sample_name_abbreviation grouped by component_name
    var data1keymap = {'xdata':'','ydata':'mean',
                'serieslabel':'sample_name_abbreviation','featureslabel':'component_name',
                'ydatalb':'ci_lb','ydataub':'ci_ub',
                'ydatamedian':'median','ydataiq1':'iq_1','ydataiq3':'iq_3',
                'ydatamin':'min','ydatamax':'max',
                'ydataoutliers':'outliers'};
    var keys = ['sample_name_abbreviation','calculated_concentration_units',
                'component_name','component_group_name','experiment_id',
                'time_point']
    var d3data1 = new d3_data();
    d3data1.set_keys(keys);
    d3data1.set_listdata(data1_boxandwhiskers, ['component_name']); // sample_name_abbreviation grouped by component_name
    d3data1.reset_filters();
    // add box and whiskers menu tile
    d3.selectAll('#row3').remove();
    var tile3 = new d3_tile();
    tile3.set_tileid("tile3");
    tile3.set_rowid("row3");
    tile3.set_colid("col3");
    tile3.set_rowclass("row");
    tile3.set_colclass("col-sm-12");
    tile3.add_tile2container();
    // add the menu:
    tile3.add_title("filter menu");
    input = d3data1.convert_filter2stringmenuinput();
    tile3.add_textarea(input,100);
    tile3.add_submitbutton({'id':'submit1','text':'submit'});
    tile3.add_submitbutton({'id':'reset1','text':'reset'}); 
    // make the box and whiskers plot visualization  
    d3.selectAll('#row1').remove();
    var tile1 = new d3_tile();
    tile1.set_tileid("tile1");
    tile1.set_rowid("row1");
    tile1.set_colid("col1");
    tile1.set_rowclass("row");
    tile1.set_colclass("col-sm-12");
    tile1.add_tile2container();
    tile1.add_title("custom box and whiskers plot");
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 50, right: 250, bottom: 50, left: 50 });
    chart2d1.set_width(500);
    chart2d1.set_height(250);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_colorscale(); //color for series_label will remain consistent
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.add_clippath();
        this.set_x1range("ordinal-rangeRoundBands");
        this.set_x2range("ordinal");
        this.set_y1range("linear");
        this.set_x1x2domain_verticalbarsplot();
        this.set_y1domain();
        this.set_x1axis();
        this.set_y1axis();
        this.add_x1axis();
        this.add_y1axis();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.add_boxandwhiskersdata1();
        this.add_boxandwhiskersdata1_box();
        this.add_boxandwhiskersdata1_median();
        this.add_boxandwhiskersdata1_caps();
        this.add_boxandwhiskersdata1_whiskers();
        this.add_boxandwhiskersdata1_lbub();
        this.add_boxandwhiskersdata1_mean();
        this.add_boxandwhiskersdata1tooltipandfill_box();
        this.add_boxandwhiskersdata1tooltipandfill_mean();
        this.set_x1andy1axesstyle_verticalbarsplot();
        this.add_y1axislabel("concentration (mM_glog_normalized)");
        this.add_title("metabolites");
        this.set_zoom();
        this.set_x1axiszoom();
        this.set_y1axiszoom();
        this.add_zoom();
        this.set_svgelementzoomcss();
        tile3.update_textarea(this.data1.convert_filter2stringmenuinput());
        this.add_data1filtermenusubmitbutton('tile3','submit1');
        this.add_data1filtermenuresetbutton('tile3','reset1');
    };
//     chart2d1.data1.change_filters({'calculated_concentration_units':['mM_glog_normalized']});
    chart2d1.data1.change_filters({'calculated_concentration_units':['mM_glog_normalized'],
               'component_name':["g6p.g6p_1.Light","icit.icit_2.Light"]});
    chart2d1.data1.filter_stringdata();
    chart2d1.render();
//     // add new tile
//     var tile2 = new d3_tile();
//     tile2.set_tileid("tile2");
//     tile2.set_rowid("row2");
//     tile2.set_colid("col2");
//     tile2.set_rowclass("row");
//     tile2.set_colclass("col-sm-12");
//     tile2.add_tile2container();
//     tile2.add_title("custom box and whiskers plot");
//     // component_name grouped by sample_name_abbreviation
//     var data1keymap = {'xdata':'','ydata':'mean',
//                 'serieslabel':'component_name','featureslabel':'sample_name_abbreviation',
//                 'ydatalb':'ci_lb','ydataub':'ci_ub',
//                 'ydatamedian':'median','ydataiq1':'iq_1','ydataiq3':'iq_3',
//                 'ydatamin':'min','ydatamax':'max',
//                 'ydataoutliers':'outliers'};
// //     var keys = ['sample_name_abbreviation','calculated_concentration_units',
// //                 'component_name','component_group_name','experiment_id',
// //                 'time_point']
// //     var d3data1 = new d3_data();
// //     d3data1.set_keys(keys);
// //     d3data1.set_listdata(data1_boxandwhiskers, ['sample_name_abbreviation']); // mcomponent_name grouped by sample_name_abbreviation
// //     d3data1.reset_filters();
//     var chart2d2 = new d3_chart2d();
//     chart2d2.add_data1(d3data1);
//     chart2d2.data1.change_nestkeys(['sample_name_abbreviation']);
//     chart2d2.set_data1keymap(data1keymap);
//     chart2d2.set_id('chart2d2');
//     chart2d2.set_tileid('tile2');
//     chart2d2.set_margin({ top: 50, right: 250, bottom: 50, left: 50 });
//     chart2d2.set_width(750);
//     chart2d2.set_height(500);
//     chart2d2.add_svgexportbutton2tile();
//     chart2d2.set_tooltip();
//     chart2d2.set_tooltipstyle();
//     chart2d2.set_colorscale(); //color for series_label will remain consistent
//     chart2d2.render = function () {
//         this.add_chart2d2tile();
//         this.set_x1range("ordinal-rangeRoundBands");
//         this.set_x2range("ordinal");
//         this.set_y1range("linear");
//         this.set_x1x2domain_verticalbarsplot();
//         this.set_y1domain();
//         this.set_x1axis();
//         this.set_y1axis();
//         this.add_x1axis();
//         this.add_y1axis();
//         this.add_legenddata1();
//         this.add_legenddata1filter();
//         this.add_boxandwhiskersdata1();
//         this.add_boxandwhiskersdata1_box();
//         this.add_boxandwhiskersdata1_median();
//         this.add_boxandwhiskersdata1_caps();
//         this.add_boxandwhiskersdata1_whiskers();
//         this.add_boxandwhiskersdata1_lbub();
//         this.add_boxandwhiskersdata1_mean();
//         this.add_boxandwhiskersdata1tooltipandfill_box();
//         this.add_boxandwhiskersdata1tooltipandfill_mean();
//         this.set_x1andy1axesstyle_verticalbarsplot();
//         this.add_y1axislabel("concentration (mM_glog_normalized)");
//         this.add_title("metabolites");
//         this.set_zoom();
//         this.set_x1axiszoom();
//         this.set_y1axiszoom();
//         this.add_zoom();
//         this.set_svgelementzoomcss();
//         tile3.update_textarea(this.data1.convert_filter2stringmenuinput());
//         this.add_data1filtermenusubmitbutton('tile3','submit1');
//         this.add_data1filtermenuresetbutton('tile3','reset1');
//     };
//     chart2d2.render();
};
var make_heatmap = function(){
    var data1keymap = {'xdata':'row_leaves','ydata':'col_leaves','zdata':'value',
                'rowslabel':'row_label','columnslabel':'col_label',
                'rowsindex':'row_index','columnsindex':'col_index',
                'rowsleaves':'row_leaves','columnsleaves':'col_leaves'};
    var keys = ['analysis_id','row_label','col_label','row_index','col_index','row_leaves','col_leaves',
                'col_pdist_metric','row_pdist_metric','col_linkage_method','row_linkage_method',
                'value_units']
    var datalist = [{'value':'hclust','text':'by cluster'}, //values are predifined in heatmaporder function
        {'value':'probecontrast','text':'by row and column'},
        {'value':'probe','text':'by row'},
        {'value':'contrast','text':'by column'},
        {'value':'custom','text':'by value'}];
    var d3data1 = new d3_data();
    d3data1.set_keys(keys);
    d3data1.set_listdata(data1_heatmap, ['analysis_id']);
    d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 200, right: 10, bottom: 150, left: 400 });
    chart2d1.set_heatmapdata1(18); //must be done initially to set the height/width correctly
    chart2d1.add_svgexportbutton2tile();
    chart2d1.add_datalist2tile(datalist);
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_zoom();
    chart2d1.data1.change_filters({'value_units':['mM_glog_normalized']});
    chart2d1.data1.filter_stringdata();
    chart2d1.set_colorscale('quantile','heatmap21','min,0,max','value');
    chart2d1.render = function () {
        this.add_chart2d2tile();
        this.set_heatmapdata1(18); //update the heatmap properties
        this.add_heatmapdata1();
        this.add_heatmapdata1animation();
        this.add_heatmapdata1rowlabels();
        this.add_heatmapdata1columnlabels();
        this.add_heatmapdata1legend();
        this.add_heatmapdata1datalist();
        this.add_heatmapdata1tooltipandfill();
        this.set_heatmapdata1css();
    };
    chart2d1.render();
};
var make_circlepacklayout = function(){
    var data1keymap = {};
//     var keys = ['sample_name', 'experimentor_id','id','exp_type_id']
//     var d3data1 = new d3_data();
//     d3data1.set_keys(keys);
//     d3data1.set_listdata(data1_packlayoutcircle, ['id','exp_type_id']);
//     d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    //chart2d1.add_data1(d3data1);
    chart2d1.data1 = {'nestdatafiltered':flare}; //test with flare
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 10, right: 10, bottom: 10, left: 10 });
    chart2d1.set_diameter(960);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_packlayout(2);
    //chart2d1.data1.change_filters({});
    //chart2d1.data1.filter_stringdata();
    chart2d1.set_colorscale();
    chart2d1.render = function () {
        this.add_chart2d2tile();
        //this.add_chart2d2tile_packlayoutcircle();
        this.set_packlayoutfocusdata1();
        this.set_packlayoutnodesdata1();
        this.set_packlayoutviewdata1();
        this.add_packlayoutcirclesdata1();
        this.add_packlayouttextdata1();
        this.set_packlayoutnode();
        this.add_packlayoutdata1zoom();
        this.zoomto_packlayout();
    };
    chart2d1.render();
};
var make_treelayout = function(){
    var data1keymap = {};
    var keys = ['sample_name', 'experimentor_id','id','exp_type_id']
    var d3data1 = new d3_data();
    d3data1.set_keys(keys);
    d3data1.set_listdata(data1_treelayout, ['id','exp_type_id']);
    d3data1.reset_filters();
    //d3data1.nestdatafiltered = flare;  //test with flare
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.data1.format_keyvalues2namechildren('sample_name');
    chart2d1.set_data1keymap(data1keymap);
    chart2d1.set_id('chart2d1');
    chart2d1.set_tileid('tile1');
    chart2d1.set_margin({ top: 100, right: 100, bottom: 100, left: 100 });
    chart2d1.set_width(500);
    chart2d1.set_height(1000);
    chart2d1.set_duration(750);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.add_svgelement2tile();
    chart2d1.set_treelayoutdata1root();
    chart2d1.set_treelayoutdata1nodeorigin(0);
    chart2d1.set_treelayoutdata1tree();
    chart2d1.set_treelayoutdata1diagonal();
    chart2d1.collapse_treelayoutroot();
    chart2d1.render = function (source_I) {
        if (source_I){
            var source = source_I;
        } else {
            var source = this.data1.nestdatafiltered[0];
        };

        this.set_treelayoutdata1nodes();
        this.set_treelayoutdata1links();
        this.add_treelayoutdata1node(source)
        this.add_treelayoutdata1link(source)
        this.save_treelayoutdata1positions();
        this.set_treelayoutdata1css();
    };
    chart2d1.render();
};
