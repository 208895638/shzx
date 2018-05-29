
layui.define(['layer', 'form', "jquery","table","laydate","laypage"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    laydate = layui.laydate,
    laypage = layui.laypage,
    $ = layui.$;
    // loading
    var loading,RegRules={

        number:function(val){
            var test =/^\d+(\.\d+)?$/;
            return test.test(val);
        }                          
    } ;
    var url = "../api/mapi.aspx";
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
    // 加载第一页数据
    renderTable(0);
     var result,count , currentPage, pageMount ,currentpage;
     function renderTable(pindex , currentpage){
        var postData = {
            m:"getchildmerchant",
            pindex:pindex
        }
        $.post(url , postData ,function (msg){
          if(msg.Code == 1){
            result = msg.Data,count = msg.RecordCount , currentPage = msg.CurIndex , pageMount = msg.PageSize;  //定义表格数据   数据总数  当前页   每一页显示的数据
            table.render({
              elem: '#test'
              ,data:msg.Data
              ,cols: [[ //表头
                    {field: 'PID', title: '商户ID', sort: true, fixed: 'left'}
                    ,{field: 'LoginName', title: '登录名',}
                    ,{field: 'MerchantName', title: '商户姓名',align:'center', templet: '#ZFBPermission'}
                    ,{field: 'QQ', title: 'QQ', }
                    ,{field: 'Rax', title: '基础手续费',align:'center', }
                    ,{field: 'Status', title: '状态',templet: '#state'} 
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
    //  table.render({
    //     elem: '#test'
    //     ,url:'./data.json'
    //     ,cellMinWidth: 80
    //     ,cols: [[ //表头
    //         {field: 'id', title: '商户ID', sort: true, fixed: 'left'}
    //         ,{field: 'username', title: '登录名',}
    //         ,{field: 'ZFBPermission', title: '姓名',align:'center', templet: '#ZFBPermission'}
    //         ,{field: 'QQ', title: 'QQ', }
    //         ,{field: 'state', title: '状态',align:'center', templet: '#state'}
    //         ,{field: 'rate', title: '费率',} 
    //         ,{field: 'operate', title: '操作',align:'center', templet: '#operate',fixed: 'right'}
    //     ]]
    //     ,page: true
    //   });
      //监听支付宝权限操作
       //监听工具条
        table.on('tool(test)', function(obj){
            var data = obj.data;
            var pid = data.PID;
            if(obj.event == 'edit'){
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
                content: 'jcsxf.html?mid='+pid
            });
                // layer.prompt({title: '修改费率（请输入0以上的数字，如20.01）', formType: 0}, function(text, index){
                //     console.log(RegRules.number(text));
                //     if(!RegRules.number(text)){
                //         layer.msg("请输入0以上的数字不可包含特殊字符!");
                        
                //     }else{
                //         data.rate = text;
                //         obj.update({
                //             rate: text
                //           });
                //         layer.close(index);
                //     }
                // });
            }
        });
        // 监听表格编辑
        // table.on('edit(test)', function(obj){
        //     var value = obj.value //得到修改后的值
        //     ,data = obj.data //得到所在行所有键值
        //     ,field = obj.field; //得到字段
        //     layer.msg('修改成功费率更改为：'+ value);
        //   });
      //监听性别操作
      form.on('switch(sexDemo)', function(obj){
        layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
      });
      
      //监听锁定操作
      form.on('checkbox(lockDemo)', function(obj){
        layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
      });
    
    
    
       
    exports('index', function () {

    });
});   