
layui.define(['layer', 'form', "jquery" , "element"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    element = layer.element,
    $ = layui.$;
    // loading
    var screenW = $(window).width(),loading ,url = "../api/mapi.aspx" , str="";
    if (screenW > 1000) {
        screenW = 480;
    } else {
        screenW = 320;
    };
    var c1 = false,c2 = false,c3 = false,c4 = false;
    var Name ='' , IsZD1 =0 , ZD1Name = '' , ZD1Type = "1" , IsZD2 =0 , ZD2Name = '' , ZD2Type = "1" ,IsZD3 =0 , ZD3Name = '' , ZD3Type = '1' ,IsZD4 =0 , ZD4Name = '' , ZD4Type = '1' ; 
    form.on('select(select1)', function(data){
        ZD1Type = data.value ;
        console.log(ZD1Type)
    });  
    form.on('select(select2)', function(data){
        ZD2Type = data.value ;
    }); 
    form.on('select(select3)', function(data){
        ZD3Type = data.value ;
    }); 
    form.on('select(select4)', function(data){
        ZD4Type = data.value ;
    }); 
    //监听指定开关
    form.on('switch(c1)', function(data){
        console.log(data);
        console.log($(this));
        if(this.checked ){
            $(this).parents(".layui-inline").siblings(".select1").removeClass("hide");
            c1 = true;
            IsZD1 = 1;
        }else{
            $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
            c1 = false,c2 = false,c3 = false,c4 = false;
            $(".per .select1").addClass("hide");
            $(".per .select1").prev().find(".layui-form-switch").removeClass("layui-form-onswitch");
            IsZD1 = 0;
        }
    });
    form.on('switch(c2)', function(data){
        if(c1){
            if(this.checked ){
                $(this).parents(".layui-inline").siblings(".select1").removeClass("hide");
                c2 = true;
                IsZD2 = 1;
            }else{
                $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
                c2 = false,c3 = false,c4 = false;
                $(".per .sel2").addClass("hide");
                $(".per .sel2").prev().find(".layui-form-switch").removeClass("layui-form-onswitch");
                $(".per .sel3").addClass("hide");
                $(".per .sel3").prev().find(".layui-form-switch").removeClass("layui-form-onswitch");
                $(".per .sel4").addClass("hide");
                $(".per .sel4").prev().find(".layui-form-switch").removeClass("layui-form-onswitch");
                IsZD2 = 0;
            }
        }else{
            $(this).siblings().removeClass("layui-form-onswitch");
            $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
            layer.tips('上面的请先启用', data.othis);
            c2 = false;
        }
    });
    form.on('switch(c3)', function(data){
        if(c1&&c2){
            if(this.checked ){
                $(this).parents(".layui-inline").siblings(".select1").removeClass("hide");
                c3 = true;
                IsZD3 = 1;
            }else{
                $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
                c3 = false;c4 = false;
                $(".per .sel3").addClass("hide");
                $(".per .sel3").prev().find(".layui-form-switch").removeClass("layui-form-onswitch");
                $(".per .sel4").addClass("hide");
                $(".per .sel4").prev().find(".layui-form-switch").removeClass("layui-form-onswitch");
                IsZD3 = 0;
            }
        }else{
            $(this).siblings().removeClass("layui-form-onswitch");
            $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
            layer.tips('上面的请先启用', data.othis);
            c3 = false;
        }
    });
    form.on('switch(c4)', function(data){
        if(c1&&c2&&c3){
            if(this.checked ){
                $(this).parents(".layui-inline").siblings(".select1").removeClass("hide");
                c4 = true;
                IsZD4 = 1;
            }else{
                $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
                c4 = false;
            }
        }else{
            $(this).siblings().removeClass("layui-form-onswitch");
            $(this).parents(".layui-inline").siblings(".select1").addClass("hide");
            layer.tips('上面的请先启用', data.othis);
            c4 = false;
        }
    });
    $(".updatePassword").on("click",function(){
        var data = {
                m:"addtemplate",
                Name :$(".text").val() , 
                IsZD1 :1 , 
                ZD1Name : "" , 
                ZD1Type : 1, 
                IsZD2 :0 , 
                ZD2Name : '' , 
                ZD2Type : 1 ,
                IsZD3 :0 , 
                ZD3Name : '' , 
                ZD3Type :1 ,
                IsZD4 :0 , 
                ZD4Name : '' , 
                ZD4Type : 1
        };
        if($(".text").val().length<=0){
            $(".text").addClass("border_color_red");
            layer.msg("请输入名称");
        }else{
            $(".text").removeClass("border_color_red");
        }
        if(c1){
            data={
                m:"addtemplate",
                Name :$(".text").val() , 
                IsZD1 :1 , 
                ZD1Name : $(".sel1 .layui-input").val() , 
                ZD1Type : ZD1Type , 
                IsZD2 :0 , 
                ZD2Name : '' , 
                ZD2Type : 1 ,
                IsZD3 :0 , 
                ZD3Name : '' , 
                ZD3Type :1 ,
                IsZD4 :0 , 
                ZD4Name : '' , 
                ZD4Type : 1
            }
            if(c2){
                data={
                    m:"addtemplate",
                    Name :$(".text").val() , 
                    IsZD1 :1 , 
                    ZD1Name : $(".sel1 .layui-input").val() , 
                    ZD1Type : ZD1Type , 
                    IsZD2 :1 , 
                    ZD2Name : $(".sel2 .layui-input").val() , 
                    ZD2Type : ZD2Type ,
                    IsZD3 :0 , 
                    ZD3Name : '' , 
                    ZD3Type : 1 ,
                    IsZD4 :0 , 
                    ZD4Name : '' , 
                    ZD4Type : 1
                }
                if(c3){
                    data={
                        m:"addtemplate",
                        Name :$(".text").val() , 
                        IsZD1 :1 , 
                        ZD1Name : $(".sel1 .layui-input").val() , 
                        ZD1Type : ZD1Type , 
                        IsZD2 :1 , 
                        ZD2Name : $(".sel2 .layui-input").val() , 
                        ZD2Type : ZD2Type ,
                        IsZD3 :1 , 
                        ZD3Name : $(".sel3 .layui-input").val() , 
                        ZD3Type : ZD3Type ,
                        IsZD4 :0 , 
                        ZD4Name : '' , 
                        ZD4Type : 1
                    }
                    if(c4){
                        data={
                            m:"addtemplate",
                            Name :$(".text").val() , 
                            IsZD1 :1 , 
                            ZD1Name : $(".sel1 .layui-input").val() , 
                            ZD1Type : ZD1Type , 
                            IsZD2 :1 , 
                            ZD2Name : $(".sel2 .layui-input").val() , 
                            ZD2Type : ZD2Type ,
                            IsZD3 :1 , 
                            ZD3Name : $(".sel3 .layui-input").val() , 
                            ZD3Type : ZD3Type ,
                            IsZD4 :1 , 
                            D4Name : $(".sel4 .layui-input").val() , 
                            ZD4Type : ZD4Type
                        }
                    }
                }
            }
        }
        $.post(url , data ,function(msg){
            console.log(msg);
            if(msg.Code == 1){
                layer.msg(msg.Msg + "将在三秒后关闭");
                setTimeout(function(){
                    parent.location.reload(); 
                },3000);
                
            }else{
                layer.msg(msg.Msg)
            }
            
        })
        console.log(data);
    });
    $(document).on('ajaxStart',function(){ //使用bind 
    loading = layer.load(3, {time: 10*1000})
    }).on('ajaxStop',function(){ //直接使用ajaxComplete
    layer.close(loading); 
    });
});   