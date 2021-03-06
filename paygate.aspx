﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="paygate.aspx.cs" Inherits="MerchantCenter.index.paygate" %>

<!DOCTYPE html>
<html lang="en">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="./layui/css/layui.css">
    <link rel="stylesheet" href="./layui/css/global.css">
    <link rel="stylesheet" href="css/style.css">
    <title>客户充值</title>
</head>
<body>
   <form runat="server" id="form1">
  <asp:HiddenField ID="merchantid" runat="server" />
  <asp:PlaceHolder runat="server" ID="place">
        <div class="layui-layout layui-layout-admin">
            <div class="layui-tab layui-tab-brief subordinateManagement" lay-filter="demoTitle">
                <div class="site-demo-title layui-tab-title top0" lay-filter="demoTitle" style="border-bottom: none;
                    background: #fff; padding: 16px 0;">
                    <fieldset class="layui-elem-field layui-field-title">
                        <legend>客户充值</legend>
                    </fieldset>
                </div>
                <div class="layui-body layui-tab-content site-demo site-demo-body bg_fff layui-form top72">
                    <div class="layui-tab-item layui-show">
                        <div class="row clearfix">
                            <div class="layui-col-md10 layui-col-md-offset1" style="margin-top: 128px;">
                                <div class="recharge layui-form">
                                    <ul class="layui-col-md3 layui-col-md-offset4 rechargeType">
                                        <li class="on">
                                            <div class="layui-form-item">
                                                <div class="rechargeBox">
                                                    <input type="radio" name="sex" class="wx" lay-filter="cz" value="2" checked>
                                                    <a href="javascript:;">
                                                        <img src="images/weichat.png" alt="">
                                                        微信 </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="layui-form-item">
                                                <div class="rechargeBox">
                                                    <input type="radio" class="zfb" name="sex" value="1" lay-filter="cz">
                                                    <a href="javascript:;">
                                                        <img src="images/zhifubao.png" alt="">支付宝 </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="special">
                                            <input type="text" name="title" id="inputmoney" placeholder="请输入需要充值的金额"
                                                class="layui-input">
                                            <div class="notice">
                                                充值手续费<span style="color: red;"></span>(最低<i style="color: red;">0</i>元),到账<em
                                                    style="color: red;">0</em>元
                                            </div>
                                        </li>
                                         <li class="special">
                                            <input type="text" required lay-verify="required" placeholder="请输入备注"
                                                autocomplete="off" class="layui-input">
                                            
                                        </li>
                                      
                                        <li class="special">
                                            <div class="layui-btn-container">
                                                <button type="button" class="layui-btn layui-btn-fluid layui-btn-disabled czBtn">
                                                    立即充值</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </asp:PlaceHolder>
  </form>
</body>
<script src="./layui/layui.js"></script>
<script>
    layui.config({
        base: './js/modules/'
    }).use('paygate'); //加载入口
</script>
</html>
