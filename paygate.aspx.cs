using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HJLib;
using HJLib.COM;
using System.Data;
using HJLib.HJSession;
using HJLib.Entity;
using HJLib.COM.xdd;

namespace MerchantCenter.index
{
    public partial class paygate : HJLib.COM.BPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int mid = 0;
            if (!IsPostBack)
            {
                if (!Int32.TryParse(Request.QueryString["mid"], out mid))
                {
                    //place.Visible = false;
                    Response.Write("需要商户编号！");
                    return;
                }
                if (BLLFactory.BLLMerchant.GetMerchantByID(mid).Rows.Count == 0)
                {
                    Response.Write("不存在此商户！");
                    //  place.Visible = false;
                    return;
                }
                Session["MID"] = mid.ToString();
            }

        }
    }
}