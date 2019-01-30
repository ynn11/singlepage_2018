<template>
  <!--<div class="double-boss-intro static">-->
  <div :class="'double-boss-intro ' + [showRules?'static':'']">
    <activityHeader type="app" title="11.11，单？免了！"></activityHeader>
    <div class="main-container">
      <div class="header-title">活动时间：11月5日-11月12日</div>
      <div class="header-bg">
        <img class="header-bg-font" src="/static/images/activity/boss/double_11/head_gb_title.png">
        <h3 class="title">活动内容</h3>
      </div>
      <div class="active-content">
        <h3 class="content-title title_1">会员线下到店充值，线上分享活动</h3>
        <p class="content-info">会员线下到店选购X元商品，导购为会员通过身边店充值3X元，商品免费带回家，分享活动到微信，获得对应积分，每成功充值一位会员，充值导购获得对应奖励。</p>
        <h3 class="content-title title_2">会员线上自助充值，锁定线下消费</h3>
        <p class="content-info text-intent">
          会员在活动页线上充值消费金额的，每满300元得400元门店余额，充值后门店金额立即可用。充值成功后，分享活动后获得对应身边店积分。每成功充值一位会员，转发活动对应导购获得对应奖励。</p>
        <p class="content-info color-grey text-intent">
          充值的优惠力度给到会员相当于7.5折，另外导购奖励金额由您自己设定噢！赠送积分会员在换取礼品后会寄送至您的门店，让会员二次进店！<br/>
          本次活动优惠是否与门店其他优惠同享，门店自行决定！</p>
      </div>
      <h3 :class="[showRules?'report-btn-up':'report-btn-down']" @click="showRules=!showRules">点击查看报名须知</h3>
      <div class="active-content no-title" v-show="showRules">
        <p class="content-info">线上线下活动为各自独立活动，优惠不同享，会员参与了哪个活动就对应享受哪个活动的优惠。线下活动的免单操作由门店自行进行，举例如下：</p>
        <p class="content-info color-red">例：钱女士进店选购了200元的商品，并注册成为身边店会员关注公众号，A导购在身边导购app中双十一活动的活动页为钱女士充值了600元，钱女士即可获得200元商品+600元身边店中本门店充值余额，转发活动后，再获得60个积分。A导购获得奖励。</p>
        <p class="content-info">线上充值的导购奖励只有会员通过导购分享的链接进行充值，导购才获得奖励！在公众号的活动链接进行充值的会员，无导购奖励。</p>
      </div>

    </div>
    <!--<div class="btn-cover">-->
      <div v-show="signStatus == 0" class="right-go btn" @click="doSign">立即报名</div>
      <div  v-show="signStatus == 1" class="set-active btn" @click="routerLink('/activity_2018/double_boss_set')" >已报名，设置活动</div>
      <div  v-show="signStatus == 2" class="myactive-data btn" @click="routerLink('/activity_2018/double_boss_data')">查看我的活动数据</div>
    <!--</div>-->
  </div>
</template>

<script>
  import doubleApi from '../../../../fetch/double_api'
  import activityHeader from "@/components/common/activityHeader"
  export default{
    components: {
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token||"",
        type: this.$route.query.type,
        activityCode:"28bd0f3bd82611e8bc67704d7b87a020",
        showRules: false,
        signStatus:0,
      }
    },
    methods:{
      //获取报名信息
      getDualActMerStatus(){
        doubleApi.getDualActMerStatus("get",{
          activityCode: this.activityCode
        },this.token).then((res)=>{
          if(res.returnCode==="0"){
            this.signStatus = parseInt(res.returnContent);
//            alert(res.returnContent);
          }else{
            this.$toast(res.message);
          }
        })
      },
      //报名活动
      doSign(){
        doubleApi.joinedAct("post",{
          activityCode: this.activityCode
        },this.token).then((res)=>{
          if(res.returnCode==="0"){
            this.routerLink("/activity_2018/double_boss_set")
          }else {
            this.$toast(res.message);
          }
        })
      },
      routerLink(path){
        let src = path + "?token=" + this.token + "&type=" + this.type;
        this.$router.push({
          path: src
        })
      },
    },
    mounted(){
        this.getDualActMerStatus();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-boss-intro {
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
      background-color: #F14831;
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
      height: px2rem(629px);
      background: url(/static/images/activity/boss/double_11/head_bg.png) center no-repeat;
      background-size: 100%;
      position: relative;
      text-align: center;
      .header-bg-font {
        position: absolute;
        left: px2rem(87px);
        top: px2rem(109px);
        width: px2rem(610px);
        height: px2rem(319px);
      }

      .title {
        position: relative;
        top: px2rem(552px);
        display: inline-block;
        font-size: px2rem(46px);
        height: px2rem(45px);
        line-height: px2rem(45px);
        color: #FBEC70;
        margin: 0 auto;

        /*position: absolute;*/
        /*left: 0;*/
        /*top: px2rem(552px);*/
        /*width: 100%;*/
        /*text-align: center;*/
        /*display: inline-block;*/
        /*font-size: px2rem(46px);*/
        /*height: px2rem(45px);*/
        /*line-height: px2rem(45px);*/
        /*font-weight: 600;*/
        /*color: #FBEC70;*/
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
        width: px2rem(485px);
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
    .no-title{
      height: auto;
      padding:px2rem(69px) px2rem(71px) px2rem(68px) px2rem(77px);
      margin-bottom: px2rem(41px);
      .content-info{
        font-weight:600;
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
      margin:px2rem(40px) 0  px2rem(31px) px2rem(43px);
      display: inline-block;
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
    /*.btn-cover{*/
      /*position: fixed;*/
      /*left:0;*/
      /*bottom: 0;*/
      /*background-color: #F14831;*/
    /*}*/
    .btn{
      position: fixed;
      left:0;
      bottom: 0;
      width:px2rem(750px);
      height:px2rem(130px);
      line-height:px2rem(130px);
      font-size:px2rem(36px);
      font-weight:600;
      color:rgba(255,255,255,1);
      text-align: center;
    }

    .right-go{
      background: #B62E27;
    }
    .set-active{
      background:#D7362E;
      /*margin: px2rem(10px) 0;*/
    }
    .myactive-data{
      background:#D7362E;
    }

  }
</style>
