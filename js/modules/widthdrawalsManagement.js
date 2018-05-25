
layui.define(['layer', 'form', "jquery","table","laydate"], function (exports) {
    var layer = layui.layer
    , form = layui.form,
    table = layui.table,
    laydate = layui.laydate,
    $ = layui.$;
    // loading
    var screenW = $(window).width();
    if (screenW > 1000) {
        screenW = 480;
    } else {
        screenW = 320;
    };
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
    // 点击提现按钮
    $(".widthdraw").on("click",function(){
        layer.open({
            id:"1",
            type: 2,
            title: '账户提现',
            shadeClose: true,
            shade: false,
            area: [screenW+"px", '320px'],
            content: "widthdrawals.html"
        });
    });
    var beginTime,endTime;
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
});   