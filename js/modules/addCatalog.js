
layui.define(['layer', 'form', "jquery" ], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    $ = layui.$;
    
    $(document).on('ajaxStart',function(){ //使用bind 
    loading = layer.load(3, {time: 10*1000})
    }).on('ajaxStop',function(){ //直接使用ajaxComplete
    layer.close(loading); 
    });
});   