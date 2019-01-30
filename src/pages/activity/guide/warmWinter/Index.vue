<template>
  <div :class="'warm-winter-guide-index '+[showRules?'static':'']">
    <activityHeader type="app" title="暖冬型动 “羽”你相伴"></activityHeader>

    <img class="cover-bg" src="/static/images/activity/guide/warmWinter/content_bg.png"/>
    <img class="cover-bear" src="/static/images/activity/guide/warmWinter/bear.png"/>
    <img class="cover-font" src="/static/images/activity/guide/warmWinter/title.png"/>

    <div class="main-container">
      <h3 class="theme-color theme-fontSize26 theme-margincenter active-time">活动限期：{{activityInfo.beginTime}}-{{activityInfo.endTime}}</h3>
      <p class="theme-color theme-fontSize36 theme-margincenter  title">活动内容</p>
      <div class="active-content">
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_1">你将活动分享给会员</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_2">
          打开你的分享，在线支付{{activityInfo.voucherMoney}}元获得299元购买600元羽绒服的体验券一张，你立即获得{{activityInfo.staffRewardMoney}}元销售礼包提成。</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_3">
          会员到店，你在身边导购app活动页内输入会员体验码，核销体验码，会员支付299元，即可在店内选购600元及以后羽绒衣一件。</p>
      </div>
      <h3 :class="'theme-color theme-fontSize30 theme-fontWeight600 '+[showRules?'report-btn-up':'report-btn-down']"
          @click="showRules=!showRules">点击查看活动须知</h3>
      <div class="active-content" v-show="showRules">
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_1">
          每销售出一张体验券，对应导购立即获得{{activityInfo.staffRewardMoney}}元提成。会员在哪位导购的链接上支付购买，提成就给到哪位导购。</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_2">
          会员在线上购买体验券后，需到店凭兑换码再支付299元选购羽绒服，同时导购需在礼品兑换页核销该兑换码。</p>
        <p class="theme-color theme-fontSize24 theme-fontWeight600 title_3">店内一张代金券限用一件商品，单人限购一张。</p>
      </div>
      <p class="theme-color theme-fontSize36 theme-margincenter  title">活动礼品</p>
      <div class="theme-margincenter">
        <img class="product theme-margincenter" src="/static/images/activity/guide/warmWinter/product.png"/>
      </div>
      <p class="theme-color theme-fontSize36 theme-margincenter  title">我的活动数据</p>
      <div class="active-content">
        <p class="theme-color theme-fontSize30 theme-fontWeight600 title_notice"><span>{{activityDataStaff.buyNum}}</span>人已购买体验券</p>
        <p class="theme-color theme-fontSize30 theme-fontWeight600 title_notice"><span>{{activityDataStaff.usedNum}}</span>人已使用体验券</p>
        <p class="theme-color theme-fontSize30 theme-fontWeight600 title_notice">我已获得<span>{{activityDataStaff.totalRewardMoney}}</span>元奖励</p>
      </div>
    </div>
    <div class="cover-btn">
      <div class="left-btn theme-fontSize36" @click="routerLink('/activity_2018/warmwinter_guide_poster')">分享活动</div>
      <div class="right-btn theme-fontSize36" @click="showWriteCode=true;">核销体验码</div>
    </div>
    <!--输入核销码-->
    <div class="popWindow" v-if="showWriteCode">
      <div class="mask"></div>
      <div class="writecode-contain pop-contain">
        <img class="close" src="/static/images/activity/close.png" @click="showWriteCode=false;pickCode='';"/>
        <div class="pop-content">
          <p class="theme-color theme-fontWeight600 theme-fontSize26 notice">会员再支付299元，即可带走600元内羽绒(活动款)。</p>
          <input v-model="pickCode" type="number" placeholder="请输入核销码">
          <p class="theme-fontSize24 tip" v-show="!isRightCode">体验码无效请重新输入</p>
          <div class="theme-margincenter btn" @click="sureCode">确认核销</div>
        </div>
      </div>
    </div>
    <!--核销成功-->
    <div class="popWindow" v-if="showSuccess">
      <div class="mask"></div>
      <div class="writecode-contain pop-contain">
        <div class="pop-content">
          <img class="sucess" src="/static/images/activity/guide/warmWinter/success.png"/>
          <p class="notice theme-color theme-fontWeight600 theme-fontSize26" style="text-align: center">核销成功，体验码已核销。</p>
          <div class="theme-margincenter btn" @click="sure">确认</div>
        </div>
      </div>
    </div>

    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import warmWinterApi from '../../../../fetch/warmwinter_api'
  import _urlConfig from "../../../../util/urlConfig"
  import loading from '@/components/common/loading'
  import activityHeader from '@/components/common/activityHeader'
  import * as _tool from "../../../../util/tool"
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
        showWriteCode: false,
        showSuccess: false,
        activityInfo: {},
        activityDataStaff: {},
        pickCode:'',
        isRightCode:true,

      }
    },
    computed: {},
    watch: {},
    methods: {
      //跳转
      routerLink(path){
        let src = path + "?token=" + this.token + "&type=" + this.type;
        this.$router.push({
          path: src
        })
      },
      sureCode:function () {
          warmWinterApi.activityComplete("post",{
            activityCode:this.activityCode,
            pickCode:this.pickCode
          },this.token).then((res)=>{
            if (res.returnCode === "0") {
              this.showWriteCode=false;
              this.showSuccess=true;
              this.isRightCode=true;
            } else {
                this.isRightCode=false;
//              alert(res.message);
            }
          });
      },
      sure:function () {
        this.showSuccess=false;
        this.pickCode='';
      },
      //获取活动统计数据
      getactivityDataStaff: function () {
        warmWinterApi.activityDataStaff("post", {
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
        warmWinterApi.activityInfo("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityInfo = res.returnContent;
            this.getactivityDataStaff();
          } else {
            alert(res.message);
          }
        })
      },
    },
    created(){},
    mounted() {
      //初始化webViewJavascriptBridge
      _tool.webviewBridgeInit(this.type);
      this.getActivityInfo();
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
        /*&::before {*/
        /*content: "";*/
        /*position: absolute;*/
        /*left: px2rem(150px);*/
        /*top: px2rem(20px);*/
        /*width: px2rem(100px);*/
        /*height: px2rem(0.5px);*/
        /*background: #4E2713;*/
        /*opacity: 0.5;*/
        /*}*/
        /*&::after {*/
        /*content: "";*/
        /*position: absolute;*/
        /*right: px2rem(150px);*/
        /*top: px2rem(20px);*/
        /*width: px2rem(100px);*/
        /*height: px2rem(0.5px);*/
        /*background: #4E2713;*/
        /*opacity: 0.5;*/
        /*}*/
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
    .cover-btn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: px2rem(750px);
      z-index: 6;
      div {
        float: left;
        width: 50%;
        height: px2rem(111px);
        line-height: px2rem(111px);
        text-align: center;
        color: #fff;
      }
      .left-btn {
        background: #DA3938;
      }
      .right-btn {
        background: #4E2713;
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
      .writecode-contain {
        width: px2rem(581px);
        position: relative;
        .close{
          position: absolute;
          right:0;
          top:px2rem(20px);
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
            width: px2rem(400px);
            margin: px2rem(10px) auto 0;
            text-align: left;
            line-height: px2rem(36px);
          }
          input {
            width: px2rem(352px);
            height: px2rem(35px);
            line-height: px2rem(35px);
            background: rgba(78, 39, 19, 1);
            color: #fff;
            font-weight: 600;
            font-size: px2rem(36px);
            padding: px2rem(27px) px2rem(30px);
            margin: px2rem(36px) 0 px2rem(10px);
          }
          .tip {
            color: #D92C01;
          }
          .btn {
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
