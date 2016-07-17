ddt_container.prototype.add_newtilebutton2container = function(){
    //add a new tile to the container
    //Behavior:
    //1. popup modal
    //  a. select tile templates
    //  b. select associated data
    //  c. input tile parameters
    //2. add new tile on submit
    //  a. add the new tile parameters object
    //  b. add the new tile tile2datamap values
    //  c. make the tile
    //  d. add the new tile to the container
    //TODO:
};
ddt_container.prototype.add_newtilebutton2container = function (){
    /*add button to add a new tile to the container
    */ 

    var this_ = this;
    var containerid = this.containerid;

//     function appendnewtile(){
//         this_.append_newtile();
//     };
    function shownewtilemodal(){
        this_.show_newtilemodal();
    };

    var newtilebutton = this.containerheader
        .append("div")
        .attr("class","glyphicon glyphicon-plus pull-left")
        .attr("id", containerid + 'newtilebutton')
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","new tile");
    newtilebutton.on("click", show_newtilemodal);
};
ddt_container.prototype.show_newtilemodal = function(){
    /*show the newtile modal

    form with the following input:
    tile templates
    existing data or empty data
    input tile parameters
    */ 
    var this_ = this;

    function getpassword_modal(){
        //get the container password
        var encrypted = this_.check_containernewtile();
        if (!encrypted){
            // encrypt
            // get user password:
            menumodal.update_modalheadertitle('Encrypt container');
            $("#"+modalid + "modal").modal('show');
        } else {
            // decrypt
            // get user password:
            menumodal.update_modalheadertitle('Decrypt container');
            $("#"+modalid + "modal").modal('show');
        };
    };
    function setpassword_modal(){
        //set the container password
        var encrypted = this_.check_containernewtile();
        if (!encrypted){
            // encrypt
            // get user password:
            var password = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
            this_.set_password(password); //necessary to pass svg as "this"
            // change the button color
            this_.jsonnewtilebuttontrigger.style({"color": "red"});
            //alert("input data will now be decrypted and output data will be encrypted")
        } else {
            // decrypt
            // get user password:
            var password = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
            if (password===this_.password){
                this_.password = null;
                this_.jsonnewtilebuttontrigger.style({"color": ""});
            } else {
                alert("invalid password provided");
            };
            
        };
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid + "modal").modal('hide');
    };

    //add the modal menu object
    var modalid = containerid + 'modal' + 'newtilebutton';
    var modaltargetid = "#" + containerid + 'newtilebutton';
    //var modaltargetid = "body";
    var menumodal = new d3_html_modal();
    menumodal.set_id(modalid);
    menumodal.set_tileid(containerid);
    menumodal.add_modal2tile(modaltargetid);
    menumodal.add_header2modal();
    menumodal.add_closebutton2modalheader();
    menumodal.add_body2modal();
    menumodal.add_form2modalbody();
    menumodal.add_footer2modal();
    menumodal.add_title2modalheader('');
    menumodal.add_submitbutton2modalfooter();
    menumodal.add_content2modalbodyform = function (){
        // add content to the modal body form
        var id = this.id;

        var modalbodyformpassword = this.modalbodyform
            .append("div")
            .attr("class","form-group")
            .attr("id",id+"modalbodyformpassword")
            .append("label")
            .attr("for",id+"modalbodyformpasswordinput")
            .text("Password")
            .append("input")
            .attr("type","password")
            .attr("class", "form-control")
            .attr("id",id+"modalbodyformpasswordinput")
            .attr("placeholder","Password");

        d3.select('#'+id+"modalfootersubmitbutton").on("click",setpassword_modal);
    };
    menumodal.add_content2modalbodyform();
    getpassword_modal();

}