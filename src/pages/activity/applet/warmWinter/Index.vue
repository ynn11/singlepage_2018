<template>
  <div class="warm-winter-index">
    <img class="cover-bg" src="/static/images/activity/guide/warmWinter/content_bg.png"/>
    <img class="cover-bear" src="/static/images/activity/guide/warmWinter/bear.png"/>
    <img class="cover-font" src="/static/images/activity/guide/warmWinter/title.png"/>

    <div class="main-container" v-show="!showCode">
      <h3 class="theme-color theme-fontSize26 theme-margincenter active-time">活动限期：{{activityContent.beginTime}}-{{activityContent.endTime}}</h3>
      <div class="product-cover">
        <img class="product theme-margincenter" src="/static/images/activity/guide/warmWinter/product.png"/>
        <p class="product-title1">600元内羽绒衣，只要299元</p>
        <p class="product-title2">现在支付{{activityContent.voucherMoney}}元，最高可抵301元</p>
      </div>
      <div class="coupon">
        <div class="coupon-title">体验券</div>
        <div class="coupon-money">{{activityContent.voucherMoney}}</div>
        <div class="coupon-unit">元</div>
      </div>
      <div class="coupon-tip">凭此券进店支付299元，<br/>即可选购600元内精选羽绒衣的一件。</div>
      <div class="tip">这个冬天，佐米熊与您一起爱孩子！爱的实实在在，孩子跟小太阳一样，暖暖的更贴心！299元精选羽绒，只为您！</div>
      <p class="store">{{activityContent.storeName}}</p>
      <p class="store">{{activityContent.connectAddress}}</p>
    </div>
    <div class="show-code-container" v-show="showCode">
      <h3 class="theme-color theme-fontSize26 theme-margincenter active-time">活动限期：{{activityContent.beginTime}}-{{activityContent.endTime}}</h3>
      <p class="theme-color theme-fontSize36  theme-margincenter theme-fontWeight600">我的体验码</p>
      <p class="my-code">{{checkCode}}</p>
      <p class="theme-color theme-fontSize24  theme-margincenter theme-fontWeight600">{{activityContent.beginTime}}-{{activityContent.endTime}}有效</p>
      <div class="active-content">
        <p class="theme-color theme-fontSize24">使用规则:</p>
        <p class="theme-color theme-fontSize24">
          1.体验券在活动期间有效，您可提前致电导购询问相关信息。</p>
        <p class="theme-color theme-fontSize24">
          2. 一张体验券限用一件衣服，单人仅可购买一次，详请进店咨询。</p>
        <p class="theme-color theme-fontSize24">
          3.身边店对本活动有最终解释权。</p>
      </div>
      <p class="theme-color theme-fontSize24 theme-margincenter theme-fontWeight600 store">{{activityContent.storeName}}</p>
      <p class="theme-color theme-fontSize24 theme-margincenter theme-fontWeight600 store">{{activityContent.connectAddress}}</p>
    </div>
    <div class="theme-fontSize36 btn" v-show="!showCode" @click="getCoupon">立即获得体验券</div>
    <div class="tel-cover" v-show="showCode&&activityContent.linkStaffMobileNum.length>0">
      <span>联系我的导购：{{activityContent.linkStaffMobileNum}}</span>
      <a :href="'tel:' + activityContent.linkStaffMobileNum">立即拨打</a>
    </div>
    <!--购买成功-->
    <div class="popWindow" v-if="showSuccess">
      <div class="mask"></div>
      <div class="success-contain pop-contain">
        <div class="pop-content">
          <p class="notice theme-color theme-fontWeight600 theme-fontSize36">亲爱的会员，<br/>您已获得299元购买600元内羽绒衣资格。请至门店使用。</p>
          <div class="cover-btn">
            <div class="share-btn" @click="shareTipShow=true;">分享给好友</div>
            <div class="sure-btn" @click="sure">确认</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分享提示 -->
    <wxShareTip :shareTipShow="shareTipShow" :isClose="isClose"></wxShareTip>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import api from "../../../../fetch/common_api"
  import warmWinterApi from "../../../../fetch/warmwinter_api"
  import _urlConfig from "../../../../util/urlConfig"
  import loading from '@/components/common/loading'
  import activityHeader from '@/components/common/activityHeader'
  import wxShareTip from "@/components/common/wxShareTip2"
  export default{
    components: {
      "v-loading": loading,
      wxShareTip:wxShareTip
    },
    data () {
      return {
        storeCode: this.$route.query.storeCode || null,//门店编号
        staffCode: this.$route.query.staffCode || null,//导购编号
        memberCode: this.$route.query.memberCode || null,//会员编号
        xd_code: this.$route.query.xd_code,  //来源
        activityCode: "f7d09961e18611e8bc67704d7b87a020",
        showRules: false,
        loading: false,
        showSuccess: false,
        showCode: false,
        activityContent:{},
        checkCode:"",
        shareTipShow:false,
        isClose:true,

      }
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
    watch: {},
    methods: {
      //初始化一些数据
      initGetData(){
        api.activityWhetherAttend("post",{
          activityCode:this.activityCode,
          linkStaffCode:this.staffCode,
          storeCode:this.storeCode,
        },this.tokenInfo.token).then((res)=>{
          if (res.returnCode === "0") {
              this.activityInfo=res.returnContent;
            if(res.returnContent.attendFlag==0){
              this.showCode=false;
            }else {
              this.checkCode=res.returnContent.checkCode;
              this.showCode=true;
            }
            //加载活动数据
            api.activityContent("post", {
              activityCode: this.activityCode,
              storeCode: this.storeCode,
              linkStaffCode: this.staffCode
            }, this.tokenInfo.token).then((res) => {
              if (res.returnCode === "0") {
                this.activityContent = res.returnContent || {};
//                this.staffCode=res.returnContent.linkStaffCode||"";
              } else {
                this.$toast(res.message);
              }
            })
          } else {
            this.$toast(res.message);
          }
        });


      },
      getCoupon:function () {
          api.activityAttend("post",{
            activityCode:this.activityCode,
            openId:this.openId,
            storeCode:this.storeCode,
            linkStaffCode:this.staffCode
          },this.tokenInfo.token).then((res)=>{
            if (res.returnCode === "0") {
                //提交成功
              this.wxPay(res.returnContent);
            } else {
              this.$toast(res.message);
            }
          });
      },
      //微信支付调起
      wxPay: function(data){
        var _this = this;
        //微信调用
        if (data.envType===1) {  //(1：测试 2:正式)
          _this.loading = false;
          _this.showSuccess=true;
          return;
        }
        window.wx.ready(function(){
          wx.chooseWXPay({
            timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
            package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.paySign, // 支付签名
            envType: data.envType,
            success: (callRes)=> {
              _this.collect({
                "xdCode": _this.xd_code,
                "ydCode": "YD0018",
                "activityCode": _this.activityCode,
                "openId": _this.openId
              });
              // 支付成功后的回调函数
              api.activityConfirm("post",{
                activityCode: _this.activityCode,
                orderNum: data.orderNum
              },_this.tokenInfo.token).then((res)=>{
                _this.loading = false;
                _this.showSuccess=true;
              });
            },
            fail:()=>{
              _this.loading = false;
            },
            complete: ()=>{
              _this.loading = false;
            }
          });
        });
      },
      sure:function () {
          this.showSuccess=false;
        this.initGetData();
      },
      //初始化微信
      initWxConfig(){
        api.getSignMap("post",{url: location.href}).then(res => {
          let content = res.returnContent;
          window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: content.appId, // 必填，公众号的唯一标识
            timestamp: content.timestamp, // 必填，生成签名的时间戳
            nonceStr: content.nonceStr, // 必填，生成签名的随机串
            signature: content.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        });
      },
      //初始化分享
      initWxShare(options, cb){
        window.wx.ready(function () {
          // wx.showMenuItems({
          //     menuList: [
          //         "menuItem:share:appMessage",
          //         "menuItem:share:timeline"
          //     ] // 要显示的菜单项，所有menu项见附录3
          // });
          console.log(options);
          wx.onMenuShareAppMessage({
            title: options.title, // 分享标题
            desc: options.desc, // 分享描述
            link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: () => {
              typeof cb === "function" && cb();
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });

          wx.onMenuShareTimeline({
            title: options.title, // 分享标题
            desc: options.desc, // 分享描述
            link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
            success: () => {
              typeof cb === "function" && cb();
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      },
      //数据收集
      collect(data,token){
        if (token) {
          api.collectStatisticsOnActivities("post",data,token).then(res => {});
        }else{
          api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
        }
      },
    },
    created(){
      var that=this;
      //分享
      this.initWxShare({
        title: "暖冬型动 “羽”你相伴",
        desc: `这个冬天佐米熊和您一起爱孩子！`,
        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/warmwinter_index?xd_code=XD0005&storeCode=' + (this.storeCode || this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode|| "") + '&memberCode=' + (this.memberCode || ""))
      }, () => {
        api.activityWhetherAttend("post",{
          activityCode: this.activityCode,
          linkStaffCode: this.staffCode||null,
          storeCode: this.storeCode||null,
        },this.token||this.tokenInfo.token).then((res)=>{
          if(res.returnCode==="0"){
            this.activityInfo = res.returnContent;
            //年终活动分享成功
            this.collect({
              "xdCode": this.xd_code,
              "ydCode": "YD0013",
              "activityCode": this.activityCode,
              "openId": this.openId
            });
            //分享提示框
            this.shareTipShow = false;
            this.showSuccess = false;
            //活动分享
            api.activityShare("post",{activityCode: that.activityCode},that.tokenInfo.token).then((res)=>{
              if(res.returnCode==="0"){
              }else{
                that.$toast(res.message);
              }
            });

          }else{
            that.$toast(res.message);
          }
        });
      });

      this.initWxConfig();
      if (sessionStorage.entryMark !== "marked") {
        return;
      }
      if (this.tokenInfo.imInfo===null){
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0004",//需要绑定手机号
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode||"",
          "openId": this.openId
        });
      }else{
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0003",//无需绑定手机号
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode||"",
          "openId": this.openId
        });
      }
      this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0001",
        "activityCode": this.activityCode,
        "srcStaffCode": this.staffCode||"",
        "openId": this.openId
      });

    },
    mounted() {
      //获取活动相关信息
      this.initGetData();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .warm-winter-index {
    position: relative;
    height: 101%;
    &.static {
      overflow: hidden;
    }
    .cover-bg {
      position: absolute;
      left: 0;
      top: px2rem(0px);
      width: px2rem(750px);
      height: px2rem(1303px);
      z-index: 2;
    }
    .cover-bear {
      position: absolute;
      left: px2rem(0px);
      top: px2rem(0px);
      width: px2rem(750px);
      height: px2rem(1087px);
      z-index: 3;
    }
    .cover-font {
      position: absolute;
      left: px2rem(77px);
      top: px2rem(70px);
      width: px2rem(596px);
      height: px2rem(311px);
      z-index: 4;
    }
    .theme-color {
      color: #4E2713;
    }
    .theme-fontWeight600 {
      font-weight: 600;
    }
    .theme-fontSize24 {
      font-size: px2rem(24px);
    }
    .theme-fontSize22 {
      font-size: px2rem(22px);
    }
    .theme-fontSize26 {
      font-size: px2rem(26px);
    }
    .theme-fontSize30 {
      font-size: px2rem(30px);
    }
    .theme-fontSize36 {
      font-size: px2rem(36px);
    }
    .theme-margincenter {
      margin: 0 auto;
      text-align: center;
    }

    .main-container {
      position: relative;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      /*padding-top: px2rem(80px);*/
      padding-bottom: px2rem(150px);
      z-index: 5;
      text-align: center;
      .active-time {
        margin-top: px2rem(410px);
        text-align: center;
        font-weight: 600;
      }
      .product-cover {
        position: relative;
        margin-top: px2rem(49px);
        height: px2rem(324px);
        .product {
          position: absolute;
          left: px2rem(43px);
          top: px2rem(0px);
          width: px2rem(664px);
          height: px2rem(271px);
          z-index: 6;
        }
        .product-title1 {
          position: absolute;
          left: px2rem(68px);
          top: px2rem(200px);
          width: px2rem(528px);
          height: px2rem(62px);
          line-height: px2rem(62px);
          background-color: rgba(207, 1, 0, 0.9);
          font-size: px2rem(35px);
          font-weight: 800;
          font-style: italic;
          color: rgba(255, 255, 255, 1);
          z-index: 7;
        }
        .product-title2 {
          position: absolute;
          left: px2rem(127px);
          top: px2rem(262px);
          width: px2rem(568px);
          height: px2rem(62px);
          line-height: px2rem(62px);
          background-color: rgba(207, 1, 0, 0.66);
          font-size: px2rem(35px);
          font-weight: 600;
          font-style: italic;
          color: rgba(255, 255, 255, 1);
          z-index: 7;
        }
      }
      .coupon {
        width: px2rem(617px);
        height: px2rem(145px);
        background: url("/static/images/activity/guide/warmWinter/coupon.png") center no-repeat;
        background-size: 100%;
        margin: px2rem(50px) auto 0;
        .coupon-title {
          float: left;
          width: px2rem(330px);
          height: px2rem(145px);
          line-height: px2rem(145px);
          text-align: center;
          font-size: px2rem(56px);
          color: #fff;
          font-weight: 500;
        }
        .coupon-money {
          float: left;
          width: px2rem(200px);
          height: px2rem(145px);
          line-height: px2rem(145px);
          text-align: right;
          font-size: px2rem(140px);
          color: #fff;
          font-weight: bold;
        }
        .coupon-unit {
          float: left;
          height: px2rem(35px);
          line-height: px2rem(35px);
          text-align: right;
          font-size: px2rem(35px);
          margin-top: px2rem(80px);
          color: #fff;
          font-weight: normal;
        }

      }
      .coupon-tip {
        width: px2rem(567px);
        padding: px2rem(15px) px2rem(25px);
        margin: 0 auto;
        color: #333333;
        font-size: px2rem(24px);
        background: #ECECEC;
        text-align: left;
        line-height: px2rem(30px);
      }
      .tip {
        width: px2rem(527px);
        padding: px2rem(43px) px2rem(45px);
        margin: px2rem(54px) auto px2rem(40px);
        color: #fff;
        font-size: px2rem(28px);
        background: #4E2713;
        font-weight: 600;
        text-align: left;
        line-height: px2rem(35px);
      }
      .store {
        text-align: center;
        color: #333333;
        margin: 0 px2rem(50px);
        font-size: px2rem(24px);
        line-height: px2rem(40px);
      }
    }
    .show-code-container {
      position: relative;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      /*padding-top: px2rem(80px);*/
      padding-bottom: px2rem(100px);
      z-index: 5;
      text-align: center;
      .active-time {
        margin-top: px2rem(410px);
        text-align: center;
        font-weight: 600;
        margin-bottom: px2rem(47px);
      }
      .my-code {
        width: px2rem(401px);
        height: px2rem(129px);
        line-height: px2rem(129px);
        background: rgba(217, 44, 1, 1);
        border: 4px dashed #FFD907;
        font-size: px2rem(72px);
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        margin: px2rem(17px) auto px2rem(19px);
        text-align: center;
      }
      .active-content {
        position: relative;
        width: px2rem(521px);
        background: rgba(255, 255, 255, 0.72);
        border-radius: px2rem(20px);
        border: 4px dashed rgba(255, 217, 7, 1);
        margin: px2rem(36px) auto px2rem(47px);
        padding: px2rem(38px) px2rem(50px);
        box-sizing: border-box;
        p {
          line-height: px2rem(33px);
          text-align: left;
          font-weight: 600;
        }
      }
      .store {
        margin: 0 px2rem(50px);
        line-height: px2rem(40px);
      }
    }
    .tel-cover {
      position: fixed;
      left: 0;
      bottom: 0;
      width: px2rem(750px);
      height: px2rem(97px);
      line-height: px2rem(97px);
      padding: 0 px2rem(55px) 0 px2rem(78px);
      color: #fff;
      font-size: px2rem(30px);
      background: #DA3938;
      z-index: 10;
      a {
        display: inline-block;
        width: px2rem(136px);
        height: px2rem(57px);
        line-height: px2rem(57px);
        text-align: center;
        margin-left: px2rem(65px);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: px2rem(10px);
      }
    }
    .btn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: px2rem(750px);
      height: px2rem(111px);
      line-height: px2rem(111px);
      text-align: center;
      color: #fff;
      background: #DA3938;
      z-index: 10;
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
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        border-radius: px2rem(16px);
        text-align: center;
        opacity: 1;
      }
      .success-contain {
        width: px2rem(581px);
        .pop-content {
          width: px2rem(581px);
          height: px2rem(417px);
          background: url("/static/images/activity/guide/warmWinter/pop_bg.png") center no-repeat;
          background-size: 100%;
          padding-top: px2rem(200px);
          .notice {
            width: px2rem(400px);
            margin: px2rem(70px) auto 0;
            text-align: left;
            font-size: px2rem(36px);
            line-height: px2rem(40px);
          }
          .cover-btn {
            width: px2rem(528px);
            margin: px2rem(40px) auto 0;
            div {
              width: px2rem(259px);
              height: px2rem(90px);
              line-height: px2rem(90px);
              color: #fff;
              text-align: center;
              font-size: px2rem(36px);
              float: left;
            }
            .share-btn {
              background: rgba(217, 44, 1, 1);
              border-radius: px2rem(45px);
            }
            .sure-btn {
              background: #4E2713;
              border-radius: px2rem(45px);
              float: right;
            }
          }
        }

      }
    }

  }
</style>
