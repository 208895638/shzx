
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
   
    $(".withdrawals").on("click",function(){
        layer.open({
            type: 2,
            fixed: true, //不固定
            maxmin: true,
            title:"提现管理",
            content: 'widthdrawals.html',
            min:function(id){
                layer.msg("暂不支持最小化操作！");
                return false;
            }
        });
    });
       
    exports('index', function () {

    });
});   