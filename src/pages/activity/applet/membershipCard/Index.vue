<template>
  <div class="membership-applet-index">
    <div class="main-container">
      <img src="/static/images/activity/boss/membershipCard/header_bg.png" class="header-bg" alt="">
      <img src="/static/images/activity/boss/membershipCard/card.png" alt="" class="card">
      <div class="intro-contain">
        <img src="/static/images/activity/applet/membershipCard/tip_title.png" alt="" class="intro-title">
        <div class="detail" v-if="storeStatus==1">
          <p>会员权益：<br/>1， 本店所有在售服装都能获得折扣1年（参照门店具体会员折扣）</p>
          <p>2， 即时获得一张门店{{storeSet.couponMoney}}元代金券，24小时内有效（该代金券只限办理会员卡门店使用）</p>
          <p>3， 获得超值赠品</p>
        </div>
        <div class="detail detailSpecial" v-else-if="storeStatus==2">
          <p>会员权益：<br/>顾客购买一张 薇蔻女装598会员卡<br/></p>
          <p class="pretitle pretitle_1">赠送价值698元奔驰行李箱一个+价值198元美的挂烫机</p>
          <p class="pretitle pretitle_2">赠送5张价值{{storeSet.couponMoney}}元现金抵用券</p>
          <p class="pretitle pretitle_3">会员享受薇蔻全年8折优惠</p>
        </div>
        <div class="detail zommyBear" v-else>
          <p>会员权益：<br/>1， 消费者购买一张198元会员优享卡；</p>
          <p>2， 消费者享受佐米熊全年{{storeSet.discountQuota}}折优惠及其他不定期会员特惠活动福利；</p>
          <p>3， 消费者享受会员<span class='yellow'>首单免单200元</span>体验卡（吊牌价计算）+{{storeSet.couponMoney}}元现金券两张<br/>({{storeSet.couponMoney}}元现金券使用方式：每张折满300可抵用{{storeSet.couponMoney}}元一张，有效期30天);
          </p>
          <p>4， 消费者额外获赠佐米熊定制小熊迷你小夜灯一台</p>
        </div>
      </div>
      <div class="coupons" v-if="storeStatus==1">
        <img src="/static/images/activity/applet/membershipCard/coupons_bg.png" alt="" class="coupons-bg">
        <p class="denomination">{{storeSet.couponMoney}}</p>
      </div>
      <div class="coupons" v-else-if="storeStatus==2">
        <img src="/static/images/activity/applet/membershipCard/coupons_bg2.png" alt="" class="coupons-bg">
        <p class="denomination">{{storeSet.couponMoney}}</p>
        <p class="numberZhang">X5张</p>
      </div>
      <div class="coupons" v-else>
        <img src="/static/images/activity/applet/membershipCard/coupons_bg.png" alt="" class="coupons-bg">
        <p class="denomination zommyBearCoupons">{{storeSet.couponMoney}}</p>
        <!--<p class="numberZhang">X2</p>-->
      </div>

    </div>
    <div class="btn-box">
      <div class="clear">
        <div class="btn btn-view" @click="toProduct">查看赠品</div>
        <div class="btn btn-buy" @click="buy">加入会员</div>
      </div>
      <div class="btn btn-share" @click="shareTipShow=true;"
           v-if="activityInfo.attendFlag===1&&activityInfo.shareFlag===0">分享赚佣金
      </div>
    </div>
    <!-- 绑定手机号 -->
    <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
      <div class="mask"></div>
      <div class="bindMobileNum-contain pop-contain">
        <div class="pop-title">绑定手机</div>
        <div class="content-box">
          <input type="number" class="mobileNum" v-model="mobileNum" placeholder="输入您的手机号码">
          <div class="rows">
            <input type="number" placeholder="" class="verificationCode" placeholder="输入验证码" v-model="verificationCode">
            <div class="sendvCode" @click="send" v-show="!timerStatus">获取</div>
            <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
          </div>
          <div class="btn-contain">
            <div class="btn btn-bind" @click="bindMobile">绑定</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="popWindow" v-if="showProduct">
      <div class="mask" @click="showProduct=false;"></div>
      <div class="product-contain pop-contain">
        <img :src="storeSet.productDetailJson" alt="" class="product-detail-pic">
      </div>
    </div>
    <!-- 没有门店 -->
    <div class="noStore popWindow" v-show="noStoreShow">
      <div class="mask"></div>
      <div class="noStore-contain pop-contain">
        <div class="pop-min-title">无法参与活动</div>
      </div>
    </div>
    <!-- 门店列表 -->
    <div class="storeList popWindow" v-if="storeListShow">
      <div class="mask"></div>
      <div class="storeList-contain pop-contain">
        <div class="pop-title">选择门店</div>
        <div class="content-box">
          <div class="listBox">
            <div class="listItem" v-for="(item,index) in storeList" @click="selectStore(item);">
              <img class="icon" :src="item.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt=""/>
              <div class="info-contain">
                <div class="name">{{item.storeName}}</div>
                <div class="detail"><i class="iconfont icon-location"></i>{{item.connectAddress}}</div>
              </div>
              <i class="iconfont icon-qianjin"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分享领奖提示 -->
    <div class="share popWindow" v-show="shareShow">
      <div class="mask"></div>
      <div class="tip-contain pop-contain">
        <p class="share-tip">亲！<br/>最后一步了分享一下朋友圈！<br/>让你的好友也知道我们的活动！<br/>就能领取赠品拉！<br/>这粽子可是畅销品，备货不足哦～<br/>快些去吧！</p>
        <div class="btn" @click="shareTipShow=true;">告诉我的好朋友们</div>
      </div>
    </div>
    <!-- 分享提示 -->
    <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import api from "../../../../fetch/common_api"
  import ActivityClass from "../../../../class/activity/ActivityClass"
  import _urlConfig from "../../../../util/urlConfig"
  import wxShareTip from "@/components/common/wxShareTip"
  import loading from '@/components/common/loading'

  export default {
    components: {
      "v-loading": loading,
      wxShareTip
    },
    //判断重复进入
    beforeRouteEnter(to, from, next) {
      if (navigator.userAgent.match(/Android/i)) {
        sessionStorage.entryMark = "marked"
        next();
        return;
      } else {
        next((vm) => {
          if (sessionStorage.entryMark !== "marked") {
            sessionStorage.entryMark = "marked"
            vm.$router.go(0);
            return;
          }
        })
      }
    },
    data() {
      return {
        storeCode: this.$route.query.storeCode || null,
        staffCode: this.$route.query.staffCode || null,
        memberCode: this.$route.query.memberCode || null,
        xd_code: this.$route.query.xd_code,
        activityCode: "c6940ba3067b49cdb78018a14c29cf92",
        showShare: false,
        showProduct: false,
        activityInfo: {},
        storeSet: {},
        storeList: [],
        storeListShow: false,
        bindMobileNumShow: false,
        noStoreShow: false,
        shareTipShow: false,
        mobileNum: "",
        verificationCode: "",
        timer: 60,
        timerStatus: false,
        shareShow: false,
        loading: false,
        storeStatus: 1,
//        specialStore:"8bbc933e35334a4e98da3ad0cb53b541,9657338acae14804a734211703f16b07,8f00a07f106b4c8081134344d2c4228d,29e02e8a51a54f78bf32bf37a2957967,a2ccd2e79c1f44ada062dd8f0d2329bb"

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
      }
    },
    watch: {
      storeSet: function (val) {
        this.storeStatus = this.storeSet.participantType;
      }

    },

    otherFunc: {},
    methods: {
      //查看赠品
      toProduct(){
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0019",
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode || "",
          "openId": this.openId
        });
        this.$router.push({
          path: 'mscard_product?productPic=' + this.storeSet.productDetailJson
        })
      },
      routerLink(path){
        let src = path + "?storeCode=" + (this.storeCode || "") + "&staffCode=" + (this.staffCode || "") + "&xd_code=" + (this.xd_code || "")
        this.$router.push({
          path: src
        })
      },
      //检查参加活动状态
      checkAttend(from){
        this.whetherAttend(() => {
          console.log(this.activityInfo.memberCode || "");
          this.initWxShare({
            title: "你被卡了",
            desc: "神奇的卡住了你，别点开，真的会卡住你！",
            link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/mscard_index?xd_code=XD0001&storeCode=' + (this.storeCode || this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode || this.activityInfo.linkStaffCode || "") + '&memberCode=' + (this.activityInfo.memberCode || ""))
          }, () => {
            this.shareTipShow = false;
            if (this.activityInfo.actJoinCode) {
              this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0013",
                "activityCode": this.activityCode,
                "openId": this.openId,
                "actJoinCode": this.activityInfo.actJoinCode
              });
              this.activityShare({
                activityCode: this.activityCode,
                actJoinCode: this.activityInfo.actJoinCode
              });
            }
          }
        )
          if (this.activityInfo.attendFlag === 1 && this.activityInfo.pickFlag === 0) {
            if (from === "confirmOrder") {
              this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0018",
                "activityCode": this.activityCode,
                "openId": this.openId,
                "actJoinCode": this.activityInfo.actJoinCode
              });
            }
            this.routerLink("/activity_2018/mscard_gifts");
          } else {
            this.checkStore();
          }
        }
      )
        ;
      },
      //购买礼包/参加活动
      buy(){
        if (JSON.stringify(this.storeSet) === "{}") {
          this.$toast("获取门店设置失败，请刷新重试");
          return;
        }
        this.loading = true;
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0002",
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode || "",
          "openId": this.openId
        });
        this.attendActivity({
          activityCode: this.activityCode,
          openId: this.openId,
          storeCode: this.storeCode || this.activityInfo.storeCode,
          linkStaffCode: this.staffCode || this.activityInfo.staffCode,
          linkMemberCode: this.memberCode || null,
          productCode: this.storeSet.productCode || null
        }, (data)=> {
          this.storeListShow = false;
          this.wxPay(data);
        }
      )
        ;
      },
      //微信支付调起
      wxPay: function (data) {
        var _this = this;
        //微信调用
        if (data.envType === 1) {
          _this.checkAttend();
          _this.loading = false;
          return;
        }
        //微信调用
        window.wx.ready(()=>
        {
          wx.chooseWXPay({
            timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
            package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.paySign, // 支付签名
            success: (callRes)=>
          {
            // 支付成功后的回调函数
            this.activityConfirm({
              activityCode: this.activityCode,
              orderNum: data.orderNum
            }, null, "confirmOrder")
          }
        ,
          fail: ()=>
          {
            this.loading = false;
          }
        ,
          complete: ()=>
          {
            this.loading = false;
          }
        })
          ;
        }
        )
        ;
      },
      //发送验证码
      send(){
        this.sendvCode();
      },
      //绑定手机号
      bindMobile(){
        this.bindMobileNum();
      }
    },
    created(){
      if (sessionStorage.entryMark !== "marked") {
        return;
      }
      //初始化公共方法
      new ActivityClass(this);
      this.checkStore = function (pre) {
        this.bindMobileNumShow = false;
        if (!this.storeCode) {
          this.loadStoreList();
        } else {
          //取得门店设置信息
          this.getStoreSet(()=>
          {
            this.storeListShow = false;
          }
        )
          ;
        }
      };
      //如果是小白，且为导购分享链接，则关注门店
      if (this.storeCode) {
        this.concernStore();
      }
      this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0001",
        "activityCode": this.activityCode,
        "srcStaffCode": this.staffCode || "",
        "openId": this.openId
      });
      if (this.tokenInfo.imInfo === null) {
        this.bindMobileNumShow = true;
        this.loading = false;
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0004",
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode || "",
          "openId": this.openId
        });
      } else {
        this.checkAttend();
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0003",
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode || "",
          "openId": this.openId
        });
      }
      this.initWxConfig();
    },
    mounted(){

    },
    updated(){

    },

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .membership-applet-index {
    position: relative;
    .main-container {
      position: relative;
      letter-spacing: px2rem(2px);
      background: url(/static/images/activity/boss/membershipCard/zebracrossing.jpg) center repeat-y;
      background-size: 100% auto;
      border-bottom: 1px solid transparent;
      min-height: 101%;
      .header-bg {
        display: block;
        width: 100%;
        z-index: 1;
      }
      .card {
        display: block;
        width: px2rem(693px);
        margin: px2rem(40px) auto;
      }
      .intro-contain {
        overflow: hidden;
        .intro-title {
          display: block;
          width: 100%;
        }
        .detail {
          width: px2rem(650px);
          padding: px2rem(35px) px2rem(60px);
          margin: 0 auto;
          box-sizing: border-box;
          background: #fe2b56;
          border-radius: 0 0 px2rem(12px) px2rem(12px);
          box-shadow: px2rem(9px) 0 px2rem(21px) rgba(134, 0, 0, .13);
          p {
            font-size: px2rem(26px);
            color: #fff;
            line-height: px2rem(62px);
            padding: px2rem(25px) 0;
          }
        }
        .detailSpecial {
          .pretitle_1::before {
            content: "1、";
            margin-left: px2rem(-40px);
          }
          .pretitle_2::before {
            content: "2、";
            margin-left: px2rem(-40px);
          }
          .pretitle_3::before {
            content: "3、";
            margin-left: px2rem(-40px);
          }
          .pretitle {
            margin-left: px2rem(40px);

          }
          p {
            padding: 0;
          }
        }
        .zommyBear {
          width: px2rem(650px);
          padding: px2rem(35px) px2rem(60px);
          margin: 0 auto;
          box-sizing: border-box;
          background: #fe2b56;
          border-radius: 0 0 px2rem(12px) px2rem(12px);
          box-shadow: px2rem(9px) 0 px2rem(21px) rgba(134, 0, 0, .13);
          p {
            font-size: px2rem(26px);
            color: #fff;
            line-height: px2rem(62px);
            padding: px2rem(0px) 0;
            .yellow {
              color: rgba(253, 242, 54, 1);
            }
          }
        }
      }
      .coupons {
        position: relative;
        width: px2rem(678px);
        margin: px2rem(60px) auto px2rem(310px);
        .coupons-bg {
          display: block;
          width: 100%;
        }
        .denomination {
          position: absolute;
          top: px2rem(80px);
          left: px2rem(455px);
          width: px2rem(160px);
          text-align: center;
          font-size: px2rem(60px);
          color: #fe2b56;
          text-align: center;
          white-space: nowrap;
          &:before {
            font-size: px2rem(42px);
            content: "￥";
          }
        }
        .zommyBearCoupons {
          position: absolute;
          top: px2rem(100px);
          left: px2rem(455px);
          width: px2rem(140px);
          text-align: left;
          font-size: px2rem(40px);
          color: #fe2b56;
          text-align: center;
          white-space: nowrap;
          &:before {
            font-size: px2rem(30px);
            content: "￥";
            margin-right: -4px;
            font-weight: 600;
          }
          &:after {
            font-size: px2rem(30px);
            content: "X2";
          }

        }
        .numberZhang {
          position: absolute;
          top: px2rem(150px);
          left: px2rem(455px);
          width: px2rem(160px);
          text-align: center;
          color: #fe2b56;
          text-align: center;
          white-space: nowrap;
          font-size: px2rem(26px);
        }
      }
    }
    .btn-box {
      position: fixed;
      overflow: hidden;
      width: px2rem(650px);
      bottom: px2rem(50px);
      left: 50%;
      transform: translateX(-50%);
      .btn {
        width: px2rem(305px);
        height: px2rem(88px);
        line-height: px2rem(88px);
        /*margin: px2rem(60px) auto px2rem(114px);*/
        background-color: #fe2b56;
        font-size: px2rem(32px);
        color: #fff;
        text-align: center;
        border-radius: px2rem(100px);
      }
      .clear {
        overflow: hidden;
      }
      .btn-view {
        float: left;
      }
      .btn-buy {
        float: right;
      }
      .btn-share {
        width: px2rem(650px);
        margin-top: px2rem(40px);
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
        top: 50%;
        left: 50%;
        width: px2rem(674px);
        transform: translate(-50%, -50%);
        overflow: hidden;
        border-radius: px2rem(16px);
        background-color: #fe2b56;
        .pop-title {
          font-size: px2rem(60px);
          color: #fff;
          font-weight: bold;
          margin: px2rem(104px) 0 px2rem(80px);
          text-align: center;
        }
        .pop-min-title {
          font-size: px2rem(32px);
          color: #fff;
          font-weight: bold;
          margin: px2rem(104px) 0 px2rem(80px);
          text-align: center;
        }
        &.rules-contain {
          border-radius: px2rem(8px);
          padding-bottom: px2rem(54px);
          background: url(/static/images/activity/boss/mayday/pop_bg.jpg) center center no-repeat;
          background-size: 100% 100%;
          .rules-words {
            max-height: px2rem(760px);
            overflow-x: hidden;
            overflow-y: auto;
            margin-bottom: px2rem(50px);
            p {
              padding: 0 px2rem(38px);
              font-size: px2rem(26px);
              color: #f3e6b6;
              line-height: px2rem(40px);
            }
          }
        }
        .close {
          position: absolute;
          top: px2rem(40px);
          right: px2rem(30px);
          width: px2rem(30px);
          height: px2rem(30px);
          z-index: 9;
        }
        .title {
          font-size: px2rem(32px);
          color: #f3e6b6;
          line-height: px2rem(116px);
          text-align: center;
        }
      }
      //商品详情
      .product-contain {
        max-height: 90%;
        overflow-y: auto;
        background-color: transparent;
        .product-detail-pic {
          display: block;
          width: 100%;
        }
      }
      //用户绑定弹窗
      .bindMobileNum-contain {
        .close {
          top: px2rem(50px);
        }
        .content-box {
          background-color: #fff;
          overflow: hidden;
        }
        .mobileNum {
          display: block;
          width: px2rem(520px);
          margin: px2rem(50px) auto 0;
          height: px2rem(90px);
          font-size: px2rem(28px);
          background-color: #fff;
          text-indent: px2rem(8px);
          border-bottom: 1px solid #dededf;
        }
        .rows {
          display: block;
          width: px2rem(520px);
          margin: 0 auto;
          height: px2rem(90px);
          .verificationCode {
            width: px2rem(294px);
            height: px2rem(90px);
            font-size: px2rem(24px);
            border-bottom: 1px solid #dededf;
            background-color: #FFF;
          }
          .sendvCode {
            float: right;
            position: relative;
            display: block;
            width: px2rem(194px);
            height: px2rem(92px);
            line-height: px2rem(90px);
            font-size: px2rem(28px);
            text-align: center;
            color: #d3343b;
            border-bottom: 1px solid #ffc7c8;
          }
        }
        .btn-contain {
          margin: px2rem(50px) auto;
          text-align: center;
          .btn-bind {
            position: relative;
            display: inline-block;
            width: px2rem(424px);
            height: px2rem(88px);
            line-height: px2rem(88px);
            font-size: px2rem(36px);
            color: #ffe010;
            text-align: center;
            background-color: #fe2b56;
            border-radius: 200px;
          }
        }
      }
      //门店列表弹窗
      .storeList-contain {
        .close {
          top: px2rem(50px);
        }
        .listBox {
          width: px2rem(560px);
          height: px2rem(570px);
          margin: px2rem(5px) auto 0;
          overflow-x: hidden;
          overflow-y: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          .listItem {
            position: relative;
            width: 100%;
            height: px2rem(170px);
            overflow: hidden;
            background-color: #fff;
            border-radius: px2rem(8px);
            margin-bottom: px2rem(20px);
            &:after {
              position: absolute;
              bottom: 0;
              left: 50%;
              margin-left: px2rem(260px);
              height: 1px;
              background-color: #d2d2d2;
            }
            .icon {
              float: left;
              width: px2rem(102px);
              height: px2rem(102px);
              border-radius: 50%;
              margin: px2rem(34px) px2rem(20px);
            }
            .info-contain {
              overflow: hidden;
            }
            .name {
              font-size: px2rem(32px);
              color: #1b1b1b;
              margin-top: px2rem(45px);
            }
            .detail {
              display: inline-block;
              width: px2rem(408px);
              font-size: px2rem(24px);
              color: #6c6c6c;
              margin-top: px2rem(20px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              i {
                font-size: px2rem(18px);
                line-height: px2rem(18px);
                color: #a4a4a4;
                margin-right: px2rem(15px);
              }
            }
            .icon-qianjin {
              position: absolute;
              top: 50%;
              right: px2rem(30px);
              color: #e0e0e0;
              font-weight: bold;
              transform: translateY(-50%);
            }
          }
        }
      }
      //没有门店
      .noStore-contain {
        position: relative;
        height: px2rem(298px);
        .close {
          top: px2rem(55px);
        }
        .pop_bg {
          height: px2rem(698px);
        }
        .btn {
          width: px2rem(474px);
          height: px2rem(90px);
          font-size: px2rem(32px);
          margin: px2rem(555px) auto 0;
          background: linear-gradient(-69deg, #f6c43f, #f5e430);
          border-radius: px2rem(100px);
          text-align: center;
          line-height: px2rem(90px);
        }
      }
      .tip-contain {
        background: url(/static/images/activity/applet/dragonboat/pop_share_bg.jpg) center center no-repeat;
        background-size: 100% 100%;
        padding: px2rem(100px) 0;
        .share-tip {
          font-size: px2rem(26px);
          color: #108c10;
          line-height: px2rem(60px);
          text-align: center;
        }
        .btn {
          position: relative;
          display: block;
          width: px2rem(572px);
          height: px2rem(88px);
          line-height: px2rem(88px);
          font-size: px2rem(36px);
          color: #fff;
          text-align: center;
          background: linear-gradient(-90deg, #108b10, #21c839);
          border-radius: 200px;
          margin: px2rem(60px) auto 0;
        }
      }
    }
  }
</style>
