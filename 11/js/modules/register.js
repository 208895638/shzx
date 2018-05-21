
layui.define(['layer', 'form', "element", "jquery"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    $ = layui.$;
    // loading
    var loading ;
    $(document).on('ajaxStart',function(){ //使用bind
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });

    var url = "../api/mapi.aspx";
    $(".loginData").on("click", function (e) {
        event.preventDefault();
        login($("#username").val(), $("password").val());
    });
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
    var data;
    form.on('checkbox(checkBoxChoice)', function(data){
        if(data.elem.checked ){
            $("#postMessage").removeClass("layui-btn-disabled");
            $("#postMessage").removeAttr("disabled");
        }else{
            $("#postMessage").addClass("layui-btn-disabled");
            $("#postMessage").attr({"disabled":"disabled"});
            layer.tips('温馨提示：您必须同意协议才能继续注册', data.othis)
        }
    });
        $('#userName').blur(function () {  
            if (!validate.testAccount($.trim($("#userName").val()))) {
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
                layer.msg("账户格式不正确,只能输入11位手机号");
            }else{
                $(this).removeClass("border_color_red");
            }
        });  
        $('#loginPass').blur(function () {  
            if (!validate.testPassword($.trim($("#loginPass").val()))) {
                layer.msg("密码格式不正确,请输入数字或字母组成的字符,不能输入特殊字符");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#confirmPass').blur(function () {  
            if(!($.trim($("#loginPass").val()) == $.trim($("#confirmPass").val()))){
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
                layer.msg("密码和重复密码不一致");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#realName').blur(function () {  
            if (!validate.testName($.trim($("#realName").val()))) {
                layer.msg("姓名格式不正确,只能输入2-4位汉字");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#idCard').blur(function () {  
            if (!validate.testIdCard($.trim($("#idCard").val()))) {
                layer.msg("身份证格式不正确,只接受18位有效身份证号码");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#QQ').blur(function () {  
            if (!validate.testQQ($.trim($("#QQ").val()))) {
                layer.msg("QQ格式不正确,请输入4-11位QQ号码");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#address').blur(function () {  
            if ($("#address").val().length == 0) {
                layer.msg("地址格式不正确,最少输入2位");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#ZFBName').blur(function () {  
            if ($("#ZFBName").val().length <= 1) {
                layer.msg("支付宝姓名长度过短,请输入2-4个汉字");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('#ZFBAccount').blur(function () {  
            if (!validate.testZFBAccount($.trim($("#ZFBAccount").val()))) {
                layer.msg("支付宝账户格式不正确,格式为手机号或邮箱");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            }else{
                $(this).removeClass("border_color_red");
            }
        });
        $('.yzm input').blur(function () {  
            console.log(111)
            if($("#yzmcode").val() == "" ){
                layer.msg("验证码长度不能为空!");
                $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            };
            // if (!validate.testZFBAccount($.trim($("#ZFBAccount").val()))) {
            //     layer.msg("支付宝账户格式不正确,格式为手机号或邮箱");
            //     $(this).addClass("border_color_red").parent().parent().siblings().find(".layui-input").removeClass("border_color_red");
            // }else{
            //     $(this).removeClass("border_color_red");
            // }
        });
    $("#postMessage").on("click", function (e) {
        e.preventDefault();
        data = {
            m: "reg",
            loginname: $.trim($("#userName").val()),
            password: $.trim($("#loginPass").val()),
            mName: $.trim($("#realName").val()),
            sfz: $.trim($("#idCard").val()),
            addr: $("#address").val(),
            qq: $.trim($("#QQ").val()),
            paid: $.trim($("#SuperiorID").val()),
            aliaccount: $.trim($("#ZFBAccount").val()),
            aliname: $.trim($("#ZFBName").val()),
            ckcode: $.trim($("#yzmcode").val())
        };
        
        // var len = $(".reg_info").find(".layui-input");
        // console.log(len);
        // $.each(len,function(i,item){  
        //     if()
        //     console.log(i+"--"+item);  
        // });  
        if (!validate.testAccount($.trim($("#userName").val()))) {
            $("#userName").addClass("border_color_red");
            layer.msg("账户格式不正确,只能输入11位手机号");
        } else if (!validate.testPassword($.trim($("#loginPass").val()))) {
            layer.msg("密码格式不正确,请输入数字或字母组成的字符,不能输入特殊字符");
            $("#loginPass").addClass("border_color_red");
        }else if(!($.trim($("#loginPass").val()) == $.trim($("#confirmPass").val()))){
            $("#confirmPass").addClass("border_color_red");
            layer.msg("密码和重复密码不一致");
        } else if (!validate.testName($.trim($("#realName").val()))) {
            $("#realName").addClass("border_color_red");
            layer.msg("姓名格式不正确,只能输入2-4位汉字");
        } else if (!validate.testIdCard($.trim($("#idCard").val()))) {
            $("#idCard").addClass("border_color_red");
            layer.msg("身份证格式不正确,只接受18位有效身份证号码");
        } else if (!validate.testQQ($.trim($("#QQ").val()))) {
            $("#QQ").addClass("border_color_red");
            layer.msg("QQ格式不正确,请输入4-11位QQ号码");
        } else if ($("#address").val().length == 0) {
            $("#address").addClass("border_color_red");
            layer.msg("地址格式不正确,最少输入2位");
        } else if ($("#ZFBName").val().length <= 1) {
            $("#ZFBName").addClass("border_color_red");
            layer.msg("支付宝姓名长度过短,请输入2-4个汉字");
        } else if (!validate.testZFBAccount($.trim($("#ZFBAccount").val()))) {
            $("#ZFBAccount").addClass("border_color_red");
            layer.msg("支付宝账户格式不正确,格式为手机号或邮箱");
        } else {
            $(".reg_info .layui-input").removeClass("border_color_red");
            $.post(url, data, function (result) {
                var code = result.Code;
                if (code == 1) {
                    self.location = "index.html"
                    layer.msg(result.Msg);
                } else {
                    layer.msg(result.Msg);
                }
            });
        }
    });
    exports('index', function () {

    });
});   