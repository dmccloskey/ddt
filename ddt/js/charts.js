var make_scatterlineplot2d = function () {
    var d3data1 = new d3_data();
    d3data1.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data1.set_listdata(data1, 'sample_name_abbreviation');
    d3data1.reset_filters();
	var d3data2 = new d3_data();
    d3data2.set_keys(['sample_name_abbreviation', 'SNP_icd_1195528']);
    d3data2.set_listdata(data2, 'sample_name_abbreviation');
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
    chart2d1.set_width(990);
    chart2d1.set_height(500);
    chart2d1.add_svgexportbutton2tile();
    chart2d1.set_tooltip();
    chart2d1.set_tooltipstyle();
    chart2d1.set_colorscale(); //color for series_label will remain consistent
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
    d3data1.set_listdata(data1_scatterplot2d_volcanoplot, 'component_group_name');
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
    d3data1.set_listdata(data1_scatterplot2d_pcascores, 'sample_name_abbreviation');
    d3data1.reset_filters();
    var scores2d1 = new d3_chart2d();
    scores2d1.add_data1(d3data1);
    chart2d1.set_data1keymap({'xdata':'score_1','ydata':'score_2','serieslabel':'sample_name_abbreviation','featureslabel':'sample_name_short'});
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
    d3data2.set_listdata(data1_scatterplot2d_pcaloadings, 'component_name');
    d3data2.reset_filters();
    var loadings2d1 = new d3_chart2d();
    loadings2d1.add_data1(d3data2);
    chart2d1.set_data1keymap({'xdata':'loadings_1','ydata':'loadings_2','serieslabel':'','featureslabel':'component_name'});
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
    d3data1.set_listdata(data1_barchart, 'met_id');
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
    d3data2.set_listdata(data1_barchart, 'met_id');
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
    var data1keymap = {'xdata':'','ydatamean':'mean',
                'serieslabel':'sample_name_abbreviation','featureslabel':'met_id',
                'ydatalb':'rate_lb','ydataub':'rate_ub',
                'ydatamedian':'median','ydataiq1':'iq_1','ydataiq3':'iq_3',
                'ydatamin':'min','ydatamax':'max',
                'ydataoutliers':'outliers'};
    var keys = ['sample_name_abbreviation','calculated_concentration_units',
                'component_name','component_group_name','experiment_id',
                'time_point']
    var d3data1 = new d3_data();
    d3data1.set_keys();
    d3data1.set_listdata(data1_boxandwhiskers, 'component_name');
    d3data1.reset_filters();
    var chart2d1 = new d3_chart2d();
    chart2d1.add_data1(d3data1);
    chart2d1.set_data1keymap(data1keymap);
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
        this.add_boxandwhiskersdata1();
        //this.add_boxandwhiskersdata1tooltipandfill();
        this.set_x1andy1axesstyle_verticalbarsplot();
        this.add_y1axislabel("rate (mmol*gDCW-1*hr-1)");
        this.add_title("uptake/secretion rates");
    };
    chart2d1.data1.change_filters({'calculated_concentration_units':['mM_glog_normalized']});
    chart2d1.data1.filter_stringdata();
    chart2d1.render();
};