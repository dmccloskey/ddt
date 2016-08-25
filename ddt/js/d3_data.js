"use strict";
//var d3_data = function () {
function d3_data() {
    //the data object class
    //to handle the filtering and manipulation
    //of listed key-value paired data
    //(e.g., from a database)


    this.keys = []; // list of columns that can be applied as nest keys and filters
    this.nestkey = []; // key to apply to nest
    this.filters = {}; // {key1:[string1,string2,...],...}
                       //NOTE: only string filters and string filtering is supported
                       //TODO: support filtering on boolean, numeric, date and time, and custom functions
    this.metadata = {}; // data about the data types and data attributes
                        // {key1:{datatype:"string",...},....}
    this.listdata = []; // data in database table form (must contain a column "used_");
    this.listdatafiltered = []; // data in database table form
    this.nestdatafiltered = []; // data in nested form
    this.cfdata = {}; //crossfilter object
    this.cffilters = {}; // filter objects
};
d3_data.prototype.add_nestkey = function(key_I){
    //closure to add additional nest keys within a loop
    return function(d){
        return d[key_I];
    };
}
d3_data.prototype.convert_list2nestlist = function (data_I,key_I,rollup_I) {
    // convert a list of objects to a d3 nest by a key
    // BUG: entries of null/''/undefined break the nest
    
    var add_nestkey = this.add_nestkey;
    var nesteddata_O = d3.nest();
    for (var i=0;i<key_I.length;i++){
        nesteddata_O = nesteddata_O.key(add_nestkey(key_I[i]));
    };
    if (typeof(rollup_I)!=="undefined"){
        nesteddata_O = nesteddata_O.rollup(rollup_I);
    };
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
d3_data.prototype.add_usedkey2listdata = function (){
    /* add used_ key to listdata
    should be done once to ensure that there is a 'used_' key
    DEPRECATED
    */
    
    //set _used to false:
    for (var i = 0; i < this.listdata.length; i++) {
        if (typeof(this.listdata[i]["used_"])==="undefined"){
            this.listdata[i]['used_'] = true;
        };
    };
};
d3_data.prototype.add_indexkey2listdata = function (){
    /* add index_ key to listdata
    should be done once to ensure that there is a 'index_' key
    DEPRECATED
    */
    
    //set _used to false:
    for (var i = 0; i < this.listdata.length; i++) {
        if (typeof(this.listdata[i]["index_"])==="undefined"){
            this.listdata[i]['index_'] = i;
        };
    };
};
d3_data.prototype.check_listdata = function (){
    /* check each row of the list data
    1. add index_ key to listdata
    2. add used_ key to listdata
    3. replace any null values
    */
    
    for (var i = 0; i < this.listdata.length; i++) {
        if (typeof(this.listdata[i]["index_"])==="undefined"){
            this.listdata[i]['index_'] = i;
        };
        if (typeof(this.listdata[i]["used_"])==="undefined"){
            this.listdata[i]['used_'] = true;
        };
        for (var key in this.listdata[i]){
            if (this.listdata[i][key]===null){
                this.listdata[i][key]='';
            } else if (typeof(this.listdata[i][key])==="number" && isNaN(this.listdata[i][key])){
                this.listdata[i][key]=undefined;                
            };
        };
    };
};
d3_data.prototype.reset_usedkey = function (){
    /* reset used_ to true on listdata
    TODO_CF: may not be needed
    */
    
    //set _used to false:
    for (var i = 0; i < this.listdata.length; i++) {
        this.listdata[i]['used_'] = true;
    };
};
d3_data.prototype.add_keysandvalues2listdata = function (key_values_I){
    /* add a new key and default value to list data
    INPUT:
    key_values_I = {"key":"value",...}
    TODO_CF: will break...
    */
    
    for (var i = 0; i < this.listdata.length; i++) {
        for (var key in key_values_I){
            if (typeof(this.listdata[i][key])==="undefined"){
                this.listdata[i][key] = key_values_I[key];
            };
        };
    };
};
d3_data.prototype.remove_keysfromlistdata = function (key_I){
    /* remove a key from list data
    INPUT:
    key_I = string
    TODO_CF: will break...
    */
    
    for (var i = 0; i < this.listdata.length; i++) {
        for(var k in key_I){
            delete this.listdata[i][k];
        };
    };
};
d3_data.prototype.filter_listdata = function () {
    // apply filters to list data for the following data types:
    // 1. string
    // 2. boolean
    // 3. numeric
    // 4. date and time
    // 5. custom function

    // clear listdatafiltered and nestdatafiltered
    this.listdatafiltered = [];
    this.nestdatafiltered = [];

    // apply each filter based on the data type
    // TODO filter based on datatype
    this.filter_stringdata();

    // remake nestdatafiltered
    this.nestdatafiltered = this.convert_list2nestlist(this.listdatafiltered,this.nestkey);

    // update the filters
    if (this.listdatafiltered.length!==0){
        this.update_filters();
        };
};
d3_data.prototype.filter_stringdata = function () {
    // apply filters to listdata


    /* generate a cross filter for each key in keys
    */

    //SPLIT 2
    var filters = this.filters;
    for (var filter in filters) {
        //this.cffilters[filter].filter(this.filters[filter]);
        this.cffilters[filter].filter(function(d){
            if (typeof(d)!=="undefined"){
                var value = d.toString();
                var index = filters[filter].indexOf(value);
                return index > -1
            };
        });
    };
    this.set_listdatafiltered(); 

//     //SPLIT 1
//     // NOTE: changes made to listdatacopy are applied to this.listdata
//     var listdatacopy = this.listdata;
//     var listdatafiltered_O = this.listdatafiltered;

//     //pass each row through the filter
//     for (var i = 0; i < listdatacopy.length; i++) {
//         for (var filter in this.filters) {
//             //console.log(filter);
//             if (typeof listdatacopy[i][filter] !== "undefined"){
//                 if (listdatacopy[i][filter]){
//                     var str_compare = listdatacopy[i][filter].toString(); //ensure that the value is a string
//                     var lst_filters = [];
//                     this.filters[filter].forEach(function(d){
//                         var str_d = '^';
//                         str_d += escapeRegExp(d);
//                         str_d += '$';
//                         lst_filters.push(str_d);
//                     });
//                     var str_filter = lst_filters.join('|');
//                     //NOTES: need to check for an array (arrays will break)
//                     if (!str_compare.match(str_filter)) {
//                         listdatacopy[i]['used_'] = false;
//                     };
//                 };
//             };
//         };
//     };

//     // add in the filtered data
//     listdatacopy.forEach(function (d) {
//         if (d['used_']) {
//             listdatafiltered_O.push(d)
//         };
//     });
};
d3_data.prototype.set_metadata = function (metadata_I) {
    /* set metadata
    INPUT:
    metadata_I = dict of objects
    */
    //var keys = this.keys;
    var keys = [];
    for (var k in this.listdata[0]){keys.push(k)};

    if (typeof(metadata_I)!=='undefined'){
        var metadata = metadata_I;
    } else {
        var metadata = {};
        keys.forEach(function(d){metadata[d]={'datatype':'string'};});
    }

    this.metadata = metadata;
};
d3_data.prototype.set_listdata = function (listdata_I,nestkey_I) {
    // set list data and initialize filtered data
    this.nestkey = nestkey_I;
    this.listdata = listdata_I;
    this.check_listdata();
    this.set_crossFilterData();
    this.set_crossFilterFilters();
    this.set_listdatafiltered();
    //this.listdatafiltered = listdata_I;
    this.set_nestdatafiltered();
    //this.nestdatafiltered = this.convert_list2nestlist(listdata_I,this.nestkey);
};
d3_data.prototype.set_keys = function (keys_I) {
    /* set the keys
    INPUT:
    keys_I = list of strings
    */
    this.keys = keys_I;
};
d3_data.prototype.set_nestkeys = function (nestkeys_I) {
    /* set the keys
    INPUT:
    nestkeys_I = list of strings
    */
    this.nestkey = nestkeys_I;
};
d3_data.prototype.add_keys = function (keys_I) {
    // add keys
    //INPUT:
    //keys_I = list of strings
    for (var i=0;i<keys_I.length;i++){
        var newkey = keys_I[i]; //should ensure that the key is a string
        this.keys.push(newkey);
    };
};
d3_data.prototype.remove_keys = function (keys_I) {
    // remove keys
    //INPUT:
    //keys_I = list of strings
    for (var i=0;i<keys_I.length;i++){
        var removekey = keys_I[i]; //should ensure that the key is a string
        this.keys.pop(removekey);
    };
};
d3_data.prototype.reset_filters = function () {
    // generate the initial filter

    var filters = {};
    for (var key_cnt = 0; key_cnt < this.keys.length;key_cnt++) {
        var colentries = d3.set();
        for (var i = 0; i < this.listdata.length; i++) {
            colentries.add(this.listdata[i][this.keys[key_cnt]]);
        };
        filters[this.keys[key_cnt]] = colentries.values();
    };
    this.filters = filters;
};
d3_data.prototype.update_filters = function () {
    // update the filter based on the current filtered data

    var filters = {};
    for (var key_cnt = 0; key_cnt < this.keys.length;key_cnt++) {
        var colentries = d3.set();
        for (var i = 0; i < this.listdatafiltered.length; i++) {
            colentries.add(this.listdatafiltered[i][this.keys[key_cnt]]);
        };
        filters[this.keys[key_cnt]] = colentries.values();
    };
    this.filters = filters;
};
d3_data.prototype.change_filters = function (filter_I) {
    // modify the filter according to the new filter
    // Behavior: 
    // 1. update existing filters
    // 2. add in new filters if they do not exist
    
    for (var key in filter_I) {
        this.filters[key] = filter_I[key];
    };
};
d3_data.prototype.change_filtersinkeys = function (filter_I) {
    /* modify the filter according to the new filter
    Behavior:
    1. update existing filters that are in the keys
    */
    
    for (var key in filter_I) {
        if (Object.keys(this.filters).indexOf(key) > -1){
            this.filters[key] = filter_I[key];
        };
    };
};
d3_data.prototype.convert_filter2stringmenuinput = function(filters_I){
    /* convert filter list to filter string list
    OPTIONAL INPUT: 
    filters_I = [], specific list of keys to convert
    */

    if (typeof(filters_I)!=='undefined'){
        var filters = filters_I
    } else {
        var filters = Object.keys(this.filters);
    };
    var filterstring = [];
    for (var i=0; i<filters.length; i++){
        var key = filters[i];
        filterstring.push({"labeltext":key,"inputvalue":this.filters[key].toString()});
        };
    return filterstring;
};
d3_data.prototype.convert_stringmenuinput2filter = function(filterstring_I){
    // convert filter list to filter string list
    var filtermap = {};
    for (var i=0;i<filterstring_I.length;i++){
        //this.filters[filterstring_I[i].text]=filterstring_I[i].value.split(",");
        filtermap[filterstring_I[i].labeltext]=filterstring_I[i].inputvalue.split(",");
    };
    //this.change_filters(filtermap) //can lead to adding in filters unintentionally
    this.change_filtersinkeys(filtermap)
};
d3_data.prototype.change_nestkeys = function(nestkey_I) {
    // change the nest keys and update nestdatafiltered
    this.nestkey = nestkey_I;
    var listdatafiltered = this.listdatafiltered;
    this.nestdatafiltered = this.convert_list2nestlist(listdatafiltered,nestkey_I);
};
d3_data.prototype.convert_listdatafiltered2escherobjectlist = function(key_I,values_I){
    // convert list data to escher object
    // i.e. convert [{key_I:data,value_I:data},{key_I:data,value_I:data},{key_I:data,value_I:data},...]
    //      to [{key_I_data:value_I_data,key_I_data:value_I_data,...}]
    
    //var escherobjectlist_O = [];
    var escherobject = {};
    this.listdatafiltered.forEach(function(d){
        escherobject[d[key_I]]=d[values_I];
    });
    //escherobjectlist_O.push(escherobject);
    //return escherobjectlist_O;
    return escherobject;
};
d3_data.prototype.remove_filtereddata = function(){
    // remove unfiltered data
    this.listdata = this.listdatafiltered;
};
d3_data.prototype.get_datajson = function(filtereddataonly_I){
    // get the data in json format for re-input

    if (typeof filtereddataonly_I === "undefined"){
        var filtereddataonly = false;
    } else {
        var filtereddataonly = filtereddataonly_I;
    };

    var keys_O = this.keys;
    var nestkeys_O = this.nestkey;
    var metadata_O = this.metadata;

    if (filtereddataonly){
        var data_O = this.listdatafiltered;
    } else {
        var data_O = this.listdata;
    }

    var datajson_O = {'datakeys':keys_O,
                    'datanestkeys':nestkeys_O,
                    'data':data_O,
                    'metadata':metadata_O};

    return datajson_O;
};
//additional functions
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
d3_data.prototype.clear_data = function () {
    // clear list data
    this.listdata = [];
    this.listdatafiltered = [];
    this.nestdatafiltered = [];
    this.cfdata = {};
    this.cffilters = {};
    this.nestkey = [];
    this.keys = [];
    this.metadata = {};
};
d3_data.prototype.get_listdata = function(){
    // retrieve rows from listdata
    return this.listdata;
};
d3_data.prototype.get_listdatafiltered = function(){
    // retrieve filtered rows from listdatafiltered
    return this.listdatafiltered;
};
d3_data.prototype.get_nestdatafiltered = function(){
    // retrieve filtered rows from nestdatafiltered
    return this.nestdatafiltered;
};
d3_data.prototype.get_metadata = function () {
    // return metadata
    return this.metadata;
};
d3_data.prototype.update_listdata = function(key_values_I,index__I){
    /* update rows in listdata that are used_
    INPUT:
    key_values_I = {"key":"new value",...};
    OPTIONAL INPUT:
    index__I = int, 
    */
    
	if (typeof(index__I)!=="undefined"){
	    var index_ = index__I;
	} else {
	    var index_ = null;
	};

    for (var i = 0; i < this.listdata.length; i++) {
        if (index_!==null){//need to specify !==null or 0 integers will be considered false
            if (this.listdata[i]["used_"] 
                && this.listdata[i]["index_"]===index_){ //apply update to filtered data
                for (var key in key_values_I){
                    if (typeof(this.listdata[i][key])!=="undefined"){ //do not add in new keys not presents
                        this.listdata[i][key] = key_values_I[key];
                    };
                };
            };
        } else{
            if (this.listdata[i]["used_"]){ //apply update to filtered data
                for (var key in key_values_I){
                    if (typeof(this.listdata[i][key])!=="undefined"){ //do not add in new keys not presents
                        this.listdata[i][key] = key_values_I[key];
                    };
                };
            };
        };
    };    
};
d3_data.prototype.add_listdata = function(data_row_I){
    // add rows to listdata
    //INPUT:
    //data_row_I = [{}] of data to add

    var listdatakeys = Object.keys(this.listdata[0]);
    var listdata_O = this.listdata;

    data_row_I.forEach(function(d){
        //ensure each row has all keys
        var newdata = {};
        for (var key in listdatakeys){
            if(typeof(d[key]==="undefined")){
                newdata[key]=null;
            } else {
                newdata[key] = d[key];
            };
        };
        listdata_O.push(newdata);
    });
};
d3_data.prototype.remove_elementFromFiltersByKey = function(key_I,element_I){
    // remove element from filters
    // INPUT:
    // key_I = filter key
    // element_I = filter element
    var index = this.filters[key_I].indexOf(element_I);
    if (index > -1) {
        this.filters[key_I].splice(index, 1);
    };
};
d3_data.prototype.add_element2FiltersByKey = function(key_I,element_I){
    // add element to filters
    // INPUT:
    // key_I = filter key
    // element_I = filter element
    this.filters[key_I].push(element_I);
};
d3_data.prototype.remove_listdata = function(){
    // remove rows from listdata

    //make a new listdata
    var listdata_O = [];
    this.listdatafiltered.forEach(function(d){
        listdata_O.push(d);
    });
    this.listdata = listdata_O;
};
d3_data.prototype.group_listdatafiltered = function(groups_I){
    // group list data
    // INPUT:
    // groups_I = list of keys 
    // OUTPUT:
    // group_O = grouped list data
    // TODO:
    // broken...

    var listdatafiltered = this.listdatafiltered;
    var group_set = new Set();
    for (var i=0; i<listdatafiltered.length; i++){
        var tmp = {};
        for (var j=0; j<groups_I.length; j++){
            tmp[groups_I[j]]=listdatafiltered[i][groups_I[j]];
        };
        group_set.add(tmp);
    };
    var group_O = Array.from(group_set.entries());
    return group_O;
};
d3_data.prototype.get_uniquevaluesFromlistdata = function(key_I){
    // get unique values
    // INPUT:
    // key_I = column key to extract 
    // OUTPUT:
    // uniquevalues_O = array of unique values
    // TODO:
    // broken...

    var listdata = this.listdata;
    var uniquevalues_set = new Set();
    for (var i=0; i<listdata.length; i++){
        var tmp = listdata[i][key_I];
        uniquevalues_set.add(tmp);
    };
    var uniquevalues_O = Array.from(uniquevalues_set.values());
    return uniquevalues_O;
};
d3_data.prototype.get_uniquevaluesFromlistdatafiltered = function(key_I){
    // get unique values
    // INPUT:
    // key_I = column key to extract 
    // OUTPUT:
    // uniquevalues_O = array of unique values
    // TODO:
    // broken...

    var listdatafiltered = this.listdatafiltered;
    var uniquevalues_set = new Set();
    for (var i=0; i<listdatafiltered.length; i++){
        var tmp = listdatafiltered[i][key_I];
        uniquevalues_set.add(tmp);
    };
    var uniquevalues_O = Array.from(uniquevalues_set.values());
    return uniquevalues_O;
};
d3_data.prototype.order_filters = function(order_I){
    /* group list data
    INPUT:
    order_I = [{key:direction},...] e.g. [{'analysis_id':'asc'}]
          where direction = 'asc' ascending
                          = 'desc' descending
    */

    var filters = this.filters;

    function sortproperty_asc() {
        return function(a,b) {
            if (typeof a === "number") {
                return (a - b);
            } else {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            }
        };
    };
    function sortproperty_desc() {
        return function(a,b) {
            if (typeof a === "number") {
                return (b - a);
            } else {
                return ((b < a) ? -1 : ((b > a) ? 1 : 0));
            }
        };
    };
    order_I.forEach(function(d){
        for (var key in d){
            if (d[key]==='asc'){
                filters[key].sort(sortproperty_asc());
            } else if (d[key]==='desc'){
                filters[key].sort(sortproperty_desc());         
            };
        };
    });
};
d3_data.prototype.order_listdatafiltered = function(order_I){
    /* group list data
    INPUT:
    order_I = [{key:direction},...] e.g. [{'analysis_id':'asc'}]
          where direction = 'asc' ascending
                          = 'desc' descending
    */

    var listdatafiltered =this.listdatafiltered;

    function sortproperty_asc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (a[prop] - b[prop]);
            } else {
                return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
            }
        };
    };
    function sortproperty_desc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (b[prop] - a[prop]);
            } else {
                return ((b[prop] < a[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0));
            }
        };
    };
    order_I.forEach(function(d){
        for (var key in d){
            if (d[key]==='asc'){
                listdatafiltered.sort(sortproperty_asc(key));
            } else if (d[key]==='desc'){
                listdatafiltered.sort(sortproperty_desc(key));         
            };
        };
    });
};
d3_data.prototype.order_nestdatafiltered = function(order_I){
    /* group list data
    INPUT:
    order_I = [{key:direction},...] e.g. [{'analysis_id':'asc'}]
          where direction = 'asc' ascending
                          = 'desc' descending
    */

    var nestdatafiltered =this.nestdatafiltered;

    function sortproperty_asc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (a[prop] - b[prop]);
            } else {
                return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
            }
        };
    };
    function sortproperty_desc(prop) {
        return function(a,b) {
            if (typeof a[prop] === "number") {
                return (b[prop] - a[prop]);
            } else {
                return ((b[prop] < a[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0));
            }
        };
    };
    order_I.forEach(function(d){
        for (var key in d){
            if (d[key]==='asc'){
                nestdatafiltered.sort(sortproperty_asc(key));
            } else if (d[key]==='desc'){
                nestdatafiltered.sort(sortproperty_desc(key));         
            };
        };
    });
};
d3_data.prototype.convert_filter2forminput = function(filters_I){
    /* convert filter list to form input based on the type of the filter elements
    OPTIONAL INPUT:
    filters_I = [], specific list of keys to convert
    PRIMITIVE DATA TYPES:
    Boolean
    Null
    Undefined
    Number
    String
    Object:
        Date() (see https://msdn.microsoft.com/en-us/library/ff743760(v=vs.94).aspx
                for details of converting from string to date and from date to string)

    */

    if (typeof(filters_I)!=='undefined'){
        var filters = filters_I
    } else {
        var filters = Object.keys(this.filters);
    };

    //default values
    var inputrows = '5';
    var textarea_length = 50;

    var forminput = [];
    for (var i=0; i<filters.length; i++){
        var key = filters[i];
        var forminputrow = {};
        forminputrow['labeltext']=key;
        forminputrow['inputvalue']=this.filters[key].toString();
        //forminputrow['inputvalue']=this.filters[key];
        if (typeof(this.filters[key][0])==='number'){
            forminputrow['inputtype'] = 'range';
            var inputmin = Math.min(this.filters[key]);
            var inputmax = Math.max(this.filters[key]);
            var input = [];
            this.filters[key].forEach(function(d){
                input.push({'inputtype':'range',
                            'inputtext':d,
                            'inputvalue':d,
                            'inputmin':inputmin,
                            'inputmax':inputmax,    
                });
            });
            forminputrow['input']=input;
        } else if (typeof(this.filters[key][0])==='string' && this.filters[key].length === 1 && this.filters[key][0].length > textarea_length){
            forminputrow['inputtype'] = 'textarea';
            var input = [];
            this.filters[key].forEach(function(d){
                input.push({'inputtype':'textarea',
                            'inputtext':d,
                            'inputvalue':d,
                            'inputrows':inputrows,   
                });
            });
            forminputrow['input']=input; 
        } else if (typeof(this.filters[key][0])==='string' && this.filters[key].length === 1 && this.filters[key][0].length === 1){
            forminputrow['inputtype'] = 'text';
            var input = [];
            this.filters[key].forEach(function(d){
                input.push({'inputtype':'text',
                            'inputtext':d,
                            'inputvalue':d,  
                });
            });
            forminputrow['input']=input; 
//         } else if (typeof(this.filters[key][0])==='string' && this.filters[key].length === 1 && this.filters[key][0].length <= textarea_length){
//             forminputrow['inputtype'] = 'text';
//             var input = [];
//             this.filters[key].forEach(function(d){
//                 input.push({'inputtype':'text',
//                             'inputtext':d,
//                             'inputvalue':d,  
//                 });
//             });
//             forminputrow['input']=input; 
        } else if (typeof(this.filters[key][0])==='string'){
            forminputrow['inputtype'] = 'checkbox';
            var input = [];
            this.filters[key].forEach(function(d){
                input.push({'inputtype':'checkbox',
                            'inputtext':d,
                            'inputvalue':d,  
                });
            });
            forminputrow['input']=input;
        } else if (typeof(this.filters[key][0])==='boolean'){
            forminputrow['inputtype'] = 'radio';
            var input = [];
            this.filters[key].forEach(function(d){
                input.push({'inputtype':'radio',
                            'inputtext':d,
                            'inputvalue':d,  
                });
            });
            forminputrow['input']=input; 
        } else {
            console.log('filter data type not recognized.')
            forminputrow['inputtype'] = 'text';
            var input = [];
            input.push({'inputtype':'text',
                        'inputtext':key,
                        'inputvalue':this.filters[key].toString(),  
            });
            forminputrow['input']=input; 
        }
        forminput.push(forminputrow);
        };
    return forminput;
};
d3_data.prototype.make_httprequest_listdata = function(method_I,url_I,async_I){
    /*get listdata or post listdata using ajax
    e.g., updating or streaming data
    INPUT:
    method_I = "GET" or "POST"
    url_I = base url string
    async_I = boolean, default=true (asynchronous)
    */

    //onreadystatechange (todo: update the listdata)
    function alertContents() {
      try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            alert(httpRequest.responseText);
          } else {
            alert('There was a problem with the request.');
          };
        };
      }
      catch( e ) {
        alert('Caught Exception: ' + e.description);
      };
    };

//     //get the filter menu data
//     var filterstringmenu = this.data.convert_filter2forminput();

    //get the data
    var listdatafiltered = this.get_listdatafiltered();
    var jsondatastr = JSON.stringify(listdatafiltered)
    
    // construct the HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open(method_I,url_I);
    httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    // send the collected data as JSON
    httpRequest.send(jsondatastr);
};
d3_data.prototype.make_httprequest_d3data = function (method_I,url_I,async_I){
    /*get or post d3data using ajax
    INPUT:
    method_I = "GET" or "POST"
    url_I = base url string
    async_I = boolean, default=true (asynchronous)
    */

    //get the data
    var jsondata = this.get_datajson();
    var jsondatastr = JSON.stringify(data)
};
d3_data.prototype.set_d3data = function(data_I){
    /*set the d3 data object
    INPUT:
    data_I = {}
    where {
        'datakeys':keys_I,
        'datanestkeys':nestkeys_I,
        'data':data_I
        'metadata':metadata_I
        };
    */

    this.set_keys(data_I.datakeys);
    this.set_nestkeys(data_I.datanestkeys);
    this.set_listdata(data_I.data,data_I.datanestkeys);
//     this.add_usedkey2listdata(); //ensure a used_ key in each data object
//     this.add_indexkey2listdata(); //ensure a index_ key in each data object
    this.set_metadata(data_I.metadata);
    this.reset_filters();
};
d3_data.prototype.set_crossFilterData = function(){
    /*set the cross filter data object
    BEHAVIOR:
    this.cfdata points to this.listdata in memory
    changes made to this.listdata affect this.cfdata and viceversa
    */

    this.cfdata = crossfilter(this.listdata);
};
d3_data.prototype.set_crossFilterFilters = function(){
    /*set the cross filter filters
    BEHAVIOR:
    this.listdatafiltered points to the updated this.cffilters filter
    */
    var cfdata = this.cfdata;
    var cffilters = {};
    //make crossfilter filters for keys
    this.keys.forEach(function(k){
        cffilters[k]=cfdata.dimension(function(d){
            return d[k]})
            });
    //make crossfilter filters for used_ and index_
    var filters = ['used_','index_'];
    filters.forEach(function(k){
        cffilters[k]=cfdata.dimension(function(d){
            return d[k]})
            });
    //return 
    this.cffilters = cffilters;
};
d3_data.prototype.set_listdatafiltered = function(order_I){
    /*set the view of the filtered list data
    INPUT:
    order_I = [{key:direction},...] e.g. [{'analysis_id':'asc'}]
          where direction = 'asc' ascending
                          = 'desc' descending
    BEHAVIOR:
    this.listdatafiltered points to the updated this.cffilters filter
    */

    if (typeof(order_I)!=="undefined"){
        var order = order_I;
    } else {
        var order = [{'index_':"asc"}];        
    };
    var order_key = Object.keys(order[0])[0];
    var order_sort = order[0][order_key];

    //store the view of the latest filtered data
    if (order_sort === 'desc'){
        this.listdatafiltered = this.cffilters[order_key].top(Infinity);
    } else if (order_sort === 'asc'){
        this.listdatafiltered = this.cffilters[order_key].bottom(Infinity);
    };
};
d3_data.prototype.set_nestdatafiltered = function(){
    /*set the view of the filtered list data in nest form
    BEHAVIOR:
    this.listdatafiltered points to the updated this.cffilters filter
    */
    //store the view of the latest filtered data
    this.nestdatafiltered = this.convert_list2nestlist(this.listdatafiltered,this.nestkey);
};
d3_data.prototype.format_keyvalues2namechildren = function(lastchild_I){
    // format nest key/values to name/children for use with layouts and clusters
    function rename(d){
        if (d.key){
            d['name']=d.key;
            delete d.key;
        } else {
            var lastchild = d[lastchild_I];
            for(var key in d){delete d[key];}; //remove all object properties
                                           //needed for proper rendering of data for d3 layouts
            d['name']=lastchild;
            //test
            d['size']=1;
        };
        if (d.values){
            d['children'] = d.values;
            d['children'].forEach(rename);
            delete d.values;
        };
    };
    //this.nestdatafiltered.forEach(rename);
    //var nestdatafiltered = this.nestdatafiltered.slice();
    var nestdatafiltered = jQuery.extend(true, [], this.nestdatafiltered);
    nestdatafiltered.forEach(rename);
    this.nestdatafiltered = nestdatafiltered;
};
d3_data.prototype.convert_date2Number = function(date_I){
    /*Convert date 2 number*/
    var date = new Date(date_I);
    var num = date.valueOf();
    return num*1e-6;
};
d3_data.prototype.convert_number2Date = function(num_I){
    /*Convert number 2 date*/
    var num = new Date(num_I*1e6);
    var date = num.toDateString();
    return date;
};
d3_data.prototype.get_metadata_datatype = function(key_I){
    /*Get metadata data type*/
    var datatype = this.metadata[key_I]['datatype'];
    return datatype;
};
d3_data.prototype.checkAndConvert_DateType = function(key_I,value_I){
    /*
    return a float version of a Date if in string format
    or return a string version of aDate if in number format
    or return the original value if the key is not a Date type
    INPUT:
    key_I = string
    value_I = string or number
    */
    var value = value_I;
    var datatype = this.get_metadata_datatype(key_I);
    if (datatype==="Date" && typeof(value_I)===typeof("")){
        var value = this.convert_date2Number(value_I);
    } else if (datatype==="Date" && typeof(value_I)===typeof(0.0)){
        var value = this.convert_number2Date(value_I);
    };
    return value;
};