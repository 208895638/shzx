
layui.define("layer", function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var layer = layui.layer;
    var obj = {
        hello: function (str) {
            alert('Hello ' + (str || 'mymod'));
        }
    };

    function FunRenderCkCode() {
        var codeurl = "../CKCode.ashx?" + Math.random();

        $.post(codeurl, null, function (msg) {
            $("#ckcode").attr("src", msg);

        });
    };
    FunRenderCkCode();

    var url = "../api/mapi.aspx";
   
    var data;
    var reg = {
        userReg: function (val) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            return myreg.test(val);
        },
        passReg: function (val) {
            // var passReg= /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
            if (val.length < 6) {
                return false;
            } else {
                return true;
            }
        }
    };
    $(".yzm input").blur(function () {
        if ($(".yzm input").val() === "" || $(".yzm input").val() == null) {
            layer.msg("验证码长度不能为空!");
        };
    });
    $(".loginData").on("click", function (e) {
        e.preventDefault();
        data = {
            m: "login",
            loginname: $("#username").val(),
            password: $("#password").val(),
            ckcode: $("#yzmcode").val()
        }
        console.log(data);
        if (!reg.userReg($("#username").val())) {
            layer.msg('用户名只能输入手机号码！');
        } else if (!reg.passReg($("#password").val())) {
            layer.msg('密码长度不能小于6!');
        } else if ($(".yzm input").val() === "" || $(".yzm input").val() == null) {
            layer.msg("验证码长度不正确!");
        } else {
            $.post(url, data, function (result) {
                var code = result.Code;
                console.log(result)
                if (code == 1) {
                    self.location = "index.html"
                    layer.msg(result.Msg);
                } else {
                    layer.msg(result.Msg);
                }
            });
        }

    });
    $(".yzm img").on("click", function () {
        FunRenderCkCode();
    });
//    var loading;
//    $(document).on('ajaxStart', function () { //使用bind
//        loading = layer.load(3, { time: 10 * 1000 })
//    }).on('ajaxStop', function () { //直接使用ajaxComplete
//        layer.close(loading);
//    });
});   

