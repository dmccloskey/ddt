"use strict";

// table navbar logic:
d3_table.prototype.set_ntablerows = function(ntablerows_I){
	/*set the default number of table rows displayed
	INPUT:
	ntablerows_I = integer
	*/
	if (typeof(ntablerows_I)!=="undefined"){
		var ntablerows = ntablerows_I;
	} else {
		var ntablerows = 100;
	};
	this.ntablerows = ntablerows>this.data.listdatafiltered.length ? this.data.listdatafiltered.length : ntablerows;
};
d3_table.prototype.get_ntablerows = function(){
	/*return the default number of table rows displayed
	*/
	return this.ntablerows;
};
d3_table.prototype.set_tablecurrentpage = function(tablecurrentpage_I){
	/*set the current table page
	INPUT:
	tablecurrentpage_I = integer
	*/
	if (typeof(tablecurrentpage_I)!=="undefined"){
		this.tablecurrentpage = tablecurrentpage_I;
	} else {
		this.tablecurrentpage = 1;
	};
};
d3_table.prototype.get_tablecurrentpage = function(){
	/*return the current table page
	*/
	return this.tablecurrentpage;
};
d3_table.prototype.get_tablelastpage = function(){
	/*return the last table page
	*/
	var lastpage = Math.ceil(this.data.listdatafiltered.length / this.ntablerows);
	return lastpage;
};
//
d3_table.prototype.add_tablerowlimit2tablenavbar = function(){
    /* add the table row limit input

    */

    var id = this.id;
    var this_ = this;
    var tileid = this.tileid;
    var ntablerows = this.ntablerows;

	var tablerowlimitgroup = this.tablenavbarenter
		.select('#'+id+"tablenavbarlabels"+"rows")
		.selectAll(".input-group")
		.data([0]);
	tablerowlimitgroup.exit().remove();
	tablerowlimitgroup.transition()
        .attr("class","input-group");
	var tablerowlimitgroupenter = tablerowlimitgroup.enter()
		.append("div")
        .attr("class","input-group");

	var tablerowlimitinput = tablerowlimitgroup
		.selectAll("input")
		.data([ntablerows]);
	tablerowlimitinput.exit().remove();
	tablerowlimitinput.transition()
        .attr("type","text")
        .attr("placeholder",function(d){return d;})
        .attr("value",function(d){return d;})
        .attr("class","form-control");
	var tablerowlimitinputenter = tablerowlimitinput.enter()
		.append("input")
        .attr("type","text")
        .attr("placeholder",function(d){return d;})
        .attr("value",function(d){return d;})
        .attr("class","form-control");

	var tablerowlimitbutton = tablerowlimitgroup
		.selectAll("button")
		.data([ntablerows]);
	tablerowlimitbutton.exit().remove();
	tablerowlimitbutton.transition()
        .attr("type","text")
        .attr("type","button")
        .text("Change")
        .attr("class","btn btn-default");
	var tablerowlimitbuttonenter = tablerowlimitbutton.enter()
		.append("span")
		.attr("class",'input-group-btn')
		.append("button")
        .attr("type","button")
        .text("Change")
        .attr("class","btn btn-default");
	tablerowlimitbutton.on("click",function(d){
		var value = parseFloat(this.parentNode.children[0].value);
		this_.set_ntablerows(value);
		this_.render();

	});
};
d3_table.prototype.add_tablepagination2tablenavbar = function(npagesmax_I=4){
    /* add the table pagination input
	TODO: page numbers are not updating...
    */
	var this_ = this;
	var id = this.id;
	var npagesmax = npagesmax_I;
    var currentpage = this.get_tablecurrentpage();
    var lastpage = this.get_tablelastpage();
    
	//TODO: move code block to seperate function?
    //dynamically determine the page number buttons to show
    //assumption: startpage = 1
	function calculate_pagesStartAndEnd(npagesmax,currentpage,lastpage){
		var pagesstart = currentpage-Math.floor(npagesmax/2)<1 ? 1 : currentpage-Math.floor(npagesmax/2);
		var pagesend = pagesstart + npagesmax - 1; // -1 required to ensure pagesend-pagesstart = npagesmax
		//var pagesend = currentpage+Math.ceil(npagesmax/2)>lastpage ? lastpage : currentpage+Math.ceil(npagesmax/2);
		return {pagesstart:pagesstart,pagesend:pagesend};
	};
	function check_pagesStartAndEnd(npagesmax,currentpage,lastpage,pagesstart,pagesend){
		if (pagesend-pagesstart < npagesmax-1){
			npagesmax = pagesend-pagesstart;
			get_pagesStartAndEnd(npagesmax,currentpage,lastpage);
		} else if (pagesend >= lastpage){ 
		    pagesend = lastpage;
			pagesstart = lastpage - npagesmax + 1;
			return {pagesstart:pagesstart,pagesend:pagesend};
// 		} else if (pagesstart === 1){
// 			pagesend = pagesstart + npagesmax;
// 			check_pagesStartAndEnd(npagesmax,currentpage,lastpage,pagesstart,pagesend);
		} else {
			return {pagesstart:pagesstart,pagesend:pagesend};
		};
	};
    function get_pagesStartAndEnd(npagesmax,currentpage,lastpage){
		var pages1 = calculate_pagesStartAndEnd(npagesmax,currentpage,lastpage);
		var pages2 = check_pagesStartAndEnd(
			npagesmax,currentpage,lastpage,
			pages1.pagesstart,pages1.pagesend);
		return pages2;
    };
    function get_pages(npagesmax,currentpage,lastpage){
		var pagesStartAndEnd = get_pagesStartAndEnd(npagesmax,currentpage,lastpage);
		var pages = [];
		for (var i=pagesStartAndEnd.pagesstart; i<=pagesStartAndEnd.pagesend; i++){
			pages.push(i);
		};
		return pages;
    };
    function get_pagesAndColors(npagesmax,currentpage,lastpage){
        var pages = get_pages(npagesmax,currentpage,lastpage);
        var pagesAndColors = [];
        pages.forEach(function(d){
                if (d===this_.get_tablecurrentpage()){
                    pagesAndColors.push({color:"#ff0000",value:d});
                } else{
                    pagesAndColors.push({color:null,value:d});
                };
            });
        return pagesAndColors;
    };
    var pages = get_pages(npagesmax,currentpage,lastpage);

    //TODO: move code block to new function?
    function update_pageButtons(){
        var pagesAndColors = get_pagesAndColors(npagesmax,this_.get_tablecurrentpage(),this_.get_tablelastpage());
        var pageButtons = d3.select("#" + id + 'btn-group-pages').node().children;
		for (var i=0;i<pageButtons.length;i++){   
            pageButtons[i].style.color=pagesAndColors[i].color;
		    pageButtons[i].textContent=pagesAndColors[i].value;
		};
    };

	//Split 1
	// 1. buttons are not duplicated each refresh
	// 2. explicitly select the element to append
	// 3. may need to change from cell to an arbitrary footer row
	//		to avoid resizing issues each refresh
	//tablefooterpaginationtoolbar
// 	var tablefooterpaginationtoolbar = d3
// 		.select('#'+id+"tablenavbarlabels"+"page")
// 		.append("div")
//         .attr("class","btn-toolbar")
//         .attr("id", id + 'tablefooterpaginationtoolbar')
//         .attr("role","toolbar")
//         .attr("aria-label","true");
// 	//tablefooterpagination left arrows
// 	var tablefooterpaginationleftarrows = tablefooterpaginationtoolbar
// 		.append("div")
// 		.attr('class','btn-group leftarrows')
// 		.attr('role','group');
// 	var tablefooterpaginationfirst = tablefooterpaginationleftarrows
// 		.append("div")
// 		.attr('class','glyphicon glyphicon-step-backward')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","first page");
// 	tablefooterpaginationfirst.on("click",function(d){
// 		this_.set_tablecurrentpage(1);
// 		this_.render();
// 	});	
// 	var tablefooterpaginationprevious = tablefooterpaginationleftarrows.append("div")
// 		.attr('class','glyphicon glyphicon-triangle-left')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","previous page");
// 	tablefooterpaginationprevious.on("click",function(d){
// 		var newcurrentpage = currentpage-1<0 ? 0: currentpage-1;
// 		this_.set_tablecurrentpage(newcurrentpage);
// 		this_.render();
// 	});
// 	//tablefooterpagination middle pages
// 	var tablefooterpaginationbuttonsgroup = tablefooterpaginationtoolbar
// 		.append("div")
// 		.attr('class','btn-group pages')
// 		.attr('role','group');
// 	var tablefooterpaginationbuttons = tablefooterpaginationbuttonsgroup
// 		.selectAll("button")
// 		.data(pages);
// 	tablefooterpaginationbuttons.exit().remove();
// 	tablefooterpaginationbuttons.transition()
// 		.attr("class","btn btn-default")
// 		.attr("type","button")
// 		.style("color",function(d){
// 			if (d===currentpage){
// 				return "#ff0000";
// 			} else {
// 				return "#000000";
// 			};
// 		})
// 		.text(function(d){ return d;});
// 	var tablefooterpaginationbuttonsenter=tablefooterpaginationbuttons.enter()
// 		.append("button")
// 		.attr("class","btn btn-default")
// 		.attr("type","button")
// 		.style("color",function(d){
// 			if (d===currentpage){
// 				return "#ff0000";
// 			} else {
// 				return "#000000";
// 			};
// 		})
// 		.text(function(d){ return d;});
// 	tablefooterpaginationbuttons.on("click",function(d){
// 		this_.set_tablecurrentpage(d);
// 		this_.render();
// 	});

// 	//tablefooterpagination right arrows
// 	var tablefooterpaginationrightarrows = tablefooterpaginationtoolbar
// 		.append("div")
// 		.attr('class','btn-group rightarrows')
// 		.attr('role','group');
// 	var tablefooterpaginationnext = tablefooterpaginationrightarrows
// 		.append("div")
// 		.attr('class','glyphicon glyphicon-triangle-right')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","next page");

// 	tablefooterpaginationnext.on("click",function(d){
// 		var newcurrentpage = currentpage+1>lastpage ? lastpage: currentpage+1;
// 		this_.set_tablecurrentpage(newcurrentpage);
// 		this_.render();
// 	});
// 	var tablefooterpaginationlast = tablefooterpaginationrightarrows
// 		.append("div")
// 		.attr('class','glyphicon glyphicon-step-forward')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","last page");
// 	tablefooterpaginationlast.on("click",function(d){
// 		this_.set_tablecurrentpage(lastpage);
// 		this_.render();
// 	});	

	//Split 2
	// 1. appends buttons each refresh...
	// 2. appends buttons to the footer row and not footer cell
	//tablefooterpaginationtoolbar
	var tablefooterpaginationtoolbar = this.tablenavbarenter
		.select('#'+id+"tablenavbarlabels"+"page")
// 	var tablefooterpaginationtoolbar = this.tablenavbarlabels
		.selectAll('.btn-toolbar')
		.data([0]);

	tablefooterpaginationtoolbar.exit().remove();
	tablefooterpaginationtoolbar.transition()
        .attr("class","glyphicon glyphicon-arrow-up")
        .attr("id", id + 'tablefooterpaginationtoolbar')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","sort ascending");

	var tablefooterpaginationtoolbarcenter = tablefooterpaginationtoolbar.enter()
		.append("div")
        .attr("class","btn-toolbar")
        .attr("id", id + 'tablefooterpaginationtoolbar')
        .attr("role","toolbar")
        .attr("aria-label","true");

	//tablefooterpagination left arrows
	var tablefooterpaginationleftarrows = tablefooterpaginationtoolbar
		.selectAll('.leftarrows').data([0]);
	tablefooterpaginationleftarrows.transition()
		.attr('class','btn-group leftarrows')
		.attr('role','group');
	tablefooterpaginationleftarrows.exit().remove();
	var tablefooterpaginationleftarrowsenter = tablefooterpaginationleftarrows.enter();
	tablefooterpaginationleftarrowsenter.append("div")
		.attr('class','btn-group leftarrows')
		.attr('role','group');

	var tablefooterpaginationfirst = tablefooterpaginationleftarrows
		.selectAll('.glyphicon glyphicon-step-backward')
		.data([0]);
	tablefooterpaginationfirst.transition()
		.attr('class','glyphicon glyphicon-step-backward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","first page");
	tablefooterpaginationfirst.exit().remove();
	var tablefooterpaginationfirstenter = tablefooterpaginationfirst.enter();
	tablefooterpaginationfirstenter.append("div")
		.attr('class','glyphicon glyphicon-step-backward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","first page");
	tablefooterpaginationfirst.on("click",function(d){
		this_.set_tablecurrentpage(1);
		update_pageButtons();
		this_.render();
	});	

	var tablefooterpaginationprevious = tablefooterpaginationleftarrows
		.selectAll('.glyphicon glyphicon-triangle-left')
		.data([0]);
	tablefooterpaginationprevious.transition()
		.attr('class','glyphicon glyphicon-triangle-left')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","previous page");
	tablefooterpaginationprevious.exit().remove();
	var tablefooterpaginationpreviousenter = tablefooterpaginationprevious.enter();
	tablefooterpaginationpreviousenter.append("div")
		.attr('class','glyphicon glyphicon-triangle-left')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","previous page");
	tablefooterpaginationprevious.on("click",function(d){
	    var currentpage = this_.get_tablecurrentpage();
		var newcurrentpage = currentpage-1<1 ? 1: currentpage-1; //need to pass 'currentpage'
		this_.set_tablecurrentpage(newcurrentpage);
		update_pageButtons();
		this_.render();
	});
	
	//tablefooterpagination middle pages
	var tablefooterpaginationbuttonsgroup = tablefooterpaginationtoolbar
		.selectAll('btn-group pages')
		.data([0]);
	var tablefooterpaginationbuttonsgroupenter = tablefooterpaginationbuttonsgroup.enter()
		.append("div")
		.attr('class','btn-group pages')
		.attr('id',id + 'btn-group-pages')
		.attr('role','group');
	tablefooterpaginationbuttonsgroup.transition()
		.attr('class','btn-group pages')
		.attr('class','btn-group pages')
		.attr('id',id + 'btn-group-pages')
		.attr('role','group');
	tablefooterpaginationbuttonsgroup.exit().remove();
	
	var tablefooterpaginationbuttons = tablefooterpaginationbuttonsgroup
		.selectAll("button")
// 		.data(pages);
		.data(get_pagesAndColors(npagesmax,this_.get_tablecurrentpage(),this_.get_tablelastpage()));
	tablefooterpaginationbuttons.exit().remove();
	tablefooterpaginationbuttons.transition()
		.attr("class","btn btn-default")
		.attr("type","button")
		.style("color",function(d){
		    if (d.color){
				return d.color;//"#ff0000"
			};
		})
		.text(function(d){
		    return d.value;
		    });
	var tablefooterpaginationbuttonsenter=tablefooterpaginationbuttons.enter()
		.append("button")
		.attr("class","btn btn-default")
		.attr("type","button")
		.style("color",function(d){
		    if (d.color){
				return d.color;//"#ff0000"
			};
		})
		.text(function(d){
		    return d.value;
		    });
	tablefooterpaginationbuttons.on("click",function(d){
		var newcurrentpage = parseFloat(this.textContent);
		this_.set_tablecurrentpage(newcurrentpage);
	    update_pageButtons();
		this_.render();
	});


	//tablefooterpagination right arrows
	var tablefooterpaginationrightarrows = tablefooterpaginationtoolbar
		.selectAll('.rightarrows').data([0]);
	tablefooterpaginationrightarrows.transition()
		.attr('class','btn-group rightarrows')
		.attr('role','group');
	tablefooterpaginationrightarrows.exit().remove();
	var tablefooterpaginationrightarrowsenter = tablefooterpaginationrightarrows.enter();
	tablefooterpaginationrightarrowsenter.append("div")
		.attr('class','btn-group rightarrows')
		.attr('role','group');

	var tablefooterpaginationnext = tablefooterpaginationrightarrows
		.selectAll('.glyphicon glyphicon-triangle-right')
		.data([0]);
	tablefooterpaginationnext.transition()
		.attr('class','glyphicon glyphicon-triangle-right')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","next page");
	tablefooterpaginationnext.exit().remove();
	var tablefooterpaginationnextenter = tablefooterpaginationnext.enter();
	tablefooterpaginationnextenter.append("div")
		.attr('class','glyphicon glyphicon-triangle-right')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","next page");
	tablefooterpaginationnext.on("click",function(d){
	    var curentpage = this_.get_tablecurrentpage();
	    var lastpage = this_.get_tablelastpage();
		var newcurrentpage = curentpage+1>lastpage ? lastpage: curentpage+1;//need to pass 'currentpage'
		this_.set_tablecurrentpage(newcurrentpage);
	    update_pageButtons();
		this_.render();
	});

	var tablefooterpaginationlast = tablefooterpaginationrightarrows
		.selectAll('.glyphicon glyphicon-step-forward')
		.data([0]);
	tablefooterpaginationlast.transition()
		.attr('class','glyphicon glyphicon-step-forward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","last page");
	tablefooterpaginationlast.exit().remove();
	var tablefooterpaginationlastenter = tablefooterpaginationlast.enter();
	tablefooterpaginationlastenter.append("div")
		.attr('class','glyphicon glyphicon-step-forward')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","last page");
	tablefooterpaginationlast.on("click",function(d){	    
	    var lastpage = this_.get_tablelastpage();
		this_.set_tablecurrentpage(lastpage);
	    update_pageButtons();
		this_.render();
	});	
};
d3_table.prototype.add_tablesearch2tablenavbar = function(){
    /* add the table search bar input

    */

// search
	//<div class="row">
//   <div class="col-lg-6">
// 	<label>Your vanity URL</label>
//     <div class="input-group">
//       <input type="text" class="form-control" placeholder="Search for...">
//         .append("div")
//         .attr("class","glyphicon glyphicon-search")
//         .attr("class","glyphicon glyphicon-open pull-right")
//         .attr("id", tileid + 'jsonimportbutton')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","search");
//     </div><!-- /input-group -->
//   </div><!-- /.col-lg-6 -->
// </div><!-- /.row -->
};
d3_table.prototype.set_tablenavbarelements = function (elements_I){
	/*
	Set the table navigation bar elements
	*/
	if (typeof(elements_I)!=="undefined"){
		this.tablenavbarelements = elements_I;
	} else {
		this.tablenavbarelements = ["rows","page","search"];
	};
};
d3_table.prototype.set_tablenavbar = function(){
    /*set the table navbar*/ 
    var id = this.id;
    var tileid = this.tileid;
	var tablenavbarelements = this.tablenavbarelements;

// 	this.tablenavbar = d3.select('#'+tileid+"panel-body")
    this.tablenavbar = this.tablenavbarelement
    	.selectAll("#"+id+"tablenavbar")
        .data([tablenavbarelements]);

	this.tablenavbar.exit().remove();
	this.tablenavbar.transition()
    	.attr("class","row")
    	.attr("id",id+"tablenavbar");
	this.tablenavbarenter = this.tablenavbar.enter()
    	.append("div")
    	.attr("class","row")
    	.attr("id",id+"tablenavbar");
};
d3_table.prototype.add_tablenavbar = function(){
    /*add the table navbar*/ 
    var id = this.id;
	var tablenavbarelements = this.tablenavbarelements;
	
	this.tablenavbarlabels = this.tablenavbar.selectAll("label")
        .data(tablenavbarelements);

	this.tablenavbarlabels.exit().remove();
	this.tablenavbarlabels.transition()
    	.text(function(d){return d;});
	this.tablenavbarlabelsenter = this.tablenavbarlabels.enter()
    	.append("div")
    	.attr("class","col-sm-4")
    	.attr("id",function(d){return id+"tablenavbarlabels"+d;})
    	.append("label")
    	.text(function(d){return d;});
};
d3_table.prototype.add_tablenavbar2tile = function(){
    // set the table
    var id = this.id;
    var tileid = this.tileid;
    var tableclass = this.tableclass;
    var listdatafiltered = this.data.listdatafiltered;
    var tableheaders = this.tableheaders;

    this.tablenavbarelement = d3.select('#'+tileid+"panel-body")
    	.selectAll(".tablenavbar-responsive")
        .data([listdatafiltered]);

    this.tablenavbarelemententer = this.tablenavbarelement.enter()
        .append("div")
        .attr("class","tablenavbar-responsive")
    this.tablenavbarelement.exit().remove();

};