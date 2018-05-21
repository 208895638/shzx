
layui.define(['layer', 'form', "jquery","table"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    $ = layui.$;
    // loading
    var loading;
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
     
     table.render({
        elem: '#test'
        ,url:'./data2.json'
        ,cols: [[ //表头
            {field: 'TJTime', title: '提交时间', sort: true}
            ,{field: 'account', title: '入款账号',}
            ,{field: 'money', title: '提现金额', }
            ,{field: 'sxf', title: '手续费',} 
            ,{field: 'state', title: '提现状态',align:'center', templet: '#state',style:'cursor: pointer;',width:150, toolbar: '#state'}
            ,{field: 'HandleTime', title: '处理时间',}
        ]]
      });
    var url = "../api/mapi.aspx";
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        layer.tips(data.sxf)
        if(layEvent == 'tip1'){ //编辑
            layer.msg(data.info)
        }
    });
    exports('index', function () {

    });
});   