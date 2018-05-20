
layui.define(['layer', 'form', "jquery","table","element"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    element = layui.element,
    $ = layui.$;
    // 获取屏幕的宽度给iframe赋值
    var clientH = $(window).height();
    var headH = $("#commonHead").height();
    $("#iframeBox").height((clientH -headH - 20) +"px" );
    $(window).resize(function(){
        $("#iframeBox").height((clientH -headH - 20) +"px" );
    });
    //获取浏览器地址信息
    var url = window.location.hash.split("#")[1];
    $("#iframeBox").attr({"src":url});
    // 左侧边栏点击给iframe从新赋值并刷新当前页面
    $(".refresh").on("click",function(){
        refreshUrl();
    })
    exports('index', function () {

    });
    function refreshUrl(){
        window.location.reload();
        $("#iframeBox").attr({"src":url});
    }
});   