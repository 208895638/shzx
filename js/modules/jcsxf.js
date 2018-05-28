
layui.define(['layer',"form", "jquery"], function (exports) {
    var layer = layui.layer,
    form = layui.form,
    $ = layui.$;
    var clientH = $(window).height();
    var url = "../api/mapi.aspx" , url1 = window.location.href;
    var params = getParams(url1);
    //获取地址栏上的userName
    var mid =  params.mid;
    $.post(url , {
        m:"getchildmrax",
        mid:mid
    },function(msg){
        console.log(msg);
        if(msg.Code == 1){
            $(".jcfl").val(msg.Rax);
            $(".zdfy").val(msg.RaxMin)
        }
    });
    $(".updatePassword").on("click",function(){
        var data = {
            m:"updatechildrax",
            mid:mid,
            rax:$(".jcfl").val(),
            raxmin: $(".zdfy").val()
        }
        $.post(url , data ,function(msg){
            if(msg.Code == 1){
                layer.msg(msg.Msg);
                parent.location.reload(); 
            }else{
                layer.msg(msg.Msg);
            }
        })
    })
    console.log(mid)
    function getParams(url) {
        var theRequest = new Object();
        if (!url)
            url = location.href;
        if (url.indexOf("?") !== -1)
        {
            var str = url.substr(url.indexOf("?") + 1) + "&";
            var strs = str.split("&");
            for (var i = 0; i < strs.length - 1; i++)
            {
                var key = strs[i].substring(0, strs[i].indexOf("="));
                var val = strs[i].substring(strs[i].indexOf("=") + 1);
                theRequest[key] = val;
            }
        }
        return theRequest;
    }
});   