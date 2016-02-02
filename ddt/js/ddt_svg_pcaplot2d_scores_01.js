"use strict";
function ddt_svg_pcaplot2d_scores_01() {
// 	pcaplot2d_scores
// 	DESCRIPTION:
// 	PCA scores plot (compare to boxAndWhiskers)
// 	INPUT:
// 	data1
// 	data1_keymap = {
// 		'xdata':'score_'+str(PC[0]),
// 		'ydata':'score_'+str(PC[1]),
// 		'serieslabel':'sample_name_abbreviation',
// 		'featureslabel':'sample_name_short'
// 		};
// 	parameters_I = {
// 		SVG parameters
// 		"svgtype":'pcaplot2d_scores_01',
// 		"svgkeymap":[data1_keymap],
// 		'svgid':'svg1',
// 		"svgmargin":{ 'top': 50, 'right': 150, 'bottom': 50, 'left': 50 },
// 		"svgwidth":400,
// 		"svgheight":350,
// 		"svgx1axislabel":data1_O[0]['axislabel'+str(PC[0])],
// 		"svgy1axislabel":data1_O[0]['axislabel'+str(PC[1])],
// 		Tile parameters
// 		'tileheader':'Scores','tiletype':'svg',
// 		'tileid':"scorestile"+str(PC_cnt),
// 		'rowid':"row1",
// 		'colid':"col"+str(PC_cnt+1),
// 		'tileclass':"panel panel-default",
// 		'rowclass':"row",
// 		'colclass':"col-sm-6"
// 		};

    ddt_svg.call(this);
};
ddt_svg_pcaplot2d_scores_01.prototype = Object.create(ddt_svg.prototype);
ddt_svg_pcaplot2d_scores_01.prototype.constructor = ddt_svg_pcaplot2d_scores_01;
ddt_svg_pcaplot2d_scores_01.prototype.make_svg = function(data_I,parameters_I){
	// scatterlineplot definition

	this.ddtsvg = new d3_chart2d();
	
	// general svg properties
	this.set_parameters(parameters_I);
	this.set_ddtsvg()
    this.add_data(data_I);
    this.set_datakeymaps(parameters_I.svgkeymap);

	// svg specific properties
    this.ddtsvg.set_margin(parameters_I.svgmargin);
    this.ddtsvg.set_width(parameters_I.svgwidth);
    this.ddtsvg.set_height(parameters_I.svgheight);
    this.ddtsvg.set_colorscale(); //color for series_label will remain consistent
    this.ddtsvg.add_svgexportbutton2tile();
    this.ddtsvg.add_optionsbuttongroup2footer();
    this.ddtsvg.add_svgmenubutton2optionsbuttongroup();
    this.ddtsvg.add_resizebuttons2optionsbuttongroup();
    //this.ddtsvg.set_tooltip();
    //this.ddtsvg.set_tooltipstyle();
    this.ddtsvg.set_zoom();
    this.ddtsvg.render = function () {
        this.add_chart2d2tile();
        this.set_svgstyle();
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
        //this.set_x1axiszoom();
        //this.set_y1axiszoom();
        //this.add_zoom();
        this.add_pointsdata1();
        this.add_pointsdata1tooltipandfill();
        this.add_pointsdata1featurefilter();
        //this.add_data1featureslabels();
        this.set_pointsdata1featurestyle();
        this.set_pointsstyle();
        this.add_legenddata1();
        this.add_legenddata1filter();
        this.set_legendstyle();
        this.add_x1axislabel(parameters_I.svgx1axislabel);
        this.add_y1axislabel(parameters_I.svgy1axislabel);
        this.set_x1andy1axeslabelstyle();
        this.set_x1x2andy1y2axesstyle();
        this.set_x1x2andy1y2axestickstyle();
    };
};