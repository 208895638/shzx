
layui.define(['layer', 'form', "jquery"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    $ = layui.$;
    // loading
    var loading , checkRadio, url = "../api/mapi.aspx",rax ,minRax ,fl = 0 ,val,radioVal ="2" ,inputVal; // 把选择微信支付或支付宝支付的值赋值给checkRadio 费率  最低费率 显示在页面的费率 传给后台的值 单选框的值
    var postmoney , postorderno , postqrurl ,posturl;//向弹出层传参
    //  单选框操作
     form.on('radio(cz)', function(data){
        $(this).parents("li").addClass("on").siblings().removeClass("on");
        radioVal = $(this).val().toString();
      }); 
    //    检测输入的金额是否正确
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,6})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    $("#inputmoney").blur(function () {
        if(!reg.test($(this).val())){
            $(".special button").addClass("layui-btn-disabled");
            $(this).addClass("error");
            layer.msg("输入的金额不正确");
        }else{
            $(".special button").removeClass("layui-btn-disabled");
            $(this).removeClass("error");
        }
    });
    $("#inputmoney").bind('input propertychange', function () {
        $(".special button").removeClass("layui-btn-disabled");
        inputVal = $(this).val();
        if(inputVal == ""){
            fl = minRax;
            inputVal= 0;
        } 
        if(inputVal*rax < minRax){
            fl = minRax;
        }else{
            fl = inputVal*parseFloat(rax);
        }
         val = (parseFloat(inputVal) - parseFloat(fl)).toFixed(2);
        $(".notice em").html(val);
    });
    $(".special .czBtn").on("click",function(){
        
        if(!reg.test($(".special input").val())){
        }else{
            if(val<1){
                layer.msg("输入的金额最少1元")
            }else{
                
                getPayUrl($(".special input").val() , radioVal);
            }
            
        }
    });
    // 获取费率
    $.post(url,{m:"getpaygaterax"},function(msg){
        if(msg.Code == 1){
            rax = msg.Rax*0.01;
            minRax = msg.RaxMin;
            $(".notice i ").html(minRax);
            $(".notice span").html(rax*100+"%");
        }
      
    });
    function getPayUrl(money , type){
        var data1 = {
            m:"getpayqrcodegetway",
            money:money,
            paytype:type
        }
        $.post(url , data1 ,function (msg) {
            console.log(msg)
            if(msg.code == 1){
                postmoney = msg.money;
                postorderno= msg.orderno; 
                postqrurl= msg.qrurl ;
                posturl= msg.url;
                var screenW = $(window).width();
                console.log(postmoney)
                if (screenW > 1000) {
                    screenW = 480;
                } else {
                    screenW = 320;
                };
                if(type == 2){
                    layer.open({
                        id:"1",
                        type: 2,
                        title: '微信支付',
                        shadeClose: true,
                        shade: false,
                        area: [screenW+"px", '500px'],
                        content: 'code.html?'+"type="+type+"&money="+postmoney+"&orderno="+postorderno+"&qrurl="+postqrurl+"&url="+posturl
                    });
                }else{
                    layer.open({
                        id:"1",
                        type: 2,
                        title: '支付宝支付',
                        shadeClose: true,
                        shade: false,
                        area: [screenW+"px", '500px'],
                        content: 'code.html?'+"type="+type+"&money="+postmoney+"&orderno="+postorderno+"&qrurl="+postqrurl+"&url="+posturl
                    });
                }
            }
        })
    }
    // loading
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
});   