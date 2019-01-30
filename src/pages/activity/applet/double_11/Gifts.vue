<template>
  <div :class="'double-gifts' + [showRules?'static':'']">
    <div class="main-container">
      <img class="header-bg" src="/static/images/activity/applet/double_11/head_bg.png">
      <img class="header-bg-font" src="/static/images/activity/applet/double_11/head_bg_title.png">
      <div class="header-title">11月5日至11月12日</div>
      <div class="content">
        <div class="list">
          <div v-for="(item,index) in storeSet.rechargeRuleList" :class="'coupon'+' '+[curSelect==index?'coupon-select':'coupon-unselect']" @click="curSelect=index">
            <h3 class="coupon-title">充{{item.rechargeMoney}}元得{{item.accountBalance}}元</h3>
            <h3 class="coupon-info">送{{item.score}}积分</h3>
            <div :src="curSelect===index?'/static/images/activity/applet/double_11/circle_select.png':'/static/images/activity/applet/double_11/circle_unselect.png'" ></div>
          </div>
        </div>
        <div class="tip">您将在{{activityInfo.storeName||""}}门店充值  <span>{{storeSet.rechargeRuleList[curSelect].rechargeMoney||0}}元</span></div>
        <div class="tip">新增账户余额  <span>{{storeSet.rechargeRuleList[curSelect].accountBalance||0}}元</span></div>
        <div class="recharge" @click="buy">立即充值</div>
      </div>
    </div>
    <!-- 分享提示 -->
    <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
    <!-- 充值成功 -->
    <div class="share popWindow" v-show="shareShow">
      <div class="mask"></div>
      <div class="tip-contain pop-contain">
        <img class="share-icon" src="/static/images/activity/applet/double_11/recharge_success.png">
        <h3>充值成功</h3>
        <p class="share-tip">您已成功在（{{activityInfo.storeName}}）门店参与充值活动，<br/>立即分享活动，获取积分兑好礼！</p>
        <div class="btn" @click="shareTipShow=true;shareShow=false">点击分享</div>
      </div>
    </div>
    <!--分享成功-->
    <div class="shareSuccess popWindow" v-show="shareSuccessShow">
      <div class="mask"></div>
      <div class="shareSuccess-contain pop-contain">
        <img src="/static/images/qrcode.jpg" >
        <p >长按识别图中二维码<br/>用积分竞换商品</p>
      </div>
    </div>

  </div>
</template>

<script>
  import api from "../../../../fetch/common_api"
  import ActivityClass from "../../../../class/activity/ActivityClass"
  import _urlConfig from "../../../../util/urlConfig"
  import wxShareTip from "@/components/common/wxShareTip2"
  import loading from '@/components/common/loading'
  export default{
    components:{
      "v-loading": loading,
      wxShareTip
    },
    data () {
      return {
        storeCode: this.$route.query.storeCode||null,
        staffCode: this.$route.query.staffCode||null,
        memberCode: this.$route.query.memberCode||null,
        xd_code: this.$route.query.xd_code,
        activityCode: "28bd0f3bd82611e8bc67704d7b87a020",
        showRules: false,
        activityInfo: {},
        storeSet: {},
        shareTipShow: false,
        curSelect:0,
        shareShow: false,
        shareSuccessShow:false,
        loading: false,
      }
    },
    //判断重复进入
    beforeRouteEnter(to, from, next) {
      if (navigator.userAgent.match(/Android/i)){
        sessionStorage.entryMark1 = "marked"
        next();
        return;
      }else{
        next((vm) => {
          if(sessionStorage.entryMark1 !== "marked"){
            sessionStorage.entryMark1 = "marked";
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
      }
    },
    methods: {
      routerLink(path){
        let src = path + "?storeCode=" + (this.storeCode||"") + "&staffCode=" + (this.staffCode||"") + "&xd_code=" + (this.xd_code||"")
        this.$router.push({
          path: src
        })
      },
      //检查参加活动状态
      //初始化一些数据
      initGetData(){
        //是否参加活动
        api.activityWhetherAttend("post",{
          activityCode: this.activityCode,
          linkStaffCode: this.staffCode||null,
          storeCode: this.storeCode||null,
//          openId: this.openId||null,
        },this.tokenInfo.token).then((res)=>{
          if(res.returnCode==="0"){
            this.activityInfo = res.returnContent;
            if(res.returnContent.shareFlag===0&&res.returnContent.attendFlag==1){
              //未分享已参加活动,弹出分享框
              this.shareTipShow=true;
            }else{
              //加载活动数据
              api.activityContent("post",{
                activityCode: this.activityCode,
                storeCode: this.activityInfo.storeCode||this.storeCode,
                linkStaffCode: this.staffCode||null
              },this.tokenInfo.token).then((res)=>{
                if(res.returnCode==="0"){
                  this.storeSet = res.returnContent||{};
                }else{
                  this.$toast(res.message);
                }
              })
            }
          }else if(res.returnCode==="10"){
            let fullPath = location.pathname + location.search;
            let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
            location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
          }else{
            this.$toast(res.message);
          }
        })
      },
      //购买礼包/参加活动
      buy(){
//        if (JSON.stringify(this.storeSet)==="{}") {
//          this.$toast("获取门店设置失败，请刷新重试");
//          return;
//        }
        this.loading = true;
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0020",
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode||"",
          "openId": this.openId
        });
        var data={
          activityCode: this.activityCode,
          openId: this.openId,
          storeCode: this.storeCode||this.activityInfo.storeCode,
          linkStaffCode: this.staffCode||this.activityInfo.staffCode,
          rechargeMoney: this.storeSet.rechargeRuleList[this.curSelect].rechargeMoney
        };
        api.activityAttend("post",data,this.tokenInfo.token).then((res)=>{
          if(res.returnCode==="0"){ //提交成功弹出充值成功
            this.storeListShow = false;
            this.wxPay(res.returnContent);
          }else{
            this.$toast(res.message);
            this.collect({
              "xdCode": this.xd_code,
              "ydCode": "YD0011",
              "activityCode": this.activityCode,
              "openId": this.openId
            });
            this.loading = false;
          }
        })
      },
      //微信支付调起
      wxPay: function(data){
        var _this = this;
        //微信调用
        if (data.envType===1) {  //(1：测试 2:正式)
          _this.loading = false;
          this.shareShow=true;
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
                _this.shareShow=true;
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
          title: "双十一！做自己的锦鲤！",
          desc: `一年仅此一次！优惠数量有限，速戳来抢！`,
          link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/double_index?xd_code=XD0005&storeCode=' + (this.storeCode || this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode || this.activityInfo.linkStaffCode || "") + '&memberCode=' + (this.activityInfo.memberCode || ""))
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
                //活动分享
                api.activityShare("post",{activityCode: that.activityCode,actJoinCode:that.activityInfo.actJoinCode},that.tokenInfo.token).then((res)=>{
                  if(res.returnCode==="0"){
                    if(res.returnContent.isSubscribe===0){//是否关注公众号(1：已关注 0：未关注)
                      //弹出未关注
                      that.shareSuccessShow=true;
                    }else {
                      //分享成功，已关注
                      that.routerLink("/activity_2018/double_index");
                    }
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
    },
    mounted(){
      //初始化数据
      this.initGetData();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-gifts{
    position: relative;
    height: 101%;
    &.static {
      overflow: hidden;
    }
    .main-container {
      position: relative;
      min-height: 100%;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      /*padding-top: px2rem(80px);*/
      background-color: #191636;
      /*padding-bottom: px2rem(150px);*/

      .header-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: px2rem(750px);
        height: px2rem(1140px);
        /*background: url(/static/images/activity/applet/double_11/head_bg.png) center no-repeat;*/
        /*background-size: 100%;*/
        z-index: 1;
      }
      .header-bg-font {
        position: absolute;
        left: px2rem(70px);
        top: px2rem(109px);
        width: px2rem(609px);
        height: px2rem(443px);
        margin: 0 auto;
        z-index: 2;
      }
      .header-title {
        position: absolute;
        top:0;
        left: px2rem(215px);
        width: px2rem(320px);
        height: px2rem(48px);
        line-height: px2rem(48px);
        font-size: px2rem(30px);
        background-color: #463B82;
        color: #fff;
        text-align: center;
        margin: 0 auto;
        font-weight: 800;
        z-index: 3;
      }
      .content{
        margin-top: px2rem(600px);
        z-index: 3;
        .list{
          width: px2rem(640px);
          margin: 0 auto;
          margin-bottom: px2rem(50px);
          z-index: 4;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .coupon-unselect >div{
            width: px2rem(53px);
            height: px2rem(54px);
            background: url("/static/images/activity/applet/double_11/circle_unselect.png") center no-repeat;
            background-size: px2rem(53px) px2rem(54px);
            margin: px2rem(11px) auto 0;
          }
          .coupon-select >div{
            width: px2rem(62px);
            height: px2rem(56px);
            background: url("/static/images/activity/applet/double_11/circle_select.png") center no-repeat;
            background-size: px2rem(62px) px2rem(56px);
            margin: px2rem(11px) auto 0;
          }
          .coupon{
            width: px2rem(310px);
            height: px2rem(103px);
            border-radius: px2rem(10px);
            background-color: #fff;
            text-align: center;
            padding-top: px2rem(20px);
            margin-bottom: px2rem(45px);
            .coupon-title{
              font-size:px2rem(30px);
              font-weight:600;
              color:rgba(53,48,115,1);
              /*line-height:px2rem(41px);*/
            }
            .coupon-info{
              font-size:px2rem(24px);
              font-weight:400;
              color:rgba(102,102,102,1);
              margin-top: px2rem(8px);
            }

          }
        }
        .tip{
          width: px2rem(640px);
          margin: 0 auto;
          color: #fff;
          font-size: px2rem(24px);
          line-height: px2rem(30px);
          span{
            color: #FAE92D;
          }
        }
        .recharge {
          width: px2rem(576px);
          height: px2rem(100px);
          line-height: px2rem(100px);
          background: linear-gradient(180deg, rgba(250, 211, 0, 1) 0%, rgba(249, 136, 51, 1) 100%);
          border-radius: px2rem(50px);
          color: #fff;
          font-size: px2rem(36px);
          margin: px2rem(61px) auto px2rem(22px);
          text-align: center;
        }
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
        top: 40%;
        left: 50%;
        width: px2rem(540px);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        border-radius: px2rem(16px);
        padding-left: px2rem(40px);
        padding-right: px2rem(40px);
        padding-bottom: px2rem(45px);
        .pop-title {
          font-size: px2rem(36px);
          color: #333;
          font-weight: 600;
          margin: px2rem(68px) 0 px2rem(59px);
          text-align: left;
        }
        .recharge-title {
          margin: px2rem(50px) 0 px2rem(50px);
        }
        .pop-tip {
          font-size: px2rem(36px);
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: px2rem(48px);
          margin: px2rem(27px) 0 px2rem(76px);
        }
        .pop-min-title {
          font-size: px2rem(32px);
          color: #000;
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
        .close-gray {
          width: px2rem(40px);
          height: px2rem(40px);
        }
        .title {
          font-size: px2rem(32px);
          color: #f3e6b6;
          line-height: px2rem(116px);
          text-align: center;
        }
      }
      /*充值成功*/
      .tip-contain {
        width: px2rem(591px);
        height: px2rem(728px);
        border-radius: px2rem(10px);
        text-align: center;
        .share-icon{
          width: px2rem(226px);
          height: px2rem(169px);
          margin: px2rem(108px) auto px2rem(45px);
        }
        h3{
          color: #000;
          font-size: px2rem(36px);
          text-align: center;
        }
        .share-tip {
          font-size: px2rem(24px);
          color: #999;
          line-height: px2rem(30px);
          text-align: center;
          margin-top: px2rem(71px);
        }

        .btn {
          width:px2rem(491px);
          height:px2rem(100px);
          background:linear-gradient(180deg,rgba(250,211,0,1) 0%,rgba(249,136,51,1) 100%);
          border-radius:px2rem(50px);
          font-size:px2rem(36px);
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:px2rem(100px);
          margin: px2rem(90px) auto px2rem(0px);
        }
      }
      /*分享成功*/
      .shareSuccess-contain{
        text-align: center;
        padding: px2rem(104px) 0 px2rem(96px);
        img{
          width: px2rem(384px);
          height: px2rem(384px);
          border: 1px solid #D7D7D7;
          margin: 0 auto;
        }
        p{
          font-size:px2rem(36px);
          font-weight:500;
          color:rgba(58,58,58,1);
          line-height:px2rem(48px);
          text-align: center;
          margin-top: px2rem(62px);
        }

      }
    }
  }
</style>
