
layui.define(['layer',"form", "jquery"], function (exports) {
    var layer = layui.layer,
    form = layui.form,
    $ = layui.$;
    var clientH = $(window).height();
    var url = "../api/mapi.aspx";
     
    var validate = {
        testAccount: function (val) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            return myreg.test(val);
        },
        testPassword: function (val) {
            var myreg = /^(\w){6,20}$/;
            return myreg.test(val);
        },
        testIdCard: function (val) {
            var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return myreg.test(val);
        },
        testQQ: function (val) {
            var myreg = /^[1-9][0-9]{3,10}$/;
            return myreg.test(val);
        },
        testZFBAccount:function(val){
            var myreg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
            return myreg.test(val);
        },
        testName:function(val){
            var myreg = /^[\u4E00-\u9FA5]{2,4}$/;
            return myreg.test(val);
        }
    };
    $(".oldPassword").blur(function(){
        checkOldPassword();
    });
    $(".newPassword").blur(function(){
        checkNewPassword();
    });
    $(".confirmPassword").blur(function(){
        checkCofirmPassword();
    });
    $(".updatePassword").on("click",function(){
        var data = {
            m:"updatepassword",
            oldp:$(".oldPassword").val(),
            p:$(".newPassword").val()
        };
        console.log(checkOldPassword() , checkNewPassword() , checkCofirmPassword());
        if(checkOldPassword() && checkNewPassword() && checkCofirmPassword()){
            $.post(url , data ,function(msg){
                if(msg.Code == 1){
                    layer.msg(msg.Msg);
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
        }
        
    });
    // 检测旧密码的格式
    function checkOldPassword(){
        if (!validate.testPassword($.trim($(".oldPassword").val()))) {
            layer.msg("原密码格式不正确,请输入数字或字母组成的字符,不能输入特殊字符");
            $(".oldPassword").addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            return false;
        }else{
            $(".oldPassword").removeClass("border_color_red");
            return true;
        }
    };
    // 检测新密码的格式
    function checkNewPassword(){
        if (!validate.testPassword($.trim($(".newPassword").val()))) {
            layer.msg("新密码格式不正确,请输入数字或字母组成的字符,不能输入特殊字符");
            $(".newPassword").addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            return false;
        }else{
            $(".newPassword").removeClass("border_color_red");
            return true;
        }
    };
    // 检测新密码跟重复新密码是否一样的格式
    function checkCofirmPassword(){
        if(!($.trim($(".confirmPassword").val()) == $.trim($(".newPassword").val()))){
            $(".confirmPassword").addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            layer.msg("密码和重复密码不一致");
            return false;
        }else{
            $(".confirmPassword").removeClass("border_color_red");
            return true;
        }
    };
    exports('index', function () {

    });
});   