<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double_12_gift {
    position: relative;
    height: 101%;
    .banner2 {
      position: absolute;
      left: 0;
      top: 0%;
      width: 100%;
      height: px2rem(627px);
      z-index: 1;
    }
    .title-content {
      width: 100%;
      position: absolute;
      top: px2rem(26px);
      text-align: center;
      .title {
        display: inline-block;
        font-size: px2rem(24px);
        color: #fff;
        position: relative;
        z-index: 2;
        &::before {
          content: "";
          position: absolute;
          left: px2rem(-30px);
          top: px2rem(5px);
          width: px2rem(17px);
          height: px2rem(16px);
          background: url(/static/images/activity/applet/double_12/unit.png) center no-repeat;
          background-size: 100% 100%;
        }
        &::after {
          content: "";
          position: absolute;
          right: px2rem(-30px);
          top: px2rem(5px);
          width: px2rem(17px);
          height: px2rem(16px);
          background: url(/static/images/activity/applet/double_12/unit.png) center no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .main-container {
      position: absolute;
      left: 0;
      top: 33%;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      z-index: 2;
      .store {
        margin: -5% px2rem(52px) px2rem(73px);
        padding: px2rem(38px);
        height: px2rem(114px);
        background-color: #fff;
        border-radius: px2rem(10px);
        .logo {
          width: px2rem(113px);
          height: px2rem(113px);
          float: left;
        }
        .store-info {
          float: left;
          width: 75%;
          height: px2rem(113px);
          margin: px2rem(13px) 0 0 px2rem(22px);
          text-align: left;
          h3 {
            color: #333333;
            height: px2rem(50px);
            line-height: px2rem(50px);
            font-size: px2rem(36px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > div {
            color: #999999;
            height: px2rem(50px);
            line-height: px2rem(50px);
            font-size: px2rem(24px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

        }
      }
      .content1 {
        width: 100%;
        height: auto;
        background-color: #23035C;
        padding-top: px2rem(70px);
        margin-top: -9%;
        .tip-content {
          width: 100%;
          margin: px2rem(20px) auto;
          .tip {
            height: px2rem(35px);
            line-height: px2rem(35px);
            font-size: px2rem(36px);
            color: #fff;
            font-weight: 400;
            border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
            padding: px2rem(17px) px2rem(17px);
            display: inline-block;
            span {
              color: #FFE901;
            }
          }
        }
        .gift-code {
          margin: px2rem(78px) px2rem(52px);
          padding: px2rem(49px) px2rem(40px);
          background-color: #4D0BAA;
          h3 {
            font-size: px2rem(30px);
            color: #fff;
          }
          .code {
            height: px2rem(105px);
            line-height: px2rem(105px);
            background-color: #4D0BAA;
            font-size: px2rem(48px);
            font-weight: 800;
            color: #FFE801;
            background-color: rgba(35, 3, 92, 1);
            margin-top: px2rem(28px);
          }
          .delivery-code {
            color: #FE5A5A;
          }
          p {
            font-size: px2rem(20px);
            color: #fff;
            margin-top: px2rem(31px);
            line-height: px2rem(30px);
          }
          .pre {
            padding-left: px2rem(30px);
            text-align: left;
            position: relative;
          }
          .no-pre {
            text-align: center;
          }
          .pre::before {
            position: absolute;
            left: 0;
            top: 6%;
            content: "";
            width: px2rem(12px);
            height: px2rem(12px);
            background: url("/static/images/activity/applet/double_12/pre.png") center no-repeat;
            background-size: 100%;
          }
        }
        .gifts {
          position: relative;
          height: px2rem(377px);
          border-radius: px2rem(20px);
          background-color: #5315B1;
          margin: px2rem(60px) px2rem(52px) px2rem(40px);
          /*padding: px2rem(20px);*/
          display: flex;
          .left {
            width: px2rem(303px);
            position: relative;
            background-color: #E29894;
            border-radius: px2rem(20px) 0 0 px2rem(20px);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 3;
            .gifts-coupon {
              position: absolute;
              left: 0;
              top: 32%;
              width: 100%;
              display: flex;
              align-items: flex-start;
              justify-content: center;
              color: #fff;
              font-weight: bold;
              font-size: px2rem(100px);
              span {
                font-size: px2rem(40px);
              }
            }
            .gifts-tip {
              font-size: px2rem(30px);
              color: #fff;
              position: absolute;
              left: 0;
              top: 62%;
              width: 100%;
            }
            .gifts-title {
              font-size: px2rem(30px);
              color: #fff;
              position: absolute;
              left: 0;
              top: 85%;
              width: 100%;
              span {
                font-size: px2rem(24px);
              }
            }
            img {
              width: px2rem(59px);
              height: px2rem(59px);
              position: absolute;
              right: -10%;
              top: 39%;
            }

          }
          .right {
            width: px2rem(342px);
            border-radius: 0 px2rem(20px) px2rem(20px) 0;
            position: relative;
            z-index: 2;
            img {
              width: px2rem(342px);
              height: px2rem(377px);
              border-radius: 0 px2rem(20px) px2rem(20px) 0;
            }
            .gifts-name {
              position: absolute;
              top: 10%;
              left: 8%;
              color: #fff;
              font-size: px2rem(36px);
            }
            .gifts-scale {
              position: absolute;
              top: 32%;
              width: 100%;
              left: 0;;
              color: #E34444;
              font-size: px2rem(36px);
            }

          }
        }
        .edge {
          width: 100%;
          height: px2rem(622px);
          background: url(/static/images/activity/applet/double_12/arc_bg.png) center no-repeat;
          background-size: 100%;
          .tip1 {
            font-size: px2rem(30px);
            color: #fff;
          }
          .btn {
            margin: px2rem(30px) px2rem(49px);
            height: px2rem(100px);
            line-height: px2rem(100px);
            text-align: center;
            font-size: px2rem(36px);
            border-radius: px2rem(49px);
          }
          .btn-online {
            background-color: #FFE801;
            color: #3B0A87;
          }
          .tip2 {
            color: #fff;
            font-size: px2rem(24px);
          }
          .gift-img {
            width: 100%;
            height: px2rem(850px);
            margin-top: 17%;
          }

        }
        .edge-delivery {
          padding-top: 24%;
          margin-top: -22%;
          background: url(/static/images/activity/applet/double_12/arc_bg.png) 0 0 no-repeat;
          background-size: 100%;
        }

      }
      .content2 {
        width: 100%;
        background-color: #3B0A87;
        padding-top: 38%;
        height: 100%;
        .gifts-content {
          width: 100%;
          height: px2rem(250px);
          display: flex;
          justify-content: space-around;
          align-items: center;
          .gifts-item {
            width: px2rem(199px);
            height: 100%;
            display: flex;
            flex-direction: column;
            .gifts-item-info {
              width: px2rem(199px);
              height: px2rem(199px);
              border-radius: px2rem(20px);
              background-color: #FFE801;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
              .img {
                height: px2rem(150px);
                display: flex;
                align-items: center;
                img {
                  /*max-width:100%;*/
                  max-height: px2rem(150px);
                }
              }
              p {
                height: px2rem(21px);
                line-height: px2rem(21px);
                font-size: px2rem(20px);
                color: #FF0000;
                margin: px2rem(10px) auto;
              }
              .exchange {
                position: absolute;
                right: -6%;
                top: 7%;
                color: #FF0000;
                font-size: px2rem(30px);
                border: 1px solid #FF0000;
                padding: px2rem(5px);
                transform: rotate(45deg);
                -ms-transform: rotate(45deg); /* IE 9 */
                -moz-transform: rotate(45deg); /* Firefox */
                -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
                -o-transform: rotate(45deg); /* Opera */
              }
            }
            .gifts-item-title {
              width: px2rem(199px);
              margin-top: px2rem(25px);
              color: #FFE801;
              font-size: px2rem(26px);
            }
          }
        }
        .gifts-progress {
          height: px2rem(44px);
          margin: px2rem(40px) px2rem(36px);
          padding: px2rem(8px) px2rem(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          background-color: #380782;
          text-align: left;
          border-radius: px2rem(30px);
          position: relative;
          .gifts-progress-img {
            position: absolute;
            left: px2rem(10px);
            top: px2rem(8px);
            /*width: 60%;*/
            max-width: 100%;
            height: px2rem(44px);
            background: url("/static/images/activity/applet/double_12/progress.png") 0 no-repeat;
            background-size: px2rem(650px) px2rem(44px);
            border-radius: px2rem(22px);
          }
          .gifts-progress-num {
            position: absolute;
            left: px2rem(10px);
            top: px2rem(8px);
            /*width: 60%;*/
            max-width: 100%;
            min-width: 21%;
            height: px2rem(44px);
            line-height: px2rem(44px);
            text-align: center;
            color: #FFE801;
            font-size: px2rem(24px);
          }
        }
        .report-btn-down, .report-btn-up {
          position: relative;
          height: px2rem(33px);
          line-height: px2rem(33px);
          font-size: px2rem(25px);
          color: #fff;
          margin: px2rem(50px) 0 0 55%;
          display: inline-block;
        }
        .report-btn-down::after {
          content: "";
          position: absolute;
          right: px2rem(-50px);
          top: 0;

          width: px2rem(33px);
          height: px2rem(33px);
          background: url(/static/images/activity/applet/double_12/down.png) center no-repeat;
          background-size: 100% 100%;
        }
        .report-btn-up::after {
          content: "";
          position: absolute;
          right: px2rem(-50px);
          top: 0;
          width: px2rem(33px);
          height: px2rem(33px);
          background: url(/static/images/activity/applet/double_12/up.png) center no-repeat;
          background-size: 100% 100%;
        }
        .active-content {
          background: rgba(83, 21, 177, 1);
          border-radius: px2rem(20px);
          margin: px2rem(39px) px2rem(52px) px2rem(49px);
          padding: px2rem(20px) px2rem(52px) px2rem(52px);
          p {
            font-size: px2rem(26px);
            color: #fff;
            margin-top: px2rem(30px);
            line-height: px2rem(34px);
            text-align: left;
          }
        }
        .btn {
          margin: px2rem(30px) px2rem(49px);
          height: px2rem(100px);
          line-height: px2rem(100px);
          text-align: center;
          font-size: px2rem(36px);
          border-radius: px2rem(49px);
        }
        .btn-call {
          color: #fff;
          background-color: #190041;
          img {
            width: px2rem(33px);
            height: px2rem(33px);
            margin-right: px2rem(20px);
          }
        }
        .tip2 {
          color: #FFE801;
          font-size: px2rem(36px);
          margin: px2rem(50px) auto;
        }
        .tip3 {
          color: rgba(255, 255, 255, 0.52);
          font-weight: 300;
          font-size: px2rem(24px);
          line-height: px2rem(28px);
        }
      }
      .content2-delivery {
        margin-top: -28%;
        padding-top: 38%;
      }
    }

    .popWindow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      z-index: 999;
      .close {
        position: absolute;
        left: 84%;
        top: 9%;
        width: px2rem(50px);
        height: px2rem(50px);
        z-index: 9;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
      }
      .pop-contain {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        /*border-radius: px2rem(16px);*/
        padding-left: px2rem(40px);
        padding-right: px2rem(40px);
        padding-bottom: px2rem(45px);
        .close {
          position: absolute;
          right: px2rem(30px);
          top: px2rem(30px);
          width: px2rem(46px);
          height: px2rem(46px);
        }
      }
      /*兑换成功*/
      .success-contain {
        width: px2rem(522px);
        height: px2rem(624px);
        background-color: #4D0BAA;
        border-radius: px2rem(20px);
        text-align: center;
        h3 {
          color: #fff;
          font-size: px2rem(48px);
          margin: px2rem(99px) auto px2rem(20px);
        }
        .tip1 {
          color: #fff;
          font-size: px2rem(30px);

        }
        img {
          width: px2rem(239px);
          height: px2rem(239px);
          border-radius: px2rem(10px);
          margin: px2rem(53px) auto px2rem(36px);
        }
        .tip2 {
          color: #fff;
          font-size: px2rem(20px);
          line-height: px2rem(36px);
        }
      }

    }
  }
</style>
<template>
  <div class="double_12_gift">
    <img class="banner2" src="/static/images/activity/applet/double_12/banner2.png">
    <div class="title-content"><h3 class="title">活动时间：{{activityInfo.beginTime}}-{{activityInfo.endTime}}</h3></div>
    <div class="main-container">
      <div class="store">
        <img :src="activityInfo.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'" class="logo"/>
        <div class="store-info">
          <h3>{{activityInfo.storeName}}</h3>
          <div>{{activityInfo.connectAddress}}</div>
        </div>
      </div>
      <div class="content1">
        <div class="tip-content" v-if="showBindCode">
          <div class="tip">您已锁定礼品，支付后可领取</div>
          <br/>
          <div class="tip"><span>你已成功砍价</span></div>
          <br/>
          <div class="tip">获得<span>{{activityInfo.cashCouponPrice}}</span>元购买新年礼包资格</div>
          <br/>
        </div>
        <div class="tip-content" v-else>
          <div class="tip">礼包入手，到店即领</div>
          <br/>
          <div class="tip"><span>你已成功获得新年礼包</span></div>
          <br/>
        </div>

        <div class="gift-code" v-if="showBindCode">
          <h3>礼品锁定码</h3>
          <div class="code">{{lockCode}}</div>
          <p class="pre">到店后，出示该码，并支付{{activityInfo.cashCouponPrice}}元，即可立即拿走礼品，获得无门槛代金券。</p>
          <p class="pre">选择到店支付仅代表您有活动资格，礼品有限，先支付的会员先领取，领完为止。</p>
        </div>
        <div class="gift-code" v-else>
          <h3>我的提货码</h3>
          <div class="code delivery-code">{{checkCode}}</div>
          <p class="no-pre">到店后，找到门店导购，出示该码，即可领取礼品。</p>
        </div>
        <div class="gifts">
          <div class="left">
            <h3 class="gifts-coupon"><span>¥</span>{{activityInfo.cashQuota}}</h3>
            <h3 class="gifts-tip">无门槛代金券</h3>
            <h3 class="gifts-title">{{activityInfo.storeName}}</h3>
            <img src="/static/images/activity/applet/double_12/add.png"/>
          </div>
          <div class="right">
            <img class="gifts-img" :src="activityInfo.goodsPicUrl"/>
            <h3 class="gifts-name">{{activityInfo.goodsName}}</h3>
            <h3 class="gifts-scale">市价:{{activityInfo.salePrice}}元</h3>
          </div>
        </div>

        <div :class="'edge ' +[showBindCode?'':'edge-delivery']">
          <h3 class="tip1">礼包包含：精美加湿器+门店无门槛代金券</h3>
          <div class="btn btn-online" v-show="showBindCode" @click="attendActive(1)">直接在线支付</div>
          <p class="tip2" v-show="showBindCode&&lowStocks">门店商品库存不足，无法支付</p>
          <img class="gift-img" src="/static/images/activity/applet/double_12/gifts.png"/>
        </div>
      </div>
      <div :class="'content2 '+[showBindCode?'':'content2-delivery']">
        <div class="gifts-content">
          <div class="gifts-item" v-for="item in activityInfo.productList">
            <div class="gifts-item-info">
              <div class="img">
                <img :src="item.goodsPicUrl"/>
              </div>
              <p>市场价￥{{item.salePrice}}</p>
              <div class="exchange" v-show="consumptionAmount>=item.fullMoney">可兑换</div>
            </div>
            <p class="gifts-item-title">消费满{{item.fullMoney}}元赠</p>
          </div>
          <!--<div class="gifts-item">-->
          <!--<div class="gifts-item-info">-->
          <!--<div class="img">-->
          <!--<img src="../../../../../static/images/activity/close_red.png"/>-->
          <!--</div>-->
          <!--<p>市场价￥169</p>-->
          <!--<div class="exchange">可兑换</div>-->
          <!--</div>-->
          <!--<p class="gifts-item-title">消费满200元赠</p>-->
          <!--</div>-->
          <!--<div class="gifts-item">-->
          <!--<div class="gifts-item-info">-->
          <!--<div class="img">-->
          <!--<img src="../../../../../static/images/activity/close_red.png"/>-->
          <!--</div>-->
          <!--<p>市场价￥169</p>-->
          <!--<div class="exchange">可兑换</div>-->
          <!--</div>-->
          <!--<p class="gifts-item-title">消费满200元赠</p>-->
          <!--</div>-->
        </div>
        <div class="gifts-progress">
          <div class="gifts-progress-img" :style="'width:'+autoWidth+'%'"></div>
          <!--<img class="gifts-progress-img" src="/static/images/activity/applet/double_12/progress.png"/>-->
          <div class="gifts-progress-num" :style="'width:'+autoWidth+'%'">已消费{{consumptionAmount}}元</div>
        </div>
        <h3 class="tip2">~直接联系导购兑换礼品噢~</h3>
        <p class="tip3">礼品数量有限！送完为止！</p>
        <p class="tip3"> 提示：使用身边店余额支付不计入该活动哦~</p>
        <h3 :class="showRules?'report-btn-up':'report-btn-down'" @click="showRules=!showRules">活动规则</h3>
        <div class="active-content" v-show="showRules">
          <p>1.活动期间，在同一门店现金消费的实付金额可累计，累计金额达到标准后可联系导购兑换对应礼品，礼品可寄送至您指定的地址。</p>
          <p>2.实付金额达标后只可兑换一次仅限一件商品。需兑换成功后，原实付金额清零，您需再次消费达标才可兑换第二件商品。</p>
          <p>3.活动期间，在门店产生消费使用门店充值余额支付的金额不计入活动。</p>
          <p>4.在活动结束后达到条件未兑换礼品的会员，默认放弃兑换。</p>
          <p>5.礼包内礼品到店兑换，选择到店支付的需到店支付对应金额后方能领走礼包礼品。</p>
          <p>6.本次活动优惠不与其他优惠同享，详情请咨询门店。</p>
        </div>
        <a :href="'tel:'+activityInfo.linkStaffMobileNum"
           v-show="activityInfo.linkStaffMobileNum&&activityInfo.linkStaffMobileNum.length>0">
          <div class="btn btn-call"><img src="/static/images/activity/applet/double_12/phone.png"/>立即联系导购</div>
        </a>
      </div>
    </div>

    <!-- 购买成功 -->
    <div class="popWindow" v-if="successShow">
      <div class="mask"></div>
      <img class="close" src="/static/images/close.png" @click="refreshPage"/>
      <div class="success-contain pop-contain">
        <h3>购买成功</h3>
        <p class="tip1">已获得礼品提货码及优惠券</p>
        <img src="/static/images/qrcode.jpg"/>
        <p class="tip2">关注公众号获取更多优惠信息</p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../../../fetch/common_api"
  import double12Api from "../../../../fetch/double_12_api"
  import wxShareTip from "@/components/common/wxShareTip2"
  import loading from "@/components/common/loading"
  import _urlConfig from "../../../../util/urlConfig"
  export default{
    components: {},
    data () {
      return {
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        storeCode: this.$route.query.storeCode || null,//门店编号
        staffCode: this.$route.query.staffCode || null,//导购编号
        xd_code: this.$route.query.xd_code,  //来源
        showBindCode: false,
        showRules: false,
        successShow: false,
        checkCode: null,
        lockCode: null,
        activityInfo: {},
        lowStocks: false,
        autoWidth:0,
        consumptionAmount: 0, //满送消费金额
        allAmount: 0,  //最大消费金额
        order: {},
        payMode: 2,
        isBuying:false,

      }
    },
    computed: {
      tokenInfo () {
        let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
        return tokenInfo
      },
      openId(){
        let openId = this.$store.state.user.openId;
        return openId;
      },

    },
    watch: {
      consumptionAmount(){
        if(this.allAmount&&parseInt(this.allAmount)>0){
          let width=parseInt(100*parseInt(this.consumptionAmount)/parseInt(this.allAmount));
          this.autoWidth=width;
        }

      },
      allAmount(){
        if(this.allAmount&&parseInt(this.allAmount)>0) {
          let width = parseInt(100*parseInt(this.consumptionAmount) / parseInt(this.allAmount));
          this.autoWidth = width;
        }
      },
    },
    methods: {
      //数据收集
      collect(data,token){
        if (token) {
          api.collectStatisticsOnActivities("post",data,token).then(res => {});
        }else{
          api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
        }
      },
      refreshPage(){
        document.body.scrollTop = 0;
        this.successShow = false;
        this.whetherAttend();
      },
      attendActive(payMode) {
        if (!this.isBuying) {
            if(payMode==1){
              this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0020",
                "activityCode": this.activityCode,
                "srcStaffCode": this.staffCode||"",
                "openId": this.openId
              });
            }
          this.isBuying = true;
          this.loading = true;
          this.payMode = payMode;
          api.activityAttend("post", {
            activityCode: this.activityCode,
            openId: this.openId,
            storeCode: this.storeCode,
            linkStaffCode: this.staffCode,
            payMode: payMode
          }, this.tokenInfo.token).then(res => {
            if (res.returnCode === '0') {
              this.order = res.returnContent;
              if (this.payMode === 1) {
                this.isBuying = true;
                this.loading = true;
                this.wxPay(res.returnContent);
              } else {
                this.isBuying = true;
                this.loading = true;
                this.whetherAttend();
              }

            } else if (res.returnCode === '-1') {
              this.lowStocks = true;
              this.loading = false;
              this.isBuying=false;
            } else {
              this.$toast(res.message);
              this.loading = false;
              this.isBuying=false;
            }
          });
        }

      },
      //初始化微信
      initWxConfig(){
        api.getSignMap("post", {url: location.href}).then(res => {
          let content = res.returnContent;
          window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: content.appId, // 必填，公众号的唯一标识
            timestamp: content.timestamp, // 必填，生成签名的时间戳
            nonceStr: content.nonceStr, // 必填，生成签名的随机串
            signature: content.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        });
      },
      //微信支付调起
      wxPay: function (data) {
        var _this = this;
        //微信调用
        if (data.envType === 1) {  //(1：测试 2:正式)
          _this.paySuccess(data);
        }
        else {
          window.wx.ready(function () {
            wx.chooseWXPay({
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              envType: data.envType,
              success: (callRes) => {
//                _this.collect({
//                  "xdCode": this.xd_code,
//                  "ydCode": "YD0007",
//                  srcStaffCode:this.linkStaffCode||null,
//                  productCode:this.productCode||null,
//                  productType:this.productType||null
//                });
                _this.paySuccess(data);
              },
              fail: () => {
                _this.payError();
                _this.loading = false;
                _this.isBuying = false;
              },
              complete: () => {
                _this.isBuying = false;
                _this.loading = false;
              }
            });
          });
        }
      },
      //微信支付成功
      paySuccess: function (data) {
        var _this = this;
        // 支付成功后的回调函数
        api.activityConfirm("post", {
          activityCode: _this.activityCode,
          orderNum: data.orderNum
        }, _this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            _this.collect({
              "xdCode": _this.xd_code,
              "ydCode": "YD0018",
              "activityCode": _this.activityCode,
              "srcStaffCode": _this.staffCode||"",
              "openId": _this.openId
            });
            _this.loading = false;
            _this.isBuying = false;
            _this.showShareSuc = false;
//            _this.routerLink("/activity_2018/eightHalf_paySuccess");
            //判断是否是用户，不是的显示绑定界面
            if (_this.tokenInfo.imInfo === null) {
              _this.bindMobileNumShow = true;
              return;
            }
            _this.successShow = true;
          } else {
            _this.$toast(res.message);
            _this.isBuying = false;
            _this.loading = false;
            _this.payError();
          }
        });
      },
      //微信支付失败
      payError: function () {
        this.showShareSuc = true;
      },
      whetherAttend: function () {
        double12Api.activityWhetherAttend("post", {
          activityCode: this.activityCode,
          linkStaffCode: this.staffCode,
          storeCode: this.storeCode,
          linkType: Number(this.linkType)
        }, this.tokenInfo.token).then(res => {
          this.consumptionAmount = res.returnContent.consumptionAmount;

          if (res.returnCode === '0') {
            if (res.returnContent.checkCode != null) { //未参加活动 正常参与活动
              this.checkCode = res.returnContent.checkCode;
              this.showBindCode = false;
              this.activityContent();
            } else if (res.returnContent.lockCode != null) {
              //已分享未选择支付方式
              this.showBindCode = true;
              this.lockCode = res.returnContent.lockCode;
              this.activityContent();
            } else {
              this.routerLink("/activity_2018/double_12_index");
            }
          } else {
            this.$toast(res.message);
          }
        });
      },
      routerLink(path){
        let src = path + "?storeCode=" + (this.storeCode || this.activityInfo.storeCode || "") + "&staffCode=" + (this.staffCode || this.activityInfo.linkStaffCode || "") + "&xd_code=" + (this.xd_code || "")
        this.$router.push({
          path: src
        })
      },
      activityContent: function () {
        var _this = this;
        double12Api.activityContent("post", {
          activityCode: this.activityCode,
          storeCode: this.storeCode,
          linkStaffCode:this.staffCode
        }, this.tokenInfo.token).then(res => {
          if (res.returnCode === '0') {
            _this.activityInfo = res.returnContent;
            _this.allAmount = res.returnContent.productList[2].fullMoney;
          } else {
            _this.$toast(res.message);
          }
        });
      },
    },
    created(){
      this.initWxConfig();
    },
    mounted(){
      this.whetherAttend();
    }
  }
</script>
