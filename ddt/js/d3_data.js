var d3_data = function () {
    //data function
    this.keys = []; // list of columns that can be applied as nest keys and filters
    this.nestkey = ''; // key to apply to nest
    this.filters = {}; // {key1:[string1,string2,...],...}
    this.listdata = []; // data in database table form (must contain a column "_used");
    this.listdatafiltered = []; // data in database table form
    this.nestdatafiltered = []; // data in nested form
};
d3_data.prototype.add_nestkey = function(key_I){
    //closure to add additional nest keys within a loop
    return function(d){
        return d[key_I];
    };
}
d3_data.prototype.convert_list2nestlist = function (data_I,key_I,rollup_I) {
    // convert a list of objects to a d3 nest by a key
    var add_nestkey = this.add_nestkey;
    var nesteddata_O = d3.nest();
    for (i=0;i<key_I.length;i++){
        nesteddata_O = nesteddata_O.key(add_nestkey(key_I[i]));
    };
    if (rollup_I){nesteddata_O = nesteddata_O.rollup(rollup_I)};
    nesteddata_O = nesteddata_O.entries(data_I);
    return nesteddata_O;
};
d3_data.prototype.convert_list2nestmap = function (data_I,key_I) {
    // convert a list of objects to a d3 nest by a key
    var nesteddata_O = d3.nest()
        .key(function (d) { return d[key_I]; })
        //.rollup()
        .map(data_I);
    return nesteddata_O;
};
d3_data.prototype.filter_stringdata = function () {
    // apply filters to listdata

    var listdatacopy = this.listdata;
    var listdatafiltered_O = [];
    
    //set _used to false:
    for (i = 0; i < listdatacopy.length; i++) {
        listdatacopy[i]['used_'] = true;
    };

    //pass each row through the filter
    for (i = 0; i < listdatacopy.length; i++) {
        for (filter in this.filters) {
            //console.log(filter);
            var str_compare = listdatacopy[i][filter].toString(); //ensure that the value is a string
            if (!str_compare.match(this.filters[filter].join('|'))) {
                listdatacopy[i]['used_'] = false;
            };
        };
    };

    // add in the filtered data
    listdatacopy.forEach(function (d) {
        if (d['used_']) {
            listdatafiltered_O.push(d)
        };
    });

    // re-make the nestdatafiltered
    this.listdatafiltered = listdatafiltered_O;
    this.nestdatafiltered = this.convert_list2nestlist(listdatafiltered_O,this.nestkey);
};
d3_data.prototype.set_listdata = function (listdata_I,nestkey_I) {
    // set list data and initialize filtered data
    this.nestkey = nestkey_I;
    this.listdata = listdata_I;
    this.listdatafiltered = listdata_I;
    this.nestdatafiltered = this.convert_list2nestlist(listdata_I,this.nestkey);
};
d3_data.prototype.set_keys = function (keys_I) {
    // add list data
    this.keys = keys_I;
};
d3_data.prototype.reset_filters = function () {
    // generate the initial filter

    var filters = {};
    for (key_cnt = 0; key_cnt < this.keys.length;key_cnt++) {
        var colentries = d3.set();
        for (i = 0; i < this.listdata.length; i++) {
            colentries.add(this.listdata[i][this.keys[key_cnt]]);
        };
        filters[this.keys[key_cnt]] = colentries.values();
    };
    this.filters = filters;
};
d3_data.prototype.clear_data = function () {
    // add list data
    this.listdata = [];
    this.listdatafiltered = [];
    this.nestdatafiltered = [];
};
d3_data.prototype.change_filters = function (filter_I) {
    // modify the filter according to the new filter
    
    for (key in filter_I) {
        this.filters[key] = filter_I[key];
    };
};
d3_data.prototype.format_keyvalues2namechildren = function(lastchild_I){
    // format nest key/values to name/children for use with layouts and clusters
    function rename(d){
        if (d.key){
            d['name']=d.key;
            delete d.key;
        } else {
            lastchild = d[lastchild_I];
            for(key in d){delete d[key];}; //remove all object properties
                                           //needed for proper rendering of data for d3 layouts
            d['name']=lastchild;
        };
        if (d.values){
            d['children'] = d.values;
            d['children'].forEach(rename);
            delete d.values;
        };
    };
    this.nestdatafiltered.forEach(rename)
};