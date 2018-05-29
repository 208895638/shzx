
layui.define(['layer', 'form', "jquery"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    $ = layui.$;
    // loading
    var data = {
        m:"getwithdrawrax"
    };
    var url = "../api/mapi.aspx" , AliAccount , AliName , Rax , RaxMin , Balance;
    $.post(url ,data ,function( msg ){
        if(msg .Code == 1){
            AliAccount = msg.AliAccount;
            AliName = msg.AliName;
            Rax = msg.Rax;
            RaxMin = msg.RaxMin;
            Balance = msg.Balance;
            $(".AliName em").html(AliName);
            $(".AliAccount em").html(AliAccount);
            $(".Balance em").html(Balance+"元");
            $(".rate i").html(Rax);
        }else{
            
        }
        if(msg.Code == "-3"){
            layer.msg("登录状态已失效,3秒后跳转到登录页面!")
          if (window != top) {
            setTimeout(function(){top.location.href = "login.html"; },3000);
          } 
        };
    });
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,6})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    $(".money input").on("input propertychange" ,function(){
        var value = $(this).val()  , val = 0;
        console.log(value , Balance)
        if(value == ""){
            val = 0;
            value = 0;
        }
        else if(value >= Balance){
            val = Balance - parseFloat(Rax);
            layer.msg("账户金额不足,不能提现,提现金额和手续费不能大于余额!");
        }else if(!reg.test(value)){
            layer.msg("输入金额的格式不正确!");
        }else{
            val = parseFloat(value)+ parseFloat(Rax);
        }
        console.log(val);
        // $(".rate b").html(val.toFixed(2));
    });
    $(".postData").on("click",function(){
        var val1 = $(".money input").val();
        if(!reg.test($(".money input").val())){
            layer.msg("输入金额的格式不正确!");
        }else if($(".money input").val()>(Balance - Rax)){
            layer.msg("账户金额不足,不能提现,提现金额和手续费不能大于余额!");
            val1 = Balance - Rax;
        }else{
            $.post(url, {
                m:"addwithdraw" ,
                money:val1
            },function(msg){
                if(msg.Code == 1){
                    layer.msg("提交成功!");
                }else{
                    layer.msg(msg.Msg);
                }
                
            })
        }

    });
    var loading ;
    $(document).on('ajaxStart',function(){ //使用bind
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
});   