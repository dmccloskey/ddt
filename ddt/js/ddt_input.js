"use strict";
function ddt_input() {
    // parse and validate input data
    this.parameters=null;
    this.data=null;
    this.tile2datamap=null;
    this.filtermenu=null;
};
ddt_input.prototype.set_ddtdatajson = function(ddtdatajson_I){
    // parse out ddt_data in string format
    if (typeof ddtdatajson_I.parameters !== undefined){
        this.parameters = ddtdatajson_I.parameters
    } else {
        this.parameters = null;
    };
    if (typeof ddtdatajson_I.data !== undefined){
        this.data = ddtdatajson_I.data
    } else {
        this.data = null;
    };
    if (typeof ddtdatajson_I.tile2datamap !== undefined){
        this.tile2datamap = ddtdatajson_I.tile2datamap
    } else {
        this.tile2datamap = null;
    };
    if (typeof ddtdatajson_I.filtermenu !== undefined){
        this.filtermenu = ddtdatajson_I.filtermenu
    } else {
        this.filtermenu = null;
    };

};