
layui.define(['layer', 'form', "jquery"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    $ = layui.$;
    // loading
    var data = {
        m:"getwithdrawrax"
    };
    var url = "../api/mapi.aspx" , AliAccount , AliName , Rax , RaxMin;
    $.post(url ,data ,function( msg ){
        if(msg .Code == 1){
            console.log(msg);
            AliAccount = msg.AliAccount;
            AliName = msg.AliName;
            Rax = msg.Rax;
            RaxMin = msg.RaxMin;
            $(".AliName em").html(AliName);
            $(".AliAccount em").html(AliAccount);
            $(".rate strong").html(Rax+"%");
            $(".rate b").html(RaxMin);
        }else{
            
        }
    });
    $(".money input").on("input propertychange" ,function(){
        var value = $(this).val();
        var val = value*0.01*Rax;
        if(value == ""){
            value = 0;
        }
        else if(val < RaxMin){
            val = RaxMin
        }
        $(".rate i").html((parseFloat(val)+parseFloat(value)).toFixed(2));
    });
    var loading ;
    $(document).on('ajaxStart',function(){ //使用bind
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
});   