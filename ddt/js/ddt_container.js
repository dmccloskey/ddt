var ddt_container = function (){
    // ddt_container class
    this.parameters = [];
    this.tiles = [];
    this.data = [];
    this.tile2datamap = {};
};
ddt_container.prototype.set_parameters = function(parameters_I){
    // set parameters to container
    //INPUT:
    // parameters_I = [
    //           {tileid:'',...//tileproperties 
    //            svgid:'',...//svgproperties},...]
    this.parameters=parameters_I;
};
ddt_container.prototype.set_tile = function(tiles_I){
    // set tile to container
    this.tiles=tiles_I;
};
ddt_container.prototype.set_data = function(data_I){
    // set data to container
    this.data=data_I;
};
ddt_container.prototype.set_tile2datamap = function(tile2datamap_I){
    // set tile2datamap to container
    // INPUT:
    // tile2datamap_I = {tileid:[dataindex,...],...}
    this.tile2datamap=tile2datamap_I;
};
ddt_container.prototype.add_parameters = function(parameters_I){
    // add parameters to container
    this.parameters.push(parameters_I);
};
ddt_container.prototype.add_tile = function(tile_I){
    // add tile to container
    this.tiles.push(tile_I);
};
ddt_container.prototype.add_data = function(data_I){
    // add data to container
    //INPUT:
    // data_I = [{data:[],datakeys:[],datanestkeys:[]},...]
    for (i=0;i<data_I.length;i++){
        var d3data = new d3_data();
        d3data.set_keys(data_I[i].datakeys);
        d3data.set_listdata(data_I[i].data,data_I[i].datanestkeys);
        d3data.reset_filters();
        this.data.push(d3data);
    };
};
ddt_container.prototype.add_containertiles = function(){
    // get all container tiles based on parameters
    // tiles will be added in the same order as the parameters
    for (i=0;i<this.parameters.length;i++){
        var tiletype = this.parameters[i].tiletype
        var tile = this.get_tile(tiletype);
        this.tiles.push(tile);
    };
};
ddt_container.prototype.make_container = function(){
    // call all tile make functions
    var data = this.data;
    this.add_containertiles();
    for (i=0;i<this.tiles.length;i++){
        var tiledataindex = this.tile2datamap[this.parameters[i].tileid];
        var tiledata = [];
        tiledataindex.forEach(function(d){tiledata.push(data[d]);});
        this.tiles[i].make_tile(tiledata,this.parameters[i]);
    };
};
ddt_container.prototype.update_container = function(){
    // call all tile update functions
    for (i=0;i<this.tiles.length;i++){
        this.tiles[i].update_tile;
    };
        
};
ddt_container.prototype.get_tile = function(tiletype_I){
    // return the appropriate tile object
    if (tiletype_I=='form'){
        return new ddt_tile_form();
    } else if (tiletype_I=='datalist'){
        return new ddt_tile_datalist();
    } else if (tiletype_I=='svg'){
        return new ddt_tile_svg();
    }  else {
        return null;
    };
};