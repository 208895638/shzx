
layui.define(['layer', 'form', "jquery"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    $ = layui.$;
    // loading
    var loading ; 
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
    }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
    });
    var url = window.location;
    var url1 = "../api/mapi.aspx";
    var orderno , qrurl,money ,type;
    var timer ;
    // var urlParameter = url.split("?");
    orderno=getPar("orderno");
    qrurl = getPar("qrurl");
    money = parseFloat(getPar("money")).toFixed(2);
    type = getPar("type");
    if(type == 1){
        $(".text span").html("请打开支付宝扫一扫支付");
    }else{
        
    }
    var data1 = {
        m:"getpayorderstatus",
        orderno:orderno
    };
    $(".imgCode").attr("src",qrurl);
    $(".money1").html(money);
    function getPar(par){
        //获取当前URL
        var local_url = document.location.href; 
        //获取要取得的get参数位置
        var get = local_url.indexOf(par +"=");
        if(get == -1){
            return false;   
        }   
        //截取字符串
        var get_par = local_url.slice(par.length + get + 1);    
        //判断截取后的字符串是否还有其他get参数
        var nextPar = get_par.indexOf("&");
        if(nextPar != -1){
            get_par = get_par.slice(0, nextPar);
        }
        return get_par;
    };
    // 获取支付结果
    getResult();  //定时器定时获取结果
    function getResult(){
        timer = setInterval(function(){
            getResultInfo();
        },3000)
    }
    // 定义获取结果方法
    function getResultInfo(){
        $.post(url1 , data1 ,function(msg){
            if(msg.OrderStatus == 1){
                clearInterval(timer);
                $(".success").show();
            }else{
                $(".success").hide();
            }
        });
    };
    setInterval(function(){
        $(".wxCode").addClass("on");
        clearInterval(timer);
    },80000);
    $(".refresh").on("click",function(){
        $.post(url1 , 
            {
                m:"getpayqrcode",
                money:money,
                paytype:type
            } ,
            function (msg) {
                $(".wxCode").removeClass("on");
                $(".imgCode").attr("src",msg.qrurl);
                setInterval(function(){
                    getResultInfo();
                },3000);
        })
    });
    exports('index', function () {

    });
});   