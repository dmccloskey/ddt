d3_svg = function () {
    // generic chart
    this.id = '';
    this.tileid = '';
    this.svgelement = null;
    this.svgg = null;
    this.margin = {};
    this.width = 1;
    this.height = 1;
};
d3_svg.prototype.set_tileid = function (tileid_I) {
    // set svg tile id
    this.tileid = tileid_I;
};
d3_svg.prototype.set_id = function (id_I) {
    // set svg id
    this.id = id_I;
};
d3_svg.prototype.set_margin = function (margin_I) {
    // set margin properties
    this.margin = margin_I;
};
d3_svg.prototype.set_width = function (width_I) {
    // set width properties
    this.width = width_I;
};
d3_svg.prototype.set_height = function (height_I) {
    // set height properties
    this.height = height_I;
};
d3_svg.prototype.add_svgelement2tile = function () {
    // add svg element to parent tile

    this.svgelement = d3.select('#'+this.tileid)
        .append("svg").attr("id",this.id);

    this.svgelement.attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    this.svgg = this.svgelement
        .append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

};
d3_svg.prototype.add_svgexportbutton2tile = function () {
    // add button to export the svg element
    var svgexportbutton = d3.select('#'+this.tileid).append("form");

    var svgexportbutton_label = svgexportbutton.append("label");
    svgexportbutton_label.text("Export as SVG");

    var svgexportbutton_input = svgexportbutton.append("input");
    svgexportbutton_input.attr("type", "button")
        .attr("value", "Download");
    svgexportbutton_input.on("click", this.export_svgelement);

};
d3_svg.prototype.export_svgelement = function () {
    // export the svg element

    //Input:
    // do_beautify = boolean (requires beautify plugin)

    var do_beautify_I = true;
    var a = document.createElement('a'), xml, ev;
    var id = this.id;
    a.download = 'figure' + '.svg'; // file name
    // convert node to xml string
    //xml = (new XMLSerializer()).serializeToString(d3.select(svg_sel).node()); //div element interferes with reading the svg file in illustrator/pdf/inkscape
    //xml = (new XMLSerializer()).serializeToString(this.svgelement[0][0]);
    var form = d3.select(this.parentNode);
    var tile = form.node().parentNode;
    // find the index of the svg element
    var svgid = null;
    for (i = 0; i < tile.children.length; i++) {
        if (tile.children[i].nodeName === 'svg') {
            svgid = i;};
    };
    xml = (new XMLSerializer()).serializeToString(tile.children[svgid]);
    if (do_beautify_I) xml = vkbeautify.xml(xml);
    xml = '<?xml version="1.0" encoding="utf-8"?>\n \
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n \
        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + xml;
    a.setAttribute("href-lang", "image/svg+xml");
    a.href = 'data:image/svg+xml;base64,' + utf8_to_b64(xml); // create data uri
    // <a> constructed, simulate mouse click on it
    ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);

    // definitions
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
};
d3_svg.prototype.add_datalist2tile = function (datalist_valuetext_I) {
    // add datalist (menu) for input

    var tileid = this.tileid;

    var datalist = d3.select('#'+this.tileid).append("select")
        .attr("id", tileid + 'datalist');

    for (i=0;i<datalist_valuetext_I.length;i++){
        datalist.append("option")
            .attr("value",datalist_valuetext_I[i].value)
            .text(datalist_valuetext_I[i].text);
    };

};