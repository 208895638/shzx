
layui.define(['layer', 'form', "jquery","table","laydate","laypage"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    laypage = layui.laypage,
    $ = layui.$,
    laydate = layui.laydate;
    // loading
    var loading,RegRules={

        number:function(val){
            var test =/^\d+(\.\d+)?$/;
            return test.test(val);
        }                          
    } ;
    // 点击查询需要获得的值
    var beginTime = "2018 - 05 -23" , endTime="2018 - 05 -23" , searchType , pindex = 1;
    $(document).on('ajaxStart',function(){ //使用bind 
        loading = layer.load(3, {time: 10*1000})
     }).on('ajaxStop',function(){ //直接使用ajaxComplete
        layer.close(loading); 
     });
     var myDate = new Date();
     //获取当前年
     var year=myDate.getFullYear();
     //获取当前月
     var month=myDate.getMonth()+1;
     //获取当前日
     var date=myDate.getDate();
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
        value: year+'年'+month+'月'+date
        ,isInitValue: true,
        done:function(value, date, endDate){
          beginTime = date.year+" - "+date.month+" - "+date.date;
        }
      });
      laydate.render({
        elem: ".endcxsj"
        ,format: 'yyyy年M月d日',
        value: year+'年'+month+'月'+date
        ,isInitValue: true,
        done:function(value, date, endDate){
          endTime = date.year+" - "+date.month+" - "+date.date;
        }
      });
    var url = "../api/mapi.aspx";
    //获取查询类型下拉框的值
    var data = {
      m:"getbtype"
    };
    // 下拉框
    $.post(url , data ,function(msg){
       searchType = msg.Data[0].PID;
      if(msg.Code == 1){
        var res = msg.Data,str = "";
        $.each(res , function(index , item){
          str+="<option value='"+item.PID +"'>"+item.BName +"</option>"
        })
        $(".searchType").html(str);
        form.render();
        str = "";
      }
    }) ;
    // 获取下拉框的选中
    form.on('select(searchType)', function(data){
      
      searchType = data.value;

    }); 
    $(".searchBtn").on("click",function(){
      renderTable(0);
    });
    var result,count , currentPage, pageMount ,currentpage;  //参数意思是 获取的总数据 table的总数据的个数  当前页 一页展示多少条数据 点击分页时传入的值
    // 渲染数据及分页
    function renderTable(pindex , currentpage){
      
      var searchData = {
        m:"pagebh",
        btime:beginTime,
        etime:endTime,
        btype:searchType,
        pindex:pindex
      };
      $.post(url , searchData ,function(res){
        if(res.Code == 1){
          $(".detailOfCapital").show();
          result = res.Data,count = res.RecordCount , currentPage = res.CurIndex , pageMount = res.PageSize;  //定义表格数据   数据总数  当前页   每一页显示的数据
          // 数据
          table.render({
            elem: '#test',
            data:result
            ,cols: [[ //表头
                {field: 'HistoryDate', title: '时间',align:'center', sort: true},
                {field: 'BalanceType', title: '变动类型',align:'center' , sort: true},
                {field: 'OrderNO', title: '相关单号',align:'center' ,sort: true }
                ,{field: 'TradeAmount', title: '交易金额', sort: true, align:'center' }
                ,{field: 'TradeBefore', title: '交易前', sort: true}
                ,{field: 'TradeAfter', title: '交易后',sort: true} 
                
            ]],
          });
          laypage.render({
            elem: 'detailOfCapital' //注意，这里的 test1 是 ID，不用加 # 号
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
          layer.msg(res.Msg);
          noResult();
        }
      })
    }
    function noResult(){
      var noData = [{BalanceType:"",HistoryDate:"",LAY_TABLE_INDEX:"",OrderNO:"",TradeAfter:"",TradeAmount:"",TradeBefore:""}];
      table.render({
        elem: '#test',
        data:noData
        ,cols: [[ //表头
            {field: 'HistoryDate', title: '时间',align:'center', sort: true},
            {field: 'BalanceType', title: '变动类型',align:'center' , sort: true},
            {field: 'OrderNO', title: '相关单号',align:'center' ,sort: true }
            ,{field: 'TradeAmount', title: '交易金额', sort: true, align:'center' }
            ,{field: 'TradeBefore', title: '交易前', sort: true}
            ,{field: 'TradeAfter', title: '交易后',sort: true} 
            
        ]],
      });
      laypage.render({
        elem: 'detailOfCapital' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: 0 //数据总数，从服务端得到
        ,limit:0  //每页展示的条数
        ,groups:0  //连续出现的页码个数
        ,layout:["prev","page","next","count"]
        ,jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            
          }
      });
    }
    exports('index', function () {

    });
});   