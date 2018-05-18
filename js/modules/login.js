
layui.define("layer",function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var layer = layui.layer;
    var obj = {
        hello: function(str){
            alert('Hello '+ (str||'mymod'));
        }
    };

    var url = "../api/mapi.aspx";
    var data;
    var reg = {
        userReg:function(val){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            return  myreg.test(val);
        },
        passReg:function(val){
            // var passReg= /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
            if(val.length<6){
                return  false;
            }else{
                return  true;
            }
        }
    }
    $(".loginData").on("click",function(e){
        e.preventDefault();           
        data={
            m:"login",
            loginname:$("#username").val(),
            password:$("#password").val()
        }
        if(!reg.userReg($("#username").val())){
            layer.msg('用户名只能输入手机号码！'); 
        }else if(!reg.passReg($("#password").val())){
            layer.msg('密码长度不能小于6'); 
        }else{
            
            $.post(url,data,function(result){
                var code = result.Code;
                if (code == 1) {
                    self.location="index.html"
                    layer.msg(result.Msg);
                }else{
                    layer.msg(result.Msg);
                }
            });
        }
        
    });

    // function login(){
        
    //     console.log(data)
    //     $.post(url,data,function(result){
    //         console.log(result)
    //         layer.msg(result); 
    //     });
    // }
    //输出test接口
    exports('mymod', obj);
});   
