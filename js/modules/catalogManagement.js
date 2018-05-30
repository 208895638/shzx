
layui.define(['layer', 'form', "jquery" , "table","laydate","laypage"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    element = layer.element,
    table = layui.table,
    laydate = layui.laydate,
    laypage = layui.laypage,
    $ = layui.$;
    // loading
    var screenW = $(window).width(),loading ,url = "../api/mapi.aspx" , str="";
    if (screenW > 1000) {
        screenW = 700;
    } else {
        screenW = 320;
    };
    var data1 = [
        {

        }
    ]
    // table.render({
    //     elem: '#test'
    //     ,data:msg.Data
    //     ,cols: [[ //表头
    //           {field: 'PID', title: '模板名称', sort: true, fixed: 'left'}
    //           ,{field: 'LoginName', title: '字段1',}
    //           ,{field: 'MerchantName', title: '字段2',align:'center', templet: '#ZFBPermission'}
    //           ,{field: 'QQ', title: '字段3', }
    //           ,{field: 'Rax', title: '字段4',align:'center', }
    //           ,{field: 'Status', title: '是否显示',templet: '#state'} 
    //           ,{field: 'operate', title: '操作',align:'center', templet: '#operate',fixed: 'right'}
    //       ]]
    //   });
     var result,count , currentPage, pageMount ,currentpage;
     function renderTable(pindex , currentpage){
        var postData = {
            m:"getchildmerchant",
            pindex:pindex
        };
        $.post(url , postData ,function (msg){
          if(msg.Code == 1){
            result = msg.Data,count = msg.RecordCount , currentPage = msg.CurIndex , pageMount = msg.PageSize;  //定义表格数据   数据总数  当前页   每一页显示的数据
            table.render({
              elem: '#test'
              ,data:msg.Data
              ,cols: [[ //表头
                    {field: 'PID', title: '模板名称', sort: true, fixed: 'left'}
                    ,{field: 'LoginName', title: '字段1',}
                    ,{field: 'MerchantName', title: '字段2',align:'center', templet: '#ZFBPermission'}
                    ,{field: 'QQ', title: '字段3', }
                    ,{field: 'Rax', title: '字段4',align:'center', }
                    ,{field: 'Status', title: '是否显示',templet: '#state'} 
                    ,{field: 'operate', title: '操作',align:'center', templet: '#operate',fixed: 'right'}
                ]]
            });
            laypage.render({
              elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
              ,count: count //数据总数，从服务端得到
              ,limit:pageMount  //每页展示的条数
              ,groups:10  //连续出现的页码个数
              ,limits:[10,20,30,40],
              curr:currentpage
              ,layout:["prev","page","next","count"]
              ,jump: function(obj, first){
                  //obj包含了当前分页的所有参数，比如：
                  currentpage = obj.curr;
                  //首次不执行
                  if(!first){
                    //do something
                    renderTable(obj.curr,currentpage);
                  }
                }
            });
          }else{
            layer.msg(msg.Msg);
            // noResult();
          }
          if(msg.Code == "-3"){
            layer.msg("登录状态已失效,3秒后跳转到登录页面!")
          if (window != top) {
            setTimeout(function(){top.location.href = "login.html"; },3000);
          }
        };
        })
        
      }





    //点击添加
    $(".addTemplate").on("click",function(){
        layer.open({
            id:"1",
            type: 2,
            title: '商品模板管理',
            shadeClose: true,
            shade: false,
            area: [screenW+"px", '366px'],
            content: "addTemplate.html"
        });
    });
    // // 点击删除
    // $(".userTemplate").on("click",".deleteThis",function(e){
    //     e.stopPropagation();
    //     $(this).parents(".layui-colla-item").remove();
    // });
    // // 遍历添加按钮 分别给他们对应的点击事件
    // $.each($("#addGroup button") , function(){
    //     $(this).on("click",function(){
    //         var i = $(this).index();
    //         addField(i)
    //     })
    // });
    // function addField(id){
    //     switch (id) {
    //         case 0:
    //         addWB()
    //             break;
    //         case 1:
    //         addXL()
    //             break;
    //         default:
    //             break;
    //     };
    // };
    
    // function addXL(){
    //     str =   "<div class='layui-colla-item'>"
    //         +        "<h2 class='layui-colla-title'>下拉框名称"
    //         +             "<span class='r layui-icon layui-icon-close deleteThis' title='删除这一行'></span>"
    //         +         "</h2>"
    //         +         "<div class='layui-colla-content layui-show'>"
    //         +             "<div class='clearfix'>"
    //         +                 "<label class='layui-form-label width100'>下拉框名称</label>"
    //         +                 "<div class='layui-input-inline'>"
    //         +                    "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //         +                 "</div>"
    //         +             "</div>"
    //         +             "<div class='clearfix'>"
    //         +                 "<label class='layui-form-label width100'>下拉内容</label>"
    //         +                 "<div class='layui-input-inline'>"
    //         +                    "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //         +                 "</div>"
    //         +                 "<span class='layui-inline'>请用半角号逗号隔开,如内容1,内容2,内容3</span>"
    //         +            "</div>"
    //         +         "</div>"
    //         +     "</div>"
    //         $(".userTemplate").append(str);
    // };
    // function addWB(){
    //      str = "<div class='layui-colla-item'>"
    //             +    "<h2 class='layui-colla-title'>自定义名称"
    //             +        "<span class='r layui-icon layui-icon-close deleteThis' title='删除这一行'></span>"
    //             +    "</h2>"
    //             +    "<div class='layui-colla-content layui-show'>"
    //             +        "<div class='clearfix'>"
    //             +           "<label class='layui-form-label width100'>自定义名称</label>"
    //             +            "<div class='layui-input-inline'>"
    //             +               "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //             +            "</div>"
    //             +            "<span class='layui-inline'>如:QQ号、游戏帐号</span>"
    //             +        "</div>"
    //             +        "<div class='clearfix'>"
    //             +           "<label class='layui-form-label width100'>输入框提示</label>"
    //             +           "<div class='layui-input-inline'>"
    //             +                "<input type='text' lay-verify='required|phone' class='layui-input' value=''>"
    //             +            "</div>"
    //             +           "<div class='layui-input-inline' style='height: 38px;'>"
    //             +                "<input type='radio' name='gs' value='1' title='所有格式' checked=''>"
    //             +                "<input type='radio' name='gs' value='1' title='数字'>"
    //             +            "</div>"
    //             +           "<div class='layui-input-inline'>"
    //             +               "<label class='layui-form-label width'>最长字符</label>"
    //             +               "<div class='layui-input-inline'>"
    //             +                    "<input type='text' name='' class='layui-input' value='1' title='数字' maxlength='3' style='width: 50px;'>"
    //             +                "</div>"
    //             +           "</div>"
    //             +       "</div>"
    //             +    "</div>"
    //             +   " </div>"
    //     $(".userTemplate").append(str);
    //     form.render();
    // }
    $(document).on('ajaxStart',function(){ //使用bind 
    loading = layer.load(3, {time: 10*1000})
    }).on('ajaxStop',function(){ //直接使用ajaxComplete
    layer.close(loading); 
    });
});   