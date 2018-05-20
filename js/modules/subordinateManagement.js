
layui.define(['layer', 'form', "element", "jquery","table"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    element = layui.element,
    table = layui.table,
    $ = layui.$;
    // loading
    var loading,RegRules={

        number:function(val){
            var test =/^\d+(\.\d+)?$/;
            return test.test(val);
        }                          
    } ;
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
     
     table.render({
        elem: '#test'
        ,url:'./data.json'
        ,cellMinWidth: 80
        ,cols: [[ //表头
            {field: 'id', title: '商户ID', sort: true, fixed: 'left'}
            ,{field: 'username', title: '姓名',}
            ,{field: 'QQ', title: 'QQ', }
            ,{field: 'rate', title: '费率',} 
            ,{field: 'ZFBPermission', title: '支付宝权限',align:'center', templet: '#ZFBPermission'}
            ,{field: 'WXPermission', title: '微信权限',align:'center', templet: '#WXPermission'}
            ,{field: 'YKTPermission', title: '一码通权限',align:'center',templet: '#YKTPermission'}
            ,{field: 'state', title: '状态',align:'center', templet: '#state'}
            ,{field: 'operate', title: '操作',align:'center', templet: '#operate',fixed: 'right'}
        ]]
        ,page: true
      });
      //监听支付宝权限操作
        form.on("switch(ZFBPermission)",function(obj){
            layer.msg("支付宝权限"+this.value + ' ' + this.name + '：'+ obj.elem.checked)
        })
      //监听微信权限操作
        form.on("switch(WXPermission)",function(obj){
            layer.msg("微信权限"+this.value + ' ' + this.name + '：'+ obj.elem.checked)
        })
        //监听一码通权限权限操作
        form.on("switch(YKTPermission)",function(obj){
            layer.msg("一码通权限权限"+this.value + ' ' + this.name + '：'+ obj.elem.checked)
        })
        //状态操作
        form.on("switch(state)",function(obj){
            layer.msg("ID"+this.value + '状态 ' + this.name + '：'+ obj.elem.checked)
        });
       //监听工具条
        table.on('tool(test)', function(obj){
            var data = obj.data;
            console.log(data.rate)
            if(obj.event == 'edit'){
                layer.prompt({title: '修改费率（请输入0以上的数字，如20.01）', formType: 0}, function(text, index){
                    console.log(RegRules.number(text));
                    if(!RegRules.number(text)){
                        layer.msg("请输入0以上的数字不可包含特殊字符!");
                        
                    }else{
                        data.rate = text;
                        layer.close(index);
                    }
                });
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
    var url = "../api/mapi.aspx";
    
    
       
    exports('index', function () {

    });
});   