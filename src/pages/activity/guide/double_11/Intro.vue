<template>
  <div :class="'double-guide-intro ' + [showRules?'static':'']">
    <activityHeader type="app" title="11.11，单？免了？"></activityHeader>
    <div class="main-container">
      <div class="header-title" v-if="!isactivityPeriod">活动时间：11月5日-11月12日</div>
      <div class="header-bg" v-if="!isactivityPeriod">
        <img class="header-bg-font" src="/static/images/activity/guide/double_11/title_font_before.png">
      </div>
      <div class="header-bg-after" v-if="isactivityPeriod">
        <img class="header-bg-font" src="/static/images/activity/guide/double_11/title_font_after.png">
      </div>

      <div class="active-content active-content-recharge" v-if="isactivityPeriod">
        <h3 class="black">充值会员</h3>
        <div class="mobile-outer"><input type="number" v-model="mobile" placeholder="请输入会员手机号"/>
          <div :class="'sure '+[isMobile?'sure-can':'']" @click="sureMember">确认</div>
        </div>
        <p class="mobile-notice wrong" v-show="phoneStatus==0">无会员信息，请确认输入的手机号</p>
        <p class="mobile-notice" v-show="phoneStatus==1">搜索成功：{{memberInfo.trueName}}</p>
        <h3 class="black">充值金额</h3>
        <div class="mobile-outer">
          <input type="number" class="money" v-model="money" placeholder="请输入充值金额">
          <div class="unit">元</div>
        </div>
        <h3 class="black recharge-title">充值方式<span>(选择会员支付方式)</span></h3>
        <div class="recharge-method">
          <div :class="'method-item '+[rechargeMoneyIndex==0?'method-item-zfb':'']" @click="rechargeMoneyIndex=0">
            <img class="zfb"
                 :src="rechargeMoneyIndex==0?'/static/images/activity/guide/double_11/pay_zfb_select.png':'/static/images/activity/guide/double_11/pay_zfb.png'"
            />
            <p>支付宝</p>
          </div>
          <div :class="'method-item '+[rechargeMoneyIndex==1?'method-item-wx':'']" @click="rechargeMoneyIndex=1">
            <img class="wx"
                 :src="rechargeMoneyIndex==1?'/static/images/activity/guide/double_11/pay_wx_select.png':'/static/images/activity/guide/double_11/pay_wx.png'"
            />
            <p>微信支付</p>
          </div>
          <div :class="'method-item '+[rechargeMoneyIndex==2?'method-item-money':'']" @click="rechargeMoneyIndex=2">
            <img class="money"
                 :src="rechargeMoneyIndex==2?'/static/images/activity/guide/double_11/pay_money_select.png':'/static/images/activity/guide/double_11/pay_money.png'"/>
            <p>现金支付</p>
          </div>

        </div>
        <div :class="'right-recharge '+[canPay?'right-recharge-can':'']" @click="rightRecharge">立即充值</div>
        <div class="tip">会员可免单金额<span>{{freeMoney}}</span>元，会员转发活动获得<span>{{rewordScore}}</span>个积分</div>
        <div class="notice">
          <p>操作流程：输入会员手机号-点击确认-输入充值金额-选择会员支付方式（支付宝、微信、现金）-点击立即充值-会员支付，充值完成。</p>
        </div>
      </div>
      <div :class="'title-outer '+[!isactivityPeriod?'title-outer-before':''] "><h3 class="title">活动内容</h3></div>
      <div class="active-content">
        <h3 class="content-title title_1">会员线下到店充值，线上分享活动获得积分，你获得奖励</h3>
        <p class="content-info text-intent" v-show="!isactivityPeriod">
          会员线下到店选购X元商品，你为会员在活动页面成功充值3X元，会员就可把商品免费带回家，分享活动到微信，获得对应积分，你就获得对应奖励。</p>
        <p class="content-info text-intent" v-show="isactivityPeriod">
          会员线下到店选购X元商品，你为会员在活动页面成功充值3X元，会员就可把商品免费带回家，分享活动到微信，获得对应积分，你就获得（“元”后台获取）奖励</p>
        <h3 class="content-title title_2">分享活动链接，会员线上自助充值并分享活动，你获得奖励</h3>
        <p class="content-info text-intent" v-show="!isactivityPeriod">
          你分享活动给会员，该会员在你分享的链接上成功充值，会员充值300元得{{money300}}元门店余额，充值600元得{{money600}}元门店余额，以此类推，充值后门店金额立即可用。充值成功后，会员分享活动后获得身边店积分。每一位会员成功充值并转发活动，你获得对应奖励。</p>
        <p class="content-info text-intent" v-show="isactivityPeriod">
          你分享活动给会员，该会员在你分享的活动页上成功充值，会员充值300元得{{money300}}元门店余额，充值600元得{{money600}}元门店余额，以此类推，充值后门店金额立即可用。充值成功后，会员分享活动后获得身边店积分。每成功充值一位会员，转发活动你获得（“元”后台获取）奖励。</p>
        <p class="content-info text-intent">线上线下活动为各自独立活动，优惠不同享，会员参与了哪个活动就对应享受哪个活动的优惠。一定要告知会员分享活动才有积分奖励，能在身边店兑换多种礼品！</p>
        <!--<p class="content-info color-grey text-intent">-->
        <!--充值的优惠力度给到会员相当于7.5折，另外导购奖励金额由您自己设定噢！赠送积分会员在换取礼品后会寄送至您的门店，让会员二次进店！<br/>-->
        <!--本次活动优惠是否与门店其他优惠同享，门店自行决定！</p>-->
      </div>
      <h3 :class="[showRules?'report-btn-up':'report-btn-down']" @click="showRules=!showRules">点击查看活动须知</h3>
      <div class="active-content no-title" v-show="showRules">
        <p class="content-info">线下活动的免单操作由门店自行进行举例如下：</p>
        <p class="content-info color-red">
          例：钱女士进店选购了200元的商品，并注册成为身边店会员关注公众号，你在免单活动页为钱女士充值了600元，钱女士即可获得200元商品+600元身边店中本门店充值余额，转发活动后，再获得60个积分。你获得奖励。</p>
        <p class="content-info">线上充值的奖励只有会员通过你分享的链接进行充值，你才获得奖励！在其他链接进行充值的会员，无奖励！</p>
      </div>

      <div class="title-outer" v-if="isactivityPeriod"><h3 class="title">我的活动数据</h3></div>
      <div class="active-content active-content-table" v-if="isactivityPeriod">
        <table class="table">
          <tr>
            <td>
              <h3>线下充值会员（人）</h3>
              <p>{{activityDataStaff.offlineRechargeNum}}</p>
            </td>
            <td>
              <h3>获得奖励（元）</h3>
              <p>{{activityDataStaff.offlineRewardMoney}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h3>线上充值会员(人）</h3>
              <p>{{activityDataStaff.onlineRechargeNum}}</p>
            </td>
            <td>
              <h3>获得奖励(元）</h3>
              <p>{{activityDataStaff.onlineRewardMoney}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h3>累计转发查看量(人）</h3>
              <p>{{activityDataStaff.totalShareNum}}</p>
            </td>
            <td>
              <h3>总计奖励金额(元）</h3>
              <p>{{activityDataStaff.totalRewardMoney}}</p>
            </td>
          </tr>
        </table>
        <div class="notice">
          <p>奖励直接发放到你绑定的支付宝，请确保已绑定正确的支付宝账号（查看途径：我的—我的收益—收款支付宝）。</p>
          <p>如遇问题，请添加微信客服：13735433487。</p>
        </div>
      </div>
    </div>
    <div class="btn-cover" v-if="isactivityPeriod">
      <div class="btn red-btn" @click="memberRegister">邀请会员注册</div>
      <div class="btn yellow-btn" @click="routerLink('/activity_2018/double_guide_poster')">立即分享</div>
    </div>

    <!-- 分享弹窗 -->
    <div class="popWindow" v-if="showShare">
      <div class="mask"></div>
      <div class="share-contain pop-contain">
        <img :src="publicImg" class="share-img">
        <div class="title tip-title">扫码关注公众号</div>
        <div class="btn red-btn" @click="showShare=false;">返回</div>
      </div>
    </div>
    <!-- 扫码支付弹窗 -->
    <div class="popWindow" v-if="showPay">
      <div class="mask"></div>
      <div class="pay-contain pop-contain">
        <img :src="moneyQR" class="share-img">
        <div class="title tip-title">扫码支付</div>
        <div class="btn grey-btn cancell" @click="cancellZfbPay">取消支付</div>
        <!--<div class="btn red-btn" @click="rightRecharge">刷新</div>-->
      </div>
    </div>
    <!-- 支付成功弹窗 -->
    <div class="popWindow" v-if="showPaySuccess">
      <div class="mask"></div>
      <div class="pay-success-contain pop-contain">
        <img src="/static/images/activity/guide/double_11/pay_success.png" class="share-img">
        <div class="title tip-title">支付成功</div>
        <div class="tip-content">充值成功：{{memberInfo.trueName!='未设置真实姓名'?memberInfo.trueName:memberInfo.mobileNum}}<br/>到账金额：{{money}}元</div>
        <div class="btn sure" @click="paySuccess">确定</div>
      </div>
      <!--<div class="pay-success-contain pay-success-contain2 pop-contain" v-else>-->
      <!--<div class="title tip-other">确认已收现金？</div>-->
      <!--<div class="btn grey-btn cancell" @click="showPaySuccess=false;">取消支付</div>-->
      <!--<div class="btn sure" @click="activityOrderInfoConfirmByStaff">确定</div>-->
      <!--</div>-->
    </div>
    <!-- 现金支付确认弹窗 -->
    <div class="popWindow" v-if="showPayMoney">
      <div class="mask"></div>
      <div class="pay-success-contain pay-success-contain2 pop-contain">
        <div class="title tip-other">确认已收现金？</div>
        <div class="btn grey-btn cancell" @click="cancellPay">取消支付</div>
        <div class="btn sure" @click="activityOrderInfoConfirmByStaff">确定</div>
      </div>
    </div>


    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>

</template>

<script>
  import api from '../../../../fetch/api'
  import doubleApi from '../../../../fetch/double_api'
  import activityHeader from "@/components/common/activityHeader"
  import loading from '@/components/common/loading'
  import _urlConfig from "../../../../util/urlConfig"
  import * as _tool from "../../../../util/tool"
  import * as _validate from "../../../../util/validate"
  export default{
    components: {
      "v-loading": loading,
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        appEntranceType: -1,
        activityCode: "28bd0f3bd82611e8bc67704d7b87a020",
        showRules: false,
        isactivityPeriod: true,
        publicImg: "",
        mobile: "",
        isMobile: false,
        phoneStatus: -1,
        money: "",
        freeMoney: 0,
        rewordScore: 0,
        rechargeMoneyIndex: -1,
        loading: false,
        showShare: false,
        showPay: false,
        showPaySuccess: false,
        showPayMoney: false,
        activityInfo: {},
        activityDataStaff: {},
        memberInfo: {},
        canPay: false,
        orderInfo: {},
        timer: null,
        money300: 0,
        money600: 0,
        moneyQR: ""
      }
    },
    watch: {

      type(){
        //ios/android
        if (this.type == "android") {
          this.appEntranceType = 2;
        } else {
          this.appEntranceType = 1;
        }
      },
      mobile(){
        if (this.phoneStatus == 1 && this.money.length > 0 && this.rechargeMoneyIndex >= 0) {
          this.canPay = true;
        } else {
          this.canPay = false;
        }
        if (_validate.mobile(this.mobile) == true) {
            this.isMobile=true;
        }else {
          this.isMobile=false;
        }
      },
      money () {
        this.freeMoney = parseInt(this.money / 3);

        this.rewordScore = parseInt(this.money / (this.activityInfo.unlPerScoreMoney));

        if (this.phoneStatus == 1 && this.money.length > 0 && this.rechargeMoneyIndex >= 0) {
          this.canPay = true;
        } else {
          this.canPay = false;
        }
      },
      phoneStatus(){
        if (this.phoneStatus == 1 && this.money.length > 0 && this.rechargeMoneyIndex >= 0) {
          this.canPay = true;
        } else {
          this.canPay = false;
        }
      },
      rechargeMoneyIndex () {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer=null;
        }
        if (this.phoneStatus == 1 && this.money.length > 0 && this.rechargeMoneyIndex >= 0) {
          this.canPay = true;
        } else {
          this.canPay = false;
        }
      },
      activityInfo(){
        let rechargeRuleList = this.activityInfo.rechargeRuleList;
        for (var i = 0; i < rechargeRuleList.length; i++) {
          if (rechargeRuleList[i].rechargeMoney == 300) {
            this.money300 = rechargeRuleList[i].accountBalance;
          } else if (rechargeRuleList[i].rechargeMoney == 600) {
            this.money600 = rechargeRuleList[i].accountBalance;
          }
        }

      }
    },

    methods: {
      //数据收集
      collect: function (data) {
        api.collectStatisticsOnActivitiesByStaff("post", data, this.token).then(res => {
        });
      },
      memberRegister: function () {
        doubleApi.activityQrCodeByStaff("post", {
          activityCode: this.activityCode
        }, this.token).then(res => {
          if (res.returnCode === "0") {
            this.publicImg = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + res.returnContent;
            this.showShare = true;
          } else {
            alert(res.message);
          }
        });


      },
      paySuccess: function () {
        clearInterval(this.timer);
        this.timer=null;
        this.showPaySuccess = false;
        this.mobile = "";
        this.money = "";
        this.rechargeMoneyIndex = -1;
        this.phoneStatus = -1
      },
      cancellPay: function () {
        clearInterval(this.timer);
        this.timer=null;
        this.showPayMoney = false;
        this.mobile = "";
        this.money = "";
        this.rechargeMoneyIndex = -1;
        this.phoneStatus = -1
      },
      cancellZfbPay: function () {
        clearInterval(this.timer);
        this.timer=null;
        this.showPay = false;
        this.mobile = "";
        this.money = "";
        this.rechargeMoneyIndex = -1;
        this.phoneStatus = -1;
      },
      //跳转
      routerLink(path){
        let src = path + "?token=" + this.token + "&type=" + this.type
        this.$router.push({
          path: src
        })
      },
      //检查订单信息
      activityOrderInfoConfirmByStaff: function () {
        doubleApi.activityOrderInfoConfirmByStaff("post", {
          activityCode: this.activityCode,
          orderNum: this.orderInfo.orderNum
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            if (this.rechargeMoneyIndex != 2) {
              this.showPay = false;
              this.showPaySuccess = true;
              clearInterval(this.timer);
              this.timer=null;
            } else {
              this.showPayMoney = false;
              this.showPaySuccess = true;
            }
          }
//          else {
//          alert(res.message);
//        }
        });
      },
      //立即充值
      rightRecharge: function () {
        if (this.canPay && !this.timer) {
          if (parseInt(this.money) < this.activityInfo.unlBeginRechargeMoney) {
            alert(this.activityInfo.unlBeginRechargeMoney + "元起充");
            return;
          }
          //会员确认
          if (_validate.mobile(this.mobile) !== true) {
            this.$toast(_validate.mobile(this.mobile));
            return;
          }

          doubleApi.searchStoreMemberListByCond("get", {
            searchCond: this.mobile
          }, this.token).then((res) => {
            if (res.returnCode === "0") {
              if (res.returnContent.length >= 1) {
                this.memberInfo = res.returnContent[0];
                this.phoneStatus = 1;
              } else {
                this.phoneStatus = 0;
              }
              this.loading = true;
              doubleApi.activityOrderInfoEditByStaff("post", {
                activityCode: this.activityCode,
                memberCode: this.memberInfo.memberCode,
                rechargeMoney: this.money,
                payMode: (this.rechargeMoneyIndex + 1),
                appEntranceType: this.appEntranceType
              }, this.token).then((res) => {
                if (res.returnCode === "0") {
                  this.orderInfo = res.returnContent;
                  if (this.rechargeMoneyIndex != 2) {
                    this.loading = true;
                    //获取支付二维码
                    doubleApi.activityShareImageStaff("post", {
                      activityCode: this.activityCode,
                      qrContent: this.orderInfo.qrCode,
                      qrWidth: 406,
                      qrHeight: 406
                    }, this.token).then((res) => {
                      if (res.returnCode === "0") {
                        this.moneyQR = res.returnContent;
                        //扫码支付二维码
                        this.showPay = true;
                        this.timer = setInterval(this.activityOrderInfoConfirmByStaff, 3000);
                      } else {
                        alert(res.message);
                      }
                      this.loading = false;
                    });
                  } else {
                    this.loading = false;
                    this.showPayMoney = true;
                  }
                } else {
                  this.phoneStatus = 0;
                  this.loading = false;
                }
              });
            } else {
              alert(res.message);
            }
          });
//          this.sureMember(function () {
//            doubleApi.activityOrderInfoEditByStaff("post", {
//              activityCode: this.activityCode,
//              memberCode: this.memberInfo.memberCode,
//              rechargeMoney: this.money,
//              payMode: (this.rechargeMoneyIndex + 1),
//              appEntranceType: this.appEntranceType
//            }, this.token).then((res) => {
//              if (res.returnCode === "0") {
//                this.orderInfo = res.returnContent;
//                if (this.rechargeMoneyIndex != 2) {
//                  //扫码支付二维码
//                  this.showPay = true;
//                  this.timer=setInterval(this.activityOrderInfoConfirmByStaff,3000);
//                } else {
//                  this.showPaySuccess = true;
//                }
//              } else {
//                this.phoneStatus = 0;
//              }
//            });
//          });

        }
      },
      //确定会员手机号
      sureMember: function (cb) {
        if (_validate.mobile(this.mobile) !== true) {
          this.$toast(_validate.mobile(this.mobile));
          return;
        }
        doubleApi.searchStoreMemberListByCond("get", {
          searchCond: this.mobile
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            if (res.returnContent.length >= 1) {
              this.memberInfo = res.returnContent[0];
              this.phoneStatus = 1;
            } else {
              this.phoneStatus = 0;
            }
            typeof cb === "function" && cb();
          } else {
            alert(res.message);
          }
        });
      },
      //获取活动统计数据
      getactivityDataStaff: function () {
        doubleApi.activityDataStaff("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityDataStaff = res.returnContent;

          } else {
            alert(res.message);
          }
        })
      },
      //获取活动相关信息
      getActivityInfo(){
        doubleApi.activityInfo("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityInfo = res.returnContent;

            //判断是否在活动期间
            var beginTime = res.returnContent.beginTime;
            beginTime = new Date(beginTime).getTime();
            var endTime = res.returnContent.endTime;
            endTime = new Date(endTime).getTime()+24*60*60*1000;
            var nowTime = new Date().getTime();
            if (nowTime >= beginTime && nowTime <= endTime) {
              this.isactivityPeriod = true;
              this.getactivityDataStaff();
            } else {
              this.isactivityPeriod = false;
            }
          } else {
            alert(res.message);
          }
        })
      },
    },
    mounted(){
      //初始化webViewJavascriptBridge
      _tool.webviewBridgeInit(this.type);
      this.getActivityInfo();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-guide-intro {
    position: relative;
    height: 101%;
    &.static {
      overflow: hidden;
    }
    .main-container {
      position: relative;
      /*height: 100%;*/
      letter-spacing: px2rem(2px);
      overflow: hidden;
      padding-top: px2rem(80px);
      /*background-color:#F24D35;*/
      /*background-color: #EE331D;*/
      background: -webkit-linear-gradient(#EE331D, #F0442E, #F24D35);
      background: -o-linear-gradient(#EE331D, #F0442E, #F24D35);
      background: -moz-linear-gradient(#EE331D, #F0442E, #F24D35);
      background: -mos-linear-gradient(#EE331D, #F0442E, #F24D35);
      background: linear-gradient(#EE331D, #F0442E, #F24D35);
      padding-bottom: px2rem(150px);
      .header-title {
        width: px2rem(501px);
        height: px2rem(72px);
        line-height: px2rem(72px);
        font-size: px2rem(30px);
        background-color: #FBE9B0;
        color: #EE3C28;
        text-align: center;
        margin: 0 auto;
        font-weight: 800;
      }
    }
    .header-bg {
      width: px2rem(750px);
      height: px2rem(631px);
      background: url(/static/images/activity/guide/double_11/bg_before.png) no-repeat;
      background-position: 0 px2rem(-70px);
      background-size: 100%;
      position: relative;
      text-align: center;
      .header-bg-font {
        position: absolute;
        left: px2rem(81px);
        top: px2rem(98px);
        width: px2rem(514px);
        height: px2rem(380px);
      }

    }
    .title-outer {
      width: 100%;
      height: px2rem(45px);
      text-align: center;
      margin: px2rem(70px) auto px2rem(54px);
      .title {
        position: relative;
        display: inline-block;
        font-size: px2rem(46px);
        height: px2rem(45px);
        line-height: px2rem(45px);
        color: #FBEC70;
        margin: 0 auto;
        &::before {
          content: "";
          position: absolute;
          left: px2rem(-60px);
          top: 0;
          width: px2rem(54px);
          height: px2rem(60px);
          background: url(/static/images/activity/boss/double_11/title_icon_left.png) center no-repeat;
          background-size: 100% 100%;
        }
        &::after {
          content: "";
          position: absolute;
          right: px2rem(-60px);
          top: 0;
          width: px2rem(54px);
          height: px2rem(60px);
          background: url(/static/images/activity/boss/double_11/title_icon_right.png) center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .title-outer-before {
      margin-top: px2rem(-40px);
    }

    .head {
      position: relative;
      top: px2rem(552px);
    }
    .header-bg-after {
      width: px2rem(750px);
      height: px2rem(357px);
      background: url(/static/images/activity/guide/double_11/bg_after.png) no-repeat;
      background-position: center;
      background-size: 100%;
      position: relative;
      text-align: center;
      .header-bg-font {
        position: absolute;
        left: px2rem(61px);
        top: px2rem(63px);
        width: px2rem(444px);
        height: px2rem(280px);
      }

    }

    .active-content {
      position: relative;
      width: px2rem(660px);
      /*height: px2rem(1164px);*/
      background: #fff;
      border-radius: px2rem(10px);
      margin: 0 auto;
      padding: px2rem(65px) px2rem(76px) px2rem(58px) px2rem(44px);
      box-sizing: border-box;
      .content-title {
        width: px2rem(500px);
        font-size: px2rem(36px);
        font-weight: 600;
        color: rgba(54, 54, 54, 1);
        line-height: px2rem(40px);
        margin-left: px2rem(55px);
      }
      .title_1::before {
        position: absolute;
        left: px2rem(44px);
        content: "1";
        width: px2rem(39px);
        height: px2rem(39px);
        line-height: px2rem(39px);
        background: #FF6044;
        text-align: center;
        color: #FFFFFF;
        border-radius: 50%;
      }
      .title_2::before {
        position: absolute;
        left: px2rem(44px);
        content: "2";
        width: px2rem(39px);
        height: px2rem(39px);
        line-height: px2rem(39px);
        background: #FF6044;
        text-align: center;
        color: #FFFFFF;
        border-radius: 50%;
      }
      .content-info {
        width: px2rem(489px);
        /*height: px2rem(191px);*/
        font-size: px2rem(30px);
        font-weight: 500;
        color: #999999;
        line-height: px2rem(40px);
        margin: px2rem(37px) 0 px2rem(50px) px2rem(55px);
      }
      .text-intent {
        text-indent: px2rem(50px);
      }
      .color-grey {
        color: #333333;
      }
      .color-red {
        color: #F3573E;
      }
    }
    .active-content-recharge {
      padding: px2rem(40px) px2rem(30px);
      margin: 0 auto;
      .black {
        color: #363636;
        font-size: px2rem(30px);
        margin: px2rem(10px) px2rem(5px);
      }
      input {
        font-size: px2rem(30px);
        color: #333;
      }
      input::-webkit-input-placeholder {
        color: #999999;
      }

      .mobile-outer {
        width: px2rem(594px);
        margin: 0 auto;
        height: px2rem(93px);
        position: relative;
        input {
          width: px2rem(394px);
          height: px2rem(93px);
          line-height: px2rem(93px);
          border: 1px solid #eee;
          float: left;
          border-radius: px2rem(10px);
          padding: 0 px2rem(10px);
        }
        .sure {
          float: right;
          width: px2rem(160px);
          height: px2rem(93px);
          line-height: px2rem(93px);
          border-radius: px2rem(10px);
          color: #fff;
          font-size: px2rem(30px);
          background:#CCCACA;
          text-align: center;
        }
        .sure-can{
          color: #fff;
          background: #F0432C;
        }
        .money {
          float: left;
          width: px2rem(524px);
          height: px2rem(93px);
          padding: 0 px2rem(60px) 0 px2rem(10px);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: px2rem(10px);
          font-size: px2rem(30px);
          position: relative;
          display: inline-block;
          color: #333;
          z-index: 1;
        }

        .unit {
          width: px2rem(30px);
          height: px2rem(93px);
          line-height: px2rem(93px);
          color: #5693F9;
          float: right;
          z-index: 5;
          position: absolute;
          right: px2rem(20px);
          top: 0;
        }
      }
      .recharge-title {
        margin: px2rem(47px) 0 px2rem(39px);
        span{
          color:#f00;
          margin-left: px2rem(10px);
        }
      }
      .recharge-method {
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: px2rem(10px);
        margin: 0 auto;
        .method-item {
          width: px2rem(127px);
          height: px2rem(127px);
          border: 1px solid #E5E5E5;
          color: #999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            margin-top: px2rem(15px);
          }
        }
        .method-item-zfb {
          color: #009FE8;
        }
        .method-item-wx {
          color: rgba(0, 189, 23, 1);
        }
        .method-item-money {
          color: rgba(240, 67, 44, 1);
        }

        .zfb {
          width: px2rem(52px);
          height: px2rem(52px);
        }
        .wx {
          width: px2rem(63px);
          height: px2rem(50px);
        }
        .money {
          width: px2rem(51px);
          height: px2rem(51px);
        }
      }
      .notice {
        width: px2rem(593px);
        border: 1px solid #E5E5E5;
        border-radius: px2rem(10px);
        padding: px2rem(33px) 0 px2rem(24px);
        margin: 0 auto;
        p {
          width: px2rem(531px);
          color: #999;
          font-size: px2rem(24px);
          line-height: px2rem(40px);
          margin: 0 auto;
        }
      }
      .right-recharge {
        width: px2rem(594px);
        height: px2rem(93px);
        line-height: px2rem(93px);
        background: rgba(204, 202, 202, 1);
        border-radius: px2rem(10px);
        font-size: px2rem(36px);
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin-top: px2rem(56px);

      }
      .right-recharge-can {
        background: #F0432C;
        color: #fff;
      }
      .tip {
        font-size: px2rem(24px);
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: px2rem(40px);
        margin: px2rem(22px) 0 px2rem(34px);
        span {
          color: #F04129;
        }
      }
      .mobile-notice {
        clear: both;
        margin: px2rem(12px) px2rem(5px);
        font-size: px2rem(24px);
        color: #5693F9;
      }
      .wrong {
        color: #F04129;
      }

    }
    .active-content-table {
      padding: px2rem(65px) 0 px2rem(58px);
      table {
        width: px2rem(593px);
        border-collapse: collapse;
        margin: 0 auto;
        border: 2px solid #fff;
        td {
          height: px2rem(134px);
          border: px2rem(1px) solid #eee;
        }
        /*td{*/
        /*width: 50%;*/
        /*height: px2rem(134px);*/
        /*vertical-align: middle;*/
        /*border-right: 1px solid #eee;*/
        /*display: flex;*/
        /*border-top: 1px solid #eee;*/
        /*!*align-items: center;*!*/
        /*!*justify-content: center;*!*/
        /*flex-direction: column;*/
        /*box-sizing: border-box;*/
        /*text-align: left;*/
        /**/
        /*}*/
        td h3 {
          color: #333333;
          font-size: px2rem(24px);
          margin: px2rem(35px) 0 px2rem(15px) px2rem(49px);
        }
        p {
          color: #999999;
          font-size: px2rem(36px);
          margin: px2rem(0px) 0 px2rem(0px) px2rem(49px);
        }
      }
      .notice {
        width: px2rem(600px);
        border: 1px solid #E5E5E5;
        border-radius: px2rem(10px);
        padding: px2rem(33px) 0 px2rem(24px);
        margin: 0 auto;
        p {
          width: px2rem(570px);
          color: #999;
          font-size: px2rem(24px);
          text-indent: px2rem(30px);
          line-height: px2rem(40px);
          margin: 0 auto;
        }
      }
    }
    .no-title {
      height: auto;
      padding: px2rem(69px) px2rem(71px) px2rem(68px) px2rem(77px);
      margin-bottom: px2rem(41px);
      .content-info {
        font-weight: 600;
        width: px2rem(512px);
        margin: 0;
        margin-bottom: px2rem(20px);
      }
    }
    .report-btn-down, .report-btn-up {
      position: relative;
      height: px2rem(32px);
      font-size: px2rem(30px);
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      margin: px2rem(40px) 0 px2rem(31px) px2rem(43px);
      display: inline-block;
      margin-left: 50%;
    }
    .report-btn-down::after {
      content: "";
      position: absolute;
      right: px2rem(-50px);
      top: 0;
      width: px2rem(32px);
      height: px2rem(32px);
      background: url(/static/images/activity/down_white.png) center no-repeat;
      background-size: 100% 100%;
    }
    .report-btn-up::after {
      content: "";
      position: absolute;
      right: -0.8rem;
      top: 0;
      width: px2rem(32px);
      height: px2rem(32px);
      background: url(/static/images/activity/up_white.png) center no-repeat;
      background-size: 100% 100%;
    }
    .btn-cover {
      position: fixed;
      bottom: 0;
      background-color: #F14831;
      width: 100%;
      .btn {
        float: left;
        width: 50%;
        height: px2rem(130px);
        line-height: px2rem(130px);
        font-size: px2rem(40px);
        font-weight: 600;
        text-align: center;
      }
      .red-btn {
        background: #B62E27;
        color: #fff;
      }
      .yellow-btn {
        background: #FBEC70;
        color: #F24E36;
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
        background-color: #fff;
        border-radius: px2rem(16px);
        text-align: center;

      }
      /*图片分享*/
      .share-contain {
        position: absolute;
        left: 50%;
        top: 40%;
        width: px2rem(560px);
        /*height: px2rem(757px);*/
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: auto;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        padding: px2rem(107px) 0 px2rem(53px);
        .share-img {
          width: px2rem(338px);
          height: px2rem(338px);
          background: #fff;
        }
        .title {
          font-size: px2rem(30px);
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: px2rem(34px);
        }
        .tip-title {
          margin: px2rem(50px) 0 px2rem(43px);
        }

      }
      /*支付成功*/
      .pay-success-contain {
        position: absolute;
        left: 50%;
        top: 40%;
        width: px2rem(560px);
        /*height: px2rem(757px);*/
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: auto;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        padding: px2rem(106px) 0 px2rem(43px);
        .share-img {
          width: px2rem(238px);
          height: px2rem(169px);
          margin: 0 auto;
        }
        .tip-content {
          font-size: px2rem(24px);
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: px2rem(30px);
          margin: px2rem(68px) 0 px2rem(56px) px2rem(43px);
          text-align: left;
        }
        .sure {
          background: #F1472F;
          color: #fff;
        }

        .title {
          font-size: px2rem(30px);
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: px2rem(34px);
        }
        .tip-title {
          margin: px2rem(50px) 0 px2rem(43px);
        }

        .cancell {
          margin-bottom: px2rem(48px);
          margin-top: px2rem(80px);
        }

      }
      .pay-success-contain2 {
        padding: px2rem(84px) 0 px2rem(50px);
      }
      .btn {
        width: px2rem(480px);
        height: px2rem(79px);
        line-height: px2rem(79px);
        border-radius: px2rem(10px);
        font-size: px2rem(36px);
        margin: 0 auto;
      }
      .red-btn {
        border: 1px solid rgba(232, 36, 22, 1);
        color: #E82416;
        background: #fff;
      }
      .grey-btn {
        color: #fff;
        background-color: #E6E6E6;
      }
      /*扫码支付*/
      .pay-contain {
        position: absolute;
        left: 50%;
        top: 40%;
        width: px2rem(560px);
        /*height: px2rem(757px);*/
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: auto;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        padding: px2rem(85px) 0 px2rem(48px);

        background: #fff;
        .share-img {
          width: px2rem(406px);
          height: px2rem(406px);
        }
        .title {
          font-size: px2rem(30px);
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: px2rem(34px);
        }
        .tip-title {
          margin: px2rem(0px) 0 px2rem(43px);
        }
        .cancell {
          margin-bottom: px2rem(40px);
        }
      }
    }
  }
</style>
