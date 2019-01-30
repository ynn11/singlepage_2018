<style lang="scss" rel="stylesheet/scss">
  @import '../../../../../../assets/css/function';
  .eightHalf_activ_firstFullReturn_index{
    position: relative;
    height: 100%;
    background-color:#120718 ;
    *{
      font-weight: bold !important;
    }
    .main-container{
      text-align: center;
      position: relative;
      min-height: 100%;
      padding-top: px2rem(80px);
      .banner{
        width: 100%;
        height: px2rem(1071px);
      }
      .title1{
        width: px2rem(472px);
        height: px2rem(32px);
        position: relative;
        color:#fff;
        margin: 0 auto;
        font-size: px2rem(30px);
        span{
          color:#FFCC1C;
          font-size: px2rem(48px);
        }
      }
      .near{
        background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/near.png") center no-repeat;
        background-size: 100%;
        span{
          position: absolute;
          left: px2rem(411px);
          top:px2rem(-10px);
        }
      }
      .success{
        background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/success.png") center no-repeat;
        background-size: 100%;
        span{
          position: absolute;
          left: px2rem(340px);
          top:px2rem(-10px);
          min-width: px2rem(100px);
          text-align: center;
        }
      }
      .title2{
        width: px2rem(472px);
        height: px2rem(32px);
        color:#fff;
        margin: px2rem(44px) auto px2rem(81px);
        font-size: px2rem(30px);
        span{
          color:#FFCC1C;
          font-size: px2rem(36px);
          margin: 0 px2rem(10px);
        }
      }
      .tip-content-outer{
        width: px2rem(653px);
        height: px2rem(561px);
        background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/border.png") 0 0 no-repeat;
        background-size: 100%;
        margin: 0 auto;
        position: relative;
        .arrow{
          width: px2rem(25px);
          height: px2rem(20px);
          margin-top: px2rem(25px);
        }
        .img1{
          width: px2rem(60px);
          height: px2rem(70px);
        }
        .img2{
          width: px2rem(82px);
          height: px2rem(69px);
        }
        .img3{
          width: px2rem(68px);
          height: px2rem(68px);
        }
        .img4{
          width: px2rem(72px);
          height: px2rem(68px);
        }
        .img5{
          width: px2rem(68px);
          height: px2rem(67px);
        }
        .tip{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          p{
            font-size: px2rem(24px);
            color:#fff;
            margin-top: px2rem(30px);
            line-height: px2rem(30px);
          }
        }
        .head{
          position: absolute;
          left: 0;
          top:px2rem(-40px);
          width: 100%;
          height: px2rem(80px);
          line-height: px2rem(80px);
          color:#fff;
          text-align: center;
          font-size: px2rem(42px);
          background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/bg.png") center no-repeat;
          background-size: px2rem(425px) px2rem(80px);
        }
        .tip-content{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: flex-start;
          margin: 0 px2rem(20px);
        }
        .tip-content1{
          margin: 0 px2rem(100px);
          padding-top: px2rem(110px);
        }
        .tip-content2{
          margin-top: px2rem(40px);
        }

      }
      .rul-content{
        width: px2rem(653px);
        height: px2rem(1046px);
        padding: px2rem(80px) 0 0;
        margin: px2rem(88px) auto 0;
        background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/border2.png") 0 0 no-repeat;
        background-size:px2rem(653px) px2rem(1046px);
        position: relative;
        .head{
          position: absolute;
          left: 0;
          top:px2rem(-40px);
          width: 100%;
          height: px2rem(80px);
          line-height: px2rem(80px);
          color:#fff;
          text-align: center;
          font-size: px2rem(42px);
          background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/bg.png") center no-repeat;
          background-size: px2rem(425px) px2rem(80px);
        }
        p{
          color:#fff;
          font-size: px2rem(28px);
          line-height: px2rem(32px);
          margin:0 px2rem(33px) px2rem(30px);
          padding:px2rem(9px) 0 px2rem(9px) px2rem(70px);
          position: relative;
          text-align: left;
        }
        p::before{
          content: "";
          width: px2rem(50px);
          height: px2rem(50px);
          line-height: px2rem(50px);
          text-align: center;
          font-size: px2rem(36px);
          position: absolute;
          left: px2rem(0px);
          top:10%;
          background: url("/static/images/activity/guide/eightHalf/activity/firstFullReturn/yuan@2x.png") center no-repeat;
          background-size: 100%;
        }
        .pre1::before{
          content: "1";
        }
          .pre2::before{
          content: "2";
        }
          .pre3::before{
          content: "3";
        }
          .pre4::before{
          content: "4";
        }
          .pre5::before{
          content: "5";
        }
          .pre6::before{
          content: "6";
        }
          .pre7::before{
          content: "7";
        }
          .pre8::before{
          content: "8";
        }

      }
    }
  }
</style>
<template>
    <div class="eightHalf_activ_firstFullReturn_index">
      <activityHeader type="app" title="首单全返，李总真6......"></activityHeader>
      <div class="main-container">
        <img class="banner" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/banner@2x.png"/>
        <div class="title1 success" v-show="activityData.activityFinishStatus==1"><span>{{activityData.reward}}</span></div>
        <div class="title1 near" v-show="activityData.activityFinishStatus==0"><span>{{activityData.actPercentNum-activityData.curProcessNum}}</span></div>
        <div class="title2" v-show="activityData.reward>0">首单全返已发放<span>{{activityData.reward}}</span>元</div>
        <div class="title2" v-show="activityData.reward<=0">大批导购正在积极分享</div>
        <div class="tip-content-outer">
          <div class="head">如何获取首单全返</div>
          <div class="tip-content tip-content1">
            <div class="tip">
              <img class="img1" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/tip1.png"/>
              <p>点击立即分享</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/arrow_right.png"/>
            <div class="tip">
              <img class="img2" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/tip2.png"/>
              <p>选择发送给微信好友<br/>或分享到朋友圈</p>
            </div>
          </div>
          <div class="tip-content tip-content2">
            <div class="tip">
              <img class="img3" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/tip3.png"/>
              <p>有买家在您分享<br/>的链接上成功购买</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/arrow_right.png"/>
            <div class="tip">
              <img class="img4" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/tip4.png"/>
              <p>售出{{activityData.actPercentNum}}个由不同<br/>微信id购买的订单</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/arrow_right.png"/>
            <div class="tip">
              <img class="img5" src="/static/images/activity/guide/eightHalf/activity/firstFullReturn/tip5.png"/>
              <p>奖励发放</p>
            </div>


          </div>
        </div>
        <div class="rul-content">
          <div class="head">活动规则</div>
          <p class="pre1">活动时间：{{activityInfo.beginTime}}-{{activityInfo.endTime}}</p>
          <p class="pre2">在活动期间，导购售出由{{activityData.actPercentNum}}个由不同微信id购买的订单，当订单完成后，且没有发生全部退款时，首单全返奖金发放至支付宝账号。</p>
          <p class="pre3">首单指的是：导购在活动期间售出的第一个没有退款的订单。全返：指返首单的订单金额。最高返现{{activityInfo.maxReward}}元。</p>
          <p class="pre4">订单完成规则：由{{activityData.actPercentNum}}个不同微信id购买的订单，为完成状态，且都没有全部退款。</p>
          <p class="pre5">奖励发放时间：当任务完成时，立即发放至绑定的支付宝账号。</p>
          <p class="pre6">首单全返资格的名额200个，先到先得。</p>
          <p class="pre7">如有问题请联系客服。电话客服15372072897。微信客服13735433487。</p>
          <!--<p class="pre7">如有问题请联系客服。<br/>电话客服15372072897<br/>微信客服13735433487。</p>-->
          <p class="pre8">如有发生作弊行为，则取消获奖资格。活动解释权归身边店所有。</p>
        </div>
      </div>
    </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import eightHalfApi from "../../../../../../fetch/eightHalf"
    export default{
        components: {
          activityHeader
        },
        data () {
            return {
              token:this.$route.query.token,
              type: this.$route.query.type,
              xd_code: this.$route.query.xd_code,
              activityCode: "c930c4a47ef0406e9bb66cbb778f96e2",
              activityInfo:{},
              activityData:{},

            }
        },
        computed: {

        },
        watch: {
        },
        methods: {
          //数据收集
          collect(data){
            eightHalfApi.guidecollectData("post", data,this.token).then(res => {
            });
          },
          getActivityInfo:function () {
            eightHalfApi.activityInfo("post",{
              activityCode:this.activityCode
            },this.token).then(res=>{
                if(res.returnCode==="0"){
                    this.activityInfo=res.returnContent;
//                    let activityInfo=res.returnContent;
//                    var beginTime=activityInfo.beginTime.split("-");
//                    var endTime=activityInfo.endTime.split("-");
//                    activityInfo.beginTime=beginTime[0]+"月"+beginTime[1]+"日";
//                    activityInfo.endTime=endTime[0]+"月"+endTime[1]+"日";
//                    this.activityInfo=activityInfo;
                } else {
                alert(res.message);
                }
            })
          },
          getActivityDataStaff:function () {
            eightHalfApi.activityDataStaff("post",{
              activityCode:this.activityCode
            },this.token).then(res=>{
              if(res.returnCode==="0"){
                  console.log(res.returnContent);
                this.activityData=res.returnContent;
              } else {
                alert(res.message);
              }
            })
          }
        },
        created(){
          this.collect({
            "xdCode": this.xd_code,
            "ydCode": "YD0011",
            "tsActivityCode":this.activityCode,
          });
        },
        mounted(){
            this.getActivityInfo();
            this.getActivityDataStaff();
        }
    }
</script>
