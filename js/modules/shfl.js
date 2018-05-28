
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
        })
    });
    
});   