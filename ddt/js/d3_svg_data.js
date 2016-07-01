"use strict";
function d3_svg_data() {
    // generic svg element with data
    d3_svg.call(this);
    this.data1 = null; //d3_data
    this.data2 = null; //d3_data
    this.data1keymap = {}; // mapping of keys to data element, chart elements, or other descriptor
    this.data2keymap = {}; // mapping of keys to data element, chart elements, or other descriptor
    this.filterdata1and2 = false;
    this.colorscale = null;
};
d3_svg_data.prototype = Object.create(d3_svg.prototype);
d3_svg_data.prototype.constructor = d3_svg_data;
d3_svg_data.prototype.add_data1filtermenusubmitbutton = function (tileid_I,submitbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = this.submitbuttonid;};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        for (key in this_.data1.filters){
            var filterkey = d3.select("#"+tileid+'formlabel'+key).text();
            var filterstring = d3.select("#"+tileid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        this_.data1.convert_stringmenuinput2filter(filterstringmenu);
        this_.data1.filter_listdata();
        this_.render();
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("mousedown",submit);
};
d3_svg_data.prototype.add_data2filtermenusubmitbutton = function (tileid_I,submitbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (submitbuttonid_I){var submitbuttonid = submitbuttonid_I;}
    else{var submitbuttonid = this.submitbuttonid;};

    var this_ = this;

    function submit(){
        var filterstringmenu = [];
        for (key in this_.data2.filters){
            var filterkey = d3.select("#"+tileid+'formlabel'+key).text();
            var filterstring = d3.select("#"+tileid+'forminput'+key).node().value;
            filterstringmenu.push({"text":filterkey,"value":filterstring});
        };
        this_.data2.convert_stringmenuinput2filter(filterstringmenu);
        this_.data2.filter_listdata();
        this_.render();
    };

    this.submitbutton = d3.select("#"+tileid+'submitbutton'+submitbuttonid)
        .on("mousedown",submit);
};
d3_svg_data.prototype.add_data2filtermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = this.resetbuttonid;};

    var this_ = this;
    
    function reset(){
        this_.data2.reset_filters();
        this_.data2.filter_listdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_svg_data.prototype.add_data1filtermenuresetbutton = function (tileid_I,resetbuttonid_I){
    // add data list (menu) to tile for the heatmap
    if (tileid_I){var tileid = tileid_I;}
    else{var tileid = this.tileid;};
    if (resetbuttonid_I){var resetbuttonid = resetbuttonid_I;}
    else{var resetbuttonid = this.resetbuttonid;};

    var this_ = this;
    
    function reset(){
        this_.data1.reset_filters();
        this_.data1.filter_listdata();
        this_.render();
    };

    this.resetbutton = d3.select("#"+tileid+'submitbutton'+resetbuttonid)
        .on("click",reset);
};
d3_svg_data.prototype.set_colorscale = function (colorscale_I,colorcategory_I,colordomain_I,colordatalabel_I,customcolorrange_I) {
    // set color scale
    // INPUT:
    //  colorscale_I = ordinal (default), quantile
    //  colordomain_I = [] e.g., [0,1],[0,1000],[-1000,1000],[-10,0,10],[0.0,0.5,1.0]
    //                           'min,0,max'
    //  colorcategory_I = schemeCategory10, category20, category20a, category20b, category20c
    //                    brewer, heatmap21, heatmap10, blue2gold64RBG, blue2gold64HSV
    //  colordatalabel_I = data key of the data column to base the color range on
    //  customcolorrange_I = [] e.g., ["#aad", "#556"] 
    // NOTES:
    //  custom colors generated from http://www.perbang.dk/rgbgradient/
    // TODO:
    //  refactor into subfunctions

    // custom colorscale
    var heatmap21 = ["#081d58", "#162876", "#253494", "#23499E", "#2253A3", "#225ea8", "#1F77B4", "#1d91c0", "#2FA3C2", "#38ACC3", "#41b6c4", "#60C1BF", "#7fcdbb", "#91D4B9", "#A3DBB7", "#c7e9b4", "#DAF0B2", "#E3F4B1", "#edf8b1", "#F6FBC5", "#ffffd9"];
    var heatmap10 = ["#081d58", "#253494", "#2253A3", "#1F77B4", "#2FA3C2", "#7fcdbb", "#A3DBB7", "#DAF0B2", "#edf8b1", "#ffffd9"]; //specific to resequencing data (domain 0.0-1.0)
    //var blue2gold64 = ['#0026BF','#0328BB','#072AB8','#0A2CB5','#0E2FB2','#1231AF','#1533AC','#1936A9','#1D38A6','#203AA3','#243CA0','#273F9D','#2B419A','#2F4397','#324694','#364891','#3A4A8E','#3D4C8B','#414F88','#455185','#485382','#4C567F','#4F587C','#535A79','#575C76','#5A5F73','#5E6170','#62636D','#65666A','#696867','#6D6A64','#706C61','#746F5D','#77715A','#7B7357','#7F7654','#827851','#867A4E','#8A7C4B','#8D7F48','#918145','#958342','#98863F','#9C883C','#9F8A39','#A38C36','#A78F33','#AA9130','#AE932D','#B2962A','#B59827','#B99A24','#BD9C21','#C09F1E','#C4A11B','#C7A318','#CBA615','#CFA812','#D2AA0F','#D6AC0C','#DAAF09','#DDB106','#E1B303','#E5B600'];
    var blue2red64 = ['#0026BF','#0325BC','#0724B9','#0A24B6','#0E23B3','#1222B0','#1522AD','#1921AA','#1D21A7','#2020A4','#241FA1','#271F9E','#2B1E9B','#2F1E98','#321D95','#361C92','#3A1C8F','#3D1B8C','#411B89','#451A86','#481983','#4C1980','#4F187D','#53187A','#571777','#5A1674','#5E1671','#62156E','#65156B','#691468','#6D1365','#701362','#74125F','#77125C','#7B1159','#7F1056','#821053','#860F50','#8A0F4D','#8D0E4A','#910D47','#950D44','#980C41','#9C0C3E','#9F0B3B','#A30A38','#A70A35','#AA0932','#AE092F','#B2082C','#B50729','#B90726','#BD0623','#C00620','#C4051D','#C7041A','#CB0417','#CF0314','#D20311','#D6020E','#DA010B','#DD0108','#E10005','#E50003'];
    //var blue2gold21 = ['#0026BF','#0B2DB5','#1634AB','#223BA2','#2D4298','#394A8F','#445185','#50587C','#5B5F72','#676669','#726E5F','#7D7555','#897C4C','#948342','#A08A39','#AB922F','#B79926','#C2A01C','#CEA713','#D9AE09','#E5B600'];
    var blue2gold64RBG = ['#1D2B63','#202E63','#243164','#273465','#2B3766','#2E3A67','#323D68','#364069','#39436A','#3D466B','#40496C','#444C6D','#474F6E','#4B526F','#4F5570','#525871','#565B72','#595E73','#5D6174','#606475','#646776','#686B77','#6B6E78','#6F7179','#72747A','#76777B','#797A7C','#7D7D7D','#81807E','#84837F','#888680','#8B8981','#8F8C81','#928F82','#969283','#9A9584','#9D9885','#A19B86','#A49E87','#A8A188','#ABA489','#AFA78A','#B3AB8B','#B6AE8C','#BAB18D','#BDB48E','#C1B78F','#C4BA90','#C8BD91','#CCC092','#CFC393','#D3C694','#D6C995','#DACC96','#DDCF97','#E1D298','#E5D599','#E8D89A','#ECDB9B','#EFDE9C','#F3E19D','#F6E49E','#FAE79F','#FEEBA0'];
    var blue2gold64HSV = ['#1D2A63','#1E2965','#1F2767','#20256A','#22226C','#26236F','#2B2471','#302674','#362776','#3B2979','#412A7B','#462C7E','#4C2D80','#522F82','#583185','#5E3287','#64348A','#6A368C','#71378F','#773991','#7E3B94','#843D96','#8B3E99','#91409B','#98429E','#9F44A0','#A2469F','#A5489D','#A74A9B','#AA4C99','#AC4E97','#AF5095','#B15292','#B45490','#B6568E','#B9588C','#BB5B8A','#BE5D87','#C05F85','#C26183','#C56480','#C7667E','#CA687C','#CC6B7A','#CF6D77','#D16F75','#D47273','#D67874','#D97F77','#DB8679','#DE8D7C','#E0957E','#E29C81','#E5A384','#E7AA86','#EAB189','#ECB98C','#EFC08F','#F1C791','#F4CE94','#F6D597','#F9DC9A','#FBE39D','#FEEAA0'];
    //var blue2gold64RBG = ['#0E1B4E','#111E4F','#152150','#192451','#1D2853','#212B54','#242E55','#283257','#2C3558','#303859','#343C5B','#373F5C','#3B425D','#3F455E','#434960','#474C61','#4A4F62','#4E5364','#525665','#565966','#5A5D68','#5E6069','#61636A','#65666B','#696A6D','#6D6D6E','#71706F','#747471','#787772','#7C7A73','#807E75','#848176','#878477','#8B8778','#8F8B7A','#938E7B','#97917C','#9A957E','#9E987F','#A29B80','#A69F82','#AAA283','#AEA584','#B1A885','#B5AC87','#B9AF88','#BDB289','#C1B68B','#C4B98C','#C8BC8D','#CCC08F','#D0C390','#D4C691','#D7C992','#DBCD94','#DFD095','#E3D396','#E7D798','#EADA99','#EEDD9A','#F2E19C','#F6E49D','#FAE79E','#FEEBA0'];
    //var blue2gold64HSV = ['#0E1B4E','#0F1950','#101753','#111556','#121359','#16135B','#1B155E','#201661','#251764','#2A1967','#301A69','#351C6C','#3B1D6F','#411F72','#472075','#4E2277','#54247A','#5A257D','#612780','#682983','#6F2B85','#762D88','#7D2E8B','#84308E','#8B3291','#923493','#963793','#993991','#9C3B8F','#9F3D8D','#A13F8B','#A44289','#A74487','#AA4685','#AC4983','#AF4B81','#B24E7F','#B5507C','#B8537A','#BA5578','#BD5876','#C05A74','#C35D72','#C66070','#C8636E','#CB666C','#CE686A','#D16F6B','#D4776E','#D67F71','#D98674','#DC8E77','#DF967B','#E29E7E','#E4A681','#E7AD84','#EAB587','#EDBD8B','#F0C58E','#F2CC92','#F5D495','#F8DC98','#FBE39C','#FEEAA0'];
    var blue2red64RBG = ['#1D2B63','#202A61','#23295F','#26285E','#29285C','#2C275B','#302659','#332658','#362556','#392455','#3C2453','#3F2352','#432250','#46224F','#49214D','#4C204C','#4F204A','#521F49','#561E47','#591E46','#5C1D44','#5F1C43','#621B41','#661B3F','#691A3E','#6C193C','#6F193B','#721839','#751738','#791736','#7C1635','#7F1533','#821532','#851430','#88132F','#8C132D','#8F122C','#92112A','#951129','#981027','#9B0F26','#9F0F24','#A20E23','#A50D21','#A80C1F','#AB0C1E','#AF0B1C','#B20A1B','#B50A19','#B80918','#BB0816','#BE0815','#C20713','#C50612','#C80610','#CB050F','#CE040D','#D1040C','#D5030A','#D80209','#DB0207','#DE0106','#E10004','#E50003'];
    var blue2red64HSV = ['#1D2A63','#1D2965','#1D2667','#1D2469','#1D226B','#1D1F6D','#1E1D6F','#211D71','#241D73','#271D75','#2A1D77','#2E1D79','#311D7B','#351D7D','#391D7F','#3D1D81','#411C84','#451C86','#4A1C88','#4E1C8A','#531C8C','#581B8E','#5D1B90','#621B92','#671A94','#6D1A96','#731A98','#78199A','#7E199C','#84199E','#8B18A0','#9118A2','#9817A5','#9F17A7','#A616A9','#AB16A8','#AD15A5','#AF15A2','#B1149E','#B3149A','#B51396','#B71292','#B9128E','#BB1189','#BD1085','#BF1080','#C10F7B','#C30E75','#C60D70','#C80D6A','#CA0C64','#CC0B5E','#CE0A57','#D00951','#D2084A','#D40743','#D6063C','#D80634','#DA052C','#DC0425','#DE031C','#E00214','#E2010B','#E50002'];
//     var HSV_all_127 = ['#E51200','#E41C00','#E32700','#E33200','#E23C00','#E14700','#E15200','#E05C00','#E06700','#DF7100','#DE7B00','#DE8500','#DD9000','#DD9A00','#DCA400','#DBAE00','#DBB800','#DAC200','#DACC00','#D9D500','#D2D800','#C7D800','#BCD700','#B1D700','#A7D600','#9CD500','#91D500','#87D400','#7CD400','#72D300','#67D200','#5DD200','#53D100','#49D100','#3FD000','#34CF00','#2ACF00','#20CE00','#17CE00','#0DCD00','#03CC00','#00CC06','#00CB0F','#00CB19','#00CA23','#00C92C','#00C936','#00C83F','#00C848','#00C752','#00C65B','#00C664','#00C56D','#00C576','#00C47F','#00C388','#00C391','#00C29A','#00C2A3','#00C1AB','#00C0B4','#00C0BC','#00B9BF','#00B0BF',
//         '#00A7BF','#009EC0','#0096C0','#008DC1','#0084C2','#007BC2','#0072C3','#0069C3','#0060C4','#0057C5','#004EC5','#0045C6','#003CC6','#0032C7','#0029C8','#0020C8','#0016C9','#000CC9','#0003CA','#0600CB','#0F00CB','#1900CC','#2300CC','#2D00CD','#3700CE','#4100CE','#4B00CF','#5500CF','#5F00D0','#6A00D1','#7400D1','#7E00D2','#8900D2','#9300D3','#9E00D4','#A800D4','#B300D5','#BD00D5','#C800D6','#D300D7','#D700D1','#D800C7','#D800BD','#D900B3','#DA00A9','#DA009F','#DB0095','#DB008B','#DC0081','#DD0077','#DD006D','#DE0063','#DE0058','#DF004E','#E00043','#E00039','#E1002E','#E10024','#E20019','#E3000E','#E30003','#E40700','#E51100'];
//     var HSV_all_127 = ['#E51200','#E23C00','#E06700','#DD9000','#DBB800','#D2D800','#A7D600','#7CD400','#53D100','#2ACF00','#03CC00','#00CA23','#00C848','#00C56D','#00C391','#00C0B4','#E51100','#E20019','#E00043','#DD006D','#DB0095','#D800BD','#C800D6','#9E00D4','#7400D1','#4B00CF','#2300CC','#0003CA','#0029C8','#004EC5','#0072C3','#0096C0','#E41C00','#E14700','#DF7100','#DD9A00','#DAC200','#C7D800','#9CD500','#72D300','#49D100','#20CE00','#00CC06','#00C92C','#00C752','#00C576','#00C29A','#00C0BC','#E40700','#E10024','#DF004E','#DD0077','#DA009F','#D800C7','#BD00D5','#9300D3','#6A00D1','#4100CE','#1900CC','#000CC9','#0032C7','#0057C5','#007BC2','#009EC0','#E32700','#E15200','#DE7B00','#DCA400','#DACC00','#BCD700','#91D500','#67D200','#3FD000','#17CE00','#00CB0F','#00C936','#00C65B','#00C47F','#00C2A3','#00B9BF','#E30003','#E1002E','#DE0058','#DC0081','#DA00A9','#D700D1','#B300D5','#8900D2','#5F00D0','#3700CE','#0F00CB','#0016C9','#003CC6','#0060C4','#0084C2','#00A7BF','#E33200','#E05C00','#DE8500','#DBAE00','#D9D500','#B1D700','#87D400','#5DD200','#34CF00','#0DCD00','#00CB19','#00C83F','#00C664','#00C388','#00C1AB','#00B0BF','#E3000E','#E00039','#DE0063','#DB008B','#D900B3','#D300D7','#A800D4','#7E00D2','#5500CF','#2D00CD','#0600CB','#0020C8','#0045C6','#0069C3','#008DC1'];
    var HSV_all_127 = ['#E51200','#E23C00','#E06700','#DD9000','#DBB800','#D2D800','#A7D600','#7CD400','#53D100','#2ACF00','#03CC00','#00CA23','#00C848','#00C56D','#00C391','#00C0B4','#00A7BF','#0084C2','#0060C4','#003CC6','#0016C9','#0F00CB','#3700CE','#5F00D0','#8900D2','#B300D5','#D700D1','#DA00A9','#DC0081','#DE0058','#E1002E','#E30003','#E41C00','#E14700','#DF7100','#DD9A00','#DAC200','#C7D800','#9CD500','#72D300','#49D100','#20CE00','#00CC06','#00C92C','#00C752','#00C576','#00C29A','#00C0BC','#009EC0','#007BC2','#0057C5','#0032C7','#000CC9','#1900CC','#4100CE','#6A00D1','#9300D3','#BD00D5','#D800C7','#DA009F','#DD0077','#DF004E','#E10024','#E40700','#E32700','#E15200','#DE7B00','#DCA400','#DACC00','#BCD700','#91D500','#67D200','#3FD000','#17CE00','#00CB0F','#00C936','#00C65B','#00C47F','#00C2A3','#00B9BF','#0096C0','#0072C3','#004EC5','#0029C8','#0003CA','#2300CC','#4B00CF','#7400D1','#9E00D4','#C800D6','#D800BD','#DB0095','#DD006D','#E00043','#E20019','#E51100','#E33200','#E05C00','#DE8500','#DBAE00','#D9D500','#B1D700','#87D400','#5DD200','#34CF00','#0DCD00','#00CB19','#00C83F','#00C664','#00C388','#00C1AB','#00B0BF','#008DC1','#0069C3','#0045C6','#0020C8','#0600CB','#2D00CD','#5500CF','#7E00D2','#A800D4','#D300D7','#D900B3','#DB008B','#DE0063','#E00039','#E3000E'];
    
    var listdatafiltered = this.data1.listdatafiltered;
    if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='colorbrewer'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(colorbrewer.RdYlBu[10]);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='heatmap21'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap21);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='heatmap10'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap10);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='blue2gold64RBG'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64RBG);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='blue2gold64HSV'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64HSV);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,0,max' && colordatalabel_I && colorcategory_I==='blue2red64'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            0,
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2red64);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='colorbrewer'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(colorbrewer.RdYlBu[10]);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='heatmap21'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap21);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='heatmap10'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(heatmap10);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='blue2gold64RBG'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64RBG);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='blue2gold64HSV'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2gold64HSV);
    }else if (colorscale_I==='quantile' && colordomain_I==='min,max' && colordatalabel_I && colorcategory_I==='blue2red64'){
            this.colorscale = d3.scaleQuantile()
            .domain([d3.min(listdatafiltered, function (d) { return d[colordatalabel_I]; }),
            d3.max(listdatafiltered, function (d) { return d[colordatalabel_I]; })])
            .range(blue2red64);
    }else if (colorscale_I==='quantile' && colordomain_I && colordatalabel_I && colorcategory_I==='blue2gold64RBG'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).range(blue2gold64RBG);
    } else if (colorscale_I === 'quantile' && colordomain_I && colordatalabel_I && colorcategory_I === 'blue2red64RBG') {
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).range(blue2red64RBG);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='colorbrewer'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).range(colorbrewer.YlGnBu[9]);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='schemeCategory10c'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).schemeCategory10c();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).category20();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20a'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).category20a();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20b'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).category20b();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='category20c'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).category20c();
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='heatmap10'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).range(heatmap10);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='heatmap21'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).range(heatmap21);
    }else if (colorscale_I==='quantile' && colordomain_I && colorcategory_I==='blue2gold64HSV'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).range(blue2gold64HSV);
    }else if (colorscale_I==='quantile' && colorcategory_I==='colorbrewer'){
        this.colorscale = d3.scaleQuantile().range(colorbrewer.YlGnBu[10]);
    }else if (colorscale_I==='quantile' && colorcategory_I==='schemeCategory10c'){
        this.colorscale = d3.scaleQuantile().schemeCategory10c();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20'){
        this.colorscale = d3.scaleQuantile().category20();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20a'){
        this.colorscale = d3.scaleQuantile().category20a();
    }else if (colorscale_I==='quantile' && colorcategory_I==='category20b'){
        this.colorscale = d3.scaleQuantile().domain(colordomain_I).category20b();
    }else if (colorscale_I==='quantile' &&  colorcategory_I==='category20c'){
        this.colorscale = d3.scaleQuantile().category20c();
    }else if (colorcategory_I==='HSV_all_127'){
        this.colorscale = d3.scaleOrdinal().range(HSV_all_127);
    }else if (typeof(customcolorrange_I)!=="undefined"){
        this.colorscale = d3.scaleLinear().range(customcolorrange_I);
    }else{
        this.colorscale = d3.schemeCategory20c();
    };
};
d3_svg_data.prototype.add_data = function(data_I){
    //add data n
    if (!data_I){
       console.warn("no data");
    } else if (data_I.length===1){
        this.data1 = data_I[0];
    } else if (data_I.length===2){
        this.data1 = data_I[0];
        this.data2 = data_I[1];
    } else {console.warn("more data found than what is currently supported");
    };
};
d3_svg_data.prototype.set_datakeymaps = function(keymaps_I){
    //add data n
    if (!keymaps_I){
       console.warn("no data");
    } else if (keymaps_I.length===1){
        this.data1keymap = keymaps_I[0];
    } else if (keymaps_I.length===2){
        this.data1keymap = keymaps_I[0];
        this.data2keymap = keymaps_I[1];
    } else {console.warn("more data found than what is currently supported");
    };
};
d3_svg_data.prototype.add_data1 = function (data1_I) {
    //add data1
    this.data1 = data1_I;
};
d3_svg_data.prototype.add_data2 = function (data2_I) {
    //add data2 element export
    this.data2 = data2_I;
};
d3_svg_data.prototype.set_filterdata1and2 = function(filterdata1and2_I){
    // filter data 1 and 2 together based on the same series label
    this.filterdata1and2 = filterdata1and2_I;
};
d3_svg_data.prototype.filter_data1and2stringdata = function(){
    //filter all data
    if (this.data1){this.data1.filter_listdata();};
    if (this.data2){this.data2.filter_listdata();}; 
};
d3_svg_data.prototype.set_data1keymap = function (data1keymap_I) {
    //set the data1 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data1keymap = data1keymap_I;
};
d3_svg_data.prototype.set_data2keymap = function (data2keymap_I) {
    //set the data2 column identifiers for xdata, yudata, serieslabel, and featureslabel
    this.data2keymap = data2keymap_I;
};
d3_svg_data.prototype.set_stackdata1 = function (offset_I) {
//     set stack properties
//     offset_I = string,
//         silhouette - center the stream, as in ThemeRiver.
//         wiggle - minimize weighted change in slope.
//         expand - normalize layers to fill the range [0,1].
//         zero - use a zero baseline, i.e., the y-axis
    if (typeof(offset_I)!=='undefined'){
        var offset = offset_I;
    } else {
        var offset = "zero";
    }

    var x_data = this.data1keymap.xdata;
    var y_data = this.data1keymap.ydata;
    var x1scale = this.x1scale;
    var y1scale = this.y1scale;

    this.stackdata1 = d3.stack()
        .offset(offset_I)
        .values(function(d) {
            return d.values; 
            })
        .x(function(d){
            return d[x_data];
            })
        .y(function(d){
            return d[y_data];
            })
        .out(function(d,y0,y){
            d.y0 = y0;
            d.y = y;
        })
        ;
//         .values(function(d) {
//             var valuesmapped = d.values.map(function(xy){
//                 return {x:xy[x_data],y:xy[y_data]}
//                 }); 
//             return valuesmapped;
//             });
};