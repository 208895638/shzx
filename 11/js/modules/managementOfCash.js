
layui.define(['layer', 'form', "jquery","table"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    $ = layui.$;
    // loading
    var loading;
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
//    发起提现
    $(".withdrawals").on("click",function(){
        
        var urls = $(this).attr("href").split("#");
        var url = urls[urls.length - 1];
        $("#managementMoney").attr("src",url);
        setIframeHeight("managementMoney");
        console.log($("#managementMoney").attr("src"),$("#managementMoney").height())
        return false;
    });
    // 提现列表
    $(".withdrawalsInfo").on("click",function(){
        
        var urls = $(this).attr("href").split("#");
        var url = urls[urls.length - 1];
        $("#managementMoney").attr("src",url);
        setIframeHeight("managementMoney");
        console.log($("#managementMoney").attr("src"),$("#managementMoney").height())
        return false;
    });
    
    function getWindowWidth(){
        var client = $(window).width();
        if(client> 1024){
            client = 700;
        }else{
            client = 320;
        }
        return client+"px";
    }
    // 获取iframe里面元素的高度\
    // setIframeHeight("managementMoney");
    function setIframeHeight(id){
        var h = $("#"+id).contents().find("html").height();
        console.log(h);
        $("#"+id).height(h)
    };
    getUrl1();
    function getUrl1(){
        console.log(window.location.pathname)
        var urls = window.location.pathname;
        if(urls == "/managementOfCash.html"){
            urls = "widthdrawals.html";
            $("#managementMoney").attr({"src":urls});
            setTimeout(function(){
                var h = $("#managementMoney").contents().find("body").height();
            $("#managementMoney").height(h+"px");
            },300)
            
        }
        
    };
    exports('index', function () {

    });
});   