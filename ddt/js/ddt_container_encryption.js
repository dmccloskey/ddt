ddt_container.prototype.set_password = function(password_I){
    // set the container password_I
    if (typeof(password_I)!=="undefined"){
        var password = password_I;
    } else {
        var password = null;
    }

    this.password = password;
};
ddt_container.prototype.check_containerencryption = function(){
    //check if the container is password protected
    //OUTPUT:
    //encrypted_O = boolean, true if password protected
    var encrypted_O = false;
    var currentbuttoncolor = this.jsonencryptionbuttontrigger.node().style['color'];
    if (!this.password && currentbuttoncolor==""){
        encrypted_O=false;
    } else if (this.password && currentbuttoncolor=="red"){
        encrypted_O=true;
    } else{
        encrypted_O=false;
        console.log("password and button color mismatch.");
    };
    return encrypted_O;
};
ddt_container.prototype.show_encryptionmodal = function(){
    // show the encryption modal
    // dependencies: https://bitwiseshiftleft.github.io/sjcl/
    var this_ = this;
    var containerid = this.containerid;
    var password = this.password;

    function getpassword_modal(){
        //get the container password
        var encrypted = this_.check_containerencryption();
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
        var encrypted = this_.check_containerencryption();
        if (!encrypted){
            // encrypt
            // get user password:
            var password = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
            this_.set_password(password); //necessary to pass svg as "this"
            // change the button color
            this_.jsonencryptionbuttontrigger.style({"color": "red"});
            //alert("input data will now be decrypted and output data will be encrypted")
        } else {
            // decrypt
            // get user password:
            var password = d3.select("#"+containerid+"modalbodyformpasswordinput").node().value;
            if (password===this_.password){
                this_.password = null;
                this_.jsonencryptionbuttontrigger.style({"color": ""});
            } else {
                alert("invalid password provided");
            };
            
        };
        // prevent browser default page refresh
        d3.event.preventDefault();
        $("#"+modalid + "modal").modal('hide');
    };

    //add the modal menu object
    var modalid = containerid + 'modal' + 'jsonencryptionbutton';
    var modaltargetid = "#" + containerid + 'jsonencryptionbutton';
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
ddt_container.prototype.add_encryptionbutton2container = function(){
    // add data incryption when downloading a container json file
    // dependencies: https://bitwiseshiftleft.github.io/sjcl/

    var this_ = this;
    var containerid = this.containerid;
    var password = this.password;

    function showencryptionmodal(){
        this_.show_encryptionmodal();
    };

    this.jsonencryptionbutton = this.containerheader
        .append("div")
        .attr("id", containerid + 'jsonencryptionbutton')
        .attr("class","pull-left")
        .style({"cursor":"pointer"})
        .attr("data-toggle","tooltip")
        .attr("title","encrypt container")
    this.jsonencryptionbuttontrigger = this.jsonencryptionbutton
        .append("span")
        .attr("class","glyphicon glyphicon-certificate pull-left ui-btn ui-btn-inline");
    // ensure that the button is colored red if the container is password protected
    if (this.password){
        this.jsonencryptionbutton.style({"color": "red"});
    };

    this.jsonencryptionbuttontrigger.on("click", showencryptionmodal);

//     var jsonencryptionbutton = this.containerheader
//         .append("div")
//         .attr("data-rol","main")
//         .attr("class","ui-content")
//         .append("a")
//         .attr("href","#encryptionpopup")
//         .attr("data-rel","passwordpopup")
//         .append("div")
//         .attr("class","glyphicon glyphicon-certificate pull-left ui-btn ui-btn-inline")
//         .attr("id", containerid + 'jsonencryptionbutton')
//         .style({"cursor":"pointer"})
//         .attr("data-toggle","tooltip")
//         .attr("title","encrypt container");
//     //jsonencryptionbutton.on("click", setpassword);

//     var passwordpopupform = d3.select("body")
//         .append("div")
//         .attr("data-role","passwordpopup")
//         .attr("id",'encryptionpopup')
//         .attr("class","ui-content")
//         .style({"min-width":"250px"})
//         .append("form")
//         .attr("method","post")
//         .attr("action","demoform.asp")
//         .append("div");
//     var passwordpopupformheader = passwordpopupform
//         .append("h3")
//         .text("loggin information");
//     var passwordpopupformusernamelabel = passwordpopupform
//         .append("label")
//         .attr("for","usrnam")
//         .attr("class","ui-hidden-accessible")
//         .text("Username");
//     var passwordpopupformusernameinput = passwordpopupform
//         .append("input")
//         .attr("type","text")
//         .attr("name","user")
//         .attr("id","usrnam")
//         .attr("placeholder","Username");
//     var passwordpopupformpasswordlabel = passwordpopupform
//         .append("label")
//         .attr("for","pswd")
//         .attr("class","ui-hidden-accessible")
//         .text("Password");
//     var passwordpopupformpasswordinput = passwordpopupform
//         .append("input")
//         .attr("type","text")
//         .attr("name","passw")
//         .attr("id","pswd")
//         .attr("placeholder","Password");
//     var passwordpopupformstayloggedininput = passwordpopupform
//         .append("input")
//         .attr("type","checkbox")
//         .attr("name","login")
//         .attr("id","log")
//         .attr("value","1")
//         .attr("data-mini","true");
//     var passwordpopupformsubmitinput = passwordpopupform
//         .append("input")
//         .attr("type","submit")
//         .attr("name","login")
//         .attr("id","passwordpopupsubmitbutton")
//         .attr("value","Log in")
//         .attr("data-inline","true");
};