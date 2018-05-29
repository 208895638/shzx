
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
    // 点击删除
    $(".userTemplate").on("click",".deleteThis",function(e){
        e.stopPropagation();
        $(this).parents(".layui-colla-item").remove();
    });
    // 遍历添加按钮 分别给他们对应的点击事件
    $.each($("#addGroup button") , function(){
        $(this).on("click",function(){
            var i = $(this).index();
            addField(i)
        })
    });
    function addField(id){
        switch (id) {
            case 0:
            addWB()
                break;
            case 1:
            addXL()
            // addMM()
                break;
            // case 2:
            // addDX()
            //     break;
            // case 3:
            // addXL()
            //     break;
            default:
                break;
        };
    };
    // function addMM(){
    //     str =   "<div class='layui-colla-item'>"
    //         +        "<h2 class='layui-colla-title'>密码框名称"
    //         +            "<span class='r layui-icon layui-icon-close deleteThis' title='删除这一行'></span>"
    //         +        "</h2>"
    //         +        "<div class='clearfix layui-colla-content layui-show'>"
    //         +           "<label class='layui-form-label width100'>密码框名称</label>"
    //         +            "<div class='layui-input-inline'>"
    //         +               "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //         +           "</div>"
    //         +       "</div>"
    //         +   "</div>"
    //         $(".userTemplate").append(str);
    // };
    // function addDX(){
    //     str =   "<div class='layui-colla-item'>"
    //         +        "<h2 class='layui-colla-title'>单选名称"
    //         +           "<span class='r layui-icon layui-icon-close deleteThis' title='删除这一行'></span>"
    //         +       "</h2>"
    //         +        "<div class='layui-colla-content layui-show'>"
    //         +           "<div class='clearfix'>"
    //         +               "<label class='layui-form-label width100'>单选名称</label>"
    //         +               "<div class='layui-input-inline'>"
    //         +                    "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //         +                "</div>"
    //         +           "</div>"
    //         +            "<div class='clearfix'>"
    //         +               "<label class='layui-form-label width100'>单选内容</label>"
    //         +                "<div class='layui-input-inline'>"
    //         +                   "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //         +               "</div>"
    //         +                "<span class='layui-inline'>请用半角号逗号隔开,如内容1,内容2,内容3</span>"
    //         +            "</div>"
    //         +       "</div>"
    //         +    "</div>"
    //         $(".userTemplate").append(str);
    // };
    function addXL(){
        str =   "<div class='layui-colla-item'>"
            +        "<h2 class='layui-colla-title'>下拉框名称"
            +             "<span class='r layui-icon layui-icon-close deleteThis' title='删除这一行'></span>"
            +         "</h2>"
            +         "<div class='layui-colla-content layui-show'>"
            +             "<div class='clearfix'>"
            +                 "<label class='layui-form-label width100'>下拉框名称</label>"
            +                 "<div class='layui-input-inline'>"
            +                    "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
            +                 "</div>"
            +             "</div>"
            +             "<div class='clearfix'>"
            +                 "<label class='layui-form-label width100'>下拉内容</label>"
            +                 "<div class='layui-input-inline'>"
            +                    "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
            +                 "</div>"
            +                 "<span class='layui-inline'>请用半角号逗号隔开,如内容1,内容2,内容3</span>"
            +            "</div>"
            +         "</div>"
            +     "</div>"
            $(".userTemplate").append(str);
    };
    function addWB(){
         str = "<div class='layui-colla-item'>"
                +    "<h2 class='layui-colla-title'>自定义名称"
                +        "<span class='r layui-icon layui-icon-close deleteThis' title='删除这一行'></span>"
                +    "</h2>"
                +    "<div class='layui-colla-content layui-show'>"
                +        "<div class='clearfix'>"
                +           "<label class='layui-form-label width100'>自定义名称</label>"
                +            "<div class='layui-input-inline'>"
                +               "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
                +            "</div>"
                +            "<span class='layui-inline'>如:QQ号、游戏帐号</span>"
                +        "</div>"
                +        "<div class='clearfix'>"
                +           "<label class='layui-form-label width100'>输入框提示</label>"
                +           "<div class='layui-input-inline'>"
                +                "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
                +            "</div>"
                +           "<div class='layui-input-inline' style='height: 38px;'>"
                +                "<input type='radio' name='gs' value='1' title='所有格式' checked=''>"
                +                "<input type='radio' name='gs' value='1' title='数字'>"
                +            "</div>"
                +           "<div class='layui-input-inline'>"
                +               "<label class='layui-form-label width'>最长字符</label>"
                +               "<div class='layui-input-inline'>"
                +                    "<input type='text' name='' class='layui-input' value='1' title='数字' maxlength='3' style='width: 50px;'>"
                +                "</div>"
                +           "</div>"
                +       "</div>"
                +    "</div>"
                +   " </div>"
        $(".userTemplate").append(str);
        form.render();
    }
    $(document).on('ajaxStart',function(){ //使用bind 
    loading = layer.load(3, {time: 10*1000})
    }).on('ajaxStop',function(){ //直接使用ajaxComplete
    layer.close(loading); 
    });
});   