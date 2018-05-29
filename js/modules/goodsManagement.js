
layui.define(['layer', 'form', "jquery" , "element" ,"table","laydate","laypage"], function (exports) {
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
        screenW = 400;
    } else {
        screenW = 320;
    };
    var jsonData = [
        {mlmc:"1231",mlpx:"1",status:1},
        {mlmc:"12311",mlpx:"1",status:1},
        {mlmc:"123112",mlpx:"1",status:1},
        {mlmc:"12312",mlpx:"1",status:1}
    ];
    // 
    $(".addCatalog").on("click",function(){
        layer.open({
            id:"1",
            type: 2,
            title: '添加目录',
            shadeClose: true,
            shade: false,
            area: [screenW+"px", '190px'],
            content: "addCatalog.html"
        });
    });
    table.render({
        elem: '#test'
        ,data:jsonData
        ,cols: [[ //表头
            {field: 'mlmc', title: '目录名称', sort: true}
            ,{field: 'mlpx', title: '目录排序',sort: true}
            ,{field: 'status', title: '操作',align:'center', templet: '#state',style:'cursor: pointer;',width:150, toolbar: '#state',sort: true}
        ]]
      });
    function renderTable(pindex , currentpage){
        var postData = {
          m:"getwithdraw" ,
          status:searchType,
          btime : beginTime,
          etime : endTime,
          pindex :pindex
        }
        $.post(url , postData ,function (msg){
          if(msg.Code == 1){
            result = msg.Data,count = msg.RecordCount , currentPage = msg.CurIndex , pageMount = msg.PageSize;  //定义表格数据   数据总数  当前页   每一页显示的数据
            table.render({
              elem: '#test'
              ,data:msg.Data
              ,cols: [[ //表头
                  {field: 'SubmitDatetime', title: '提交时间', sort: true}
                  ,{field: 'AliAccount', title: '入款账号',}
                  ,{field: 'Money', title: '提现金额', }
                  ,{field: 'Rax', title: '手续费',} 
                  ,{field: 'Stauts', title: '提现状态',align:'center', templet: '#state',style:'cursor: pointer;',width:150, toolbar: '#state'}
                  ,{field: 'SubmitDatetime', title: '处理时间',}
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
            noResult();
          }
          if(msg.Code == "-3"){
            layer.msg("登录状态已失效,3秒后跳转到登录页面!")
            if (window != top) {
              setTimeout(function(){top.location.href = "login.html"; },3000);
            }
        };
        })
        
      }
    $(document).on('ajaxStart',function(){ //使用bind 
    loading = layer.load(3, {time: 10*1000})
    }).on('ajaxStop',function(){ //直接使用ajaxComplete
    layer.close(loading); 
    });
});   