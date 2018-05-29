
layui.define(['layer',"form", "jquery"], function (exports) {
    var layer = layui.layer,
    form = layui.form,
    $ = layui.$;
    var clientH = $(window).height();
    var url = "../api/mapi.aspx";
    $(".updatePassword").on("click",function(){
        
        var data = {
            m:"updateshrax",
            raxsh:$(".jcfl").val(),
            raxminsh:$(".zdfy").val()
        }
        $.post(url , data ,function(  msg ){
            console.log(msg);
            if(msg.Code == 1){
                layer.msg(msg.Msg);
                parent.location.reload();
            }else{
                layer.msg(msg.Msg);
            }
            if(msg.Code == "-3"){
                layer.msg("登录状态已失效,3秒后跳转到登录页面!")
          if (window != top) {
            setTimeout(function(){top.location.href = "login.html"; },3000);
          }
            };
        })
    });
    
});   