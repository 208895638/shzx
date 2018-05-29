
layui.define(['layer', 'form', "jquery","table","laydate","laypage"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    laydate = layui.laydate,
    laypage = layui.laypage,
    $ = layui.$;
    // loading
    var screenW = $(window).width(),loading ,url = "../api/mapi.aspx";
    if (screenW > 1000) {
        screenW = 480;
    } else {
        screenW = 320;
    };
    // 提现类别下拉框查询
    form.on('select(typeOfGetCash)',function(data){
      console.log(data.value);
      searchType = data.value;
    });
    // 提示提现状态
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        layer.tips(data.sxf)
        if(layEvent == 'tip1'){ //编辑
          if(data.HandInfo){
            layer.msg(data.HandInfo) 
          }
        }
    });
    // 点击提现按钮
    $(".widthdraw").on("click",function(){
        layer.open({
            id:"1",
            type: 2,
            title: '账户提现',
            shadeClose: true,
            shade: false,
            area: [screenW+"px", '360px'],
            content: "widthdrawals.html"
        });
    });
    var myDate = new Date() ,year=myDate.getFullYear(), month=myDate.getMonth()+1,  date=myDate.getDate();
    var beginTime =year+" - "+month+" - "+date , endTime=year+" - "+month+" - "+date , searchType = 5;
    var url = "../api/mapi.aspx";
    
    var result,count , currentPage, pageMount ,currentpage;  //参数意思是 获取的总数据 table的总数据的个数  当前页 一页展示多少条数据 点击分页时传入的值
    $(".searchBtn").on("click",function(){
      renderTable(0);
    });
    noResult();
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

    function noResult(){
      var noData = [{SubmitDatetime:"",AliAccount:"",Money:"",Rax:"",Stauts:"",SubmitDatetime:""}];
      table.render({
        elem: '#test',
        data:noData
        ,cols: [[ //表头
            {field: 'SubmitDatetime', title: '提交时间',align:'center', sort: true},
            {field: 'AliAccount', title: '入款账号',align:'center' , sort: true},
            {field: 'Money', title: '提现金额',align:'center' ,sort: true }
            ,{field: 'Rax', title: '手续费', sort: true, align:'center' }
            ,{field: 'Stauts', title: '提现状态', sort: true}
            ,{field: 'SubmitDatetime', title: '处理时间',sort: true} 
            
        ]],
      });
      laypage.render({
        elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: 0 //数据总数，从服务端得到
        ,limit:0  //每页展示的条数
        ,groups:0  //连续出现的页码个数
        ,layout:["prev","page","next","count"]
        ,jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            
          }
      });
    }
    //   时间
      laydate.render({
        elem: '#dataTime'
        ,range: '到'
        ,format: 'yyyy年M月d日',
        value: year+'年'+month+'月'+date+'日 到 '+year+'年'+month+'月'+date+'日'
        ,isInitValue: true,
        done:function(value, date, endDate){
          beginTime = date.year+" - "+date.month+" - "+date.date;
          endTime = endDate.year+" - "+endDate.month+" - "+endDate.date;
        }
      }); 
    //   移动端点击查询
      laydate.render({
        elem: ".begincxsj"
        ,format: 'yyyy年M月d日',
        value: myDate
        ,isInitValue: true,
        done:function(value, date, endDate){
          beginTime = date.year+" - "+date.month+" - "+date.date;
        }
      });
      laydate.render({
        elem: ".endcxsj"
        ,format: 'yyyy年M月d日',
        value: myDate
        ,isInitValue: true,
        done:function(value, date, endDate){
          endTime = date.year+" - "+date.month+" - "+date.date;
        }
      });
      $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
});   