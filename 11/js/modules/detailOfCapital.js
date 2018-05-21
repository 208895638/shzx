
layui.define(['layer', 'form', "jquery","table"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
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
    //  table.render({
    //     elem: '#test'
    //     ,url:'./data1.json'
    //     ,cols: [[ //表头
    //         {field: 'typeOfChange', title: '变动类型',align:'center'}
    //         ,{field: 'changeOfMoney', title: '变动资金', sort: true,align:'center',templet: '#sexTpl1'}
    //         ,{field: 'old', title: '变化前', }
    //         ,{field: 'new', title: '变化后',} 
    //         ,{field: 'changeOfTime', title: '变动时间',align:'center',}
    //     ]]
    //     ,page: true
    //   });
      
    var url = "../api/mapi.aspx";
    
    
       
    exports('index', function () {

    });
});   