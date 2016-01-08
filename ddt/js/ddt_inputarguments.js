"use strict";
class ddt_inputarguments{
    // generic html element
    constructor (){
        this.node=null;
        this.inputarguments={};
    };
    set node (node_I) { this.node = node_I}
    get node () { return this.node}
    set inputarguments (inputarguments_I) { this.inputarguments = inputarguments_I}
    get inputarguments () { return this.inputarguments}
};
ddt_inputarguments.prototype.set_node = function(node_I,node_id_I){
    //set the node

    //extract out the node
    if (typeof(node_I)!=="undefined"){
        this.node = node_I;
    } else if (typeof(node_id_I)!=="undefined"){
        this.node = d3.select(node_id_I);
    } else {
        this.node = null;
        console.log("node not defined.");
    };
    //validate the node
    if (typeof(node)==="undefined" || !node){
        this.node = null;
        console.log("node not found.");        
    };
};
ddt_inputarguments.prototype.get_node = function(){
    // return the node
    return this.node;
};
ddt_inputarguments.prototype.set_inputarguments = function(inputarguments_I){
    // set the inputarguments
    //inputarguments
    if (typeof(inputarguments_I)!=="undefined"){
        this.inputarguments = inputarguments_I;
    } else {
        this.inputarguments = null;
        console.log("inputarguments not defined.");
    };
};
ddt_inputarguments.prototype.get_inputarguments = function(){
    // return the inputarguments
    return this.inputarguments;
};
ddt_inputarguments.prototype.validate_inputarguments = function(input_I) {
    // validate user input arguments
    // INPUT:
    // input_I = {} of the following:
    // node = node to add the button to
    // node_id = node id to add the button to
    // inputarguments = {} of properties
    //

    var node_I = input_I.node;
    var node_id_I = input_I.node_id;
    var inputarguments_I = input_I.inputarguments;

    this.set_node(node_I,node_id_I);
    this.set_inputarguments(inputarguments_I);
};