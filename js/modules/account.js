
layui.define(['layer', 'form', "jquery", "table"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    $ = layui.$;
    var clientH = $(window).height() ,RaxMin , SHRaxMin;
    var url = "../api/mapi.aspx";
    var data = {
        m: "getmerchantinfo"
    }
    $.post(url, data, function (msg) {
        console.log(msg);
        var msgs = msg.data;
        if (msg.Code == 1) {

            $(".MID em").html(msgs.MID);
            $(".LoginName em").html(msgs.LoginName);
            $(".KYBalance em").html(msgs.KYBalance);
            $(".KYBalance b").html(msgs.BZJBalance);
            $(".MerchantName em").html(msgs.MerchantName);
            $(".SFZNO em").html(msgs.SFZNO);
            $(".Address em").html(msgs.Address);
            $(".QQ em").html(msgs.QQ);
            if (msgs.ParentID == 0) {
                $(".ParentID").hide();
            } else {
                $(".ParentID em").html(msgs.ParentID);
            }
            $(".AliName em").html(msgs.AliName);
            $(".AliAccount em").html(msgs.AliAccount);
            $("#shdz").html(msgs.SHURL);
            if (msgs.Status == "1") {
                $(".state .state1").show();
                $(".state .state2").hide();
            } else {
                $(".state .state2").show();
                $(".state .state1").hide();
            }
            $(".APIKey em").html(msgs.APIKey);
            $(".NotifyURL em").html(msgs.NotifyURL);
            RaxMin = msgs.RaxMin;
            SHRaxMin = msgs.SHRaxMin;
            $(".Rax em").html(msgs.Rax + "(最低手续费:" + msgs.RaxMin + "元)");
            $(".sh em").html(msgs.SHRax + "(最低手续费:" + msgs.SHRaxMin + "元)");
        } else {
            layer.msg(msg.Msg)
        }
        if(msg.Code == "-3"){
            layer.msg("登录状态已失效,3秒后跳转到登录页面!")
          if (window != top) {
            setTimeout(function(){top.location.href = "login.html"; },3000);
          } 
        };
    });
    $(".updatePassword").on("click", function () {
        var screenW = $(window).width();
        if (screenW > 1000) {
            screenW = 480;
        } else {
            screenW = 320;
        };
        var iframeH = $("")
        layer.open({
            id: "1",
            type: 2,
            title: '修改密码',
            shadeClose: true,
            shade: false,
            scrollbar: false,
            maxmin: false, //开启最大化最小化按钮
            area: [screenW + "px", '290px'],
            content: 'updatePassword.html'
        });
    });
    $(".updateUrl").on("click", function () {
        layer.prompt({ title: '修改接口回调地址', formType: 0 }, function (text, index) {
            console.log(text.length);
            var url1 = '../api/mapi.aspx';
            var data1 = {
                m: "udreturnurl",
                url: text
            }
            $.post(url1, data1, function (msg) {
                console.log(msg)
                if (msg.Code == "1") {
                    layer.close(index);
                    layer.msg(msg.Msg);
                    parent.location.reload();
                } else {
                    layer.msg(msg.Msg);
                }
            })
        });
    });
    $(".sh").on("click", function () {
        var screenW = $(window).width();
        if (screenW > 1000) {
            screenW = 480;
        } else {
            screenW = 320;
        };
        layer.open({
            id: "1",
            type: 2,
            title: '修改散户费率',
            shadeClose: true,
            shade: false,
            scrollbar: false,
            maxmin: false, //开启最大化最小化按钮
            area: [screenW + "px", '200px'],
            content: 'shfl.html?RaxMin='+RaxMin+'&SHRaxMin='+SHRaxMin
        });
    });
    exports('index', function () {
    });
});   