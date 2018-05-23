
layui.define(['layer', 'form', "jquery","table","element"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    element = layui.element,
    $ = layui.$;
    getUrl();
    // 获取屏幕的宽度给iframe赋值
    var clientH = $(window).height();
    var headH = $("#commonHead").height();
    $("#iframeBox").height((clientH -headH - 20) +"px" );
    $(window).resize(function(){
        $("#iframeBox").height((clientH -headH - 20) +"px" );
    });
    // 左侧边栏点击给iframe从新赋值并刷新当前页面
    $(".refresh").on("click",function(){
        $(".refresh").removeClass("layui-this");
        $(this).addClass("layui-this");
        var urls = $(this).attr("href").split("#")[1];
        $("#iframeBox").attr({"src":urls});
    });
    exports('index', function () {
        return ;
    });
    // 获取地址栏hashUrl 以及给左边菜单栏赋值
    function getUrl(){
        var a= window.location.hash.split("#")[1];
        var urls = window.location.hash.split("#")[1];
        var hrefUrl = $(".leftNav dd a");
        $.each(hrefUrl,function(item , index){
            if($(this).attr("href").split("#")[1] == a ){
                $(this).addClass("layui-this").siblings().removeClass(".layui-this");
            }
        });
        if(urls){
            $("#iframeBox").attr({"src":urls});
        }else{
            $("#iframeBox").attr({"src":"account.html"});
        }
    }
});   