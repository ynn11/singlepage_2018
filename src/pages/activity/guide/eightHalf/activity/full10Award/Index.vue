<style lang="scss" rel="stylesheet/scss">
  @import '../../../../../../assets/css/function';
  .eightHalf_activ_full10_index{
    position: relative;
    height: 100%;
    background-color: #9A20FE;
    *{
      font-weight: bold !important;
    }
    .main-containner{
      padding-top: px2rem(80px);
      position: relative;
      .banner{
        width: 100%;
        height: px2rem(982px);
        z-index: 1;
      }
      .content1{
        z-index: 2;
        /*<!--margin-top: px2rem(-100px);-->*/
        position: relative;
        top:px2rem(-130px);
        .head{
          color:#fff;
          font-size: px2rem(30px);
          text-align: center;
          span{
            color:#FFD340;
            margin: 0 px2rem(20px);
          }
        }
        .info-content{
          height: px2rem(100px);
          /*line-height: px2rem(100px);*/
          margin: px2rem(30px) px2rem(48px) px2rem(39px);
          background:rgba(255,255,255,1);
          box-shadow:0px 3px 32px 0px rgba(235,70,90,0.24);
          border-radius:px2rem(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 px2rem(30px);
          font-size: px2rem(30px);
          .info-gain{
            color:#666;
          }
          .unit{
            float: left;
            width:px2rem(15px);
            height:px2rem(15px);
            background:rgba(255,47,169,1);
            border-radius:2px;
            /*color:#333;*/
            margin-right: px2rem(20px);
            margin-top: px2rem(7px);
            transform:rotate(45deg);
            -ms-transform:rotate(45deg); 	/* IE 9 */
            -moz-transform:rotate(45deg); 	/* Firefox */
            -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
            -o-transform:rotate(45deg); 	/* Opera */
          }
          .money{
            color:#FF2FA9;
            span{
              margin-left: px2rem(20px);
            }
          }
        }
        .title{
          display: inline-block;
          color:#FF2FA9;
          font-size: px2rem(36px);
          line-height: px2rem(56px);
          text-align: center;
          position: relative;
          font-weight: 600;
          span{
            font-size: px2rem(56px);
            transform:rotate(20deg);
            font-style: oblique;
            margin-right: px2rem(10px);
          }
        }
        .title::before{
          position: absolute;
          left: px2rem(-60px);
          top:50%;
          transform: translateY(-50%);
          width: px2rem(44px);
          height: px2rem(20px);
          content: '';
          background: url("/static/images/activity/guide/eightHalf/activity/fulll10Award/left.png") center no-repeat;
          background-size: px2rem(44px) px2rem(20px);
        }
        .title::after{
          position: absolute;
          right: px2rem(-60px);
          top:50%;
          transform: translateY(-50%);
          width: px2rem(42px);
          height: px2rem(20px);
          content: '';
          background: url("/static/images/activity/guide/eightHalf/activity/fulll10Award/right.png") center no-repeat;
          background-size: px2rem(42px) px2rem(20px);
        }
        .tip-content-outer{
          height: px2rem(300px);
          margin: 0 px2rem(48px);
          background:rgba(255,255,255,1);
          box-shadow:0px 3px 32px 0px rgba(235,70,90,0.24);
          border-radius:px2rem(10px);
          padding-top: px2rem(58px);
          text-align: center;

          .arrow{
            width: px2rem(25px);
            height: px2rem(20px);
            margin-top: px2rem(20px);
          }
           .img1{
            width: px2rem(62px);
            height: px2rem(59px);
          }
          .img2{
            width: px2rem(75px);
            height: px2rem(57px);
          }
         .img3{
            width: px2rem(55px);
            height: px2rem(57px);
          }
          .img4{
            width: px2rem(57px);
            height: px2rem(53px);
          }

          .tip-content{
            display: flex;
            align-items: flex-start;
            justify-content: space-around;
            margin: px2rem(30px) px2rem(20px) 0;
            .tip{
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              p{
                color:#333333;
                font-size: px2rem(24px);
                margin-top: px2rem(20px);
                text-align: center;
              }
            }
          }
        }
        .ruls-content{
          padding-top: px2rem(58px);
          height: px2rem(676px);
          background:rgba(255,255,255,1);
          box-shadow:0px 3px 32px 0px rgba(235,70,90,0.24);
          border-radius:px2rem(10px);
          margin: px2rem(41px) px2rem(48px);
          text-align: center;
          .title{
            margin-bottom: px2rem(30px);
          }
          p{
            color:#333333;
            font-size: px2rem(26px);
            margin: px2rem(30px) px2rem(30px) 0;
            text-align: left;
            line-height: px2rem(34px);
          }
        }
      }

    }
  }
</style>
<template>
  <div class="eightHalf_activ_full10_index">
    <activityHeader type="app" title="满10得60，鼓励金拿不停"></activityHeader>
    <div class="main-containner">
      <img class="banner" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/banner@2x.png"/>
      <div class="content1">
        <h3 class="head" v-show="activityData.totalReward!=0">平台已发放 <span>{{activityData.totalReward}}元</span> 鼓励金</h3>
        <h3 class="head" v-show="activityData.totalReward==0">已经有大批导购正在积极分享参与此活动</h3>
        <div class="info-content">
          <div class="info-gain"> <div class="unit"></div>我已获得(元)</div>
          <div class="money">{{activityData.reward}}<span>鼓励金</span></div>
        </div>
        <div class="tip-content-outer">
          <h3 class="title"><span>4</span>步获得鼓励金</h3>
          <div class="tip-content">
            <div class="tip">
              <img class="img1" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/tip1.png"/>
              <p>售出<br/>分红商品</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/arrow.png"/>
            <div class="tip">
              <img class="img2" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/tip2.png"/>
              <p>订单<br/>显示已完成</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/arrow.png"/>
            <div class="tip">
              <img class="img3" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/tip3.png"/>
              <p>每累计<br/>到10单</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/arrow.png"/>
            <div class="tip">
              <img class="img4" src="/static/images/activity/guide/eightHalf/activity/fulll10Award/tip4.png"/>
              <p>获得<br/>{{activityInfo.staffReward}}元鼓励金</p>
            </div>
          </div>
        </div>
        <div class="ruls-content">
          <h3 class="title">活动规则</h3>
          <p>1. 活动时间：自{{activityInfo.beginTime}}起。</p>
          <p>2. 分红商品订单才会获得鼓励金。</p>
          <p>3. 订单完成规则：买家收到商品确认无误后且没有全部退款。</p>
          <p>4. 鼓励金发放规则：每当有10单分红商品订单为完成状态时，{{activityInfo.staffReward}}元鼓励金会直接发放至你绑定的支付宝中。奖励不限次数，达到10单时发放{{activityInfo.staffReward}}元，达到20单时再发放{{activityInfo.staffReward}}元，上不封顶，以此类推。</p>
          <p>5. 如有问题请联系客服。电话客服15372072897<br/>微信客服13735433487。</p>
        </div>
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
        xd_code: this.$route.query.xd_code,
        type: this.$route.query.type,
        activityCode: "f66387fc6ee942ba96f426088d05c252",
        activityInfo:{},
        activityData:{},

      }
    },
    computed: {},
    watch: {},
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
