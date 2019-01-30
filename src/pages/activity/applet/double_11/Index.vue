<template>
  <div :class="'double-index ' + [showRules?'static':'']">
    <div class="main-container">
      <img class="header-bg" src="/static/images/activity/applet/double_11/head_bg.png">
      <img class="header-bg-font" src="/static/images/activity/applet/double_11/head_bg_title.png">
      <div class="header-title">11月5日至11月12日</div>
      <div class="content">
        <div class="detail">
          <div class="balance">
            <h3>账户余额:<span class="money">{{activityInfo.accountBalance}}</span><span class="unit">元</span></h3>
            <div class="see-btn see-detail" @click="seeDetail">查看明细</div>
          </div>
          <div class="balance">
            <h3>获得积分:<span class="money">{{activityInfo.totalScore}}</span><span class="unit">个</span></h3>
          </div>
          <div class="info">
            <h3>活动门店：{{activityInfo.storeName}}</h3>
            <h3>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：{{activityInfo.connectAddress}}</h3>
            <h3>活动时间：2018年11月5日至11月12日</h3>
          </div>
        </div>
        <div class="recharge" @click="goRecharge">立即充值</div>
        <div class="recharge-title">活动名额有限噢，先充先得！</div>
        <div class="recharge-outer" v-if="storeSet.rechargeRuleList&&storeSet.rechargeRuleList.length>0">
          <!--<h3 class="title">充值规则</h3>-->
          <table class="recharge-table">
            <caption>充值规则</caption>
            <thead>
            <tr>
              <th>充值金额</th>
              <th>获得账户余额</th>
              <th>奖励积分</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in storeSet.rechargeRuleList">
              <td>{{item.rechargeMoney}}元</td>
              <td>{{item.accountBalance}}元</td>
              <td>{{item.score}}</td>
            </tr>
            </tbody>
            <tfoot>
            </tfoot>
          </table>
          <div class="tip">
            <h3>积分可在身边店商城兑换</h3>
            <div class="see-btn" ><a href="https://wap.storeer.com/integral">点击查看</a></div>
          </div>
        </div>
        <div class="report-btn"><h3 :class="[showRules?'report-btn-up':'report-btn-down']"
                                    @click="showRules=!showRules">点击查看报名须知</h3>
        </div>
        <div class="active-content" v-show="showRules">
          <h3>活动规则：</h3>
          <p class="pre-1">本页面充值300元起充，并以300元递增充值，充值后仅在该门店消费可用。</p>
          <p class="pre-2">对应积分奖励，需在充值成功后，根据提示分享到朋友圈获得，积分可在身边店商城兑换礼品。</p>
          <p class="pre-3">活动优惠不同享，详情咨询门店。</p>
          <p class="pre-4">充值余额不可兑现</p>
        </div>
        <div class="store-item" v-if="activityInfo.linkStaffMobileNum&&activityInfo.linkStaffMobileNum.length>0">
          <!--<img class="storeLogo"/>-->
          <img :src="activityInfo.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt=""
               class="storeLogo"/>
          <div class="storeName"><h3>{{activityInfo.storeName}}</h3></div>
          <div class="see-btn call"><a :href="'tel:' + activityInfo.linkStaffMobileNum" class="">联系导购</a></div>
        </div>
      </div>
    </div>
    <!-- 绑定手机号 -->
    <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
      <div class="mask"></div>
      <div class="bindMobileNum-contain pop-contain">
        <!--<img src="/static/images/activity/close_gray.png" alt="" class="close close-gray"-->
        <!--@click="bindMobileNumShow=false;">-->
        <div class="pop-title">绑定手机号成为门店会员</div>
        <div class="pop-tip">这样门店才能知道<br/>是您充值了噢!</div>
        <div class="content-box">
          <input type="number" class="mobileNum" v-model="mobileNum" placeholder="请输入手机号">
          <div class="rows">
            <input type="number" placeholder="" class="verificationCode" placeholder="输入验证码" v-model="verificationCode">
            <div class="sendvCode" @click="send" v-show="!timerStatus">获取验证码</div>
            <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
          </div>
          <div class="btn-contain">
            <div class="btn btn-bind" @click="bindMobile">确定</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有门店 -->
    <div class="noStore popWindow" v-show="noStoreShow">
      <div class="mask"></div>
      <div class="noStore-contain pop-contain">
        <img src="/static/images/activity/close_gray.png" alt="" class="close close-gray" @click="storeListShow=false;">
        <div class="pop-min-title"><p>您没有关注的门店，无法参与活动。</p></div>
      </div>
    </div>
    <!-- 门店列表 -->
    <div class="storeList popWindow" v-if="storeListShow">
      <div class="mask"></div>
      <div class="storeList-contain pop-contain">
        <!--<img src="/static/images/activity/close_gray.png" alt="" class="close close-gray" @click="storeListShow=false;">-->
        <div class="pop-title">选择门店参与活动</div>
        <div class="content-box">
          <div class="listBox">
            <div v-for="(item,index) in storeList" :class="'listItem'+' '+ [curListItem===index?'listItem-select':'']"
                 @click="selectStore(index);">
              <img class="icon" :src="item.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt=""/>
              <div class="info-contain">
                <div class="name">{{item.storeName}}</div>
                <div class="detail">{{item.connectAddress}}</div>
              </div>
            </div>
            <!--<div class="listItem ">-->
              <!--<img class="icon" alt=""/>-->
              <!--<div class="info-contain">-->
                <!--<div class="name">策划给你写银泰</div>-->
                <!--<div class="detail">上课了的合理速度快高考都是老款返还定金翻倍</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="sure-btn" @click="sureSelectStore">确定</div>
        </div>
      </div>
    </div>
    <!--充值明细-->
    <div class="storeList popWindow" v-if="reChargeShow">
      <div class="mask"></div>
      <div class="recharge-contain pop-contain">
        <img src="/static/images/activity/close_gray.png" alt="" class="close close-gray" @click="reChargeShow=false;">
        <div class="pop-title recharge-title">充值明细</div>
        <div class="content-box recharge-list">
          <div class="recharge-item" v-for="(item,index) in activityInfo.rechargeDetailList">
            <div class="time">{{item.createTime}}</div>
            <div class="name">充值{{item.rechargeMoney}}获得{{item.onlActBalance}}送{{item.gainScore}}积分</div>
          </div>
        </div>
      </div>
    </div>
    <!--&lt;!&ndash; 充值成功 &ndash;&gt;-->
    <!--<div class="share popWindow" v-show="shareShow">-->
    <!--<div class="mask"></div>-->
    <!--<div class="tip-contain pop-contain">-->
    <!--<img class="share-icon" src="/static/images/activity/applet/double_11/recharge_success.png">-->
    <!--<h3>充值成功</h3>-->
    <!--<p class="share-tip">您已成功在（获取）门店参与充值活动，<br/>立即分享活动，获取积分兑好礼！</p>-->
    <!--<div class="btn" @click="shareTipShow=true;">点击分享</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;分享成功&ndash;&gt;-->
    <!--<div class="shareSuccess popWindow" v-show="shareSuccessShow">-->
    <!--<div class="mask"></div>-->
    <!--<div class="shareSuccess-contain pop-contain">-->
    <!--<img src="/static/images/qrcode.jpg" >-->
    <!--<p >长按识别图中二维码<br/>用积分竞换商品</p>-->
    <!--</div>-->
    <!--</div>-->
    <!-- 分享提示 -->
    <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import doubleApi from '../../../../fetch/double_api'
  import api from "../../../../fetch/common_api"
  import ActivityClass from "../../../../class/activity/ActivityClass"
  import * as _validate from "../../../../util/validate"
  import * as _tool from "../../../../util/tool"
  import _urlConfig from "../../../../util/urlConfig"
  import wxShareTip from "@/components/common/wxShareTip2"
  import loading from '@/components/common/loading'
  export default{
    components: {
      "v-loading": loading,
      wxShareTip
    },

    data () {
      return {
        storeCode: this.$route.query.storeCode || null,//门店编号
        staffCode: this.$route.query.staffCode || null,//导购编号
        memberCode: this.$route.query.memberCode || null,//会员编号
        xd_code: this.$route.query.xd_code,  //来源
        activityCode: "28bd0f3bd82611e8bc67704d7b87a020",
        showRules: false,
        showShare: false,
        activityInfo: {},
        signStatus: 0,
        storeSet: {},
        storeList: [],
        bindMobileNumShow: false,
        noStoreShow: false,
        storeListShow: false,
        shareShow: false,
        shareSuccessShow: false,
        loading: false,
        shareTipShow: false,
        reChargeShow: false,
        mobileNum: "",
        verificationCode: "",
        timer: 60,
        timerStatus: false,
        curListItem: 0,

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
    methods: {
      closeTip: function () {
        this.shareTipShow = false;
      },
      //验证码倒计时
      runTimer() {
        if (this.timer > 0) {
          --this.timer
          setTimeout(this.runTimer, 1000);
        } else {
          this.timerStatus = false
        }
      },
      routerLink(path){
        let src = path + "?storeCode=" + (this.storeCode || this.activityInfo.storeCode || "") + "&staffCode=" + (this.staffCode || this.activityInfo.staffCode || "") + "&xd_code=" + (this.xd_code || "")
        this.$router.push({
          path: src
        })
      },
      //发送验证码
      send(){
//        vue.sendvCode= function(){
        if (_validate.mobile(this.mobileNum) !== true) {
          this.$toast(_validate.mobile(this.mobileNum))
          return;
        }
        let data = {
          "mobileNum": this.mobileNum,
          "verificationType": 5
        };
        api.sendVerificationCode("get", data).then((res) => {
          if (res.returnCode === "0") {
            this.timer = 60;
            this.timerStatus = true;
            this.runTimer();
          } else {
            this.$toast(res.message);
          }
        });
//        },
      },
      //绑定手机号
      bindMobileNum() {
        let data = {
          "mobileNum": this.mobileNum,
          "verificationCode": this.verificationCode,
          "appEntranceType": 3
        }
        if (_validate.mobile(data.mobileNum) !== true) {
          this.$toast(_validate.mobile(data.mobileNum));
          return;
        }
        if (_validate.verificationCode(data.verificationCode) !== true) {
          this.$toast(_validate.verificationCode(data.verificationCode));
          return;
        }
        api.memFansBindMobileNum("post", data, this.tokenInfo.token).then(res => {
          if (res.returnCode === "0") {
            this.$store.dispatch("_login", {tokenInfo: JSON.stringify(res.returnContent), openId: this.openId});
            this.collect({
              "xdCode": this.xd_code,
              "ydCode": "YD0005",
              "activityCode": this.activityCode,
              "openId": this.openId
            }, res.returnContent.token);
            this.$toast("手机号绑定成功！");
            //从用户开始进入
            this.bindMobileNumShow=false;
           this.haveStoreCode();
          } else {
            this.$toast(res.message);
          }
        })
      },

      //数据收集
      collect(data,token){
      if (token) {
        api.collectStatisticsOnActivities("post",data,token).then(res => {});
      }else{
        api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
      }
    },
      //绑定手机号
      bindMobile(){
        this.bindMobileNum();
      },

      //立即充值
      goRecharge() {
        this.routerLink("/activity_2018/double_gifts");
      },
      //查看明细
      seeDetail() {
        this.reChargeShow = true;
      },
      //是否有storeCode
      haveStoreCode(){
        //判断是否关注门店
        if (!this.storeCode) {
          //获取已关注且参与活动的门店列表
          api.getActivityStoreList("get", {activityCode: this.activityCode}, this.tokenInfo.token).then((res) => {
            if (res.returnCode === "0") {
              this.storeList = res.returnContent;
              if (this.storeList.length === 0) {
                this.collect({
                  "xdCode": this.xd_code,
                  "ydCode": "YD0011",
                  "activityCode": this.activityCode,
                  "openId": this.openId
                });
                this.noStoreShow = true;
              } else if (this.storeList.length === 1) {
                this.storeCode = res.returnContent[0].storeCode;
                this.initGetData();
              } else {
                this.storeListShow = true;
              }
            } else {
              this.$toast(res.message);
            }
          });
        } else {
          this.initGetData();
        }
      },
      //初始化一些数据
      initGetData(){
        //是否参加活动
        api.activityWhetherAttend("post", {
          activityCode: this.activityCode,
          linkStaffCode: this.staffCode || null,
          storeCode: this.storeCode || null,
//          openId: this.openId||null,
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityInfo = res.returnContent;
            if (res.returnContent.shareFlag === 0 && res.returnContent.attendFlag == 1) {
              //未分享已参加活动,弹出分享框
              this.shareTipShow = true;
              this.initShare();
            } else {
              //加载活动数据
              api.activityContent("post", {
                activityCode: this.activityCode,
                storeCode: this.activityInfo.storeCode || this.storeCode,
                linkStaffCode: this.staffCode || null
              }, this.tokenInfo.token).then((res) => {
                if (res.returnCode === "0") {
                  this.storeSet = res.returnContent || {};
                } else {
                  this.$toast(res.message);
                }
              })
            }
          } else if (res.returnCode === "10") {
            let fullPath = location.pathname + location.search;
            let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
            location.href = _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
          } else {
            this.$toast(res.message);
          }
        })
      },
      //选择门店
      selectStore(index){
        this.curListItem = index;
      },
      //确定选择门店
      sureSelectStore(){
        this.storeCode = this.storeList[this.curListItem].storeCode;
        this.storeListShow=false;
        this.initGetData();
      },
      //初始化分享
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
      initShare(){
        var that=this;
        //分享
        this.initWxShare({
          title: "双十一！做自己的锦鲤！",
          desc: `一年仅此一次！优惠数量有限，速戳来抢！`,
          link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/double_index?xd_code=XD0005&storeCode=' + (this.storeCode || this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode || this.activityInfo.linkStaffCode || "") + '&memberCode=' + (this.activityInfo.memberCode || ""))
        }, () => {
          //年终活动分享成功
          this.collect({
            "xdCode": this.xd_code,
            "ydCode": "YD0013",
            "activityCode": this.activityCode,
            "openId": this.openId
          });

          //分享提示框
          that.shareTipShow = false;
          //活动分享
          api.activityShare("post", {activityCode: that.activityCode,actJoinCode:that.activityInfo.actJoinCode},that.tokenInfo.token).then((res) => {
            if (res.returnCode === "0") {
              if (res.returnContent.isSubscribe === 0) { //是否关注公众号(1：已关注 0：未关注)
                //弹出未关注
                that.shareSuccessShow = true;
              } else {
                //分享成功，已关注
                that.initGetData();
              }
            } else {
              that.$toast(res.message);
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
    },
    created(){
      if (sessionStorage.entryMark !== "marked") {
        return;
      }
      //门店选取
      this.checkStore = function (pre) {
        this.bindMobileNumShow = false;
        if (!this.storeCode) {
          this.loadStoreList();
        } else {
          this.getStoreSet(() => {
            this.initWxShare({
              title: "双十一！做自己的锦鲤！",
              desc: `一年仅此一次！优惠数量有限，速戳来抢！`,
              link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/double_index?xd_code=XD0005&storeCode=' + (this.storeCode || this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode || this.activityInfo.linkStaffCode || "") + '&memberCode=' + (this.activityInfo.memberCode || ""))
            }, () => {
              this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0013",
                "activityCode": this.activityCode,
                "openId": this.openId
              });
              this.shareTipShow = false;
              this.activityShare({
                activityCode: this.activityCode
              });
              this.shareShow = true;
            })
            this.storeListShow = false;
          });
        }
      };

      //数据收集
      //如果是小白，且为导购分享链接，则关注门店
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

      this.initWxConfig();

    },
    mounted(){

      //判断是否是用户，不是的显示绑定界面
      if (this.tokenInfo.imInfo === null) {
        this.bindMobileNumShow = true;
        return;
      }
      //是否有storeCode
      this.haveStoreCode();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-index {
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
        top: 0;
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
      .content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 3;

        .detail {
          width: px2rem(614px);
          height: px2rem(409px);
          background: rgba(255, 255, 255, 1);
          /*box-shadow:0px 12px 30px 2px rgba(242,76,51,0.24);*/
          border-radius: 10px;
          margin: px2rem(600px) auto 0;
          padding: 0 px2rem(33px);
          .balance {
            height: px2rem(115px);
            border-bottom: 1px solid #eee;
            h3 {
              float: left;
              height: px2rem(115px);
              line-height: px2rem(115px);
              color: #333333;
              font-size: px2rem(30px);
              text-align: left;
              .money {
                color: #FF4A35;
                margin-left: px2rem(10px);
                /*font-size: px2rem(30px);*/
                /*text-align: left;*/
              }
              .unit {
                color: #9A9A9A;
                margin-left: px2rem(5px);
              }
            }
            .see-detail {
              margin: px2rem(29px) auto;
            }
          }
          .info {
            font-size: px2rem(24px);
            font-weight: 400;
            color: rgba(154, 154, 154, 1);
            line-height: px2rem(34px);
            margin: px2rem(40px) 0 px2rem(54px);
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
        .recharge-title {
          color: #fff;
          font-size: px2rem(30px);
          line-height: px2rem(34px);
          margin: 0 auto;
          text-align: center;
        }
        .see-btn {
          float: right;
          width: px2rem(140px);
          height: px2rem(57px);
          line-height: px2rem(57px);
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          border: 1px solid rgba(86, 147, 249, 1);
          color: rgba(86, 147, 249, 1);
          text-align: center;
          a{
            color: rgba(86, 147, 249, 1);
          }
        }
        .recharge-outer {
          width: px2rem(614px);
          /*height: px2rem(687px);*/
          background: rgba(255, 255, 255, 1);
          /*box-shadow:0px 12px 30px 2px rgba(242,76,51,0.24);*/
          border-radius: 10px;
          margin: px2rem(61px) auto 0;
          padding: 0 px2rem(33px) px2rem(35px);
          .recharge-table {
            width: 100%;
            /*border: 1px solid #BFBFBF;*/
            border-collapse: collapse; /*关键代码*/
            text-align: center;
            border: 2px solid #fff;
            border-bottom: 1px solid #BFBFBF;;
            caption {
              height: px2rem(80px);
              line-height: px2rem(80px);
              font-size: px2rem(36px);
              font-weight: 600;
              color: #333;
              text-align: center;

            }
            th {
              height: px2rem(66px);
              line-height: px2rem(66px);
              text-align: center;
              /*border: 1px solid #BFBFBF;*/
              color: #999999;
              font-size: px2rem(26px);
            }
            td {
              height: px2rem(66px);
              line-height: px2rem(66px);
              text-align: center;
              border: 1px solid #BFBFBF;
              color: #333;
              font-size: px2rem(24px);
            }
          }
          .tip {
            height: px2rem(57px);
            margin-top: px2rem(23px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            h3 {
              float: left;
              font-size: px2rem(26px);
              color: #333;
            }
          }
        }
        .report-btn {
          text-align: right;
          .report-btn-down, .report-btn-up {
            position: relative;
            height: px2rem(32px);
            font-size: px2rem(30px);
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            margin: px2rem(40px) px2rem(100px) px2rem(31px) px2rem(43px);
            display: inline-block;
          }
          .report-btn-down::after {
            content: "";
            position: absolute;
            right: px2rem(-40px);
            top: 0;
            width: px2rem(32px);
            height: px2rem(32px);
            background: url(/static/images/activity/down_white.png) center no-repeat;
            background-size: 100% 100%;
          }
          .report-btn-up::after {
            content: "";
            position: absolute;
            right: px2rem(-40px);
            top: 0;
            width: px2rem(32px);
            height: px2rem(32px);
            background: url(/static/images/activity/up_white.png) center no-repeat;
            background-size: 100% 100%;
          }
        }
        .active-content {
          width: px2rem(614px);
          /*height: px2rem(304px);*/
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          margin: px2rem(61px) auto 0;
          padding: px2rem(39px) px2rem(33px) px2rem(65px);
          color: #9A9A9A;
          font-size: px2rem(24px);
          h3 {
            margin-bottom: px2rem(27px);
          }
          p {
            width: px2rem(535px);
            padding-left: px2rem(30px);
            line-height: px2rem(34px);
            position: relative;
            display: inline-block;
          }
          .pre-1::before {
            content: "1、";
            position: absolute;
            left: px2rem(0px);
          }
          .pre-2::before {
            content: "2、";
            position: absolute;
            left: px2rem(0px);
          }
          .pre-3::before {
            content: "3、";
            position: absolute;
            left: px2rem(0px);
          }
          .pre-4::before {
            content: "4、";
            position: absolute;
            left: px2rem(0px);
          }

        }
        .store-item {
          width: px2rem(750px);
          height: px2rem(167px);
          background: #fff;
          /*padding: 0 px2rem(36px);*/
          margin-top: px2rem(59px);
          /*display: flex;*/
          /*align-items: center;*/
          /*justify-content: space-around;*/
          .storeLogo {
            float: left;
            width: px2rem(122px);
            height: px2rem(122px);
            margin: px2rem(25px) px2rem(25px) px2rem(25px) px2rem(25px);
            /*border: 1px solid #eee;*/
            /*margin-right: px2rem(25px);*/
          }
          .storeName {
            float: left;
            width: px2rem(247px);
            margin-top: px2rem(52px);
            height: px2rem(62px);
            h3 {
              width: px2rem(247px);
              margin-right: px2rem(140px);
              height: px2rem(62px);
              font-size: px2rem(30px);
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: px2rem(31px);
            }

          }
          .call {
            margin-top: px2rem(57px);
            margin-right: px2rem(56px);
            /*margin:px2rem(57px) px2rem(56px) 0 0;*/
          }

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
      //用户绑定弹窗
      .bindMobileNum-contain {
        .close {
          top: px2rem(50px);
        }
        .content-box {
          background-color: #fff;
          /*overflow: hidden;*/
        }

        .mobileNum {
          display: block;
          width: px2rem(427px);
          margin: 0 auto;
          height: px2rem(104px);
          font-size: px2rem(28px);
          background-color: #fff;
          text-indent: px2rem(8px);
          border: 1px solid rgba(229, 229, 229, 1);
          box-sizing: content-box;
          padding: 0 px2rem(27px);
        }
        .mobileNum::-webkit-input-placeholder {
          font-size: px2rem(28px);
          color: #999;
        }
        .rows {
          display: block;
          width: px2rem(481px);
          margin: 0 auto;
          height: px2rem(104px);
          font-size: px2rem(28px);
          background-color: #fff;
          text-indent: px2rem(8px);
          box-sizing: content-box;
          padding: 0;
          margin-top: px2rem(28px);
          .verificationCode {
            float: left;
            width: px2rem(238px);
            height: px2rem(104px);
            line-height: px2rem(104px);
            font-size: px2rem(30px);
            border: 1px solid #E5E5E5;
            background-color: #FFF;
            padding: 0 px2rem(28px);
          }
          .verificationCode::-webkit-input-placeholder {
            color: #999;
            font-size: px2rem(30px);
          }
          .sendvCode {
            float: right;
            /*position: relative;*/
            /*display: block;*/
            width: px2rem(170px);
            height: px2rem(100px);
            line-height: px2rem(100px);
            margin: px2rem(2px) 0;
            font-size: px2rem(24px);
            text-align: center;
            background-color: #F99928;
            color: #fff;
          }
        }
        .btn-contain {
          margin: px2rem(55px) auto;
          text-align: center;
          .btn-bind {
            position: relative;
            display: inline-block;
            width: px2rem(491px);
            height: px2rem(100px);
            line-height: px2rem(100px);
            font-size: px2rem(36px);
            color: #fff;
            text-align: center;
            background-color: #F99928;
            border-radius: 50px;
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
          /*height: px2rem(570px);*/
          margin: px2rem(5px) auto 0;
          overflow-x: hidden;
          overflow-y: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          .listItem {
            position: relative;
            width: px2rem(525px);
            height: px2rem(136px);
            background-color: #fff;
            border: 1px solid #eee;
            border-radius: px2rem(10px);
            margin-bottom: px2rem(52px);
            &::after {
              content: "";
              width: px2rem(53px);
              height: px2rem(54px);
              background: url(/static/images/activity/applet/double_11/circle_unselect.png) center no-repeat;
              background-size: px2rem(53px) px2rem(54px);
              position: absolute;
              right: px2rem(-31px);
              top: px2rem(40px);
            }
            .icon {
              float: left;
              width: px2rem(95px);
              height: px2rem(96px);
              border-radius: px2rem(10px);
              margin: px2rem(21px) px2rem(19px);
            }
            .info-contain {
              float: left;
              width: px2rem(335px);
            }
            .name {
              font-size: px2rem(30px);
              color: #333;
              margin-top: px2rem(34px);
            }
            .detail {
              width: px2rem(335px);
              display: inline-block;
              font-size: px2rem(24px);
              color: #999;
              margin-top: px2rem(9px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

          }
          .listItem-select {
            &::after {
              content: "";
              width: px2rem(62px);
              height: px2rem(56px);
              background: url(/static/images/activity/applet/double_11/circle_select.png) center no-repeat;
              background-size: px2rem(62px) px2rem(56px);
              position: absolute;
              right: px2rem(-31px);
              top: px2rem(40px);
            }
          }
        }
        .sure-btn {
          width: px2rem(491px);
          height: px2rem(100px);
          background: linear-gradient(180deg, rgba(250, 211, 0, 1) 0%, rgba(249, 136, 51, 1) 100%);
          border-radius: px2rem(50px);
          font-size: px2rem(36px);
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: px2rem(100px);
          text-align: center;
          margin: 0 auto;
        }
      }
      //充值明细
      .recharge-contain {
        .recharge-list {
          height: px2rem(600px);
          overflow-y: scroll;
        }
        .recharge-item {
          width: px2rem(517px);
          /*height: px2rem(130px);*/
          border-bottom: 1px solid #eee;
          margin: 0 auto;
          .time {
            font-size: px2rem(24px);
            color: #999;
            margin-top: px2rem(30px);
          }
          .name {
            font-size: px2rem(30px);
            color: #333;
            margin: px2rem(20px) 0 px2rem(30px);
          }

        }
      }
      //没有门店
      .noStore-contain {
        position: relative;
        height: px2rem(298px);
        p{
          margin: px2rem(100px) 0 px2rem(40px);
        }
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
      /*!*充值成功*!*/
      /*.tip-contain {*/
      /*width: px2rem(591px);*/
      /*height: px2rem(728px);*/
      /*border-radius: px2rem(10px);*/
      /*text-align: center;*/
      /*.share-icon{*/
      /*width: px2rem(226px);*/
      /*height: px2rem(169px);*/
      /*margin: px2rem(108px) auto px2rem(45px);*/
      /*}*/
      /*h3{*/
      /*color: #000;*/
      /*font-size: px2rem(36px);*/
      /*text-align: center;*/
      /*}*/
      /*.share-tip {*/
      /*font-size: px2rem(24px);*/
      /*color: #999;*/
      /*line-height: px2rem(30px);*/
      /*text-align: center;*/
      /*margin-top: px2rem(71px);*/
      /*}*/

      /*.btn {*/
      /*width:px2rem(491px);*/
      /*height:px2rem(100px);*/
      /*background:linear-gradient(180deg,rgba(250,211,0,1) 0%,rgba(249,136,51,1) 100%);*/
      /*border-radius:px2rem(50px);*/
      /*font-size:px2rem(36px);*/
      /*font-weight:600;*/
      /*color:rgba(255,255,255,1);*/
      /*line-height:px2rem(100px);*/
      /*margin: px2rem(90px) auto px2rem(0px);*/
      /*}*/
      /*}*/
      /*!*分享成功*!*/
      /*.shareSuccess-contain{*/
      /*text-align: center;*/
      /*padding: px2rem(104px) 0 px2rem(96px);*/
      /*img{*/
      /*width: px2rem(384px);*/
      /*height: px2rem(384px);*/
      /*border: 1px solid #D7D7D7;*/
      /*margin: 0 auto;*/
      /*}*/
      /*p{*/
      /*font-size:px2rem(36px);*/
      /*font-weight:500;*/
      /*color:rgba(58,58,58,1);*/
      /*line-height:px2rem(48px);*/
      /*text-align: center;*/
      /*margin-top: px2rem(62px);*/
      /*}*/

      /*}*/
    }
  }
</style>
