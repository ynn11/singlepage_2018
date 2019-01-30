<template>
  <div :class="'warm-winter-guide-index '+[showRules?'static':'']">
    <activityHeader type="app" title="暖冬型动 “羽”你相伴"></activityHeader>

    <img class="cover-bg" src="/static/images/activity/guide/warmWinter/content_bg.png"/>
    <img class="cover-bear" src="/static/images/activity/guide/warmWinter/bear.png"/>
    <img class="cover-font" src="/static/images/activity/guide/warmWinter/title.png"/>

    <div class="main-container">
      <h3 class="theme-color theme-fontSize26 theme-margincenter active-time">活动限期：2018年{{actBeginTime}}-{{actEndTime}}</h3>
      <p class="theme-color theme-fontSize36 theme-margincenter  title">活动内容</p>
      <div class="active-content">
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_1">导购将活动分享给会员</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_2">
          会员打开导购的分享，在线支付30元获得299元购买600元羽绒服的体验券一张，导购立即获得{{zmxVoucherData.staffRewardMoney}}元销售礼包提成。</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_3">
          会员到店，导购核销会员的体验券，会员支付299元，可在店内选购600元内羽绒衣一件，会员支付形式不限。</p>
      </div>
      <div class="theme-fontSize36 theme-fontWeight600 theme-margincenter edit-btn" @click="showEdit=true">修改导购奖励</div>
      <h3 :class="'theme-color theme-fontSize30 theme-fontWeight600 '+[showRules?'report-btn-up':'report-btn-down']"
          @click="showRules=!showRules">点击查看活动规则</h3>
      <div class="active-content" v-show="showRules">
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_1">
          每销售出一张体验券，对应导购立即获得{{zmxVoucherData.staffRewardMoney}}元提成。会员在哪位导购的链接上支付购买，提成就给到哪位导购。</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_2">
          会员在线上购买体验券后，需到店凭兑换码再支付299元选购羽绒服，同时导购需在礼品兑换页核销该兑换码。</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_3">店内一张代金券限用一件商品，单人限购一张。</p>
      </div>
      <p class="theme-color theme-fontSize36 theme-margincenter  title">我的活动数据</p>
      <div class="active-content">
        <p class="theme-color theme-fontSize30 theme-fontWeight600 title_notice"><span>{{zmxVoucherData.gainVoucherCount}}</span>人已购买体验券
        </p>
        <p class="theme-color theme-fontSize30 theme-fontWeight600 title_notice"><span>{{zmxVoucherData.useVoucherCount}}</span>人已使用体验券
        </p>
        <p class="theme-color theme-fontSize30 theme-fontWeight600 title_notice">我已发出<span>{{zmxVoucherData.staffTotalRewardMoney}}</span>元奖励
        </p>
      </div>
    </div>
    <!--修改弹窗-->
    <div class="popWindow" v-if="showEdit">
      <div class="mask"></div>
      <div class="showpop-contain pop-contain">
        <img class="close" src="/static/images/activity/close.png" @click="showEdit=false;money='';"/>
        <div class="pop-content">
          <p class="theme-color theme-fontWeight600 theme-margincenter theme-fontSize36 notice">修改弹窗</p>
          <p class="theme-color theme-fontWeight600 theme-margincenter theme-fontSize26 notice">售出一张体验券，奖励对应导购：</p>
          <div class="theme-margincenter input-cover"><input class="input" type="number" v-model="money"
                                                             placeholder="请输入金额"><span
            class="theme-fontSize36 unit">元</span></div>
          <div class="theme-margincenter btn" @click="edit">确认修改</div>
        </div>
      </div>
    </div>
    <!--修改成功-->
    <div class="popWindow" v-if="showSuccess">
      <div class="mask"></div>
      <div class="showpop-contain pop-contain">
        <div class="pop-content">
          <img class="sucess" src="/static/images/activity/guide/warmWinter/success.png"/>
          <p class="notice theme-color theme-fontWeight600 theme-fontSize26" style="text-align: center">修改成功</p>
          <div class="theme-margincenter btn" @click="sure">确认</div>
        </div>
      </div>
    </div>

    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import warmWinterApi from "../../../../fetch/warmwinter_api"
  import _urlConfig from "../../../../util/urlConfig"
  import * as _validate from "../../../../util/validate"
  import loading from '@/components/common/loading'
  import activityHeader from '@/components/common/activityHeader'
  export default{
    components: {
      "v-loading": loading,
      activityHeader: activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        activityCode: "f7d09961e18611e8bc67704d7b87a020",
        showRules: false,
        loading: false,
        showEdit: false,
        showSuccess: false,
        zmxVoucherData: {},
        money: '',
        actBeginTime:'',
        actEndTime:'',

      }
    },

    methods: {
      edit: function () {
          if(_validate.positiveInteger(this.money)!==true){
            this.$toast(_validate.positiveInteger(this.money));
            return;
          }
        warmWinterApi.setZmxVoucherActStaffReward("post", {
          activityCode: this.activityCode,
          staffRewardMoney: this.money
        }, this.token).then((res) => {
          if (res.returnCode == 0) {
            this.showEdit = false;
            this.showSuccess = true;
          } else {
            this.$toast(res.message);
          }
        })

      },
      initData: function () {
        warmWinterApi.getZmxVoucherData("get", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode == 0) {
            this.zmxVoucherData = res.returnContent;
            var array1 = res.returnContent.actBeginTime.split('-');
            var actBeginTime=array1[0] + "月" + array1[1] + "日";
            this.actBeginTime=actBeginTime;
            var array2 = res.returnContent.actEndTime.split('-');
            var actEndTime= array2[0] + "月" + array2[1] + "日";
            this.actEndTime=actEndTime;
          } else {
            this.$toast(res.message);
          }
        });
      },
      sure: function () {
        this.showSuccess = false;
        this.money = '';
        this.initData();
      }
    },
    created() {
    },
    mounted(){
      this.initData();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .warm-winter-guide-index {
    position: relative;
    height: 101%;
    &.static {
      overflow: hidden;
    }
    .cover-bg {
      position: absolute;
      left: 0;
      top: px2rem(80px);
      width: px2rem(750px);
      height: px2rem(1303px);
      z-index: 2;
    }
    .cover-bear {
      position: absolute;
      left: px2rem(0px);
      top: px2rem(90px);
      width: px2rem(750px);
      height: px2rem(1087px);
      z-index: 3;
    }
    .cover-font {
      position: absolute;
      left: px2rem(77px);
      top: px2rem(167px);
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
    .theme-fontSize40 {
      font-size: px2rem(40px);
    }
    .theme-margincenter {
      margin: 0 auto;
      text-align: center;
    }

    .main-container {
      position: relative;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      padding-top: px2rem(80px);
      padding-bottom: px2rem(150px);
      z-index: 5;
      .active-time {
        margin-top: px2rem(410px);
        text-align: center;
        font-weight: 600;
      }
      .title {
        position: relative;
        height: px2rem(36px);
        line-height: px2rem(45px);
        margin: px2rem(60px) 0 px2rem(30px);
        background: url("/static/images/activity/guide/warmWinter/title_bg.png") center no-repeat;
        background-size: px2rem(461px) px2rem(2px);
      }

      .active-content {
        position: relative;
        width: px2rem(621px);
        background: rgba(255, 255, 255, 0.72);
        border-radius: px2rem(20px);
        border: 4px dashed rgba(255, 217, 7, 1);
        margin: 0 auto;
        padding: px2rem(49px) px2rem(31px) px2rem(49px) px2rem(81px);
        box-sizing: border-box;
        p {
          width: px2rem(509px);
          line-height: px2rem(33px);
          padding: px2rem(10px) 0;
        }

        .title_1::before {
          position: absolute;
          left: px2rem(32px);
          content: "1";
          width: px2rem(33px);
          height: px2rem(33px);
          line-height: px2rem(33px);
          background: #4E2713;
          text-align: center;
          color: #FFFFFF;
          border-radius: 50%;
        }
        .title_2::before {
          position: absolute;
          left: px2rem(32px);
          content: "2";
          width: px2rem(33px);
          height: px2rem(33px);
          line-height: px2rem(33px);
          background: #4E2713;
          text-align: center;
          color: #FFFFFF;
          border-radius: 50%;
        }
        .title_3::before {
          position: absolute;
          left: px2rem(32px);
          content: "3";
          width: px2rem(33px);
          height: px2rem(33px);
          line-height: px2rem(33px);
          background: #4E2713;
          text-align: center;
          color: #FFFFFF;
          border-radius: 50%;
        }
        .title_notice {
          span {
            color: #DA3938;
            font-weight: 600;
          }

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
      }
      .edit-btn {
        width: px2rem(622px);
        height: px2rem(100px);
        line-height: px2rem(100px);
        background: rgba(217, 44, 1, 1);
        border-radius: px2rem(50px);
        color: rgba(255, 255, 255, 1);
        margin: px2rem(29px) auto px2rem(38px);
      }
      .report-btn-down, .report-btn-up {
        position: relative;
        height: px2rem(32px);
        margin: px2rem(23px) 0 px2rem(31px) px2rem(44px);
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
        background: url(/static/images/activity/down_brown.png) center no-repeat;
        background-size: 100% 100%;
      }
      .report-btn-up::after {
        content: "";
        position: absolute;
        right: px2rem(-50px);
        top: 0;
        width: px2rem(32px);
        height: px2rem(32px);
        background: url(/static/images/activity/up_brown.png) center no-repeat;
        background-size: 100% 100%;
      }
      .product {
        width: px2rem(664px);
        height: px2rem(271px);
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
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        border-radius: px2rem(16px);
        text-align: center;
        opacity: 1;
      }
      .showpop-contain {
        width: px2rem(581px);
        position: relative;
        .close {
          position: absolute;
          right: 0;
          top: px2rem(20px);
          width: px2rem(40px);
          height: px2rem(40px);
        }
        .pop-content {
          width: px2rem(581px);
          height: px2rem(417px);
          background: url("/static/images/activity/guide/warmWinter/pop_bg.png") center no-repeat;
          background-size: 100%;
          padding-top: px2rem(200px);
          .sucess {
            width: px2rem(307px);
            height: px2rem(198px);
            margin-left: px2rem(-50px);
          }
          .notice {
            width: px2rem(425px);
            margin: px2rem(20px) auto 0;
            line-height: px2rem(36px);
          }
          .input-cover {
            width: px2rem(410px);
            height: px2rem(89px);
            position: relative;
            margin: px2rem(36px) auto px2rem(10px);
            .input {
              width: px2rem(350px);
              height: px2rem(35px);
              line-height: px2rem(35px);
              background: rgba(78, 39, 19, 1);
              color: #fff;
              font-weight: 600;
              font-size: px2rem(36px);
              padding: px2rem(27px) px2rem(30px);
              /*&::after{*/
              /*content: "元";*/
              /*position: absolute;*/
              /*right:px2rem(10px);*/
              /*width: px2rem(35px);*/
              /*height: px2rem(35px);*/
              /*}*/
            }
            .unit {
              position: absolute;
              right: px2rem(30px);
              top: px2rem(26px);
              color: #FFD907;
            }
          }

          .btn {
            clear: both;
            width: px2rem(520px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            background: rgba(217, 44, 1, 1);
            border-radius: px2rem(45px);
            color: #fff;
            text-align: center;
            font-size: px2rem(36px);
            margin-top: px2rem(40px);
          }
        }

      }
    }

  }
</style>
