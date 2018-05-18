
layui.define(['layer', 'form', "element", "jquery",""], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    element = layui.element,
    $ = layui.$;
    // loading
    var loading ;
    $(document).on('ajaxStart',function(){ //使用bind
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });

    var url = "../api/mapi.aspx";
    
    
    
       
    exports('index', function () {

    });
});   